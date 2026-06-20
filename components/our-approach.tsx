"use client";

// ---------------------------------------------------------------------------
// Section 6: Our Approach, outcomes-first grid
// ---------------------------------------------------------------------------

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
  rose: "#D97757",
  line: "rgba(14,34,64,0.08)",
};

const SERIF = 'Georgia, "Times New Roman", serif';
const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

// Outcome cards data
const OUTCOMES = [
  {
    id: "whiter",
    title: "Whiter",
    highlight: "teeth",
    highlightColor: B.gold,
    topGradient: "linear-gradient(135deg, #FFFCF3 0%, #F4E9D0 100%)",
    chipBg: "#F8F2E5",
    chipColor: "#8a6f2e",
    kickerColor: "#8a6f2e",
    rootCopy: (
      <>
        Stains return when the <strong>oral pH</strong> and <strong>microbiome</strong> are off. We score both, rebalance them, and choose non-abrasive care so white <em>stays</em> white.
      </>
    ),
    chip: "CAMBRA · Oral",
    link: "/diagnostics",
    linkText: "Start Oral",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}>
        <defs>
          <linearGradient id="w-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#E8D79C" />
          </linearGradient>
        </defs>
        <path d="M20 6 C13 6 10 10 10 16 C10 22 12 27 14 32 C15 35 17 36 19 34 L19 26 C19 24 21 24 21 26 L21 34 C23 36 25 35 26 32 C28 27 30 22 30 16 C30 10 27 6 20 6 Z" fill="url(#w-grad)" stroke="#D4B584" strokeWidth="1" />
        <path d="M15 12 Q17 10 20 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: "straight",
    title: "Straighter",
    highlight: "teeth",
    highlightColor: B.blue,
    topGradient: "linear-gradient(135deg, #F3F9FE 0%, #D6ECF9 100%)",
    chipBg: "#E6F4FC",
    chipColor: "#1a6f9c",
    kickerColor: "#1a6f9c",
    rootCopy: (
      <>
        Crooked teeth usually trace back to <strong>airway and tongue posture</strong> in childhood. Aligning the arch without addressing the airway sets you up to relapse, or to snore harder.
      </>
    ),
    chip: "STOP-BANG · Sleep",
    link: "/diagnostics",
    linkText: "Start Sleep",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}>
        <defs>
          <linearGradient id="s-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#BFE4F7" />
            <stop offset="1" stopColor="#24A7E0" />
          </linearGradient>
        </defs>
        <path d="M8 22 Q20 10 32 22 Q20 30 8 22 Z" fill="url(#s-grad)" stroke="#24A7E0" strokeWidth="1" strokeOpacity="0.6" />
        <path d="M12 22 Q20 16 28 22" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <circle cx="14" cy="22" r="1.2" fill="#fff" />
        <circle cx="20" cy="20" r="1.2" fill="#fff" />
        <circle cx="26" cy="22" r="1.2" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "fresh",
    title: "Fresh",
    highlight: "breath",
    highlightColor: B.green,
    topGradient: "linear-gradient(135deg, #F2FAF5 0%, #D4EEDE 100%)",
    chipBg: "#E8F7EF",
    chipColor: "#2d8a5f",
    kickerColor: "#2d8a5f",
    rootCopy: (
      <>
        Chronic bad breath is almost never a brushing problem. It&apos;s a <strong>gut-and-oral-microbiome</strong> problem, upstream of what any rinse can solve.
      </>
    ),
    chip: "MEDAS · Nutrition",
    link: "/diagnostics",
    linkText: "Start Nutrition",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}>
        <defs>
          <linearGradient id="f-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#A8DCBE" />
            <stop offset="1" stopColor="#48C28C" />
          </linearGradient>
        </defs>
        <path d="M20 8 Q30 10 30 20 Q30 30 20 32 Q10 30 10 20 Q10 10 20 8 Z" fill="url(#f-grad)" />
        <path d="M20 10 L20 30" stroke="#2d8a5f" strokeWidth="1" opacity="0.55" />
        <path d="M20 14 Q16 15 14 18" stroke="#2d8a5f" strokeWidth="1" fill="none" opacity="0.55" />
        <path d="M20 18 Q24 19 26 22" stroke="#2d8a5f" strokeWidth="1" fill="none" opacity="0.55" />
        <path d="M20 22 Q16 23 14 26" stroke="#2d8a5f" strokeWidth="1" fill="none" opacity="0.55" />
      </svg>
    ),
  },
  {
    id: "gums",
    title: "Healthy",
    highlight: "gums",
    highlightColor: B.rose,
    topGradient: "linear-gradient(135deg, #FDF4EE 0%, #F6D9C5 100%)",
    chipBg: "#FBEBE2",
    chipColor: "#9e4628",
    kickerColor: "#9e4628",
    rootCopy: (
      <>
        Bleeding gums are a <strong>systemic inflammation</strong> signal: the same inflammation that drives heart disease and diabetes. Treating gums without treating that signal is treating smoke, not fire.
      </>
    ),
    chip: "AAP/EFP · Family",
    link: "/diagnostics",
    linkText: "Start Family",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}>
        <defs>
          <linearGradient id="g-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F5C4A8" />
            <stop offset="1" stopColor="#D97757" />
          </linearGradient>
        </defs>
        <path d="M20 34 C12 30 8 22 8 16 C8 11 12 8 16 8 C18 8 20 10 20 12 C20 10 22 8 24 8 C28 8 32 11 32 16 C32 22 28 30 20 34 Z" fill="url(#g-grad)" />
        <path d="M14 16 L18 20 L26 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "sleep",
    title: "Restful",
    highlight: "sleep",
    highlightColor: B.purple,
    topGradient: "linear-gradient(135deg, #F6F5FE 0%, #DDD6F7 100%)",
    chipBg: "#EFECFC",
    chipColor: "#4f3fb0",
    kickerColor: "#4f3fb0",
    rootCopy: (
      <>
        Snoring and grinding aren&apos;t sleep habits. They&apos;re <strong>airway compensation</strong>. Your mouth is doing at night what it has to do to breathe. We measure the airway first.
      </>
    ),
    chip: "STOP-BANG · Sleep",
    link: "/diagnostics",
    linkText: "Start Sleep",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}>
        <defs>
          <linearGradient id="sl-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#BFB4F5" />
            <stop offset="1" stopColor="#7B68EE" />
          </linearGradient>
        </defs>
        <path d="M26 8 C18 10 12 16 12 24 C12 30 16 34 22 34 C28 34 32 30 33 25 C29 27 24 26 21 22 C18 18 19 12 26 8 Z" fill="url(#sl-grad)" />
        <circle cx="30" cy="14" r="1.2" fill="#fff" opacity="0.8" />
        <circle cx="34" cy="20" r="0.8" fill="#fff" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "longer",
    title: "A longer",
    highlight: "life",
    highlightColor: B.navy,
    topGradient: "linear-gradient(135deg, #F0F6FB 0%, #CFDBE9 100%)",
    chipBg: "rgba(14,34,64,0.08)",
    chipColor: B.navy,
    kickerColor: B.navy,
    rootCopy: (
      <>
        Oral inflammation shortens lifespan by the same pathways as smoking and diabetes. Scoring your <strong>cardiovascular &amp; metabolic markers</strong> alongside your mouth is how we add years, not just fillings.
      </>
    ),
    chip: "Life's Essential 8 · Longevity",
    link: "/diagnostics",
    linkText: "Start Longevity",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36 }}>
        <defs>
          <linearGradient id="l-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#8FA8C4" />
            <stop offset="1" stopColor="#0E2240" />
          </linearGradient>
        </defs>
        <path d="M8 26 L14 20 L19 25 L26 12 L32 18" stroke="url(#l-grad)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="18" r="3" fill="#0E2240" />
        <circle cx="32" cy="18" r="1.5" fill="#fff" />
        <path d="M7 31 L33 31" stroke="#0E2240" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
      </svg>
    ),
  },
];

