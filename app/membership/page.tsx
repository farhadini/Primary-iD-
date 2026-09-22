"use client"

import Link from "next/link"
import { SiteHeader, SiteFooter } from "@/components/site-shell"

// ─────────────────────────────────────────────────────────────────────────
// /membership/ : the Primary iD membership page.
//
// One fee, $499 a year. The page leads with what is included at the fees we
// regularly charge, then shows a worked example of a member's year, then the
// member price list, then the ninety-minute first visit.
//
// Compliance rails carried from the Membership PRD v5:
//   · membership is not insurance and does not pay for treatment
//   · no "up to" / "as low as" — every rate is a single published number
//   · Dr. Gabi is a prosthodontist (B&P 651); never "oral physician"
//   · the iD is directional — not a diagnosis, not a measure of biological age
//   · no claim that the fee credits toward treatment (pending counsel)
// ─────────────────────────────────────────────────────────────────────────

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  white: "#FFFFFF",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  line: "rgba(14,34,64,0.08)",
}

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

const INCLUDED: Array<[string, string]> = [
  ["3D scan — jaws, airway, sinuses, head and neck", "$500"],
  ["Oral cancer screening", "$150"],
  ["One more preventive visit than you have now", "$225"],
  ["The periodic exam that goes with it", "$150"],
  ["Longevity and peptide consultation", "$195"],
  ["Your Primary iD, re-scored and read at every visit", "—"],
  ["Unlimited second opinions, on any plan from any dentist", "—"],
]

const EXAMPLE_YEAR: Array<[string, string]> = [
  ["Included every year — scan, screening, visit, exam, consultation", "$1,220"],
  ["One porcelain crown — $2,150, at 25% off", "$537"],
  ["In-office whitening — $395, at 20% off", "$79"],
  ["A night guard — $675, at 20% off", "$135"],
]

const MEMBER_RATES: Array<[string, string]> = [
  ["Restorative — fillings, crowns", "25% off"],
  ["Endodontics — root canals", "25% off"],
  ["Periodontics — deep cleaning, grafting", "20% off"],
  ["Prosthodontics — bridges, dentures", "20% off"],
  ["Oral surgery — extractions", "20% off"],
  ["Implants — placement and crown", "15% off"],
  ["Clear aligners", "10% off"],
  ["Whitening, in-office and take-home", "20% off"],
  ["Cosmetic bonding and veneers", "20% off"],
  ["Night guards", "20% off"],
  ["Sleep appliances", "15% off"],
  ["Longevity and functional medicine visits", "20% off"],
  ["Salivary and oral microbiome panels", "lab cost + $50"],
  ["Products we stock, all year", "15% off"],
]

const VISIT_STEPS: Array<{ when: string; title: string; body: string }> = [
  {
    when: "Before · online",
    title: "Build your iD",
    body: "Forty questions, about six minutes. Your score exists before you arrive, so the visit starts further along.",
  },
  {
    when: "The imaging",
    title: "A 3D scan, head and neck",
    body: "Jaws, roots, sinuses, airway and the structures of the neck — everything an X-ray of your teeth never shows.",
  },
  {
    when: "With Dr. Gabi",
    title: "The full examination",
    body: "Teeth, gums, bite, wear and an oral cancer screening — read against your iD rather than in isolation.",
  },
  {
    when: "Before you leave",
    title: "Your written plan",
    body: "What he saw, what it means, what to do now and what to leave alone — with every price written down in advance.",
  },
]

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "Is this insurance?",
    a: "No. Primary iD is a membership with our practice. It is not dental insurance and it does not pay for treatment. It includes specific care every year and sets the price you pay for everything else we do.",
  },
  {
    q: "I already have dental insurance. Does this replace it?",
    a: "No — keep it, and bring your card. We bill your plan first and tell you what your benefit is worth before it resets. Membership adds the things plans routinely do not fund: the 3D scan, an extra preventive visit, the longevity consultation, and member pricing with no annual maximum on whitening, cosmetic work, guards, panels and products.",
  },
  {
    q: "What does $499 actually include?",
    a: "A 3D scan of the head and neck and an oral cancer screening each year, one more preventive visit than you have today with the exam that goes with it, a longevity and peptide consultation, your Primary iD re-scored every year, unlimited second opinions, and member pricing on everything else we do. Laboratory work and any treatment beyond those visits are quoted in writing at the member rate before anything is scheduled.",
  },
  {
    q: "Can I pay monthly?",
    a: "Yes. $499 paid in full, $129 a quarter, or $45 a month, each on a twelve-month term. Everything is available from day one whichever route you choose.",
  },
  {
    q: "What is the Primary iD?",
    a: "A read across five dimensions — oral health, sleep and airway, nutrition, family history and longevity — built from validated instruments and looked at every visit. It is directional. It is not a diagnosis and it is not a measure of biological age.",
  },
]

