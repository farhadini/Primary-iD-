"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────────────────
// "The Things We Miss": the campaign, as the closing band of /dental-implant/.
//
// The campaign frames, one at a time: a large line of type beside one
// picture. The frames change on their own every few seconds, and visitors can
// swipe, use the markers, or pause. The lines are the campaign's own.
//
// Motion: the outgoing frame fades, the incoming line rises a few pixels and
// the picture settles from slightly enlarged. Slow, because this is the
// moment the page stops explaining. With reduced motion nothing moves on its
// own and the change is instant.
//
// The photographs are the campaign's 4:5 portraits, shown whole so no face is
// cropped. How they are captioned is settled outside this file; check the
// handoff brief before launch.
// ─────────────────────────────────────────────────────────────────────────

export type MissFrame = {
  /** The line, split so one phrase can be set in gold italic. */
  lead: string
  accent: string
  /** One supporting line. */
  sub: string
  img: string
  alt: string
}

export function ThingsWeMiss({ frames, interval = 7000 }: { frames: MissFrame[]; interval?: number }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const hold = useRef(false)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = window.setInterval(() => {
      if (!hold.current && !document.hidden) setActive(a => (a + 1) % frames.length)
    }, interval)
    return () => window.clearInterval(t)
  }, [paused, frames.length, interval])

  const step = (d: number) => setActive(a => (a + d + frames.length) % frames.length)

  return (
    <div
      className="twm"
      data-twm={interval}
      onMouseEnter={() => { hold.current = true }}
      onMouseLeave={() => { hold.current = false }}
      onFocus={() => { hold.current = true }}
      onBlur={() => { hold.current = false }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 44) step(dx < 0 ? 1 : -1)
      }}
    >
      <div className="twm-stage" role="group" aria-roledescription="carousel" aria-label="The Things We Miss">
        {frames.map((f, i) => (
          <div key={i} className="twm-frame" data-twm-frame data-active={i === active} aria-hidden={i !== active}>
            <div className="twm-copy">
              <p className="twm-line">
                {f.lead} <em>{f.accent}</em>
              </p>
              <p className="twm-sub">{f.sub}</p>
            </div>
            <div className="twm-pic">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.img} alt={f.alt} loading="lazy" decoding="async" />
            </div>
          </div>
        ))}
      </div>

      <div className="twm-ctl">
        <div className="twm-dots">
          {frames.map((f, i) => (
            <button
              key={i}
              type="button"
              className="twm-dot"
              data-twm-dot={i}
              aria-label={`Show frame ${i + 1} of ${frames.length}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button type="button" className="twm-pause" data-twm-pause aria-pressed={paused} onClick={() => setPaused(p => !p)}>
          {paused ? "Play" : "Pause"}
        </button>
      </div>

      <style>{`
        .twm-stage { display: grid; }
        .twm-frame { grid-area: 1 / 1; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 460px); gap: 72px; align-items: center; opacity: 0; visibility: hidden; transition: opacity 900ms cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 900ms; }
        .twm-frame[data-active="true"] { opacity: 1; visibility: visible; transition: opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), visibility 0s; }
        .twm-copy { transform: translateY(14px); transition: transform 1100ms cubic-bezier(0.16, 1, 0.3, 1); }
        .twm-frame[data-active="true"] .twm-copy { transform: none; }
        .twm-line { font-family: Georgia, 'Times New Roman', serif; font-size: clamp(40px, 5.6vw, 76px); font-weight: 400; line-height: 1.04; letter-spacing: -0.025em; color: #FFFFFF; margin: 0 0 24px; text-wrap: balance; }
        .twm-line em { font-style: italic; color: #D4B584; }
        .twm-sub { font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 17px; line-height: 1.6; color: rgba(255,255,255,0.74); margin: 0; max-width: 40ch; }
        .twm-pic { position: relative; aspect-ratio: 4 / 5; border-radius: 24px; overflow: hidden; background: #0E2240; }
        .twm-pic img { position: absolute; inset: 0; width: 100%; height: 100% !important; max-width: none; object-fit: cover; transform: scale(1.03); transition: transform 7000ms cubic-bezier(0.2, 0.6, 0.2, 1); }
        .twm-frame[data-active="true"] .twm-pic img { transform: scale(1); }

        .twm-ctl { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 36px; }
        .twm-dots { display: flex; gap: 8px; }
        .twm-dot { position: relative; width: 44px; height: 32px; padding: 0; border: 0; background: none; cursor: pointer; }
        .twm-dot::before { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 3px; margin-top: -1.5px; border-radius: 2px; background: rgba(255,255,255,0.24); transition: background 300ms ease; }
        .twm-dot[aria-current="true"]::before { background: #D4B584; }
        .twm-pause { font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.74); background: none; border: 1px solid rgba(255,255,255,0.28); border-radius: 999px; padding: 8px 16px; cursor: pointer; }
        .twm-pause:hover { color: #FFFFFF; border-color: rgba(255,255,255,0.6); }
        .twm-dot:focus-visible, .twm-pause:focus-visible { outline: 3px solid #5BC0EC; outline-offset: 2px; }

        @media (max-width: 860px) {
          .twm-frame { grid-template-columns: 1fr; gap: 28px; align-items: start; }
          .twm-pic { order: -1; max-width: 420px; }
          .twm-line { margin-bottom: 16px; }
          .twm-ctl { margin-top: 26px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .twm-frame, .twm-copy, .twm-pic img, .twm-dot::before { transition: none !important; }
          .twm-copy, .twm-pic img { transform: none !important; }
          .twm-pause { display: none; }
        }
      `}</style>
    </div>
  )
}
