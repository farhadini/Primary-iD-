"use client"

// One film on /clear-aligners/. Plays on a tap, with sound, in the site's own
// player. Nothing loads until it is played (preload="none", poster only).
// The line under each film ("Dramatization. Not actual Primary patients.")
// is page text in app/clear-aligners/page.tsx, so it shows whatever the
// player does.

import { useRef, useState } from "react"
import type { Film } from "@/lib/aligner-page"

export function AlignerFilm({ film, large = false, dark = false }: { film: Film; large?: boolean; dark?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const play = () => {
    const v = ref.current
    if (!v) return
    setStarted(true)
    v.controls = true
    v.play().catch(() => {})
  }
  const btn = large ? 92 : 72
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        borderRadius: large ? 24 : 20,
        overflow: "hidden",
        background: dark ? "#0B1B35" : "#E9E2D6",
        boxShadow: dark ? "0 24px 60px rgba(0,0,0,.35)" : "0 24px 60px rgba(14,34,64,.16)",
      }}
    >
      <video
        ref={ref}
        preload="none"
        playsInline
        poster={film.poster}
        width={1280}
        height={720}
        aria-label={film.label}
        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={film.src} type="video/mp4" />
        {film.captions ? <track kind="captions" srcLang="en" label="English" src={film.captions} /> : null}
      </video>
      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${film.title}, ${film.length}, with sound`}
          style={{
            position: "absolute",
            inset: 0,
            border: 0,
            margin: 0,
            padding: 0,
            cursor: "pointer",
            background: "linear-gradient(to top, rgba(14,34,64,.30) 0%, rgba(14,34,64,0) 40%)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: btn,
              height: btn,
              borderRadius: "50%",
              background: "rgba(255,255,255,.94)",
              boxShadow: "0 10px 30px rgba(14,34,64,.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 4,
            }}
          >
            <svg width={large ? 28 : 22} height={large ? 30 : 24} viewBox="0 0 20 22">
              <path d="M4 2l14 9-14 9z" fill="#0E2240" />
            </svg>
          </span>
          <span
            style={{
              position: "absolute",
              right: 14,
              bottom: 14,
              fontFamily: "var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#FFFFFF",
              background: "rgba(14,34,64,.72)",
              borderRadius: 999,
              padding: "5px 11px",
            }}
          >
            {film.length} &middot; sound on{film.captions ? " · captions" : ""}
          </span>
        </button>
      )}
    </div>
  )
}
