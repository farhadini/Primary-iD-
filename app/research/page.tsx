"use client";

/**
 * The Research Library — /research
 * Chronological citation hub for the oral-systemic evidence
 * behind Primary iD.
 */

import { useState, useEffect } from "react";
import Link from "next/link";

/* ── Brand Tokens ─────────────────────────────────────────── */
const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  gold: "#D4B584",
  green: "#48C28C",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  white: "#FFFFFF",
  body: "#1A1A1A",
  inkSoft: "#4d5a74",
  muted: "#8A8A9A",
  line: "rgba(14, 34, 64, 0.08)",
  purple: "#7B68EE",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Montserrat', Helvetica, Arial, sans-serif";

/* ── Article Data ─────────────────────────────────────────── */
type SourceType = "peer" | "gov" | "paper" | "patient" | "press" | "blog";

const TYPE_LABEL: Record<SourceType, string> = {
  peer: "Peer-reviewed",
  gov: "Government & health agency",
  paper: "Whitepaper",
  patient: "Patient education",
  press: "Mainstream press",
  blog: "Clinician blog",
};

const TYPE_COLORS: Record<SourceType, { color: string; bg: string; border: string }> = {
  peer: { color: B.blue, bg: "rgba(36,167,224,0.10)", border: "rgba(36,167,224,0.25)" },
  gov: { color: B.navy, bg: "rgba(14,34,64,0.06)", border: "rgba(14,34,64,0.18)" },
  paper: { color: B.green, bg: "rgba(72,194,140,0.10)", border: "rgba(72,194,140,0.28)" },
  patient: { color: "#A88347", bg: "rgba(212,181,132,0.15)", border: "rgba(212,181,132,0.40)" },
  press: { color: "#B5713F", bg: "rgba(232,152,94,0.12)", border: "rgba(232,152,94,0.35)" },
  blog: { color: B.purple, bg: "rgba(123,104,238,0.10)", border: "rgba(123,104,238,0.28)" },
};

interface Article {
  year: number | "context";
  date: string;
  type: SourceType;
  title: string;
  authors?: string;
  publication: string;
  summary: string;
  url: string;
  readLabel?: string;
}

