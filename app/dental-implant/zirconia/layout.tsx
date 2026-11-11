import type { Metadata } from "next"

// Montserrat comes from the parent layout (app/dental-implant/layout.tsx).
export const metadata: Metadata = {
  // absolute: the parent layout sets a plain title, so the site template does not reach this far.
  title: { absolute: "Zirconia Dental Implants in Los Angeles | Primary Integrative Dentistry" },
  description:
    "Zirconia (white ceramic) and titanium dental implants in Brentwood, Los Angeles, planned and placed by Dr. Tzur Gabi, prosthodontist. Book a complimentary virtual consult.",
  alternates: { canonical: "https://myprimaryid.com/dental-implant/zirconia/" },
  openGraph: {
    title: "Zirconia Dental Implants in Los Angeles | Primary iD",
    description: "A metal-free implant option, planned by a prosthodontist. Brentwood, Los Angeles.",
    url: "https://myprimaryid.com/dental-implant/zirconia/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zirconia Dental Implants in Los Angeles | Primary iD",
    description: "A metal-free implant option, planned by a prosthodontist. Brentwood, Los Angeles.",
  },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
