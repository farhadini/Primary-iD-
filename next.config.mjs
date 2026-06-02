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
