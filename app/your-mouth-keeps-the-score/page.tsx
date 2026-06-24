"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader, SiteFooter, PALETTE } from "@/components/site-shell"

// ─────────────────────────────────────────────────────────────────────────
// /your-mouth-keeps-the-score/ : Book landing page for Dr. Tzur Gabi's
// forthcoming book "Your Mouth Keeps the Score."
//
// Authority asset, not a product page. The book launches ~12 months out;
// today's job is to build credibility, capture emails into the funnel
// (tagged source: book), and sell the oral-systemic worldview.
//
// Book = the why. Primary iD = the how. Two states, one flag (LAUNCHED):
// pre-launch shows waitlist / sample-chapter capture; launch shows
// retailer / pre-order links. Pre-launch is what renders now.
// ─────────────────────────────────────────────────────────────────────────

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

// State flag: pre-launch (waitlist / sample chapter) vs. launch (retailers).
const LAUNCHED = false

// Locked dimension colors. Used only on the five dimension chapters and the
// three-argument cards. No gold anywhere.
const DIM = {
  oral: "#48C28C",
  sleep: "#24A7E0",
  nutrition: "#C7305A",
  genetics: "#7B68EE",
  longevity: "#0E2240",
}

// ─── Email capture (client) ───────────────────────────────────────────────
function EmailCapture({ tone = "light", buttonLabel = "Read the first chapter" }: { tone?: "light" | "dark"; buttonLabel?: string }) {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO(farhad): wire to GHL lead endpoint, tag source: book
    setDone(true)
  }

  const onDark = tone === "dark"
  const fieldText = onDark ? "#FEFCF9" : PALETTE.navy
  const fieldBorder = onDark ? "rgba(254,252,249,0.3)" : PALETTE.border
  const fieldBg = onDark ? "rgba(254,252,249,0.06)" : PALETTE.white
  const microColor = onDark ? "rgba(254,252,249,0.6)" : PALETTE.muted

  if (done) {
    return (
      <div style={{ maxWidth: 460 }}>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: onDark ? "#FEFCF9" : PALETTE.navy, lineHeight: 1.5, margin: "0 0 8px" }}>
          Check your inbox for the prologue.
        </div>
        <p style={{ fontFamily: SANS, fontSize: 13.5, color: microColor, lineHeight: 1.55, margin: 0 }}>
          We will also send a quiet note when the book ships. Nothing else.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          style={{
            flex: "1 1 200px",
            minWidth: 0,
            padding: "13px 18px",
            borderRadius: 999,
            border: `1.5px solid ${fieldBorder}`,
            background: fieldBg,
            color: fieldText,
            fontFamily: SANS,
            fontSize: 15,
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            background: PALETTE.blue,
            color: "#FFFFFF",
            padding: "13px 26px",
            borderRadius: 999,
            border: "none",
            fontFamily: SANS,
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {buttonLabel}
        </button>
      </div>
      <p style={{ marginTop: 14, fontFamily: SANS, fontSize: 12.5, color: microColor, lineHeight: 1.55, letterSpacing: "0.02em" }}>
        No spam. The prologue in your inbox, plus a note when it ships.
      </p>
    </form>
  )
}

