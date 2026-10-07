"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────────────────
// The year, as twelve months, for the Primary Scholarship panel on
// /dental-implant/.
//
// What it has to teach in one look: the scholarship is not a one-time draw.
// One is awarded every month, so there is always a next one. Twelve marks,
// one per month, and the mark for the month the visitor is reading in is
// filled. Nothing is marked as "awarded": the drawing says how often, not who
// or how many so far.
//
// Motion: the months arrive one after another at an even pace, because
// months pass at an even pace, and each settles without overshoot. The
// current month fills last and its ring breathes slowly. With reduced motion,
// or without JavaScript, the finished drawing is shown and nothing moves.
// ─────────────────────────────────────────────────────────────────────────

const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export function ScholarshipYear() {
  const ref = useRef<HTMLDivElement>(null)
  // The month is read in the browser so a cached page never shows last month.
  const [now, setNow] = useState<number | null>(null)
  const [phase, setPhase] = useState<"still" | "armed" | "in">("still")

  useEffect(() => {
    setNow(new Date().getMonth())
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    // Already on screen: leave it as it is rather than hide and replay it.
    if (r.top < window.innerHeight && r.bottom > 0) return
    setPhase("armed")
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPhase("in")
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="sy" data-sy data-phase={phase} ref={ref}>
      <div className="sy-grid" role="img" aria-label="The twelve months of the year. One scholarship is awarded in each.">
        {SHORT.map((m, i) => (
          <span key={m} className="sy-m" data-now={i === now} style={{ "--i": i } as React.CSSProperties} aria-hidden="true">
            {m}
          </span>
        ))}
      </div>
      <p className="sy-cap">
        One every month.{now !== null && <> This one is for {FULL[now]}.</>}
      </p>

      <style>{`
        .sy-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
        .sy-m { aspect-ratio: 1; border-radius: 999px; display: grid; place-items: center; font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 16px; color: #7A5C30; border: 1.25px solid rgba(160, 120, 60, 0.36); background: rgba(255, 255, 255, 0.5); transition: opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1), background-color 500ms cubic-bezier(0.16, 1, 0.3, 1), border-color 500ms cubic-bezier(0.16, 1, 0.3, 1), color 500ms cubic-bezier(0.16, 1, 0.3, 1); transition-delay: calc(var(--i) * 70ms); }
        .sy[data-phase="armed"] .sy-m { opacity: 0; transform: scale(0.86); transition: none; }
        .sy-m[data-now="true"] { background: #D4B584; border-color: #D4B584; color: #0E2240; animation: sy-breathe 5s ease-in-out 1.6s infinite; box-shadow: 0 0 0 5px rgba(212, 181, 132, 0.26); }
        .sy-cap { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 15px; line-height: 1.5; color: #7A5C30; margin: 18px 0 0; }
        @keyframes sy-breathe {
          0%, 100% { box-shadow: 0 0 0 5px rgba(212, 181, 132, 0.26); }
          50% { box-shadow: 0 0 0 9px rgba(212, 181, 132, 0.14); }
        }
        @media (max-width: 860px) {
          .sy-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; max-width: none; }
          .sy-m { font-size: 13px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sy-m { transition: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  )
}
