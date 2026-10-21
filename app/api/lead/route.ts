// app/api/lead/route.ts
// ============================================================================
// Primary iD — LEAD capture.
//
// Covers the onboarding journey UP TO the five dimensions: identity, entry door,
// why they came, goals, intent, pathfinder track, and attribution.
// Called twice with the same assessment_id — once at the gate (so a drop-off is
// still a retained lead) and once at the dimension boundary (once intent is
// known). GHL upserts on email/phone, so it stays one contact.
//
// CLINICAL DATA PASSES THROUGH HERE (Sep 2026). Scores, safety flags, insurance,
// chief complaint and DOB/sex are written to GHL custom fields under the signed
// BAA. Free-text medical history (S.hist) is still NOT sent — it has no field to
// land in and no clinical consumer yet.
//
// Every WEB arrival is also placed on the "Primary iD Journey" pipeline as an
// opportunity, and only ever moved forward. See syncOpportunity below.
// Runs taken on a practice iPad (?ctx=clinic) are tagged "Source: In-clinic"
// and deliberately get NO opportunity — they are not lead acquisition.
//
// SMS CONSENT is captured at the gate and written on every phase as both a
// tag ("SMS Consent: Yes" / "SMS Consent: No") and four evidence fields.
// EVERY SMS workflow must filter on the tag. See /terms/ and /privacy/.
//
// THE IMPLANT PAGE'S CONSULT CARD POSTS HERE TOO (Oct 2026). It is the same
// Pathfinder asked on the page (spec P1-01 L4), door "implants", in two tracks:
//   pfTrack "restorative"  pf = { what, where, pay }
//   pfTrack "financing"    pf = { where, fin_applied, fin_help }
// `pay`, `fin_applied` and `fin_help` are unscored flags (bank v2.2). They
// reach GHL three ways, so the request lands whatever the location has set up:
// the existing pathfinder_answers field, tags, and three new custom fields
// (payment_intent, financing_history, help_wanted) once those exist.
//
// EXISTING PATIENTS (Oct 2026). `patientType: "existing"` comes from the
// existing patient mode of the flow (/welcome-back/, or "Get my Primary iD"
// after "I've been to Primary before"). Design: "1 Primary iD/Existing patient
// pathway.md" in the Primary iD Project; checks X1 to X8 in the handoff.
//   - Never on the Primary iD Journey board, never in a new patient workflow (R1).
//   - Its own pipeline, "Existing patient", found BY NAME with its stages
//     Started, Complete, Reviewed at visit, so nobody has to paste ids. Optional
//     override: GHL_EXISTING_PIPELINE_ID. Unlike the Journey board, runs taken in
//     the office DO get a card here: this board counts Primary iDs, not leads.
//   - "Needs a call" is the one tag the front desk's GoHighLevel workflow
//     watches: in pain, asked to book, or under 18.
//   - On completion the full answers are kept on the contact as a note.
//
// THE ALIGNER DOOR'S SMILE QUIZ (Oct 2026). Door "aligners" (was "orthofx").
// Questions 1 to 3 ride in `pf` (what = the aligner goal, wear_tolerance,
// ortho_history) and land in pathfinder_answers as before. Questions 4 to 8
// ride in `align` (smile_case, retainer_wear, between_meals, wear_obstacles,
// ready_by, and smile_pick from the aligner page's picker) and land in one
// single-line field, smile_profile, once Mila creates it in GHL. Five tags make
// them countable: Aligner goal, Braces before, Wear: put it off, Ready within 6
// months, Smile pick. "Aligner: in treatment elsewhere" means call, not book.
// No aligner answer goes to OrthoFX or to any ad platform. Design: "1 Primary
// iD/New patient journey/OrthoFX door journey.md" in the Primary iD Project.
//
// Silent until GHL_API_TOKEN + GHL_LOCATION_ID are set in Vercel.
// ============================================================================
import { NextResponse } from "next/server"

