import { SiteHeader, SiteFooter, PALETTE } from "@/components/site-shell"
import { BreadcrumbSchema } from "@/components/schema"
import Link from "next/link"
import type React from "react"

// ─────────────────────────────────────────────────────────────────────────
// /five-dimensions/ : The Primary iD framework page.
//
// Migrated from the design HTML (five-dimensions-page.html). Each of the
// five dimensions is anchored to a validated clinical instrument that's
// recognized in academic medicine, which is the whole credibility argument
// of the page and we lead with it.
// ─────────────────────────────────────────────────────────────────────────

const DIMENSIONS = [
  {
    n: "01",
    slug: "oral-health",
    name: "Oral Health",
    color: "#48C28C",
    headline: "Where everything starts.",
    subhead: "The only place we can see bone, nerves, and soft tissue meet directly.",
    body:
      "The mouth is the diagnostic frontier most healthcare ignores. Caries risk, periodontal status, saliva environment, and smile-related quality of life: each one tells us something about a system the rest of medicine usually misses. We score you against CAMBRA (the caries risk framework taught in dental schools), the CDC/AAP perio surveillance markers (bleeding-on-probing as the inflammation signal), and OHIP-14 (the oral-health-related quality of life instrument). Eight questions, about two minutes, a directional read on the foundation of everything else.",
    instrument: "CAMBRA + CDC/AAP perio screen + OHIP-14",
    sample: 72,
    tier: "Strong",
    stat: { num: "2×", desc: "heart disease risk with untreated periodontitis" },
    citations:
      "Featherstone JDB. CAMBRA. J Calif Dent Assoc 2007 · Eke PI et al. CDC Periodontal Surveillance. J Periodontol 2013 · Cochrane Oral Health Group. Fluoride toothpaste review, 2019 · Slade GD. OHIP-14. Community Dent Oral Epidemiol 1997.",
    bridge: "Bruxism (teeth grinding) links the mouth directly to how you breathe at night.",
  },
  {
    n: "02",
    slug: "sleep-airway",
    name: "Sleep & Airway",
    color: "#24A7E0",
    headline: "What your mouth knows about your nights.",
    subhead: "Eighty percent of sleep apnea is undiagnosed. We see the airway before anyone else does.",
    body:
      "The jaw, tongue, soft palate, and airway anatomy are visible from a dental chair in ways they're not from most physician offices. STOP-BANG, the validated screening tool used by anesthesiologists before any surgery, gives us a structured read on your sleep-disordered-breathing risk in 8 questions. We pair it with the Epworth Sleepiness Scale to capture the subjective daytime function side. Together they don't diagnose apnea (that requires a home sleep test), but they tell us whether one is warranted.",
    instrument: "STOP-BANG + Epworth Sleepiness Scale",
    sample: 68,
    tier: "Foundational",
    stat: { num: "80%", desc: "of sleep apnea cases go undiagnosed" },
    citations:
      "Chung F et al. STOP-BANG questionnaire. Anesthesiology 2008 · Johns MW. Epworth Sleepiness Scale. Sleep 1991.",
    bridge:
      "Chronic airway inflammation correlates tightly with dietary pattern: what you eat reaches your gums and your sleep.",
  },
  {
    n: "03",
    slug: "nutrition",
    name: "Nutrition",
    color: "#E8985E",
    headline: "What you drink reaches your gums before your gut.",
    subhead: "We don't prescribe diets. We map your pattern against two validated frequency tools.",
    body:
      "The Mediterranean Diet Adherence Screener (MEDAS) is the food-pattern instrument validated by the PREDIMED trial, one of the strongest dietary-intervention studies in cardiovascular research. BEVQ-15 specifically captures beverage intake, because sugary drinks are the single strongest dietary signal for both caries risk and metabolic health. We don't ask what you ate yesterday. We ask about your pattern. Eight questions tell us where the one or two highest-leverage swaps would be.",
    instrument: "MEDAS (PREDIMED) + BEVQ-15",
    sample: 81,
    tier: "Strong",
    stat: { num: "30%", desc: "lower cardiovascular risk with MEDAS adherence" },
    citations:
      "Martínez-González MA et al. MEDAS. PLoS One 2012 · Hedrick VE. BEVQ-15. JADA 2012.",
    bridge:
      "Your dietary patterns intersect with what runs in your family: diabetes, cardiovascular risk, autoimmune disease all show up here.",
  },
  {
    n: "04",
    slug: "family-history",
    name: "Family History",
    color: "#7B68EE",
    headline: "The patterns written before you.",
    subhead:
      "First-degree family history predicts your disease grade more reliably than any consumer gene panel.",
    body:
      "The IL-1 genetic test that dentistry briefly embraced was refuted by the 2017 AAP/EFP World Workshop on Periodontitis Classification. The validated framework that replaced it is family history. Specifically: did first-degree relatives lose teeth from periodontal (gum) disease, do they have early-onset cardiovascular events, does diabetes run in the family. Those three signals, combined with your smoking history and a few other modifiers, give us a structured grade on heritable risk. We use the same framework periodontists at academic medical centers use.",
    instrument: "AAP/EFP 2017 Periodontitis Classification (Grading framework)",
    sample: 75,
    tier: "Strong",
    stat: { num: "3–4×", desc: "more reliable than consumer gene panels for perio risk" },
    citations:
      "Jepsen S et al. AAP/EFP Classification. J Periodontol 2018 · Nibali L et al. IL-1 gene polymorphism meta-analysis, 2019 (refutation).",
    bridge:
      "Family cardiovascular and metabolic patterns flow directly into how long, and how well, you live.",
  },
  {
    n: "05",
    slug: "longevity",
    name: "Longevity",
    color: "#0E2240",
    headline: "The dental chair sees your long game.",
    subhead: "Periodontal disease is one of the most predictive markers of lifespan we have.",
    body:
      "The American Heart Association's Life's Essential 8 framework, published in Circulation 2022, is the clearest cardiovascular-health trajectory map currently available. Tobacco, exercise, sleep, weight, lipids, glucose, blood pressure, diet. Eight components, scored as one composite. The mouth sits upstream of most of them. Chronic oral inflammation shows up in C-reactive protein, P. gingivalis (a periodontal pathogen) has been found in the brains of Alzheimer's patients, and the bidirectional link between perio and diabetes is well-established. Your Longevity chapter pulls your mouth into the cardiovascular picture.",
    instrument: "AHA Life's Essential 8 (2022)",
    sample: 73,
    tier: "Strong",
    stat: { num: "+5–7", desc: "years of healthspan with Life's Essential 8 adherence" },
    citations:
      "Lloyd-Jones DM et al. Life's Essential 8. Circulation 2022 · Dominy SS et al. P. gingivalis in Alzheimer's brains. Sci Adv 2019 · Romandini M et al. Perio and all-cause mortality. J Dent Res 2021.",
    bridge: null,
  },
] as const

