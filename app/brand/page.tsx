"use client";

import { useState, useEffect } from "react";

// ============================================================================
// Primary iD · Brand Hub  (/brand)
// Password-gated resource for the marketing team + partners. The single source
// of truth for the brand: identity kit, voice, campaign creative, videos, and
// working files. Key assets are hosted here; bulk/raw files link to Drive.
// Gate: POSTs to /api/brand-auth (checks BRAND_PASSWORD env). noindex via layout.
// TODO(farhad): drop the ad HTML designs + skill files where marked; set
// BRAND_PASSWORD in Vercel.
// ============================================================================

const B = {
  navy: "#0E2240", blue: "#24A7E0", green: "#48C28C", cream: "#FAF8F5",
  warmWhite: "#FEFCF9", white: "#FFFFFF", gold: "#C49E68", rose: "#C8456B",
  body: "#4A4A5A", muted: "#8A8A9A", border: "rgba(14,34,64,0.08)",
};

// Drive folders provided by Farhad
const DRIVE_ASSETS = "https://drive.google.com/drive/folders/14V9-2NLogODIw887Q7o1XtDzcZ76fXXP";
const DRIVE_VIDEOS = "https://drive.google.com/drive/folders/1XwdOkEddiTYWFW61Og0jf-Gv4PAf0TQT";

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

const CAMPAIGNS = [
  { name: "The Optimizer", color: B.blue, line: "Five Dimensions. For the person who tracks everything about their body and wonders why no one has ever measured their mouth." },
  { name: "The Restorer", color: B.rose, line: "The Things We Miss + Implant. For the person who has lived around a problem so long it feels normal." },
  { name: "Cosmetic / Beauty", color: B.gold, line: "For the person who keeps noticing their smile in photos. (Creative in development.)" },
];

