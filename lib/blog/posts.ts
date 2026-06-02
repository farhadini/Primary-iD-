/**
 * Blog post data source — migrated from the legacy WordPress site at
 * myprimaryid.com. Slugs are preserved 1:1 for SEO continuity.
 *
 * Body content state:
 *   - Posts marked `content: "..."` have been fully migrated from WordPress.
 *   - Posts marked `content: ""` have been inventoried with their slug, title,
 *     excerpt, category, and date — but their full body is still pending
 *     migration. The /blogs/[slug] route gracefully shows the excerpt + a
 *     "full text being migrated" message for those, so the URL still resolves
 *     and Google sees a real page (preserving link equity) while we finish
 *     migrating the longer-form body text.
 *
 * Migration workflow:
 *   To migrate a post, fetch the post body from the live site, convert the
 *   WordPress HTML into clean JSX/HTML, and replace the empty `content`
 *   field. Date fields are already accurate from the WordPress meta tags.
 */

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  /** Empty string = body migration pending. Renders gracefully. */
  content: string
  author: string
  /** ISO 8601 date string. */
  datePublished: string
  dateModified?: string
  coverImage?: string
  category: "Oral Health" | "Airway" | "Cosmetic" | "Implants" | "Nutrition" | "General"
}

export const POSTS: BlogPost[] = [
  // ─── Page 1 (12 posts) ───────────────────────────────────────────────────
  {
    slug: "dental-implants-a-friendly-guide-to-comfort-care-and-long-lasting-smiles",
    title: "Dental Implants: A Friendly Guide to Comfort, Care, and Long-Lasting Smiles",
    excerpt:
      "You notice the gap where a tooth used to be and want a solution that looks, feels, and functions like the real thing. Dental implants replace missing teeth by anchoring a titanium (or zirconia) post in the jaw and restoring a natural-looking crown — so you can smile, chew, and speak with confidence.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-05-15",
    category: "Implants",
  },
  {
    slug: "emergency-dentist-los-angeles-ca-quick-compassionate-care-for-tooth-pain-and-injuries",
    title: "Emergency Dentist Los Angeles CA — Quick, Compassionate Care for Tooth Pain and Injuries",
    excerpt:
      "When a sudden toothache, knocked-out tooth, or painful swelling hits, you need fast, competent care in Los Angeles — not guesswork. Same-day emergency dental treatment that controls pain, preserves teeth, and prevents complications.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-05-15",
    category: "General",
  },
  {
    slug: "how-ai-is-transforming-dental-diagnostics",
    title: "How AI Is Transforming Dental Diagnostics: What Patients Need to Know",
    excerpt:
      "Your dentist just spotted something on your X-ray that you would never have seen — but it wasn't your dentist alone. An FDA-cleared AI platform analyzed the radiograph in real time, highlighting areas of concern with color-coded overlays before your clinician even picked up the image.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-05-12",
    category: "General",
  },
  {
    slug: "integrated-360-approach-complete-wellness-through-oral-health",
    title: "Integrated 360° Approach: Complete Wellness Through Oral Health",
    excerpt:
      "At Primary Integrative Dentistry, we've developed our approach through years of observing the profound connections between oral health and overall wellbeing. Traditional approaches often miss crucial links between oral health and systemic wellness.",
    content: `<h2>Understanding the Complete Picture</h2>
<p>Our comprehensive approach considers often-overlooked factors in conventional dentistry:</p>
<h3>Airway Health</h3>
<p>Using 3D CBCT dental scanning, we evaluate airway function and its effects on sleep, energy, and systemic health. Research demonstrates clear connections between breathing patterns and overall wellness.</p>
<h3>Sleep Quality</h3>
<p>We assess sleep patterns and their relationship to oral structure. Poor sleep can increase inflammation and reduce natural healing capacity.</p>
<h3>Nutritional Impact</h3>
<p>We analyze how dietary choices affect your oral microbiome and overall health. Evidence shows that nutrition plays a central role in both oral and systemic wellness.</p>
<h3>Genetic Insights</h3>
<p>Through nutrigenomic DNA testing, we identify genetic factors that influence oral health outcomes. This information allows for truly personalized treatment approaches.</p>
<h2>Research-Based Integration</h2>
<p>Current studies continue to demonstrate connections between oral health and:</p>
<ul>
<li>Cardiovascular function</li>
<li>Metabolic health</li>
<li>Immune system response</li>
<li>Cognitive performance</li>
<li>Emotional wellbeing</li>
</ul>
<p>By addressing root causes and considering complete health patterns, we help optimize overall wellness.</p>
<h2>Our Commitment</h2>
<p>The Primary approach emphasizes individualized care strategies, preventive health measures, systemic health consideration, and collaborative wellness planning.</p>
<h2>Vision for the Future</h2>
<p>We see dentistry evolving into an integral component of preventive healthcare. This transformation enables individuals to take control of their complete health picture, starting with oral wellness.</p>`,
    author: "Dr. Tzur Gabi",
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    coverImage: "/blog/integrated-360-cover.png",
    category: "Oral Health",
  },
  {
    slug: "beyond-prevention-the-era-of-proactive-health-partnership",
    title: "Beyond Prevention: The Era of Proactive Health Partnership",
    excerpt:
      "Take control of your oral health with Primary's proactive, root-cause dental model. We identify the symptoms — cavities, snoring, crooked teeth, sensitive teeth, bad breath — and address the root causes: microbiome imbalance, airway, genetics, decay, and oral hygiene.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-05-10",
    category: "Oral Health",
  },
  {
    slug: "your-smile-your-heart-understanding-the-connection",
    title: "Your Smile, Your Heart: Understanding the Connection",
    excerpt:
      "We tend to view oral health and heart health as separate domains, each with its own specialists. Recent research reveals a compelling connection — periodontal disease, inflammation, and the oral microbiome all directly influence cardiovascular outcomes.",
    content: `<p>Throughout my years in dentistry, I've observed how we tend to view oral health and heart health as separate domains, each with its own specialists and treatment approaches. Recent research, however, reveals a compelling connection between these systems. As a practitioner focused on holistic dental care, I find these connections crucial for understanding your complete health picture.</p>
<h2>The Inflammation Link</h2>
<p>At the center of this relationship lies inflammation — your body's natural response to injury or infection. While inflammation serves an essential healing purpose, chronic inflammation can significantly impact your health, contributing to conditions including heart disease, diabetes, and neurological changes.</p>
<p>Periodontal disease represents a significant source of this chronic inflammation. The bacteria associated with gum disease can enter your bloodstream, triggering systemic inflammatory responses. This inflammation can affect your arterial health and increase cardiovascular risk.</p>
<h2>Understanding Long-Term Effects</h2>
<p>Research indicates that even after treating periodontal disease, elevated heart-disease risk may persist. This suggests that inflammation creates lasting effects, possibly through epigenetic changes. This knowledge emphasizes the importance of prevention: early intervention in gum disease and maintained oral health may help reduce future cardiac risks.</p>
<h2>Practical Steps for Protection</h2>
<p>Current research continues to uncover new connections, but you can take several evidence-based steps to protect both your oral and heart health:</p>
<ul>
<li>Maintain consistent oral hygiene practices</li>
<li>Schedule regular dental evaluations</li>
<li>Monitor gum health and address bleeding promptly</li>
<li>Support overall health through diet and exercise</li>
</ul>
<p>At Primary, we focus on empowering you with the knowledge and tools to manage your health. Our comprehensive Primary iD assessment helps identify potential risks and develop personalized optimization strategies.</p>
<p>Your smile reflects more than aesthetics — it provides insight into your systemic health. By maintaining oral health, you support your entire system's wellbeing.</p>`,
    author: "Dr. Tzur Gabi",
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    coverImage: "/blog/your-smile-your-heart-cover.jpg",
    category: "Oral Health",
  },
  {
    slug: "understanding-root-cause-dentistry-a-functional-approach-to-oral-health",
    title: "Understanding Root Cause Dentistry: A Functional Approach to Oral Health",
    excerpt:
      "In 25 years of practicing dentistry, I've observed a fundamental truth: treating symptoms without understanding their underlying causes is like silencing a car's check engine light without looking under the hood.",
    content: `<p>Traditional dentistry often focuses on treating visible problems: filling cavities, treating gum disease, or replacing missing teeth. While these treatments are necessary, they don't always address why these issues developed in the first place. Root cause dentistry asks the crucial question: <em>why is this happening?</em></p>
<h2>The Four Pillars of Root Cause Analysis</h2>
<h3>1. Comprehensive Health History</h3>
<p>Your mouth doesn't exist in isolation. We examine your complete health history, including sleep patterns and breathing habits, nutritional status and diet, systemic health conditions, previous dental work and materials, and environmental factors.</p>
<h3>2. Advanced Diagnostic Technology</h3>
<p>Modern technology allows us to see what was previously invisible. 3D CBCT imaging reveals structural relationships. Salivary diagnostics identify bacterial imbalances. Airway analysis shows breathing patterns. Material compatibility testing ensures optimal results.</p>
<h3>3. Myofunctional Integration</h3>
<p>The way your oral structures work together affects your entire body — jaw alignment and muscle function, tongue position and swallowing patterns, breathing mechanics, and facial development.</p>
<h3>4. Collaborative Care</h3>
<p>Complex health issues require a team approach: integration with functional medicine doctors, coordination with sleep specialists, partnership with myofunctional therapists, and communication with nutritionists.</p>
<h2>The Root Cause Approach in Action</h2>
<p>When you visit Primary, we begin with a detailed health history review and comprehensive oral examination — combined with advanced imaging and diagnostics — and a discussion of your health goals. From there we integrate findings, identify underlying patterns, connect oral symptoms to systemic health, and develop a comprehensive treatment strategy tailored to you.</p>
<h2>Beyond Traditional Treatment</h2>
<p>Root cause dentistry often reveals surprising connections. Chronic cavities might indicate sleep-disordered breathing. Gum disease could signal systemic inflammation. Tooth grinding may relate to airway issues. Material sensitivities might affect overall health. Each of these clues becomes a thread that, followed properly, leads to a complete picture of your health.</p>
<p>Remember: true health isn't just about treating symptoms — it's about understanding and addressing their underlying causes. At Primary, we're committed to helping you achieve lasting wellness through this comprehensive approach.</p>`,
    author: "Dr. Tzur Gabi",
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    coverImage: "/blog/root-cause-dentistry-cover.jpg",
    category: "Oral Health",
  },
  {
    slug: "oral-microbiome-testing-guide",
    title: "What Is Oral Microbiome Testing? A Complete Guide",
    excerpt:
      "Oral microbiome testing reveals the balance of bacteria in your mouth, helping you personalize your oral care and support your overall health. The 700+ bacterial species in the oral microbiome influence everything from gum health to cardiovascular outcomes.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-05-05",
    category: "Nutrition",
  },
  {
    slug: "reducing-toxicity-and-inflammation-a-functional-approach-to-dental-wellness",
    title: "Reducing Toxicity and Inflammation: A Functional Approach to Dental Wellness",
    excerpt:
      "Balancing the microbiome, nervous, and immune systems through detoxification protocols, biocompatible materials, anti-inflammatory methodology, safe amalgam removal, and ozone therapy. As a functional dentist, oral health profoundly impacts our body's inflammatory response and toxic load.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-05-03",
    category: "Oral Health",
  },
  {
    slug: "emergency-dentist-los-angeles-ca-guide-to-quick-care-and-comfort",
    title: "Emergency Dentist Los Angeles CA Guide to Quick Care and Comfort",
    excerpt:
      "Finding a reliable emergency dentist in Los Angeles can make all the difference when sudden dental pain or injury strikes. Same-day, expert care for urgent problems like severe toothaches, broken teeth, or infections.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-04-28",
    category: "General",
  },
  {
    slug: "cosmetic-dentistry-phoenix-arizona-creating-beautiful-comfortable-smiles-near-you",
    title: "Cosmetic Dentistry Phoenix Arizona: Creating Beautiful, Comfortable Smiles Near You",
    excerpt:
      "Cosmetic dentistry offers a range of treatments designed to improve the appearance of your smile while focusing on comfort and lasting results — from teeth whitening to veneers, with options tailored to unique needs and lifestyle.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-04-25",
    category: "Cosmetic",
  },
  {
    slug: "full-mouth-dental-implants-cost",
    title: "Full Mouth Dental Implants Cost: Complete 2026 Guide",
    excerpt:
      "Missing most or all of your teeth affects far more than your smile — it changes how you eat, how you speak, and how your jawbone holds its shape over time. Full-mouth dental implants offer a permanent, stable solution that restores both function and confidence.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-04-20",
    category: "Implants",
  },

  // ─── Page 2 (12 posts) ───────────────────────────────────────────────────
  {
    slug: "root-canal-alternatives-what-science-actually-says",
    title: "Root Canal Alternatives: What Science Actually Says About Saving Your Teeth",
    excerpt:
      "Evidence-based root canal alternatives including vital pulp therapy, regenerative endodontics, and ozone therapy. A 2025 meta-analysis shows 90% success rates for regenerative procedures done with proper case selection.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-03-22",
    category: "General",
  },
  {
    slug: "3d-dental-scan-cbct",
    title: "What a 3D Dental Scan Reveals About Your Health",
    excerpt:
      "A 3D dental scan (CBCT) gives a detailed look at your teeth, jaw, and airway, helping your dentist spot hidden issues — bone density, sinus position, airway constriction — and plan the best treatment for you.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-03-15",
    category: "General",
  },
  {
    slug: "beyond-brushing-understanding-sleep-and-your-airway",
    title: "Beyond Brushing: Understanding Sleep and Your Airway",
    excerpt:
      "Most of us accept poor sleep as an unavoidable part of modern life. We dismiss restless nights as stress or bad luck — but sleep issues often connect to an unexpected source: your oral health and airway function.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-03-10",
    category: "Airway",
  },
  {
    slug: "proactive-dentistry-redefining-oral-healthcare",
    title: "Proactive Dentistry: Redefining Oral Healthcare",
    excerpt:
      "Modern dentistry is shifting from reactive treatments to proactive wellness strategies. We don't wait for problems — we screen, baseline, and intervene before symptoms appear.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-03-08",
    category: "Oral Health",
  },
  {
    slug: "ozone-therapy-for-teeth",
    title: "Ozone Therapy for Teeth: A Complete Guide",
    excerpt:
      "Ozone therapy for teeth offers a gentle, natural way to fight cavities, support healing, and strengthen enamel for a healthier, more resilient smile. Used in conjunction with biological dentistry protocols.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-03-05",
    category: "General",
  },
  {
    slug: "beyond-labels-understanding-modern-dentistrys-evolution",
    title: "Beyond Labels: Understanding Modern Dentistry's Evolution",
    excerpt:
      "What is wholistic, functional, regenerative, integrated, and biological dentistry? With 25+ years of experience, I've watched the field fragment into terms that share a fundamental understanding — and a common direction.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-02-28",
    category: "General",
  },
  {
    slug: "second-opinions-precision-and-clarity-in-dental-care",
    title: "Second Opinions: Precision and Clarity in Dental Care",
    excerpt:
      "After 25 years of resolving complex dental cases, I understand the importance of certainty in dental decisions. Whether something feels amiss after a procedure or you face a complex diagnosis, a second opinion is a wise step toward informed healthcare choices.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-02-22",
    category: "General",
  },
  {
    slug: "meet-dr-tzur-gabi",
    title: "Meet Dr. Tzur Gabi",
    excerpt:
      "An introduction to Dr. Tzur Gabi — his story, his approach to dentistry, and what shaped the Primary Integrative Dentistry vision. From genetics and AI to functional prosthodontics.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-02-15",
    category: "General",
  },
  {
    slug: "beyond-brushing-your-oral-microbiome-and-total-wellness",
    title: "Beyond Brushing: Your Oral Microbiome and Total Wellness",
    excerpt:
      "The familiar advice to brush, floss, and rinse serves an important purpose — but optimal oral health involves more than removing bacteria. It requires nurturing a balanced ecosystem within your mouth: your oral microbiome.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-02-10",
    category: "Nutrition",
  },
  {
    slug: "your-skins-reflection-the-oral-dermal-connection",
    title: "Your Skin's Reflection: The Oral-Dermal Connection",
    excerpt:
      "We tend to view skin and oral health as separate concerns. Research increasingly reveals the intricate relationship between them — chronic inflammation, microbiome dysbiosis, and nutritional patterns affect both.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-02-05",
    category: "Oral Health",
  },
  {
    slug: "gum-contouring-before-and-after",
    title: "Gum Contouring Before and After: Your Complete Visual Guide to a Balanced Smile",
    excerpt:
      "Your smile is framed by your gumline — and when that frame is uneven, too high, or too low, it changes everything about how your teeth look. Gum contouring reshapes your gums to create a balanced, proportionate smile.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-01-28",
    category: "Cosmetic",
  },
  {
    slug: "como-limpiar-un-retenedor-dental",
    title: "Cómo Limpiar un Retenedor Dental: Guía Paso a Paso",
    excerpt:
      "Aprende cómo limpiar un retenedor dental con pasos sencillos y consejos prácticos para mantener tu sonrisa sana y tu aparato siempre fresco.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-01-20",
    category: "General",
  },

  // ─── Page 3 (12 posts) ───────────────────────────────────────────────────
  {
    slug: "before-after-full-arch-dental-implants",
    title: "What to Expect: Full Arch Dental Implants Before & After",
    excerpt:
      "See real before-and-after full-arch dental implant results, learn about the process, recovery, and how this treatment can restore your smile and confidence — and what to expect at each stage.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-03-18",
    category: "Implants",
  },
  {
    slug: "are-veneers-permanent-cost",
    title: "Are Veneers Permanent? The Real Cost & Lifespan",
    excerpt:
      "Clear answers on veneer cost, lifespan, and replacement. What to expect before choosing veneers for your smile — and how to extend their lifespan once they're in place.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-01-15",
    category: "Cosmetic",
  },
  {
    slug: "ceramic-dental-implants-side-effects",
    title: "The Truth About Ceramic Dental Implants Side Effects",
    excerpt:
      "Clear answers on ceramic (zirconia) dental implant side effects: known risks, healing tips, and what to expect before and after your implant procedure.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-01-10",
    category: "Implants",
  },
  {
    slug: "best-oral-microbiome-test",
    title: "3 Best Oral Microbiome Tests: An Honest Review",
    excerpt:
      "An honest review of the top oral-microbiome test kits, with features, pricing, and tips for choosing the right option for your situation.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2026-01-05",
    category: "Nutrition",
  },
  {
    slug: "are-veneers-bad-for-your-teeth",
    title: "Are Veneers Bad for Your Teeth? The Honest Answer",
    excerpt:
      "Clear, honest answers on the risks and benefits of veneers — including how to choose a clinician who minimizes prep and how to keep your underlying teeth healthy.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2025-12-28",
    category: "Cosmetic",
  },
  {
    slug: "are-veneers-permanent-before-after",
    title: "Are Veneers Permanent? Your Before & After Guide",
    excerpt:
      "Answers on the permanence of veneers — plus tips on what to expect, how the process works, and how to care for your new smile so it lasts.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2025-12-20",
    category: "Cosmetic",
  },
  {
    slug: "all-on-4-dental-implants-zirconia",
    title: "All on 4 Dental Implants Zirconia: The Full Story",
    excerpt:
      "Get the full story on All-on-4 zirconia dental implants — including benefits, costs, and what to expect from this strong, natural-looking, metal-free smile solution.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2025-12-15",
    category: "Implants",
  },
  {
    slug: "metal-free-dental-implants-guide",
    title: "A Patient's Guide to Metal-Free Dental Implants",
    excerpt:
      "The facts on metal-free dental implants — benefits, risks, and what to expect — so you can make the best choice for your oral and systemic health.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2025-12-10",
    category: "Implants",
  },
  {
    slug: "are-ceramic-dental-implants-safe",
    title: "Are Ceramic Dental Implants Safe? Pros and Cons",
    excerpt:
      "Are ceramic dental implants safe? Pros and cons, health benefits, and what to consider before choosing ceramic implants over titanium.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2025-12-05",
    category: "Implants",
  },
  {
    slug: "cosmetic-dental-bonding-guide",
    title: "Cosmetic Dental Bonding 101: The Ultimate Guide",
    excerpt:
      "Cosmetic dental bonding offers a simple way to fix chips, gaps, or stains. How the process works, what it costs, and when bonding is the right choice (vs. veneers).",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2025-11-28",
    category: "Cosmetic",
  },
  {
    slug: "teething-and-future-health-how-your-babys-first-teeth-set-the-foundation-for-a-lifetime-of-healthy-smiles-3",
    title: "Teething and Future Health: How Your Baby's First Teeth Set the Foundation for a Lifetime of Healthy Smiles",
    excerpt:
      "Teething represents one of a child's earliest health milestones — and this natural process carries implications that extend far beyond the first few months of discomfort.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2025-11-20",
    category: "Oral Health",
  },
  {
    slug: "the-mouth-your-gateway-to-complete-wellness-a-functional-perspective",
    title: "The Mouth: Your Gateway to Complete Wellness — A Functional Perspective",
    excerpt:
      "Through years of practicing functional dentistry, I've observed a profound truth: the mouth is more than an entry point for nutrition. It's a sophisticated gateway that influences your entire body's wellbeing.",
    content: "",
    author: "Dr. Tzur Gabi",
    datePublished: "2025-11-15",
    category: "Oral Health",
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug)
}
