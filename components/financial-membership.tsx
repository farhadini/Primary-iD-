"use client";

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  accent: "#E8985E",
  gold: "#D4B584",
  rose: "#D97757",
  purple: "#7B68EE",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  white: "#FFFFFF",
  line: "rgba(14,34,64,0.08)",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// Check and X icons
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const XIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M3 3L7 7M7 3L3 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const INSURANCE_ITEMS = [
  { yes: true, text: "Cleanings and exams (usually 2x/year)" },
  { yes: true, text: "Basic fillings and extractions" },
  { yes: true, text: "A portion of crowns, bridges, and root canals" },
  { yes: false, text: "Airway & sleep screening" },
  { yes: false, text: "Whole-body risk scoring" },
  { yes: false, text: "Nutrition & longevity guidance" },
];

const MEMBERSHIP_ITEMS = [
  { yes: true, text: "Your full Primary iD,", bold: true, suffix: " updated every visit" },
  { yes: true, text: "Airway and sleep screening", bold: true, suffix: " (STOP-BANG baseline)" },
  { yes: true, text: "Nutrition & longevity coaching", bold: true, suffix: " (MEDAS + LE8)" },
  { yes: true, text: "Two cleanings + exams a year, included" },
  { yes: true, text: "Member pricing on restorative & cosmetic work" },
  { yes: true, text: "Priority scheduling: no claim forms, no surprises" },
];

const INSURERS = ["Delta Dental", "Aetna", "MetLife", "Cigna", "Guardian", "United Concordia", "& more"];

const SCORE_DOTS = [
  { label: "Oral", color: B.green },
  { label: "Sleep", color: B.blue },
  { label: "Nutrition", color: "#C7305A" },
  { label: "Genetics", color: B.purple },
  { label: "Longevity", color: B.navy },
];

