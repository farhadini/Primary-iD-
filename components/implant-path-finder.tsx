"use client"

/**
 * The Implant Path Finder.
 * 8-question pre-qualifier specifically for full-arch / implant traffic.
 * Output is a narrative read of which option likely fits, what factors will
 * shift the conversation in consultation, and a directional cost range.
 *
 * Per user feedback: language is NEVER "we score you" — it's "we map your
 * situation." The output is descriptive, not a number. The user drives the
 * assessment; we don't pronounce judgment.
 */

import { useState } from "react"

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  white: "#FFFFFF",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  border: "rgba(14,34,64,0.08)",
  accent: "#E8985E",
}

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

// ─── Question definitions ──────────────────────────────────────────────────
type Question = {
  id: string
  text: string
  subtitle?: string
  multi?: boolean
  options: { id: string; label: string; hint?: string }[]
}

const QUESTIONS: Question[] = [
  {
    id: "situation",
    text: "What does your mouth look like right now?",
    subtitle: "Honest read. We're not grading.",
    options: [
      { id: "one", label: "One tooth missing or failing" },
      { id: "few", label: "2–4 teeth missing or failing" },
      { id: "arch", label: "Most of an arch is failing (upper or lower)" },
      { id: "both", label: "Both arches failing" },
      { id: "unsure", label: "I'm not sure yet — exploring options" },
    ],
  },
  {
    id: "duration",
    text: "How long have you been managing this?",
    options: [
      { id: "recent", label: "Under a year" },
      { id: "mid", label: "1–3 years" },
      { id: "long", label: "3+ years — I've been putting it off" },
    ],
  },
  {
    id: "elsewhere",
    text: "Have you been to other practices about this?",
    subtitle: "There's no wrong answer — second opinions are how the highest-value cases find us.",
    options: [
      { id: "first", label: "No, this is my first look" },
      { id: "one", label: "Yes — one consultation" },
      { id: "many", label: "Yes — multiple quotes that varied a lot" },
      { id: "started", label: "Yes — had work started but not finished" },
    ],
  },
  {
    id: "priorities",
    text: "Which matters most to you?",
    subtitle: "Pick as many as apply.",
    multi: true,
    options: [
      { id: "chew", label: "Chewing comfortably again" },
      { id: "natural", label: "Looking natural" },
      { id: "speed", label: "Speed — done as fast as possible" },
      { id: "cost", label: "Minimizing cost" },
      { id: "longevity", label: "Best long-term outcome" },
      { id: "minimal", label: "Minimally invasive" },
    ],
  },
  {
    id: "health",
    text: "Any of these apply to you?",
    subtitle: "These affect how implants integrate. Pick all that apply, or 'none'.",
    multi: true,
    options: [
      { id: "diabetes", label: "I have diabetes" },
      { id: "smoke", label: "I smoke or vape regularly" },
      { id: "bone", label: "I've been told I have bone loss" },
      { id: "bisphos", label: "I take bisphosphonates" },
      { id: "grind", label: "I grind or clench at night" },
      { id: "perio", label: "I have or had periodontal (gum) disease" },
      { id: "none", label: "None of these" },
    ],
  },
  {
    id: "family",
    text: "First-degree family history?",
    subtitle: "Parents and siblings. Pick all that apply.",
    multi: true,
    options: [
      { id: "perio", label: "Parents or siblings lost teeth to gum disease" },
      { id: "heart", label: "Parents or siblings had heart attack before 60" },
      { id: "diabetes", label: "Diabetes runs in the immediate family" },
      { id: "none", label: "None I'm aware of" },
    ],
  },
  {
    id: "timeline",
    text: "Timeline?",
    options: [
      { id: "soon", label: "I want this resolved in the next 90 days" },
      { id: "mid", label: "Planning for the next 6–12 months" },
      { id: "research", label: "Researching — no rush" },
    ],
  },
  {
    id: "budget",
    text: "What's the budget situation?",
    subtitle: "Plain talk. We never tailor the recommendation to a sales target.",
    options: [
      { id: "out", label: "I'd want to do this without financing if possible" },
      { id: "finance", label: "I'm fine financing over 2–5 years" },
      { id: "constraint", label: "Cost is the biggest constraint" },
      { id: "outcome", label: "Cost isn't the constraint — outcome is" },
    ],
  },
]

