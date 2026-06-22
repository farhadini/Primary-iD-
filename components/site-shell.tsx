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
import { SiteNav } from "@/components/site-nav"
import { SiteFooter as SharedFooter } from "@/components/site-footer"

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
  return <SiteNav />
}

export function SiteFooter() {
  return <SharedFooter />
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
