---
name: primary-brand-os
description: "Brand OS for Primary / Primary iD — Dr. Tzur Gabi's integrative dentistry practice in Brentwood, Los Angeles. Load this BEFORE producing ANY Primary asset — landing pages, HTML docs, decks, ad copy, video scripts, emails, one-pagers, strategy documents, partner materials. Contains the locked design tokens, type system, voice rules, Dr. Gabi authority guidance, and California/Meta advertising compliance rails. Triggers on \"Primary\", \"Primary iD\", \"Primary iD+\", \"myprimaryid\", \"Tzur\", \"Dr. Gabi\", \"Dr. Tzur Gabi\", \"five dimensions\", \"AirFlex at Primary\", \"OrthoFX x Primary\", \"oral-systemic\", or any request to build, write, design or review something for Primary."
---

# Primary iD — Brand OS

**Read this before writing a line of code or copy for Primary. Every time.**

If you are producing anything Primary-branded and you have not applied the tokens in §1 and the voice rules in §3, stop and apply them. Drift is the single most common failure on this account.

**There are no open questions in this file.** Everything here is decided — apply it. Do not ask Farhad to re-confirm the type pair, the palette or the radii, and do not improvise a variant because a different combination appears in an older document. Where a source document disagrees with this file, this file wins and that document is stale.

---

## 1. Design tokens — locked

Paste this block into every HTML asset. Do not substitute, approximate, or invent values.

```css
:root{
  /* core */
  --navy:#0E2240; --navy-deep:#07142A; --blue:#24A7E0; --blue-soft:#5BC0EC;
  --cream:#FAF8F5; --warm:#FEFCF9;

  /* text ramp — these exact values, per the Aug 2026 drift audit */
  --ink:#121a2b; --ink-soft:#3a4a66; --muted:#7A8695;
  --line:rgba(14,34,64,.12); --line-soft:rgba(14,34,64,.06);

  /* dimension tokens — TAGGING & DATA VIZ ONLY, never general UI accent */
  --d-oral:#D4B584;       /* Gold   · Oral health */
  --d-sleep:#7B68EE;      /* Purple · Sleep & airway */
  --d-nutrition:#48C28C;  /* Green  · Nutrition */
  --d-family:#E8985E;     /* Peach  · Family history */
  --d-longevity:#D97757;  /* Rose   · Longevity */

  /* semantic states — named separately even where the hex matches a dimension */
  --success:#48C28C; --warning:#E8985E; --danger:#D97757;
  --danger-tint:rgba(217,119,87,.12);

  /* radius — four steps. Anything else is a bug. */
  --r-chip:8px; --r-card:16px; --r-panel:24px; --r-pill:999px;

  /* type — Montserrat display / Georgia body. Locked 13 Sep 2026. */
  --display:"Montserrat","Helvetica Neue",Arial,sans-serif;
  --sans:"Montserrat","Helvetica Neue",Arial,sans-serif;
  --serif:Georgia,"Times New Roman",serif;
  --mono:"JetBrains Mono",ui-monospace,Menlo,monospace;
}
```

Font link for HTML assets. Georgia is a system face — do **not** request it from Google:

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Never ship these colours:** `#4a4a5a`, `#8a8a9a`, `#000000`, `#c7305a`, `#e05b5b`, `#640000`, `#fbe8e8`, `#fcf0e4`. These are known drift values. Map them to `--ink-soft`, `--muted`, `--ink`, `--danger`, `--danger`, `--danger`, `--danger-tint`, `warning @14%`.

**Never ship these typefaces:** Fraunces, Inter, Geist, Space Grotesk, or bare `system-ui` as a primary face. All have appeared on Primary work in error. Montserrat and Georgia only, with JetBrains Mono for data and citations.

**Radius:** only 8 / 16 / 24 / 999px, plus 50% for avatars. The site has shipped 14 distinct radii; do not add a fifteenth.

---

## 2. Type system

