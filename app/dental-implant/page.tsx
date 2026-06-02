import Link from "next/link"
import { SiteHeader, SiteFooter, PALETTE } from "@/components/site-shell"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/schema"
import ImplantPathFinder from "@/components/implant-path-finder"

// ─────────────────────────────────────────────────────────────────────────
// /dental-implant/ — Full Arch & Implants pathway page.
//
// v1 spec: brand-system SVG visuals (no photography placeholders),
// full-arch animation video in the hero, custom Implant Path Finder
// (8-question pre-qualifier), no timing callouts on the journey (since
// teeth-in-a-day collapses several steps), "we map your situation"
// framing instead of "we score you."
// ─────────────────────────────────────────────────────────────────────────

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

const FAQ_ITEMS = [
  { q: "Will it hurt?", a: "During surgery: no — IV sedation handles that. After surgery: yes, for a few days, in a manageable way. Most patients describe it as 'uncomfortable' rather than 'painful.' We use a structured pain protocol (not just opioids) and most patients are off pain meds within five days. The first 48 hours are the most intense — we check in with you daily during that window." },
  { q: "How long is recovery, really?", a: "Functional recovery (back to work, normal life) is usually under a week. Soft-food phase varies by case. Full healing and osseointegration takes months — but you have temporary teeth throughout, so you're never without a smile. Most patients underestimate how quickly they return to normal life — and overestimate how long they have to eat soft foods." },
  { q: "What if an implant fails?", a: "Implant survival in non-smokers with healthy biology runs ~95% at 10 years and ~90% at 25 years in the published literature. If one fails (rare), we replace it under our warranty at no cost to you. We screen aggressively up front specifically to minimize this — which is the whole point of mapping your situation before we plan the work." },
  { q: "Can I eat normally again? Like, actually normally?", a: "Yes. Fixed full-arch on implants restores ~90% of natural chewing force. You'll eat apples, steak, corn on the cob — whatever you've been avoiding. The few exceptions: ice (don't chew it), and very hard nuts in shells. Most patients describe the food experience as the single biggest quality-of-life gain." },
  { q: "What's the warranty?", a: "25-year warranty on the implants themselves, manufacturer-backed. 5-year warranty on the prosthesis (the visible teeth part), covering normal wear and any defect. We explain warranty terms in writing at treatment plan presentation — no fine print surprises." },
  { q: "How long do implants last?", a: "Properly placed, properly maintained implants typically last 25+ years — many last a lifetime. The prosthetic teeth on top may need replacement at the 15–20 year mark depending on wear. Maintenance matters: patients on a twice-yearly hygiene protocol with good home care see implant survival rates above 95% at 25 years." },
  { q: "Will insurance cover any of it?", a: "Usually a small portion. Most dental insurance plans cap at $1,500–$3,000 per year, which doesn't go far on a $35K case. We file what's coverable (extractions, bone grafts sometimes count) every time. Medical insurance occasionally covers implant work when tooth loss connects to a documented medical condition — rare, but we'll check." },
  { q: "What about anesthesia?", a: "IV sedation for all surgical visits, administered by a board-certified anesthesia provider. You can pick the depth — light (you remember nothing, breathe on your own) or deeper (closer to general). Most patients choose light. Either way, no awareness, no panic, no pain." },
  { q: "What if I'm scared of dentists?", a: "Most full-arch patients have been managing this longer than they wanted to because of fear. You're not unusual. We schedule first visits as conversations — no instruments, no surprises, no sales pressure. If you want to bring someone with you, do. Many patients do." },
]

// ─── Brand SVG illustrations ──────────────────────────────────────────────
function PrimaryIDAnchor() {
  const r = 88
  const cx = 110
  const cy = 110
  const points = Array.from({ length: 5 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const
  })
  const labels = ["Oral", "Sleep", "Nutrition", "Family", "Longevity"]
  const colors = ["#48C28C", "#24A7E0", "#E8985E", "#7B68EE", "#0E2240"]
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

function OptionIcon01() {
  return (
    <svg viewBox="0 0 120 140" style={{ width: "100%", maxWidth: 140 }}>
      <path d="M40 50 Q40 30 60 30 Q80 30 80 50 L80 70 Q80 80 60 80 Q40 80 40 70 Z" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.6" />
      <rect x="55" y="80" width="10" height="8" fill="#0E2240" />
      <path d="M50 88 L70 88 L66 130 L54 130 Z" fill="none" stroke="#24A7E0" strokeWidth="1.6" strokeLinejoin="round" />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={i} x1={50 + i * 0.7} y1={94 + i * 6} x2={70 - i * 0.7} y2={94 + i * 6} stroke="#24A7E0" strokeWidth="0.8" opacity="0.7" />
      ))}
    </svg>
  )
}

