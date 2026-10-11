"use client"

// ============================================================
// /five-dimensions/: the Primary iD card, broken out into five chapters.
//
// Craft (Little Plains method, structure only; Primary Brand OS governs
// expression and copy):
// - One object generates the page: the sample iD card is pinned in the rail
//   and opens as you read. The row for the chapter in view lights; rows you
//   have read fill. On phones the rail becomes a five-segment strip.
// - The page ground takes the colour of the chapter in view (the same field
//   tint /membership/ uses), and each chapter is a sheet on that field.
// - Reading is a designed condition: one off-centre column about 66 characters
//   wide, diagrams no wider than the text.
// - Index by feeling first ("My gums bleed"), not by category.
// - Every chapter ends on one line of meaning, then the relay to the next.
// - Dr. Gabi's note has a reserved place after the reframe. It renders only
//   when a chapter's `note` is set (components/five-dimensions/chapters.ts).
// ============================================================

import { useEffect, useRef, useState } from "react"
import { CHAPTERS, type DoctorNote } from "./chapters"

function Note({ note, name }: { note: DoctorNote; name: string }) {
  return (
    <figure className="note">
      <figcaption className="lab">Dr. Gabi, on {name.toLowerCase()}</figcaption>
      {note.kind === "video" ? (
        <video controls playsInline preload="metadata" poster={note.poster} aria-label={note.title}>
          <source src={note.src} />
        </video>
      ) : (
        <audio controls preload="metadata" aria-label={note.title}><source src={note.src} /></audio>
      )}
      <details><summary>Read the transcript</summary><p>{note.transcript}</p></details>
    </figure>
  )
}

