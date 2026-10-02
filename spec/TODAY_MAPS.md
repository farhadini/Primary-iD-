# Primary iD · Phase 1 · "Today" maps (from the code, 2026-10-02)

Build task 1 from `PRIMARY_ID_PHASE1_SPEC.md` → Agents → Build: list every link and every field from the code so the spec's "today" columns are exact. Read from branch `spec/phase1-today-maps` off `main@ba7cb06`. The spec file itself is generated from the Customer Journey OS data file and is not edited here; carry these tables back into `primary-id-workflow-blueprint.json` → `phase1`.

## How the flow is wired today

- `/book/` and `/book/<door>/` never render. `next.config.mjs` 307-redirects them to `/primary-id/` (`?door=<door>` for preventive, airway, cosmetic, implants, longevity, orthofx, second_opinion). `pain` has no `/book/` alias.
- `/primary-id/` iframes `public/primary-id-app.html` and forwards every query param. The engine reads `door` (or `pathway`), `dim`, `ctx=clinic`, `utm_source|medium|campaign|content|term`, and `#v=` (view mode). It does not read `ref`, `partner`, `gclid`, `fbclid`, or any page/button identifier.
- No `door` → the engine shows the 8-door picker (not the reason question).
- A second engine, `/diagnostics/` (React, 40 questions), posts to `/api/submit-assessment` on completion only.
- Engine screen order today: door picker → welcome → why (general door only) → Pathfinder (implants/secondop/aligners only) → goals → "if nothing changes" → **gate (contact + SMS consent)** → how it works → 5 dimensions (+ history lightning rounds) → safety → records → essentials (DOB, sex, address) → insurance → own words → reveal (score) → journey → "yours" → **Book my first visit** → "We'll reach out shortly".

## Link map

Destinations: **PID** = `/primary-id/` door picker · **PID:x** = `/primary-id/?door=x` · **DIAG** = `/diagnostics/` (second engine).