const TOKEN = process.env.GHL_API_TOKEN
const LOCATION = process.env.GHL_LOCATION_ID
const WF_APPT = process.env.GHL_WORKFLOW_APPT

// The Primary iD Journey pipeline. Hard-coded with an env override so this
// works without a Vercel change; these are location-scoped object ids, not
// secrets. Created 17 Sep 2026 — before that, 32 patients had arrived and not
// one existed as an opportunity, so nothing in GHL knew where anybody was.
const PIPELINE = process.env.GHL_PIPELINE_ID || "YIyCuqxNh4mc9NHrh0gx"
// Stage ids in board order. Index matters: we only ever move a card FORWARD.
const STAGES = [
  "d665d267-0cde-4e4b-a8f6-d032f5618694", // 0 New — assessment started
  "00f5aa93-52c0-47c2-8d6a-c4820133cd09", // 1 Assessment complete
  "0c7cb0cc-a880-4d1d-9bd5-4fc8e17a6e9c", // 2 Contacted
  "5233b0b4-b246-4764-abf6-bca33f496ad4", // 3 Appointment booked
  "8580bd59-8c6a-4880-9adc-4267d405b385", // 4 Seen
  "ebb09e99-7c99-4bee-8b08-6f83c1e58a38", // 5 Treatment planned
]
const WF_SCORE = process.env.GHL_WORKFLOW_SCORE
// Preview and development builds never write to the live pipeline (spec: Agents
// · Test). The GHL keys are production-only in Vercel today; this holds even if
// someone later adds them to Preview. VERCEL_ENV is unset locally, so local dev
// stays silent too.
const LIVE = Boolean(TOKEN && LOCATION) && process.env.VERCEL_ENV === "production"

const H = {
  Authorization: `Bearer ${TOKEN}`,
  Version: "2021-07-28",
  "Content-Type": "application/json",
  Accept: "application/json",
}

type Body = {
  mode?: "appt" | "score"
  phase?: string
  assessmentId?: string
  form?: {
    firstName?: string; lastName?: string; email?: string
    mobile?: string; age?: string; reason?: string; reasonDetail?: string
  }
  // Spec P1-03 to P1-07, from the request screens.
  newOrReturning?: string
  need?: string
  inPain?: boolean
  visit?: string
  partner?: string
  bestTime?: string
  days?: string[]
  note?: string
  bridge?: string
  idStatus?: string
  history?: string
  pathway?: string
  goals?: string[]
  intent?: string
  pathfinder?: boolean
  pfTrack?: string
  pf?: Record<string, string>
  align?: { smile_pick?: string; smile_case?: string[]; retainer_wear?: string; between_meals?: string; wear_obstacles?: string[]; ready_by?: string }
  entryDim?: string
  scores?: { oral?: number | null; sleep?: number | null; nutri?: number | null; family?: number | null; long?: number | null }
  composite?: number | null
  tier?: string
  safety?: string[]
  complaint?: string
  insurance?: { type?: string; carrier?: string; member?: string }
  records?: { pcp?: string; other?: string; labs?: string; platforms?: string }
  demo?: { dob?: string; sex?: string; address?: string }
  smsConsent?: { given?: boolean; at?: string; version?: string; text?: string; source?: string }
  context?: string
  odPatNum?: string
  leadSource?: Record<string, string>
  // Existing patient mode.
  patientType?: string
  wantsVisit?: boolean
  minor?: boolean
  answers?: { dim?: string; score?: number | null; items?: [string, string][] }[]
}

const num = (v: number | null | undefined) => (typeof v === "number" && !isNaN(v) ? String(v) : "")

const URGENT = /pain|hurt|emergency|broke|swollen|bothering/i

