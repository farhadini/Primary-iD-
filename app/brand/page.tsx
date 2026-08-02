"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// ── Brand tokens ──────────────────────────────────────────────
const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  blueSoft: "#5BC0EC",
  gold: "#D4B584",
  purple: "#7B68EE",
  green: "#48C28C",
  rose: "#D97757",
  peach: "#E8985E",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  ink: "#121a2b",
  inkSoft: "#3a4a66",
  line: "rgba(14, 34, 64, 0.12)",
  lineSoft: "rgba(14, 34, 64, 0.06)",
  muted: "#7A8695",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Montserrat', 'Helvetica Neue', Arial, sans-serif";

// ── Small helpers ─────────────────────────────────────────────
function Eyebrow({ label, onDark = false }: { label: string; onDark?: boolean }) {
  const c = onDark ? B.blueSoft : B.blue;
  return (
    <span style={{
      fontFamily: SANS, display: "inline-flex", alignItems: "center", gap: 10,
      fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em",
      color: c, marginBottom: 20,
    }}>
      <span style={{ width: 28, height: 1, background: c }} />
      {label}
    </span>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: 44, maxWidth: 720 }}>
      <h2 style={{
        fontFamily: SERIF, fontSize: "clamp(30px, 3.6vw, 46px)", fontWeight: 400,
        lineHeight: 1.1, letterSpacing: "-0.015em", color: B.navy, margin: 0,
      }}>{children}</h2>
      {sub && (
        <p style={{
          fontFamily: SERIF, fontSize: 18, lineHeight: 1.6, color: B.inkSoft,
          marginTop: 16,
        }}>{sub}</p>
      )}
    </div>
  );
}

function CopyChip({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      style={{
        fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em",
        color: copied ? B.green : B.muted, background: "transparent",
        border: "none", cursor: "pointer", padding: 0, textTransform: "uppercase",
      }}
    >
      {copied ? "Copied" : value}
    </button>
  );
}

// ── Data ──────────────────────────────────────────────────────
const CORE_COLORS = [
  { name: "Navy", hex: "#0E2240", role: "Primary brand · dark bg · headlines" },
  { name: "Blue", hex: "#24A7E0", role: "Primary accent · CTAs · links" },
  { name: "Blue Soft", hex: "#5BC0EC", role: "Accent on navy · eyebrows on dark" },
  { name: "Cream", hex: "#FAF8F5", role: "Default light background" },
  { name: "Warm", hex: "#FEFCF9", role: "Lightest surface · cards" },
];

const DIMENSION_COLORS = [
  { name: "Gold", hex: "#D4B584", dim: "Oral / Family" },
  { name: "Purple", hex: "#7B68EE", dim: "Sleep & Airway" },
  { name: "Green", hex: "#48C28C", dim: "Nutrition / success" },
  { name: "Rose", hex: "#D97757", dim: "Longevity / warnings" },
  { name: "Peach", hex: "#E8985E", dim: "Nutrition alt / warm accent" },
];

const NEUTRALS = [
  { name: "Ink", hex: "#121a2b", role: "Body text on light" },
  { name: "Ink Soft", hex: "#3a4a66", role: "Secondary text" },
  { name: "Muted", hex: "#7A8695", role: "Captions · meta" },
];

const TYPE_ROLES = [
  { role: "Display / H1", font: "Serif", weight: "400", size: "clamp(36px, 4.5vw, 64px)", notes: "tracking -0.02em, line-height 1.08" },
  { role: "Section H2", font: "Serif", weight: "400", size: "clamp(34px, 4.2vw, 56px)", notes: "tracking -0.015em" },
  { role: "H3 / card title", font: "Serif", weight: "400", size: "22–26px", notes: "tracking -0.01em" },
  { role: "Body", font: "Serif", weight: "400", size: "17–19px", notes: "line-height 1.6, Ink Soft" },
  { role: "Emphasis phrase", font: "Serif italic", weight: "400", size: "inherit", notes: "color Blue" },
  { role: "Eyebrow / label", font: "Sans", weight: "600", size: "10–11px", notes: "uppercase, tracking 0.14em, Blue" },
  { role: "Button", font: "Sans", weight: "600", size: "14–15px", notes: "tracking 0.02em" },
  { role: "Data / metric", font: "Serif", weight: "400", size: "30–36px", notes: "big numbers in serif" },
  { role: "Caption / meta", font: "Sans", weight: "400–500", size: "11–13px", notes: "color Muted" },
];

