import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader, SiteFooter, ArticleContainer, Hero, H2, PALETTE } from "@/components/site-shell"
import { BreadcrumbSchema } from "@/components/schema"

// ─────────────────────────────────────────────────────────────────────────
// Terms of Service. The "Text messaging terms" section is the SMS program
// disclosure carriers / Modento require alongside the Privacy Policy for the
// A2P 10DLC texting number. Keep STOP/HELP + "message and data rates" wording.
// TODO(farhad): have counsel review before relying on this.
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the Primary Integrative Dentistry website, including our text messaging (SMS) program terms and conditions.",
  alternates: { canonical: "https://myprimaryid.com/terms/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms of Service | Primary Integrative Dentistry",
    description:
      "The terms governing your use of the Primary Integrative Dentistry website, including SMS program terms and conditions.",
    url: "https://myprimaryid.com/terms/",
  },
}

const EFFECTIVE = "July 22, 2026"

export default function TermsOfServicePage() {
  return (
    <>
      <SiteHeader />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Terms of Service", url: "https://myprimaryid.com/terms/" },
      ]} />

      <ArticleContainer>
        <Hero
          eyebrow="Legal"
          title="Terms of Service"
          subtitle="These terms govern your use of the Primary Integrative Dentistry website and our text messaging program. Please read them carefully."
        />

        <p style={{ color: PALETTE.muted, fontSize: 15, marginTop: -24 }}>
          Last updated: {EFFECTIVE}
        </p>

        <p>
          These Terms of Service (&quot;Terms&quot;) are a legal agreement between you and Primary Integrative Dentistry
          (&quot;Primary,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of
          the website at myprimaryid.com and the communications we provide. By using this website or opting in to our
          text messages, you agree to these Terms. If you do not agree, please do not use the site.
        </p>

        <H2>Use of the website</H2>
        <p>
          You may use this website for lawful, personal purposes. You agree not to misuse the site, interfere with its
          operation, attempt to access it in an unauthorized way, or use it to violate any applicable law. We may modify,
          suspend, or discontinue any part of the site at any time.
        </p>

        <H2>Not medical advice</H2>
        <p>
          The content on this website, including our online assessment and educational materials, is provided for general
          informational purposes only and is not a substitute for professional medical or dental advice, diagnosis, or
          treatment. Using this site or completing our assessment does not create a doctor-patient or provider-patient
          relationship. Always seek the advice of a qualified health provider with any questions about your health, and
          never disregard professional advice because of something you read here. If you have a medical emergency, call
          911 or your local emergency number.
        </p>

        <H2>Appointments and assessments</H2>
        <p>
          Requests submitted through the website, including appointment requests and assessment results, are received by
          our team and are not confirmed until we contact you. Our online assessment produces an informational score and
          is not a diagnosis. A diagnosis and treatment plan can only be made by our clinicians after an in-person
          evaluation.
        </p>

        <H2>Text messaging terms</H2>
        <p>
          By providing your mobile phone number and opting in, you consent to receive text messages from Primary
          Integrative Dentistry related to your care, such as appointment reminders and confirmations, intake and form
          links, and other care-related or informational messages.
        </p>
        <ul>
          <li><strong>Program:</strong> Primary Integrative Dentistry patient and appointment messaging.</li>
          <li><strong>Message frequency:</strong> varies based on your interactions with us and your appointments.</li>
          <li><strong>Cost:</strong> Message and data rates may apply, according to your mobile carrier plan.</li>
          <li><strong>Opt out:</strong> Reply STOP at any time to stop receiving text messages.</li>
          <li><strong>Help:</strong> Reply HELP for assistance, or call us at (310) 564-8990.</li>
          <li><strong>Carriers:</strong> Mobile carriers are not liable for delayed or undelivered messages.</li>
        </ul>
        <p>
          Consent to receive text messages is not a condition of receiving care. For details about how we handle the
          information associated with our text messaging, including that we do not share mobile opt-in data with third
          parties for marketing, see our{" "}
          <Link href="/privacy/" style={{ color: PALETTE.blue, textDecoration: "none" }}>Privacy Policy</Link>.
        </p>

        <H2>Intellectual property</H2>
        <p>
          The content on this website, including text, graphics, logos, and images, is owned by or licensed to Primary
          Integrative Dentistry and is protected by intellectual property laws. You may not reproduce, distribute, or
          create derivative works from our content without our prior written permission.
        </p>

        <H2>Third-party links</H2>
        <p>
          Our website may link to third-party websites and services that we do not control. We are not responsible for
          the content, policies, or practices of those third parties. Accessing them is at your own risk and subject to
          their terms.
        </p>

        <H2>Disclaimers and limitation of liability</H2>
        <p>
          The website is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any
          kind, whether express or implied, to the fullest extent permitted by law. To the fullest extent permitted by
          law, Primary Integrative Dentistry will not be liable for any indirect, incidental, or consequential damages
          arising from your use of, or inability to use, the website.
        </p>

        <H2>Governing law</H2>
        <p>
          These Terms are governed by the laws of the State of California, without regard to its conflict of laws rules.
          Any dispute relating to these Terms or the website will be subject to the exclusive jurisdiction of the courts
          located in Los Angeles County, California.
        </p>

        <H2>Changes to these terms</H2>
        <p>
          We may update these Terms from time to time. When we do, we will revise the &quot;last updated&quot; date
          above. Your continued use of the website after changes take effect constitutes acceptance of the updated Terms.
        </p>

        <H2>Contact us</H2>
        <p>
          Questions about these Terms? Contact us at:
        </p>
        <p>
          Primary Integrative Dentistry<br />
          11980 San Vicente Blvd, Suite 902<br />
          Los Angeles, CA 90049<br />
          Phone: <a href="tel:+13105648990" style={{ color: PALETTE.blue, textDecoration: "none" }}>(310) 564-8990</a><br />
          Email: <a href="mailto:care@myprimaryid.com" style={{ color: PALETTE.blue, textDecoration: "none" }}>care@myprimaryid.com</a>
        </p>

        <p style={{ marginTop: 40, fontSize: 15, color: PALETTE.muted }}>
          See also our{" "}
          <Link href="/privacy/" style={{ color: PALETTE.blue, textDecoration: "none" }}>Privacy Policy</Link>.
        </p>
      </ArticleContainer>

      <SiteFooter />
    </>
  )
}
