"use client"

// ============================================================
// Primary iD specimens: the visual language for the Primary iD's data.
// After the Sonata Health work by Little Plains: every figure is a frosted
// card set inside a soft gradient field, the data itself is the image, labels
// sit in monospace pills, captions in serif italic beneath. Built on the
// Primary iD card: same five dimension colours, same sample scores.
//
// Motion: values draw in when the figure is first shown (`live`), fast in and
// settling without overshoot; nothing moves for prefers-reduced-motion.
// Colours are the Brand OS dimension tokens; type is Georgia + JetBrains Mono.
// ============================================================

import type React from "react"

export type Dim = { name: string; short: string; color: string; score: number }

const MONO = '"JetBrains Mono","Geist Mono",ui-monospace,Menlo,monospace'

/** The soft field a specimen sits on: two or more hues washed together. */
export function Field({ hues, children, tall = false }: { hues: string[]; children: React.ReactNode; tall?: boolean }) {
  const [a, b, c] = [hues[0], hues[1] ?? hues[0], hues[2] ?? hues[1] ?? hues[0]]
  return (
    <div
      className={`spx-field${tall ? " tall" : ""}`}
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, color-mix(in srgb, ${a} 22%, #FEFCF9) 0%, transparent 60%),
          radial-gradient(110% 90% at 100% 100%, color-mix(in srgb, ${b} 22%, #FEFCF9) 0%, transparent 60%),
          radial-gradient(80% 70% at 100% 0%, color-mix(in srgb, ${c} 14%, #FEFCF9) 0%, transparent 70%), #FAF8F5`,
      }}
    >
      <div className="spx-card">{children}</div>
      <style>{SPX_CSS}</style>
    </div>
  )
}

export function Pill({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="spx-pill" style={color ? { ["--pc" as string]: color } : undefined}>{children}</span>
  )
}

/** Half-ring gauge for one dimension's score. */
export function Gauge({ d, live, label = "Sample" }: { d: Dim; live: boolean; label?: string }) {
  const r = 80, cx = 110, cy = 104
  const len = Math.PI * r
  const shown = live ? d.score : 0
  const id = `g-${d.short}`
  return (
    <div className="spx-gauge">
      <Pill color={d.color}>{d.name}</Pill>
      <svg viewBox="0 0 220 124" role="img" aria-label={`${d.name}, sample score ${d.score} out of 100`}>
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FEFCF9" />
            <stop offset="1" stopColor={d.color} />
          </linearGradient>
        </defs>
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="rgba(14,34,64,.07)" strokeWidth="22" strokeLinecap="round" />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke={`url(#${id})`} strokeWidth="22" strokeLinecap="round"
          strokeDasharray={`${(len * shown) / 100} ${len}`}
          className="spx-arc"
        />
      </svg>
      <div className="spx-big">{d.score}<small>/ 100</small></div>
      <div className="spx-chip"><span>{label}</span><b>{d.name}</b><i style={{ background: d.color }} /></div>
    </div>
  )
}

export type Scale = { title: string; pick: string; options: { label: string; score: number }[] }

/** Tick scale, 0–100: where each answer to one question scores, the sample answer marked. */
export function TickScale({ s, color, live }: { s: Scale; color: string; live: boolean }) {
  const pick = s.options.find((o) => o.label === s.pick)!
  const ticks = Array.from({ length: 41 }, (_, i) => i * 2.5)
  const on = (v: number) => live && v <= pick.score
  return (
    <div className="spx-scale">
      <div className="spx-q">{s.title}</div>
      <div className="spx-val"><b>{pick.label}</b><span>scores {pick.score}</span></div>
      <div className="spx-ticks" aria-hidden="true">
        {ticks.map((v) => (
          <span key={v} style={{ left: `${v}%`, background: on(v) ? color : "rgba(14,34,64,.14)", height: Math.abs(v - pick.score) < 1.3 ? 54 : 34 }} />
        ))}
        <em className="spx-marker" style={{ left: `${live ? pick.score : 0}%`, background: color }} />
      </div>
      <div className="spx-axis" aria-hidden="true">
        {s.options.map((o) => (
          <span key={o.label} style={{ left: `${o.score}%` }} className={o.label === s.pick ? "on" : ""}>{o.label}</span>
        ))}
      </div>
      <div className="spx-legend"><span>Less protective</span><span>More protective</span></div>
    </div>
  )
}

/** All five dimensions on one radar, filled with a soft blend of their colours. */
export function Radar({ dims, live }: { dims: Dim[]; live: boolean }) {
  const C = 160, R = 112
  const pt = (i: number, v: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / dims.length
    return [C + Math.cos(a) * R * v, C + Math.sin(a) * R * v]
  }
  const poly = dims.map((d, i) => pt(i, d.score / 100).join(",")).join(" ")
  return (
    <div className="spx-radar">
      <svg viewBox="0 0 320 320" role="img" aria-label={"A sample Primary iD: " + dims.map((d) => `${d.name} ${d.score}`).join(", ")}>
        <defs>
          <filter id="spx-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26" /></filter>
          <clipPath id="spx-clip"><polygon points={poly} /></clipPath>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((k) => <circle key={k} cx={C} cy={C} r={R * k} fill="none" stroke="rgba(14,34,64,.08)" />)}
        {dims.map((_, i) => { const [x, y] = pt(i, 1); return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="rgba(14,34,64,.07)" /> })}
        <g className="spx-grow" style={{ transform: live ? "scale(1)" : "scale(.12)", opacity: live ? 1 : 0 }}>
        <g clipPath="url(#spx-clip)">
          <rect x="0" y="0" width="320" height="320" fill="#FEFCF9" />
          {dims.map((d, i) => { const [x, y] = pt(i, 0.62); return <circle key={d.short} cx={x} cy={y} r="70" fill={d.color} opacity=".85" filter="url(#spx-blur)" /> })}
        </g>
        <polygon points={poly} fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.5" />
        {dims.map((d, i) => { const [x, y] = pt(i, d.score / 100); return <circle key={d.short} cx={x} cy={y} r="5" fill={d.color} stroke="#fff" strokeWidth="2" /> })}
        </g>
      </svg>
      {dims.map((d, i) => {
        const [x, y] = pt(i, 1.32)
        return (
          <span key={d.short} className="spx-pill spx-rlab" style={{ left: `${(x / 320) * 100}%`, top: `${(y / 320) * 100}%`, ["--pc" as string]: d.color }}>
            {d.name}<b>{d.score}</b>
          </span>
        )
      })}
    </div>
  )
}

export function Caption({ children }: { children: React.ReactNode }) {
  return <p className="spx-cap">{children}</p>
}

const SPX_CSS = `
  .spx-field{border-radius:24px;padding:clamp(22px,5vw,56px);border:1px solid rgba(14,34,64,.06);box-shadow:0 30px 70px -50px rgba(14,34,64,.35)}
  .spx-field.tall{padding:clamp(28px,6vw,72px)}
  .spx-card{background:rgba(254,252,249,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.7);border-radius:24px;padding:clamp(20px,3vw,32px);box-shadow:0 1px 0 rgba(255,255,255,.6) inset}
  .spx-pill{display:inline-flex;align-items:center;gap:8px;font-family:${MONO};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#0E2240;
    background:rgba(255,255,255,.85);border:1px solid rgba(14,34,64,.1);border-radius:999px;padding:7px 14px;white-space:nowrap}
  .spx-pill::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--pc,#24A7E0)}
  .spx-gauge{text-align:center}
  .spx-gauge svg{display:block;width:100%;max-width:260px;margin:16px auto 0;overflow:visible}
  .spx-arc{transition:stroke-dasharray 1.1s cubic-bezier(.16,1,.3,1)}
  .spx-big{font-family:${MONO};font-size:clamp(40px,6vw,56px);letter-spacing:.02em;color:#0E2240;margin-top:-38px;line-height:1}
  .spx-big small{font-size:14px;color:#7A8695;margin-left:6px;letter-spacing:.06em}
  .spx-chip{display:inline-flex;align-items:center;gap:12px;margin-top:16px;background:#fff;border-radius:12px;padding:9px 14px;font-size:13px;color:#3a4a66;box-shadow:0 6px 20px -12px rgba(14,34,64,.35)}
  .spx-chip span{font-family:${MONO};font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:#7A8695}
  .spx-chip b{font-weight:500;color:#0E2240}.spx-chip i{width:8px;height:8px;border-radius:50%}
  .spx-scale{position:relative}
  .spx-q{font-family:Georgia,"Times New Roman",serif;font-size:17px;line-height:1.35;color:#0E2240;text-align:center;max-width:30ch;margin:0 auto}
  .spx-val{display:flex;justify-content:center;align-items:baseline;gap:10px;margin:10px 0 18px}
  .spx-val b{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:24px;color:#0E2240}
  .spx-val span{font-family:${MONO};font-size:12px;letter-spacing:.06em;color:#7A8695}
  .spx-ticks{position:relative;height:56px;margin:0 6px}
  .spx-ticks span{position:absolute;bottom:0;width:2px;margin-left:-1px;border-radius:2px;transition:background .5s cubic-bezier(.16,1,.3,1),height .5s cubic-bezier(.16,1,.3,1)}
  .spx-marker{position:absolute;bottom:-4px;width:4px;height:64px;margin-left:-2px;border-radius:3px;transition:left 1.1s cubic-bezier(.16,1,.3,1)}
  .spx-axis{position:relative;height:34px;margin:10px 6px 0}
  .spx-axis span{position:absolute;top:0;transform:translateX(-50%);font-family:${MONO};font-size:10.5px;letter-spacing:.04em;color:#7A8695;white-space:nowrap}
  .spx-axis span.on{color:#0E2240;font-weight:600}
  .spx-legend{display:flex;justify-content:space-between;font-family:${MONO};font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:#9aa3b0;margin:4px 6px 0}
  .spx-radar{position:relative;max-width:440px;margin:0 auto;padding:34px 46px}
  .spx-radar svg{display:block;width:100%;overflow:visible}
  .spx-grow{transform-origin:160px 160px;transform-box:view-box;transition:transform 1.2s cubic-bezier(.16,1,.3,1),opacity .6s ease}
  .spx-rlab{position:absolute;transform:translate(-50%,-50%);font-size:10px;padding:6px 11px}
  .spx-rlab b{font-weight:600;margin-left:2px;color:#3a4a66}
  .spx-cap{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-size:16px;line-height:1.5;color:#3a4a66;margin:14px 2px 0}
  @media(max-width:560px){.spx-rlab{font-size:8.5px;padding:5px 8px;letter-spacing:.06em}.spx-radar{padding:30px 34px}.spx-axis span{font-size:9px}}
  @media(prefers-reduced-motion:reduce){.spx-arc,.spx-grow,.spx-marker,.spx-ticks span{transition:none!important}}
`
