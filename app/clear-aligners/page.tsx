import Link from "next/link"
import { ServiceSchema, FAQPageSchema } from "@/components/schema"
import MobileStickyCTA from "@/components/mobile-sticky-cta"
import { AlignerFilm } from "@/components/aligner-page/aligner-film"
import { SmileCases } from "@/components/aligner-page/smile-cases"
import { ALIGNER_PAGE, FILMS, filmOn, GOOGLE, PHONE } from "@/lib/aligner-page"

// ─────────────────────────────────────────────────────────────────────────
// /clear-aligners/ : the clear aligner landing page (ads and outreach land
// here). Built from the Primary iD Project spec "2 Website/Aligner landing
// page.md" (final draft, 20 Oct 2026) and the canvas "Clear aligner landing
// page" (version 9). The spec wins where they differ.
//
// A landing page, so no site navigation: logo, phone and one button.
// Section anchors match the search ad groups: #smile, #life, #finish, #years.
// Blocked slots, film switches and the go-live switch are in
// lib/aligner-page.ts. Copy rules: no em dashes, Dr. Gabi is a prosthodontist
// (never an orthodontist), no wear number unless it is OrthoFX's own wording.
// ─────────────────────────────────────────────────────────────────────────

const DISCLOSURE = "Dramatization. Not actual Primary patients."

// The three written reviews already published on the home page
// (components/testimonials.tsx), quoted as written.
const REVIEWS = [
  { name: "Ali D., MD", quote: "I have been treated by Dr. Gabi and his team for two years, for everything from cleanings to crowns and implants, with excellent results. As a physician myself, I highly recommend Dr. Gabi and his team for any work, regardless of complexity." },
  { name: "Sarah H.", quote: "I really enjoyed how personable Dr. Gabi is. He genuinely listens and is never rushed. He gave me the most thorough cleaning I have ever had, and his office and staff are lovely." },
  { name: "Sivan T.", quote: "I called for an emergency and Dr. Tzur saw me right away. He was so comforting through the whole experience and completely changed how I feel about going in. I could not recommend a better doctor and team to take care of your smile." },
]

function faqItems() {
  const items: { q: string; a: string }[] = [
    { q: "Will people see them?", a: "They're clear and hard to spot in conversation. Small attachments on some teeth can show up close." },
    { q: "How many hours a day will I wear them?", a: "Dr. Gabi prescribes your hours, case by case." + (ALIGNER_PAGE.airflexClaim ? " " + ALIGNER_PAGE.airflexClaim.claim : "") },
    { q: "Will I talk differently?", a: "Some people notice a slight lisp for the first few days. It usually settles as you get used to them." },
    { q: "How long does it take?", a: "It depends on the case. Your plan gives your estimate, and refinements can add months." },
    { q: "My teeth moved after braces. Can you fix that?", a: "Often, yes. That's common, and it's why retention matters." },
    { q: "Do I have to wear a retainer forever?", a: "Teeth move for life, so the long-term plan includes retainers, usually at night. We check them at your preventive visits." },
    { q: "Am I too old?", a: "Adults of any age can straighten their teeth when the gums and bone around them are healthy. That's what we check first." },
    { q: "Is Dr. Gabi an orthodontist?", a: "No. He is a prosthodontist, a dentist who specialises in restoring and replacing teeth, and he plans aligners as part of that. Complex bites go to an orthodontist." },
    { q: "Do aligners help snoring or sleep apnea?", a: "No. If you snore or have signs of sleep apnea, we screen you and refer you to a sleep physician." },
    { q: "Can I use FSA or HSA funds?", a: "Often, yes. We give you an itemised receipt, and your plan decides." },
    { q: "Does insurance cover it?", a: "Some plans include an orthodontic benefit, and we check it for you. The fee is the same." },
  ]
  return items
}

