/**
 * JSON-LD schema components for Primary Integrative Dentistry.
 *
 * Each component renders a <script type="application/ld+json"> tag containing
 * a typed structured-data object. Add to the relevant page (or layout) tree
 * and Google's crawler will index the data for rich results.
 *
 * Practice info: keep in sync with CLAUDE.md.
 */

import type React from "react"

const SITE_URL = "https://myprimaryid.com"

// ─── Practice constants ───────────────────────────────────────────────────────
const PRACTICE = {
  "@id": `${SITE_URL}/#dentist`,
  name: "Primary Integrative Dentistry",
  url: SITE_URL,
  telephone: "+1-310-564-8990",
  email: "hello@myprimaryid.com",
  description:
    "Integrative, whole-body dentistry in Brentwood, Los Angeles. Functional prosthodontics, airway-centered care, biocompatible materials, and the Primary iD oral-systemic scoring framework.",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "11980 San Vicente Blvd, Suite 902",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    postalCode: "90049",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.0522,
    longitude: -118.2437,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/drgabi",
    "https://www.instagram.com/dentalogics/",
    "https://www.facebook.com/DentalogicsUSA",
  ],
  image: `${SITE_URL}/og-default.jpg`,
  logo: `${SITE_URL}/icon.svg`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "373",
    bestRating: "5",
  },
} as const

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Dentist ──────────────────────────────────────────────────────────────────
export function DentistSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    ...PRACTICE,
  }
  return <JsonLd data={data} />
}

// ─── LocalBusiness (co-rendered on home) ──────────────────────────────────────
export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: PRACTICE.name,
    url: PRACTICE.url,
    telephone: PRACTICE.telephone,
    address: PRACTICE.address,
    geo: PRACTICE.geo,
    openingHoursSpecification: PRACTICE.openingHoursSpecification,
    image: PRACTICE.image,
    priceRange: PRACTICE.priceRange,
  }
  return <JsonLd data={data} />
}

// ─── Physician (Dr. Tzur Gabi — render on /about) ─────────────────────────────
export function PhysicianSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/about#dr-gabi`,
    name: "Tzur Gabi",
    honorificPrefix: "Dr.",
    honorificSuffix: "DMD",
    jobTitle: "Functional Prosthodontist & Oral Physician",
    medicalSpecialty: "Dentistry",
    worksFor: { "@id": `${SITE_URL}/#dentist` },
    url: `${SITE_URL}/about/`,
    image: `${SITE_URL}/dr-gabi.jpg`, // TODO(farhad): confirm asset path
    sameAs: [
      // TODO(farhad): add LinkedIn, Google Scholar, professional society pages
    ],
    description:
      "Dr. Tzur Gabi is a functional prosthodontist and oral physician with 25+ years of experience in biocompatible, airway-centered, whole-body dentistry. Founder of Primary Integrative Dentistry in Brentwood, Los Angeles.",
  }
  return <JsonLd data={data} />
}

// ─── Service ──────────────────────────────────────────────────────────────────
export function ServiceSchema({
  serviceType,
  description,
  url,
}: {
  serviceType: string
  description: string
  url: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    description,
    url,
    provider: { "@id": `${SITE_URL}/#dentist` },
    areaServed: {
      "@type": "City",
      name: "Los Angeles",
    },
  }
  return <JsonLd data={data} />
}

// ─── BlogPosting ──────────────────────────────────────────────────────────────
export function BlogPostingSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  image,
  url,
}: {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  author: string
  image?: string
  url: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: PRACTICE.name,
      logo: { "@type": "ImageObject", url: PRACTICE.logo },
    },
    image: image || PRACTICE.image,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  }
  return <JsonLd data={data} />
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────
export function FAQPageSchema({
  questions,
}: {
  questions: Array<{ question: string; answer: string }>
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  }
  return <JsonLd data={data} />
}

// ─── Breadcrumb (optional helper) ─────────────────────────────────────────────
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <JsonLd data={data} />
}