export default function FinancialMembership() {
  return (
    <section
      style={{
        padding: "104px 32px 120px",
        background: B.cream,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradients */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(900px 500px at 0% 10%, rgba(36,167,224,0.08), transparent 60%),
            radial-gradient(900px 500px at 100% 90%, rgba(36,167,224,0.06), transparent 55%)
          `,
        }}
      />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div
          style={{
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: B.blue,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ width: 22, height: 1, background: B.blue }} />
          How it works financially
        </div>

        <h2
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(30px, 4vw, 46px)",
            lineHeight: 1.12,
            color: B.navy,
            margin: "16px 0 14px",
            letterSpacing: "-0.015em",
            maxWidth: 820,
          }}
        >
          Everyone deserves a smile that<br />
          supports their <em style={{ fontStyle: "italic", color: B.blue, fontWeight: 400 }}>whole self.</em>
        </h2>

        <p
          style={{
            fontFamily: SANS,
            fontSize: 17,
            lineHeight: 1.6,
            color: B.body,
            maxWidth: 640,
            margin: "0 0 56px",
          }}
        >
          Insurance covers teeth. It doesn&apos;t cover <em>wellbeing</em>:
          the airway, the inflammation, the longevity layer that makes a smile
          actually last. So we built a membership that does.
        </p>

        {/* Two cards side by side */}
        <div
          className="fin-contrast"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
            marginBottom: 28,
          }}
        >
          {/* Insurance card */}
          <article
            style={{
              background: B.warm,
              borderRadius: 22,
              border: `1px solid ${B.line}`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.32s cubic-bezier(.22,.61,.36,1), box-shadow 0.32s cubic-bezier(.22,.61,.36,1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 28px 52px -22px rgba(14,34,64,0.22)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                padding: "32px 32px 24px",
                position: "relative",
                overflow: "hidden",
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "linear-gradient(135deg, #F0F6FB 0%, #DCE8F3 100%)",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.3) 0%, transparent 55%)",
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#1a6f9c",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ width: 20, height: 1, background: "currentColor" }} />
                  If you have insurance
                </div>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: 34,
                    lineHeight: 1.1,
                    color: B.navy,
                    margin: "14px 0 10px",
                    letterSpacing: "-0.015em",
                  }}
                >
                  Great. We <em style={{ fontStyle: "italic", fontWeight: 400 }}>accept all PPO plans.</em>
                </h3>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: B.body,
                    margin: 0,
                    maxWidth: 420,
                  }}
                >
                  We accept all PPO plans and handle the paperwork
                  for you. You use your benefits exactly the way you expect to.
                </p>
              </div>
            </div>
            <div
              style={{
                padding: "22px 32px 28px",
                borderTop: `1px solid ${B.line}`,
                background: B.warm,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                flex: 1,
              }}
            >
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: B.muted,
                  marginBottom: 4,
                }}
              >
                What insurance typically covers
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {INSURANCE_ITEMS.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: SANS,
                      fontSize: 14.5,
                      lineHeight: 1.5,
                      color: B.body,
                      display: "grid",
                      gridTemplateColumns: "20px 1fr",
                      gap: 12,
                      alignItems: "start",
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 999,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                        background: item.yes ? "rgba(72,194,140,0.15)" : "rgba(138,138,154,0.15)",
                        color: item.yes ? "#2d8a5f" : B.muted,
                      }}
                    >
                      {item.yes ? <CheckIcon /> : <XIcon />}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Membership card */}
          <article
            style={{
              background: B.warm,
              borderRadius: 22,
              border: "1px solid rgba(36,167,224,0.35)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 20px 40px -22px rgba(36,167,224,0.4)",
              transition: "transform 0.32s cubic-bezier(.22,.61,.36,1), box-shadow 0.32s cubic-bezier(.22,.61,.36,1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 28px 52px -22px rgba(36,167,224,0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 20px 40px -22px rgba(36,167,224,0.4)";
            }}
          >
            {/* Badge */}
            <span
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: B.navy,
                color: B.warm,
                fontFamily: SANS,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "6px 12px",
                borderRadius: 999,
                zIndex: 2,
              }}
            >
              Built for you
            </span>

            <div
              style={{
                padding: "32px 32px 24px",
                position: "relative",
                overflow: "hidden",
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "linear-gradient(135deg, #EAF6FC 0%, #BFE4F5 100%)",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.3) 0%, transparent 55%)",
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#1a6f9c",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ width: 20, height: 1, background: "currentColor" }} />
                  The Primary iD Membership
                </div>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: 34,
                    lineHeight: 1.1,
                    color: B.navy,
                    margin: "14px 0 10px",
                    letterSpacing: "-0.015em",
                  }}
                >
                  A plan as <em style={{ fontStyle: "italic", fontWeight: 400, color: B.blue }}>individual</em> as your smile.
                </h3>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: B.body,
                    margin: 0,
                    maxWidth: 420,
                  }}
                >
                  Your five scores guide the plan. Dr. Gabi confirms what your
                  exam and imaging actually show, and your care follows those
                  findings, not a script. Works alongside your insurance, or on its own.
                </p>
              </div>
            </div>
            <div
              style={{
                padding: "22px 32px 28px",
                borderTop: `1px solid ${B.line}`,
                background: B.warm,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                flex: 1,
              }}
            >
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: B.muted,
                  marginBottom: 4,
                }}
              >
                What membership adds
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {MEMBERSHIP_ITEMS.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: SANS,
                      fontSize: 14.5,
                      lineHeight: 1.5,
                      color: B.body,
                      display: "grid",
                      gridTemplateColumns: "20px 1fr",
                      gap: 12,
                      alignItems: "start",
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 999,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                        background: "rgba(72,194,140,0.15)",
                        color: "#2d8a5f",
                      }}
                    >
                      <CheckIcon />
                    </span>
                    <span>
                      {item.bold ? <strong style={{ color: B.navy, fontWeight: 600 }}>{item.text}</strong> : item.text}
                      {item.suffix || ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>


        <p style={{ fontFamily: SANS, fontSize: 12.5, color: B.muted, marginBottom: 28, textAlign: "center" }}>
          PPO-friendly · Works alongside your insurance · No claim forms · Cancel any time
        </p>

        {/* Insurance strip */}
        <div
          style={{
            background: B.warm,
            border: `1px solid ${B.line}`,
            borderRadius: 16,
            padding: "18px 24px",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: B.muted,
            }}
          >
            PPO plans accepted, including
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
            {INSURERS.map((name, i) => (
              <span
                key={i}
                style={{
                  fontFamily: SANS,
                  fontSize: 13,
                  fontWeight: 500,
                  color: B.navy,
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: B.cream,
                  border: `1px solid ${B.line}`,
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Navy pathway / pricing */}
        <div
          className="fin-pathway"
          style={{
            background: `linear-gradient(135deg, ${B.navy} 0%, #142c54 100%)`,
            color: B.warm,
            borderRadius: 22,
            padding: "44px 48px",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 40,
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `
                radial-gradient(500px 300px at 85% 15%, rgba(36,167,224,0.18), transparent 65%),
                radial-gradient(400px 250px at 10% 90%, rgba(36,167,224,0.14), transparent 60%)
              `,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: B.blue,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <span style={{ width: 22, height: 1, background: B.blue }} />
              Build your plan
            </div>
            <h4
              style={{
                fontFamily: SERIF,
                fontSize: 32,
                lineHeight: 1.2,
                color: B.warm,
                margin: "0 0 14px",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              Take the Primary iD.<br />
              <em style={{ color: B.blue, fontStyle: "italic" }}>Get your plan.</em>
            </h4>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 15,
                lineHeight: 1.6,
                color: "rgba(254,252,249,0.82)",
                margin: "0 0 8px",
                maxWidth: 520,
              }}
            >
              Your membership is built around your five scores, so you
              only pay for the support you actually need. Takes about ten
              minutes. No card required to see your plan.
            </p>
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 16,
                padding: "20px 24px",
                width: "100%",
                backdropFilter: "blur(6px)",
              }}
            >
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: B.blue,
                  marginBottom: 14,
                }}
              >
                Your plan is built from
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                {SCORE_DOTS.map((dot, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: SANS,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      padding: "7px 12px 7px 22px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      color: B.warm,
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 9,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: dot.color,
                        boxShadow: "0 0 0 2px rgba(255,255,255,0.1)",
                      }}
                    />
                    {dot.label}
                  </span>
                ))}
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: "rgba(254,252,249,0.7)",
                  marginTop: 14,
                }}
              >
                Priced to your Primary iD. No deductibles, no claim forms,
                cancel any time.
              </div>
            </div>
            <a
              href="/diagnostics/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: B.warm,
                color: B.navy,
                padding: "14px 26px",
                borderRadius: 999,
                fontFamily: SANS,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 10px 24px -8px rgba(0,0,0,0.3)",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Build my plan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            {/* Join Primary iD Membership: external Subscribili funnel. TODO(farhad): confirm subdomain with Subscribili rep */}
            <a
              href="https://primaryid.subscribili.com"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "transparent",
                color: "#FEFCF9",
                padding: "14px 26px",
                borderRadius: 999,
                fontFamily: SANS,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(254,252,249,0.4)",
                marginLeft: 12,
                transition: "background 0.2s ease",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(254,252,249,0.08)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              Join the membership
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
                <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Trust row */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 28,
            flexWrap: "wrap",
            justifyContent: "center",
            fontFamily: SANS,
            fontSize: 12.5,
            color: B.muted,
          }}
        >
          {["No enrollment fees", "Cancel any time", "Works with or without insurance"].map((text, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: B.green, opacity: 0.8 }} />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 980px) {
          .fin-contrast { grid-template-columns: 1fr !important; }
          .fin-pathway { grid-template-columns: 1fr !important; padding: 36px 32px !important; }
          .fin-pricing { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 620px) {
          .fin-pathway { padding: 28px 24px !important; }
        }
      `}</style>
    </section>
  );
}
