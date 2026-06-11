import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "FAQ | Primary Integrative Dentistry",
  description:
    "Answers to the most common questions about integrative dentistry, insurance, membership, the first visit, and the Primary iD framework.",
  alternates: { canonical: "https://myprimaryid.com/faq/" },
  openGraph: {
    type: "website",
    title: "FAQ | Primary Integrative Dentistry",
    description:
      "Answers to the most common questions about integrative dentistry, insurance, membership, the first visit, and the Primary iD framework.",
    url: "https://myprimaryid.com/faq/",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Primary Integrative Dentistry",
    description:
      "Answers to the most common questions about integrative dentistry, insurance, membership, the first visit, and the Primary iD framework.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