export default function ChaptersView() {
  const [current, setCurrent] = useState(-1)
  const [seen, setSeen] = useState<number[]>([])
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const i = Number((e.target as HTMLElement).dataset.i)
          setCurrent(i)
          setSeen((s) => (s.includes(i) ? s : [...s, i]))
        })
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const tint = current >= 0 ? CHAPTERS[current].color : "#24A7E0"

  return (
    <div className="fdx" style={{ ["--cur" as string]: tint }}>
      <style>{CSS}</style>

      {/* Ways in, by feeling */}
      <section className="ways" aria-labelledby="ways-h">
        <div className="frame">
          <p className="lab" id="ways-h">Where would you like to start?</p>
          <div className="wayrow">
            {CHAPTERS.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="way" style={{ ["--dc" as string]: c.color }}>
                <span className="wdot" />{c.feel}<span className="wn">{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* The card, broken out */}
      <div className="field">
        <div className="frame grid">
          <aside className="rail" aria-label="Your Primary iD, by chapter">
            <div className="mini">
              <div className="mtop"><span className="mlab">Primary <em>iD</em></span><span className="msmp">Sample</span></div>
              <div className="mcomp"><span>72</span><small>/ 100</small></div>
              {CHAPTERS.map((c, i) => (
                <a key={c.slug} href={`#${c.slug}`} className={`mrow${i === current ? " on" : ""}`} style={{ ["--dc" as string]: c.color }}>
                  <span className="mn">{c.name}</span><span className="ms">{c.score}</span>
                  <span className="mb"><span className="mf" style={{ width: seen.includes(i) ? `${c.score}%` : "0%" }} /></span>
                </a>
              ))}
            </div>
            {current >= 0 && (
              <div className="meta">
                <div className="lab">{CHAPTERS[current].n} / {CHAPTERS[current].name}</div>
                <p>Eight questions, one tap each.</p>
                <p className="src">{CHAPTERS[current].sources}</p>
              </div>
            )}
          </aside>

          <div className="strip" aria-hidden="true">
            {CHAPTERS.map((c, i) => (
              <span key={c.slug} className={i === current ? "on" : seen.includes(i) ? "seen" : ""} style={{ ["--dc" as string]: c.color }} />
            ))}
          </div>

          <div className="col">
            {CHAPTERS.map((c, i) => {
              const next = CHAPTERS[i + 1]
              return (
                <article
                  key={c.slug}
                  id={c.slug}
                  data-i={i}
                  ref={(el) => { refs.current[i] = el }}
                  className="sheet"
                  style={{ ["--dc" as string]: c.color }}
                  aria-labelledby={`${c.slug}-h`}
                >
                  <span className="tag">{c.n} / {c.name}</span>
                  <h2 id={`${c.slug}-h`}>{c.title[0]}<em>{c.title[1]}</em></h2>
                  <p className="def">{c.definition}</p>
                  <p>{c.reframe}</p>

                  {c.note && <Note note={c.note} name={c.name} />}

                  <figure className="diagram">
                    <div className="dsvg" dangerouslySetInnerHTML={{ __html: c.svg }} />
                    <figcaption>{c.label}.</figcaption>
                  </figure>

                  <h3 className="lab">What we look at</h3>
                  <ul className="look">
                    {c.look.map((l) => <li key={l.b}><b>{l.b}</b>{l.t ? `, ${l.t}` : ""}</li>)}
                  </ul>

                  <h3 className="lab">The eight questions, and why we ask</h3>
                  <ol className="qs">
                    {c.qs.map((q) => <li key={q.q}><span className="q">{q.q}</span><span className="why">{q.why}</span></li>)}
                  </ol>

                  <h3 className="lab">What your answers tell Dr. Gabi</h3>
                  <p>{c.tells}</p>

                  <p className="close">{c.close}</p>
                  <div className="relay">
                    <a className="start" href={c.href}>Start with {c.name.toLowerCase()} →</a>
                    {next ? <a className="next" href={`#${next.slug}`}>Next: {next.n} {next.name} ↓</a> : <a className="next" href="#how">How it adds up ↓</a>}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const CSS = `
  .fdx{--navy:#0E2240;--blue:#24A7E0;--cream:#FAF8F5;--warm:#FEFCF9;--ink-soft:#3a4a66;--muted:#7A8695;--line:rgba(14,34,64,.12);color:var(--ink-soft)}
  .fdx .frame{max-width:1180px;margin:0 auto;padding:0 clamp(16px,4vw,48px)}
  .fdx .lab{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);margin:0}
  .fdx .ways{padding:8px 0 56px}
  .fdx .wayrow{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
  .fdx .way{display:inline-flex;align-items:center;gap:10px;padding:12px 18px;border:1px solid var(--line);border-radius:999px;background:var(--warm);
    font-family:Georgia,"Times New Roman",serif;font-size:16px;color:var(--navy);text-decoration:none;transition:border-color .14s cubic-bezier(.16,1,.3,1),transform .14s cubic-bezier(.16,1,.3,1)}
  .fdx .way:hover{border-color:var(--dc);transform:translateY(-2px);transition-duration:.14s}
  .fdx .way .wdot{width:9px;height:9px;border-radius:50%;background:var(--dc)}
  .fdx .way .wn{font-family:inherit;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:600}
  .fdx .field{background:color-mix(in srgb,var(--cur) 9%,var(--cream));transition:background-color .5s cubic-bezier(.22,1,.36,1);padding:64px 0 96px}
  .fdx .grid{display:grid;grid-template-columns:280px minmax(0,1fr);gap:48px;align-items:start}
  .fdx .rail{position:sticky;top:88px}
  .fdx .mini{background:var(--warm);border:1px solid var(--line);border-radius:24px;padding:22px;box-shadow:0 26px 60px -40px rgba(14,34,64,.45)}
  .fdx .mtop{display:flex;justify-content:space-between;align-items:baseline}
  .fdx .mlab{font-family:Georgia,"Times New Roman",serif;font-size:16px;color:var(--navy)}.fdx .mlab em{color:var(--blue);font-style:italic}
  .fdx .msmp{font-size:9px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
  .fdx .mcomp{font-family:Georgia,"Times New Roman",serif;color:var(--navy);margin:6px 0 10px}
  .fdx .mcomp span{font-size:44px;line-height:1}.fdx .mcomp small{font-size:15px;font-style:italic;color:var(--muted);margin-left:6px}
  .fdx .mrow{display:grid;grid-template-columns:1fr auto;gap:5px 10px;padding:9px 8px;margin:0 -8px;border-top:1px solid var(--line);text-decoration:none;border-radius:8px;transition:background .4s cubic-bezier(.4,0,.2,1)}
  .fdx .mrow .mn{font-family:Georgia,"Times New Roman",serif;font-size:14px;color:var(--muted);display:flex;align-items:center;gap:8px;transition:color .4s cubic-bezier(.4,0,.2,1)}
  .fdx .mrow .mn::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--dc)}
  .fdx .mrow .ms{font-family:Georgia,"Times New Roman",serif;font-size:14px;color:var(--muted)}
  .fdx .mrow .mb{grid-column:1/-1;height:4px;background:var(--line);border-radius:8px;overflow:hidden}
  .fdx .mrow .mf{display:block;height:100%;background:var(--dc);border-radius:8px;transition:width 1.1s cubic-bezier(.22,1,.36,1)}
  .fdx .mrow.on{background:color-mix(in srgb,var(--dc) 12%,transparent)}
  .fdx .mrow.on .mn,.fdx .mrow.on .ms{color:var(--navy)}
  .fdx .meta{margin-top:18px;padding:0 4px}
  .fdx .meta p{font-size:13.5px;margin:8px 0 0}
  .fdx .meta .src{font-family:"JetBrains Mono","Geist Mono",ui-monospace,Menlo,monospace;font-size:11px;line-height:1.6;color:var(--muted)}
  .fdx .strip{display:none}
  .fdx .col{display:flex;flex-direction:column;gap:40px}
  .fdx .sheet{background:var(--warm);border:1px solid var(--line);border-radius:24px;padding:clamp(28px,5vw,56px);max-width:760px;scroll-margin-top:96px;
    box-shadow:0 30px 70px -50px rgba(14,34,64,.5)}
  .fdx .tag{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--dc)}
  .fdx .tag::before{content:"";width:10px;height:10px;border-radius:50%;background:var(--dc)}
  .fdx h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;color:var(--navy);letter-spacing:-.02em;font-size:clamp(32px,4vw,46px);line-height:1.08;margin:14px 0 18px}
  .fdx h2 em{color:var(--blue);font-style:italic}
  .fdx .sheet p{font-family:Georgia,"Times New Roman",serif;font-size:18px;line-height:1.65;margin:0 0 16px;max-width:66ch}
  .fdx .sheet .def{font-size:21px;color:var(--navy)}
  .fdx .sheet h3.lab{margin:34px 0 12px}
  .fdx .diagram{margin:30px 0 0;padding:22px 22px 14px;border:1px solid var(--line);border-radius:16px;background:#fff}
  .fdx .dsvg svg{display:block;width:100%;height:auto;max-height:220px}
  .fdx .dsvg .st{fill:none;stroke:rgba(14,34,64,.28);stroke-width:1.4}
  .fdx .dsvg .hl{fill:none;stroke:var(--dc);stroke-width:2.2;stroke-linecap:round}
  .fdx .dsvg .dot{fill:var(--dc)}
  .fdx .dsvg .gz{fill:var(--dc);opacity:.15}
  .fdx .diagram figcaption{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-size:14.5px;color:var(--muted);margin-top:10px}
  .fdx .look{list-style:none;margin:0;padding:0}
  .fdx .look li{font-size:16px;line-height:1.5;padding:10px 0 10px 20px;border-top:1px solid rgba(14,34,64,.07);position:relative}
  .fdx .look li:first-child{border-top:0}
  .fdx .look li::before{content:"";position:absolute;left:0;top:18px;width:7px;height:7px;border-radius:50%;background:var(--dc)}
  .fdx .look b{color:var(--navy);font-weight:600}
  .fdx .qs{margin:0;padding:0;list-style:none;counter-reset:q}
  .fdx .qs li{counter-increment:q;display:grid;grid-template-columns:34px 1fr;gap:2px 10px;padding:14px 0;border-top:1px solid rgba(14,34,64,.07)}
  .fdx .qs li:first-child{border-top:0}
  .fdx .qs li::before{content:counter(q,decimal-leading-zero);grid-row:span 2;font-family:Georgia,"Times New Roman",serif;font-size:15px;color:var(--dc);padding-top:2px}
  .fdx .qs .q{font-family:Georgia,"Times New Roman",serif;font-size:17px;color:var(--navy);line-height:1.45}
  .fdx .qs .why{font-size:14.5px;line-height:1.55;color:var(--ink-soft)}
  .fdx .close{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-size:clamp(22px,2.6vw,28px)!important;line-height:1.3!important;color:var(--navy);margin:40px 0 0!important;padding-top:28px;border-top:1px solid var(--line)}
  .fdx .relay{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;margin-top:22px}
  .fdx .relay a{font-size:14.5px;font-weight:600;text-decoration:none;color:var(--navy)}
  .fdx .relay .start{background:var(--navy);color:#fff;padding:12px 22px;border-radius:999px;transition:background .14s}
  .fdx .relay .start:hover{background:var(--blue)}
  .fdx .relay .next{padding:12px 0}.fdx .relay .next:hover{color:var(--dc)}
  .fdx .note{margin:28px 0 0;padding:20px;border:1px solid var(--line);border-radius:16px;background:color-mix(in srgb,var(--dc) 6%,#fff)}
  .fdx .note video{display:block;width:100%;border-radius:12px;margin-top:12px;background:var(--navy)}
  .fdx .note audio{width:100%;margin-top:12px}
  .fdx .note details{margin-top:10px;font-size:14px}.fdx .note summary{cursor:pointer;color:var(--navy);font-weight:600}
  @media(max-width:980px){
    .fdx .grid{grid-template-columns:1fr;gap:0}
    .fdx .rail{display:none}
    .fdx .strip{display:flex;gap:6px;position:sticky;top:64px;z-index:5;padding:12px 0;background:color-mix(in srgb,var(--cur) 9%,var(--cream));transition:background-color .5s cubic-bezier(.22,1,.36,1)}
    .fdx .strip span{flex:1;height:5px;border-radius:8px;background:color-mix(in srgb,var(--dc) 25%,transparent);transition:background .4s}
    .fdx .strip span.seen,.fdx .strip span.on{background:var(--dc)}
    .fdx .strip span.on{height:7px;margin-top:-1px}
    .fdx .sheet{max-width:none}
  }
  @media(prefers-reduced-motion:reduce){.fdx *{transition:none!important}}
`