export default function ClearAlignersPage() {
  const door = ALIGNER_PAGE.doorHref
  const quick = ALIGNER_PAGE.showQuickToBringBack
  const faq = faqItems()
  return (
    <main className="al">
      <style>{CSS}</style>
      <ServiceSchema
        serviceType="Clear aligners"
        description="Clear aligner treatment planned by Dr. Tzur Gabi, a prosthodontist, with retention checked at your visits."
        url="https://myprimaryid.com/clear-aligners/"
      />
      <FAQPageSchema questions={faq.map((f) => ({ question: f.q, answer: f.a }))} />

      {/* ── Header: logo, phone, one button ── */}
      <header className="al-header">
        <div className="al-header-in">
          <Link href="/" className="al-logo" aria-label="Primary Integrative Dentistry, home">
            <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden="true"><circle cx="4" cy="5" r="3" fill="#24A7E0" /><circle cx="13" cy="9" r="3" fill="#24A7E0" /><circle cx="22" cy="5" r="3" fill="#24A7E0" /></svg>
            <span>Primary</span>
          </Link>
          <div className="al-header-actions">
            <a href={PHONE.href} className="al-header-phone">{PHONE.display}</a>
            <a href={door} className="al-btn-sm">See if aligners suit you</a>
          </div>
        </div>
      </header>

      {/* ── 1. Hero ── */}
      <section id="top" className="al-hero">
        <div className="al-wrap al-two al-two-wide">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span className="al-chip">Clear aligners &middot; Brentwood</span>
            <h1 className="al-h1">A smile you&rsquo;ll <em>want to show.</em></h1>
            <p className="al-lead-serif">Photos you don&rsquo;t retake. Laughing on camera. Your own teeth, straighter.</p>
            <p style={{ margin: 0, maxWidth: "34em" }}>Clear aligners planned by Dr. Tzur Gabi, a prosthodontist who designs the whole smile, then looks after it at your visits for years.</p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, marginTop: 4 }}>
              <a href={door} className="al-btn">See if aligners are right for you</a>
              <a href={PHONE.href} className="al-btn-ghost">Call {PHONE.display}</a>
              <span style={{ fontSize: 12.5 }}>Three questions &middot; About a minute &middot; A person from our team calls you back</span>
              {filmOn("journey") && (
                <a href="#how" className="al-watch">
                  <span aria-hidden="true" className="al-watch-dot"><svg width="10" height="11" viewBox="0 0 20 22"><path d="M4 2l14 9-14 9z" fill="#0E2240" /></svg></span>
                  Watch the whole journey &middot; {FILMS.journey.length}
                </a>
              )}
            </div>
            <a href={GOOGLE.url} target="_blank" rel="noopener" className="al-rating"><span aria-hidden="true" className="al-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span>{GOOGLE.rating} on Google</span></a>
          </div>
          <div style={{ position: "relative" }}>
            <img src="/images/aligners/hero-model.webp" alt="A woman smiling over a cup of coffee" width={960} height={1200} className="al-hero-img" />
            <span className="al-model-tag">Model</span>
          </div>
        </div>
      </section>

      {/* ── 2. What straightening changes ── */}
      <section id="smile" className="al-sec al-line">
        <div className="al-wrap" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          <SmileCases quickToBringBack={quick} doorHref={door} />
          {filmOn("behindTheCamera") && (
            <div className="al-two al-film-row">
              <AlignerFilm film={FILMS.behindTheCamera} />
              <div className="al-film-text">
                <span className="al-eyebrow-plain">A smile story &middot; film</span>
                <h3 className="al-h3">Behind <em>the camera.</em></h3>
                <p className="al-quote">&ldquo;Somewhere along the way, I learned to smile with my mouth closed.&rdquo;</p>
                <p className="al-small">{DISCLOSURE}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. Made for your life ── */}
      <section id="life" className="al-sec al-navy">
        <div className="al-wrap" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <div className="al-two">
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="al-eyebrow al-on-navy">Made for your life</div>
              <h2 className="al-h2 al-h2-light">Straighter teeth, <em>without putting life on hold.</em></h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,.80)" }}>Clear aligners come out for coffee, for lunch and for the dinner you&rsquo;d rather not miss, and they&rsquo;re hard to spot in conversation. For the right cases, Dr. Gabi may prescribe AirFlex&trade; by OrthoFX, made from their HyperElastic&trade; polymer.</p>
              {ALIGNER_PAGE.airflexClaim && (
                <p style={{ margin: 0, color: "#FFFFFF" }}>
                  {ALIGNER_PAGE.airflexClaim.claim}
                  <span style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,.72)", marginTop: 6 }}>{ALIGNER_PAGE.airflexClaim.footnote}</span>
                </p>
              )}
              <p style={{ margin: 0, fontWeight: 600, color: "#FFFFFF" }}>Dr. Gabi prescribes your hours.</p>
            </div>
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", background: "#0B1B35" }}>
              <img src="/images/aligners/airflex-aligner.webp" alt="A clear aligner" width={1288} height={1000} style={{ display: "block", width: "100%", height: "auto" }} />
              <span style={{ position: "absolute", left: 14, bottom: 12, fontSize: 11, color: "rgba(255,255,255,.75)" }}>AirFlex aligner, image courtesy of OrthoFX</span>
            </div>
          </div>
          <div className="al-cards4">
            {[
              { h: "Clear", p: "Hard to spot across a table or on a call. Small attachments on some teeth can show up close." },
              { h: "Out to eat", p: "Take them out to eat and to drink anything but water, then back in." },
              { h: "Hours you’ll keep", p: "People told to wear aligners 22 hours a day wore them about 14 to 17 in a study that measured it. We plan with you for the hours you’ll really keep.", note: "A randomised trial of 40 adults with sensors in their aligners" },
              { h: "Checked as you go", p: "Check-ins every six to eight weeks, with monitoring between visits." },
            ].map((c) => (
              <div key={c.h} className="al-card-navy">
                <h3 className="al-card-h">{c.h}</h3>
                <p style={{ margin: 0, fontSize: 14.5, color: "rgba(255,255,255,.74)" }}>{c.p}</p>
                {c.note && <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,.62)" }}>{c.note}</p>}
              </div>
            ))}
          </div>
          {filmOn("twice") && (
            <div className="al-two al-film-row al-film-row-navy">
              <AlignerFilm film={FILMS.twice} dark />
              <div className="al-film-text">
                <span className="al-eyebrow-plain" style={{ color: "#5BC0EC" }}>A smile story &middot; film</span>
                <h3 className="al-h3 al-h3-light">Twice, <em>and then it fit.</em></h3>
                <p className="al-quote" style={{ color: "#FFFFFF" }}>&ldquo;This time, they asked how my days actually go. Now they go in after dinner, and come out with my morning coffee.&rdquo;</p>
                <p className="al-small" style={{ color: "rgba(255,255,255,.72)" }}>{DISCLOSURE}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Smile stories (actual patients only; reviews until then) ── */}
      <section id="stories" className="al-sec al-line">
        <div className="al-wrap" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760 }}>
            <div className="al-eyebrow">Smile stories</div>
            <h2 className="al-h2">Straightened here, <em>in their words.</em></h2>
          </div>
          <div className="al-cards3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="al-review">
                <span aria-hidden="true" className="al-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <blockquote style={{ margin: 0, fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 17, lineHeight: 1.6, color: "#0E2240" }}>&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption style={{ fontSize: 13, fontWeight: 600 }}>{r.name}, Google review</figcaption>
              </figure>
            ))}
          </div>
          <div className="al-review-foot">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span aria-hidden="true" className="al-stars" style={{ fontSize: 18 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span><span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 24, color: "#0E2240" }}>{GOOGLE.rating} on Google</span></div>
            <a href={GOOGLE.url} target="_blank" rel="noopener" className="al-link">Read the reviews on Google</a>
          </div>
        </div>
      </section>

      {/* ── 5. The whole smile ── */}
      <section id="finish" className="al-sec al-wash">
        <div className="al-wrap" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760 }}>
            <div className="al-eyebrow">The whole smile</div>
            <h2 className="al-h2">Straighten. Brighten. <em>Then decide.</em></h2>
            <p style={{ margin: 0 }}>An aligner company sells trays. A prosthodontist plans the finished smile: where your teeth sit, the shade, and what, if anything, comes after. In the right order, you often need less.</p>
          </div>
          <div className="al-cards3">
            {[
              { n: "01", h: "Straighten", p: "Aligners move your teeth into the positions Dr. Gabi has planned." },
              { n: "02", h: "Brighten", p: "Whitening once your teeth are straight, so the shade comes out even." },
              { n: "03", h: "Refine, only if needed", p: "Bonding or veneers only where they still add something. Straight teeth often need less removed to fit one." },
            ].map((s) => (
              <div key={s.n} className="al-card">
                <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, color: "#24A7E0" }}>{s.n}</span>
                <h3 className="al-card-h al-card-h-dark" style={{ fontSize: 24 }}>{s.h}</h3>
                <p style={{ margin: 0, fontSize: 15 }}>{s.p}</p>
              </div>
            ))}
          </div>
          {ALIGNER_PAGE.showPreview3d && (
            <div className="al-panel-navy">
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <h3 className="al-h3 al-h3-light" style={{ fontSize: 26 }}>See your new smile <em>before you start.</em></h3>
                <p style={{ margin: 0, color: "rgba(255,255,255,.80)", fontSize: 15 }}>Your plan comes with a 3D preview of how your teeth are planned to move, so you can see the finish before you commit.</p>
              </div>
              <img src="/images/aligners/airflex-aligner-wide.webp" alt="A clear aligner" width={788} height={416} style={{ display: "block", width: "100%", height: "auto", borderRadius: 16 }} />
            </div>
          )}
        </div>
      </section>

      {/* ── 6. Dr. Gabi ── */}
      <section id="dr-gabi" className="al-sec al-line">
        <div className="al-wrap" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 820 }}>
            <div className="al-eyebrow">Your dentist</div>
            <h2 className="al-h2">Meet Dr. Gabi, <em>the prosthodontist who plans your finished smile.</em></h2>
            <p style={{ margin: 0 }}>A straight smile still has to fit the rest of your mouth: your bite, your gums, the work you already have and the work you may want later. Planning all of that together is what a prosthodontist is trained to do.</p>
            {ALIGNER_PAGE.credentials && <p style={{ margin: 0, fontSize: 14 }}>{ALIGNER_PAGE.credentials}</p>}
          </div>
          <div className="al-cards4">
            {[
              { h: "Prosthodontist", p: "Three or more years of training after dental school, focused on restoring and replacing teeth." },
              { h: "Plans the finish", p: "Position, shade and any later work planned together, so they fit." },
              { h: "One doctor, start to finish", p: "He plans your case and sees it through. You are not handed from one office to another." },
              { h: "Says no when it’s wrong", p: "If braces would serve you better, he will tell you and refer you." },
            ].map((d) => (
              <div key={d.h} style={{ borderTop: "1px solid #0E2240", paddingTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                <h3 className="al-card-h al-card-h-dark" style={{ fontSize: 20 }}>{d.h}</h3>
                <p style={{ margin: 0, fontSize: 14 }}>{d.p}</p>
              </div>
            ))}
          </div>
          <div className="al-letter">
            <span className="al-initials" aria-hidden="true">TG</span>
            <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 12 }}>
              <p className="al-letter-p">Most people who ask me about aligners have been thinking about it for years. Usually it&rsquo;s a photo, or a call where they caught themselves on screen.</p>
              <p className="al-letter-p">Come in and I&rsquo;ll show you what your smile could look like, what it takes and what it costs, in writing. And if aligners aren&rsquo;t the right call for your teeth, I&rsquo;ll tell you that too.</p>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Dr. Tzur Gabi, prosthodontist and founder</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. How it works (the journey film leads) ── */}
      <section id="how" className="al-sec al-line">
        <div className="al-wrap" style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760 }}>
            <div className="al-eyebrow">How it works</div>
            <h2 className="al-h2">From first scan <em>to finished smile.</em></h2>
          </div>
          {filmOn("journey") && (
            <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              <AlignerFilm film={FILMS.journey} large />
              <figcaption className="al-journey-cap">
                <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 21, color: "#0E2240" }}>The whole journey, <em style={{ fontStyle: "italic", color: "#24A7E0" }}>in about a minute.</em></span>
                <span className="al-small">With AirFlex&trade; by OrthoFX. Includes a dramatization. Not actual Primary patients.</span>
              </figcaption>
            </figure>
          )}
          <ol className="al-steps">
            {[
              { h: "Your first visit", p: "A 3D scan, X-rays, your gums and your bite. Primary evaluates your bite, gums, oral health and relevant sleep or airway history before recommending treatment." },
              { h: "Your plan" + (ALIGNER_PAGE.showPreview3d ? " and preview" : ""), p: "Which aligner, how many hours a day, roughly how long" + (ALIGNER_PAGE.showPreview3d ? ", your fee in writing, and a 3D preview of the finish." : ", and your fee in writing.") },
              { h: "Your aligners", p: "Check-ins every six to eight weeks, monitoring in between, and refinements along the way, which most treatments need." },
              { h: "Your finish", p: "A final scan in your Primary iD record, your first retainers, and whitening if you’d like it." },
            ].map((s, i) => (
              <li key={s.h} className="al-step">
                <span style={{ fontSize: 12 }}>Step {i + 1}</span>
                <h3 className="al-card-h al-card-h-dark" style={{ fontSize: 22 }}>{s.h}</h3>
                <p style={{ margin: 0, fontSize: 14.5 }}>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 8. Looked after (navy) ── */}
      <section id="years" className="al-sec al-navy">
        <div className="al-wrap al-two al-two-start">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="al-eyebrow al-on-navy">Looked after</div>
            <h2 className="al-h2 al-h2-light">Teeth move for life. <em>So we keep looking.</em></h2>
            <p style={{ margin: 0, color: "rgba(255,255,255,.80)" }}>
              Teeth moved after braces? {quick ? "It’s common, and usually quick to bring back." : "It’s common."} This time, the result is checked at your visits.
            </p>
            {filmOn("fourteen") && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                <AlignerFilm film={FILMS.fourteen} dark />
                <p style={{ margin: 0, fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 18, lineHeight: 1.55, color: "#FFFFFF" }}>Fourteen. <em style={{ fontStyle: "italic", color: "#5BC0EC" }}>&ldquo;And this time there&rsquo;s a plan for after.&rdquo;</em></p>
                <p className="al-small" style={{ color: "rgba(255,255,255,.72)" }}>{DISCLOSURE}</p>
              </div>
            )}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.16)" }}>
            {[
              { h: "Retainers, planned in", p: "Usually worn at night for the long term. Your first ones come at the finish." },
              { h: "A scan comparison at your visits", p: "We compare a fresh scan with the one from the day you finished, so small movement is caught early." },
              { h: "With your membership", p: "The first year of checks is part of your treatment. After that they come with your preventive visits as a Primary iD member." },
            ].map((r) => (
              <div key={r.h} style={{ padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,.16)", display: "flex", flexDirection: "column", gap: 4 }}>
                <h3 className="al-card-h">{r.h}</h3>
                <p style={{ margin: 0, fontSize: 14.5, color: "rgba(255,255,255,.74)" }}>{r.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. What it costs: hidden until B2 ── */}

      {/* ── 10. Am I a candidate? ── */}
      <section id="candidate" className="al-sec al-line">
        <div className="al-wrap al-two">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="al-eyebrow">Is it right for you</div>
            <h2 className="al-h2">Am I a candidate <em>for aligners?</em></h2>
            <p style={{ margin: 0 }}>Most adults are, when the gums and bone around their teeth are healthy. Dr. Gabi decides after a 3D scan and a look at your gums and bite. He asks four things.</p>
            <p style={{ margin: 0, fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 19, color: "#0E2240" }}>&ldquo;There are teeth I won&rsquo;t move. If yours are better treated with braces, I&rsquo;ll tell you.&rdquo;</p>
          </div>
          <div className="al-qbox">
            {[
              { h: "What would you like to change?", p: "Straighter, more even, or ready for veneers or crowns. Your goal shapes the plan." },
              { h: "Do your gums bleed when you brush?", p: "If they do, we treat your gums first. Teeth move through bone, so healthy gums come first." },
              { h: "Have you had braces before?", p: "Teeth that moved back are common. Your history helps plan the retainers that keep them." },
              { h: "Do you grind or clench?", p: "It changes how we plan your bite and your retainers." },
            ].map((q, i, a) => (
              <div key={q.h} style={{ padding: "18px 0", borderBottom: i < a.length - 1 ? "1px solid rgba(14,34,64,.10)" : "none" }}>
                <h3 className="al-card-h al-card-h-dark" style={{ fontSize: 19, marginBottom: 4 }}>{q.h}</h3>
                <p style={{ margin: 0, fontSize: 14.5 }}>{q.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Questions ── */}
      <section id="questions" className="al-sec al-line">
        <div className="al-wrap" style={{ maxWidth: 860, display: "flex", flexDirection: "column", gap: 26 }}>
          <h2 className="al-h2">Questions <em>people ask first.</em></h2>
          <div style={{ borderTop: "1px solid rgba(14,34,64,.12)" }}>
            {faq.map((f, i) => (
              <details key={f.q} open={i === 0} className="al-faq">
                <summary>{f.q}</summary>
                <p style={{ margin: "10px 0 0" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. The ask ── */}
      <section id="ask" className="al-sec al-wash">
        <div className="al-wrap" style={{ maxWidth: 860, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20 }}>
          <h2 className="al-h2" style={{ fontSize: "clamp(34px, 4.4vw, 52px)" }}>A smile you&rsquo;ll <em>want to show.</em></h2>
          <p style={{ margin: 0, maxWidth: "34em" }}>Three short questions, then a person from our team calls you within one business hour.</p>
          <a href={door} className="al-btn">See if aligners are right for you</a>
          <a href={PHONE.href} className="al-link">Or call {PHONE.display}</a>
        </div>
      </section>

      <footer className="al-footer">
        <div className="al-wrap al-footer-in">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: "#0E2240" }}>Primary Integrative Dentistry</span>
            <span>11980 San Vicente Blvd, Suite 902, Los Angeles, CA 90049</span>
            <a href={PHONE.href} style={{ color: "#0E2240" }}>{PHONE.display}</a>
          </div>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6 }}>The Primary iD is a risk-and-opportunity assessment. It is directional, not a diagnosis. AirFlex and HyperElastic are trademarks of OrthoFX. People shown are models unless named as patients.</p>
        </div>
      </footer>

      <MobileStickyCTA bookHref={door} bookLabel="See if aligners suit you" />
    </main>
  )
}

const CSS = `
.al{--sans:var(--font-montserrat),'Montserrat','Helvetica Neue',Arial,sans-serif;--serif:Georgia,'Times New Roman',serif;
  font-family:var(--sans);color:#3a4a66;background:#FAF8F5;font-size:16px;line-height:1.7;-webkit-font-smoothing:antialiased;}
.al *{box-sizing:border-box;}
.al-wrap{max-width:1120px;margin:0 auto;width:100%;}
.al-sec{padding:96px 24px;}
.al-line{border-top:1px solid rgba(14,34,64,.08);}
.al-navy{background:#0E2240;}
.al-wash{background:linear-gradient(180deg,#F2F6FA 0%,#FAF8F5 100%);}
.al-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:56px;align-items:center;}
.al-two-wide{grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));}
.al-two-start{align-items:start;gap:48px;}
.al-header{position:sticky;top:0;z-index:20;background:rgba(250,248,245,.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(14,34,64,.10);}
.al-header-in{max-width:1120px;margin:0 auto;padding:12px 24px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;}
.al-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:#0E2240;font-weight:700;font-size:21px;letter-spacing:-.02em;}
.al-header-actions{display:flex;flex-wrap:wrap;align-items:center;gap:16px;}
.al-header-phone{font-size:14px;font-weight:500;color:#0E2240;text-decoration:none;}
.al-btn-sm{font-size:14px;font-weight:600;color:#FFFFFF;background:#0E2240;border-radius:8px;padding:11px 18px;text-decoration:none;min-height:44px;display:inline-flex;align-items:center;}
.al-hero{padding:64px 24px 80px;background:linear-gradient(180deg,#F2F6FA 0%,#FAF8F5 100%);}
.al-chip{align-self:flex-start;font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#0E2240;background:rgba(36,167,224,.10);border:1px solid rgba(36,167,224,.35);border-radius:999px;padding:6px 12px;}
.al-h1{margin:0;font-family:var(--serif);font-weight:400;font-size:clamp(42px,5.6vw,64px);line-height:1.06;letter-spacing:-.02em;color:#0E2240;}
.al-h1 em,.al-h2 em,.al-h3 em{font-style:italic;color:#24A7E0;}
.al-lead-serif{margin:0;font-family:var(--serif);font-size:20px;line-height:1.5;color:#0E2240;}
.al-btn{font-size:15px;font-weight:600;color:#FFFFFF;background:#0E2240;border-radius:999px;padding:16px 28px;text-decoration:none;min-height:52px;display:inline-flex;align-items:center;}
.al-btn-ghost{font-size:14px;font-weight:600;color:#0E2240;border:1px solid rgba(14,34,64,.22);border-radius:999px;padding:11px 20px;text-decoration:none;background:#FFFFFF;}
.al-watch{display:inline-flex;align-items:center;gap:10px;min-height:44px;font-size:13.5px;font-weight:600;color:#0E2240;text-decoration:none;}
.al-watch-dot{width:30px;height:30px;border-radius:50%;border:1px solid rgba(14,34,64,.25);background:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;padding-left:2px;}
.al-rating{display:flex;flex-wrap:wrap;align-items:center;gap:10px;font-size:13px;font-weight:600;color:#0E2240;text-decoration:none;}
.al-stars{color:#D4B584;letter-spacing:2px;}
.al-hero-img{display:block;width:100%;height:auto;aspect-ratio:4/5;object-fit:cover;border-radius:24px;box-shadow:0 24px 60px rgba(14,34,64,.16);}
.al-model-tag{position:absolute;left:14px;bottom:14px;font-size:11px;font-weight:600;letter-spacing:.06em;color:#0E2240;background:rgba(255,255,255,.92);border-radius:999px;padding:5px 10px;}
.al-eyebrow{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#1F86B5;display:flex;align-items:center;gap:10px;}
.al-eyebrow::before{content:"";width:26px;height:1px;background:currentColor;display:inline-block;}
.al-on-navy{color:#5BC0EC;}
.al-eyebrow-plain{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#1F86B5;}
.al-h2{margin:0;font-family:var(--serif);font-weight:400;font-size:clamp(32px,4vw,48px);line-height:1.1;letter-spacing:-.015em;color:#0E2240;}
.al-h2-light{color:#FFFFFF;}
.al-h2-light em,.al-h3-light em{color:#5BC0EC;}
.al-h3{margin:0;font-family:var(--serif);font-weight:400;font-size:30px;line-height:1.15;color:#0E2240;}
.al-h3-light{color:#FFFFFF;}
.al-quote{margin:0;font-family:var(--serif);font-size:19px;line-height:1.55;color:#0E2240;}
.al-small{margin:0;font-size:12.5px;color:#3a4a66;}
.al-film-row{gap:40px;border-top:1px solid rgba(14,34,64,.10);padding-top:56px;}
.al-film-row-navy{border-top-color:rgba(255,255,255,.14);padding-top:48px;}
.al-film-text{display:flex;flex-direction:column;gap:12px;}
.al-cards4{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px;}
.al-cards3{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:16px;}
.al-card-navy{border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:22px;display:flex;flex-direction:column;gap:8px;}
.al-card-h{margin:0;font-family:var(--serif);font-weight:400;font-size:21px;color:#FFFFFF;}
.al-card-h-dark{color:#0E2240;}
.al-card{background:#FFFFFF;border:1px solid rgba(14,34,64,.10);border-radius:24px;padding:28px;display:flex;flex-direction:column;gap:10px;}
.al-review{margin:0;background:#FFFFFF;border:1px solid rgba(14,34,64,.10);border-radius:24px;padding:26px;display:flex;flex-direction:column;gap:12px;}
.al-review-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid rgba(14,34,64,.10);padding-top:22px;}
.al-link{font-size:13.5px;font-weight:600;color:#0E2240;text-decoration:underline;text-decoration-color:#24A7E0;text-underline-offset:4px;}
.al-panel-navy{background:#0E2240;border-radius:24px;padding:28px 32px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:24px;align-items:center;}
.al-letter{background:#FFFFFF;border:1px solid rgba(14,34,64,.10);border-radius:24px;padding:28px 32px;display:flex;flex-wrap:wrap;gap:22px;align-items:flex-start;}
.al-initials{flex:none;width:64px;height:64px;border-radius:50%;background:#E9EEF4;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:22px;color:#0E2240;}
.al-letter-p{margin:0;font-family:var(--serif);font-size:19px;line-height:1.6;color:#0E2240;}
.al-journey-cap{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:6px 24px;}
.al-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px;}
.al-step{border-top:2px solid #24A7E0;padding-top:16px;display:flex;flex-direction:column;gap:8px;}
.al-qbox{background:#FFFFFF;border:1px solid rgba(14,34,64,.10);border-radius:24px;padding:8px 26px;}
.al-faq{border-bottom:1px solid rgba(14,34,64,.12);padding:18px 4px;}
.al-faq summary{cursor:pointer;font-family:var(--serif);font-size:19px;color:#0E2240;}
.al-footer{padding:44px 24px 96px;border-top:1px solid rgba(14,34,64,.10);font-size:13.5px;}
.al-footer-in{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:24px;}
@media (max-width:759px){
  .al-sec{padding:72px 20px;}
  .al-hero{padding:40px 20px 64px;}
  .al-header-phone{display:none;}
  .al-two{gap:36px;}
  .al-panel-navy,.al-letter{padding:24px;}
}
`