| Page | File:line | Label | Goes to today | Spec check |
|---|---|---|---|---|
| Every page · header | components/site-nav.tsx:95 | Book a visit | `/book/` → PID | Partly: picker, not reason question (L1) |
| Every page · header | components/site-nav.tsx:79, :154 | (310) 564-8990 | `tel:` | Same number as the Google profile |
| Every page · footer | components/site-footer.tsx:16 | Book appointment | `/book/` → PID | Partly (L1) |
| Every page · footer | site-footer.tsx:22 / :23 | Preventive care / Airway & sleep | PID:preventive / PID:airway | OK, but labelled as content |
| Every page · footer | site-footer.tsx:35 | Health assessment | PID | Partly (L1) |
| Home · sticky (mobile) | components/mobile-sticky-cta.tsx:67 | Book a visit | `/book/` → PID | Partly (L1) |
| Home · hero | app/page.tsx:212 | Book a visit | `/book/` → PID | Partly (L1) |
| Home · hero | app/page.tsx:222 | Take the health assessment | PID | Promises "results sent to your inbox", which no longer happens |
| Home · 5 dimension cards | components/meet-your-primary-id.tsx:221 | Get your score | PID:preventive&dim=oral, PID:airway&dim=sleep, PID:longevity&dim=nutrition / genetics / longevity | OK; `dim` is attribution only |
| Home · door cards | components/our-approach.tsx:32–88 | Take the assessment / Book a visit / Get a review | PID:cosmetic, orthofx, preventive (×2), airway, longevity, implants, second_opinion | OK |
| Home · Emergency card | our-approach.tsx:74 | Call (310) 564-8990 | `tel:` | The `pain` door is unreachable from any link (PF4) |
| Home · "Free Plan Review" card | our-approach.tsx:88 | Get a review | PID:second_opinion | "Free" in the title (rules) |
| Home · check-up card | our-approach.tsx:190 / :191 | Take the Primary iD / Book a cleaning | PID / PID:preventive | — |
| Home · oral-systemic | components/oral-systemic-section.tsx:442 | Get my Primary Health Score | PID:longevity | Every visitor is labelled longevity (R2) |
| Home · new patient visit | components/new-patient-visit.tsx:585 | Start my Primary Health Score | PID | Partly (L1) |
| Home · new patient visit | new-patient-visit.tsx:597 | Or book a visit now | `#book` → `/new-patient/` → `/book/` → PID | 3 hops (L1) |
| Home · membership | components/financial-membership.tsx:670 | Build my plan | PID | — |
| Home · membership | financial-membership.tsx:697 | Join the membership | `https://primaryid.subscribili.com` | Placeholder subdomain (TODO) |
| Home · BookingCTA `#book` | app/page.tsx:1392 | Book a visit | `/new-patient/` | Not the flow (L1) |
| /new-patient/ | app/new-patient/page.tsx:236 | Begin your assessment | **DIAG** | Spec: preventive door (L1, L4) |
| /new-patient/ | :658 / :671 | Book a visit / Start assessment first | PID / **DIAG** | L4 |
| /about/ | app/about/page.tsx:68, :297 | Book a visit with Dr. Gabi / Schedule a first visit | PID:preventive | OK |
| /about/ | :71, :294 | Start with the assessment / Take the assessment | **DIAG** | L4 |
| /dental-implant/ | app/dental-implant/page.tsx:209, :550 | See where I stand | `#path-finder`: on-page 8-question quiz, **answers sent nowhere** | Spec: implants Pathfinder (L4) |
| /dental-implant/ | components/implant-path-finder.tsx:361 | Book a consultation (after quiz) | PID:implants (quiz answers dropped) | L4, PF3 |
| /dental-implant/ | implant-path-finder.tsx:368 | Send a treatment plan (after quiz) | `mailto:hello@myprimaryid.com` | L2. Also the only `hello@` on the site (elsewhere `care@`) |
| /dental-implant/ | :212, :553 | Schedule consultation | PID:implants | OK |
| /dental-implant/ | :426 | Send us your treatment plan | PID:second_opinion | OK. The spec sample said "an email address"; that is the quiz button above |
| /second-opinion/ | app/second-opinion/page.tsx:107, :282, :368 | Send us your treatment plan | PID:second_opinion | OK |
| /cosmetic-dentistry/ | app/cosmetic-dentistry/page.tsx:101 | Book a cosmetic consultation | `/new-patient/` | No door (L1) |
| /wholistic-dentistry/ | app/wholistic-dentistry/page.tsx:138 / :139 | Start with your Primary iD score / Book a first visit | **DIAG** / `/new-patient/` | L4 / L1 |
| /safe-mercury-removal/ | app/safe-mercury-removal/page.tsx:122 / :123 | Book a SMART removal consultation / Learn about our diagnostics | `/new-patient/` / **DIAG** | L1 / L4 |
| /airway-sleep/ | app/airway-sleep/page.tsx:195, :396 | Book an airway & sleep visit | PID:airway | OK |
| /preventive-care/ | app/preventive-care/page.tsx:207, :408 | Book a preventive visit | PID:preventive | OK |
| /five-dimensions/ | app/five-dimensions/page.tsx:316, :481 | Build my Primary iD | **DIAG** | L4 |
| /five-dimensions/ | :326, :488 | Book a visit | PID | Partly (L1) |
| /why-primary/ | app/why-primary/page.tsx:302 / :313 | Build my Primary iD / Book a comprehensive evaluation | **DIAG** / `/#book` (3 hops) | L4 / L1 |
| /oral-systemic/ | app/oral-systemic/page.tsx:344 (×4), :658 (×5), :634, :705 | Start / Build my Primary iD | **DIAG** | L4 |
| /oral-systemic/ | :588, :715 | Book a comprehensive evaluation | `/#book` (3 hops) | L1 |
| /primary-id-plus/ | app/primary-id-plus/page.tsx:187, :427 | Book a (longevity) consultation | `#consultation` anchor | — |
| /primary-id-plus/ | :676 | Download Sample Protocol | PID (no file) | L2 |
| /primary-id-plus/ | :740, :741 | Book a longevity consultation / Or mention it at your next visit | PID | Spec: longevity door (L1) |
| /your-mouth-keeps-the-score/ | app/your-mouth-keeps-the-score/page.tsx:462, :713 | Get notified / Send me the chapter (email forms) | `setDone(true)`: **email dropped** | L2 |
| /your-mouth-keeps-the-score/ | :717 | Get your Primary iD score | **DIAG** | L4 |
| /blogs/[slug]/ (every post) | app/blogs/[slug]/page.tsx:135 / :150 | Start the assessment / Book a visit | **DIAG** / PID | L4 / L1 |
| Blog body links | lib/blog/posts.ts:493, 1753, 1907 | comprehensive exam etc. | `/your-first-visit/` → **404** | L2 |
| Blog body links | posts.ts:1774 | free comprehensive exam | `/new-patient-special/` → **404** | L2, "free" |
| Blog body links | posts.ts:2067 | Schedule a consultation | `/survey.php` → **404** | L2 |
| Blog body links | posts.ts:2850, 3406 (+~35 more) | schedule a consultation / dental consultation | `/services/` → `/` | L2 |
| DIAG results | app/diagnostics/page.tsx:207 | Book your visit with Dr. Gabi | PID: starts over and asks for everything again | I2, PF3 |
| Engine · results ("yours") | public/primary-id-app.html:1485 | Book my first visit | In-engine: "We'll reach out shortly". Sends nothing | S3 |
| Engine · results | primary-id-app.html:1485 | Copy my results link | `#v=` link opens the **Provider view** screen | S4, M1 |
| `/membership/` | next.config.mjs | (redirect) | `https://primaryid.subscribili.com` (308). No internal link points here | Spec: membership page |
| Unlisted: /invitation/ | app/invitation/page.tsx:987 | Yes, I'm In (form) | No handler: **data dropped** | L2 (noindex) |
| Unlisted: /investorsdeck/ | app/investorsdeck/page.tsx:1656, :1662 | Talk with Farhad and Tzur / Take the full Primary iD | Dead buttons | L2 (noindex) |

