import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Cosmetic & Aesthetic Dentistry | Brentwood, Los Angeles",
  description:
    "Cosmetic dentistry rooted in biology, not just appearance. Veneers, whitening, and digital smile design with biocompatible materials in Brentwood, LA.",
  alternates: { canonical: "https://myprimaryid.com/cosmetic-dentistry/" },
  openGraph: {
    title: "Cosmetic Dentistry in Brentwood | Primary iD",
    description: "Cosmetic dentistry built on biocompatible materials and biological function.",
    url: "https://myprimaryid.com/cosmetic-dentistry/",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