// ─── Book cover mockup ────────────────────────────────────────────────────
// TODO: swap this CSS mockup for the final cover image when available (replace with <img src=...>)
function BookCover() {
  return (
    <div style={{ perspective: "1600px", width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          position: "relative",
          width: "min(320px, 80vw)",
          transform: "rotateY(-14deg) rotateX(2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* drop shadow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "8%",
            right: "-4%",
            bottom: "-5%",
            height: "92%",
            background: "rgba(0,0,0,0.45)",
            filter: "blur(34px)",
            borderRadius: 14,
            transform: "translateZ(-60px) rotateX(4deg)",
            zIndex: 0,
          }}
        />
        {/* cover face */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            aspectRatio: "2 / 3",
            borderRadius: "3px 8px 8px 3px",
            background: "linear-gradient(125deg, #0E2240 0%, #142d52 48%, #0c1d38 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "44px 30px 38px",
            overflow: "hidden",
          }}
        >
          {/* spine edge (left) */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 14,
              background: "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 45%, rgba(255,255,255,0.05) 100%)",
            }}
          />
          {/* page block edge (right) */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 3,
              bottom: 3,
              right: -7,
              width: 8,
              background: "linear-gradient(90deg, #d9d2c6 0%, #efe9df 50%, #c9c2b4 100%)",
              borderRadius: "0 3px 3px 0",
              transform: "translateZ(-2px)",
            }}
          />

          {/* eyebrow */}
          <div
            style={{
              fontFamily: SANS,
              fontSize: 9.5,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: PALETTE.blue,
              fontWeight: 700,
              textAlign: "center",
              marginTop: 6,
            }}
          >
            A New Science of the Mouth
          </div>

          {/* title */}
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(26px, 7vw, 34px)",
                fontWeight: 400,
                color: PALETTE.cream,
                lineHeight: 1.08,
                letterSpacing: "0.01em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Your Mouth Keeps the Score
            </h2>
            <div aria-hidden style={{ width: 44, height: 1, background: "rgba(36,167,224,0.7)" }} />
          </div>

          {/* author */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: SERIF, fontSize: 15, letterSpacing: "0.08em", color: PALETTE.cream, textTransform: "uppercase" }}>
              Dr. Tzur Gabi
            </div>
            <div style={{ fontFamily: SANS, fontSize: 10, letterSpacing: "0.1em", color: "rgba(254,252,249,0.6)", marginTop: 6, textTransform: "uppercase" }}>
              Co-founder of Primary iD
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────
const ARGUMENTS = [
  {
    tag: "Argument One",
    color: DIM.oral,
    title: "The biological case",
    body: "The mouth is a diagnostic window and a causal lever. Oral inflammation is among the largest sources of chronic systemic inflammation, and the five dimensions are one biology seen through five clinically actionable lenses.",
  },
  {
    tag: "Argument Two",
    color: DIM.nutrition,
    title: "The cultural case",
    body: "The smile is the closest thing we have to a public face of the self. What we do to it, and what we ignore about it, is a cultural story, not just a clinical one.",
  },
  {
    tag: "Argument Three",
    color: DIM.genetics,
    title: "The reform case",
    body: "The split between dentistry and medicine was a historical accident, the 1840 mistake, and reuniting them is the reform the book argues for.",
  },
]

const PARTS = [
  {
    part: "Part I",
    name: "The Problem",
    chapters: [
      { label: "The 1840 Mistake" },
      { label: "What Lives in Your Mouth" },
    ],
  },
  {
    part: "Part II",
    name: "The Five Dimensions",
    note: "Each links to the five dimensions we score in every patient.",
    chapters: [
      { label: "Oral Health", color: DIM.oral, href: "/five-dimensions/" },
      { label: "Sleep & Airway", color: DIM.sleep, href: "/five-dimensions/" },
      { label: "Nutrition & the Microbiome", color: DIM.nutrition, href: "/five-dimensions/" },
      { label: "Genetics & Personalized Risk", color: DIM.genetics, href: "/five-dimensions/" },
      { label: "Longevity & Healthspan", color: DIM.longevity, href: "/five-dimensions/" },
    ],
  },
  {
    part: "Part III",
    name: "The Human",
    chapters: [
      { label: "The Smile and the Self" },
      { label: "A Visit That Could Save Your Life" },
    ],
  },
  {
    part: "Part IV",
    name: "The Reform",
    chapters: [
      { label: "The Honest Limits" },
      { label: "A New Architecture of Care" },
    ],
  },
]

const PODCAST_PILLARS = [
  "The 1840 Mistake",
  "The Five Dimensions",
  "The Smile and the Self",
  "The Honest Limits",
  "A New Architecture",
]