Not rendered (dead code, no live effect): `app/book/page.tsx`, `app/book/[pathway]/page.tsx`, the homepage `PrimaryiDExperience` quiz (fakes "Snapshot sent to {email}"), `components/care-pathways.tsx`, several local `Nav`/`Footer` copies in `app/page.tsx` and `app/primary-id-plus/page.tsx`.

## Data map: what `/api/lead/` sends to GoHighLevel

The engine posts the **full payload** on phases `gate`, `progress` (debounced, until the dimensions start), `pre-dimensions`, `dim1`–`dim4`, `dimensions-complete`, `complete`. The route upserts the contact (matched on email/phone), then places or advances the opportunity on pipeline `YIyCuqxNh4mc9NHrh0gx`: stage 0 "New, assessment started" on any phase, stage 1 "Assessment complete" on `complete`, forward only, never for `ctx=clinic`. The workflow enrolment (`GHL_WORKFLOW_APPT`, on `gate`) is **not configured in Vercel**, so no alert fires (matches spec P1-06). GoHighLevel keys are set for **Production only**; Preview and Development builds do not write (and as of this branch, the routes also refuse unless `VERCEL_ENV=production`).

### Contact standard fields

| GHL key | Value | Captured on (today) | Spec touchpoint | Required today |
|---|---|---|---|---|
| `firstName` | First name | Gate | P1-06 | Yes |
| `lastName` | Last name | Gate | P1-06 | No (spec: yes) |
| `email` | Email | Gate | P1-06 | Yes (must contain `@`) |
| `phone` | Mobile | Gate | P1-06 | **No** (spec G1: required, validated) |
| `source` | `Primary iD onboarding — <door or general>` | Server | P1-01 | — |

### Custom fields (empty values are omitted)

