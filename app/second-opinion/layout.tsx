import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Second Opinion · Bring Us Your Treatment Plan",
  description:
    "Get a second opinion from a functional prosthodontist on your dental implant or full-arch treatment plan. We review against your Primary iD risk picture and tell you what we'd verify, change, or confirm — honestly.",
  alternates: { canonical: "https://myprimaryid.com/second-opinion/" },
  openGraph: {
    title: "Second Opinion · Primary Integrative Dentistry",
    description: "Honest review of your dental treatment plan by Dr. Tzur Gabi.",
    url: "https://myprimaryid.com/second-opinion/",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
