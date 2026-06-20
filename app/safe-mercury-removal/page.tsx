import { SiteHeader, SiteFooter, ArticleContainer, Hero, H2, H3, CTAGroup, FAQ, PALETTE } from "@/components/site-shell"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/schema"

const FAQ_ITEMS = [
  { q: "Is mercury filling removal safe?", a: "Conventional amalgam removal generates measurable mercury vapor that the patient, the clinician, and the room can be exposed to. The SMART (Safe Mercury Amalgam Removal Technique) protocol, developed by the IAOMT, reduces that exposure to a fraction of conventional removal through rubber dam isolation, high-volume suction, a separate air supply for the patient, and mercury vapor capture. With the protocol in place, removal is safe." },
  { q: "How long does the appointment take?", a: "A typical single-quadrant removal takes 60–90 minutes including setup, isolation, removal, and placement of a biocompatible replacement (composite, ceramic inlay, or onlay depending on the situation). Larger cases are scheduled across multiple visits to limit cumulative exposure time." },
  { q: "What does it cost?", a: "The protocol itself is part of how we do amalgam removal. It's not an add-on charge. Pricing varies with how many fillings are being removed and what they're replaced with: composite is typically $300–$500 per surface; ceramic inlays/onlays run $1,200–$1,800 per restoration. We pre-authorize PPO benefits before treatment." },
  { q: "Do you take insurance for this?", a: "Most PPO plans cover the cost of replacing amalgam. It's coded as a standard restorative procedure. The SMART protocol itself is not separately reimbursed, but it's also not an add-on charge. We'll walk through your benefits before treatment." },
  { q: "Will I need to do anything to prepare?", a: "We send a pre-visit protocol that includes hydration guidance and dietary suggestions to support the body's natural clearance pathways. Some patients also choose to work with a functional or integrative physician on a chelation or nutritional protocol around the time of removal, and we can refer if you'd like." },
  { q: "How many appointments will I need?", a: "Depends on how many amalgams you have. We typically remove one quadrant per visit (up to 3–4 fillings) to keep exposure time reasonable. A full mouth with 8–10 amalgams is usually 3 to 4 visits, spaced 2–4 weeks apart." },
]

export default function SafeMercuryRemovalPage() {
  return (
    <>
      <SiteHeader />
      <ServiceSchema
        serviceType="Safe Mercury Amalgam Removal (SMART Protocol)"
        description="IAOMT-trained safe amalgam removal using the SMART protocol: rubber dam isolation, high-volume evacuation, separate air supply, and mercury vapor capture."
        url="https://myprimaryid.com/safe-mercury-removal/"
      />
      <FAQPageSchema questions={FAQ_ITEMS.map((f) => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Safe Mercury Removal", url: "https://myprimaryid.com/safe-mercury-removal/" },
      ]} />

      <ArticleContainer>
        <Hero
          eyebrow="Biological Dentistry"
          title="Safe Mercury Filling Removal."
          subtitle="IAOMT-trained removal of amalgam fillings using the SMART Protocol: rubber dam, high-volume evacuation, separate air supply for the patient, and mercury vapor capture."
        />

        <p>
          Amalgam fillings are roughly 50% elemental mercury by weight. They've been placed in hundreds of
          millions of mouths over the last 150 years and remain, controversially, within the FDA's accepted
          use. What's not controversial is the chemistry: amalgams off-gas mercury vapor continuously over
          their lifetime, and they release significantly more vapor during removal. The single biggest
          mercury-exposure event in most adult lives is the removal of their old amalgam fillings if it's
          done without the right protocol.
        </p>

        <p>
          The SMART Protocol, Safe Mercury Amalgam Removal Technique, developed by the International Academy
          of Oral Medicine and Toxicology (IAOMT), is the protocol that solves this. It's how every amalgam
          removal at Primary is performed. There is no version of "we'll just take it out quickly" at this
          practice.
        </p>

        <H2>What the SMART Protocol involves</H2>

        <H3>1. Rubber dam isolation</H3>
        <p>
          A latex or non-latex dam isolates the tooth being treated from the rest of the mouth. This is the
          single most important step. It prevents amalgam particles, mercury droplets, and rinse water from
          contacting the rest of your oral tissues.
        </p>

        <H3>2. High-volume evacuation and mercury vapor capture</H3>
        <p>
          A specialized high-volume suction with a mercury vapor capture filter is positioned at the working
          site throughout the procedure. The suction captures both the particulate amalgam and the vapor that
          drilling generates.
        </p>

        <H3>3. Separate air supply</H3>
        <p>
          The patient breathes through a nasal supply of clean, filtered air, separate from the room air,
          for the entirety of the procedure. This eliminates the risk of inhaling mercury vapor from the
          working site.
        </p>

        <H3>4. Cool-water spray and sectioned removal</H3>
        <p>
          The amalgam is removed in chunks rather than ground out. Sectioning the filling reduces the heat
          generated, which reduces vapor release. Cool-water irrigation throughout the procedure further
          controls temperature.
        </p>

        <H3>5. Personal protective equipment for the clinical team</H3>
        <p>
          The clinical team wears N95 respirators, full face shields, and hair coverage during the procedure.
          We protect ourselves with the same rigor we use to protect you.
        </p>

        <H3>6. HEPA room filtration</H3>
        <p>
          The treatment room runs HEPA air filtration during and after the procedure to capture any vapor that
          escapes the immediate working zone.
        </p>

        <H2>What we replace amalgam with</H2>
        <p>
          Once the amalgam is out, we restore the tooth with a biocompatible material chosen for the specific
          tooth and bite load:
        </p>
        <ul style={{ color: PALETTE.body, lineHeight: 1.8 }}>
          <li><strong style={{ color: PALETTE.navy }}>Composite resin</strong>: for smaller restorations. Tooth-colored, BPA-free formulations.</li>
          <li><strong style={{ color: PALETTE.navy }}>Ceramic inlays and onlays</strong>: for larger restorations under heavy bite load. Stronger and longer-lasting than composite.</li>
          <li><strong style={{ color: PALETTE.navy }}>Full ceramic crowns</strong>: for teeth that have lost significant structure.</li>
        </ul>
        <p>
          We do material-sensitivity testing (MELISA) when there's a clinical reason, such as autoimmune history,
          multiple chemical sensitivities, or specific patient concerns. It informs the choice of which
          composite or ceramic system we use.
        </p>

        <H2>Should you have your amalgams removed?</H2>
        <p>
          That's a personal decision that depends on your symptoms, your health goals, and your sense of risk
          tolerance. Many patients live with their amalgams for decades with no measurable issues. Others find
          that removing them, done safely, resolves persistent symptoms they couldn't otherwise explain.
        </p>
        <p>
          We don't push removal. We screen, listen to your history, and walk through the tradeoffs honestly.
          If you decide to proceed, we do it with the protocol. If you decide to leave them, that's also a
          legitimate choice.
        </p>

        <CTAGroup
          primary={{ label: "Book a SMART removal consultation", href: "/new-patient/" }}
          secondary={{ label: "Learn about our diagnostics", href: "/diagnostics/" }}
        />

        <H2>Common questions</H2>
        <FAQ items={FAQ_ITEMS} />
      </ArticleContainer>
      <SiteFooter />
    </>
  )
}
