import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Dr. Tzur Gabi | Primary Integrative Dentistry",
  description: "Functional prosthodontist Dr. Tzur Gabi and the Primary iD team. 25+ years of biocompatible, airway-centered, whole-body dentistry in Brentwood.",
  alternates: { canonical: "https://myprimaryid.com/about/" },
  openGraph: {
    title: "About Dr. Tzur Gabi | Primary Integrative Dentistry",
    description: "Functional prosthodontist Dr. Tzur Gabi and the Primary iD team. 25+ years of biocompatible, airway-centered, whole-body dentistry in Brentwood.",
    url: "https://myprimaryid.com/about/",
  },
  twitter: {
    title: "About Dr. Tzur Gabi | Primary Integrative Dentistry",
    description: "Functional prosthodontist Dr. Tzur Gabi and the Primary iD team. 25+ years of biocompatible, airway-centered, whole-body dentistry in Brentwood.",
  },

}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
