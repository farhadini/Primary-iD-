"use client"

// ── /clear-aligners/ section 9: Primary iD, powered by OrthoFX ──
// From "Aligner comparison module.html" (Oct 2026). Five rows and a price;
// each row opens a drawer with what sits behind it.
//   - Primary cells: a process we perform or a fee we post.
//   - Right-hand cells: "varies", a plain no, or another system's own
//     published instruction, never a Primary claim about them.
// Items the module marks as on hold (the OrthoFX wear-time line, whitening
// with treatment, the shorter-case fee) render only in preview builds
// (`review`), chipped, so the team can see them; the live site leaves them out.
// The member mark is option A from the module (the pill), its recommendation.
// The module's internal notes and mark picker are not part of the page.

import { useState } from "react"

type Item = string | { t: string; hold: string }
type Row = {
  lab: string
  us: { i: Mark; t: string }
  them: { i: Mark; t: string }
  more: { us: Item[]; them: Item[] }
}
type Mark = "yes" | "no" | "var"

const ROWS: Row[] = [
  {
    lab: "The aligner",
    us: { i: "yes", t: "<b>AirFlex from OrthoFX</b>, or another system, matched to your case" },
    them: { i: "var", t: "Usually whichever single brand the practice carries" },
    more: {
      us: [
        "AirFlex, FXClear or a shorter package, chosen by a prosthodontist for the case in front of him. A bite that needs braces is sent to braces.",
        "OrthoFX&rsquo;s description, in their words: a patented HyperElastic&trade; polymer with a highly adaptable inner surface, designed to conform precisely to the tooth.",
        { t: "OrthoFX states AirFlex is the first FDA-cleared aligner system for at least 12 hours of continuous daily wear time.<sup>*</sup>", hold: "Holds until written" },
        "Remote monitoring and rescue aligners between visits, inside the fee.",
      ],
      them: ["One system, whatever the case", "20 to 22 hours a day, which is what most brands instruct", "Monitoring, where it exists, is often an extra"],
    },
  },
  {
    lab: "Who plans it",
    us: { i: "yes", t: "<b>Dr. Tzur Gabi, prosthodontist</b>, from a 3D scan and an intraoral scan" },
    them: { i: "var", t: "A dentist or an orthodontist, usually from an intraoral scan alone" },
    more: {
      us: [
        "Gums staged against the published criteria before anything moves.",
        "The bite recorded, and decay treated first.",
        "If your teeth should not be moving, we say so and we say why. Straighten first, restore less.",
      ],
      them: ["Varies by practice", "A 3D scan is not usually taken"],
    },
  },
  {
    lab: "What else we look at",
    us: { i: "yes", t: "Your jaws, sinuses and airway in the same capture, and your <b>Primary iD</b>" },
    them: { i: "no", t: "Your teeth, and the form you filled in" },
    more: {
      us: [
        "One 3D capture shows the jaws, the sinuses and the airway. If something is worth asking about, we ask.",
        "Your Primary iD scores five dimensions and is re-scored every year, so the case sits inside a record rather than beside one.",
        "Nothing here is a diagnosis of a sleep condition, and aligners are not offered as a treatment for one.",
      ],
      them: ["No imaging beyond the scan the aligners are made from", "No record of you between visits"],
    },
  },
  {
    lab: "What the fee includes",
    us: { i: "yes", t: "Everything through your first retainers, and a year of retention checks" },
    them: { i: "var", t: "Varies. Retainers are usually extra" },
    more: {
      us: [
        "Records, the plan, every aligner, attachments, check-in visits, monitoring, rescue aligners, your first retainers.",
        "A year of retention checks after the case finishes.",
        { t: "Whitening at the shade check once your case is done, included with membership.", hold: "C67, not live" },
      ],
      them: ["Refinements and retainers are commonly charged at the end", "Retention is usually a separate conversation"],
    },
  },
  {
    lab: "After the case ends",
    us: { i: "yes", t: "A scan compared against your finish at every preventive visit" },
    them: { i: "no", t: "You come back if you notice something has moved" },
    more: {
      us: [
        "Movement gets caught while it is small, which is the whole reason retention exists.",
        "The same practice looks after the rest of your mouth, at the interval your Primary iD sets.",
        "Replacement retainers at the member price.",
      ],
      them: ["Straightening and general care usually sit in two different practices"],
    },
  },
]

