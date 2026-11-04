import type { Metadata } from "next"
import localFont from "next/font/local"
import { LAB_FILM, LAB_URL } from "@/lib/innovation-lab"

// Montserrat carries headings and body; JetBrains Mono carries the small
// labels and counts, as in the film; Georgia (a system face) carries the
// italic emphasis. Self-hosted, never fetched from Google Fonts at build time.
const montserrat = localFont({
  src: "../../public/fonts/montserrat.woff2",
  weight: "400 700",
  variable: "--font-montserrat",
  display: "swap",
})
const mono = localFont({
  src: "../../public/fonts/jetbrains-mono.woff2",
  weight: "400 500",
  variable: "--font-lab-mono",
  display: "swap",
})

const TITLE = "Primary Innovation Lab"
const DESCRIPTION =
  "One dental visit, and every layer underneath it. The Primary Innovation Lab is building the future of dentistry in Brentwood, Los Angeles, starting with the person in the chair."
const SHARE = "Below the line: one dental visit, and every layer underneath it. The Primary Innovation Lab, Brentwood, Los Angeles."
const IMAGE = { url: `https://myprimaryid.com${LAB_FILM.poster}`, width: 1920, height: 1080, alt: "One dental visit, and the layers underneath it" }

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: LAB_URL },
  openGraph: {
    title: `${TITLE} | Primary Integrative Dentistry`,
    description: SHARE,
    url: LAB_URL,
    images: [IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Primary Integrative Dentistry`,
    description: SHARE,
    images: [IMAGE.url],
  },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${montserrat.variable} ${mono.variable}`}>{children}</div>
}
