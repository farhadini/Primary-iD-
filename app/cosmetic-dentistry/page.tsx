import { SiteHeader, SiteFooter, ArticleContainer, Hero, H2, H3, CTAGroup, PALETTE } from "@/components/site-shell"
import { ServiceSchema, BreadcrumbSchema } from "@/components/schema"

export default function CosmeticDentistryPage() {
  return (
    <>
      <SiteHeader />
      <ServiceSchema
        serviceType="Cosmetic Dentistry"
        description="Veneers, whitening, bonding, and digital smile design with biocompatible, metal-free materials."
        url="https://myprimaryid.com/cosmetic-dentistry/"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Cosmetic Dentistry", url: "https://myprimaryid.com/cosmetic-dentistry/" },
      ]} />

      <ArticleContainer>
        <Hero
          eyebrow="Aesthetic Dentistry"
          title="Cosmetic & Aesthetic Dentistry, Los Angeles."
          subtitle="Veneers, whitening, and full smile design, built on biocompatible materials and biological function, not just appearance."
        />

        <p>
          The reason cosmetic dentistry has a complicated reputation is that for decades it was practiced
          independently of biology. Practices would grind down healthy enamel to place porcelain that looked
          beautiful at 30 and looked artificial at 60. They'd whiten teeth that were screaming with sensitivity.
          They'd hide a bite problem behind veneers instead of addressing it. At Primary, cosmetic work is
          built on a different premise: a smile that looks good at 35 should still look good at 75, and the
          way you get there is by doing the biology right first.
        </p>

        <p>
          That means we look at material biocompatibility, bite function, gum and tissue health, and your
          underlying microbiome before we even start designing the smile. The cosmetic outcome is downstream
          of the foundation. Get the foundation right and the aesthetics last.
        </p>

        <H2>What we offer</H2>

        <H3>Porcelain veneers</H3>
        <p>
          Minimally-prepared porcelain veneers, preserving as much of your natural enamel as the case allows.
          We use lithium disilicate (e.max) and zirconia for strength and translucency, both fully biocompatible.
          Designed using digital smile design (DSD) so you preview the final result before any tooth structure
          is altered.
        </p>

        <H3>Professional whitening</H3>
        <p>
          In-office whitening with desensitization protocol, or take-home custom trays with KöR or Opalescence
          gels. We screen for sensitivity, enamel demineralization, and any underlying decay before whitening.
          Whitening a tooth with active demineralization makes the problem dramatically worse.
        </p>

        <H3>Composite bonding</H3>
        <p>
          For smaller corrections, like chipped edges, gaps, or minor reshaping, composite bonding offers a
          conservative, reversible option that preserves the natural tooth.
        </p>

        <H3>Digital smile design</H3>
        <p>
          We design the proposed smile in software, render it in photo-realistic detail on your photographs,
          and let you live with the design before we change a single tooth. This is the difference between
          discovering you don't love the result on day-of and refining the design before any irreversible work.
        </p>

        <H3>Full smile makeover</H3>
        <p>
          For comprehensive cases combining veneers, alignment, gum reshaping, and sometimes implants, we
          plan and sequence the work to produce a single coherent outcome, not a series of disconnected
          procedures.
        </p>

        <H2>Biocompatible by default</H2>
        <p>
          Every restorative material we place is chosen for its biological compatibility, not just its
          appearance. We avoid amalgam, mercury, and unnecessary metal alloys. For patients with documented
          sensitivities, we do material-sensitivity testing (MELISA) before placing permanent restorations.
          The principle: nothing goes into your mouth that hasn't been chosen for both its aesthetic and its
          biological performance.
        </p>

        <H2>Before & after</H2>
        <p style={{ color: PALETTE.muted, fontStyle: "italic" }}>
          A curated gallery of patient cases is coming. Ask Dr. Gabi to walk you through case studies during
          your consultation, and we'll show you outcomes from patients with similar starting points.
        </p>

        <H2>Bite and airway come first</H2>
        <p>
          A common (and avoidable) failure mode in cosmetic dentistry: beautiful veneers placed on a bite that
          was never balanced. Within 5 years they're chipping, fracturing, or driving jaw pain. Before any
          cosmetic case, we evaluate the bite mechanics and airway. If something is off, we address it first.
          The smile that lasts is the smile placed on a healthy foundation.
        </p>

        <CTAGroup
          primary={{ label: "Book a cosmetic consultation", href: "/new-patient/" }}
          secondary={{ label: "Talk to Dr. Gabi", href: "/about/" }}
        />
      </ArticleContainer>
      <SiteFooter />
    </>
  )
}
