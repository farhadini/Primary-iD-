// ─────────────────────────────────────────────────────────────────────────
// /clear-aligners/ : the switches and the media for the clear aligner page.
//
// Source of truth: Primary iD Project, "2 Website/Aligner landing page.md"
// (final draft, 20 Oct 2026). Change the spec first, then this file.
//
// BLOCKED SLOTS (B1 to B4) stay null until each is signed off. A null slot
// does not render: no OrthoFX wear claim, no price section, no member price,
// no credentials line. B5 is the door: /book/aligners/ (the old /book/orthofx/
// redirects there), led by the smile, with the smile quiz (preview branch
// preview/aligner-door, 21 Oct 2026; BRD-38 decision 12).
//
// FILM SWITCHES (F1 to F4) are off on the live site until each film is
// cleared (what clears each is in the spec). They are on in Vercel preview
// deployments and in local development, so the team can review the page
// with the films before anything is decided.
//
// `launched` turns on indexing. Leave it false until B1 to B5 are signed off
// and Farhad approves the page to go live (spec, build note 9).
// ─────────────────────────────────────────────────────────────────────────

const IS_REVIEW =
  process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development"

export type Film = {
  id: "journey" | "behindTheCamera" | "twice" | "fourteen"
  title: string
  length: string
  src: string
  poster: string
  captions?: string
  label: string
}

// Preview hosting: the 720p MP4 of each film, from the 20 Oct web pack.
// Before launch, copy the web pack into public/videos/aligners/ and point
// these at the local files (WebM first, then MP4), as the spec says.
const CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_38cIAK0A3uFxxQ5sB5GjVuQ00S2"

export const FILMS: Record<Film["id"], Film> = {
  journey: {
    id: "journey",
    title: "The whole journey",
    length: "1:09",
    src: `${CDN}/bc4dd327-62e4-4176-9c21-db468f783d1f.mp4`,
    poster: "/videos/aligners/poster-journey.webp",
    captions: "/videos/aligners/orthofx-primary-journey.en.vtt",
    label: "The whole journey at Primary, from the Primary iD to the year after, with AirFlex by OrthoFX",
  },
  behindTheCamera: {
    id: "behindTheCamera",
    title: "Behind the camera",
    length: "0:25",
    src: `${CDN}/6bddc053-8e41-4c1d-9b91-4632c3ae1281.mp4`,
    poster: "/videos/aligners/poster-behind-the-camera.webp",
    label: "Behind the camera, a dramatized smile story",
  },
  twice: {
    id: "twice",
    title: "Twice",
    length: "0:26",
    src: `${CDN}/700d9195-57dd-4e39-820d-ed460c510108.mp4`,
    poster: "/videos/aligners/poster-twice.webp",
    label: "Twice, a dramatized smile story",
  },
  fourteen: {
    id: "fourteen",
    title: "Fourteen",
    length: "0:24",
    src: `${CDN}/3f2aa4f2-e421-423d-85b8-f0b1e7990723.mp4`,
    poster: "/videos/aligners/poster-fourteen.webp",
    label: "Fourteen, a dramatized smile story",
  },
}

// Each switch is true only when that film is cleared for the live site.
const FILM_CLEARED: Record<Film["id"], boolean> = {
  journey: false, // F1: OrthoFX in writing + B1, cleared narration, counsel
  behindTheCamera: false, // F2: counsel
  twice: false, // F3: counsel
  fourteen: false, // F4: counsel + Dr. Gabi on the retention plan
}

export function filmOn(id: Film["id"]): boolean {
  return IS_REVIEW || FILM_CLEARED[id]
}

export const ALIGNER_PAGE = {
  launched: false,
  doorHref: "/book/aligners/", // B5
  // B1: OrthoFX's exact wording and footnote, in writing, or leave null.
  airflexClaim: null as null | { claim: string; footnote: string },
  // B2 and B3: the cost section stays hidden while these are null.
  fees: null as null | { full: string; limited: string; member?: string },
  // B4: Dr. Gabi's credentials line (degree, licence type, board status if true).
  credentials: null as null | string,
  // Things Dr. Gabi confirms before they show.
  showPreview3d: false,
  showQuickToBringBack: false,
}

export const PHONE = { display: "(310) 564-8990", href: "tel:+13105648990" }

// Google rating, as published on /dental-implant/ (read 6 Oct 2026).
export const GOOGLE = { rating: "4.9", url: "https://maps.app.goo.gl/oQoaV1MrCoMEQ1CS8" }
