"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────────────────
// Patient story reel, for /dental-implant/.
//
// One story fills the view at a time: a large still of the patient holding
// the photo of their smile before treatment, with their name, their own
// words and the button that plays their video in place. Visitors swipe,
// scroll sideways, use the arrows or the arrow keys to move between stories.
// The neighbouring stories show at the edges so it is clear there are more.
//
// The still is a local image, so the section looks right before anything
// from YouTube has loaded. The YouTube player loads only on play.
//
// Before / after rules that apply here: actual patients only, the procedure
// is named on every story, and the "results may not occur for all patients"
// line sits directly under the reel on the page.
// ─────────────────────────────────────────────────────────────────────────

export type Story = {
  /** The 11-character YouTube video ID. */
  id: string
  /** Display name, e.g. "Dorothy C." */
  name: string
  /** First name only, used in the button and labels. */
  first: string
  /** The procedure, named on every story. */
  treatment: string
  /** Video length as shown, e.g. "1:18". */
  length: string
  /** Local still, e.g. "/images/stories/story-dorothy.jpg". */
  poster: string
  /** Describes the still for screen readers. */
  alt: string
  /** The patient's own words from the video. Leave out if not confirmed. */
  quote?: string
  /** One plain line saying what the photo shows. */
  caption: string
}

const pad = (n: number) => String(n).padStart(2, "0")

