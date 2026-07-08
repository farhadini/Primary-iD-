-- ============================================================================
-- Primary iD — Patient Record schema (Supabase / Postgres)
-- ============================================================================
-- PRINCIPLE: The assessment is the GENESIS of the patient record, not a lead
-- magnet. The first submission creates a profile; every answer is an event
-- appended to it; scores are projections. The record travels by three identity
-- keys (assessment_id, lead_source, patient_id) and converges in OpenDental.
--
-- ⚠️  PHI GATE: This schema stores Protected Health Information. Do NOT point
-- real, named patients at it until the Supabase HIPAA add-on is enabled AND a
-- signed BAA is in place (PRD §9, open decision #6). Until then, run the
-- assessment in demo mode (client-side scoring, no server persistence).
-- ============================================================================

create extension if not exists "pgcrypto";      -- gen_random_uuid()

-- ── Enums ───────────────────────────────────────────────────────────────────
do $$ begin
  create type profile_status as enum
    ('lead', 'booked', 'assessing', 'assessed', 'active_patient', 'member');
exception when duplicate_object then null; end $$;

do $$ begin
  create type care_pathway as enum
    ('preventive', 'airway', 'cosmetic', 'implants', 'longevity', 'general');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_priority as enum ('standard', 'urgent');
exception when duplicate_object then null; end $$;

-- ── profiles : the patient record (created at the gate) ─────────────────────
create table if not exists profiles (
  id             uuid primary key default gen_random_uuid(),   -- == assessment_id
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  -- minimum gate (PRD §5.2)
  first_name     text,
  last_name      text,
  email          text,
  mobile         text,
  age            int,
  reason         text,                       -- single-select tailored to the door
  pathway        care_pathway not null default 'general',
  priority       lead_priority not null default 'standard',  -- derived, never asked

  -- attribution (must survive every branch — PRD §8.1)
  lead_source    jsonb not null default '{}'::jsonb,  -- {utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer}

  -- lifecycle
  status         profile_status not null default 'lead',

  -- foreign identities (the three keys travel together)
  patient_id     text,        -- OpenDental patient id, once booked/seen
  ghl_contact_id text,        -- GoHighLevel contact id

  -- consent (PHI capture) — required before storing health answers
  phi_consent_at timestamptz,
  consent_version text
);

create index if not exists profiles_email_idx  on profiles (lower(email));
create index if not exists profiles_status_idx on profiles (status);
create index if not exists profiles_pathway_idx on profiles (pathway);

-- ── assessment_events : event-sourced answers (PRD §6, REQ-ASSESS-5) ────────
-- Never mutate. One row per answer. Re-entry resumes from the log; scores are
-- projections computed from these rows.
create table if not exists assessment_events (
  id           bigint generated always as identity primary key,
  profile_id   uuid not null references profiles(id) on delete cascade,
  dimension    text not null,          -- oral | sleep | nutrition | genetics | airway
  question_id  text not null,          -- stable id from the question bank
  answer       jsonb not null,         -- {value, score} — flexible per question type
  ts           timestamptz not null default now()
);

create index if not exists events_profile_idx on assessment_events (profile_id);
create unique index if not exists events_profile_question_uniq
  on assessment_events (profile_id, question_id);   -- "never ask twice" (REQ-ASSESS-4)

-- ── dimension_scores : projection (0–100 per dimension) ─────────────────────
-- Computed from the latest answer per question. Recompute on read; cheap at
-- this scale. Swap to a materialized view if volume grows.
create or replace view dimension_scores as
select
  profile_id,
  dimension,
  round(avg( (answer->>'score')::numeric ))::int as score,
  count(*) as answered
from assessment_events
group by profile_id, dimension;

-- ── composite : overall Primary iD (equal-weighted in v1, PRD §7) ───────────
create or replace view profile_composite as
select
  profile_id,
  round(avg(score))::int as composite,
  count(*) as dimensions_scored
from dimension_scores
group by profile_id;

-- ── updated_at trigger ──────────────────────────────────────────────────────
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end $$ language plpgsql;

drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at before update on profiles
  for each row execute function set_updated_at();

-- ── Row Level Security ──────────────────────────────────────────────────────
-- Patients never touch these tables directly. All writes come from the server
-- (Next.js API route) using the service-role key. Enable RLS and add no public
-- policies, so the anon key cannot read/write PHI.
alter table profiles          enable row level security;
alter table assessment_events enable row level security;
-- (no policies = service-role only; add authenticated-staff policies later)

-- ============================================================================
-- Tiers (patient-facing capability vs clinical risk — computed in app, PRD §7)
--   Thriving ≥85 · Strong ≥70 · Foundational ≥50 · Needs-focus <50
-- Patients see capability language; raw risk vocabulary is gated to staff.
-- ============================================================================
