"use client";

// ============================================================
// PRIMARY: Shared site navigation
// Sticky variant of the homepage nav. Takes its own 64px of
// layout space on every page (no fixed-position overlap).
// ============================================================

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  white: "#FFFFFF",
  body: "#4A4A5A",
  border: "rgba(14,34,64,0.07)",
};

const NAV_LINKS = [
  { label: "Why Primary", href: "/why-primary/" },
  { label: "Five Dimensions", href: "/five-dimensions/" },
  { label: "The Science", href: "/oral-systemic/" },
  { label: "Dr. Gabi", href: "/about/" },
  { label: "New Patients", href: "/new-patient/" },
  { label: "Journal", href: "/blogs/" },
];

export function SiteNav() {
  return (
    <>
      <style>{`
        @media (min-width: 760px) {
          .nav-phone { display: inline-flex !important; }
        }
      `}</style>
      <nav style={{
        position: "sticky", top: 0, zIndex: 200,
        background: "rgba(250,248,245,0.96)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(14,34,64,0.07)",
        padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="/" style={{ display: "inline-flex", alignItems: "center" }}>
              <img
                src="/images/primary-brand-logo.png"
                alt="Primary"
                style={{ height: 64, width: "auto" }}
              />
            </a>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {NAV_LINKS.map(item => (
              <a key={item.label} href={item.href} style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, textDecoration: "none", opacity: 0.7, transition: "opacity 0.2s" }}
                onMouseOver={e => (e.target as HTMLElement).style.opacity = "1"}
                onMouseOut={e => (e.target as HTMLElement).style.opacity = "0.7"}
              >{item.label}</a>
            ))}
          </div>

          {/* Phone + CTA */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <a
              href="tel:+13105648990"
              style={{
                display: "none",
                color: B.navy, textDecoration: "none",
                fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 500,
                marginRight: 18, alignItems: "center", gap: 6,
                opacity: 0.85,
              }}
              className="nav-phone"
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              (310) 564-8990
            </a>
            <a href="/book/" style={{
              background: B.navy, color: B.white, textDecoration: "none",
              borderRadius: 8, padding: "9px 20px",
              fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 400,
              letterSpacing: "0.01em",
              boxShadow: "0 2px 12px rgba(14,34,64,0.18)",
              transition: "all 0.2s ease",
              display: "inline-block",
            }}
              onMouseOver={e => { e.currentTarget.style.background = "#1a3a5c"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(14,34,64,0.28)"; }}
              onMouseOut={e => { e.currentTarget.style.background = B.navy; e.currentTarget.style.boxShadow = "0 2px 12px rgba(14,34,64,0.18)"; }}
            >
              Book a visit
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
