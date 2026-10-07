import Link from "next/link"
import { ScholarshipYear } from "@/components/scholarship-year"

// ─────────────────────────────────────────────────────────────────────────
// "The scholarship and the membership": the two panels that close the cost
// section of /dental-implant/.
//
// Both panels are drawn from the same fact: twelve months. The scholarship is
// one a month. The membership is a twelve-month term, paid in one part, four
// parts or twelve. So each panel opens with twelve marks, and the reader sees
// what the thing is before reading a word about it.
//
// Colour, each with one job:
//   sand   (the gold family)  something given: the scholarship
//   sky    (the blue family)  something you hold: the membership
//   white  appears only where a number is written down
// The grounds are kept pale. Navy stays on type and on the one solid button
// in the section above.
//
// The membership rows are written as the thing, then what it is for. The
// price always sits beside what is and is not included, and the panel says it
// is not insurance.
//
// The pay switch is three radio buttons and CSS. No JavaScript: it works
// before the page hydrates and in the static mock.
//
// Motion: when the pay switch changes, the same twelve cells part into four
// groups or twelve. They move apart quickly and settle (500ms, no overshoot);
// the figure changes faster than the bar so the number is never mid-change
// while the eye is on it. With reduced motion both change at once.
//
// Server component. The only client code is the month drawing.
// ─────────────────────────────────────────────────────────────────────────

const PAY = [
  { key: "y", tab: "Yearly", price: "$499", per: "a year", note: "One payment for the twelve months." },
  { key: "q", tab: "Quarterly", price: "$129", per: "a quarter", note: "Four payments. $516 over the twelve months." },
  { key: "m", tab: "Monthly", price: "$45", per: "a month", note: "Twelve payments. $540 over the twelve months." },
] as const

// What the membership does for someone getting implants: the thing, then
// what it is for. Wording follows the published /membership/ page. No member
// percentage is quoted, because this page does not publish the implant fee
// it would apply to.
// The warranty leads because it is the one thing on this list that is about
// implants and nothing else. The panel states it and points to the written
// terms, and adds no conditions of its own. Final wording is confirmed before
// launch; see the handoff brief.
const MEMBER_LEAD = { name: "A lifetime warranty on your implants", why: "Included with your membership. You get the terms in writing with your treatment plan." }

const MEMBER_ROWS = [
  { name: "A 3D scan (CBCT) of both jaws, every year", why: "So the plan is built on what the bone looks like." },
  { name: "The member rate on implant treatment", why: "Confirmed in writing before anything is scheduled." },
  { name: "One more cleaning and exam a year than you have now", why: "To keep implants healthy." },
  { name: "Unlimited second opinions", why: "On any treatment plan, from any dentist." },
]

