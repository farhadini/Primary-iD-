import Link from "next/link"
import { SiteHeader, SiteFooter, PALETTE } from "@/components/site-shell"
import { PhysicianSchema, BreadcrumbSchema } from "@/components/schema"

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

function PortraitFrame() {
  // Abstract portrait stand-in: a circular gradient with subtle geometry
  // that reads as "person" without requiring an actual photograph.
  return (
    <svg viewBox="0 0 240 240" style={{ width: "100%", maxWidth: 320 }}>
      <defs>
        <radialGradient id="pf-bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FEFCF9" />
          <stop offset="100%" stopColor="#EFE8DD" />
        </radialGradient>
        <linearGradient id="pf-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(14,34,64,0.0)" />
          <stop offset="100%" stopColor="rgba(14,34,64,0.18)" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="120" r="118" fill="url(#pf-bg)" stroke="#0E2240" strokeOpacity="0.08" strokeWidth="1" />
      {/* Suggestion of shoulders/figure */}
      <path d="M40 240 Q40 180 120 180 Q200 180 200 240 Z" fill="#0E2240" opacity="0.06" />
      {/* Head/face */}
      <circle cx="120" cy="110" r="46" fill="#FEFCF9" stroke="#0E2240" strokeOpacity="0.2" strokeWidth="1" />
      {/* Soft hair gesture */}
      <path d="M76 96 Q88 60 120 60 Q152 60 164 96" fill="#0E2240" opacity="0.7" />
      {/* Soft shadow under chin */}
      <ellipse cx="120" cy="158" rx="32" ry="8" fill="url(#pf-shadow)" />
      {/* Caption label */}
      <text x="120" y="222" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontStyle="italic" fill="#0E2240" opacity="0.6">
        Dr. Tzur Gabi
      </text>
    </svg>
  )
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <PhysicianSchema />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "About Dr. Tzur Gabi", url: "https://myprimaryid.com/about/" },
      ]} />

      {/* HERO */}
      <section style={{ background: PALETTE.cream, padding: "120px 28px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-hero" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>
                Founder · Primary Integrative Dentistry
              </div>
              <h1 style={{ fontFamily: SERIF, fontSize: "clamp(46px, 7vw, 76px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.015em", margin: "0 0 22px" }}>
                Dr. Tzur Gabi.
              </h1>
              <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 24, color: PALETTE.body, margin: "0 0 28px", lineHeight: 1.45, maxWidth: 580 }}>
                Functional prosthodontist. Twenty-five years of putting the mouth back in the body.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: "0 0 28px", maxWidth: 600, fontFamily: SANS }}>
                Trained as a prosthodontist, the dental specialty for reconstructive, restorative, cosmetic, and implant work. Background in genetics and artificial intelligence. Mentor to thousands of dentists worldwide on how to handle the cases other practices refer away. Known in the field as <em>The Dental Architect</em>.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/book/preventive/" style={{ background: PALETTE.navy, color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
                  Book a visit with Dr. Gabi →
                </Link>
                <Link href="/diagnostics/" style={{ background: "transparent", color: PALETTE.navy, padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15, border: `1.5px solid ${PALETTE.navy}` }}>
                  Start with the assessment
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="/images/image.png"
                alt="Dr. Tzur Gabi, functional prosthodontist"
                style={{ width: "100%", maxWidth: 360, borderRadius: 20, display: "block", boxShadow: "0 24px 60px -28px rgba(14,34,64,0.40)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIAL STRIP */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", padding: "44px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="cred-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, alignItems: "center" }}>
            {[
              { num: "25+", label: "Years of practice" },
              { num: "4.9", label: "Average rating across 442+ reviews" },
              { num: "1,000s", label: "Dentists mentored worldwide" },
              { num: "Specialist", label: "ADA-recognized prosthodontist" },
            ].map((c, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(254,252,249,0.18)" : "none", paddingLeft: i > 0 ? 24 : 0 }}>
                <div style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: PALETTE.blue, marginBottom: 4 }}>
                  {c.num}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 12, color: "rgba(254,252,249,0.75)", lineHeight: 1.4 }}>
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS A PROSTHODONTIST */}
      <section style={{ background: PALETTE.warmWhite, padding: "72px 28px", borderBottom: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            The specialty
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 22px" }}>
            What is a <em style={{ color: PALETTE.blue }}>prosthodontist</em>?
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: PALETTE.body, fontFamily: SANS, margin: 0 }}>
            Dr. Gabi is a prosthodontist, one of a small number of dental specialties formally recognized by the American Dental Association. It means three or more years of advanced training beyond dental school, focused on restoring and replacing teeth: implants, crowns, veneers, full-mouth rehabilitation, and bite and jaw function. In practice, the complex work a general practice usually refers out is planned and done here, by a specialist, start to finish.
          </p>
        </div>
      </section>

      {/* THE STORY */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            The story
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.5vw, 46px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 32px" }}>
            Why we don&apos;t treat <em style={{ color: PALETTE.blue }}>mouths in isolation</em>.
          </h2>

          <div style={{ fontSize: 17, lineHeight: 1.75, color: PALETTE.body, fontFamily: SANS }}>
            <p style={{ margin: "0 0 22px" }}>
              For most of dental history, the field has been organized around the tooth. One tooth at a time. One filling at a time. One crown at a time. The assumption was that the mouth was a closed system, sealed off from sleep, from heart, from gut, from the rest of you.
            </p>
            <p style={{ margin: "0 0 22px" }}>
              That assumption is wrong. The mouth turns out to be one of the most diagnostically rich places in the entire body. Sleep-disordered breathing announces itself in your jaw posture before any sleep study catches it. Cardiovascular inflammation shows up in your gums before it shows up in your bloodwork. Family periodontal history predicts heart-attack risk almost as well as it predicts tooth loss. The mouth is the front door to systemic health.
            </p>
            <p style={{ margin: "0 0 22px" }}>
              The field, slowly, has come to know this. My practice was built on getting there a little earlier than most.
            </p>

            <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 500, color: PALETTE.navy, margin: "48px 0 16px", lineHeight: 1.25 }}>
              The training
            </h3>
            <p style={{ margin: "0 0 22px" }}>
              I trained as a prosthodontist, the dental specialty that exists for the hardest restorative work. Full-arch reconstructions. Complex implant cases. Cosmetic transformations that have to last decades. The cases that other practices refer out, prosthodontists are trained to handle.
            </p>
            <p style={{ margin: "0 0 22px" }}>
              My background before dentistry was in genetics and artificial intelligence. I spent years thinking about how biology encodes outcomes, and how technology can read that encoding faster than a human clinician can. When I came to dentistry, I didn&apos;t leave that framework behind. It became the lens.
            </p>

            <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 500, color: PALETTE.navy, margin: "48px 0 16px", lineHeight: 1.25 }}>
              The Dental Architect
            </h3>
            <p style={{ margin: "0 0 22px" }}>
              Patients gave me the nickname. The idea is that you don&apos;t restore a mouth the way you fix a car part. You design it the way you&apos;d design a structure: thinking about load distribution, material biology, how the airway interacts with the bite, how the bite interacts with sleep, how sleep interacts with the inflammation that eventually kills the implant if you ignore it. Each tooth is a load-bearing member of a system that has to last.
            </p>
            <p style={{ margin: "0 0 22px" }}>
              That&apos;s the approach behind everything we do at Primary. It&apos;s why our first visits are 90 minutes instead of 20. It&apos;s why we image in 3D instead of 2D. It&apos;s why we ask about your sleep and your nutrition and your family medical history before we even pick up an instrument.
            </p>

            <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 500, color: PALETTE.navy, margin: "48px 0 16px", lineHeight: 1.25 }}>
              The teaching
            </h3>
            <p style={{ margin: "0 0 22px" }}>
              In parallel with the practice, I&apos;ve spent the last fifteen-plus years teaching this approach to other dentists, thousands of them, across the U.S. and internationally. The lectures, the mentorship, the case reviews: they exist because the gap between what dentistry has historically been and what it could be is wide enough to spend a career closing.
            </p>
            <p style={{ margin: "0 0 22px" }}>
              I co-founded Caligenix to extend the work past dentistry, into the broader space where genetics, microbiome, and clinical wellness intersect. The thesis is the same as Primary&apos;s: the body has been over-divided into specialties, and the highest-leverage work happens where those specialties meet.
            </p>

            <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 500, color: PALETTE.navy, margin: "48px 0 16px", lineHeight: 1.25 }}>
              The practice
            </h3>
            <p style={{ margin: "0 0 22px" }}>
              Primary Integrative Dentistry is what I&apos;ve been building toward. Los Angeles. The whole-body framework in one practice. A first-visit experience that treats you like a person who lives in a body, not a mouth that needs servicing. The Primary iD, a structured way to see your five interconnected health dimensions on one page, so we can plan the work around the picture instead of around the procedure.
            </p>
            <p style={{ margin: "0 0 22px" }}>
              If you&apos;ve been managing something for a while, a tooth you&apos;ve been eating around, a smile you&apos;ve been hiding, a quote that didn&apos;t sit right, come in. Most of what people are afraid of about dentistry is gone before the second visit.
            </p>

            <p style={{ margin: "32px 0 0", fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: PALETTE.navy }}>
              Dr. Tzur Gabi
            </p>
          </div>
        </div>
      </section>

      {/* CREDENTIALS / SPECIALTIES */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              Areas of focus
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.5vw, 46px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              What I do <em style={{ color: PALETTE.blue }}>most</em>.
            </h2>
          </div>
          <div className="focus-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {[
              { title: "Full-arch reconstruction", body: "All-on-4, All-on-6, zygomatic implants. Twenty-five years of cases other practices refer out." },
              { title: "Complex implant cases", body: "Patients with diabetes, bisphosphonate history, autoimmune conditions, prior failed implants. The cases that need a prosthodontist." },
              { title: "Second opinions", body: "Honest review of treatment plans from other practices. Sometimes the answer is &apos;they got it right.&apos;" },
              { title: "Integrative diagnostics", body: "3D CBCT, salivary microbiome, airway analysis, sleep screening. The picture other practices don&apos;t see." },
              { title: "Aesthetic & cosmetic", body: "Veneers, smile design, biocompatible materials. Aesthetics built on bite mechanics and biology." },
              { title: "Functional prosthodontics", body: "Reconstructive work, full-mouth rehabilitation, bite reconstruction. Where the doctorate-level specialty pays off." },
            ].map((f, i) => (
              <div key={i} style={{ background: PALETTE.warmWhite, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: "24px 26px" }}>
                <h3 style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 500, color: PALETTE.navy, margin: "0 0 10px", lineHeight: 1.25 }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: PALETTE.body, lineHeight: 1.6, margin: 0 }} dangerouslySetInnerHTML={{ __html: f.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECOGNITION & TEACHING */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="recog-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
                Recognition
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 22px" }}>
                In the field.
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Integrates genetics, airway, and whole-body risk into every treatment plan",
                  "Mentor to thousands of dentists worldwide on advanced restorative and reconstructive work",
                  "Co-founder, Caligenix, a genetics-informed wellness platform",
                  "Active speaker on integrative dentistry and the oral-systemic connection",
                ].map((r, i) => (
                  <li key={i} style={{
                    fontSize: 15.5, lineHeight: 1.6, color: PALETTE.body, fontFamily: SANS,
                    display: "grid", gridTemplateColumns: "16px 1fr", gap: 12, alignItems: "start",
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: PALETTE.blue, display: "inline-block", marginTop: 9 }} />
                    {r}
                  </li>
                ))}
              </ul>
              <Link href="/your-mouth-keeps-the-score/" style={{ display: "inline-block", marginTop: 20, fontFamily: SANS, fontSize: 14.5, color: PALETTE.navy, textDecoration: "underline", textDecorationColor: "rgba(14,34,64,0.3)", textUnderlineOffset: 4, fontWeight: 600 }}>
                His forthcoming book, Your Mouth Keeps the Score &rarr;
              </Link>
            </div>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
                Where to read more
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 22px" }}>
                The writing.
              </h2>
              <p style={{ fontSize: 15.5, color: PALETTE.body, lineHeight: 1.65, margin: "0 0 18px", fontFamily: SANS }}>
                Dr. Gabi&apos;s perspective on the oral-systemic connection, integrative dentistry frameworks, and patient-centered care lives in the Primary Journal, accessible directly from this site.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Link href="/blogs/" style={{ fontFamily: SANS, fontSize: 14, color: PALETTE.navy, textDecoration: "underline", textDecorationColor: "rgba(14,34,64,0.3)", textUnderlineOffset: 4, fontWeight: 500 }}>
                  Primary Journal: articles and essays →
                </Link>
                <a href="https://www.linkedin.com/in/drgabi" target="_blank" rel="noopener" style={{ fontFamily: SANS, fontSize: 14, color: PALETTE.navy, textDecoration: "underline", textDecorationColor: "rgba(14,34,64,0.3)", textUnderlineOffset: 4, fontWeight: 500 }}>
                  LinkedIn: @drgabi →
                </a>
                <Link href="/five-dimensions/" style={{ fontFamily: SANS, fontSize: 14, color: PALETTE.navy, textDecoration: "underline", textDecorationColor: "rgba(14,34,64,0.3)", textUnderlineOffset: 4, fontWeight: 500 }}>
                  The Five Dimensions framework →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKEND */}
      <section style={{ background: PALETTE.cream, padding: "120px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            Two ways to start
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 28px" }}>
            Start where it <em style={{ color: PALETTE.blue }}>makes sense for you</em>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: PALETTE.body, margin: "0 0 36px" }}>
            Most people come to us for one real thing: a cavity, a chipped tooth, a missing tooth they have lived with too long, or finally wanting a brighter smile. That is the door in. From there, take the 6-minute assessment to get your Primary iD, then sit down with Dr. Gabi for a comprehensive first visit and leave with a plan the same day.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
            <Link href="/diagnostics/" style={{ background: PALETTE.navy, color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
              Take the assessment
            </Link>
            <Link href="/book/preventive/" style={{ background: "transparent", color: PALETTE.navy, padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15, border: `1.5px solid ${PALETTE.navy}` }}>
              Schedule a first visit
            </Link>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 13.5, color: PALETTE.muted, margin: 0 }}>
            Or call (310) 564-8990. We&apos;re here Mon–Thu 8a–6p, Fri 8a–5p.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 880px) {
          .about-hero { grid-template-columns: 1fr !important; gap: 36px !important; }
          .cred-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .cred-grid > div:nth-child(3) { border-left: none !important; padding-left: 0 !important; }
          .focus-grid { grid-template-columns: 1fr !important; }
          .recog-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      <SiteFooter />
    </>
  )
}
