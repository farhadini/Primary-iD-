"use client"

import Link from "next/link"
import { SiteHeader, SiteFooter, PALETTE } from "@/components/site-shell"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/schema"

// ─────────────────────────────────────────────────────────────────────────
// /airway-sleep/ : Alignment & Airway pathway page.
//
// Models the structure of /dental-implant/ and /preventive-care/ (hero,
// intro, "map your situation" tease of the Primary iD, offerings grid,
// comparison, FAQ, closing CTA) but for the alignment & airway pathway.
// No Path Finder, no video. Lead/accent dimension is Sleep blue (#24A7E0).
// Framing: sleep, breathe, and grow into your face. If you snore, grind,
// or wake up tired, start with your airway, not a sleep habit.
// ─────────────────────────────────────────────────────────────────────────

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

const FAQ_ITEMS = [
  { q: "How do I know if I have an airway problem?", a: "You usually feel it before you can name it. Snoring, grinding your teeth, waking up tired no matter how long you slept, morning headaches, a dry mouth, brain fog, or a partner who notices you stop breathing at night are all signals. They tend to get explained away as stress or a bad mattress. We start with a STOP-BANG questionnaire and a CBCT airway analysis so the answer comes from your anatomy rather than a guess, and so we can tell the difference between a habit and a structural issue." },
  { q: "Do you do braces?", a: "We offer clear aligners and retainers, not traditional metal wire-and-bracket braces. The goal here is functional alignment: guiding the teeth and the bite into a position that supports a healthier airway and a more stable jaw, in a way that is comfortable and nearly invisible. For the right cases we pair aligners with myofunctional therapy so the tongue and the surrounding muscles support the result instead of fighting it." },
  { q: "What is STOP-BANG?", a: "STOP-BANG is a short, validated screening questionnaire for sleep-disordered breathing. It walks through Snoring, Tiredness, Observed pauses in breathing, blood Pressure, BMI, Age, Neck size, and Gender. It is a starting point, not a diagnosis, and it gives us a fast, structured read on your risk so we know whether to look closer with imaging and, when indicated, coordinate a formal sleep study." },
  { q: "Can you help my snoring or grinding?", a: "Often, yes, and the more useful question is why they are happening. Snoring and nighttime grinding (bruxism) are frequently the mouth doing what it must to keep the airway open. We screen the airway first, then build a plan that may include a custom nightguard, functional alignment with clear aligners, myofunctional therapy, and a bite and jaw (TMJ) evaluation. Treating the grinding without looking at the airway underneath it tends to move the problem around rather than resolve it." },
  { q: "Is it covered by insurance?", a: "All PPO plans accepted. Coverage varies by service: some appliances and evaluations are covered in part, while clear aligners and certain screening sit outside standard dental codes. Where breathing is involved, medical insurance occasionally applies. We are transparent about what is covered and what is not before anything begins, with no surprises." },
]

// ─── Brand SVG illustration ───────────────────────────────────────────────
function PrimaryIDAnchor() {
  const r = 88
  const cx = 110
  const cy = 110
  const points = Array.from({ length: 5 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const
  })
  const labels = ["Oral", "Sleep", "Nutrition", "Genetics", "Longevity"]
  const colors = ["#48C28C", "#24A7E0", "#C7305A", "#7B68EE", "#0E2240"]
  return (
    <svg viewBox="0 0 220 220" style={{ width: "100%", maxWidth: 280, height: "auto" }}>
      <defs>
        <radialGradient id="anchor-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#24A7E0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#24A7E0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={100} fill="url(#anchor-glow)" />
      {points.map((p, i) => {
        const next = points[(i + 1) % 5]
        return <line key={`o-${i}`} x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} stroke="rgba(14,34,64,0.18)" strokeWidth="1" />
      })}
      {points.map((p, i) => {
        const opp = points[(i + 2) % 5]
        return <line key={`i-${i}`} x1={p[0]} y1={p[1]} x2={opp[0]} y2={opp[1]} stroke="rgba(14,34,64,0.08)" strokeWidth="1" />
      })}
      <circle cx={cx} cy={cy} r="6" fill="#0E2240" />
      {points.map((p, i) => (
        <g key={`d-${i}`}>
          <circle cx={p[0]} cy={p[1]} r="14" fill="#FEFCF9" stroke={colors[i]} strokeWidth="2" />
          <circle cx={p[0]} cy={p[1]} r="6" fill={colors[i]} />
        </g>
      ))}
      {points.map((p, i) => {
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2
        const lx = cx + (r + 22) * Math.cos(angle)
        const ly = cy + (r + 22) * Math.sin(angle) + 4
        return (
          <text key={`l-${i}`} x={lx} y={ly} textAnchor="middle"
            fontFamily="Georgia, serif" fontSize="11" fill="#0E2240" fontStyle="italic">
            {labels[i]}
          </text>
        )
      })}
    </svg>
  )
}

