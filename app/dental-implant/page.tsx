import type React from "react"
import Link from "next/link"
import { SiteHeader, SiteFooter } from "@/components/site-shell"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema, VideoObjectSchema } from "@/components/schema"
import { StoryReel } from "@/components/story-reel"
import { YouTubeFacade } from "@/components/youtube-facade"
import MobileStickyCTA from "@/components/mobile-sticky-cta"
import { ImplantIllustration, ImplantAnatomy, ImplantIllustrationStyles, TeethMaterial, VideoCover } from "@/components/implant-illustrations"
import { ConsultStart } from "@/components/consult-start"
import { SectionNav } from "@/components/section-nav"
import { LenderPaths } from "@/components/lender-paths"
import { HelpWithCost } from "@/components/help-with-cost"
import { ThingsWeMiss } from "@/components/things-we-miss"

// ─────────────────────────────────────────────────────────────────────────
// /dental-implant/ : Full Arch & Implants pathway page.
//
// Oct 2026 rebuild. What changed and why:
//
// - NO PRICES. Dollar figures and ranges are gone from the page, the FAQ and
//   the FAQ schema. Do not add them back without a decision from Farhad.
//   California fee advertising has to say what is and is not included, and a
//   range without a scan is a guess. Cost is handled by "your number comes in
//   writing" plus the factors that move it.
// - VIDEOS. Patient stories, the All-on-4 explainer and the post-op care guide
//   are YouTube-hosted (Primary Integrative Dentistry channel) and render
//   through <YouTubeFacade>, which loads the player only on click. To swap a
//   video, change its `id` in the VIDEOS block below.
// - ONE ACTION. Every button goes to the free virtual consult form on this
//   page (#virtual-consult) or to the phone. The form is in
//   components/virtual-consult.tsx and is NOT WIRED to the lead flow yet.
// - CLAIMS. Survival statistics carry a citation and appear once. Painless and
//   outcome guarantees are out. The "typical practice" comparison is now a list
//   of questions to ask any office, so we make no claims about other dentists.
// - LOOK. Aligned with /membership/ (Farhad, 6 Oct): Georgia headlines with
//   one italic blue phrase, a light page with a soft sky wash, navy only on
//   buttons and the closing band, cards on warm white. Montserrat (loaded in
//   ./layout.tsx) carries body copy, labels and buttons; /membership/ uses
//   Inter there, which the Brand OS rules out.
// ─────────────────────────────────────────────────────────────────────────

// ─── Brand tokens (Brand OS §1) ───────────────────────────────────────────
const T = {
  navy: "#0E2240",
  blue: "#24A7E0",
  blueSoft: "#5BC0EC",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  ink: "#121a2b",
  inkSoft: "#3a4a66",
  muted: "#7A8695",
  line: "rgba(14,34,64,0.12)",
  lineSoft: "rgba(14,34,64,0.06)",
  onNavy: "rgba(255,255,255,0.74)",
  onNavyMuted: "rgba(255,255,255,0.55)",
  // dimension tokens: tagging and data viz only
  dOral: "#D4B584",
  dSleep: "#7B68EE",
  dNutrition: "#48C28C",
  dFamily: "#E8985E",
  dLongevity: "#D97757",
} as const

const R = { chip: 8, card: 16, panel: 24, pill: 999 } as const

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "var(--font-montserrat), 'Montserrat', 'Helvetica Neue', Arial, sans-serif"

const PHONE_DISPLAY = "(310) 564-8990"
const PHONE_HREF = "tel:+13105648990"
const CONSULT = "#virtual-consult"

// Google rating. Read from the Google Business Profile on 6 Oct 2026.
// TODO(farhad): keep this in step with Google (it goes stale), and use the
// same figure everywhere on the site. Home and About say 442+, /brand says 452+.
const GOOGLE = { rating: "4.9", count: "459", url: "https://maps.app.goo.gl/oQoaV1MrCoMEQ1CS8" }

// Written reviews. These three are the ones already published on the home
// page (components/testimonials.tsx). Swap in implant-specific Google reviews
// when chosen: quote them word for word, and prefer ones about the experience.
const REVIEWS = [
  { name: "Ali D., MD", quote: "I have been treated by Dr. Gabi and his team for two years, for everything from cleanings to crowns and implants, with excellent results. As a physician myself, I highly recommend Dr. Gabi and his team for any work, regardless of complexity." },
  { name: "Sarah H.", quote: "I really enjoyed how personable Dr. Gabi is. He genuinely listens and is never rushed. He gave me the most thorough cleaning I have ever had, and his office and staff are lovely." },
  { name: "Sivan T.", quote: "I called for an emergency and Dr. Tzur saw me right away. He was so comforting through the whole experience and completely changed how I feel about going in. I could not recommend a better doctor and team to take care of your smile." },
]

// ─── YouTube videos ───────────────────────────────────────────────────────
// `id` is the YouTube video ID. `uploaded` and `iso` feed the VideoObject
// schema, so keep them in step with YouTube if a video is replaced.
//
// `poster` is the still shown in the story reel. The three files in
// /public/images/stories/ are crops of frames from the videos; replace them
// with clean, full-size frames exported from the masters before launch.
// `quote` is the patient's own words from their video. Only add a quote that
// has been checked against the video, and keep it about the experience.
// Who is who was confirmed by Farhad on 6 Oct 2026, and the video titles on
// YouTube match the ids below.
const PATIENT_STORIES = [
  {
    id: "juBYkl6ElO0", name: "Peter K.", first: "Peter", treatment: "Fixed full-arch implants (All-on-4)", length: "1:10", iso: "PT1M10S", uploaded: "2024-11-12",
    poster: "/images/stories/story-peter.jpg",
    alt: "Peter smiling, holding a tablet that shows a photo of himself before treatment.",
    caption: "The tablet shows Peter before treatment.",
  },
  {
    id: "diCm9Z9srXM", name: "Dorothy C.", first: "Dorothy", treatment: "Fixed full-arch implants (All-on-4)", length: "1:18", iso: "PT1M18S", uploaded: "2024-11-12",
    poster: "/images/stories/story-dorothy.jpg",
    alt: "Dorothy smiling, holding up a tablet that shows her smile before treatment.",
    quote: "I said, Dorothy, get your teeth fixed.",
    caption: "The tablet shows Dorothy\u2019s smile before treatment.",
  },
  {
    id: "Xv6I9i19WIg", name: "Jordan L.", first: "Jordan", treatment: "Fixed full-arch implants (All-on-4)", length: "1:19", iso: "PT1M19S", uploaded: "2024-11-12",
    poster: "/images/stories/story-jordan.jpg",
    alt: "Jordan smiling in the dental chair, holding a tablet that shows his smile before treatment.",
    quote: "I used to cover my mouth when I was laughing.",
    caption: "The tablet shows Jordan\u2019s smile before treatment.",
  },
]

const EXPLAINER_VIDEO = { id: "gUk2lot7W7k", title: "What All-on-4 is, and what to expect", length: "2:24", iso: "PT2M24S", uploaded: "2024-11-11" }

// "Meet the Doctor - Dr Tzur S. Gabi DMD" on the practice channel. Its upload
// date and length are not confirmed, so it has no VideoObject schema yet.
const MEET_DOCTOR_VIDEO = { id: "6-PaAY5zcsI", title: "Meet Dr. Gabi", poster: "/images/stories/gabi-with-patient.jpg" }

