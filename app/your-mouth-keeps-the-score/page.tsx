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
//
// Visual design ported from the uploaded book-page HTML. Uses the site's
// shared <SiteHeader /> + <SiteFooter /> instead of the design's own
// nav/footer.
// ─────────────────────────────────────────────────────────────────────────

// State flag: pre-launch (waitlist / sample chapter) vs. launch (retailers).
const LAUNCHED = false

// ─── Email capture (client) ───────────────────────────────────────────────
// Rendered wherever the design has an email / "free chapter" / "get the
// book" CTA (the hero and the signup section).
function EmailCapture({ buttonLabel = "Send me the chapter" }: { buttonLabel?: string }) {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO(farhad): wire to GHL lead endpoint, tag source: book
    setDone(true)
  }

  if (done) {
    return (
      <div className="confirm" style={{ display: "block" }}>
        Thank you. Check your inbox for your free chapter.
      </div>
    )
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
      />
      <button type="submit">{buttonLabel}</button>
    </form>
  )
}

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

      <style>{`
        .book-page {
          --cream: #FAF8F5;
          --card: #FEFCF9;
          --navy: #0E2240;
          --navy-2: #142c54;
          --cyan: #24A7E0;
          --ink: #4A4A5A;
          --muted: #8A8A9A;
          --line: rgba(14,34,64,0.08);
          --line-soft: rgba(14,34,64,0.05);
          --oral: #48C28C;
          --sleep: #24A7E0;
          --nutrition: #C7305A;
          --genetics: #7B68EE;
          --longevity: #0E2240;
          --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          --serif: Georgia, "Times New Roman", serif;
          font-family: var(--serif);
          background: var(--cream);
          color: var(--navy);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .book-page * { box-sizing: border-box; }
        .book-page ::selection { background: var(--cyan); color: #fff; }
        .book-page a { color: inherit; }

        /* ---------- SHARED ---------- */
        .book-page .eyebrow {
          font-family: var(--sans);
          font-size: 13px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--cyan); display: inline-flex; align-items: center; gap: 12px;
        }
        .book-page .eyebrow::before { content: ''; width: 32px; height: 1px; background: var(--cyan); }
        .book-page .eyebrow.center::after { content: ''; width: 32px; height: 1px; background: var(--cyan); }

        .book-page h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(34px, 5vw, 60px); line-height: 1.08; letter-spacing: -0.02em;
          color: var(--navy);
        }
        .book-page h2 em { font-style: italic; color: var(--cyan); font-weight: 400; }

        .book-page .lede {
          font-family: var(--sans); font-size: 18px; line-height: 1.6; color: var(--ink);
        }

        .book-page .btn-primary {
          background: var(--navy); color: #fff; padding: 16px 32px; border-radius: 9px;
          text-decoration: none; font-family: var(--sans); font-weight: 600; font-size: 15px;
          display: inline-flex; align-items: center; gap: 10px;
          box-shadow: 0 20px 40px -16px rgba(14,34,64,0.4); transition: transform 0.2s ease, background 0.2s ease;
        }
        .book-page .btn-primary:hover { transform: translateY(-2px); background: var(--navy-2); }
        .book-page .btn-ghost {
          color: var(--navy); text-decoration: none; font-family: var(--sans); font-weight: 500; font-size: 15px;
          display: inline-flex; align-items: center; gap: 8px;
          border-bottom: 1px solid rgba(14,34,64,0.2); padding-bottom: 4px; transition: color 0.2s ease;
        }
        .book-page .btn-ghost:hover { color: var(--cyan); border-color: var(--cyan); }

        /* ---------- HERO ---------- */
        .book-page .hero {
          padding: 80px 48px 96px; position: relative; overflow: hidden;
        }
        .book-page .hero .grid {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,1fr);
          gap: 72px; align-items: center; position: relative; z-index: 1;
        }
        .book-page .hero h1 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(38px, 5.6vw, 80px); line-height: 1.02; letter-spacing: -0.025em;
          color: var(--navy); margin: 0;
        }
        .book-page .hero h1 em { font-style: italic; color: var(--cyan); }
        .book-page .hero .lede { max-width: 520px; margin-top: 28px; }
        .book-page .hero .actions { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; margin-top: 40px; }
        .book-page .hero .subnote {
          font-family: var(--serif); font-style: italic; font-size: 13px; color: var(--muted);
          margin-top: 18px;
        }
        .book-page .hero .byline {
          margin-top: 40px; padding-top: 28px; border-top: 1px solid var(--line);
          font-family: var(--serif); font-size: 14px; color: var(--ink); max-width: 460px; line-height: 1.6;
        }
        .book-page .hero .byline a { color: var(--cyan); text-decoration: none; }

        /* book cover */
        .book-page .book-stage { display: flex; justify-content: center; align-items: center; perspective: 2000px; }
        .book-page .book {
          position: relative; width: 340px; height: 510px; transform-style: preserve-3d;
          transform: rotateY(-22deg) rotateX(2deg);
          transition: transform 0.8s cubic-bezier(0.4,0,0.2,1);
          filter: drop-shadow(40px 50px 70px rgba(14,34,64,0.3));
        }
        .book-page .book:hover { transform: rotateY(-12deg) rotateX(0deg); }
        .book-page .book .face {
          position: absolute; inset: 0; border-radius: 3px 7px 7px 3px; overflow: hidden;
          background: linear-gradient(150deg, #FFFFFF 0%, #F4EFE6 100%);
          border-right: 1px solid rgba(0,0,0,0.05);
        }
        .book-page .book .spine {
          position: absolute; left: -16px; top: 0; width: 16px; height: 100%;
          background: linear-gradient(90deg, #08142a, var(--navy));
          transform: rotateY(-90deg); transform-origin: right center;
          display: flex; flex-direction: column; justify-content: space-between; align-items: center;
          padding: 22px 3px;
        }
        .book-page .book .spine .s-top, .book-page .book .spine .s-mid, .book-page .book .spine .s-bot {
          writing-mode: vertical-rl; transform: rotate(180deg); color: #fff; text-align: center;
        }
        .book-page .book .spine .s-top { font-family: var(--sans); font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--cyan); }
        .book-page .book .spine .s-mid { font-family: var(--serif); font-size: 12px; font-weight: 700; letter-spacing: 0.02em; }
        .book-page .book .spine .s-bot { font-family: var(--sans); font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.85; }
        .book-page .book .pages {
          position: absolute; right: -7px; top: 4px; bottom: 4px; width: 7px; border-radius: 0 2px 2px 0;
          background: repeating-linear-gradient(180deg, #E8DFCA 0, #E8DFCA 1px, #F4EFE6 1px, #F4EFE6 2px);
        }
        .book-page .cover-pad { padding: 34px 30px 28px; height: 100%; display: flex; flex-direction: column; }
        .book-page .cover-eyebrow {
          font-family: var(--sans); font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
          font-weight: 700; color: var(--cyan); margin-bottom: 26px;
        }
        .book-page .cover-title {
          font-family: var(--serif); font-weight: 700; color: var(--navy);
          font-size: 46px; line-height: 0.96; letter-spacing: -0.02em;
        }
        .book-page .cover-band {
          margin: 14px -30px; padding: 16px 30px 18px; background: var(--navy); color: #fff;
        }
        .book-page .cover-band .t2 {
          font-family: var(--serif); font-weight: 700; font-size: 46px; line-height: 0.96;
          letter-spacing: -0.02em; color: #fff;
        }
        .book-page .cover-band .t2 em { color: var(--cyan); font-style: italic; }
        .book-page .cover-sub {
          font-family: var(--sans); font-size: 11px; line-height: 1.5; color: var(--ink);
          margin-top: 18px; font-weight: 500;
        }
        .book-page .cover-rule { width: 76px; height: 1.5px; background: var(--cyan); margin: auto 0 14px; }
        .book-page .cover-author .name {
          font-family: var(--serif); font-size: 15px; font-weight: 700; color: var(--navy); letter-spacing: 0.01em;
        }
        .book-page .cover-author .cred {
          font-family: var(--sans); font-size: 8px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--muted); font-weight: 700; margin-top: 5px;
        }

        /* ---------- PREMISE ---------- */
        .book-page .premise {
          background: var(--card); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
          padding: 96px 32px;
        }
        .book-page .premise .inner { max-width: 860px; margin: 0 auto; text-align: center; }
        .book-page .premise h2 { margin: 20px auto 0; max-width: 760px; }
        .book-page .premise .lede { max-width: 640px; margin: 28px auto 0; }
        .book-page .pull {
          font-family: var(--serif); font-style: italic; font-size: clamp(22px, 2.6vw, 30px);
          line-height: 1.35; color: var(--navy); max-width: 780px; margin: 56px auto 0;
          padding-top: 40px; border-top: 1px solid var(--line);
        }
        .book-page .pull em { color: var(--cyan); }

        /* ---------- DIMENSIONS ---------- */
        .book-page .dims { padding: 104px 48px; max-width: 1280px; margin: 0 auto; }
        .book-page .dims .head { max-width: 720px; margin-bottom: 56px; }
        .book-page .dims .head h2 { margin-top: 22px; }
        .book-page .dims .head .lede { margin-top: 24px; max-width: 560px; }
        .book-page .dim-grid {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;
        }
        .book-page .dim {
          --c: var(--cyan);
          background: var(--card); border: 1px solid var(--line); border-radius: 18px;
          padding: 26px 22px 24px; position: relative; overflow: hidden; isolation: isolate;
          display: flex; flex-direction: column; min-height: 280px;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .book-page .dim:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -18px rgba(14,34,64,0.18); }
        .book-page .dim::before {
          content: ''; position: absolute; right: -40%; top: -40%; width: 80%; height: 80%; border-radius: 50%;
          background: radial-gradient(circle, var(--c) 0%, transparent 60%); opacity: 0.1; z-index: 0;
        }
        .book-page .dim .bar { position: absolute; top: 0; left: 0; width: 52px; height: 5px; background: var(--c); border-radius: 0 0 5px 0; }
        .book-page .dim .num {
          font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          color: var(--c); position: relative; z-index: 1; margin: 8px 0 16px;
        }
        .book-page .dim h3 {
          font-family: var(--serif); font-weight: 400; font-size: 19px; line-height: 1.2;
          color: var(--navy); position: relative; z-index: 1; letter-spacing: -0.01em; margin-bottom: 10px;
        }
        .book-page .dim p {
          font-family: var(--sans); font-size: 13px; line-height: 1.55; color: var(--ink);
          position: relative; z-index: 1; margin: 0;
        }
        .book-page .dim .ch {
          font-family: var(--sans); font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--muted); font-weight: 600; margin-top: auto; padding-top: 16px; position: relative; z-index: 1;
        }
        @media (max-width: 1080px) { .book-page .dim-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .book-page .dim-grid { grid-template-columns: 1fr; } }

        /* ---------- INSIDE ---------- */
        .book-page .inside {
          background: linear-gradient(180deg, #08142a 0%, var(--navy) 55%, #0a1a33 100%);
          color: #EEF1F6; padding: 110px 48px;
          position: relative; overflow: hidden;
        }
        .book-page .inside::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(800px 480px at 92% 8%, rgba(36,167,224,0.14), transparent 60%),
                      radial-gradient(700px 420px at 6% 92%, rgba(123,104,238,0.10), transparent 60%);
        }
        .book-page .inside .inner { max-width: 1080px; margin: 0 auto; position: relative; z-index: 1; }
        .book-page .inside .eyebrow { color: var(--cyan); }
        .book-page .inside h2 { color: #fff; margin-top: 22px; max-width: 760px; }
        .book-page .inside h2 em { color: var(--cyan); }
        .book-page .inside .lede { color: #B8C0D0; max-width: 620px; margin-top: 26px; }
        .book-page .parts { margin-top: 64px; display: grid; gap: 28px; }
        .book-page .part { display: grid; grid-template-columns: 200px 1fr; gap: 36px; align-items: start;
          padding-bottom: 28px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .book-page .part:last-child { border-bottom: none; padding-bottom: 0; }
        .book-page .part .label .pnum {
          font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--cyan);
        }
        .book-page .part .label .pname {
          font-family: var(--serif); font-size: 22px; color: #fff; line-height: 1.2; margin-top: 8px; letter-spacing: -0.01em;
        }
        .book-page .part .label .pname em { font-style: italic; color: var(--cyan); }
        .book-page .part .chapters { display: flex; flex-direction: column; gap: 14px; }
        .book-page .part .chapters .c { display: grid; grid-template-columns: 1fr; gap: 3px; text-decoration: none; }
        .book-page .part .chapters .c .ct {
          font-family: var(--serif); font-size: 16px; color: #fff; line-height: 1.3;
        }
        .book-page .part .chapters .c .ct em { color: var(--cyan); font-style: italic; }
        .book-page .part .chapters .c .cd {
          font-family: var(--sans); font-size: 13px; color: #9AA3B8; line-height: 1.5;
        }
        @media (max-width: 760px) {
          .book-page .part { grid-template-columns: 1fr; gap: 18px; }
        }

        /* ---------- SHELF ---------- */
        .book-page .shelf { padding: 104px 48px; max-width: 1080px; margin: 0 auto; }
        .book-page .shelf .head { text-align: center; max-width: 720px; margin: 0 auto 56px; }
        .book-page .shelf .head h2 { margin-top: 22px; }
        .book-page .shelf .head .lede { margin-top: 24px; }
        .book-page .shelf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .book-page .shelf-card {
          background: var(--card); border: 1px solid var(--line); border-radius: 18px; padding: 32px 28px;
        }
        .book-page .shelf-card .t {
          font-family: var(--serif); font-style: italic; font-size: 20px; color: var(--navy); margin-bottom: 6px;
        }
        .book-page .shelf-card .a { font-family: var(--sans); font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
        .book-page .shelf-card p { font-family: var(--sans); font-size: 14px; line-height: 1.6; color: var(--ink); }
        @media (max-width: 820px) { .book-page .shelf-grid { grid-template-columns: 1fr; } }

        /* ---------- AUTHOR ---------- */
        .book-page .author { background: var(--card); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 96px 48px; }
        .book-page .author .grid { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 0.85fr 1fr; gap: 64px; align-items: center; }
        .book-page .author .portrait {
          aspect-ratio: 4/5; border-radius: 18px; overflow: hidden;
          background: radial-gradient(60% 50% at 50% 35%, rgba(36,167,224,0.18), transparent 60%),
                      linear-gradient(160deg, #b4c8dc 0%, #6e8aa8 45%, #2a3f5e 100%);
          box-shadow: 0 40px 80px -28px rgba(14,34,64,0.4);
          display: flex; align-items: flex-end; padding: 28px; position: relative;
        }
        .book-page .author .portrait .tag {
          font-family: var(--serif); color: #fff; font-size: 15px; line-height: 1.4;
        }
        .book-page .author .portrait .tag em { color: #BFE4F5; font-style: italic; }
        .book-page .author h2 { margin-top: 22px; }
        .book-page .author .lede { margin-top: 22px; }
        .book-page .author p { font-family: var(--sans); font-size: 15px; line-height: 1.65; color: var(--ink); margin-top: 16px; }
        .book-page .author .more { margin-top: 28px; }
        @media (max-width: 820px) { .book-page .author .grid { grid-template-columns: 1fr; gap: 40px; } }

        /* ---------- PODCAST ---------- */
        .book-page .podcast { padding: 96px 48px; max-width: 1080px; margin: 0 auto; }
        .book-page .podcast .card {
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 100%); color: #fff;
          border-radius: 22px; padding: 56px 56px; display: grid; grid-template-columns: 1fr auto;
          gap: 40px; align-items: center; position: relative; overflow: hidden;
        }
        .book-page .podcast .card::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(500px 300px at 88% 10%, rgba(36,167,224,0.2), transparent 65%);
        }
        .book-page .podcast .card .txt { position: relative; z-index: 1; }
        .book-page .podcast .card .eyebrow { color: var(--cyan); }
        .book-page .podcast .card h3 {
          font-family: var(--serif); font-weight: 400; font-size: clamp(26px, 3vw, 36px);
          line-height: 1.15; color: #fff; margin: 18px 0 14px; letter-spacing: -0.01em;
        }
        .book-page .podcast .card h3 em { color: var(--cyan); font-style: italic; }
        .book-page .podcast .card p { font-family: var(--sans); font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.82); max-width: 520px; }
        .book-page .podcast .card .ico {
          position: relative; z-index: 1; width: 96px; height: 96px; border-radius: 24px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.16);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        @media (max-width: 720px) { .book-page .podcast .card { grid-template-columns: 1fr; padding: 40px 32px; } .book-page .podcast .card .ico { display: none; } }

        /* ---------- SIGNUP CTA ---------- */
        .book-page .signup { padding: 110px 32px; text-align: center; }
        .book-page .signup .inner { max-width: 640px; margin: 0 auto; }
        .book-page .signup h2 { margin: 22px auto 0; }
        .book-page .signup .lede { margin: 24px auto 36px; max-width: 480px; }
        .book-page .signup-form {
          display: flex; gap: 10px; max-width: 480px; margin: 0 auto; flex-wrap: wrap; justify-content: center;
        }
        .book-page .signup-form input {
          flex: 1; min-width: 240px; height: 54px; padding: 0 20px; border-radius: 10px;
          border: 1px solid var(--line); background: var(--card); font-family: var(--sans); font-size: 15px;
          color: var(--navy); outline: none; transition: border 0.2s, box-shadow 0.2s;
        }
        .book-page .signup-form input:focus { border-color: var(--cyan); box-shadow: 0 0 0 4px rgba(36,167,224,0.12); }
        .book-page .signup-form button {
          height: 54px; padding: 0 28px; border: none; border-radius: 10px; background: var(--navy); color: #fff;
          font-family: var(--sans); font-weight: 600; font-size: 15px; cursor: pointer;
          box-shadow: 0 16px 36px -16px rgba(14,34,64,0.45); transition: transform 0.2s, background 0.2s;
        }
        .book-page .signup-form button:hover { transform: translateY(-2px); background: var(--navy-2); }
        .book-page .signup .micro { font-family: var(--sans); font-size: 13px; color: var(--muted); margin-top: 18px; }
        .book-page .signup .confirm {
          font-family: var(--serif); font-style: italic; font-size: 17px; color: var(--cyan);
          margin-top: 24px;
        }
        .book-page .signup .or { font-family: var(--sans); font-size: 14px; color: var(--ink); margin-top: 36px; }
        .book-page .signup .or a { color: var(--navy); font-weight: 600; text-decoration: none; border-bottom: 1px solid rgba(14,34,64,0.25); padding-bottom: 2px; }

        @media (max-width: 900px) {
          .book-page .hero { padding: 60px 24px 72px; }
          .book-page .hero .grid { grid-template-columns: 1fr; gap: 56px; }
          .book-page .book { width: 280px; height: 420px; transform: rotateY(-15deg); }
          .book-page .dims, .book-page .shelf, .book-page .podcast { padding-left: 24px; padding-right: 24px; }
          .book-page .inside, .book-page .author { padding-left: 24px; padding-right: 24px; }
          .book-page .cover-title, .book-page .cover-band .t2 { font-size: 38px; }
        }

        @keyframes bookFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .book-page .hero h1, .book-page .hero .lede, .book-page .hero .actions, .book-page .hero .byline { animation: bookFadeUp 0.8s ease-out backwards; }
        .book-page .hero .lede { animation-delay: 0.12s; }
        .book-page .hero .actions { animation-delay: 0.24s; }
        .book-page .hero .byline { animation-delay: 0.36s; }
        .book-page .book { animation: bookFadeUp 1s ease-out 0.2s backwards; }
      `}</style>

      <div className="book-page">
        {/* HERO */}
        <section className="hero">
          <div className="grid">
            <div>
              <span className="eyebrow">A new science of the mouth · The book</span>
              <h1 style={{ marginTop: 24 }}>Your mouth keeps <em>the score</em>.</h1>
              <p className="lede">The most-visited part of your body is the one the rest of medicine refuses to read. A practicing clinician's case for why your mouth is the earliest, clearest window into your whole-body health, and the highest-leverage place to start.</p>

              {LAUNCHED ? (
                <div className="actions">
                  {["Amazon", "Bookshop", "Apple Books", "Audible"].map((r) => (
                    <a key={r} href="#" className="btn-primary">{r}</a>
                  ))}
                </div>
              ) : (
                <div style={{ marginTop: 40, maxWidth: 480 }}>
                  <EmailCapture buttonLabel="Get notified at launch" />
                </div>
              )}

              <div className="subnote">Free chapter for early readers · No spam, ever.</div>
              <div className="byline">
                By <a href="/about/">Dr. Tzur Gabi</a>, functional prosthodontist, oral physician, and founder of Primary Integrative Dentistry. The book behind the <Link href="/five-dimensions/">five-dimension</Link> framework.
              </div>
            </div>

            <div className="book-stage">
              <div className="book">
                <div className="spine">
                  <div className="s-top">A New Science of the Mouth</div>
                  <div className="s-mid">YOUR MOUTH KEEPS THE SCORE</div>
                  <div className="s-bot">Dr. Tzur Gabi</div>
                </div>
                <div className="pages"></div>
                <div className="face">
                  <div className="cover-pad">
                    <div className="cover-eyebrow">A New Science of the Mouth</div>
                    <div className="cover-title">YOUR<br />MOUTH</div>
                    <div className="cover-band">
                      <div className="t2">KEEPS<br /><em>THE</em> SCORE</div>
                    </div>
                    <div className="cover-sub">How oral health shapes your energy, your sleep, your longevity, and your whole-body wellbeing.</div>
                    <div className="cover-rule"></div>
                    <div className="cover-author">
                      <div className="name">Dr. Tzur Gabi</div>
                      <div className="cred">Founder of Primary Integrative Dentistry</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PREMISE */}
        <section className="premise">
          <div className="inner">
            <span className="eyebrow center">The premise</span>
            <h2>You see your dental team more than any other doctor. Almost no one connects that visit to the <em>rest of you</em>.</h2>
            <p className="lede">Your gums talk to your heart. Your airway shapes your sleep. The bacteria in your mouth reach your gut, your brain, your bloodstream. None of it is fringe science. It is just rarely told as one story. This book tells it as one story.</p>
            <div className="pull">The mouth is the most-visited and least-integrated part of the body. Reuniting it with the rest of your health may be the <em>highest-leverage move</em> in preventive medicine.</div>
          </div>
        </section>

        {/* DIMENSIONS */}
        <section className="dims">
          <div className="head">
            <span className="eyebrow">How the book is built</span>
            <h2>Five dimensions. <em>One body.</em></h2>
            <p className="lede">The book is organized around the same five lenses Primary uses in the chair, each one a different layer of how your mouth shapes your whole-body health.</p>
          </div>
          <div className="dim-grid">
            <Link href="/five-dimensions/" className="dim" style={{ "--c": "var(--oral)" } as React.CSSProperties}>
              <span className="bar"></span>
              <div className="num">01 · ORAL HEALTH</div>
              <h3>What bleeding gums are really telling you.</h3>
              <p>Gum disease is one of the largest sources of chronic inflammation in the whole body, and most checkups never look past the tooth.</p>
              <div className="ch">Part Two · Ch. 3</div>
            </Link>
            <Link href="/five-dimensions/" className="dim" style={{ "--c": "var(--sleep)" } as React.CSSProperties}>
              <span className="bar"></span>
              <div className="num">02 · SLEEP &amp; AIRWAY</div>
              <h3>How you breathe shapes how you heal.</h3>
              <p>The chapter most readers don't see coming: the airway is dental-diagnosable, and the first signs of trouble show up in the mouth, not the lungs.</p>
              <div className="ch">Part Two · Ch. 4</div>
            </Link>
            <Link href="/five-dimensions/" className="dim" style={{ "--c": "var(--nutrition)" } as React.CSSProperties}>
              <span className="bar"></span>
              <div className="num">03 · NUTRITION</div>
              <h3>The ecosystem you never see.</h3>
              <p>Seven hundred species live in your mouth, the gateway to your gut. What you eat reshapes them, and they shape everything downstream.</p>
              <div className="ch">Part Two · Ch. 5</div>
            </Link>
            <Link href="/five-dimensions/" className="dim" style={{ "--c": "var(--genetics)" } as React.CSSProperties}>
              <span className="bar"></span>
              <div className="num">04 · GENETICS</div>
              <h3>Your biology, not a template.</h3>
              <p>Salivary diagnostics and genetic risk are turning dentistry personal. Your DNA shapes how you inflame, heal, and respond to care.</p>
              <div className="ch">Part Two · Ch. 6</div>
            </Link>
            <Link href="/five-dimensions/" className="dim" style={{ "--c": "var(--longevity)" } as React.CSSProperties}>
              <span className="bar"></span>
              <div className="num">05 · LONGEVITY</div>
              <h3>Why your mouth can age you faster.</h3>
              <p>Tooth loss tracks with all-cause mortality. Chronic oral inflammation accelerates aging. This is the chapter that earns the subtitle.</p>
              <div className="ch">Part Two · Ch. 7</div>
            </Link>
          </div>
        </section>

        {/* INSIDE */}
        <section className="inside" id="inside">
          <div className="inner">
            <span className="eyebrow">Inside the book</span>
            <h2>Four parts. Eleven chapters. <em>One argument.</em></h2>
            <p className="lede">From the 180-year-old decision that split the mouth from medicine, through the biology of the five dimensions, to a vision of care that finally puts them back together.</p>

            <div className="parts">

              <div className="part">
                <div className="label">
                  <div className="pnum">Part One</div>
                  <div className="pname">The Mouth You Don't Know You Have</div>
                </div>
                <div className="chapters">
                  <div className="c">
                    <div className="ct">The <em>1840 Mistake</em></div>
                    <div className="cd">Why dentistry was separated from medicine by a faculty vote, and why your cardiologist has never asked about your gums.</div>
                  </div>
                  <div className="c">
                    <div className="ct">What Lives in <em>Your Mouth</em></div>
                    <div className="cd">The oral microbiome, made readable: the gateway to the gut and the body's quietest immune conversation.</div>
                  </div>
                </div>
              </div>

              <div className="part">
                <div className="label">
                  <div className="pnum">Part Two</div>
                  <div className="pname">The Five <em>Dimensions</em></div>
                </div>
                <div className="chapters">
                  <Link href="/five-dimensions/" className="c">
                    <div className="ct">Oral Health · Sleep &amp; Airway · Nutrition</div>
                    <div className="cd">One chapter each: what the evidence actually shows, where it's settled, and where it's still emerging.</div>
                  </Link>
                  <Link href="/five-dimensions/" className="c">
                    <div className="ct">Genetics &amp; Risk · Longevity &amp; Healthspan</div>
                    <div className="cd">Personalized dentistry and the oral-aging connection: the science behind your Primary iD score.</div>
                  </Link>
                </div>
              </div>

              <div className="part">
                <div className="label">
                  <div className="pnum">Part Three</div>
                  <div className="pname">What the Mouth <em>Knows</em></div>
                </div>
                <div className="chapters">
                  <div className="c">
                    <div className="ct">The Smile and the <em>Self</em></div>
                    <div className="cd">The most universal human signal, and where confidence, belonging, and class are quietly built or broken.</div>
                  </div>
                  <div className="c">
                    <div className="ct">A Visit That Could <em>Save Your Life</em> · The Honest Limits</div>
                    <div className="cd">What an integrated visit really looks like, and an unflinching tour of the controversies, told straight.</div>
                  </div>
                </div>
              </div>

              <div className="part">
                <div className="label">
                  <div className="pnum">Part Four</div>
                  <div className="pname">Reuniting Mouth and <em>Body</em></div>
                </div>
                <div className="chapters">
                  <div className="c">
                    <div className="ct">A New Architecture of <em>Care</em></div>
                    <div className="cd">Why the dental chair is the best front door preventive medicine has, and what it takes to walk through it.</div>
                  </div>
                  <div className="c">
                    <div className="ct">Epilogue · <em>The Person in the Chair</em></div>
                    <div className="cd">Humans deserve to be deeply cared for, and to care deeply for themselves. Where the whole argument lands.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SHELF */}
        <section className="shelf">
          <div className="head">
            <span className="eyebrow center">Where it sits on the shelf</span>
            <h2>For readers of <em>Outlive</em>, <em>Breath</em>, and <em>The Body Keeps the Score</em>.</h2>
            <p className="lede">It belongs in that conversation, and adds the part those books left out.</p>
          </div>
          <div className="shelf-grid">
            <div className="shelf-card">
              <div className="t">The Body Keeps the Score</div>
              <div className="a">van der Kolk</div>
              <p>Argued that the body carries a story medicine refuses to read. This book makes the same case for the one part of the body you visit most.</p>
            </div>
            <div className="shelf-card">
              <div className="t">Outlive</div>
              <div className="a">Attia</div>
              <p>Made longevity a set of decisions, not a wish. Here, the mouth becomes one of the earliest and cheapest levers you can pull.</p>
            </div>
            <div className="shelf-card">
              <div className="t">Breath</div>
              <div className="a">Nestor</div>
              <p>Turned an overlooked function into a worldview. The airway chapter picks up exactly where that book leaves off.</p>
            </div>
          </div>
        </section>

        {/* AUTHOR */}
        <section className="author">
          <div className="grid">
            <div className="portrait">
              <div className="tag">Dr. Tzur Gabi<br /><em>Functional prosthodontist · Oral physician</em></div>
            </div>
            <div>
              <span className="eyebrow">About the author</span>
              <h2>Written from the chair where prevention <em>fails</em>.</h2>
              <p className="lede">Dr. Gabi is a functional prosthodontist, the specialty that rebuilds mouths after everything upstream has gone wrong.</p>
              <p>That vantage point is exactly why he writes about prevention. His daily work is what happens when the early signals go unread for decades. He has mentored thousands of clinicians worldwide and founded Primary Integrative Dentistry to practice a different kind of care: one that starts with your whole health and works backward to your mouth.</p>
              <p>The book is the argument behind that practice, and behind the five-dimension Primary iD framework patients already use in the chair.</p>
              <div className="more"><a href="/about/" className="btn-ghost">Meet Dr. Gabi</a></div>
            </div>
          </div>
        </section>

        {/* PODCAST */}
        <section className="podcast">
          <div className="card">
            <div className="txt">
              <span className="eyebrow">The conversation continues</span>
              <h3>The book starts it. <em>The podcast keeps it going.</em></h3>
              <p>Same name, same thesis: an ongoing conversation with the clinicians, researchers, and thinkers reconnecting the mouth to the rest of medicine. Launching alongside the book.</p>
            </div>
            <div className="ico">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#24A7E0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </div>
          </div>
        </section>

        {/* SIGNUP */}
        <section className="signup" id="notify">
          <div className="inner">
            <span className="eyebrow center">Be first to read it</span>
            <h2>Get the book, and a <em>free chapter</em> now.</h2>
            <p className="lede">Join the early reader list. You'll get a chapter to read today, plus first access when the book launches.</p>
            {LAUNCHED ? (
              <div className="signup-form">
                {["Amazon", "Bookshop", "Apple Books", "Audible", "Pre-order"].map((r) => (
                  <a key={r} href="#" className="btn-primary">{r}</a>
                ))}
              </div>
            ) : (
              <>
                <EmailCapture buttonLabel="Send me the chapter" />
                <div className="micro">Free · Private · One email, then only when it matters.</div>
              </>
            )}
            <div className="or">Already a patient? <a href="/diagnostics/">Get your Primary iD score</a> while you wait.</div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  )
}
