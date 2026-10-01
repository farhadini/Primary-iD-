import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Primary iD Membership | $499 a Year, Brentwood",
  description:
    "One fee a year: a 3D head and neck scan, oral cancer screening, an extra preventive visit and a longevity consultation, plus published member pricing with no annual maximum. Not insurance.",
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
export default function Layout({ children }: { children: React.ReactNode }) { return children }
