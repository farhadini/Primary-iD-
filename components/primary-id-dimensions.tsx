// ============================================================
// PRIMARY iD: the five dimensions, as cards
// The card face from /membership/ ("Meet your Primary iD", public/membership.html
// .kard .fa): number and name, a sample ring, one headline, one line, and the
// door into the booking flow for that dimension. Laid out as a row here rather
// than the membership page's swipeable deck. Copy and links match membership.html.
// ============================================================

const DIMS = [
  { n: "01", name: "Oral health", color: "#D4B584", score: 72, title: "Where it all starts.",
    line: "Decay, gums, and what your mouth is carrying day to day.", href: "/book/preventive/?dim=oral" },
  { n: "02", name: "Sleep & airway", color: "#7B68EE", score: 68, title: "How you breathe, how you heal.",
    line: "The first signs of a narrowing airway often show up in your mouth.", href: "/book/airway/?dim=sleep" },
  { n: "03", name: "Nutrition", color: "#48C28C", score: 81, title: "Your diet hits your gums first.",
    line: "Long before it ever reaches your gut.", href: "/book/longevity/?dim=nutrition" },
  { n: "04", name: "Family history", color: "#E8985E", score: 75, title: "The part you didn't choose.",
    line: "Inherited risk, graded the way gum specialists grade it.", href: "/book/longevity/?dim=genetics" },
  { n: "05", name: "Longevity", color: "#D97757", score: 64, title: "The habits that compound.",
    line: "What actually decides how strong your next decades feel.", href: "/book/longevity/?dim=longevity" },
]

const C = 2 * Math.PI * 42 // ring circumference

export default function PrimaryIdDimensions() {
  return (
    <section className="pidd" aria-labelledby="pidd-h">
      <style>{`
        .pidd{background:#FAF8F5;padding:104px 24px;border-top:1px solid rgba(14,34,64,.06)}
        .pidd .in{max-width:1180px;margin:0 auto}
        .pidd .eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#24A7E0}
        .pidd .eyebrow::before{content:"";width:26px;height:1px;background:#24A7E0}
        .pidd h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:clamp(32px,4.2vw,52px);line-height:1.08;letter-spacing:-.02em;color:#0E2240;margin:18px 0 14px;max-width:18ch}
        .pidd h2 em{color:#24A7E0;font-style:italic}
        .pidd .lede{font-family:Georgia,"Times New Roman",serif;font-size:18px;line-height:1.62;color:#3a4a66;max-width:60ch;margin:0}
        .pidd .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-top:48px}
        .pidd .card{background:#FEFCF9;border:1px solid rgba(14,34,64,.12);border-radius:24px;padding:26px 22px;display:flex;flex-direction:column;
          box-shadow:0 26px 60px -40px rgba(14,34,64,.45);transition:transform .25s ease,box-shadow .25s ease;text-decoration:none;color:inherit}
        .pidd .card:hover{transform:translateY(-4px);box-shadow:0 30px 60px -30px rgba(14,34,64,.4)}
        .pidd .dime{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--dc)}
        .pidd svg{display:block;margin:18px auto 0}
        .pidd .trk{fill:none;stroke:rgba(14,34,64,.08);stroke-width:9}
        .pidd .fl{fill:none;stroke:var(--dc);stroke-width:9;stroke-linecap:round;transform:rotate(-90deg);transform-origin:64px 64px}
        .pidd .rn{font-family:Georgia,"Times New Roman",serif;font-size:30px;fill:#0E2240;text-anchor:middle}
        .pidd .ro{font-family:Georgia,"Times New Roman",serif;font-size:11px;font-style:italic;fill:#7A8695;text-anchor:middle}
        .pidd .ksample{display:block;width:max-content;margin:10px auto 0;font-size:9px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:#7A8695;background:rgba(14,34,64,.05);padding:5px 12px;border-radius:999px}
        .pidd h3{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:20px;line-height:1.25;color:#0E2240;margin:20px 0 8px}
        .pidd .ev{font-size:14px;line-height:1.55;color:#3a4a66;margin:0;flex:1}
        .pidd .go{margin-top:18px;font-size:13.5px;font-weight:600;color:#0E2240}
        .pidd .card:hover .go{color:#24A7E0}
        .pidd .foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;margin-top:32px}
        .pidd .disc{font-size:12.5px;color:#7A8695;margin:0}
        .pidd .more{font-size:14px;font-weight:600;color:#0E2240;text-decoration:none;border-bottom:1px solid rgba(14,34,64,.25);padding-bottom:2px}
        .pidd .more:hover{color:#24A7E0;border-color:#24A7E0}
        @media(max-width:1100px){.pidd .grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:760px){.pidd{padding:72px 16px}.pidd .grid{grid-template-columns:1fr 1fr;gap:12px}.pidd .card{padding:22px 16px}}
        @media(max-width:480px){.pidd .grid{grid-template-columns:1fr}}
      `}</style>
      <div className="in">
        <span className="eyebrow">Your Primary iD</span>
        <h2 id="pidd-h">Five dimensions. <em>One read of you.</em></h2>
        <p className="lede">
          Forty questions, about six minutes, before you ever sit in a chair. Dr. Gabi reads your answers against what he sees, so your first visit starts with what matters to you.
        </p>
        <div className="grid">
          {DIMS.map((d) => (
            <a key={d.n} className="card" href={d.href} style={{ ["--dc" as string]: d.color }} aria-label={`${d.name}: get your score`}>
              <span className="dime">{d.n} / {d.name}</span>
              <svg width="128" height="128" viewBox="0 0 128 128" aria-hidden="true">
                <circle className="trk" cx="64" cy="64" r="42" />
                <circle className="fl" cx="64" cy="64" r="42" strokeDasharray={`${((C * d.score) / 100).toFixed(1)} ${C.toFixed(1)}`} />
                <text className="rn" x="64" y="70">{d.score}</text>
                <text className="ro" x="64" y="86">/ 100</text>
              </svg>
              <span className="ksample">Sample score</span>
              <h3>{d.title}</h3>
              <p className="ev">{d.line}</p>
              <span className="go">Get your score →</span>
            </a>
          ))}
        </div>
        <div className="foot">
          <p className="disc">Your Primary iD is directional. It is not a diagnosis, and it is not a measure of biological age.</p>
          <a className="more" href="/five-dimensions/">How the five dimensions work</a>
        </div>
      </div>
    </section>
  )
}
