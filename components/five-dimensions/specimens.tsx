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
import { useEffect, useRef, useState } from "react"

/** True once the element has come on screen. A throttled scroll reader, like the chapter rail. */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (on) return
    let t: ReturnType<typeof setTimeout> | null = null
    const check = () => {
      t = null
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect(), h = window.innerHeight
      if (r.top < h * 0.82 && r.bottom > h * 0.12) setOn(true)
    }
    const onScroll = () => { if (!t) t = setTimeout(check, 80) }
    check()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (t) clearTimeout(t) }
  }, [on])
  return [ref, on] as const
}

/** Continuous motion is on unless the reader asked for less. */
function useMotion() {
  const [ok, setOk] = useState(false)
  useEffect(() => { setOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) }, [])
  return ok
}

/** A number that counts up once, fast in and settling. */
export function CountUp({ to, live }: { to: number; live: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!live) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return }
    const t0 = Date.now()
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      const k = Math.min(1, (Date.now() - t0) / 1400)
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))))
      if (k < 1) t = setTimeout(tick, 24)
    }
    tick()
    return () => clearTimeout(t)
  }, [live, to])
  return <>{n}</>
}

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
    <div className="spx-radar"><div className="spx-rin">
      <svg viewBox="0 0 320 320" role="img" aria-label={"A sample Primary iD: " + dims.map((d) => `${d.name} ${d.score}`).join(", ")}>
        <defs>
          <filter id="spx-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26" /></filter>
          <clipPath id="spx-clip"><polygon points={poly} /></clipPath>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((k) => <circle key={k} cx={C} cy={C} r={R * k} fill="none" stroke="rgba(14,34,64,.08)" />)}
        {dims.map((_, i) => { const [x, y] = pt(i, 1); return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="rgba(14,34,64,.07)" /> })}
        <g className="spx-grow" style={{ transform: live ? "scale(1)" : "scale(.12)", opacity: live ? 1 : 0 }}>
        <g className={live ? "spx-breathe" : undefined}>
        <g clipPath="url(#spx-clip)">
          <rect x="0" y="0" width="320" height="320" fill="#FEFCF9" />
          <g className={live ? "spx-swirl" : undefined}>
            {dims.map((d, i) => { const [x, y] = pt(i, 0.62); return <circle key={d.short} cx={x} cy={y} r="70" fill={d.color} opacity=".85" filter="url(#spx-blur)" /> })}
          </g>
        </g>
        <polygon points={poly} fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.5" />
        {dims.map((d, i) => {
          const [x, y] = pt(i, d.score / 100)
          return (
            <g key={d.short}>
              {live && <circle cx={x} cy={y} r="5" fill="none" stroke={d.color} strokeWidth="1.5" className="spx-ring" style={{ animationDelay: `${1.2 + i * 0.7}s` }} />}
              <circle cx={x} cy={y} r="5" fill={d.color} stroke="#fff" strokeWidth="2" />
            </g>
          )
        })}
        </g>
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
    </div></div>
  )
}


export type Answer = { short: string; label: string; score: number; lever: boolean }

/** One dimension's score as its eight answers: each row is one question, the weakest marked as the lever. */
export function Breakdown({ d, answers, live }: { d: Dim; answers: Answer[]; live: boolean }) {
  return (
    <div className="spx-bd">
      <div className="spx-bdh"><span>Eight answers</span><b>{d.score}<small> avg</small></b></div>
      {answers.map((a, i) => (
        <div key={a.short} className={`spx-bdr${a.lever ? " lever" : ""}`} style={{ ["--dc" as string]: d.color }}>
          <span className="n">{a.short}</span>
          <span className="v">{a.score}</span>
          <span className="b"><span className="f" style={{ width: live ? `${a.score}%` : "0%", transitionDelay: `${i * 60}ms` }} /></span>
          {a.lever && <span className="tagl">Your lever here · {a.label}</span>}
        </div>
      ))}
    </div>
  )
}