const VOICE_DO = [
  "Say “integrative dentistry,” not “holdistic.”",
  "Lead with the whole person: sleep, history, whole health, then the mouth.",
  "Speak to capability and health, not vanity or “biological age.”",
  "Frame care around need, and let the want lead them to the door.",
  "Calm, clear, premium. Four Seasons, not neon.",
];
const VOICE_DONT = [
  "Don’t use “holistic” in public copy (except the legacy /wholistic-dentistry/ URL).",
  "Don’t use the B2B “100 practitioners” invitation language publicly.",
  "Don’t lead with price or discounts.",
  "Don’t bury the human. Real people over stock and icons.",
  "Don’t change the homepage H1 or the locked dimension colors.",
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
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("brandhub") === "1") setAuthed(true);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(false);
    try {
      const res = await fetch("/api/brand-auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
      const data = await res.json();
      if (data.ok) { sessionStorage.setItem("brandhub", "1"); setAuthed(true); }
      else setErr(true);
    } catch { setErr(true); }
    setBusy(false);
  }

  // ---- Gate ----
  if (!authed) {
    return (
      <main style={{ minHeight: "100vh", background: B.navy, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <form onSubmit={submit} style={{ width: "100%", maxWidth: 380, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "40px 32px", textAlign: "center" }}>
          <img src="/brand/logo/primary-mark-dotsmile.png" alt="Primary" style={{ height: 40, width: "auto", margin: "0 auto 20px", display: "block" }} />
          <h1 style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: 24, color: B.white, margin: "0 0 6px" }}>Brand Hub</h1>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", lineHeight: 1.6 }}>For the Primary iD marketing team and partners. Enter the access password.</p>
          <input
            type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" autoFocus
            style={{ width: "100%", boxSizing: "border-box", padding: "13px 16px", borderRadius: 10, border: err ? `1px solid ${B.rose}` : "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: B.white, fontSize: 15, fontFamily: "Georgia,serif", outline: "none", marginBottom: 12 }}
          />
          {err && <div style={{ color: B.rose, fontSize: 12.5, marginBottom: 12 }}>That password didn&apos;t match. Try again.</div>}
          <button type="submit" disabled={busy} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: B.white, color: B.navy, fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{busy ? "Checking…" : "Enter"}</button>
        </form>
      </main>
    );
  }

  // ---- Hub ----
  const chip = { display: "inline-block", padding: "13px 22px", borderRadius: 10, textDecoration: "none", fontFamily: "Georgia,serif", fontSize: 14.5, fontWeight: 600 } as const;
  return (
    <main style={{ background: B.cream, color: B.body, fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" }}>
      {/* Header */}
      <div style={{ background: B.navy, padding: "28px 0" }}>
        <div className="r-pad" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <img src="/brand/logo/primary-logo-white.png" alt="Primary Integrative Dentistry" style={{ height: 40, width: "auto" }} />
          <span style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Brand Hub · for marketers &amp; partners</span>
        </div>
      </div>

      <div className="r-pad" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        {/* Intro */}
        <div style={{ padding: "48px 0 8px" }}>
          <h1 className="r-h1" style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: 44, lineHeight: 1.1, color: B.navy, margin: "0 0 16px", maxWidth: 720 }}>
            Everything you need to represent <span style={{ color: B.blue, fontStyle: "italic" }}>Primary iD</span>.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: B.body, maxWidth: 640, margin: 0 }}>
            This is the single source of truth for the brand. Assets here are current. When something links to Google Drive, that folder holds the full/raw files. If the site and a Drive file disagree, the site wins.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <a href="#identity" style={{ ...chip, background: B.navy, color: B.white }}>Brand system</a>
            <a href="#campaigns" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>Campaign &amp; creative</a>
            <a href="#videos" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>Videos</a>
            <a href="#files" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>Working files &amp; skills</a>
          </div>
        </div>

        {/* Brand system */}
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
            Use the navy lockup on light backgrounds and the white lockup on navy/photography. Keep clear space around the mark. Vector (EPS/PDF) and additional formats live in the{" "}
            <a href={DRIVE_ASSETS} target="_blank" rel="noopener" style={{ color: B.blue, textDecoration: "none" }}>brand assets Drive folder</a>.
          </p>
        </Section>

        {/* Colors */}
        <Section id="colors" eyebrow="Brand system" title="Color">
          <div style={{ fontSize: 13, color: B.muted, marginBottom: 12 }}>Core palette · click any swatch to copy the hex.</div>
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 14 }}>
            {CORE_COLORS.map((c) => <Swatch key={c.hex} {...c} />)}
          </div>
          <div style={{ fontSize: 13, color: B.muted, margin: "28px 0 12px" }}>The five dimensions · these colors are locked. Never remap them.</div>
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

        {/* Voice */}
        <Section id="voice" eyebrow="Brand system" title="Voice & tone">
          <p style={{ fontSize: 16.5, color: B.body, lineHeight: 1.6, maxWidth: 680, marginTop: 0 }}>
            The one line: <strong style={{ color: B.navy }}>Dentistry reimagined to see the whole you.</strong> Whole-body health, read through your mouth, the front door to your health. We tell people who we are before what we do.
          </p>
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20 }}>
            <div style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "24px 26px" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: B.green, marginBottom: 12 }}>Do</div>
              {VOICE_DO.map((t, i) => <div key={i} style={{ fontSize: 14.5, color: B.body, lineHeight: 1.5, padding: "7px 0", borderTop: i ? `1px solid ${B.border}` : "none" }}>{t}</div>)}
            </div>
            <div style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "24px 26px" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: B.rose, marginBottom: 12 }}>Don&apos;t</div>
              {VOICE_DONT.map((t, i) => <div key={i} style={{ fontSize: 14.5, color: B.body, lineHeight: 1.5, padding: "7px 0", borderTop: i ? `1px solid ${B.border}` : "none" }}>{t}</div>)}
            </div>
          </div>
        </Section>

        {/* Campaigns & creative */}
        <Section id="campaigns" eyebrow="Campaign & creative" title="Campaigns & ad designs">
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {CAMPAIGNS.map((c) => (
              <div key={c.name} style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "22px 22px", borderTop: `3px solid ${c.color}` }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: B.navy, marginBottom: 8 }}>{c.name}</div>
                <p style={{ fontSize: 14, color: B.body, lineHeight: 1.55, margin: 0 }}>{c.line}</p>
              </div>
            ))}
          </div>
          {/* Ad designs · Farhad to drop the latest ad HTML here */}
          <div style={{ marginTop: 22, background: B.warmWhite, border: `1px dashed ${B.blue}`, borderRadius: 14, padding: "26px 26px" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 17, color: B.navy, marginBottom: 6 }}>Latest ad designs</div>
            <p style={{ fontSize: 14.5, color: B.body, lineHeight: 1.6, margin: "0 0 14px" }}>
              The current ad HTML designs will live here, previewable and downloadable. (Placeholder, pending the latest set.) The full creative library and source files are in Drive.
            </p>
            <a href={DRIVE_ASSETS} target="_blank" rel="noopener" style={{ ...chip, background: B.navy, color: B.white, fontSize: 14 }}>Open creative in Drive</a>
          </div>
        </Section>

        {/* Videos */}
        <Section id="videos" eyebrow="Video" title="Brand & campaign videos">
          <div style={{ background: B.navy, borderRadius: 16, padding: "36px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 520 }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: B.white, marginBottom: 8 }}>The full video library</div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>Brand films, campaign cuts, and social edits, hosted in Drive so you always pull the latest master. Grab the file or the shareable link from the folder.</p>
            </div>
            <a href={DRIVE_VIDEOS} target="_blank" rel="noopener" style={{ ...chip, background: B.white, color: B.navy }}>Open video folder ↗</a>
          </div>
        </Section>

        {/* Working files & skills */}
        <Section id="files" eyebrow="Working files & skills" title="Files, skills & boilerplate">
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <a href={DRIVE_ASSETS} target="_blank" rel="noopener" style={{ textDecoration: "none", background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "22px 24px", display: "block" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 17, color: B.navy, marginBottom: 6 }}>Marketing assets (Drive) ↗</div>
              <p style={{ fontSize: 14, color: B.body, lineHeight: 1.55, margin: 0 }}>Editable source files, campaign creative, working files, and everything not hosted here.</p>
            </a>
            <div style={{ background: B.white, border: `1px dashed ${B.gold}`, borderRadius: 14, padding: "22px 24px" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 17, color: B.navy, marginBottom: 6 }}>Skill files</div>
              <p style={{ fontSize: 14, color: B.body, lineHeight: 1.55, margin: 0 }}>The AI brand skill files for partners to run in their own tools. (Placeholder, pending upload.)</p>
            </div>
          </div>

          {/* Boilerplate */}
          <div style={{ marginTop: 22, background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "26px 28px" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 17, color: B.navy, marginBottom: 14 }}>Boilerplate &amp; facts</div>
            <div style={{ fontSize: 14.5, color: B.body, lineHeight: 1.9 }}>
              <div><strong style={{ color: B.navy }}>Name:</strong> Primary Integrative Dentistry</div>
              <div><strong style={{ color: B.navy }}>Founder:</strong> Dr. Tzur Gabi, DMD · Functional Prosthodontist &amp; Oral Physician</div>
              <div><strong style={{ color: B.navy }}>Tagline:</strong> Dentistry reimagined to see the whole you.</div>
              <div><strong style={{ color: B.navy }}>One-liner:</strong> Whole-body health, read through your mouth, the front door to your health.</div>
              <div><strong style={{ color: B.navy }}>Location:</strong> 11980 San Vicente Blvd, Suite 902, Los Angeles, CA 90049</div>
              <div><strong style={{ color: B.navy }}>Phone:</strong> (310) 564-8990 · <strong style={{ color: B.navy }}>Web:</strong> myprimaryid.com</div>
              <div><strong style={{ color: B.navy }}>Reviews:</strong> 4.9 stars, 452+ Google reviews</div>
              <div><strong style={{ color: B.navy }}>Social:</strong> LinkedIn /in/drgabi · IG @dentalogics · FB DentalogicsUSA</div>
            </div>
          </div>

          {/* Contact */}
          <div style={{ marginTop: 18, fontSize: 14.5, color: B.body }}>
            Questions, new assets, or access requests: <a href="mailto:care@myprimaryid.com" style={{ color: B.blue, textDecoration: "none", fontWeight: 600 }}>care@myprimaryid.com</a>.
          </div>
        </Section>

        <div style={{ padding: "40px 0 64px", fontSize: 12.5, color: B.muted }}>
          Primary Integrative Dentistry · Brand Hub · Confidential, for internal and partner use.
        </div>
      </div>
    </main>
  );
}
