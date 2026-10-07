// ─────────────────────────────────────────────────────────────────────────
// Animated implant illustrations for /dental-implant/.
//
// Original Primary artwork, drawn in code: a side view of teeth, gum and
// implant in the brand palette (white teeth with a navy line, a blue implant
// post, a gold connector, on the light-blue field). Each one loops slowly:
// it rests assembled, comes apart, and rebuilds, so the page reads correctly
// even as a still frame. Visitors who ask for reduced motion get the still.
//
// Server component. The drawings are plain SVG strings, so nothing here
// ships JavaScript to the browser.
// ─────────────────────────────────────────────────────────────────────────

const C = {
  navy: "#0E2240",
  blue: "#24A7E0",
  gold: "#D4B584",
  white: "#FFFFFF",
  field: "#EDF3F7",
  titanium: "#9FB0C6",
  zirconia: "#FBF8F1",
  gum: "#F4D3BC",
  gumDeep: "#EDBFA3",
  gumEdge: "#DDA988",
}

const r = (n: number) => Math.round(n * 10) / 10

// A tooth crown: flat base, soft shoulders, a slight dip between two cusps.
function crown(cx: number, base: number, hw: number, h: number, stroke: string = C.navy, sw = 1.5) {
  const t = base - h
  const d = [
    `M${r(cx - hw)} ${r(base)}`,
    `C${r(cx - hw - 2.5)} ${r(base - h * 0.42)} ${r(cx - hw)} ${r(t + h * 0.18)} ${r(cx - hw * 0.6)} ${r(t + 3)}`,
    `Q${r(cx - hw * 0.26)} ${r(t - 1.5)} ${r(cx)} ${r(t + 3)}`,
    `Q${r(cx + hw * 0.26)} ${r(t - 1.5)} ${r(cx + hw * 0.6)} ${r(t + 3)}`,
    `C${r(cx + hw)} ${r(t + h * 0.18)} ${r(cx + hw + 2.5)} ${r(base - h * 0.42)} ${r(cx + hw)} ${r(base)}`,
    "Z",
  ].join(" ")
  return `<path d="${d}" fill="${C.white}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`
}

// The root of a natural tooth, seen faintly through the gum.
function root(cx: number, top: number) {
  return `<path d="M${cx - 8} ${top} Q${cx - 6} ${top + 38} ${cx} ${top + 44} Q${cx + 6} ${top + 38} ${cx + 8} ${top}" fill="rgba(255,255,255,0.55)" stroke="rgba(14,34,64,0.2)" stroke-width="1"/>`
}

// The implant post: a tapered, threaded screw.
function post(cx: number, top: number, len = 50) {
  const taper = 2.6
  let s = `<path d="M${cx - 8} ${top} h16 l-${taper} ${len - 6} q-${8 - taper} 7 -${(8 - taper) * 2} 0 Z" class="ix-post-body" fill="${C.titanium}" stroke="${C.navy}" stroke-width="1.2" stroke-linejoin="round"/>`
  for (let i = 0; i < 5; i++) {
    const y = top + 8 + i * 8
    const half = 8 - (taper * (y - top)) / (len - 6) - 1.4
    s += `<line x1="${r(cx - half)}" y1="${r(y + 1.3)}" x2="${r(cx + half)}" y2="${r(y - 1.3)}" class="ix-thread" stroke="${C.white}" stroke-width="1" stroke-linecap="round" opacity="0.9"/>`
  }
  return s
}

// The abutment: the small connector between post and crown.
function abutment(cx: number, base: number, h = 15) {
  return `<path d="M${cx - 4.5} ${base - h} h9 l3 ${h} h-15 Z" fill="${C.gold}" stroke="${C.navy}" stroke-width="1.2" stroke-linejoin="round"/>`
}

// A low snap attachment, used under a removable denture.
function snapCap(cx: number, base: number) {
  return `<rect x="${cx - 6.5}" y="${base - 10}" width="13" height="10" rx="3.5" fill="${C.gold}" stroke="${C.navy}" stroke-width="1.2"/>`
}

function gumBand(top: number, left = 16, right = 304, bottom = 198) {
  return `<path d="M${left} ${bottom - 14} V${top + 20} Q${left} ${top} ${left + 22} ${top} H${right - 22} Q${right} ${top} ${right} ${top + 20} V${bottom - 14} Q${right} ${bottom} ${right - 14} ${bottom} H${left + 14} Q${left} ${bottom} ${left} ${bottom - 14} Z" fill="${C.gum}" stroke="${C.gumEdge}" stroke-width="1.2"/>`
}

