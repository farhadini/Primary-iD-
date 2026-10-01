"use client"

import { useEffect, useRef } from "react"
import { SiteHeader, SiteFooter } from "@/components/site-shell"
import { LANDING_MARKUP } from "./landing-markup"
import { initLanding } from "./landing-init"
import "./membership.css"

// ─────────────────────────────────────────────────────────────────────────
// /membership/ : the Primary iD membership landing page.
//
// The design is a standalone page (Farhad's "Landing page (membership section)"),
// kept as designed: markup in landing-markup.ts, styles in membership.css (scoped
// under .pidl), interactions in landing-init.ts. Only the site header and footer
// are swapped in for the page's own floating nav.
//
// Compliance notes:
//   · membership is not insurance and does not pay for treatment (stated on page)
//   · the iD is directional, not a diagnosis, not a measure of biological age
//   · "$99 counts toward membership within 14 days" was approved by counsel
//     per Farhad, 1 Oct 2026
// ─────────────────────────────────────────────────────────────────────────

export default function MembershipPage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    return initLanding(ref.current)
  }, [])

  return (
    <>
      <SiteHeader />
      <div ref={ref} className="pidl" dangerouslySetInnerHTML={{ __html: LANDING_MARKUP }} />
      <SiteFooter />
    </>
  )
}
