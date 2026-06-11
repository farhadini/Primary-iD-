import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Dental Implants in Brentwood | Zirconia & Titanium",
  description:
    "Zirconia and titanium dental implants in Brentwood, Los Angeles. 3D-guided planning, biocompatible materials, and 25+ years of full-arch experience with Dr. Tzur Gabi.",
  alternates: { canonical: "https://myprimaryid.com/dental-implant/" },
  openGraph: {
    title: "Dental Implants in Brentwood | Primary iD",
    description: "Zirconia and titanium implants. 3D-guided. Biocompatible. Brentwood, LA.",
    url: "https://myprimaryid.com/dental-implant/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Implants in Brentwood | Primary iD",
    description: "Zirconia and titanium implants. 3D-guided. Biocompatible. Brentwood, LA.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