// ─── Output logic ──────────────────────────────────────────────────────────
type Answers = Record<string, string | string[]>

function generateRead(a: Answers): { headline: string; option: string; range: string; factors: string[]; secondOpinion: boolean; sameDay: boolean } {
  const situation = a.situation as string
  const priorities = (a.priorities as string[]) || []
  const health = (a.health as string[]) || []
  const family = (a.family as string[]) || []
  const timeline = a.timeline as string
  const elsewhere = a.elsewhere as string

  // Determine likely option
  let option = ""
  let range = ""
  let headline = ""

  if (situation === "one") {
    option = "Single-tooth implant"
    range = "$4,000 – $6,000"
    headline = "The path most consistent with your situation looks like a single-tooth implant."
  } else if (situation === "few") {
    option = "Implant bridge"
    range = "$8,000 – $15,000"
    headline = "The path most consistent with your situation looks like an implant-supported bridge."
  } else if (situation === "arch" || situation === "both") {
    const arches = situation === "both" ? "both arches" : "one arch"
    if (priorities.includes("cost") || (a.budget === "constraint")) {
      option = `Implant-supported denture (${arches})`
      range = situation === "both" ? "$30,000 – $50,000 for both" : "$15,000 – $25,000 per arch"
      headline = `The path most consistent with your situation looks like an implant-supported denture for ${arches}.`
    } else {
      option = `Fixed full-arch (All-on-4/6) — ${arches}`
      range = situation === "both" ? "$50,000 – $100,000 for both" : "$25,000 – $50,000 per arch"
      headline = `The path most consistent with your situation looks like fixed full-arch (All-on-4/6) on ${arches}.`
    }
  } else {
    option = "We'll know after the consultation"
    range = "$4,000 – $50,000 depending on path"
    headline = "Your situation maps to multiple possible paths — the consultation is where we narrow it."
  }

  // Identify factors that will shift the recommendation in consultation
  const factors: string[] = []
  if (health.includes("diabetes")) factors.push("Your diabetes management — well-controlled diabetes is compatible with implants; uncontrolled increases complication risk meaningfully")
  if (health.includes("smoke")) factors.push("Smoking — implant survival drops to ~85% at 10 years in smokers vs. ~95% in non-smokers; we'll discuss timing around cessation")
  if (health.includes("bone")) factors.push("Bone density — 3D CBCT scan will tell us if grafting is needed; this affects both cost and timeline")
  if (health.includes("bisphos")) factors.push("Bisphosphonate history — this requires a careful surgical conversation and possibly a drug holiday coordinated with your physician")
  if (health.includes("grind")) factors.push("Bruxism — sleep-disordered breathing is the most under-screened cause of implant failure; we'll screen with STOP-BANG before loading")
  if (health.includes("perio")) factors.push("Periodontal history — affects the maintenance protocol and long-term prognosis")
  if (family.includes("perio")) factors.push("Family periodontal history — we use the AAP/EFP framework to grade your heritable risk")
  if (family.includes("heart")) factors.push("Family cardiovascular pattern — we coordinate with cardiology where indicated")

  if (factors.length === 0) {
    factors.push("Your bite mechanics and how they distribute force across the planned implants")
    factors.push("Bone volume on the 3D CBCT — the determining factor for whether grafting is needed")
    factors.push("Material choice (titanium vs. zirconia) based on biocompatibility and aesthetic needs")
  }

  const secondOpinion = elsewhere === "many" || elsewhere === "started"
  const sameDay = priorities.includes("speed") && timeline === "soon" && (situation === "arch" || situation === "both") && !health.includes("bone") && !health.includes("bisphos")

  return { headline, option, range, factors: factors.slice(0, 4), secondOpinion, sameDay }
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function ImplantPathFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [done, setDone] = useState(false)

  const total = QUESTIONS.length
  const q = QUESTIONS[step]
  const current = answers[q?.id]
  const isValid = q?.multi
    ? Array.isArray(current) && current.length > 0
    : typeof current === "string"

  function pickSingle(id: string) {
    setAnswers((a) => ({ ...a, [q.id]: id }))
  }

  function toggleMulti(id: string) {
    setAnswers((a) => {
      const prev = (a[q.id] as string[]) || []
      // If they pick "none", clear everything else and select only "none"
      if (id === "none") return { ...a, [q.id]: prev.includes("none") ? [] : ["none"] }
      const without = prev.filter((x) => x !== "none")
      return { ...a, [q.id]: without.includes(id) ? without.filter((x) => x !== id) : [...without, id] }
    })
  }

  function next() {
    if (step < total - 1) {
      setStep(step + 1)
    } else {
      setDone(true)
    }
  }

  function back() {
    if (done) {
      setDone(false)
      return
    }
    if (step > 0) setStep(step - 1)
  }

  function restart() {
    setAnswers({})
    setStep(0)
    setDone(false)
  }

  // ─── Result screen ────────────────────────────────────────────────────
  if (done) {
    const read = generateRead(answers)
    return (
      <div style={{
        background: B.navy,
        color: B.warm,
        borderRadius: 24,
        padding: "48px 36px",
        fontFamily: SANS,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: B.blue, display: "inline-block" }} />
          <span style={{
            fontSize: 11, color: B.blue, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700,
          }}>
            Your path · directional read
          </span>
        </div>

        <h3 style={{
          fontFamily: SERIF, fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 400,
          lineHeight: 1.18, letterSpacing: "-0.01em",
          margin: "0 0 24px",
        }}>
          {read.headline}
        </h3>

        <div style={{
          background: "rgba(254,252,249,0.06)",
          border: "1px solid rgba(254,252,249,0.1)",
          borderRadius: 14,
          padding: "20px 22px",
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 12, opacity: 0.6, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>
            Likely option
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 21, color: B.warm, marginBottom: 14 }}>
            {read.option}
          </div>
          <div style={{ fontSize: 13, opacity: 0.7, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>
            Range
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 24, color: B.blue }}>
            {read.range}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{
            fontSize: 12, color: B.accent, letterSpacing: "0.14em", textTransform: "uppercase",
            marginBottom: 14, fontWeight: 700,
          }}>
            What will move the conversation in consultation
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {read.factors.map((f, i) => (
              <li key={i} style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                gap: 12,
                fontSize: 15,
                lineHeight: 1.55,
                color: "rgba(254,252,249,0.85)",
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 999, background: "transparent",
                  border: `1.5px solid ${B.blue}`, marginTop: 4, display: "inline-block",
                }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {read.secondOpinion && (
          <div style={{
            background: "rgba(232,152,94,0.12)",
            border: "1px solid rgba(232,152,94,0.35)",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 28,
          }}>
            <div style={{ fontFamily: SERIF, fontSize: 17, color: B.warm, marginBottom: 6 }}>
              You sound like a second-opinion candidate.
            </div>
            <div style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.55 }}>
              If you have a treatment plan from elsewhere, send it to us. We'll review it against your Primary iD risk picture and tell you what we'd verify, what we'd do differently, and why.
            </div>
          </div>
        )}

        {read.sameDay && (
          <div style={{
            background: "rgba(36,167,224,0.1)",
            border: "1px solid rgba(36,167,224,0.3)",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 28,
          }}>
            <div style={{ fontFamily: SERIF, fontSize: 17, color: B.warm, marginBottom: 6 }}>
              Your situation may be a same-day candidate.
            </div>
            <div style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.55 }}>
              Some full-arch cases can be done in one surgical visit with same-day temporary teeth. Whether yours qualifies depends on bone, sedation tolerance, and the planning workup. Worth asking Dr. Gabi directly.
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="/book/implants/" style={{
            background: B.blue, color: B.white,
            padding: "14px 26px", borderRadius: 999, fontWeight: 600, fontSize: 15,
            textDecoration: "none",
          }}>
            Book a consultation →
          </a>
          <a href="mailto:hello@myprimaryid.com?subject=Second opinion request" style={{
            background: "transparent", color: B.warm,
            padding: "13px 26px", borderRadius: 999, fontWeight: 600, fontSize: 15,
            textDecoration: "none",
            border: "1.5px solid rgba(254,252,249,0.35)",
          }}>
            Send a treatment plan
          </a>
          <button onClick={restart} style={{
            background: "transparent", color: "rgba(254,252,249,0.7)",
            padding: "13px 18px", border: "none", cursor: "pointer",
            fontWeight: 500, fontSize: 14, alignSelf: "center",
            fontFamily: SANS,
          }}>
            Start over
          </button>
        </div>

        <p style={{ marginTop: 28, fontSize: 12, opacity: 0.5, lineHeight: 1.55 }}>
          This is a directional read based on what you told us. It's not a diagnosis or a clinical recommendation. The real read happens in consultation.
        </p>
      </div>
    )
  }

  // ─── Question screen ────────────────────────────────────────────────
  return (
    <div style={{
      background: B.warm,
      border: `1px solid ${B.border}`,
      borderRadius: 24,
      padding: "44px 36px",
      fontFamily: SANS,
      color: B.body,
    }}>
      {/* Progress */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 8,
        }}>
          <div style={{
            fontSize: 11, color: B.blue, letterSpacing: "0.18em",
            textTransform: "uppercase", fontWeight: 700,
          }}>
            Implant Path Finder · 90 seconds
          </div>
          <div style={{ fontSize: 12, color: B.muted }}>
            {step + 1} / {total}
          </div>
        </div>
        <div style={{
          height: 3, background: "rgba(14,34,64,0.07)", borderRadius: 999, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", background: B.blue,
            width: `${((step + 1) / total) * 100}%`,
            transition: "width 0.4s cubic-bezier(0.23,1,0.32,1)",
          }} />
        </div>
      </div>

      {/* Question */}
      <h3 style={{
        fontFamily: SERIF, fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400,
        color: B.navy, lineHeight: 1.2, letterSpacing: "-0.01em",
        margin: "0 0 8px",
      }}>
        {q.text}
      </h3>
      {q.subtitle && (
        <p style={{
          fontFamily: SERIF, fontStyle: "italic", fontSize: 15,
          color: B.muted, margin: "0 0 28px", lineHeight: 1.5,
        }}>
          {q.subtitle}
        </p>
      )}

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {q.options.map((opt) => {
          const selected = q.multi
            ? ((current as string[]) || []).includes(opt.id)
            : current === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => (q.multi ? toggleMulti(opt.id) : pickSingle(opt.id))}
              style={{
                background: selected ? B.navy : B.white,
                color: selected ? B.warm : B.navy,
                border: `1.5px solid ${selected ? B.navy : B.border}`,
                borderRadius: 12,
                padding: "16px 20px",
                fontSize: 15.5,
                fontWeight: 500,
                textAlign: "left",
                cursor: "pointer",
                fontFamily: SANS,
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "all 0.15s ease",
              }}
            >
              <span style={{
                width: 18, height: 18, borderRadius: q.multi ? 4 : 999,
                border: `1.5px solid ${selected ? B.blue : "rgba(14,34,64,0.25)"}`,
                background: selected ? B.blue : "transparent",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                {selected && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
        <button
          onClick={back}
          disabled={step === 0}
          style={{
            background: "transparent",
            color: step === 0 ? "rgba(14,34,64,0.3)" : B.navy,
            border: "none",
            padding: "12px 0",
            fontSize: 14,
            fontWeight: 500,
            cursor: step === 0 ? "default" : "pointer",
            fontFamily: SANS,
          }}
        >
          ← Back
        </button>
        <button
          onClick={next}
          disabled={!isValid}
          style={{
            background: isValid ? B.navy : "rgba(14,34,64,0.15)",
            color: isValid ? B.warm : "rgba(254,252,249,0.6)",
            padding: "14px 28px",
            borderRadius: 999,
            border: "none",
            fontSize: 15,
            fontWeight: 600,
            cursor: isValid ? "pointer" : "default",
            fontFamily: SANS,
            transition: "all 0.15s ease",
          }}
        >
          {step === total - 1 ? "See my read →" : "Next →"}
        </button>
      </div>
    </div>
  )
}