const PRINCIPLES = [
  { title: "Warm, not sterile", body: "Cream surfaces and human portraits over cold clinical white." },
  { title: "Editorial, not corporate", body: "Serif headlines and generous whitespace, like a good magazine." },
  { title: "Calm, not loud", body: "One confident accent per section. Subtle motion. Restraint wins." },
  { title: "Evidence-led, not gimmicky", body: "Lead with the human benefit, back it with proof. Never hype." },
];

// ── Page ──────────────────────────────────────────────────────
export default function BrandPage() {
  const [scrolled, setScrolled] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setReveal(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ background: B.cream, minHeight: "100vh", overflowX: "hidden" }}>
      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(250,248,245,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${B.lineSoft}` : "none",
        transition: "all 0.4s ease", padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/images/primary-brand-logo.png" alt="Primary" style={{ height: 56, width: "auto" }} />
          </Link>
          <Link href="/" style={{
            fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: B.navy, textDecoration: "none",
          }}>← Back to site</Link>
        </div>
      </nav>

      {/* Hero */}
      <header style={{
        position: "relative",
        padding: "180px 40px 100px",
        background: `radial-gradient(1200px 700px at 50% 0%, #12305C 0%, ${B.navy} 45%, #091832 100%)`,
        color: B.warm, overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(700px 400px at 12% 90%, rgba(36,167,224,0.14), transparent 60%)",
        }} />
        <div style={{
          position: "relative", maxWidth: 1100, margin: "0 auto",
          opacity: reveal ? 1 : 0, transform: reveal ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.9s ease-out",
        }}>
          <Eyebrow label="Brand Guidelines" onDark />
          <h1 style={{
            fontFamily: SERIF, fontSize: "clamp(44px, 6vw, 84px)", fontWeight: 400,
            lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 24px", maxWidth: 900,
          }}>
            The Primary <em style={{ fontStyle: "italic", color: B.blueSoft }}>brand system.</em>
          </h1>
          <p style={{
            fontFamily: SERIF, fontSize: 20, lineHeight: 1.6, maxWidth: 620,
            color: "rgba(250,248,245,0.78)",
          }}>
            Everything you need to build on-brand Primary assets — colors, type, components, voice, and imagery. Trustworthy, warm, and forward-looking.
          </p>
        </div>
      </header>

      {/* Principles */}
      <section style={{ padding: "100px 40px", background: B.warm }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Eyebrow label="Design principles" />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24,
          }}>
            {PRINCIPLES.map(p => (
              <div key={p.title} style={{
                background: B.cream, border: `1px solid ${B.lineSoft}`, borderRadius: 20,
                padding: 32,
              }}>
                <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: B.navy, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{p.title}</h3>
                <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: B.inkSoft, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color */}
      <section style={{ padding: "100px 40px", background: B.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Eyebrow label="01 · Color" />
          <SectionTitle sub="Use this exact palette. Pick one accent per section — Blue is the default; dimension colors only when tagging a specific dimension.">
            A palette built on <em style={{ fontStyle: "italic", color: B.blue }}>trust and warmth.</em>
          </SectionTitle>

          {/* Core */}
          <h4 style={swatchGroupLabel}>Core</h4>
          <div style={swatchGrid}>
            {CORE_COLORS.map(c => (
              <div key={c.name} style={{ ...swatchCard, border: `1px solid ${B.lineSoft}` }}>
                <div style={{ height: 120, background: c.hex, borderBottom: c.hex === "#FEFCF9" || c.hex === "#FAF8F5" ? `1px solid ${B.lineSoft}` : "none" }} />
                <div style={swatchBody}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={swatchName}>{c.name}</span>
                    <CopyChip value={c.hex} />
                  </div>
                  <p style={swatchRole}>{c.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dimension */}
          <h4 style={{ ...swatchGroupLabel, marginTop: 56 }}>Dimension accents</h4>
          <p style={{ fontFamily: SERIF, fontSize: 15, color: B.inkSoft, margin: "0 0 24px", maxWidth: 620, lineHeight: 1.55 }}>
            Primary&apos;s five dimensions each own a color. Use them for categorization and data viz — not as general UI accents. Never use purple as a general brand accent; it means &ldquo;Sleep &amp; Airway.&rdquo;
          </p>
          <div style={swatchGrid}>
            {DIMENSION_COLORS.map(c => (
              <div key={c.name} style={{ ...swatchCard, border: `1px solid ${B.lineSoft}` }}>
                <div style={{ height: 120, background: c.hex }} />
                <div style={swatchBody}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={swatchName}>{c.name}</span>
                    <CopyChip value={c.hex} />
                  </div>
                  <p style={swatchRole}>{c.dim}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Neutrals */}
          <h4 style={{ ...swatchGroupLabel, marginTop: 56 }}>Neutrals &amp; text</h4>
          <div style={swatchGrid}>
            {NEUTRALS.map(c => (
              <div key={c.name} style={{ ...swatchCard, border: `1px solid ${B.lineSoft}` }}>
                <div style={{ height: 120, background: c.hex }} />
                <div style={swatchBody}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={swatchName}>{c.name}</span>
                    <CopyChip value={c.hex} />
                  </div>
                  <p style={swatchRole}>{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section style={{ padding: "100px 40px", background: B.warm }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Eyebrow label="02 · Typography" />
          <SectionTitle sub="Georgia serif for headlines and editorial body; Montserrat sans for eyebrows, UI, and data. Portable across web, email, deck, and print. Elevated substitutes: Fraunces + Inter.">
            Elegant serif over <em style={{ fontStyle: "italic", color: B.blue }}>clean sans.</em>
          </SectionTitle>

          {/* Specimens */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48,
          }} className="type-specimen-grid">
            <div style={{ background: B.cream, border: `1px solid ${B.lineSoft}`, borderRadius: 20, padding: 40 }}>
              <span style={specimenLabel}>Serif — Georgia</span>
              <p style={{ fontFamily: SERIF, fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.02em", color: B.navy, margin: "12px 0 0" }}>Aa</p>
              <p style={{ fontFamily: SERIF, fontSize: 20, color: B.navy, margin: "16px 0 4px" }}>Whole-body dentistry.</p>
              <p style={{ fontFamily: SERIF, fontSize: 15, color: B.muted, margin: 0 }}>ABCDEFG abcdefg 0123456789</p>
            </div>
            <div style={{ background: B.cream, border: `1px solid ${B.lineSoft}`, borderRadius: 20, padding: 40 }}>
              <span style={specimenLabel}>Sans — Montserrat</span>
              <p style={{ fontFamily: SANS, fontSize: 56, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.02em", color: B.navy, margin: "12px 0 0" }}>Aa</p>
              <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: B.blue, margin: "16px 0 4px" }}>How we see you</p>
              <p style={{ fontFamily: SANS, fontSize: 15, color: B.muted, margin: 0 }}>ABCDEFG abcdefg 0123456789</p>
            </div>
          </div>

          {/* Signature headline pattern */}
          <div style={{
            background: B.navy, borderRadius: 24, padding: "56px 48px", marginBottom: 48,
          }}>
            <span style={{ ...specimenLabel, color: B.blueSoft }}>Signature headline pattern</span>
            <p style={{
              fontFamily: SERIF, fontSize: "clamp(28px, 3.6vw, 46px)", fontWeight: 400,
              lineHeight: 1.12, letterSpacing: "-0.015em", color: B.warm, margin: "16px 0 0",
            }}>
              World-class technology. <em style={{ fontStyle: "italic", color: B.blueSoft }}>Standard, not optional.</em>
            </p>
            <p style={{ fontFamily: SANS, fontSize: 13, color: "rgba(250,248,245,0.6)", marginTop: 20 }}>
              A strong serif claim, then one italic phrase in Blue as the crisp qualifier.
            </p>
          </div>

          {/* Type role table */}
          <div style={{ overflowX: "auto", border: `1px solid ${B.lineSoft}`, borderRadius: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: SANS, fontSize: 13, minWidth: 640 }}>
              <thead>
                <tr style={{ background: B.cream }}>
                  {["Role", "Font", "Weight", "Size", "Notes"].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TYPE_ROLES.map((t, i) => (
                  <tr key={t.role} style={{ background: i % 2 ? B.warm : "transparent" }}>
                    <td style={{ ...tdStyle, color: B.navy, fontWeight: 600 }}>{t.role}</td>
                    <td style={tdStyle}>{t.font}</td>
                    <td style={tdStyle}>{t.weight}</td>
                    <td style={tdStyle}>{t.size}</td>
                    <td style={{ ...tdStyle, color: B.muted }}>{t.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Components */}
      <section style={{ padding: "100px 40px", background: B.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Eyebrow label="03 · Components" />
          <SectionTitle sub="Pill buttons, soft cards, and glass panels on navy. Calm hover lifts, never bouncy.">
            Building blocks, <em style={{ fontStyle: "italic", color: B.blue }}>consistently applied.</em>
          </SectionTitle>

          {/* Buttons */}
          <h4 style={swatchGroupLabel}>Buttons</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 48, alignItems: "center" }}>
            <button style={{
              fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: "0.02em",
              background: B.navy, color: B.warm, border: "none", borderRadius: 999,
              padding: "16px 32px", cursor: "pointer",
            }}>Primary — solid</button>
            <button style={{
              fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: "0.02em",
              background: B.blue, color: B.warm, border: "none", borderRadius: 999,
              padding: "16px 32px", cursor: "pointer",
            }}>Accent — blue</button>
            <button style={{
              fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: "0.02em",
              background: "transparent", color: B.navy, border: `1px solid rgba(14,34,64,0.15)`,
              borderRadius: 999, padding: "16px 32px", cursor: "pointer",
            }}>Ghost — secondary</button>
          </div>

          {/* Cards */}
          <h4 style={swatchGroupLabel}>Cards</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="type-specimen-grid">
            {/* Light card */}
            <article
              style={{
                background: B.warm, border: `1px solid ${B.lineSoft}`, borderRadius: 24,
                padding: 36, boxShadow: "0 2px 12px rgba(14,34,64,0.04)",
                transition: "all 0.3s ease", cursor: "default",
              }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 50px -20px rgba(14,34,64,0.18)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(14,34,64,0.04)"; }}
            >
              <span style={{ ...specimenLabel }}>Light card · on cream</span>
              <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 400, color: B.navy, margin: "12px 0 8px", letterSpacing: "-0.01em" }}>Oral–systemic link</h3>
              <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.6, color: B.inkSoft, margin: 0 }}>Hover to see the calm lift. Rounded 24px, soft border, subtle shadow.</p>
            </article>

            {/* Dark glass card */}
            <article style={{
              position: "relative", background: B.navy, borderRadius: 24, padding: 36, overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: B.blue }} />
              <div style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 16, padding: 24, backdropFilter: "blur(6px)",
              }}>
                <span style={{ ...specimenLabel, color: B.blueSoft }}>Glass card · on navy</span>
                <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 400, color: B.warm, margin: "12px 0 8px", letterSpacing: "-0.01em" }}>Primary iD score</h3>
                <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.6, color: "rgba(250,248,245,0.7)", margin: 0 }}>Translucent fill, hairline border, optional accent bar on top.</p>
              </div>
            </article>
          </div>

          {/* Eyebrow example */}
          <h4 style={{ ...swatchGroupLabel, marginTop: 56 }}>Eyebrow / label</h4>
          <div style={{ background: B.warm, border: `1px solid ${B.lineSoft}`, borderRadius: 20, padding: 36 }}>
            <Eyebrow label="How we see you" />
            <p style={{ fontFamily: SANS, fontSize: 13, color: B.muted, margin: 0 }}>
              28px line + 10px gap + 11px/600 uppercase text at 0.14em tracking, in Blue (Blue Soft on navy).
            </p>
          </div>
        </div>
      </section>

      {/* Motion + Voice + Imagery */}
      <section style={{ padding: "100px 40px", background: B.warm }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Eyebrow label="04 · Voice, motion &amp; imagery" />
          <SectionTitle>
            The feel beyond <em style={{ fontStyle: "italic", color: B.blue }}>the pixels.</em>
          </SectionTitle>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            <InfoCard title="Voice & tone" items={[
              "Confident, warm, plain-spoken.",
              "Short declarative sentences; editorial, not salesy.",
              "Lead with the human benefit, back it with evidence.",
              "Sentence case for UI; uppercase only for eyebrows.",
              "Never fear-monger — frame health as opportunity.",
            ]} />
            <InfoCard title="Motion" items={[
              "Calm and purposeful — nothing bouncy.",
              "0.3s ease for interactions.",
              "Fade + 12px rise on scroll, 0.8s ease-out.",
              "Stagger children by 0.1–0.2s.",
              "Respect prefers-reduced-motion.",
            ]} />
            <InfoCard title="Imagery" items={[
              "Real, warm portraits in natural light.",
              "Genuine expressions, diverse subjects.",
              "Clinical scenes feel human, never cold.",
              "Subtle warm washes tied to dimension colors.",
              "No gradient blobs or decorative filler shapes.",
            ]} />
          </div>
        </div>
      </section>

      {/* Token snippet */}
      <section style={{ padding: "100px 40px 120px", background: B.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Eyebrow label="05 · Developer tokens" />
          <SectionTitle sub="Drop this into any Primary build for an instant on-brand foundation.">
            Copy-paste <em style={{ fontStyle: "italic", color: B.blue }}>tokens.</em>
          </SectionTitle>
          <pre style={{
            background: B.navy, color: "#E8EEF5", borderRadius: 20, padding: 32,
            overflowX: "auto", fontFamily: "'SF Mono', Menlo, Consolas, monospace",
            fontSize: 13, lineHeight: 1.7, margin: 0,
          }}>{`const B = {
  navy: "#0E2240", blue: "#24A7E0", blueSoft: "#5BC0EC",
  gold: "#D4B584", purple: "#7B68EE", green: "#48C28C",
  rose: "#D97757", peach: "#E8985E",
  cream: "#FAF8F5", warm: "#FEFCF9",
  ink: "#121a2b", inkSoft: "#3a4a66", muted: "#7A8695",
  line: "rgba(14,34,64,0.12)", lineSoft: "rgba(14,34,64,0.06)",
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS  = "'Montserrat', 'Helvetica Neue', Arial, sans-serif";`}</pre>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: B.navy, padding: "48px 40px", textAlign: "center" }}>
        <img src="/images/primary-brand-logo.png" alt="Primary" style={{ height: 48, width: "auto", opacity: 0.9, filter: "brightness(0) invert(1)" }} />
        <p style={{ fontFamily: SANS, fontSize: 12, color: "rgba(250,248,245,0.5)", marginTop: 16, letterSpacing: "0.04em" }}>
          Primary Integrative Dentistry · Brand Guidelines
        </p>
      </footer>

      <style>{`
        @media (max-width: 720px) {
          .type-specimen-grid { grid-template-columns: 1fr !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </main>
  );
}

// ── Info card ─────────────────────────────────────────────────
function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ background: B.cream, border: `1px solid ${B.lineSoft}`, borderRadius: 20, padding: 32 }}>
      <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: B.navy, margin: "0 0 16px", letterSpacing: "-0.01em" }}>{title}</h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((it, i) => (
          <li key={i} style={{
            fontFamily: SERIF, fontSize: 15, lineHeight: 1.5, color: B.inkSoft,
            padding: "8px 0 8px 20px", position: "relative",
            borderTop: i === 0 ? "none" : `1px solid ${B.lineSoft}`,
          }}>
            <span style={{ position: "absolute", left: 0, top: 8, color: B.blue }}>·</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Shared styles ─────────────────────────────────────────────
const swatchGroupLabel: React.CSSProperties = {
  fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em",
  textTransform: "uppercase", color: B.navy, margin: "0 0 20px",
};
const swatchGrid: React.CSSProperties = {
  display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20,
};
const swatchCard: React.CSSProperties = {
  borderRadius: 16, overflow: "hidden", background: B.warm,
};
const swatchBody: React.CSSProperties = { padding: "16px 16px 18px" };
const swatchName: React.CSSProperties = {
  fontFamily: SERIF, fontSize: 17, color: B.navy,
};
const swatchRole: React.CSSProperties = {
  fontFamily: SANS, fontSize: 12, lineHeight: 1.45, color: B.muted, margin: "8px 0 0",
};
const specimenLabel: React.CSSProperties = {
  fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
  textTransform: "uppercase", color: B.blue,
};
const thStyle: React.CSSProperties = {
  fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
  textTransform: "uppercase", color: B.navy, textAlign: "left",
  padding: "14px 18px", borderBottom: `1px solid ${B.line}`,
};
const tdStyle: React.CSSProperties = {
  fontFamily: SANS, fontSize: 13, color: B.inkSoft, padding: "12px 18px",
  borderBottom: `1px solid ${B.lineSoft}`,
};
