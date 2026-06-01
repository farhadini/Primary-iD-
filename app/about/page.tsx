"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── Brand tokens ─────────────────────────────────────────────
const B = {
  navy: "#0E2240",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  ink: "#1A1A2E",
  inkSoft: "#4A4A5A",
  muted: "#8A8A9A",
  line: "rgba(14, 34, 64, 0.08)",
  blue: "#24A7E0",
  gold: "#D4B584",
  green: "#48C28C",
  purple: "#7B68EE",
  orange: "#E8985E",
  pink: "#E05BBF",
  white: "#FFFFFF",
};

const SERIF = '"Fraunces", Georgia, serif';
const SANS = '"Inter", system-ui, sans-serif';

// ── Nav ───────────────────────────────────────────────────────
function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(254, 252, 249, 0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${B.line}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "18px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <img src="/images/primary-brand-logo.png" alt="Primary" style={{ height: 36, width: "auto" }} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {[
            { label: "Why Primary", href: "/why-primary" },
            { label: "The Science", href: "/oral-systemic" },
            { label: "About", href: "/about" },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: SANS, fontSize: 13, fontWeight: 500, letterSpacing: "0.01em",
              color: B.navy, textDecoration: "none",
              transition: "color 0.2s ease",
            }}>
              {link.label}
            </Link>
          ))}
          <Link href="/get-started" style={{
            fontFamily: SANS, fontSize: 13, fontWeight: 600,
            color: B.warm, background: B.navy,
            padding: "10px 20px", borderRadius: 999,
            textDecoration: "none",
            transition: "transform 0.2s ease, opacity 0.2s ease",
          }}>
            Get your Primary iD
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section style={{
      padding: "180px 40px 120px",
      maxWidth: 1100, margin: "0 auto",
      borderBottom: `1px solid ${B.line}`,
    }}>
      <div style={{
        fontFamily: SANS, fontSize: 11, fontWeight: 500,
        letterSpacing: "0.32em", textTransform: "uppercase",
        color: B.muted, marginBottom: 40,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.7s ease-out 0.1s",
      }}>
        About · Our Why
      </div>
      <h1 style={{
        fontFamily: SERIF, fontSize: "clamp(48px, 7vw, 104px)",
        fontWeight: 300, lineHeight: 0.98, letterSpacing: "-0.03em",
        color: B.navy, maxWidth: 980,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.8s ease-out 0.22s",
      }}>
        We started Primary because<br />
        <em style={{ fontStyle: "italic", color: B.inkSoft, fontWeight: 300 }}>
          nobody was building the care we wanted.
        </em>
      </h1>
      <p style={{
        fontFamily: SANS, fontSize: 17, lineHeight: 1.55,
        color: B.inkSoft, maxWidth: 560, marginTop: 48,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.8s ease-out 0.4s",
      }}>
        This isn&apos;t a business plan. It&apos;s what happened when a dentist and a systems architect got tired of waiting for healthcare to integrate itself.
      </p>
    </section>
  );
}

// ── Manifesto ───────────────────────────────────────────────────
const TENETS = [
  { num: "01", text: <>Every patient deserves to understand their own health before anyone sells them a treatment. Your <em>Primary iD</em> — five dimensions, one score — comes <strong>before</strong> the first visit, not after the first bill.</> },
  { num: "02", text: <>Crooked teeth are an airway story. Bleeding gums are an inflammation story. Chronic bad breath is a microbiome story. We refuse to treat smoke without finding the fire.</> },
  { num: "03", text: <>Technology should make care <em>more</em> human, not less. Every tool in our practice — AI diagnostics, genomic testing, computer vision radiology — exists to give the doctor and the patient more time to actually look at each other.</> },
  { num: "04", text: <>Prevention is a better business than intervention — for the patient, for the clinician, and for the economy. We built a membership, not an insurance product, because the math of wellness doesn&apos;t fit inside a claim form.</> },
  { num: "05", text: <>The future of primary care looks a lot like a dental chair. <strong>Not because dentists replace doctors</strong> — because the most-used appointment in your life should connect to the rest of your health instead of existing in a silo.</> },
];

