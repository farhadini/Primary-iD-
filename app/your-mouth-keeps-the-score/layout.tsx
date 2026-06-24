import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Your Mouth Keeps the Score | A New Science of the Mouth | Dr. Tzur Gabi",
  description:
    "Dr. Tzur Gabi's forthcoming book on how oral health shapes your energy, longevity, and whole-body wellbeing. Read the first chapter.",
  alternates: { canonical: "https://myprimaryid.com/your-mouth-keeps-the-score/" },
  openGraph: {
    title: "Your Mouth Keeps the Score | A New Science of the Mouth",
    description:
      "Dr. Tzur Gabi's forthcoming book on how oral health shapes your energy, longevity, and whole-body wellbeing. Read the first chapter.",
    url: "https://myprimaryid.com/your-mouth-keeps-the-score/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Mouth Keeps the Score | A New Science of the Mouth",
    description:
      "Dr. Tzur Gabi's forthcoming book on how oral health shapes your energy, longevity, and whole-body wellbeing. Read the first chapter.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