| GHL key | Value | Captured on (today) | Spec touchpoint |
|---|---|---|---|
| `assessment_id` | UUID minted on page load (not persisted; a reload makes a new one) | Engine load | P1-01 Primary iD reference |
| `primary_id_mode` | Always `appt` | — | — |
| `pathway` | Door key | URL / door picker | P1-01 Door |
| `lead_source` | `utm_source`, or `direct` | URL | P1-01 Campaign |
| `utm_medium` / `utm_campaign` / `utm_content` | UTM values | URL | P1-01 Campaign (`utm_term` is collected client-side but **dropped** by the route) |
| `entry_dimension` | `?dim=` | URL | P1-01 Page/button (partial) |
| `reason_for_visit` | Reason label (set by door, or picked on the general door) | Why screen | P1-03 Reason |
| `priority` | `urgent` if the reason label matches `pain|hurt|emergency|broke|swollen|bothering` or door = `pain`, else `normal` | Server | P1-04 In pain (no direct question) |
| `pathfinder_answers` | `what: … · why: … · where: …` (implants) / `what · stage · quote` (second opinion) / `what` only (aligners) | Pathfinder | P1-04 |
| `goals` | Comma list of goal keys | Goals screen (before the gate) | P1-08 Goals |
| `intent` | "If nothing changes…" answer | Before the gate | P1-08 Why now |
| `age` | Free text | Gate | Not in spec |
| `sms_consent` | `yes` / `no` | Gate (box starts unticked) | P1-06 Texting consent |
| `sms_consent_at` | ISO time | Gate | P1-06 |
| `sms_consent_text` | `[v1-2026-09-15] <exact wording>` (only if yes) | Gate | P1-06 |
| `sms_consent_source` | Referrer / page URL (only if yes) | Gate | P1-06 |
| `score_oral` / `score_sleep` / `score_nutrition` / `score_family` / `score_longevity` | 0–100 per dimension, partial as they go | Dimensions | P1-09 |
| `primary_id_score` | Composite | Dimensions | P1-09 |
| `primary_id_tier` | Thriving / Strong / Foundational / Needs focus | Dimensions | P1-09 |
| `safety_flags` | Comma list of the 9 chips, or "None of these" | Safety | P1-08 Safety items |
| `records_pcp` | Yes / No | Records | P1-08 Records |
| `records_notes` | Safety free text ("allergies, conditions, meds…") · labs recency · platforms | Safety + Records | P1-08. **Safety free text lands in a records field** |
| `dob` | Free text `MM / DD / YYYY` | Essentials | P1-08 |
| `legal_sex` | Female / Male / Other | Essentials | P1-08 |
| `insurance_type` | PPO / HMO / Medicare / Medicaid / Self-pay / Not sure | Insurance (after dimensions) | P1-05 (spec: before the request) |
| `insurance_carrier` | Free text | Insurance | P1-05 Carrier |
| `insurance_member` | Free text | Insurance | Not in spec (spec: collected on the call into Open Dental) |
| `chief_complaint` | Own words | Last screen | P1-08 In their own words |
| `visit_context` | `web` / `clinic` | URL `ctx` | P1-13 A2 |
| `opendental_patnum` | Staff-entered, clinic mode only | Gate (clinic) | P1-12 |

### Tags

`Primary iD Lead` · `Primary iD — Appointment Request` · `Priority: Urgent (in pain)` · `Pathway: <door>` · `Pathfinder: implant intent` / `second opinion` / `alignment` · `Track: <track>` · `Reason: <label>` · `Goal: <key>` (each) · `Stage: Complete` · `Score: <n>` · `Tier: <tier>` · `Safety: flagged` · `SMS Consent: Yes` / `No` · `Source: In-clinic`.

### Captured in the flow but never sent

| Data | Where | Spec says |
|---|---|---|
| Dental history: existing work, root canal, extractions, last exam, last x-rays, anxiety, TMJ, ortho history | Dimension lightning rounds (`S.hist`) | P1-08 "GoHighLevel fields (live)": **not live** |
| Home address | Essentials | P1-08 "GoHighLevel contact (live)": **not live** |
| "Want to say more?" next to the reason | Why screen | — |
| Aligner: wear tolerance, braces history, retainer wear | Aligner Pathfinder | P1-04 track questions: **only `what` is sent** |
| `utm_term` | URL | P1-01 campaign |

### Not captured anywhere (spec fields)

Page and button they came from (P1-01) · New or returning (P1-03) · Visit to book (P1-05) · Best time to call, preferred days, note for us (P1-06) · Primary iD status/progress (data map) · Kept going or chose later (P1-07).

### The second route: `/api/submit-assessment` (from `/diagnostics/`)

Upserts a contact with `firstName`, `email`, `phone`, `source: "Primary iD assessment"`, tags `Primary iD Assessment`, `Primary iD <n>`, `Tier: <tier>`. It sends **no custom fields, no door, no UTMs, no SMS consent and no opportunity**. It fires only on completion, so a drop-off leaves nothing. It also writes contact rows and the 5 chapter scores to Supabase (`assessments`, `chapter_results`) from **every environment, previews included**.
