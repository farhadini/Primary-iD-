import { cookies } from "next/headers";
import BrandGate from "./gate";

// ============================================================================
// Primary iD · Brand Hub, team & partners  (/brand/internal)
//
// Everything we do NOT want the open web reading: the full voice do/don't, the
// campaigns and the audiences behind them, the Google Drive links, and the
// brand skill files. The open identity kit lives at /brand/.
//
// This is a SERVER component on purpose. The old hub was a client component
// with the gate in the browser, which meant every protected string still
// shipped inside the JavaScript bundle — the password hid it from a visitor,
// not from anyone who opened devtools. Here the content is rendered only when
// the request already carries the httpOnly "brandhub" cookie that
// /api/brand-auth sets, so an unauthenticated browser never receives it.
//
// Still a soft gate: one shared password, no accounts. Good enough for brand
// material. Anything genuinely sensitive does not belong on a web page at all.
// TODO(farhad): set BRAND_PASSWORD in Vercel. Until then the fallback in
// app/api/brand-auth/route.ts applies, and this repo is public, so that
// fallback is readable by anyone.
// ============================================================================

export const dynamic = "force-dynamic";

const B = {
  navy: "#0E2240", blue: "#24A7E0", green: "#48C28C", cream: "#FAF8F5",
  warmWhite: "#FEFCF9", white: "#FFFFFF", gold: "#C49E68", rose: "#C8456B",
  body: "#4A4A5A", muted: "#8A8A9A", border: "rgba(14,34,64,0.08)",
};

const DRIVE_ASSETS = "https://drive.google.com/drive/folders/14V9-2NLogODIw887Q7o1XtDzcZ76fXXP";
const DRIVE_VIDEOS = "https://drive.google.com/drive/folders/1XwdOkEddiTYWFW61Og0jf-Gv4PAf0TQT";

const CAMPAIGNS = [
  { name: "The Optimizer", color: B.blue, line: "Five Dimensions. For the person who tracks everything about their body and wonders why no one has ever measured their mouth." },
  { name: "The Restorer", color: B.rose, line: "The Things We Miss + Implant. For the person who has lived around a problem so long it feels normal." },
  { name: "Cosmetic / Beauty", color: B.gold, line: "For the person who keeps noticing their smile in photos. (Creative in development.)" },
];

const VOICE_DO = [
  "Say “integrative dentistry,” not “holistic.”",
  "Lead with the whole person: sleep, history, whole health, then the mouth.",
  "Speak to capability and health, not vanity or “biological age.”",
  "Frame care around need, and let the want lead them to the door.",
  "Calm, clear, premium. Four Seasons, not neon.",
];
const VOICE_DONT = [
  "Don’t use “holistic” in public copy (except the legacy /wholistic-dentistry/ URL).",
  "Don’t use the B2B “100 practitioners” invitation language publicly.",
  "Don’t lead with price or discounts.",
  "Don’t bury the human. Real people over stock and icons.",
  "Don’t change the homepage H1 or the locked dimension colours.",
];

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: "56px 0", borderTop: `1px solid ${B.border}` }}>
      <div style={{ textTransform: "uppercase", letterSpacing: "0.16em", fontSize: 11, color: B.blue, fontWeight: 600, marginBottom: 10 }}>{eyebrow}</div>
      <h2 className="r-h2" style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: 32, color: B.navy, margin: "0 0 24px" }}>{title}</h2>
      {children}
    </section>
  );
}

const chip = { display: "inline-block", padding: "13px 22px", borderRadius: 10, textDecoration: "none", fontFamily: "Georgia,serif", fontSize: 14.5, fontWeight: 600 } as const;

