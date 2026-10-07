"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────────────────
// The consult card on /dental-implant/: the Pathfinder, asked on the page.
//
// This is NOT a second quiz. It asks the one Pathfinder's own questions under
// the one Pathfinder's own ids, and sends them to the same place the booking
// flow does (POST /api/lead/, same shape, door "implants"). Spec P1-01 L4:
// no page runs its own quiz whose answers the flow never receives.
//
//   track "consult"    what  · where · pay
//   track "financing"  where · fin_applied · fin_help
//
// `what` and `where` are the live restorative track, word for word from the
// question bank. `pay`, `fin_applied` and `fin_help` are new unscored flags
// (bank v2.2). `what` shows one option the bank lists as proposed ("Most or
// all of my teeth are missing or failing") and leaves out the cosmetic one.
// Nothing here is scored (PF2). No track asks more than three (PF1).
//
// What it sends, and where it lands in GoHighLevel, is in app/api/lead/route.ts:
// the answers go to the existing pathfinder_answers field and to tags, so the
// request lands even before the three new custom fields are created.
//
// Accepted for now (7 Oct 2026), because this card is a direct request for a
// virtual consult and does not lead into the flow:
//   · PF3  the flow does not pick these answers up, so someone who later
//          starts /primary-id/ on their own is asked `what` and `where` again.
//   · G1   mobile is checked for ten digits here; email and last name, which
//          P1-06 requires, are not asked on this card.
// Settled:
//   · V3   the offer is a "complimentary virtual consult". The word "free" is
//          not used. The booking menu in the spec has no such visit yet.
// ─────────────────────────────────────────────────────────────────────────

const NAVY = "#0E2240"
const BLUE = "#24A7E0"
const WARM = "#FEFCF9"
const INK_SOFT = "#3a4a66"
const MUTED = "#7A8695"
const DANGER = "#D97757"
const LINE = "rgba(14,34,64,0.12)"
const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif"

// Texting consent. These two must stay word for word identical to CONSENT_VER
// and CONSENT_TEXT in public/primary-id-app.html: it is the wording filed with
// the carriers, and the version is stored with every lead. Change one, change
// both, and bump the version.
const CONSENT_VER = "v1-2026-09-15"
const CONSENT_TEXT = "I agree to receive text messages from Primary Integrative Dentistry at the mobile number I provided — my Primary iD results, appointment reminders and occasional care follow-ups. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of care."

type Step = { key: string; q: string; help?: string; options: string[] }
type TrackName = "consult" | "financing"
type Track = {
  /** pfTrack sent to /api/lead/. "restorative" is the live implants track. */
  pfTrack: string
  /** The button that brought them here, for attribution (spec P1-01 L3). */
  cta: string
  steps: Step[]
  submit: string
  note: string
  done: string
}

// Bank ids `where`, word for word. Shared by both tracks.
const WHERE: Step = {
  key: "where",
  q: "Where are you with it?",
  options: ["Just starting to look", "I've been told I need work", "I have a quote elsewhere", "Ready to move now"],
}

const TRACKS: Record<TrackName, Track> = {
  consult: {
    pfTrack: "restorative",
    cta: "virtual-consult",
    steps: [
      {
        key: "what",
        q: "What's going on?",
        options: [
          "A missing tooth or teeth",
          "Most or all of my teeth are missing or failing",
          "A tooth that's failing or loose",
          "Old work failing (crown / bridge / implant)",
          "Dentures I don't love",
        ],
      },
      WHERE,
      {
        key: "pay",
        q: "How are you thinking of paying?",
        help: "There is no wrong answer. It helps us bring the right options to your call.",
        options: ["I would pay in full", "I would want monthly payments", "A mix of both", "I'm not sure yet"],
      },
    ],
    submit: "Request my virtual consult",
    note: "We will call you to set a time.",
    done: "Thank you. We will call you to set a time.",
  },
  financing: {
    pfTrack: "financing",
    cta: "payment-options",
    steps: [
      WHERE,
      {
        key: "fin_applied",
        q: "Have you applied for financing for dental work before?",
        help: "A no from one lender is not a no from all of them.",
        options: ["No, not yet", "Yes, and I was approved", "Yes, but not for enough", "Yes, and I was turned down"],
      },
      {
        key: "fin_help",
        q: "What would help you most?",
        options: ["Monthly payments", "The Primary Scholarship", "Membership pricing", "I'm not sure. Walk me through it"],
      },
    ],
    submit: "Show me my options",
    note: "Our implant care coordinator will call you to go through them.",
    done: "Thank you. We will call you to go through your options.",
  },
}

