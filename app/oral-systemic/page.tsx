"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

// ── BRAND ──────────────────────────────────────────────────────
const B = {
  navy: "#0E2240",
  navy2: "#1a2d4f",
  blue: "#24A7E0",
  blue50: "#E6F4FC",
  green: "#48C28C",
  green50: "#E8F7EF",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  accent: "#E8985E",
  accent50: "#FCF0E4",
  purple: "#7B68EE",
  purple50: "#EFECFC",
  gold: "#D4B584",
  gold50: "#F8F2E5",
  rose: "#D97757",
  rose50: "#FBEBE2",
  red: "#E05B5B",
  red50: "#FBE8E8",
  line: "rgba(14,34,64,0.08)",
  lineDk: "rgba(255,255,255,0.08)",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ── HOOKS ──────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const [ref, visible] = useReveal(0.08);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.85s cubic-bezier(0.23,1,0.32,1) ${delay}s, transform 0.85s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}


// ── BREADCRUMB ─────────────────────────────────────────────────
function Breadcrumb() {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 32px 0", fontFamily: SANS, fontSize: 12.5, color: B.muted, letterSpacing: "0.02em" }}>
      <Link href="/" style={{ color: B.body, textDecoration: "none", borderBottom: `1px solid ${B.line}` }}>Home</Link>
      <span style={{ margin: "0 8px" }}>/</span>
      <span>The Science</span>
    </div>
  );
}

