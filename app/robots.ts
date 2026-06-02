import type { MetadataRoute } from "next"

const SITE = "https://myprimaryid.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — allow major search and AI crawlers
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "DuckDuckBot",
          "Slurp",
          "Yandex",
          "Baiduspider",
          "Applebot",
        ],
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/invitation/", "/investorsdeck/", "/primaryidFarhad/"],
      },
      // AI assistants — allow indexing of public content for citations/answers
      {
        userAgent: ["GPTBot", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "ChatGPT-User"],
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/invitation/", "/investorsdeck/", "/primaryidFarhad/"],
      },
      // Everyone else
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/invitation/", "/investorsdeck/", "/primaryidFarhad/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
