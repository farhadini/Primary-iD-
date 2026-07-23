"use client";

// Primary Integrative Dentistry, Section 02: Oral-Systemic Insight
// ---------------------------------------------------------------------------
// Renders the dark-navy oral-systemic block with:
//   - eyebrow, display headline ("What is your mouth telling you?"), subhead, CTA
//   - Midjourney hero image on the right
//   - animated score card overlay cycling through 5 dimensions
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH: sample dimension scores + cycle timing
// ---------------------------------------------------------------------------
const DIMENSIONS = [
  { name: "Oral Health",           score: 72, color: "#48C28C" }, // green
  { name: "Sleep & Airway",        score: 68, color: "#24A7E0" }, // blue
  { name: "Nutrition",             score: 81, color: "#C7305A" }, // pink
  { name: "Genetics & Microbiome", score: 75, color: "#7B68EE" }, // purple
  { name: "Longevity",             score: 64, color: "#0E2240" }, // navy
];
const CYCLE_MS = 3000; // how long each dimension is on-screen
const COUNT_MS = 700;  // how long the number counts up/down
const CIRC     = 150.8;  // 2 * π * r, where r = 24 (ring radius)

// Brand tokens
const C = {
  navy:   "#0E2240",
  navy2:  "#0a1a33",
  blue:   "#24A7E0",
  green:  "#48C28C",
  cream:  "#FAF8F5",
  warm:   "#FEFCF9",
  body:   "#4A4A5A",
  muted:  "#8A8A9A",
  accent: "#E8985E",
  purple: "#7B68EE",
  gold:   "#D4B584",
};
const SERIF = 'Georgia, "Times New Roman", serif';
const SANS  = 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const MW    = 1280;

// ---------------------------------------------------------------------------
// Shared state context for dimension index
// ---------------------------------------------------------------------------
import { createContext, useContext } from "react";
const DimensionContext = createContext<{ idx: number; setIdx: (n: number) => void }>({ idx: 0, setIdx: () => {} });

