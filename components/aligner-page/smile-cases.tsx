"use client"

// The #smile drawing on /clear-aligners/: four common cases, each a drawn row
// of teeth that moves into line. A drawing, never a photograph, and nothing
// on it is presented as a result (spec, section 2 and build note 3).
//
// The pick travels into the aligner door as ?smile=<key> and presets the
// matching answer there (spec P1-01 L4: one Pathfinder; conflict C77). Nothing
// is stored on this page.

import { useState } from "react"
import type { CSSProperties } from "react"

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif"

const W = [38, 42, 50, 50, 42, 38]
const H = [70, 74, 86, 86, 74, 70]
const GAP = 4

type Case = { key: "overlap" | "spaces" | "moved" | "uneven"; label: string; text: string; off: number[][] }

export function SmileCases({ quickToBringBack, doorHref }: { quickToBringBack: boolean; doorHref: string }) {
  const cases: Case[] = [
    {
      key: "overlap",
      label: "Teeth that overlap",
      text: "Overlapping teeth catch the light unevenly. Lined up, the same teeth look calmer and more even, before anything is whitened or reshaped.",
      off: [[0, 2, 0, 1], [8, 4, -16, 2], [10, -2, 7, 3], [-10, 0, -6, 2], [-6, 5, 14, 1], [0, 2, 0, 1]],
    },
    {
      key: "spaces",
      label: "Spaces between teeth",
      text: "Closing small spaces changes the whole smile without touching the teeth themselves.",
      off: [[-14, 0, -3, 1], [-9, 0, -2, 1], [-4, 0, 0, 1], [4, 0, 0, 1], [9, 0, 2, 1], [14, 0, 3, 1]],
    },
    {
      key: "moved",
      label: "Teeth that moved after braces",
      text: quickToBringBack
        ? "Common, and usually quick to bring back. This time, we keep checking the result at your visits."
        : "Common. This time, we keep checking the result at your visits.",
      off: [[0, 0, 0, 1], [3, 3, -9, 2], [4, 0, 8, 3], [0, 0, 0, 1], [0, 2, 0, 1], [0, 0, 0, 1]],
    },
    {
      key: "uneven",
      label: "An uneven smile line",
      text: "Levelling the edges is often what makes a smile look finished. Sometimes it is all a smile needs; sometimes it means less work later.",
      off: [[0, 9, -4, 1], [0, -2, 3, 1], [0, -7, 0, 1], [0, 7, 0, 1], [0, -4, -3, 1], [0, 6, 4, 1]],
    },
  ]
  const [idx, setIdx] = useState(0)
  const [after, setAfter] = useState(false)
  const c = cases[idx]
  const total = W.reduce((a, b) => a + b, 0) + GAP * 5
  let x = (300 - total) / 2
  const base = W.map((w) => {
    const t = x
    x += w + GAP
    return t
  })

  const pill = (on: boolean): CSSProperties => ({
    minHeight: 44,
    padding: "10px 16px",
    borderRadius: 999,
    fontFamily: SANS,
    fontSize: 13.5,
    fontWeight: 600,
    cursor: "pointer",
    background: on ? "#0E2240" : "#FFFFFF",
    color: on ? "#FFFFFF" : "#0E2240",
    border: on ? "1px solid #0E2240" : "1px solid rgba(14,34,64,.22)",
  })
  const seg = (on: boolean): CSSProperties => ({
    minHeight: 40,
    padding: "8px 20px",
    borderRadius: 999,
    border: 0,
    fontFamily: SANS,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    background: on ? "#FFFFFF" : "transparent",
    color: on ? "#0E2240" : "#3a4a66",
    boxShadow: on ? "0 2px 8px rgba(14,34,64,.12)" : "none",
  })

  return (
    <div className="al-two">
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="al-eyebrow">What straightening changes</div>
        <h2 className="al-h2">
          The same teeth, <em>lined up.</em>
        </h2>
        <p style={{ margin: 0 }}>Most people who straighten their teeth do it for how their smile looks. Pick what you notice in yours.</p>
        <div role="group" aria-label="What you notice" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {cases.map((k, i) => (
            <button key={k.label} type="button" aria-pressed={i === idx} style={pill(i === idx)} onClick={() => { setIdx(i); setAfter(false) }}>
              {k.label}
            </button>
          ))}
        </div>
        <p style={{ margin: 0, fontFamily: SERIF, fontSize: 18, lineHeight: 1.55, color: "#0E2240" }}>{c.text}</p>
        <a
          href={`${doorHref}?smile=${c.key}`}
          style={{ alignSelf: "flex-start", fontFamily: SANS, fontSize: 14, fontWeight: 600, color: "#1F86B5", textDecoration: "none", minHeight: 44, display: "inline-flex", alignItems: "center" }}
        >
          Start your Primary iD with this &rarr;
        </a>
      </div>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(14,34,64,.10)",
          borderRadius: 24,
          padding: "28px 24px 22px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          boxShadow: "0 18px 50px rgba(14,34,64,.07)",
        }}
      >
        <div style={{ position: "relative", width: 300, maxWidth: "100%", height: 150 }} aria-hidden="true">
          <div style={{ position: "absolute", left: 0, top: 0, width: 300, height: 52, background: "#F1CDB8", borderRadius: "0 0 150px 150px / 0 0 34px 34px" }} />
          {base.map((bx, i) => {
            const o = after ? [0, 0, 0, 1] : c.off[i]
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: bx + o[0],
                  top: 30 + o[1],
                  width: W[i],
                  height: H[i],
                  transform: `rotate(${o[2]}deg)`,
                  transformOrigin: "50% 0",
                  zIndex: after ? 1 : o[3],
                  boxSizing: "border-box",
                  background: "#FFFFFF",
                  border: "2px solid #0E2240",
                  borderRadius: "10px 10px 20px 20px / 10px 10px 30px 30px",
                  boxShadow: "inset -5px -7px 0 rgba(36,167,224,.12)",
                  transition: "left .6s ease, top .6s ease, transform .6s ease",
                }}
              />
            )
          })}
        </div>
        <div role="group" aria-label="Before or after" style={{ display: "inline-flex", gap: 4, background: "#F2F4F7", borderRadius: 999, padding: 4 }}>
          <button type="button" aria-pressed={!after} style={seg(!after)} onClick={() => setAfter(false)}>Before</button>
          <button type="button" aria-pressed={after} style={seg(after)} onClick={() => setAfter(true)}>After</button>
        </div>
        <span style={{ fontSize: 11.5, color: "#3a4a66", textAlign: "center" }}>An illustration. Your own preview comes from your 3D scan.</span>
      </div>
    </div>
  )
}