// ---------------------------------------------------------------------------
// Put the arrival on the board, and keep it there.
//
// A tagged contact is a record; an opportunity is a position in a journey.
// Without this, someone can complete forty questions and still be invisible to
// anyone looking at GHL to answer "where is this patient?".
//
// THE RULE THAT MATTERS: only ever move a card FORWARD. The engine fires nine
// upserts per completed run. Without the index check, a card a human had
// dragged to Contacted or Appointment booked would snap back to Assessment
// complete on the next one, and the board would quietly lie about the work
// the practice had actually done.
//
// Failures here are swallowed. A pipeline write must never cost us the lead.
async function syncOpportunity(
  contactId: string,
  name: string,
  pathway: string,
  complete: boolean,
  board: { id: string; stages: string[] } = { id: PIPELINE, stages: STAGES },
) {
  const wantIdx = complete ? 1 : 0
  const label = `${name || "Unnamed"}${pathway ? ` — ${pathway.replace(/_/g, " ")}` : ""}`
  try {
    const q = await fetch(
      `https://services.leadconnectorhq.com/opportunities/search?location_id=${LOCATION}` +
        `&pipeline_id=${board.id}&contact_id=${contactId}&limit=1`,
      { headers: H },
    )
    const existing = q.ok ? (await q.json())?.opportunities?.[0] : null

    if (!existing) {
      await fetch("https://services.leadconnectorhq.com/opportunities/", {
        method: "POST",
        headers: H,
        body: JSON.stringify({
          pipelineId: board.id,
          locationId: LOCATION,
          pipelineStageId: board.stages[wantIdx],
          name: label,
          status: "open",
          contactId,
        }),
      })
      return
    }

    // Someone already moved this person along, or closed them out. Leave it.
    const atIdx = board.stages.indexOf(existing.pipelineStageId)
    if (existing.status !== "open" || atIdx < 0 || atIdx >= wantIdx) return

    await fetch(`https://services.leadconnectorhq.com/opportunities/${existing.id}`, {
      method: "PUT",
      headers: H,
      body: JSON.stringify({ pipelineStageId: board.stages[wantIdx], name: label }),
    })
  } catch (e) {
    console.error("[lead] opportunity sync failed:", e)
  }
}

// ---------------------------------------------------------------------------
// The "Existing patient" pipeline, found by name so it works the moment someone
// creates it in GoHighLevel. Stage order matters (cards only move forward):
// Started, Complete, Reviewed at visit. The code never moves a card to the
// third stage; people do that at the visit.
//
// Looked up at most every ten minutes per server instance. Missing pipeline or
// stages: logged, and the contact and tags still land.
const EXISTING_PIPELINE_NAME = "existing patient"
const EXISTING_STAGE_NAMES = ["started", "complete", "reviewed at visit"]
let existingBoard: { id: string; stages: string[] } | null = null
let existingCheckedAt = 0
const norm = (s: unknown) =>
  String(s ?? "").toLowerCase().replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim().replace(/s$/, "")

async function findExistingBoard(): Promise<{ id: string; stages: string[] } | null> {
  if (existingBoard || Date.now() - existingCheckedAt < 10 * 60 * 1000) return existingBoard
  existingCheckedAt = Date.now()
  try {
    const r = await fetch(
      `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${LOCATION}`,
      { headers: H },
    )
    if (!r.ok) {
      console.error(`[lead] pipelines ${r.status}`)
      return null
    }
    type Stage = { id?: string; name?: string }
    type Pipe = { id?: string; name?: string; stages?: Stage[] }
    const list: Pipe[] = (await r.json())?.pipelines ?? []
    const override = process.env.GHL_EXISTING_PIPELINE_ID
    const p = override
      ? list.find((x) => x.id === override)
      : list.find((x) => norm(x.name) === norm(EXISTING_PIPELINE_NAME))
    if (!p?.id) {
      console.error('[lead] no "Existing patient" pipeline in GoHighLevel yet: create it to track existing patients')
      return null
    }
    const stages = EXISTING_STAGE_NAMES.map(
      (n) => (p.stages ?? []).find((s) => norm(s.name) === norm(n))?.id ?? "",
    )
    if (stages.some((s) => !s)) {
      console.error('[lead] the "Existing patient" pipeline needs the stages Started, Complete, Reviewed at visit')
      return null
    }
    existingBoard = { id: p.id, stages }
    return existingBoard
  } catch (e) {
    console.error("[lead] pipeline lookup failed:", e)
    return null
  }
}