function Manifesto() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section style={{ padding: "140px 40px 120px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ maxWidth: 760 }}>
        <div style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 500,
          letterSpacing: "0.32em", textTransform: "uppercase",
          color: B.muted, marginBottom: 32,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.7s ease-out 0.1s",
        }}>
          The Manifesto
        </div>

        <p style={{
          fontFamily: SERIF, fontSize: "clamp(28px, 3vw, 40px)",
          fontWeight: 400, lineHeight: 1.22, letterSpacing: "-0.02em",
          color: B.navy, marginBottom: 48,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.8s ease-out 0.2s",
        }}>
          We believe your mouth is the most-visited, least-integrated part of your healthcare. And we think that&apos;s the largest quiet opportunity in medicine today.
        </p>

        <p style={{
          fontFamily: SERIF, fontSize: "clamp(22px, 2.4vw, 30px)",
          lineHeight: 1.35, fontWeight: 300, letterSpacing: "-0.01em",
          color: B.navy, marginBottom: 36,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.8s ease-out 0.3s",
        }}>
          Most Americans see a dentist three to four times a year. They see a primary care doctor, on average, less than once. That means the dental chair is already the most frequent touchpoint in the adult healthcare system — <em style={{ fontStyle: "italic", color: B.inkSoft }}>and almost no one is using it that way.</em>
        </p>

        <p style={{
          fontFamily: SERIF, fontSize: "clamp(22px, 2.4vw, 30px)",
          lineHeight: 1.35, fontWeight: 300, letterSpacing: "-0.01em",
          color: B.navy, marginBottom: 36,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.8s ease-out 0.35s",
        }}>
          Your dentist sees inflammation before your cardiologist does. Your dentist sees the earliest signs of sleep apnea before your pulmonologist does. Your dentist watches nutrition, stress, immunity, and aging write themselves onto your teeth and gums, visit after visit. And then says nothing, because the system pays them to fix one tooth at a time.
        </p>

        <div style={{ width: 60, height: 1, background: B.navy, margin: "60px 0", opacity: 0.4 }} />

        <p style={{
          fontFamily: SERIF, fontSize: "clamp(22px, 2.4vw, 30px)",
          lineHeight: 1.35, fontWeight: 500, letterSpacing: "-0.01em",
          color: B.navy, marginBottom: 36,
        }}>
          We think the mouth is a diagnostic instrument the healthcare system has been ignoring for a hundred years.
        </p>

        <p style={{
          fontFamily: SERIF, fontSize: "clamp(22px, 2.4vw, 30px)",
          lineHeight: 1.35, fontWeight: 300, letterSpacing: "-0.01em",
          color: B.navy, marginBottom: 36,
        }}>
          Not because dentists are careless. Because the model they were trained into was built in 1900, when dentistry was literally extracted from medicine and turned into a separate trade. Everything downstream of that — the insurance split, the training split, the records split — has made it structurally impossible for the person who sees you most often to talk to the person who treats you when you&apos;re sick.
        </p>

        <p style={{
          fontFamily: SERIF, fontSize: "clamp(22px, 2.4vw, 30px)",
          lineHeight: 1.35, fontWeight: 300, letterSpacing: "-0.01em",
          color: B.navy, marginBottom: 36,
        }}>
          Primary is built to close that gap.
        </p>

        <div style={{ width: 60, height: 1, background: B.navy, margin: "60px 0", opacity: 0.4 }} />

        <p style={{
          fontFamily: SERIF, fontSize: "clamp(28px, 3vw, 40px)",
          fontWeight: 400, lineHeight: 1.22, letterSpacing: "-0.02em",
          color: B.navy, marginBottom: 48,
        }}>
          We don&apos;t want to fix the existing maze. We want to build a new front door.
        </p>

        {TENETS.map((tenet, i) => (
          <div key={tenet.num} style={{
            display: "grid", gridTemplateColumns: "32px 1fr",
            gap: 28, alignItems: "start", marginBottom: 36,
          }}>
            <div style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 500,
              letterSpacing: "0.24em", color: B.muted, paddingTop: 10,
            }}>
              {tenet.num}
            </div>
            <p style={{
              fontFamily: SERIF, fontSize: "clamp(20px, 2vw, 24px)",
              lineHeight: 1.35, fontWeight: 300, color: B.navy, margin: 0,
            }}>
              {tenet.text}
            </p>
          </div>
        ))}

        <div style={{ width: 60, height: 1, background: B.navy, margin: "60px 0", opacity: 0.4 }} />

        <p style={{
          fontFamily: SERIF, fontSize: "clamp(22px, 2.4vw, 30px)",
          lineHeight: 1.35, fontWeight: 300, letterSpacing: "-0.01em",
          color: B.navy, marginBottom: 36,
        }}>
          Primary is a clinic, a platform, and a thesis. The clinic is where we prove it works on one patient at a time. The platform — Primary iD — is how we give that clarity to anyone, anywhere, before they walk in. The thesis is that dentistry, properly integrated, is the fastest path to the kind of healthcare we wish existed for ourselves.
        </p>

        <p style={{
          fontFamily: SERIF, fontSize: "clamp(22px, 2.4vw, 30px)",
          lineHeight: 1.35, fontWeight: 300, fontStyle: "italic",
          color: B.navy,
        }}>
          So we&apos;re building it.
        </p>
      </div>
    </section>
  );
}

