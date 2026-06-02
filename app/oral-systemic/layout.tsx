import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Oral-Systemic Connection | Primary iD",
  description: "How your mouth shapes your heart, brain, sleep, and metabolic health — and what we screen for that most dentists miss.",
  alternates: { canonical: "https://myprimaryid.com/oral-systemic/" },
  openGraph: {
    title: "The Oral-Systemic Connection | Primary iD",
    description: "How your mouth shapes your heart, brain, sleep, and metabolic health — and what we screen for that most dentists miss.",
    url: "https://myprimaryid.com/oral-systemic/",
  },
  twitter: {
    title: "The Oral-Systemic Connection | Primary iD",
    description: "How your mouth shapes your heart, brain, sleep, and metabolic health — and what we screen for that most dentists miss.",
  },

}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
