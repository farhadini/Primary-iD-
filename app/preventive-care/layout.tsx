import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Preventive & Whole-Body Dental Care | Los Angeles",
  description:
    "Functional cleanings, whole-body health intake, and oral-systemic prevention in Los Angeles. Catch what routine care misses, with Dr. Tzur Gabi, prosthodontist.",
  alternates: { canonical: "https://myprimaryid.com/preventive-care/" },
  openGraph: {
    title: "Preventive & Whole-Body Dental Care | Primary iD",
    description: "Functional cleanings, whole-body health intake, and oral-systemic prevention. Los Angeles.",
    url: "https://myprimaryid.com/preventive-care/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preventive & Whole-Body Dental Care | Primary iD",
    description: "Functional cleanings, whole-body health intake, and oral-systemic prevention. Los Angeles.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
