"use client"

// Mobile-only sticky tap-to-call + book bar.
// Renders below 720px viewport. Visible after the user scrolls past the
// hero. Eliminates the "I want to call but the phone is buried" pattern
// the audit flagged on the WordPress site.

import { useEffect, useState } from "react"

const NAVY = "#0E2240"
const CREAM = "#FAF8F5"
const SANS = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"

export default function MobileStickyCTA() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 480)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div
        className="msc-bar"
        style={{
          position: "fixed",
          left: 12,
          right: 12,
          bottom: shown ? 12 : -100,
          background: NAVY,
          color: CREAM,
          borderRadius: 14,
          padding: "10px 14px",
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          boxShadow: "0 16px 40px -12px rgba(0,0,0,0.45)",
          zIndex: 199,
          transition: "bottom 0.35s cubic-bezier(0.23,1,0.32,1)",
          fontFamily: SANS,
        }}
        aria-hidden={!shown}
      >
        <a
          href="tel:+13105648990"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: CREAM,
            textDecoration: "none",
            padding: "10px 14px",
            fontWeight: 600,
            fontSize: 14,
            flex: 1,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call
        </a>
        <a
          href="/book/"
          style={{
            background: CREAM,
            color: NAVY,
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Book a visit
        </a>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .msc-bar { display: flex !important; }
        }
      `}</style>
    </>
  )
}
