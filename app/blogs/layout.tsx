import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Primary Journal | Integrative Dentistry Writing",
  description:
    "Writing on the oral-systemic connection, airway, cosmetic and biological dentistry from Dr. Tzur Gabi and the Primary iD team.",
  alternates: { canonical: "https://myprimaryid.com/blogs/" },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