// ── HERO ───────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const T = (d: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.9s cubic-bezier(0.23,1,0.32,1) ${d}s, transform 0.9s cubic-bezier(0.23,1,0.32,1) ${d}s`,
  });

  return (
    <section style={{
      position: "relative", overflow: "hidden",
      padding: "72px 32px 96px", background: B.cream,
    }}>
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(800px 400px at 85% 20%, rgba(36,167,224,0.05), transparent 60%), radial-gradient(700px 350px at 5% 85%, rgba(232,152,94,0.04), transparent 60%)",
      }} />
      
      <div style={{ maxWidth: 880, margin: "0 auto", position: "relative" }}>
        <div style={{ ...T(0.1), display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 24, height: 1, background: B.blue }} />
          <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: B.blue }}>
            A letter from Dr. Tzur Gabi, Founder
          </span>
        </div>
        
        <h1 style={{
          ...T(0.2),
          fontFamily: SERIF, fontWeight: 400,
          fontSize: "clamp(44px, 6.2vw, 82px)", lineHeight: 1.05,
          letterSpacing: "-0.025em", color: B.navy, margin: "0 0 28px",
        }}>
          Your mouth is a window to your whole body.<br />
          <em style={{ fontStyle: "italic", color: B.blue, fontWeight: 400 }}>Not a separate system.</em>
        </h1>
        
        <p style={{
          ...T(0.3),
          fontFamily: SERIF, fontWeight: 300,
          fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.65, color: B.body,
          maxWidth: 720, margin: "0 0 36px",
        }}>
          Emerging research has changed everything we thought we knew about the dental visit. What happens in your mouth does not stay there. It travels to your heart, your brain, your immune system, and every system in between.
        </p>
        
        {/* Signature with Dr. Gabi's image */}
        <div style={{ ...T(0.4), display: "flex", gap: 14, alignItems: "center", paddingTop: 24, borderTop: `1px solid ${B.line}`, maxWidth: 520 }}>
          <img
            src="/images/image.png"
            alt="Dr. Tzur Gabi"
            style={{
              width: 48, height: 48, borderRadius: "50%",
              objectFit: "cover", flexShrink: 0,
            }}
          />
          <div style={{ lineHeight: 1.4 }}>
            <div style={{ fontFamily: SERIF, fontSize: 17, color: B.navy, fontStyle: "italic" }}>Dr. Tzur Gabi</div>
            <div style={{ fontFamily: SANS, fontSize: 11.5, color: B.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>
              Functional Prosthodontist · Founder, Primary Integrative Dentistry
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── STATS STRIP ────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { n: "3–4×", label: "Visits to the dentist vs. the primary care physician" },
    { n: "91%", label: "Of systemic diseases show oral manifestations first" },
    { n: "2×", label: "Heart disease risk with untreated periodontitis" },
    { n: "70%", label: "Of sleep apnea cases go undiagnosed" },
  ];
  return (
    <section style={{ background: B.warm, padding: "48px 32px", borderTop: `1px solid ${B.line}`, borderBottom: `1px solid ${B.line}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: SERIF, fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 1, color: B.navy, letterSpacing: "-0.02em", fontWeight: 400 }}>
                <em style={{ fontStyle: "italic", color: B.blue }}>{s.n}</em>
              </div>
              <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: B.muted, letterSpacing: "0.04em", marginTop: 10, lineHeight: 1.5 }}>
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── EDITORIAL ──────────────────────────────────────────────────
function Editorial() {
  return (
    <section style={{ padding: "104px 32px", background: B.cream }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 64 }}>
        <div>
          <Reveal>
            <h2 style={{
              fontFamily: SERIF, fontWeight: 400,
              fontSize: "clamp(30px, 3.6vw, 44px)", lineHeight: 1.15,
              letterSpacing: "-0.015em", color: B.navy, margin: 0,
            }}>
              The mouth is not the beginning of your smile. It is the <em style={{ fontStyle: "italic", color: B.blue, fontWeight: 400 }}>beginning of everything.</em>
            </h2>
          </Reveal>
        </div>
        <div>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 17, lineHeight: 1.85, color: B.body, margin: "0 0 22px" }}>
              For decades, dentistry and medicine operated in silos. You saw your doctor for your body. You saw your dentist for your teeth. What we now know is that this division was never biologically real.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 17, lineHeight: 1.85, color: B.body, margin: "0 0 22px" }}>
              Inflammation, bacteria, airway restriction, microbiome imbalance: these do not respect the line between a dental chair and an exam table. They travel. They accumulate. And by the time they show up elsewhere in your body, the signal started here.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 17, lineHeight: 1.85, color: B.body, margin: 0 }}>
              Dentists see patients three to four times more often than primary care physicians. That frequency is not a scheduling quirk. It is an unmatched window to catch what others will miss, if the dentist is looking for it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── PULLQUOTE ──────────────────────────────────────────────────
function Pullquote({ quote, cite }: { quote: string; cite: string }) {
  return (
    <Reveal>
      <section style={{
        background: B.navy, color: B.warm,
        padding: "96px 32px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(700px 400px at 85% 20%, rgba(36,167,224,0.14), transparent 65%), radial-gradient(600px 350px at 10% 90%, rgba(232,152,94,0.10), transparent 60%)",
        }} />
        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative" }}>
          <blockquote style={{
            fontFamily: SERIF, fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.4,
            color: B.warm, margin: "0 0 24px", letterSpacing: "-0.01em",
          }}>
            <span style={{ fontFamily: SERIF, fontSize: 72, color: B.blue, lineHeight: 0, position: "relative", top: 28, marginRight: 6 }}>"</span>
            {quote}
          </blockquote>
          <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: "rgba(254,252,249,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <span style={{ display: "inline-block", width: 20, height: 1, background: B.blue, marginRight: 12, verticalAlign: "middle" }} />
            {cite}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

// ── FOUR SYSTEMS GRID ──────────────────────────────────────────
function SystemsGrid() {
  const systems = [
    {
      num: "01", title: "Heart", titleEm: "health",
      icon: <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}><path d="M20 34 C10 28 4 20 4 13 C4 9 7 6 11 6 C14 6 17 8 20 12 C23 8 26 6 29 6 C33 6 36 9 36 13 C36 20 30 28 20 34 Z" fill={B.red}/><path d="M20 30 C12 25 7 19 7 14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/></svg>,
      body: <>Gum disease <strong>doubles your risk of heart disease.</strong> The same bacteria that inflame your gums travel to the arterial wall, driving the same inflammatory cascade that leads to heart attacks and strokes.</>,
      stat: "+49% CV events · J. Periodontology",
      color: B.red, bg: "linear-gradient(135deg, #FDEDED 0%, #F7CFCF 100%)", statBg: B.red50, statColor: "#9e2828",
      link: "/diagnostics",
    },
    {
      num: "02", title: "Sleep &", titleEm: "airway",
      icon: <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}><path d="M26 8 C18 10 12 16 12 24 C12 30 16 34 22 34 C28 34 32 30 33 25 C29 27 24 26 21 22 C18 18 19 12 26 8 Z" fill={B.purple}/><circle cx="30" cy="14" r="1.2" fill="#fff" opacity="0.8"/><circle cx="34" cy="20" r="0.8" fill="#fff" opacity="0.8"/></svg>,
      body: <>Your jaw shape determines how you breathe at night. A narrow arch, a tongue-tie, or a high palate can close the airway during sleep, setting off snoring, grinding, and <strong>the cardiovascular toll of untreated apnea.</strong></>,
      stat: "80% undiagnosed · STOP-BANG",
      color: B.purple, bg: "linear-gradient(135deg, #F6F5FE 0%, #DDD6F7 100%)", statBg: B.purple50, statColor: "#4f3fb0",
      link: "/diagnostics",
    },
    {
      num: "03", title: "Skin &", titleEm: "inflammation",
      icon: <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}><defs><linearGradient id="sk-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F5CFA3"/><stop offset="1" stopColor={B.accent}/></linearGradient></defs><circle cx="20" cy="20" r="13" fill="url(#sk-grad)"/><circle cx="15" cy="17" r="1.2" fill="#fff" opacity="0.8"/><circle cx="24" cy="19" r="1" fill="#fff" opacity="0.7"/></svg>,
      body: <>Your complexion reflects your oral microbiome. Acne, rosacea, eczema flares are often downstream of an inflamed mouth. <strong>Treat the mouth, and the skin often clears</strong> without ever touching a topical.</>,
      stat: "3× skin issues · JCAD",
      color: B.accent, bg: "linear-gradient(135deg, #FDF2E5 0%, #F5CFA3 100%)", statBg: B.accent50, statColor: "#9e4628",
      link: "/diagnostics",
    },
    {
      num: "04", title: "", titleEm: "Longevity",
      icon: <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}><path d="M8 26 L14 20 L19 25 L26 12 L32 18" stroke={B.green} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="32" cy="18" r="3" fill={B.green}/><circle cx="32" cy="18" r="1.5" fill="#fff"/></svg>,
      body: <>Oral health is one of the most predictive markers of lifespan. <strong>P. gingivalis, a periodontal pathogen, has been found in the brains of Alzheimer's patients.</strong> The mouth is on the front line of how long, and how well, you live.</>,
      stat: "+5–7 years · Life's Essential 8",
      color: B.green, bg: "linear-gradient(135deg, #F2FAF5 0%, #D4EEDE 100%)", statBg: B.green50, statColor: "#2d8a5f",
      link: "/diagnostics",
    },
  ];

  return (
    <section style={{ padding: "104px 32px", background: B.cream }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 820, marginBottom: 56 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: B.blue }}>
              <span style={{ width: 22, height: 1, background: B.blue }} />
              Four systems, one origin
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 3.8vw, 46px)", lineHeight: 1.12, letterSpacing: "-0.015em", color: B.navy, margin: "16px 0 14px" }}>
              What your mouth is quietly <em style={{ fontStyle: "italic", color: B.blue, fontWeight: 400 }}>telling four other systems.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: B.body, margin: 0, maxWidth: 640 }}>
              Your oral health isn't just about teeth. It's sending signals to your heart, your sleep, your skin, and your lifespan right now. Here's what the research shows.
            </p>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 22 }}>
          {systems.map((sys, i) => (
            <Reveal key={sys.num} delay={i * 0.1}>
              <article style={{
                background: B.warm, borderRadius: 22,
                border: `1px solid ${B.line}`, overflow: "hidden",
                display: "flex", flexDirection: "column",
                transition: "transform 0.32s cubic-bezier(.22,.61,.36,1), box-shadow 0.32s cubic-bezier(.22,.61,.36,1)",
              }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 28px 52px -22px rgba(14,34,64,0.22)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  padding: "32px 32px 24px", position: "relative", overflow: "hidden",
                  display: "grid", gridTemplateColumns: "1fr 72px", gap: 20, alignItems: "center",
                  minHeight: 180, background: sys.bg,
                }}>
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(145deg, rgba(255,255,255,0.32) 0%, transparent 55%)" }} />
                  <span style={{ position: "absolute", top: 20, right: 24, fontFamily: SANS, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.18em", color: "rgba(14,34,64,0.35)" }}>{sys.num}</span>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, lineHeight: 1.15, color: B.navy, margin: 0, letterSpacing: "-0.01em", position: "relative", zIndex: 1 }}>
                    {sys.title} <em style={{ fontStyle: "italic", fontWeight: 400 }}>{sys.titleEm}</em>
                  </h3>
                  <div style={{
                    width: 72, height: 72, borderRadius: 22,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.8)",
                    boxShadow: "0 12px 22px -10px rgba(14,34,64,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
                    position: "relative", zIndex: 1,
                  }}>
                    {sys.icon}
                  </div>
                </div>
                <div style={{ padding: "24px 32px 28px", borderTop: `1px solid ${B.line}`, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                  <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 15.5, lineHeight: 1.7, color: B.body, margin: 0 }}>
                    {sys.body}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, marginTop: "auto", borderTop: "1px dashed rgba(14,34,64,0.08)" }}>
                    <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", padding: "7px 12px", borderRadius: 999, background: sys.statBg, color: sys.statColor }}>
                      {sys.stat}
                    </span>
                    <Link href={sys.link} style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: B.navy, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                      Start <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ACCESS ADVANTAGE ───────────────────────────────────────────
function AccessAdvantage() {
  const rows = [
    { clinician: "Your dentist", freq: "2–4", pct: 100, top: true },
    { clinician: "Primary care MD", freq: "0.7", pct: 28, top: false },
    { clinician: "Cardiologist", freq: "0.3", pct: 12, top: false },
    { clinician: "Dermatologist", freq: "0.2", pct: 8, top: false },
    { clinician: "Neurologist", freq: "0.1", pct: 4, top: false },
  ];

  return (
    <section style={{ padding: "104px 32px", background: B.warm, borderTop: `1px solid ${B.line}`, borderBottom: `1px solid ${B.line}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "center" }}>
        <div>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: B.blue }}>
              <span style={{ width: 22, height: 1, background: B.blue }} />
              The access advantage
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px, 3.6vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.015em", color: B.navy, margin: "14px 0 20px" }}>
              Your dentist sees you more than any <em style={{ fontStyle: "italic", color: B.blue, fontWeight: 400 }}>other doctor you have.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: B.body, margin: "0 0 20px", maxWidth: 460 }}>
              The question isn't whether oral health connects to whole-body health. It does. The question is who's looking.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: B.body, margin: 0, maxWidth: 460 }}>
              The dentist, statistically, is the doctor you visit most. That frequency is the single biggest untapped opportunity in preventive medicine, if the dentist is trained to see beyond the teeth.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div style={{ background: B.cream, borderRadius: 22, border: `1px solid ${B.line}`, padding: 32 }}>
            <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: B.muted, marginBottom: 24 }}>
              Average visits per year, adults 30–65
            </div>
            {rows.map((row, i) => (
              <div key={row.clinician} style={{ display: "grid", gridTemplateColumns: "150px 1fr 48px", alignItems: "center", gap: 16, marginBottom: i < rows.length - 1 ? 16 : 0 }}>
                <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: B.navy }}>{row.clinician}</span>
                <div style={{ height: 10, background: "rgba(14,34,64,0.06)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 999, background: row.top ? `linear-gradient(90deg, ${B.navy}, ${B.blue})` : `linear-gradient(90deg, ${B.blue}, #5FBEE8)`, width: `${row.pct}%` }} />
                </div>
                <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: B.navy, textAlign: "right" }}>{row.freq}</span>
              </div>
            ))}
            <div style={{ fontFamily: SANS, fontSize: 11.5, color: B.muted, marginTop: 20, paddingTop: 16, borderTop: `1px solid ${B.line}`, fontStyle: "italic" }}>
              Source: JADA, ADA Health Policy Institute
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── AUTOIMMUNE SECTION ─────────────────────────────────────────
function AutoimmuneSection() {
  const conditions = [
    { name: "Chronic Fatigue", pct: "11,027%" },
    { name: "Bipolar (Youth)", pct: "10,833%" },
    { name: "Fibromyalgia", pct: "7,272%" },
    { name: "Autism", pct: "2,094%" },
    { name: "Celiac", pct: "1,111%" },
    { name: "ADHD", pct: "819%" },
    { name: "Lupus", pct: "787%" },
    { name: "Hypothyroidism", pct: "702%" },
    { name: "Osteoarthritis", pct: "449%" },
    { name: "Sleep Apnea", pct: "430%" },
    { name: "Diabetes", pct: "305%" },
    { name: "Alzheimer's", pct: "299%" },
    { name: "Depression", pct: "280%" },
  ];

  return (
    <section style={{ background: B.navy, color: B.warm, padding: "104px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(700px 350px at 90% 10%, rgba(232,91,91,0.14), transparent 65%), radial-gradient(600px 300px at 5% 95%, rgba(36,167,224,0.10), transparent 60%)",
      }} />
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56 }}>
        <div>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: B.accent }}>
              <span style={{ width: 22, height: 1, background: B.accent }} />
              Thirty years, one trajectory
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 3.8vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.015em", color: B.warm, margin: "16px 0 18px" }}>
              Autoimmune disease is rising at a rate we <em style={{ fontStyle: "italic", color: B.accent, fontWeight: 400 }}>cannot ignore.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 16.5, lineHeight: 1.75, color: "rgba(254,252,249,0.82)", margin: "0 0 18px" }}>
              One in ten people now lives with an autoimmune condition. These diseases don't start in the organ they attack. They start in the gut, the airway, and the mouth.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 16.5, lineHeight: 1.75, color: "rgba(254,252,249,0.82)", margin: "0 0 18px" }}>
              Chronic low-grade inflammation is the through-line. And the mouth is one of the most modifiable sources of that inflammation in the whole body.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ marginTop: 24, padding: "20px 22px", background: "rgba(232,152,94,0.1)", borderLeft: `3px solid ${B.accent}`, borderRadius: 10, fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, lineHeight: 1.6, color: B.warm }}>
              If we catch inflammation where it starts, in the oral microbiome, we can intercept the cascade before it becomes a diagnosis.
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {conditions.map((c, i) => (
              <div key={c.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 14px" }}>
                <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: B.accent, letterSpacing: "-0.01em", display: "inline-flex", alignItems: "baseline", gap: 4 }}>
                  <span>{c.pct}</span>
                  <span style={{ fontFamily: SANS, fontSize: 12, color: "rgba(232,152,94,0.8)" }}>▲</span>
                </div>
                <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: "rgba(254,252,249,0.82)", marginTop: 6, lineHeight: 1.4 }}>{c.name}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── CANCER SECTION ─────────────────────────────────────────────