// Why Dr. Gabi, for full-arch and complex cases. Every line restates something
// already published on /about/. Nothing here compares him to other dentists.
const DOCTOR_FACTS = [
  { head: "Prosthodontist", body: "One of the dental specialties recognized by the American Dental Association. It takes three or more years of training after dental school, focused on replacing and rebuilding teeth." },
  { head: "25+ years", body: "Of full-arch work, including All-on-4, All-on-6 and zygomatic implants." },
  { head: "One doctor, start to finish", body: "He plans your case and does the surgery himself. You are not handed from one office to another." },
  { head: "He teaches it", body: "For more than fifteen years he has taught other dentists how to handle complex restorative cases, in the U.S. and abroad." },
]

const POST_OP_VIDEO = { id: "GPOuo_ppCqE", title: "Full-arch post-op care guide", length: "1:32", iso: "PT1M32S", uploaded: "2024-11-14" }

// ─── FAQ ──────────────────────────────────────────────────────────────────
// These strings also feed the FAQPage schema. No prices. Statistics appear
// once, with author, journal, year and study count.
const FAQ_ITEMS = [
  { q: "How much will it cost?", a: "It depends on how many implants you need, whether you need bone grafting, the material you choose, and whether it is one jaw or both. We can't give you an accurate number without examining you. At your consultation you get a written plan with the full cost, and we go through payment options with you." },
  { q: "Will it hurt?", a: "You are under IV sedation for the surgery, so most patients remember very little of it. You will be sore for a few days afterward. The first two days are the hardest, and we check in with you each day. We give you a plan for pain relief that doesn't rely only on opioids." },
  { q: "How long is the recovery?", a: "Most people are back at work within a week. You will eat soft foods for a while, and how long depends on your case. The bone takes a few months to heal around the implants. You have temporary teeth during that time, so you are never without teeth." },
  { q: "What if an implant fails?", a: "Pooled studies put implant survival at about 96% at 10 years (Howe et al., Journal of Dentistry 2019, meta-analysis of 18 studies). At 20 years the best data shows 92% among patients who stayed in the studies, and closer to four in five once drop-outs are counted (Kupka et al., Clinical Oral Investigations 2024, 8 studies, 1,677 implants). Smoking, uncontrolled diabetes and gum disease all lower those odds, which is why we ask about your health before we plan your treatment. If an implant does fail, we replace it under our warranty at no cost to you." },
  { q: "Will I be able to eat normally?", a: "Most patients do. Fixed teeth are attached to the implants, so they don't move the way a denture can. Patients tell us they go back to foods they had been avoiding, like apples, steak and corn on the cob. We ask you not to chew ice or crack nut shells with them." },
  { q: "Is there a warranty?", a: "Yes. The implants carry a 25-year warranty backed by the manufacturer. The teeth attached to them carry a 5-year warranty that covers normal wear and defects. Primary iD members have a lifetime warranty on their implants. You get the terms in writing with your treatment plan." },
  { q: "How long do implants last?", a: "Implants can last for decades when they are looked after. The answer on implant failure has the long-term numbers. The teeth attached to them wear over time and may need replacing after 15 to 20 years. Cleaning them well at home and coming in twice a year makes the biggest difference." },
  { q: "Will insurance cover any of it?", a: "Usually a small part. Most dental plans have a yearly maximum that covers only a fraction of full-arch treatment. We file a claim for everything your plan covers, which sometimes includes extractions and bone grafts. Medical insurance occasionally covers implant work when tooth loss is linked to a medical condition, and we check that for you." },
  { q: "What kind of anesthesia do you use?", a: "Every surgery is done under IV sedation, given by a board-certified anesthesia provider. You can choose light sedation, where you breathe on your own and remember little, or deeper sedation, which is closer to general anesthesia. Most patients choose light." },
  { q: "What if I'm nervous about coming in?", a: "Many of our patients put this off for years because they were afraid. Your first visit is a conversation and a scan. No treatment is done that day, and nobody will pressure you to decide. You are welcome to bring someone with you." },
]

const OPTIONS = [
  { scene: "single" as const, name: "Single-tooth implant", def: "One titanium or zirconia post with a crown on top. It replaces a single missing tooth and leaves the teeth on either side alone.", when: "One missing tooth", made: [["Post", ["ti", "zr"]], ["Tooth", ["cer"]]] as const },
  { scene: "bridge" as const, name: "Implant bridge", def: "Two implants hold a bridge of three or four teeth. The teeth next to the gap don't have to be ground down to support it.", when: "Three or four missing teeth in a row", made: [["Posts", ["ti", "zr"]], ["Teeth", ["cer"]]] as const },
  { scene: "denture" as const, name: "Implant-supported denture", def: "A full denture that snaps onto two to four implants. It stays put while you eat and talk, and you take it out to clean it.", when: "All the teeth in one jaw, if you are comfortable with removable teeth", made: [["Posts", ["ti"]], ["Teeth", ["acr"]]] as const },
  { scene: "fixed" as const, name: "Fixed full-arch", def: "Often called All-on-4 or All-on-6. A full set of teeth fixed to four to six implants. They stay in, and only your dentist takes them off.", when: "All the teeth in one jaw, if you want teeth that stay in", made: [["Posts", ["ti", "zr"]], ["Teeth", ["acr", "hyb", "zr"]]] as const },
]

// What we ask before planning implant treatment, in the patient's words.
// No instrument names here: nobody outside dentistry knows what they are.
const CHECKS = [
  { q: "Does gum disease run in your family?", a: "It is one of the stronger signs of how implants hold up over the years. If it does, we schedule your follow-up visits closer together." },
  { q: "What medications do you take?", a: "Some change how bone heals. If you take one of them, we speak with your physician before we set a date for surgery." },
  { q: "Do you grind your teeth at night?", a: "Grinding puts extra force on implants. If you do, we design your bite for it and make you a night guard." },
  { q: "How is your overall health?", a: "Blood pressure, blood sugar and smoking all affect healing, so we check them before we plan your treatment." },
]

const JOURNEY = [
  { n: "01", name: "Your first visit", body: "We take a 3D scan, check your airway, and look at any lab results you bring. Dr. Gabi examines you and goes through your medical history, and you talk about what you want and what worries you. You leave with a written treatment plan the same day. Most people take it home to think it over." },
  { n: "02", name: "Planning", body: "Your new teeth are designed on a computer, and you see the design before anything is made. You choose the material. We agree on the cost and how you will pay, and set a date for surgery." },
  { n: "03", name: "Surgery day", body: "You are under IV sedation. Dr. Gabi removes any failing teeth and places the implants using a guide made from your scan. In same-day cases, you go home with temporary teeth. You will be sore for a few days, and we give you a plan for managing it." },
  { n: "04", name: "Healing", body: "Over the next few months your bone grows around the implants. You eat soft foods at first and come in for check-ups. Your temporary teeth stay in the whole time." },
  { n: "05", name: "Your final teeth", body: "Once you have healed, the temporary teeth come off and your final teeth go on. We check the fit, the bite and the color, and show you how to look after them." },
  { n: "06", name: "Ongoing care", body: "You come in twice a year for a cleaning and a check of your implants. Members pay less for these visits and for any repairs later on." },
]

// Questions to ask any office, with our own answer. We describe what we do
// and make no claims about other practices.
const QUESTIONS = [
  ["Who plans the case, and who does the surgery?", "Dr. Gabi, a prosthodontist, plans your case and does the surgery himself."],
  ["How much time do I get with the doctor?", "At least 30 minutes with Dr. Gabi during a 90-minute first visit. You leave with a plan the same day."],
  ["What scans is the plan based on?", "A 3D CBCT scan and a digital scan of your mouth, for every implant plan."],
  ["What do you check before surgery?", "Your medical history, your medications, your sleep and your family history."],
  ["How many options will I be shown?", "Every option that would work for you, with Dr. Gabi's recommendation and his reasons."],
  ["Which materials do you use?", "Titanium and zirconia. We test for sensitivities when there is a reason to."],
  ["Who looks after it once it's done?", "We do. You come back to the same team twice a year."],
]

