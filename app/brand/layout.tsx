import type { Metadata } from "next"
import type React from "react"

// Brand Hub is a gated partner/marketer resource — keep it out of search.
export const metadata: Metadata = {
  title: "Brand Hub",
  description: "Primary Integrative Dentistry brand assets, guidelines, and resources for our marketing team and partners.",
  alternates: { canonical: "https://myprimaryid.com/brand/" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
