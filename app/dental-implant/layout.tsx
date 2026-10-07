import type { Metadata } from "next"
import { Montserrat } from "next/font/google"

// Brand OS display face. Exposed as a CSS variable so page.tsx can use it
// for headings, labels and buttons; Georgia (a system face) carries the body.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
})
export const metadata: Metadata = {
  title: "Dental Implants in Los Angeles | Zirconia & Titanium",
  description:
    "Zirconia and titanium dental implants in Los Angeles. 3D-guided planning, biocompatible materials, and 25+ years of full-arch experience with Dr. Tzur Gabi.",
  alternates: { canonical: "https://myprimaryid.com/dental-implant/" },
  openGraph: {
    title: "Dental Implants in Los Angeles | Primary iD",
    description: "Zirconia and titanium implants. 3D-guided. Biocompatible. Los Angeles.",
    url: "https://myprimaryid.com/dental-implant/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Implants in Los Angeles | Primary iD",
    description: "Zirconia and titanium implants. 3D-guided. Biocompatible. Los Angeles.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={montserrat.variable}>{children}</div>
}
