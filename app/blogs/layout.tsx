import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Primary Journal | Integrative Dentistry Writing",
  description:
    "Writing on the oral-systemic connection, airway, cosmetic and biological dentistry from Dr. Tzur Gabi and the Primary iD team.",
  alternates: { canonical: "https://myprimaryid.com/blogs/" },
  openGraph: {
    type: "website",
    title: "Primary Journal | Integrative Dentistry Writing",
    description:
      "Writing on the oral-systemic connection, airway, cosmetic and biological dentistry from Dr. Tzur Gabi and the Primary iD team.",
    url: "https://myprimaryid.com/blogs/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primary Journal | Integrative Dentistry Writing",
    description:
      "Writing on the oral-systemic connection, airway, cosmetic and biological dentistry from Dr. Tzur Gabi and the Primary iD team.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
