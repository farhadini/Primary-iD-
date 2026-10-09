// ============================================================
// HOME: the membership, in brief. Every number and benefit here is the one the
// /membership/ page publishes (fees confirmed against Open Dental, 29 Sep 2026).
// If membership.html changes, change this with it. One job: send people to
// /membership/ to read the rest.
//
// Rails: membership is not insurance and does not pay for treatment; one
// published price, no "up to" or "as low as"; no credit between the $99 visit
// and the membership.
// ============================================================

const INSURANCE = [
  { ok: true, t: "Cleanings and exams, usually twice a year" },
  { ok: true, t: "A share of fillings, crowns and root canals" },
  { ok: false, t: "A yearly 3D scan of your jaws, airway and sinuses" },
  { ok: false, t: "Whitening, cosmetic work and night guards" },
  { ok: false, t: "Your Primary iD, read at every visit" },
]

const MEMBERSHIP = [
  { b: "A 3D scan and an oral cancer screening,", t: " every year" },
  { b: "One more preventive visit", t: " than you have now" },
  { b: "Your Primary iD,", t: " re-scored every year and read at every visit" },
  { b: "A longevity consultation,", t: " once a year (labs billed separately)" },
  { b: "Member pricing on everything we do,", t: " published in advance, no annual maximum" },
  { b: "Unlimited second opinions,", t: " on any plan from any dentist" },
]

function Mark({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="mk ok" aria-label="Included">
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.2l2.3 2.3 4.7-4.9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  ) : (
    <span className="mk no" aria-label="Not included">
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2.5 2.5l5 5M7.5 2.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    </span>
  )
}

export default function MembershipTeaser() {
  return (
    <section className="mtz" id="membership" aria-labelledby="mtz-h">
      <style>{`
        .mtz{background:#FAF8F5;padding:104px 24px;border-top:1px solid rgba(14,34,64,.06)}
        .mtz .in{max-width:1180px;margin:0 auto}
        .mtz .eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#24A7E0}
        .mtz .eyebrow::before{content:"";width:26px;height:1px;background:#24A7E0}
        .mtz h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:clamp(32px,4.2vw,52px);line-height:1.08;letter-spacing:-.02em;color:#0E2240;margin:18px 0 14px;max-width:20ch}
        .mtz h2 em{color:#24A7E0;font-style:italic}
        .mtz .lede{font-family:Georgia,"Times New Roman",serif;font-size:18px;line-height:1.62;color:#3a4a66;max-width:60ch;margin:0}
        .mtz .two{display:grid;grid-template-columns:1fr 1.15fr;gap:24px;margin-top:48px;align-items:stretch}
        .mtz .card{background:#FEFCF9;border:1px solid rgba(14,34,64,.12);border-radius:24px;overflow:hidden;display:flex;flex-direction:column}
        .mtz .card.mem{border-color:rgba(36,167,224,.35);box-shadow:0 30px 70px -40px rgba(36,167,224,.55)}
        .mtz .head{padding:32px 32px 26px;background:linear-gradient(160deg,#EEF4FA 0%,#F6F9FC 100%);border-bottom:1px solid rgba(14,34,64,.08)}
        .mtz .mem .head{background:linear-gradient(160deg,#E8F6FC 0%,#D6EEF9 100%)}
        .mtz .kick{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#24A7E0}
        .mtz h3{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:clamp(24px,2.6vw,32px);line-height:1.15;color:#0E2240;margin:12px 0 10px}
        .mtz .head p{font-family:Georgia,"Times New Roman",serif;font-size:16px;line-height:1.6;color:#3a4a66;margin:0}
        .mtz .price{display:flex;align-items:baseline;gap:8px;margin-top:14px}
        .mtz .price .n{font-family:Georgia,"Times New Roman",serif;font-size:48px;line-height:1;color:#0E2240;font-variant-numeric:lining-nums}
        .mtz .price .o{font-family:Georgia,"Times New Roman",serif;font-size:18px;font-style:italic;color:#7A8695}
        .mtz .terms{font-size:13.5px;color:#3a4a66;margin-top:6px}
        .mtz .body{padding:26px 32px 30px;display:flex;flex-direction:column;flex:1}
        .mtz .lab{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#7A8695;margin-bottom:12px}
        .mtz ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px;flex:1}
        .mtz li{display:flex;gap:12px;align-items:flex-start;font-size:15px;line-height:1.5;color:#3a4a66}
        .mtz li b{color:#0E2240;font-weight:600}
        .mtz .mk{flex:none;width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-top:1px}
        .mtz .mk.ok{background:rgba(72,194,140,.14);color:#2f9b6c}
        .mtz .mk.no{background:rgba(14,34,64,.06);color:#7A8695}
        .mtz .cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;margin-top:26px;padding:15px 26px;border-radius:999px;font-size:15px;font-weight:600;text-decoration:none;transition:.2s;align-self:flex-start}
        .mtz .cta.solid{background:#0E2240;color:#fff}
        .mtz .cta.solid:hover{background:#24A7E0}
        .mtz .cta.ghost{border:1.5px solid rgba(14,34,64,.25);color:#0E2240}
        .mtz .cta.ghost:hover{border-color:#0E2240}
        .mtz .note{font-size:12.5px;color:#7A8695;margin:22px 0 0;max-width:80ch}
        @media(max-width:900px){.mtz .two{grid-template-columns:1fr}}
        @media(max-width:620px){.mtz{padding:72px 16px}.mtz .head,.mtz .body{padding-left:22px;padding-right:22px}}
      `}</style>
      <div className="in">
        <span className="eyebrow">Membership</span>
        <h2 id="mtz-h">$1,220 of care before you use it once. <em>Then everything else gets cheaper.</em></h2>
        <p className="lede">
          Dental insurance is built to pay for what already broke. Membership is built to see it before it does, for one fee a year, alongside your plan or on its own.
        </p>

        <div className="two">
          <div className="card">
            <div className="head">
              <span className="kick">If you have insurance</span>
              <h3>Keep it. We accept PPO plans.</h3>
              <p>We bill your plan first and tell you what your benefit is worth before it resets.</p>
            </div>
            <div className="body">
              <div className="lab">What a plan usually covers</div>
              <ul>
                {INSURANCE.map((i) => (
                  <li key={i.t}><Mark ok={i.ok} /><span>{i.t}</span></li>
                ))}
              </ul>
              <a className="cta ghost" href="/book/">Book a visit</a>
            </div>
          </div>

          <div className="card mem">
            <div className="head">
              <span className="kick">The Primary iD Membership</span>
              <div className="price"><span className="n">$499</span><span className="o">a year</span></div>
              <div className="terms">Or $129 a quarter, or $45 a month, on a twelve-month term.</div>
            </div>
            <div className="body">
              <div className="lab">What membership includes</div>
              <ul>
                {MEMBERSHIP.map((m) => (
                  <li key={m.b}><Mark ok /><span><b>{m.b}</b>{m.t}</span></li>
                ))}
              </ul>
              <a className="cta solid" href="/membership/">See what membership includes →</a>
            </div>
          </div>
        </div>

        <p className="note">
          Membership is not insurance and does not pay for treatment. Member rates are discounts off the fees we regularly charge and are confirmed in writing before anything is scheduled.
        </p>
      </div>
    </section>
  )
}
