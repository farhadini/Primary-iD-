"use client";

import { useState, useEffect, useRef } from "react";

// ── BRAND, exact match to primary-homepage.jsx ───────────────
const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  cream: "#FAF8F5",
  warmWhite: "#FEFCF9",
  white: "#FFFFFF",
  lightBlue: "#E8F6FC",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  border: "rgba(14,34,64,0.07)",
  accent: "#E8985E",
};

// ── HOOKS ─────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 18 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.75s cubic-bezier(0.23,1,0.32,1) ${delay}s, transform 0.75s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── SHARED COMPONENTS ─────────────────────────────────────────

// Eyebrow: 24px rule + 11px Georgia uppercase, matches homepage exactly
function Eyebrow({ children, light = false, color }) {
  const c = light ? "rgba(255,255,255,0.3)" : (color || B.muted);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, marginBottom: 18,
      fontFamily: "Georgia,serif", fontSize: 11, color: c, letterSpacing: "0.06em",
    }}>
      <div style={{ width: 24, height: 1, background: c }} />
      {children}
    </div>
  );
}

// Primary navy CTA button, same as homepage "Book a visit"
function NavyBtn({ href = "#", children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      background: hov ? "#1a3a5c" : B.navy, color: B.white, textDecoration: "none",
      borderRadius: 9, padding: "14px 28px", fontFamily: "Georgia,serif", fontSize: 14,
      boxShadow: hov ? "0 8px 28px rgba(14,34,64,0.28)" : "0 4px 20px rgba(14,34,64,0.18)",
      transform: hov ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.25s ease", display: "inline-block",
    }}
      onMouseOver={() => setHov(true)}
      onMouseOut={() => setHov(false)}
    >{children}</a>
  );
}

// Blue accent button, for primary CTA moments on navy backgrounds
function BlueBtn({ href = "#", children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      background: hov ? "#1a99d4" : B.blue, color: B.white, textDecoration: "none",
      borderRadius: 9, padding: "14px 28px", fontFamily: "Georgia,serif", fontSize: 14,
      boxShadow: hov ? `0 8px 28px ${B.blue}40` : `0 4px 16px ${B.blue}30`,
      transform: hov ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.25s ease", display: "inline-block",
    }}
      onMouseOver={() => setHov(true)}
      onMouseOut={() => setHov(false)}
    >{children}</a>
  );
}

// Ghost text link with arrow, mirrors homepage secondary links
function GhostLink({ href = "#", children, light = false }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      color: light
        ? (hov ? B.white : "rgba(255,255,255,0.55)")
        : (hov ? B.navy : B.body),
      textDecoration: "none", fontFamily: "Georgia,serif", fontSize: 14,
      display: "inline-flex", alignItems: "center", gap: 8,
      borderBottom: `1px solid ${light
        ? (hov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)")
        : (hov ? "rgba(14,34,64,0.5)" : "rgba(14,34,64,0.2)")}`,
      paddingBottom: 2, transition: "all 0.2s ease",
    }}
      onMouseOver={() => setHov(true)}
      onMouseOut={() => setHov(false)}
    >
      {children}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}

// ── NAV, exact homepage nav + ID+ pill ───────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(250,248,245,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${B.border}` : "none",
      transition: "all 0.4s ease", padding: "0 32px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img 
            src="/images/primary-brand-logo.png" 
            alt="Primary" 
            style={{ height: 48, width: "auto" }} 
          />
          <span style={{
            fontFamily: "Georgia,serif", fontSize: 10, color: B.blue,
            background: B.lightBlue, border: `1px solid rgba(36,167,224,0.2)`,
            borderRadius: 10, padding: "3px 10px", letterSpacing: "0.08em",
          }}>ID+</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[
            { label: "Why Primary", href: "/why-primary/" },
            { label: "Five Dimensions", href: "/five-dimensions/" },
            { label: "The Science", href: "/oral-systemic/" },
            { label: "Dr. Gabi", href: "/about/" },
            { label: "New Patients", href: "/new-patient/" },
            { label: "Journal", href: "/blogs/" },
          ].map(item => (
            <a key={item.label} href={item.href} style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, textDecoration: "none", opacity: 0.7, transition: "opacity 0.2s" }}
              onMouseOver={e => e.target.style.opacity = 1}
              onMouseOut={e => e.target.style.opacity = 0.7}
            >{item.label}</a>
          ))}
        </div>
        <a href="/book/" style={{
          background: B.navy, color: B.white, textDecoration: "none",
          borderRadius: 8, padding: "9px 20px", fontFamily: "Georgia,serif", fontSize: 13,
          boxShadow: "0 2px 12px rgba(14,34,64,0.18)", transition: "background 0.2s ease", display: "inline-block",
        }}
          onMouseOver={e => e.currentTarget.style.background = "#1a3a5c"}
          onMouseOut={e => e.currentTarget.style.background = B.navy}
        >Book consultation</a>
      </div>
    </nav>
  );
}