const PACKS: { n: string; v: string; m: string; hold?: string }[] = [
  { n: "Full case &middot; D8090", v: "$6,500", m: "$5,850" },
  { n: "Shorter case", v: "$4,500", m: "$4,050", hold: "Fee to post" },
]
const PACKNOTE =
  "One posted fee for each package, the same for everyone. Primary iD membership is $499 a year and takes 10% off orthodontics; member pricing applies while the membership is active and is for active members only."
const FOOT_WEAR =
  "<sup>*</sup><b>OrthoFX&rsquo;s footnote, in their words:</b> FDA-Cleared for at least 12 hours of continuous wear. Your protocol is set by your treating clinician. &nbsp;&middot;&nbsp; "
const FOOT =
  "Wear times in the right-hand column are the published daily wear instructions of other aligner systems, not a claim by Primary. Clear aligner treatment is not suitable for every case and candidacy is decided at an examination. Dr. Tzur Gabi is a prosthodontist. The Primary iD is directional: it is not a diagnosis and not a measure of biological age. Primary iD membership is a membership, not dental insurance, and does not pay for treatment; member rates come off fees the practice actually and regularly charges."

// The brand logo's six dots, at badge size (from the module: "the member mark").
const DOTS = [
  { x: 1.66, y: 3.76, r: 1.9, k: "d1" }, { x: 4.64, y: 8.17, r: 1.52, k: "d2" }, { x: 9.34, y: 10.67, r: 1.25, k: "d3" },
  { x: 14.66, y: 10.67, r: 1.25, k: "d3" }, { x: 19.36, y: 8.17, r: 1.52, k: "d2" }, { x: 22.34, y: 3.76, r: 1.9, k: "d1" },
]
function MemberMark() {
  return (
    <span className="mk">
      <svg viewBox="0 0 24 13" aria-hidden="true">
        {DOTS.map((d, i) => <circle key={i} className={d.k} cx={d.x} cy={d.y} r={d.r} />)}
      </svg>
      <span className="lbl">Member</span>
    </span>
  )
}

function Icon({ i }: { i: Mark }) {
  return i === "yes" ? <span className="ic yes">&#10003;</span>
    : i === "no" ? <span className="ic no">&#10005;</span>
    : <span className="ic var">&ndash;</span>
}

export function AlignerComparison({ review = false }: { review?: boolean }) {
  const [open, setOpen] = useState<boolean[]>(ROWS.map(() => false))
  const all = open.every(Boolean)
  const toggle = (i: number) => setOpen((o) => o.map((v, k) => (k === i ? !v : v)))
  const keep = (x: Item) => typeof x === "string" || review
  const item = (x: Item, k: number) =>
    typeof x === "string"
      ? <li key={k} dangerouslySetInnerHTML={{ __html: x }} />
      : <li key={k}><span dangerouslySetInnerHTML={{ __html: x.t }} /><span className="hold">{x.hold}</span></li>
  const packs = PACKS.filter((p) => !p.hold || review)
  const wearShown = review // the starred wear line only renders in review

  return (
    <div className="cmp">
      <style>{CSS}</style>
      <div className="top">
        <button type="button" className="allbtn" aria-expanded={all} onClick={() => setOpen(ROWS.map(() => !all))}>
          {all ? "Close them again" : "Go deeper on all five"}
        </button>
      </div>

      <div className="chart">
        <div className="r hd" aria-hidden="true">
          <div className="c" />
          <div className="c us"><div className="cn">Primary iD<span className="by">Powered by OrthoFX</span></div></div>
          <div className="c"><div className="cm">The usual clear aligner experience</div></div>
        </div>

        {ROWS.map((r, i) => (
          <div key={r.lab}>
            <div
              className={`r sum${open[i] ? " open" : ""}`}
              role="button" tabIndex={0} aria-expanded={open[i]}
              onClick={() => toggle(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i) } }}
            >
              <div className="c lb"><div className="lab"><span className="chev" aria-hidden="true">&#9656;</span>{r.lab}</div><div className="go">Go deeper</div></div>
              <div className="c us"><div className="v"><Icon i={r.us.i} /><span className="t" dangerouslySetInnerHTML={{ __html: r.us.t }} /></div></div>
              <div className="c them"><div className="v them"><Icon i={r.them.i} /><span className="t">{r.them.t}</span></div></div>
            </div>
            {open[i] && (
              <div className="drw"><div className="drwin">
                <div />
                <div className="dus"><div className="dl">What that means here</div><ul className="dul">{r.more.us.filter(keep).map(item)}</ul></div>
                <div className="dthem"><div className="dl">Elsewhere</div><ul className="dul them">{r.more.them.filter(keep).map(item)}</ul></div>
              </div></div>
            )}
          </div>
        ))}

        <div className="r fee">
          <div className="c lb"><div className="lab">The price you are given</div></div>
          <div className="c us">
            <div className="pk">
              {packs.map((p) => (
                <div key={p.n}>
                  <div className="pkn"><span dangerouslySetInnerHTML={{ __html: p.n }} />{p.hold && <span className="hold">{p.hold}</span>}</div>
                  <div className="pkmain"><span className="pkv">{p.v}</span><span className="memline"><MemberMark /><span className="amt">{p.m}</span></span></div>
                </div>
              ))}
            </div>
            <div className="pknote">{PACKNOTE}</div>
          </div>
          <div className="c them"><div className="v them"><Icon i="var" /><span className="t">A range, narrowed at the consultation</span></div></div>
        </div>
      </div>

      <p className="foot" dangerouslySetInnerHTML={{ __html: (wearShown ? FOOT_WEAR : "") + FOOT }} />
    </div>
  )
}

