"use client";

// ============================================================
// PRIMARY: Shared site navigation
// Sticky nav. Desktop: inline links. Mobile (<760px): hamburger
// that opens a full-width slide-down menu. Takes its own 64px of
// layout space on every page (no fixed-position overlap).
// ============================================================

import { useState, useEffect } from "react";

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  white: "#FFFFFF",
  cream: "#FAF8F5",
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
  const [open, setOpen] = useState(false);

  // Lock body scroll when the mobile menu is open; always release on unmount.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style>{`
        /* Desktop links + phone show at >=760px; hamburger hides. */
        .nav-desktop { display: none; }
        .nav-burger  { display: inline-flex; }
        @media (min-width: 760px) {
          .nav-desktop { display: flex; }
          .nav-phone   { display: inline-flex !important; }
          .nav-burger  { display: none; }
          .nav-mobile-panel { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: "sticky", top: 0, zIndex: 200,
        background: "rgba(250,248,245,0.96)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${B.border}`,
        padding: "0 20px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo wordmark */}
          <a href="/" style={{ display: "inline-flex", alignItems: "center" }} aria-label="Primary home">
            <img src="/images/primary-brand-logo.png" alt="Primary" style={{ height: 56, width: "auto" }} />
          </a>

          {/* Desktop nav links */}
          <div className="nav-desktop" style={{ alignItems: "center", gap: 22 }}>
            {NAV_LINKS.map(item => (
              <a key={item.label} href={item.href} style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, textDecoration: "none", opacity: 0.7, transition: "opacity 0.2s" }}
                onMouseOver={e => (e.target as HTMLElement).style.opacity = "1"}
                onMouseOut={e => (e.target as HTMLElement).style.opacity = "0.7"}
              >{item.label}</a>
            ))}
          </div>

          {/* Right cluster: phone (desktop) + Book CTA + hamburger (mobile) */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="tel:+13105648990"
              className="nav-phone"
              style={{
                display: "none",
                color: B.navy, textDecoration: "none",
                fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 500,
                alignItems: "center", gap: 6, opacity: 0.85,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              (310) 564-8990
            </a>

            <a href="/book/" style={{
              background: B.navy, color: B.white, textDecoration: "none",
              borderRadius: 8, padding: "9px 18px",
              fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 400,
              letterSpacing: "0.01em",
              boxShadow: "0 2px 12px rgba(14,34,64,0.18)",
              transition: "all 0.2s ease", whiteSpace: "nowrap",
              display: "inline-block",
            }}
              onMouseOver={e => { e.currentTarget.style.background = "#1a3a5c"; }}
              onMouseOut={e => { e.currentTarget.style.background = B.navy; }}
            >
              Book a visit
            </a>

            {/* Hamburger (mobile only) */}
            <button
              className="nav-burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
              style={{
                alignItems: "center", justifyContent: "center",
                width: 40, height: 40, padding: 0,
                background: "transparent", border: "none", cursor: "pointer",
                color: B.navy,
              }}
            >
              {open ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile slide-down panel */}
        {open && (
          <div
            className="nav-mobile-panel"
            style={{
              position: "absolute", left: 0, right: 0, top: 64,
              background: B.cream,
              borderBottom: `1px solid ${B.border}`,
              boxShadow: "0 18px 40px -18px rgba(14,34,64,0.35)",
              padding: "8px 20px 20px",
            }}
          >
            {NAV_LINKS.map(item => (
              <a key={item.label} href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block", fontFamily: "Georgia,serif", fontSize: 17,
                  color: B.navy, textDecoration: "none",
                  padding: "14px 4px", borderBottom: `1px solid ${B.border}`,
                }}
              >{item.label}</a>
            ))}
            <a href="tel:+13105648990"
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 500,
                color: B.blue, textDecoration: "none", padding: "16px 4px 4px",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              (310) 564-8990
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