/** Five places we look, two things we look for. */
export function RootMap({ dims, links, live }: { dims: Dim[]; links: Record<string, ("inflammation" | "toxic")[]>; live: boolean }) {
  const H = 300, rowY = (i: number) => 30 + i * 60
  const sig = { inflammation: 96, toxic: 214 } as const
  const motion = useMotion()
  const flow = live && motion
  const path = (i: number, k: "inflammation" | "toxic") => `M 178 ${rowY(i)} C 300 ${rowY(i)}, 300 ${sig[k]}, 372 ${sig[k]}`
  return (
    <div className="spx-map">
      <svg viewBox="0 0 520 300" role="img" aria-label="The five dimensions, each linked to inflammation, toxic load or both">
        <defs>
          <filter id="spx-soft" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="8" /></filter>
          {dims.map((d) => (
            <linearGradient key={d.short} id={`lk-${d.short}`} x1="0" x2="1">
              <stop offset="0" stopColor={d.color} stopOpacity=".9" /><stop offset="1" stopColor={d.color} stopOpacity=".25" />
            </linearGradient>
          ))}
        </defs>
        {dims.map((d, i) => (links[d.short] || []).map((k) => (
          <path key={d.short + k} d={path(i, k)} fill="none"
            stroke={`url(#lk-${d.short})`} strokeWidth="2.4" strokeLinecap="round" className="spx-link" style={{ strokeDashoffset: live ? 0 : 320, transitionDelay: `${i * 90}ms` }} />
        )))}
        {flow && dims.map((d, i) => (links[d.short] || []).map((k, j) => [0, 1].map((n) => {
          const dur = `${3.4 + ((i + j) % 3) * 0.5}s`, begin = `${1.3 + i * 0.45 + j * 0.8 + n * 1.9}s`
          return (
            <circle key={d.short + k + n} r="3.2" fill={d.color} opacity="0">
              <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path(i, k)} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines=".45 0 .25 1" />
              <animate attributeName="opacity" dur={dur} begin={begin} repeatCount="indefinite" values="0;1;1;0" keyTimes="0;.12;.85;1" />
            </circle>
          )
        })))}
        {dims.map((d, i) => <circle key={d.short} cx="178" cy={rowY(i)} r="4.5" fill={d.color} />)}
        {flow && <>
          <circle cx="372" cy={sig.inflammation} r="22" fill="#D97757" className="spx-ember" filter="url(#spx-soft)" />
          <circle cx="372" cy={sig.inflammation} r="6" fill="none" stroke="#D97757" strokeWidth="1.5" className="spx-ring" />
          <circle cx="372" cy={sig.inflammation} r="6" fill="none" stroke="#D97757" strokeWidth="1.5" className="spx-ring" style={{ animationDelay: "1.6s" }} />
          <circle cx="372" cy={sig.toxic} r="6" fill="none" stroke="#7A8695" strokeWidth="1.5" className="spx-ring slow" style={{ animationDelay: ".8s" }} />
        </>}
        <circle cx="372" cy={sig.inflammation} r="6" fill="#D97757" /><circle cx="372" cy={sig.toxic} r="6" fill="#7A8695" />
      </svg>
      {dims.map((d, i) => (
        <span key={d.short} className="spx-pill spx-mlab" style={{ top: `${(rowY(i) / H) * 100}%`, ["--pc" as string]: d.color }}>{d.name}</span>
      ))}
      <span className="spx-sig" style={{ top: `${(sig.inflammation / H) * 100}%` }}><b>Inflammation</b>quiet, and it does not switch off</span>
      <span className="spx-sig" style={{ top: `${(sig.toxic / H) * 100}%` }}><b>Toxic load</b>what you are exposed to, and carry</span>
    </div>
  )
}

