import type React from "react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { HostedVideoSchema } from "@/components/schema"
import { LabFilm } from "@/components/innovation-lab/lab-film"
import { LAB_CONTACT, LAB_FILM, LAB_STATS, LAB_URL } from "@/lib/innovation-lab"

// ─────────────────────────────────────────────────────────────────────────
// /primaryinnovationlab/ : the Primary Innovation Lab, v1.
//
// Two sections, on purpose. First the data story: the film "Below the line",
// one patient's first visit as one simple line with every layer underneath
// it, then the counts it is built on. Second, why the Primary
// Innovation Lab exists. The other sections on the design canvas (the atlas,
// the method, how we design) are held back for a later version.
//
// Content and switches live in lib/innovation-lab.ts.
// ─────────────────────────────────────────────────────────────────────────

const ARGS: { tag: string; head: string; body: React.ReactNode }[] = [
  {
    tag: "01 · What we believe",
    head: "Oral health matters to everyone.",
    body: (
      <>
        <p>
          The mouth is the most visible window into a person’s whole health, and the dental office is one of the few places in
          healthcare people come back to on a schedule, often when nothing hurts.
        </p>
        <p>
          We believe that makes it one of the best front doors American healthcare has: a place to widen access to care, raise its
          quality and bring its cost down.
        </p>
      </>
    ),
  },
  {
    tag: "02 · What people want",
    head: "One place for their health, their smile and how they feel.",
    body: (
      <p>
        Nobody separates their health from how they look or how they feel day to day. A dental practice already touches all three.
        Built on purpose, it becomes the place where healthcare, beauty and wellbeing meet.
      </p>
    ),
  },
  {
    tag: "03 · Who gets to build it",
    head: "Most of dentistry is still independent, and it can stay that way.",
    body: (
      <>
        <p>
          More than eight in ten US dentists practice outside a dental service organization.
          <sup>
            <a href="#il-src">1</a>
          </sup>{" "}
          Independent practices already hold the hardest part: the chairs, the patients and the trust. What many lack is the system
          around them, the technology, the patient experience and the training, and too often the only way to get it has felt like
          selling the practice.
        </p>
        <p>We are building a model an independent practice can run as its own.</p>
      </>
    ),
  },
  {
    tag: "04 · The Primary Innovation Lab",
    head: "So we are building it first, in our own practice.",
    body: (
      <>
        <p>
          Primary is an integrative dental practice in Brentwood, Los Angeles, bringing preventive care and longevity into everyday
          dentistry and connecting it to primary care. The Primary Innovation Lab is where we build the model, on real days, with the
          companies whose products run it, then share it with the practices that want to run it themselves.
        </p>
        <p>
          What we are building toward is simple to say and hard to build: a patient who feels cared for, not processed, and a dental
          visit people look forward to, as the foundation for their health, wellbeing and beauty.
        </p>
        <dl className="il-who">
          <div>
            <dt>Independent practices</dt>
            <dd>The systems, playbooks and partners to run this way, without selling the practice. Groups that want to work this way are welcome too.</dd>
          </div>
          <div>
            <dt>Companies that make the tools</dt>
            <dd>We put your product into the whole day of a practice, measure what changes, and tell the story with the people who use it.</dd>
          </div>
          <div>
            <dt>Clinicians and teams</dt>
            <dd>How a tool fits the way you care for patients, and the training that makes it stick.</dd>
          </div>
        </dl>
      </>
    ),
  },
]