// ─── Book JSON-LD ─────────────────────────────────────────────────────────
const BOOK_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Your Mouth Keeps the Score",
  alternativeName: "A New Science of the Mouth",
  url: "https://myprimaryid.com/your-mouth-keeps-the-score/",
  inLanguage: "en",
  about: "How oral health shapes energy, longevity, and whole-body wellbeing; the oral-systemic connection and the reunion of dentistry and medicine.",
  abstract:
    "The mouth is the most-visited and least-integrated part of the body. Your Mouth Keeps the Score argues that reuniting it with the rest of healthcare is one of the highest-leverage moves available in preventive medicine.",
  author: {
    "@type": "Person",
    name: "Dr. Tzur Gabi",
    jobTitle: "Functional Prosthodontist & Oral Physician",
    url: "https://myprimaryid.com/about/",
  },
}

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BOOK_SCHEMA) }}
      />

      {/* 1 ── HERO (navy) */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 28px 110px" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 64, alignItems: "center" }}>
            <div className="hero-cover">
              <BookCover />
            </div>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, marginBottom: 24 }}>
                A New Science of the Mouth
              </div>
              <h1 style={{ fontFamily: SERIF, fontSize: "clamp(42px, 6vw, 68px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.015em", margin: "0 0 22px" }}>
                Your Mouth Keeps the <em style={{ color: PALETTE.blue }}>Score.</em>
              </h1>
              <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px, 2.6vw, 25px)", color: "rgba(184,226,244,0.95)", margin: "0 0 24px", lineHeight: 1.45, maxWidth: 560 }}>
                How oral health shapes your energy, longevity, and whole-body wellbeing.
              </p>
              <div style={{ fontFamily: SANS, fontSize: 14, color: "rgba(254,252,249,0.7)", letterSpacing: "0.04em", marginBottom: 38 }}>
                Dr. Tzur Gabi · Co-founder of Primary iD
              </div>

              {LAUNCHED ? (
                // Launch state: retailer / pre-order buttons would render here.
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["Amazon", "Bookshop", "Apple Books", "Audible"].map((r) => (
                    <a key={r} href="#" style={{ background: PALETTE.blue, color: "#FFFFFF", padding: "12px 22px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 14 }}>
                      {r}
                    </a>
                  ))}
                </div>
              ) : (
                <EmailCapture tone="dark" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2 ── THE THESIS MOMENT (full-bleed cream) */}
      <section style={{ background: PALETTE.cream, padding: "120px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(30px, 4.6vw, 46px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.22, letterSpacing: "-0.015em", margin: "0 0 36px" }}>
            The mouth has been carrying a story the rest of medicine refuses to read.
          </p>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(18px, 2.2vw, 21px)", color: PALETTE.body, lineHeight: 1.6, margin: 0, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            The mouth is the most-visited and least-integrated part of the body, and reuniting it with the rest of healthcare is one of the highest-leverage moves available in preventive medicine.
          </p>
        </div>
      </section>

      {/* 3 ── THE THREE ARGUMENTS (cream, 3 cards) */}
      <section style={{ background: PALETTE.warmWhite, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              The argument
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              Enter through <em style={{ color: PALETTE.blue }}>any one</em>. Leave convinced by all three.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: 0 }}>
              The case for reuniting the mouth with the rest of medicine is biological, cultural, and structural. The book makes all three, and each one stands on its own.
            </p>
          </div>

          <div className="arg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {ARGUMENTS.map((a, i) => (
              <div key={i} style={{ background: PALETTE.cream, border: `1px solid ${PALETTE.border}`, borderRadius: 16, padding: "30px 26px", borderTop: `3px solid ${a.color}` }}>
                <div style={{ fontFamily: SANS, fontSize: 11, color: a.color, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
                  {a.tag}
                </div>
                <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 400, color: PALETTE.navy, margin: "0 0 14px", lineHeight: 1.2 }}>
                  {a.title}
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 15, color: PALETTE.body, lineHeight: 1.65, margin: 0 }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ── INSIDE THE BOOK (navy) */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", padding: "96px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              Inside the book
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              Four parts. Eleven chapters. One <em style={{ color: PALETTE.blue }}>argument</em>.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(254,252,249,0.82)", margin: 0 }}>
              The structure of the book is the structure of the practice. The five chapters at the center are the five dimensions we score in every patient.
            </p>
          </div>

          <div className="toc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            {PARTS.map((p, i) => (
              <div key={i} style={{ background: "rgba(254,252,249,0.04)", border: "1px solid rgba(254,252,249,0.12)", borderRadius: 16, padding: "28px 26px" }}>
                <div style={{ fontFamily: SANS, fontSize: 11, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                  {p.part}
                </div>
                <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 400, color: "#FEFCF9", margin: "0 0 18px", lineHeight: 1.15 }}>
                  {p.name}
                </h3>
                {p.note && (
                  <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(184,226,244,0.85)", margin: "0 0 16px", lineHeight: 1.5 }}>
                    {p.note}
                  </p>
                )}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {p.chapters.map((ch, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: ch.color ?? "rgba(254,252,249,0.4)", flexShrink: 0 }} />
                      {ch.href ? (
                        <Link href={ch.href} style={{ fontFamily: SANS, fontSize: 15.5, color: "#FEFCF9", textDecoration: "none", fontWeight: 500, borderBottom: "1px solid rgba(36,167,224,0.5)", paddingBottom: 1 }}>
                          {ch.label} →
                        </Link>
                      ) : (
                        <span style={{ fontFamily: SANS, fontSize: 15.5, color: "rgba(254,252,249,0.92)" }}>
                          {ch.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Epilogue + tie line */}
          <div style={{ marginTop: 22, background: "rgba(36,167,224,0.07)", border: "1px solid rgba(36,167,224,0.25)", borderRadius: 16, padding: "30px 28px" }}>
            <div style={{ fontFamily: SANS, fontSize: 11, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
              Epilogue · The Person in the Chair
            </div>
            <p style={{ fontFamily: SERIF, fontSize: "clamp(19px, 2.4vw, 23px)", color: "#FEFCF9", lineHeight: 1.45, margin: "0 0 22px", maxWidth: 760 }}>
              The five chapters at the center of the book are the five dimensions we score in every patient. The book is the argument; your Primary iD is the practice.
            </p>
            <Link href="/five-dimensions/" style={{ background: PALETTE.blue, color: "#FFFFFF", padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15, display: "inline-block" }}>
              Build your Primary iD →
            </Link>
          </div>
        </div>
      </section>

      {/* 5 ── ABOUT THE AUTHOR (cream) */}
      <section style={{ background: PALETTE.cream, padding: "96px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="author-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
                About the author
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
                The architect who kept <em style={{ color: PALETTE.blue }}>widening</em> the lens.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: PALETTE.body, margin: "0 0 18px" }}>
                Dr. Tzur Gabi was born in Israel and immigrated to the United States at ten. Accepted to dental school early, he deferred to backpack through South America, then trained as a prosthodontist, the discipline of rebuilding what the mouth has lost. Colleagues came to call him the Dental Architect.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: PALETTE.body, margin: "0 0 28px" }}>
                He has mentored thousands of clinicians worldwide. He founded Primary, co-founded Caligenix, and is now building Primary iD and FODO, the practice and the platform where the argument of this book becomes everyday care.
              </p>
              <blockquote style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px, 2.6vw, 25px)", color: PALETTE.navy, lineHeight: 1.45, margin: "0 0 28px", paddingLeft: 22, borderLeft: `3px solid ${PALETTE.blue}` }}>
                I spent twenty years rebuilding mouths before I understood I had been rebuilding people the whole time.
              </blockquote>
              <Link href="/about/" style={{ fontFamily: SANS, fontSize: 14, color: PALETTE.navy, textDecoration: "underline", textDecorationColor: "rgba(14,34,64,0.3)", textUnderlineOffset: 4, fontWeight: 500 }}>
                More about Dr. Gabi →
              </Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* TODO: swap for Dr. Gabi's real author photo when available (replace with <img src=...>) */}
              <div style={{ width: "100%", maxWidth: 320, aspectRatio: "4 / 5", borderRadius: 18, background: "linear-gradient(160deg, #142d52 0%, #0E2240 100%)", border: `1px solid ${PALETTE.border}`, display: "flex", alignItems: "flex-end", padding: 24 }}>
                <div style={{ fontFamily: SERIF, fontSize: 17, color: PALETTE.cream }}>
                  Dr. Tzur Gabi
                  <div style={{ fontFamily: SANS, fontSize: 12, color: "rgba(254,252,249,0.65)", marginTop: 6, letterSpacing: "0.04em" }}>
                    Functional Prosthodontist & Oral Physician
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 ── THE PODCAST (navy) */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", padding: "96px 28px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            The podcast
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 22px" }}>
            One thesis, <em style={{ color: PALETTE.blue }}>two formats</em>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(254,252,249,0.82)", margin: "0 0 38px", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            The same name, the same argument, the conversation continued out loud. Each season follows the pillars of the book, with the clinicians and researchers living the reunion of the mouth and the body.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
            {PODCAST_PILLARS.map((p, i) => (
              <span key={i} style={{ fontFamily: SANS, fontSize: 13.5, color: "rgba(254,252,249,0.9)", border: "1px solid rgba(254,252,249,0.2)", borderRadius: 999, padding: "9px 18px" }}>
                {p}
              </span>
            ))}
          </div>
          <a href="#" style={{ background: "transparent", color: "#FEFCF9", padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15, border: "1.5px solid rgba(254,252,249,0.35)", display: "inline-block" }}>
            {LAUNCHED ? "Follow the show →" : "Notify me when it launches →"}
          </a>
        </div>
      </section>

      {/* 7 ── CONVERSION BLOCK (cream) */}
      <section style={{ background: PALETTE.cream, padding: "110px 28px", borderTop: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            Read it first
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400, color: PALETTE.navy, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 22px" }}>
            Read the <em style={{ color: PALETTE.blue }}>prologue</em> first.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: PALETTE.body, margin: "0 0 36px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Leave your email and we will send the opening of the book straight to your inbox, plus a quiet note when it ships. The argument starts on page one.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {LAUNCHED ? (
              // Launch state: retailer / pre-order buttons would render here.
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {["Amazon", "Bookshop", "Apple Books", "Audible", "Pre-order"].map((r) => (
                  <a key={r} href="#" style={{ background: PALETTE.navy, color: "#FFFFFF", padding: "12px 22px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 14 }}>
                    {r}
                  </a>
                ))}
              </div>
            ) : (
              <EmailCapture tone="light" />
            )}
          </div>
        </div>
      </section>

      {/* 8 ── BRIDGE TO PRIMARY iD (navy, closing) */}
      <section style={{ background: PALETTE.navy, color: "#FEFCF9", padding: "120px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, color: PALETTE.blue, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            From the page to the chair
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 28px" }}>
            The book is the <em style={{ color: PALETTE.blue }}>why</em>. Your Primary iD is the <em style={{ color: PALETTE.blue }}>how</em>.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(254,252,249,0.82)", margin: "0 0 38px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Reading the argument is the start. Living it is the five dimensions, mapped and scored, then turned into care that sees the whole you.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/five-dimensions/" style={{ background: PALETTE.blue, color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
              Build your Primary iD →
            </Link>
            <Link href="/book/" style={{ background: "transparent", color: "#FEFCF9", padding: "13px 26px", borderRadius: 999, fontFamily: SANS, fontWeight: 600, textDecoration: "none", fontSize: 15, border: "1.5px solid rgba(254,252,249,0.35)" }}>
              Book a visit →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-cover { order: 2; }
          .arg-grid { grid-template-columns: 1fr !important; }
          .toc-grid { grid-template-columns: 1fr !important; }
          .author-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>

      <SiteFooter />
    </>
  )
}
