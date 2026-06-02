import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Primary iD Plus | The Longevity Membership",
  description: "Primary iD Plus adds biomarker labs, nutrition and longevity coaching, and priority scheduling to your dental care.",
  alternates: { canonical: "https://myprimaryid.com/primary-id-plus/" },
  openGraph: {
    title: "Primary iD Plus | The Longevity Membership",
    description: "Primary iD Plus adds biomarker labs, nutrition and longevity coaching, and priority scheduling to your dental care.",
    url: "https://myprimaryid.com/primary-id-plus/",
  },
  twitter: {
    title: "Primary iD Plus | The Longevity Membership",
    description: "Primary iD Plus adds biomarker labs, nutrition and longevity coaching, and priority scheduling to your dental care.",
  },

}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
