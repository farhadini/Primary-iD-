import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "The Five Dimensions | Primary iD",
  description:
    "One mouth. Five dimensions of you: oral health, sleep and airway, nutrition, family history and longevity. Forty questions, about six minutes, read by Dr. Gabi before your first visit.",
  alternates: { canonical: "https://myprimaryid.com/five-dimensions/" },
  openGraph: {
    title: "The Five Dimensions | Primary iD",
    description: "Five dimensions of your health, read from your mouth. About six minutes. Directional, not a diagnosis.",
    url: "https://myprimaryid.com/five-dimensions/",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Five Dimensions | Primary iD",
    description: "Five dimensions of your health, read from your mouth. About six minutes. Directional, not a diagnosis.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
