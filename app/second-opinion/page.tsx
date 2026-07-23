import Link from "next/link"
import { SiteHeader, SiteFooter, PALETTE } from "@/components/site-shell"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/schema"

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

const FAQ_ITEMS = [
  { q: "What does a second opinion cost?", a: "If you bring your existing CBCT scan, X-rays, and treatment plan from another practice, the case-review consultation is offered at a reduced rate compared to a full comprehensive intake. If we need to run our own diagnostics, that's billed separately and discussed up front. Most patients spend $250–$500 on the consult itself, meaningful relative to a $25K–$50K case decision." },
  { q: "What if you tell me the other quote was right?", a: "We will. That's the point of the opinion being honest. Some second opinions confirm, and that's a valid and useful outcome. You leave with confidence in the plan instead of paying for work you weren't sure about." },
  { q: "Do I need to switch practices to you?", a: "No. Some second-opinion patients take our findings back to their original practice and continue care there. Others switch. Both are fine. We don't make the consultation contingent on you becoming a patient." },
  { q: "What records should I bring?", a: "Most useful: your CBCT scan (DICOM files), recent X-rays, the proposed treatment plan in writing, and any quote you've received. If you don't have the CBCT, we can request it from the practice that took it, or take one ourselves if needed." },
  { q: "Will you contact my current dentist?", a: "Only if you ask us to. Most second-opinion patients prefer privacy at this stage, and we honor that. If you want us to coordinate or share findings with your current practice, we will." },
  { q: "How long is the consultation?", a: "60–90 minutes. We review your records, discuss your medical context, examine if needed, then walk through what we'd do differently and why. Same-day write-up of our findings if you want to take it back to compare." },
]