const ARTICLES: Article[] = [
  /* ─── 2025 ─── */
  {
    year: 2025,
    date: "Feb 2025",
    type: "peer",
    title: "Periodontal treatment and HbA1c reduction: A systematic review and meta-analysis",
    authors: "Umezaki Y, et al.",
    publication: "Frontiers in Oral Health",
    summary:
      "Eleven RCTs in diabetic patients. Treating periodontitis dropped HbA1c by 0.64% at 3 months and 0.33% at 6 months, with reductions in C-reactive protein — positioning periodontal care as a direct adjunct to diabetes management.",
    url: "https://www.frontiersin.org/journals/oral-health",
    readLabel: "Read the study",
  },

  /* ─── 2024 ─── */
  {
    year: 2024,
    date: "Mar 2024",
    type: "press",
    title: "Why Isn't Dental Health Considered Primary Medical Care?",
    authors: "Lola Butcher",
    publication: "Knowable Magazine (Annual Reviews)",
    summary:
      "Investigative long-read on the historical separation of dentistry from medicine. Profiles integration models — embedded hygienists in medical clinics, combined dental-medical practices, coalitions pushing to \"put the mouth back in the body.\"",
    url: "https://knowablemagazine.org/content/article/health-disease/2024/why-isnt-dental-health-considered-primary-medical-care",
    readLabel: "Read the article",
  },
  {
    year: 2024,
    date: "Mar 2024",
    type: "gov",
    title: "Oral Health in Healthcare Settings to Prevent Pneumonia (NV-HAP Toolkit)",
    authors: "Centers for Disease Control & Prevention",
    publication: "CDC HAI Toolkit",
    summary:
      "Veterans Affairs oral-care programs reduced non-ventilator hospital-acquired pneumonia rates by 40–60% and saved hundreds of thousands of dollars per site — positioning oral hygiene as infection control.",
    url: "https://www.cdc.gov/infection-control/hcp/hospital-pneumonia/",
    readLabel: "Read the toolkit",
  },
  {
    year: 2024,
    date: "2024",
    type: "paper",
    title: "The Connection Between Poor Oral Health and Chronic Disease",
    authors: "National Assoc. of Chronic Disease Directors",
    publication: "NACDD / CDC whitepaper",
    summary:
      "Public-health framing of oral health as an under-recognized driver of diabetes and cardiovascular outcomes. Urges bidirectional referrals — dental providers screening for diabetes and hypertension, medical providers flagging oral disease.",
    url: "https://chronicdisease.org/",
    readLabel: "Read the report",
  },
  {
    year: 2024,
    date: "Updated Mar 2024",
    type: "patient",
    title: "Oral Health: A Window to Your Overall Health",
    authors: "Mayo Clinic Staff",
    publication: "Mayo Clinic (Patient Education)",
    summary:
      "Authoritative patient-facing overview. Oral bacteria and inflammation are linked to heart disease, stroke, premature birth, low birth weight, pneumonia, and worsened diabetes control.",
    url: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/dental/art-20047475",
    readLabel: "Read the overview",
  },

  /* ─── 2023 ─── */
  {
    year: 2023,
    date: "Jul 2023",
    type: "press",
    title: "Can Treating Gum Disease Lower Your Risk of Heart Disease and Stroke?",
    authors: "The New York Times",
    publication: "NYT Well",
    summary:
      "Reviews the evidence that treating periodontal disease may reduce cardiovascular risk — and honestly names the limits of current proof.",
    url: "https://www.nytimes.com/2023/07/04/well/live/gum-disease-prevention-treatment.html",
    readLabel: "Read the article",
  },
  {
    year: 2023,
    date: "Apr 2023",
    type: "press",
    title: "7 Ways Your Oral Health Affects Your Overall Health",
    authors: "The New York Times",
    publication: "NYT Well",
    summary:
      "Patient-accessible summary of the oral-systemic links — heart disease, diabetes, pregnancy complications, pneumonia, and more.",
    url: "https://www.nytimes.com/2023/04/06/well/oral-health-hygiene.html",
    readLabel: "Read the article",
  },
  {
    year: 2023,
    date: "2023",
    type: "peer",
    title: "Periodontal Disease and Risk of ASCVD and PAD: AHA Scientific Statement",
    authors: "Beck JD, et al. (AHA Writing Group)",
    publication: "Circulation",
    summary:
      "Mainstream cardiology recognition. The American Heart Association finds periodontal disease independently associated with coronary heart disease, stroke, and peripheral artery disease — calling for periodontal status in cardiovascular risk assessment.",
    url: "https://www.ahajournals.org/doi/10.1161/circ.148.suppl_1.17580",
    readLabel: "Read the statement",
  },
  {
    year: 2023,
    date: "2023",
    type: "blog",
    title: "Clean Mouth, Clean Brain",
    authors: "Mark Hyman, MD",
    publication: "drhyman.com",
    summary:
      "Functional-medicine framing of the oral microbiome's role in brain health — connecting P. gingivalis to Alzheimer's pathology, and oral-gut microbial crosstalk to rheumatoid arthritis and chronic inflammation.",
    url: "https://drhyman.com/blogs/content/clean-mouth-clean-brain/",
    readLabel: "Read the post",
  },

  /* ─── 2022 ─── */
  {
    year: 2022,
    date: "Dec 2022",
    type: "peer",
    title: "An umbrella review of the evidence linking oral health and systemic noncommunicable diseases",
    authors: "Botelho J, et al.",
    publication: "Nature Communications",
    summary:
      "Umbrella review of meta-analyses identified <strong>28 non-communicable diseases</strong> strongly associated with oral disease — including 5 cancers, diabetes, cardiovascular disease, depression, neurodegeneration, and inflammatory bowel disease. Echoes the WHO's 2021 call to integrate oral health into primary care.",
    url: "https://www.nature.com/articles/s41467-022-35337-8",
    readLabel: "Read the review",
  },
  {
    year: 2022,
    date: "2022",
    type: "peer",
    title: "The Link Between Oral Microbiome and Gut Microbiota in Health and Disease",
    publication: "Int'l J. Environmental Research & Public Health",
    summary:
      "Review of the bidirectional oral–gut microbiome axis: how dysbiosis in the mouth propagates downstream, and how gut imbalance feeds back into oral disease.",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9515542/",
    readLabel: "Read the study",
  },

  /* ─── 2021 ─── */
  {
    year: 2021,
    date: "Dec 2021",
    type: "gov",
    title: "Oral Health in America: Advances and Challenges",
    authors: "U.S. Dept. of Health & Human Services (NIDCR)",
    publication: "NIH (Surgeon General-style report)",
    summary:
      "Landmark 20-year update to the 2000 Surgeon General report. Calls for \"integrated oral, medical, and behavioral health care\" as national policy — the most authoritative federal endorsement of the oral-systemic model.",
    url: "https://www.nidcr.nih.gov/research/oralhealthinamerica",
    readLabel: "Read the report",
  },
  {
    year: 2021,
    date: "Oct 2021",
    type: "press",
    title: "Gum disease linked to Alzheimer's disease",
    authors: "Shervin Molayem",
    publication: "Nature Outlook: Oral Health",
    summary:
      "<em>Porphyromonas gingivalis</em> — the keystone gum disease bacterium — and its gingipain toxins detected in Alzheimer brain tissue. Suggests chronic oral infection as a modifiable risk factor for neurodegeneration.",
    url: "https://www.nature.com/articles/d41586-021-02919-3",
    readLabel: "Read the report",
  },
  {
    year: 2021,
    date: "Oct 2021",
    type: "peer",
    title: "Oral health's inextricable connection to systemic health (Periodontal Disease and Systemic Conditions)",
    authors: "Yvonne L. Kapila",
    publication: "Periodontology 2000",
    summary:
      "Sweeping review: periodontal disease linked to diabetes, metabolic syndrome, obesity, eating disorders, liver disease, CVD, Alzheimer's, rheumatoid arthritis, adverse pregnancy outcomes, and cancer. Identifies shared genetic, microbial, and immune pathways.",
    url: "https://onlinelibrary.wiley.com/doi/10.1111/prd.12362",
    readLabel: "Read the review",
  },
  {
    year: 2021,
    date: "Jan 2021",
    type: "paper",
    title: "Innovations in Oral Health and Primary Care Integration",
    authors: "Primary Care Collaborative (PCC)",
    publication: "PCC Report",
    summary:
      "Documents successful medical-dental integration programs — prenatal oral health initiatives, geriatric oral care in nursing facilities, co-located dentists in primary clinics. Aligns oral health with patient-centered medical home principles.",
    url: "https://www.pcpcc.org/",
    readLabel: "Read the report",
  },

  /* ─── 2020 ─── */
  {
    year: 2020,
    date: "Oct 2020",
    type: "peer",
    title: "Relationship between periodontal disease and lung cancer: A systematic review and meta-analysis",
    authors: "Wang J, Yang X, Zou X, et al.",
    publication: "Journal of Periodontal Research",
    summary:
      "Pooled observational data confirms periodontal disease is significantly associated with increased lung cancer incidence — implicating chronic oral inflammation in respiratory carcinogenesis.",
    url: "https://onlinelibrary.wiley.com/doi/10.1111/jre.12730",
    readLabel: "Read the study",
  },
  {
    year: 2020,
    date: "Mar 2020",
    type: "peer",
    title: "Fusobacterium nucleatum in the colorectum and its association with cancer risk and survival",
    authors: "Gethings-Behncke C, et al.",
    publication: "Cancer Epidemiology, Biomarkers & Prevention",
    summary:
      "Analysis of 45 studies. The oral pathogen <em>F. nucleatum</em> is roughly <strong>10× more prevalent</strong> in colorectal tumor tissue than in normal controls — and high levels correlate with worse survival. A microbial mechanism tying the mouth to distant cancer.",
    url: "https://aacrjournals.org/cebp/article/29/3/539",
    readLabel: "Read the study",
  },
  {
    year: 2020,
    date: "Feb 2020",
    type: "peer",
    title: "Periodontitis and cardiovascular diseases: Consensus report",
    authors: "Sanz M, Marco del Castillo A, Jepsen S, et al.",
    publication: "J. Clinical Periodontology (EFP / World Heart Federation)",
    summary:
      "Joint workshop of the European Federation of Periodontology and the World Heart Federation. Confirms an independent association between severe periodontitis and CVD — a paradigmatic medical-dental collaboration statement.",
    url: "https://onlinelibrary.wiley.com/doi/10.1111/jcpe.13285",
    readLabel: "Read the consensus",
  },

  /* ─── 2019 ─── */
  {
    year: 2019,
    date: "Dec 2019",
    type: "blog",
    title: "Clean Mouth, Clean Brain (original)",
    authors: "Mark Hyman, MD",
    publication: "drhyman.com",
    summary:
      "Early functional-medicine summary citing research that <em>P. gingivalis</em> gingipains can travel to the brain and release neuron-damaging toxins implicated in Alzheimer's — reframing oral hygiene as brain hygiene.",
    url: "https://drhyman.com/blogs/content/clean-mouth-clean-brain/",
    readLabel: "Read the post",
  },

  /* ─── 2017 ─── */
  {
    year: 2017,
    date: "2017",
    type: "press",
    title: "Colon Cancer Linked to Mouth Bacteria",
    publication: "Scientific American",
    summary:
      "Early mainstream coverage of the <em>Fusobacterium</em>–colorectal cancer link, and what oral-pathogen translocation might mean for cancer prevention.",
    url: "https://www.scientificamerican.com/article/colon-cancer-linked-to-mouth-bacteria/",
    readLabel: "Read the article",
  },

  /* ─── Undated context ─── */
  {
    year: "context",
    date: "Ongoing",
    type: "patient",
    title: "Oral Health: An Essential Component of Primary Care",
    publication: "Harvard School of Dental Medicine",
    summary:
      "Academic position paper advocating the integration of oral health into primary care to improve overall health outcomes and reduce system-wide cost.",
    url: "https://hsdm.harvard.edu/",
    readLabel: "Read the paper",
  },
  {
    year: "context",
    date: "Ongoing",
    type: "press",
    title: "Dental insurance isn't a scam — but it's also not insurance",
    publication: "Vox",
    summary:
      "Explainer on why dental coverage sits apart from medical insurance — and how the structural split reinforces the artificial boundary between mouth and body.",
    url: "https://www.vox.com/23901293/dentist-delta-dental-insurance-cigna-aspen-metlife-aetna",
    readLabel: "Read the article",
  },
  {
    year: "context",
    date: "Ongoing",
    type: "press",
    title: "Gum Infection Could Be A Major Sign Of Heart Trouble, Researchers Find",
    publication: "The Brighter Side News",
    summary:
      "Accessible summary of recent findings tying gum infection to increased cardiovascular risk — a patient-friendly on-ramp to the AHA and Sanz et al. literature above.",
    url: "https://www.thebrighterside.news/post/gum-infection-could-be-a-major-sign-of-heart-trouble-researchers-find/",
    readLabel: "Read the article",
  },
];