const TIERS = [
  { range: "85–100", name: "Thriving", desc: "Your dimensions are doing the quiet work. Our job is protection, not correction." },
  { range: "70–84", name: "Strong", desc: "Solid foundation, a couple of clear levers. Small shifts here meaningfully change your 10-year trajectory." },
  { range: "50–69", name: "Foundational", desc: "Real signal worth acting on. None of it catastrophic, all of it addressable with focused work." },
  { range: "<50", name: "Needs focus", desc: "Meaningful signal we want to address carefully. No judgment, just a clear plan we build together." },
]

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

function ScoreRing({ score, color }: { score: number; color: string }) {
  const C = 2 * Math.PI * 90
  const offset = C - (score / 100) * C
  const rot = (score / 100) * 360 - 90
  return (
    <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto" }}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="6" />
        <circle
          cx="100" cy="100" r="90" fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round"
        />
        <circle cx="100" cy="10" r="6" fill={color}
          transform={`rotate(${rot + 90} 100 100)`}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ fontFamily: SERIF, fontSize: 42, fontWeight: 400, color: "#FEFCF9", lineHeight: 1 }}>{score}</div>
        <div style={{ fontFamily: SANS, fontSize: 11, color: "rgba(254,252,249,0.6)", marginTop: 4, letterSpacing: "0.08em" }}>/ 100</div>
      </div>
    </div>
  )
}

