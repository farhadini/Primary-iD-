"use client"

import { useState } from "react"

// ─────────────────────────────────────────────────────────────────────────
// Click-to-load YouTube embed.
//
// Renders only the video thumbnail and a play button. The YouTube player
// (roughly 1 MB of script per video) loads when the visitor presses play,
// so a page with several videos stays fast for ad traffic.
//
// Uses the privacy-enhanced youtube-nocookie.com domain and rel=0, which
// limits end-of-video suggestions to our own channel.
// ─────────────────────────────────────────────────────────────────────────

const NAVY = "#0E2240"
const WARM_WHITE = "#FEFCF9"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

export function YouTubeFacade({
  id,
  title,
  duration,
  poster,
  cover,
  label,
}: {
  /** The 11-character YouTube video ID. */
  id: string
  /** Read by screen readers and used as the player title. */
  title: string
  /** Shown on the thumbnail, e.g. "1:18". Optional. */
  duration?: string
  /** A local still to show instead of YouTube's own thumbnail. Optional. */
  poster?: string
  /** A designed cover to show instead of any image, e.g. <VideoCover />. Optional. */
  cover?: React.ReactNode
  /** Words beside the play button on a designed cover, e.g. "Watch the explainer". */
  label?: string
}) {
  const [playing, setPlaying] = useState(false)
  const [thumb, setThumb] = useState(poster ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`)

  const frame: React.CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 16,
    overflow: "hidden",
    background: NAVY,
    border: "1px solid rgba(14,34,64,0.07)",
  }

  if (playing) {
    return (
      <div style={frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    )
  }

  // Designed cover: the drawing or title card fills the frame, and the play
  // control sits bottom left in navy so it reads on the light field.
  if (cover) {
    return (
      <button
        type="button"
        className="yt-facade yt-cover"
        data-yt={id}
        data-yt-cover
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${title}${duration ? `, ${duration}` : ""}`}
        style={{ ...frame, display: "block", padding: 0, cursor: "pointer", background: "#EDF3F7", border: "1px solid rgba(14,34,64,0.12)", textAlign: "left" }}
      >
        {cover}
        <span className="yt-chip" aria-hidden="true">
          <span className="yt-chip-btn">
            <svg width="17" height="19" viewBox="0 0 22 24"><path d="M1 1.5 L21 12 L1 22.5 Z" fill="#FFFFFF" /></svg>
          </span>
          <span className="yt-chip-text">
            <span className="yt-chip-title">{label ?? "Watch the video"}</span>
            {duration ? <span className="yt-chip-meta">{duration}</span> : null}
          </span>
        </span>
        <style>{`
          .yt-chip { position: absolute; left: 5.2%; bottom: 8%; display: flex; align-items: center; gap: 12px; }
          .yt-chip-btn { width: 54px; height: 54px; border-radius: 999px; background: ${NAVY}; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 26px -8px rgba(14,34,64,0.5); transition: transform 160ms ease; }
          .yt-chip-btn svg { margin-left: 4px; }
          .yt-chip-text { display: grid; gap: 1px; }
          .yt-chip-title { font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 14px; font-weight: 600; color: ${NAVY}; }
          .yt-chip-meta { font-family: var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.04em; color: #7A8695; }
          .yt-cover:hover .yt-chip-btn, .yt-cover:focus-visible .yt-chip-btn { transform: scale(1.07); }
          .yt-cover:focus-visible { outline: 3px solid #24A7E0; outline-offset: 3px; }
          @media (max-width: 520px) { .yt-chip-btn { width: 46px; height: 46px; } .yt-chip-title { font-size: 13px; } }
          @media (prefers-reduced-motion: reduce) { .yt-chip-btn { transition: none !important; } }
        `}</style>
      </button>
    )
  }

  return (
    <button
      type="button"
      className="yt-facade"
      data-yt={id}
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      style={{ ...frame, display: "block", padding: 0, cursor: "pointer" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt=""
        loading="lazy"
        decoding="async"
        // YouTube answers a missing high-res thumbnail with a 120px grey
        // placeholder rather than an error, so check the size and fall back.
        onLoad={e => {
          if (!poster && e.currentTarget.naturalWidth <= 120 && !thumb.includes("hqdefault")) {
            setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
          }
        }}
        onError={() => {
          if (thumb === poster || !thumb.includes("hqdefault")) setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
        }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <span
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(14,34,64,0) 45%, rgba(14,34,64,0.55) 100%)" }}
      />
      <span
        aria-hidden="true"
        className="yt-facade-play"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 68,
          height: 68,
          marginTop: -34,
          marginLeft: -34,
          borderRadius: 999,
          background: WARM_WHITE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 24px rgba(14,34,64,0.28)",
          transition: "transform 160ms ease",
        }}
      >
        <svg width="22" height="24" viewBox="0 0 22 24" style={{ marginLeft: 4 }}>
          <path d="M1 1.5 L21 12 L1 22.5 Z" fill={NAVY} />
        </svg>
      </span>
      {duration ? (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 12,
            bottom: 12,
            background: "rgba(14,34,64,0.82)",
            color: WARM_WHITE,
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.04em",
            padding: "4px 9px",
            borderRadius: 999,
          }}
        >
          {duration}
        </span>
      ) : null}
      <style>{`
        .yt-facade:hover .yt-facade-play,
        .yt-facade:focus-visible .yt-facade-play { transform: scale(1.07); }
        .yt-facade:focus-visible { outline: 3px solid #24A7E0; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          .yt-facade-play { transition: none !important; }
        }
      `}</style>
    </button>
  )
}