/* ── Helpers ─────────────────────────────────────────────── */
interface YearGroup {
  key: string;
  label: string;
  isContext: boolean;
  entries: Article[];
}

function groupByYear(entries: Article[]): YearGroup[] {
  const years: Record<string, Article[]> = {};
  for (const a of entries) {
    const k = String(a.year);
    if (!years[k]) years[k] = [];
    years[k].push(a);
  }
  const numericKeys = Object.keys(years)
    .filter((k) => k !== "context")
    .sort((a, b) => Number(b) - Number(a));
  const ordered: YearGroup[] = numericKeys.map((k) => ({
    key: k,
    label: k,
    isContext: false,
    entries: years[k],
  }));
  if (years["context"]) {
    ordered.push({
      key: "context",
      label: "Context",
      isContext: true,
      entries: years["context"],
    });
  }
  return ordered;
}

function pluralize(n: number, singular: string, plural: string) {
  return `${n} ${n === 1 ? singular : plural}`;
}

/* ── Computed Stats ───────────────────────────────────────── */
const TOTAL = ARTICLES.length;
const NUMERIC_YEARS = ARTICLES.map((a) => a.year).filter((y): y is number => typeof y === "number");
const YEAR_SPAN = Math.max(...NUMERIC_YEARS) - Math.min(...NUMERIC_YEARS) + 1;
const CHIP_TYPES: SourceType[] = ["peer", "gov", "paper", "patient", "press", "blog"];