const part = (cls: string, inner: string, step = 0) =>
  `<g class="ix-p ${cls}"${step ? ` style="--ix-step:${step}s"` : ""}>${inner}</g>`

// ─── Scenes ───────────────────────────────────────────────────────────────
function sceneSingle() {
  const g = 130
  const naturals = [60, 100, 140, 220, 260]
  return [
    naturals.map(x => crown(x, g + 3, 15, 48)).join(""),
    gumBand(g),
    naturals.map(x => root(x, g + 5)).join(""),
    part("ix-post", post(180, g + 4)),
    part("ix-abut", abutment(180, g + 4)),
    part("ix-rest", crown(180, g + 1, 15, 48, C.blue, 1.8)),
  ].join("")
}

function sceneBridge() {
  const g = 130
  const naturals = [60, 260]
  return [
    naturals.map(x => crown(x, g + 3, 15, 48)).join(""),
    gumBand(g),
    naturals.map(x => root(x, g + 5)).join(""),
    part("ix-post", post(120, g + 4)),
    part("ix-post", post(200, g + 4), 0.18),
    part("ix-abut", abutment(120, g + 4)),
    part("ix-abut", abutment(200, g + 4), 0.18),
    part("ix-rest", [120, 160, 200].map(x => crown(x, g + 1, 20, 48, C.blue, 1.8)).join("")),
  ].join("")
}

function archTeeth(base: number, h: number) {
  let s = ""
  for (let i = 0; i < 8; i++) s += crown(58 + i * 29.2, base, 14, h, C.blue, 1.6)
  return s
}

function sceneDenture() {
  const g = 138
  const posts = [84, 134, 186, 236]
  const base = `<path d="M44 ${g + 7} Q38 ${g - 17} 60 ${g - 19} H260 Q282 ${g - 17} 276 ${g + 7} Z" fill="${C.gumDeep}" stroke="${C.gumEdge}" stroke-width="1.2" stroke-linejoin="round"/>`
  const housings = posts.map(x => `<circle cx="${x}" cy="${g + 1}" r="4" fill="${C.white}" stroke="${C.navy}" stroke-width="1"/>`).join("")
  return [
    gumBand(g),
    posts.map((x, i) => part("ix-still", post(x, g + 4) + snapCap(x, g + 4), i * 0.1)).join(""),
    part("ix-lift", archTeeth(g - 15, 40) + base + housings),
  ].join("")
}

function sceneFixed() {
  const g = 138
  const base = `<path d="M46 ${g + 4} Q42 ${g - 11} 60 ${g - 13} H260 Q278 ${g - 11} 274 ${g + 4} Z" fill="${C.gumDeep}" stroke="${C.gumEdge}" stroke-width="1.2" stroke-linejoin="round"/>`
  const tilted = (x: number, deg: number) => `<g transform="rotate(${deg} ${x} ${g + 4})">${post(x, g + 4)}</g>`
  return [
    gumBand(g),
    part("ix-post", tilted(78, -24)),
    part("ix-post", post(134, g + 4), 0.14),
    part("ix-post", post(186, g + 4), 0.28),
    part("ix-post", tilted(242, 24), 0.42),
    [78, 134, 186, 242].map((x, i) => part("ix-abut", abutment(x, g + 4, 9), i * 0.14)).join(""),
    part("ix-rest", archTeeth(g - 10, 42) + base),
  ].join("")
}

const SCENES = {
  single: { draw: sceneSingle, label: "A single implant: a post in the jaw, a connector, and a crown that seats on top." },
  bridge: { draw: sceneBridge, label: "An implant bridge: two implant posts carrying three joined crowns." },
  denture: { draw: sceneDenture, label: "An implant-supported denture: a full set of teeth that snaps onto four implants and lifts off." },
  fixed: { draw: sceneFixed, label: "A fixed full arch: four implants, the outer two angled, carrying a full set of teeth that stays in place." },
} as const

export type ImplantScene = keyof typeof SCENES

