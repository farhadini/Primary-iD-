"use client";

import { useState, useEffect } from "react";
import localFont from "next/font/local";

// ============================================================================
// Primary iD · Brand Hub  (/brand)
// Password-gated resource for the marketing team, video editors, designers and
// partners. Start-here by role, then one section per job: download the kit,
// logo, animation, colour, type, video rules, voice, AI skill, facts, files.
// Gate: POSTs to /api/brand-auth (checks BRAND_PASSWORD env). noindex via layout.
//
// Values follow the Primary Brand OS skill (public/brand/skills/). When the
// skill changes, update the tokens here and in public/brand/primary-id-brand-kit.zip.
// Files under public/brand/ open for anyone with the direct link; nothing in
// them is private (logos, fonts, the animation, the brand skill).
// ============================================================================

const montserrat = localFont({ src: "../../public/fonts/montserrat.woff2", weight: "100 900", display: "swap" });
const mono = localFont({ src: "../../public/fonts/jetbrains-mono.woff2", weight: "100 800", display: "swap" });

const B = {
  navy: "#0E2240", navyDeep: "#07142A", blue: "#24A7E0", blueSoft: "#5BC0EC", cream: "#FAF8F5",
  warmWhite: "#FEFCF9", white: "#FFFFFF", ink: "#121A2B", body: "#3A4A66", muted: "#7A8695",
  border: "rgba(14,34,64,0.10)", rose: "#D97757",
};
const SERIF = "Georgia,'Times New Roman',serif";

// Drive folders provided by Farhad
const DRIVE_ASSETS = "https://drive.google.com/drive/folders/14V9-2NLogODIw887Q7o1XtDzcZ76fXXP";
const DRIVE_VIDEOS = "https://drive.google.com/drive/folders/1XwdOkEddiTYWFW61Og0jf-Gv4PAf0TQT";
const KIT = "/brand/primary-id-brand-kit.zip";

const LOGOS = [
  { name: "Primary logo · navy", use: "On light backgrounds", file: "/brand/logo/primary-logo-navy.png", bg: B.white },
  { name: "Primary logo · white", use: "On navy or photography", file: "/brand/logo/primary-logo-white.png", bg: B.navy },
  { name: "Lockup · on light", use: "On cream and white", file: "/brand/logo/primary-logo-on-light.png", bg: B.cream },
  { name: "Lockup · on dark", use: "On navy", file: "/brand/logo/primary-logo-on-dark.png", bg: B.navy },
  { name: "Dot-smile mark", use: "Avatars, favicons, small sizes", file: "/brand/logo/primary-mark-dotsmile.png", bg: B.white },
  { name: "iD mark", use: "Primary iD product moments", file: "/brand/logo/primary-mark-id.png", bg: B.white },
];

const ANIMATIONS = [
  { name: "Logo ending · vertical", size: "1080 × 1920 · 6.6 s", use: "Reels, TikTok, Shorts, Stories", file: "/brand/animation/primary-id-logo-ending-vertical.mp4", tall: true },
  { name: "Logo ending · horizontal", size: "1920 × 1080 · 6.6 s", use: "YouTube, web, presentations", file: "/brand/animation/primary-id-logo-ending-horizontal.mp4", tall: false },
];

