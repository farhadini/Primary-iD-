import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Research & Science | Primary Integrative Dentistry",
  description: "The evidence behind integrative dentistry: CAMBRA, STOP-BANG, MEDAS, AAP-EFP, LE8, and how we apply it.",
  alternates: { canonical: "https://myprimaryid.com/research/" },
  openGraph: {
    title: "Research & Science | Primary Integrative Dentistry",
    description: "The evidence behind integrative dentistry: CAMBRA, STOP-BANG, MEDAS, AAP-EFP, LE8, and how we apply it.",
    url: "https://myprimaryid.com/research/",
  },
  twitter: {
    title: "Research & Science | Primary Integrative Dentistry",
    description: "The evidence behind integrative dentistry: CAMBRA, STOP-BANG, MEDAS, AAP-EFP, LE8, and how we apply it.",
  },

}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