// ─── Offering icons ───────────────────────────────────────────────────────
function ScreeningIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <rect x="34" y="22" width="52" height="72" rx="6" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.6" />
      <rect x="48" y="16" width="24" height="12" rx="4" fill="#FEFCF9" stroke="#24A7E0" strokeWidth="1.6" />
      {[40, 52].map(y => (
        <line key={y} x1="44" y1={y} x2="76" y2={y} stroke="rgba(14,34,64,0.25)" strokeWidth="1.4" />
      ))}
      <path d="M42 70 Q48 60 52 70 T62 70 Q68 60 72 70 T80 70" fill="none" stroke="#24A7E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function AirwayIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <path d="M44 24 Q40 50 48 66 Q54 80 50 98" fill="none" stroke="#0E2240" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M76 24 Q80 50 72 66 Q66 80 70 98" fill="none" stroke="#0E2240" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M52 40 Q60 36 68 40" fill="none" stroke="#24A7E0" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M50 56 Q60 52 70 56" fill="none" stroke="#24A7E0" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M52 72 Q60 68 68 72" fill="none" stroke="#24A7E0" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}
function AlignerIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <path d="M28 52 Q60 34 92 52 L90 66 Q60 50 30 66 Z" fill="#24A7E0" opacity="0.14" stroke="#24A7E0" strokeWidth="1.6" />
      {[38, 50, 62, 74, 82].map(x => (
        <rect key={x} x={x - 4} y="40" width="8" height="16" rx="2" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.1" />
      ))}
    </svg>
  )
}
function MyoIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <path d="M34 44 Q34 32 46 32 L74 32 Q86 32 86 44 L86 58 Q86 72 60 80 Q34 72 34 58 Z" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.6" />
      <path d="M48 50 Q60 40 72 50 Q72 64 60 70 Q48 64 48 50 Z" fill="#C7305A" opacity="0.18" stroke="#C7305A" strokeWidth="1.6" />
      <path d="M60 70 Q60 84 60 92" fill="none" stroke="#24A7E0" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}
function NightguardIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <path d="M30 50 Q60 34 90 50 Q92 70 78 78 Q60 84 42 78 Q28 70 30 50 Z" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.6" />
      <path d="M34 54 Q60 42 86 54" fill="none" stroke="#24A7E0" strokeWidth="2" strokeLinecap="round" />
      {[44, 60, 76].map(x => (
        <line key={x} x1={x} y1="48" x2={x} y2="62" stroke="rgba(14,34,64,0.2)" strokeWidth="1.1" />
      ))}
    </svg>
  )
}
function TmjIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <path d="M40 30 Q40 60 60 74 L84 74" fill="none" stroke="#0E2240" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 40 Q46 62 62 70 L82 70" fill="none" stroke="rgba(14,34,64,0.25)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="42" cy="34" r="9" fill="none" stroke="#24A7E0" strokeWidth="2.2" />
      <path d="M42 22 A12 12 0 0 1 54 30" fill="none" stroke="#24A7E0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const OFFERINGS = [
  { icon: <ScreeningIcon />, name: "Airway & sleep screening", body: "We start with a STOP-BANG questionnaire and a CBCT airway analysis, so we can see how you actually breathe at night instead of guessing. When the picture calls for it, we coordinate a formal sleep study." },
  { icon: <AirwayIcon />, name: "CBCT airway analysis", body: "A 3D look at the airway, jaws, and the space behind the tongue. It turns vague symptoms like snoring and fatigue into something we can measure, map, and actually plan around." },
  { icon: <AlignerIcon />, name: "Functional alignment (clear aligners & retainers)", body: "Guiding the teeth and bite toward a position that supports a healthier airway and a more stable jaw, using clear aligners and retainers. Comfortable, nearly invisible, and never wire-and-bracket braces." },
  { icon: <MyoIcon />, name: "Myofunctional therapy", body: "Targeted exercises that retrain the tongue, lips, and breathing muscles to rest and function the way they should, so your alignment and your airway support each other rather than working against each other." },
  { icon: <NightguardIcon />, name: "Nightguard & bruxism support", body: "Custom appliances for teeth grinding (bruxism) that protect the teeth while we address the reason the grinding is happening underneath. Relief now, with a plan for the cause." },
  { icon: <TmjIcon />, name: "Bite & jaw (TMJ) evaluation", body: "A close read of how the bite, the jaw joints, and the muscles work together. Jaw pain, clicking, and tension often trace back to the same airway and alignment story, so we evaluate them as one system." },
]

