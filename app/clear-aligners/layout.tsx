import type { Metadata } from "next"
import localFont from "next/font/local"
import { ALIGNER_PAGE } from "@/lib/aligner-page"

// Montserrat carries body copy, labels and buttons; Georgia (a system face)
// carries the headings, as on /dental-implant/. Self-hosted, never fetched
// from Google Fonts at build time.
const montserrat = localFont({
  src: "../../public/fonts/montserrat.woff2",
  weight: "400 700",
  variable: "--font-montserrat",
  display: "swap",
})

const TITLE = "Clear Aligners in Brentwood, Los Angeles"
const DESCRIPTION =
  "Clear aligners planned by Dr. Tzur Gabi, a prosthodontist who designs the whole smile, then looks after it at your visits for years. Brentwood, Los Angeles."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://myprimaryid.com/clear-aligners/" },
  openGraph: {
    title: `${TITLE} | Primary iD`,
    description: "A smile you'll want to show. Clear aligners planned by a prosthodontist, in Brentwood.",
    url: "https://myprimaryid.com/clear-aligners/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Primary iD`,
    description: "A smile you'll want to show. Clear aligners planned by a prosthodontist, in Brentwood.",
  },
  // Not indexed until the page is approved to go live (spec, build note 9;
  // requested in the spec, so this is an explicit noindex).
  robots: { index: ALIGNER_PAGE.launched, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={montserrat.variable}>{children}</div>
}
