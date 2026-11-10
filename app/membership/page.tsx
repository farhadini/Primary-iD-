"use client"

// ============================================================================
// /membership/ : the Primary iD membership page, rebuilt 6 Nov 2026.
// Source: "2 Website/Membership page.html" v18 in the Primary iD project (design
// and copy) and the handoff brief of the same date. Replaces the static
// public/membership.html, whose numbers and plan terms were retired.
//
// Server-rendered, so all the copy is in the HTML without JavaScript. Client
// state only for: the accordion, the three-question Primary iD preview, and the
// pointer tilt on the membership card.
//
// Rails (see the brief): membership is not insurance; Dr. Gabi is a
// prosthodontist; a score always says directional, not a diagnosis, not a measure
// of biological age; no "free", "up to", "as low as", "starting at"; nothing about
// the $99 first visit or a credit toward the membership; ozone carries no claim;
// airway is a question, never a claim. Numbers that must not drift: $499, $3,119.
// ============================================================================

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { SiteHeader, SiteFooter } from "@/components/site-shell"

// TODO(farhad): the enrolment URL. Subscribili is rebuilding the plans; until the
// URL exists "Join the membership" goes to the booking flow. Do not invent a link.
const JOIN_HREF = "/book/"
const ID_HREF = "/primary-id/"

// The film, self-hosted (published at Farhad's direction, Nov 2026). Set FILM to
// null to remove the section. TODO(farhad): this cut shows $2,682 at 0:56 where
// the page and its end card say $3,119; replace the file when re-exported, and add
// a VTT and set `captions`.
const FILM = {
  src: "/videos/membership-film.mp4",
  poster: "/images/membership-film-poster.jpg",
  captions: null,
} as null | { src: string; poster: string; captions: string | null }

const ICO: Record<string, React.ReactNode> = {
  clear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M3 12h7M3 7h11M3 17h5"/><path d="M15.5 8.5l5 5M20.5 8.5l-5 5"/></svg>,
  drop: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5C8.3 7.2 5 10.7 5 14.6a7 7 0 1014 0C19 10.7 15.7 7.2 12 1.5z"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.3 2"/></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M12 2.5l9.5 5-9.5 5-9.5-5z"/><path d="M2.5 12.5l9.5 5 9.5-5M2.5 17l9.5 5 9.5-5"/></svg>,
  screen: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M8 21h8M12 16.5V21"/></svg>,
  year: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 2.5v4M16 2.5v4"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="7"/><path d="M15.6 15.6L21 21"/></svg>,
  small: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M3 12h4M17 12h4M12 3v4M12 17v4"/><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/></svg>,
  lab: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2.5v6L4 18a2.5 2.5 0 002.2 3.5h11.6A2.5 2.5 0 0020 18l-5.5-9.5v-6M8 2.5h8M7.5 14h9"/></svg>,
  spark: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .8l2.5 8.2 8.2 2.5-8.2 2.5L12 22.2 9.5 14 1.3 11.5 9.5 9z"/></svg>,
  both: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 8.5h16M4 15.5h16"/></svg>,
  moon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.2 13.4A9.2 9.2 0 1110.6 2.8a7.3 7.3 0 1010.6 10.6z"/></svg>,
  ask: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M9.2 9a2.9 2.9 0 115.6 1c0 1.9-2.8 2.4-2.8 4.4"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="9.5"/></svg>,
  join: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="7" cy="12" r="5"/><circle cx="17" cy="12" r="5"/></svg>,
  card: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19"/></svg>,
  quiet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M8.4 14.2c1 1.2 2.1 1.8 3.6 1.8s2.6-.6 3.6-1.8M9 9.4h.01M15 9.4h.01"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.8l8.2 3.3v6.2c0 5.2-3.5 9.6-8.2 11.1-4.7-1.5-8.2-5.9-8.2-11.1V5.1z"/></svg>,
  chair: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20v-4a2 2 0 012-2h12a2 2 0 012 2v4M6 14V7a3 3 0 013-3h6a3 3 0 013 3v7"/></svg>,
  dots: <svg viewBox="0 0 24 13" fill="currentColor"><circle cx="1.7" cy="3.8" r="1.9"/><circle cx="4.6" cy="8.2" r="1.5"/><circle cx="9.3" cy="10.7" r="1.3"/><circle cx="14.7" cy="10.7" r="1.3"/><circle cx="19.4" cy="8.2" r="1.5"/><circle cx="22.3" cy="3.8" r="1.9"/></svg>,
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M2 12s3.9-6.6 10-6.6S22 12 22 12s-3.9 6.6-10 6.6S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/></svg>,
  rise: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M16 7h5v5"/></svg>,
}

const FIVE = ["var(--d-oral)", "var(--d-sleep)", "var(--d-nutrition)", "var(--d-family)", "var(--d-longevity)"]
const wash = (rgb: string) =>
  `linear-gradient(143deg, rgba(${rgb},.30) 0%, rgba(${rgb},.13) 34%, rgba(254,252,249,.96) 76%, #FEFCF9 100%)`

type Card = {
  tab: string; chip: string; col: string; rgb: string; icon: string
  h: [string, string]; p: string; m: [string, string][]; fee: string
  five?: boolean; dark?: boolean
}

