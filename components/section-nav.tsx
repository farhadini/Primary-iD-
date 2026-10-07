"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────────────────
// Section navigation for /dental-implant/.
//
// A slim bar that slides in at the top once the visitor is past the hero. It
// names the page's sections in the visitor's words, marks the one they are
// reading, and keeps the one action (the complimentary virtual consult) in reach the
// whole way down. A thin line along the bottom shows how far through the
// page they are.
//
// It is fixed, not sticky, on purpose. The global rule
// `html, body { overflow-x: hidden }` in globals.css stops `position: sticky`
// from working anywhere on the site (it is also why the site header scrolls
// away). If that rule is changed to `overflow-x: clip` and the header starts
// sticking, set --snav-top to the header's height (64px) so this bar sits
// under it.
//
// On a phone the labels scroll sideways and the bar keeps the current one in
// view. The consult button is left to the sticky bar at the bottom of the
// screen there, so it is not shown twice.
// ─────────────────────────────────────────────────────────────────────────

export type NavItem = { id: string; label: string }

export function SectionNav({ items, ctaHref, ctaLabel }: { items: NavItem[]; ctaHref: string; ctaLabel: string }) {
  const [active, setActive] = useState("")
  const [shown, setShown] = useState(false)
  const row = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const read = () => {
      const line = 52 + 44
      const hero = document.querySelector(".imp-hero")
      setShown(hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 500)
      let current = ""
      for (const it of items) {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= line) current = it.id
      }
      setActive(current)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(read) }
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame) }
  }, [items])

  // Keep the current label in view when the row scrolls sideways.
  useEffect(() => {
    const r = row.current
    const a = r?.querySelector<HTMLElement>('[aria-current="true"]')
    if (r && a) r.scrollTo({ left: a.offsetLeft - (r.clientWidth - a.offsetWidth) / 2, behavior: "smooth" })
  }, [active])

  return (
    <nav className="snav" data-snav data-shown={shown} aria-label="On this page">
      <div className="snav-in">
        <div className="snav-row" ref={row} data-snav-row>
          {items.map(it => (
            <a key={it.id} href={`#${it.id}`} className="snav-link" data-snav-link={it.id} aria-current={active === it.id ? "true" : undefined}>
              {it.label}
            </a>
          ))}
        </div>
        <a href={ctaHref} className="snav-cta">{ctaLabel}</a>
      </div>
      <div className="snav-bar" ref={bar} data-snav-bar aria-hidden="true" />
      <style>{`
        .snav { position: fixed; top: var(--snav-top, 0px); left: 0; right: 0; z-index: 150; background: rgba(250,248,245,0.94); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(14,34,64,0.12); transform: translateY(-110%); visibility: hidden; transition: transform 420ms cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 420ms; }
        .snav[data-shown="true"] { transform: none; visibility: visible; transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1), visibility 0s; }
        .snav-in { max-width: 1156px; margin: 0 auto; padding: 0 28px; height: 52px; display: flex; align-items: center; gap: 20px; }
        .snav-row { position: relative; flex: 1 1 auto; min-width: 0; display: flex; align-items: center; gap: 4px; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; -webkit-mask-image: linear-gradient(90deg, #000 calc(100% - 28px), transparent); mask-image: linear-gradient(90deg, #000 calc(100% - 28px), transparent); }
        .snav-row::-webkit-scrollbar { display: none; }
        .snav-link { flex: 0 0 auto; font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 13px; font-weight: 500; color: #3a4a66; text-decoration: none; padding: 7px 12px; border-radius: 999px; white-space: nowrap; transition: background 140ms cubic-bezier(0.16, 1, 0.3, 1), color 140ms cubic-bezier(0.16, 1, 0.3, 1); }
        .snav-link:hover { color: #0E2240; background: rgba(14,34,64,0.06); }
        .snav-link[aria-current="true"] { color: #FFFFFF; background: #0E2240; font-weight: 600; }
        .snav-link:focus-visible, .snav-cta:focus-visible { outline: 3px solid #24A7E0; outline-offset: 2px; }
        .snav-cta { flex: 0 0 auto; font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.02em; color: #0E2240; text-decoration: none; padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(14,34,64,0.3); white-space: nowrap; }
        .snav-cta:hover { background: #0E2240; color: #FFFFFF; border-color: #0E2240; }
        .snav-bar { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: #24A7E0; transform-origin: 0 50%; transform: scaleX(0); }
        @media (max-width: 720px) {
          .snav-in { padding: 0 0 0 12px; height: 48px; gap: 0; }
          .snav-row { padding-right: 20px; }
          .snav-cta { display: none; }
        }
        @media (prefers-reduced-motion: reduce) { .snav, .snav[data-shown="true"], .snav-link { transition: none; } }
      `}</style>
    </nav>
  )
}
