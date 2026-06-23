/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve legacy WordPress trailing-slash URL pattern for SEO continuity.
  trailingSlash: true,

  // v0 defaults — keep until production-tested
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // ─── 301 Redirects (preserve WordPress URL equity) ────────────────────────
  async redirects() {
    return [
      // Legacy root blog URLs (WordPress served posts at root) -> /blogs/[slug]/ to preserve SEO equity
      { source: "/dental-implants-a-friendly-guide-to-comfort-care-and-long-lasting-smiles/", destination: "/blogs/dental-implants-a-friendly-guide-to-comfort-care-and-long-lasting-smiles/", permanent: true },
      { source: "/emergency-dentist-los-angeles-ca-quick-compassionate-care-for-tooth-pain-and-injuries/", destination: "/blogs/emergency-dentist-los-angeles-ca-quick-compassionate-care-for-tooth-pain-and-injuries/", permanent: true },
      { source: "/how-ai-is-transforming-dental-diagnostics/", destination: "/blogs/how-ai-is-transforming-dental-diagnostics/", permanent: true },
      { source: "/integrated-360-approach-complete-wellness-through-oral-health/", destination: "/blogs/integrated-360-approach-complete-wellness-through-oral-health/", permanent: true },
      { source: "/beyond-prevention-the-era-of-proactive-health-partnership/", destination: "/blogs/beyond-prevention-the-era-of-proactive-health-partnership/", permanent: true },
      { source: "/your-smile-your-heart-understanding-the-connection/", destination: "/blogs/your-smile-your-heart-understanding-the-connection/", permanent: true },
      { source: "/understanding-root-cause-dentistry-a-functional-approach-to-oral-health/", destination: "/blogs/understanding-root-cause-dentistry-a-functional-approach-to-oral-health/", permanent: true },
      { source: "/oral-microbiome-testing-guide/", destination: "/blogs/oral-microbiome-testing-guide/", permanent: true },
      { source: "/reducing-toxicity-and-inflammation-a-functional-approach-to-dental-wellness/", destination: "/blogs/reducing-toxicity-and-inflammation-a-functional-approach-to-dental-wellness/", permanent: true },
      { source: "/emergency-dentist-los-angeles-ca-guide-to-quick-care-and-comfort/", destination: "/blogs/emergency-dentist-los-angeles-ca-guide-to-quick-care-and-comfort/", permanent: true },
      { source: "/cosmetic-dentistry-phoenix-arizona-creating-beautiful-comfortable-smiles-near-you/", destination: "/blogs/cosmetic-dentistry-phoenix-arizona-creating-beautiful-comfortable-smiles-near-you/", permanent: true },
      { source: "/full-mouth-dental-implants-cost/", destination: "/blogs/full-mouth-dental-implants-cost/", permanent: true },
      { source: "/root-canal-alternatives-what-science-actually-says/", destination: "/blogs/root-canal-alternatives-what-science-actually-says/", permanent: true },
      { source: "/3d-dental-scan-cbct/", destination: "/blogs/3d-dental-scan-cbct/", permanent: true },
      { source: "/beyond-brushing-understanding-sleep-and-your-airway/", destination: "/blogs/beyond-brushing-understanding-sleep-and-your-airway/", permanent: true },
      { source: "/proactive-dentistry-redefining-oral-healthcare/", destination: "/blogs/proactive-dentistry-redefining-oral-healthcare/", permanent: true },
      { source: "/ozone-therapy-for-teeth/", destination: "/blogs/ozone-therapy-for-teeth/", permanent: true },
      { source: "/beyond-labels-understanding-modern-dentistrys-evolution/", destination: "/blogs/beyond-labels-understanding-modern-dentistrys-evolution/", permanent: true },
      { source: "/second-opinions-precision-and-clarity-in-dental-care/", destination: "/blogs/second-opinions-precision-and-clarity-in-dental-care/", permanent: true },
      { source: "/meet-dr-tzur-gabi/", destination: "/blogs/meet-dr-tzur-gabi/", permanent: true },
      { source: "/beyond-brushing-your-oral-microbiome-and-total-wellness/", destination: "/blogs/beyond-brushing-your-oral-microbiome-and-total-wellness/", permanent: true },
      { source: "/your-skins-reflection-the-oral-dermal-connection/", destination: "/blogs/your-skins-reflection-the-oral-dermal-connection/", permanent: true },
      { source: "/gum-contouring-before-and-after/", destination: "/blogs/gum-contouring-before-and-after/", permanent: true },
      { source: "/como-limpiar-un-retenedor-dental/", destination: "/blogs/como-limpiar-un-retenedor-dental/", permanent: true },
      { source: "/before-after-full-arch-dental-implants/", destination: "/blogs/before-after-full-arch-dental-implants/", permanent: true },
      { source: "/are-veneers-permanent-cost/", destination: "/blogs/are-veneers-permanent-cost/", permanent: true },
      { source: "/ceramic-dental-implants-side-effects/", destination: "/blogs/ceramic-dental-implants-side-effects/", permanent: true },
      { source: "/best-oral-microbiome-test/", destination: "/blogs/best-oral-microbiome-test/", permanent: true },
      { source: "/are-veneers-bad-for-your-teeth/", destination: "/blogs/are-veneers-bad-for-your-teeth/", permanent: true },
      { source: "/are-veneers-permanent-before-after/", destination: "/blogs/are-veneers-permanent-before-after/", permanent: true },
      { source: "/all-on-4-dental-implants-zirconia/", destination: "/blogs/all-on-4-dental-implants-zirconia/", permanent: true },
      { source: "/metal-free-dental-implants-guide/", destination: "/blogs/metal-free-dental-implants-guide/", permanent: true },
      { source: "/are-ceramic-dental-implants-safe/", destination: "/blogs/are-ceramic-dental-implants-safe/", permanent: true },
      { source: "/cosmetic-dental-bonding-guide/", destination: "/blogs/cosmetic-dental-bonding-guide/", permanent: true },
      { source: "/teething-and-future-health-how-your-babys-first-teeth-set-the-foundation-for-a-lifetime-of-healthy-smiles-3/", destination: "/blogs/teething-and-future-health-how-your-babys-first-teeth-set-the-foundation-for-a-lifetime-of-healthy-smiles-3/", permanent: true },
      { source: "/the-mouth-your-gateway-to-complete-wellness-a-functional-perspective/", destination: "/blogs/the-mouth-your-gateway-to-complete-wellness-a-functional-perspective/", permanent: true },

      // Common variant / misspelling guards for high-traffic legacy URLs
      { source: "/dental-implants/", destination: "/dental-implant/", permanent: true },
      { source: "/cosmetic/", destination: "/cosmetic-dentistry/", permanent: true },
      { source: "/mercury-removal/", destination: "/safe-mercury-removal/", permanent: true },
      { source: "/amalgam-removal/", destination: "/safe-mercury-removal/", permanent: true },
      { source: "/holistic-dentistry/", destination: "/wholistic-dentistry/", permanent: true },

      // Legacy WordPress slugs that consolidate into new App Router pages
      { source: "/3-d-scanning/", destination: "/diagnostics/", permanent: true },
      { source: "/3d-scanning/", destination: "/diagnostics/", permanent: true },
      { source: "/dr-gabi/", destination: "/about/", permanent: true },
      { source: "/our-team/", destination: "/about/", permanent: true },
      { source: "/insurance/", destination: "/new-patient/", permanent: true },
      { source: "/new-patients/", destination: "/new-patient/", permanent: true },
      { source: "/new-patient-experience/", destination: "/new-patient/", permanent: true },
      { source: "/first-visit/", destination: "/new-patient/", permanent: true },
      { source: "/services/", destination: "/", permanent: true },
      { source: "/contact/", destination: "/new-patient/", permanent: true },

      // /book?pathway=X (query-string) → /book/X/ (clean URL)
      // Note: Next.js redirects evaluate before query parsing, so we use `has` for query matches.
      {
        source: "/book",
        has: [{ type: "query", key: "pathway", value: "preventive" }],
        destination: "/book/preventive/",
        permanent: true,
      },
      {
        source: "/book",
        has: [{ type: "query", key: "pathway", value: "airway" }],
        destination: "/book/airway/",
        permanent: true,
      },
      {
        source: "/book",
        has: [{ type: "query", key: "pathway", value: "cosmetic" }],
        destination: "/book/cosmetic/",
        permanent: true,
      },
      {
        source: "/book",
        has: [{ type: "query", key: "pathway", value: "implants" }],
        destination: "/book/implants/",
        permanent: true,
      },
      {
        source: "/book",
        has: [{ type: "query", key: "pathway", value: "longevity" }],
        destination: "/book/longevity/",
        permanent: true,
      },

      // Membership → external Subscribili subdomain
      // TODO(farhad): confirm exact subdomain with Subscribili rep, then update.
      {
        source: "/membership/",
        destination: "https://primaryid.subscribili.com",
        permanent: true,
        basePath: false,
      },

      // TODO(farhad): add 1:1 redirects for all 31 legacy /blogs/[slug] URLs
      // once we have the WordPress export. Until then, /blogs/[slug] routes
      // are served by app/blogs/[slug]/page.tsx and the data layer.
    ]
  },
}

export default nextConfig
