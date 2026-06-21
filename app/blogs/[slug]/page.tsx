import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { POSTS, getPostBySlug } from "@/lib/blog/posts"
import { SiteHeader, SiteFooter, ArticleContainer, Hero, PALETTE } from "@/components/site-shell"
import { BlogPostingSchema, BreadcrumbSchema } from "@/components/schema"

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } }
  }
  const url = `https://myprimaryid.com/blogs/${post.slug}/`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      authors: [post.author],
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const url = `https://myprimaryid.com/blogs/${post.slug}/`

  return (
    <>
      <SiteHeader />
      <BlogPostingSchema
        headline={post.title}
        description={post.excerpt}
        datePublished={post.datePublished}
        dateModified={post.dateModified}
        author={post.author}
        image={post.coverImage}
        url={url}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Primary Journal", url: "https://myprimaryid.com/blogs/" },
        { name: post.title, url },
      ]} />

      <ArticleContainer>
        <Hero
          eyebrow={`${post.category} · ${new Date(post.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
          title={post.title}
          subtitle={post.excerpt}
        />

        {post.content ? (
          <div
            style={{ color: PALETTE.body, lineHeight: 1.75 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div style={{ color: PALETTE.body, lineHeight: 1.75 }}>
            <p>
              The full text of this article is being migrated from our previous site and will be back online
              shortly. In the meantime, if you'd like Dr. Gabi's perspective on this topic, the most direct
              path is to bring it up at your next visit. It's exactly the kind of conversation a comprehensive
              intake is designed for.
            </p>
            <p style={{ color: PALETTE.muted, fontStyle: "italic", fontSize: 15 }}>
              Posted by {post.author} · {new Date(post.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        )}
        {/* Conversion footer : appears at the bottom of every blog post */}
        <div
          style={{
            marginTop: 64,
            padding: "32px 28px",
            background: "linear-gradient(135deg, #0E2240 0%, #142c54 100%)",
            color: "#FEFCF9",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#24A7E0",
              fontWeight: 600,
            }}
          >
            Bring this to your next visit
          </div>
          <h3
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 26,
              fontWeight: 500,
              color: "#FEFCF9",
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            Want this evaluated for your mouth?
          </h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.85, margin: 0 }}>
            Start with the 6-minute Primary iD assessment, your scored health
            roadmap across five dimensions. Or talk to us directly.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
            <a
              href="/diagnostics/"
              style={{
                background: "#FEFCF9",
                color: "#0E2240",
                padding: "13px 24px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Start the assessment
            </a>
            <a
              href="/book/"
              style={{
                background: "transparent",
                color: "#FEFCF9",
                padding: "13px 24px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "system-ui, sans-serif",
                border: "1px solid rgba(254,252,249,0.4)",
              }}
            >
              Book a visit
            </a>
            <a
              href="tel:+13105648990"
              style={{
                color: "#FEFCF9",
                padding: "13px 8px",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 14,
                fontFamily: "system-ui, sans-serif",
                alignSelf: "center",
                opacity: 0.85,
              }}
            >
              or call (310) 564-8990
            </a>
          </div>
          <p style={{ fontSize: 12, opacity: 0.55, margin: "8px 0 0" }}>
            All PPO plans accepted. Membership available.
          </p>
        </div>
      </ArticleContainer>
      <SiteFooter />
    </>
  )
}