// ── HERO, cream bg, same structure as homepage hero ──────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  const T = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.8s cubic-bezier(0.23,1,0.32,1) ${d}s, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${d}s`,
  });
  return (
    <section style={{
      minHeight: "100vh", background: B.cream,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "120px 32px 80px", position: "relative", overflow: "hidden",
    }}>
      {/* Grain, same as homepage */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.6, background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")" }} />
      {/* Architectural circles, same as homepage */}
      <div style={{ position: "absolute", right: "6%", top: "12%", width: 380, height: 380, borderRadius: "50%", border: "1px solid rgba(14,34,64,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "11%", top: "20%", width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(14,34,64,0.05)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "17%", top: "28%", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(14,34,64,0.06)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative" }}>
        <div style={{ maxWidth: 760 }}>

          {/* Location-style tag repurposed for ID+ */}
          <div style={{ ...T(0.1), display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 40 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: B.blue }} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: B.body, opacity: 0.5, letterSpacing: "0.04em" }}>
              Primary · Introducing Primary ID+
            </span>
          </div>

          <h1 style={{
            ...T(0.2),
            fontFamily: "Georgia,serif", fontSize: "clamp(40px, 5.8vw, 72px)",
            fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.022em", color: B.navy, margin: "0 0 32px",
          }}>
            Something<br />
            <span style={{ fontStyle: "italic", color: B.blue }}>remarkable</span><br />
            is happening<br />
            in your biology.
          </h1>

          <p style={{
            ...T(0.35),
            fontFamily: "Georgia,serif", fontSize: "clamp(15px, 1.8vw, 17px)",
            color: B.body, lineHeight: 1.8, maxWidth: 500, margin: "0 0 16px", opacity: 0.75,
          }}>
            Primary is launching Primary ID+, our longevity arm, rooted in oral-systemic medicine. This is our peptide therapy program.
          </p>

          <p style={{
            ...T(0.45),
            fontFamily: "Georgia,serif", fontSize: 14, fontStyle: "italic",
            color: B.body, lineHeight: 1.8, maxWidth: 480, margin: "0 0 44px", opacity: 0.55,
          }}>
            Primary has always believed the mouth is the front door to your health. Primary ID+ is what happens when that belief becomes a full longevity practice: oral-systemic medicine, regenerative therapy, and peptides, all under one roof.
          </p>

          <div style={{ ...T(0.55), display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <NavyBtn href="#consultation">Book a longevity consultation</NavyBtn>
            <GhostLink href="#what-we-address">Explore the program</GhostLink>
          </div>

          {/* Dr. Gabi attribution, same quiet treatment as homepage */}
          <div style={{ ...T(0.7), marginTop: 60, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 1, height: 32, background: B.navy, opacity: 0.2 }} />
            <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: B.body, fontStyle: "italic" }}>
              Dr. Tzur Gabi, DMD · Oral Physician · Founder, Primary ID+
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator, identical to homepage */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: loaded ? 0.25 : 0, transition: "opacity 1s ease 1.2s" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: B.body, letterSpacing: "0.08em" }}>SCROLL</div>
        <div style={{ width: 1, height: 28, background: B.body, opacity: 0.5, animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>
      <style>{`@keyframes scrollPulse{0%,100%{transform:scaleY(1);opacity:.5}50%{transform:scaleY(.4);opacity:.15}}`}</style>
    </section>
  );
}