/** Illustration: biological age is one reading of today; the Primary iD reads the direction, and where it can change. */
export function Trajectory({ live }: { live: boolean }) {
  const motion = useMotion()
  const built = "M 30 222 C 150 219, 250 200, 360 152"
  const ahead = "M 360 152 C 450 116, 530 86, 610 46"
  const lever = "M 360 152 C 440 128, 520 124, 610 122"
  const draw = (delay: number, dur = 1.3) => ({ strokeDasharray: 1, strokeDashoffset: live ? 0 : 1, transition: `stroke-dashoffset ${dur}s cubic-bezier(.16,1,.3,1) ${delay}s` })
  return (
    <div className="spx-traj">
      <div className="spx-tin">
        <svg viewBox="0 0 640 270" role="img" aria-label="Illustration. A biological age is a single reading of today. The Primary iD follows the line of what has been building, shows where it is heading, and the lever that would change its direction.">
          <defs>
            <linearGradient id="tj-built" x1="0" x2="1"><stop offset="0" stopColor="#D4B584" /><stop offset="1" stopColor="#D97757" /></linearGradient>
            <linearGradient id="tj-under" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#D97757" stopOpacity=".18" /><stop offset="1" stopColor="#D97757" stopOpacity="0" /></linearGradient>
            <filter id="tj-soft" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7" /></filter>
          </defs>
          {[60, 110, 160, 210].map((y) => <line key={y} x1="30" x2="610" y1={y} y2={y} stroke="rgba(14,34,64,.05)" />)}
          <line x1="30" x2="610" y1="242" y2="242" stroke="rgba(14,34,64,.14)" />
          <line x1="360" x2="360" y1="30" y2="242" stroke="rgba(14,34,64,.12)" strokeDasharray="3 5" />
          <path d={`${built} L 360 242 L 30 242 Z`} fill="url(#tj-under)" style={{ opacity: live ? 1 : 0, transition: "opacity 1s ease .9s" }} />
          <path d={built} pathLength={1} fill="none" stroke="url(#tj-built)" strokeWidth="3.5" strokeLinecap="round" style={draw(0.1, 1.4)} />
          <path d={ahead} pathLength={1} fill="none" stroke="#D97757" strokeOpacity=".38" strokeWidth="2.5" strokeLinecap="round" style={draw(1.5)} />
          <path d={lever} pathLength={1} fill="none" stroke="#48C28C" strokeWidth="3.5" strokeLinecap="round" style={draw(2.4)} />
          {live && motion && (
            <circle r="5" fill="#D97757" opacity="0">
              <animateMotion dur="3.6s" begin="2.6s" repeatCount="indefinite" path={built} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines=".45 0 .25 1" />
              <animate attributeName="opacity" dur="3.6s" begin="2.6s" repeatCount="indefinite" values="0;.9;.9;0" keyTimes="0;.1;.9;1" />
            </circle>
          )}
          {live && motion && <circle cx="610" cy="122" r="14" fill="#48C28C" className="spx-ember" filter="url(#tj-soft)" />}
          <g style={{ opacity: live ? 1 : 0, transition: "opacity .5s ease 3.3s" }}><circle cx="610" cy="122" r="5.5" fill="#48C28C" stroke="#fff" strokeWidth="2" /></g>
          <g style={{ opacity: live ? 1 : 0, transition: "opacity .5s ease 1.3s" }}>
            {live && motion && <circle cx="360" cy="152" r="7" fill="none" stroke="#7A8695" strokeWidth="1.5" className="spx-ring slow" />}
            <circle cx="360" cy="152" r="7" fill="#9aa3b0" stroke="#fff" strokeWidth="2.5" />
          </g>
        </svg>
        <span className="spx-tax" style={{ left: `${(30 / 640) * 100}%` }}>Years ago</span>
        <span className="spx-tax mid" style={{ left: `${(360 / 640) * 100}%` }}>Today</span>
        <span className="spx-tax end" style={{ left: `${(610 / 640) * 100}%` }}>Years ahead</span>
      </div>
      <div className="spx-tleg">
        <span className="spx-pill" style={{ ["--pc" as string]: "#9aa3b0" }}>Biological age · one reading, today</span>
        <span className="spx-pill" style={{ ["--pc" as string]: "#D97757" }}>What is building · and where it is heading</span>
        <span className="spx-pill" style={{ ["--pc" as string]: "#48C28C" }}>Your clearest lever · where acting matters most</span>
      </div>
    </div>
  )
}

export function Caption({ children }: { children: React.ReactNode }) {
  return <p className="spx-cap">{children}</p>
}

