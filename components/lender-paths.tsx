// ─────────────────────────────────────────────────────────────────────────
// "One application, every lender path", for the cost section of
// /dental-implant/.
//
// What it has to teach in one look: you fill in one form, it reaches several
// lenders, and a no from one of them is not a no from all of them. So the
// drawing is one node on the left, five paths out, and five lenders that each
// answer on their own. Two of the five answer with an offer.
//
// The lenders are deliberately unnamed and carry no logos. This is an
// example of how the routing works, not a list of who is behind it.
//
// Motion: a pulse leaves the application along each path, one after another,
// and each lender's answer appears as its pulse arrives. Then the drawing
// rests in its finished state. Pulses move at a steady speed because they are
// a signal travelling, and the answers ease in because they are a decision
// landing. With reduced motion the finished state is shown and nothing moves.
// Server component: an SVG string and a style block, no client JavaScript.
// ─────────────────────────────────────────────────────────────────────────

const NAVY = "#0E2240"
const BLUE = "#24A7E0"
const BLUE_SOFT = "#5BC0EC"
const MUTED = "#7A8695"
const SANS = "var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif"
const SERIF = "Georgia, 'Times New Roman', serif"

// One entry per lender, top to bottom. `offer` decides how it answers.
const LENDERS = [
  { offer: false },
  { offer: true },
  { offer: false },
  { offer: true },
  { offer: false },
]

const W = 400
const H = 462
const APP = { x: 0, y: 181, w: 150, h: 100 }
const NODE = { x: 262, w: 138, h: 66, gap: 33 }

export function LenderPaths() {
  const startX = APP.x + APP.w
  const startY = APP.y + APP.h / 2
  const rows = LENDERS.map((l, i) => {
    const y = i * (NODE.h + NODE.gap)
    const cy = y + NODE.h / 2
    const midX = (startX + NODE.x) / 2
    const d = `M${startX} ${startY} C ${midX} ${startY}, ${midX} ${cy}, ${NODE.x} ${cy}`
    const delay = `${(i * 0.55).toFixed(2)}s`
    return `
      <path d="${d}" fill="none" stroke="${BLUE_SOFT}" stroke-opacity="${l.offer ? 0.95 : 0.4}" stroke-width="${l.offer ? 2.5 : 2}" stroke-linecap="round"/>
      <path class="lp-pulse" style="animation-delay:${delay}" d="${d}" pathLength="100" fill="none" stroke="${NAVY}" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="7 100" stroke-dashoffset="7"/>
      <g>
        <rect x="${NODE.x}" y="${y}" width="${NODE.w}" height="${NODE.h}" rx="16" fill="#FFFFFF" stroke="rgba(14,34,64,0.14)" stroke-width="1"/>
        ${l.offer ? `<rect class="lp-ring" style="animation-delay:${delay}" x="${NODE.x}" y="${y}" width="${NODE.w}" height="${NODE.h}" rx="16" fill="rgba(36,167,224,0.07)" stroke="${BLUE}" stroke-width="1.75"/>` : ""}
        <text x="${NODE.x + 18}" y="${y + 27}" style="font-family:${SANS}" font-size="9.5" font-weight="600" letter-spacing="1.5" fill="${MUTED}">LENDER ${i + 1}</text>
        <g class="lp-answer" style="animation-delay:${delay}">
          ${l.offer
            ? `<circle cx="${NODE.x + 22}" cy="${y + 44.5}" r="4" fill="${BLUE}"/><text x="${NODE.x + 33}" y="${y + 49}" style="font-family:${SANS}" font-size="14" font-weight="600" fill="${NAVY}">An offer</text>`
            : `<text x="${NODE.x + 18}" y="${y + 49}" style="font-family:${SANS}" font-size="13.5" font-weight="500" fill="${MUTED}">Not this time</text>`}
        </g>
      </g>`
  }).join("")

  const svg = `
    <svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-labelledby="lp-title lp-desc" xmlns="http://www.w3.org/2000/svg">
      <title id="lp-title">One application reaches several lenders</title>
      <desc id="lp-desc">An example. One application goes to five lenders. Three answer not this time and two answer with an offer.</desc>
      ${rows}
      <rect x="${APP.x}" y="${APP.y}" width="${APP.w}" height="${APP.h}" rx="24" fill="${NAVY}"/>
      <text x="${APP.x + APP.w / 2}" y="${APP.y + 44}" text-anchor="middle" style="font-family:${SERIF}" font-size="18" fill="#FFFFFF">One application</text>
      <text x="${APP.x + APP.w / 2}" y="${APP.y + 68}" text-anchor="middle" style="font-family:${SANS}" font-size="11.5" font-weight="500" fill="${BLUE_SOFT}">filled in once</text>
    </svg>`

  return (
    <figure className="lp" style={{ margin: 0 }}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      <figcaption style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.55, color: MUTED, marginTop: 16 }}>
        An example of how it works. The offers you see depend on each lender&rsquo;s review of your application.
      </figcaption>
      <style>{`
        .lp-pulse { opacity: 0; animation: lp-travel 9s linear infinite; }
        .lp-answer, .lp-ring { animation: lp-land 9s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        @keyframes lp-travel {
          0% { stroke-dashoffset: 7; opacity: 0; }
          2% { opacity: 1; }
          15% { stroke-dashoffset: -93; opacity: 1; }
          17%, 100% { stroke-dashoffset: -100; opacity: 0; }
        }
        @keyframes lp-land {
          0%, 14% { opacity: 0; }
          21%, 95% { opacity: 1; }
          100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-pulse { animation: none; opacity: 0; }
          .lp-answer, .lp-ring { animation: none; opacity: 1; }
        }
      `}</style>
    </figure>
  )
}
