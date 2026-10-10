"use client"

// ============================================================
// HOME: introducing the Primary iD.
// The deck itself is the one /membership/ uses, rendered from /id-deck.js
// (one file for both pages, so the iD never drifts). This section only adds
// the home page's job: say what the iD is for, then one button into the flow.
// ============================================================

import { useEffect, useRef } from "react"
import Script from "next/script"

declare global {
  interface Window { PrimaryIdDeck?: { mount: (el: Element) => void } }
}

export default function PrimaryIdDimensions() {
  const deck = useRef<HTMLDivElement>(null)

  // Mount on arrival, and again after client-side navigation back to the page.
  useEffect(() => {
    if (deck.current && window.PrimaryIdDeck) window.PrimaryIdDeck.mount(deck.current)
  }, [])

  return (
    <section className="pidd" aria-labelledby="pidd-h">
      <style>{`
        .pidd{background:#FAF8F5;padding:104px 24px 96px;border-top:1px solid rgba(14,34,64,.06);overflow:hidden}
        .pidd .in{max-width:1120px;margin:0 auto}
        .pidd .head{text-align:center;max-width:720px;margin:0 auto 40px}
        .pidd .eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#24A7E0}
        .pidd .eyebrow::before,.pidd .eyebrow::after{content:"";width:26px;height:1px;background:#24A7E0}
        .pidd h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:clamp(32px,4.2vw,52px);line-height:1.08;letter-spacing:-.02em;color:#0E2240;margin:18px 0 14px}
        .pidd h2 em{color:#24A7E0;font-style:italic}
        .pidd .lede{font-family:Georgia,"Times New Roman",serif;font-size:18px;line-height:1.62;color:#3a4a66;margin:0 auto;max-width:60ch}
        .pidd .after{display:flex;flex-direction:column;align-items:center;gap:14px;margin-top:36px;text-align:center}
        .pidd .cta{display:inline-flex;align-items:center;gap:8px;background:#0E2240;color:#fff;padding:15px 28px;border-radius:999px;font-size:15px;font-weight:600;text-decoration:none;transition:background .2s}
        .pidd .cta:hover{background:#24A7E0}
        .pidd .disc{font-size:12.5px;color:#7A8695;margin:0;max-width:60ch}
        @media(max-width:760px){.pidd{padding:72px 16px}}
      `}</style>
      <div className="in">
        <div className="head">
          <span className="eyebrow">Your Primary iD</span>
          <h2 id="pidd-h">Know where you stand <em>before you sit in the chair.</em></h2>
          <p className="lede">
            Forty questions, about six minutes. Your Primary iD shows where you are strong and where a first visit would move you most, and Dr. Gabi reads it before he meets you.
          </p>
        </div>

        <div ref={deck} data-id-deck />

        <div className="after">
          <a className="cta" href="/book/">Build your Primary iD →</a>
          <p className="disc">Your Primary iD is directional. It is not a diagnosis, and it is not a measure of biological age.</p>
        </div>
      </div>
      <Script src="/id-deck.js" strategy="afterInteractive" />
    </section>
  )
}
