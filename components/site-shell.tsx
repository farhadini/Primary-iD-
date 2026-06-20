/**
 * Lightweight site shell for legacy/long-form SEO pages.
 * Keeps the nav, footer, and color tokens consistent without pulling in the
 * heavy interactive homepage components.
 *
 * For routes that need richer interactivity, the existing page.tsx pattern
 * (with its own client-component nav) is the right choice. SiteShell is for
 * content pages.
 */

import Link from "next/link"
import type React from "react"

export const PALETTE = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  cream: "#FAF8F5",
  warmWhite: "#FEFCF9",
  white: "#FFFFFF",
  lightBlue: "#E8F6FC",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  border: "rgba(14,34,64,0.07)",
  accent: "#E8985E",
} as const

const SERIF = "Georgia,serif"
const SANS = "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif"

export function SiteHeader() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(250,248,245,0.96)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${PALETTE.border}`,
        padding: "0 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: PALETTE.navy,
            fontFamily: SERIF,
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          Primary
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[
            { label: "Why Primary", href: "/why-primary/" },
            { label: "Five Dimensions", href: "/five-dimensions/" },
            { label: "The Science", href: "/oral-systemic/" },
            { label: "Dr. Gabi", href: "/about/" },
            { label: "New Patients", href: "/new-patient/" },
            { label: "Journal", href: "/blogs/" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: SERIF,
                fontSize: 13,
                color: PALETTE.body,
                textDecoration: "none",
                opacity: 0.75,
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="tel:+13105648990"
            style={{
              fontFamily: SERIF,
              fontSize: 13,
              color: PALETTE.navy,
              textDecoration: "none",
              opacity: 0.85,
            }}
          >
            (310) 564-8990
          </a>
          <Link
            href="/book/"
            style={{
              background: PALETTE.navy,
              color: PALETTE.white,
              textDecoration: "none",
              borderRadius: 8,
              padding: "9px 20px",
              fontFamily: SERIF,
              fontSize: 13,
            }}
          >
            Book a visit
          </Link>
        </div>
      </div>
    </nav>
  )
}

export function SiteFooter() {
  return (
    <footer
      style={{
        background: PALETTE.navy,
        color: "rgba(254,252,249,0.85)",
        padding: "60px 32px 40px",
        fontFamily: SANS,
        fontSize: 14,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 40,
        }}
      >
        <div>
          <div style={{ fontFamily: SERIF, fontSize: 18, marginBottom: 12, color: "#FEFCF9" }}>
            Primary
          </div>
          <p style={{ lineHeight: 1.6, opacity: 0.75 }}>
            Integrative dentistry in Los Angeles. Whole-body care led by Dr. Tzur Gabi.
          </p>
        </div>
        <div>
          <div style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: "0.14em", marginBottom: 12, opacity: 0.6 }}>
            Care
          </div>
          {[
            ["Dental implants", "/dental-implant/"],
            ["Cosmetic dentistry", "/cosmetic-dentistry/"],
            ["Safe mercury removal", "/safe-mercury-removal/"],
            ["Wholistic dentistry", "/wholistic-dentistry/"],
            ["Second opinion", "/second-opinion/"],
          ].map(([t, h]) => (
            <Link key={h} href={h} style={{ display: "block", color: "inherit", textDecoration: "none", lineHeight: 2, opacity: 0.75 }}>
              {t}
            </Link>
          ))}
        </div>
        <div>
          <div style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: "0.14em", marginBottom: 12, opacity: 0.6 }}>
            About
          </div>
          {[
            ["Why Primary", "/why-primary/"],
            ["Five Dimensions", "/five-dimensions/"],
            ["The Science", "/oral-systemic/"],
            ["Dr. Gabi", "/about/"],
            ["Second Opinion", "/second-opinion/"],
            ["Primary Journal", "/blogs/"],
          ].map(([t, h]) => (
            <Link key={h} href={h} style={{ display: "block", color: "inherit", textDecoration: "none", lineHeight: 2, opacity: 0.75 }}>
              {t}
            </Link>
          ))}
        </div>
        <div>
          <div style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: "0.14em", marginBottom: 12, opacity: 0.6 }}>
            Visit
          </div>
          <a href="tel:+13105648990" style={{ display: "block", color: "inherit", textDecoration: "none", lineHeight: 2, opacity: 0.75 }}>
            (310) 564-8990
          </a>
          <Link href="/new-patient/" style={{ display: "block", color: "inherit", textDecoration: "none", lineHeight: 2, opacity: 0.75 }}>
            New patients
          </Link>
          <Link href="/faq/" style={{ display: "block", color: "inherit", textDecoration: "none", lineHeight: 2, opacity: 0.75 }}>
            FAQ
          </Link>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto 0",
          paddingTop: 24,
          borderTop: "1px solid rgba(254,252,249,0.12)",
          fontSize: 12,
          opacity: 0.5,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>© {new Date().getFullYear()} Primary Integrative Dentistry. All rights reserved.</span>
        <span>Los Angeles</span>
      </div>
    </footer>
  )
}

export function ArticleContainer({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        background: PALETTE.cream,
        color: PALETTE.body,
        fontFamily: SANS,
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <article
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "80px 28px",
          fontSize: 17,
          lineHeight: 1.75,
        }}
      >
        {children}
      </article>
    </main>
  )
}

export function Hero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <header
      style={{
        textAlign: "left",
        marginBottom: 56,
        paddingBottom: 32,
        borderBottom: `1px solid ${PALETTE.border}`,
      }}
    >
      {eyebrow && (
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: 12,
            color: PALETTE.blue,
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h1
        style={{
          fontFamily: SERIF,
          fontSize: "clamp(34px, 5vw, 52px)",
          fontWeight: 400,
          color: PALETTE.navy,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          margin: "0 0 20px",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: 19, lineHeight: 1.55, color: PALETTE.body, margin: 0, maxWidth: 640 }}>
          {subtitle}
        </p>
      )}
    </header>
  )
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: SERIF,
        fontSize: 28,
        fontWeight: 500,
        color: PALETTE.navy,
        lineHeight: 1.2,
        margin: "48px 0 18px",
      }}
    >
      {children}
    </h2>
  )
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: SERIF,
        fontSize: 21,
        fontWeight: 500,
        color: PALETTE.navy,
        margin: "32px 0 12px",
      }}
    >
      {children}
    </h3>
  )
}

export function CTAGroup({
  primary,
  secondary,
}: {
  primary: { label: string; href: string; external?: boolean }
  secondary?: { label: string; href: string; external?: boolean }
}) {
  const primaryProps = primary.external
    ? { target: "_blank", rel: "noopener" }
    : {}
  const secondaryProps = secondary?.external
    ? { target: "_blank", rel: "noopener" }
    : {}
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        marginTop: 36,
        marginBottom: 24,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <a
        href={primary.href}
        {...primaryProps}
        style={{
          background: PALETTE.navy,
          color: PALETTE.white,
          padding: "14px 28px",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {primary.label}
      </a>
      {secondary && (
        <a
          href={secondary.href}
          {...secondaryProps}
          style={{
            color: PALETTE.navy,
            textDecoration: "underline",
            textDecorationColor: "rgba(14,34,64,0.3)",
            textUnderlineOffset: 4,
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          {secondary.label}
        </a>
      )}
    </div>
  )
}

export function FAQ({
  items,
}: {
  items: Array<{ q: string; a: string }>
}) {
  return (
    <div style={{ marginTop: 36 }}>
      {items.map(({ q, a }, i) => (
        <details
          key={i}
          style={{
            borderTop: `1px solid ${PALETTE.border}`,
            padding: "20px 0",
          }}
        >
          <summary
            style={{
              fontFamily: SERIF,
              fontSize: 18,
              color: PALETTE.navy,
              cursor: "pointer",
              listStyle: "none",
              fontWeight: 500,
            }}
          >
            {q}
          </summary>
          <p style={{ marginTop: 12, color: PALETTE.body, lineHeight: 1.7 }}>{a}</p>
        </details>
      ))}
    </div>
  )
}