function OutcomeCard({ outcome }: { outcome: typeof OUTCOMES[number] }) {
  return (
    <article
      style={{
        background: B.warm,
        borderRadius: 22,
        border: `1px solid ${B.line}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.32s cubic-bezier(.22,.61,.36,1), box-shadow 0.32s cubic-bezier(.22,.61,.36,1)",
        position: "relative",
        cursor: "pointer",
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
      {/* Card top */}
      <div
        style={{
          padding: "30px 28px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 72px",
          alignItems: "center",
          gap: 16,
          minHeight: 160,
          position: "relative",
          overflow: "hidden",
          background: outcome.topGradient,
        }}
      >
        {/* Gloss overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, transparent 55%)",
          }}
        />
        <h3
          style={{
            fontFamily: SERIF,
            fontSize: 30,
            lineHeight: 1.12,
            color: B.navy,
            margin: 0,
            letterSpacing: "-0.01em",
            position: "relative",
            zIndex: 1,
          }}
        >
          {outcome.title}{" "}
          <span style={{ fontWeight: 400, fontStyle: "italic", color: outcome.highlightColor }}>
            {outcome.highlight}
          </span>
        </h3>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.75)",
            boxShadow: "0 12px 22px -10px rgba(14,34,64,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {outcome.icon}
        </div>
      </div>

      {/* Card body */}
      <div
        style={{
          padding: "22px 28px 26px",
          borderTop: `1px solid ${B.line}`,
          background: B.warm,
          display: "flex",
          flexDirection: "column",
          gap: 12,
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
            color: outcome.kickerColor,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "currentColor",
              opacity: 0.55,
            }}
          />
          The root we address
        </div>
        <p
          style={{
            fontFamily: SANS,
            fontSize: 14.5,
            lineHeight: 1.55,
            color: B.body,
            margin: 0,
          }}
        >
          {outcome.rootCopy}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 10,
            marginTop: "auto",
            borderTop: "1px dashed rgba(14,34,64,0.08)",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.04em",
              padding: "6px 10px",
              borderRadius: 999,
              background: outcome.chipBg,
              color: outcome.chipColor,
            }}
          >
            {outcome.chip}
          </span>
          <a
            href={outcome.link}
            style={{
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 600,
              color: B.navy,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 2px",
              transition: "gap 0.2s ease, color 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.gap = "10px";
              e.currentTarget.style.color = B.blue;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.gap = "6px";
              e.currentTarget.style.color = B.navy;
            }}
          >
            {outcome.linkText} <span>→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function OurApproach() {
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
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(900px 500px at 95% 5%, rgba(36,167,224,0.06), transparent 60%), radial-gradient(800px 400px at -5% 95%, rgba(72,194,140,0.05), transparent 55%)",
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
          Our approach
        </div>

        <h2
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(32px, 4.5vw, 46px)",
            lineHeight: 1.12,
            color: B.navy,
            margin: "16px 0 14px",
            letterSpacing: "-0.015em",
            maxWidth: 820,
          }}
        >
          Start with the outcome you want.
          <br />
          We&apos;ll fix what&apos;s <em style={{ fontStyle: "italic", color: B.blue }}>underneath it.</em>
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
          Every patient walks in with a goal: whiter, straighter, pain-free, a better night&apos;s sleep, a longer life. Every goal has a root cause most dentists never check. Here&apos;s how we think about it, one outcome at a time.
        </p>

        {/* Outcome grid */}
        <div
          className="approach-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 22,
          }}
        >
          {OUTCOMES.map((o) => (
            <OutcomeCard key={o.id} outcome={o} />
          ))}
        </div>

        {/* Featured restorative card */}
        <article
          className="feature-card"
          style={{
            marginTop: 22,
            background: B.warm,
            borderRadius: 22,
            border: `1px solid ${B.line}`,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            alignItems: "stretch",
            transition: "transform 0.32s cubic-bezier(.22,.61,.36,1), box-shadow 0.32s cubic-bezier(.22,.61,.36,1)",
            position: "relative",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 32px 56px -22px rgba(14,34,64,0.22)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #FDF2E5 0%, #F3C99E 100%)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 36,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "linear-gradient(145deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
              }}
            />
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: 40,
                background: "rgba(255,255,255,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 36px -14px rgba(14,34,64,0.28), inset 0 1px 0 rgba(255,255,255,0.9)",
                position: "relative",
                zIndex: 1,
              }}
            >
              <svg viewBox="0 0 80 80" fill="none" style={{ width: 70, height: 70 }}>
                <defs>
                  <linearGradient id="ns-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#FDE2C7" />
                    <stop offset="1" stopColor="#E8985E" />
                  </linearGradient>
                </defs>
                <path d="M18 38 Q40 62 62 38" stroke="url(#ns-grad)" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M24 24 L26 20 L28 24 L32 26 L28 28 L26 32 L24 28 L20 26 Z" fill="#E8985E" opacity="0.85" />
                <path d="M58 18 L59.2 15.5 L60.4 18 L63 19.2 L60.4 20.4 L59.2 23 L58 20.4 L55.4 19.2 Z" fill="#D4B584" opacity="0.75" />
                <path d="M40 44 C36 44 34 47 34 51 C34 55 35.5 58.5 37 61 C38 62.5 39 62.5 39.5 61 L39.5 56.5 C39.5 55.5 40.5 55.5 40.5 56.5 L40.5 61 C41 62.5 42 62.5 43 61 C44.5 58.5 46 55 46 51 C46 47 44 44 40 44 Z" fill="#fff" stroke="#E8985E" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <div
            style={{
              padding: "36px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: SANS,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#9e4628",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ width: 22, height: 1, background: "#9e4628" }} />
              When prevention isn&apos;t enough
            </span>
            <h3
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(28px, 3.5vw, 38px)",
                lineHeight: 1.1,
                color: B.navy,
                margin: 0,
                letterSpacing: "-0.015em",
              }}
            >
              A <em style={{ fontStyle: "italic", fontWeight: 400, color: B.accent }}>new</em> smile.
            </h3>
            <p
              style={{
                fontFamily: SANS,
                fontSize: 15,
                lineHeight: 1.6,
                color: B.body,
                margin: 0,
                maxWidth: 560,
              }}
            >
              Tooth loss isn&apos;t a cosmetic problem. It&apos;s the downstream result of <strong style={{ color: B.navy, fontWeight: 600 }}>caries, periodontal (gum) disease, or airway damage</strong> that went unaddressed. Before we rebuild, whether implants, full-arch, or dentures, we find what caused the loss, so the replacement lasts the rest of your life, not just the warranty.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
                paddingTop: 10,
              }}
            >
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: "#FCF0E4",
                  color: "#9e4628",
                }}
              >
                CAMBRA + AAP/EFP
              </span>
              <a
                href="/diagnostics/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 22px",
                  borderRadius: 999,
                  background: B.navy,
                  color: B.warm,
                  fontFamily: SANS,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "transform 0.2s ease, gap 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.gap = "12px";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.gap = "8px";
                }}
              >
                Start with Oral <span>→</span>
              </a>
            </div>
          </div>
        </article>

        {/* Footer strip */}
        <div
          style={{
            marginTop: 52,
            background: "linear-gradient(135deg, #0E2240 0%, #142c54 100%)",
            color: B.warm,
            borderRadius: 22,
            padding: "32px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <h4
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.3,
              color: B.warm,
              margin: 0,
              maxWidth: 640,
              fontWeight: 400,
            }}
          >
            You came in for a whiter smile.
            <br />
            You&apos;ll leave with a <em style={{ color: B.blue, fontStyle: "italic" }}>whole-body plan</em> that happens to start there.
          </h4>
          <a
            href="/diagnostics/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: B.warm,
              color: B.navy,
              padding: "14px 22px",
              borderRadius: 999,
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 10px 24px -8px rgba(0,0,0,0.3)",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get my Primary iD <span>→</span>
          </a>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 980px) {
          .approach-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .feature-card { grid-template-columns: 220px 1fr !important; }
        }
        @media (max-width: 620px) {
          .approach-grid { grid-template-columns: 1fr !important; }
          .feature-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
