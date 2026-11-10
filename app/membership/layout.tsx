import type { Metadata } from "next"
import localFont from "next/font/local"

// The page's type is Georgia headings + Inter body, matching the live site. The
// Brand OS says otherwise; that conflict is open (see the handoff brief).
// Self-hosted (public/fonts) so the build never fetches from Google Fonts.
const inter = localFont({ src: "../../public/fonts/inter.woff2", weight: "100 900", variable: "--font-inter", display: "swap" })
const jetbrains = localFont({ src: "../../public/fonts/jetbrains-mono.woff2", weight: "100 800", variable: "--font-jetbrains", display: "swap" })

const TITLE = "Primary iD Founding Membership in Brentwood, Los Angeles"
const DESCRIPTION =
  "The Primary iD founding membership: one fee of $499 a year for unlimited cleanings and exams, a yearly 3D scan, whitening and screenings, $3,119 at our regular fees, plus member pricing with no annual maximum. Not insurance."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://myprimaryid.com/membership/" },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://myprimaryid.com/membership/" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${inter.variable} ${jetbrains.variable}`}>{children}</div>
}