export function StoryReel({ stories }: { stories: Story[] }) {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState<string | null>(null)

  // The story nearest the middle of the reel is the active one.
  useEffect(() => {
    const el = track.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const mid = el.scrollLeft + el.clientWidth / 2
        let best = 0
        let gap = Infinity
        el.querySelectorAll<HTMLElement>("[data-sr-slide]").forEach((s, i) => {
          const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid)
          if (d < gap) { gap = d; best = i }
        })
        setActive(best)
      })
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame) }
  }, [])

  // Moving to another story stops the video that was playing.
  useEffect(() => {
    if (playing && stories[active]?.id !== playing) setPlaying(null)
  }, [active, playing, stories])

  const go = (i: number) => {
    const el = track.current
    const s = el?.querySelectorAll<HTMLElement>("[data-sr-slide]")[i]
    if (!el || !s) return
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollTo({ left: s.offsetLeft - (el.clientWidth - s.offsetWidth) / 2, behavior: calm ? "auto" : "smooth" })
  }

  return (
    <div className="sr" data-sr>
      <div
        ref={track}
        className="sr-track"
        data-sr-track
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Patient stories. Swipe or use the arrow keys to move between them."
      >
        {stories.map((s, i) => (
          <article
            key={s.id}
            className="sr-slide"
            data-sr-slide
            data-active={i === active}
            role="group"
            aria-roledescription="slide"
            aria-label={`Story ${i + 1} of ${stories.length}: ${s.name}`}
          >
            <div className="sr-media">
              {playing === s.id ? (
                <iframe
                  className="sr-frame"
                  src={`https://www.youtube-nocookie.com/embed/${s.id}?autoplay=1&rel=0&playsinline=1`}
                  title={`${s.name}, full-arch patient story`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="sr-play"
                  data-sr-play={s.id}
                  onClick={() => { go(i); setPlaying(s.id) }}
                  aria-label={`Play ${s.first}'s story, ${s.length}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="sr-img" src={s.poster} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                  <span className="sr-shade" aria-hidden="true" />
                  <span className="sr-chip" aria-hidden="true">
                    <span className="sr-chip-btn">
                      <svg width="18" height="20" viewBox="0 0 22 24"><path d="M1 1.5 L21 12 L1 22.5 Z" fill="#0E2240" /></svg>
                    </span>
                    <span className="sr-chip-text">
                      <span className="sr-chip-title">Watch {s.first}&rsquo;s story</span>
                      <span className="sr-chip-meta">{s.length}</span>
                    </span>
                  </span>
                </button>
              )}
            </div>

            <div className="sr-body">
              <p className="sr-kicker">Story {pad(i + 1)} <span aria-hidden="true">/</span> {pad(stories.length)}</p>
              <h3 className="sr-name">{s.name}</h3>
              <p className="sr-treat">{s.treatment}</p>
              {s.quote ? (
                <blockquote className="sr-quote">&ldquo;{s.quote}&rdquo;</blockquote>
              ) : null}
              <p className="sr-cap">{s.caption}</p>
              <p className="sr-tap">Tap the photo to watch. {s.length}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="sr-ctl">
        <div className="sr-dots">
          {stories.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="sr-dot"
              data-sr-dot={i}
              aria-label={`Show ${s.first}'s story`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => go(i)}
            />
          ))}
          <p className="sr-count" aria-live="polite">
            <span data-sr-count>{active + 1}</span> of {stories.length}
          </p>
        </div>
        <div className="sr-arrows">
          <button type="button" className="sr-arrow" data-sr-prev aria-label="Previous story" disabled={active === 0} onClick={() => go(active - 1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" className="sr-arrow" data-sr-next aria-label="Next story" disabled={active === stories.length - 1} onClick={() => go(active + 1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <style>{`
        .sr { --sr-w: min(1080px, 86vw); --sr-gap: 28px; position: relative; }
        .sr-track { position: relative; display: flex; gap: var(--sr-gap); overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory; scrollbar-width: none; -webkit-overflow-scrolling: touch; padding: 10px 0 46px; }
        .sr-track::-webkit-scrollbar { display: none; }
        .sr-track::before, .sr-track::after { content: ""; flex: 0 0 calc((100% - var(--sr-w)) / 2 - var(--sr-gap)); }
        .sr-track:focus-visible { outline: 3px solid #24A7E0; outline-offset: -3px; }

        .sr-slide { flex: 0 0 var(--sr-w); scroll-snap-align: center; scroll-snap-stop: always; display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); background: #FEFCF9; border: 1px solid rgba(14,34,64,0.12); border-radius: 24px; overflow: hidden; box-shadow: 0 36px 70px -46px rgba(14,34,64,0.45); opacity: 0.4; transform: scale(0.97); transition: opacity 500ms ease, transform 500ms ease; }
        .sr-slide[data-active="true"] { opacity: 1; transform: none; }

        .sr-media { position: relative; aspect-ratio: 11 / 10; background: #07142A; overflow: hidden; }
        .sr-play { position: absolute; inset: 0; display: block; width: 100%; height: 100%; padding: 0; border: 0; background: none; cursor: pointer; text-align: left; }
        .sr-img { position: absolute; inset: 0; width: 100%; height: 100% !important; max-width: none; object-fit: cover; transform-origin: 50% 38%; }
        .sr-slide[data-active="true"] .sr-img { animation: sr-settle 9s cubic-bezier(0.2, 0.6, 0.2, 1) both; }
        @keyframes sr-settle { from { transform: scale(1.07); } to { transform: scale(1); } }
        .sr-shade { position: absolute; inset: 0; background: linear-gradient(20deg, rgba(7,20,42,0.62) 0%, rgba(7,20,42,0.18) 30%, rgba(7,20,42,0) 52%); }
        .sr-chip { position: absolute; left: 24px; bottom: 24px; display: flex; align-items: center; gap: 14px; }
        .sr-chip-btn { width: 62px; height: 62px; border-radius: 999px; background: #FEFCF9; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 26px rgba(7,20,42,0.35); transition: transform 160ms ease; }
        .sr-chip-btn svg { margin-left: 4px; }
        .sr-play:hover .sr-chip-btn, .sr-play:focus-visible .sr-chip-btn { transform: scale(1.07); }
        .sr-play:focus-visible { outline: 3px solid #24A7E0; outline-offset: -3px; }
        .sr-chip-text { display: grid; gap: 2px; }
        .sr-chip-title { font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 15px; font-weight: 600; letter-spacing: 0.01em; color: #FFFFFF; text-shadow: 0 1px 12px rgba(7,20,42,0.5); }
        .sr-chip-meta { font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 12.5px; font-weight: 500; letter-spacing: 0.04em; color: rgba(255,255,255,0.86); text-shadow: 0 1px 12px rgba(7,20,42,0.5); }
        .sr-frame { position: absolute; left: 0; top: 50%; width: 100%; aspect-ratio: 16 / 9; transform: translateY(-50%); border: 0; }

        .sr-body { display: flex; flex-direction: column; justify-content: center; padding: 44px 44px 44px 46px; }
        .sr-kicker { font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #24A7E0; margin: 0 0 18px; }
        .sr-name { font-family: Georgia, 'Times New Roman', serif; font-size: clamp(34px, 3.6vw, 50px); font-weight: 400; letter-spacing: -0.02em; line-height: 1.05; color: #0E2240; margin: 0; }
        .sr-treat { font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 13.5px; font-weight: 500; line-height: 1.5; color: #7A8695; margin: 10px 0 0; }
        .sr-quote { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: clamp(21px, 2vw, 27px); line-height: 1.34; letter-spacing: -0.01em; color: #0E2240; margin: 30px 0 0; padding: 0 0 0 20px; border-left: 2px solid #24A7E0; }
        .sr-cap { font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 14.5px; line-height: 1.6; color: #3a4a66; margin: 26px 0 0; }

        .sr-tap { display: none; font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 13px; font-weight: 600; color: #0E2240; margin: 14px 0 0; }

        .sr-ctl { width: var(--sr-w); margin: -18px auto 0; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .sr-dots { display: flex; align-items: center; gap: 8px; }
        .sr-dot { position: relative; width: 44px; height: 32px; padding: 0; border: 0; background: none; cursor: pointer; }
        .sr-dot::before { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 3px; margin-top: -1.5px; border-radius: 2px; background: rgba(14,34,64,0.18); transition: background 300ms ease; }
        .sr-dot[aria-current="true"]::before { background: #0E2240; }
        .sr-dot:focus-visible, .sr-arrow:focus-visible { outline: 3px solid #24A7E0; outline-offset: 2px; }
        .sr-count { font-family: Georgia, 'Times New Roman', serif; font-size: 15px; color: #7A8695; margin: 0 0 0 10px; }
        .sr-arrows { display: flex; gap: 10px; }
        .sr-arrow { width: 48px; height: 48px; border-radius: 999px; background: #FFFFFF; border: 1px solid rgba(14,34,64,0.14); color: #0E2240; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color 160ms ease, opacity 160ms ease; }
        .sr-arrow:hover:not(:disabled) { border-color: #0E2240; }
        .sr-arrow:disabled { opacity: 0.35; cursor: default; }

        @media (max-width: 860px) {
          .sr { --sr-gap: 14px; }
          .sr-slide { grid-template-columns: 1fr; }
          .sr-media { aspect-ratio: 1 / 1; }
          .sr-body { justify-content: flex-start; padding: 26px 24px 30px; }
          .sr-kicker { margin-bottom: 12px; }
          .sr-quote { margin-top: 20px; padding-left: 16px; }
          .sr-cap { margin-top: 18px; }
          .sr-chip { left: 16px; bottom: 16px; }
          .sr-chip-btn { width: 52px; height: 52px; }
          .sr-chip-text { display: none; }
          .sr-shade { background: linear-gradient(35deg, rgba(7,20,42,0.45) 0%, rgba(7,20,42,0) 34%); }
          .sr-tap { display: block; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sr-slide, .sr-chip-btn, .sr-dot::before, .sr-arrow { transition: none !important; }
          .sr-slide { transform: none !important; }
          .sr-slide[data-active="true"] .sr-img { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