// Requests that could not be sent are kept on this device and retried, the
// same way and under the same key as the booking flow (spec G6).
const OUTBOX = "pid:outbox"

async function send(body: unknown) {
  const r = await fetch("/api/lead/", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
  const j = await r.json()
  if (!j || j.success === false) throw new Error("not captured")
}
function hold(body: unknown) {
  try {
    const q = JSON.parse(localStorage.getItem(OUTBOX) || "[]")
    q.push(body)
    localStorage.setItem(OUTBOX, JSON.stringify(q.slice(-5)))
  } catch {}
}
async function flush() {
  let q: unknown[] = []
  try { q = JSON.parse(localStorage.getItem(OUTBOX) || "[]") } catch {}
  if (!q.length) return
  const left: unknown[] = []
  for (const b of q) { try { await send(b) } catch { left.push(b) } }
  try { localStorage.setItem(OUTBOX, JSON.stringify(left)) } catch {}
}

// Campaign tags from the address bar, plus the page and button (P1-01 L3).
function leadSource(cta: string) {
  const out: Record<string, string> = { from: "dental-implant", cta }
  try {
    const q = new URLSearchParams(window.location.search || "")
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"]) {
      const v = q.get(k)
      if (v) out[k] = v
    }
  } catch {}
  return out
}