const CSS = `
.cmp{--navy:#0E2240;--blue:#24A7E0;--blue-soft:#5BC0EC;--warm:#FEFCF9;--ink-soft:#3a4a66;--muted:#7A8695;
  --line:rgba(14,34,64,.12);--line-soft:rgba(14,34,64,.06);font-family:var(--sans);margin-top:8px}
.cmp .top{display:flex;justify-content:flex-end;margin-top:6px}
.cmp .allbtn{font-family:var(--sans);font-size:12px;font-weight:600;border:1px solid var(--line);background:var(--warm);color:var(--ink-soft);
  padding:0 16px;min-height:40px;border-radius:999px;cursor:pointer}
.cmp .allbtn:hover{border-color:var(--navy)}
.cmp .chart{margin-top:14px;border:1px solid var(--line);border-radius:24px;overflow:hidden;background:var(--warm)}
.cmp .r{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.18fr) minmax(0,.95fr);align-items:stretch}
.cmp .c{padding:16px 20px;min-width:0;border-top:1px solid var(--line-soft)}
.cmp .c.us{background:rgba(36,167,224,.055);border-left:1px solid rgba(36,167,224,.22);border-right:1px solid rgba(36,167,224,.22)}
.cmp .r.hd .c{border-top:none;padding:24px 20px 20px;background:transparent}
.cmp .r.hd .c.us{background:rgba(36,167,224,.1);border-top:3px solid var(--blue);padding-top:21px}
.cmp .cn{font-size:clamp(16px,1.5vw,20px);font-weight:700;color:var(--navy);letter-spacing:-.018em;line-height:1.18}
.cmp .cn .by{display:block;font-size:10.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--blue);margin-top:6px}
.cmp .cm{font-size:clamp(14px,1.2vw,16px);font-weight:600;color:var(--muted);letter-spacing:-.01em;line-height:1.25}
.cmp .r.sum{cursor:pointer}
.cmp .r.sum:hover .c{background:rgba(14,34,64,.022)}
.cmp .r.sum:hover .c.us{background:rgba(36,167,224,.09)}
.cmp .r.sum:focus-visible{outline:2px solid var(--blue);outline-offset:-2px}
.cmp .lab{font-size:14.5px;font-weight:600;color:var(--navy);line-height:1.32;letter-spacing:-.006em;display:flex;align-items:baseline;gap:9px}
.cmp .chev{font-family:var(--mono,ui-monospace),monospace;font-size:11px;color:var(--muted);flex:none;transition:transform .18s ease}
.cmp .go{font-size:11px;font-weight:600;color:var(--blue);margin-top:6px;margin-left:20px;opacity:0;transition:opacity .16s}
.cmp .r.sum:hover .go,.cmp .r.sum:focus-visible .go{opacity:1}
.cmp .r.open .go{opacity:1;color:var(--muted)}
.cmp .r.open .go::after{content:" \\2014 close"}
.cmp .r.open .chev{transform:rotate(90deg)}
.cmp .v{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start}
.cmp .v .t{font-size:14px;font-weight:600;color:var(--navy);line-height:1.4;letter-spacing:-.004em}
.cmp .v .t b{color:var(--blue);font-weight:600}
.cmp .v.them .t{font-size:13.2px;font-weight:400;color:var(--muted);line-height:1.42}
.cmp .ic{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;margin-top:1px;flex:none;font-size:10.5px;font-weight:700;line-height:1}
.cmp .ic.yes{background:var(--navy);color:#fff}
.cmp .ic.no{background:rgba(14,34,64,.07);color:#aab3bd}
.cmp .ic.var{background:rgba(14,34,64,.07);color:#8d97a3;font-size:12px}
.cmp .drw{border-top:1px solid var(--line-soft);background:rgba(14,34,64,.022)}
.cmp .drwin{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.18fr) minmax(0,.95fr)}
.cmp .drwin>div{padding:4px 20px 20px}
.cmp .drwin .dus{background:rgba(36,167,224,.04);border-left:1px solid rgba(36,167,224,.22);border-right:1px solid rgba(36,167,224,.22);padding-top:16px}
.cmp .drwin .dthem{padding-top:16px}
.cmp .dl{font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.cmp .dul{list-style:none;padding:0;margin:0;display:grid;gap:9px}
.cmp .dul li{font-size:13.2px;line-height:1.5;color:var(--ink-soft);padding-left:15px;position:relative}
.cmp .dul li::before{content:'';position:absolute;left:0;top:.56em;width:5px;height:5px;border-radius:50%;background:var(--blue)}
.cmp .dul.them li{color:var(--muted)}
.cmp .dul.them li::before{background:#c4ccd4}
.cmp .dul li sup{font-size:9px}
.cmp .hold{display:inline-block;font-size:8.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(232,152,94,.22);
  color:#a15f22;padding:2px 7px;border-radius:999px;margin-left:6px;vertical-align:1px}
.cmp .r.fee .c{background:var(--navy);border-top:1px solid rgba(255,255,255,.1)}
.cmp .r.fee .c.us{background:#132b4f;border-left-color:rgba(36,167,224,.4);border-right-color:rgba(36,167,224,.4)}
.cmp .r.fee .lab{color:#fff}
.cmp .r.fee .v.them .t{color:rgba(255,255,255,.6)}
.cmp .r.fee .ic.var{background:rgba(255,255,255,.12);color:rgba(255,255,255,.5)}
.cmp .pk{display:grid;gap:18px}
.cmp .pkn{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.58);line-height:1.35;margin-bottom:7px}
.cmp .pkmain{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap}
.cmp .pkv{font-family:var(--serif);font-size:28px;color:#fff;letter-spacing:-.022em;font-variant-numeric:lining-nums tabular-nums;line-height:1}
.cmp .pknote{font-size:11px;color:rgba(255,255,255,.55);line-height:1.5;margin-top:14px}
.cmp .memline{display:inline-flex;align-items:center;gap:8px}
.cmp .memline .amt{font-family:var(--serif);font-size:20px;color:var(--blue-soft);letter-spacing:-.018em;font-variant-numeric:lining-nums tabular-nums}
.cmp .mk{display:inline-flex;align-items:center;gap:7px;background:rgba(91,192,236,.16);border:1px solid rgba(91,192,236,.42);padding:3px 10px 4px;border-radius:999px}
.cmp .mk svg{display:block;width:17px;overflow:visible}
.cmp .mk .d1{fill:#8fd3f2}.cmp .mk .d2{fill:var(--blue)}.cmp .mk .d3{fill:#fff}
.cmp .mk .lbl{font-size:9.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--blue-soft)}
.cmp .foot{font-size:11.5px;color:var(--muted);line-height:1.6;margin:18px 0 0;max-width:92ch}
.cmp .foot b{color:var(--ink-soft);font-weight:600}
@media(max-width:900px){
  .cmp .r,.cmp .drwin{grid-template-columns:1fr}
  .cmp .r.hd{display:none}
  .cmp .c{padding:12px 17px;border-top:none}
  .cmp .c.us{border-left:3px solid var(--blue);border-right:none}
  .cmp .c.lb{border-top:1px solid var(--line);padding-top:15px}
  .cmp .c.us::before{content:'Primary iD';display:block;font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);margin-bottom:6px}
  .cmp .c.them::before{content:'The usual way';display:block;font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
  .cmp .r.fee .c.them::before{color:rgba(255,255,255,.5)}
  .cmp .drwin .dus{border-left:3px solid var(--blue);border-right:none}
  .cmp .drwin>div:first-child{display:none}
  .cmp .go{opacity:1}
}
@media(prefers-reduced-motion:reduce){.cmp *{transition:none!important}}
`
