import type { MetadataRoute } from "next"
import { POSTS } from "@/lib/blog/posts"

const SITE = "https://myprimaryid.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,                       lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/why-primary/`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/oral-systemic/`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/diagnostics/`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/about/`,                 lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/new-patient/`,           lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/research/`,              lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/primary-id-plus/`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/five-dimensions/`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/second-opinion/`,        lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/preventive-care/`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/airway-sleep/`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Legacy SEO preservation
    { url: `${SITE}/dental-implant/`,        lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/cosmetic-dentistry/`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/safe-mercury-removal/`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/wholistic-dentistry/`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    { url: `${SITE}/blogs/`,                 lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE}/faq/`,                   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ]

  const blogPosts: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE}/blogs/${post.slug}/`,
    lastModified: post.dateModified ? new Date(post.dateModified) : new Date(post.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts]
}
