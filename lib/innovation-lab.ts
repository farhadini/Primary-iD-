// ─────────────────────────────────────────────────────────────────────────
// /primaryinnovationlab/ : the content and switches for the Primary
// Innovation Lab page (v1).
//
// Source of truth: the Primary iD Project, the Innovation Lab design canvas
// (board "Section one: storyboard (below the line)", v32) and the film
// "Below the line" (draft 2.1, 4 Nov 2026), Asset Map WEB-16, WEB-25, WEB-26.
// Every count below comes from Primary's journey record (v3.7, 23 Oct 2026)
// and the atlas of innovations; change them there first, then here and in the
// film. Copy rules: no em dashes; say "the Primary Innovation Lab", never
// "the lab"; "connecting it to primary care" (Primary does not provide primary
// care); no partner or product names on this page for now.
// ─────────────────────────────────────────────────────────────────────────

export const LAB_URL = "https://myprimaryid.com/primaryinnovationlab/"

// The film: 1920x1080, captions burned in, so it reads with the sound off.
// Under the voice: a music bed and sound design written to the film's timeline.
// The narration is a stand-in voice until the final read is recorded; the
// picture is timed line by line so the new read drops onto the same cut.
export const LAB_FILM = {
  title: "Below the line",
  length: "1:24",
  isoDuration: "PT1M24S",
  src: "/videos/innovation-lab/below-the-line.mp4",
  webm: "/videos/innovation-lab/below-the-line.webm",
  poster: "/videos/innovation-lab/below-the-line-poster.jpg",
  uploadDate: "2026-11-04",
  label:
    "Below the line: one patient's first dental visit as one simple line, and the layers underneath it: people, where it happens, software, connections and innovation",
}

// Count, then point. Each figure is drawn in the film.
export const LAB_STATS: { n: string; label: string }[] = [
  { n: "15", label: "steps from the first click to the record" },
  { n: "30", label: "actions by 6 people on one visit" },
  { n: "8", label: "steps before the patient walks in" },
  { n: "16", label: "systems, working in 12 of the 15 steps" },
  { n: "25", label: "connections between those systems" },
  { n: "~100", label: "innovations that touch how a practice runs" },
]

// The narration, line by line, as captioned in the film.
export const LAB_SCRIPT: string[][] = [
  [
    "To a patient, a first dental visit is one simple line.",
    "15 steps, from the first click to the record.",
    "This is what it takes below the line.",
  ],
  [
    "The first layer is people.",
    "Six of them act on one visit 30 times.",
    "In six of those steps, no one is facing the patient at all.",
  ],
  [
    "The second layer is where it happens.",
    "Online, on the phone, by text, and in the chair.",
    "More than half of it happens before the patient walks in.",
  ],
  ["The third layer is software.", "16 systems, doing work in 12 of the 15 steps."],
  [
    "The fourth layer is the connections between them.",
    "25 of them, each a place where the patient’s record moves on, or gets stuck.",
  ],
  [
    "And below it all, nearly 100 innovations touch how a practice runs.",
    "Each is built on its own. The patient lives with all of them at once.",
  ],
  ["And that is one visit.", "Recare, aligners, crowns, implants: 9 journeys in all, each with its own stack."],
  [
    "All of that, for about four hours a year in the chair.",
    "Built one piece at a time, it can leave a patient feeling like a cog in a machine.",
    "The Primary Innovation Lab is building the future of dentistry the other way around, starting with the person in the chair.",
    "A visit people look forward to, and a foundation for their health, wellbeing and beauty.",
  ],
]

// The way to reach the Primary Innovation Lab. Null hides the closing
// "work with us" block. TODO(farhad): confirm the address before turning on.
export const LAB_CONTACT: { label: string; href: string } | null = null
