"use client";

// ── The new patient visit: showcase + four blocks + outcome row ─
// Sits under #services on the homepage, in place of the outcome tiles
// (components/our-approach.tsx, kept for rollback).
//
// The first visit is the way in. The showcase shows the visit reading a
// person: four points light up (beauty and cosmetic, oral health, longevity,
// airway and grinding) and the Primary iD fills in. Three visuals, one prop:
// "person" (a scan over a profile, then her smile), "turn" (she turns and
// smiles under a live face mesh, from a clip) and "arch" (a drawing of the
// teeth). Below it, four blocks say what each read covers and lead to the
// services behind it, then a scrollable row of outcomes.
//
// SVG + CSS animation, no libraries. Each visual has one cycle that every
// animated element shares, phased with animation-delay, so they stay in step;
// the turn keeps them on the video's clock. prefers-reduced-motion shows the
// finished state, still.
//
// Type follows the Primary Brand OS: Montserrat for structure, Georgia for
// reading, JetBrains Mono for data labels, one Georgia italic blue phrase.
// The section heading uses the site's shared H2 size (--fs-h2, globals.css).
// Colours follow the live site's outcome tiles (cleanings green, aligner
// blue, sleep purple, longevity slate) so the section matches the rest of
// the site; the Brand OS dimension tokens differ (logged as a conflict on
// the Asset Map). Block images in /images/visit/ are AI placeholders until
// in-house photography.

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import localFont from "next/font/local";

// Fonts ship with the site (public/fonts), never fetched from Google at build
// time: two production builds failed on that (see #17).
const vsSans = localFont({
  src: "../public/fonts/montserrat.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-vs-sans",
});
const vsMono = localFont({
  src: "../public/fonts/jetbrains-mono.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-vs-mono",
});

const BOOK = "/book/preventive/"; // 307s into the Primary iD flow, door=preventive (next.config.mjs)

// ── the four reads ────────────────────────────────────────────
type Pillar = {
  key: string;
  name: string;
  reads: string;
  color: string;
  delay: number; // seconds into the 8 s cycle when the scan reaches it
  node: [number, number]; // point on the arch (viewBox units)
  leader: string; // path from the node to its label
  label: CSSProperties; // label position over the drawing, in %
  side: "l" | "r";
  // the same four reads placed on the person (viewBox 0 0 960 560; the
  // portrait is the 540 px square at x 210, y 10)
  person: { delay: number; node: [number, number]; leader: string; label: CSSProperties; side: "l" | "r" };
  // and on the turning clip, where she ends facing us (same frame as the
  // portrait). Nodes are where the clip's baked points sit while she smiles.
  turn: { delay: number; node: [number, number]; leader: string; label: CSSProperties; side: "l" | "r" };
};

const PILLARS: Pillar[] = [
  {
    key: "cosmetic", name: "Beauty & cosmetic", reads: "shade · alignment · smile line",
    color: "#24A7E0", delay: 0.25, node: [480, 64],
    leader: "M480 64 L560 34 L700 34", label: { left: "73%", top: "4%" }, side: "r",
    person: { delay: 0.61, node: [312.6, 293.5], leader: "M312.6 293.5 L192 293.5",
      label: { right: "80.2%", top: "52.4%" }, side: "l" },
    turn: { delay: 0.5, node: [416.8, 304.3], leader: "M416.8 304.3 L192 304.3",
      label: { right: "80.2%", top: "54.3%" }, side: "l" },
  },
  {
    key: "oral", name: "Oral health", reads: "gums · enamel · breath",
    color: "#3FA98A", delay: 0.75, node: [353, 112],
    leader: "M353 112 L262 112", label: { right: "73%", top: "27%" }, side: "l",
    person: { delay: 1.02, node: [382.8, 271.9], leader: "M382.8 271.9 L330 410 L192 410",
      label: { right: "80.2%", top: "73.2%" }, side: "l" },
    turn: { delay: 0.67, node: [464.9, 369.7], leader: "M464.9 369.7 L420 430 L192 430",
      label: { right: "80.2%", top: "76.8%" }, side: "l" },
  },
  {
    key: "longevity", name: "Longevity", reads: "inflammation · heart · metabolism",
    color: "#5B7BA6", delay: 1.85, node: [480, 205],
    leader: "M480 205 L480 318 L262 318", label: { right: "73%", top: "88%" }, side: "l",
    person: { delay: 1.79, node: [512.4, 474.4], leader: "M512.4 474.4 L768 474.4",
      label: { left: "80%", top: "84.7%" }, side: "r" },
    turn: { delay: 1.08, node: [591.5, 266.4], leader: "M591.5 266.4 L650 226 L768 226",
      label: { left: "80%", top: "40.4%" }, side: "r" },
  },
  {
    key: "airway", name: "Airway & grinding", reads: "airway · bite · wear",
    color: "#7B68EE", delay: 2.2, node: [628, 229],
    leader: "M628 229 L664 252 L700 252", label: { left: "73%", top: "68%" }, side: "r",
    person: { delay: 1.5, node: [463.8, 317.8], leader: "M463.8 317.8 L560 250 L768 250",
      label: { left: "80%", top: "44.6%" }, side: "r" },
    turn: { delay: 0.92, node: [598.9, 371.1], leader: "M598.9 371.1 L652 430 L768 430",
      label: { left: "80%", top: "76.8%" }, side: "r" },
  },
];

// ── the arch: an upper arch, occlusal view, laid out by arc length ─
// [x, y, width, depth, rotation, molar]
const TEETH: [number, number, number, number, number, boolean][] = [
  [456.9, 82.2, 44.3, 31.8, -10.7, false], [417.6, 96.5, 35.4, 29.3, -29.0, false],
  [386.1, 120.0, 38.9, 37.5, -44.2, false], [361.2, 150.9, 36.3, 41.5, -57.6, false],
  [344.1, 184.9, 35.4, 41.5, -68.9, false], [332.4, 229.3, 52.2, 45.6, -81.4, true],
  [330.8, 281.3, 47.8, 43.2, -95.0, true], [503.1, 82.2, 44.3, 31.8, 10.7, false],
  [542.4, 96.5, 35.4, 29.3, 29.0, false], [573.9, 120.0, 38.9, 37.5, 44.2, false],
  [598.8, 150.9, 36.3, 41.5, 57.6, false], [615.9, 184.9, 35.4, 41.5, 68.9, false],
  [627.6, 229.3, 52.2, 45.6, 81.4, true], [629.2, 281.3, 47.8, 43.2, 95.0, true],
];

