import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Wholistic Dentistry in Los Angeles | Whole-Body Dental Care",
  description:
    "Wholistic dentistry that treats your mouth as part of your whole body. Airway, microbiome, sleep, nutrition, and metabolic markers all screened, not just teeth. Los Angeles.",
  alternates: { canonical: "https://myprimaryid.com/wholistic-dentistry/" },
  openGraph: {
    title: "Wholistic Dentistry in Los Angeles | Primary iD",
    description: "Dentistry that sees the whole you: airway, microbiome, sleep, metabolism, and teeth.",
    url: "https://myprimaryid.com/wholistic-dentistry/",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