const CARDS: Card[] = [
  { tab: "Unlimited cleanings", chip: "Oral health", col: "var(--d-oral)", rgb: "212,181,132", icon: "clear",
    h: ["Nothing gets a chance to ", "build up."],
    p: "As many cleanings as your mouth actually needs, rather than the two an insurance company settled on decades ago. Ozone goes in alongside them wherever it is indicated, at no extra charge.",
    m: [["clear", "As many as your mouth needs"], ["drop", "Ozone where it is indicated"], ["clock", "Your clinician sets the interval"]],
    fee: "Our regular fee · $225 a cleaning · $150 the exam · $97 the ozone" },
  { tab: "The 3D scan", chip: "All five", col: "var(--d-family)", rgb: "232,152,94", icon: "layers", five: true,
    h: ["The parts nobody has ", "ever seen."],
    p: "A flat x-ray shows teeth. This shows the jaw bone underneath them, your sinuses, your airway and the roots, in three dimensions. Most people reach fifty without anyone having looked once.",
    m: [["layers", "Bone, sinuses, airway, roots"], ["screen", "Gone through with you on screen"], ["year", "Once every year"]],
    fee: "Our regular fee · $500" },
  { tab: "Caught early", chip: "Oral health", col: "var(--d-oral)", rgb: "212,181,132", icon: "small",
    h: ["Found at one millimetre, ", "not five."],
    p: "Decay and gum disease looked for while they are still small enough that you have choices. An oral cancer screening every single year. And a saliva test, at the member rate, that shows what is actually growing in there.",
    m: [["small", "Decay found while it is small"], ["search", "Cancer screening every year"], ["lab", "Saliva test at the member rate"]],
    fee: "Our regular fee · $150 for the screening" },
  { tab: "Whitening in the chair", chip: "Cosmetic", col: "var(--d-oral)", rgb: "212,181,132", icon: "spark",
    h: ["Whiter teeth you did not have to ", "organise."],
    p: "In-office whitening, both arches, every year. Not a kit posted to your house that you use twice and lose. You sit in the chair for an hour and you leave with it done.",
    m: [["spark", "Done in the chair"], ["both", "Both arches"], ["year", "Every year, not once"]],
    fee: "Our regular fee · $450" },
  { tab: "Sleep and airway", chip: "Sleep & airway", col: "var(--d-sleep)", rgb: "123,104,238", icon: "moon", dark: true,
    h: ["When did anyone last look at ", "your airway?"],
    p: "We screen how you sleep and breathe every year, and your 3D scan shows the anatomy sitting behind it. If it points somewhere, you get pointed to the right person.",
    m: [["moon", "Screened every year"], ["screen", "Your own airway, on screen"], ["ask", "A question, never a diagnosis"]],
    fee: "Our regular fee · $75" },
  { tab: "Blood and mouth", chip: "Longevity", col: "var(--d-longevity)", rgb: "217,119,87", icon: "rise",
    h: ["Your bloodwork and your mouth, ", "in the same room."],
    p: "A functional medicine doctor reads your panel. Your dental team reads your mouth. Then the two are set against each other, which is the part almost nobody does. You take a requisition to any lab and your medical insurance pays for it.",
    m: [["lab", "A functional doctor reads it"], ["join", "Set against your oral health"], ["card", "Labs billed to your medical plan"]],
    fee: "Our regular fee · $195 for the consultation" },
  { tab: "If the dentist frightens you", chip: "Comfort", col: "var(--blue)", rgb: "36,167,224", icon: "quiet",
    h: ["The reason most people ", "stopped going."],
    p: "If the dentist frightens you, say so on your Primary iD before you come in. Nobody has to announce it at the front desk. The nitrous is included, for cleanings as much as for treatment.",
    m: [["quiet", "Say it once, in private"], ["shield", "Included, not charged"], ["chair", "Cleanings too, not just treatment"]],
    fee: "Our regular fee · $150 a visit" },
  { tab: "Your Primary iD", chip: "All five", col: "var(--d-nutrition)", rgb: "72,194,140", icon: "dots", five: true, dark: true,
    h: ["Somebody is actually ", "keeping track."],
    p: "Five dimensions of your health, read from your mouth, scored again every year and gone through with you at every visit. Your clinician has read it before they meet you. It is ours, and it does not exist anywhere else.",
    m: [["dots", "Five dimensions, one number"], ["eye", "Read before you are seen"], ["year", "Scored again every year"]],
    fee: "Exists nowhere else" },
]

const INC: [string, string, string][] = [
  ["Cleanings, as many as your mouth needs", "3 × $225", "$675"],
  ["The exam with each one", "3 × $150", "$450"],
  ["X-rays", "", "$130"],
  ["The 3D scan of your jaw, sinuses and airway", "", "$500"],
  ["Screening for oral cancer", "", "$150"],
  ["Screening for how you sleep and breathe", "", "$75"],
  ["Whitening in the chair, both arches", "2 × $225", "$450"],
  ["Ozone, where it is indicated", "2 × $97", "$194"],
  ["Nitrous, if the dentist frightens you", "2 × $150", "$300"],
  ["The longevity consultation", "", "$195"],
  ["Your Primary iD, scored again every year", "", "No fee"],
]

const RATES: [string, string, string][] = [
  ["Fillings, bonding, crowns, root canals", "", "25% off"],
  ["Gum treatment, bridges, dentures, surgery", "", "20% off"],
  ["Whitening and veneers", "", "20% off"],
  ["Night guards", "", "20% off"],
  ["Implants", "", "15% off"],
  ["Sleep appliances", "", "15% off"],
  ["Clear aligners", "AirFlex™ by OrthoFX", "10% off"],
  ["Products we stock", "", "15% off"],
  ["Salivary and oral microbiome panels", "", "Lab cost plus $50"],
]

const ALT: [string, string, boolean, string, boolean, string, boolean][] = [
  ["Examines the mouth", "Yes", true, "No", false, "Rarely", false],
  ["Looks at the rest of you", "No", false, "Yes", true, "Yes", true],
  ["Reads both together", "No", false, "No", false, "No", false],
  ["A real clinician relationship", "Yes", true, "Explicitly not", false, "Yes", true],
  ["Longitudinal, not a snapshot", "Episodic", false, "One-off", false, "Yes", true],
  ["Record you own and can take", "No", false, "Partial", false, "Varies", false],
]

function CardView({ c, on }: { c: Card; on?: boolean }) {
  return (
    <article className={`acard${c.dark ? " dark" : ""}${on ? " on" : ""}`}
      style={{ background: c.dark ? "linear-gradient(143deg,#15305A 0%,#0E2240 46%,#07142A 100%)" : wash(c.rgb) }}>
      <span className="ctop">
        <span className="chip" style={{ color: c.dark ? "#fff" : c.col }}>{c.chip}</span>
        {c.five ? (
          <span className="ctile"><span className="cfive">{FIVE.map((x) => <i key={x} style={{ background: x }} />)}</span></span>
        ) : (
          <span className="ctile" style={{ color: c.col }}>{ICO[c.icon]}</span>
        )}
      </span>
      <div className="cbody">
        <h3>{c.h[0]}<em style={{ color: c.dark ? "var(--blue-soft)" : c.col }}>{c.h[1]}</em></h3>
        <p className="cp">{c.p}</p>
        <div className="marks">
          {c.m.map(([ic, t]) => <div key={t} className="mk">{ICO[ic]}<b>{t}</b></div>)}
        </div>
        <div className="cfoot"><b>Included in your membership.</b><span className="fee">{c.fee}</span></div>
      </div>
    </article>
  )
}

// A still list on the left, one card on the right. A closed row never moves; only
// the card changes. Hover opens after a 150ms dwell; click, focus and Enter open
// at once. Below 960px the eight cards stack, with no interaction at all.
function Accordion() {
  const [open, setOpen] = useState(0)
  const dwell = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancel = () => { if (dwell.current) { clearTimeout(dwell.current); dwell.current = null } }
  useEffect(() => cancel, [])
  const now = (i: number) => { cancel(); setOpen(i) }
  return (
    <>
      <div className="acc">
        <ul className="alist" onMouseLeave={cancel}>
          {CARDS.map((c, i) => (
            <li key={c.tab} className={`arow${i === open ? " on" : ""}`} tabIndex={0} role="button" aria-pressed={i === open}
              onMouseEnter={() => { cancel(); if (i !== open) dwell.current = setTimeout(() => setOpen(i), 150) }}
              onMouseLeave={cancel}
              onClick={() => now(i)}
              onFocus={() => now(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); now(i) } }}>
              <span className="an">{String(i + 1).padStart(2, "0")}</span><span className="at">{c.tab}</span>
            </li>
          ))}
        </ul>
        <div className="astage">
          {CARDS.map((c, i) => <CardView key={c.tab} c={c} on={i === open} />)}
        </div>
      </div>
      <div className="astack">
        {CARDS.map((c) => <CardView key={c.tab} c={c} />)}
      </div>
    </>
  )
}

