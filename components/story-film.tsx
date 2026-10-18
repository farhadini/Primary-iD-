"use client";

// ── "Your mouth, your story": the patient-voices film ─────────
// Sits in the closing section of the homepage (BookingCTA in app/page.tsx),
// between the line "Most people have never had someone look at their health
// the way we do." and the Book a visit button: people say it in their own
// words, then the page asks you to come in.
//
// Plays on click, with sound; the captions are burned in, so it also reads
// with the sound off. Nothing loads until it is played (preload="none", poster
// only), so it costs the page nothing.
//
// THIS CUT IS A STAND-IN. The people in it are AI-generated, speaking lines
// from the patient voices script (3 Marketing and Brand / Patient voices
// commercial - script and shoot guide). A testimonial has to be a real
// patient's own experience. The on-page disclosure was removed at the
// owner's request (Oct 2026); swap in the real-patient cut when it is shot.

import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import localFont from "next/font/local";

// fonts ship with the site (public/fonts), never fetched from Google at build time
const sfSans = localFont({ src: "../public/fonts/montserrat.woff2", weight: "100 900", display: "swap", variable: "--font-sf-sans" });
const sfMono = localFont({ src: "../public/fonts/jetbrains-mono.woff2", weight: "100 800", display: "swap", variable: "--font-sf-mono" });

const FILM = {
  webm: "/videos/your-mouth-your-story.webm",
  mp4: "/videos/your-mouth-your-story.mp4",
  poster: "/videos/your-mouth-your-story-poster.webp",
  length: "0:41",
};

export default function StoryFilm({ style }: { style?: CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const play = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    v.controls = true;
    v.play().catch(() => {});
  };
  return (
    <figure className={`sf ${sfSans.variable} ${sfMono.variable}`} style={style}>
      <style>{CSS}</style>
      <div className="sf-frame">
        <video ref={ref} preload="none" playsInline poster={FILM.poster} width={1280} height={720}
          aria-label="Your mouth, your story: people describe a dental visit that asked about their sleep, what they eat and what runs in their family">
          <source src={FILM.webm} type="video/webm" />
          <source src={FILM.mp4} type="video/mp4" />
        </video>
        {!started && (
          <button type="button" className="sf-play" onClick={play} aria-label={`Play the film, ${FILM.length}, with sound`}>
            <span className="sf-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M8 5.5v13l11-6.5z" fill="#0E2240" /></svg>
            </span>
            <span className="sf-t">
              <b>Your mouth, your story</b>
              <i>Film &middot; {FILM.length} &middot; sound on</i>
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}

const CSS = `
.sf{--sans:var(--font-sf-sans,"Montserrat"),"Montserrat","Helvetica Neue",Arial,sans-serif;
  --mono:var(--font-sf-mono,"JetBrains Mono"),"JetBrains Mono",ui-monospace,Menlo,monospace;
  position:relative;width:min(880px,calc(100vw - 32px));left:50%;transform:translateX(-50%);margin:4px 0 40px;}
.sf-frame{position:relative;aspect-ratio:16/9;border-radius:24px;overflow:hidden;background:#E9E2D6;
  box-shadow:0 34px 64px -42px rgba(14,34,64,.5);}
.sf-frame video{display:block;width:100%;height:100%;object-fit:cover;}
.sf-play{position:absolute;inset:0;display:flex;align-items:flex-end;gap:14px;padding:24px 26px;border:0;margin:0;
  cursor:pointer;text-align:left;color:#fff;
  background:linear-gradient(to top,rgba(14,34,64,.62) 0%,rgba(14,34,64,.18) 34%,rgba(14,34,64,0) 52%);}
.sf-btn{flex:none;width:58px;height:58px;border-radius:999px;background:#fff;display:flex;align-items:center;
  justify-content:center;padding-left:3px;box-shadow:0 14px 30px -14px rgba(14,34,64,.6);
  transition:transform .35s cubic-bezier(.2,.8,.2,1);}
.sf-play:hover .sf-btn,.sf-play:focus-visible .sf-btn{transform:scale(1.07);}
.sf-play:focus-visible{outline:3px solid #24A7E0;outline-offset:-3px;}
.sf-t b{display:block;font-family:var(--sans);font-weight:600;font-size:18px;letter-spacing:-.01em;line-height:1.2;}
.sf-t i{display:block;margin-top:4px;font-style:normal;font-family:var(--mono);font-size:11px;letter-spacing:.04em;opacity:.88;}
@media (max-width:640px){
  .sf{margin-bottom:32px;}
  .sf-frame{border-radius:20px;}
  .sf-play{padding:16px 18px;gap:12px;}
  .sf-btn{width:48px;height:48px;}
  .sf-t b{font-size:15.5px;}
}
@media (prefers-reduced-motion:reduce){.sf-btn{transition:none;}}
`;
