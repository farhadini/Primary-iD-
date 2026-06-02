# CLAUDE.md — Primary iD Website

You are working on Primary Integrative Dentistry's website. Brentwood, Los Angeles. Founded by Dr. Tzur Gabi, functional prosthodontist.

## Migration context

This codebase started as a v0 generation and is now in the middle of a migration from the legacy WordPress site at `www.myprimaryid.com`. Strategy and audit docs live one level up in the `Primary iD/` folder:

- `Primary_iD_48hr_Migration_Punch_List.docx` — the master plan
- `Primary_iD_v0_Prompts.md` — per-task implementation prompts
- `Primary_SEO_Audit_v0_Migration_Plan.docx` — full SEO audit and URL inventory
- `Primary_Conversion_Strategy_Site_Build_Plan.docx` — conversion fix list

## Non-negotiable constraints

**Canonical domain:** `https://myprimaryid.com` — always with `www`, always `https`. The Vercel preview at `*.vercel.app` is staging only.

**Trailing slashes:** All URLs must have trailing slashes. The legacy WordPress site used trailing slashes and we preserve them 1:1 to keep SEO equity. `next.config.mjs` has `trailingSlash: true`.

**Legacy slug preservation — never rename these:**

- `/dental-implant/` (singular, not plural)
- `/cosmetic-dentistry/`
- `/safe-mercury-removal/`
- `/wholistic-dentistry/` ← keep the "wholistic" spelling; do NOT normalize to "holistic"
- `/blogs/` and every child `/blogs/[slug]/`

**App Router only.** No Pages Router. Metadata via `generateMetadata()` (dynamic) or `export const metadata` (static) in `layout.tsx` files. Note: every existing route's `page.tsx` uses `"use client"`, so metadata must live in a sibling `layout.tsx` (server component by default).

**Every page must have:**

- Unique `<title>` (not "Practitioner Invitation")
- Unique meta description (patient-facing, not B2B)
- `alternates.canonical` self-referencing absolute URL with trailing slash
- Full OG + Twitter card overrides (defaults inherit from root layout)
- `robots: { index: true, follow: true, ... }` unless explicitly noindex

**JSON-LD schema is required.** Components live in `components/schema/`. Use `https://schema.org` (not http) for `@context`. Schemas to render:

- `/` — Dentist + LocalBusiness
- `/about` — Physician (Dr. Tzur Gabi)
- `/dental-implant`, `/cosmetic-dentistry`, `/safe-mercury-removal`, `/wholistic-dentistry` — Service
- `/blogs/[slug]` — BlogPosting
- `/faq` — FAQPage

## Practice information (use these real values)

- **Practice name:** Primary Integrative Dentistry
- **Founder:** Dr. Tzur Gabi, DMD — Functional Prosthodontist & Oral Physician
- **Phone:** (310) 564-8990
- **Address:** 11980 San Vicente Blvd, Suite 902, Los Angeles, CA 90049
- **Hours:** Mon–Thu 8 AM – 6 PM, Fri 8 AM – 5 PM, Sat–Sun closed
- **Google Business Profile URL:** see live-site link (rated 4.9/5 from 373+ reviews)
- **Social:** LinkedIn linkedin.com/in/drgabi · IG @dentalogics · FB DentalogicsUSA

## Voice & positioning

- "Integrative dentistry" not "holistic dentistry" (except where the legacy `/wholistic-dentistry/` URL forces our hand)
- Patient-facing, not practitioner-facing. The B2B "100 practitioners" invitation language is legacy — strip it from public-facing copy.
- Hero language preserved: "Dentistry reimagined to see the whole you." with italic blue emphasis on "the whole you"
- Whole-body / oral-systemic framing throughout

## Color tokens (defined inline in pages as `B`)

```
navy: #0E2240
blue: #24A7E0
green: #48C28C
cream: #FAF8F5
warmWhite: #FEFCF9
white: #FFFFFF
lightBlue: #E8F6FC
body: #4A4A5A
muted: #8A8A9A
border: rgba(14,34,64,0.07)
accent: #E8985E
```

When creating new pages, import or replicate this palette — don't introduce new colors.

## Subscribili integration

The membership funnel lives on a Subscribili-hosted subdomain. Pending the rep's confirmation, use the placeholder `https://primaryid.subscribili.com` for all "Become a Member" CTAs. Add `target="_blank" rel="noopener"` to those links. Leave a `TODO(farhad): confirm Subscribili subdomain` comment near the link if the placeholder is in use.

## Scheduler

The `/book/[pathway]/` routes need a real scheduler embed (NexHealth/LocalMed/Modento — Subscribili rep to advise). For now, render a placeholder `<SchedulerEmbed pathway={...} />` component and a `tel:+13105648990` fallback button.

## Don't

- Don't change the visible H1 on the homepage
- Don't introduce Pages Router patterns (`getStaticProps`, `pages/`, etc.)
- Don't add a Babel config (Next.js uses SWC by default and explicit Babel disables it)
- Don't add inline `<script>` tags for analytics — use `next/script` with `strategy="afterInteractive"`
- Don't reproduce legacy WordPress content verbatim if it's marketing-speak; rewrite for clarity
- Don't make pages noindex unless explicitly requested
