import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Primary iD | Primary Integrative Dentistry",
  description:
    "A six-minute conversation across five dimensions of your health. Free and private.",
  robots: { index: false, follow: false },
}

// The onboarding engine ships as a self-contained asset in /public and is mounted
// full-viewport here. Same origin, so its calls to /api/lead work unchanged.
export default function PrimaryIdPage() {
  return (
    <iframe
      src="/primary-id-app.html"
      title="Primary iD onboarding"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  )
}