// The five lines on an implant treatment plan. No prices: the amounts are
// filled in at the consultation. `why` is the one plain line a visitor sees
// when they open the row.
const COST_FACTORS = [
  { name: "How many implants you need", why: "One missing tooth needs one implant. A full arch of teeth usually sits on four to six." },
  { name: "Whether you need bone grafting", why: "An implant needs enough bone to hold it. If there isn\u2019t enough, bone is added first, and that is an extra step." },
  { name: "What your new teeth are made from", why: "Acrylic, a hybrid on a titanium frame, or zirconia. Each one looks, wears and costs differently." },
  { name: "The sedation", why: "Every surgery is done under IV sedation. Lighter or deeper sedation, and how long you are under, change this line." },
  { name: "Upper jaw, lower jaw, or both", why: "One arch is one set of implants and teeth. Both arches is two." },
]

// "The Things We Miss": four frames from the campaign for the closing band.
// The lines are the campaign's own. The pictures are the campaign's clean
// 4:5 photography, shown whole so no face is cropped.
const MISS_FRAMES = [
  { lead: "I missed", accent: "steak.", sub: "Restoring more than teeth.", img: "/images/campaign/twm-steak.jpg", alt: "A man laughing with his head thrown back." },
  { lead: "Stop planning your life around", accent: "your mouth.", sub: "No more hiding. No more managing.", img: "/images/campaign/twm-her.jpg", alt: "A woman laughing with her eyes closed." },
  { lead: "Some things shouldn\u2019t come out", accent: "at night.", sub: "Fixed full-arch implants. Eat, speak and live without taking your teeth out.", img: "/images/campaign/twm-night.jpg", alt: "A denture soaking in a glass of water." },
  { lead: "You can\u2019t age well if you can\u2019t", accent: "chew well.", sub: "Built to eat. Built to last. Built for life.", img: "/images/campaign/twm-life.jpg", alt: "A man with a grey beard, smiling." },
]

// The page's sections, named the way a visitor would ask for them. Order
// matches the page. Used by the section navigation under the header.
const NAV_ITEMS = [
  { id: "why-implants", label: "Why implants" },
  { id: "patient-stories", label: "Stories" },
  { id: "dr-gabi", label: "Dr. Gabi" },
  { id: "options", label: "Options" },
  { id: "paying-for-it", label: "Cost" },
  { id: "candidate", label: "Am I a candidate?" },
  { id: "what-happens", label: "What happens" },
  { id: "virtual-consult", label: "Get started" },
  { id: "compare", label: "Compare" },
  { id: "faq", label: "Questions" },
]

// What a fixed full arch changes, in the order people ask about it. Each line
// says how it works, not what a patient will feel, so nothing here promises
// a result. "Decades" matches the FAQ answer, where the studies are cited.
const WHY_IMPLANTS = [
  { head: "Teeth you chew with", body: "The teeth are fixed to implants in your jaw. They are built for biting and chewing, and they stay in for meals." },
  { head: "Nothing to take out", body: "No adhesive, no glass by the bed, and nothing covering the roof of your mouth." },
  { head: "Helps keep your jawbone", body: "After teeth are lost, the bone under them slowly shrinks. Implants give that bone work to do, which helps keep it." },
  { head: "Designed for your face", body: "Your new teeth are designed on a computer, and you see the design before anything is made." },
  { head: "Made for the long term", body: "Looked after, implants can last for decades. The long-term studies are in the questions further down." },
]

// ─── Shared styles ────────────────────────────────────────────────────────
const eyebrow: React.CSSProperties = { fontFamily: SANS, fontSize: 11, color: T.blue, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 18px" }
const h2: React.CSSProperties = { fontFamily: SERIF, fontSize: "clamp(30px, 4.4vw, 48px)", fontWeight: 400, color: T.navy, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 20px" }
const h3: React.CSSProperties = { fontFamily: SERIF, fontSize: 21, fontWeight: 400, color: T.navy, lineHeight: 1.25, letterSpacing: "-0.01em", margin: 0 }
const lead: React.CSSProperties = { fontFamily: SANS, fontSize: 17, lineHeight: 1.62, color: T.inkSoft, margin: 0, maxWidth: "62ch" }
const small: React.CSSProperties = { fontFamily: SANS, fontSize: 15, lineHeight: 1.6, color: T.inkSoft, margin: 0 }
// The italic blue phrase: one per screen, as on /membership/.
const em: React.CSSProperties = { fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, color: T.blue }
const btn: React.CSSProperties = { display: "inline-block", padding: "14px 26px", borderRadius: R.pill, fontFamily: SANS, fontWeight: 600, fontSize: 14.5, letterSpacing: "0.02em", textDecoration: "none" }
const ghost: React.CSSProperties = { padding: "13px 25px", background: "rgba(254,252,249,0.7)", color: T.navy, border: `1px solid ${T.line}` }
const card: React.CSSProperties = { background: T.warm, border: `1px solid ${T.line}`, borderRadius: R.card }

// Materials, for the small swatches on the option cards.
const MAT = {
  ti: { label: "Titanium", fill: "#9FB0C6" },
  zr: { label: "Zirconia", fill: "#FBF8F1" },
  cer: { label: "Ceramic", fill: "#FFFFFF" },
  acr: { label: "Acrylic", fill: "#F4D3BC" },
  hyb: { label: "Hybrid", fill: "linear-gradient(90deg, #F4D3BC 50%, #9FB0C6 50%)" },
} as const

const TEETH_MATERIALS = [
  { kind: "acrylic" as const, name: "Acrylic", body: "Acrylic teeth on a gum-colored base. The lightest of the three, and simple to repair or adjust." },
  { kind: "hybrid" as const, name: "Hybrid", body: "Acrylic teeth on a titanium frame. The frame adds strength underneath." },
  { kind: "zirconia" as const, name: "Zirconia", body: "Teeth and base milled from one piece of ceramic. The hardest-wearing of the three." },
]

function Stars({ size = 16 }: { size?: number }) {
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", gap: 2, verticalAlign: "middle" }}>
      {[0, 1, 2, 3, 4].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20"><path d="M10 1.6l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.8l5.9-.8z" fill={T.dOral} /></svg>
      ))}
    </span>
  )
}

