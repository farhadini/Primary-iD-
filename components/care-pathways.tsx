"use client";

import { useRef, useState, useEffect } from "react";

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  accent: "#E8985E",
  purple: "#7B68EE",
  gold: "#D4B584",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  white: "#FFFFFF",
  border: "rgba(14,34,64,0.08)",
};

const PATHWAYS = [
  {
    id: "preventive",
    tag: "Pathway 01",
    title: "Preventive & Whole-Body Care",
    descriptor: "Catch what your dentist usually misses.",
    bullets: [
      "Whole-body health intake",
      "Functional cleanings & exams",
      "Inflammation & nutrition guidance",
      "Annual Primary iD reassessment",
    ],
    color: B.green,
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Preventive%20animation%20primary%20website-7NMs5H9K3b0dHyh1Xqv5IcpBuhUWxg.mp4",
  },
  {
    id: "airway",
    tag: "Pathway 02",
    title: "Alignment & Airway",
    descriptor: "Sleep, breathe, and grow into your face.",
    bullets: [
      "Airway & sleep screening",
      "Functional orthodontics",
      "Myofunctional therapy",
      "Snoring & bruxism support",
    ],
    color: B.blue,
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/airway%20animation%20primary%20website%20-9l4BM1zmKujete7CL9KKlxEPCIBU7m.mp4",
  },
  {
    id: "cosmetic",
    tag: "Pathway 03",
    title: "Cosmetic & Aesthetic",
    descriptor: "A smile that looks like you, only happier.",
    bullets: [
      "Veneers, bonding, contouring",
      "Whitening protocols",
      "Smile-design consultation",
      "Facial-harmony review",
    ],
    color: B.accent,
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cosmetic%20animation%20primary%20website%20-X1m3aM6PQQ3fbsne2EPyHW1kuwcMjl.mp4",
  },
  {
    id: "implants",
    tag: "Pathway 04",
    title: "Full Arch & Implants",
    descriptor: "A second chance to chew, speak, and smile.",
    bullets: [
      "Single & multiple implants",
      "All-on-4 / All-on-X full arch",
      "Bone & tissue regeneration",
      "Long-term implant maintenance",
    ],
    color: B.purple,
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/full%20arch%20animation%20primary%20website%20-joCDh7UiAWPckVU6SywyougZWa4s26.mp4",
  },
  {
    id: "longevity",
    tag: "Pathway 05",
    title: "Longevity",
    descriptor: "Add years to your life, and life to your years.",
    bullets: [
      "Biological age assessment",
      "PRF & regenerative therapies",
      "Oral microbiome optimization",
      "Biocompatible material protocols",
    ],
    color: B.gold,
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/primary%20longevity%20animation%20-BtdkXWqB0De3K05pc18lpjuUHsnXmj.mp4",
  },
];

const ROTATING_WORDS = ["Oral", "Dental", "Functional", "Holistic", "Oral"];