export function ImplantIllustration({ scene, delay = 0 }: { scene: ImplantScene; delay?: number }) {
  const s = SCENES[scene]
  const svg = `<svg class="ix-svg" viewBox="0 30 320 184" role="img" aria-label="${s.label}" style="--ix-delay:${delay}s">${s.draw()}</svg>`
  return (
    <div
      style={{ background: C.field, borderRadius: 16, overflow: "hidden", lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

// A designed cover for a video, in the same drawing language as the option
// cards above it, so a video on this page never opens on a stray frame.
// With a `scene` the drawing fills the cover. With a `title` the cover is a
// title card and the drawing sits small in the corner. The play control is
// drawn by YouTubeFacade, bottom left, so that corner is kept clear.
export function VideoCover({ kicker, scene, title, accent }: { kicker: string; scene?: ImplantScene; title?: string; accent?: string }) {
  const art = scene ? `<svg class="ix-svg" viewBox="0 30 320 184" aria-hidden="true">${SCENES[scene].draw()}</svg>` : ""
  return (
    <span className={title ? "vcov vcov-title" : "vcov"} style={{ position: "absolute", inset: 0, display: "block", background: `linear-gradient(160deg, #F4F8FA 0%, ${C.field} 55%, #E3EDF3 100%)`, containerType: "inline-size" }}>
      {art ? <span className="vcov-art" dangerouslySetInnerHTML={{ __html: art }} /> : null}
      <span className="vcov-kicker">{kicker}</span>
      {title ? (
        <span className="vcov-line">
          {title} {accent ? <em>{accent}</em> : null}
        </span>
      ) : null}
      <style>{`
        .vcov-art { position: absolute; top: 1%; right: -1%; width: 78%; display: block; line-height: 0; }
        .vcov-art .ix-svg { width: 100%; height: auto; }
        .vcov-kicker { position: absolute; left: 5.2%; top: 7.5%; display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: clamp(9.5px, 2cqw, 11.5px); font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: ${C.blue}; }
        .vcov-kicker::before { content: ""; width: 22px; height: 1px; background: ${C.blue}; }
        .vcov-line { position: absolute; left: 5.2%; right: 8%; top: 22%; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(20px, 6.2cqw, 38px); line-height: 1.1; letter-spacing: -0.02em; color: ${C.navy}; text-align: left; }
        .vcov-line em { display: block; font-style: italic; color: ${C.blue}; }
        .vcov-title .vcov-art { top: auto; bottom: -3%; right: -5%; width: 54%; }
        /* A cover holds still: the drawing rests assembled. */
        .vcov .ix-p { animation: none !important; }
        @container (max-width: 420px) { .vcov:not(.vcov-title) .vcov-art { width: 70%; } }
      `}</style>
    </span>
  )
}

// The labelled anatomy figure: crown, abutment and post, coming apart and
// back together. Rests in the pulled-apart state so all three labels read.
export function ImplantAnatomy() {
  const g = 130
  const gum = gumBand(g, 14, 142)
  const drawing = [
    [34, 72].map(x => crown(x, g + 3, 15, 48)).join(""),
    gum,
    [34, 72].map(x => root(x, g + 5)).join(""),
    post(112, g + 4),
    abutment(112, g + 4),
    `<g class="ix-p ix-crown">${crown(112, g + 1, 15, 48, C.blue, 1.8)}</g>`,
  ].join("")
  const font = "font-family:var(--font-montserrat),'Montserrat','Helvetica Neue',Arial,sans-serif"
  const label = (y: number, x1: number, title: string, sub: string) =>
    `<circle cx="${x1}" cy="${y}" r="3" fill="${C.navy}"/><line x1="${x1}" y1="${y}" x2="266" y2="${y}" stroke="${C.navy}" stroke-width="1"/>` +
    `<text x="276" y="${y - 1}" style="${font};font-size:14px;font-weight:600" fill="${C.navy}">${title}</text>` +
    `<text x="276" y="${y + 16}" style="font-family:Georgia,serif;font-size:12.5px" fill="#3a4a66">${sub}</text>`
  const svg =
    `<svg class="ix-svg" viewBox="0 22 450 260" role="img" aria-label="The three parts of a dental implant: a custom crown on top, an abutment that connects it, and an implant post in the jaw.">` +
    `<g transform="translate(8 -22) scale(1.45)">${drawing}</g>` +
    `<g class="ix-p ix-crown-label">${label(84, 190, "Custom crown", "Made to match your teeth")}</g>` +
    `<g class="ix-p ix-abut-label">${label(161, 181, "Abutment", "Links crown and post")}</g>` +
    label(208, 179, "Implant post", "Titanium or zirconia") +
    `</svg>`
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{ background: C.field, borderRadius: 24, overflow: "hidden", lineHeight: 0 }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </figure>
  )
}

// What a full set of teeth can be made of: three small tiles.
// acrylic  = acrylic teeth on a gum-coloured base
// hybrid   = the same, on a titanium frame
// zirconia = teeth and base milled from one piece of ceramic
export type TeethMaterialKind = "acrylic" | "hybrid" | "zirconia"

export function TeethMaterial({ kind }: { kind: TeethMaterialKind }) {
  const xs = [55, 85, 115, 145]
  const one = kind === "zirconia"
  const teeth = xs.map(x => crown(x, 52, 14.5, 36, one ? C.navy : C.blue, 1.5)).join("")
  const baseFill = one ? C.zirconia : C.gumDeep
  const base = `<path d="M32 70 Q28 48 46 46 H154 Q172 48 168 70 Q168 76 160 76 H40 Q32 76 32 70 Z" fill="${baseFill}" stroke="${one ? C.navy : C.gumEdge}" stroke-width="1.3" stroke-linejoin="round"/>`
  const blush = one ? `<path d="M38 68 Q36 54 48 52 H152 Q164 54 162 68 Z" fill="${C.gum}" opacity="0.55"/>` : ""
  const frame = kind === "hybrid" ? `<rect x="40" y="62" width="120" height="8" rx="4" fill="${C.titanium}" stroke="${C.navy}" stroke-width="1.1"/>` : ""
  const gloss = one ? xs.map(x => `<path d="M${x - 7} 30 Q${x - 5} 23 ${x + 1} 21" fill="none" stroke="${C.blue}" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>`).join("") : ""
  const labels = { acrylic: "Acrylic teeth on a gum-coloured base", hybrid: "Acrylic teeth on a titanium frame", zirconia: "Teeth and base made from one piece of zirconia ceramic" }
  const svg = `<svg class="ix-svg" viewBox="0 0 200 92" role="img" aria-label="${labels[kind]}">${teeth}${base}${blush}${frame}${gloss}</svg>`
  return <div style={{ background: C.field, borderRadius: 16, overflow: "hidden", lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: svg }} />
}

// Rendered once per page. One slow 9-second loop; every part starts and ends
// in its assembled place, so staggered delays never leave a scene half-built.
export function ImplantIllustrationStyles() {
  return (
    <style>{`
      .ix-svg { display: block; width: 100%; height: auto; }
      /* Post material. The switch is two radio buttons; :has() recolours every post. */
      .ix-post-body, .ix-thread { transition: fill .35s ease, stroke .35s ease; }
      .opt-wrap:has(#mat-zr:checked) .ix-post-body { fill: #FBF8F1; }
      .opt-wrap:has(#mat-zr:checked) .ix-thread { stroke: rgba(14,34,64,0.45); }
      .ix-p {
        transform-box: fill-box; transform-origin: 50% 50%;
        animation-duration: 9s; animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(.22,1,.36,1);
        animation-delay: calc(var(--ix-delay, 0s) + var(--ix-step, 0s));
      }
      .ix-post { animation-name: ix-post; }
      .ix-abut { animation-name: ix-abut; }
      .ix-rest { animation-name: ix-rest; }
      .ix-lift { animation-name: ix-lift; }
      .ix-crown { animation-name: ix-crown; }
      .ix-crown-label { animation-name: ix-crown-label; }
      .ix-abut-label { animation-name: ix-abut-label; }
      @keyframes ix-post {
        0%, 28% { opacity: 1; transform: none; }
        33%, 40% { opacity: 0; transform: translateY(-46px); }
        52%, 100% { opacity: 1; transform: none; }
      }
      @keyframes ix-abut {
        0%, 28% { opacity: 1; transform: none; }
        32%, 54% { opacity: 0; transform: translateY(-12px); }
        61%, 100% { opacity: 1; transform: none; }
      }
      @keyframes ix-rest {
        0%, 26% { opacity: 1; transform: none; }
        31%, 64% { opacity: 0; transform: translateY(-58px); }
        78% { opacity: 1; transform: translateY(0); }
        81% { transform: translateY(2px); }
        84%, 100% { opacity: 1; transform: none; }
      }
      @keyframes ix-lift {
        0%, 30% { transform: none; }
        44%, 62% { transform: translateY(-42px); }
        76% { transform: translateY(0); }
        79% { transform: translateY(2.5px); }
        82%, 100% { transform: none; }
      }
      @keyframes ix-crown {
        0%, 38% { transform: translateY(-34px); }
        50% { transform: translateY(0); }
        53% { transform: translateY(1.5px); }
        56%, 78% { transform: translateY(0); }
        92%, 100% { transform: translateY(-34px); }
      }
      @keyframes ix-crown-label {
        0%, 38% { transform: translateY(0); }
        50% { transform: translateY(49.3px); }
        53% { transform: translateY(51.5px); }
        56%, 78% { transform: translateY(49.3px); }
        92%, 100% { transform: translateY(0); }
      }
      @keyframes ix-abut-label {
        0%, 40% { opacity: 1; }
        47%, 82% { opacity: 0; }
        90%, 100% { opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        .ix-p { animation: none !important; }
        .ix-crown { transform: translateY(-34px); }
      }
    `}</style>
  )
}
