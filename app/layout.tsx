import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { DentistSchema, LocalBusinessSchema } from "@/components/schema"
import { GOOGLE_TAG_ID } from "@/lib/google-tag"
import "./globals.css"


const SITE_URL = "https://myprimaryid.com"

// Ensure phones render at device width so the responsive CSS actually applies.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Los Angeles Holistic Dentist | Primary Integrative Dentistry",
    template: "%s | Primary Integrative Dentistry",
  },
  description:
    "A whole-body approach to dental care in Los Angeles. Comprehensive oral-systemic, airway, and biocompatible dentistry led by Dr. Tzur Gabi.",
  applicationName: "Primary Integrative Dentistry",
  keywords: [
    "Los Angeles dentist",
    "holistic dentist Los Angeles",
    "integrative dentistry",
    "biocompatible dentistry",
    "functional prosthodontist",
    "Dr. Tzur Gabi",
    "oral systemic health",
    "airway dentistry",
    "safe mercury removal",
    "zirconia implants",
  ],
  authors: [{ name: "Primary Integrative Dentistry" }],
  creator: "Primary Integrative Dentistry",
  publisher: "Primary Integrative Dentistry",
  alternates: {
    canonical: "https://myprimaryid.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Primary Integrative Dentistry",
    title: "Los Angeles Holistic Dentist | Primary Integrative Dentistry",
    description:
      "A whole-body approach to dental care. Oral-systemic, airway, and biocompatible dentistry in Los Angeles.",
    // OG image auto-injected from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Los Angeles Holistic Dentist | Primary Integrative Dentistry",
    description:
      "A whole-body approach to dental care. Oral-systemic, airway, and biocompatible dentistry in Los Angeles.",
    // Twitter image auto-injected from app/twitter-image.tsx (we share opengraph-image.tsx via re-export below)
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID
  // The Google tag runs only on the production deployment (myprimaryid.com).
  // Vercel previews and local builds leave it out, so test pages never show up
  // in Google Ads as extra domains or extra traffic.
  const loadGoogleTag = process.env.VERCEL_ENV === "production"

  return (
    <html lang="en">
      <head>
        {/* Sitewide JSON-LD: Dentist + LocalBusiness. Per-page schema can be added in individual layouts/pages. */}
        <DentistSchema />
        <LocalBusinessSchema />

        {/* Google Tag Manager : head */}
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}</Script>
        )}

        {/* Google tag (gtag.js), loaded once. GT-NNXWS9P8 carries Google Ads
            conversion measurement (lib/google-tag.ts, OPS-18 section 4); GA4
            is configured on the same load when NEXT_PUBLIC_GA4_ID is set.
            Ad personalization is off: the tag measures conversions and builds
            no remarketing audiences from visits to health pages. */}
        {loadGoogleTag && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-tag" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('set', 'allow_ad_personalization_signals', false);
              gtag('config', '${GOOGLE_TAG_ID}');
              ${ga4Id ? `gtag('config', '${ga4Id}', { anonymize_ip: true });` : ""}
            `}</Script>
          </>
        )}
      </head>
      <body className={`font-sans antialiased`}>
        {/* GTM : body noscript fallback */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        <Analytics />
      </body>
    </html>
  )
}
