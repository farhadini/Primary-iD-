import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Safe Mercury Filling Removal (SMART Protocol) | Brentwood",
  description:
    "IAOMT-trained safe mercury amalgam removal using the SMART Protocol — rubber dam, high-volume suction, separate air supply, and mercury vapor capture. Brentwood, LA.",
  alternates: { canonical: "https://myprimaryid.com/safe-mercury-removal/" },
  openGraph: {
    title: "Safe Mercury Removal | SMART Protocol | Primary iD",
    description: "IAOMT-trained safe amalgam removal in Brentwood, Los Angeles.",
    url: "https://myprimaryid.com/safe-mercury-removal/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe Mercury Removal | SMART Protocol | Primary iD",
    description: "IAOMT-trained safe amalgam removal in Brentwood, Los Angeles.",
  },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
