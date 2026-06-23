"use client"

import Link from "next/link"
import { SiteHeader, SiteFooter, PALETTE } from "@/components/site-shell"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/schema"

// ─────────────────────────────────────────────────────────────────────────
// /preventive-care/ : Preventive & Whole-Body Care pathway page.
//
// Models the structure of /dental-implant/ (hero, intro, "map your
// situation" tease of the Primary iD, offerings grid, comparison, FAQ,
// closing CTA) but for the prevention pathway. No Path Finder, no video.
// Framing: prevention that looks at the whole you, not just your teeth.
// ─────────────────────────────────────────────────────────────────────────

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

const FAQ_ITEMS = [
  { q: "How is this different from a regular cleaning?", a: "A routine cleaning removes plaque and tartar, then sends you on your way. A functional preventive visit starts earlier, with a whole-body health intake, and goes deeper: caries-risk assessment (CAMBRA), periodontal staging, oral microbiome and inflammation screening, and nutrition guidance. You still get a thorough cleaning. You also get a read on why decay or inflammation is showing up in the first place, and a plan to change the trajectory rather than just manage it twice a year." },
  { q: "How often should I come in?", a: "For most people, twice a year. If your caries-risk or periodontal assessment flags higher risk, or if we are actively rebalancing inflammation, we may recommend a tighter interval for a season and then space visits back out as your numbers improve. The cadence is set by your biology, not by a fixed schedule, and we revisit it at your annual Primary iD reassessment." },
  { q: "Is it covered by insurance?", a: "All PPO plans accepted. Preventive visits, cleanings, and exams are typically the best-covered category in dental benefits, so most of the core preventive work is covered at or near full benefit. Some of the deeper screening and whole-body intake sits outside standard benefit codes; we are transparent about what is covered and what is not before anything is done, with no surprises." },
  { q: "What is the Primary iD?", a: "The Primary iD is our five-dimension map of how your mouth connects to the rest of your health: Oral Health, Sleep, Nutrition, Genetics, and Longevity. For preventive care we lead with Oral Health, then layer in the dimensions that influence it, so your prevention plan reflects the whole you and not just what a probe and a mirror can see. You can explore the full framework on the Five Dimensions page." },
  { q: "Do you take new patients?", a: "Yes. New patients are welcome, and a first preventive visit is one of the best ways to meet the practice. We schedule extra time for it so there is room for the whole-body intake and a real conversation about your history, your goals, and anything that has been worrying you. You leave with a baseline you can actually track over time." },
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
          <stop offset="0%" stopColor="#48C28C" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#48C28C" stopOpacity="0" />
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
function CleaningIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <path d="M50 28 Q50 18 60 18 Q70 18 70 28 L68 62 Q66 74 60 74 Q54 74 52 62 Z" fill="#FEFCF9" stroke="#48C28C" strokeWidth="1.8" />
      <rect x="55" y="74" width="10" height="6" fill="#48C28C" />
      <rect x="52" y="80" width="16" height="22" rx="3" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.4" />
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={55 + i * 3} y1="80" x2={55 + i * 3} y2="72" stroke="#48C28C" strokeWidth="1" />
      ))}
    </svg>
  )
}
function IntakeIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <rect x="34" y="22" width="52" height="72" rx="6" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.6" />
      <rect x="48" y="16" width="24" height="12" rx="4" fill="#FEFCF9" stroke="#24A7E0" strokeWidth="1.6" />
      {[38, 50, 62].map(y => (
        <line key={y} x1="44" y1={y} x2="76" y2={y} stroke="rgba(14,34,64,0.25)" strokeWidth="1.4" />
      ))}
      <path d="M44 76 L52 84 L78 58" fill="none" stroke="#48C28C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function RiskIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <circle cx="60" cy="60" r="34" fill="none" stroke="rgba(14,34,64,0.15)" strokeWidth="8" />
      <path d="M60 26 A34 34 0 0 1 90 78" fill="none" stroke="#48C28C" strokeWidth="8" strokeLinecap="round" />
      <circle cx="60" cy="60" r="6" fill="#0E2240" />
      <line x1="60" y1="60" x2="80" y2="44" stroke="#0E2240" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}
function PerioIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <path d="M30 56 Q60 40 90 56 L90 70 Q60 56 30 70 Z" fill="#C7305A" opacity="0.16" stroke="#C7305A" strokeWidth="1.4" />
      {[40, 54, 68, 80].map(x => (
        <rect key={x} x={x - 5} y="30" width="10" height="26" rx="3" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.2" />
      ))}
      <line x1="60" y1="58" x2="60" y2="92" stroke="#24A7E0" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M54 92 L66 92" stroke="#24A7E0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function MicrobiomeIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      {[
        [44, 50, 9], [70, 44, 7], [64, 70, 8], [48, 74, 6], [80, 64, 5],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#48C28C" opacity={0.25 + i * 0.1} stroke="#48C28C" strokeWidth="1.2" />
      ))}
      <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(14,34,64,0.15)" strokeWidth="1.4" strokeDasharray="4 4" />
    </svg>
  )
}
function NutritionIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <path d="M60 40 Q44 28 36 44 Q30 58 60 84 Q90 58 84 44 Q76 28 60 40 Z" fill="#C7305A" opacity="0.14" stroke="#C7305A" strokeWidth="1.8" />
      <path d="M60 40 Q60 30 68 24" fill="none" stroke="#48C28C" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M64 30 Q72 28 74 22" fill="none" stroke="#48C28C" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}