export function HelpWithCost({ consultHref }: { consultHref: string }) {
  return (
    <div className="hwc">
      {/* THE SCHOLARSHIP */}
      <div id="scholarship" className="hwc-p hwc-sch">
        <ScholarshipYear />
        <div>
          <h4 className="hwc-title">The Primary Scholarship</h4>
          <p className="hwc-body">
            Some people have had a harder road than others. Every month we award a scholarship toward care for patients who have faced extra hardship.
          </p>
          <p className="hwc-said">If that is you, tell us. Applying is private, and it does not change how we treat you.</p>
        </div>
        <a href={consultHref} data-consult-track="financing" className="hwc-btn">
          Apply for the scholarship
        </a>
      </div>

      {/* THE MEMBERSHIP */}
      <div className="hwc-p hwc-mem">
        <h4 className="hwc-title" style={{ margin: "0 0 22px" }}>Primary iD membership</h4>

        <div className="hwc-slip">
          <div className="hwc-slip-top">
            <fieldset className="hwc-seg">
              <legend>How the membership is paid</legend>
              {PAY.map((p, i) => (
                <label key={p.key}>
                  <input type="radio" name="hwc-pay" value={p.key} defaultChecked={i === 0} />
                  <span>{p.tab}</span>
                </label>
              ))}
            </fieldset>
            <div className="hwc-prices">
              {PAY.map(p => (
                <div key={p.key} className="hwc-price" data-pay={p.key}>
                  <span className="hwc-now">{p.price}</span>
                  <span className="hwc-per">{p.per}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hwc-track" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="hwc-notes">
            {PAY.map(p => (
              <p key={p.key} className="hwc-note" data-pay={p.key}>{p.note}</p>
            ))}
          </div>
        </div>

        <p className="hwc-label">When you are getting implants</p>
        <dl className="hwc-rows">
          <div className="hwc-lead">
            <dt>{MEMBER_LEAD.name}</dt>
            <dd>{MEMBER_LEAD.why}</dd>
          </div>
          {MEMBER_ROWS.map(r => (
            <div key={r.name}>
              <dt>{r.name}</dt>
              <dd>{r.why}</dd>
            </div>
          ))}
        </dl>

        <div className="hwc-inc">
          <p>
            <em>Included</em>
            The scan, an oral cancer screening, the preventive visit and its exam, a longevity consultation, your Primary iD, second opinions and the lifetime warranty on your implants.
          </p>
          <p>
            <em>Not included</em>
            Implant and other treatment, lab fees and tests. These are billed at the member rate.
          </p>
        </div>
        <p className="hwc-not">Membership is not insurance and does not pay for treatment.</p>
        <Link href="/membership/" className="hwc-link">
          See everything in the membership →
        </Link>
      </div>

      <style>{`
        .hwc { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.34fr); gap: 24px; align-items: stretch; --hwc-sans: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; --hwc-serif: Georgia, 'Times New Roman', serif; }
        .hwc-p { border-radius: 24px; padding: 36px 36px 34px; display: flex; flex-direction: column; min-width: 0; }
        .hwc-sch { justify-content: space-between; gap: 28px; }
        .hwc-sch { background: linear-gradient(170deg, #F6EBD6 0%, #FAF3E5 55%, #FCF8EF 100%); border: 1px solid rgba(190, 152, 96, 0.3); }
        .hwc-mem { background: linear-gradient(170deg, #E3F2FA 0%, #EDF6FB 55%, #F5FAFD 100%); border: 1px solid rgba(36, 167, 224, 0.2); }

        .hwc-title { font-family: var(--hwc-serif); font-size: 30px; font-weight: 400; line-height: 1.12; letter-spacing: -0.015em; color: #0E2240; margin: 0 0 14px; }
        .hwc-body { font-family: var(--hwc-sans); font-size: 16px; line-height: 1.65; color: #3a4a66; margin: 0 0 20px; }
        .hwc-said { font-family: var(--hwc-serif); font-size: 19px; line-height: 1.45; color: #0E2240; margin: 0; padding-left: 16px; border-left: 2px solid #D4B584; }
        .hwc-btn { align-self: flex-start; display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 28px; border-radius: 999px; background: #FFFFFF; border: 1px solid rgba(14, 34, 64, 0.16); color: #0E2240; font-family: var(--hwc-sans); font-size: 15px; font-weight: 600; text-decoration: none; transition: border-color 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1); }
        .hwc-btn:hover { border-color: rgba(14, 34, 64, 0.42); box-shadow: 0 10px 24px -16px rgba(122, 92, 48, 0.7); transition-duration: 140ms; }
        .hwc-btn:focus-visible, .hwc-link:focus-visible { outline: 3px solid #24A7E0; outline-offset: 3px; }

        .hwc-slip-top { display: flex; flex-direction: row-reverse; align-items: center; justify-content: space-between; gap: 16px; }
        .hwc-seg { border: 0; margin: 0; padding: 4px; min-width: 0; display: inline-flex; gap: 2px; border-radius: 999px; background: rgba(14, 34, 64, 0.06); }
        .hwc-seg legend { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        .hwc-seg label { position: relative; cursor: pointer; }
        .hwc-seg input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
        .hwc-seg span { display: block; padding: 9px 14px; border-radius: 999px; font-family: var(--hwc-sans); font-size: 13px; font-weight: 600; color: #5d6b82; transition: background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), color 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1); }
        .hwc-seg input:checked + span { background: #FFFFFF; color: #0E2240; box-shadow: 0 1px 2px rgba(14, 34, 64, 0.14), 0 6px 14px -10px rgba(14, 34, 64, 0.5); transition-duration: 140ms; }
        .hwc-seg input:focus-visible + span { outline: 3px solid #24A7E0; outline-offset: 2px; }

        .hwc-slip { background: #FFFFFF; border-radius: 16px; padding: 22px 24px 20px; box-shadow: 0 1px 0 rgba(14, 34, 64, 0.04), 0 22px 44px -34px rgba(14, 60, 100, 0.55); }
        .hwc-prices, .hwc-notes { display: grid; }
        .hwc-price, .hwc-note { grid-area: 1 / 1; opacity: 0; visibility: hidden; transition: opacity 140ms cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 140ms; }
        .hwc-price { display: flex; align-items: baseline; gap: 10px; }
        .hwc-now { font-family: var(--hwc-serif); font-size: 56px; line-height: 1; letter-spacing: -0.025em; color: #0E2240; }
        .hwc-per { font-family: var(--hwc-sans); font-size: 15px; font-weight: 500; color: #7A8695; }
        .hwc-note { font-family: var(--hwc-sans); font-size: 13.5px; line-height: 1.5; color: #3a4a66; margin: 0; }
        .hwc-mem:has(input[value="y"]:checked) [data-pay="y"],
        .hwc-mem:has(input[value="q"]:checked) [data-pay="q"],
        .hwc-mem:has(input[value="m"]:checked) [data-pay="m"] { opacity: 1; visibility: visible; transition: opacity 240ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, visibility 0s; }

        .hwc-track { --m: 0px; --q: 0px; --rm: 0px; --rq: 0px; display: flex; margin: 18px 0 14px; }
        .hwc-track span { flex: 1 1 0; height: 10px; background: #5BC0EC; margin-left: var(--m); border-radius: var(--rm); transition: margin 500ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 500ms cubic-bezier(0.22, 1, 0.36, 1); }
        .hwc-track span:first-child { margin-left: 0; }
        .hwc-track span:nth-child(3n + 1) { border-top-left-radius: var(--rq); border-bottom-left-radius: var(--rq); }
        .hwc-track span:nth-child(3n) { border-top-right-radius: var(--rq); border-bottom-right-radius: var(--rq); }
        .hwc-track span:nth-child(3n + 1):not(:first-child) { margin-left: var(--q); }
        .hwc-track span:first-child { border-top-left-radius: 5px; border-bottom-left-radius: 5px; }
        .hwc-track span:last-child { border-top-right-radius: 5px; border-bottom-right-radius: 5px; }
        .hwc-mem:has(input[value="q"]:checked) .hwc-track { --q: 8px; --rq: 5px; }
        .hwc-mem:has(input[value="m"]:checked) .hwc-track { --m: 4px; --q: 4px; --rm: 5px; --rq: 5px; }

        .hwc-label { font-family: var(--hwc-sans); font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #1E86B8; margin: 30px 0 4px; }
        .hwc-rows { margin: 0 0 24px; display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; }
        .hwc-rows > div { padding: 15px 0 16px; border-bottom: 1px solid rgba(14, 34, 64, 0.1); }
        .hwc-rows > .hwc-lead { grid-column: 1 / -1; padding: 16px 0 18px; }
        .hwc-rows > .hwc-lead dt { font-size: 23px; line-height: 1.2; letter-spacing: -0.01em; margin-bottom: 5px; }
        .hwc-rows > .hwc-lead dd { font-size: 15px; }
        .hwc-rows dt { font-family: var(--hwc-serif); font-size: 18px; line-height: 1.3; color: #0E2240; margin: 0 0 3px; }
        .hwc-rows dd { font-family: var(--hwc-sans); font-size: 14.5px; line-height: 1.55; color: #3a4a66; margin: 0; }

        .hwc-inc { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 0 0 14px; }
        .hwc-inc p { font-family: var(--hwc-sans); font-size: 13px; line-height: 1.6; color: #3a4a66; margin: 0; }
        .hwc-inc em { display: block; font-family: var(--hwc-serif); font-style: italic; font-size: 14px; color: #0E2240; margin-bottom: 3px; }
        .hwc-not { font-family: var(--hwc-sans); font-size: 13px; line-height: 1.6; font-weight: 600; color: #0E2240; margin: 0 0 20px; }
        .hwc-link { align-self: flex-start; font-family: var(--hwc-sans); font-size: 14.5px; font-weight: 600; color: #0E2240; text-decoration: underline; text-decoration-color: rgba(14, 34, 64, 0.3); text-underline-offset: 4px; }

        @media (max-width: 860px) {
          .hwc { grid-template-columns: 1fr; gap: 16px; }
          .hwc-p { padding: 26px 22px 26px; }
          .hwc-sch { gap: 24px; }
          .hwc-title { font-size: 26px; }
          .hwc-said { font-size: 18px; }
          .hwc-btn { align-self: stretch; }
          .hwc-slip-top { flex-direction: column; align-items: stretch; gap: 18px; }
          .hwc-seg { width: 100%; }
          .hwc-rows { grid-template-columns: 1fr; }
          .hwc-seg label { flex: 1; text-align: center; }
          .hwc-seg span { padding: 11px 8px; }
          .hwc-slip { padding: 20px 20px 18px; }
          .hwc-now { font-size: 48px; }
          .hwc-inc { grid-template-columns: 1fr; gap: 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hwc-price, .hwc-note, .hwc-track span, .hwc-seg span, .hwc-btn { transition: none !important; }
        }
      `}</style>
    </div>
  )
}
