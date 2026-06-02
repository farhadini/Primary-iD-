import { ImageResponse } from "next/og"

// ─────────────────────────────────────────────────────────────────────
// Default site-wide Open Graph image. Renders dynamically via next/og.
// Per-page metadata can override this; this is the fallback that ships
// for any page that doesn't specify its own OG image.
// ─────────────────────────────────────────────────────────────────────

export const runtime = "edge"
export const alt = "Primary Integrative Dentistry — Brentwood, Los Angeles"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const NAVY = "#0E2240"
const CREAM = "#FAF8F5"
const BLUE = "#24A7E0"
const ACCENT = "#E8985E"

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: CREAM,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top row — practice wordmark + locale */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 36,
              color: NAVY,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: BLUE,
                marginRight: 14,
              }}
            />
            Primary
          </div>
          <div
            style={{
              fontSize: 18,
              color: NAVY,
              opacity: 0.65,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Integrative · Brentwood · LA
          </div>
        </div>

        {/* Center — display headline (matches the homepage hero language) */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div
            style={{
              fontSize: 92,
              color: NAVY,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              fontWeight: 400,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Dentistry reimagined&nbsp;</span>
            <span>to see&nbsp;</span>
            <span style={{ color: BLUE, fontStyle: "italic" }}>the whole you.</span>
          </div>
        </div>

        {/* Bottom row — subhead + rating */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: NAVY,
              opacity: 0.8,
              maxWidth: 720,
              lineHeight: 1.4,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Whole-body integrative dentistry led by Dr. Tzur Gabi,
            functional prosthodontist.
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: ACCENT,
                fontWeight: 600,
                letterSpacing: "0.02em",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              ★ 4.9 · 373+ reviews
            </div>
            <div
              style={{
                fontSize: 16,
                color: NAVY,
                opacity: 0.55,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              myprimaryid.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
