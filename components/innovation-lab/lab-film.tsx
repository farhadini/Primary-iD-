"use client"

// The film on /primaryinnovationlab/. Plays on a tap, with sound, in the
// site's own player (as the aligner films do). Nothing loads until it is
// played (preload="none", poster only). Captions are burned into the picture.

import { useRef, useState } from "react"
import { LAB_FILM } from "@/lib/innovation-lab"

export function LabFilm() {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const play = () => {
    const v = ref.current
    if (!v) return
    setStarted(true)
    v.controls = true
    v.play().catch(() => {})
  }
  return (
    <div className="il-film">
      <video
        ref={ref}
        preload="none"
        playsInline
        poster={LAB_FILM.poster}
        width={1920}
        height={1080}
        aria-label={LAB_FILM.label}
      >
        <source src={LAB_FILM.webm} type="video/webm" />
        <source src={LAB_FILM.src} type="video/mp4" />
      </video>
      {!started && (
        <button type="button" onClick={play} className="il-film-play" aria-label={`Play ${LAB_FILM.title}, ${LAB_FILM.length}, with sound`}>
          <span className="il-film-btn" aria-hidden="true">
            <svg width="28" height="30" viewBox="0 0 20 22">
              <path d="M4 2l14 9-14 9z" fill="#0E2240" />
            </svg>
          </span>
          <span className="il-film-tag">
            {LAB_FILM.length} &middot; sound on &middot; captions
          </span>
        </button>
      )}
    </div>
  )
}
