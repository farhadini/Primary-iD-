import { SiteHeader, SiteFooter, ArticleContainer, Hero, H2, H3, CTAGroup, PALETTE } from "@/components/site-shell"
import { ServiceSchema, BreadcrumbSchema } from "@/components/schema"

export default function WholisticDentistryPage() {
  return (
    <>
      <SiteHeader />
      <ServiceSchema
        serviceType="Wholistic Dentistry"
        description="Whole-body dentistry incorporating airway screening, microbiome assessment, nutrition, sleep, and metabolic markers, not just dental treatment."
        url="https://myprimaryid.com/wholistic-dentistry/"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Wholistic Dentistry", url: "https://myprimaryid.com/wholistic-dentistry/" },
      ]} />

      <ArticleContainer>
        <Hero
          eyebrow="Integrative Care"
          title="Wholistic Dentistry in Los Angeles."
          subtitle="Dentistry that sees the whole you: your airway, your microbiome, your sleep, your metabolism, not just your teeth."
        />

        <p>
          The conventional dental visit is built around a question: are there any cavities, and is anything
          actively broken? It's a narrow question and it produces a narrow answer. Wholistic dentistry asks a
          larger one: how is your mouth connected to everything else, and what does looking at it tell us about
          the rest of your health?
        </p>

        <p>
          The evidence behind that question is overwhelming and now widely accepted: gum disease triples the
          risk of a second heart attack. Untreated sleep apnea, diagnosable through the mouth and airway,
          dramatically raises long-term cardiovascular and metabolic risk. The oral microbiome predicts and
          influences the gut microbiome. Bite mechanics drive chronic headaches and TMJ pain that no number of
          generalist visits resolves. Material choices in your mouth interact with autoimmune load, especially
          for patients with documented sensitivities. None of this is fringe. It's mainstream medicine that
          conventional dentistry has been slow to integrate.
        </p>

        <p>
          Wholistic dentistry, sometimes called integrative, biological, or holistic dentistry (the words
          overlap), is the version of dentistry that does integrate it. At Primary, we've built our practice
          around five dimensions of health that the mouth is connected to, screened systematically at every
          comprehensive visit.
        </p>

        <H2>The five dimensions of the Primary iD</H2>

        <H3>1. Oral health</H3>
        <p>
          The foundation. AAP-EFP (periodontal staging), CAMBRA (caries-risk assessment), occlusion,
          and mucosal screening. The classical dental exam, done with more rigor and 3D imaging, but always
          in the context of the other four dimensions.
        </p>

        <H3>2. Airway and sleep</H3>
        <p>
          Most patients with sleep-disordered breathing have never been screened. STOP-BANG (sleep-apnea screen) questionnaire,
          airway analysis from the CBCT scan, tongue position, palate vault, nasal patency. If the data points
          toward sleep apnea or upper-airway resistance, we refer for a home sleep test and coordinate care
          with sleep medicine. CBCT also maps bone height, width, and density, which shows whether an implant
          site has enough support and reveals bone loss from periodontal (gum) disease (many implants fail because
          they were planned on a 2D x-ray that hid a lack of bone width or density).
        </p>

        <H3>3. Nutrition and longevity</H3>
        <p>
          We use the MEDAS (Mediterranean diet adherence) screener and the American Heart Association's Life's
          Essential 8 framework. Nutrition is connected to caries risk, periodontal inflammation, salivary flow,
          and bone health, and dentistry is one of the few places it can be assessed alongside hard data
          (your salivary diagnostics).
        </p>

        <H3>4. Microbiome and inflammation</H3>
        <p>
          The oral microbiome contains over 700 bacterial species and is the gateway to the gut microbiome.
          Salivary diagnostics identify pathogenic species, inflammation markers, and dysbiosis. We integrate
          findings with periodontal staging and systemic inflammation history (CRP, HbA1c if available).
        </p>

        <H3>5. Whole-body and systemic load</H3>
        <p>
          Material biocompatibility: the question of what's in your mouth and how your body responds to it.
          For most patients, this is a confirmation that no intervention is needed. For some, it's a roadmap
          for amalgam removal, metal sensitivity testing, or material replacement.
        </p>

        <H2>How we're different from conventional dentistry</H2>

        <table style={{ width: "100%", borderCollapse: "collapse", margin: "32px 0", fontSize: 15 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${PALETTE.navy}` }}>
              <th style={{ textAlign: "left", padding: "12px 8px", fontFamily: "Georgia,serif", color: PALETTE.navy, fontWeight: 500 }}></th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontFamily: "Georgia,serif", color: PALETTE.navy, fontWeight: 500 }}>Conventional</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontFamily: "Georgia,serif", color: PALETTE.blue, fontWeight: 500 }}>Primary iD</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["First visit length", "20–30 minutes", "90 minutes"],
              ["Imaging", "Bitewing X-rays", "3D CBCT + bitewings as needed"],
              ["Microbiome", "Not assessed", "Salivary diagnostics"],
              ["Airway", "Not assessed", "STOP-BANG + CBCT airway analysis"],
              ["Nutrition", "Not addressed", "MEDAS + LE8 baseline"],
              ["Materials", "Default to standard amalgam/composite", "Biocompatible by default; sensitivity testing when indicated"],
              ["Follow-up cadence", "Every 6 months", "Visit-by-visit, scored against your Primary iD baseline"],
              ["Output", "Cleaning record + treatment plan", "Primary iD health roadmap across five dimensions"],
            ].map(([row, conv, primary], i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
                <td style={{ padding: "10px 8px", fontWeight: 600, color: PALETTE.navy }}>{row}</td>
                <td style={{ padding: "10px 8px", color: PALETTE.body, opacity: 0.85 }}>{conv}</td>
                <td style={{ padding: "10px 8px", color: PALETTE.navy }}>{primary}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <H2>What we screen for that most dentists don't</H2>
        <ul style={{ color: PALETTE.body, lineHeight: 1.8 }}>
          <li><strong style={{ color: PALETTE.navy }}>Sleep-disordered breathing</strong> via STOP-BANG (sleep-apnea screen) and CBCT airway analysis</li>
          <li><strong style={{ color: PALETTE.navy }}>Oral microbiome</strong> dysbiosis via salivary diagnostics</li>
          <li><strong style={{ color: PALETTE.navy }}>Periodontal (gum-disease) staging</strong> using the AAP-EFP framework, not just probing depths</li>
          <li><strong style={{ color: PALETTE.navy }}>Caries risk</strong> with CAMBRA (Caries Management by Risk Assessment)</li>
          <li><strong style={{ color: PALETTE.navy }}>Nutrition</strong> baseline with MEDAS adherence + LE8 lifestyle markers</li>
          <li><strong style={{ color: PALETTE.navy }}>Material sensitivities</strong> when there's a clinical reason (autoimmune history, multiple sensitivities, prior reactions)</li>
          <li><strong style={{ color: PALETTE.navy }}>Bite mechanics and TMJ function</strong>, not just static cavity-checking</li>
        </ul>

        <H2>A note on the spelling</H2>
        <p style={{ color: PALETTE.muted, fontSize: 15, fontStyle: "italic" }}>
          "Wholistic" is the older spelling, emphasizing wholeness, and it's the spelling our community has
          known us by. The contemporary spelling "holistic" means the same thing. We'll answer to either.
        </p>

        <CTAGroup
          primary={{ label: "Start with your Primary iD score", href: "/diagnostics/" }}
          secondary={{ label: "Book a first visit", href: "/new-patient/" }}
        />
      </ArticleContainer>
      <SiteFooter />
    </>
  )
}