export default function DentalImplantPage() {
  return (
    <div className="imp-page" style={{ fontFamily: SANS, color: T.inkSoft, background: `radial-gradient(115vmax 78vmax at 82% 4%, rgba(36,167,224,0.13), transparent 58%), radial-gradient(95vmax 66vmax at 6% 96%, rgba(36,167,224,0.08), transparent 56%), ${T.cream}`, backgroundAttachment: "fixed" }}>
      <SiteHeader />
      <ServiceSchema
        serviceType="Dental Implants & Full Arch Restoration"
        description="Single-tooth implants, implant bridges, implant-supported dentures, and fixed full-arch (All-on-4/6) cases. Zirconia and titanium options, 3D-guided placement, biocompatible materials. Dr. Tzur Gabi, functional prosthodontist."
        url="https://myprimaryid.com/dental-implant/"
      />
      <FAQPageSchema questions={FAQ_ITEMS.map(f => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Dental Implants & Full Arch", url: "https://myprimaryid.com/dental-implant/" },
      ]} />
      {PATIENT_STORIES.map(v => (
        <VideoObjectSchema
          key={v.id}
          youtubeId={v.id}
          name={`${v.name}, full-arch patient story`}
          description={`${v.name} talks about full-arch dental implant treatment with Dr. Tzur Gabi at Primary Integrative Dentistry in Los Angeles.`}
          uploadDate={v.uploaded}
          duration={v.iso}
        />
      ))}
      <VideoObjectSchema
        youtubeId={EXPLAINER_VIDEO.id}
        name="What is All-on-4 and what to expect"
        description="A short walkthrough of fixed full-arch (All-on-4) dental implants and same-day teeth at Primary Integrative Dentistry in Los Angeles."
        uploadDate={EXPLAINER_VIDEO.uploaded}
        duration={EXPLAINER_VIDEO.iso}
      />
      <VideoObjectSchema
        youtubeId={POST_OP_VIDEO.id}
        name="Full-arch (All-on-X) post-op care guide"
        description="What to do in the days after full-arch dental implant surgery, from Primary Integrative Dentistry in Los Angeles."
        uploadDate={POST_OP_VIDEO.uploaded}
        duration={POST_OP_VIDEO.iso}
      />

      {/* HERO: light, two columns, as on /membership/ */}
      <section className="imp-hero" style={{ padding: "64px 28px 96px" }}>
        <div className="hero-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <p style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: T.blue, background: "rgba(36,167,224,0.10)", border: "1px solid rgba(36,167,224,0.28)", borderRadius: R.pill, padding: "8px 14px", margin: 0 }}>
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: R.pill, background: T.blue, flexShrink: 0 }} />
              Full-arch dental implants · Brentwood
            </p>
            <h1 style={{ fontFamily: SERIF, fontSize: "clamp(40px, 5.4vw, 66px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.02em", color: T.navy, margin: "24px 0 0" }}>
              Get back <em style={em}>the things you miss.</em>
            </h1>
            <p style={{ ...lead, fontSize: 19, color: T.navy, margin: "26px 0 0", maxWidth: 520 }}>
              Steak. Laughing without covering your mouth. Teeth that stay in at night.
            </p>
            <p style={{ ...lead, margin: "12px 0 0", maxWidth: 460 }}>
              Fixed full-arch implants, planned and placed by Dr. Gabi, a prosthodontist with 25+ years of this work.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
              <a href={CONSULT} style={{ ...btn, background: T.navy, color: "#FFFFFF" }}>
                Book a free virtual consult
              </a>
              <a href={PHONE_HREF} style={{ ...btn, ...ghost }}>
                Call {PHONE_DISPLAY}
              </a>
            </div>
            <p style={{ margin: "20px 0 0", fontSize: 12.5, color: T.muted, fontFamily: SANS }}>
              Free · About 15 minutes · With our implant care coordinator
            </p>
            <a href={GOOGLE.url} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 22, fontFamily: SANS, fontSize: 13.5, fontWeight: 600, color: T.navy, textDecoration: "none" }}>
              <Stars />
              <span>{GOOGLE.rating} on Google</span>
              <span style={{ fontWeight: 400, color: T.inkSoft, textDecoration: "underline", textUnderlineOffset: 3 }}>{GOOGLE.count} reviews</span>
            </a>
          </div>
          <div className="hero-media" style={{ borderRadius: R.panel, overflow: "hidden", aspectRatio: "5 / 4", background: T.navy, boxShadow: "0 30px 70px -30px rgba(14,34,64,0.38)" }}>
            <video autoPlay muted loop playsInline poster="/primary-hero-poster.jpg" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
              <source src="/primary-hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <SectionNav items={NAV_ITEMS} ctaHref={CONSULT} ctaLabel="Free virtual consult" />

      {/* WHY IMPLANTS: what a fixed full arch changes. Answers "why this, and not
          another patch or a denture" before any proof or process. */}
      <section id="why-implants" className="imp-sec">
        <div className="why-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 72, alignItems: "start" }}>
          <div className="why-head">
            <p className="eb" style={eyebrow}>Why implants</p>
            <h2 style={h2}>
              What fixed teeth <em style={em}>give you back.</em>
            </h2>
            <p style={{ ...lead, margin: "0 0 28px" }}>
              A fixed full arch is a full set of teeth attached to four to six implants. They stay in. Here is what that means day to day.
            </p>
            <a href={CONSULT} style={{ ...btn, background: T.navy, color: "#FFFFFF" }}>Book a free virtual consult</a>
          </div>
          <dl style={{ margin: 0 }}>
            {WHY_IMPLANTS.map((w, i) => (
              <div key={i} className="why-row" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 28, padding: "22px 0", borderTop: `1px solid ${i === 0 ? T.navy : T.line}` }}>
                <dt style={{ ...h3, fontSize: 21 }}>{w.head}</dt>
                <dd style={{ ...small, fontSize: 15.5, lineHeight: 1.62, margin: 0 }}>{w.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* PATIENT STORIES */}
      <section id="patient-stories" className="imp-sec" style={{ borderTop: `1px solid ${T.line}`, paddingLeft: 0, paddingRight: 0 }}>
        <div className="imp-gutter" style={{ maxWidth: 1156, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ maxWidth: 720, marginBottom: 34 }}>
            <p className="eb" style={eyebrow}>Smile and life stories</p>
            <h2 style={h2}>
              Meet Peter, Dorothy <em style={em}>and Jordan.</em>
            </h2>
            <p style={lead}>
              Each of them had full-arch implants with Dr. Gabi. Each tells the story in about a minute.
            </p>
          </div>
        </div>

        {/* One story at a time, full width. Swipe, scroll sideways or use the arrows. */}
        <StoryReel stories={PATIENT_STORIES} />

        <div className="imp-gutter" style={{ maxWidth: 1156, margin: "0 auto", padding: "0 28px" }}>
          <p style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.6, color: T.muted, margin: "26px 0 0", maxWidth: 760 }}>
            Actual patients of Primary Integrative Dentistry, photographed after fixed full-arch implant treatment. The tablet each one holds shows the same patient before treatment. Results may not occur for all patients.
          </p>

          <div className="reviews-head" style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "10px 24px", margin: "84px 0 26px" }}>
            <h3 style={{ ...h3, fontSize: 24, display: "inline-flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <Stars size={18} />
              <span>{GOOGLE.rating} from {GOOGLE.count} Google reviews</span>
            </h3>
            <a href={GOOGLE.url} target="_blank" rel="noopener" style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: T.navy, textDecoration: "underline", textDecorationColor: "rgba(14,34,64,0.3)", textUnderlineOffset: 4 }}>
              Read them all on Google →
            </a>
          </div>
        </div>

        {/* Reviews scroll slowly from right to left. They pause on hover, on
            keyboard focus and with the Pause control, and hold still (and can
            be swiped) for visitors who ask for reduced motion. The second copy
            of the cards exists only to make the loop seamless. */}
        <div className="rv">
          <div className="rv-wrap">
            <div className="rv-track">
              {[0, 1].map(copy => (
                <div key={copy} className="rv-set" aria-hidden={copy === 1}>
                  {REVIEWS.map(rv => (
                    <figure key={rv.name} className="rv-card" style={{ ...card, margin: 0, padding: "24px 26px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                      <Stars />
                      <blockquote style={{ margin: 0, fontFamily: SERIF, fontSize: 17, lineHeight: 1.55, color: T.navy }}>
                        &ldquo;{rv.quote}&rdquo;
                      </blockquote>
                      <figcaption style={{ marginTop: "auto", fontFamily: SANS, fontSize: 13, fontWeight: 600, color: T.navy }}>
                        {rv.name} <span style={{ fontWeight: 400, color: T.muted }}>· Google review</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="imp-gutter" style={{ maxWidth: 1156, margin: "0 auto", padding: "0 28px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px 24px", marginTop: 22 }}>
            <p style={{ fontFamily: SANS, fontSize: 12, color: T.muted, margin: 0 }}>
              Reviews from our Google profile, shown as written. Results may not occur for all patients.
            </p>
            <label htmlFor="rv-pause" className="rv-pause" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: T.inkSoft, cursor: "pointer" }}>
              <input id="rv-pause" type="checkbox" style={{ width: 15, height: 15 }} />
              Pause the reviews
            </label>
          </div>
        </div>
      </section>

      {/* DR. GABI: who does the work. His note and his credentials in one place,
          after the stories: they are the promise, he is the reason to believe. */}
      <section id="dr-gabi" className="imp-sec" style={{ borderTop: `1px solid ${T.line}` }}>
        <div className="doc-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <figure style={{ margin: 0 }}>
            <YouTubeFacade id={MEET_DOCTOR_VIDEO.id} title={MEET_DOCTOR_VIDEO.title} poster={MEET_DOCTOR_VIDEO.poster} />
            <figcaption style={{ fontFamily: SANS, fontSize: 12.5, lineHeight: 1.55, color: T.muted, marginTop: 14 }}>
              Dr. Gabi with Dorothy, whose story is above. Press play to meet him.
            </figcaption>
          </figure>

          <div>
            <p className="eb" style={eyebrow}>Your doctor</p>
            <h2 style={h2}>
              Meet Dr.&nbsp;Gabi, <em style={em}>the prosthodontist who does your surgery.</em>
            </h2>
            <p style={{ ...lead, margin: "0 0 16px" }}>
              Replacing a full arch of teeth is surgery, a new bite and a new set of teeth, and all three have to work together for years. That is what a prosthodontist is trained to do.
            </p>
            <p style={{ ...lead, margin: 0 }}>
              People with harder cases come to him for the same reason: very little bone, diabetes, an autoimmune condition, bone-density medication, or implants that failed somewhere else. He will also tell you if implants are not the right call for you.
            </p>
          </div>
        </div>

        <div className="doc-facts" style={{ maxWidth: 1100, margin: "64px auto 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {DOCTOR_FACTS.map((f, i) => (
            <div key={i} style={{ borderTop: `1px solid ${T.navy}`, paddingTop: 18 }}>
              <div style={{ ...h3, fontSize: 23, lineHeight: 1.18, marginBottom: 10 }}>{f.head}</div>
              <div style={{ ...small, fontSize: 14.5, lineHeight: 1.6 }}>{f.body}</div>
            </div>
          ))}
        </div>

        <figure className="doc-note" style={{ ...card, borderRadius: R.panel, maxWidth: 1100, margin: "56px auto 0", padding: "36px 40px", display: "grid", gridTemplateColumns: "88px 1fr", gap: 32, alignItems: "start" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/image.png"
            alt="Dr. Tzur Gabi"
            loading="lazy"
            style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", objectPosition: "50% 18%", display: "block" }}
          />
          <div>
            <blockquote style={{ margin: 0 }}>
              <p style={{ fontFamily: SERIF, fontSize: 20, lineHeight: 1.55, color: T.inkSoft, margin: "0 0 14px" }}>
                If you&apos;re reading this, you have probably been putting up with your teeth for longer than you wanted to. You chew on one side and think before you smile. You may already have a treatment plan from another office that felt overwhelming.
              </p>
              <p style={{ fontFamily: SERIF, fontSize: 20, lineHeight: 1.55, color: T.navy, margin: "0 0 18px" }}>
                It is usually simpler than it looks, and you have more say in it than you may have been told. Come in and I&apos;ll show you where you stand.
              </p>
            </blockquote>
            <figcaption style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: T.muted, letterSpacing: "0.04em" }}>
              Dr. Tzur Gabi, prosthodontist and founder
            </figcaption>
          </div>
        </figure>
      </section>

      {/* FOUR OPTIONS */}
      <section id="options" className="imp-sec" style={{ borderTop: `1px solid ${T.line}` }}>
        <div className="opt-wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ImplantIllustrationStyles />
          <div className="options-head" style={{ display: "grid", gridTemplateColumns: "1fr 440px", gap: 56, alignItems: "center", marginBottom: 56 }}>
            <div>
              <p className="eb" style={eyebrow}>Your options</p>
              <h2 style={h2}>
                The four types of <em style={em}>implant treatment.</em>
              </h2>
              <p style={{ ...lead, margin: "0 0 16px" }}>
                Which one fits depends on how many teeth are missing and how you want to live with them day to day. Dr. Gabi will tell you which he recommends for you, and why.
              </p>
              <p style={small}>
                All four use the same three parts: a post in the jaw, a connector, and the tooth you see.
              </p>
            </div>
            <ImplantAnatomy />
          </div>

          {/* Material switch: recolours the post in every drawing (CSS only). */}
          <fieldset className="mat-switch" style={{ border: 0, padding: 0, margin: "0 0 22px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 16px" }}>
            <legend style={{ float: "left", padding: 0, marginRight: 4, fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted }}>
              See the implant post in
            </legend>
            <span className="mat-seg" style={{ display: "inline-flex", background: T.warm, border: `1px solid ${T.line}`, borderRadius: R.pill, padding: 3 }}>
              <label htmlFor="mat-ti" className="mat-opt"><input id="mat-ti" type="radio" name="post-material" defaultChecked /><span><i style={{ background: MAT.ti.fill }} />Titanium</span></label>
              <label htmlFor="mat-zr" className="mat-opt"><input id="mat-zr" type="radio" name="post-material" /><span><i style={{ background: MAT.zr.fill }} />Zirconia</span></label>
            </span>
            <span className="mat-note mat-note-ti" style={{ ...small, fontSize: 14 }}>The long-established standard for implant posts.</span>
            <span className="mat-note mat-note-zr" style={{ ...small, fontSize: 14 }}>A white ceramic, for a metal-free implant.</span>
          </fieldset>

          <div className="options-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {OPTIONS.map((opt, i) => (
              <div key={i} style={{ ...card, borderRadius: R.panel, padding: "14px 14px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                <ImplantIllustration scene={opt.scene} delay={i * 0.7} />
                <h3 style={{ ...h3, fontSize: 20, padding: "4px 8px 0" }}>{opt.name}</h3>
                <p style={{ ...small, fontSize: 14.5, padding: "0 8px" }}>{opt.def}</p>
                <div style={{ margin: "auto 8px 0", paddingTop: 14, borderTop: `1px solid ${T.line}`, display: "grid", gap: 12 }}>
                  <div>
                    <div style={{ ...eyebrow, fontSize: 10, margin: "0 0 8px" }}>Made from</div>
                    <div style={{ display: "grid", gap: 6, minHeight: 62, alignContent: "start" }}>
                      {opt.made.map(([part, mats]) => (
                        <div key={part} style={{ display: "grid", gridTemplateColumns: "42px 1fr", gap: 8, alignItems: "baseline" }}>
                          <span style={{ fontFamily: SANS, fontSize: 12.5, color: T.muted }}>{part}</span>
                          <span style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px" }}>
                            {mats.map(m => (
                              <span key={m} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: SANS, fontSize: 13, fontWeight: 500, color: T.navy, whiteSpace: "nowrap" }}>
                                <i aria-hidden="true" style={{ width: 11, height: 11, borderRadius: R.pill, background: MAT[m].fill, border: "1px solid rgba(14,34,64,0.4)", display: "inline-block" }} />
                                {MAT[m].label}
                              </span>
                            ))}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ ...eyebrow, fontSize: 10, margin: "0 0 4px" }}>Best for</div>
                    <div style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.45, color: T.navy }}>{opt.when}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* What a full set of teeth can be made of */}
          <div className="teeth-mat" style={{ ...card, borderRadius: R.panel, padding: "32px 32px 30px", marginTop: 28 }}>
            <div className="teeth-mat-grid" style={{ display: "grid", gridTemplateColumns: "0.9fr 1fr 1fr 1fr", gap: 28, alignItems: "start" }}>
              <div>
                <p className="eb" style={{ ...eyebrow, margin: "0 0 12px" }}>Materials</p>
                <h3 style={{ ...h3, fontSize: 24, margin: "0 0 10px" }}>What your new teeth can be made of.</h3>
                <p style={{ ...small, fontSize: 14.5 }}>For a full set of teeth there are three common choices. Dr. Gabi will recommend one for your case.</p>
              </div>
              {TEETH_MATERIALS.map(m => (
                <div key={m.kind}>
                  <TeethMaterial kind={m.kind} />
                  <div style={{ ...h3, fontSize: 19, margin: "14px 0 6px" }}>{m.name}</div>
                  <p style={{ ...small, fontSize: 14 }}>{m.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* All-on-4 explainer video */}
          <div className="explainer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: 48, alignItems: "center", marginTop: 72 }}>
            <div>
              <p style={{ ...eyebrow, margin: "0 0 12px" }}>Watch · {EXPLAINER_VIDEO.length}</p>
              <h3 style={{ ...h3, fontSize: "clamp(20px, 2.4vw, 26px)", margin: "0 0 14px" }}>
                {EXPLAINER_VIDEO.title}.
              </h3>
              <p style={small}>
                Most people ask about All-on-4 first. This two-minute video explains how it works and what happens on the day of surgery.
              </p>
            </div>
            <YouTubeFacade
              id={EXPLAINER_VIDEO.id}
              title={EXPLAINER_VIDEO.title}
              duration={EXPLAINER_VIDEO.length}
              label="Watch the explainer"
              cover={<VideoCover kicker="All-on-4, explained" scene="fixed" />}
            />
          </div>
        </div>
      </section>

      {/* COST. No treatment prices. Three parts: what decides the price (the
          written plan, drawn as a page with five lines), monthly payments
          through one application, and the scholarship and the membership.
          Every button here opens the one consult card on its paying side. */}
      <section id="paying-for-it" className="imp-sec" style={{ borderTop: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <p className="eb" style={eyebrow}>Cost</p>
            <h2 style={h2}>
              What will this cost me, <em style={em}>and can I afford it?</em>
            </h2>
            <p style={lead}>
              You will have your full price in writing before you agree to anything. We can&rsquo;t put it on a web page, because it depends on what Dr. Gabi finds when he examines you. What we can show you now is what goes into it and how people pay for it, including after a lender has said no.
            </p>
          </div>

          {/* THE PLAN: five lines, amounts blank */}
          <div className="cost-row" style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 56, alignItems: "start" }}>
            <div>
              <p className="cost-step" style={eyebrow}>Your price</p>
              <h3 style={{ ...h3, fontSize: 28, lineHeight: 1.18, margin: "0 0 16px" }}>The five things that decide it</h3>
              <p style={{ ...small, fontSize: 16, lineHeight: 1.65, margin: "0 0 14px" }}>
                Every implant plan is priced on the same five things. Tap each one to see what it means. Yours are filled in after Dr. Gabi has examined you and looked at your scan.
              </p>
              <p style={{ ...small, fontSize: 16, lineHeight: 1.65 }}>
                The plan is yours to take home. It says what is included and what is not, and you are under no obligation to go ahead.
              </p>
            </div>

            <div className="sheet" style={{ background: "#FFFFFF", border: `1px solid ${T.line}`, borderRadius: R.panel, padding: "26px 30px 24px", boxShadow: "0 30px 70px -44px rgba(14,34,64,0.4)" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, paddingBottom: 14, borderBottom: `1px solid ${T.navy}` }}>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, color: T.navy }}>Your treatment plan</span>
                <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted }}>Tap a line</span>
              </div>
              {COST_FACTORS.map((f, i) => (
                <details key={i} className="sheet-line" name="cost-line" open={i === 0}>
                  <summary>
                    <span className="sheet-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="sheet-name">{f.name}</span>
                    <span className="sheet-amt" aria-hidden="true" />
                  </summary>
                  <p className="sheet-why">{f.why}</p>
                </details>
              ))}
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, paddingTop: 16, borderTop: `1px solid ${T.navy}` }}>
                <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: T.navy }}>Your total</span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: T.blue, textAlign: "right" }}>in writing, at your consultation</span>
              </div>
            </div>
          </div>

          {/* FINANCING: one application, every lender path */}
          <div id="financing" className="cost-row cost-gap" style={{ display: "grid", gridTemplateColumns: "1.18fr 0.82fr", gap: 56, alignItems: "center", marginTop: 104, scrollMarginTop: 96 }}>
            <div>
              <p className="cost-step" style={eyebrow}>Monthly payments</p>
              <h3 style={{ ...h3, fontSize: 34, lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
                Haven&rsquo;t been approved before? <em style={em}>We&rsquo;ve got you covered.</em>
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: 20, lineHeight: 1.45, color: T.navy, margin: "0 0 16px" }}>
                One application. Every lender path.
              </p>
              <p style={{ ...small, fontSize: 16, lineHeight: 1.65, margin: "0 0 22px", maxWidth: "54ch" }}>
                If one lender turned you down, that was one lender. Here you fill in one application and it goes to several. A no from one of them is not a no from all of them.
              </p>
              <ul className="cost-ticks" style={{ listStyle: "none", padding: 0, margin: "0 0 26px", display: "grid", gap: 12, maxWidth: "54ch" }}>
                {[
                  "One form, a few minutes, from your phone.",
                  "Seeing your options does not affect your credit score.",
                  "You see every offer side by side and pick the one that fits. Or none of them.",
                  "If no lender says yes, we sit down with you and go through the other ways to pay.",
                ].map((t, i) => (
                  <li key={i} style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.55, color: T.navy, display: "grid", gridTemplateColumns: "18px 1fr", gap: 12, alignItems: "start" }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ marginTop: 3 }}><path d="M3.5 9.5l3.4 3.4 7.6-8" stroke={T.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {t}
                  </li>
                ))}
              </ul>
              <a href={CONSULT} data-consult-track="financing" style={{ ...btn, background: T.navy, color: "#FFFFFF" }}>See my payment options</a>
              <p style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.6, color: T.muted, margin: "20px 0 0", maxWidth: "58ch" }}>
                Financing comes from outside lenders and depends on their approval and terms. Lenders we work with include CareCredit, Cherry, Proceed, Alphaeon and Wisetack.
              </p>
            </div>
            <div className="lp-wrap" style={{ maxWidth: 420, width: "100%", justifySelf: "center" }}>
              <LenderPaths />
            </div>
          </div>

          {/* SCHOLARSHIP, MEMBERSHIP, INSURANCE */}
          <div className="cost-gap" style={{ marginTop: 104 }}>
            <p className="cost-step" style={eyebrow}>More help with cost</p>
            <h3 style={{ ...h3, fontSize: 28, lineHeight: 1.18, margin: "0 0 28px" }}>The scholarship and the membership</h3>

            <HelpWithCost consultHref={CONSULT} />

            <p style={{ ...small, fontSize: 15, lineHeight: 1.65, margin: "26px 0 0", maxWidth: "74ch" }}>
              <span style={{ fontWeight: 600, color: T.navy }}>Have dental insurance?</span> Most dental plans cover only a small part of implant treatment. We check your benefits and file the claim for you. Medical insurance sometimes helps too.
            </p>
          </div>
        </div>
      </section>

      {/* AM I A CANDIDATE: the four things Dr. Gabi asks before he plans */}
      <section id="candidate" className="imp-sec" style={{ borderTop: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="anchor-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 64, alignItems: "center" }}>
            <div>
              <p className="eb" style={eyebrow}>Is it right for you</p>
              <h2 style={{ ...h2, margin: "0 0 24px" }}>
                Am I a candidate <em style={em}>for implants?</em>
              </h2>
              <p style={{ ...lead, margin: "0 0 20px" }}>
                Being told you don&rsquo;t have enough bone is not always the end of it. Dr. Gabi decides after a 3D scan and a look at your health, because how well an implant lasts depends on both.
              </p>
              <p style={{ ...lead, color: T.navy, margin: "0 0 28px" }}>
                He asks four things. Your answers can change the plan.
              </p>
              <Link href="/five-dimensions/" style={{ fontFamily: SANS, fontSize: 14, color: T.navy, textDecoration: "underline", textDecorationColor: "rgba(14,34,64,0.3)", textUnderlineOffset: 4, fontWeight: 600 }}>
                See everything we look at →
              </Link>
            </div>

            <div style={{ background: T.cream, border: `1px solid ${T.line}`, borderRadius: R.panel, padding: "8px 30px" }}>
              {CHECKS.map((c, i) => (
                <div key={i} style={{ padding: "22px 0", borderTop: i === 0 ? "none" : `1px solid ${T.line}` }}>
                  <h3 style={{ ...h3, fontSize: 18, margin: "0 0 8px" }}>{c.q}</h3>
                  <p style={small}>{c.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY (no durations) */}
      <section id="what-happens" className="imp-sec" style={{ borderTop: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <p className="eb" style={eyebrow}>What to expect</p>
            <h2 style={h2}>
              What happens, <em style={em}>step by step.</em>
            </h2>
            <p style={lead}>
              This is the process from your first visit to your final teeth. Some people have it done in fewer visits, including same-day teeth. Others need a few months between steps. Dr. Gabi will tell you which applies to you at your consultation.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {JOURNEY.map((step, i) => (
              <div key={i} className="journey-row" style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 28 }}>
                <div style={{ width: 64, height: 64, borderRadius: R.card, background: T.warm, color: T.navy, border: `1px solid ${T.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 24, flexShrink: 0 }}>
                  {step.n}
                </div>
                <div>
                  <p style={{ ...eyebrow, margin: "0 0 8px" }}>Step {step.n}</p>
                  <h3 style={{ ...h3, fontSize: "clamp(19px, 2.2vw, 22px)", margin: "0 0 12px" }}>{step.name}</h3>
                  <p style={{ ...small, margin: 0, maxWidth: "70ch" }}>{step.body}</p>
                  {step.n === "04" ? (
                    <div style={{ maxWidth: 520, marginTop: 24 }}>
                      <p style={{ ...eyebrow, margin: "0 0 10px" }}>Watch · {POST_OP_VIDEO.title} · {POST_OP_VIDEO.length}</p>
                      <YouTubeFacade
                        id={POST_OP_VIDEO.id}
                        title={POST_OP_VIDEO.title}
                        duration={POST_OP_VIDEO.length}
                        label="Watch the guide"
                        cover={<VideoCover kicker="Care guide" title="After surgery:" accent="your care guide." scene="fixed" />}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GET STARTED: the one place the page asks for something. One card, two
          ways in (about my teeth, about paying for it). Not wired yet. */}
      <section id="virtual-consult" className="imp-sec" style={{ borderTop: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="anchor-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 64, alignItems: "center" }}>
            <div>
              <p className="eb" style={eyebrow}>Get started</p>
              <h2 style={{ ...h2, margin: "0 0 24px" }}>
                Start with a <em style={em}>free virtual consult.</em>
              </h2>
              <p style={{ ...lead, margin: "0 0 20px" }}>
                It is a 15-minute video call with our implant care coordinator. Ask about your options, what the process involves, or how to pay for it. If cost is the main thing on your mind, start there.
              </p>
              <p style={{ ...lead, margin: "0 0 20px" }}>
                It is not an exam, so it does not replace a visit with Dr. Gabi. We never ask for your Social Security number or your income here.
              </p>
              <p style={small}>
                Prefer the phone? Call us at <a href={PHONE_HREF} style={{ color: T.navy, fontWeight: 700 }}>{PHONE_DISPLAY}</a>.
              </p>
            </div>
            <ConsultStart />
          </div>
        </div>
      </section>

      {/* COMPARING OFFICES: seven questions to ask anywhere, then the second opinion */}
      <section id="compare" className="imp-sec" style={{ borderTop: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <p className="eb" style={eyebrow}>Comparing offices</p>
            <h2 style={h2}>
              Seven questions to ask <em style={em}>any office.</em>
            </h2>
            <p style={lead}>
              If you are getting more than one opinion, these are worth asking at each office. Here are our answers.
            </p>
          </div>

          <div style={{ ...card, overflow: "hidden" }}>
            <div className="q-row q-head" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", borderBottom: `2px solid ${T.navy}` }}>
              <div style={{ ...eyebrow, color: T.muted, margin: 0, padding: "16px 24px" }}>Ask</div>
              <div style={{ ...eyebrow, margin: 0, padding: "16px 24px" }}>How we answer</div>
            </div>
            {QUESTIONS.map(([question, answer], i) => (
              <div key={i} className="q-row" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", borderBottom: i < QUESTIONS.length - 1 ? `1px solid ${T.line}` : "none" }}>
                <div style={{ ...h3, fontSize: 16, padding: "20px 24px" }}>{question}</div>
                <div className="q-answer" style={{ ...small, padding: "20px 24px", background: "rgba(36,167,224,0.04)" }}>{answer}</div>
              </div>
            ))}
          </div>

          <div className="second-row" style={{ ...card, borderRadius: R.panel, marginTop: 28, padding: "32px 36px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px 40px" }}>
            <div style={{ flex: "1 1 420px" }}>
              <h3 style={{ ...h3, fontSize: 24, margin: "0 0 10px" }}>Already have a treatment plan?</h3>
              <p style={{ ...small, maxWidth: "62ch" }}>
                Many of our full-arch patients come to us with a plan from another office. Dr. Gabi will go through it with you and tell you what he agrees with, what he would do differently, and why. Sometimes the first plan is the right one, and he will say so.
              </p>
            </div>
            <a href="/book/second-opinion/" style={{ ...btn, ...ghost }}>
              Bring your treatment plan for a second opinion →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="imp-sec" style={{ borderTop: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 36 }}>
            <p className="eb" style={eyebrow}>FAQ</p>
            <h2 style={h2}>
              Common <em style={em}>questions.</em>
            </h2>
            <p style={lead}>
              If yours isn&apos;t here, call us at {PHONE_DISPLAY}.
            </p>
          </div>

          <div className="imp-faq">
            {FAQ_ITEMS.map((f, i) => (
              <details key={i} style={{ borderTop: i === 0 ? `1px solid ${T.line}` : "none", borderBottom: `1px solid ${T.line}`, padding: "22px 0" }}>
                <summary style={{ ...h3, fontSize: 17, cursor: "pointer" }}>
                  {f.q}
                </summary>
                <p style={{ ...small, marginTop: 14 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSE: the one navy band on the page. The campaign first, then the one action. */}
      <section id="things-we-miss" className="imp-sec" style={{ background: T.navy, color: "#FFFFFF" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)", margin: "0 0 44px" }}>
            The Things We Miss<span style={{ fontSize: "0.7em", verticalAlign: "top", letterSpacing: 0 }}>™</span>
          </h2>

          <ThingsWeMiss frames={MISS_FRAMES} />

          <div className="close-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px 40px", marginTop: 64, paddingTop: 44, borderTop: "1px solid rgba(255,255,255,0.16)" }}>
            <div style={{ flex: "1 1 380px" }}>
              <p style={{ fontFamily: SERIF, fontSize: "clamp(26px, 3vw, 36px)", lineHeight: 1.14, letterSpacing: "-0.02em", color: "#FFFFFF", margin: "0 0 12px" }}>
                Find out where you stand, <em style={{ ...em, color: T.blueSoft }}>from home.</em>
              </p>
              <p style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.6, color: T.onNavy, margin: 0, maxWidth: "56ch" }}>
                The virtual consult is about 15 minutes with our implant care coordinator. Already have a treatment plan?{" "}
                <a href="/book/second-opinion/" style={{ color: "#FFFFFF", textUnderlineOffset: 3 }}>Bring it in for a second opinion</a>.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={CONSULT} style={{ ...btn, background: T.blue, color: "#FFFFFF" }}>
                Book a free virtual consult
              </a>
              <a href={PHONE_HREF} style={{ ...btn, background: "#FFFFFF", color: T.navy }}>
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .imp-sec { padding: 104px 28px; }
        html { scroll-behavior: smooth; }
        .imp-sec[id], #financing, #scholarship { scroll-margin-top: 76px; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
        .sheet-line { border-bottom: 1px solid rgba(14,34,64,0.12); }
        .sheet-line summary { display: grid; grid-template-columns: 26px 1fr 64px; gap: 12px; align-items: baseline; padding: 15px 0; cursor: pointer; list-style: none; }
        .sheet-line summary::-webkit-details-marker { display: none; }
        .sheet-line summary:focus-visible { outline: 3px solid #24A7E0; outline-offset: 2px; border-radius: 4px; }
        .sheet-n { font-family: ${SANS}; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: #7A8695; }
        .sheet-name { font-family: ${SERIF}; font-size: 18.5px; line-height: 1.3; letter-spacing: -0.01em; color: #0E2240; transition: color 140ms cubic-bezier(0.16, 1, 0.3, 1); }
        .sheet-line summary:hover .sheet-name, .sheet-line[open] .sheet-name { color: #24A7E0; }
        .sheet-amt { justify-self: end; width: 56px; height: 0; border-bottom: 1.5px dashed rgba(14,34,64,0.3); transform: translateY(-4px); }
        .sheet-why { font-family: ${SANS}; font-size: 14.5px; line-height: 1.6; color: #3a4a66; margin: 0; padding: 0 76px 18px 38px; }
        .eb { display: flex; align-items: center; gap: 12px; }
        .eb::before { content: ""; width: 26px; height: 1px; background: #24A7E0; flex-shrink: 0; }
        .eb-c { justify-content: center; }
        /* material switch */
        .mat-opt { cursor: pointer; }
        .mat-opt input { position: absolute; opacity: 0; width: 1px; height: 1px; }
        .mat-opt span { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-montserrat), 'Montserrat', Arial, sans-serif; font-size: 13.5px; font-weight: 600; color: #3a4a66; padding: 8px 16px 8px 12px; border-radius: 999px; transition: background .2s ease, color .2s ease; }
        .mat-opt i { width: 13px; height: 13px; border-radius: 999px; border: 1px solid rgba(14,34,64,0.4); display: inline-block; }
        .mat-opt input:checked + span { background: #0E2240; color: #FFFFFF; }
        .mat-opt input:focus-visible + span { outline: 3px solid #24A7E0; outline-offset: 2px; }
        .mat-note-zr { display: none; }
        .opt-wrap:has(#mat-zr:checked) .mat-note-ti { display: none; }
        .opt-wrap:has(#mat-zr:checked) .mat-note-zr { display: inline; }
        /* scrolling reviews */
        .rv-wrap { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
        .rv-track { display: flex; width: max-content; animation: rv-scroll 60s linear infinite; }
        .rv-set { display: flex; gap: 20px; padding-right: 20px; }
        .rv-card { width: 400px; flex-shrink: 0; }
        .rv-wrap:hover .rv-track, .rv-wrap:focus-within .rv-track, .rv:has(#rv-pause:checked) .rv-track { animation-play-state: paused; }
        @keyframes rv-scroll { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .rv-track { animation: none; }
          .rv-wrap { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
          .rv-set[aria-hidden="true"], .rv-pause { display: none !important; }
        }
        .imp-faq summary { list-style: none; display: flex; justify-content: space-between; align-items: baseline; gap: 20px; }
        .imp-faq summary::-webkit-details-marker { display: none; }
        .imp-faq summary::after { content: "+"; font-family: Georgia, serif; font-weight: 400; font-size: 24px; line-height: 1; color: #24A7E0; flex-shrink: 0; }
        .imp-faq details[open] summary::after { content: "\\2212"; }
        .imp-faq summary:focus-visible { outline: 3px solid #24A7E0; outline-offset: 4px; border-radius: 8px; }
        @media (max-width: 980px) {
          .anchor-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .note-grid { grid-template-columns: 220px 1fr !important; gap: 36px !important; }
          .options-grid { grid-template-columns: 1fr 1fr !important; }
          .options-head { grid-template-columns: 1fr !important; gap: 32px !important; }
          .explainer-grid { grid-template-columns: 1fr !important; gap: 28px !important; margin-top: 56px !important; }
          .cost-row { grid-template-columns: 1fr !important; gap: 36px !important; }
          .doc-grid, .why-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .doc-facts { grid-template-columns: 1fr 1fr !important; gap: 28px 24px !important; margin-top: 44px !important; }
          .cost-gap { margin-top: 72px !important; }
          .lp-wrap { justify-self: start !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .teeth-mat-grid { grid-template-columns: 1fr 1fr 1fr !important; }
          .teeth-mat-grid > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 759px) {
          .imp-sec { padding: 64px 20px; }
          .imp-hero { padding: 40px 20px 64px !important; }
          .imp-gutter { padding-left: 20px !important; padding-right: 20px !important; }
          .rv-card { width: 300px; }
          .teeth-mat { padding: 24px 20px !important; }
          .teeth-mat-grid { grid-template-columns: 1fr !important; }
          .note-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .note-photo { max-width: 240px; }
          .sheet { padding: 22px 20px 20px !important; }
          .doc-facts { grid-template-columns: 1fr !important; }
          .why-row { grid-template-columns: 1fr !important; gap: 8px !important; padding: 18px 0 !important; }
          .doc-note { grid-template-columns: 1fr !important; gap: 20px !important; padding: 28px 24px !important; }
          .sheet-line summary { grid-template-columns: 22px 1fr 40px; gap: 10px; }
          .sheet-amt { width: 36px; }
          .sheet-why { padding: 0 8px 16px 32px; }
          .q-row { grid-template-columns: 1fr !important; }
          .q-head { display: none !important; }
          .q-row > div:first-child { padding-bottom: 6px !important; }
          .q-answer { padding-top: 6px !important; background: transparent !important; }
        }
        @media (max-width: 640px) {
          .options-grid { grid-template-columns: 1fr !important; }
          .journey-row { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>

      <SiteFooter />
      <MobileStickyCTA bookHref={CONSULT} bookLabel="Free virtual consult" />
    </div>
  )
}