// the scan runs from y 52 to y 322 over the first 3.2 s of the cycle
const SCAN_Y0 = 52, SCAN_Y1 = 322, SCAN_S = 3.2;
const scanDelay = (y: number) => Math.max(0, ((y - SCAN_Y0) / (SCAN_Y1 - SCAN_Y0)) * SCAN_S);

// contour lines around the arch: the "fingerprint" of the mouth
function arc(offset: number, t0 = -108, t1 = 108) {
  const cx = 480, cy = 262, a = 150 + offset, b = 182 + offset, n = 64;
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = ((t0 + ((t1 - t0) * i) / n) * Math.PI) / 180;
    d += `${i ? "L" : "M"}${(cx + a * Math.sin(t)).toFixed(1)} ${(cy - b * Math.cos(t)).toFixed(1)}`;
  }
  return d;
}
const RINGS: [number, number, boolean][] = [
  [-88, 0.18, true], [-64, 0.24, false], [-44, 0.16, true],
  [46, 0.2, false], [68, 0.14, true], [92, 0.1, false], [118, 0.07, true],
];

function Arch() {
  return (
    <svg className="vsm-svg" viewBox="0 20 960 340" role="img"
      aria-label="An upper dental arch being scanned; four points light up for beauty and cosmetic, oral health, longevity, and airway and grinding">
      <defs>
        <linearGradient id="vsm-line" x1="0" x2="1">
          <stop offset="0" stopColor="#24A7E0" stopOpacity="0" />
          <stop offset=".5" stopColor="#24A7E0" />
          <stop offset="1" stopColor="#24A7E0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vsm-trail" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#24A7E0" stopOpacity="0" />
          <stop offset="1" stopColor="#24A7E0" stopOpacity=".16" />
        </linearGradient>
        <linearGradient id="vsm-hfade" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".2" stopColor="#fff" />
          <stop offset=".8" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* softens the left and right ends of the scan, so it reads as light, not a box */}
        <mask id="vsm-soft" maskUnits="userSpaceOnUse" x="280" y={SCAN_Y0 - 50} width="400" height="60">
          <rect x="280" y={SCAN_Y0 - 50} width="400" height="60" fill="url(#vsm-hfade)" />
        </mask>
      </defs>

      <g aria-hidden="true">
        {RINGS.map(([o, op, dash]) => (
          <path key={o} d={arc(o)} fill="none" stroke="#24A7E0" strokeOpacity={op} strokeWidth="1"
            strokeDasharray={dash ? "2 5" : undefined} />
        ))}
        <path d={arc(30, -104, 104)} fill="none" stroke="#0E2240" strokeOpacity=".16" strokeWidth="1.2" />
        <path d={arc(-30, -104, 104)} fill="none" stroke="#0E2240" strokeOpacity=".16" strokeWidth="1.2" />

        {TEETH.map(([x, y, w, h, r, molar], i) => {
          const ww = w * 0.92, rx = Math.min(ww, h) * 0.42;
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <rect className="vsm-tooth" x={-ww / 2} y={-h / 2} width={ww} height={h} rx={rx}
                style={{ animationDelay: `${scanDelay(y).toFixed(2)}s` }} />
              {molar ? (
                <path d={`M${-ww * 0.28} 0H${ww * 0.28}M0 ${-h * 0.26}V${h * 0.26}`} className="vsm-groove" />
              ) : Math.abs(r) > 40 ? (
                <path d={`M${-ww * 0.22} 0H${ww * 0.22}`} className="vsm-groove" />
              ) : null}
            </g>
          );
        })}

        {PILLARS.map((p) => (
          <path key={p.key} d={p.leader} pathLength={1} className="vsm-leader" stroke={p.color}
            style={{ animationDelay: `${p.delay}s` }} />
        ))}

        <g className="vsm-scan">
          <g mask="url(#vsm-soft)">
            <rect x="280" y={SCAN_Y0 - 40} width="400" height="40" fill="url(#vsm-trail)" />
            <rect x="280" y={SCAN_Y0} width="400" height="2" fill="url(#vsm-line)" />
          </g>
        </g>

        {PILLARS.map((p) => (
          <g key={p.key}>
            <circle className="vsm-pulse" cx={p.node[0]} cy={p.node[1]} r="6" stroke={p.color}
              style={{ animationDelay: `${p.delay}s` }} />
            <circle cx={p.node[0]} cy={p.node[1]} r="5.5" fill={p.color} stroke="#fff" strokeWidth="2" />
          </g>
        ))}
      </g>
    </svg>
  );
}

// ── the clips keep the clock ──────────────────────────────────
// Both people (A and C) are one video each. The labels, leaders, points and
// the Primary iD bar are HTML/SVG animated on the same cycle; this keeps every
// CSS animation in the stage on the video's clock, so they stay in step even
// if the video starts late or stalls. Reduced motion: the video holds a still.
function useVideoClock(cycle: number, stillAt: number) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const stage = v.closest(".vs-stage") as HTMLElement | null;
    v.muted = true; // React does not render the muted attribute, and autoplay needs it
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      v.currentTime = stillAt;
      return;
    }
    let last = 0;
    const sync = () => {
      if (!stage || typeof stage.getAnimations !== "function") return;
      const t = (v.currentTime % cycle) * 1000;
      for (const a of stage.getAnimations({ subtree: true })) if (a instanceof CSSAnimation) a.currentTime = t;
    };
    const onTime = () => {
      if (v.currentTime < last) sync(); // looped
      last = v.currentTime;
    };
    v.addEventListener("playing", sync);
    v.addEventListener("timeupdate", onTime);
    v.play().catch(() => {});
    return () => {
      v.removeEventListener("playing", sync);
      v.removeEventListener("timeupdate", onTime);
    };
  }, [cycle, stillAt]);
  return ref;
}