export function VirtualConsult({ track = "consult" }: { track?: TrackName }) {
  const T = TRACKS[track]
  const STEPS = T.steps
  const LAST = STEPS.length // index of the contact step
  const DONE = STEPS.length + 1
  const id = (name: string) => `vc-${track}-${name}`
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  // One reference per card for the whole visit, so a second tap on Request
  // updates the same contact instead of making another (G5).
  const assessmentId = useRef("")

  useEffect(() => { void flush() }, [])

  const choose = (key: string, value: string) => {
    setAnswers(a => ({ ...a, [key]: value }))
    setStep(s => s + 1)
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (busy) return
    const data = new FormData(e.currentTarget)
    const firstName = String(data.get("firstName") || "").trim()
    const mobile = String(data.get("phone") || "").trim()
    const digits = mobile.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "")
    if (digits.length !== 10) { setPhoneError(true); return }
    setPhoneError(false)
    const consent = data.get("smsConsent") === "on"
    const at = new Date().toISOString()
    if (!assessmentId.current) assessmentId.current = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())

    const body = {
      mode: "appt",
      phase: "request",
      assessmentId: assessmentId.current,
      form: { firstName, mobile, reason: "Something to fix" },
      visit: "Virtual consult",
      idStatus: "Pathfinder",
      pathway: "implants",
      pathfinder: true,
      pfTrack: T.pfTrack,
      pf: answers,
      leadSource: leadSource(T.cta),
      smsConsent: consent
        ? { given: true, at, version: CONSENT_VER, text: CONSENT_TEXT, source: "/dental-implant/" }
        : { given: false, at, version: CONSENT_VER },
      context: "web",
    }

    setBusy(true)
    try { await send(body) } catch { hold(body) }
    setBusy(false)
    // The patient sees the confirmation either way (G6).
    setStep(DONE)
  }

  const label: React.CSSProperties = { fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: BLUE, margin: "0 0 10px" }
  const question: React.CSSProperties = { fontFamily: SERIF, fontSize: 24, fontWeight: 400, letterSpacing: "-0.015em", lineHeight: 1.2, color: NAVY, margin: "0 0 8px" }
  const option: React.CSSProperties = { display: "block", width: "100%", textAlign: "left", fontFamily: SANS, fontSize: 15.5, fontWeight: 500, lineHeight: 1.4, color: NAVY, background: "#FFFFFF", border: `1px solid ${LINE}`, borderRadius: 16, padding: "14px 18px", cursor: "pointer" }
  const input: React.CSSProperties = { display: "block", width: "100%", fontFamily: SERIF, fontSize: 16, color: NAVY, background: "#FFFFFF", border: `1px solid ${LINE}`, borderRadius: 8, padding: "12px 14px" }
  const back: React.CSSProperties = { fontFamily: SANS, fontSize: 13, fontWeight: 600, color: MUTED, background: "transparent", border: "none", padding: 0, marginTop: 18, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }

  return (
    <div className="vc" data-vc={track} style={{ background: WARM, border: `1px solid ${LINE}`, borderRadius: 24, padding: "28px 28px 26px", boxShadow: "0 24px 60px -28px rgba(14,34,64,0.28)" }}>
      {STEPS.map((s, i) => (
        <div key={s.key} data-vc-step={i} hidden={step !== i}>
          <p style={label}>Question {i + 1} of {STEPS.length}</p>
          <h3 style={question}>{s.q}</h3>
          {s.help ? <p style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.55, color: INK_SOFT, margin: "0 0 4px" }}>{s.help}</p> : null}
          <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
            {s.options.map(o => (
              <button key={o} type="button" className="vc-opt" data-vc-opt aria-pressed={answers[s.key] === o} onClick={() => choose(s.key, o)} style={option}>
                {o}
              </button>
            ))}
          </div>
          {i > 0 ? (
            <button type="button" data-vc-back onClick={() => setStep(i - 1)} style={back}>Back</button>
          ) : null}
        </div>
      ))}

      <form data-vc-step={LAST} hidden={step !== LAST} onSubmit={submit}>
        <p style={label}>Last step</p>
        <h3 style={question}>Where should we reach you?</h3>
        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <label htmlFor={id("name")} style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: NAVY }}>
            First name
            <input id={id("name")} name="firstName" type="text" autoComplete="given-name" required style={{ ...input, marginTop: 6 }} />
          </label>
          <label htmlFor={id("phone")} style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: NAVY }}>
            Mobile number
            <input id={id("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" required aria-invalid={phoneError} aria-describedby={phoneError ? id("phone-error") : undefined} style={{ ...input, marginTop: 6, borderColor: phoneError ? DANGER : LINE }} />
          </label>
          {phoneError ? (
            <p id={id("phone-error")} role="alert" style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: DANGER, margin: "-4px 0 0" }}>
              Please enter a ten-digit mobile number so we can call you.
            </p>
          ) : null}
          {/* Texting consent: starts unticked, and the request goes through either way (G2). */}
          <label htmlFor={id("sms")} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 10, alignItems: "start", fontFamily: SANS, fontSize: 12.5, lineHeight: 1.55, color: INK_SOFT, cursor: "pointer" }}>
            <input id={id("sms")} name="smsConsent" type="checkbox" style={{ width: 18, height: 18, marginTop: 2 }} />
            <span>
              {CONSENT_TEXT} See our <a href="/terms/" target="_blank" rel="noopener" style={{ color: NAVY }}>Terms</a> and <a href="/privacy/" target="_blank" rel="noopener" style={{ color: NAVY }}>Privacy Policy</a>.
            </span>
          </label>
        </div>
        <button type="submit" disabled={busy} style={{ display: "block", width: "100%", marginTop: 18, background: NAVY, color: "#FFFFFF", fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: "0.02em", border: "none", borderRadius: 999, padding: "15px 24px", cursor: busy ? "default" : "pointer", opacity: busy ? 0.7 : 1 }}>
          {busy ? "Sending" : T.submit}
        </button>
        <p style={{ fontFamily: SANS, fontSize: 12.5, lineHeight: 1.5, color: MUTED, margin: "12px 0 0" }}>
          {T.note}
        </p>
        <button type="button" data-vc-back onClick={() => setStep(LAST - 1)} style={{ ...back, marginTop: 12 }}>Back</button>
      </form>

      <div data-vc-step={DONE} hidden={step !== DONE} role="status">
        <p style={label}>Request received</p>
        <h3 style={question}>{T.done}</h3>
        <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.6, color: INK_SOFT, margin: "8px 0 0" }}>
          If you would rather talk now, call us at (310) 564-8990.
        </p>
      </div>

      <style>{`
        .vc-opt:hover { border-color: ${BLUE} !important; }
        .vc-opt[aria-pressed="true"] { border-color: ${NAVY} !important; box-shadow: inset 0 0 0 1px ${NAVY}; }
        .vc button:focus-visible, .vc input:focus-visible { outline: 3px solid ${BLUE}; outline-offset: 2px; }
      `}</style>
    </div>
  )
}