// The finished Primary iD, as one note on the GoHighLevel contact (BAA-covered).
// Phase 2 writes the same text into the Open Dental chart.
const line = (v: unknown, max = 300) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max)
function primaryIdNote(b: Body, priority: string, invite: string): string {
  const L: string[] = []
  L.push("Primary iD: completed (current patient)")
  L.push("Directional, not a diagnosis. Confirm at the visit.")
  L.push(`Taken: ${b.context === "clinic" ? "in the office" : "online"} · Invite: ${invite}`)
  if (priority === "urgent") L.push("Something is bothering them now (asked before the five dimensions).")
  if (b.wantsVisit) L.push("Asked for their next visit to be booked.")
  if (typeof b.composite === "number") L.push(`Overall: ${b.composite}${b.tier ? ` (${line(b.tier, 40)})` : ""}`)
  const goals = Array.isArray(b.goals) ? b.goals.filter(Boolean).map((g) => line(g, 60)) : []
  if (goals.length) L.push(`What matters to them: ${goals.join(", ")}`)
  if (b.intent) L.push(`If nothing changes in a year: ${line(b.intent, 80)}`)
  if (b.complaint) L.push(`In their words: ${line(b.complaint, 600)}`)
  const safety = Array.isArray(b.safety) ? b.safety.filter(Boolean).map((s) => line(s, 80)) : []
  L.push(`Safety check: ${safety.length ? safety.join(", ") : "not answered"}`)
  if (b.records?.other) L.push(`They added: ${line(b.records.other, 300)}`)
  for (const d of Array.isArray(b.answers) ? b.answers.slice(0, 10) : []) {
    L.push("")
    L.push(`${line(d?.dim, 40)}${typeof d?.score === "number" ? ` (${d.score})` : ""}`)
    for (const it of Array.isArray(d?.items) ? d.items.slice(0, 12) : []) {
      if (Array.isArray(it)) L.push(`- ${line(it[0], 160)} ${line(it[1], 80)}`)
    }
  }
  if (b.history) {
    L.push("")
    L.push(`Dental and health history: ${line(b.history, 1500)}`)
  }
  const rec = b.records ?? {}
  const recBits = [rec.pcp ? `primary care doctor: ${line(rec.pcp, 20)}` : "", rec.labs ? `labs: ${line(rec.labs, 30)}` : "",
    rec.platforms ? `platforms: ${line(Array.isArray(rec.platforms) ? (rec.platforms as unknown as string[]).join(", ") : rec.platforms, 80)}` : ""].filter(Boolean)
  if (recBits.length) L.push(`Records: ${recBits.join(" · ")}`)
  return L.join("\n").slice(0, 9000)
}