// ── SECTION: PEPTIDE INTRO, navy, two-column editorial ───────
function PeptideIntro() {
  const [ref, visible] = useReveal(0.1);
  const fade = (d) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `all 0.75s cubic-bezier(0.23,1,0.32,1) ${d}s`,
  });
  return (
    <section ref={ref} style={{ background: B.navy, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Two-column headline / body, mirrors Editorial component */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginBottom: 64 }}>
          <div style={fade(0)}>
            <Eyebrow light color={B.blue}>Peptide Therapy</Eyebrow>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.015em", color: B.white, margin: 0 }}>
              Not a drug.<br />
              Not a supplement.<br />
              <span style={{ fontStyle: "italic", color: B.blue }}>A signal.</span>
            </h2>
          </div>
          <div style={fade(0.15)}>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
              Primary ID+ is our longevity arm, built on the same oral-systemic foundation that has guided our practice from day one. We have always known the mouth is a window into whole-body health. Primary ID+ is where that insight meets regenerative medicine.
            </p>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
              Peptides are short chains of amino acids, the same building blocks your body already produces. As we age, we make fewer of them. The result is slower healing, declining energy, and accelerated biological aging.
            </p>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.45)" }}>
              We restore those signals. Precisely. Intentionally. And always in the context of your full oral-systemic health picture.
            </p>
          </div>
        </div>

        {/* Three pillars, mirrors Appointments card style */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {[
            { n: "01", label: "Clinically Supervised", body: "Every protocol is individually designed by Dr. Gabi based on your biomarkers, health history, and goals. Nothing templated. Nothing guessed.", color: B.blue },
            { n: "02", label: "Prepared and Ready", body: "Your compounds are prepared by a licensed compounding pharmacy and shipped directly to Primary. We schedule your pickup with your complete protocol guide and injection kit ready.", color: B.accent },
            { n: "03", label: "Tracked and Adjusted", body: "Monthly virtual check-ins throughout your protocol. Monitoring is tailored to your compounds, some require lab work at key intervals, others rely on clinical assessment.", color: B.green },
          ].map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: "28px 24px",
                borderTop: `2px solid ${p.color}35`,
                display: "flex", flexDirection: "column", gap: 10,
              }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: p.color, letterSpacing: "0.06em" }}>{p.n}</div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: B.white, lineHeight: 1.3 }}>{p.label}</div>
                <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.75, margin: 0 }}>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION: HOW PEPTIDES ARE MADE, cream, horizontal rules ──
