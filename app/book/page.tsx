import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader, SiteFooter, ArticleContainer, Hero, PALETTE } from "@/components/site-shell"
import { BreadcrumbSchema } from "@/components/schema"

export const metadata: Metadata = {
  title: "Book a visit",
  description:
    "Five pathways into Primary Integrative Dentistry: preventive, airway, cosmetic, implants, and longevity. Start with the assessment or call (310) 564-8990.",
  alternates: { canonical: "https://myprimaryid.com/book/" },
  robots: { index: false, follow: true },
}

const PATHWAYS = [
  { slug: "preventive", title: "Preventive", desc: "Comprehensive 90-minute intake with the full Primary iD score." },
  { slug: "airway", title: "Airway & sleep", desc: "Sleep-disordered breathing screening, STOP-BANG, CBCT airway analysis." },
  { slug: "cosmetic", title: "Cosmetic", desc: "Veneers, whitening, bonding, full smile design, biocompatible by default." },
  { slug: "implants", title: "Implants", desc: "Zirconia and titanium implants planned with 3D imaging. Full-arch capable." },
  { slug: "longevity", title: "Longevity", desc: "Primary iD Plus: biomarker labs, nutrition, sleep, and oral microbiome integrated." },
]

export default function BookIndexPage() {
  return (
    <>
      <SiteHeader />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Book a visit", url: "https://myprimaryid.com/book/" },
      ]} />
      <ArticleContainer>
        <Hero
          eyebrow="Book"
          title="Choose your pathway."
          subtitle="We meet you where your priority is, and broaden out from there. Every pathway includes a full Primary iD scoring across five dimensions."
        />
        <div style={{ marginTop: 16 }}>
          {PATHWAYS.map((p) => (
            <Link
              key={p.slug}
              href={`/book/${p.slug}/`}
              style={{
                display: "block",
                padding: "28px 0",
                borderBottom: `1px solid ${PALETTE.border}`,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h2
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 26,
                  fontWeight: 500,
                  color: PALETTE.navy,
                  margin: "0 0 8px",
                }}
              >
                {p.title} →
              </h2>
              <p style={{ color: PALETTE.body, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 56, padding: "24px 28px", background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`, borderRadius: 12 }}>
          <p style={{ color: PALETTE.body, margin: "0 0 8px" }}>
            <strong style={{ color: PALETTE.navy }}>Prefer to talk first?</strong>
          </p>
          <a href="tel:+13105648990" style={{ color: PALETTE.blue, textDecoration: "none", fontWeight: 500 }}>
            (310) 564-8990
          </a>
        </div>
      </ArticleContainer>
      <SiteFooter />
    </>
  )
}
