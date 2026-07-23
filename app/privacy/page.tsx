import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader, SiteFooter, ArticleContainer, Hero, H2, PALETTE } from "@/components/site-shell"
import { BreadcrumbSchema } from "@/components/schema"

// ─────────────────────────────────────────────────────────────────────────
// Privacy Policy. Required (with SMS-specific language) for A2P 10DLC / carrier
// approval of the Modento texting number. The mobile-data clause in the "Text
// messaging" section is the one carriers check for.
// TODO(farhad): have counsel review before relying on this. Contact email is
// care@myprimaryid.com.
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Primary Integrative Dentistry collects, uses, and protects your information, including our text messaging (SMS) and mobile data practices.",
  alternates: { canonical: "https://myprimaryid.com/privacy/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | Primary Integrative Dentistry",
    description:
      "How Primary Integrative Dentistry collects, uses, and protects your information, including SMS and mobile data practices.",
    url: "https://myprimaryid.com/privacy/",
  },
}

const EFFECTIVE = "July 22, 2026"

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://myprimaryid.com/" },
        { name: "Privacy Policy", url: "https://myprimaryid.com/privacy/" },
      ]} />

      <ArticleContainer>
        <Hero
          eyebrow="Legal"
          title="Privacy Policy"
          subtitle="This policy explains what information Primary Integrative Dentistry collects through this website and our communications, how we use it, and the choices you have."
        />

        <p style={{ color: PALETTE.muted, fontSize: 15, marginTop: -24 }}>
          Last updated: {EFFECTIVE}
        </p>

        <p>
          Primary Integrative Dentistry (&quot;Primary,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          operates the website at myprimaryid.com and provides dental and integrative health services from our
          office in Los Angeles, California. We respect your privacy and are committed to protecting the personal
          information you share with us. By using this website or providing your information to us, you agree to the
          practices described in this policy.
        </p>

        <H2>Information we collect</H2>
        <p>We collect information you provide directly and information collected automatically when you use the site.</p>
        <ul>
          <li><strong>Contact information</strong> you submit through forms, our online assessment, or when booking, such as your name, email address, phone number, and appointment preferences.</li>
          <li><strong>Health-related information</strong> you choose to share through our intake and assessment tools, such as symptoms, history, and goals. Information that identifies your health condition is treated as protected health information (see the section on protected health information below).</li>
          <li><strong>Usage information</strong> collected automatically, such as your IP address, device and browser type, pages viewed, and referring source, through cookies and analytics tools.</li>
        </ul>

        <H2>How we use your information</H2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Schedule, confirm, and manage your appointments and care.</li>
          <li>Respond to your questions and requests.</li>
          <li>Send you appointment reminders, forms, results, and care-related communications by email, phone, or text message, where you have provided the applicable contact information and consent.</li>
          <li>Operate, improve, and secure our website and services.</li>
          <li>Comply with our legal and professional obligations.</li>
        </ul>

        <H2>Text messaging (SMS)</H2>
        <p>
          With your consent, we send text messages to the mobile number you provide for purposes such as appointment
          reminders and confirmations, intake and form links, and other care-related communications. Message frequency
          varies. Message and data rates may apply. You can opt out of text messages at any time by replying STOP, and
          you can reply HELP for assistance. Opting out of text messages will not affect your ability to receive care.
        </p>
        <p>
          <strong>
            We do not sell your personal information, and we do not share your mobile phone number or your SMS opt-in
            consent with any third parties or affiliates for their own marketing or promotional purposes.
          </strong>{" "}
          Mobile opt-in and consent information is used solely to deliver the messages you have asked to receive and is
          not shared with third parties for marketing.
        </p>

        <H2>How we share information</H2>
        <p>
          We do not sell your personal information. We share information only in these limited circumstances: with
          service providers who perform functions on our behalf (see below) under obligations to protect it; when
          required by law or to comply with legal process; to protect the rights, safety, and property of our patients,
          our practice, or others; and in connection with a business transfer, subject to this policy. As stated above,
          mobile opt-in and text-messaging consent data is never shared with third parties for marketing.
        </p>

        <H2>Third-party service providers</H2>
        <p>
          We use trusted third-party providers to operate our website and communications, including hosting, patient
          communication and scheduling, customer relationship management, and website analytics. These providers may
          process information on our behalf and are permitted to use it only to provide services to us. Where a provider
          handles protected health information, we maintain the appropriate agreements required by law.
        </p>

        <H2>Protected health information</H2>
        <p>
          Information that relates to your health, health care, or payment for care and that identifies you is
          &quot;protected health information&quot; and is handled in accordance with the Health Insurance Portability
          and Accountability Act (HIPAA) and applicable state law. Our separate Notice of Privacy Practices governs how
          we use and disclose protected health information in connection with your treatment, and is provided to you as
          a patient of the practice. This website Privacy Policy governs information collected through the website and
          our marketing communications.
        </p>

        <H2>Cookies and analytics</H2>
        <p>
          We use cookies and similar technologies to operate the site, remember your preferences, and understand how
          the site is used. Analytics tools help us measure traffic and improve the experience. You can control cookies
          through your browser settings; disabling them may affect how the site functions.
        </p>

        <H2>Data security</H2>
        <p>
          We use administrative, technical, and physical safeguards designed to protect your information. No method of
          transmission or storage is completely secure, however, and we cannot guarantee absolute security. Please do
          not send sensitive health details through unsecured channels.
        </p>

        <H2>Your privacy rights</H2>
        <p>
          Depending on where you live, you may have rights regarding your personal information. California residents
          have rights under the California Consumer Privacy Act, as amended, including the right to know what personal
          information we collect, the right to request deletion, the right to correct inaccurate information, and the
          right not to be discriminated against for exercising these rights. We do not sell personal information. To
          exercise any of these rights, contact us using the information below and we will respond as required by law.
        </p>

        <H2>Children&apos;s privacy</H2>
        <p>
          This website is intended for adults. We do not knowingly collect personal information from children under 13
          through the website without appropriate parental consent. Information about minor patients is collected in the
          clinical setting through a parent or guardian.
        </p>

        <H2>Changes to this policy</H2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the &quot;last updated&quot;
          date above. Your continued use of the website after changes take effect constitutes acceptance of the updated
          policy.
        </p>

        <H2>Contact us</H2>
        <p>
          If you have questions about this Privacy Policy or how we handle your information, contact us at:
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
          <Link href="/terms/" style={{ color: PALETTE.blue, textDecoration: "none" }}>Terms of Service</Link>.
        </p>
      </ArticleContainer>

      <SiteFooter />
    </>
  )
}
