import type { Metadata } from "next"

const URL = "https://myprimaryid.com/membership/"
const TITLE = "Membership"
const DESCRIPTION =
  "One fee of $499 a year: a 3D scan, an oral cancer screening, an extra preventive visit, a longevity consultation and published member pricing on everything we do. Not insurance."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website", siteName: "Primary Integrative Dentistry" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
}

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return children
}
