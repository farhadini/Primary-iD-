import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "FAQ | Primary Integrative Dentistry",
  description:
    "Answers to the most common questions about integrative dentistry, insurance, membership, the first visit, and the Primary iD framework.",
  alternates: { canonical: "https://myprimaryid.com/faq/" },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
