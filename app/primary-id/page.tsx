import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Primary iD | Primary Integrative Dentistry",
  description:
    "A six-minute conversation across five dimensions of your health. Free and private.",
  robots: { index: false, follow: false },
}

// The onboarding engine ships as a self-contained asset in /public and is mounted
// full-viewport here. Same origin, so its calls to /api/lead work unchanged.
//
// The query string MUST be forwarded into the iframe: the engine reads ?door= to
// pick the entry door, and the utm_* params to attribute the lead. Without this
// the engine sees a bare URL, falls back to the pathway picker, and attribution
// is silently lost.
export default async function PrimaryIdPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const qs = new URLSearchParams()
  for (const [k, v] of Object.entries(sp)) {
    const val = Array.isArray(v) ? v[0] : v
    if (typeof val === "string" && val) qs.set(k, val)
  }
  const q = qs.toString()
  const src = "/primary-id-app.html" + (q ? `?${q}` : "")

  return (
    <iframe
      src={src}
      title="Primary iD onboarding"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  )
}