const COMPARISON = [
  ["Where the visit starts", "With the symptom in front of us", "With the airway: STOP-BANG and CBCT analysis before a plan is built"],
  ["Snoring & grinding", "Treated as habits to manage", "Read as airway signals, then traced back to the cause"],
  ["Alignment", "Wire-and-bracket braces, cosmetic goal", "Clear aligners and retainers, aimed at airway and a stable bite"],
  ["Muscles & tongue", "Rarely addressed", "Myofunctional therapy so the result holds and supports breathing"],
  ["Jaw & TMJ", "Looked at in isolation", "Evaluated as one system with the bite and the airway"],
  ["Whole-body context", "Stops at the mouth", "Mapped across the five dimensions of the Primary iD"],
  ["Who you see", "Varies by visit", "Care led by Dr. Gabi, a prosthodontist and oral physician"],
]

export default function AirwaySleepPage() {
  return (
    <>
      <SiteHeader />
      <ServiceSchema
        serviceType="Alignment & Airway Care"
        description="Airway and sleep screening (STOP-BANG and CBCT airway analysis), functional alignment with clear aligners and retainers, myofunctional therapy, nightguard and bruxism support, and bite and jaw (TMJ) evaluation. Oral-systemic airway care with Dr. Tzur Gabi, functional prosthodontist."
        url="https://myprimaryid.com/airway-sleep/"
      />
      <FAQPageSchema questions={FAQ_ITEMS.map(f => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Alignment & Airway", url: "https://myprimaryid.com/airway-sleep/" },
      ]} />

      {/* HERO */}
      <section style={{ position: "relative", background: PALETTE.navy, color: "#FEFCF9", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 480px at 78% -10%, rgba(36,167,224,0.24), transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "140px 28px 110px" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>
            Pathway · Alignment & Airway
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(46px, 7vw, 78px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.015em", margin: "0 0 18px", maxWidth: 920 }}>
            Sleep, breathe, and grow into <em style={{ color: PALETTE.blue }}>your face</em>.
          </h1>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 24, color: "rgba(184,226,244,0.95)", margin: "0 0 36px", lineHeight: 1.45, maxWidth: 680 }}>
            If you snore, grind, or wake up tired, start with your airway.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(254,252,249,0.85)", margin: "0 0 40px", maxWidth: 620, fontFamily: SANS }}>
            Snoring and nighttime grinding are usually not bad habits. They are the mouth doing what it must to breathe. We screen the airway first, then map alignment, the bite, and the muscles, so the cause gets addressed instead of the symptom.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/book/airway/" style={{ background: PALETTE.blue, color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
              Book an airway & sleep visit →
            </Link>
            <Link href="/five-dimensions/" style={{ background: "transparent", color: "#FEFCF9", padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15, border: "1.5px solid rgba(254,252,249,0.35)" }}>
              See the Primary iD →
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: 12.5, color: "rgba(254,252,249,0.6)", fontFamily: SANS, letterSpacing: "0.04em" }}>
            New patients welcome · All PPO plans accepted · Led by a prosthodontist
          </p>
        </div>
      </section>

      {/* PAUSE / INTRO */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.55, color: PALETTE.body, margin: "0 0 22px" }}>
            You have probably been told it is stress, or a bad mattress, or just getting older. Tired mornings, a partner who hears you snore, a nightguard that wears through, headaches that start in the jaw. Each one gets treated on its own, and none of them gets better.
          </p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, lineHeight: 1.55, color: PALETTE.navy, margin: "0 0 28px" }}>
            Underneath most of it is one question we rarely ask: are you actually breathing well at night?
          </p>
          <div style={{ fontFamily: SANS, fontSize: 13, color: PALETTE.muted, letterSpacing: "0.04em" }}>
            Dr. Tzur Gabi, Founder
          </div>
        </div>
      </section>

      {/* MAP YOUR SITUATION / PRIMARY iD ANCHOR */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="anchor-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 56, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
                The integrative approach
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 28px" }}>
                Before we align anything, we <em style={{ color: PALETTE.blue }}>map your situation</em>.
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: PALETTE.body, margin: "0 0 28px" }}>
                How you breathe at night shapes far more than your sleep. It touches your energy, your focus, and your cardiovascular and metabolic health. So this pathway is led by Sleep and grounded in the rest of the Primary iD: we screen what is happening, measure it, and build a plan that treats the airway as the root, not an afterthought.
              </p>
              <div className="factor-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
                {[
                  { title: "Sleep", color: "#24A7E0", body: "Where this pathway leads. STOP-BANG and CBCT airway analysis turn snoring and fatigue into something we can measure." },
                  { title: "Oral Health", color: "#48C28C", body: "Grinding, worn teeth, and a strained jaw are often the airway leaving its mark. We read those signs together." },
                  { title: "Nutrition", color: "#C7305A", body: "Inflammation, weight, and what you eat all influence how open the airway stays. We factor it into the plan." },
                  { title: "Longevity", color: "#0E2240", body: "Untreated airway issues connect to heart and metabolic health. We score it so a good night supports a longer life." },
                ].map((f, i) => (
                  <div key={i} style={{ background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`, borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 9, height: 9, borderRadius: 999, background: f.color, display: "inline-block", flexShrink: 0 }} />
                      <div style={{ fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, fontWeight: 500 }}>{f.title}</div>
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.body, lineHeight: 1.55, marginTop: 10 }}>{f.body}</div>
                  </div>
                ))}
              </div>
              <Link href="/five-dimensions/" style={{ fontFamily: SANS, fontSize: 14, color: PALETTE.navy, textDecoration: "underline", textDecorationColor: "rgba(14,34,64,0.3)", textUnderlineOffset: 4, fontWeight: 500 }}>
                See the full Primary iD framework →
              </Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryIDAnchor />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED / OFFERINGS GRID */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              What is included
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
              One airway. <em style={{ color: PALETTE.blue }}>Many tools</em>.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
              The plan is built from what we find, not from a menu. Here is the toolkit for the alignment and airway pathway, and why each piece earns its place.
            </p>
          </div>

          <div className="options-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {OFFERINGS.map((opt, i) => (
              <div key={i} style={{ background: PALETTE.cream, border: `1px solid ${PALETTE.border}`, borderRadius: 16, padding: "28px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ height: 96, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {opt.icon}
                </div>
                <h3 style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 500, color: PALETTE.navy, margin: 0, lineHeight: 1.25 }}>
                  {opt.name}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: PALETTE.body, lineHeight: 1.55, margin: 0 }}>
                  {opt.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENCE / COMPARISON */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              The difference
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              What airway care <em style={{ color: PALETTE.blue }}>actually</em> covers.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
              If you have been handed a nightguard and sent home, here is what changes when the airway is treated as the root and the bite, the muscles, and the jaw are read as one system.
            </p>
          </div>

          <div style={{ background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`, borderRadius: 16, overflow: "hidden" }}>
            <div className="comp-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.4fr", borderBottom: `2px solid ${PALETTE.navy}` }}>
              <div style={{ padding: "16px 22px", fontFamily: SANS, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: PALETTE.muted, fontWeight: 700 }}>Topic</div>
              <div style={{ padding: "16px 22px", fontFamily: SANS, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: PALETTE.muted, fontWeight: 700 }}>Typical visit</div>
              <div style={{ padding: "16px 22px", fontFamily: SANS, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: PALETTE.blue, fontWeight: 700 }}>Primary</div>
            </div>
            {COMPARISON.map(([topic, comp, primary], i) => (
              <div key={i} className="comp-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.4fr", borderBottom: i < COMPARISON.length - 1 ? `1px solid ${PALETTE.border}` : "none" }}>
                <div style={{ padding: "20px 22px", fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, fontWeight: 500 }}>{topic}</div>
                <div style={{ padding: "20px 22px", fontFamily: SANS, fontSize: 14, color: PALETTE.body, lineHeight: 1.55 }}>{comp}</div>
                <div style={{ padding: "20px 22px", fontFamily: SANS, fontSize: 14, color: PALETTE.navy, lineHeight: 1.55, background: "rgba(36,167,224,0.04)" }}>{primary}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSURANCE / ACCESS STRIP */}
      <section style={{ background: PALETTE.warmWhite, padding: "72px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div className="cost-strip" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
          <div style={{ padding: "22px 24px", background: PALETTE.cream, border: `1px solid ${PALETTE.border}`, borderRadius: 12 }}>
            <div style={{ fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, marginBottom: 6, fontWeight: 500 }}>Insurance</div>
            <div style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.body, lineHeight: 1.55 }}>
              All PPO plans accepted. Coverage varies by service, and where breathing is involved medical insurance occasionally applies. We are transparent about what is covered before anything begins.
            </div>
          </div>
          <div style={{ padding: "22px 24px", background: PALETTE.cream, border: `1px solid ${PALETTE.border}`, borderRadius: 12 }}>
            <div style={{ fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, marginBottom: 6, fontWeight: 500 }}>Where to start</div>
            <div style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.body, lineHeight: 1.55 }}>
              With screening. A STOP-BANG questionnaire and a CBCT airway analysis give us a real read before we recommend anything, so the plan fits your anatomy.
            </div>
          </div>
          <div style={{ padding: "22px 24px", background: PALETTE.cream, border: `1px solid ${PALETTE.border}`, borderRadius: 12 }}>
            <div style={{ fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, marginBottom: 6, fontWeight: 500 }}>Aligners, not braces</div>
            <div style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.body, lineHeight: 1.55 }}>
              Functional alignment uses clear aligners and retainers, paired with myofunctional therapy when it helps. Comfortable, nearly invisible, never wire-and-bracket braces.
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              FAQ
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.5vw, 46px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              The questions <em style={{ color: PALETTE.blue }}>worth</em> asking.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: PALETTE.body, margin: 0 }}>
              Straight answers on how to know if you have an airway problem, what we offer, and what is covered.
            </p>
          </div>

          <div>
            {FAQ_ITEMS.map((f, i) => (
              <details key={i} style={{ borderTop: i === 0 ? `1px solid ${PALETTE.border}` : "none", borderBottom: `1px solid ${PALETTE.border}`, padding: "22px 0" }}>
                <summary style={{ fontFamily: SERIF, fontSize: 18, color: PALETTE.navy, cursor: "pointer", listStyle: "none", fontWeight: 500 }}>
                  {f.q}
                </summary>
                <p style={{ marginTop: 14, color: PALETTE.body, lineHeight: 1.7, fontSize: 15.5 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", padding: "120px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            Start with your airway
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 28px" }}>
            A better night starts with the <em style={{ color: PALETTE.blue }}>right question</em>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(254,252,249,0.85)", margin: "0 0 36px" }}>
            Book an airway and sleep visit to screen what is really going on, or explore the five dimensions of the Primary iD first to see how breathing connects to the whole you.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/book/airway/" style={{ background: PALETTE.blue, color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
              Book an airway & sleep visit
            </Link>
            <Link href="/five-dimensions/" style={{ background: "transparent", color: "#FEFCF9", padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15, border: "1.5px solid rgba(254,252,249,0.35)" }}>
              See the Primary iD
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .anchor-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .options-grid { grid-template-columns: 1fr 1fr !important; }
          .factor-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 720px) {
          .cost-strip { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .options-grid { grid-template-columns: 1fr !important; }
          .comp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <SiteFooter />
    </>
  )
}
