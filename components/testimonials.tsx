"use client"

import { useRef, useState, useEffect } from "react"

type Review = { name: string; text: string; rating: number; when?: string; url?: string | null; tag?: string }
type Feed = { live: boolean; rating?: number | null; count?: number | null; mapsUrl?: string | null; reviews?: Review[] }

const FALLBACK = { rating: 4.9, count: 442 }
const GOOGLE_URL = "https://www.google.com/search?q=Primary+Integrative+Dentistry+by+Dr.+Tzur+Gabi"

// Saved Google reviews (from the live WordPress site). Shown until the live
// feed answers, and alongside it so the row is never short: Google's API
// returns at most five reviews per place. Live reviews come from /api/reviews.
const TESTIMONIALS = [
  {
    name: "Ali D., MD",
    quote:
      "I have been treated by Dr. Gabi and his team for two years, for everything from cleanings to crowns and implants, with excellent results. As a physician myself, I highly recommend Dr. Gabi and his team for any work, regardless of complexity.",
    tag: "Physician patient",
  },
  {
    name: "Sarah H.",
    quote:
      "I really enjoyed how personable Dr. Gabi is. He genuinely listens and is never rushed. He gave me the most thorough cleaning I have ever had, and his office and staff are lovely.",
    tag: "New patient",
  },
  {
    name: "Sivan T.",
    quote:
      "I called for an emergency and Dr. Tzur saw me right away. He was so comforting through the whole experience and completely changed how I feel about going in. I could not recommend a better doctor and team to take care of your smile.",
    tag: "Came in for an emergency",
  },
]

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  cream: "#FAF8F5",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  border: "rgba(14,34,64,0.07)",
  white: "#FEFCF9",
}

const SERIF = "Georgia, serif"
const SANS = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [feed, setFeed] = useState<Feed>({ live: false })
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    fetch("/api/reviews").then((r) => r.json()).then((j: Feed) => { if (j.live) setFeed(j) }).catch(() => {})
  }, [])

  const rating = feed.rating ?? FALLBACK.rating
  const count = feed.count ?? FALLBACK.count
  const countLabel = feed.count ? count.toLocaleString("en-US") : `${count}+`
  const first = (n: string) => n.trim().split(/\s+/)[0].toLowerCase()
  const live = feed.reviews ?? []
  const saved: Review[] = TESTIMONIALS.map((t) => ({ name: t.name, text: t.quote, rating: 5, tag: t.tag }))
    .filter((t) => !live.some((l) => first(l.name) === first(t.name)))
  const reviews: Review[] = [...live, ...saved]
  // one lap is at least eight cards, so it always covers a wide screen; two laps scroll without a seam
  const lap: Review[] = []
  while (lap.length < 8) lap.push(...reviews)
  const loop = [...lap, ...lap]
  const secs = lap.length * 7

  return (
    <section
      ref={ref}
      className="tq"
      style={{
        background: B.cream,
        padding: "96px 0",
        borderTop: `1px solid ${B.border}`,
        borderBottom: `1px solid ${B.border}`,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transition: "all 0.75s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <div
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontSize: 12,
              color: B.blue,
              marginBottom: 16,
              fontWeight: 500,
              fontFamily: SANS,
            }}
          >
            What patients say
          </div>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "var(--fs-h2)",
              fontWeight: 400,
              color: B.navy,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "0 0 48px",
              maxWidth: 680,
            }}
          >
            Rated <span style={{ color: B.blue, fontStyle: "italic" }}>{rating.toFixed(1)} by {countLabel}</span> patients on Google.
          </h2>
        </div>
      </div>

      <div className="tq-rail" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.15s" }}>
        <div className="tq-track" style={{ animationDuration: `${secs}s` }}>
          {loop.map((t, i) => (
            <figure key={i} className="tq-card" aria-hidden={i >= reviews.length ? true : undefined}>
              <div className="tq-stars" aria-label={`${t.rating} out of 5 stars`}>
                {[0, 1, 2, 3, 4].map((s) => (
                  <span key={s} style={{ color: s < Math.round(t.rating) ? "#E8985E" : "rgba(14,34,64,.15)" }}>★</span>
                ))}
              </div>
              <blockquote className="tq-q">&ldquo;{t.text}&rdquo;</blockquote>
              <figcaption className="tq-by">
                <b>{t.url ? <a href={t.url} target="_blank" rel="noopener" tabIndex={i >= reviews.length ? -1 : undefined}>{t.name}</a> : t.name}</b>
                <span>{t.tag ?? ["Google review", t.when].filter(Boolean).join(" · ")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 40,
          textAlign: "center",
          padding: "0 32px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.6s",
        }}
      >
        <a
          href={feed.mapsUrl ?? GOOGLE_URL}
          target="_blank"
          rel="noopener"
          className="tq-all"
          style={{
            fontFamily: SANS,
            fontSize: 14,
            color: B.navy,
            textDecoration: "underline",
            textDecorationColor: "rgba(14,34,64,0.3)",
            textUnderlineOffset: 4,
            opacity: 0.85,
          }}
        >
          Read all {countLabel} reviews on Google →
        </a>
      </div>

      <style>{`
        .tq-rail{position:relative;
          -webkit-mask-image:linear-gradient(to right,transparent,#000 6%,#000 94%,transparent);
          mask-image:linear-gradient(to right,transparent,#000 6%,#000 94%,transparent);}
        .tq-track{display:flex;gap:24px;width:max-content;padding:4px 0 8px;animation:tq-scroll linear infinite;}
        .tq-rail:hover .tq-track,.tq-rail:focus-within .tq-track{animation-play-state:paused;}
        @keyframes tq-scroll{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 12px))}}
        .tq-card{flex:none;width:360px;margin:0;background:${B.white};border:1px solid ${B.border};border-radius:16px;
          padding:30px 28px;display:flex;flex-direction:column;gap:16px;}
        .tq-stars{display:flex;gap:2px;font-size:18px;line-height:1}
        .tq-q{margin:0;font-family:${SERIF};font-size:17px;line-height:1.55;color:${B.body};
          display:-webkit-box;-webkit-line-clamp:7;-webkit-box-orient:vertical;overflow:hidden;}
        .tq-by{margin-top:auto;display:flex;flex-direction:column;gap:2px}
        .tq-by b{font-family:${SANS};font-weight:600;font-size:14px;color:${B.navy}}
        .tq-by b a{color:inherit;text-decoration:none}
        .tq-by span{font-family:${SANS};font-size:12px;color:${B.muted};text-transform:uppercase;letter-spacing:.1em}
        .tq-all{display:inline-flex;align-items:center;min-height:44px}
        @media (max-width:640px){.tq-card{width:290px;padding:26px 22px}.tq-q{font-size:16px}}
        @media (prefers-reduced-motion:reduce){
          .tq-track{animation:none}
          .tq-rail{overflow-x:auto;-webkit-mask-image:none;mask-image:none;padding:0 24px}
          .tq-card[aria-hidden]{display:none}
        }
      `}</style>
    </section>
  )
}