function Rows({ rows, emphasizeLast }: { rows: Array<[string, string]>; emphasizeLast?: boolean }) {
  return (
    <div style={{ border: `1px solid ${B.line}`, borderRadius: 16, overflow: "hidden", background: B.warm }}>
      {rows.map(([label, value], i) => {
        const last = emphasizeLast && i === rows.length - 1
        return (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 20,
              padding: "14px 22px",
              borderTop: i === 0 ? "none" : `1px solid ${B.line}`,
              background: last ? "rgba(36,167,224,0.06)" : "transparent",
              fontSize: 15,
              color: last ? B.navy : B.body,
              fontWeight: last ? 600 : 400,
            }}
          >
            <span>{label}</span>
            <span style={{ fontFamily: SERIF, fontSize: last ? 20 : 17, color: B.navy, whiteSpace: "nowrap" }}>
              {value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function MembershipPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ background: B.cream, color: B.body, fontFamily: SANS }}>
        <style>{`
          .m-wrap { max-width: 1080px; margin: 0 auto; padding: 0 28px; }
          .m-sec { padding: 72px 0; border-top: 1px solid ${B.line}; }
          .m-h2 { font-family: ${SERIF}; font-weight: 400; color: ${B.navy}; font-size: clamp(27px,3.6vw,40px); line-height: 1.12; letter-spacing: -0.02em; margin: 0; }
          .m-h2 em { font-style: italic; color: ${B.blue}; }
          .m-lede { font-size: 18px; line-height: 1.62; margin: 18px 0 0; max-width: 62ch; }
          .m-grid2 { display: grid; grid-template-columns: minmax(0,1fr) 340px; gap: 56px; align-items: start; }
          .m-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid ${B.line}; border-radius: 20px; overflow: hidden; background: ${B.warm}; margin-top: 36px; }
          .m-step { padding: 28px 26px; border-left: 1px solid ${B.line}; }
          .m-step:first-child { border-left: none; }
          .m-rates { display: grid; grid-template-columns: 1fr 1fr; gap: 0 40px; }
          @media (max-width: 900px) {
            .m-grid2 { grid-template-columns: 1fr; gap: 36px; }
            .m-steps { grid-template-columns: 1fr; }
            .m-step { border-left: none; border-top: 1px solid ${B.line}; }
            .m-step:first-child { border-top: none; }
            .m-rates { grid-template-columns: 1fr; }
          }
        `}</style>

        {/* HERO */}
        <section style={{ padding: "64px 0 8px" }}>
          <div className="m-wrap">
            <div
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                fontSize: 12,
                color: B.blue,
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              Membership
            </div>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                color: B.navy,
                fontSize: "clamp(32px,4.6vw,54px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                margin: 0,
                maxWidth: "20ch",
              }}
            >
              $1,220 of care before you use it once.{" "}
              <em style={{ fontStyle: "italic", color: B.blue }}>Then everything else gets cheaper.</em>
            </h1>
            <p className="m-lede">
              Primary iD is one fee a year. It covers the imaging, the screening, the extra preventive visit and the
              longevity consultation that decide how well the next twenty years go — and it sets the price of
              everything else we do, with no annual maximum.
            </p>
          </div>
        </section>

        {/* WHAT IS INCLUDED + PLAN CARD */}
        <section className="m-sec" style={{ borderTop: "none" }}>
          <div className="m-wrap m-grid2">
            <div>
              <h2 className="m-h2">Included every year, at the fees we regularly charge.</h2>
              <div style={{ marginTop: 28 }}>
                <Rows rows={[...INCLUDED, ["Included, every year", "$1,220"]]} emphasizeLast />
              </div>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 20,
                  lineHeight: 1.35,
                  color: B.navy,
                  maxWidth: "32ch",
                  marginTop: 22,
                }}
              >
                The scan alone costs more than the membership.
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, marginTop: 12, maxWidth: "62ch" }}>
                Most dental plans pay about seventeen cents on the dollar toward a 3D scan, which is why almost nobody
                has had one.
              </p>

              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  color: B.navy,
                  fontSize: 24,
                  margin: "44px 0 0",
                }}
              >
                What a year can look like
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, marginTop: 10, maxWidth: "62ch" }}>
                That $1,220 arrives before any treatment. The larger number is usually what the member rate saves on
                the work itself — here is one member&rsquo;s year.
              </p>
              <div style={{ marginTop: 18 }}>
                <Rows
                  rows={[...EXAMPLE_YEAR, ["What that year is worth", "$1,971"], ["Your fee for the year", "$499"]]}
                  emphasizeLast
                />
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: B.muted, marginTop: 12, maxWidth: "62ch" }}>
                An illustration, not a promise — what you use is up to you and your treatment. Fees shown are the ones
                Primary regularly charges.
              </p>
            </div>

            {/* PLAN CARD */}
            <aside
              style={{
                background: B.warm,
                border: `1.5px solid ${B.blue}`,
                borderRadius: 24,
                padding: 30,
                boxShadow: "0 24px 60px -34px rgba(36,167,224,0.75)",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: SERIF, fontSize: 52, color: B.navy, letterSpacing: "-0.02em" }}>$499</span>
                <span style={{ fontSize: 14, color: B.muted }}>/ year</span>
              </div>
              <div style={{ fontSize: 13, color: B.blue, marginTop: 6, fontWeight: 500 }}>
                Or $129 a quarter, or $45 a month, on a twelve-month term.
              </div>
              <ul style={{ listStyle: "none", margin: "22px 0 24px", padding: 0 }}>
                {[
                  "A 3D scan of the head and neck and an oral cancer screening, every year",
                  "One more preventive visit than you have now — a third if you are insured, your first if you are not",
                  "Your Primary iD, re-scored every year and read at every visit",
                  "A longevity and peptide consultation, once a year — labs billed separately",
                  "Member pricing on everything we do, published in advance, with no annual maximum",
                  "Unlimited second opinions — send us any treatment plan, from any dentist",
                ].map((item, i) => (
                  <li
                    key={item}
                    style={{
                      fontSize: 14,
                      lineHeight: 1.5,
                      padding: "10px 0 10px 22px",
                      position: "relative",
                      borderTop: i === 0 ? "none" : `1px solid ${B.line}`,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 2,
                        top: 17,
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: B.blue,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/primary-id/"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: B.navy,
                  color: B.white,
                  padding: "14px 24px",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Build your Primary iD
              </Link>
              <p style={{ fontSize: 11.5, color: B.muted, marginTop: 14, textAlign: "center", lineHeight: 1.5 }}>
                Start with your iD — free, about six minutes. Your membership begins with the ninety-minute first
                visit.
              </p>
            </aside>
          </div>
        </section>

        {/* MEMBER PRICING */}
        <section className="m-sec">
          <div className="m-wrap">
            <h2 className="m-h2">
              Every price, <em>published in advance.</em>
            </h2>
            <p className="m-lede">
              Member pricing runs across everything we do — including the work people come in wanting. Your dental
              plan contributes nothing toward most of it.
            </p>
            <div className="m-rates" style={{ marginTop: 32 }}>
              {[MEMBER_RATES.slice(0, 7), MEMBER_RATES.slice(7)].map((half, col) => (
                <div key={col}>
                  {half.map(([label, rate], i) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: 20,
                        padding: "13px 0",
                        borderTop: i === 0 ? "none" : `1px solid ${B.line}`,
                        fontSize: 15,
                      }}
                    >
                      <span>{label}</span>
                      <span style={{ fontFamily: SERIF, fontSize: 16, color: B.navy, whiteSpace: "nowrap" }}>
                        {rate}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.6, color: B.muted, marginTop: 20, maxWidth: "74ch" }}>
              Member rates are fixed, published in advance and confirmed in writing before anything is scheduled.
              Treatment, laboratory fees and diagnostic panels are charged separately at the member rate.
            </p>
          </div>
        </section>

        {/* FIRST NINETY MINUTES */}
        <section className="m-sec">
          <div className="m-wrap">
            <h2 className="m-h2">
              Your first ninety minutes. <em>Everything, looked at at once.</em>
            </h2>
            <p className="m-lede">
              Most first appointments are fifteen minutes and a set of X-rays. Yours is ninety minutes with Dr. Tzur
              Gabi, prosthodontist, and it ends with a written plan you can hold, with prices on it.
            </p>
            <div className="m-steps">
              {VISIT_STEPS.map((s) => (
                <div className="m-step" key={s.title}>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: B.blue,
                      marginBottom: 12,
                      fontWeight: 600,
                    }}
                  >
                    {s.when}
                  </div>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 400, color: B.navy, fontSize: 19, margin: "0 0 8px" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, marginTop: 24, maxWidth: "70ch" }}>
              <strong style={{ color: B.navy }}>Nothing is decided in the chair.</strong> You leave with the plan, the
              prices and the reasons, and you decide at home.{" "}
              <strong style={{ color: B.navy }}>Have dental insurance?</strong> Bring your card — we bill your plan
              first and tell you what your benefit is worth before it resets.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="m-sec">
          <div className="m-wrap">
            <h2 className="m-h2">Questions people ask.</h2>
            <div style={{ marginTop: 28, maxWidth: 820 }}>
              {FAQ_ITEMS.map(({ q, a }) => (
                <details key={q} style={{ borderTop: `1px solid ${B.line}`, padding: "20px 0" }}>
                  <summary
                    style={{
                      fontFamily: SERIF,
                      fontSize: 18,
                      color: B.navy,
                      cursor: "pointer",
                      listStyle: "none",
                    }}
                  >
                    {q}
                  </summary>
                  <p style={{ marginTop: 12, lineHeight: 1.7, fontSize: 15.5 }}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSE */}
        <section style={{ background: B.navy, padding: "80px 0" }}>
          <div className="m-wrap" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                color: B.white,
                fontSize: "clamp(28px,4vw,46px)",
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: "20ch",
              }}
            >
              Six minutes for your iD.{" "}
              <em style={{ fontStyle: "italic", color: "#5BC0EC" }}>Ninety for the visit that reads it.</em>
            </h2>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 32,
              }}
            >
              <Link
                href="/primary-id/"
                style={{
                  background: B.blue,
                  color: B.white,
                  padding: "14px 28px",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Build your Primary iD
              </Link>
              <a
                href="tel:+13105648990"
                style={{
                  background: B.white,
                  color: B.navy,
                  padding: "14px 28px",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Call (310) 564-8990
              </a>
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5, marginTop: 20 }}>
              Brentwood, Los Angeles · Founded by Dr. Tzur Gabi, prosthodontist
            </p>
          </div>
        </section>

        {/* DISCLOSURES */}
        <section style={{ padding: "40px 0 56px", background: B.cream }}>
          <div className="m-wrap">
            <p style={{ fontSize: 12, lineHeight: 1.65, color: B.muted, maxWidth: "88ch" }}>
              Primary iD is a membership with Primary Integrative Dentistry. It is not dental insurance, it is not a
              qualified health plan, and it does not pay for treatment. Member rates are discounts off the fees we
              regularly charge and are confirmed in writing before treatment is scheduled. The Primary iD score is
              directional — it is not a diagnosis and it is not a measure of biological age. Coverage, maximums and
              reimbursement vary by dental plan; we confirm yours in writing before anything is scheduled.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
