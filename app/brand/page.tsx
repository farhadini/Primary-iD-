"use client";

import { useState } from "react";

// ============================================================================
// Primary iD · Brand Hub  (/brand)
// OPEN page — no password. Anyone with the link can read this, so it carries
// only what we are happy for the outside world to see: the identity kit
// (logo, colour, type), the public-facing voice line, and the boilerplate.
//
// Anything internal — the voice do/don't rules, campaign strategy and the
// audiences behind it, the Google Drive links, the skill files — lives behind
// the gate at /brand/internal/. Test before adding something here: would we
// mind a competitor, a journalist or a patient reading it? If yes, it belongs
// on the internal page.
//
// Still noindex via layout.tsx: unlisted, not advertised.
// ============================================================================

const B = {
  navy: "#0E2240", blue: "#24A7E0", green: "#48C28C", cream: "#FAF8F5",
  warmWhite: "#FEFCF9", white: "#FFFFFF", gold: "#C49E68", rose: "#C8456B",
  body: "#4A4A5A", muted: "#8A8A9A", border: "rgba(14,34,64,0.08)",
};

const LOGOS = [
  { name: "Primary logo · navy", file: "/brand/logo/primary-logo-navy.png", bg: B.white },
  { name: "Primary logo · white", file: "/brand/logo/primary-logo-white.png", bg: B.navy },
  { name: "Lockup · on light", file: "/brand/logo/primary-logo-on-light.png", bg: B.cream },
  { name: "Lockup · on dark", file: "/brand/logo/primary-logo-on-dark.png", bg: B.navy },
  { name: "Dot-smile mark", file: "/brand/logo/primary-mark-dotsmile.png", bg: B.white },
  { name: "iD mark", file: "/brand/logo/primary-mark-id.png", bg: B.white },
];

const CORE_COLORS = [
  { name: "Navy", hex: "#0E2240" }, { name: "Blue", hex: "#24A7E0" },
  { name: "Green", hex: "#48C28C" }, { name: "Cream", hex: "#FAF8F5" },
  { name: "Gold", hex: "#C49E68" }, { name: "Rose", hex: "#C8456B" },
];
const DIMENSION_COLORS = [
  { name: "Oral Health", hex: "#48C28C" }, { name: "Sleep & Airway", hex: "#24A7E0" },
  { name: "Nutrition", hex: "#C7305A" }, { name: "Family History", hex: "#7B68EE" },
  { name: "Longevity", hex: "#0E2240" },
];

function Swatch({ name, hex }: { name: string; hex: string }) {
  const [copied, setCopied] = useState(false);
  const light = ["#FAF8F5", "#FEFCF9", "#FFFFFF"].includes(hex.toUpperCase());
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      style={{ textAlign: "left", border: `1px solid ${B.border}`, borderRadius: 12, overflow: "hidden", background: B.white, cursor: "pointer", padding: 0 }}
      title="Click to copy hex"
    >
      <div style={{ background: hex, height: 72, borderBottom: light ? `1px solid ${B.border}` : "none" }} />
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.navy }}>{name}</div>
        <div style={{ fontSize: 12, color: B.muted, marginTop: 2 }}>{copied ? "Copied!" : hex}</div>
      </div>
    </button>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: "56px 0", borderTop: `1px solid ${B.border}` }}>
      <div style={{ textTransform: "uppercase", letterSpacing: "0.16em", fontSize: 11, color: B.blue, fontWeight: 600, marginBottom: 10 }}>{eyebrow}</div>
      <h2 className="r-h2" style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: 32, color: B.navy, margin: "0 0 24px" }}>{title}</h2>
      {children}
    </section>
  );
}

