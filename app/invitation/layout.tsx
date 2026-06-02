import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Practitioner Invitation | Primary Integrative Dentistry",
  description:
    "An exclusive wellness invitation for LA practitioners. Comprehensive oral-systemic consultation.",
  alternates: { canonical: "https://myprimaryid.com/invitation/" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
