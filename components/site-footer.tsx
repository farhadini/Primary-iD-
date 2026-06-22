"use client";

// ============================================================
// PRIMARY: Shared site footer
// Faithful copy of the homepage Footer so every page renders
// an identical footer.
// ============================================================

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
};

const footerLinks = [
  { heading: "Visit", links: [
    { label: "Book appointment", href: "/book/" },
    { label: "New patients", href: "/new-patient/" },
    { label: "Our location", href: "https://maps.app.goo.gl/oQoaV1MrCoMEQ1CS8" },
    { label: "FAQ", href: "/faq/" },
  ]},
  { heading: "Care", links: [
    { label: "Preventive care", href: "/book/preventive/" },
    { label: "Airway & sleep", href: "/book/airway/" },
    { label: "Cosmetic dentistry", href: "/cosmetic-dentistry/" },
    { label: "Dental implants", href: "/dental-implant/" },
    { label: "Safe mercury removal", href: "/safe-mercury-removal/" },
    { label: "Wholistic dentistry", href: "/wholistic-dentistry/" },
  ]},
  { heading: "Learn", links: [
    { label: "Why Primary", href: "/why-primary/" },
    { label: "Five Dimensions", href: "/five-dimensions/" },
    { label: "Dr. Gabi", href: "/about/" },
    { label: "Second opinions", href: "/second-opinion/" },
    { label: "Primary Journal", href: "/blogs/" },
    { label: "Health assessment", href: "/diagnostics/" },
  ]},
];

export function SiteFooter() {
  return (
    <footer style={{ background: B.navy, padding: "56px 32px 36px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48, paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 18 }}>
              <img
                src="/images/primary-brand-logo.png"
                alt="Primary"
                style={{ height: 52, width: "auto", filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, maxWidth: 260 }}>
              Integrative dentistry that looks at your whole health picture, not just your teeth.
            </p>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 16 }}>
              11980 San Vicente Blvd, Suite 902<br />
              Los Angeles, CA 90049<br />
              <span style={{ color: B.blue }}>(310) 564-8990</span>
            </p>
          </div>

          {footerLinks.map(col => (
            <div key={col.heading}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", marginBottom: 16 }}>{col.heading.toUpperCase()}</div>
              {col.links.map(link => (
                <a key={link.label} href={link.href} style={{ display: "block", fontFamily: "Georgia,serif", fontSize: 14, color: "rgba(255,255,255,0.75)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseOver={e => { (e.target as HTMLElement).style.color = B.blue; }}
                  onMouseOut={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
                >{link.label}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Primary Integrative Dentistry
          </span>
          <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
            Dr. Tzur Gabi, Founder
          </span>
        </div>
      </div>
    </footer>
  );
}
