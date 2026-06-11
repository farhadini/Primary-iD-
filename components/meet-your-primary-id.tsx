"use client";

import { useState, useRef, useEffect } from "react";

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  accent: "#E8985E",
  purple: "#7B68EE",
  gold: "#D4B584",
};

const DIMENSIONS = [
  {
    id: "oral",
    num: "01",
    label: "ORAL HEALTH",
    color: B.green,
    score: 72,
    headline: "What your mouth reveals about your whole body.",
    stat: "Gum disease triples your risk of a second heart attack — most dental visits never check.",
  },
  {
    id: "sleep",
    num: "02",
    label: "SLEEP & AIRWAY",
    color: B.blue,
    score: 68,
    headline: "How you breathe shapes how you heal.",
    stat: "80% of sleep apnea cases go undiagnosed. The first signs often show up in the mouth, not the lungs.",
  },
  {
    id: "nutrition",
    num: "03",
    label: "NUTRITION",
    color: B.accent,
    score: 81,
    headline: "The ecosystem you never see.",
    stat: "700+ bacterial species live in your mouth. Most dentists never test them. We do, because they shape everything downstream.",
  },
  {
    id: "genetics",
    num: "04",
    label: "GENETICS & MICROBIOME",
    color: B.purple,
    score: 75,
    headline: "Your biology, not a template.",
    stat: "Your DNA shapes how your body responds to dental materials, inflammation, and healing. Generic plans ignore this.",
  },
  {
    id: "longevity",
    num: "05",
    label: "LONGEVITY",
    color: B.gold,
    score: 64,
    headline: "Why your mouth ages you faster than anything else.",
    stat: "Chronic oral inflammation accelerates biological aging. Catching it early is the lowest-effort longevity investment most people never make.",
  },
];

function Card({ dim }: { dim: typeof DIMENSIONS[0] }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // stroke-dashoffset calculation: 364.4 is full circle, offset = 364.4 * (1 - score/100)
  const circumference = 364.4;
  const offset = circumference * (1 - dim.score / 100);

  return (
    <article
      ref={ref}
      style={{
        "--accent-color": dim.color,
        position: "relative",
        flex: "0 0 360px",
        minHeight: 540,
        background: B.warm,
        borderRadius: 24,
        padding: "32px 28px 28px",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 2px rgba(14,34,64,0.04), 0 12px 32px -8px rgba(14,34,64,0.08)",
        transition: "transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
        isolation: "isolate",
      } as React.CSSProperties}
      onMouseOver={e => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(14,34,64,0.06), 0 30px 60px -12px rgba(14,34,64,0.18)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(14,34,64,0.04), 0 12px 32px -8px rgba(14,34,64,0.08)";
      }}
    >
      {/* Color tag */}
      <span style={{
        position: "absolute", top: 0, left: 0,
        width: 64, height: 6,
        background: dim.color,
        borderRadius: "0 0 6px 0",
        zIndex: 2,
      }} />

      {/* Soft glow */}
      <div style={{
        position: "absolute", right: "-40%", top: "-40%",
        width: "80%", height: "80%", borderRadius: "50%",
        background: `radial-gradient(circle, ${dim.color} 0%, transparent 60%)`,
        opacity: 0.1,
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Number label */}
      <div style={{
        fontSize: 13, fontWeight: 700,
        letterSpacing: "0.14em", color: dim.color,
        margin: "8px 0 24px",
        zIndex: 2, position: "relative",
        textShadow: `0 0 12px ${dim.color}44`,
      }}>
        {dim.num} / {dim.label}
      </div>

      {/* Ring + score */}
      <div style={{
        width: 132, height: 132,
        position: "relative",
        margin: "0 auto 24px",
        zIndex: 2,
      }}>
        <svg viewBox="0 0 132 132" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
          <circle cx="66" cy="66" r="58" fill="none" stroke="rgba(14,34,64,0.08)" strokeWidth="6" />
          <circle
            cx="66" cy="66" r="58"
            fill="none" stroke={dim.color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={inView ? offset : circumference}
            style={{
              transition: "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)",
              filter: `drop-shadow(0 0 12px ${dim.color}44)`,
            }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          lineHeight: 1,
        }}>
          <span style={{ fontFamily: "Georgia,serif", fontSize: 44, fontWeight: 600, color: B.navy, letterSpacing: "-0.02em" }}>
            {dim.score}
          </span>
          <span style={{ fontSize: 11, color: B.muted, marginTop: 6, letterSpacing: "0.06em" }}>/ 100</span>
        </div>
      </div>

      {/* Sample tag */}
      <div style={{
        margin: "0 auto 28px",
        background: "rgba(14,34,64,0.05)",
        color: B.muted,
        fontSize: 11, fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase",
        padding: "5px 10px", borderRadius: 20,
        zIndex: 2, position: "relative",
        width: "fit-content",
      }}>
        Sample Score
      </div>

      {/* Headline */}
      <h3 style={{
        fontFamily: "Georgia,serif", fontWeight: 400,
        fontSize: 22, lineHeight: 1.25, letterSpacing: "-0.01em",
        color: B.navy, margin: "0 0 12px",
        zIndex: 2, position: "relative",
      }}>
        {dim.headline}
      </h3>

      {/* Stat */}
      <p style={{
        fontSize: 13, lineHeight: 1.55,
        color: B.body, margin: "0 0 28px",
        flex: 1,
        zIndex: 2, position: "relative",
      }}>
        {dim.stat}
      </p>

      {/* CTAs */}
      <div style={{
        display: "flex", gap: 14, alignItems: "center",
        zIndex: 2, position: "relative",
        flexWrap: "wrap",
      }}>
        <a
          href="/diagnostics/"
          style={{
            background: B.navy, color: B.warm,
            padding: "11px 18px", borderRadius: 9,
            textDecoration: "none", fontWeight: 600, fontSize: 13,
            display: "inline-flex", alignItems: "center", gap: 6,
            transition: "background 0.2s ease, transform 0.2s ease",
          }}
          onMouseOver={e => { e.currentTarget.style.background = dim.color; e.currentTarget.style.transform = "translateX(2px)"; }}
          onMouseOut={e => { e.currentTarget.style.background = B.navy; e.currentTarget.style.transform = "translateX(0)"; }}
        >
          Get your score
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        <a
          href="/five-dimensions/"
          style={{
            color: B.navy, textDecoration: "none",
            fontWeight: 500, fontSize: 13,
            display: "inline-flex", alignItems: "center", gap: 4,
            borderBottom: "1px solid rgba(14,34,64,0.2)",
            paddingBottom: 2,
            transition: "color 0.2s ease, border-color 0.2s ease",
          }}
          onMouseOver={e => { e.currentTarget.style.color = dim.color; e.currentTarget.style.borderColor = dim.color; }}
          onMouseOut={e => { e.currentTarget.style.color = B.navy; e.currentTarget.style.borderColor = "rgba(14,34,64,0.2)"; }}
        >
          Learn more
        </a>
      </div>
    </article>
  );
}

