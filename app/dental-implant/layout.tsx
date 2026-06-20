import type { Metadata } from "next"
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
export default function Layout({ children }: { children: React.ReactNode }) { return children }
