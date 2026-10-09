// ============================================================
// PRIMARY iD: the sample card
// The same card the /membership/ page shows in its hero (public/membership.html,
// .idcard): one composite, five dimension rows, the clearest lever. Ported here so
// the home page and the membership page show one Primary iD, not two.
// Keep the values in step with membership.html.
// ============================================================

const DIMS = [
  { name: "Oral health", score: 72, color: "#D4B584" },
  { name: "Sleep & airway", score: 68, color: "#7B68EE" },
  { name: "Nutrition", score: 81, color: "#48C28C" },
  { name: "Family history", score: 75, color: "#E8985E" },
  { name: "Longevity", score: 64, color: "#D97757" },
]

export function PrimaryIdCard({ className = "" }: { className?: string }) {
  return (
    <div className={`pidc ${className}`} aria-label="A sample Primary iD">
      <style>{`
        .pidc{width:min(352px,100%);background:#FEFCF9;border:1px solid rgba(14,34,64,.12);border-radius:24px;padding:30px;
          box-shadow:0 30px 70px rgba(14,34,64,.22),0 20px 60px -30px rgba(36,167,224,.45);color:#0E2240;text-align:left}
        .pidc .top{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:18px}
        .pidc .lab{font-family:Georgia,"Times New Roman",serif;font-size:18px;color:#0E2240;font-weight:500}
        .pidc .lab em{color:#24A7E0;font-style:italic}
        .pidc .smp{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:#7A8695;font-weight:600}
        .pidc .comp{display:flex;align-items:baseline;gap:8px}
        .pidc .comp .n{font-family:Georgia,"Times New Roman",serif;font-size:74px;line-height:.85;color:#0E2240;letter-spacing:-.02em;font-variant-numeric:lining-nums}
        .pidc .comp .o{font-family:Georgia,"Times New Roman",serif;font-size:22px;color:#7A8695;font-style:italic}
        .pidc .cap{font-size:12.5px;color:#7A8695;margin:6px 0 20px}
        .pidc .row{display:grid;grid-template-columns:1fr auto;gap:6px 12px;align-items:center;padding:11px 0;border-top:1px solid rgba(14,34,64,.12)}
        .pidc .rn{font-family:Georgia,"Times New Roman",serif;font-size:14.5px;color:#0E2240;display:flex;align-items:center;gap:9px}
        .pidc .rn::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--dc)}
        .pidc .rs{font-family:Georgia,"Times New Roman",serif;font-size:15px;color:#0E2240;font-variant-numeric:lining-nums tabular-nums}
        .pidc .bar{grid-column:1 / -1;height:5px;background:rgba(14,34,64,.12);border-radius:8px;overflow:hidden}
        .pidc .fill{display:block;height:100%;border-radius:8px;background:var(--dc)}
        .pidc .lever{margin-top:18px;padding-top:16px;border-top:1px solid rgba(14,34,64,.12);font-size:12.5px;color:#3a4a66;line-height:1.55}
        .pidc .lever b{color:#0E2240}
        .pidc .disc{margin-top:10px;font-size:10.5px;color:#7A8695;line-height:1.45}
      `}</style>
      <div className="top"><span className="lab">Primary <em>iD</em></span><span className="smp">Sample</span></div>
      <div className="comp"><span className="n">72</span><span className="o">/ 100</span></div>
      <div className="cap">Five dimensions. One score.</div>
      {DIMS.map((d) => (
        <div key={d.name} className="row" style={{ ["--dc" as string]: d.color }}>
          <span className="rn">{d.name}</span>
          <span className="rs">{d.score}</span>
          <span className="bar"><span className="fill" style={{ width: `${d.score}%` }} /></span>
        </div>
      ))}
      <div className="lever"><b>Your clearest lever: Longevity, 64.</b> This is where a first visit moves your number the most.</div>
      <div className="disc">Directional. Not a diagnosis, and not a measure of biological age.</div>
    </div>
  )
}
