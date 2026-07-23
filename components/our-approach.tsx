"use client";

import { useState } from "react";

// ── Our approach ──────────────────────────────────────────────
// Outcome-first tiles. Each reveals the root cause we address, then routes to
// the real pathway page (the "Learn more" destinations carried over from the
// old Care Pathways section) or to the action that actually fits that outcome.

const B = {
  navy: "#0E2240", blue: "#24A7E0", cream: "#FAF8F5",
  body: "#4A4A5A", muted: "#8A8A9A", line: "#E7E5EE",
};
const SERIF = "Georgia, 'Times New Roman', serif";

type Link = { label: string; href: string };
type Tile = {
  chip: string; ac: string; tint: string;
  name: string; em: string;
  root: string;
  cta: Link;
  learn?: Link;
  icon: React.ReactNode;
};

const S = (c: string) => ({ width: 22, height: 22, fill: "none", stroke: c, strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

const TILES: Tile[] = [
  {
    chip: "Whitening", ac: "#C79A3E", tint: "246,238,224", name: "Whiter ", em: "teeth",
    root: "Stains come back when your oral pH and microbiome are off. We score both, rebalance them, and choose non-abrasive care so white stays white.",
    cta: { label: "Take the assessment →", href: "/diagnostics/" },
    learn: { label: "Learn more →", href: "/cosmetic-dentistry/" },
    icon: <svg viewBox="0 0 24 24" {...S("#C79A3E")}><path d="M7 3c-2 0-3 1.6-3 4 0 3 1 5 1.4 8.5C5.6 18 6 20 7 20c1.2 0 1-3 2-3s.8 3 2 3c1 0 1.4-2 1.6-4.5C15 12 16 10 16 7c0-2.4-1-4-3-4-1.4 0-1.6 1-3 1s-1.6-1-3-1z"/></svg>,
  },
  {
    chip: "Clear Aligners", ac: "#24A7E0", tint: "224,240,251", name: "Straighter ", em: "teeth",
    root: "Crooked teeth usually trace back to airway and tongue posture. Straightening the arch without fixing the airway invites relapse, and worse sleep.",
    cta: { label: "Take the assessment →", href: "/diagnostics/" },
    learn: { label: "Learn more →", href: "/airway-sleep/" },
    icon: <svg viewBox="0 0 24 24" {...S("#24A7E0")}><path d="M4 15c0-5 3.5-8 8-8s8 3 8 8"/><path d="M8 13v3M12 12v4M16 13v3"/></svg>,
  },
  {
    chip: "Cleanings", ac: "#3FA98A", tint: "226,242,232", name: "Fresh ", em: "breath",
    root: "Chronic bad breath is rarely a brushing problem. It is a gut-and-oral-microbiome problem, upstream of anything a rinse can reach.",
    cta: { label: "Take the assessment →", href: "/diagnostics/" },
    learn: { label: "Learn more →", href: "/preventive-care/" },
    icon: <svg viewBox="0 0 24 24" {...S("#3FA98A")}><path d="M5 19c0-8 6-13 14-14 1 9-4 15-14 14z"/><path d="M5 19c3-4 6-6 10-8"/></svg>,
  },
  {
    chip: "Deep Cleanings", ac: "#D8785E", tint: "250,232,226", name: "Healthy ", em: "gums",
    root: "Bleeding gums are a systemic inflammation signal, the same inflammation behind heart disease and diabetes. We treat the signal, not just the symptom.",
    cta: { label: "Take the assessment →", href: "/diagnostics/" },
    learn: { label: "Learn more →", href: "/preventive-care/" },
    icon: <svg viewBox="0 0 24 24" {...S("#D8785E")}><path d="M12 20s-7-4.6-7-9.5A3.5 3.5 0 0112 8a3.5 3.5 0 017 2.5C19 15.4 12 20 12 20z"/></svg>,
  },
  {
    chip: "Sleep & Airway", ac: "#7B68EE", tint: "235,232,250", name: "Restful ", em: "sleep",
    root: "Snoring and grinding are not habits. They are your mouth compensating to breathe. We measure the airway first, then fix the cause.",
    cta: { label: "Take the assessment →", href: "/diagnostics/" },
    learn: { label: "Learn more →", href: "/airway-sleep/" },
    icon: <svg viewBox="0 0 24 24" {...S("#7B68EE")}><path d="M20 14a8 8 0 11-9-11 6.5 6.5 0 009 11z"/></svg>,
  },
  {
    chip: "Longevity", ac: "#5B7BA6", tint: "228,234,244", name: "A longer ", em: "life",
    root: "Oral inflammation shortens lifespan through the same pathways as smoking. Scoring your cardiovascular and metabolic markers alongside your mouth is how we add years.",
    cta: { label: "Take the assessment →", href: "/diagnostics/" },
    learn: { label: "Learn more →", href: "/primary-id-plus/" },
    icon: <svg viewBox="0 0 24 24" {...S("#5B7BA6")}><path d="M4 19h16"/><path d="M5 15l4-4 3 3 6-7"/><path d="M18 7h2v2"/></svg>,
  },
  {
    chip: "Emergency & Sensitivity", ac: "#C7305A", tint: "250,232,236", name: "Out of ", em: "pain",
    root: "Pain is the last step, not the first. By the time a tooth hurts, a cavity, crack, or infection has been building. We get you comfortable fast, then find the cause.",
    cta: { label: "Call (310) 564-8990", href: "tel:+13105648990" },
    learn: { label: "New patients →", href: "/new-patient/" },
    icon: <svg viewBox="0 0 24 24" {...S("#C7305A")}><path d="M13 2L5 13h5l-1 9 8-12h-5z"/></svg>,
  },
  {
    chip: "Implants & Dentures", ac: "#D8905A", tint: "250,238,225", name: "A new ", em: "smile",
    root: "Tooth loss isn't cosmetic. It's the downstream result of decay, gum disease, or an airway problem left unaddressed. We find what caused the loss first.",
    cta: { label: "Book a visit →", href: "/book/implants/" },
    learn: { label: "Learn more →", href: "/dental-implant/" },
    icon: <svg viewBox="0 0 24 24" {...S("#D8905A")}><path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7z"/></svg>,
  },
  {
    chip: "Free Plan Review", ac: "#4A6D8C", tint: "228,235,243", name: "A second ", em: "opinion",
    root: "Already have a treatment plan or a big quote? We evaluate it against your whole-health picture before you commit to anything irreversible.",
    cta: { label: "Get a review →", href: "/second-opinion/" },
    icon: <svg viewBox="0 0 24 24" {...S("#4A6D8C")}><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="M8 12h8M8 16h5"/></svg>,
  },
];

function TileCard({ t }: { t: Tile }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const show = hovered || open;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setOpen((o) => !o)}
      style={{
        position: "relative", height: 196, borderRadius: 16, overflow: "hidden",
        border: `1px solid ${B.line}`, cursor: "pointer",
        background: `linear-gradient(155deg, rgb(${t.tint}), #fff 150%)`,
        transform: show ? "translateY(-3px)" : "translateY(0)",
        boxShadow: show ? "0 22px 44px -26px rgba(14,34,64,.4)" : "none",
        transition: "transform .2s ease, box-shadow .2s ease",
      }}
    >
      {/* face */}
      <div style={{
        position: "absolute", inset: 0, padding: "20px 22px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        opacity: show ? 0 : 1, transition: "opacity .25s ease",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: t.ac, background: "rgba(255,255,255,.72)", padding: "4px 11px", borderRadius: 20 }}>{t.chip}</span>
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 20px -12px rgba(14,34,64,.4)", flex: "none" }}>{t.icon}</span>
        </div>
        <div>
          <div style={{ fontFamily: SERIF, fontSize: 26, color: B.navy, lineHeight: 1.05 }}>
            {t.name}<span style={{ fontStyle: "italic", color: t.ac }}>{t.em}</span>
          </div>
          <div style={{ fontSize: 11.5, color: B.muted, marginTop: 7 }}>Root cause →</div>
        </div>
      </div>

      {/* reveal */}
      <div style={{
        position: "absolute", inset: 0, padding: "20px 22px", background: "#fff",
        borderTop: `3px solid ${t.ac}`, display: "flex", flexDirection: "column",
        opacity: show ? 1 : 0, transform: show ? "none" : "translateY(10px)",
        transition: "opacity .28s ease, transform .28s ease",
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: t.ac, marginBottom: 8 }}>The root we address</div>
        <p style={{ fontSize: 12.5, color: B.body, lineHeight: 1.5, margin: 0 }}>{t.root}</p>
        <div style={{ marginTop: "auto", paddingTop: 10, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <a href={t.cta.href} onClick={(e) => e.stopPropagation()} style={{ fontSize: 13.5, fontWeight: 600, color: B.navy, textDecoration: "none" }}>{t.cta.label}</a>
          {t.learn && (
            <a href={t.learn.href} onClick={(e) => e.stopPropagation()} style={{ fontSize: 12.5, color: B.muted, textDecoration: "none" }}>{t.learn.label}</a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function OurApproach() {
  return (
    <section style={{ background: B.cream, padding: "60px 0 74px" }}>
      <style>{`
        .oa-grid{display:grid;gap:14px;grid-template-columns:repeat(3,1fr);}
        .oa-anchor{display:grid;grid-template-columns:1.6fr 1fr;gap:20px;align-items:center;}
        @media(max-width:900px){ .oa-grid{grid-template-columns:repeat(2,1fr);} .oa-h2{font-size:30px !important;} .oa-anchor{grid-template-columns:1fr;} }
        @media(max-width:560px){ .oa-grid{grid-template-columns:1fr;} }
      `}</style>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
        {/* heading */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 28, flexWrap: "wrap", marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: B.blue, display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{ width: 26, height: 1, background: "currentColor" }} />
              Our approach
            </div>
            <h2 className="oa-h2 r-h2" style={{ fontFamily: SERIF, fontWeight: 400, color: B.navy, fontSize: 38, lineHeight: 1.08, margin: 0 }}>
              Start with the outcome you want.<br />We&apos;ll fix what&apos;s <span style={{ color: B.blue, fontStyle: "italic" }}>underneath it</span>.
            </h2>
          </div>
          <div style={{ fontSize: 12.5, color: B.muted, whiteSpace: "nowrap" }}>Tap a card to see the root we address ↗</div>
        </div>

        {/* anchor: the baseline visit */}
        <div className="oa-anchor r-grid1 r-gap" style={{
          background: "linear-gradient(120deg,#e9f3fb,#fff 78%)", border: `1px solid ${B.line}`,
          borderRadius: 18, padding: "24px 30px", marginBottom: 20,
        }}>
          <div>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, color: B.blue, background: "#e7f6fd", padding: "4px 11px", borderRadius: 20, marginBottom: 12 }}>Check-up &amp; Cleaning</span>
            <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 30, color: B.navy, margin: "0 0 9px" }}>
              Oral-Systemic <span style={{ fontStyle: "italic", color: B.blue }}>Check-up</span>.
            </h3>
            <p style={{ fontSize: 14.5, color: B.body, lineHeight: 1.55, margin: 0, maxWidth: 520 }}>
              Reads your whole body, not just your teeth. The one visit that connects your mouth to your heart, your sleep, your metabolism, and how long you live.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, alignItems: "flex-start" }}>
            <a href="/diagnostics/" style={{ fontSize: 15, fontWeight: 600, color: B.navy, textDecoration: "none" }}>Take the Primary iD →</a>
            <a href="/book/preventive/" style={{ fontSize: 13, color: B.muted, textDecoration: "none" }}>Book a cleaning</a>
          </div>
        </div>

        <div className="oa-grid r-grid1 r-gap">
          {TILES.map((t) => <TileCard key={t.chip} t={t} />)}
        </div>
      </div>
    </section>
  );
}
