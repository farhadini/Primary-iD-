import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"

export const metadata: Metadata = {
  title: "Your Primary iD | Primary Integrative Dentistry",
  description:
    "A six-minute conversation across five dimensions of your health. Free and private.",
  robots: { index: false, follow: false },
}

// The onboarding engine ships as a self-contained asset in /public and is mounted
// below the shared site navigation. Same origin, so its calls to /api/lead work
// unchanged.
//
// The nav is deliberately present: this page used to mount the engine as a fixed
// full-viewport iframe, which left anyone who entered the flow with no way back
// to the rest of the site except the browser's back button.
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
    <>
      {/* SiteNav is sticky and takes its own 64px of layout space. */}
      <SiteNav />

      {/*
        vh first, dvh second: browsers that don't understand dvh keep the vh
        rule, and everything modern uses dvh so the engine isn't clipped by
        mobile browser chrome.
      */}
      <style>{`
        .pid-frame {
          display: block;
          width: 100%;
          border: none;
          height: calc(100vh - 64px);
          height: calc(100dvh - 64px);
          min-height: 520px;
        }
      `}</style>

      <iframe className="pid-frame" src={src} title="Primary iD onboarding" />
    </>
  )
}