The pairing is **Montserrat for structure, Georgia for reading.** Montserrat carries headings, labels, buttons and UI chrome. Georgia carries body copy, numbers, and the one italic phrase per screen. Do not invert these roles.

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Display / H1 | **Montserrat** | 600 | `clamp(33px,4.6vw,54px)` | tracking −.025em · lh 1.10 |
| Section H2 | **Montserrat** | 600 | `clamp(24px,3.3vw,35px)` | tracking −.02em |
| H3 / card title | **Montserrat** | 600 | 17–20px | tracking −.01em |
| Body | **Georgia** | 400 | 16–18px | lh 1.62 · `--ink-soft` · measure ≤ 66ch |
| **Emphasis phrase** | **Georgia *italic*** | 400 | inherit | **`--blue` · ONCE per screen** |
| Eyebrow / label | Montserrat | 600 | 10–11px | uppercase · .14em · `--blue` |
| Button | Montserrat | 600 | 14–15px | tracking .02em |
| Data / metric | **Georgia** | 400 | 30–74px | numbers stay in Georgia · add `font-variant-numeric:lining-nums tabular-nums` in tables and stat tiles, or Georgia's old-style figures will misalign |
| Caption / citation | JetBrains Mono | 400 | 11–12px | `--muted` |

Two optical corrections this pairing always needs: Montserrat runs large and loose at display sizes — set negative tracking on every heading and keep line-height tight. Georgia runs small — set body one step larger than you would for a grotesque, 16px minimum.

### The signature pattern

A Montserrat claim with exactly one Georgia italic blue phrase as the qualifier. The change of face is the point: the structure states, the voice answers.

> The whole you, read from your *mouth.*
> Twelve hours a day. *Not twenty-two.*
> There are teeth *I won't move.*

**One italic phrase per screen. Two is one too many.** This is the most recognisable thing in the system and the easiest to over-use.

### Standard components

- **Eyebrow:** 11px uppercase blue Montserrat, optional 26px rule before it (`.dash`)
- **Pills:** `--r-pill`, four variants — solid (navy), blue, ghost (transparent + navy border), light (white on navy)
- **Nav:** sticky, max-width 1000px, translucent warm background, `backdrop-filter: blur(12px)`, full pill radius
- **Sections:** 104px vertical padding, 1px `--line` top border. `.dark` variant = navy background, white headings, `rgba(255,255,255,.74)` body
- **Cards:** `--warm` background, 1px `--line` border, `--r-panel`, hover lift `translateY(-4px)`
- **Reveal:** fade + 12px rise on scroll via IntersectionObserver; always honour `prefers-reduced-motion`

---

## 3. Voice

Primary sounds like a clinician who reads the literature and refuses to oversell. Precise, warm, unhurried, quietly confident. Never spa. Never hype.

**Do:**
- Lead with the mechanism, then the claim
- State effect sizes with their confidence intervals and say when something is an association, not causation
- Publish the finding that undercuts you (the six-month HbA1c null result is a house example — it makes everything around it more credible)
- Use plain words for clinical ideas
- Let Dr. Gabi decline. Refusal is the most credible thing a clinician can say

**Never:**
- Spa-wellness register — "find your balance," "journey to wellness," "glow"
- Piano-and-eucalyptus imagery, green-juice flatlays
- Emojis in any patient- or partner-facing asset
- Exclamation marks
- Borrowed longevity vocabulary without a mechanism behind it
- A statistic without author, journal, year and n where it strengthens the claim

**Citation format:** `Guo et al., PLOS ONE 2023 · meta-analysis of 39 cohorts, n = 4,389,263` — set in mono.

**Stat register rule:** every number appears in one place with one locked value. The site has shipped 70% and 80% for the same sleep-apnea claim on the same page. Before using any statistic, confirm it against the register; if there is no register entry, flag it rather than picking a number.

---

## 4. The five dimensions

The organising model. Alignment, longevity, sleep — everything routes through it.

| # | Dimension | Token | Instruments |
|---|---|---|---|
| 01 | Oral health | Gold | CAMBRA · CDC/AAP · OHIP-14 |
| 02 | Sleep & airway | Purple | STOP-BANG · Epworth |
| 03 | Nutrition | Green | MEDAS · BEVQ-15 |
| 04 | Family history | Peach | AAP/EFP 2017 staging |
| 05 | Longevity | Rose | Life's Essential 8 |

**The mouth is not a sixth dimension — it is upstream of the other five.** Never present it as one more thing to track. Present it as the one place all five are visible at once, to the naked eye, in about two minutes.

Naming: it is **"Family history,"** never "Genetics." Never use emojis for dimensions.

---

