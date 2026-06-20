import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "The Five Dimensions | Primary iD",
  description:
    "One mouth. Five dimensions of you. Oral health, sleep & airway, nutrition, family history, longevity, each anchored to a validated clinical instrument (CAMBRA, STOP-BANG, MEDAS, AAP/EFP, LE8).",
  alternates: { canonical: "https://myprimaryid.com/five-dimensions/" },
  openGraph: {
    title: "The Five Dimensions | Primary iD",
    description: "Five interconnected health dimensions, anchored to validated clinical instruments.",
    url: "https://myprimaryid.com/five-dimensions/",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Five Dimensions | Primary iD",
    description: "Five interconnected health dimensions, anchored to validated clinical instruments.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
