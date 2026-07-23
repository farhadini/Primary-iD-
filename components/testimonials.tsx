"use client"

import { useRef, useState, useEffect } from "react"

// Real reviews scraped from the live WordPress site (Google reviews surfaced on myprimaryid.com)
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

  return (
    <section
      ref={ref}
      style={{
        background: B.cream,
        padding: "96px 32px",
        borderTop: `1px solid ${B.border}`,
        borderBottom: `1px solid ${B.border}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
              fontSize: "clamp(32px, 4.5vw, 46px)",
              fontWeight: 400,
              color: B.navy,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "0 0 48px",
              maxWidth: 680,
            }}
          >
            Rated <span style={{ color: B.blue, fontStyle: "italic" }}>4.9 by 442+</span> patients on Google.
          </h2>
        </div>

        <div
          className="t-grid r-grid1 r-gap"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                background: B.white,
                border: `1px solid ${B.border}`,
                borderRadius: 16,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: `all 0.75s cubic-bezier(0.23,1,0.32,1) ${0.1 + i * 0.1}s`,
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                {[0, 1, 2, 3, 4].map((s) => (
                  <span key={s} style={{ color: "#E8985E", fontSize: 18 }}>★</span>
                ))}
              </div>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: B.body,
                  margin: 0,
                }}
              >
                "{t.quote}"
              </p>
              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 14, color: B.navy }}>{t.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 12, color: B.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {t.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.6s",
          }}
        >
          <a
            href="https://www.google.com/search?q=Primary+Integrative+Dentistry+by+Dr.+Tzur+Gabi"
            target="_blank"
            rel="noopener"
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
            Read all 442+ reviews on Google →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .t-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