// Verbatim from the canonical bank (primary-id-bank.json v2.2): question text,
// option labels and point values are the bank's. The bank outranks every other
// source; do not reword or re-score. It cannot resume into /primary-id/ yet, and
// that is deliberate: see "Membership form into the Primary iD" in the project.
const DIMS: [string, string][] = [
  ["Oral health", "var(--d-oral)"], ["Sleep & airway", "var(--d-sleep)"], ["Nutrition", "var(--d-nutrition)"],
  ["Family history", "var(--d-family)"], ["Longevity", "var(--d-longevity)"],
]
const QS: { id: string; dim: number; label: string; q: string; a: [string, number][] }[] = [
  { id: "oral_smile", dim: 0, label: "Oral health", q: "How confident do you feel about your smile?",
    a: [["Very confident", 92], ["Somewhat", 72], ["Not very", 50], ["Not at all", 32]] },
  { id: "oral_bleeding", dim: 0, label: "Oral health", q: "Do your gums bleed when you brush or floss?",
    a: [["No", 90], ["Yes", 40]] },
  { id: "sleep_tired", dim: 1, label: "Sleep & airway", q: "Do you often feel tired or sleepy during the day?",
    a: [["No", 85], ["Yes", 48]] },
]
const mean = (a: number[]) => (a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : null)
const emptyScores = (): number[][] => [[], [], [], [], []]

function IdPreview() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<number[][]>(emptyScores)
  // Each answer is held against its bank id, ready for the resume work to hand on.
  const [, setAnswers] = useState<Record<string, string>>({})

  const dimVals = scores.map(mean)
  const composite = mean(dimVals.filter((v): v is number => v !== null))
  const answered = scores.reduce((n, s) => n + s.length, 0)
  const done = step >= QS.length
  const sub = answered === 0 ? "Answer the first question to begin."
    : !done ? `${answered === 1 ? "One of forty questions in. " : "Two of forty questions in. "}${QS.length - step === 1 ? "One more question." : "Two more questions."}`
    : "Three of forty in. Two dimensions have something in them, three are still empty."

  const answer = (label: string, value: number) => {
    const q = QS[step]
    setScores((s) => s.map((d, i) => (i === q.dim ? [...d, value] : d)))
    setAnswers((a) => ({ ...a, [q.id]: label }))
    setStep(step + 1)
  }
  const back = () => {
    if (step === 0) return
    const q = QS[step - 1]
    setScores((s) => s.map((d, i) => (i === q.dim ? d.slice(0, -1) : d)))
    setAnswers((a) => { const n = { ...a }; delete n[q.id]; return n })
    setStep(step - 1)
  }
  const restart = () => { setStep(0); setScores(emptyScores()); setAnswers({}) }
  const q = QS[step]

  return (
    <div className="idwrap">
      <div>
        <div className="qzone">
          {done ? (
            <>
              <div className="qstep">Done · three of forty</div>
              <div className="qtext">That is two dimensions, barely started.</div>
              <p className="sdek" style={{ marginTop: 18, maxWidth: "46ch" }}>The full Primary iD is forty questions across all five, and it takes about four minutes. Your dentist reads it before they meet you.</p>
              <div className="qbar">
                <div className="dashes"><i className="on" /><i className="on" /><i className="on" /></div>
                <button type="button" className="qback" onClick={restart}>← Start again</button>
              </div>
            </>
          ) : (
            <>
              <div className="qstep">0{step + 1} / 03 · {q.label}</div>
              <div className="qtext">{q.q}</div>
              <div className="opts">
                {q.a.map(([label, v]) => (
                  <button key={label} type="button" className="opt" onClick={() => answer(label, v)}><span className="ring" />{label}</button>
                ))}
              </div>
              <div className="qbar">
                <div className="dashes">{[0, 1, 2].map((i) => <i key={i} className={i <= step ? "on" : ""} />)}</div>
                <button type="button" className="qback" hidden={step === 0} onClick={back}>← Back</button>
              </div>
            </>
          )}
        </div>
        <noscript dangerouslySetInnerHTML={{ __html:
          `<ol class="sdek">${QS.map((x) => `<li>${x.q}</li>`).join("")}</ol><p class="sdek"><a href="${ID_HREF}">Build your Primary iD</a></p>` }} />
      </div>
      <div>
        <div className="idcard">
          <div className="idhead"><span className="lg">Primary <i>iD</i></span><span className="st">{done ? "Preview · incomplete" : "Preview"}</span></div>
          {/* No data shows an em dash, never a zero: a zero reads as a bad score. */}
          <div className="idscore"><span>{composite === null ? "—" : composite}</span><em> / 100</em></div>
          <div className="idsub">{sub}</div>
          <div className="dims">
            {DIMS.map(([name, color], i) => {
              const v = dimVals[i]
              return (
                <div key={name} className={`drow${v !== null ? " has" : ""}`}>
                  <div className="dl"><span className="dd" style={v !== null ? { background: color } : undefined} />{name}<span className="dv">{v === null ? "—" : v}</span></div>
                  <div className="dbar"><i style={{ background: color, width: v === null ? 0 : `${v}%` }} /></div>
                </div>
              )
            })}
          </div>
          <div className={`iddone${done ? " on" : ""}`}>
            <a className="pill solid" href={ID_HREF} style={{ fontSize: 13.5, padding: "11px 22px" }}>Build the whole thing · about four minutes</a>
          </div>
        </div>
        <p className="idfoot">A preview built from three of forty questions.<br />Directional, not a diagnosis, and not a measure of biological age. Not your finished score.</p>
      </div>
    </div>
  )
}

