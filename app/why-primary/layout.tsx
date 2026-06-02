import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Why Primary | Integrative Dentistry in Los Angeles",
  description: "Five dimensions of dental and systemic health, not just a cleaning. See why Primary's approach is different from conventional dentistry.",
  alternates: { canonical: "https://myprimaryid.com/why-primary/" },
  openGraph: {
    title: "Why Primary | Integrative Dentistry in Los Angeles",
    description: "Five dimensions of dental and systemic health, not just a cleaning. See why Primary's approach is different from conventional dentistry.",
    url: "https://myprimaryid.com/why-primary/",
  },
  twitter: {
    title: "Why Primary | Integrative Dentistry in Los Angeles",
    description: "Five dimensions of dental and systemic health, not just a cleaning. See why Primary's approach is different from conventional dentistry.",
  },

}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