export default function MeetYourPrimaryID() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollToCard = (idx: number) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll("article");
    if (!cards[idx]) return;
    const gap = 24;
    const cardWidth = (cards[0] as HTMLElement).offsetWidth + gap;
    carouselRef.current.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
    setActiveIdx(idx);
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll("article");
    const gap = 24;
    const cardWidth = (cards[0] as HTMLElement).offsetWidth + gap;
    const idx = Math.round(carouselRef.current.scrollLeft / cardWidth);
    setActiveIdx(idx);
  };

  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: `radial-gradient(60% 50% at 8% 20%, rgba(36,167,224,0.06), transparent 60%),
                   radial-gradient(50% 40% at 95% 80%, rgba(232,152,94,0.06), transparent 60%),
                   ${B.cream}`,
      padding: "120px 0 140px",
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 48px",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48,
        marginBottom: 56, flexWrap: "wrap",
      }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
  fontSize: 13, fontWeight: 600, color: B.blue,
  letterSpacing: "0.16em", textTransform: "uppercase",
  marginBottom: 24,
  }}>
  <span style={{ width: 32, height: 1, background: B.blue }} />
  Five dimensions. One score.
  </div>
  <h2 style={{
  fontFamily: "Georgia,serif", fontWeight: 400,
  fontSize: "clamp(40px, 5.5vw, 72px)",
  lineHeight: 1.05, letterSpacing: "-0.02em",
  color: B.navy, margin: 0,
  }}>
  Meet Your Primary <em style={{ fontStyle: "italic", color: B.blue }}>iD</em>
  </h2>
          <p style={{
            fontSize: 18, lineHeight: 1.6,
            color: B.body, maxWidth: 540, margin: "24px 0 0",
          }}>
            Each dimension reveals a different layer of how your mouth shapes your whole-body health. Start with one — or get all five.
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => scrollToCard(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            style={{
              width: 48, height: 48, borderRadius: "50%",
              border: "1px solid rgba(14,34,64,0.18)",
              background: B.warm, color: B.navy,
              cursor: activeIdx === 0 ? "not-allowed" : "pointer",
              opacity: activeIdx === 0 ? 0.35 : 1,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scrollToCard(Math.min(DIMENSIONS.length - 1, activeIdx + 1))}
            disabled={activeIdx === DIMENSIONS.length - 1}
            style={{
              width: 48, height: 48, borderRadius: "50%",
              border: "1px solid rgba(14,34,64,0.18)",
              background: B.warm, color: B.navy,
              cursor: activeIdx === DIMENSIONS.length - 1 ? "not-allowed" : "pointer",
              opacity: activeIdx === DIMENSIONS.length - 1 ? 0.35 : 1,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Edge fades */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0, width: 80, zIndex: 5,
          background: `linear-gradient(to right, ${B.cream}, transparent)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, bottom: 0, right: 0, width: 80, zIndex: 5,
          background: `linear-gradient(to left, ${B.cream}, transparent)`,
          pointerEvents: "none",
        }} />

        <div
          ref={carouselRef}
          onScroll={handleScroll}
          style={{
            display: "flex", gap: 24,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            padding: "24px max(48px, calc((100vw - 1280px) / 2 + 48px))",
            scrollPaddingInline: "max(48px, calc((100vw - 1280px) / 2 + 48px))",
          }}
        >
          {DIMENSIONS.map(dim => (
            <Card key={dim.id} dim={dim} />
          ))}
        </div>
      </div>

      {/* Dots */}
      <div style={{
        display: "inline-flex", justifyContent: "center", gap: 8,
        margin: "36px auto 0",
        width: "100%", textAlign: "center",
      }}>
        {DIMENSIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            style={{
              width: activeIdx === i ? 56 : 28, height: 4, borderRadius: 2,
              background: activeIdx === i ? B.navy : "rgba(14,34,64,0.12)",
              border: "none", cursor: "pointer",
              transition: "background 0.3s ease, width 0.3s ease",
            }}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .meet-controls { display: none !important; }
        }
      `}</style>
    </section>
  );
}