function HowMade() {
  const items = [
    {
      n: "01", label: "Solid-Phase Synthesis",
      body: "Therapeutic peptides are manufactured through solid-phase peptide synthesis, a laboratory technique that builds amino acid chains one link at a time, in precise sequence. The result is a compound structurally identical to the peptides your body naturally produces. No extraction from animal tissue. No biological fermentation. Pure chemical synthesis under controlled, pharmaceutical-grade conditions.",
    },
    {
      n: "02", label: "Licensed Compounding Pharmacies",
      body: "All compounds in our program are prepared by licensed compounding pharmacies operating under strict quality and purity standards. Each batch is tested for potency, sterility, and accurate concentration before it reaches our office. You receive exactly what was prescribed, nothing more, nothing less.",
    },
    {
      n: "03", label: "Are Peptides Vegan?",
      body: "For most patients, yes. The amino acids used in synthesis are typically derived from plant-based or fermentation sources, not animal tissue. Your compounds arrive pre-reconstituted and ready to use. If you have specific dietary or ethical requirements, we will review each compound individually with you before prescribing.",
    },
  ];
  return (
    <section style={{ background: B.cream, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.015em", color: B.navy, marginBottom: 56 }}>
            Synthesized in a lab.<br />
            <span style={{ fontStyle: "italic", color: B.blue }}>Identical to what your body makes.</span>
          </h2>
        </Reveal>

        {items.map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{
              display: "grid", gridTemplateColumns: "200px 1fr",
              gap: 64, padding: "44px 0",
              borderBottom: `1px solid ${B.border}`, alignItems: "start",
            }}>
              <div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: B.muted, letterSpacing: "0.06em", marginBottom: 10 }}>{item.n}</div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: B.navy, lineHeight: 1.3 }}>{item.label}</div>
              </div>
              <p style={{ fontFamily: "Georgia,serif", fontSize: 15, lineHeight: 1.85, color: B.body, paddingTop: 4, margin: 0 }}>{item.body}</p>
            </div>
          </Reveal>
        ))}

        {/* Huberman callout, mirrors MembershipStrip layout */}
        <Reveal delay={0.2}>
          <div style={{ marginTop: 48, padding: "28px 32px", background: B.warmWhite, borderRadius: 16, border: `1px solid ${B.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <Eyebrow>Want to go deeper?</Eyebrow>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: B.navy, marginBottom: 4 }}>Huberman Lab, The Science of Peptides</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.muted, fontStyle: "italic" }}>Dr. Andrew Huberman on mechanisms, research, and practical applications.</div>
            </div>
            <a href="https://www.hubermanlab.com" target="_blank" rel="noopener noreferrer" style={{
              background: B.navy, color: B.white, textDecoration: "none",
              borderRadius: 9, padding: "12px 22px", fontFamily: "Georgia,serif", fontSize: 13,
              display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
            }}>
              Watch Now
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── SECTION: SIX CATEGORIES, navy, 2x3 interactive cards ─────
function WhatWeAddress() {
  const [active, setActive] = useState(null);
  const cats = [
    { label: "Weight, Metabolism and Oral Inflammation", tags: ["Fat Loss", "Insulin Sensitivity", "Cardiovascular"], color: B.accent, detail: "Oral inflammation and metabolic dysfunction are deeply linked. Periodontal bacteria drive systemic insulin resistance, and peptides that address metabolic health are always selected in the context of your oral-systemic profile." },
    { label: "Tissue, Gut and Oral Repair", tags: ["Gut Health", "Joint Recovery", "Anti-Inflammatory"], color: B.green, detail: "The gut-oral axis is bidirectional. Compounds that support gut lining repair and reduce systemic inflammation also benefit gingival tissue, bone density, and oral healing post-treatment." },
    { label: "Cellular Longevity and Oral Aging", tags: ["Cellular Energy", "DNA Repair", "Biological Age"], color: B.blue, detail: "Biological aging accelerates in the presence of chronic oral inflammation. Compounds targeting cellular repair and mitochondrial function are selected with your oral-systemic baseline in mind." },
    { label: "Brain, Nerves and Orofacial Health", tags: ["Focus", "Calm", "Memory"], color: "#7B68EE", detail: "The trigeminal nerve directly connects oral structures to brain function. Orofacial pain, bruxism, and TMJ dysfunction all have neurological dimensions that peptide therapy can address." },
    { label: "Muscle, Recovery and Salivary Function", tags: ["Lean Muscle", "Sleep Quality", "Recovery"], color: B.green, detail: "Salivary gland function and muscle recovery share common growth factor pathways. Compounds that support lean mass and sleep quality also influence oral healing and tissue regeneration." },
    { label: "Hair, Skin and Gingival Regeneration", tags: ["Collagen", "Skin Health", "Hair Growth"], color: B.accent, detail: "Collagen synthesis and gingival regeneration are driven by overlapping growth factor cascades. This category directly bridges aesthetic goals with oral tissue health." },
  ];
  return (
    <section id="what-we-address" style={{ background: B.navy, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ maxWidth: 560, marginBottom: 56 }}>
          <Reveal>
            <Eyebrow light color={B.blue}>The Program</Eyebrow>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.01em", color: B.white, margin: "0 0 16px" }}>
              Six categories.<br />
              <span style={{ fontStyle: "italic", color: B.blue }}>One connected protocol.</span>
            </h2>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, margin: 0 }}>
              Every protocol we design works across multiple biological systems at once. Click any category to see the oral-systemic science behind it.
            </p>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {cats.map((c, i) => (
            <Reveal key={i} delay={0.08 + (i % 2) * 0.08}>
              <div
                onClick={() => setActive(active === i ? null : i)}
                style={{
                  background: active === i ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${active === i ? `${c.color}35` : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 16, padding: "28px 24px", cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                  display: "flex", flexDirection: "column", gap: 12,
                }}
                onMouseOver={e => { if (active !== i) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseOut={e => { if (active !== i) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: active === i ? B.white : "rgba(255,255,255,0.6)", lineHeight: 1.35 }}>{c.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {c.tags.map(t => (
                    <span key={t} style={{ fontFamily: "Georgia,serif", fontSize: 10, color: c.color, background: `${c.color}15`, padding: "3px 9px", borderRadius: 10, letterSpacing: "0.03em" }}>{t}</span>
                  ))}
                </div>
                {active === i && (
                  <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14, margin: 0 }}>
                    {c.detail}
                  </p>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: c.color }}>{active === i ? "Close" : "The oral-systemic science"}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="1.5">
                    <path d={active === i ? "M5 15l7-7 7 7" : "M5 9l7 7 7-7"} />
                  </svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION: THE PROCESS, cream, 5-step cards ────────────────
function TheProcess() {
  const [ref, visible] = useReveal(0.08);
  const steps = [
    { n: "01", title: "A Conversation First", sub: "At your next appointment or a dedicated consultation", detail: "We review your health history, biomarkers, and goals together. No pressure. Just clarity." },
    { n: "02", title: "Your Protocol Is Designed", sub: "Dr. Gabi builds your program", detail: "Every peptide chosen with clinical intention, never a one-size-fits-all template." },
    { n: "03", title: "Pharmacy Prepares and Ships", sub: "Directly to Primary", detail: "A member of our team will reach out to schedule your pickup, your complete protocol guide and injection kit ready and waiting." },
    { n: "04", title: "You Administer at Home", sub: "Small subcutaneous injections", detail: "We walk you through technique and rotation until it is second nature, usually a matter of days." },
    { n: "05", title: "We Monitor Together", sub: "Monthly virtual check-ins", detail: "Your protocol evolves with your results. This is an ongoing relationship, not a transaction." },
  ];
  return (
    <section style={{ background: B.cream, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
          <Reveal>
            <Eyebrow>The Process</Eyebrow>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.01em", color: B.navy, margin: 0 }}>
              Simple to start.<br />
              <span style={{ fontStyle: "italic", color: B.blue }}>Profound in effect.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}><NavyBtn href="#consultation">Book a consultation</NavyBtn></Reveal>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `all 0.7s cubic-bezier(0.23,1,0.32,1) ${0.1 + i * 0.08}s`,
            }}>
              <div style={{ background: B.warmWhite, borderRadius: 16, padding: "24px 20px", border: `1px solid ${B.border}`, height: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: i === 0 ? B.navy : `${B.blue}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "Georgia,serif", fontSize: 13, color: i === 0 ? B.white : B.blue }}>{s.n}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.navy, marginBottom: 4, lineHeight: 1.3 }}>{s.title}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.muted, fontStyle: "italic", marginBottom: 8 }}>{s.sub}</div>
                  <p style={{ fontFamily: "Georgia,serif", fontSize: 12.5, color: B.body, lineHeight: 1.65, margin: 0 }}>{s.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION: SAFETY, navy, two-column ───────────────────────
function Safety() {
  const [ref, visible] = useReveal(0.08);
  const fade = (d) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `all 0.75s cubic-bezier(0.23,1,0.32,1) ${d}s`,
  });
  const items = [
    { title: "Physician Medical Oversight", body: "Every protocol is co-managed with a licensed physician. Medical oversight is built into the program, not an afterthought. You are never outside the scope of qualified medical supervision." },
    { title: "Investigational and Off-Label", body: "These compounds are used as off-label or investigational therapies. They are not FDA-approved for these indications, and we will always tell you that." },
    { title: "Licensed Compounding Only", body: "All compounds come exclusively from licensed, regulated compounding pharmacies. Quality and purity are non-negotiable." },
    { title: "Full Informed Consent", body: "Before anything starts, you will review and sign a comprehensive consent document covering benefits, risks, and your rights. No fine print surprises." },
    { title: "Ongoing Monitoring", body: "Monitoring is tailored to your protocol. Some compounds require baseline and follow-up labs. Others are monitored through clinical assessment. We will always be clear about what yours involves." },
  ];
  return (
    <section ref={ref} style={{ background: B.navy, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div style={fade(0)}>
          <Eyebrow light color={B.blue}>Safety and Transparency</Eyebrow>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.01em", color: B.white, margin: "0 0 24px" }}>
            You deserve to know<br />exactly what<br />
            <span style={{ fontStyle: "italic", color: B.blue }}>you are doing.</span>
          </h2>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
            Peptide therapy represents one of the most promising frontiers in regenerative medicine, and one of the most misunderstood. There are providers who offer these compounds without supervision, without consent, and without follow-up.
          </p>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
            That is not how we practice.
          </p>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.4)" }}>
            At Primary ID+, every protocol is built on the same foundation as every other service we offer: clinical accuracy, human care, and complete transparency.
          </p>
        </div>
        <div style={fade(0.15)}>
          {items.map((item, i) => (
            <div key={i} style={{ padding: "22px 0", borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: B.blue, marginTop: 8, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.white, marginBottom: 5 }}>{item.title}</div>
                <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.37)", lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION: WHO THIS IS FOR, warmWhite, two columns ─────────
function WhoFor() {
  const isFor = [
    { title: "You are already here", body: "You sleep well, train consistently, eat with intention, and manage stress. The fundamentals are solid. You are not looking for a fix, you are looking for an edge." },
    { title: "You think in systems", body: "You understand that biology is layered and interconnected. You are not chasing a single metric. You want a protocol that works across multiple systems simultaneously." },
    { title: "You live by data", body: "You track. You measure. You want labs, biomarkers, and objective feedback, not just how you feel. We work the same way." },
    { title: "You are playing the long game", body: "You want to be sharper, stronger, and more resilient at 60 than most people are at 40. That is exactly what this is built for." },
  ];
  const notFor = [
    { title: "Not a shortcut", body: "Peptide therapy amplifies a biology that is already working. If sleep, nutrition, and training are not in place, this program will not compensate for them." },
    { title: "Not FDA-approved", body: "These compounds are used as off-label or investigational therapies. The science is compelling and growing, but we will never overstate what is proven versus what is emerging." },
    { title: "Not a subscription box", body: "We do not ship compounds to people we have not evaluated. Every patient has been through a full consultation, baseline labs, and a protocol designed specifically for them." },
    { title: "Not right for everyone", body: "We are selective about who enters the program, not because of exclusivity for its own sake, but because the best outcomes come from patients who are ready and committed." },
    { title: "Not a replacement for your PCP", body: "Primary ID+ works alongside your existing care team. We share labs, communicate transparently, and never operate in a silo." },
  ];
  return (
    <section style={{ background: B.warmWhite, padding: "96px 32px", borderTop: `1px solid ${B.border}`, borderBottom: `1px solid ${B.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>Candidacy</Eyebrow>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.01em", color: B.navy, marginBottom: 52 }}>
            We work with people who<br />
            <span style={{ fontStyle: "italic", color: B.blue }}>are already performing.</span>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 24, height: 1, background: B.green }} />
                <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.green, letterSpacing: "0.06em" }}>THIS PROGRAM IS FOR YOU IF</span>
              </div>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {isFor.map((item, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <div style={{ padding: "22px 24px", background: B.cream, borderRadius: 16, borderLeft: `3px solid ${B.green}` }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.navy, marginBottom: 6 }}>{item.title}</div>
                    <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, lineHeight: 1.75, margin: 0 }}>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 24, height: 1, background: B.accent }} />
                <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.accent, letterSpacing: "0.06em" }}>LET US BE DIRECT ABOUT WHAT THIS IS NOT</span>
              </div>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {notFor.map((item, i) => (
                <Reveal key={i} delay={0.1 + 0.07 * i}>
                  <div style={{ padding: "20px 24px", background: B.cream, borderRadius: 16, borderLeft: `3px solid ${B.accent}55` }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.navy, marginBottom: 6 }}>{item.title}</div>
                    <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, lineHeight: 1.75, margin: 0 }}>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION: THE CONSULTATION, navy, two columns ─────────────
function Consultation() {
  const markers = ["Testosterone (total + free)", "DHEA-S", "IGF-1", "hsCRP", "HbA1c", "Fasting insulin", "Thyroid panel (TSH, T3, T4)", "Lipid panel with ApoB", "Vitamin D", "Homocysteine"];
  const steps = [
    { n: "01", title: "Health history and goals", sub: "Where you are, where you want to go, and what you have already tried." },
    { n: "02", title: "Lab review with Dr. Gabi", sub: "We walk through your biomarkers together. No jargon. Just clarity on what your numbers mean." },
    { n: "03", title: "Oral-systemic assessment", sub: "Inflammation markers visible in the mouth that do not yet appear in standard bloodwork. Our unique diagnostic lens." },
    { n: "04", title: "Physician review and approval", sub: "Your protocol is reviewed and co-signed by our supervising physician before anything is prescribed or dispensed." },
    { n: "05", title: "Protocol design and onboarding", sub: "Your compounds are selected, dosed, and scheduled. You leave knowing exactly what you are taking, why, and when." },
  ];
  return (
    <section id="consultation" style={{ background: B.navy, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ maxWidth: 560, marginBottom: 56 }}>
          <Reveal>
            <Eyebrow light color={B.blue}>The Consultation</Eyebrow>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.01em", color: B.white, margin: "0 0 16px" }}>
              What happens before<br />
              <span style={{ fontStyle: "italic", color: B.blue }}>we prescribe anything.</span>
            </h2>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, margin: 0 }}>
              Every protocol starts with a complete picture of your biology. We do not guess. We do not assume.
            </p>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          {/* Lab work */}
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.2)" }} />
                <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>LAB WORK</span>
              </div>
            </Reveal>
            {[
              { title: "Superpower Panel Preferred", body: "Our preferred starting point, a comprehensive 100+ biomarker panel covering metabolic health, hormones, inflammation, cardiovascular risk, and biological age markers. We can prescribe this directly." },
              { title: "Recent CBC and Metabolic Panel Accepted", body: "If you have recent bloodwork within 6 months, a complete blood count and comprehensive metabolic panel gives us enough to proceed with your initial protocol design." },
            ].map((l, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <div style={{ padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.white, marginBottom: 6 }}>{l.title}</div>
                  <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.37)", lineHeight: 1.75, margin: 0 }}>{l.body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div style={{ padding: "22px 0" }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.28)", marginBottom: 14 }}>Additional markers we review:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {markers.map(m => (
                    <span key={m} style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "4px 11px", borderRadius: 10 }}>{m}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* What we cover */}
          <div>
            <Reveal delay={0.05}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.2)" }} />
                <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>WHAT WE COVER</span>
              </div>
            </Reveal>
            {steps.map((s, i) => (
              <Reveal key={i} delay={0.08 + i * 0.07}>
                <div style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: i < steps.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: `${B.blue}18`, border: `1px solid ${B.blue}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia,serif", fontSize: 10, color: B.blue, flexShrink: 0 }}>{s.n}</div>
                  <div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.white, marginBottom: 3 }}>{s.title}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 12.5, color: "rgba(255,255,255,0.33)", lineHeight: 1.65 }}>{s.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sample protocol card */}
        <Reveal delay={0.3}>
          <div style={{ marginTop: 56, padding: "40px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.2)" }} />
                <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>SEE WHAT YOU WOULD RECEIVE</span>
              </div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: B.white, marginBottom: 10, lineHeight: 1.2 }}>A sample protocol report.</div>
              <p style={{ fontFamily: "Georgia,serif", fontSize: 13.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.75, maxWidth: 440, margin: "0 0 20px" }}>
                Every patient receives a complete protocol document, compound cards, daily schedule, dosage reference, and a lifestyle guide built around your program.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Individual compound cards with dosing and purpose", "Full weekly administration schedule", "Results timeline, what to expect and when", "Lifestyle guide: training, nutrition, sleep and hydration"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" fill="none" stroke={B.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <BlueBtn href="/book/">Download Sample Protocol</BlueBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── SECTION: ONGOING MANAGEMENT, cream, 2x3 cards ───────────
function OngoingManagement() {
  const items = [
    { n: "01", title: "Monthly Check-In", body: "Every monthly virtual visit reviews how you are feeling subjectively, any injection site issues, energy and sleep tracking, and lab markers at key intervals. For patients on the GH stack, IGF-1 is rechecked at months 1 and 2." },
    { n: "02", title: "Between-Visit Triggers", body: "You do not have to wait for a scheduled check-in. If you notice persistent injection site reactions, unexpected fatigue, headaches, or anything that feels off, contact us directly. We would rather hear about it early." },
    { n: "03", title: "Protocol Adjustments", body: "Not every compound works the same way in every patient. If a compound is not producing the expected response, or is producing an unwanted one, we remove it, adjust the dose, or phase it in later. You are never locked in." },
    { n: "04", title: "Pre-Clearance Requirements", body: "We will not proceed without a clean baseline. Before any GH-stimulating compound is prescribed, we require a current IGF-1 level and confirmation of recent cancer screening. These are clinical requirements, not formalities." },
    { n: "05", title: "Your Primary Care Physician", body: "We strongly encourage your PCP to be aware of and co-managing your protocol. Upon request, we will send a full protocol summary and clinical rationale to any physician you are working with." },
    { n: "06", title: "Phased Starts Are an Option", body: "For patients with complex medication histories or a preference for a gradual onramp, we start with 2 to 3 targeted compounds, establish tolerance, then layer in the rest based on clinical response." },
  ];
  return (
    <section style={{ background: B.cream, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ maxWidth: 560, marginBottom: 56 }}>
          <Reveal>
            <Eyebrow>Ongoing Care</Eyebrow>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.01em", color: B.navy, margin: 0 }}>
              We do not set it<br />
              <span style={{ fontStyle: "italic", color: B.blue }}>and leave you.</span>
            </h2>
          </Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div style={{ background: B.warmWhite, borderRadius: 16, padding: "28px 24px", border: `1px solid ${B.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: B.muted, letterSpacing: "0.06em" }}>{item.n}</div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 17, color: B.navy, lineHeight: 1.25 }}>{item.title}</div>
                <p style={{ fontFamily: "Georgia,serif", fontSize: 13.5, color: B.body, lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION: CLOSING CTA, navy, mirrors BookingCTA ───────────
function ClosingCTA() {
  return (
    <section style={{ background: B.navy, padding: "100px 32px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 14px", border: "1px solid rgba(36,167,224,0.25)", borderRadius: 20, marginBottom: 32 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: B.blue }} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.blue, letterSpacing: "0.06em" }}>Primary ID+</span>
          </div>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.015em", color: B.white, margin: "0 0 20px" }}>
            Bring it up<br />at your<br />
            <span style={{ fontStyle: "italic", color: B.blue }}>next visit.</span>
          </h2>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, margin: "0 auto 40px", maxWidth: 440 }}>
            No commitment. No pressure. Just a conversation about whether this is right for you.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <BlueBtn href="/book/">Book a longevity consultation</BlueBtn>
            <GhostLink href="/book/" light>Or mention it at your next visit</GhostLink>
          </div>
          <div style={{ marginTop: 52, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.18)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto", fontStyle: "italic" }}>
              Primary ID+ protocols are designed by Dr. Tzur Gabi and co-managed with a licensed physician. All compounds are prepared by licensed compounding pharmacies. These therapies are off-label or investigational and are not FDA-approved for these indications.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── FOOTER, identical to homepage ───────────────────────────
function Footer() {
  return (
    <footer style={{ background: B.navy, padding: "48px 32px 32px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <div style={{ marginBottom: 18 }}>
              <img 
                src="/images/primary-brand-logo.png" 
                alt="Primary" 
                style={{ height: 52, width: "auto", filter: "brightness(0) invert(1)" }} 
              />
            </div>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, maxWidth: 260 }}>Integrative dentistry that looks at your whole health picture, not just your teeth.</p>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 16 }}>11980 San Vicente Blvd, Suite 902<br />Los Angeles, CA 90049<br /><span style={{ color: B.blue }}>(310) 564-8990</span></p>
          </div>
          {[
            { heading: "Visit", links: [
              { label: "Book appointment", href: "/book/" },
              { label: "New patient special", href: "/new-patient/" },
              { label: "Our location", href: "https://maps.app.goo.gl/oQoaV1MrCoMEQ1CS8", external: true },
              { label: "FAQ", href: "/faq/" },
            ] },
            { heading: "Care", links: [
              { label: "Preventive care", href: "/book/preventive/" },
              { label: "Aligners and airway", href: "/book/airway/" },
              { label: "Cosmetic dentistry", href: "/cosmetic-dentistry/" },
              { label: "Implants", href: "/dental-implant/" },
            ] },
            { heading: "Learn", links: [
              { label: "The Primary Journal", href: "/blogs/" },
              { label: "Oral-body connection", href: "/oral-systemic/" },
              { label: "Why Primary", href: "/why-primary/" },
              { label: "Primary ID+", href: "/primary-id-plus/" },
            ] },
          ].map(col => (
            <div key={col.heading}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", marginBottom: 14 }}>{col.heading.toUpperCase()}</div>
              {col.links.map(link => (
                link.external ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener" style={{ display: "block", fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 8, transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = "rgba(255,255,255,0.8)"}
                    onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                  >{link.label}</a>
                ) : (
                  <a key={link.label} href={link.href} style={{ display: "block", fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 8, transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = "rgba(255,255,255,0.8)"}
                    onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                  >{link.label}</a>
                )
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>2025 Primary Integrative Dentistry</span>
          <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>Dr. Tzur Gabi, Founder</span>
        </div>
      </div>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────────────
export default function PrimaryIDPlus() {
  return (
    <main>
      <style>{`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <Nav />
      <Hero />
      <PeptideIntro />
      <HowMade />
      <WhatWeAddress />
      <TheProcess />
      <Safety />
      <WhoFor />
      <Consultation />
      <OngoingManagement />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