// ── A, the person: a portrait read by the same scan ───────────
// One 11 s clip (person.webm / person.mp4, 1080 px square): a scan line
// crosses her profile from the mouth back and the anatomy shows through behind
// it; the read holds; the line sweeps back, then she turns to us and smiles,
// in real motion (Farhad's clip, with its stray strand cleaned out); the smile
// holds and she dissolves back to the profile. The four reads are HTML on top,
// placed on the profile, and step aside while she turns. The stills and the
// clip are AI-made stand-ins for a consented patient.
const PERSON_S = 11;
const PERSON_HOLD = 4.2; // the read, held, for reduced motion

function Person() {
  const ref = useVideoClock(PERSON_S, PERSON_HOLD);
  return (
    <div className="vsp">
      <div className="vsp-frame">
        <video ref={ref} autoPlay muted loop playsInline preload="auto"
          poster="/images/visit/person-poster.webp" width={1080} height={1080}
          aria-label="A woman in profile; a scan passes across her and shows her teeth, jaw, airway and spine beneath, then she turns to us and smiles">
          <source src="/images/visit/person.webm" type="video/webm" />
          <source src="/images/visit/person.mp4" type="video/mp4" />
        </video>
      </div>
      <svg className="vsp-svg" viewBox="0 0 960 560" aria-hidden="true">
        {PILLARS.map((p) => (
          <path key={p.key} d={p.person.leader} pathLength={1} className="vsm-leader" stroke={p.color}
            style={{ animationDelay: `${p.person.delay}s` }} />
        ))}
        {PILLARS.map((p) => (
          <g key={p.key}>
            <circle className="vsm-pulse" cx={p.person.node[0]} cy={p.person.node[1]} r="6" stroke={p.color}
              style={{ animationDelay: `${p.person.delay}s` }} />
            <circle cx={p.person.node[0]} cy={p.person.node[1]} r="5.5" fill={p.color} stroke="#fff" strokeWidth="2" />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── C, the turn: she turns to us and smiles, read by a live face mesh ─
// One clip (turn.webm / turn.mp4, 7.875 s, 1080 px square): her profile holds
// while a scan line draws a face mesh over her; she turns to us with the mesh
// tracking her, the four reads light on her face, her smile opens and the mesh
// dissolves, leaving the reads; then the line sweeps back to the profile. The
// mesh is real face tracking (MediaPipe landmarks) baked into the frames, made
// from Farhad's AI clip with its stray strand cleaned out: a stand-in for a
// consented patient.
const TURN_S = 7.875;
const TURN_HOLD = 5.6; // the held smile, for reduced motion

function Turn() {
  const ref = useVideoClock(TURN_S, TURN_HOLD);
  return (
    <div className="vsp vst">
      <div className="vsp-frame">
        <video ref={ref} className="vst-video" autoPlay muted loop playsInline preload="auto"
          poster="/images/visit/turn-poster.webp" width={1080} height={1080}
          aria-label="A woman in profile is scanned by a face mesh as she turns to face us; four points light on her face and she smiles">
          <source src="/images/visit/turn.webm" type="video/webm" />
          <source src="/images/visit/turn.mp4" type="video/mp4" />
        </video>
      </div>
      <svg className="vsp-svg" viewBox="0 0 960 560" aria-hidden="true">
        {PILLARS.map((p, i) => (
          <path key={p.key} d={p.turn.leader} pathLength={1} className="vsm-leader" stroke={p.color}
            style={{ animationDelay: `${i * 0.08}s` }} />
        ))}
      </svg>
    </div>
  );
}

// ── the four blocks ───────────────────────────────────────────
type Lead = { label: string; href: string };
type Block = {
  n: string; name: string; color: string; img: string; alt: string; pos: string;
  line: string; leads: Lead[];
};

const BLOCKS: Block[] = [
  {
    n: "01", name: "Oral health", color: "#3FA98A",
    img: "/images/visit/oral.webp", alt: "A dental mirror and a toothbrush in soft daylight", pos: "50% 100%",
    line: "Your gums, teeth and breath, read with x-rays, photos and a full gum exam.",
    leads: [
      { label: "Cleanings and gum care", href: "/preventive-care/" },
      { label: "Mercury-safe care", href: "/safe-mercury-removal/" },
    ],
  },
  {
    n: "02", name: "Airway & grinding", color: "#7B68EE",
    img: "/images/visit/airway.webp", alt: "A clear night guard floating in morning light", pos: "50% 100%",
    line: "Snoring, clenching, waking tired. We look at how you breathe and how your teeth meet before anyone suggests a fix.",
    leads: [{ label: "Sleep and airway", href: "/airway-sleep/" }],
  },
  {
    n: "03", name: "Beauty & cosmetic", color: "#24A7E0",
    img: "/images/visit/cosmetic.webp", alt: "Porcelain shade tabs fanned out beside a white petal", pos: "50% 80%",
    line: "Shade, alignment and wear, and the bite underneath, so a better smile sits on teeth that can hold it.",
    leads: [
      { label: "Whitening, veneers and bonding", href: "/cosmetic-dentistry/" },
      { label: "Clear aligners", href: "/book/orthofx/" },
    ],
  },
  {
    n: "04", name: "Longevity", color: "#5B7BA6",
    img: "/images/visit/longevity.webp", alt: "A small glass sample vial in cool light", pos: "50% 100%",
    line: "Inflammation, heart and metabolic history, and family history, read alongside your mouth so you know what to watch.",
    leads: [
      { label: "Primary iD Plus", href: "/primary-id-plus/" },
      { label: "How the mouth connects", href: "/oral-systemic/" },
    ],
  },
];

// ── the outcome row: what people come in wanting ──────────────
// Smaller cards under the four blocks, in the same colours as the outcome
// tiles they replace (components/our-approach.tsx): each card rests on its
// light tint and, on hover, floods with a deeper shade of its colour while
// the icon tile shifts and tilts, the way the Hims tiles do. The deep shades
// keep white text at 4.5:1 or better. Out of pain floods navy; its old rose
// (#C7305A) is a retired colour in the Brand OS, so its icon uses the Brand
// OS coral instead.
// The row scrolls (swipe, trackpad or the arrows); it does not move by itself.
// Wants go straight into the Primary iD flow through their door, so the
// click carries the intent (next.config.mjs maps /book/* to ?door=).
const ic = (c: string) => ({ fill: "none", stroke: c, strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });
type Outcome = {
  want: string; pillar: string; href: string;
  accent: string; tint: string; deep: [string, string];
  icon: (c: string) => ReactNode;
};
const OUTCOMES: Outcome[] = [
  { want: "Whiter teeth", pillar: "Beauty & cosmetic", href: "/book/cosmetic/",
    accent: "#C79A3E", tint: "246,238,224", deep: ["#906D26", "#73581F"],
    icon: (c) => <path {...ic(c)} d="M7 3c-2 0-3 1.6-3 4 0 3 1 5 1.4 8.5C5.6 18 6 20 7 20c1.2 0 1-3 2-3s.8 3 2 3c1 0 1.4-2 1.6-4.5C15 12 16 10 16 7c0-2.4-1-4-3-4-1.4 0-1.6 1-3 1s-1.6-1-3-1z" transform="translate(2 1)" /> },
  { want: "Straighter teeth", pillar: "Beauty & cosmetic", href: "/book/orthofx/",
    accent: "#24A7E0", tint: "224,240,251", deep: ["#147CA9", "#106489"],
    icon: (c) => <path {...ic(c)} d="M4 15c0-5 3.5-8 8-8s8 3 8 8M8 13v3M12 12v4M16 13v3" /> },
  { want: "Fresh breath", pillar: "Oral health", href: "/book/preventive/",
    accent: "#3FA98A", tint: "226,242,232", deep: ["#2D8068", "#246653"],
    icon: (c) => <path {...ic(c)} d="M5 19c0-8 6-13 14-14 1 9-4 15-14 14zM5 19c3-4 6-6 10-8" /> },
  { want: "Healthy gums", pillar: "Oral health", href: "/book/preventive/",
    accent: "#D8785E", tint: "250,232,226", deep: ["#C44B2B", "#A64024"],
    icon: (c) => <path {...ic(c)} d="M12 20s-7-4.6-7-9.5A3.5 3.5 0 0112 8a3.5 3.5 0 017 2.5C19 15.4 12 20 12 20z" /> },
  { want: "Restful sleep", pillar: "Airway & grinding", href: "/book/airway/",
    accent: "#7B68EE", tint: "235,232,250", deep: ["#705BF1", "#543AEE"],
    icon: (c) => <path {...ic(c)} d="M20 14a8 8 0 11-9-11 6.5 6.5 0 009 11z" /> },
  { want: "A calmer jaw", pillar: "Airway & grinding", href: "/book/airway/",
    accent: "#7B68EE", tint: "235,232,250", deep: ["#705BF1", "#543AEE"],
    icon: (c) => <path {...ic(c)} d="M4 10c2.5-3.5 13.5-3.5 16 0M4 14c2.5 3.5 13.5 3.5 16 0M9 9.5v1.5M12 9v2M15 9.5v1.5M9 13v1.5M12 13v2M15 13v1.5" /> },
  { want: "Ahead of it", pillar: "Longevity", href: "/book/longevity/",
    accent: "#5B7BA6", tint: "228,234,244", deep: ["#5475A0", "#486489"],
    icon: (c) => <path {...ic(c)} d="M4 19h16M5 15l4-4 3 3 6-7M18 7h2v2" /> },
  { want: "A new smile", pillar: "Implants & full arch", href: "/dental-implant/",
    accent: "#D8905A", tint: "250,238,225", deep: ["#AC5F25", "#8F4F1E"],
    icon: (c) => <path {...ic(c)} d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7z" /> },
  { want: "A second opinion", pillar: "Bring your plan", href: "/book/second-opinion/",
    accent: "#4A6D8C", tint: "228,235,243", deep: ["#486D8E", "#3C5B76"],
    icon: (c) => <path {...ic(c)} d="M7 4h10a2 2 0 012 2v13a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zM9 4h6v3H9zM8 12h8M8 16h5" /> },
  { want: "Out of pain", pillar: "Call (310) 564-8990", href: "tel:+13105648990",
    accent: "#D97757", tint: "250,232,236", deep: ["#0E2240", "#16305A"],
    icon: (c) => <path {...ic(c)} d="M13 2L5 13h5l-1 9 8-12h-5z" /> },
];

function OutcomeCard({ o }: { o: Outcome }) {
  const vars = { "--t": o.tint, "--d1": o.deep[0], "--d2": o.deep[1], "--a": o.accent } as CSSProperties;
  return (
    <a className="vs-out" href={o.href} style={vars}>
      <span className="vs-out-t">
        <b>{o.want}</b>
        <i><span className="vs-dot" />{o.pillar}</i>
      </span>
      <span className="vs-out-ic" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22">{o.icon(o.accent)}</svg>
      </span>
      <svg className="vs-out-go" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M9 6l6 6-6 6" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function OutcomeRow() {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const go = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.75, 300), behavior: "smooth" });
  };
  return (
    <>
      <div className="vs-rail-head">
        <p className="vs-eyebrow">Or start with what you came for</p>
        <div className="vs-arrows">
          <button type="button" aria-label="Scroll back" disabled={edge.start} onClick={() => go(-1)}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" aria-label="Scroll forward" disabled={edge.end} onClick={() => go(1)}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
      <div className="vs-rail" ref={ref} onScroll={update}>
        <div className="vs-track">
          {OUTCOMES.map((o) => <OutcomeCard key={o.want} o={o} />)}
        </div>
      </div>
    </>
  );
}

const CSS = `
.vs{--navy:#0E2240;--blue:#24A7E0;--cream:#FAF8F5;--warm:#FEFCF9;
  --ink-soft:#3a4a66;--muted:#7A8695;--line:rgba(14,34,64,.12);
  --sans:var(--font-vs-sans,"Montserrat"),"Montserrat","Helvetica Neue",Arial,sans-serif;
  --mono:var(--font-vs-mono,"JetBrains Mono"),"JetBrains Mono",ui-monospace,Menlo,monospace;
  --serif:Georgia,"Times New Roman",serif;
  background:var(--cream);padding-top:16px;}
.vs *{box-sizing:border-box;}

/* the showcase: a light panel, a faint dot grid like a scan bed */
.vs-stage{position:relative;overflow:hidden;isolation:isolate;max-width:1376px;margin:0 16px;
  border-radius:24px;background:#F1F6F9;color:var(--navy);padding:76px 24px 64px;text-align:center;}
@media (min-width:1408px){.vs-stage{margin:0 auto;}}
.vs-stage::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background-image:radial-gradient(rgba(14,34,64,.13) 1px,transparent 1.3px);background-size:22px 22px;
  -webkit-mask-image:radial-gradient(ellipse 58% 52% at 50% 52%,#000 25%,transparent 78%);
  mask-image:radial-gradient(ellipse 58% 52% at 50% 52%,#000 25%,transparent 78%);}
.vs-eyebrow{font-family:var(--sans);font-weight:600;font-size:11px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--blue);margin:0 0 18px;}
.vs-h2{font-family:var(--sans);font-weight:600;font-size:var(--fs-h2,clamp(30px,3.3vw,46px));
  line-height:1.1;letter-spacing:-.025em;margin:0;color:var(--navy);}
.vs-h2 em{font-family:var(--serif);font-weight:400;font-style:italic;letter-spacing:-.01em;
  color:var(--blue);font-size:1.06em;}
.vs-sub{font-family:var(--serif);font-size:17px;line-height:1.62;color:var(--ink-soft);
  max-width:35em;margin:22px auto 28px;}
.vs-ctas{display:flex;flex-wrap:wrap;gap:14px 26px;align-items:center;justify-content:center;}
.vs-pill{display:inline-flex;align-items:center;min-height:48px;padding:0 30px;border-radius:999px;
  background:var(--navy);color:#fff;font-family:var(--sans);font-weight:600;font-size:15px;
  letter-spacing:.02em;text-decoration:none;transition:transform .2s ease,box-shadow .2s ease,background .2s ease;}
.vs-pill:hover{transform:translateY(-2px);background:#16305a;box-shadow:0 14px 30px -16px rgba(14,34,64,.6);}
.vs-link{font-family:var(--sans);font-weight:600;font-size:14px;color:var(--navy);
  text-decoration:none;border-bottom:1px solid rgba(14,34,64,.3);padding-bottom:2px;}
.vs-link:hover{border-bottom-color:var(--navy);}

/* the drawing */
.vsm{position:relative;max-width:960px;margin:26px auto 0;}
.vsm-svg{display:block;width:100%;height:auto;overflow:visible;}
.vsm-tooth{fill:#fff;stroke:var(--navy);stroke-width:1.3;animation:vsm-glow 8s linear infinite both;}
.vsm-groove{stroke:var(--navy);stroke-opacity:.32;stroke-width:1;fill:none;}
@keyframes vsm-glow{0%{fill:#fff;stroke:#0E2240}3%{fill:#DCF1FB;stroke:#24A7E0}
  18%{fill:#fff;stroke:#0E2240}100%{fill:#fff;stroke:#0E2240}}
.vsm-scan{animation:vsm-scan 8s linear infinite both;}
@keyframes vsm-scan{0%{transform:translateY(0);opacity:0}3%{opacity:1}
  40%{transform:translateY(${SCAN_Y1 - SCAN_Y0}px);opacity:1}45%{transform:translateY(${SCAN_Y1 - SCAN_Y0}px);opacity:0}
  100%{transform:translateY(${SCAN_Y1 - SCAN_Y0}px);opacity:0}}
.vsm-pulse{fill:none;stroke-width:1.5;transform-box:fill-box;transform-origin:center;
  animation:vsm-pulse 8s ease-out infinite both;}
@keyframes vsm-pulse{0%{transform:scale(1);opacity:0}1%{opacity:.9}14%{transform:scale(4.2);opacity:0}100%{opacity:0}}
.vsm-leader{fill:none;stroke-width:1.2;stroke-dasharray:1;animation:vsm-draw 8s ease-out infinite both;}
@keyframes vsm-draw{0%{stroke-dashoffset:1;opacity:1}6%{stroke-dashoffset:0}84%{stroke-dashoffset:0;opacity:1}
  94%{stroke-dashoffset:0;opacity:0}100%{stroke-dashoffset:1;opacity:0}}
.vsm-chip{position:absolute;display:flex;align-items:flex-start;gap:9px;padding:10px 14px 10px 12px;
  background:rgba(255,255,255,.86);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);
  border:1px solid var(--line);border-radius:16px;text-align:left;white-space:nowrap;
  box-shadow:0 12px 28px -20px rgba(14,34,64,.45);transform:translateY(-50%);
  animation:vsm-chip 8s ease-out infinite both;}
.vsm-chip[data-side="l"]{flex-direction:row-reverse;text-align:right;padding:10px 12px 10px 14px;}
@keyframes vsm-chip{0%{opacity:.35}5%{opacity:1}84%{opacity:1}94%{opacity:.35}100%{opacity:.35}}
.vsm-dot{flex:none;width:9px;height:9px;border-radius:50%;margin-top:4px;}
.vsm-chip b{display:block;font-family:var(--sans);font-weight:600;font-size:13.5px;color:var(--navy);letter-spacing:-.005em;}
.vsm-chip i{display:block;font-style:normal;font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:3px;}

/* the people (A and C): a square video frame, its edges fading into the panel */
.vsm-person{max-width:960px;}
.vsp{position:relative;width:100%;aspect-ratio:960/560;}
.vsp-frame{position:absolute;left:21.875%;top:1.786%;width:56.25%;aspect-ratio:1/1;
  -webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 13%,#000 84%,transparent 100%),
    linear-gradient(to right,transparent 0,#000 9%,#000 86%,transparent 100%);
  -webkit-mask-composite:source-in;
  mask-image:linear-gradient(to bottom,transparent 0,#000 13%,#000 84%,transparent 100%),
    linear-gradient(to right,transparent 0,#000 9%,#000 86%,transparent 100%);
  mask-composite:intersect;}
.vsp-frame video{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;}
.vsp-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;}
.vsm-labels{position:absolute;inset:0;pointer-events:none;}

/* A runs on the clip's 11 s cycle:
   0-3.2 s the scan reads her · to 5 s hold · 5-5.7 s the line sweeps back
   · 5.7-8.3 s she turns to us and smiles · to 10.4 s hold · she dissolves
   back to the profile. The reads step aside while she turns. */
.is-person .vsp-svg,.is-person .vsm-labels{animation:vsp-labels 11s linear infinite both;}
@keyframes vsp-labels{0%{opacity:1}44%{opacity:1}48%{opacity:0}98.5%{opacity:0}100%{opacity:1}}
.is-person .vsm-chip{animation-name:vsp-chip;animation-duration:11s;}
@keyframes vsp-chip{0%{opacity:.35}4%{opacity:1}60%{opacity:1}62%{opacity:.35}100%{opacity:.35}}
.is-person .vsm-leader{animation-name:vsp-draw;animation-duration:11s;}
@keyframes vsp-draw{0%{stroke-dashoffset:1;opacity:1}5%{stroke-dashoffset:0}60%{stroke-dashoffset:0;opacity:1}
  62%{stroke-dashoffset:1;opacity:0}100%{stroke-dashoffset:1;opacity:0}}
.is-person .vsm-pulse{animation-duration:11s;}
.is-person .vsm-bar span i{animation-name:vsp-fill;animation-duration:11s;}
@keyframes vsp-fill{0%{transform:scaleX(0)}5%{transform:scaleX(1)}84%{transform:scaleX(1)}89%{transform:scaleX(0)}100%{transform:scaleX(0)}}
.is-person .vsm-state .a{animation-name:vsp-a;animation-duration:11s;}
.is-person .vsm-state .b{animation-name:vsp-b;animation-duration:11s;}
@keyframes vsp-a{0%{opacity:1}29%{opacity:1}32%{opacity:0}97%{opacity:0}100%{opacity:1}}
@keyframes vsp-b{0%{opacity:0}30%{opacity:0}33%{opacity:1}94%{opacity:1}97%{opacity:0}100%{opacity:0}}

/* the turn runs on the clip's 7.875 s cycle:
   0-1.25 s the scan draws the mesh on her profile · to 3.9 s she turns to us
   · to 4.4 s her smile opens and the mesh dissolves · to 7.1 s hold, the
   labels link to her · 7.1-7.9 s the line sweeps back to the profile */
.is-turn .vsm-chip{animation-name:vst-chip;animation-duration:${TURN_S}s;}
@keyframes vst-chip{0%{opacity:.35}3%{opacity:1}82%{opacity:1}86%{opacity:.35}100%{opacity:.35}}
.is-turn .vsm-leader{animation-name:vst-draw;animation-duration:${TURN_S}s;}
@keyframes vst-draw{0%{stroke-dashoffset:1;opacity:1}55%{stroke-dashoffset:1}61%{stroke-dashoffset:0}
  86%{stroke-dashoffset:0;opacity:1}89%{stroke-dashoffset:0;opacity:0}100%{stroke-dashoffset:1;opacity:0}}
.is-turn .vsm-bar span i{animation-name:vst-fill;animation-duration:${TURN_S}s;}
@keyframes vst-fill{0%{transform:scaleX(0)}4%{transform:scaleX(1)}84%{transform:scaleX(1)}88%{transform:scaleX(0)}100%{transform:scaleX(0)}}
.is-turn .vsm-state .a{animation-name:vst-a;animation-duration:${TURN_S}s;}
.is-turn .vsm-state .b{animation-name:vst-b;animation-duration:${TURN_S}s;}
@keyframes vst-a{0%{opacity:1}53%{opacity:1}55%{opacity:0}91%{opacity:0}93%{opacity:1}100%{opacity:1}}
@keyframes vst-b{0%{opacity:0}54%{opacity:0}56%{opacity:1}90%{opacity:1}92%{opacity:0}100%{opacity:0}}

/* the Primary iD filling in */
.vsm-id{display:inline-flex;align-items:center;gap:14px;margin:10px auto 0;padding:11px 18px;
  background:#fff;border:1px solid var(--line);border-radius:999px;box-shadow:0 12px 28px -22px rgba(14,34,64,.5);}
.vsm-id-k{font-family:var(--mono);font-weight:500;font-size:11px;letter-spacing:.12em;color:var(--navy);}
.vsm-bar{display:flex;gap:3px;width:150px;}
.vsm-bar span{flex:1;height:6px;border-radius:999px;background:rgba(14,34,64,.08);overflow:hidden;}
.vsm-bar span i{display:block;height:100%;width:100%;border-radius:999px;transform-origin:left;
  animation:vsm-fill 8s ease-out infinite both;}
@keyframes vsm-fill{0%{transform:scaleX(0)}6%{transform:scaleX(1)}86%{transform:scaleX(1)}94%{transform:scaleX(0)}100%{transform:scaleX(0)}}
.vsm-state{position:relative;display:inline-block;min-width:11em;height:1.3em;text-align:left;
  font-family:var(--mono);font-size:11.5px;color:var(--ink-soft);}
.vsm-state em{position:absolute;left:0;top:0;font-style:normal;white-space:nowrap;}
.vsm-state .a{animation:vsm-a 8s linear infinite both;}
.vsm-state .b{color:var(--navy);font-weight:500;animation:vsm-b 8s linear infinite both;}
@keyframes vsm-a{0%{opacity:1}40%{opacity:1}44%{opacity:0}96%{opacity:0}100%{opacity:1}}
@keyframes vsm-b{0%{opacity:0}42%{opacity:0}46%{opacity:1}92%{opacity:1}96%{opacity:0}100%{opacity:0}}

/* the four blocks */
.vs-blocks{max-width:1120px;margin:0 auto;padding:60px 24px 0;}
.vs-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:10px 24px;margin-bottom:22px;}
.vs-head .vs-eyebrow{margin:0;display:flex;align-items:center;gap:12px;}
.vs-head .vs-eyebrow::before{content:"";width:26px;height:1px;background:currentColor;}
.vs-note{font-family:var(--serif);font-size:15px;color:var(--muted);margin:0;}
.vs-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;}
.vs-card{position:relative;display:flex;flex-direction:column;background:var(--warm);border:1px solid var(--line);
  border-radius:24px;overflow:hidden;transition:transform .2s ease,box-shadow .2s ease;}
.vs-card:hover{transform:translateY(-4px);box-shadow:0 24px 46px -26px rgba(14,34,64,.45);}
.vs-media{overflow:hidden;}
.vs-card img{display:block;width:100%;height:auto;aspect-ratio:1/1;object-fit:cover;
  transition:transform .8s cubic-bezier(.2,.8,.2,1),filter .6s ease;}
.vs-card:hover img{transform:scale(1.06);filter:saturate(1.15) brightness(1.02);}
.vs-body{transition:background .5s ease;}
.vs-card:hover .vs-body{background:color-mix(in srgb,var(--c) 11%,#FEFCF9);}
.vs-name .vs-dot{transition:transform .4s cubic-bezier(.2,.8,.2,1);}
.vs-card:hover .vs-name .vs-dot{transform:scale(1.5);}
.vs-leads a{display:inline-block;transition:color .2s ease,transform .3s cubic-bezier(.2,.8,.2,1);}
.vs-leads a:hover{transform:translateX(3px);}
.vs-body{display:flex;flex-direction:column;flex:1;padding:20px 22px 22px;}
.vs-name{display:flex;align-items:center;gap:9px;margin:0 0 8px;font-family:var(--sans);
  font-weight:600;font-size:18px;letter-spacing:-.01em;color:var(--navy);}
.vs-n{font-family:var(--mono);font-weight:400;font-size:12px;color:var(--muted);}
.vs-dot{width:8px;height:8px;border-radius:50%;flex:none;}
.vs-line{font-family:var(--serif);font-size:15px;line-height:1.55;color:var(--ink-soft);margin:0 0 18px;}
.vs-leads{list-style:none;margin:auto 0 0;padding:14px 0 0;border-top:1px solid var(--line);
  display:flex;flex-direction:column;gap:9px;}
.vs-leads a{font-family:var(--sans);font-weight:600;font-size:13.5px;color:var(--navy);text-decoration:none;}
.vs-leads a:hover{color:var(--blue);}
/* the outcome row */
.vs-rail-head{max-width:1120px;margin:44px auto 14px;padding:0 24px;display:flex;
  justify-content:space-between;align-items:center;gap:16px;}
.vs-rail-head .vs-eyebrow{margin:0;display:flex;align-items:center;gap:12px;}
.vs-rail-head .vs-eyebrow::before{content:"";width:26px;height:1px;background:currentColor;}
.vs-arrows{display:flex;gap:8px;}
.vs-arrows button{width:44px;height:44px;border-radius:999px;border:1px solid rgba(14,34,64,.18);background:#fff;
  display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--navy);
  transition:background .2s ease,border-color .2s ease,opacity .2s ease;}
.vs-arrows button:hover:not(:disabled){background:var(--navy);border-color:var(--navy);color:#fff;}
.vs-arrows button:disabled{opacity:.35;cursor:default;}
.vs-arrows svg path{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
/* the row starts in line with the blocks and runs off the right edge */
.vs-rail{overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;
  padding:8px max(24px,calc((100% - 1072px) / 2)) 16px;scroll-padding:0 max(24px,calc((100% - 1072px) / 2));}
.vs-rail::-webkit-scrollbar{display:none;}
.vs-track{display:flex;gap:12px;width:max-content;}
.vs-end{height:68px;}
.vs-out{position:relative;isolation:isolate;overflow:hidden;flex:none;display:flex;align-items:center;gap:14px;
  width:292px;min-height:88px;padding:14px 16px 14px 20px;border-radius:24px;border:1px solid var(--line);
  background:linear-gradient(155deg,rgb(var(--t)),#fff 150%);text-decoration:none;color:var(--navy);
  scroll-snap-align:start;transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s ease,border-color .4s ease;}
.vs-out::before{content:"";position:absolute;inset:0;z-index:-1;opacity:0;
  background:linear-gradient(155deg,var(--d1),var(--d2));transition:opacity .4s ease;}
.vs-out-t{flex:1;min-width:0;}
.vs-out-t b{display:block;font-family:var(--sans);font-weight:600;font-size:16.5px;letter-spacing:-.01em;line-height:1.2;transition:color .4s;}
.vs-out-t i{display:flex;align-items:center;gap:7px;margin-top:5px;font-style:normal;font-family:var(--mono);
  font-size:10.5px;color:var(--ink-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .4s;}
.vs-out-t .vs-dot{width:6px;height:6px;background:var(--a);transition:background .4s;}
.vs-out-ic{flex:none;width:46px;height:46px;border-radius:16px;background:#fff;display:flex;align-items:center;
  justify-content:center;box-shadow:0 10px 20px -14px rgba(14,34,64,.45);
  transform:translateX(-6px);transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s ease;}
.vs-out-go{flex:none;stroke:var(--navy);transition:stroke .4s,transform .35s cubic-bezier(.2,.8,.2,1);}
.vs-out-go path{stroke:inherit;}
.vs-out:hover,.vs-out:focus-visible{transform:translateY(-3px);border-color:transparent;
  box-shadow:0 18px 34px -22px var(--d2);}
.vs-out:hover::before,.vs-out:focus-visible::before{opacity:1;}
.vs-out:hover b,.vs-out:focus-visible b{color:#fff;}
.vs-out:hover i,.vs-out:focus-visible i{color:rgba(255,255,255,.82);}
.vs-out:hover .vs-dot,.vs-out:focus-visible .vs-dot{background:#fff;}
.vs-out:hover .vs-out-ic,.vs-out:focus-visible .vs-out-ic{transform:translateX(0) rotate(-8deg) scale(1.06);
  box-shadow:0 14px 24px -12px rgba(0,0,0,.35);}
.vs-out:hover .vs-out-go,.vs-out:focus-visible .vs-out-go{stroke:#fff;transform:translateX(3px);}

@media (max-width:980px){
  .vs-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
  .vsm-chip b{font-size:12.5px;}
  .vsm-chip i{display:none;}
}
.vsm-legend{display:none;}
@media (max-width:760px){
  .vsm{margin:18px -24px 0;overflow:hidden;}
  .vsm-svg{width:190%;margin-left:-45%;}
  .vsm-chip,.vsm-leader{display:none;}
  .vsm-person .vsp{width:170%;margin-left:-35%;}
  .vsm-legend{display:grid;grid-template-columns:repeat(2,auto);justify-content:center;gap:8px 22px;
    list-style:none;margin:4px auto 14px;padding:0;text-align:left;}
  .vsm-legend li{display:flex;align-items:center;gap:8px;font-family:var(--sans);font-weight:600;
    font-size:12.5px;color:var(--navy);}
}
@media (max-width:640px){
  .vs{padding-top:8px;}
  .vs-stage{margin:0 8px;padding:56px 16px 48px;border-radius:20px;}
  .vsm{margin:14px -16px 0;}
  .vs-sub{font-size:16px;}
  .vsm-id{gap:10px;padding:10px 14px;}
  .vsm-bar{width:96px;}
  .vsm-state{min-width:10.5em;font-size:10.5px;}
  .vs-blocks{padding:44px 0 0;}
  .vs-head{padding:0 16px;}
  .vs-rail-head{padding:0 16px;margin-top:32px;}
  .vs-out{width:262px;}
  .vs-rail{padding:8px 16px 16px;scroll-padding:0 16px;}
  .vs-end{height:56px;}
  .vs-grid{grid-template-columns:none;grid-auto-flow:column;grid-auto-columns:80%;gap:12px;
    overflow-x:auto;scroll-snap-type:x mandatory;padding:0 16px 6px;scroll-padding:0 16px;
    -webkit-overflow-scrolling:touch;scrollbar-width:none;}
  .vs-grid::-webkit-scrollbar{display:none;}
  .vs-card{scroll-snap-align:start;}
  .vs-card:hover{transform:none;box-shadow:none;}
}
@media (hover:none),(max-width:640px){.vs-arrows{display:none;}}
@media (prefers-reduced-motion:reduce){
  .vs-stage *{animation:none !important;}
  .vsm-scan,.vsm-pulse,.vsm-state .a{opacity:0;}
  .vsm-state .b{opacity:1;}
  .vsm-leader{stroke-dashoffset:0;}
  .vs-card,.vs-pill,.vs-out,.vs-out-ic,.vs-card img,.vs-body,.vs-out::before{transition:none;}
}
`;

// visual="person" (default) shows the portrait read; visual="turn" shows her
// turning and smiling under a face mesh; visual="arch" shows the drawing of
// the teeth. Switch in app/page.tsx: <VisitShowcase visual="turn" />
export default function VisitShowcase({ visual = "person" }: { visual?: "person" | "arch" | "turn" }) {
  const person = visual === "person";
  const turn = visual === "turn";
  const at = (p: Pillar) => (person ? p.person : turn ? p.turn : p);
  return (
    <section className={`vs ${vsSans.variable} ${vsMono.variable}`} aria-labelledby="vs-title">
      <style>{CSS}</style>

      <div className={person ? "vs-stage is-person" : turn ? "vs-stage is-turn" : "vs-stage"}>
        <p className="vs-eyebrow">New patients &middot; Your first visit</p>
        <h2 id="vs-title" className="vs-h2 r-h2">
          Your health, read <em>from your mouth.</em>
        </h2>

        <div className={person || turn ? "vsm vsm-person" : "vsm"}>
          {person ? <Person /> : turn ? <Turn /> : <Arch />}
          <div className="vsm-labels">
          {PILLARS.map((p) => (
            <div key={p.key} className="vsm-chip" data-side={at(p).side}
              style={{ ...at(p).label, animationDelay: `${at(p).delay}s` }}>
              <span className="vsm-dot" style={{ background: p.color }} />
              <span><b>{p.name}</b><i>{p.reads}</i></span>
            </div>
          ))}
          </div>
        </div>

        <ul className="vsm-legend">
          {BLOCKS.map((b) => (
            <li key={b.n}><span className="vs-dot" style={{ background: b.color }} />{b.name}</li>
          ))}
        </ul>

        <div className="vsm-id" aria-hidden="true">
          <span className="vsm-id-k">PRIMARY iD</span>
          <span className="vsm-bar">
            {PILLARS.map((p) => (
              <span key={p.key}><i style={{ background: p.color, animationDelay: `${at(p).delay}s` }} /></span>
            ))}
          </span>
          <span className="vsm-state"><em className="a">Reading your mouth</em><em className="b">Baseline ready</em></span>
        </div>

        <p className="vs-sub">
          Your first visit builds your Primary iD: one record of your gums, your bite and airway,
          your smile, and the markers that shape the decades ahead. Whatever brought you in, you
          leave knowing where you stand and what comes next.
        </p>
        <div className="vs-ctas">
          <a className="vs-pill" href={BOOK}>Book your first visit</a>
          <a className="vs-link" href="/new-patient/">What happens at the visit &rarr;</a>
        </div>
      </div>

      <div className="vs-blocks">
        <div className="vs-head">
          <p className="vs-eyebrow">What your first visit reads</p>
          <p className="vs-note">Every new patient visit covers all four.</p>
        </div>

        <div className="vs-grid">
          {BLOCKS.map((b) => (
            <article key={b.n} className="vs-card" style={{ "--c": b.color } as CSSProperties}>
              <div className="vs-media">
                <img src={b.img} width={768} height={1024} alt={b.alt} loading="lazy" decoding="async"
                  style={{ objectPosition: b.pos }} />
              </div>
              <div className="vs-body">
                <h3 className="vs-name">
                  <span className="vs-dot" style={{ background: b.color }} />
                  <span className="vs-n">{b.n}</span>
                  {b.name}
                </h3>
                <p className="vs-line">{b.line}</p>
                <ul className="vs-leads">
                  {b.leads.map((l) => (
                    <li key={l.href}><a href={l.href}>{l.label} &rarr;</a></li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

      </div>

      <OutcomeRow />
      <div className="vs-end" />
    </section>
  );
}