// ── Origin Story ───────────────────────────────────────────────
function Origin() {
  return (
    <section style={{
      padding: "120px 40px",
      maxWidth: 1100, margin: "0 auto",
      borderTop: `1px solid ${B.line}`,
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start",
      }} className="origin-grid-responsive">
        <div style={{ position: "sticky", top: 60 }} className="origin-label">
          <div style={{
            fontFamily: SANS, fontSize: 11, fontWeight: 500,
            letterSpacing: "0.32em", textTransform: "uppercase",
            color: B.muted, marginBottom: 16,
          }}>
            How it started
          </div>
          <h2 style={{
            fontFamily: SERIF, fontWeight: 300,
            fontSize: "clamp(32px, 3.2vw, 48px)",
            lineHeight: 1.05, letterSpacing: "-0.02em", color: B.navy,
          }}>
            Two people,<br /><em style={{ fontStyle: "italic", color: B.inkSoft }}>one conviction.</em>
          </h2>
        </div>

        <div style={{ fontFamily: SANS, fontSize: 17, lineHeight: 1.68, color: B.inkSoft }}>
          <p style={{ marginBottom: 24 }}>
            Primary began as a conversation between <strong style={{ color: B.navy, fontWeight: 500 }}>Dr. Tzur Gabi</strong>, a Brentwood-based integrative prosthodontist who had spent two decades watching patients fall through the cracks between specialties, and <strong style={{ color: B.navy, fontWeight: 500 }}>Farhad Attaie</strong>, a systems architect and serial entrepreneur who had been building inside the dental industry since 2007 — trying, again and again, to make it live up to its potential as the front door to whole-body health.
          </p>
          <p style={{ marginBottom: 24 }}>
            Tzur had the chair, the patients, the clinical authority — and a growing frustration that the system he was trained in was making it illegal to practice the care he knew was possible. Farhad had already co-founded HelloSmile in NYC&apos;s underserved communities, built an innovation lab (Factory) serving Nike and Cisco, earned a TED Residency, and incubated half a dozen dental ventures at Nacci. Each attempt had taught him the same thing from a different angle: <em style={{ fontStyle: "italic" }}>the industry doesn&apos;t need one more tool bolted onto the old model — it needs a new model.</em>
          </p>
          <blockquote style={{
            fontFamily: SERIF, fontSize: "clamp(22px, 2.2vw, 28px)",
            fontWeight: 300, fontStyle: "italic", lineHeight: 1.3,
            color: B.navy, margin: "40px 0", paddingLeft: 24,
            borderLeft: `2px solid ${B.navy}`, letterSpacing: "-0.01em",
          }}>
            &ldquo;We realized nobody was going to build the practice we wanted to walk into as patients. So we stopped waiting.&rdquo;
          </blockquote>
          <p style={{ marginBottom: 24 }}>
            The idea for Primary is simple and the execution is not. <strong style={{ color: B.navy, fontWeight: 500 }}>Use dentistry as the front door to integrated healthcare.</strong> Score the whole patient across oral health, sleep, nutrition, genetics, and longevity before they sit in the chair. Build the operating system — the <em style={{ fontStyle: "italic" }}>Primary iD</em> — that translates five dimensions of data into one number the patient can act on. Prove it in one LA clinic. Scale it through a network of practices that share the same thesis.
          </p>
          <p>
            That&apos;s what we&apos;re doing now.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .origin-grid-responsive { grid-template-columns: 1fr !important; gap: 40px !important; }
          .origin-label { position: static !important; }
        }
      `}</style>
    </section>
  );
}

// ── Bios ───────────────────────────────────────────────────────
const TZUR_CREDITS = [
  { label: "Specialty", value: "Prosthodontics · Implants · Full-Arch Reconstruction" },
  { label: "Also Founder Of", value: "Caligenix · Primary iD" },
  { label: "Forthcoming Book", value: "Your Mouth Keeps the Score", italic: true },
  { label: "Advisory", value: "Viome · Arini AI · OrthoFX · Show and Tell" },
];

const FARHAD_CREDITS = [
  { label: "Role at Primary", value: "Chief Ecosystem Architect" },
  { label: "Also Building", value: "Primary iD · FODO" },
  { label: "Previously", value: "HelloSmile · Factory · Nacci · FlossBar" },
  { label: "Recognition", value: "TED Resident · 20+ companies launched · $50M+ raised" },
];

function Bios() {
  return (
    <section style={{
      padding: "120px 40px 40px",
      maxWidth: 1100, margin: "0 auto",
      borderTop: `1px solid ${B.line}`,
    }}>
      <div style={{
        fontFamily: SANS, fontSize: 11, fontWeight: 500,
        letterSpacing: "0.32em", textTransform: "uppercase",
        color: B.muted, marginBottom: 16,
      }}>
        The Founders
      </div>
      <h2 style={{
        fontFamily: SERIF, fontWeight: 300,
        fontSize: "clamp(36px, 4vw, 56px)",
        lineHeight: 1.05, letterSpacing: "-0.02em",
        color: B.navy, marginBottom: 80, maxWidth: 780,
      }}>
        A clinician and a systems architect,<br />
        <em style={{ fontStyle: "italic", color: B.inkSoft }}>both patients first.</em>
      </h2>

      {/* Dr. Tzur Gabi */}
      <article style={{
        display: "grid", gridTemplateColumns: "340px 1fr",
        gap: 64, padding: "56px 0", borderTop: `1px solid ${B.line}`, alignItems: "start",
      }} className="bio-card-responsive">
        <div style={{
          position: "relative", aspectRatio: "3 / 4", borderRadius: 16, overflow: "hidden",
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(72, 194, 140, 0.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 70% at 70% 80%, rgba(36, 167, 224, 0.15) 0%, transparent 50%),
            ${B.cream}`,
          boxShadow: `0 20px 60px -30px rgba(14,34,64,0.2), 0 0 0 1px ${B.line}`,
        }}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-21%20at%208.13.05%E2%80%AFPM-rC1cjGW8lnbB7k20ooPCQ8l9uhKzjS.png"
            alt="Dr. Tzur Gabi"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div>
          <div style={{
            fontFamily: SANS, fontSize: 11, fontWeight: 500,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: B.muted, marginBottom: 12,
          }}>
            Founder · Prosthodontist · Oral Physician
          </div>
          <h3 style={{
            fontFamily: SERIF, fontWeight: 400,
            fontSize: "clamp(32px, 3.2vw, 44px)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            color: B.navy, marginBottom: 24,
          }}>
            Dr. Tzur Gabi<br />
            <em style={{ fontStyle: "italic", fontWeight: 300, color: B.inkSoft }}>The Dental Architect</em>
          </h3>
          <div style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.7, color: B.inkSoft }}>
            <p style={{ marginBottom: 20 }}>
              Tzur immigrated to the United States from Israel when he was ten. He was accepted to dental school early and deferred it to spend a year backpacking across South America — an experience he still credits with teaching him that the best healthcare is both deeply personal and unafraid of what&apos;s coming next.
            </p>
            <p style={{ marginBottom: 20 }}>
              He came back, finished his specialty in prosthodontics, and spent the next two decades building one of Los Angeles&apos; most trusted integrative practices in Brentwood — while also mentoring thousands of dentists worldwide on major reconstructive, implant, and full-arch dentistry. His clinical approach earned him the nickname <em>&ldquo;The Dental Architect&rdquo;</em> from his patients.
            </p>
            <p style={{ marginBottom: 20 }}>
              He is the <strong style={{ color: B.navy, fontWeight: 500 }}>co-founder of Caligenix</strong>, a genomics company pioneering DNA-and-RNA-based personalization of dental and wellness care. He holds strategic advisory roles with Viome, Arini AI, OrthoFX, and Show and Tell — companies he partners with because they share the conviction that the mouth is an under-read diagnostic instrument.
            </p>
            <p style={{ marginBottom: 20 }}>
              He is currently writing <em>Your Mouth Keeps the Score</em>, a book that argues — in the tradition of Bessel van der Kolk&apos;s work on trauma — that the body stores what the mind cannot, and that the mouth is where that record becomes visible first. It&apos;s the clearest articulation to date of the clinical thesis that Primary is built on.
            </p>
            <p>
              Tzur started Primary for the reason most clinicians start something: he kept meeting patients he couldn&apos;t fully help inside the system he was trained in. So he decided to build a different system.
            </p>
          </div>
          <div style={{
            marginTop: 28, paddingTop: 28, borderTop: `1px solid ${B.line}`,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px",
          }} className="credit-grid-responsive">
            {TZUR_CREDITS.map(c => (
              <div key={c.label} style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: B.inkSoft }}>
                <span style={{
                  display: "block", fontSize: 10, fontWeight: 500,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: B.muted, marginBottom: 4,
                }}>
                  {c.label}
                </span>
                {c.italic ? <em>{c.value}</em> : c.value}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 20, fontFamily: SANS, fontSize: 13 }}>
            <a href="https://www.linkedin.com/in/drgabi" target="_blank" rel="noopener noreferrer" style={{
              color: B.navy, textDecoration: "none", borderBottom: `1px solid ${B.navy}`, paddingBottom: 2,
            }}>LinkedIn →</a>
            <a href="#" style={{
              color: B.navy, textDecoration: "none", borderBottom: `1px solid ${B.navy}`, paddingBottom: 2,
            }}>Thought leadership →</a>
          </div>
        </div>
      </article>

      {/* Farhad Attaie */}
      <article style={{
        display: "grid", gridTemplateColumns: "340px 1fr",
        gap: 64, padding: "56px 0", borderTop: `1px solid ${B.line}`, borderBottom: `1px solid ${B.line}`, alignItems: "start",
      }} className="bio-card-responsive">
        <div style={{
          position: "relative", aspectRatio: "3 / 4", borderRadius: 16, overflow: "hidden",
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(123, 104, 238, 0.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 70% at 30% 80%, rgba(232, 152, 94, 0.15) 0%, transparent 50%),
            ${B.cream}`,
          boxShadow: `0 20px 60px -30px rgba(14,34,64,0.2), 0 0 0 1px ${B.line}`,
        }}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-21%20at%208.12.28%E2%80%AFPM-vlZXPruEtrNDPcwc3EH18Iw07rOcA2.png"
            alt="Farhad Attaie"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div>
          <div style={{
            fontFamily: SANS, fontSize: 11, fontWeight: 500,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: B.muted, marginBottom: 12,
          }}>
            Co-Founder · Chief Ecosystem Architect
          </div>
          <h3 style={{
            fontFamily: SERIF, fontWeight: 400,
            fontSize: "clamp(32px, 3.2vw, 44px)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            color: B.navy, marginBottom: 24,
          }}>
            Farhad Attaie<br />
            <em style={{ fontStyle: "italic", fontWeight: 300, color: B.inkSoft }}>The Systems Architect</em>
          </h3>
          <div style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.7, color: B.inkSoft }}>
            <p style={{ marginBottom: 20 }}>
              Farhad has been working on the same problem for almost two decades: <strong style={{ color: B.navy, fontWeight: 500 }}>what would American healthcare look like if dentistry were the front door instead of the forgotten side street?</strong> Primary is the answer he&apos;s been building toward since 2007.
            </p>
            <p style={{ marginBottom: 20 }}>
              He started his career at Merrill Lynch in Palo Alto during the 2004 boom, watching the financial system up close — and then watching it collapse in 2008. A conversation with Ben Cohen of Ben &amp; Jerry&apos;s in the aftermath rewired him permanently: profit was a tool, purpose was the product. He left finance, launched his first social enterprise at Stanford, and followed a family connection into pediatric dentistry in NYC&apos;s underserved communities — where he saw the technology gap that would define the next seventeen years of his work.
            </p>
            <p style={{ marginBottom: 20 }}>
              In 2009 he co-founded <strong style={{ color: B.navy, fontWeight: 500 }}>HelloSmile</strong>, one of the earliest integrated dental-and-medical care models in New York. He built <strong style={{ color: B.navy, fontWeight: 500 }}>HelloLAB</strong> in partnership with RISD, NYU, Columbia, and Parsons, bringing human-centered design to oral health. He scaled a second iteration of HelloSmile that earned him a place in the <strong style={{ color: B.navy, fontWeight: 500 }}>TED Residency</strong>. He founded <strong style={{ color: B.navy, fontWeight: 500 }}>Factory</strong> in San Francisco, an innovation lab serving Nike, Cisco, and Levi&apos;s from a 10,000-square-foot mansion on Alamo Square. And he launched <strong style={{ color: B.navy, fontWeight: 500 }}>Nacci</strong> with Dionna McPhatter, where he led the &ldquo;Future of Dental&rdquo; division and incubated FlossBar with investment from Colgate and Heartland.
            </p>
            <p style={{ marginBottom: 20 }}>
              Each of those chapters taught him a different piece of the same lesson: <em style={{ fontStyle: "italic" }}>you cannot transform healthcare by bolting better software onto a broken operating model.</em> The industry needed a new delivery layer — one integrated platform that brought clinical, genomic, behavioral, and operational data together under one roof. That conviction is what Primary is built on.
            </p>
            <p style={{ marginBottom: 20 }}>
              When he met Dr. Tzur Gabi, he finally met the clinical partner who had been trying to solve the same problem from the inside of the chair. They started Primary together.
            </p>
            <p>
              At Primary, Farhad leads the architecture across three connected layers: <strong style={{ color: B.navy, fontWeight: 500 }}>the clinic</strong> in Brentwood, where the model is proven one patient at a time; <strong style={{ color: B.navy, fontWeight: 500 }}>Primary iD</strong>, the platform that turns fragmented dental, genomic, and lifestyle data into a single patient-facing health score; and <strong style={{ color: B.navy, fontWeight: 500 }}>FODO</strong>, the AI-native scaling vehicle that extends the thesis to a national network of practices.
            </p>
          </div>
          <div style={{
            marginTop: 28, paddingTop: 28, borderTop: `1px solid ${B.line}`,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px",
          }} className="credit-grid-responsive">
            {FARHAD_CREDITS.map(c => (
              <div key={c.label} style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: B.inkSoft }}>
                <span style={{
                  display: "block", fontSize: 10, fontWeight: 500,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: B.muted, marginBottom: 4,
                }}>
                  {c.label}
                </span>
                {c.value}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 20, fontFamily: SANS, fontSize: 13 }}>
            <a href="#" style={{
              color: B.navy, textDecoration: "none", borderBottom: `1px solid ${B.navy}`, paddingBottom: 2,
            }}>LinkedIn →</a>
            <a href="#" style={{
              color: B.navy, textDecoration: "none", borderBottom: `1px solid ${B.navy}`, paddingBottom: 2,
            }}>Personal site →</a>
          </div>
        </div>
      </article>

      <style>{`
        @media (max-width: 820px) {
          .bio-card-responsive { grid-template-columns: 1fr !important; gap: 32px !important; }
          .bio-card-responsive > div:first-child { max-width: 320px; }
          .credit-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ── Golden Ratio Section ───────────────────────────────────────
function GoldenRatio() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.25 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "160px 40px 140px",
        maxWidth: 1100, margin: "0 auto",
        borderTop: `1px solid ${B.line}`,
        textAlign: "center",
      }}
    >
      <div style={{
        fontFamily: SANS, fontSize: 11, fontWeight: 500,
        letterSpacing: "0.32em", textTransform: "uppercase",
        color: B.muted, marginBottom: 32,
      }}>
        The Golden Ratio of Care
      </div>
      <h2 style={{
        fontFamily: SERIF, fontWeight: 300,
        fontSize: "clamp(40px, 5vw, 72px)",
        lineHeight: 1.02, letterSpacing: "-0.025em",
        color: B.navy, maxWidth: 880, margin: "0 auto",
      }}>
        Higher quality. More access. <em style={{ fontStyle: "italic", color: B.inkSoft }}>Lower cost.</em>
      </h2>
      <p style={{
        fontFamily: SANS, fontSize: 17, lineHeight: 1.62, color: B.inkSoft,
        maxWidth: 620, margin: "32px auto 0",
      }}>
        For fifty years, American healthcare has accepted a trade-off: you can raise quality, expand access, or lower cost — but never all three at once. Primary is built on the belief that this trade-off is a feature of the old operating model, not a law of nature.
      </p>

      {/* Triangle SVG Animation */}
      <div style={{
        position: "relative", margin: "96px auto 0",
        width: "100%", maxWidth: 720, aspectRatio: "1 / 1",
      }}>
        <svg viewBox="0 0 720 720" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Triangle */}
          <polygon
            points="140,90 80,600 600,340"
            fill="rgba(14,34,64,0.025)"
            stroke={B.navy}
            strokeWidth="1.5"
            style={{
              strokeDasharray: 1600,
              strokeDashoffset: inView ? 0 : 1600,
              transition: "stroke-dashoffset 2.2s cubic-bezier(.55,.1,.25,1) 0.3s",
            }}
          />

          {/* Fibonacci squares */}
          {[
            { x: 80, y: 340, w: 260, h: 260 },
            { x: 340, y: 340, w: 160, h: 160 },
            { x: 340, y: 500, w: 100, h: 100 },
            { x: 440, y: 500, w: 62, h: 62 },
          ].map((sq, i) => (
            <rect
              key={i}
              x={sq.x} y={sq.y} width={sq.w} height={sq.h}
              fill="none" stroke={B.navy} strokeWidth="0.5"
              style={{
                opacity: inView ? 0.14 : 0,
                transition: "opacity 0.8s ease 2.4s",
              }}
            />
          ))}

          {/* Golden spiral */}
          <path
            d="M 80 600 A 260 260 0 0 1 340 340 A 160 160 0 0 1 500 500 A 100 100 0 0 1 400 600 A 62 62 0 0 1 338 538 A 38 38 0 0 1 376 500"
            fill="none" stroke={B.green} strokeWidth="2"
            style={{
              opacity: 0.7,
              strokeDasharray: 800,
              strokeDashoffset: inView ? 0 : 800,
              transition: "stroke-dashoffset 3s cubic-bezier(.55,.1,.25,1) 1.8s",
            }}
          />

          {/* Quality label */}
          <g style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.9s cubic-bezier(.2,.8,.2,1) 2.8s",
          }}>
            <text x="140" y="58" textAnchor="middle" style={{
              fontFamily: SANS, fontSize: 12, fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase", fill: B.navy,
            }}>QUALITY</text>
            <text x="215" y="55" textAnchor="start" style={{
              fontFamily: SANS, fontSize: 20, fontWeight: 400, fill: B.green,
            }}>↑</text>
            <text x="140" y="80" textAnchor="middle" style={{
              fontFamily: SERIF, fontSize: 15, fontStyle: "italic", fill: B.inkSoft,
            }}>more time, deeper care</text>
          </g>

          {/* Access label */}
          <g style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.9s cubic-bezier(.2,.8,.2,1) 3.2s",
          }}>
            <text x="80" y="635" textAnchor="middle" style={{
              fontFamily: SANS, fontSize: 12, fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase", fill: B.navy,
            }}>ACCESS</text>
            <text x="146" y="632" textAnchor="start" style={{
              fontFamily: SANS, fontSize: 20, fontWeight: 400, fill: B.blue,
            }}>↑</text>
            <text x="80" y="657" textAnchor="middle" style={{
              fontFamily: SERIF, fontSize: 15, fontStyle: "italic", fill: B.inkSoft,
            }}>six minutes, from anywhere</text>
          </g>

          {/* Cost label */}
          <g style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.9s cubic-bezier(.2,.8,.2,1) 3.6s",
          }}>
            <text x="615" y="330" textAnchor="start" style={{
              fontFamily: SANS, fontSize: 12, fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase", fill: B.navy,
            }}>COST</text>
            <text x="668" y="333" textAnchor="start" style={{
              fontFamily: SANS, fontSize: 20, fontWeight: 400, fill: B.orange,
            }}>↓</text>
            <text x="615" y="354" textAnchor="start" style={{
              fontFamily: SERIF, fontSize: 15, fontStyle: "italic", fill: B.inkSoft,
            }}>prevention, not maze</text>
          </g>
        </svg>

        {/* Phi reveal */}
        <div style={{
          position: "absolute", bottom: -56, left: "50%", transform: "translateX(-50%)",
          fontFamily: SERIF, fontSize: 13, color: B.muted,
          letterSpacing: "0.12em", textAlign: "center", whiteSpace: "nowrap",
          opacity: inView ? 1 : 0,
          transition: "opacity 1s ease 4.4s",
        }}>
          φ · <span style={{ fontStyle: "italic", color: B.navy, fontSize: 16 }}>1.618</span> · the ratio nature uses to grow without waste
        </div>
      </div>

      {/* Three lever cards */}
      <div style={{
        marginTop: 120,
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
        textAlign: "left",
      }} className="lever-grid-responsive">
        {[
          { num: "01 / QUALITY", title: "Goes up", arrow: "↑", color: B.green, text: <>By scoring the whole patient <strong style={{ color: B.navy, fontWeight: 500 }}>before</strong> the first visit, our clinicians spend their chair time treating the person in front of them — not entering data, not selling procedures, not chasing reimbursement codes. The first ninety minutes are yours.</> },
          { num: "02 / ACCESS", title: "Goes up", arrow: "↑", color: B.blue, text: <>The Primary iD is a <strong style={{ color: B.navy, fontWeight: 500 }}>six-minute online assessment</strong> anyone, anywhere can take before they ever step into a clinic. Your health picture arrives before your chair time, and virtual second opinions let people start without leaving their couch.</> },
          { num: "03 / COST", title: "Goes down", arrow: "↓", color: B.orange, text: <>Prevention is an order of magnitude cheaper than intervention. Our membership model removes the insurance maze, aligns incentives with your long-term health, and lets us catch problems <strong style={{ color: B.navy, fontWeight: 500 }}>years before they become procedures</strong>.</> },
        ].map(lever => (
          <div key={lever.num} style={{
            padding: "36px 28px", borderRadius: 16,
            background: B.cream, border: `1px solid ${B.line}`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: 48, height: 2, background: lever.color,
            }} />
            <div style={{
              fontFamily: SANS, fontSize: 10, fontWeight: 500,
              color: B.muted, letterSpacing: "0.28em", marginBottom: 12,
            }}>
              {lever.num}
            </div>
            <h3 style={{
              fontFamily: SERIF, fontWeight: 400, fontSize: 26,
              color: B.navy, letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: 0,
            }}>
              {lever.title} <span style={{ fontSize: 20, color: lever.color, marginLeft: 4 }}>{lever.arrow}</span>
            </h3>
            <p style={{
              fontFamily: SANS, fontSize: 14, lineHeight: 1.62, color: B.inkSoft, marginTop: 14,
            }}>
              {lever.text}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 96, padding: "0 20px" }}>
        <p style={{
          fontFamily: SERIF, fontSize: "clamp(22px, 2.6vw, 32px)",
          lineHeight: 1.28, fontWeight: 300, color: B.navy,
          maxWidth: 780, margin: "0 auto", letterSpacing: "-0.01em",
        }}>
          The old model assumed the three had to fight. <em style={{ fontStyle: "italic", color: B.inkSoft }}>We built one where they compound.</em>
        </p>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .lever-grid-responsive { grid-template-columns: 1fr !important; gap: 16px !important; margin-top: 80px !important; }
        }
      `}</style>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{
      padding: "140px 40px 40px",
      maxWidth: 1100, margin: "0 auto",
      borderTop: `1px solid ${B.line}`,
      textAlign: "center",
    }}>
      <h2 style={{
        fontFamily: SERIF, fontWeight: 300,
        fontSize: "clamp(40px, 5vw, 72px)",
        lineHeight: 1, letterSpacing: "-0.03em",
        color: B.navy, marginBottom: 16,
      }}>
        Ready to see what your<br />
        <em style={{ fontStyle: "italic", color: B.inkSoft }}>mouth has been saying?</em>
      </h2>
      <p style={{
        fontFamily: SANS, fontSize: 16, color: B.inkSoft,
        maxWidth: 460, margin: "0 auto 40px", lineHeight: 1.6,
      }}>
        Five dimensions. One score. Six minutes. Before the chair, before the bill, before anything else.
      </p>
      <Link href="/get-started" style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        background: B.navy, color: B.warm,
        padding: "16px 32px", borderRadius: 100,
        textDecoration: "none",
        fontFamily: SANS, fontSize: 13, fontWeight: 500, letterSpacing: "0.06em",
        transition: "transform 200ms ease",
      }}>
        Get your Primary iD →
      </Link>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────
const FOOTER_COLS = [
  { heading: "Primary", links: [
    { label: "Why Primary", href: "/why-primary" },
    { label: "Membership", href: "/membership" },
    { label: "Locations", href: "/locations" },
    { label: "Book a visit", href: "/book" },
  ]},
  { heading: "Learn", links: [
    { label: "Our approach", href: "/oral-systemic" },
    { label: "Research library", href: "/research" },
    { label: "About us", href: "/about" },
    { label: "Health assessment", href: "/diagnostics" },
  ]},
  { heading: "Connect", links: [
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "For practitioners", href: "/practitioners" },
  ]},
];

function Footer() {
  return (
    <footer style={{ background: B.navy, color: B.warm, padding: "80px 40px 48px" }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1.5fr repeat(3, 1fr)", gap: 64,
      }}>
        <div>
          <img src="/images/primary-brand-logo-light.png" alt="Primary" style={{ height: 32, marginBottom: 20 }} />
          <p style={{
            fontFamily: SERIF, fontSize: 15, lineHeight: 1.55,
            color: "rgba(254, 252, 249, 0.7)", maxWidth: 260,
          }}>
            Whole-body dentistry. One score. A new front door to healthcare.
          </p>
        </div>
        {FOOTER_COLS.map(col => (
          <div key={col.heading}>
            <h4 style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(254, 252, 249, 0.5)", marginBottom: 20,
            }}>
              {col.heading}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {col.links.map(link => (
                <li key={link.href} style={{ marginBottom: 14 }}>
                  <Link href={link.href} style={{
                    fontFamily: SANS, fontSize: 14, color: B.warm,
                    textDecoration: "none", transition: "color 0.2s ease",
                  }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        maxWidth: 1280, margin: "64px auto 0",
        paddingTop: 32, borderTop: "1px solid rgba(254, 252, 249, 0.1)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: SANS, fontSize: 12, color: "rgba(254, 252, 249, 0.4)",
      }}>
        <span>© 2025 Primary Health Inc. All rights reserved.</span>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy</Link>
          <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms</Link>
          <Link href="/hipaa" style={{ color: "inherit", textDecoration: "none" }}>HIPAA</Link>
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────
export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ background: B.warm, minHeight: "100vh" }}>
      <Nav scrolled={scrolled} />
      <Hero />
      <Manifesto />
      <Origin />
      <Bios />
      <GoldenRatio />
      <CTA />
      <Footer />
    </main>
  );
}