export default function PrimaryInnovationLabPage() {
  return (
    <>
      <SiteNav />
      <main className="il">
        <style>{CSS}</style>
        <HostedVideoSchema
          src={LAB_FILM.src}
          poster={LAB_FILM.poster}
          name={`${LAB_FILM.title}, the Primary Innovation Lab`}
          description="One patient's first dental visit as one simple line, and every layer underneath it: people, where it happens, software, connections and nearly 100 kinds of product."
          uploadDate={LAB_FILM.uploadDate}
          duration={LAB_FILM.isoDuration}
          pageUrl={LAB_URL}
        />

        {/* ── 1. The data story ── */}
        <section className="il-night" aria-labelledby="il-h1">
          <div className="il-wrap">
            <p className="il-eyebrow">Primary Innovation Lab &middot; Brentwood, Los Angeles</p>
            <h1 id="il-h1" className="il-h1">
              The showroom for the future of <em>dentistry.</em>
            </h1>
            <p className="il-sub">
              An integrative dental practice for the modern era, bringing preventive care and longevity into everyday dentistry and
              connecting it to primary care.
            </p>

            <p className="il-lead">To a patient, a first visit is one simple line. This is everything underneath it.</p>
            <LabFilm />

            <ul className="il-stats" aria-label="What one first visit takes">
              {LAB_STATS.map((s) => (
                <li key={s.label}>
                  <span className="il-n">{s.n}</span>
                  <span className="il-l">{s.label}</span>
                </li>
              ))}
            </ul>
            <p className="il-note">
              Counted from Primary’s own journey record, October 2026, with names left off. About four hours a year in the chair is an
              estimate: the first visit and three cleanings.
            </p>

          </div>
        </section>

        {/* ── 2. Why the Primary Innovation Lab exists ── */}
        <section className="il-day" aria-labelledby="il-why">
          <div className="il-wrap">
            <p className="il-eyebrow il-eyebrow-day">Why the Primary Innovation Lab exists</p>
            <h2 id="il-why" className="il-h2">
              Every dental practice can be a front door to health. <em>None should have to sell to get there.</em>
            </h2>
            <div className="il-args">
              {ARGS.map((a) => (
                <article key={a.tag} className="il-arg">
                  <p className="il-tag">{a.tag}</p>
                  <div>
                    <h3>{a.head}</h3>
                    {a.body}
                  </div>
                </article>
              ))}
            </div>
            <p className="il-holds">
              We build it here first, <em>so no practice has to build it alone.</em>
            </p>
            {LAB_CONTACT ? (
              <p className="il-cta">
                <a href={LAB_CONTACT.href}>{LAB_CONTACT.label}</a>
              </p>
            ) : null}
            <p className="il-src" id="il-src">
              <sup>1</sup> American Dental Association Health Policy Institute: 16.1 percent of US dentists were affiliated with a dental
              service organization in 2024.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

const CSS = `
.il { --navy:#0E2240; --blue:#24A7E0; --cream:#FAF8F5; --body:#4A4A5A; --line:rgba(14,34,64,.12);
  font-family: var(--font-montserrat), Montserrat, "Helvetica Neue", Arial, sans-serif; color: var(--navy); }
.il * { box-sizing: border-box; }
.il-wrap { max-width: 1200px; margin: 0 auto; padding: 0 max(20px, 4vw); }
.il-night { background: var(--navy); color: #fff; padding: clamp(56px, 8vw, 112px) 0 clamp(64px, 8vw, 104px); }
.il-day { background: var(--cream); padding: clamp(72px, 10vw, 140px) 0; }
.il-eyebrow { margin: 0 0 20px; font: 500 12px/1.5 var(--font-lab-mono), "JetBrains Mono", ui-monospace, Menlo, monospace; letter-spacing: .14em; text-transform: uppercase; color: var(--blue); }
.il-eyebrow-day { color: var(--navy); }
.il-eyebrow-day::before { content: ""; display: inline-block; width: 18px; height: 2px; margin: 0 10px 3px 0; background: var(--blue); vertical-align: middle; }
.il-h1 { margin: 0; max-width: 15ch; font-size: clamp(40px, 6.4vw, 76px); font-weight: 600; line-height: 1.03; letter-spacing: -.03em; text-wrap: balance; }
.il-h1 em, .il-h2 em, .il-holds em { font-family: Georgia, "Times New Roman", serif; font-style: italic; font-weight: 400; color: var(--blue); letter-spacing: -.01em; }
.il-sub { margin: 26px 0 0; max-width: 46ch; font: 400 clamp(18px, 1.6vw, 21px)/1.55 Georgia, "Times New Roman", serif; color: rgba(255,255,255,.8); }
.il-lead { margin: clamp(44px, 6vw, 72px) 0 16px; font: 500 13px/1.5 var(--font-lab-mono), "JetBrains Mono", ui-monospace, monospace; letter-spacing: .04em; color: rgba(255,255,255,.66); }
.il-film { position: relative; aspect-ratio: 16 / 9; border-radius: clamp(14px, 2vw, 24px); overflow: hidden; background: #0B1B35; box-shadow: 0 30px 80px rgba(0,0,0,.35); }
.il-film video { display: block; width: 100%; height: 100%; object-fit: cover; }
.il-film-play { position: absolute; inset: 0; margin: 0; padding: 0; border: 0; cursor: pointer; background: linear-gradient(to top, rgba(14,34,64,.35) 0%, rgba(14,34,64,0) 45%); }
.il-film-btn { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 92px; height: 92px; border-radius: 50%; background: rgba(255,255,255,.95); box-shadow: 0 10px 30px rgba(0,0,0,.35); display: flex; align-items: center; justify-content: center; padding-left: 5px; transition: transform .14s cubic-bezier(.16,1,.3,1); }
.il-film-play:hover .il-film-btn { transform: translate(-50%, -50%) scale(1.05); }
.il-film-play:focus-visible { outline: 3px solid var(--blue); outline-offset: -3px; }
.il-film-tag { position: absolute; right: 14px; bottom: 14px; font: 600 12px/1 var(--font-montserrat), Montserrat, Arial, sans-serif; color: #fff; background: rgba(14,34,64,.78); border-radius: 999px; padding: 6px 12px; }
.il-stats { list-style: none; margin: clamp(40px, 5vw, 64px) 0 0; padding: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 28px 24px; }
.il-stats li { padding-top: 16px; border-top: 1px solid rgba(255,255,255,.18); display: flex; flex-direction: column; gap: 8px; }
.il-n { font-size: clamp(32px, 3.4vw, 44px); font-weight: 600; line-height: 1; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.il-l { font: 400 13px/1.5 var(--font-lab-mono), "JetBrains Mono", ui-monospace, monospace; color: rgba(255,255,255,.72); }
.il-note { margin: 28px 0 0; max-width: 72ch; font: 400 12.5px/1.6 var(--font-lab-mono), "JetBrains Mono", ui-monospace, monospace; color: rgba(255,255,255,.6); }
.il-h2 { margin: 0; max-width: 21ch; font-size: clamp(32px, 4.4vw, 56px); font-weight: 600; line-height: 1.08; letter-spacing: -.026em; text-wrap: balance; }
.il-args { margin-top: clamp(48px, 6vw, 88px); border-top: 1px solid var(--line); }
.il-arg { display: grid; grid-template-columns: minmax(0, 260px) minmax(0, 1fr); gap: 12px 48px; padding: clamp(28px, 3.4vw, 44px) 0; border-bottom: 1px solid var(--line); }
.il-tag { margin: 6px 0 0; font: 500 12px/1.5 var(--font-lab-mono), "JetBrains Mono", ui-monospace, monospace; letter-spacing: .12em; text-transform: uppercase; color: var(--body); }
.il-arg h3 { margin: 0 0 14px; max-width: 30ch; font-size: clamp(21px, 2vw, 26px); font-weight: 600; line-height: 1.25; letter-spacing: -.012em; text-wrap: balance; }
.il-arg > div > p { margin: 0 0 12px; max-width: 62ch; font: 400 18px/1.62 Georgia, "Times New Roman", serif; color: var(--body); }
.il-arg sup a { color: var(--navy); text-decoration: none; font: 500 11px var(--font-lab-mono), monospace; }
.il-who { margin: 18px 0 0; border-bottom: 1px solid var(--line); }
.il-who > div { display: grid; grid-template-columns: minmax(0, 220px) minmax(0, 1fr); gap: 4px 28px; padding: 12px 0; border-top: 1px solid var(--line); }
.il-who dt { font-size: 16px; font-weight: 600; line-height: 1.45; }
.il-who dd { margin: 0; max-width: 56ch; font: 400 17px/1.55 Georgia, "Times New Roman", serif; color: var(--body); }
.il-holds { margin: clamp(56px, 7vw, 96px) 0 0; max-width: 26ch; font-size: clamp(26px, 3vw, 38px); font-weight: 600; line-height: 1.2; letter-spacing: -.018em; text-wrap: balance; }
.il-cta { margin: 32px 0 0; }
.il-cta a { display: inline-flex; align-items: center; min-height: 48px; padding: 0 26px; border-radius: 999px; background: var(--navy); color: #fff; font-weight: 600; font-size: 15px; text-decoration: none; }
.il-src { margin: 40px 0 0; font: 400 12px/1.6 var(--font-lab-mono), "JetBrains Mono", ui-monospace, monospace; color: var(--body); }
@media (max-width: 1000px) {
  .il-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 760px) {
  .il-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 18px; }
  .il-arg, .il-who > div { grid-template-columns: minmax(0, 1fr); }
  .il-film-btn { width: 68px; height: 68px; }
  .il-film-btn svg { width: 22px; height: 24px; }
  .il-film-tag { right: 10px; bottom: 10px; font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  .il-film-btn { transition: none; }
}
`