export default async function BrandInternalPage() {
  const jar = await cookies();
  if (jar.get("brandhub")?.value !== "1") return <BrandGate />;

  return (
    <main style={{ background: B.cream, color: B.body, fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" }}>
      {/* Header */}
      <div style={{ background: B.navy, padding: "28px 0" }}>
        <div className="r-pad" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <img src="/brand/logo/primary-logo-white.png" alt="Primary Integrative Dentistry" style={{ height: 40, width: "auto" }} />
          <span style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Team hub · confidential</span>
        </div>
      </div>

      <div className="r-pad" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        {/* Intro */}
        <div style={{ padding: "48px 0 8px" }}>
          <h1 className="r-h1" style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: 44, lineHeight: 1.1, color: B.navy, margin: "0 0 16px", maxWidth: 720 }}>
            The part of the brand that stays <span style={{ color: B.blue, fontStyle: "italic" }}>between us</span>.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: B.body, maxWidth: 640, margin: 0 }}>
            How we talk, who each campaign is for, and where the working files live. When something links to Google Drive, that folder holds the full and raw files. If the site and a Drive file disagree, the site wins.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <a href="#voice" style={{ ...chip, background: B.navy, color: B.white }}>Voice rules</a>
            <a href="#campaigns" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>Campaign &amp; creative</a>
            <a href="#videos" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>Videos</a>
            <a href="#files" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>Working files &amp; skills</a>
            <a href="/brand/" style={{ ...chip, background: B.white, color: B.navy, border: `1px solid ${B.border}` }}>← Identity kit</a>
          </div>
        </div>

        {/* Voice */}
        <Section id="voice" eyebrow="Voice & tone" title="How we write — the full rules">
          <p style={{ fontSize: 16.5, color: B.body, lineHeight: 1.6, maxWidth: 680, marginTop: 0 }}>
            The one line: <strong style={{ color: B.navy }}>Dentistry reimagined to see the whole you.</strong> Whole-body health, read through your mouth, the front door to your health. We tell people who we are before what we do.
          </p>
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20 }}>
            <div style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "24px 26px" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: B.green, marginBottom: 12 }}>Do</div>
              {VOICE_DO.map((t, i) => <div key={i} style={{ fontSize: 14.5, color: B.body, lineHeight: 1.5, padding: "7px 0", borderTop: i ? `1px solid ${B.border}` : "none" }}>{t}</div>)}
            </div>
            <div style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "24px 26px" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: B.rose, marginBottom: 12 }}>Don&apos;t</div>
              {VOICE_DONT.map((t, i) => <div key={i} style={{ fontSize: 14.5, color: B.body, lineHeight: 1.5, padding: "7px 0", borderTop: i ? `1px solid ${B.border}` : "none" }}>{t}</div>)}
            </div>
          </div>
          <div style={{ marginTop: 20, background: B.warmWhite, border: `1px solid ${B.border}`, borderRadius: 14, padding: "20px 24px", fontSize: 14.5, lineHeight: 1.65 }}>
            <strong style={{ color: B.navy }}>Two of these are not style preferences.</strong> Dr. Gabi is a <strong style={{ color: B.navy }}>prosthodontist</strong> — never an orthodontist, an oral physician, or &ldquo;specialising in orthodontics.&rdquo; And nothing we publish may claim that dental treatment treats sleep apnoea. Both are California advertising rules, not house style.
          </div>
        </Section>

        {/* Campaigns & creative */}
        <Section id="campaigns" eyebrow="Campaign & creative" title="Campaigns & ad designs">
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {CAMPAIGNS.map((c) => (
              <div key={c.name} style={{ background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "22px 22px", borderTop: `3px solid ${c.color}` }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: B.navy, marginBottom: 8 }}>{c.name}</div>
                <p style={{ fontSize: 14, color: B.body, lineHeight: 1.55, margin: 0 }}>{c.line}</p>
              </div>
            ))}
          </div>
          {/* Ad designs · Farhad to drop the latest ad HTML here */}
          <div style={{ marginTop: 22, background: B.warmWhite, border: `1px dashed ${B.blue}`, borderRadius: 14, padding: "26px 26px" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 17, color: B.navy, marginBottom: 6 }}>Latest ad designs</div>
            <p style={{ fontSize: 14.5, color: B.body, lineHeight: 1.6, margin: "0 0 14px" }}>
              The current ad HTML designs will live here, previewable and downloadable. (Placeholder, pending the latest set.) The full creative library and source files are in Drive.
            </p>
            <a href={DRIVE_ASSETS} target="_blank" rel="noopener" style={{ ...chip, background: B.navy, color: B.white, fontSize: 14 }}>Open creative in Drive</a>
          </div>
        </Section>

        {/* Videos */}
        <Section id="videos" eyebrow="Video" title="Brand & campaign videos">
          <div style={{ background: B.navy, borderRadius: 16, padding: "36px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 520 }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: B.white, marginBottom: 8 }}>The full video library</div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>Brand films, campaign cuts and social edits, hosted in Drive so you always pull the latest master. Grab the file or the shareable link from the folder.</p>
            </div>
            <a href={DRIVE_VIDEOS} target="_blank" rel="noopener" style={{ ...chip, background: B.white, color: B.navy }}>Open video folder ↗</a>
          </div>
        </Section>

        {/* Working files & skills */}
        <Section id="files" eyebrow="Working files & skills" title="Files, skills & source">
          <div className="r-grid1 r-gap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <a href={DRIVE_ASSETS} target="_blank" rel="noopener" style={{ textDecoration: "none", background: B.white, border: `1px solid ${B.border}`, borderRadius: 14, padding: "22px 24px", display: "block" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 17, color: B.navy, marginBottom: 6 }}>Marketing assets (Drive) ↗</div>
              <p style={{ fontSize: 14, color: B.body, lineHeight: 1.55, margin: 0 }}>Editable source files, campaign creative, working files, vector logos, and everything not hosted on the site.</p>
            </a>
            <div style={{ background: B.white, border: `1px dashed ${B.gold}`, borderRadius: 14, padding: "22px 24px" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 17, color: B.navy, marginBottom: 6 }}>Skill files</div>
              <p style={{ fontSize: 14, color: B.body, lineHeight: 1.55, margin: 0 }}>The AI brand skill files for partners to run in their own tools. (Placeholder, pending upload.)</p>
            </div>
          </div>

          <div style={{ marginTop: 18, fontSize: 14.5, color: B.body }}>
            Questions, new assets, or access requests: <a href="mailto:care@myprimaryid.com" style={{ color: B.blue, textDecoration: "none", fontWeight: 600 }}>care@myprimaryid.com</a>.
          </div>
        </Section>

        <div style={{ padding: "40px 0 64px", fontSize: 12.5, color: B.muted }}>
          Primary Integrative Dentistry · Team hub · Confidential, for internal and partner use. The open identity kit is at <a href="/brand/" style={{ color: B.blue, textDecoration: "none" }}>myprimaryid.com/brand</a>.
        </div>
      </div>
    </main>
  );
}