function DimensionSection({ d, reverse }: { d: typeof DIMENSIONS[number]; reverse: boolean }) {
  return (
    <section
      id={d.slug}
      style={{
        padding: "96px 28px",
        background: PALETTE.cream,
        borderTop: `1px solid ${PALETTE.border}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="dim-grid"
          style={{
            display: "grid",
            gridTemplateColumns: reverse ? "minmax(0, 1fr) 360px" : "360px minmax(0, 1fr)",
            gap: 56,
            alignItems: "center",
            direction: reverse ? "rtl" : "ltr",
          }}
        >
          {/* Visual panel */}
          <div
            className="dim-visual"
            style={{
              direction: "ltr",
              background: PALETTE.navy,
              color: "#FEFCF9",
              borderRadius: 22,
              padding: "44px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 22,
            }}
          >
            <ScoreRing score={d.sample} color={d.color} />
            <div style={{
              fontFamily: SANS, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
              color: "rgba(254,252,249,0.55)",
            }}>
              Sample · {d.tier}
            </div>
            <div style={{ width: "100%", padding: "16px 0", borderTop: "1px solid rgba(254,252,249,0.12)", borderBottom: "1px solid rgba(254,252,249,0.12)", textAlign: "center" }}>
              <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 500, color: d.color, lineHeight: 1 }}>{d.stat.num}</div>
              <div style={{ fontFamily: SANS, fontSize: 13, color: "rgba(254,252,249,0.75)", marginTop: 8, lineHeight: 1.4 }}>{d.stat.desc}</div>
            </div>
            <div style={{
              fontFamily: SANS, fontSize: 11, letterSpacing: "0.12em",
              color: "rgba(254,252,249,0.55)", textAlign: "center", textTransform: "uppercase",
            }}>
              {d.instrument.split(" + ").slice(0, 2).join(" · ").slice(0, 48)}
            </div>
          </div>

          {/* Content panel */}
          <div style={{ direction: "ltr" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: SANS, fontSize: 12, fontWeight: 600,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: d.color, marginBottom: 20,
            }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: d.color, display: "inline-block" }} />
              Dimension {d.n} · {d.name}
            </div>

            <h3 style={{
              fontFamily: SERIF, fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400,
              color: PALETTE.navy, lineHeight: 1.12, letterSpacing: "-0.02em",
              margin: "0 0 14px",
            }}>
              {d.headline}
            </h3>

            <p style={{
              fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: PALETTE.body,
              margin: "0 0 22px", lineHeight: 1.45,
            }}>
              {d.subhead}
            </p>

            <p style={{ fontSize: 16.5, lineHeight: 1.7, color: PALETTE.body, margin: "0 0 28px" }}>
              {d.body}
            </p>

            <div style={{
              background: PALETTE.warmWhite,
              border: `1px solid ${PALETTE.border}`,
              borderLeft: `4px solid ${d.color}`,
              borderRadius: 10,
              padding: "16px 20px",
              marginBottom: 20,
            }}>
              <div style={{
                fontFamily: SANS, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
                color: PALETTE.muted, fontWeight: 600, marginBottom: 6,
              }}>
                Validated instrument
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 17, color: PALETTE.navy, fontWeight: 500 }}>
                {d.instrument}
              </div>
              <div style={{
                fontFamily: SANS, fontSize: 13, color: PALETTE.muted, marginTop: 8,
                display: "flex", gap: 18, flexWrap: "wrap",
              }}>
                <span><strong style={{ color: PALETTE.navy }}>8 questions</strong> · ~2 min</span>
                <span><strong style={{ color: PALETTE.navy }}>0–100 score</strong></span>
              </div>
            </div>

            <div style={{
              fontFamily: SANS, fontSize: 12, color: PALETTE.muted, lineHeight: 1.55,
              fontStyle: "italic",
            }}>
              <strong style={{ color: PALETTE.navy, fontStyle: "normal" }}>Key research:</strong> {d.citations}
            </div>
          </div>
        </div>
      </div>

      {d.bridge && (
        <div style={{ maxWidth: 760, margin: "72px auto 0", padding: "0 28px", textAlign: "center" }}>
          <div style={{
            fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: PALETTE.muted,
            lineHeight: 1.55,
          }}>
            {d.bridge}
          </div>
        </div>
      )}
    </section>
  )
}

export default function FiveDimensionsPage() {
  return (
    <>
      <SiteHeader />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "The Five Dimensions", url: "https://myprimaryid.com/five-dimensions/" },
      ]} />

      {/* HERO */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", padding: "120px 28px 96px", textAlign: "center" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{
            fontFamily: SANS, fontSize: 12, color: PALETTE.blue,
            letterSpacing: "0.16em", textTransform: "uppercase",
            fontWeight: 700, marginBottom: 28,
          }}>
            The Primary iD framework
          </div>
          <h1 style={{
            fontFamily: SERIF, fontSize: "clamp(46px, 7vw, 72px)", fontWeight: 400,
            lineHeight: 1.05, letterSpacing: "-0.01em", margin: "0 0 28px",
          }}>
            One mouth. <em style={{ color: PALETTE.blue }}>Five dimensions</em> of you.
          </h1>
          <p style={{
            fontFamily: SERIF, fontStyle: "italic", fontSize: 21,
            color: "rgba(184,226,244,0.95)", margin: "0 0 36px",
            lineHeight: 1.5, maxWidth: 720, marginLeft: "auto", marginRight: "auto",
          }}>
            Your Primary iD is the score of five interconnected health dimensions. Each one is
            anchored to a validated clinical instrument. Together they tell us, and you, what
            your mouth is saying about the rest of your body.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/diagnostics/"
              style={{
                background: PALETTE.blue, color: "#FFFFFF",
                padding: "14px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600,
                textDecoration: "none", fontSize: 15,
              }}
            >
              Build my Primary iD →
            </Link>
            <Link
              href="/book/"
              style={{
                background: "transparent", color: "#FEFCF9",
                padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600,
                textDecoration: "none", fontSize: 15,
                border: "1.5px solid rgba(254,252,249,0.3)",
              }}
            >
              Book a visit →
            </Link>
          </div>
        </div>
      </section>

      {/* Anchor nav */}
      <div style={{
        position: "sticky", top: 64, zIndex: 30,
        background: "rgba(254,252,249,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${PALETTE.border}`,
        padding: "12px 28px",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", gap: 22, alignItems: "center", justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <span style={{
            fontFamily: SANS, fontSize: 11, letterSpacing: "0.14em",
            color: PALETTE.muted, textTransform: "uppercase", fontWeight: 600,
          }}>
            Jump to
          </span>
          {DIMENSIONS.map(d => (
            <a key={d.slug} href={`#${d.slug}`} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: SANS, fontSize: 13, color: PALETTE.navy,
              textDecoration: "none", fontWeight: 500,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: d.color }} />
              {d.name}
            </a>
          ))}
        </div>
      </div>

      {/* Pause */}
      <section style={{ background: PALETTE.warmWhite, padding: "88px 28px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.55, color: PALETTE.body, margin: "0 0 18px" }}>
            Most healthcare looks at your body in pieces. Your heart over here, your gut over there, your teeth somewhere else.
          </p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, lineHeight: 1.55, color: PALETTE.navy, margin: 0 }}>
            Your mouth is the one place where all of those pieces meet.
          </p>
        </div>
      </section>

      {/* Why these five */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{
            fontFamily: SANS, fontSize: 12, color: PALETTE.blue,
            letterSpacing: "0.16em", textTransform: "uppercase",
            fontWeight: 600, marginBottom: 16,
          }}>
            The framework
          </div>
          <h2 style={{
            fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400,
            color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em",
            margin: "0 0 28px",
          }}>
            Why these <em style={{ color: PALETTE.blue }}>five</em>.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: PALETTE.body, margin: 0 }}>
            The five dimensions of a Primary iD aren&apos;t arbitrary categories. They&apos;re the five places where your mouth tells the rest of your body&apos;s story most clearly. <strong style={{ color: PALETTE.navy }}>Each one is anchored to a validated clinical instrument used in academic medicine.</strong> Each one is scored on the same 0–100 scale. Each one connects to the others: your sleep affects your nutrition affects your family-history risk affects your longevity. The Primary iD is the score of those connections, made visible.
          </p>
        </div>
      </section>

      {/* The five dimensions */}
      {DIMENSIONS.map((d, i) => (
        <DimensionSection key={d.slug} d={d} reverse={i % 2 === 1} />
      ))}

      {/* Composite */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", padding: "96px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            fontFamily: SANS, fontSize: 12, color: PALETTE.blue,
            letterSpacing: "0.16em", textTransform: "uppercase",
            fontWeight: 600, marginBottom: 16, textAlign: "center",
          }}>
            The composite
          </div>
          <h2 style={{
            fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400,
            lineHeight: 1.1, letterSpacing: "-0.02em",
            margin: "0 0 24px", textAlign: "center",
          }}>
            Five scores become <em style={{ color: PALETTE.blue }}>one Primary iD</em>.
          </h2>
          <p style={{
            fontSize: 18, lineHeight: 1.65, color: "rgba(254,252,249,0.8)",
            margin: "0 auto 56px", maxWidth: 760, textAlign: "center",
          }}>
            Each dimension scores 0–100 on its own. Your composite Primary iD is the average, a single number that summarizes the whole picture. The number isn&apos;t the point. The point is what it surfaces: which dimensions are pulling their weight, which one or two are dragging the others down, where the highest-leverage interventions live.
          </p>
          <div
            className="tier-grid"
            style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, maxWidth: 1000, margin: "0 auto",
            }}
          >
            {TIERS.map((t, i) => (
              <div key={i} style={{
                background: "rgba(254,252,249,0.05)",
                border: "1px solid rgba(254,252,249,0.12)",
                borderRadius: 16, padding: "26px 22px",
                display: "flex", flexDirection: "column", gap: 8,
              }}>
                <div style={{
                  fontFamily: SANS, fontSize: 12, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: PALETTE.blue, fontWeight: 600,
                }}>{t.range}</div>
                <div style={{ fontFamily: SERIF, fontSize: 24, color: "#FEFCF9", fontWeight: 500 }}>{t.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(254,252,249,0.75)", lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bookend */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: SANS, fontSize: 12, color: PALETTE.blue,
            letterSpacing: "0.16em", textTransform: "uppercase",
            fontWeight: 600, marginBottom: 16,
          }}>
            Two ways to start
          </div>
          <h2 style={{
            fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400,
            color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em",
            margin: "0 0 24px",
          }}>
            Build your <em style={{ color: PALETTE.blue }}>Primary iD</em> in 10 minutes.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: PALETTE.body, margin: "0 0 32px" }}>
            Five short chapters. Forty questions. A directional read on what your mouth is telling you about the rest of your body. Free, private, results sent to your inbox.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/diagnostics/" style={{
              background: PALETTE.blue, color: "#FFFFFF",
              padding: "14px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600,
              textDecoration: "none", fontSize: 15,
            }}>
              Build my Primary iD →
            </Link>
            <Link href="/book/" style={{
              background: "transparent", color: PALETTE.navy,
              padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600,
              textDecoration: "none", fontSize: 15,
              border: `1.5px solid ${PALETTE.navy}`,
            }}>
              Or book a visit →
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive tweaks */}
      <style>{`
        .dim-visual {
          min-height: 460px;
          justify-content: center;
          box-shadow: 0 20px 50px -32px rgba(14,34,64,0.45);
          transition: transform 0.45s cubic-bezier(0.23,1,0.32,1), box-shadow 0.45s ease;
        }
        .dim-visual:hover {
          transform: translateY(-6px);
          box-shadow: 0 34px 70px -30px rgba(14,34,64,0.55);
        }
        @media (max-width: 880px) {
          .dim-visual { min-height: 0; }
        }
        @media (max-width: 880px) {
          .dim-grid { grid-template-columns: 1fr !important; direction: ltr !important; gap: 36px !important; }
          .tier-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .tier-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <SiteFooter />
    </>
  )
}