export default function CarePathways() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [wordIdx, setWordIdx] = useState(0);

  // Rotating words animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % (ROTATING_WORDS.length - 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const updateButtons = () => {
    if (!scrollerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 2);
  };

  useEffect(() => {
    updateButtons();
    window.addEventListener("resize", updateButtons);
    return () => window.removeEventListener("resize", updateButtons);
  }, []);

  const scroll = (dir: number) => {
    if (!scrollerRef.current) return;
    const card = scrollerRef.current.querySelector("article");
    if (!card) return;
    const gap = 20;
    const cardWidth = card.getBoundingClientRect().width + gap;
    scrollerRef.current.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "80px 48px 120px", maxWidth: 1280, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, gap: 24, flexWrap: "wrap" }}>
        <div>
          <p style={{
            fontSize: 13, fontWeight: 600, color: B.blue,
            letterSpacing: "0.16em", textTransform: "uppercase",
            margin: "0 0 16px", display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ width: 32, height: 1, background: B.blue }} />
            Care Pathways
          </p>
          <h2 style={{
            fontFamily: "Georgia, serif", fontWeight: 400,
            fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.15,
            letterSpacing: "-0.02em", margin: 0, color: B.navy,
          }}>
            The{" "}
            <span style={{
              display: "inline-block", height: "1.15em", overflow: "hidden",
              verticalAlign: "bottom", position: "relative", minWidth: "5.5em",
            }}>
              <span style={{
                display: "flex", flexDirection: "column",
                transform: `translateY(-${wordIdx * 1.15}em)`,
                transition: "transform 0.5s cubic-bezier(.4,.2,.2,1)",
              }}>
                {ROTATING_WORDS.map((word, i) => (
                  <span key={i} style={{
                    display: "block", height: "1.15em",
                    color: B.blue, fontStyle: "italic", whiteSpace: "nowrap",
                  }}>{word}</span>
                ))}
              </span>
            </span>
            {" "}Care<br />you&apos;ve always deserved.
          </h2>
        </div>

        {/* Nav arrows */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => scroll(-1)}
            disabled={!canPrev}
            aria-label="Previous pathway"
            style={{
              width: 44, height: 44, borderRadius: "50%",
              border: `1px solid ${canPrev ? "rgba(14,34,64,0.18)" : "rgba(14,34,64,0.1)"}`,
              background: "transparent", color: B.navy,
              cursor: canPrev ? "pointer" : "default",
              opacity: canPrev ? 1 : 0.3,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, transition: "all 0.2s ease",
            }}
          >
            ←
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={!canNext}
            aria-label="Next pathway"
            style={{
              width: 44, height: 44, borderRadius: "50%",
              border: `1px solid ${canNext ? "rgba(14,34,64,0.18)" : "rgba(14,34,64,0.1)"}`,
              background: "transparent", color: B.navy,
              cursor: canNext ? "pointer" : "default",
              opacity: canNext ? 1 : 0.3,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, transition: "all 0.2s ease",
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div style={{ position: "relative", margin: "0 -48px", padding: "0 48px" }}>
        {/* Edge masks */}
        <div style={{
          position: "absolute", top: 0, bottom: 24, left: 0, width: 48,
          background: `linear-gradient(to right, ${B.cream}, transparent)`,
          pointerEvents: "none", zIndex: 2,
        }} />
        <div style={{
          position: "absolute", top: 0, bottom: 24, right: 0, width: 48,
          background: `linear-gradient(to left, ${B.cream}, transparent)`,
          pointerEvents: "none", zIndex: 2,
        }} />

        <div
          ref={scrollerRef}
          onScroll={updateButtons}
          style={{
            display: "flex", gap: 20, overflowX: "auto",
            scrollSnapType: "x mandatory", scrollPaddingLeft: 48,
            paddingBottom: 24, scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {PATHWAYS.map((p) => (
            <PathwayCard key={p.id} pathway={p} />
          ))}
        </div>
      </div>

      {/* Book CTA */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 56 }}>
        <a
          href="#book"
          style={{
            background: B.navy, color: B.white,
            padding: "18px 36px", borderRadius: 9999,
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: 12,
            boxShadow: "0 20px 40px -12px rgba(14,34,64,0.4)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 24px 48px -12px rgba(14,34,64,0.5)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 20px 40px -12px rgba(14,34,64,0.4)";
          }}
        >
          Book a visit →
        </a>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

function PathwayCard({ pathway }: { pathway: typeof PATHWAYS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "0 0 300px", scrollSnapAlign: "start",
        background: B.warm, border: `1px solid ${hovered ? pathway.color : B.border}`,
        borderRadius: 18, padding: "24px 22px 22px",
        display: "flex", flexDirection: "column", gap: 16,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 30px 60px -30px rgba(14,34,64,0.18)" : "none",
        transition: "transform 0.4s cubic-bezier(.2,.7,.2,1), border-color 0.3s ease, box-shadow 0.4s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Glow overlay */}
      <div style={{
        position: "absolute", inset: -1, borderRadius: 18, pointerEvents: "none",
        background: `radial-gradient(60% 50% at 50% 0%, ${pathway.color}, transparent 70%)`,
        opacity: hovered ? 0.18 : 0, transition: "opacity 0.4s ease", zIndex: 0,
      }} />

      {/* Media */}
      <div style={{
        width: "100%", aspectRatio: "1 / 1", borderRadius: 14, overflow: "hidden",
        background: `radial-gradient(60% 50% at 50% 50%, ${pathway.color}20, transparent 70%), linear-gradient(160deg, #fff, #f1ede4)`,
        position: "relative", zIndex: 1,
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <source src={pathway.video} type="video/mp4" />
        </video>
      </div>

      {/* Tag */}
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
        textTransform: "uppercase", color: pathway.color, marginTop: 4, zIndex: 1,
      }}>{pathway.tag}</span>

      {/* Title */}
      <h3 style={{
        fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 22,
        letterSpacing: "-0.01em", margin: 0, lineHeight: 1.2, color: B.navy, zIndex: 1,
      }}>{pathway.title}</h3>

      {/* Descriptor */}
      <p style={{
        fontFamily: "Georgia, serif", fontStyle: "italic",
        color: B.body, fontSize: 14, lineHeight: 1.5, margin: 0, zIndex: 1,
      }}>{pathway.descriptor}</p>

      {/* Bullets */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6, zIndex: 1 }}>
        {pathway.bullets.map((b, i) => (
          <li key={i} style={{
            fontSize: 13.5, color: B.body, paddingLeft: 18, position: "relative", lineHeight: 1.45,
          }}>
            <span style={{
              position: "absolute", left: 0, top: 9, width: 6, height: 6,
              borderRadius: "50%", background: pathway.color, opacity: 0.6,
            }} />
            {b}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`/book?pathway=${pathway.id}`}
        style={{
          marginTop: "auto", fontSize: 13.5, fontWeight: 600, color: B.navy,
          textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
          paddingTop: 8, borderTop: `1px solid ${B.border}`, zIndex: 1,
          transition: "gap 0.2s ease, color 0.2s ease",
        }}
        onMouseOver={(e) => { e.currentTarget.style.gap = "10px"; e.currentTarget.style.color = pathway.color; }}
        onMouseOut={(e) => { e.currentTarget.style.gap = "6px"; e.currentTarget.style.color = B.navy; }}
      >
        Book this visit →
      </a>
    </article>
  );
}
