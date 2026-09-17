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
// Every arrival is also placed on the "Primary iD Journey" pipeline as an
// opportunity, and only ever moved forward. See syncOpportunity below.
//
// SMS CONSENT is captured at the gate and written on every phase as both a
// tag ("SMS Consent: Yes" / "SMS Consent: No") and four evidence fields.
// EVERY SMS workflow must filter on the tag. See /terms/ and /privacy/.
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
const LIVE = Boolean(TOKEN && LOCATION)

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
    mobile?: string; age?: string; reason?: string
  }
  pathway?: string
  goals?: string[]
  intent?: string
  pathfinder?: boolean
  pfTrack?: string
  pf?: Record<string, string>
  entryDim?: string
  scores?: { oral?: number | null; sleep?: number | null; nutri?: number | null; family?: number | null; long?: number | null }
  composite?: number | null
  tier?: string
  safety?: string[]
  complaint?: string
  insurance?: { type?: string; carrier?: string; member?: string }
  records?: { pcp?: string; other?: string; labs?: string; platforms?: string }
  demo?: { dob?: string; sex?: string }
  smsConsent?: { given?: boolean; at?: string; version?: string; text?: string; source?: string }
  leadSource?: Record<string, string>
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
) {
  const wantIdx = complete ? 1 : 0
  const label = `${name || "Unnamed"}${pathway ? ` — ${pathway.replace(/_/g, " ")}` : ""}`
  try {
    const q = await fetch(
      `https://services.leadconnectorhq.com/opportunities/search?location_id=${LOCATION}` +
        `&pipeline_id=${PIPELINE}&contact_id=${contactId}&limit=1`,
      { headers: H },
    )
    const existing = q.ok ? (await q.json())?.opportunities?.[0] : null

    if (!existing) {
      await fetch("https://services.leadconnectorhq.com/opportunities/", {
        method: "POST",
        headers: H,
        body: JSON.stringify({
          pipelineId: PIPELINE,
          locationId: LOCATION,
          pipelineStageId: STAGES[wantIdx],
          name: label,
          status: "open",
          contactId,
        }),
      })
      return
    }

    // Someone already moved this person along, or closed them out. Leave it.
    const atIdx = STAGES.indexOf(existing.pipelineStageId)
    if (existing.status !== "open" || atIdx < 0 || atIdx >= wantIdx) return

    await fetch(`https://services.leadconnectorhq.com/opportunities/${existing.id}`, {
      method: "PUT",
      headers: H,
      body: JSON.stringify({ pipelineStageId: STAGES[wantIdx], name: label }),
    })
  } catch (e) {
    console.error("[lead] opportunity sync failed:", e)
  }
}

export async function POST(request: Request) {
  try {
    const b: Body = await request.json()
    const f = b.form ?? {}
    const src = b.leadSource ?? {}
    const assessmentId = b.assessmentId || crypto.randomUUID()

    // Urgency is derived server-side. Never trust the client for routing.
    const priority =
      URGENT.test(f.reason ?? "") || b.pathway === "pain" ? "urgent" : "normal"

    if (!LIVE) {
      return NextResponse.json({ success: true, assessmentId, crm: false, priority })
    }

    const goals = Array.isArray(b.goals) ? b.goals.filter(Boolean) : []
    const sc = b.scores ?? {}
    const safety = Array.isArray(b.safety) ? b.safety.filter(Boolean) : []
    const ins = b.insurance ?? {}
    const rec = b.records ?? {}
    const demo = b.demo ?? {}
    const consent = b.smsConsent ?? {}
    const consentGiven = consent.given === true
    const pfAnswers = b.pf && Object.keys(b.pf).length
      ? Object.entries(b.pf).map(([k, v]) => `${k}: ${v}`).join(" · ")
      : ""

    const tags = [
      "Primary iD Lead",
      b.mode === "score" ? "Primary iD — Score Only" : "Primary iD — Appointment Request",
      priority === "urgent" ? "Priority: Urgent (in pain)" : null,
      b.pathway ? `Pathway: ${b.pathway}` : null,
      b.pathfinder && b.pfTrack === "secondop" ? "Pathfinder: second opinion" : null,
      b.pathfinder && b.pfTrack === "alignment" ? "Pathfinder: alignment" : null,
      b.pathfinder && (!b.pfTrack || b.pfTrack === "restorative") ? "Pathfinder: implant intent" : null,
      b.pfTrack ? `Track: ${b.pfTrack}` : null,
      f.reason ? `Reason: ${f.reason}` : null,
      ...goals.map((g) => `Goal: ${g}`),
      b.phase === "complete" ? "Stage: Complete" : null,
      b.phase === "complete" && typeof b.composite === "number" ? `Score: ${b.composite}` : null,
      b.tier ? `Tier: ${b.tier}` : null,
      safety.length && safety[0] !== "None of these" ? "Safety: flagged" : null,
      // The tag every SMS workflow must filter on. Absence of
      // "SMS Consent: Yes" is the only thing standing between a bulk send
      // and a TCPA claim, so it is written on EVERY phase, not just the gate.
      consentGiven ? "SMS Consent: Yes" : "SMS Consent: No",
    ].filter(Boolean) as string[]

    const customFields = [
      { key: "assessment_id",   field_value: assessmentId },
      { key: "primary_id_mode", field_value: b.mode ?? "appt" },
      { key: "pathway",         field_value: b.pathway ?? "" },
      { key: "reason_for_visit",field_value: f.reason ?? "" },
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
    ].filter((x) => x.field_value !== "")

    const base = {
      locationId: LOCATION,
      firstName: f.firstName || undefined,
      lastName: f.lastName || undefined,
      email: f.email || undefined,
      phone: f.mobile || undefined,
      source: `Primary iD onboarding — ${b.pathway || "general"}`,
      tags,
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
        contactId = await upsert({ ...base, customFields })
      } catch (fieldErr) {
        console.error("[lead] upsert with customFields failed, retrying tags-only:", fieldErr)
        contactId = await upsert(base)
        console.error("[lead] captured WITHOUT custom fields — run ghl-create-fields.mjs")
      }

      // Track the arrival on the board. Runs on every phase so a drop-off
      // still appears, and a completion is promoted the moment it lands.
      if (contactId) {
        await syncOpportunity(
          contactId,
          [f.firstName, f.lastName].filter(Boolean).join(" "),
          b.pathway ?? "",
          b.phase === "complete",
        )
      }

      // Enrol only on the first (gate) call, so re-sends don't double-enrol.
      const wf = b.mode === "score" ? WF_SCORE : WF_APPT
      if (contactId && wf && b.phase === "gate") {
        const w = await fetch(
          `https://services.leadconnectorhq.com/contacts/${contactId}/workflow/${wf}`,
          { method: "POST", headers: H, body: JSON.stringify({}) },
        )
        if (!w.ok) console.error(`[lead] workflow ${w.status}: ${await w.text()}`)
      }
    } catch (e) {
      console.error("[lead] ghl error:", e)
    }

    return NextResponse.json({ success: true, assessmentId, contactId, crm: true, priority })
  } catch (error) {
    console.error("[lead] error:", error)
    // Never block the patient. A failed lead write is our problem, not theirs.
    return NextResponse.json({ success: false }, { status: 200 })
  }
}