function ReassessIcon() {
  return (
    <svg viewBox="0 0 120 120" style={{ width: "100%", maxWidth: 120 }}>
      <path d="M84 44 A30 30 0 1 0 88 62" fill="none" stroke="#0E2240" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M84 32 L84 46 L70 46" fill="none" stroke="#24A7E0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="46,72 56,60 66,66 78,50" fill="none" stroke="#48C28C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const OFFERINGS = [
  { icon: <IntakeIcon />, name: "Whole-body health intake", body: "We start with you, not your chart. Medical history, medications, sleep, stress, nutrition, and family patterns, captured so your prevention plan reflects the whole picture and not just what a mirror can see." },
  { icon: <CleaningIcon />, name: "Functional cleaning & exam", body: "A thorough, gentle cleaning paired with a clinician's exam that looks for the early signals, not just the obvious problems. The cleaning you expect, with the read you do not usually get." },
  { icon: <RiskIcon />, name: "Caries-risk assessment (CAMBRA)", body: "A structured, evidence-based read on your decay risk, so prevention is tailored to your actual susceptibility rather than a one-size cleaning interval." },
  { icon: <PerioIcon />, name: "Periodontal (gum) staging", body: "We stage and grade your gum health against the validated framework, catch inflammation early, and track it over time so small changes never become silent losses." },
  { icon: <MicrobiomeIcon />, name: "Oral microbiome & inflammation screening", body: "Your mouth is an ecosystem. We screen the balance of that ecosystem and the inflammation it drives, then build a plan to rebalance it rather than just scrape the surface." },
  { icon: <NutritionIcon />, name: "Nutrition guidance", body: "Practical, mouth-and-body nutrition guidance. What is fueling decay and inflammation, what is protective, and small changes that compound for both your teeth and the rest of you." },
  { icon: <ReassessIcon />, name: "Annual Primary iD reassessment", body: "Once a year we re-map your five dimensions so you can see what moved. Prevention you can actually track, with a baseline that gets richer every visit." },
]

const COMPARISON = [
  ["What the visit starts with", "Straight to the cleaning chair", "A whole-body health intake before any instrument touches a tooth"],
  ["Decay & gum risk", "Noted if a problem is already visible", "Caries-risk (CAMBRA) and periodontal staging scored every visit, early"],
  ["Inflammation", "Rarely measured", "Oral microbiome and inflammation screened and tracked over time"],
  ["Nutrition", "A passing mention, if any", "Practical oral-systemic nutrition guidance built into the plan"],
  ["Whole-body context", "Stops at the mouth", "Mapped across the five dimensions of the Primary iD"],
  ["Tracking over time", "Same checkup, every visit", "Annual Primary iD reassessment so you can see what changed"],
  ["Who you see", "Varies by visit", "Care led by Dr. Gabi, a prosthodontist and oral physician"],
]

export default function PreventiveCarePage() {
  return (
    <>
      <SiteHeader />
      <ServiceSchema
        serviceType="Preventive & Whole-Body Dental Care"
        description="Functional cleanings and exams, whole-body health intake, caries-risk assessment (CAMBRA), periodontal staging, oral microbiome and inflammation screening, nutrition guidance, and an annual Primary iD reassessment. Oral-systemic prevention with Dr. Tzur Gabi, functional prosthodontist."
        url="https://myprimaryid.com/preventive-care/"
      />
      <FAQPageSchema questions={FAQ_ITEMS.map(f => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Preventive & Whole-Body Care", url: "https://myprimaryid.com/preventive-care/" },
      ]} />

      {/* HERO */}
      <section style={{ position: "relative", background: PALETTE.navy, color: "#FEFCF9", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 480px at 78% -10%, rgba(72,194,140,0.22), transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "140px 28px 110px" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>
            Pathway · Preventive & Whole-Body Care
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(46px, 7vw, 78px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.015em", margin: "0 0 18px", maxWidth: 920 }}>
            Prevention that looks at <em style={{ color: PALETTE.blue }}>the whole you</em>.
          </h1>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 24, color: "rgba(184,226,244,0.95)", margin: "0 0 36px", lineHeight: 1.45, maxWidth: 680 }}>
            Catch what a routine checkup misses.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(254,252,249,0.85)", margin: "0 0 40px", maxWidth: 620, fontFamily: SANS }}>
            A cleaning is the floor, not the ceiling. We start with a whole-body health intake, then map your decay risk, your gum health, and the inflammation in your mouth, so we can change the trajectory before there is anything to fix.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/book/preventive/" style={{ background: PALETTE.blue, color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
              Book a preventive visit →
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
            Most prevention stops at the surface. Plaque off, see you in six months. But decay, gum disease, and the inflammation that quietly connects your mouth to the rest of your body all start long before they show up on an X-ray.
          </p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, lineHeight: 1.55, color: PALETTE.navy, margin: "0 0 28px" }}>
            We would rather find the signal early, understand why it is there, and help you change course while it is still easy.
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
                Before we clean, we <em style={{ color: PALETTE.blue }}>map your situation</em>.
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: PALETTE.body, margin: "0 0 28px" }}>
                Inflammation in the mouth does not stay in the mouth. It is part of a conversation with your heart, your metabolism, and your whole-body health. So preventive care here is led by Oral Health and grounded in the rest of the Primary iD: we screen what is happening, score it, and build a plan to rebalance it.
              </p>
              <div className="factor-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
                {[
                  { title: "Oral Health", color: "#48C28C", body: "Where prevention leads. Decay risk, gum staging, and the oral microbiome, screened and tracked rather than guessed." },
                  { title: "Sleep", color: "#24A7E0", body: "Mouth breathing, dry mouth, and grinding all drive decay and inflammation. We screen the airway, not just the enamel." },
                  { title: "Nutrition", color: "#C7305A", body: "What fuels decay and inflammation, and what protects against both. Practical guidance built into your plan." },
                  { title: "Longevity", color: "#0E2240", body: "Oral inflammation connects to heart and metabolic health. We score it so prevention works for your whole self." },
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
              More than a cleaning. <em style={{ color: PALETTE.blue }}>A read on you</em>.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
              Every preventive visit blends the cleaning you expect with the screening you usually do not get. Here is what a whole-body preventive visit includes, and why each piece earns its place.
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
              What a preventive visit <em style={{ color: PALETTE.blue }}>actually</em> covers.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
              If your idea of a checkup is a quick scrape and a wave goodbye, here is what changes when prevention is built around the whole you.
            </p>
          </div>

          <div style={{ background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`, borderRadius: 16, overflow: "hidden" }}>
            <div className="comp-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.4fr", borderBottom: `2px solid ${PALETTE.navy}` }}>
              <div style={{ padding: "16px 22px", fontFamily: SANS, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: PALETTE.muted, fontWeight: 700 }}>Topic</div>
              <div style={{ padding: "16px 22px", fontFamily: SANS, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: PALETTE.muted, fontWeight: 700 }}>Typical checkup</div>
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
              All PPO plans accepted. Preventive care is usually the best-covered category in dental benefits, and we are transparent about anything that sits outside standard codes before it is done.
            </div>
          </div>
          <div style={{ padding: "22px 24px", background: PALETTE.cream, border: `1px solid ${PALETTE.border}`, borderRadius: 12 }}>
            <div style={{ fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, marginBottom: 6, fontWeight: 500 }}>New patients</div>
            <div style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.body, lineHeight: 1.55 }}>
              Welcome and easy. A first preventive visit is the most relaxed way to meet the practice, with extra time set aside for your whole-body intake.
            </div>
          </div>
          <div style={{ padding: "22px 24px", background: PALETTE.cream, border: `1px solid ${PALETTE.border}`, borderRadius: 12 }}>
            <div style={{ fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, marginBottom: 6, fontWeight: 500 }}>Cadence</div>
            <div style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.body, lineHeight: 1.55 }}>
              Most people come twice a year, with a tighter interval only when your risk read calls for it. We revisit the cadence at your annual Primary iD reassessment.
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
              The <em style={{ color: PALETTE.blue }}>practical</em> questions.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: PALETTE.body, margin: 0 }}>
              Straight answers on what is different, how often to come, and what is covered.
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
            Start with prevention
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 28px" }}>
            The easiest visit to make is the one that <em style={{ color: PALETTE.blue }}>prevents</em> the rest.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(254,252,249,0.85)", margin: "0 0 36px" }}>
            Book a preventive visit and start a baseline you can actually track, or explore the five dimensions of the Primary iD first to see how your mouth connects to the whole you.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/book/preventive/" style={{ background: PALETTE.blue, color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
              Book a preventive visit
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
