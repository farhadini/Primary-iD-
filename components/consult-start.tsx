"use client"

import { useEffect, useState } from "react"
import { VirtualConsult } from "@/components/virtual-consult"

// ─────────────────────────────────────────────────────────────────────────
// The one place on /dental-implant/ where a visitor raises their hand.
//
// Two ways in, one card: "About my teeth" (the complimentary virtual consult) and
// "About paying for it" (the financing questions). Both end in the same call
// from the iD Guide, so the page asks for one thing, not two.
//
// Any link or button on the page can open a particular side by carrying
// data-consult-track="consult" or "financing" (and href="#virtual-consult"
// to scroll here). The financing buttons in the cost section do that.
//
// Neither side is wired yet. See the TODO in virtual-consult.tsx.
// ─────────────────────────────────────────────────────────────────────────

type Track = "consult" | "financing"

const TABS: { track: Track; label: string }[] = [
  { track: "consult", label: "About my teeth" },
  { track: "financing", label: "About paying for it" },
]

export function ConsultStart() {
  const [track, setTrack] = useState<Track>("consult")

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-consult-track]")
      if (el) setTrack(el.getAttribute("data-consult-track") === "financing" ? "financing" : "consult")
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <div className="cs" data-consult>
      <div className="cs-tabs" role="tablist" aria-label="What would you like to talk about?">
        {TABS.map(t => (
          <button key={t.track} type="button" role="tab" className="cs-tab" data-consult-tab={t.track} data-consult-track={t.track} aria-selected={track === t.track}>
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map(t => (
        <div key={t.track} role="tabpanel" data-consult-panel={t.track} hidden={track !== t.track}>
          <VirtualConsult track={t.track} />
        </div>
      ))}
      <style>{`
        .cs-tabs { display: inline-flex; gap: 4px; padding: 4px; margin: 0 0 14px; background: rgba(14,34,64,0.06); border-radius: 999px; }
        .cs-tab { font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 13.5px; font-weight: 600; color: #3a4a66; background: transparent; border: 0; border-radius: 999px; padding: 9px 18px; cursor: pointer; }
        .cs-tab[aria-selected="true"] { background: #0E2240; color: #FFFFFF; }
        .cs-tab:focus-visible { outline: 3px solid #24A7E0; outline-offset: 2px; }
        @media (max-width: 420px) { .cs-tab { padding: 9px 13px; font-size: 13px; } }
      `}</style>
    </div>
  )
}