function OptionIcon02() {
  return (
    <svg viewBox="0 0 200 140" style={{ width: "100%", maxWidth: 200 }}>
      <path d="M20 50 Q20 30 40 30 Q60 30 60 50 L60 70 Q60 80 40 80 Q20 80 20 70 Z" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.6" />
      <path d="M70 40 Q70 30 90 30 Q110 30 110 40 L110 75 Q110 85 90 85 Q70 85 70 75 Z" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.6" />
      <path d="M120 50 Q120 30 140 30 Q160 30 160 50 L160 70 Q160 80 140 80 Q120 80 120 70 Z" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.6" />
      <rect x="35" y="80" width="10" height="8" fill="#0E2240" />
      <rect x="135" y="80" width="10" height="8" fill="#0E2240" />
      <path d="M30 88 L50 88 L46 130 L34 130 Z" fill="none" stroke="#24A7E0" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M130 88 L150 88 L146 130 L134 130 Z" fill="none" stroke="#24A7E0" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

function OptionIcon03() {
  return (
    <svg viewBox="0 0 200 140" style={{ width: "100%", maxWidth: 200 }}>
      <path d="M20 30 Q100 10 180 30 L180 55 Q100 35 20 55 Z" fill="#E8985E" opacity="0.18" stroke="#E8985E" strokeWidth="1.4" />
      {[40, 60, 80, 100, 120, 140, 160].map(x => (
        <rect key={x} x={x - 4} y="35" width="8" height="12" rx="2" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1" />
      ))}
      {[50, 90, 110, 150].map((x) => (
        <g key={x}>
          <circle cx={x} cy="68" r="4" fill="#0E2240" />
          <path d={`M${x - 5} 72 L${x + 5} 72 L${x + 3} 130 L${x - 3} 130 Z`} fill="none" stroke="#24A7E0" strokeWidth="1.4" />
        </g>
      ))}
    </svg>
  )
}

function OptionIcon04() {
  return (
    <svg viewBox="0 0 200 140" style={{ width: "100%", maxWidth: 200 }}>
      <path d="M15 25 Q100 5 185 25 Q185 60 100 50 Q15 60 15 25 Z" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.6" />
      {[25, 45, 65, 85, 100, 115, 135, 155, 175].map(x => (
        <rect key={x} x={x - 5} y="22" width="10" height="20" rx="2" fill="#FEFCF9" stroke="#0E2240" strokeWidth="0.8" />
      ))}
      {[60, 140].map((x) => (
        <path key={`v${x}`} d={`M${x - 4} 50 L${x + 4} 50 L${x + 2} 128 L${x - 2} 128 Z`} fill="none" stroke="#24A7E0" strokeWidth="1.6" />
      ))}
      {[
        { x: 30, angle: -25 },
        { x: 170, angle: 25 },
      ].map((cfg, i) => (
        <g key={i} transform={`rotate(${cfg.angle} ${cfg.x} 50)`}>
          <path d={`M${cfg.x - 4} 50 L${cfg.x + 4} 50 L${cfg.x + 2} 128 L${cfg.x - 2} 128 Z`} fill="none" stroke="#24A7E0" strokeWidth="1.6" />
        </g>
      ))}
    </svg>
  )
}

const OPTIONS = [
  { icon: <OptionIcon01 />, name: "Single-tooth implant", def: "One titanium (or zirconia) post + crown. Replaces a single missing tooth without altering the teeth on either side.", when: "One missing tooth, healthy neighbors", range: "$4,000 – $6,000" },
  { icon: <OptionIcon02 />, name: "Implant bridge", def: "Two implants anchoring a multi-tooth bridge. More secure than traditional bridges; no neighboring teeth altered.", when: "3–4 adjacent teeth missing", range: "$8,000 – $15,000" },
  { icon: <OptionIcon03 />, name: "Implant-supported denture", def: "2–4 implants with a removable denture that snaps on. Stays secure, comes out for cleaning. The most accessible full-arch option.", when: "Full arch, budget-conscious", range: "$15,000 – $25,000 per arch" },
  { icon: <OptionIcon04 />, name: "Fixed full-arch (All-on-4/6)", def: "Permanent, fixed prosthesis on 4–6 implants. The option closest to how natural teeth function for chewing.", when: "Full arch, permanent solution", range: "$25,000 – $50,000 per arch" },
]

const JOURNEY = [
  { n: "01", name: "Consultation", headline: "The first visit looks nothing like the last one.", body: "3D imaging (CBCT). Airway screening. Biomarker review if you've brought labs. A real conversation about your situation, your medical history, what you want, what you're afraid of. Treatment plan presented the same day, in plain English. No commitment expected — most patients leave to think.", feel: "heard. Informed. Not rushed." },
  { n: "02", name: "Digital planning", headline: "Your new teeth, designed before they're made.", body: "CAD design of your prosthetic. Material decision (zirconia vs. acrylic vs. hybrid). Implant placement modeled in software to a fraction of a millimeter. Financing decided. Surgical date scheduled. You'll see the design before we order anything.", feel: "ready. The unknowns are gone by the end of this phase." },
  { n: "03", name: "Surgery day", headline: "You go home with teeth.", body: "IV sedation (light or full — your call). Failing teeth removed if needed. Implants placed using a digital surgical guide. Temporary teeth attached the same day. You walk out with a smile. Recovery starts immediately and is more comfortable than most patients expect — managed with a structured pain protocol, not 'tough it out.'", feel: "surprisingly okay. Sore, yes. Suffering, no." },
  { n: "04", name: "Healing & osseointegration", headline: "The implants become part of you.", body: "Soft-food phase. Regular check-ins. Your bone fuses to the implants — biology doing the slow, steady work. The temporary teeth stay in throughout. Life mostly normal within a month.", feel: "patient, but not stuck." },
  { n: "05", name: "Final restoration", headline: "The real teeth go in.", body: "Final prosthetic — fitted, calibrated for bite, color-matched. The temporary comes off, the permanent goes on. We take photos. Most patients cry a little. Then we send you home with care instructions and a smile that should outlast you.", feel: "transformed. Lighter. Often, finally yourself." },
  { n: "06", name: "Lifetime maintenance", headline: "The relationship doesn't end — it deepens.", body: "Twice-yearly maintenance protocol. Member pricing on hygiene and any restorative work the prosthesis eventually needs. We're your dental practice for the rest of your life. That's the model.", feel: "settled. Looked after." },
]

const COMPARISON = [
  ["First visit length", "15–30 min with the doctor", "90 minutes with Dr. Gabi — diagnostics, conversation, treatment plan same day"],
  ["Diagnostic imaging", "2D X-ray, occasional panoramic", "3D CBCT + intra-oral scan — every patient, every plan"],
  ["Pre-surgical risk read", "Brief health-history form", "Primary iD — five dimensions of biology mapped before any surgical plan is built"],
  ["Treatment plan", "One option presented", "Plain-English, multiple options, with rationale for why we'd recommend one over another"],
  ["Surgical experience", "High-volume clinic, multiple surgeons", "Dr. Gabi performs every surgery — same hands, every visit"],
  ["Materials", "Standard set, often not discussed", "Biocompatible options, with sensitivity testing when indicated. Zirconia available."],
  ["Follow-up & maintenance", "Hand-off to a generalist", "Lifetime relationship, twice-yearly maintenance, membership-supported"],
]

export default function DentalImplantPage() {
  return (
    <>
      <SiteHeader />
      <ServiceSchema
        serviceType="Dental Implants & Full Arch Restoration"
        description="Single-tooth implants, implant bridges, implant-supported dentures, and fixed full-arch (All-on-4/6) cases. Zirconia and titanium options, 3D-guided placement, biocompatible materials. Dr. Tzur Gabi, functional prosthodontist."
        url="https://myprimaryid.com/dental-implant/"
      />
      <FAQPageSchema questions={FAQ_ITEMS.map(f => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Dental Implants & Full Arch", url: "https://myprimaryid.com/dental-implant/" },
      ]} />

      {/* HERO with background video */}
      <section style={{ position: "relative", background: PALETTE.navy, color: "#FEFCF9", overflow: "hidden" }}>
        <video autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.32 }}>
          <source src="/videos/full-arch.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(14,34,64,0.55) 0%, rgba(14,34,64,0.85) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "140px 28px 110px" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>
            Pathway · Full Arch & Implants
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(46px, 7vw, 78px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.015em", margin: "0 0 18px", maxWidth: 920 }}>
            For when teeth need <em style={{ color: PALETTE.blue }}>more</em> than another patch.
          </h1>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 24, color: "rgba(184,226,244,0.95)", margin: "0 0 36px", lineHeight: 1.45, maxWidth: 680 }}>
            A second chance to chew. Speak. Smile.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(254,252,249,0.85)", margin: "0 0 40px", maxWidth: 620, fontFamily: SANS }}>
            If you&apos;re here, you&apos;ve probably been managing this for a while. Eating around it. Smiling carefully. We start where the last office didn&apos;t — with understanding <em>you</em>, then planning the work.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#path-finder" style={{ background: PALETTE.blue, color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
              See where I stand →
            </a>
            <Link href="/book/implants/" style={{ background: "transparent", color: "#FEFCF9", padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15, border: "1.5px solid rgba(254,252,249,0.35)" }}>
              Schedule consultation →
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: 12.5, color: "rgba(254,252,249,0.6)", fontFamily: SANS, letterSpacing: "0.04em" }}>
            Free · Private · ~90 seconds · Helps Dr. Gabi personalize your visit
          </p>
        </div>
      </section>

      {/* PAUSE */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.55, color: PALETTE.body, margin: "0 0 22px" }}>
            You&apos;ve probably been managing this longer than you wanted to. Eating around it. Smiling carefully. Maybe you&apos;ve already gotten a quote that felt impossible to even hold in your head.
          </p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, lineHeight: 1.55, color: PALETTE.navy, margin: "0 0 28px" }}>
            The path forward is more straightforward than you think — and you&apos;re more in control of it than the last office made you feel.
          </p>
          <div style={{ fontFamily: SANS, fontSize: 13, color: PALETTE.muted, letterSpacing: "0.04em" }}>
            — Dr. Tzur Gabi, Founder
          </div>
        </div>
      </section>

      {/* INTEGRATIVE ANCHOR */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="anchor-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 56, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
                The integrative approach
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 28px" }}>
                Before we plan a procedure, we <em style={{ color: PALETTE.blue }}>map your situation</em>.
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: PALETTE.body, margin: "0 0 28px" }}>
                Implant outcomes depend on biology — yours, specifically. Diabetes affects bone integration. Smoking affects implant survival. Sleep affects bruxism affects implant loading. Family periodontal history affects long-term prognosis. A 90-minute consultation that ignores these isn&apos;t a consultation — it&apos;s a sales pitch with a 3D scanner.
              </p>
              <div className="factor-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
                {[
                  { title: "Family History", instrument: "AAP/EFP framework", body: "First-degree perio history predicts implant prognosis better than any consumer gene panel. We use the validated grading." },
                  { title: "Medical & medication", instrument: "Pre-surgical review", body: "Bisphosphonates, immunosuppressants, recent radiation, anticoagulants — each changes the surgical plan, not the surgical pitch." },
                  { title: "Sleep & airway", instrument: "STOP-BANG", body: "Bruxism from sleep-disordered breathing is the most under-screened cause of prosthetic failure. We catch it before we restore." },
                  { title: "Longevity", instrument: "AHA Life's Essential 8", body: "Blood pressure, A1c, smoking, exercise — the whole-body context the dental chair usually never sees." },
                ].map((f, i) => (
                  <div key={i} style={{ background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`, borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, fontWeight: 500 }}>{f.title}</div>
                    <div style={{ fontFamily: SANS, fontSize: 11, color: PALETTE.blue, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, margin: "6px 0 10px" }}>{f.instrument}</div>
                    <div style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.body, lineHeight: 1.55 }}>{f.body}</div>
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

      {/* FOUR OPTIONS */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              Your options
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
              Four ways forward — <em style={{ color: PALETTE.blue }}>honestly</em> framed.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
              Not every implant is right for every patient. Here&apos;s each option with what it does, when it&apos;s the right tool, and a real cost range. We never push a path that doesn&apos;t fit your situation.
            </p>
          </div>

          <div className="options-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {OPTIONS.map((opt, i) => (
              <div key={i} style={{ background: PALETTE.cream, border: `1px solid ${PALETTE.border}`, borderRadius: 16, padding: "28px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {opt.icon}
                </div>
                <h3 style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 500, color: PALETTE.navy, margin: 0, lineHeight: 1.25 }}>
                  {opt.name}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: PALETTE.body, lineHeight: 1.55, margin: 0 }}>
                  {opt.def}
                </p>
                <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid ${PALETTE.border}` }}>
                  <div style={{ fontFamily: SANS, fontSize: 10.5, color: PALETTE.blue, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>
                    When it&apos;s right
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 13, color: PALETTE.body, marginBottom: 12 }}>
                    {opt.when}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 10.5, color: PALETTE.muted, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>
                    Typical range
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: 17, color: PALETTE.navy, fontWeight: 500 }}>
                    {opt.range}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPLANT PATH FINDER */}
      <section id="path-finder" style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              The Path Finder
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.5vw, 46px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              See where your situation maps. In 90 seconds.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: PALETTE.body, margin: 0 }}>
              Eight questions about your mouth, your medical context, your priorities, and your timeline. You&apos;ll get a directional read on which option likely fits and what will move the conversation in consultation. No number score. No judgment.
            </p>
          </div>
          <ImplantPathFinder />
        </div>
      </section>

      {/* JOURNEY (no durations) */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              The journey
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
              Six steps, end to end. <em style={{ color: PALETTE.blue }}>No surprises.</em>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
              From the first consultation to the moment you walk out with your final teeth — every step mapped, every sensation named in advance. Some cases collapse multiple steps into a single visit (same-day full arch). Others stage over months. We&apos;ll know which after the consultation.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {JOURNEY.map((step, i) => (
              <div key={i} className="journey-row" style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 28, borderLeft: `1px solid ${PALETTE.border}`, paddingLeft: 28, position: "relative" }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: PALETTE.navy, color: "#FEFCF9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 24, fontWeight: 500, flexShrink: 0 }}>
                  {step.n}
                </div>
                <div>
                  <div style={{ fontFamily: SANS, fontSize: 11.5, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
                    Step {step.n} · {step.name}
                  </div>
                  <h3 style={{ fontFamily: SERIF, fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.2, letterSpacing: "-0.01em", margin: "0 0 14px" }}>
                    {step.headline}
                  </h3>
                  <p style={{ fontSize: 16, lineHeight: 1.65, color: PALETTE.body, margin: "0 0 12px" }}>
                    {step.body}
                  </p>
                  <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: PALETTE.muted, margin: 0 }}>
                    You&apos;ll feel: {step.feel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              The difference
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              What you&apos;re <em style={{ color: PALETTE.blue }}>actually</em> comparing.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
              If you&apos;ve gotten a quote elsewhere, use this to compare what you&apos;re really getting. Not every difference matters — but some are the difference between an implant that lasts 5 years and one that lasts 25.
            </p>
          </div>

          <div style={{ background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`, borderRadius: 16, overflow: "hidden" }}>
            <div className="comp-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.4fr", borderBottom: `2px solid ${PALETTE.navy}` }}>
              <div style={{ padding: "16px 22px", fontFamily: SANS, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: PALETTE.muted, fontWeight: 700 }}>Topic</div>
              <div style={{ padding: "16px 22px", fontFamily: SANS, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: PALETTE.muted, fontWeight: 700 }}>Typical practice</div>
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

      {/* SECOND OPINION */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", padding: "96px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            If you&apos;ve been quoted elsewhere
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
            Bring us your <em style={{ color: PALETTE.blue }}>treatment plan</em>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(254,252,249,0.85)", margin: "0 0 32px" }}>
            Most of the people who come to us for full arch already have a quote from somewhere else. We&apos;ll review what was proposed against your Primary iD risk picture — and tell you what we&apos;d verify, what we&apos;d do differently, and why. Sometimes we&apos;ll tell you they got it right. The opinion is honest, regardless of where it lands.
          </p>
          <a href="mailto:hello@myprimaryid.com?subject=Second opinion request" style={{ background: PALETTE.blue, color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15, display: "inline-block" }}>
            Send us your treatment plan →
          </a>
        </div>
      </section>

      {/* COST */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              Cost & financing
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              A real range. <em style={{ color: PALETTE.blue }}>No sales math.</em>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
              We will never quote you a number that depends on a sales tactic. Here&apos;s how full-arch pricing actually works — the range, the factors that move you along it, the financing options we work with.
            </p>
          </div>

          <div className="cost-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, marginBottom: 40 }}>
            <div style={{ background: PALETTE.navy, color: "#FEFCF9", borderRadius: 18, padding: "36px 32px" }}>
              <div style={{ fontFamily: SANS, fontSize: 11, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
                Fixed Full-Arch · per arch
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                <span style={{ fontFamily: SERIF, fontSize: 42, fontWeight: 400 }}>$25,000</span>
                <span style={{ fontFamily: SANS, fontSize: 14, opacity: 0.6 }}>to</span>
                <span style={{ fontFamily: SERIF, fontSize: 42, fontWeight: 400 }}>$50,000</span>
              </div>
              <div style={{ fontSize: 12, fontFamily: SANS, opacity: 0.65, lineHeight: 1.55 }}>
                Single arch · standard materials → complex case · premium materials
              </div>
            </div>

            <div>
              <div style={{ fontFamily: SANS, fontSize: 11, color: PALETTE.muted, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
                Factors that move you along the range
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Number of implants (4 vs. 6 vs. 8)",
                  "Bone grafting required",
                  "Material choice (acrylic / hybrid / zirconia)",
                  "Sedation level",
                  "Single arch vs. both arches",
                  "Treatment plan complexity",
                ].map((f, i) => (
                  <li key={i} style={{ fontFamily: SANS, fontSize: 14, color: PALETTE.body, display: "grid", gridTemplateColumns: "8px 1fr", gap: 12, alignItems: "center" }}>
                    <span style={{ width: 4, height: 4, borderRadius: 999, background: PALETTE.blue, display: "inline-block" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="cost-strip" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
            <div style={{ padding: "20px 22px", background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`, borderRadius: 12 }}>
              <div style={{ fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, marginBottom: 6, fontWeight: 500 }}>Financing</div>
              <div style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.body, lineHeight: 1.55 }}>
                We work with FormPiper, Cherry, CareCredit, Proceed, Alphaeon, Wisetack, and others. Most full-arch patients finance over 24–60 months.
              </div>
            </div>
            <div style={{ padding: "20px 22px", background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`, borderRadius: 12 }}>
              <div style={{ fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, marginBottom: 6, fontWeight: 500 }}>Insurance</div>
              <div style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.body, lineHeight: 1.55 }}>
                Most dental insurance covers little to nothing on implants — but we file what&apos;s coverable, every time. Medical insurance occasionally applies.
              </div>
            </div>
            <div style={{ padding: "20px 22px", background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`, borderRadius: 12 }}>
              <div style={{ fontFamily: SERIF, fontSize: 16, color: PALETTE.navy, marginBottom: 6, fontWeight: 500 }}>Membership</div>
              <div style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.body, lineHeight: 1.55 }}>
                Primary iD members get preferred pricing on the maintenance side after restoration is complete.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              FAQ
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.5vw, 46px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              The questions you were <em style={{ color: PALETTE.blue }}>afraid</em> to ask.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: PALETTE.body, margin: 0 }}>
              Honest answers. No corporate hedging. Where there&apos;s a real range, we name the range.
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

      {/* BOOKEND */}
      <section style={{ background: PALETTE.cream, padding: "120px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            Two ways to start
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 28px" }}>
            Whichever you pick, you&apos;re <em style={{ color: PALETTE.blue }}>closer</em> than you were ten minutes ago.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: PALETTE.body, margin: "0 0 36px" }}>
            Take the Implant Path Finder for a directional read on your situation. Or schedule a 90-minute consultation with Dr. Gabi for a treatment plan the same day.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
            <a href="#path-finder" style={{ background: PALETTE.navy, color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
              See where I stand
            </a>
            <Link href="/book/implants/" style={{ background: "transparent", color: PALETTE.navy, padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15, border: `1.5px solid ${PALETTE.navy}` }}>
              Schedule consultation
            </Link>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.muted, margin: 0 }}>
            Or send us a treatment plan you&apos;ve gotten elsewhere — we&apos;ll review it honestly.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .anchor-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .options-grid { grid-template-columns: 1fr 1fr !important; }
          .factor-grid { grid-template-columns: 1fr !important; }
          .cost-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 720px) {
          .cost-strip { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .options-grid { grid-template-columns: 1fr !important; }
          .comp-grid { grid-template-columns: 1fr !important; }
          .journey-row { grid-template-columns: 48px 1fr !important; padding-left: 18px !important; }
        }
      `}</style>

      <SiteFooter />
    </>
  )
}
