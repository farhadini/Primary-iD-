import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your First Visit | Primary Integrative Dentistry",
  description: "What to expect at your first visit: 90-minute comprehensive intake, 3D imaging, salivary diagnostics, and your personal Primary iD score.",
  alternates: { canonical: "https://myprimaryid.com/new-patient/" },
  openGraph: {
    title: "Your First Visit | Primary Integrative Dentistry",
    description: "What to expect at your first visit: 90-minute comprehensive intake, 3D imaging, salivary diagnostics, and your personal Primary iD score.",
    url: "https://myprimaryid.com/new-patient/",
  },
  twitter: {
    title: "Your First Visit | Primary Integrative Dentistry",
    description: "What to expect at your first visit: 90-minute comprehensive intake, 3D imaging, salivary diagnostics, and your personal Primary iD score.",
  },

}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