/* ── Nav Component ────────────────────────────────────────── */
function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "14px 32px" : "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(254,252,249,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${B.line}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <img
          src="/images/primary-brand-logo.png"
          alt="Primary"
          style={{ height: 36, width: "auto" }}
        />
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {[
          { label: "Why Primary", href: "/why-primary" },
          { label: "The Science", href: "/oral-systemic" },
          { label: "Research", href: "/research", active: true },
          { label: "Membership", href: "#membership" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            style={{
              fontFamily: SERIF,
              fontSize: 13,
              color: item.active ? B.blue : B.body,
              textDecoration: "none",
              opacity: item.active ? 1 : 0.7,
              transition: "opacity 0.2s",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Link
        href="/#book"
        style={{
          fontFamily: SANS,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.04em",
          padding: "10px 20px",
          borderRadius: 999,
          background: B.navy,
          color: B.white,
          textDecoration: "none",
          transition: "background 0.2s ease",
        }}
      >
        Book a visit
      </Link>
    </header>
  );
}

/* ── Footer Component ─────────────────────────────────────── */
function Footer() {
  const footerLinks = [
    {
      heading: "Visit",
      links: [
        { label: "Book appointment", href: "/#book" },
        { label: "New patients", href: "/new-patient" },
        { label: "Our location", href: "#" },
      ],
    },
    {
      heading: "Care",
      links: [
        { label: "Preventive care", href: "#" },
        { label: "Aligners & airway", href: "#" },
        { label: "Cosmetic dentistry", href: "#" },
        { label: "Implants", href: "#" },
      ],
    },
    {
      heading: "Learn",
      links: [
        { label: "Our approach", href: "/oral-systemic" },
        { label: "Research library", href: "/research" },
        { label: "Why Primary", href: "/why-primary" },
        { label: "Primary ID+", href: "/primary-id-plus" },
      ],
    },
  ];

  return (
    <footer style={{ background: B.navy, padding: "56px 32px 36px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
            paddingBottom: 44,
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div>
            <div style={{ marginBottom: 18 }}>
              <img
                src="/images/primary-brand-logo.png"
                alt="Primary"
                style={{ height: 52, width: "auto", filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.65,
                maxWidth: 260,
              }}
            >
              Integrative dentistry that looks at your whole health picture, not just your teeth.
            </p>
            <p style={{ fontFamily: SERIF, fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 16 }}>
              11980 San Vicente Blvd, Suite 902
              <br />
              Los Angeles, CA 90049
              <br />
              <span style={{ color: B.blue }}>(310) 564-8990</span>
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.heading}>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                }}
              >
                {col.heading.toUpperCase()}
              </div>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    display: "block",
                    fontFamily: SERIF,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    marginBottom: 10,
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: SERIF, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            © 2025 Primary Integrative Dentistry
          </span>
          <span style={{ fontFamily: SERIF, fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
            Dr. Tzur Gabi, Founder
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── Chip Component ───────────────────────────────────────── */
function Chip({ type }: { type: SourceType }) {
  const colors = TYPE_COLORS[type];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: SANS,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "5px 11px",
        borderRadius: 999,
        color: colors.color,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        lineHeight: 1.6,
      }}
    >
      {TYPE_LABEL[type]}
    </span>
  );
}

/* ── Main Page Component ──────────────────────────────────── */
export default function ResearchPage() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const groups = groupByYear(ARTICLES);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main style={{ background: B.cream, minHeight: "100vh" }}>
      <Nav scrolled={scrolled} />

      {/* ─── HERO ─── */}
      <section
        style={{
          padding: "140px 40px 60px",
          background: `linear-gradient(180deg, ${B.cream} 0%, ${B.warm} 100%)`,
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: B.blue,
              marginBottom: 28,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.7s ease-out 0.1s",
            }}
          >
            <span style={{ width: 28, height: 1, background: B.blue }} />
            The Research Library
          </span>

          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(38px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: B.navy,
              marginBottom: 24,
              maxWidth: 820,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.8s ease-out 0.22s",
            }}
          >
            The evidence behind <em style={{ fontStyle: "italic", color: B.blue }}>Primary.</em>
          </h1>

          <p
            style={{
              fontFamily: SERIF,
              fontSize: 19,
              lineHeight: 1.6,
              color: B.inkSoft,
              maxWidth: 680,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.8s ease-out 0.4s",
            }}
          >
            Every claim we make about the mouth-body connection is built on published science, government
            reports, and mainstream reporting. This is the library — curated, current, and linked directly
            to the source.
          </p>

          {/* Stats */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 40,
              borderTop: `1px solid ${B.line}`,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
              maxWidth: 760,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.8s ease-out 0.55s",
            }}
          >
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, color: B.navy, lineHeight: 1 }}>
                {TOTAL}
              </div>
              <span
                style={{
                  display: "block",
                  marginTop: 8,
                  fontFamily: SANS,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: B.inkSoft,
                }}
              >
                Papers & reports
              </span>
            </div>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, color: B.navy, lineHeight: 1 }}>
                {YEAR_SPAN}
                <em style={{ fontStyle: "italic", color: B.blue, fontSize: 24, marginLeft: 4 }}>yrs</em>
              </div>
              <span
                style={{
                  display: "block",
                  marginTop: 8,
                  fontFamily: SANS,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: B.inkSoft,
                }}
              >
                Spanned
              </span>
            </div>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, color: B.navy, lineHeight: 1 }}>
                28
              </div>
              <span
                style={{
                  display: "block",
                  marginTop: 8,
                  fontFamily: SANS,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: B.inkSoft,
                }}
              >
                Conditions linked
              </span>
            </div>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, color: B.navy, lineHeight: 1 }}>
                {CHIP_TYPES.length}
              </div>
              <span
                style={{
                  display: "block",
                  marginTop: 8,
                  fontFamily: SANS,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: B.inkSoft,
                }}
              >
                Source types
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LEGEND ─── */}
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "40px 40px 0",
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: B.muted,
            marginRight: 12,
          }}
        >
          Source type
        </span>
        {CHIP_TYPES.map((t) => (
          <Chip key={t} type={t} />
        ))}
      </div>

      {/* ─── TIMELINE ─── */}
      <section style={{ padding: "60px 40px 120px", maxWidth: 1100, margin: "0 auto" }}>
        {groups.map((group) => (
          <div
            key={group.key}
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: 48,
              marginBottom: 72,
              alignItems: "flex-start",
            }}
            className="timeline-row"
          >
            {/* Year marker */}
            <div
              style={{
                fontFamily: SERIF,
                fontSize: group.isContext ? 36 : 64,
                fontWeight: 400,
                color: B.navy,
                letterSpacing: "-0.025em",
                lineHeight: 1,
                position: "sticky",
                top: 100,
              }}
            >
              {group.label}
              <span
                style={{
                  display: "block",
                  width: 32,
                  height: 1,
                  background: B.blue,
                  marginTop: 18,
                }}
              />
              <span
                style={{
                  display: "block",
                  marginTop: 14,
                  fontFamily: SANS,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: B.muted,
                }}
              >
                {pluralize(group.entries.length, "entry", "entries")}
              </span>
            </div>

            {/* Article cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {group.entries.map((a) => (
                <article
                  key={a.url + a.title}
                  style={{
                    background: B.warm,
                    border: `1px solid ${B.line}`,
                    borderRadius: 20,
                    padding: "26px 32px 28px",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "rgba(36, 167, 224, 0.35)";
                    e.currentTarget.style.boxShadow = "0 24px 60px -28px rgba(14, 34, 64, 0.18)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = B.line;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      marginBottom: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip type={a.type} />
                    <span
                      style={{
                        fontFamily: SANS,
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: B.muted,
                      }}
                    >
                      {a.date}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontSize: 22,
                      fontWeight: 400,
                      color: B.navy,
                      lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                      marginBottom: 8,
                    }}
                  >
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s ease" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = B.blue)}
                      onMouseOut={(e) => (e.currentTarget.style.color = B.navy)}
                    >
                      {a.title}
                    </a>
                  </h3>

                  <div
                    style={{
                      fontFamily: SANS,
                      fontSize: 12,
                      color: B.inkSoft,
                      letterSpacing: "0.01em",
                      marginBottom: 14,
                    }}
                  >
                    {a.authors ? <>{a.authors} · </> : null}
                    <span style={{ fontStyle: "italic", color: B.navy }}>{a.publication}</span>
                  </div>

                  <p
                    style={{
                      fontFamily: SERIF,
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: B.inkSoft,
                      marginBottom: 18,
                      maxWidth: 780,
                    }}
                    dangerouslySetInnerHTML={{ __html: a.summary }}
                  />

                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: SANS,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: B.blue,
                      textDecoration: "none",
                      paddingBottom: 2,
                      borderBottom: "1px solid rgba(36,167,224,0.4)",
                      transition: "color 0.2s ease, border-color 0.2s ease, gap 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = B.navy;
                      e.currentTarget.style.borderColor = B.navy;
                      e.currentTarget.style.gap = "10px";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = B.blue;
                      e.currentTarget.style.borderColor = "rgba(36,167,224,0.4)";
                      e.currentTarget.style.gap = "6px";
                    }}
                  >
                    {a.readLabel ?? "Read more"} →
                  </a>
                </article>
              ))}
            </div>
          </div>
        ))}

        {/* Note */}
        <p
          style={{
            maxWidth: 760,
            margin: "40px auto 0",
            paddingTop: 40,
            textAlign: "center",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 14,
            lineHeight: 1.6,
            color: B.inkSoft,
            borderTop: `1px solid ${B.line}`,
          }}
        >
          This library is updated as new evidence lands. If you&apos;re a clinician or researcher and want a
          paper added to the review, write us — we&apos;d rather our science keep growing than settle.
        </p>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 820px) {
          .timeline-row { grid-template-columns: 1fr !important; gap: 18px !important; }
          .timeline-row > div:first-child { position: static !important; font-size: 44px !important; }
        }
        @media (max-width: 720px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </main>
  );
}