function CancerSection() {
  const cancers = [
    { name: "Breast", deadliest: true },
    { name: "Lung", deadliest: true },
    { name: "Colon / Rectum", deadliest: true },
    { name: "Prostate", deadliest: false },
    { name: "Skin", deadliest: false },
    { name: "Stomach", deadliest: true },
  ];
  const risks = [
    { label: "Smoking", pct: 82 },
    { label: "High BMI", pct: 55 },
    { label: "Alcohol", pct: 40 },
    { label: "Low fruit/veg", pct: 30 },
    { label: "Inactivity", pct: 25 },
  ];

  return (
    <section style={{ background: B.cream, padding: "104px 32px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ maxWidth: 820, marginBottom: 48 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: B.blue }}>
              <span style={{ width: 22, height: 1, background: B.blue }} />
              Cancer risk
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 3.8vw, 46px)", lineHeight: 1.12, letterSpacing: "-0.015em", color: B.navy, margin: "16px 0 14px" }}>
              The earliest signs of oral and throat cancer often show up <em style={{ fontStyle: "italic", color: B.blue, fontWeight: 400 }}>in the mouth first.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: B.body, margin: 0 }}>
              And your dentist is the doctor most likely to spot the earliest signals, in the mouth, in the throat, in the breath, in the tissue.
            </p>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 32 }}>
          {[
            { big: "1 in 3", lab: "Cancer deaths are linked to preventable lifestyle factors" },
            { big: "30%", lab: "Of cancer cases start with infection (HPV, Hepatitis, H. pylori)" },
            { big: "1 in 10", lab: "Adults carry oral HPV without ever knowing it" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ background: B.warm, border: `1px solid ${B.line}`, borderRadius: 18, padding: "28px 24px" }}>
                <div style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 400, color: B.navy, lineHeight: 1, letterSpacing: "-0.02em" }}>
                  <em style={{ color: B.blue, fontStyle: "italic" }}>{stat.big}</em>
                </div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: B.body, marginTop: 12, lineHeight: 1.5 }}>{stat.lab}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 28 }}>
          <Reveal>
            <div style={{ background: B.warm, border: `1px solid ${B.line}`, borderRadius: 22, padding: "28px 28px 24px" }}>
              <h4 style={{ fontFamily: SERIF, fontSize: 20, color: B.navy, margin: "0 0 18px", fontWeight: 400 }}>Most common cancers worldwide</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {cancers.map(c => (
                  <li key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, background: B.cream, fontFamily: SANS, fontSize: 13.5, color: B.navy }}>
                    <span>{c.name}</span>
                    {c.deadliest && <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: B.red, padding: "4px 8px", background: B.red50, borderRadius: 999 }}>Deadliest</span>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: B.warm, border: `1px solid ${B.line}`, borderRadius: 22, padding: "28px 28px 24px" }}>
              <h4 style={{ fontFamily: SERIF, fontSize: 20, color: B.navy, margin: "0 0 18px", fontWeight: 400 }}>Lifestyle-driven risk factors</h4>
              {risks.map((r, i) => (
                <div key={r.label} style={{ display: "grid", gridTemplateColumns: "130px 1fr 44px", alignItems: "center", gap: 12, marginBottom: i < risks.length - 1 ? 12 : 0 }}>
                  <span style={{ fontFamily: SANS, fontSize: 13, color: B.body }}>{r.label}</span>
                  <div style={{ height: 8, background: "rgba(14,34,64,0.06)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: `linear-gradient(90deg, ${B.accent}, ${B.rose})`, width: `${r.pct}%` }} />
                  </div>
                  <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: B.navy, textAlign: "right" }}>{r.pct}%</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div style={{
            background: `linear-gradient(135deg, ${B.navy} 0%, #142c54 100%)`,
            color: B.warm, borderRadius: 22,
            padding: "36px 40px", display: "flex",
            alignItems: "center", justifyContent: "space-between", gap: 24,
            flexWrap: "wrap", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(500px 300px at 90% 20%, rgba(36,167,224,0.18), transparent 65%)" }} />
            <h4 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, lineHeight: 1.3, color: B.warm, margin: 0, position: "relative", zIndex: 1, maxWidth: 560 }}>
              Your dentist as <em style={{ color: B.blue, fontStyle: "italic" }}>early detector.</em> The frequency advantage is only an advantage if someone uses it.
            </h4>
            <Link href="/#book" style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 600, color: B.warm, textDecoration: "none", borderBottom: "1px solid rgba(254,252,249,0.4)", paddingBottom: 2, position: "relative", zIndex: 1 }}>
              Book a comprehensive evaluation →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── DIMENSIONS SECTION ─────────────────────────────────────────
function DimensionsSection() {
  const dimensions = [
    { num: "01", name: "Oral Health", inst: "Caries-risk assessment · cavities & gum-disease risk" },
    { num: "02", name: "Sleep & Airway", inst: "Sleep-apnea screening · breathing & apnea risk" },
    { num: "03", name: "Nutrition", inst: "MEDAS · Mediterranean adherence" },
    { num: "04", name: "Family History", inst: "Family-history review · inherited disease risk" },
    { num: "05", name: "Longevity", inst: "Life's Essential 8 · cardiovascular & metabolic" },
  ];

  return (
    <section style={{ background: B.warm, padding: "104px 32px", borderTop: `1px solid ${B.line}`, borderBottom: `1px solid ${B.line}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56 }}>
        <div>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: B.blue }}>
              <span style={{ width: 22, height: 1, background: B.blue }} />
              How Primary looks at you
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 3.8vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.015em", color: B.navy, margin: "14px 0 20px" }}>
              Five dimensions. <em style={{ fontStyle: "italic", color: B.blue, fontWeight: 400 }}>One Primary iD.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 16.5, lineHeight: 1.75, color: B.body, margin: "0 0 20px", maxWidth: 440 }}>
              We don't guess where to intervene. We measure it, across five dimensions backed by validated clinical instruments.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ marginTop: 10, marginBottom: 28, padding: "18px 22px", background: B.accent50, borderLeft: `3px solid ${B.accent}`, borderRadius: 10, fontFamily: SERIF, fontStyle: "italic", fontSize: 15.5, lineHeight: 1.6, color: B.body }}>
              <strong style={{ color: "#9e4628", fontStyle: "normal", fontWeight: 600 }}>Your scores guide the conversation, they don't write the plan.</strong> They tell us where to look. Dr. Gabi then confirms what the exam and imaging actually show before anything is recommended, so your care follows the real findings, not a script. Your Primary iD membership is built around these same five dimensions.
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <Link href="/diagnostics/" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 22px", borderRadius: 999,
              background: B.navy, color: B.warm,
              fontFamily: SANS, fontSize: 13.5, fontWeight: 600,
              textDecoration: "none",
            }}>
              Build my Primary iD <span>→</span>
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {dimensions.map(dim => (
              <li key={dim.num} style={{
                background: B.cream, border: `1px solid ${B.line}`,
                borderRadius: 16, padding: "22px 24px",
                display: "grid", gridTemplateColumns: "42px 1fr auto", gap: 18, alignItems: "center",
              }}>
                <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: B.blue, letterSpacing: "-0.01em" }}>{dim.num}</span>
                <div>
                  <div style={{ fontFamily: SERIF, fontSize: 18, color: B.navy, fontWeight: 400, letterSpacing: "-0.005em" }}>{dim.name}</div>
                  <div style={{ fontFamily: SANS, fontSize: 11.5, color: B.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>{dim.inst}</div>
                </div>
                <Link href="/diagnostics/" style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: B.navy, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  Start <span>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

// ── FINAL CTA ──────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{
      padding: "96px 32px",
      background: `linear-gradient(135deg, ${B.blue} 0%, #1788BA 100%)`,
      color: B.warm,
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(600px 300px at 15% 10%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(700px 350px at 90% 90%, rgba(14,34,64,0.2), transparent 60%)",
      }} />
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(254,252,249,0.8)", marginBottom: 18, display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 22, height: 1, background: "rgba(254,252,249,0.5)" }} />
            Your Primary iD
            <span style={{ width: 22, height: 1, background: "rgba(254,252,249,0.5)" }} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15, letterSpacing: "-0.015em", color: B.warm, margin: "0 0 14px" }}>
            The conversation starts with <em style={{ fontStyle: "italic", color: B.warm, fontWeight: 400, textDecoration: "underline", textDecorationColor: "rgba(254,252,249,0.4)", textUnderlineOffset: 6 }}>your mouth.</em><br />
            It changes the rest of your life.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 17, lineHeight: 1.6, color: "rgba(254,252,249,0.9)", margin: "0 auto 32px", maxWidth: 620 }}>
            About ten minutes. Five validated chapters. One Primary iD score that shapes your care, and your plan.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/diagnostics/" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: B.warm, color: B.navy,
              padding: "16px 28px", borderRadius: 999,
              fontFamily: SANS, fontSize: 14, fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 12px 24px -8px rgba(14,34,64,0.4)",
            }}>
              Build my Primary iD <span>→</span>
            </Link>
            <Link href="/#book" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "transparent", color: B.warm,
              padding: "16px 28px", borderRadius: 999,
              fontFamily: SANS, fontSize: 14, fontWeight: 600,
              textDecoration: "none",
              border: "1px solid rgba(254,252,249,0.5)",
            }}>
              Book a comprehensive evaluation
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────
export default function OralSystemicPage() {
  return (
    <main>
      <SiteNav />
      <Breadcrumb />
      <Hero />
      <StatsStrip />
      <Editorial />
      <Pullquote 
        quote="The question is not just what is happening in your mouth. It is what your mouth is already telling us about the rest of you."
        cite="Dr. Tzur Gabi"
      />
      <SystemsGrid />
      <AccessAdvantage />
      <AutoimmuneSection />
      <CancerSection />
      <DimensionsSection />
      <Pullquote 
        quote="If you care about your heart, your sleep, your skin, and how long you live, then you care about your oral health. These are not separate conversations. They are the same conversation."
        cite="Dr. Tzur Gabi"
      />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}