function ReviewIcon() {
  return (
    <svg viewBox="0 0 160 160" style={{ width: "100%", maxWidth: 160 }}>
      <defs>
        <radialGradient id="rev-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#24A7E0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#24A7E0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="76" fill="url(#rev-glow)" />
      {/* Stack of documents */}
      <rect x="38" y="48" width="68" height="84" rx="3" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.5" transform="rotate(-3 72 90)" />
      <rect x="44" y="42" width="68" height="84" rx="3" fill="#FEFCF9" stroke="#0E2240" strokeWidth="1.5" />
      {/* Lines of text on top doc */}
      <line x1="52" y1="56" x2="100" y2="56" stroke="#0E2240" strokeWidth="1.2" opacity="0.5" />
      <line x1="52" y1="64" x2="92" y2="64" stroke="#0E2240" strokeWidth="1.2" opacity="0.3" />
      <line x1="52" y1="72" x2="100" y2="72" stroke="#0E2240" strokeWidth="1.2" opacity="0.3" />
      <line x1="52" y1="80" x2="84" y2="80" stroke="#0E2240" strokeWidth="1.2" opacity="0.3" />
      {/* Highlight on a line : what we'd verify */}
      <rect x="50" y="89" width="55" height="9" fill="#E8985E" opacity="0.22" />
      <line x1="52" y1="94" x2="100" y2="94" stroke="#E8985E" strokeWidth="1.4" />
      {/* Checkmark badge */}
      <circle cx="118" cy="106" r="18" fill="#24A7E0" />
      <path d="M110 106L116 112L126 100" stroke="#FEFCF9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function StepNumber({ n, color }: { n: string; color: string }) {
  return (
    <div style={{
      width: 56, height: 56, borderRadius: 16,
      background: color, color: "#FEFCF9",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: SERIF, fontSize: 22, fontWeight: 500,
      flexShrink: 0,
    }}>
      {n}
    </div>
  )
}

export default function SecondOpinionPage() {
  return (
    <>
      <SiteHeader />
      <ServiceSchema
        serviceType="Dental Treatment Plan Second Opinion"
        description="Second opinion review of dental implant, full-arch, and complex restorative treatment plans by Dr. Tzur Gabi, functional prosthodontist. Honest review against Primary iD risk picture."
        url="https://myprimaryid.com/second-opinion/"
      />
      <FAQPageSchema questions={FAQ_ITEMS.map(f => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Second Opinion", url: "https://myprimaryid.com/second-opinion/" },
      ]} />

      {/* HERO */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", padding: "120px 28px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="hero-grid r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 56, alignItems: "center" }}>
            <div>
              <div style={{
                fontFamily: SANS, fontSize: 12, color: PALETTE.blue,
                letterSpacing: "0.18em", textTransform: "uppercase",
                fontWeight: 700, marginBottom: 28,
              }}>
                Second opinion
              </div>
              <h1 style={{
                fontFamily: SERIF, fontSize: "clamp(44px, 6.5vw, 72px)", fontWeight: 400,
                lineHeight: 1.05, letterSpacing: "-0.015em",
                margin: "0 0 22px", maxWidth: 720,
              }}>
                Bring us your <em style={{ color: PALETTE.blue }}>treatment plan</em>.
              </h1>
              <p style={{
                fontFamily: SERIF, fontStyle: "italic", fontSize: 22,
                color: "rgba(184,226,244,0.95)", margin: "0 0 28px",
                lineHeight: 1.5, maxWidth: 620,
              }}>
                Honest review. No pressure. Sometimes our answer is &quot;they got it right.&quot;
              </p>
              <p style={{
                fontSize: 17, lineHeight: 1.65, color: "rgba(254,252,249,0.85)",
                margin: "0 0 36px", maxWidth: 620, fontFamily: SANS,
              }}>
                Most of the people who come to us for full arch or complex implant work already have a quote from somewhere else. We&apos;ll review what was proposed against your Primary iD risk picture, and tell you what we&apos;d verify, what we&apos;d do differently, and why.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="mailto:hello@myprimaryid.com?subject=Second opinion request" style={{
                  background: PALETTE.blue, color: "#FFFFFF",
                  padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600,
                  textDecoration: "none", fontSize: 15,
                }}>
                  Send us your treatment plan →
                </a>
                <a href="tel:+13105648990" style={{
                  background: "transparent", color: "#FEFCF9",
                  padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600,
                  textDecoration: "none", fontSize: 15,
                  border: "1.5px solid rgba(254,252,249,0.35)",
                }}>
                  Or call (310) 564-8990
                </a>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReviewIcon />
            </div>
          </div>
        </div>
      </section>

      {/* THE PAUSE */}
      <section style={{ background: PALETTE.warmWhite, padding: "88px 28px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.55, color: PALETTE.body, margin: "0 0 22px" }}>
            A $30,000 dental quote should feel like a real decision, not a sales meeting you&apos;re already trying to back out of.
          </p>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, lineHeight: 1.55, color: PALETTE.navy, margin: "0 0 28px" }}>
            If something about your quote felt off, like pace, pressure, vagueness about materials, or no mention of your medical history, that&apos;s a signal worth honoring.
          </p>
          <div style={{ fontFamily: SANS, fontSize: 13, color: PALETTE.muted, letterSpacing: "0.04em" }}>
            Dr. Tzur Gabi, Functional Prosthodontist
          </div>
        </div>
      </section>

      {/* WHAT WE LOOK AT */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              What we look at
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              The questions we&apos;d ask <em style={{ color: PALETTE.blue }}>about your plan</em>.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
              Not a critique of the other practice, but a structured second pass at whether the proposed plan fits <em>you</em>. Here&apos;s what we evaluate.
            </p>
          </div>

          <div className="check-grid r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              {
                title: "Does the surgical plan match the imaging?",
                body: "We re-read the CBCT against the proposed implant placement. Bone density at each site, sinus position, nerve location, angulation. Sometimes a plan looks right on paper but the imaging tells a different story.",
              },
              {
                title: "Is the material choice defensible for your biology?",
                body: "Titanium vs. zirconia. Acrylic vs. hybrid vs. monolithic zirconia for the prosthesis. We check whether the choice was discussed or defaulted, and whether it accounts for any sensitivity, autoimmune, or bruxism (teeth grinding) context.",
              },
              {
                title: "Does the number of implants make sense?",
                body: "All-on-4 vs. All-on-6 vs. All-on-8 isn&apos;t a marketing decision. It&apos;s a biomechanics decision. Bone volume, bite force, opposing arch all matter. We re-check the math.",
              },
              {
                title: "What does your medical context say?",
                body: "Diabetes, smoking, bisphosphonates, sleep-disordered breathing, family periodontal history. Each one shifts the prognosis. A plan built without these isn&apos;t a plan. It&apos;s a quote with a 3D scanner.",
              },
              {
                title: "Are the warranty terms clear and reasonable?",
                body: "Industry-standard is 25-year implant warranty (manufacturer-backed) and 5-year prosthesis warranty. If the proposed terms differ meaningfully, that&apos;s worth flagging.",
              },
              {
                title: "Is the timeline realistic?",
                body: "Same-day full-arch is possible in some cases, not all. Staged approaches over months are appropriate for others. We check whether the proposed timeline matches the case.",
              },
              {
                title: "Are the costs structured cleanly?",
                body: "Inclusions, exclusions, what counts as a re-do, what the cost looks like if grafting is needed mid-procedure. We surface anything ambiguous.",
              },
              {
                title: "Who is actually doing the surgery?",
                body: "In some high-volume practices, the doctor who consults you isn&apos;t the doctor who operates on you. Worth knowing in advance, not a problem necessarily, just a question you have the right to ask.",
              },
            ].map((c, i) => (
              <div key={i} style={{
                background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`,
                borderRadius: 14, padding: "24px 26px",
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  marginBottom: 12,
                }}>
                  <span style={{ width: 24, height: 24, borderRadius: 999, background: PALETTE.blue, color: "#FEFCF9", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, fontFamily: SANS }}>
                    {i + 1}
                  </span>
                </div>
                <h3 style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 500, color: PALETTE.navy, margin: "0 0 10px", lineHeight: 1.25 }}>
                  {c.title}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 14.5, color: PALETTE.body, lineHeight: 1.6, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              How it works
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              Three steps. <em style={{ color: PALETTE.blue }}>One honest read.</em>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 880 }}>
            {[
              {
                n: "01", color: PALETTE.blue, name: "Send your records",
                body: "Email or upload your CBCT scan (DICOM files), recent X-rays, the proposed treatment plan in writing, and any quote you've received. If you don't have the CBCT, we can request it from the practice that took it, or take one ourselves. Brief intake form takes ~5 min.",
              },
              {
                n: "02", color: PALETTE.green, name: "Consultation",
                body: "60–90 minutes with Dr. Gabi. We review your records together, discuss your medical context, examine you in person if needed, then walk through what we'd do differently and why. Same-day write-up if you want to take it back to compare.",
              },
              {
                n: "03", color: PALETTE.navy, name: "Honest read",
                body: "Sometimes our answer is 'they got it right.' Sometimes we'd verify or change specific items. Sometimes we'd recommend a fundamentally different approach. Whatever the answer, it's structured, written, and free of pressure.",
              },
            ].map((s, i) => (
              <div key={i} className="r-grid1 r-gap" style={{
                display: "grid", gridTemplateColumns: "72px 1fr",
                gap: 24, alignItems: "start",
                padding: "8px 0",
              }}>
                <StepNumber n={s.n} color={s.color} />
                <div>
                  <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 500, color: PALETTE.navy, margin: "0 0 8px", lineHeight: 1.2 }}>
                    {s.name}
                  </h3>
                  <p style={{ fontSize: 16, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE HONESTY DIFFERENTIATOR */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", padding: "96px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            What makes ours different
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
            We don&apos;t need <em style={{ color: PALETTE.blue }}>your case</em> to come to us.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(254,252,249,0.85)", margin: "0 0 18px" }}>
            That&apos;s the structural reason the opinion can be honest. We&apos;re a referral-driven practice serving a wellness-literate Los Angeles patient base. Whether you proceed with us, return to your original practice, or take our read to a third provider, the consultation is the same.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(254,252,249,0.85)", margin: "0 0 36px" }}>
            About half of second-opinion patients eventually choose to do the work with us. About a quarter take our read back to confirm or renegotiate with their original practice. The rest go elsewhere with a clearer picture. All three are good outcomes.
          </p>
          <a href="mailto:hello@myprimaryid.com?subject=Second opinion request" style={{
            background: PALETTE.blue, color: "#FFFFFF",
            padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600,
            textDecoration: "none", fontSize: 15, display: "inline-block",
          }}>
            Send us your treatment plan →
          </a>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              Who this is for
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.5vw, 46px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              You&apos;ll get the most value from this if:
            </h2>
          </div>
          <div className="who-grid r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              "You&apos;ve been quoted $20K+ for implant or full-arch work and want a structured read before committing",
              "You got multiple quotes and they varied widely",
              "You had work started somewhere else and aren&apos;t sure you should continue there",
              "You&apos;ve been told you need extractions and implants but want to confirm the timing",
              "Your medical history is complex (diabetes, autoimmune, bisphosphonates) and the original consult didn&apos;t address it",
              "The quote pressured you to decide on the spot",
            ].map((w, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "20px 1fr", gap: 14,
                fontSize: 16, lineHeight: 1.6, color: PALETTE.body,
              }}>
                <span style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${PALETTE.blue}`, background: "rgba(36,167,224,0.1)", display: "inline-block", marginTop: 4 }} />
                <span dangerouslySetInnerHTML={{ __html: w }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              Common questions
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.5vw, 46px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              What people <em style={{ color: PALETTE.blue }}>always</em> ask.
            </h2>
          </div>

          <div>
            {FAQ_ITEMS.map((f, i) => (
              <details key={i} style={{
                borderTop: i === 0 ? `1px solid ${PALETTE.border}` : "none",
                borderBottom: `1px solid ${PALETTE.border}`,
                padding: "22px 0",
              }}>
                <summary style={{ fontFamily: SERIF, fontSize: 18, color: PALETTE.navy, cursor: "pointer", listStyle: "none", fontWeight: 500 }}>
                  {f.q}
                </summary>
                <p style={{ marginTop: 14, color: PALETTE.body, lineHeight: 1.7, fontSize: 15.5 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKEND */}
      <section style={{ background: PALETTE.warmWhite, padding: "120px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            Two ways to start
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 28px" }}>
            Send the plan, or <em style={{ color: PALETTE.blue }}>just call us</em>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: PALETTE.body, margin: "0 0 36px" }}>
            Either way, the conversation starts honest. If you have the records ready, email is the fastest path. If you want to talk through your situation before deciding what to send, call.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
            <a href="mailto:hello@myprimaryid.com?subject=Second opinion request" style={{
              background: PALETTE.navy, color: "#FFFFFF",
              padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600,
              textDecoration: "none", fontSize: 15,
            }}>
              Send your treatment plan
            </a>
            <a href="tel:+13105648990" style={{
              background: "transparent", color: PALETTE.navy,
              padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600,
              textDecoration: "none", fontSize: 15,
              border: `1.5px solid ${PALETTE.navy}`,
            }}>
              Call (310) 564-8990
            </a>
          </div>
          <Link href="/dental-implant/" style={{ fontFamily: SANS, fontSize: 14, color: PALETTE.blue, textDecoration: "none", fontWeight: 500 }}>
            Read more about our full implant & full-arch approach →
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .check-grid { grid-template-columns: 1fr !important; }
          .who-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <SiteFooter />
    </>
  )
}