// ---------------------------------------------------------------------------
// ScoreCard: animated overlay. Cycles through DIMENSIONS.
// ---------------------------------------------------------------------------
function ScoreCard() {
  const { idx, setIdx } = useContext(DimensionContext);
  const [displayScore, setDisplayScore] = useState(0);
  const displayRef = useRef(0);

  // keep a ref in sync so the animation frame can read the latest value
  useEffect(() => {
    displayRef.current = displayScore;
  }, [displayScore]);

  // cycle through dimensions unless user prefers reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % DIMENSIONS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  // ease-out count animation whenever idx changes
  useEffect(() => {
    const target = DIMENSIONS[idx].score;
    const start  = displayRef.current;
    if (start === target) return;
    const startTime = performance.now();
    let raf: number;
    const step = (t: number) => {
      const p = Math.min(1, (t - startTime) / COUNT_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayScore(Math.round(start + (target - start) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [idx]);

  const d = DIMENSIONS[idx];
  const offset = CIRC * (1 - d.score / 100);

  return (
    <div
      aria-live="polite"
      style={{
        position: "absolute",
        left: 24,
        bottom: 24,
        background: "rgba(10, 18, 38, 0.85)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 16,
        padding: "14px 20px 14px 14px",
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        minWidth: 280,
        boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        zIndex: 2,
      }}
    >
      {/* Ring + number */}
      <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
        <svg
          width={56}
          height={56}
          viewBox="0 0 56 56"
          style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
        >
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="4"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke={d.color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            style={{
              transition:
                "stroke-dashoffset 0.9s cubic-bezier(.4,0,.2,1), stroke 0.9s ease",
            }}
          />
        </svg>
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: SERIF,
            fontSize: 22,
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          {displayScore}
        </span>
      </div>

      {/* Label + subtitle */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.15,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontSize: 20,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "color 0.5s ease",
          }}
        >
          <span style={{ color: d.color, filter: "brightness(1.3)", textShadow: `0 0 16px ${d.color}` }}>{d.name}</span>
        </span>
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 12,
            color: "#9AA3B8",
            marginTop: 4,
            letterSpacing: "0.01em",
          }}
        >
          Sample · Discover yours in 6 min
        </span>
      </div>

      {/* 5-dot progress indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -16,
          display: "flex",
          justifyContent: "center",
          gap: 6,
          pointerEvents: "none",
        }}
      >
        {DIMENSIONS.map((_, i) => (
          <span
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: i === idx ? "#FFFFFF" : "rgba(255,255,255,0.18)",
              transform: i === idx ? "scale(1.25)" : "scale(1)",
              transition: "background 0.3s ease, transform 0.3s ease",
              display: "inline-block",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Figure: Midjourney hero image with score card overlay and highlight zones
// ---------------------------------------------------------------------------
// Highlight positions mapped to each dimension (index-based):
// 0 = Oral Health → teeth area
// 1 = Sleep & Airway → nose/front of mouth
// 2 = Nutrition → throat
// 3 = Genetics & Microbiome → brain
// 4 = Longevity → spine/airway
const HIGHLIGHTS = [
  { top: "58%", left: "28%", width: "22%", height: "14%", color: "#48C28C" }, // teeth
  { top: "38%", left: "8%",  width: "18%", height: "18%", color: "#24A7E0" }, // nose/mouth front
  { top: "72%", left: "32%", width: "16%", height: "16%", color: "#C7305A" }, // throat
  { top: "18%", left: "42%", width: "28%", height: "24%", color: "#7B68EE" }, // brain
  { top: "55%", left: "52%", width: "14%", height: "38%", color: "#0E2240" }, // spine
];

function Figure() {
  const { idx } = useContext(DimensionContext);
  
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        aspectRatio: "1 / 1",
        background:
          "radial-gradient(60% 50% at 50% 45%, rgba(232,152,94,0.18), transparent 60%), linear-gradient(160deg, #b4c8dc 0%, #6e8aa8 40%, #2a3f5e 100%)",
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)",
      }}
    >
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oral-systemic-hero.png-6CM2APyRQW9Mt0hW76yQ2h5KWtJq3d.jpeg"
        alt="Side profile x-ray illustration showing a woman's skull, teeth, and brain highlighting the oral-systemic health connection"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      
      {/* Animated highlight overlays for each dimension */}
      {HIGHLIGHTS.map((h, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: h.top,
            left: h.left,
            width: h.width,
            height: h.height,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${h.color}55 0%, ${h.color}22 40%, transparent 70%)`,
            boxShadow: idx === i ? `0 0 40px 15px ${h.color}44, 0 0 80px 30px ${h.color}22` : "none",
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? "scale(1.1)" : "scale(0.8)",
            transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease",
            pointerEvents: "none",
          }}
        />
      ))}
      
      {/* Pulsing ring on active highlight */}
      {HIGHLIGHTS.map((h, i) => (
        <div
          key={`ring-${i}`}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: h.top,
            left: h.left,
            width: h.width,
            height: h.height,
            borderRadius: "50%",
            border: `2px solid ${h.color}`,
            opacity: idx === i ? 0.6 : 0,
            transform: idx === i ? "scale(1.3)" : "scale(0.8)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            animation: idx === i ? "pulseRing 2s ease-in-out infinite" : "none",
            pointerEvents: "none",
          }}
        />
      ))}
      
      <style>{`
        @keyframes pulseRing {
          0%, 100% { transform: scale(1.1); opacity: 0.6; }
          50% { transform: scale(1.4); opacity: 0.2; }
        }
      `}</style>
      
      {/* inner vignette so the overlay card reads on the image */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(6,14,30,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
      <ScoreCard />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export default function OralSystemicSection() {
  const [idx, setIdx] = useState(0);
  
  return (
    <DimensionContext.Provider value={{ idx, setIdx }}>
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(80% 60% at 90% 20%, rgba(36,167,224,0.12), transparent 60%), radial-gradient(70% 50% at 10% 80%, rgba(123,104,238,0.08), transparent 60%), linear-gradient(180deg, #08142a 0%, #0E2240 60%, #0a1a33 100%)",
        padding: "120px 48px",
        color: "#EEF1F6",
      }}
    >
      <div
        className="pid-os-grid r-grid1 r-gap"
        style={{
          maxWidth: MW,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* LEFT: copy */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              fontWeight: 600,
              color: C.blue,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 28,
              fontFamily: SANS,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 32,
                height: 1,
                background: C.blue,
                display: "inline-block",
              }}
            />
            Oral-Systemic Health
          </div>

          <h2
            className="r-h1"
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(48px, 6vw, 84px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            What is your mouth telling{" "}
            <span style={{ color: C.blue, fontStyle: "italic", fontWeight: 400 }}>
              you
            </span>
            ?
          </h2>

          <p
            style={{
              fontFamily: SANS,
              fontSize: 18,
              lineHeight: 1.6,
              color: "#B8C0D0",
              marginTop: 32,
              maxWidth: 520,
            }}
          >
            Emerging research shows your oral health is connected to your heart,
            brain, immune system, and sleep. At Primary, we look at the whole
            picture, not just your teeth.
          </p>

          <div
            style={{
              marginTop: 44,
              display: "inline-flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <a
              href="/diagnostics/"
              data-analytics="oral_systemic_cta"
              className="r-full"
              style={{
                background: C.blue,
                color: "#FFFFFF",
                padding: "18px 32px",
                borderRadius: 9,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
                fontFamily: SANS,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                boxShadow: "0 20px 40px -12px rgba(36, 167, 224, 0.45)",
                width: 320,
              }}
            >
              Get my Primary Health Score
              <ArrowRight size={18} />
            </a>
            <p
              style={{
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "#7A8395",
                margin: 0,
                fontWeight: 500,
              }}
            >
              5 dimensions · 50 questions · personalized results
            </p>
            <a
              href="/oral-systemic/"
              style={{
                marginTop: 8,
                fontSize: 14,
                color: C.blue,
                textDecoration: "none",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "opacity 0.2s ease",
              }}
              onMouseOver={(e) => { e.currentTarget.style.opacity = "0.75"; }}
              onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Read the science behind it
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* RIGHT: image + animated score card */}
        <div>
          <Figure />
        </div>
      </div>

      {/* Responsive stack */}
      <style>{`
        @media (max-width: 960px) {
          .pid-os-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
    </DimensionContext.Provider>
  );
}
