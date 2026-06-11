import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader, SiteFooter, ArticleContainer, Hero, H2, PALETTE } from "@/components/site-shell"
import { BreadcrumbSchema } from "@/components/schema"

// ─────────────────────────────────────────────────────────────────────────
// Five appointment pathways. Each renders the SiteShell with pathway-specific
// copy, an assessment CTA, and a tel: fallback. The actual scheduler embed
// will be wired in once we confirm Subscribili's recommended scheduler
// partner (NexHealth, LocalMed, or Modento) — until then this page resolves
// cleanly so the redirects from /book?pathway=X don't 404.
// ─────────────────────────────────────────────────────────────────────────

type Pathway = {
  slug: string
  title: string
  eyebrow: string
  description: string
  intro: string
  what: string[]
  duration: string
}

const PATHWAYS: Record<string, Pathway> = {
  preventive: {
    slug: "preventive",
    title: "Book your first preventive visit",
    eyebrow: "Preventive · Primary iD",
    description:
      "Plan on 90 minutes. The comprehensive intake includes 3D CBCT imaging, salivary diagnostics, airway screening, periodontal staging, and a Primary iD score across five dimensions.",
    intro:
      "Most preventive visits stop at a cleaning. We go further: we baseline you across the five dimensions of integrative dentistry so the next decade of care is built on a real foundation, not a six-month memory.",
    what: [
      "Comprehensive health history",
      "3D CBCT imaging",
      "Salivary microbiome diagnostics",
      "Airway and STOP-BANG screening",
      "Periodontal staging (AAP-EFP framework)",
      "Cleaning and oral cancer screening",
      "Your Primary iD score and roadmap",
    ],
    duration: "90 minutes",
  },
  airway: {
    slug: "airway",
    title: "Book an airway & sleep assessment",
    eyebrow: "Airway · Primary iD",
    description:
      "Sleep-disordered breathing is the most under-screened condition in modern medicine. We use STOP-BANG, CBCT airway analysis, and oral structural exam to identify it early and coordinate the right next step.",
    intro:
      "If you snore, wake unrefreshed, grind your teeth, or have been told you've stopped breathing in your sleep — the dentist's chair is one of the most reliable places to start. The mouth is the front door to the airway.",
    what: [
      "STOP-BANG sleep apnea screener",
      "CBCT airway and palatal analysis",
      "Tongue position, palate vault, nasal patency exam",
      "Bite mechanics and bruxism evaluation",
      "Coordination with sleep medicine if indicated",
      "Oral appliance options when appropriate",
    ],
    duration: "60–90 minutes",
  },
  cosmetic: {
    slug: "cosmetic",
    title: "Book a cosmetic consultation",
    eyebrow: "Cosmetic · Primary iD",
    description:
      "Cosmetic dentistry built on biology, not just appearance. Veneers, whitening, bonding, and full smile design with biocompatible materials and digital smile design.",
    intro:
      "The smile that lasts at 70 is built on a bite that's balanced at 35. Cosmetic work at Primary starts with the foundation: biocompatibility, function, and material sensitivity testing — then aesthetics.",
    what: [
      "Digital smile design preview before any tooth is touched",
      "Material sensitivity testing when indicated (MELISA)",
      "Porcelain veneer planning (lithium disilicate / zirconia)",
      "Professional whitening with sensitivity protocol",
      "Composite bonding options",
      "Bite and airway evaluation as foundation",
    ],
    duration: "60 minutes",
  },
  implants: {
    slug: "implants",
    title: "Book a dental implant consultation",
    eyebrow: "Implants · Primary iD",
    description:
      "Zirconia and titanium dental implants planned with 3D imaging and placed by Dr. Tzur Gabi — a functional prosthodontist with 25+ years of full-arch and biocompatible implant experience.",
    intro:
      "A well-planned implant restores function, protects bone, and keeps your bite aligned for decades. A poorly planned one does the opposite. The difference is almost entirely upstream of the surgery: imaging, material choice, and clinician judgment.",
    what: [
      "Comprehensive CBCT for 3D surgical planning",
      "Material decision: titanium vs zirconia",
      "Guided surgical placement",
      "Single-tooth, multi-tooth, or full-arch options",
      "All-on-4 / zygomatic cases for limited bone",
      "Membership pricing on implant restoration available",
    ],
    duration: "60–90 minutes",
  },
  longevity: {
    slug: "longevity",
    title: "Book a longevity & wellness consultation",
    eyebrow: "Longevity · Primary iD Plus",
    description:
      "Beyond dental: oral microbiome, nutrition, sleep, metabolic markers, and biomarker labs interpreted alongside oral findings. The Primary iD Plus visit for patients optimizing for healthspan.",
    intro:
      "The mouth tells you things about your systemic health most doctors won't ask about. Inflammation, microbiome, sleep, metabolic load — and we interpret them together rather than in silos.",
    what: [
      "Full Primary iD scoring across five dimensions",
      "MEDAS nutrition and Life's Essential 8 (LE8) baseline",
      "Biomarker labs through Primary iD Plus (hormone, metabolic, inflammatory)",
      "Oral microbiome via salivary diagnostics",
      "Sleep and airway screening",
      "Coordination with functional medicine team as needed",
    ],
    duration: "90 minutes",
  },
}

