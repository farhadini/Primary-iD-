import { SiteHeader, SiteFooter, ArticleContainer, Hero, H2, FAQ } from "@/components/site-shell"
import { FAQPageSchema, BreadcrumbSchema } from "@/components/schema"

const INSURANCE = [
  { q: "Do you take my insurance?", a: "We're PPO-friendly and accept most major dental PPO plans. We pre-authorize benefits before treatment so you know what your plan covers and what your out-of-pocket will be. If you're out-of-network, we'll help you submit for reimbursement." },
  { q: "What's the difference between your membership and insurance?", a: "Insurance pays a third party (your employer or you) for a contract that limits coverage. Our membership is a direct arrangement: you pay us a flat annual or monthly fee and receive comprehensive preventive care plus member pricing on restorative work. The two work together: many patients use insurance for restorative work and membership for the comprehensive preventive care insurance doesn't cover." },
  { q: "Do you accept HSA / FSA?", a: "Yes. Most dental work is HSA/FSA-eligible. We provide receipts coded for reimbursement." },
  { q: "What if I don't have insurance?", a: "Our membership is designed for this. Annual or monthly billing, no claim forms, no surprises." },
]

const FIRST_VISIT = [
  { q: "How long is the first visit?", a: "Plan on 90 minutes. The comprehensive intake includes 3D CBCT imaging, salivary diagnostics, airway screening, periodontal staging, and review of your medical and dental history. You'll leave with your Primary iD score across five dimensions and a clear treatment plan." },
  { q: "What should I bring?", a: "Any recent dental records or X-rays from previous providers, a list of current medications and supplements, and your insurance card if applicable. That's it." },
  { q: "Do you treat dental anxiety?", a: "Yes. We schedule extra time for anxious patients, offer nitrous oxide, and can prescribe oral sedation for patients who need it. The first visit is non-invasive, diagnostics only, which is often the right way to start if anxiety is the obstacle." },
  { q: "Is the first visit covered by insurance?", a: "Most PPOs cover the comprehensive exam, the basic X-rays, and the cleaning. Some additional diagnostics, like salivary microbiome testing, are out-of-pocket. We walk through what's covered before the visit." },
]

const PRACTICE = [
  { q: "What is the Primary iD?", a: "The Primary iD is your scored health roadmap across five dimensions: oral health, airway, nutrition, microbiome, and whole-body. We update it at every comprehensive visit so you have a baseline you can track over time, not just a snapshot." },
  { q: "Do you offer second opinions?", a: "Yes. Bring your X-rays, CBCT scan, and proposed treatment plan from another provider. We'll give you our independent read on materials, timing, and whether the work proposed is the right path. This is one of the most common reasons new patients come to us." },
  { q: "Is the SMART mercury removal protocol safe?", a: "Yes. The SMART (Safe Mercury Amalgam Removal Technique) protocol, developed by the IAOMT, uses rubber dam isolation, high-volume evacuation, separate air supply, and mercury vapor capture to reduce exposure to a fraction of conventional removal. We use it on every amalgam removal, never as an add-on charge." },
  { q: "What materials do you use for fillings, crowns, and implants?", a: "Biocompatible by default. Composite resin (BPA-free) for smaller restorations; ceramic inlays/onlays for larger; full ceramic crowns. For implants we offer both titanium and zirconia. For patients with documented sensitivities, we do material-sensitivity testing (MELISA) before placing permanent work." },
  { q: "Do you treat sleep apnea?", a: "We screen for sleep-disordered breathing using STOP-BANG and CBCT airway analysis. If the data points toward apnea, we coordinate with a sleep physician for a home sleep test. We offer oral appliance therapy for confirmed mild-to-moderate cases and refer for CPAP or surgical evaluation when appropriate." },
  { q: "Do you treat children?", a: "We see teens and young adults. For young children we refer to pediatric specialists we trust." },
]

const ALL = [...INSURANCE, ...FIRST_VISIT, ...PRACTICE]

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <FAQPageSchema questions={ALL.map((f) => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "FAQ", url: "https://myprimaryid.com/faq/" },
      ]} />

      <ArticleContainer>
        <Hero
          eyebrow="FAQ"
          title="Questions, answered."
          subtitle="What patients ask most often about insurance, the first visit, and how we work."
        />
        <H2>Insurance & membership</H2>
        <FAQ items={INSURANCE} />
        <H2>Your first visit</H2>
        <FAQ items={FIRST_VISIT} />
        <H2>How we work</H2>
        <FAQ items={PRACTICE} />
      </ArticleContainer>
      <SiteFooter />
    </>
  )
}
