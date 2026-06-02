import Link from "next/link"
import { POSTS } from "@/lib/blog/posts"
import { SiteHeader, SiteFooter, ArticleContainer, Hero, PALETTE } from "@/components/site-shell"

export default function BlogsIndexPage() {
  const sorted = [...POSTS].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  )
  return (
    <>
      <SiteHeader />
      <ArticleContainer>
        <Hero
          eyebrow="Primary Journal"
          title="Writing on integrative dentistry."
          subtitle="The oral-systemic connection, airway, biocompatible materials, and the science behind the Primary iD framework."
        />
        <div style={{ marginTop: 16 }}>
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}/`}
              style={{
                display: "block",
                padding: "28px 0",
                borderBottom: `1px solid ${PALETTE.border}`,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontSize: 11,
                  color: PALETTE.blue,
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                {post.category} ·{" "}
                {new Date(post.datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h2
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 24,
                  fontWeight: 500,
                  color: PALETTE.navy,
                  margin: "0 0 8px",
                  lineHeight: 1.25,
                }}
              >
                {post.title}
              </h2>
              <p style={{ color: PALETTE.body, lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>
            </Link>
          ))}
        </div>
        {POSTS.length < 31 && (
          <p style={{ marginTop: 40, color: PALETTE.muted, fontStyle: "italic", fontSize: 14 }}>
            More writing from the archive is being migrated and will appear here.
          </p>
        )}
      </ArticleContainer>
      <SiteFooter />
    </>
  )
}