const SPX_CSS = `
  .spx-field{border-radius:24px;padding:clamp(22px,5vw,56px);border:1px solid rgba(14,34,64,.06);box-shadow:0 30px 70px -50px rgba(14,34,64,.35)}
  .spx-field.tall{padding:clamp(28px,6vw,72px)}
  .spx-card{container-type:inline-size;background:rgba(254,252,249,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.7);border-radius:24px;padding:clamp(20px,3vw,32px);box-shadow:0 1px 0 rgba(255,255,255,.6) inset}
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
  .spx-axis{position:relative;height:48px;margin:10px 6px 0}
  .spx-axis span{position:absolute;top:0;transform:translateX(-50%);font-family:${MONO};font-size:10.5px;letter-spacing:.04em;color:#7A8695;white-space:nowrap}
  .spx-axis span:nth-child(even){top:20px}
  .spx-axis span.on{color:#0E2240;font-weight:600}
  .spx-legend{display:flex;justify-content:space-between;font-family:${MONO};font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:#9aa3b0;margin:4px 6px 0}
  .spx-radar{position:relative;max-width:520px;margin:0 auto;padding:40px clamp(56px,14%,96px)}
  .spx-rin{position:relative}
  .spx-radar svg{display:block;width:100%;overflow:visible}
  .spx-grow{transform-origin:160px 160px;transform-box:view-box;transition:transform 1.2s cubic-bezier(.16,1,.3,1),opacity .6s ease}
  .spx-rlab{position:absolute;transform:translate(-50%,-50%);font-size:10px;padding:6px 11px}
  .spx-rlab b{font-weight:600;margin-left:2px;color:#3a4a66}
  .spx-cap{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-size:16px;line-height:1.5;color:#3a4a66;margin:14px 2px 0}
  @media(max-width:560px){.spx-rlab{font-size:8.5px;padding:5px 8px;letter-spacing:.06em}.spx-radar{padding:34px 58px}.spx-axis span{font-size:9px}}

  .spx-bd{display:flex;flex-direction:column}
  .spx-bdh{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
  .spx-bdh span{font-family:${MONO};font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:#7A8695}
  .spx-bdh b{font-family:${MONO};font-weight:400;font-size:26px;color:#0E2240}.spx-bdh small{font-size:11px;color:#7A8695;margin-left:4px}
  .spx-bdr{display:grid;grid-template-columns:1fr auto;gap:5px 10px;padding:7px 0;border-top:1px solid rgba(14,34,64,.06)}
  .spx-bdr .n{font-family:Georgia,"Times New Roman",serif;font-size:14px;color:#3a4a66}
  .spx-bdr .n::first-letter{text-transform:uppercase}
  .spx-bdr .v{font-family:${MONO};font-size:12.5px;color:#7A8695}
  .spx-bdr .b{grid-column:1/-1;height:6px;border-radius:8px;background:rgba(14,34,64,.06);overflow:hidden}
  .spx-bdr .f{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,rgba(14,34,64,.10),rgba(14,34,64,.22));transition:width 1s cubic-bezier(.16,1,.3,1)}
  .spx-bdr.lever .n{color:#0E2240;font-weight:600}.spx-bdr.lever .v{color:#0E2240}
  .spx-bdr.lever .f{background:linear-gradient(90deg,color-mix(in srgb,var(--dc) 45%,#fff),var(--dc))}
  .spx-bdr .tagl{grid-column:1/-1;justify-self:start;font-family:${MONO};font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:#0E2240;background:color-mix(in srgb,var(--dc) 18%,#fff);border-radius:999px;padding:4px 10px;margin-top:2px}
  .spx-map{position:relative;max-width:620px;margin:0 auto}
  .spx-map svg{display:block;width:100%;overflow:visible}
  .spx-link{stroke-dasharray:320;transition:stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1)}
  .spx-mlab{position:absolute;right:calc(100% - 178/520*100% + 12px);transform:translateY(-50%);font-size:10px;padding:6px 12px}
  .spx-sig{position:absolute;left:calc(372/520*100% + 16px);transform:translateY(-50%);display:flex;flex-direction:column;font-family:Georgia,"Times New Roman",serif;font-size:13px;line-height:1.35;color:#7A8695;max-width:150px}
  .spx-sig b{font-family:${MONO};font-weight:500;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#0E2240;margin-bottom:2px}
  @media(max-width:560px){.spx-mlab{font-size:8px;padding:4px 7px;letter-spacing:.04em}.spx-sig{font-size:11px;max-width:96px}.spx-sig b{font-size:9px}}
  .spx-swirl{transform-box:view-box;transform-origin:160px 160px;animation:spxSwirl 46s linear infinite}
  .spx-breathe{transform-box:view-box;transform-origin:160px 160px;animation:spxBreathe 9s ease-in-out 1.2s infinite alternate}
  .spx-ring{transform-box:fill-box;transform-origin:center;opacity:0;animation:spxRing 3.2s cubic-bezier(.16,1,.3,1) infinite}
  .spx-ring.slow{animation-duration:4.6s}
  .spx-ember{transform-box:fill-box;transform-origin:center;opacity:.35;animation:spxEmber 4.5s ease-in-out infinite alternate}
  @keyframes spxSwirl{to{transform:rotate(360deg)}}
  @keyframes spxBreathe{from{transform:scale(1)}to{transform:scale(1.035)}}
  @keyframes spxRing{0%{transform:scale(1);opacity:.7}100%{transform:scale(4.2);opacity:0}}
  @keyframes spxEmber{from{transform:scale(.8);opacity:.22}to{transform:scale(1.25);opacity:.55}}
  .spx-traj{max-width:640px;margin:0 auto}
  .spx-tin{position:relative;padding-bottom:22px}
  .spx-traj svg{display:block;width:100%;overflow:visible}
  .spx-tax{position:absolute;bottom:0;font-family:${MONO};font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#7A8695;white-space:nowrap}
  .spx-tax.mid{transform:translateX(-50%);color:#0E2240}.spx-tax.end{transform:translateX(-100%)}
  .spx-tleg{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
  .spx-tleg .spx-pill{font-size:10px;letter-spacing:.08em;white-space:normal;text-align:left}
  @media(max-width:560px){.spx-tax{font-size:8.5px}.spx-tleg .spx-pill{font-size:9px}}
  @media(prefers-reduced-motion:reduce){.spx-arc,.spx-grow,.spx-marker,.spx-ticks span,.spx-bdr .f,.spx-link,.spx-traj *{transition:none!important}.spx-swirl,.spx-breathe,.spx-ring,.spx-ember{animation:none!important}}
`