export default function BrandHubPage() {
  const chip = { display: "inline-block", padding: "13px 22px", borderRadius: 10, textDecoration: "none", fontFamily: "Georgia,serif", fontSize: 14.5, fontWeight: 600 } as const;
  return (
    <main style={{ background: B.cream, color: B.body, fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" }}>
      {/* Header */}
      <div style={{ background: B.navy, padding: "28px 0" }}>
        <div className="r-pad" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <img src="/brand/logo/primary-logo-white.png" alt="Primary Integrative Dentistry" style={{ height: 40, width: "auto" }} />
          <span style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Brand Hub · identity kit</span>
        </div>
      </div>

      <div className="r-pad" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        {/* Intro */}
        <div style={{ padding: "48px 0 8px" }}>
          <h1 className="r-h1" style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: 44, lineHeight: 1.1, color: B.navy, margin: "0 0 16px", maxWidth: 720 }}>
            Everything you need to represent <span style={{ color: B.blue, fontStyle: "italic" }}>Primary iD</span>.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: B.body, maxWidth: 640, margin: 0 }}>
            The identity kit: the logo, the colours, the type, and the way we describe ourselves. Everything here is current — if a file somewhere else disagrees with this page, this page wins.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <a href="#identity" style={{ ...chip, background: B.navy, color: B.white }}>Logo &amp; marks</a>
            <a href="#colors" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>Colour</a>
            <a href="#type" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>Typography</a>
            <a href="#voice" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>Voice</a>
            <a href="#boilerplate" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>Boilerplate</a>
          </div>
        </div>

        {/* Logo & marks */}
        <Section id="identity" eyebrow="Brand system" title="Logo & marks">
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {LOGOS.map((l) => (
              <div key={l.name} style={{ border: `1px solid ${B.border}`, borderRadius: 14, overflow: "hidden", background: B.white }}>
                <div style={{ background: l.bg, height: 130, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                  <img src={l.file} alt={l.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
                <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontFamily: "Georgia,serif", fontSize: 13.5, color: B.navy }}>{l.name}</span>
                  <a href={l.file} download style={{ fontSize: 12.5, color: B.blue, textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>Download</a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: B.muted, marginTop: 16 }}>
            Use the navy lockup on light backgrounds and the white lockup on navy or photography. Keep clear space around the mark. Vector files and additional formats are in the working files — see <a href="/brand/internal/" style={{ color: B.blue, textDecoration: "none" }}>the team hub</a>.
          </p>
        </Section>

        {/* Colour */}
        <Section id="colors" eyebrow="Brand system" title="Colour">
          <div style={{ fontSize: 13, color: B.muted, marginBottom: 12 }}>Core palette · click any swatch to copy the hex.</div>
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 14 }}>
            {CORE_COLORS.map((c) => <Swatch key={c.hex} {...c} />)}
          </div>
          <div style={{ fontSize: 13, color: B.muted, margin: "28px 0 12px" }}>The five dimensions · these colours are locked. Never remap them.</div>
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
            {DIMENSION_COLORS.map((c) => <Swatch key={c.name} {...c} />)}
          </div>
        </Section>

        {/* Typography */}
        <Section id="type" eyebrow="Brand system" title="Typography">
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "28px 26px" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 34, color: B.navy, lineHeight: 1.1 }}>Georgia serif</div>
              <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 20, color: B.blue, marginTop: 6 }}>with italic blue accents</div>
              <p style={{ fontSize: 13.5, color: B.muted, marginTop: 16, marginBottom: 0 }}>Headlines and anything that carries the voice. Warm, editorial, human.</p>
            </div>
            <div style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "28px 26px" }}>
              <div style={{ fontSize: 22, color: B.navy, fontWeight: 600 }}>System sans-serif</div>
              <p style={{ fontSize: 15, color: B.body, marginTop: 10, lineHeight: 1.6, marginBottom: 0 }}>Body copy, UI, labels. Clean and legible. We let the serif headlines carry the personality and keep the body quiet.</p>
            </div>
          </div>
        </Section>

        {/* Voice — public summary only */}
        <Section id="voice" eyebrow="Brand system" title="How we sound">
          <p style={{ fontSize: 16.5, color: B.body, lineHeight: 1.6, maxWidth: 680, marginTop: 0 }}>
            The one line: <strong style={{ color: B.navy }}>Dentistry reimagined to see the whole you.</strong> Whole-body health, read through your mouth — the front door to your health. We say who we are before what we do.
          </p>
          <p style={{ fontSize: 16.5, color: B.body, lineHeight: 1.6, maxWidth: 680 }}>
            Calm, clear, premium. We lead with the whole person — sleep, history, whole health — and come to the mouth from there. We speak to capability and health rather than vanity, and we never lead with price.
          </p>
          <p style={{ fontSize: 14, color: B.muted, maxWidth: 680, marginBottom: 0 }}>
            The full voice rules, the words we avoid and the campaign language live in the team hub below.
          </p>
        </Section>

        {/* Boilerplate */}
        <Section id="boilerplate" eyebrow="Reference" title="Boilerplate & facts">
          <div style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "26px 28px" }}>
            <div style={{ fontSize: 14.5, color: B.body, lineHeight: 1.9 }}>
              <div><strong style={{ color: B.navy }}>Name:</strong> Primary Integrative Dentistry</div>
              <div><strong style={{ color: B.navy }}>Founder:</strong> Dr. Tzur Gabi, DMD · Prosthodontist</div>
              <div><strong style={{ color: B.navy }}>Tagline:</strong> Dentistry reimagined to see the whole you.</div>
              <div><strong style={{ color: B.navy }}>One-liner:</strong> Whole-body health, read through your mouth, the front door to your health.</div>
              <div><strong style={{ color: B.navy }}>Location:</strong> 11980 San Vicente Blvd, Suite 902, Los Angeles, CA 90049</div>
              <div><strong style={{ color: B.navy }}>Phone:</strong> (310) 564-8990 · <strong style={{ color: B.navy }}>Web:</strong> myprimaryid.com</div>
              <div><strong style={{ color: B.navy }}>Social:</strong> LinkedIn /in/drgabi · IG @dentalogics · FB DentalogicsUSA</div>
            </div>
            <p style={{ fontSize: 13, color: B.muted, marginTop: 16, marginBottom: 0 }}>
              Dr. Gabi is a prosthodontist. Please do not describe him as an orthodontist, an oral physician, or as specialising in orthodontics — California restricts how a dentist&rsquo;s specialty may be advertised.
            </p>
          </div>

          <div style={{ marginTop: 18, fontSize: 14.5, color: B.body }}>
            Questions, new assets, or access to the team hub: <a href="mailto:care@myprimaryid.com" style={{ color: B.blue, textDecoration: "none", fontWeight: 600 }}>care@myprimaryid.com</a>.
          </div>
        </Section>

        {/* Team hub */}
        <Section id="internal" eyebrow="Team & partners" title="Working files, campaigns & voice rules">
          <div style={{ background: B.navy, borderRadius: 16, padding: "34px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 560 }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: B.white, marginBottom: 8 }}>The team hub</div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>
                Campaign creative and the audiences behind it, the full voice do and don&rsquo;t, the video library, editable source files, and the brand skill files. Password required — ask us for it.
              </p>
            </div>
            <a href="/brand/internal/" style={{ ...chip, background: B.white, color: B.navy }}>Open the team hub →</a>
          </div>
        </Section>

        <div style={{ padding: "40px 0 64px", fontSize: 12.5, color: B.muted }}>
          Primary Integrative Dentistry · Brand Hub · myprimaryid.com
        </div>
      </div>
    </main>
  );
}
