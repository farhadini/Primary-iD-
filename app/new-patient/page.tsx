"use client";

import { useState, useEffect, useRef } from "react";

// ============================================================
// PRIMARY — New Patient Experience Page
// + Homepage section component (export separately)
// Design: quiet luxury · editorial · anxiety-reducing · warm
// ============================================================

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  cream: "#FAF8F5",
  warmWhite: "#FEFCF9",
  white: "#FFFFFF",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  border: "rgba(14,34,64,0.07)",
  accent: "#E8985E",
  purple: "#7B68EE",
};

// ── Reveal on scroll ──────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Nav ───────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(250,248,245,0.96)" : "rgba(250,248,245,0.9)",
      backdropFilter: "blur(16px)",
      borderBottom: scrolled ? `1px solid ${B.border}` : "none",
      transition: "all 0.4s ease", padding: "0 32px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img 
            src="/images/primary-brand-logo.png" 
            alt="Primary" 
            style={{ height: 36, width: "auto" }} 
          />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/" style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, textDecoration: "none", opacity: 0.6 }}>← Back to home</a>
          <a href="#book" style={{
            background: B.navy, color: B.white, textDecoration: "none",
            borderRadius: 8, padding: "9px 20px",
            fontFamily: "Georgia,serif", fontSize: 13,
            boxShadow: "0 2px 12px rgba(14,34,64,0.18)",
          }}>Book a visit</a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      background: B.navy, padding: "140px 32px 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Architectural circles */}
      <div style={{ position: "absolute", right: "-5%", top: "-10%", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "5%", bottom: "-20%", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.6s ease 0.1s",
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: B.green }} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>
              YOUR FIRST VISIT · BRENTWOOD, LOS ANGELES
            </span>
          </div>

          <h1 style={{
            fontFamily: "Georgia,serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 400,
            color: B.white,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 24px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(14px)",
            transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.2s",
          }}>
            A first visit designed<br />
            around a lifetime of<br />
            <span style={{ fontStyle: "italic", color: B.blue }}>wellbeing.</span>
          </h1>

          <p style={{
            fontFamily: "Georgia,serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 0 40px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.8s ease 0.35s",
          }}>
            We know visiting a new practice can feel uncertain. So we have mapped out every step, from before you arrive to what you take home with you.
          </p>

          {/* Quick stats */}
          <div style={{
            display: "flex", gap: 32, flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 0.55s",
          }}>
            {[
              { n: "~90 min", label: "First visit" },
              { n: "Before", label: "Online assessment" },
              { n: "5", label: "Health dimensions" },
              { n: "Same day", label: "Your Primary iD" },
            ].map(s => (
              <div key={s.n}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 20, color: B.white }}>{s.n}</div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Phase divider ─────────────────────────────────────────────
function PhaseDivider({ label, color = B.blue }) {
  return (
    <div style={{
      background: `${color}08`,
      borderTop: `1px solid ${color}15`,
      borderBottom: `1px solid ${color}15`,
      padding: "10px 32px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
        <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color, letterSpacing: "0.07em" }}>{label}</span>
      </div>
    </div>
  );
}

// ── Pre-Visit Section ─────────────────────────────────────────
function PreVisit() {
  const [ref, visible] = useReveal();
  const [activeQ, setActiveQ] = useState(null);

  const assessmentDims = [
    { label: "Oral Health", color: B.blue, icon: "🦷", time: "2 min", desc: "Current state of teeth, gums, and existing dental work" },
    { label: "Sleep & Airway", color: B.purple, icon: "😴", time: "2 min", desc: "Sleep quality, snoring, energy levels, jaw tension" },
    { label: "Nutrition", color: B.green, icon: "🥗", time: "2 min", desc: "Diet, hydration, oral microbiome support" },
    { label: "Genetics", color: "#E05BBF", icon: "🧬", time: "2 min", desc: "Family history, chronic inflammation, sensitivities" },
    { label: "Airway Health", color: B.accent, icon: "💨", time: "2 min", desc: "Breathing patterns, nasal vs mouth breathing" },
  ];

  const faqs = [
    { q: "How long does the assessment take?", a: "About 10 minutes total — 2 minutes per dimension. You can save and return if needed." },
    { q: "Do I need to complete it before my visit?", a: "We strongly recommend it. It lets Dr. Gabi review your health picture before you even sit in the chair, so your time together is deeper and more personal." },
    { q: "Is my information private?", a: "Completely. Your responses are used only to personalize your care. We never share or sell patient data." },
    { q: "What if I don't know the answers to some questions?", a: "Your best estimate is fine. The assessment is a starting point, not a diagnostic test. We'll refine the picture together during your visit." },
  ];

  return (
    <section ref={ref} style={{ background: B.cream, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ maxWidth: 600, marginBottom: 60 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
            opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
          }}>
            <div style={{ width: 24, height: 1, background: B.blue }} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.blue, letterSpacing: "0.06em" }}>BEFORE YOU ARRIVE</span>
          </div>
          <h2 style={{
            fontFamily: "Georgia,serif",
            fontSize: "clamp(26px, 3vw, 38px)",
            fontWeight: 400,
            color: B.navy,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            margin: "0 0 16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s",
          }}>
            Complete your<br /><span style={{ fontStyle: "italic" }}>health assessment</span><br />online, before you visit.
          </h2>
          <p style={{
            fontFamily: "Georgia,serif", fontSize: 15, color: B.body,
            lineHeight: 1.7, margin: 0,
            opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.2s",
          }}>
            The Primary iD assessment takes 10 minutes and gives Dr. Gabi a complete health picture before your visit even begins. It transforms your first appointment from intake paperwork into a genuine health conversation.
          </p>
        </div>

        {/* Two-column: assessment cards + right side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>

          {/* Left: the 5 dimensions */}
          <div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.muted, letterSpacing: "0.05em", marginBottom: 16, opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.25s" }}>
              FIVE DIMENSIONS · ~10 MINUTES TOTAL
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {assessmentDims.map((dim, i) => (
                <div key={dim.label} style={{
                  background: B.warmWhite,
                  borderRadius: 12,
                  padding: "16px 18px",
                  border: `1px solid ${B.border}`,
                  display: "flex", alignItems: "center", gap: 14,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: `all 0.6s cubic-bezier(0.23,1,0.32,1) ${0.3 + i * 0.07}s`,
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${dim.color}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {dim.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.navy }}>{dim.label}</span>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.muted, fontStyle: "italic" }}>{dim.time}</span>
                    </div>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: B.body, opacity: 0.7, lineHeight: 1.4 }}>{dim.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 24,
              opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.7s",
            }}>
              <a href="#" style={{
                background: B.navy, color: B.white, textDecoration: "none",
                borderRadius: 9, padding: "14px 28px",
                fontFamily: "Georgia,serif", fontSize: 14,
                display: "inline-block",
                boxShadow: "0 4px 20px rgba(14,34,64,0.18)",
                transition: "all 0.25s ease",
              }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(14,34,64,0.26)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(14,34,64,0.18)"; }}
              >
                Begin your assessment
              </a>
            </div>
          </div>

          {/* Right: FAQ */}
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.4s" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.muted, letterSpacing: "0.05em", marginBottom: 16 }}>
              COMMON QUESTIONS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{
                  borderBottom: `1px solid ${B.border}`,
                  overflow: "hidden",
                }}>
                  <button
                    onClick={() => setActiveQ(activeQ === i ? null : i)}
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      padding: "16px 0",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      cursor: "pointer", gap: 12,
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.navy, lineHeight: 1.4 }}>{faq.q}</span>
                    <span style={{
                      color: B.blue, fontSize: 18, flexShrink: 0,
                      transform: activeQ === i ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.3s ease",
                      display: "inline-block",
                    }}>+</span>
                  </button>
                  <div style={{
                    maxHeight: activeQ === i ? 120 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.23,1,0.32,1)",
                  }}>
                    <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, lineHeight: 1.65, paddingBottom: 16, margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* What to bring */}
            <div style={{ marginTop: 32, background: B.warmWhite, borderRadius: 14, padding: 24, border: `1px solid ${B.border}` }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: B.muted, letterSpacing: "0.05em", marginBottom: 14 }}>WHAT TO BRING</div>
              {[
                "Any recent dental X-rays or records",
                "List of current medications and supplements",
                "Insurance card (if applicable)",
                "Your completed health assessment",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 3 ? 10 : 0 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: B.green, flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Day Of: Journey Steps ─────────────────────────────────────
function DayOf() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Arrival & Welcome",
      time: "0–15 min",
      color: B.blue,
      room: null,
      description: "You'll be greeted by name and taken on a brief orientation of the space. The Brentwood skyline views were intentional — this is not your typical dental waiting room.",
      details: [
        "No clipboards, no waiting room forms — your intake is already complete",
        "Your care team has reviewed your health assessment",
        "You'll be offered water, tea, or a quiet moment to settle in",
        "Meet the person who will guide you through your visit",
      ],
      note: null,
    },
    {
      number: "02",
      title: "Comprehensive Diagnostics",
      time: "15–50 min",
      color: B.green,
      room: "RENEWAL or RESTORE",
      description: "This is where Primary is different. We use technology that most practices don't have — and we explain every step so you understand what we're looking for and why.",
      details: [
        "3D CBCT imaging — sees bone density, airways, hidden infections",
        "Intraoral scanning — digital impressions, no trays",
        "Salivary diagnostics — identifies bacterial risk and microbiome imbalance",
        "Airway analysis — measures your actual breathing capacity",
        "Full periodontal assessment — gum health and inflammation markers",
      ],
      note: "Each test takes 5–10 minutes. We narrate as we go, connecting findings to your health picture.",
    },
    {
      number: "03",
      title: "Consultation with Dr. Gabi",
      time: "50–75 min",
      color: B.accent,
      room: "REIMAGINE",
      description: "This is not a sales presentation. Dr. Gabi walks you through everything found during diagnostics, connects your oral findings to your overall health, and answers your questions.",
      details: [
        "Dr. Gabi reviews your 3D imaging with you on screen",
        "Discussion of mouth-body connections relevant to your specific findings",
        "Honest conversation about what needs attention and what can wait",
        "Your questions get real answers, not time pressure",
        "No treatment is ever recommended without a clear explanation of why",
      ],
      note: "Dr. Gabi spends a minimum of 20 minutes with every new patient. This is a health conversation.",
    },
    {
      number: "04",
      title: "Your Primary iD",
      time: "75–85 min",
      color: B.purple,
      room: null,
      description: "By the end of your visit, you receive your personalized Primary iD — a scored health roadmap across all five dimensions that you can take with you and build on over time.",
      details: [
        "Scores across oral health, sleep, nutrition, genetics, and airway",
        "Priority areas identified based on your specific profile",
        "Recommended next steps, clearly ranked by importance",
        "Connections to systemic health highlighted",
        "Saved to your patient account for ongoing reference",
      ],
      note: null,
    },
    {
      number: "05",
      title: "Care Plan & Next Steps",
      time: "85–90 min",
      color: B.green,
      room: "REIMAGINE",
      description: "Your treatment coordinator walks you through a care plan that makes sense — no pressure, no confusion. Every option is explained with context and you leave with clarity, not anxiety.",
      details: [
        "Treatment options presented with clear priorities",
        "Transparent pricing with no hidden costs",
        "Membership options for ongoing care",
        "Insurance review and financing options if applicable",
        "Your next appointment scheduled before you leave",
      ],
      note: "The goal is that you leave knowing exactly what to do next — and genuinely excited about your health journey.",
    },
  ];

  return (
    <section style={{ background: B.warmWhite, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ maxWidth: 600, marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: B.accent }} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.accent, letterSpacing: "0.06em" }}>THE DAY OF YOUR VISIT</span>
          </div>
          <h2 style={{
            fontFamily: "Georgia,serif",
            fontSize: "clamp(26px, 3vw, 38px)",
            fontWeight: 400,
            color: B.navy,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            margin: "0 0 16px",
          }}>
            Ninety minutes that<br /><span style={{ fontStyle: "italic" }}>change how you see</span><br />your health.
          </h2>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 15, color: B.body, lineHeight: 1.7, margin: 0 }}>
            Every step below happens on your first visit. We've designed it so nothing is a surprise.
          </p>
        </div>

        {/* Step selector + detail */}
        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 40, alignItems: "start" }}>

          {/* Left: step list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    background: isActive ? B.navy : "transparent",
                    border: isActive ? "none" : `1px solid ${B.border}`,
                    borderRadius: 12,
                    padding: "16px 20px",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex", alignItems: "center", gap: 16,
                    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                    boxShadow: isActive ? "0 4px 20px rgba(14,34,64,0.15)" : "none",
                  }}
                  onMouseOver={e => { if (!isActive) e.currentTarget.style.background = `${B.navy}05`; }}
                  onMouseOut={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                >
                  {/* Step indicator */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                    background: isActive ? `${step.color}25` : `${step.color}10`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: isActive ? `1px solid ${step.color}35` : "none",
                    transition: "all 0.3s ease",
                  }}>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: step.color }}>{step.number}</span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: isActive ? B.white : B.navy, marginBottom: 2 }}>
                      {step.title}
                    </div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: isActive ? "rgba(255,255,255,0.4)" : B.muted, fontStyle: "italic" }}>
                      {step.time}
                    </div>
                  </div>

                  <div style={{ color: isActive ? step.color : `${B.navy}20`, fontSize: 14, transition: "all 0.3s" }}>→</div>
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <div>
            {steps.map((step, i) => (
              <div key={i} style={{
                opacity: activeStep === i ? 1 : 0,
                position: activeStep === i ? "relative" : "absolute",
                pointerEvents: activeStep === i ? "auto" : "none",
                transform: activeStep === i ? "translateX(0)" : "translateX(12px)",
                transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              }}>
                {activeStep === i && (
                  <div>
                    {/* Room name if applicable */}
                    {step.room && (
                      <div style={{ marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 8, background: `${step.color}08`, borderRadius: 8, padding: "6px 14px", border: `1px solid ${step.color}15` }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: step.color }} />
                        <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: step.color, letterSpacing: "0.04em" }}>
                          Room: {step.room}
                        </span>
                      </div>
                    )}

                    <h3 style={{ fontFamily: "Georgia,serif", fontSize: 26, fontWeight: 400, color: B.navy, margin: "0 0 8px", lineHeight: 1.2 }}>
                      {step.title}
                    </h3>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: B.muted, fontStyle: "italic", marginBottom: 20 }}>
                      {step.time} into your visit
                    </div>

                    <p style={{ fontFamily: "Georgia,serif", fontSize: 15, color: B.body, lineHeight: 1.7, margin: "0 0 28px" }}>
                      {step.description}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: step.note ? 24 : 0 }}>
                      {step.details.map((d, j) => (
                        <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <div style={{ width: 20, height: 20, borderRadius: 6, background: `${step.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                            <span style={{ fontFamily: "Georgia,serif", fontSize: 10, color: step.color }}>{j + 1}</span>
                          </div>
                          <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.body, lineHeight: 1.55 }}>{d}</span>
                        </div>
                      ))}
                    </div>

                    {step.note && (
                      <div style={{ background: `${step.color}06`, borderLeft: `3px solid ${step.color}`, borderRadius: "0 10px 10px 0", padding: "14px 18px", marginTop: 8 }}>
                        <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.navy, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                          {step.note}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Rooms section ─────────────────────────────────────────────
function TheSpace() {
  const [ref, visible] = useReveal();

  const rooms = [
    { name: "RESTORE", prefix: "re·store", phonetic: "/ri-ˈstȯr/", pos: "verb", def: "To return the body to its natural state of balance and optimal function; to rebuild not just teeth, but confidence, nutrition, and systemic health.", color: B.blue, use: "Full arch · Implants · Complex restorative" },
    { name: "REGENERATE", prefix: "re·gen·er·ate", phonetic: "/ri-ˈje-nə-ˌrāt/", pos: "verb", def: "To activate the body's innate healing capacity; to create conditions where damaged structures rebuild themselves through thoughtful intervention.", color: B.green, use: "Crowns · Fillings · Biocompatible restoration" },
    { name: "REJUVENATE", prefix: "re·ju·ve·nate", phonetic: "/ri-ˈjü-və-ˌnāt/", pos: "verb", def: "To restore youthful vitality by addressing root causes; to transform not just appearance but energy, sleep, and overall wellbeing.", color: B.accent, use: "Sleep appliances · Airway · Myofunctional" },
    { name: "RENEWAL", prefix: "re·new·al", phonetic: "/ri-ˈnü-əl/", pos: "noun", def: "A fresh beginning in your health journey; the practice of recommitting to wellness through preventive care and early detection.", color: B.purple, use: "New patient exams · Hygiene · Assessment" },
    { name: "REFRESH", prefix: "re·fresh", phonetic: "/ri-ˈfresh/", pos: "verb", def: "To revitalize your confidence and clarity; to cleanse away what no longer serves you while nourishing the oral microbiome.", color: "#48C2C2", use: "Periodontal maintenance · Cleanings · Cosmetic" },
    { name: "REIMAGINE", prefix: "re·i·mag·ine", phonetic: "/ˌrē-i-ˈma-jən/", pos: "verb", def: "To envision possibilities beyond the present; to transform uncertainty into empowered action by co-creating your personalized health roadmap.", color: B.green, use: "Treatment planning · Care coordination" },
  ];

  return (
    <section ref={ref} style={{ background: B.cream, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>
              <div style={{ width: 24, height: 1, background: B.navy, opacity: 0.2 }} />
              <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.muted, letterSpacing: "0.06em" }}>THE SPACE</span>
            </div>
            <h2 style={{
              fontFamily: "Georgia,serif",
              fontSize: "clamp(24px, 2.8vw, 36px)",
              fontWeight: 400, color: B.navy,
              lineHeight: 1.15, letterSpacing: "-0.01em",
              margin: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s",
            }}>
              Every room has a name.<br />Every name has<br /><span style={{ fontStyle: "italic" }}>a meaning.</span>
            </h2>
          </div>
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 15, color: B.body, lineHeight: 1.75, margin: 0 }}>
              We named each room with intention. The "Re-" prefix isn't decorative — it's a philosophy. Every treatment, every visit, every conversation here is about returning you to something. Balance. Health. Clarity. Confidence.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {rooms.map((room, i) => (
            <div key={room.name} style={{
              background: B.warmWhite,
              borderRadius: 16, padding: "24px 22px",
              border: `1px solid ${B.border}`,
              transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
              cursor: "default",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${0.2 + i * 0.07}s`,
            }}
              onMouseOver={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${room.color}10`; e.currentTarget.style.borderColor = `${room.color}25`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = B.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Dictionary header */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 400, color: B.navy, letterSpacing: "0.01em" }}>{room.prefix}</span>
                  <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.muted, fontStyle: "italic" }}>{room.phonetic}</span>
                </div>
                <span style={{ fontFamily: "Georgia,serif", fontSize: 10, color: room.color, letterSpacing: "0.04em" }}>{room.pos}</span>
              </div>

              <div style={{ width: 28, height: 1, background: `${room.color}40`, marginBottom: 14 }} />

              <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, lineHeight: 1.65, margin: "0 0 16px", fontStyle: "italic" }}>
                "{room.def}"
              </p>

              <div style={{ padding: "8px 12px", background: `${room.color}06`, borderRadius: 8, border: `1px solid ${room.color}12` }}>
                <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: room.color }}>{room.use}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Booking CTA ───────────────────────────────────────────────
function BookCTA() {
  const [ref, visible] = useReveal();
  return (
    <section id="book" ref={ref} style={{ background: B.navy, padding: "96px 32px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 24, height: 1, background: B.blue }} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.blue, letterSpacing: "0.06em" }}>READY TO BEGIN</span>
            <div style={{ width: 24, height: 1, background: B.blue }} />
          </div>

          <h2 style={{
            fontFamily: "Georgia,serif",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 400, color: B.white,
            lineHeight: 1.12, letterSpacing: "-0.015em",
            margin: "0 0 20px",
          }}>
            You've seen exactly<br />what to expect.<br />
            <span style={{ fontStyle: "italic", color: B.blue }}>Let's get started.</span>
          </h2>

          <p style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: "0 auto 40px", maxWidth: 460 }}>
            Book your first visit and complete your health assessment before you arrive. Your Primary iD awaits.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{
              background: B.white, color: B.navy, textDecoration: "none",
              borderRadius: 9, padding: "16px 36px",
              fontFamily: "Georgia,serif", fontSize: 15,
              transition: "all 0.25s ease",
              display: "inline-block",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.2)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"; }}
            >
              Book a visit
            </a>
            <a href="#" style={{
              background: "transparent", color: "rgba(255,255,255,0.7)", textDecoration: "none",
              borderRadius: 9, padding: "16px 28px",
              fontFamily: "Georgia,serif", fontSize: 15,
              border: "1px solid rgba(255,255,255,0.15)",
              transition: "all 0.25s ease",
              display: "inline-block",
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = B.white; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >
              Start assessment first
            </a>
          </div>

          <div style={{ marginTop: 36, fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
            11980 San Vicente Blvd, Suite 902 · Brentwood, LA · (310) 564-8990
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: B.navy, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
          © 2025 Primary Integrative Dentistry
        </span>
        <a href="/" style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
          ← Back to home
        </a>
      </div>
    </footer>
  );
}

// ============================================================
// HOMEPAGE SECTION COMPONENT
// Drop this into primary-homepage.jsx between Appointments and AssessmentCTA
// ============================================================
export function NewPatientSection({ onNavigate }) {
  const [ref, visible] = useReveal(0.08);

  const visitSteps = [
    { n: "01", title: "Before you arrive", sub: "Complete your online health assessment", color: B.blue },
    { n: "02", title: "Comprehensive diagnostics", sub: "3D imaging, salivary diagnostics, airway analysis", color: B.green },
    { n: "03", title: "Your Primary iD", sub: "Personalized health picture in five dimensions", color: B.accent },
    { n: "04", title: "Care plan & next steps", sub: "Clear priorities, transparent pricing, no pressure", color: B.purple },
  ];

  return (
    <section ref={ref} style={{ background: B.navy, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* Left: copy */}
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 24,
              opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
            }}>
              <div style={{ width: 24, height: 1, background: B.accent }} />
              <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.accent, letterSpacing: "0.06em" }}>YOUR FIRST VISIT</span>
            </div>

            <h2 style={{
              fontFamily: "Georgia,serif",
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 400, color: B.white,
              lineHeight: 1.12, letterSpacing: "-0.01em",
              margin: "0 0 18px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s",
            }}>
              We've reimagined<br />what a first visit<br /><span style={{ fontStyle: "italic", color: B.accent }}>feels like.</span>
            </h2>

            <p style={{
              fontFamily: "Georgia,serif", fontSize: 15,
              color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
              margin: "0 0 36px", maxWidth: 420,
              opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.2s",
            }}>
              Ninety minutes. No surprises. A health picture you've never had before — and a clear path forward.
            </p>

            <a
              href="/new-patient"
              onClick={onNavigate}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "Georgia,serif", fontSize: 14,
                color: B.accent, textDecoration: "none",
                borderBottom: `1px solid ${B.accent}40`,
                paddingBottom: 3,
                transition: "all 0.2s ease",
                opacity: visible ? 1 : 0,
                transitionDelay: "0.3s",
              }}
              onMouseOver={e => { e.currentTarget.style.borderBottomColor = B.accent; e.currentTarget.style.gap = "14px"; }}
              onMouseOut={e => { e.currentTarget.style.borderBottomColor = `${B.accent}40`; e.currentTarget.style.gap = "10px"; }}
            >
              See exactly what happens
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.accent} strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right: visit steps */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.15s",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {visitSteps.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  padding: "16px 20px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.25s ease",
                }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = `${s.color}30`; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: `${s.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${s.color}20` }}>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: s.color }}>{s.n}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.white }}>{s.title}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, padding: "14px 20px", background: `${B.accent}08`, borderRadius: 10, border: `1px solid ${B.accent}15` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: B.accent }} />
                <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: B.accent }}>~90 minutes · Brentwood, Los Angeles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FULL PAGE
// ============================================================
export default function NewPatientPage() {
  return (
    <div style={{ fontFamily: "Georgia,serif", background: B.cream, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <PhaseDivider label="PHASE 01 · BEFORE YOUR VISIT" color={B.blue} />
      <PreVisit />
      <PhaseDivider label="PHASE 02 · THE DAY OF YOUR VISIT" color={B.accent} />
      <DayOf />
      <PhaseDivider label="THE SPACE · YOUR ROOMS" color={B.green} />
      <TheSpace />
      <BookCTA />
      <Footer />
    </div>
  );
}