// The card tilts toward the pointer and the halo drifts the other way. Nothing
// moves on its own. Off under reduced motion and on anything without real hover.
function useCardTilt() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const w = ref.current
    if (!w) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!window.matchMedia("(hover: hover)").matches) return
    let raf = 0, tx = 0, ty = 0
    const apply = () => {
      raf = 0
      w.style.setProperty("--ry", `${(tx * 11).toFixed(2)}deg`)
      w.style.setProperty("--rx", `${(-ty * 9).toFixed(2)}deg`)
      w.style.setProperty("--ty", "-10px")
      w.style.setProperty("--hx", `${(-tx * 52).toFixed(1)}px`)
      w.style.setProperty("--hy", `${(-ty * 40).toFixed(1)}px`)
      w.style.setProperty("--hs", "1.09")
      w.style.setProperty("--hr", `${(tx * 16).toFixed(1)}deg`)
    }
    const move = (e: PointerEvent) => {
      const r = w.getBoundingClientRect()
      tx = (e.clientX - r.left) / r.width - 0.5
      ty = (e.clientY - r.top) / r.height - 0.5
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const leave = () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0 }
      for (const k of ["--ry", "--rx", "--ty", "--hx", "--hy", "--hs", "--hr"]) w.style.removeProperty(k)
    }
    w.addEventListener("pointermove", move)
    w.addEventListener("pointerleave", leave)
    return () => {
      w.removeEventListener("pointermove", move)
      w.removeEventListener("pointerleave", leave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return ref
}

export default function MembershipPage() {
  const tilt = useCardTilt()
  return (
    <>
      <SiteHeader />
      <div className="pm">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        {/* Without JavaScript the accordion cannot open, so show every card and hide the question buttons. */}
        <noscript dangerouslySetInnerHTML={{ __html:
          "<style>.pm .astack{display:grid}.pm .astage,.pm .alist,.pm .shint,.pm .qzone{display:none}</style>" }} />

        {/* The hero bleeds to the viewport and clips there, with room above it, so
            the halo wraps all four sides of the card. Do not move this clip inward. */}
        <div className="herobleed"><div className="wrap">
          <div className="hero"><div className="herogrid">
            <div>
              <div className="eyebrow">The Primary iD founding membership</div>
              <h1 style={{ marginTop: 20 }}>Everything your insurance <br />was never built to pay for.</h1>
              <p className="lede">Most people only see a dentist once something already hurts. This is the other version: the bacteria cleared before they settle in, decay found while it is still a millimetre, and the whole picture looked at again every year. <span className="em">Before anything goes wrong, not after.</span></p>
              <div className="pills"><a className="pill solid" href="#join">Join the founding membership</a><a className="pill ghost" href={ID_HREF}>Build your Primary iD</a></div>
            </div>
            <div className="mwrap" ref={tilt}><aside className="mcard">
              <div className="mhead"><span className="t">The <em>founding</em> membership</span><span className="loc">Brentwood</span></div>
              <div className="mprice">$499<em> / year</em></div>
              <p className="msub">One plan. Insured or not.</p>
              <div className="mlab">Included every year</div>
              <div className="mrows">
                <div className="mrow"><span>Unlimited cleanings and exams</span><b>$1,125</b></div>
                <div className="mrow"><span>A 3D scan of both jaws (CBCT)</span><b>$500</b></div>
                <div className="mrow"><span>Whitening in the chair, both arches</span><b>$450</b></div>
                <div className="mrow"><span>Oral cancer and sleep screening</span><b>$225</b></div>
                <div className="mrow"><span>Ozone, nitrous and x-rays</span><b>$624</b></div>
                <div className="mrow"><span>The longevity consultation</span><b>$195</b></div>
                <div className="mrow tot"><span>At our regular fees</span><b>$3,119</b></div>
              </div>
              <div className="mlab">And all year</div>
              <ul className="mlist">
                <li>Member pricing on everything, no annual maximum</li>
                <li>Your Primary iD, re-scored every year and read at every visit</li>
              </ul>
              <a className="mmore" href="#arith">See everything included →</a>
              <p className="mfine">Prices are Primary&rsquo;s regularly charged self-pay fees. Membership is not insurance.</p>
            </aside></div>
          </div></div>
        </div></div>

        <div className="wrap">
          <section style={{ borderTop: 0, marginTop: 34 }}>
            <div className="eyebrow">Eight ways in</div>
            <div className="shead">
              <h2>One membership.<br />Nobody uses it <span className="em">the same way.</span></h2>
              <span className="shint">Rest on the one that sounds like you ↗</span>
            </div>
            <Accordion />
          </section>

          {FILM && (
            <section className="film">
              <div className="eyebrow">The membership in ninety seconds</div>
              <h2 style={{ marginTop: 18 }}>Watch a year of membership, <span className="em">start to finish.</span></h2>
              <div className="filmframe">
                <video controls playsInline preload="none" poster={FILM.poster} src={FILM.src}>
                  {FILM.captions && <track kind="captions" srcLang="en" label="English" src={FILM.captions} />}
                  Your browser cannot play this video. <a href="#arith">Read what is included instead.</a>
                </video>
              </div>
              <p className="filmcap"><span className="dur">1:28</span></p>
            </section>
          )}

          <section id="arith">
            <div className="eyebrow">The arithmetic</div>
            <h2 style={{ marginTop: 18 }}>Eight things included, with our own fee beside each one.</h2>
            <p className="sdek">These are the fees we charge a patient who is not a member, so you can do the arithmetic yourself rather than take our word for it.</p>
            <div className="stack">
              <div className="srow head"><span>What you get</span><span>Our regular fee</span><span>You pay</span></div>
              {INC.map(([name, x, fee]) => (
                <div key={name} className="srow"><span className="sname">{name}</span><span className="sfee">{x && <>{x}<br /></>}{fee}</span><span className="syou">Included</span></div>
              ))}
              <div className="srow tot"><span className="sname">All of it, for a year</span><span className="sfee">$3,119</span><span className="syou">$499</span></div>
            </div>
            <p className="tnote">The $3,119 is what the included services would cost at our regular fees if all of them were used in one year. What you actually use is a clinical decision made with your dentist.</p>
          </section>

          <div className="gate">
            <div className="eyebrow">Why any of this matters</div>
            <h2>Your smile, the gateway to <span className="em">beauty, wellbeing and longevity.</span></h2>
            <p>Your teeth, the rest of your body and how well you age are one decision, not three. Almost everyone makes them separately, on faith, with no way to judge what they are being told. Your Primary iD is the thing that holds all of it in one place.</p>
          </div>

          <section id="idsec">
            <div className="eyebrow">Three questions</div>
            <h2 style={{ marginTop: 18 }}>It starts <span className="em">right here.</span></h2>
            <p className="sdek">No sign-up, no form, nothing to download. Answer three and watch your Primary iD begin to exist on the right, then keep going if you want the rest of it.</p>
            <IdPreview />
          </section>

          <section>
            <div className="eyebrow">The alternatives</div>
            <h2 style={{ marginTop: 18 }}>Nobody else is <span className="em">looking here.</span></h2>
            <p className="sdek">Longevity clinics run tens of thousands of dollars a year and mostly do not examine the mouth at all. Your dentist looks, but stops at the teeth. An at-home panel reads your blood and then leaves you with a PDF.</p>
            <div className="cmpwrap"><div className="cmpscroll"><table className="cmp">
              <thead><tr><th /><th className="us">Primary iD</th><th>Your dentist</th><th>At-home panels</th><th>Longevity clinics</th></tr></thead>
              <tbody>
                {ALT.map(([lbl, a, ah, b, bh, c, ch]) => (
                  <tr key={lbl}>
                    <td className="lbl">{lbl}</td><td className="us">Yes</td>
                    <td className={`alt${ah ? " has" : ""}`}>{a}</td><td className={`alt${bh ? " has" : ""}`}>{b}</td><td className={`alt${ch ? " has" : ""}`}>{c}</td>
                  </tr>
                ))}
                <tr className="price"><td className="lbl">Price</td><td className="us">$499 a year</td><td className="alt">Insurance plus co-pays</td><td className="alt">$100 to $1,000 each</td><td className="alt">$15,000 to $100,000 a year</td></tr>
              </tbody>
            </table></div></div>
            <p className="cmpnote">Where another option genuinely does something well, it says so. Your own dentist examines your mouth and knows you, and a longevity clinic does track you properly over time. What none of them do is read the two against each other.</p>
          </section>

          <section>
            <div className="eyebrow">Everything else</div>
            <h2 style={{ marginTop: 18 }}>Member pricing, published before you need it.</h2>
            <p className="sdek">Every rate comes off the regular fee we charge a patient who is not a member. It applies for as long as your membership is active and it is for members only. Your price is confirmed in writing before anything is scheduled.</p>
            <div className="rtab">
              {RATES.map(([name, sub, rate]) => (
                <div key={name} className="rrow"><span>{name}{sub && <em>{sub}</em>}</span><b>{rate}</b></div>
              ))}
            </div>
            <div className="nocap"><b>And no annual maximum.</b> Most dental plans stop paying somewhere around $1,500 a year. Member pricing does not stop.</div>
          </section>

          <section>
            <div className="eyebrow">If you already have insurance</div>
            <h2 style={{ marginTop: 18 }}>Not instead of your plan. The part your plan does not do.</h2>
            <p className="sdek">We bill your insurance first, every time. The membership sits on top of it and covers what no dental plan covers at any price.</p>
            <div className="ins">
              <div className="ic"><h3>What a typical plan does</h3><ul>
                <li>Pays for <b>two</b> cleanings a year</li><li>Stops paying around <b>$1,500</b></li>
                <li>Pays a fraction of the fee on everything else</li>
                <li>Pays <b>nothing</b> toward the scan, whitening, ozone, nitrous or the longevity consultation</li>
                <li>Costs you a premium every month regardless</li>
              </ul></div>
              <div className="ic hi"><h3>What the membership adds</h3><ul>
                <li>Cleanings <b>as often as your mouth needs them</b></li><li><b>No ceiling</b> on member pricing</li>
                <li>All eight included things, <b>at no extra charge</b></li>
                <li>Your Primary iD, which no plan has heard of</li>
                <li>One fee, once a year</li>
              </ul></div>
            </div>
            <p className="sdek" style={{ marginTop: 24 }}>Bring your plan to your first visit and we will set the two side by side on paper. For some of our patients the membership turns out to be worth more than the policy they are already paying for. That is your decision, and you get the arithmetic either way.</p>
          </section>

          <div id="join" className="close">
            <h2>One fee. One plan. Everybody gets the same one.</h2>
            <p>$499 for the year. Insured or not, there is nothing better to upgrade to.</p>
            <div className="pills">
              <a className="pill light" href={JOIN_HREF}>Join the founding membership</a>
              <a className="pill ghost" style={{ color: "#fff", background: "transparent", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.45)" }} href={ID_HREF}>Build your Primary iD</a>
            </div>
          </div>

          <div className="fine">
            <p><b>About these prices.</b> Every fee shown is the regular fee Primary Integrative Dentistry charges a patient who is not a member. Member rates and included services apply only to members, for as long as the membership is active, and your price is confirmed in writing before anything is scheduled. The $3,119 is what the included services would cost at our regular fees if all of them were used in one year.</p>
            <p><b>What it is not.</b> Not insurance, not a dental plan, and it does not pay for treatment. Treatment, laboratory fees and diagnostic panels are charged separately at member rates. Primary evaluates your bite, gums, oral health and relevant sleep or airway history before recommending treatment.</p>
            <p><b>Cleanings, ozone and nitrous.</b> The cleaning interval is a clinical decision made for each patient. For most people that is three visits a year. Ozone and nitrous are included wherever they are clinically indicated.</p>
            <p><b>Your Primary iD.</b> Directional, not a diagnosis, and not a measure of biological age. Primary Integrative Dentistry, 11980 San Vicente Blvd, Suite 902, Los Angeles CA 90049. Founded by Dr. Tzur Gabi, DMD, prosthodontist.</p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}

// From the reference page's stylesheet, every selector prefixed with .pm so it
// cannot leak into the site shell. Tokens sit on .pm rather than :root because
// globals.css already owns --muted, which the shell's Tailwind colours read.
const CSS = `.pm{--navy:#0E2240;--navy-deep:#07142A;--blue:#24A7E0;--blue-soft:#5BC0EC;--cream:#FAF8F5;--warm:#FEFCF9;--ink:#121a2b;--ink-soft:#3a4a66;--muted:#7A8695;--line:rgba(14,34,64,.12);--line-soft:rgba(14,34,64,.06);--d-oral:#D4B584;--d-sleep:#7B68EE;--d-nutrition:#48C28C;--d-family:#E8985E;--d-longevity:#D97757;--r-chip:8px;--r-card:16px;--r-panel:24px;--r-pill:999px;--display:Georgia,"Times New Roman",serif;--sans:var(--font-inter),Inter,"Geist Variable",system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif;--serif:Georgia,"Times New Roman",serif;--mono:var(--font-jetbrains),"JetBrains Mono",ui-monospace,Menlo,monospace;--gx:max(22px,env(safe-area-inset-left,0px));--gxr:max(22px,env(safe-area-inset-right,0px));display:flow-root;color:var(--ink-soft);font-family:var(--sans);font-size:17px;line-height:1.62;background:linear-gradient(165deg,#FCFBF9 0%,#F8F9FC 38%,#EEF3F9 72%,#F6F4F1 100%);background-attachment:fixed;padding-bottom:max(48px,env(safe-area-inset-bottom,0px))}
.pm,.pm *{box-sizing:border-box}
.pm [id]{scroll-margin-top:84px}
.pm .wrap{max-width:1120px; margin:0 auto; padding-left:var(--gx); padding-right:var(--gxr)}
.pm h1,.pm h2,.pm h3,.pm h4{font-family:var(--display); font-weight:400; color:var(--ink); margin:0}
.pm h1{font-size:clamp(34px,4.7vw,58px); letter-spacing:-.02em; line-height:1.05}
.pm h2{font-size:clamp(29px,3.6vw,46px); letter-spacing:-.02em; line-height:1.06}
.pm h3{font-size:21px; letter-spacing:-.015em; line-height:1.22}
.pm p{margin:0}
.pm .em{font-family:var(--serif); font-style:italic; color:var(--blue)}
.pm .eyebrow{font-family:var(--sans); font-weight:600; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--blue); display:flex; align-items:center; gap:12px}
.pm .eyebrow::before{content:""; width:26px; height:1px; background:var(--blue); display:block; flex:0 0 26px}
.pm .num{font-family:var(--serif); font-variant-numeric:lining-nums tabular-nums}
.pm .film{margin-top:30px}
.pm .filmframe{position:relative; margin-top:30px; border-radius:var(--r-panel); overflow:hidden; background:linear-gradient(150deg,#15305A 0%,#0E2240 55%,#07142A 100%); box-shadow:0 26px 60px rgba(14,34,64,.16); aspect-ratio:16/9}
.pm .filmframe video{display:block; width:100%; height:100%; object-fit:cover; background:#07142A}
.pm .filmcap{margin-top:16px; display:flex; gap:18px; flex-wrap:wrap; align-items:baseline; font-size:14px; color:var(--muted)}
.pm .filmcap .dur{font-family:var(--mono); font-size:11.5px}
.pm .pill{display:inline-block; font-family:var(--sans); font-weight:600; font-size:14px; letter-spacing:.01em; padding:12px 24px; border-radius:var(--r-pill); text-decoration:none; border:0; cursor:pointer}
.pm .pill.solid{background:var(--navy); color:#fff}
.pm .pill.ghost{background:rgba(255,255,255,.7); color:var(--ink); box-shadow:inset 0 0 0 1.5px var(--navy)}
.pm .pill.light{background:#fff; color:var(--navy)}
.pm .pills{display:flex; gap:12px; flex-wrap:wrap; margin-top:32px}
.pm .herobleed{overflow:hidden; margin-top:-90px; padding-top:90px}
.pm .hero{padding:84px 0 10px}
.pm .herogrid{display:grid; gap:40px}
@media(min-width:980px){.pm .herogrid{grid-template-columns:1.06fr .94fr; gap:64px; align-items:start}}
.pm .hero .lede{margin:26px 0 0; max-width:48ch; font-size:18px}
.pm .mwrap{position:relative}
.pm .mwrap::before{content:""; position:absolute; inset:-16% -19%; border-radius:50%; z-index:0; pointer-events:none; background: radial-gradient(36% 34% at 20% 16%, rgba(212,181,132,.64), transparent 68%), radial-gradient(32% 32% at 82% 14%, rgba(123,104,238,.50), transparent 68%), radial-gradient(38% 38% at 92% 58%, rgba(72,194,140,.48), transparent 68%), radial-gradient(34% 34% at 54% 96%, rgba(232,152,94,.52), transparent 68%), radial-gradient(32% 32% at 8% 76%, rgba(217,119,87,.46), transparent 68%); filter:blur(42px); opacity:.78; transform:translate(var(--hx,0px),var(--hy,0px)) scale(var(--hs,1)) rotate(var(--hr,0deg)); transition:opacity .6s ease, transform .55s cubic-bezier(.22,.9,.3,1);}
.pm .mwrap:hover::before{opacity:1}
.pm .mcard{position:relative; z-index:1; background:#FEFDFB; border:1px solid rgba(255,255,255,.9); border-radius:var(--r-panel); padding:26px 28px 22px; box-shadow:0 20px 48px rgba(14,34,64,.10); transform:perspective(1200px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(var(--ty,0px)); transform-style:preserve-3d; transition:transform .5s cubic-bezier(.22,.9,.3,1), box-shadow .5s ease}
.pm .mwrap:hover .mcard{box-shadow:0 36px 74px rgba(14,34,64,.17)}
.pm .mprice{transition:transform .55s cubic-bezier(.3,1.5,.5,1)}
.pm .mwrap:hover .mprice{transform:translateZ(26px) scale(1.015)}
.pm .mhead,.pm .msub{transition:transform .55s cubic-bezier(.3,1.3,.5,1)}
.pm .mwrap:hover .mhead{transform:translateZ(16px)}
.pm .mwrap:hover .msub{transform:translateZ(10px)}
.pm .mrow.tot b{transition:transform .55s cubic-bezier(.3,1.6,.5,1)}
.pm .mwrap:hover .mrow.tot b{transform:scale(1.07)}
.pm .mlist li::before{transition:transform .5s cubic-bezier(.3,1.7,.5,1)}
.pm .mwrap:hover .mlist li::before{transform:scale(1.45)}
.pm .mwrap:hover .mlist li:nth-child(2)::before{transition-delay:.07s}
.pm .mhead{display:flex; align-items:baseline; gap:16px}
.pm .mhead .t{font-family:var(--display); font-size:24px; letter-spacing:-.02em; color:var(--ink)}
.pm .mhead .t em{font-style:italic; color:var(--blue)}
.pm .mhead .loc{margin-left:auto; font-family:var(--sans); font-size:10px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:var(--muted)}
.pm .mprice{font-family:var(--serif); font-variant-numeric:lining-nums tabular-nums; font-size:clamp(54px,5.6vw,64px); line-height:.9; color:var(--ink); margin-top:10px}
.pm .mprice em{font-style:italic; font-size:23px; color:var(--muted); letter-spacing:-.01em}
.pm .msub{margin-top:8px; font-size:15px; color:var(--muted)}
.pm .mlab{font-family:var(--sans); font-size:10px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); margin-top:20px}
.pm .mrows{margin-top:6px}
.pm .mrow{display:flex; align-items:baseline; gap:18px; padding:9px 0; border-bottom:1px solid var(--line-soft)}
.pm .mrow span{color:var(--ink); font-size:15.5px; line-height:1.35}
.pm .mrow b{margin-left:auto; font-family:var(--serif); font-variant-numeric:lining-nums tabular-nums; font-weight:400; font-size:15.5px; color:var(--muted); white-space:nowrap}
.pm .mrow.tot{border-bottom:0; border-top:1px solid var(--line); padding-top:12px}
.pm .mrow.tot span{font-family:var(--sans); font-weight:600; font-size:14px}
.pm .mrow.tot b{color:var(--ink); font-size:21px}
.pm .mlist{list-style:none; padding:0; margin:6px 0 0}
.pm .mlist li{position:relative; padding:9px 0 9px 22px; font-size:15.5px; line-height:1.4; color:var(--ink); border-bottom:1px solid var(--line-soft)}
.pm .mlist li:last-child{border-bottom:0}
.pm .mlist li::before{content:""; position:absolute; left:2px; top:16px; width:7px; height:7px; border-radius:var(--r-pill); background:var(--blue)}
.pm .mmore{display:inline-block; margin-top:15px; font-family:var(--sans); font-size:15px; font-weight:600; color:var(--blue); text-decoration:none; transition:transform .35s cubic-bezier(.3,1.2,.4,1)}
.pm .mmore{min-height:44px;display:inline-flex;align-items:center}
.pm h1 br{display:none}
.pm h1{text-wrap:balance}
.pm .mmore:hover{transform:translateX(4px)}
.pm .mfine{margin-top:15px; padding-top:13px; border-top:1px solid var(--line); font-size:12.5px; line-height:1.6; color:var(--muted)}
@media (prefers-reduced-motion:reduce){.pm .mwrap::before,.pm .mcard,.pm .mmore,.pm .mprice,.pm .mhead,.pm .msub,.pm .mrow.tot b,.pm .mlist li::before{transition:none}.pm .mwrap::before{transform:none}.pm .mcard{transform:none}.pm .mwrap:hover .mprice,.pm .mwrap:hover .mhead,.pm .mwrap:hover .msub,.pm .mwrap:hover .mrow.tot b,.pm .mwrap:hover .mlist li::before{transform:none}}
.pm section{padding:84px 0 0; border-top:1px solid var(--line-soft); margin-top:76px}
.pm .shead{display:flex; align-items:flex-end; gap:24px; flex-wrap:wrap}
.pm .shead h2{flex:1; min-width:300px; margin-top:18px}
.pm .shint{font-size:14px; color:var(--muted); padding-bottom:6px}
.pm .sdek{margin:18px 0 0; max-width:62ch}
.pm .acc{display:grid; gap:26px; margin-top:40px}
@media(min-width:960px){.pm .acc{grid-template-columns:minmax(300px,.82fr) 1.18fr; gap:52px; align-items:start}}
.pm .alist{list-style:none; margin:0; padding:0}
.pm .arow{position:relative; display:flex; gap:18px; align-items:baseline; cursor:pointer; padding:17px 10px 17px 20px; border-bottom:1px solid var(--line-soft); transition:background .3s ease}
.pm .arow:first-child{border-top:1px solid var(--line-soft)}
.pm .arow::before{content:""; position:absolute; left:0; top:8px; bottom:8px; width:2px; background:var(--blue); border-radius:var(--r-pill); opacity:0; transform:scaleY(.4); transform-origin:center; transition:opacity .34s ease, transform .34s cubic-bezier(.3,1.15,.4,1)}
.pm .arow.on::before{opacity:1; transform:scaleY(1)}
.pm .arow .an{font-family:var(--mono); font-size:11.5px; color:var(--muted); flex:0 0 auto; transition:color .3s ease}
.pm .arow .at{font-family:var(--display); font-size:19.5px; letter-spacing:-.015em; color:var(--muted); line-height:1.24; transition:color .3s ease}
.pm .arow:hover .at{color:var(--ink-soft)}
.pm .arow.on .at{color:var(--ink)}
.pm .arow.on .an{color:var(--blue)}
.pm .arow:focus-visible{outline:2px solid var(--blue); outline-offset:3px; border-radius:var(--r-chip)}
.pm .astage{position:relative; min-height:560px}
@media(max-width:959px){.pm .astage{display:none}}
.pm .acard{position:absolute; inset:0; border-radius:var(--r-panel); overflow:hidden; border:1px solid rgba(255,255,255,.9); box-shadow:0 26px 60px rgba(14,34,64,.09); display:flex; flex-direction:column; padding:30px 34px 34px; opacity:0; visibility:hidden; transform:translateY(10px); transition:opacity .42s ease, transform .42s cubic-bezier(.3,1.08,.4,1), visibility .42s}
.pm .acard.on{opacity:1; visibility:visible; transform:none}
.pm .astack{display:grid; gap:16px; margin-top:28px}
@media(min-width:960px){.pm .astack{display:none}}
.pm .astack .acard{position:static; opacity:1; visibility:visible; transform:none; min-height:430px}
.pm .ctop{display:flex; align-items:center; gap:14px}
.pm .chip{display:inline-flex; align-items:center; background:rgba(255,255,255,.92); border-radius:var(--r-pill); padding:7px 15px; font-family:var(--sans); font-size:10px; font-weight:600; letter-spacing:.14em; text-transform:uppercase}
.pm .ctile{margin-left:auto; width:46px; height:46px; border-radius:var(--r-chip); background:rgba(255,255,255,.92); display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(14,34,64,.07)}
.pm .ctile svg{width:21px; height:21px; display:block}
.pm .cfive{display:flex; gap:3px; align-items:center}
.pm .cfive i{display:block; width:7px; height:7px; border-radius:var(--r-pill)}
.pm .cbody{margin-top:auto}
.pm .acard h3{font-size:clamp(28px,2.9vw,38px); line-height:1.08; letter-spacing:-.022em; max-width:17ch}
.pm .acard h3 em{font-style:italic}
.pm .acard .cp{margin-top:16px; max-width:48ch; font-size:16.5px; line-height:1.58; color:var(--ink-soft)}
.pm .marks{display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:28px; padding-top:22px; border-top:1px solid rgba(14,34,64,.1)}
@media(max-width:560px){.pm .marks{grid-template-columns:1fr 1fr}}
.pm .mk svg{display:block; width:22px; height:22px; margin-bottom:10px; color:var(--navy); transition:transform .42s cubic-bezier(.3,1.4,.5,1)}
.pm .mk:hover svg{transform:translateY(-5px) scale(1.12)}
.pm .mk b{font-family:var(--sans); font-size:13px; font-weight:600; letter-spacing:-.005em; line-height:1.3; display:block; color:var(--ink)}
.pm .cfoot{margin-top:20px; display:flex; gap:14px; flex-wrap:wrap; align-items:baseline; font-size:14.5px}
.pm .cfoot b{font-family:var(--sans); font-weight:600; font-size:13.5px; color:var(--ink)}
.pm .cfoot .fee{margin-left:auto; font-family:var(--mono); font-size:11px; color:var(--muted)}
.pm .acard.dark{border-color:transparent; color:rgba(255,255,255,.82)}
.pm .acard.dark h3{color:#fff}
.pm .acard.dark .cp{color:rgba(255,255,255,.78)}
.pm .acard.dark .marks{border-top-color:rgba(255,255,255,.22)}
.pm .acard.dark .mk svg{color:var(--blue-soft)}
.pm .acard.dark .mk b{color:#fff}
.pm .acard.dark .cfoot b{color:#fff}
.pm .acard.dark .cfoot .fee{color:rgba(255,255,255,.55)}
.pm .acard.dark .chip,.pm .acard.dark .ctile{background:rgba(255,255,255,.14)}
.pm .gate{margin-top:76px; padding:92px 0 0; border-top:1px solid var(--line-soft); text-align:center}
.pm .gate h2{font-size:clamp(32px,5vw,62px); line-height:1.04; max-width:16ch; margin:22px auto 0}
.pm .gate .eyebrow{justify-content:center}
.pm .gate p{margin:26px auto 0; max-width:56ch}
.pm .idwrap{display:grid; gap:34px; margin-top:44px}
@media(min-width:960px){.pm .idwrap{grid-template-columns:1.02fr .98fr; gap:56px; align-items:start}}
.pm .qstep{font-family:var(--mono); font-size:11.5px; letter-spacing:.08em; color:var(--d-sleep); text-transform:uppercase}
.pm .qtext{font-family:var(--display); font-size:clamp(25px,2.9vw,36px); line-height:1.1; letter-spacing:-.02em; color:var(--ink); margin-top:14px; max-width:19ch}
.pm .opts{margin-top:28px; display:grid; gap:11px; max-width:460px}
.pm .opt{display:flex; align-items:center; gap:14px; background:rgba(255,255,255,.72); border:1px solid var(--line-soft); border-radius:var(--r-pill); padding:15px 22px; cursor:pointer; font-size:16px; color:var(--ink); text-align:left; width:100%; font-family:var(--sans); transition:background .25s ease, border-color .25s ease, transform .25s ease}
.pm .opt:hover{background:#fff; border-color:rgba(36,167,224,.45); transform:translateX(3px)}
.pm .opt .ring{width:17px; height:17px; border-radius:var(--r-pill); border:1.5px solid rgba(14,34,64,.28); flex:0 0 17px; display:block}
.pm .opt:hover .ring{border-color:var(--blue)}
.pm .qbar{display:flex; align-items:center; gap:20px; margin-top:30px}
.pm .dashes{display:flex; gap:7px}
.pm .dashes i{display:block; width:34px; height:3px; border-radius:var(--r-pill); background:rgba(14,34,64,.14); transition:background .3s ease}
.pm .dashes i.on{background:var(--blue)}
.pm .qback{background:none; border:0; font-family:var(--sans); font-size:14px; color:var(--muted); cursor:pointer; padding:4px 2px}
.pm .qback:hover{color:var(--ink)}
.pm .qback[hidden]{visibility:hidden; display:inline-block}
.pm .idcard{background:var(--warm); border-radius:var(--r-panel); border:1px solid rgba(255,255,255,.9); box-shadow:0 26px 60px rgba(14,34,64,.1); padding:32px 32px 30px}
.pm .idhead{display:flex; align-items:baseline}
.pm .idhead .lg{font-family:var(--display); font-size:21px; color:var(--ink)}
.pm .idhead .lg i{font-style:italic; color:var(--blue)}
.pm .idhead .st{margin-left:auto; font-family:var(--sans); font-size:10px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--muted)}
.pm .idscore{font-family:var(--serif); font-variant-numeric:lining-nums tabular-nums; font-size:74px; line-height:.92; color:var(--ink); margin-top:26px}
.pm .idscore em{font-style:italic; font-size:26px; color:var(--muted)}
.pm .idsub{margin-top:10px; font-size:15px; color:var(--ink-soft)}
.pm .dims{margin-top:28px; border-top:1px solid var(--line-soft)}
.pm .drow{padding:15px 0 13px; border-bottom:1px solid var(--line-soft)}
.pm .drow .dl{display:flex; align-items:center; gap:10px; font-size:15.5px; color:var(--muted); transition:color .4s ease}
.pm .drow.has .dl{color:var(--ink)}
.pm .drow .dd{width:8px; height:8px; border-radius:var(--r-pill); background:rgba(14,34,64,.18); flex:0 0 8px; transition:background .4s ease}
.pm .drow .dv{margin-left:auto; font-family:var(--serif); font-variant-numeric:lining-nums tabular-nums; font-size:16px; color:var(--muted); transition:color .4s ease}
.pm .drow.has .dv{color:var(--ink)}
.pm .dbar{height:4px; border-radius:var(--r-pill); background:rgba(14,34,64,.07); margin-top:9px; overflow:hidden}
.pm .dbar i{display:block; height:100%; width:0; border-radius:var(--r-pill); transition:width .75s cubic-bezier(.3,1,.35,1)}
.pm .idfoot{margin-top:18px; font-family:var(--mono); font-size:10.5px; line-height:1.7; color:var(--muted)}
.pm .iddone{margin-top:24px; display:none}
.pm .iddone.on{display:block}
.pm .cmpwrap{margin-top:38px; background:rgba(255,255,255,.78); border:1px solid var(--line); border-radius:var(--r-panel); overflow:hidden}
.pm .cmpscroll{overflow-x:auto; -webkit-overflow-scrolling:touch}
.pm .cmp{width:100%; min-width:720px; border-collapse:collapse}
.pm .cmp th,.pm .cmp td{text-align:left; padding:18px 20px; vertical-align:middle}
.pm .cmp thead th{font-family:var(--sans); font-size:10px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); padding-top:26px; padding-bottom:16px; white-space:nowrap}
.pm .cmp thead th.us{color:var(--blue)}
.pm .cmp thead tr{border-bottom:1.5px solid var(--navy)}
.pm .cmp tbody tr{border-bottom:1px solid var(--line-soft)}
.pm .cmp tbody tr:last-child{border-bottom:0}
.pm .cmp td.lbl{color:var(--ink); font-size:16px; min-width:210px}
.pm .cmp td.us,.pm .cmp th.us{background:rgba(36,167,224,.045)}
.pm .cmp td.us{color:var(--ink); font-size:16px; font-weight:500}
.pm .cmp td.alt{color:var(--muted); font-size:16px}
.pm .cmp td.alt.has{color:#3FA97A}
.pm .cmp tr.price td{padding-top:22px; padding-bottom:24px}
.pm .cmp tr.price td.lbl,.pm .cmp tr.price td.us{font-family:var(--sans)}
.pm .cmp tr.price td.us{font-weight:600}
@media(max-width:700px){.pm .cmp td.lbl{position:sticky; left:0; background:#FDFCFA; z-index:2}.pm .cmp thead th:first-child{position:sticky; left:0; background:#FDFCFA; z-index:2}}
.pm .cmpnote{margin-top:16px; font-size:13.5px; color:var(--muted); max-width:72ch}
.pm .stack{margin-top:34px; background:rgba(255,255,255,.72); border:1px solid var(--line); border-radius:var(--r-panel); overflow:hidden}
.pm .srow{display:grid; grid-template-columns:1fr auto 108px; gap:16px; align-items:baseline; padding:15px 26px; border-bottom:1px solid var(--line-soft)}
.pm .srow.head{background:var(--navy); border-bottom:0; padding-top:17px; padding-bottom:17px}
.pm .srow.head span{font-family:var(--sans); font-size:10px; letter-spacing:.14em; text-transform:uppercase; font-weight:600; color:rgba(255,255,255,.72)}
.pm .srow.head span:nth-child(2),.pm .srow.head span:nth-child(3){text-align:right}
.pm .sname{color:var(--ink); font-size:16px}
.pm .sfee{font-family:var(--serif); font-variant-numeric:lining-nums tabular-nums; font-size:16px; color:var(--muted); text-align:right}
.pm .syou{font-family:var(--sans); font-size:11px; font-weight:600; color:#1F7A55; text-align:right; letter-spacing:.08em; text-transform:uppercase}
.pm .srow.tot{background:var(--navy); border-bottom:0; padding-top:19px; padding-bottom:19px}
.pm .srow.tot .sname{font-family:var(--sans); font-size:16.5px; font-weight:600; color:#fff}
.pm .srow.tot .sfee{color:rgba(255,255,255,.62)}
.pm .srow.tot .syou{font-family:var(--serif); font-size:26px; color:#fff; letter-spacing:0; text-transform:none}
@media(max-width:620px){.pm .srow{grid-template-columns:1fr auto; row-gap:4px; padding:14px 20px}.pm .srow span:nth-child(3){grid-column:2; text-align:right}.pm .srow.head span:nth-child(3){display:none}}
.pm .tnote{margin-top:16px; font-size:14px; color:var(--muted); max-width:70ch}
.pm .rtab{margin-top:34px; background:rgba(255,255,255,.72); border:1px solid var(--line); border-radius:var(--r-panel); padding:8px 26px}
.pm .rrow{display:flex; gap:20px; align-items:baseline; justify-content:space-between; padding:15px 0; border-bottom:1px solid var(--line-soft)}
.pm .rrow:last-child{border-bottom:0}
.pm .rrow span{color:var(--ink); font-size:16px}
.pm .rrow em{font-style:normal; color:var(--muted); font-size:13.5px; display:block; margin-top:2px}
.pm .rrow b{font-family:var(--sans); font-size:15px; font-weight:600; white-space:nowrap; color:var(--ink)}
.pm .nocap{margin-top:22px; background:var(--navy); color:rgba(255,255,255,.78); border-radius:var(--r-panel); padding:26px 28px; font-size:16px}
.pm .nocap b{color:#fff; font-weight:600}
.pm .ins{display:grid; gap:18px; margin-top:34px}
@media(min-width:800px){.pm .ins{grid-template-columns:1fr 1fr}}
.pm .ic{background:rgba(255,255,255,.72); border:1px solid var(--line); border-radius:var(--r-panel); padding:30px}
.pm .ic.hi{background:var(--navy); border-color:transparent; color:rgba(255,255,255,.80)}
.pm .ic.hi h3{color:#fff}
.pm .ic ul{list-style:none; padding:0; margin:18px 0 0}
.pm .ic li{position:relative; padding-left:24px; margin-top:11px; font-size:15.5px}
.pm .ic li::before{content:""; position:absolute; left:3px; top:9px; width:7px; height:7px; border-radius:var(--r-pill); background:rgba(14,34,64,.2)}
.pm .ic.hi li::before{background:var(--blue-soft)}
.pm .ic li b{color:var(--ink); font-weight:600}
.pm .ic.hi li b{color:#fff}
.pm .close{margin-top:84px; background:var(--navy-deep); border-radius:var(--r-panel); padding:72px 28px; text-align:center; color:rgba(255,255,255,.76)}
.pm .close h2{color:#fff; max-width:19ch; margin:0 auto}
.pm .close p{margin:22px auto 0; max-width:50ch}
.pm .close .pills{justify-content:center}
.pm .fine{margin-top:62px; padding-top:28px; border-top:1px solid var(--line); font-size:13px; color:var(--muted); max-width:80ch}
.pm .fine p{margin-top:12px}
.pm .fine b{color:var(--ink-soft)}
@media (prefers-reduced-motion:reduce){.pm .acard,.pm .arow,.pm .arow::before,.pm .opt,.pm .dbar i,.pm .mk svg,.pm .drow .dl,.pm .drow .dv,.pm .drow .dd{transition:none}}
`
