import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Cosmetic & Aesthetic Dentistry | Los Angeles",
  description:
    "Cosmetic dentistry rooted in biology, not just appearance. Veneers, whitening, and digital smile design with biocompatible materials in Los Angeles.",
  alternates: { canonical: "https://myprimaryid.com/cosmetic-dentistry/" },
  openGraph: {
    title: "Cosmetic Dentistry in Los Angeles | Primary iD",
    description: "Cosmetic dentistry built on biocompatible materials and biological function.",
    url: "https://myprimaryid.com/cosmetic-dentistry/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmetic Dentistry in Los Angeles | Primary iD",
    description: "Cosmetic dentistry built on biocompatible materials and biological function.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