const hexRgb = (h: string) => { const n = parseInt(h.slice(1), 16); return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`; };
const CORE_COLORS = [
  { name: "Navy", hex: "#0E2240", use: "Primary colour, dark grounds" },
  { name: "Navy deep", hex: "#07142A", use: "Deepest grounds" },
  { name: "Blue", hex: "#24A7E0", use: "Accent, the italic phrase" },
  { name: "Blue soft", hex: "#5BC0EC", use: "Accent on navy" },
  { name: "Cream", hex: "#FAF8F5", use: "Page ground" },
  { name: "Warm white", hex: "#FEFCF9", use: "Cards" },
  { name: "Ink", hex: "#121A2B", use: "Strongest text" },
  { name: "Ink soft", hex: "#3A4A66", use: "Body text" },
  { name: "Muted", hex: "#7A8695", use: "Captions, labels" },
];
const DIMENSION_COLORS = [
  { name: "Oral health", hex: "#D4B584", use: "Gold" },
  { name: "Sleep & airway", hex: "#7B68EE", use: "Purple" },
  { name: "Nutrition", hex: "#48C28C", use: "Green" },
  { name: "Family history", hex: "#E8985E", use: "Peach" },
  { name: "Longevity", hex: "#D97757", use: "Rose" },
];
const NEVER_COLORS = ["#4A4A5A", "#8A8A9A", "#000000", "#C7305A", "#E05B5B"];

const VIDEO_RULES: [string, string][] = [
  ["Vertical first", "9:16 at 1080 × 1920. Natural light, the real clinic. Native-looking, never studio-polished."],
  ["Captions on", "Burned in, Montserrat 600, sentence case. Most people watch with the sound off."],
  ["One italic phrase", "At most one Georgia italic blue phrase on screen at a time. Two is one too many."],
  ["End on the logo", "Every video closes on the logo ending above. Do not re-time, recolour or crop it."],
  ["No emojis, no exclamation marks", "Anywhere: captions, titles, thumbnails, descriptions."],
  ["Dr. Gabi's title", "He is a prosthodontist. Never write orthodontist or specialist in orthodontics. This is a legal rule, not style."],
  ["Patients", "Patients describe their experience, never a medical result. Before and after: actual patients only, labelled."],
  ["Airway and sleep", "Airway is a question, never a claim. Never say aligners or any treatment fix sleep apnea or breathing."],
  ["Scores", "Wherever a Primary iD score appears: directional, not a diagnosis."],
];

const VOICE_DO = [
  "Sound like a clinician who reads the research and refuses to oversell: precise, warm, unhurried.",
  "Lead with how it works, then the claim.",
  "Use plain words for clinical ideas.",
  "Say integrative dentistry. Say Family history, never Genetics.",
  "Let Dr. Gabi say no. A clinician declining work is the most credible thing he can say.",
];
const VOICE_DONT = [
  "Spa words: journey to wellness, find your balance, glow.",
  "Emojis or exclamation marks.",
  "Holistic in public copy (only the old /wholistic-dentistry/ address keeps it).",
  "Leading with price or discounts, or as low as and up to.",
  "Changing the homepage headline or the dimension colours.",
];

const NAV: [string, string][] = [
  ["kit", "Brand kit"], ["logo", "Logo"], ["animation", "Animation"], ["color", "Colour"], ["type", "Type"],
  ["video", "Video rules"], ["voice", "Voice"], ["skill", "AI skill"], ["facts", "Facts"], ["files", "All files"],
];

function useCopy() {
  const [copied, setCopied] = useState("");
  const copy = (v: string) => { navigator.clipboard?.writeText(v); setCopied(v); setTimeout(() => setCopied(""), 1200); };
  return { copied, copy };
}

function Swatch({ name, hex, use, copy, copied }: { name: string; hex: string; use: string; copy: (v: string) => void; copied: string }) {
  const light = ["#FAF8F5", "#FEFCF9", "#FFFFFF"].includes(hex.toUpperCase());
  const rgb = hexRgb(hex);
  return (
    <div className="bh-sw">
      <div style={{ background: hex, height: 64, borderBottom: light ? `1px solid ${B.border}` : "none" }} />
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ fontFamily: SERIF, fontSize: 14, color: B.navy }}>{name}</div>
        <div style={{ fontSize: 11.5, color: B.muted, margin: "2px 0 8px" }}>{use}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button type="button" className="bh-copy" onClick={() => copy(hex)}>{copied === hex ? "Copied" : hex}</button>
          <button type="button" className="bh-copy" onClick={() => copy(`rgb ${rgb}`)}>{copied === `rgb ${rgb}` ? "Copied" : `rgb ${rgb}`}</button>
        </div>
      </div>
    </div>
  );
}

function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="bh-sec">
      <div className="bh-eyebrow">{eyebrow}</div>
      <h2 className="bh-h2">{title}</h2>
      {intro && <p className="bh-intro">{intro}</p>}
      {children}
    </section>
  );
}

const DL = ({ href, children, solid }: { href: string; children: React.ReactNode; solid?: boolean }) => (
  <a href={href} download className={solid ? "bh-btn solid" : "bh-btn"}>{children}</a>
);

export default function BrandHubPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const { copied, copy } = useCopy();

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
        <form onSubmit={submit} style={{ width: "100%", maxWidth: 400, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 20, padding: "44px 38px", textAlign: "center", boxShadow: "0 40px 90px -50px rgba(0,0,0,0.8)" }}>
          <img src="/brand/logo/primary-logo-on-dark.png" alt="Primary Integrative Dentistry" style={{ height: 24, width: "auto", maxWidth: "84%", margin: "0 auto 26px", display: "block" }} />
          <div style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 10.5, color: B.blue, fontWeight: 600, marginBottom: 12 }}>Confidential · Partners</div>
          <h1 style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: 27, color: B.white, margin: "0 0 10px", letterSpacing: "-0.01em" }}>Brand Hub</h1>
          <p style={{ fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 26px", lineHeight: 1.6 }}>The single source of truth for the Primary iD brand. Enter the access password to continue.</p>
          <input
            type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter password" autoFocus
            style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: 10, border: err ? `1px solid ${B.rose}` : "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)", color: B.white, fontSize: 15, fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif", outline: "none", marginBottom: 12, textAlign: "center" }}
          />
          {err && <div style={{ color: B.rose, fontSize: 12.5, marginBottom: 12 }}>That password didn&apos;t match. Try again.</div>}
          <button type="submit" disabled={busy} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: B.white, color: B.navy, fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{busy ? "Checking…" : "Enter"}</button>
        </form>
      </main>
    );
  }

  // ---- Hub ----
  return (
    <main className={`bh ${montserrat.className}`}>
      <style>{CSS(mono.style.fontFamily)}</style>

      {/* Header */}
      <div style={{ background: B.navy, padding: "24px 0" }}>
        <div className="bh-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <img src="/brand/logo/primary-logo-white.png" alt="Primary Integrative Dentistry" style={{ height: 36, width: "auto" }} />
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Brand Hub · for editors, designers and partners</span>
        </div>
      </div>

      {/* Section nav */}
      <nav className="bh-nav" aria-label="Brand Hub sections">
        <div className="bh-wrap bh-navin">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
      </nav>

      <div className="bh-wrap">
        {/* Start here */}
        <div id="kit" style={{ padding: "44px 0 12px", scrollMarginTop: 70 }}>
          <h1 className="bh-h1">Everything you need to make <em>Primary</em> content.</h1>
          <p className="bh-intro" style={{ maxWidth: 660 }}>Start with the brand kit: logos, the logo animation, fonts, the AI skill and a one-page cheat sheet in one download. Everything here is current. If a Drive file disagrees with this page, this page wins.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
            <DL href={KIT} solid>Download the brand kit (.zip)</DL>
            <a href={DRIVE_ASSETS} target="_blank" rel="noopener" className="bh-btn">Source files in Drive ↗</a>
          </div>

          <div className="bh-roles">
            {[
              { who: "Video editors", need: [["Logo ending, vertical and horizontal", "#animation"], ["Fonts for Premiere and After Effects", "#type"], ["Colours in hex and RGB", "#color"], ["Captions and video rules", "#video"]] },
              { who: "Designers", need: [["Logos and marks", "#logo"], ["Colour tokens", "#color"], ["Type pairing and sizes", "#type"], ["What never to use", "#color"]] },
              { who: "Writers and AI tools", need: [["Voice: do and don't", "#voice"], ["The brand skill for Claude or any AI", "#skill"], ["Boilerplate and facts", "#facts"], ["The rules that are legal, not style", "#video"]] },
            ].map((r) => (
              <div key={r.who} className="bh-role">
                <div className="bh-role-h">{r.who}</div>
                {r.need.map(([t, h]) => <a key={t} href={h}>{t} <span aria-hidden="true">→</span></a>)}
              </div>
            ))}
          </div>
        </div>

        {/* Logo */}
        <Section id="logo" eyebrow="Identity" title="Logo & marks" intro="Navy on light backgrounds, white on navy or photography. Keep clear space around the mark. Never recolour, stretch or add effects.">
          <div className="bh-g3">
            {LOGOS.map((l) => (
              <div key={l.name} className="bh-card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ background: l.bg, height: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: 22 }}>
                  <img src={l.file} alt={l.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
                <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span><span style={{ display: "block", fontFamily: SERIF, fontSize: 14, color: B.navy }}>{l.name}</span><span style={{ fontSize: 11.5, color: B.muted }}>{l.use}</span></span>
                  <a href={l.file} download className="bh-link">PNG ↓</a>
                </div>
              </div>
            ))}
          </div>
          <p className="bh-note">Vector files (EPS, PDF) are in the <a href={DRIVE_ASSETS} target="_blank" rel="noopener">brand assets Drive folder</a>.</p>
        </Section>

        {/* Animation */}
        <Section id="animation" eyebrow="Motion" title="The Primary iD logo animation" intro="The logo ending closes every video. Drop it in as the last 6.6 seconds; do not re-time, recolour or crop it.">
          <div className="bh-anim">
            {ANIMATIONS.map((a) => (
              <div key={a.file} className="bh-card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ background: B.navy, display: "flex", justifyContent: "center" }}>
                  <video src={a.file} muted loop playsInline autoPlay preload="metadata" controls
                    style={{ display: "block", width: "100%", maxHeight: 420, aspectRatio: a.tall ? "9/16" : "16/9", objectFit: "contain", background: B.navy }} />
                </div>
                <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span><span style={{ display: "block", fontFamily: SERIF, fontSize: 14, color: B.navy }}>{a.name}</span><span style={{ fontSize: 11.5, color: B.muted }}>{a.size} · {a.use}</span></span>
                  <a href={a.file} download className="bh-link">MP4 ↓</a>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Colour */}
        <Section id="color" eyebrow="Identity" title="Colour" intro="Exact values only. Tap a value to copy it: hex for design tools, RGB for video.">
          <div className="bh-g-sw">
            {CORE_COLORS.map((c) => <Swatch key={c.hex} {...c} copy={copy} copied={copied} />)}
          </div>
          <div className="bh-sub">The five dimensions · data and tagging only, never as a general accent. These are locked.</div>
          <div className="bh-g-sw">
            {DIMENSION_COLORS.map((c) => <Swatch key={c.hex} {...c} copy={copy} copied={copied} />)}
          </div>
          <div className="bh-never">
            <b>Never use</b>
            {NEVER_COLORS.map((h) => <span key={h}><i style={{ background: h }} />{h}</span>)}
            <span style={{ color: B.muted }}>These are old values that crept into past work.</span>
          </div>
        </Section>

        {/* Type */}
        <Section id="type" eyebrow="Identity" title="Typography" intro="Montserrat for structure, Georgia for reading. Montserrat carries headlines, labels, buttons and captions; Georgia carries body text and the one italic blue phrase.">
          <div className="bh-g3">
            <div className="bh-card">
              <div style={{ fontSize: 30, fontWeight: 600, color: B.navy, letterSpacing: "-0.025em", lineHeight: 1.1 }}>Montserrat</div>
              <div style={{ fontSize: 13, color: B.muted, margin: "6px 0 14px" }}>600 · headlines, labels, captions</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a className="bh-btn small" href="https://fonts.google.com/specimen/Montserrat" target="_blank" rel="noopener">Desktop font, free ↗</a>
                <a className="bh-btn small" href="/fonts/montserrat.woff2" download>Web file ↓</a>
              </div>
            </div>
            <div className="bh-card">
              <div style={{ fontFamily: SERIF, fontSize: 30, color: B.navy, lineHeight: 1.1 }}>Georgia <em style={{ color: B.blue }}>italic</em></div>
              <div style={{ fontSize: 13, color: B.muted, margin: "6px 0 14px" }}>400 · body text, numbers, one italic blue phrase</div>
              <div style={{ fontSize: 13, color: B.body, lineHeight: 1.5 }}>Already installed on every Mac and Windows computer. Nothing to download.</div>
            </div>
            <div className="bh-card">
              <div className="bh-mono" style={{ fontSize: 24, color: B.navy, lineHeight: 1.2 }}>JetBrains Mono</div>
              <div style={{ fontSize: 13, color: B.muted, margin: "6px 0 14px" }}>400 · data, citations, small labels</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a className="bh-btn small" href="https://fonts.google.com/specimen/JetBrains+Mono" target="_blank" rel="noopener">Desktop font, free ↗</a>
                <a className="bh-btn small" href="/fonts/jetbrains-mono.woff2" download>Web file ↓</a>
              </div>
            </div>
          </div>
          <div className="bh-card" style={{ marginTop: 16 }}>
            <div className="bh-sub" style={{ marginTop: 0 }}>The signature: a Montserrat line answered by one Georgia italic blue phrase</div>
            <div style={{ fontSize: 30, fontWeight: 600, color: B.navy, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              The whole you, read from your <em style={{ fontFamily: SERIF, fontWeight: 400, color: B.blue }}>mouth.</em>
            </div>
            <p className="bh-note" style={{ marginBottom: 0 }}>For editing apps (Premiere, After Effects, Figma, Canva) install the desktop fonts from Google Fonts; they are free for commercial use. The .woff2 files are for websites.</p>
          </div>
        </Section>

        {/* Video rules */}
        <Section id="video" eyebrow="For video editors" title="Video rules" intro="Check every cut against this list before it goes out. The last four are legal requirements, not style.">
          <div className="bh-rules">
            {VIDEO_RULES.map(([h, p], i) => (
              <div key={h} className="bh-rule">
                <span className="bh-n">{String(i + 1).padStart(2, "0")}</span>
                <div><b>{h}</b><p>{p}</p></div>
              </div>
            ))}
          </div>
        </Section>

        {/* Voice */}
        <Section id="voice" eyebrow="Words" title="Voice" intro="The line: Dentistry reimagined to see the whole you. Whole-body health, read through your mouth.">
          <div className="bh-g2">
            <div className="bh-card">
              <div className="bh-sub" style={{ marginTop: 0, color: "#2a8a5e" }}>Do</div>
              {VOICE_DO.map((t) => <div key={t} className="bh-li">{t}</div>)}
            </div>
            <div className="bh-card">
              <div className="bh-sub" style={{ marginTop: 0, color: B.rose }}>Don&apos;t</div>
              {VOICE_DONT.map((t) => <div key={t} className="bh-li">{t}</div>)}
            </div>
          </div>
        </Section>

        {/* AI skill */}
        <Section id="skill" eyebrow="AI tools" title="The Primary Brand OS skill" intro="Our brand rules as an AI skill: tokens, type, voice, Dr. Gabi guidance and the advertising rules. Load it and the AI writes and designs on-brand.">
          <div className="bh-g2">
            <div className="bh-card">
              <b style={{ color: B.navy }}>Claude</b>
              <p className="bh-p">Download the .zip, then in Claude go to Settings → Capabilities → Skills → Upload skill.</p>
              <DL href="/brand/skills/primary-brand-os.zip" solid>Download skill (.zip)</DL>
            </div>
            <div className="bh-card">
              <b style={{ color: B.navy }}>Any other AI tool</b>
              <p className="bh-p">Download SKILL.md and paste it in as the instructions, project knowledge or system prompt.</p>
              <DL href="/brand/skills/primary-brand-os-SKILL.md">Download SKILL.md</DL>
            </div>
          </div>
        </Section>

        {/* Facts */}
        <Section id="facts" eyebrow="Words" title="Boilerplate & facts" intro="Tap a line to copy it.">
          <div className="bh-card bh-facts">
            {[
              ["Name", "Primary Integrative Dentistry"],
              ["Founder", "Dr. Tzur Gabi, DMD, prosthodontist"],
              ["Tagline", "Dentistry reimagined to see the whole you."],
              ["One-liner", "Whole-body health, read through your mouth, the front door to your health."],
              ["Address", "11980 San Vicente Blvd, Suite 902, Los Angeles, CA 90049"],
              ["Phone", "(310) 564-8990"],
              ["Web", "myprimaryid.com"],
              ["Social", "LinkedIn /in/drgabi · IG @dentalogics · FB DentalogicsUSA"],
            ].map(([k, v]) => (
              <button key={k} type="button" onClick={() => copy(v)}>
                <b>{k}</b><span>{copied === v ? "Copied" : v}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Files */}
        <Section id="files" eyebrow="Everything else" title="All files">
          <div className="bh-g2">
            <a href={DRIVE_ASSETS} target="_blank" rel="noopener" className="bh-card bh-cardlink">
              <b>Marketing assets in Drive ↗</b>
              <p className="bh-p">Editable sources, vector logos, campaign creative and working files.</p>
            </a>
            <a href={DRIVE_VIDEOS} target="_blank" rel="noopener" className="bh-card bh-cardlink">
              <b>Video library in Drive ↗</b>
              <p className="bh-p">Brand films, campaign cuts and social edits. Always pull the latest master from here.</p>
            </a>
          </div>
          <p className="bh-note">Questions, new assets or access: <a href="mailto:care@myprimaryid.com">care@myprimaryid.com</a></p>
        </Section>

        <div style={{ padding: "36px 0 64px", fontSize: 12.5, color: B.muted }}>
          Primary Integrative Dentistry · Brand Hub · Confidential, for internal and partner use.
        </div>
      </div>
    </main>
  );
}

const CSS = (monoFamily: string) => `
.bh{background:${B.cream};color:${B.body};min-height:100vh}
.bh-wrap{max-width:1080px;margin:0 auto;padding:0 24px}
.bh em{font-family:${SERIF};font-style:italic;color:${B.blue}}
.bh-mono{font-family:${monoFamily}}
.bh-nav{position:sticky;top:0;z-index:20;background:rgba(250,248,245,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid ${B.border}}
.bh-navin{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none}
.bh-navin::-webkit-scrollbar{display:none}
.bh-navin a{flex:none;font-size:13px;font-weight:600;color:${B.navy};text-decoration:none;padding:0 12px;min-height:48px;display:inline-flex;align-items:center;border-radius:999px}
.bh-navin a:hover{color:${B.blue}}
.bh-h1{font-weight:600;font-size:clamp(32px,4.4vw,50px);line-height:1.08;letter-spacing:-.025em;color:${B.navy};margin:0 0 14px;max-width:760px}
.bh-h2{font-weight:600;font-size:clamp(24px,3vw,34px);line-height:1.15;letter-spacing:-.02em;color:${B.navy};margin:0 0 10px}
.bh-eyebrow{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${B.blue};margin-bottom:10px}
.bh-intro{font-family:${SERIF};font-size:17px;line-height:1.62;color:${B.body};max-width:680px;margin:0 0 22px}
.bh-sec{padding:52px 0;border-top:1px solid ${B.border};scroll-margin-top:56px}
.bh-sub{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${B.muted};margin:26px 0 12px}
.bh-note{font-size:13.5px;color:${B.muted};margin:16px 0 0}
.bh-note a,.bh-link{color:${B.blue};font-weight:600;text-decoration:none}
.bh-link{font-size:12.5px;white-space:nowrap;min-height:44px;display:inline-flex;align-items:center}
.bh-btn{display:inline-flex;align-items:center;min-height:46px;padding:0 20px;border-radius:999px;border:1px solid rgba(14,34,64,.18);background:${B.white};color:${B.navy};font-size:14px;font-weight:600;text-decoration:none}
.bh-btn.solid{background:${B.navy};border-color:${B.navy};color:${B.white}}
.bh-btn.small{min-height:40px;padding:0 14px;font-size:12.5px}
.bh-btn:hover{border-color:${B.navy}}
.bh-card{background:${B.white};border:1px solid ${B.border};border-radius:16px;padding:22px 22px}
.bh-cardlink{text-decoration:none;display:block}
.bh-cardlink b{color:${B.navy};font-size:15px}
.bh-p{font-family:${SERIF};font-size:15px;line-height:1.55;color:${B.body};margin:8px 0 14px}
.bh-roles{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:30px}
.bh-role{background:${B.white};border:1px solid ${B.border};border-radius:16px;padding:18px 18px 10px}
.bh-role-h{font-size:15px;font-weight:600;color:${B.navy};margin-bottom:6px}
.bh-role a{display:flex;justify-content:space-between;gap:10px;align-items:center;min-height:44px;font-family:${SERIF};font-size:14.5px;color:${B.body};text-decoration:none;border-top:1px solid ${B.border}}
.bh-role a:hover{color:${B.blue}}
.bh-g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.bh-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.bh-anim{display:grid;grid-template-columns:.62fr 1fr;gap:16px;align-items:start}
.bh-g-sw{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
.bh-sw{border:1px solid ${B.border};border-radius:16px;overflow:hidden;background:${B.white}}
.bh-copy{font-family:${monoFamily};font-size:11px;color:${B.navy};background:${B.cream};border:1px solid ${B.border};border-radius:8px;padding:0 8px;min-height:32px;cursor:pointer}
.bh-copy:hover{border-color:${B.blue}}
.bh-never{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin-top:18px;font-size:12.5px}
.bh-never b{color:${B.rose};font-weight:600}
.bh-never span{display:inline-flex;align-items:center;gap:6px;font-family:${monoFamily};font-size:11.5px;text-decoration:line-through;color:${B.body}}
.bh-never span:last-child{text-decoration:none;font-family:inherit}
.bh-never i{width:14px;height:14px;border-radius:4px;display:inline-block}
.bh-rules{display:grid;grid-template-columns:1fr 1fr;gap:0 28px}
.bh-rule{display:flex;gap:14px;padding:14px 0;border-top:1px solid ${B.border}}
.bh-rule b{color:${B.navy};font-size:14.5px}
.bh-rule p{font-family:${SERIF};font-size:14.5px;line-height:1.5;color:${B.body};margin:4px 0 0}
.bh-n{font-family:${monoFamily};font-size:12px;color:${B.blue};padding-top:2px}
.bh-li{font-family:${SERIF};font-size:15px;line-height:1.5;color:${B.body};padding:9px 0;border-top:1px solid ${B.border}}
.bh-facts{padding:6px 22px}
.bh-facts button{all:unset;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:110px 1fr;gap:12px;width:100%;padding:12px 0;min-height:44px;border-top:1px solid ${B.border};font-size:14.5px}
.bh-facts button:first-child{border-top:none}
.bh-facts button b{color:${B.navy};font-weight:600}
.bh-facts button span{font-family:${SERIF};color:${B.body}}
.bh-facts button:hover span{color:${B.blue}}
@media(max-width:860px){
  .bh-roles,.bh-g3,.bh-g2,.bh-rules,.bh-anim{grid-template-columns:1fr}
  .bh-wrap{padding:0 16px}
  .bh-facts button{grid-template-columns:1fr;gap:2px}
}
`;