export async function POST(request: Request) {
  try {
    const b: Body = await request.json()
    const f = b.form ?? {}
    const src = b.leadSource ?? {}
    const assessmentId = b.assessmentId || crypto.randomUUID()

    // Urgency is derived server-side. Never trust the client for routing.
    // P1-04: the in-pain answer, the pain door, or a reason that names pain.
    const priority =
      b.inPain === true || URGENT.test(f.reason ?? "") || b.pathway === "pain" ? "urgent" : "normal"
    // R1: a returning patient never lands on the new patient pipeline or in a
    // marketing sequence. Tagged for the front desk instead.
    // Existing patient mode is also returning, so R1 holds for it everywhere below.
    const isExisting = b.patientType === "existing"
    const isReturning = b.newOrReturning === "returning" || isExisting
    // Once the Primary iD is complete, every later save says so too. A tag or a
    // stage that only rides on the "complete" call is lost if another save
    // lands after it.
    const isComplete = b.phase === "complete" || b.idStatus === "Complete"
    const clip = (v?: string) => (v ?? "").replace(/[^\w\-\/.·$ ]/g, "").trim().slice(0, 80)


    const goals = Array.isArray(b.goals) ? b.goals.filter(Boolean) : []
    const sc = b.scores ?? {}
    const safety = Array.isArray(b.safety) ? b.safety.filter(Boolean) : []
    const ins = b.insurance ?? {}
    const rec = b.records ?? {}
    const demo = b.demo ?? {}
    const consent = b.smsConsent ?? {}
    const consentGiven = consent.given === true
    // Filled in on a practice iPad while the person is already in the chair.
    const inClinic = b.context === "clinic"
    // The spec's one test patient. Tagged so the contact and card never count as
    // a lead in reports, and every marketing workflow can filter it out.
    const isTest =
      (f.firstName ?? "").trim().toLowerCase() === "alex" &&
      (f.lastName ?? "").trim().toLowerCase() === "rivera"
    // Existing patients: how the invitation reached them, and whether the front
    // desk needs to call (in pain, asked to book, or under 18). "Needs a call" is
    // the single tag the front desk's GoHighLevel workflow watches.
    const invite = inClinic ? "In office"
      : /sms|text/i.test(src.utm_source ?? "") ? "Text"
      : /mail/i.test(src.utm_source ?? "") ? "Email" : "Website"
    const wantsVisit = isExisting && (b.wantsVisit === true || b.phase === "visit-request")
    const isMinor = isExisting && b.minor === true
    const needsCall = isExisting && (priority === "urgent" || wantsVisit || isMinor)
    // Where they came from (spec P1-01 L3). Kept to tags and the source line:
    // both always land, whereas a custom field missing in GHL sinks the whole upsert.
    const fromPage = clip(src.from)
    const fromCta = clip(src.cta)
    const pfAnswers = b.pf && Object.keys(b.pf).length
      ? Object.entries(b.pf).map(([k, v]) => `${k}: ${v}`).join(" · ")
      : ""
    // How they plan to pay, and what happened if they have tried financing.
    // Asked on the implant page's consult card. Not clinical, never a gate:
    // every answer still gets a call. Read only for the tags below.
    const pay = b.pf?.pay ?? ""
    const finApplied = b.pf?.fin_applied ?? ""
    const finHelp = b.pf?.fin_help ?? ""
    const wantsMonthly = /monthly|mix/i.test(pay) || /monthly/i.test(finHelp)
    // The aligner door (smile quiz). Unscored flags; read only for tags and one field.
    const isAlign = b.pfTrack === "alignment"
    const al: NonNullable<Body["align"]> = isAlign && b.align ? b.align : {}
    const ortho = isAlign ? b.pf?.ortho_history ?? "" : ""
    const smileProfile = isAlign
      ? [
          al.smile_case?.length ? `Sees: ${al.smile_case.join("; ")}` : "",
          al.retainer_wear ? `Retainer: ${al.retainer_wear}` : "",
          al.between_meals ? `Between meals: ${al.between_meals}` : "",
          al.wear_obstacles?.length ? `In the way: ${al.wear_obstacles.join(", ")}` : "",
          al.ready_by ? `Ready by: ${al.ready_by}` : "",
          al.smile_pick ? `Picked on the page: ${al.smile_pick}` : "",
        ].filter(Boolean).join(" · ").slice(0, 500)
      : ""

    const tags = [
      isReturning ? "Existing patient" : "Primary iD Lead",
      isExisting ? "Primary iD: existing patient"
        : isReturning ? "Primary iD — Existing patient request"
        : b.mode === "score" ? "Primary iD — Score Only" : "Primary iD — Appointment Request",
      b.newOrReturning ? `Patient: ${isReturning ? "Returning" : "New"}` : null,
      isExisting ? `Invite: ${invite}` : null,
      needsCall ? "Needs a call" : null,
      wantsVisit ? "Wants a visit" : null,
      isMinor ? "Under 18" : null,
      b.visit ? `Visit: ${clip(b.visit)}` : null,
      b.partner ? `Partner: ${clip(b.partner)}` : null,
      b.bridge ? `Bridge: ${clip(b.bridge)}` : null,
      priority === "urgent" ? "Priority: Urgent (in pain)" : null,
      b.pathway ? `Pathway: ${b.pathway}` : null,
      b.pathfinder && b.pfTrack === "secondop" ? "Pathfinder: second opinion" : null,
      b.pathfinder && b.pfTrack === "alignment" ? "Pathfinder: alignment" : null,
      b.pathfinder && (!b.pfTrack || b.pfTrack === "restorative") ? "Pathfinder: implant intent" : null,
      b.pathfinder && b.pfTrack === "financing" ? "Pathfinder: financing need" : null,
      /pay in full/i.test(pay) ? "Pay: In full" : null,
      wantsMonthly ? "Pay: Monthly payments" : null,
      /turned down/i.test(finApplied) ? "Financing: Turned down before" : null,
      /not for enough/i.test(finApplied) ? "Financing: Approved short before" : null,
      /scholarship/i.test(finHelp) ? "Interest: Primary Scholarship" : null,
      /membership/i.test(finHelp) ? "Interest: Membership pricing" : null,
      b.pfTrack ? `Track: ${b.pfTrack}` : null,
      isAlign && b.pf?.what ? `Aligner goal: ${clip(b.pf.what)}` : null,
      /as a teenager|as an adult/i.test(ortho) ? "Braces before" : null,
      /in treatment now/i.test(ortho) ? "Aligner: in treatment elsewhere" : null,
      isAlign && /put treatment off/i.test(b.pf?.wear_tolerance ?? "") ? "Wear: put it off" : null,
      isAlign && al.ready_by === "Within six months" ? "Ready within 6 months" : null,
      isAlign && al.smile_pick ? `Smile pick: ${clip(al.smile_pick)}` : null,
      f.reason ? `Reason: ${f.reason}` : null,
      ...goals.map((g) => `Goal: ${g}`),
      isComplete ? "Stage: Complete" : null,
      isComplete && typeof b.composite === "number" ? `Score: ${b.composite}` : null,
      b.tier ? `Tier: ${b.tier}` : null,
      safety.length && safety[0] !== "None of these" ? "Safety: flagged" : null,
      // The tag every SMS workflow must filter on. Absence of
      // "SMS Consent: Yes" is the only thing standing between a bulk send
      // and a TCPA claim, so it is written on EVERY phase, not just the gate.
      consentGiven ? "SMS Consent: Yes" : "SMS Consent: No",
      inClinic ? "Source: In-clinic" : null,
      isTest ? "Test contact" : null,
      fromPage ? `From: ${fromPage}` : null,
      fromCta ? `CTA: ${fromCta}` : null,
      src.utm_term ? `UTM term: ${clip(src.utm_term)}` : null,
      src.gclid ? "Ad click: Google" : null,
      src.fbclid ? "Ad click: Meta" : null,
    ].filter(Boolean) as string[]

    const customFields = [
      { key: "assessment_id",   field_value: assessmentId },
      { key: "primary_id_mode", field_value: b.mode ?? "appt" },
      { key: "pathway",         field_value: b.pathway ?? "" },
      { key: "reason_for_visit",field_value: [f.reason, f.reasonDetail, b.need].filter(Boolean).join(" — ") },
      { key: "priority",        field_value: priority },
      { key: "age",             field_value: f.age ?? "" },
      { key: "goals",           field_value: goals.join(", ") },
      { key: "intent",          field_value: b.intent ?? "" },
      { key: "lead_source",     field_value: src.utm_source ?? "direct" },
      { key: "utm_campaign",    field_value: src.utm_campaign ?? "" },
      { key: "utm_medium",      field_value: src.utm_medium ?? "" },
      { key: "utm_content",     field_value: src.utm_content ?? "" },
      { key: "entry_dimension", field_value: b.entryDim ?? "" },
      { key: "pathfinder_answers", field_value: pfAnswers },

      // --- clinical (BAA-covered) ---------------------------------------
      { key: "primary_id_score",  field_value: num(b.composite) },
      { key: "primary_id_tier",   field_value: b.tier ?? "" },
      { key: "score_oral",        field_value: num(sc.oral) },
      { key: "score_sleep",       field_value: num(sc.sleep) },
      { key: "score_nutrition",   field_value: num(sc.nutri) },
      { key: "score_family",      field_value: num(sc.family) },
      { key: "score_longevity",   field_value: num(sc.long) },
      { key: "safety_flags",      field_value: safety.join(", ") },
      { key: "chief_complaint",   field_value: b.complaint ?? "" },
      { key: "insurance_type",    field_value: ins.type ?? "" },
      { key: "insurance_carrier", field_value: ins.carrier ?? "" },
      { key: "insurance_member",  field_value: ins.member ?? "" },
      { key: "dob",               field_value: demo.dob ?? "" },
      { key: "legal_sex",         field_value: demo.sex ?? "" },
      { key: "records_pcp",       field_value: rec.pcp ?? "" },
      { key: "records_notes",     field_value: [rec.other, rec.labs, rec.platforms].filter(Boolean).join(" · ") },

      // --- SMS consent (A2P 10DLC evidence) ------------------------------
      // Stored as the decision, the moment, and the exact wording shown.
      // Carriers and plaintiffs both ask the same question: what did this
      // person actually agree to, and when. These three fields answer it.
      { key: "sms_consent",       field_value: consentGiven ? "yes" : "no" },
      { key: "sms_consent_at",    field_value: consent.at ?? "" },
      { key: "sms_consent_text",  field_value: consentGiven ? `[${consent.version ?? ""}] ${consent.text ?? ""}`.trim() : "" },
      { key: "sms_consent_source",field_value: consent.source ?? "" },

      // Where the assessment was taken, and the exact chart it belongs to.
      { key: "visit_context",     field_value: inClinic ? "clinic" : "web" },
      { key: "opendental_patnum",field_value: b.odPatNum ?? "" },
    ].filter((x) => x.field_value !== "")

    // Phase 1 spec fields (P1-03 to P1-08). These keys must exist in GHL before
    // they land; until they do, the upsert below falls back to the fields above,
    // and the tags carry the essentials so the call can still be made.
    const specFields = [
      { key: "new_or_returning",  field_value: b.newOrReturning ?? "" },
      { key: "visit_to_book",     field_value: b.visit ?? "" },
      { key: "best_time_to_call", field_value: [b.bestTime, (b.days ?? []).join(", ")].filter(Boolean).join(" · ") },
      { key: "patient_note",      field_value: (b.note ?? "").slice(0, 200) },
      { key: "primary_id_status", field_value: b.idStatus ?? "" },
      { key: "dental_history",    field_value: b.history ?? "" },
      { key: "partner_referral",  field_value: b.partner ?? "" },
      // The implant page's consult card. Create these three in GHL (single-line
      // text) and they fill in; until then the tags and pathfinder_answers carry them.
      { key: "payment_intent",    field_value: pay },
      { key: "financing_history", field_value: finApplied },
      { key: "help_wanted",       field_value: finHelp },
      // The aligner door's Your smile answers (questions 4 to 8). Single-line text.
      { key: "smile_profile",     field_value: smileProfile },
    ].filter((x) => x.field_value !== "")

    const base = {
      locationId: LOCATION,
      firstName: f.firstName || undefined,
      lastName: f.lastName || undefined,
      email: f.email || undefined,
      phone: f.mobile || undefined,
      address1: demo.address || undefined,
      source: `Primary iD onboarding — ${b.pathway || "general"}${fromPage ? ` · from ${fromPage}` : ""}`,
      tags,
    }

    // The full Primary iD, kept on the contact once, when an existing patient finishes.
    const noteText =
      isExisting && b.phase === "complete" && Array.isArray(b.answers) && b.answers.length
        ? primaryIdNote(b, priority, invite)
        : ""

    // Preview and local builds: write nothing, and hand back exactly what would
    // have been sent so a test run can check every field and tag against the spec.
    if (!LIVE) {
      return NextResponse.json({
        success: true, assessmentId, crm: false, priority,
        dryRun: { phase: b.phase ?? "", contact: base, customFields: [...customFields, ...specFields],
          note: noteText || undefined },
      })
    }

    async function upsert(payload: unknown) {
      const res = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
        method: "POST",
        headers: H,
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`${res.status}: ${(await res.text()).slice(0, 300)}`)
      return (await res.json())?.contact?.id ?? null
    }

    let contactId: string | null = null
    try {
      // Try the full record first. If GHL rejects it — most likely because a
      // custom field key does not exist in this location yet — fall back to
      // contact + tags so the LEAD IS NEVER LOST. Tags alone still drive the
      // workflows, so capture degrades gracefully instead of failing shut.
      try {
        contactId = await upsert({ ...base, customFields: [...customFields, ...specFields] })
      } catch (specErr) {
        console.error("[lead] upsert with spec fields failed, retrying without them:", specErr)
        try {
          contactId = await upsert({ ...base, customFields })
          console.error("[lead] captured WITHOUT the phase 1 spec fields — create them in GHL")
        } catch (fieldErr) {
          console.error("[lead] upsert with customFields failed, retrying tags-only:", fieldErr)
          contactId = await upsert(base)
          console.error("[lead] captured WITHOUT custom fields")
        }
      }

      // Track the arrival on the board. Runs on every phase so a drop-off
      // still appears, and a completion is promoted the moment it lands.
      //
      // IN-CLINIC RUNS GET NO OPPORTUNITY. The Primary iD Journey board is a
      // record of lead acquisition. Someone already sitting in the chair was
      // not acquired, and putting them in "New — assessment started" makes the
      // board misreport where the practice's new patients actually come from.
      // Their contact, scores, tags and fields all still land — only the card
      // is withheld. Find them by the "Source: In-clinic" tag.
      //
      // EXISTING PATIENTS go on their own board instead, in the office too: it
      // counts Primary iDs, not leads. Not for under-18s, who stop at the front
      // desk and would sit at Started for ever.
      if (contactId && isExisting) {
        if (!isMinor) {
          const board = await findExistingBoard()
          if (board) {
            await syncOpportunity(
              contactId,
              (isTest ? "TEST · " : "") + [f.firstName, f.lastName].filter(Boolean).join(" "),
              "existing patient",
              isComplete,
              board,
            )
          }
        }
        if (noteText) {
          try {
            const n = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
              method: "POST",
              headers: H,
              body: JSON.stringify({ body: noteText }),
            })
            if (!n.ok) console.error(`[lead] note ${n.status}`)
          } catch (e) {
            console.error("[lead] note failed:", e)
          }
        }
      } else if (contactId && !inClinic && !isReturning) {
        await syncOpportunity(
          contactId,
          (isTest ? "TEST · " : "") + [f.firstName, f.lastName].filter(Boolean).join(" "),
          b.pathway ?? "",
          isComplete,
        )
      }

      // Enrol only on the request, so re-sends don't double-enrol. ("gate" is the
      // pre-spec name for the same moment.)
      const wf = b.mode === "score" ? WF_SCORE : WF_APPT
      if (contactId && wf && !isReturning && (b.phase === "request" || b.phase === "gate")) {
        const w = await fetch(
          `https://services.leadconnectorhq.com/contacts/${contactId}/workflow/${wf}`,
          { method: "POST", headers: H, body: JSON.stringify({}) },
        )
        if (!w.ok) console.error(`[lead] workflow ${w.status}: ${await w.text()}`)
      }
    } catch (e) {
      console.error("[lead] ghl error:", e)
    }

    // G6: if nothing reached GHL, say so; the browser holds the request and retries.
    return NextResponse.json({ success: Boolean(contactId), assessmentId, contactId, crm: true, priority })
  } catch (error) {
    console.error("[lead] error:", error)
    // Never block the patient. A failed lead write is our problem, not theirs.
    return NextResponse.json({ success: false }, { status: 200 })
  }
}
