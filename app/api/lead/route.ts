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
// Silent until GHL_API_TOKEN + GHL_LOCATION_ID are set in Vercel.
// ============================================================================
import { NextResponse } from "next/server"

const TOKEN = process.env.GHL_API_TOKEN
const LOCATION = process.env.GHL_LOCATION_ID
const WF_APPT = process.env.GHL_WORKFLOW_APPT
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
  leadSource?: Record<string, string>
}

const num = (v: number | null | undefined) => (typeof v === "number" && !isNaN(v) ? String(v) : "")

const URGENT = /pain|hurt|emergency|broke|swollen|bothering/i

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
    const pfAnswers = b.pf && Object.keys(b.pf).length
      ? Object.entries(b.pf).map(([k, v]) => `${k}: ${v}`).join(" · ")
      : ""

    const tags = [
      "Primary iD Lead",
      b.mode === "score" ? "Primary iD — Score Only" : "Primary iD — Appointment Request",
      priority === "urgent" ? "Priority: Urgent (in pain)" : null,
      b.pathway ? `Pathway: ${b.pathway}` : null,
      b.pathfinder ? "Pathfinder: implant intent" : null,
      b.pfTrack ? `Track: ${b.pfTrack}` : null,
      f.reason ? `Reason: ${f.reason}` : null,
      ...goals.map((g) => `Goal: ${g}`),
      b.phase === "complete" ? "Stage: Complete" : null,
      b.phase === "complete" && typeof b.composite === "number" ? `Score: ${b.composite}` : null,
      b.tier ? `Tier: ${b.tier}` : null,
      safety.length && safety[0] !== "None of these" ? "Safety: flagged" : null,
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
