"use client";

// ─────────────────────────────────────────────────────────────
// Section 5 — The New Patient Visit, Reimagined
// ─────────────────────────────────────────────────────────────

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  accent: "#E8985E",
  purple: "#7B68EE",
  gold: "#D4B584",
};

const SERIF = 'Georgia, "Times New Roman", serif';
const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Montserrat, sans-serif';

// ─────────────────────────────────────────────────────────────
// Step 1 Visual: Assessment Quiz Mock
// ─────────────────────────────────────────────────────────────
function MockQuiz() {
  return (
    <div style={{
      background: B.warm,
      border: `1px solid rgba(14,34,64,0.08)`,
      borderRadius: 16,
      padding: 20,
      width: "100%",
      maxWidth: 280,
      boxShadow: "0 16px 32px -16px rgba(14,34,64,0.15)",
      textAlign: "left",
      position: "relative",
    }}>
      {/* Score peek badge */}
      <div style={{
        position: "absolute",
        top: -14, right: -22,
        background: B.navy,
        color: "#fff",
        fontFamily: SERIF,
        fontSize: 13, fontStyle: "italic",
        padding: "6px 14px",
        borderRadius: 999,
        boxShadow: "0 12px 28px -12px rgba(14,34,64,0.5)",
        transform: "rotate(4deg)",
        whiteSpace: "nowrap",
      }}>
        Score: <strong style={{ fontStyle: "normal", fontWeight: 600, color: B.blue }}>76</strong>
      </div>

      {/* Progress */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 11, color: B.muted,
        fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
        marginBottom: 10,
      }}>
        <span>Question 18 / 50</span>
        <span>37%</span>
      </div>
      <div style={{
        height: 3, background: "rgba(14,34,64,0.08)",
        borderRadius: 3, overflow: "hidden", marginBottom: 20,
      }}>
        <div style={{ height: "100%", width: "37%", background: B.blue, borderRadius: 3 }} />
      </div>

      {/* Question */}
      <p style={{
        fontFamily: SERIF, fontSize: 17, lineHeight: 1.3,
        color: B.navy, margin: "0 0 18px",
      }}>
        How often do you wake up feeling tired?
      </p>

      {/* Pills */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {["Rarely", "Sometimes", "Often", "Every day"].map((opt, i) => {
          const selected = opt === "Often";
          return (
            <div key={opt} style={{
              padding: "10px 14px", borderRadius: 9,
              border: `1px solid ${selected ? B.blue : "rgba(14,34,64,0.1)"}`,
              background: selected ? "rgba(36,167,224,0.08)" : "transparent",
              fontSize: 13, color: selected ? B.navy : B.body,
              fontWeight: selected ? 500 : 400,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{
                width: 14, height: 14, borderRadius: "50%",
                border: `1.5px solid ${selected ? B.blue : "rgba(14,34,64,0.25)"}`,
                background: selected ? B.blue : "transparent",
                boxShadow: selected ? `inset 0 0 0 3px ${B.warm}` : "none",
                flexShrink: 0,
              }} />
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 2 Visual: Appointment Chooser Mock
// ─────────────────────────────────────────────────────────────
function MockAppointment() {
  const options = [
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      iconBg: "rgba(72,194,140,0.14)",
      iconColor: B.green,
      title: "In-person visit",
      sub: "Brentwood · 90 min",
      selected: false,
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
      iconBg: "rgba(36,167,224,0.14)",
      iconColor: B.blue,
      title: "Virtual second opinion",
      badge: "Free",
      sub: "From anywhere · 30 min",
      selected: true,
    },
  ];

  return (
    <div style={{
      background: B.warm,
      border: `1px solid rgba(14,34,64,0.08)`,
      borderRadius: 16,
      padding: 18,
      width: "100%",
      maxWidth: 280,
      boxShadow: "0 16px 32px -16px rgba(14,34,64,0.15)",
      textAlign: "left",
    }}>
      <div style={{
        fontSize: 10.5, color: B.muted,
        letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
        marginBottom: 10,
      }}>
        Choose your visit
      </div>

      {options.map((opt, i) => (
        <div key={i} style={{
          border: `1px solid ${opt.selected ? B.blue : "rgba(14,34,64,0.1)"}`,
          borderRadius: 12,
          padding: "12px 14px",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: opt.selected ? "rgba(36,167,224,0.06)" : "transparent",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            background: opt.iconBg,
            color: opt.iconColor,
          }}>
            {opt.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: B.navy,
              lineHeight: 1.25,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              {opt.title}
              {opt.badge && (
                <span style={{
                  fontSize: 9.5, fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  background: B.green, color: "#fff",
                  padding: "2px 7px", borderRadius: 999,
                }}>
                  {opt.badge}
                </span>
              )}
            </div>
            <div style={{ fontSize: 11.5, color: B.muted, marginTop: 2 }}>{opt.sub}</div>
          </div>
          <span style={{
            width: 16, height: 16, borderRadius: "50%",
            border: `1.5px solid ${opt.selected ? B.blue : "rgba(14,34,64,0.25)"}`,
            background: opt.selected ? B.blue : "transparent",
            boxShadow: opt.selected ? `inset 0 0 0 3px ${B.warm}` : "none",
            flexShrink: 0,
          }} />
        </div>
      ))}

      <div style={{
        marginTop: 12,
        fontFamily: SERIF, fontStyle: "italic",
        fontSize: 12, color: B.muted,
        textAlign: "center",
      }}>
        No rush. No pressure to book in person.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step 3 Visual: Oral → Systemic Playbook Cover
// ─────────────────────────────────────────────────────────────
function MockPlaybook() {
  const chips = [
    { label: "Oral", bg: "rgba(72,194,140,0.16)", color: "#2d8a5f" },
    { label: "Sleep", bg: "rgba(36,167,224,0.16)", color: B.blue },
    { label: "Nutrition", bg: "rgba(232,152,94,0.16)", color: "#b56a31" },
    { label: "Genetics", bg: "rgba(123,104,238,0.16)", color: B.purple },
    { label: "Longevity", bg: "rgba(212,181,132,0.22)", color: "#9c823a" },
  ];

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: 280,
      height: 260,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Pages peeking behind */}
      <div style={{
        position: "absolute",
        width: 220, height: 200,
        background: B.warm,
        border: `1px solid rgba(14,34,64,0.06)`,
        borderRadius: 10,
        boxShadow: "0 10px 24px -16px rgba(14,34,64,0.2)",
        transform: "translate(12px, 10px) rotate(3deg)",
        zIndex: 1,
      }} />
      <div style={{
        position: "absolute",
        width: 220, height: 200,
        background: B.warm,
        border: `1px solid rgba(14,34,64,0.06)`,
        borderRadius: 10,
        boxShadow: "0 10px 24px -16px rgba(14,34,64,0.2)",
        transform: "translate(-10px, 6px) rotate(-3deg)",
        zIndex: 2,
      }} />

      {/* Cover */}
      <div style={{
        position: "relative",
        zIndex: 3,
        width: 240, height: 220,
        background: `linear-gradient(180deg, #fff 0%, ${B.warm} 100%)`,
        border: `1px solid rgba(14,34,64,0.1)`,
        borderRadius: 12,
        boxShadow: "0 24px 48px -20px rgba(14,34,64,0.24)",
        padding: "20px 22px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "left",
      }}>
        <div style={{
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: B.muted,
        }}>
          Your Primary iD · Playbook
        </div>

        <div>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10,
            fontFamily: SERIF,
            fontSize: 22,
            color: B.navy,
            letterSpacing: "-0.01em",
            margin: "14px 0 4px",
          }}>
            <span>Oral</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B.blue} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="13 6 19 12 13 18"/>
            </svg>
            <em style={{ fontStyle: "italic", color: B.blue }}>Systemic</em>
          </div>
          <p style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 12,
            color: B.muted,
            textAlign: "center",
            margin: "0 0 14px",
          }}>
            to optimal wellbeing
          </p>
        </div>

        <div style={{
          display: "flex", flexWrap: "wrap", gap: 5,
          justifyContent: "center",
          paddingTop: 12,
          borderTop: `1px solid rgba(14,34,64,0.08)`,
        }}>
          {chips.map(c => (
            <span key={c.label} style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.04em",
              padding: "4px 8px",
              borderRadius: 999,
              lineHeight: 1,
              background: c.bg,
              color: c.color,
            }}>
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Step Card
// ─────────────────────────────────────────────────────────────
function StepCard({ num, tag, title, line, children }: {
  num: string;
  tag: string;
  title: React.ReactNode;
  line: string;
  children: React.ReactNode;
}) {
  return (
    <article style={{
      background: B.warm,
      borderRadius: 24,
      padding: "36px 32px 32px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      border: `1px solid rgba(14,34,64,0.05)`,
      minHeight: 540,
      transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
    }}
      onMouseOver={e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 30px 60px -28px rgba(14,34,64,0.18)";
        e.currentTarget.style.borderColor = "rgba(36,167,224,0.3)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "rgba(14,34,64,0.05)";
      }}
    >
      <span style={{
        width: 56, height: 56, borderRadius: "50%",
        background: B.cream,
        border: `1.5px solid rgba(14,34,64,0.18)`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: SERIF, fontSize: 22, fontStyle: "italic",
        color: B.navy,
        marginBottom: 28,
        letterSpacing: "-0.01em",
      }}>
        {num}
      </span>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: B.blue,
        marginBottom: 12,
      }}>
        {tag}
      </div>
      <h3 style={{
        fontFamily: SERIF,
        fontWeight: 400,
        fontSize: 28,
        lineHeight: 1.15,
        color: B.navy,
        margin: "0 0 12px",
        letterSpacing: "-0.015em",
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: SANS,
        fontSize: 14.5,
        lineHeight: 1.55,
        color: B.body,
        margin: "0 0 36px",
        maxWidth: 280,
      }}>
        {line}
      </p>
      <div style={{
        flex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
        {children}
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────────────────────
export default function NewPatientVisit() {
  return (
    <section style={{
      background: B.cream,
      padding: "120px 48px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div style={{
          textAlign: "center",
          maxWidth: 820,
          margin: "0 auto 80px",
        }}>
          <div style={{
            fontFamily: SANS,
            fontSize: 13,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: B.blue,
            fontWeight: 600,
            marginBottom: 24,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
          }}>
            <span style={{ width: 32, height: 1, background: B.blue }} />
            The New Patient Visit, Reimagined
            <span style={{ width: 32, height: 1, background: B.blue }} />
          </div>
          <h2 style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(42px, 5.5vw, 76px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: B.navy,
            margin: 0,
          }}>
            Your care begins <em style={{ color: B.blue, fontStyle: "italic" }}>before you arrive</em>.
          </h2>
          <p style={{
            fontFamily: SANS,
            fontSize: 18,
            lineHeight: 1.6,
            color: B.body,
            margin: "28px auto 0",
            maxWidth: 620,
          }}>
            By the time you sit in the chair, we already know you. You already have your score, your roadmap,
            and the option to meet us virtually first.
          </p>
        </div>

        {/* 3 Steps with connector line */}
        <div style={{ position: "relative" }}>
          {/* Dashed connector line */}
          <div style={{
            position: "absolute",
            top: 40,
            left: "16.66%",
            right: "16.66%",
            height: 1,
            backgroundImage: "linear-gradient(to right, rgba(14,34,64,0.18) 50%, transparent 50%)",
            backgroundSize: "8px 1px",
            backgroundRepeat: "repeat-x",
            zIndex: 0,
          }} className="steps-connector" />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            position: "relative",
            zIndex: 1,
          }} className="steps-grid">
            <StepCard
              num="01"
              tag="Pre-assessment"
              title={<>Start your<br/>Primary Health Score.</>}
              line="6 minutes online. 50 questions across 5 dimensions of your health. Free."
            >
              <MockQuiz />
            </StepCard>

            <StepCard
              num="02"
              tag="New patient appointment"
              title={<>Book your<br/>way in.</>}
              line="Come in person, or start with a virtual second opinion from your couch."
            >
              <MockAppointment />
            </StepCard>

            <StepCard
              num="03"
              tag="Oral → Systemic Playbook"
              title={<>Unlock your<br/>Oral → Systemic Playbook.</>}
              line="One unified, doctor-built playbook — your personalized path to optimal wellbeing, delivered before your first visit."
            >
              <MockPlaybook />
            </StepCard>
          </div>
        </div>

        {/* Pre-visit value strip */}
        <div style={{
          marginTop: 80,
          padding: "28px 36px",
          background: "rgba(255,255,255,0.5)",
          border: `1px solid rgba(14,34,64,0.08)`,
          borderRadius: 16,
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 28,
          alignItems: "center",
        }} className="precare-strip">
          <div style={{
            width: 56, height: 56,
            borderRadius: "50%",
            background: "rgba(36,167,224,0.12)",
            color: B.blue,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8v4"/><path d="M12 16h.01"/><circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <div style={{
            fontFamily: SERIF,
            fontSize: 19,
            lineHeight: 1.4,
            color: B.navy,
            fontStyle: "italic",
          }}>
            <strong style={{ fontStyle: "normal", fontWeight: 400 }}>You get value before you sit in the chair.</strong>{" "}
            <em style={{ color: B.blue, fontWeight: 500 }}>Your score, your Oral → Systemic playbook, and a virtual second opinion — all free, all yours, before any commitment.</em>
          </div>
          <a href="/about/" style={{
            background: "transparent", color: B.navy,
            border: `1px solid rgba(14,34,64,0.18)`,
            padding: "12px 20px", borderRadius: 9,
            textDecoration: "none", fontSize: 14, fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: 8,
            whiteSpace: "nowrap",
            transition: "border-color .2s ease, background .2s ease",
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = B.navy; e.currentTarget.style.background = "rgba(14,34,64,0.04)"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(14,34,64,0.18)"; e.currentTarget.style.background = "transparent"; }}
          >
            How we&apos;re different →
          </a>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 64, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", gap: 20, alignItems: "center",
            flexWrap: "wrap", justifyContent: "center",
          }}>
            <a href="/diagnostics/" style={{
              background: B.navy, color: B.warm,
              padding: "18px 32px", borderRadius: 9,
              textDecoration: "none", fontWeight: 600, fontSize: 15,
              transition: "background .15s ease",
              boxShadow: "0 20px 40px -20px rgba(14,34,64,0.4)",
            }}
              onMouseOver={e => e.currentTarget.style.background = "#1a3259"}
              onMouseOut={e => e.currentTarget.style.background = B.navy}
            >
              Start my Primary Health Score →
            </a>
            <a href="#book" style={{
              color: B.navy, textDecoration: "none",
              fontWeight: 500, fontSize: 15,
              display: "inline-flex", alignItems: "center", gap: 8,
              borderBottom: `1px solid rgba(14,34,64,0.2)`, paddingBottom: 4,
              transition: "color .15s ease, border-color .15s ease",
            }}
              onMouseOver={e => { e.currentTarget.style.color = B.blue; e.currentTarget.style.borderBottomColor = B.blue; }}
              onMouseOut={e => { e.currentTarget.style.color = B.navy; e.currentTarget.style.borderBottomColor = "rgba(14,34,64,0.2)"; }}
            >
              Or book a visit now
            </a>
          </div>
          <div style={{
            fontSize: 13, letterSpacing: "0.02em", color: B.muted,
            marginTop: 16,
          }}>
            No pressure. No spam. Just clarity.
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .steps-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .steps-connector { display: none !important; }
          .precare-strip { grid-template-columns: 1fr !important; gap: 16px !important; text-align: center !important; }
          .precare-strip > div:first-child { margin: 0 auto !important; }
        }
        @media (max-width: 620px) {
          section { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
