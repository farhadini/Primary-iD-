import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

// The membership design is set in Inter with JetBrains Mono for citations.
// Self-hosted by next/font; membership.css reads these variables.
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-pidl-sans" })
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-pidl-mono" })

export const metadata: Metadata = {
  title: "Primary iD Membership | $499 a Year, Brentwood",
  description:
    "Your smile, the gateway to beauty, wellbeing and longevity. A $99 first visit, then one membership: a CBCT, oral cancer screening, an extra preventive visit and a longevity consultation every year, with member pricing and no annual maximum. Not insurance.",
  alternates: { canonical: "https://myprimaryid.com/membership/" },
  openGraph: {
    title: "Primary iD Membership | Primary Integrative Dentistry",
    description: "$1,220 of care included every year for $499, and member pricing on everything else. Brentwood, Los Angeles.",
    url: "https://myprimaryid.com/membership/",
    images: ["https://myprimaryid.com/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Primary iD Membership | Primary Integrative Dentistry",
    description: "$1,220 of care included every year for $499, and member pricing on everything else. Brentwood, Los Angeles.",
    images: ["https://myprimaryid.com/opengraph-image"],
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${sans.variable} ${mono.variable}`}>{children}</div>
}