export async function generateStaticParams() {
  return Object.keys(PATHWAYS).map((pathway) => ({ pathway }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pathway: string }>
}): Promise<Metadata> {
  const { pathway } = await params
  const p = PATHWAYS[pathway]
  if (!p) return { title: "Book a visit" }
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `https://myprimaryid.com/book/${pathway}/` },
    robots: { index: false, follow: true },
    openGraph: {
      title: p.title,
      description: p.description,
      url: `https://myprimaryid.com/book/${pathway}/`,
    },
  }
}

export default async function BookPathwayPage({
  params,
}: {
  params: Promise<{ pathway: string }>
}) {
  const { pathway } = await params
  const p = PATHWAYS[pathway]
  if (!p) notFound()

  return (
    <>
      <SiteHeader />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Book a visit", url: "https://myprimaryid.com/book/" },
        { name: p.title, url: `https://myprimaryid.com/book/${pathway}/` },
      ]} />

      <ArticleContainer>
        <Hero
          eyebrow={p.eyebrow}
          title={p.title}
          subtitle={p.description}
        />

        <p style={{ fontSize: 18, color: PALETTE.body }}>{p.intro}</p>

        <H2>What this visit includes</H2>
        <ul style={{ color: PALETTE.body, lineHeight: 1.85, fontSize: 17 }}>
          {p.what.map((item, i) => (
            <li key={i} style={{ marginBottom: 6 }}>{item}</li>
          ))}
        </ul>
        <p style={{ color: PALETTE.muted, fontSize: 15, marginTop: 12 }}>
          <strong style={{ color: PALETTE.navy }}>Duration:</strong> {p.duration}
        </p>

        {/* Scheduler placeholder — will be replaced with the real embed
            (NexHealth / LocalMed / Modento per Subscribili's recommendation) */}
        <div
          style={{
            marginTop: 48,
            padding: "32px 28px",
            background: PALETTE.warmWhite,
            border: `1px solid ${PALETTE.border}`,
            borderRadius: 16,
          }}
        >
          <div
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontSize: 11,
              color: PALETTE.blue,
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            Two ways to book
          </div>

          <h3
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 22,
              fontWeight: 500,
              color: PALETTE.navy,
              margin: "0 0 16px",
            }}
          >
            Start with the assessment, or call us.
          </h3>

          <p style={{ color: PALETTE.body, lineHeight: 1.65, marginBottom: 24 }}>
            Our intake is built around the Primary iD assessment — a 6-minute online
            score across five dimensions of health. It tells us what to focus on
            before you arrive, so the visit itself can be more productive. Or call
            and we'll book you the old-fashioned way.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link
              href="/diagnostics/"
              style={{
                background: PALETTE.navy,
                color: PALETTE.white,
                padding: "14px 28px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Start the assessment
            </Link>
            <a
              href="tel:+13105648990"
              style={{
                color: PALETTE.navy,
                textDecoration: "underline",
                textDecorationColor: "rgba(14,34,64,0.3)",
                textUnderlineOffset: 4,
                fontWeight: 500,
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              Or call (310) 564-8990
            </a>
          </div>

          <p style={{ color: PALETTE.muted, fontSize: 13, marginTop: 24, marginBottom: 0 }}>
            Online scheduler is being upgraded. In the meantime the assessment or
            phone are the fastest ways in.
          </p>
        </div>

        <p style={{ marginTop: 48, color: PALETTE.muted, fontSize: 14 }}>
          Membership pricing available on most restorative and cosmetic work.{" "}
          <Link href="/blogs/" style={{ color: PALETTE.blue, textDecoration: "none" }}>
            Read more from the Primary Journal →
          </Link>
        </p>
      </ArticleContainer>

      <SiteFooter />
    </>
  )
}
