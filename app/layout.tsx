import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { DentistSchema, LocalBusinessSchema } from "@/components/schema"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const SITE_URL = "https://myprimaryid.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Brentwood Holistic Dentist | Primary Integrative Dentistry",
    template: "%s | Primary Integrative Dentistry",
  },
  description:
    "A whole-body approach to dental care in Brentwood, Los Angeles. Comprehensive oral-systemic, airway, and biocompatible dentistry led by Dr. Tzur Gabi.",
  applicationName: "Primary Integrative Dentistry",
  keywords: [
    "Brentwood dentist",
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
    title: "Brentwood Holistic Dentist | Primary Integrative Dentistry",
    description:
      "A whole-body approach to dental care. Oral-systemic, airway, and biocompatible dentistry in Brentwood, Los Angeles.",
    // OG image auto-injected from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Brentwood Holistic Dentist | Primary Integrative Dentistry",
    description:
      "A whole-body approach to dental care. Oral-systemic, airway, and biocompatible dentistry in Brentwood, Los Angeles.",
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
  generator: "v0.app",
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

  return (
    <html lang="en">
      <head>
        {/* Sitewide JSON-LD: Dentist + LocalBusiness. Per-page schema can be added in individual layouts/pages. */}
        <DentistSchema />
        <LocalBusinessSchema />

        {/* Google Tag Manager — head */}
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}</Script>
        )}

        {/* GA4 — gtag.js */}
        {ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', { anonymize_ip: true });
            `}</Script>
          </>
        )}
      </head>
      <body className={`font-sans antialiased`}>
        {/* GTM — body noscript fallback */}
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
