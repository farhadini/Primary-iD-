import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Primary Integrative Dentistry",
  description: "Primary Integrative Dentistry — private page.",
  alternates: { canonical: "https://myprimaryid.com/primaryidFarhad/" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
