import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Alignment & Airway | Sleep, Breathing & Bite | Los Angeles",
  description:
    "Airway and sleep screening, functional alignment, and myofunctional therapy in Los Angeles. If you snore, grind, or wake up tired, start with your airway. With Dr. Tzur Gabi, prosthodontist.",
  alternates: { canonical: "https://myprimaryid.com/airway-sleep/" },
  openGraph: {
    title: "Alignment & Airway | Sleep, Breathing & Bite | Primary iD",
    description: "Airway and sleep screening, functional alignment, and myofunctional therapy. Los Angeles.",
    url: "https://myprimaryid.com/airway-sleep/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alignment & Airway | Sleep, Breathing & Bite | Primary iD",
    description: "Airway and sleep screening, functional alignment, and myofunctional therapy. Los Angeles.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
