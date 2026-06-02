import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Primary iD Diagnostics | 3D Imaging, Salivary & Airway Screening",
  description: "Modern diagnostics beyond the X-ray: 3D CBCT, salivary microbiome, STOP-BANG airway screening, and metabolic markers.",
  alternates: { canonical: "https://myprimaryid.com/diagnostics/" },
  openGraph: {
    title: "Primary iD Diagnostics | 3D Imaging, Salivary & Airway Screening",
    description: "Modern diagnostics beyond the X-ray: 3D CBCT, salivary microbiome, STOP-BANG airway screening, and metabolic markers.",
    url: "https://myprimaryid.com/diagnostics/",
  },
  twitter: {
    title: "Primary iD Diagnostics | 3D Imaging, Salivary & Airway Screening",
    description: "Modern diagnostics beyond the X-ray: 3D CBCT, salivary microbiome, STOP-BANG airway screening, and metabolic markers.",
  },

}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
