import type { Metadata } from "next"
import type React from "react"

// The team hub is password-gated and must never be indexed.
export const metadata: Metadata = {
  title: "Team hub",
  description: "Primary Integrative Dentistry brand working files, campaign creative and voice rules for the team and partners.",
  alternates: { canonical: "https://myprimaryid.com/brand/internal/" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export default function BrandInternalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