## 5. Dr. Tzur Gabi — the authority asset

He is the most under-used asset on this account. Default to putting him on camera and in the byline rather than writing brand-voice copy with no author.

**Title — legally load-bearing:**
- ✅ Prosthodontist · "prosthodontist-led" · "doctor-supervised"
- ❌ **Orthodontist. "Orthodontic specialist." "Specializes in orthodontics."**

California B&P 651 restricts "specialist" and "specializes" to dentists holding recognised specialty credentials. Prosthodontics is his; orthodontics is not. This is a compliance error, not a style preference.

**How he works best:** one counter-intuitive idea per piece, delivered straight to camera, no preamble, no "Hi, I'm." An idea he genuinely believes that the audience has not heard from another dentist. Not a pitch.

**His strongest register is refusal** — "There are teeth I won't move," "Before you buy aligners, someone should look at your gums." A clinician declining work is the most credible thing in healthcare marketing, it is entirely compliant, and no manufacturer or discount practice can copy it.

Shoot vertical 9:16, natural light, real clinic, lav mic, iPhone. **Never studio-polished** — native-looking content outperforms produced content in this category and the playbook is explicit about it.

---

## 6. Compliance rails — check every asset

**California (B&P 651 + dental fee-advertising regulation):**
- Fee advertising must disclose what is included — diagnosis, radiographs, materials, lab, post-op — and what generates a separate charge
- No "as low as" or "starting at" without a genuinely purchasable, fully specified service
- Discounts must be from a price actually and regularly charged
- Before/after images: actual patients only, procedures identified, comparable presentation, plus "results may not occur for all patients." Models must be labelled as models
- Testimonials describe **experience**, never **outcomes**
- Scientific claims require reliable published evidence

**Never claim:** that aligners or any dental treatment treat sleep apnea, improve breathing, reduce systemic inflammation, or extend longevity. Safe procedural framing: *"Primary evaluates your bite, gums, oral health and relevant sleep or airway history before recommending treatment."*

**Meta personal-attributes rule** — ads may not assert or imply knowledge of the viewer's condition:
- ❌ "Do you have crooked teeth?" → ✅ "A straighter smile with less daily wear time."
- ❌ "Are you embarrassed by your smile?" → ✅ "Designed around daytime freedom."
- ❌ "Struggling with sleep apnea?" → ✅ "We consider sleep and airway history in the assessment."

**Airway is a question, never a claim.** "When did anyone last look at your airway?" is legal and powerful. Airway traffic routes to the assessment, never directly to a treatment.

**Partner trademarks:** AirFlex™, HyperElastic™, PrecisionFinish™, FXPay™ are OrthoFX marks. Primary leads any lockup; a partner appears as a credit line, never a co-equal logo.

**Never publish $1,500 as a consumer-facing price.**

---

## 7. Facts

- **Practice:** Primary Integrative Dentistry · 11980 San Vicente Blvd, Suite 902, Los Angeles CA 90049 (Brentwood)
- **Site:** myprimaryid.com
- **Founder:** Dr. Tzur Gabi, prosthodontist
- **Positioning:** the mouth as the most accessible diagnostic window into whole-body health, and the earliest place to intervene
- **Primary iD:** a risk-and-opportunity assessment built on validated instruments. Directional, **not a diagnosis**, **not a measure of biological age**. Say so wherever a score appears.

---

## 8. Decision log

Resolved questions, with dates. Do not reopen these — apply them.

| Decided | Question | Ruling |
|---|---|---|
| **13 Sep 2026** | Type pair. Design Guide v1.0 said Montserrat + Georgia; the video playbook said Georgia + Inter; shipped assets used Fraunces + Inter or fell back to Geist. Four combinations, no ruling. | **Montserrat + Georgia.** Farhad, direct. Montserrat = display, labels, buttons, UI. Georgia = body, numbers, the one italic phrase. §1 and §2 now reflect this. Any asset built before this date is off-brand on type and should be reset to it the next time it is touched. |

**The rule that keeps this file current.** If a genuinely new brand question comes up that this file does not answer, ask Farhad once — then write the ruling into this table **in the same turn**, and re-propose the skill. A decision that is not written back here will be asked again by the next chat, and that is precisely how the drift happens. Updating this file is part of answering the question, not a follow-up task.