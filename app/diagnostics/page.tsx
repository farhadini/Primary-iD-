"use client";

import { useState, useEffect } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

// ── Brand ────────────────────────────────────────────────────────────────
const B = {
  navy: "#0E2240", blue: "#24A7E0", green: "#48C28C", pink: "#C7305A", purple: "#7B68EE",
  cream: "#FAF8F5", warmWhite: "#FEFCF9", white: "#FFFFFF", body: "#4A4A5A", muted: "#8A8A9A",
  border: "rgba(14,34,64,0.08)",
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// ── The five dimensions (Oral · Sleep & Airway · Nutrition · Family History · Longevity) ──
type Opt = { l: string; pts: number; ins?: string };
type Dim = { id: string; code: string; name: string; color: string; eb: string; headline: string; qs: { q: string; opts: Opt[] }[] };

const DIMS: Dim[] = [
  { id: "oral", code: "01", name: "Oral Health", color: B.green, eb: "#2d8a5f", headline: "What your mouth says about the rest of you.",
    qs: [
      { q: "How often do your gums bleed when you brush or floss?", opts: [["Rarely or never",20,"A healthy, non-inflamed baseline."],["Sometimes",12,"Early inflammation, and reversible."],["Often",5,"Gums connect to the whole body. Worth acting on."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "When was your last dental cleaning?", opts: [["Within 6 months",20,"Prevention is doing its job."],["6 to 12 months ago",13,"About time for a reset."],["Over a year ago",6,"A lot can change in a year."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Any sensitivity to hot, cold, or sweet?", opts: [["None",20,""],["Sometimes",12,"Often early enamel wear, very preventable."],["Often",5,"A signal worth a closer look."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Do you brush twice a day and floss daily?", opts: [["Yes",20,"This alone cuts gum-disease risk sharply."],["Most days",13,""],["Rarely",6,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Confident in how your smile looks and feels?", opts: [["Yes",20,""],["Somewhat",13,""],["Not really",6,"Your foundation is exactly where we start."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
    ] },
  { id: "sleep", code: "02", name: "Sleep & Airway", color: B.blue, eb: "#1a6f9c", headline: "How you breathe shapes how you heal.",
    qs: [
      { q: "How rested do you feel most mornings?", opts: [["Refreshed",20,""],["Okay",12,""],["Tired",5,"Daytime fatigue is the most missed airway sign."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Has anyone said you snore or stop breathing at night?", opts: [["No",20,""],["Sometimes",12,""],["Yes",5,"A strong signal worth screening for."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Do you grind or clench your teeth?", opts: [["No",20,""],["Sometimes",12,""],["Often",5,"Grinding is often the airway compensating at night."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Do you breathe mostly through your nose?", opts: [["Yes",20,"Nasal breathing drives oxygen and immunity."],["A mix",12,""],["Mouth mostly",6,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Wake up with a dry mouth or morning headache?", opts: [["No",20,""],["Sometimes",12,""],["Often",5,"Classic airway signals, often dismissed as stress."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
    ] },
  { id: "nutrition", code: "03", name: "Nutrition", color: B.pink, eb: "#992c4a", headline: "The ecosystem you feed every day.",
    qs: [
      { q: "How often do you eat whole, unprocessed food?", opts: [["Most meals",20,""],["Sometimes",12,""],["Rarely",6,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Sugary drinks or snacks between meals?", opts: [["Rarely",20,""],["Sometimes",12,""],["Daily",5,"Sugar is the main fuel for decay-causing bacteria."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Do you drink enough water through the day?", opts: [["Yes",20,"Saliva is your mouth's defense system."],["Some",12,""],["Not much",6,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Fermented foods like yogurt, kefir, or kraut?", opts: [["Regularly",20,"Seeds a healthier microbiome."],["Sometimes",13,""],["Never",7,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Would you call your diet mostly anti-inflammatory?", opts: [["Yes",20,""],["Somewhat",13,""],["No",6,"The mouth is where that change shows first."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
    ] },
  { id: "family", code: "04", name: "Family History", color: B.purple, eb: "#4f3fb0", headline: "Your biology, not a template.",
    qs: [
      { q: "Family history of gum disease or early tooth loss?", opts: [["No",20,""],["Some",12,""],["Yes",6,"We screen earlier when it runs in the family."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Heart disease or diabetes in your immediate family?", opts: [["No",20,""],["Some",12,""],["Yes",6,"These share inflammatory pathways with oral health."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Autoimmune conditions in the family?", opts: [["No",20,""],["Some",13,""],["Yes",7,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Frequent cavities despite good habits?", opts: [["No",20,""],["Sometimes",12,""],["Often",6,"Often a treatable microbiome or enamel trait."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Curious what your biology says about your risk?", opts: [["Yes",20,"Curiosity is the first step, and we can test."],["Maybe",14,""],["Not yet",9,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
    ] },
  { id: "longevity", code: "05", name: "Longevity", color: B.navy, eb: B.navy, headline: "Why your mouth can add years, or take them.",
    qs: [
      { q: "How would you rate your overall energy?", opts: [["High",20,""],["Moderate",12,""],["Low",6,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Do you move or exercise most weeks?", opts: [["Yes",20,""],["Sometimes",12,""],["Rarely",6,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Do you feel on top of your overall health?", opts: [["Yes",20,""],["Mostly",13,""],["Not really",6,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Managing stress in a way that works for you?", opts: [["Yes",20,""],["Somewhat",13,""],["No",6,"Stress shows up in the mouth too."]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
      { q: "Optimizing for healthspan, not just fixing problems?", opts: [["Yes",20,"The mouth is the lowest-effort place to start."],["Curious",14,""],["Not yet",9,""]].map(([l,pts,ins])=>({l,pts,ins}) as Opt) },
    ] },
];

const C = 2 * Math.PI * 54;
function tierWord(v: number){ return v>=85?"Thriving":v>=70?"Strong":v>=50?"Foundational":"Needs focus"; }
function bandLine(v: number){ return v>=85?"Strong across the board. Here is how to protect it.":v>=70?"A solid foundation, with a few clear levers.":v>=50?"A real base to build on, and clear places to win.":"This is your highest-leverage place to start."; }

function Ring({ value, color, size = 150, sw = 10, showNum = true }: { value: number; color: string; size?: number; sw?: number; showNum?: boolean }) {
  const off = C * (1 - Math.max(0, Math.min(100, value)) / 100);
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" aria-hidden="true">
      <circle cx="75" cy="75" r="54" fill="none" stroke="rgba(14,34,64,0.10)" strokeWidth={sw} />
      <circle className="pid-ring" cx="75" cy="75" r="54" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={off} transform="rotate(-90 75 75)" style={{ transition: "stroke-dashoffset .7s cubic-bezier(.3,1,.4,1)" }} />
      {showNum && (<><text x="75" y="80" textAnchor="middle" fontFamily={SERIF} fontSize="40" fontWeight={500} fill={B.navy}>{Math.round(value)}</text><text x="75" y="99" textAnchor="middle" fontFamily={SANS} fontSize="11" fill={B.muted} letterSpacing="1">/ 100</text></>)}
    </svg>
  );
}

const optStyle: React.CSSProperties = { display: "block", width: "100%", textAlign: "left", border: `1px solid ${B.border}`, background: B.white, borderRadius: 12, padding: "14px 16px", fontSize: 15, color: B.navy, cursor: "pointer", marginTop: 10, fontFamily: SANS, transition: "border-color .18s, background .18s" };
const inputStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: `1px solid ${B.border}`, background: B.white, borderRadius: 12, padding: "14px 16px", fontSize: 15, color: B.navy, fontFamily: SANS, marginTop: 10, outline: "none" };

export default function DiagnosticsPage() {
  const [stage, setStage] = useState<"intro" | "gate" | "quiz" | "done">("intro");
  const [di, setDi] = useState(0);
  const [qi, setQi] = useState(0);
  const [dimPts, setDimPts] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [lastIns, setLastIns] = useState("");
  const [user, setUser] = useState({ firstName: "", email: "", mobile: "" });
  const [err, setErr] = useState<{ firstName?: boolean; email?: boolean }>({});

  const D = DIMS[di];

  function startQuiz() { setStage("quiz"); setDi(0); setQi(0); setDimPts(0); setScores([]); setLastIns(""); }
  function submitGate() {
    const e: { firstName?: boolean; email?: boolean } = {};
    if (!user.firstName.trim()) e.firstName = true;
    if (!user.email.includes("@") || !user.email.includes(".")) e.email = true;
    setErr(e);
    if (Object.keys(e).length) return;
    startQuiz();
  }
  function answer(pts: number, ins?: string) {
    const np = dimPts + pts;
    setDimPts(np); setLastIns(ins || "");
    if (qi < D.qs.length - 1) { setQi(qi + 1); }
    else { setScores((prev) => { const c = [...prev]; c[di] = np; return c; }); setQi(D.qs.length); }
  }
  function next() { if (di < DIMS.length - 1) { setDi(di + 1); setQi(0); setDimPts(0); setLastIns(""); } else { setStage("done"); } }

  const composite = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  useEffect(() => {
    if (stage !== "done" || scores.length < DIMS.length) return;
    const chapters = DIMS.map((d, i) => ({ slug: d.id, score: scores[i] ?? 0, tier: tierWord(scores[i] ?? 0), responses: {} }));
    const sid = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
    fetch("/api/submit-assessment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ anonSessionId: sid, user, chapters }) }).catch(() => {});
  }, [stage]);

  return (
    <div style={{ minHeight: "100vh", background: B.cream, fontFamily: SANS }}>
      <style>{`@media (prefers-reduced-motion: reduce){ .pid-ring{ transition:none !important } }`}</style>
      <SiteNav />
      <main style={{ maxWidth: 620, margin: "0 auto", padding: "56px 20px 80px" }}>

        {stage === "intro" && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: B.blue, margin: "0 0 14px" }}>The Primary iD Assessment</p>
            <h1 style={{ fontFamily: SERIF, fontSize: 40, lineHeight: 1.12, color: B.navy, margin: "0 0 18px", fontWeight: 400 }}>See your whole health in <span style={{ fontStyle: "italic", color: B.blue }}>five dimensions</span>.</h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: B.body, maxWidth: 460, margin: "0 auto 12px" }}>Not a form. A five-minute read on your oral health, sleep and airway, nutrition, family history, and longevity, translated into your Primary iD.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "18px 0 26px", flexWrap: "wrap" }}>
              {DIMS.map((d) => (<div key={d.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 84 }}><span style={{ width: 14, height: 14, borderRadius: "50%", background: d.color }} /><span style={{ fontSize: 10.5, color: B.muted, textAlign: "center", lineHeight: 1.2 }}>{d.name}</span></div>))}
            </div>
            <button onClick={() => setStage("gate")} style={{ background: B.navy, color: B.white, border: "none", borderRadius: 999, padding: "15px 30px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: SANS, display: "inline-flex", alignItems: "center", gap: 8 }}>Start your Primary iD <ArrowRight size={16} /></button>
            <p style={{ fontSize: 12.5, color: B.muted, margin: "16px 0 0" }}>Free. Private. About 5 minutes.</p>
          </div>
        )}

        {stage === "gate" && (
          <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <div style={{ background: B.warmWhite, border: `1px solid ${B.border}`, borderRadius: 18, padding: "28px 26px", boxShadow: "0 24px 50px -34px rgba(14,34,64,0.25)" }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: B.blue, margin: "0 0 6px" }}>Before we begin</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 24, lineHeight: 1.25, color: B.navy, margin: "0 0 8px", fontWeight: 400 }}>Who are we building this for?</h2>
              <p style={{ fontSize: 14, color: B.body, lineHeight: 1.55, margin: "0 0 6px" }}>Your Primary iD is saved to you, so you can pick up where you left off and bring it to your visit.</p>
              <input placeholder="First name" value={user.firstName} onChange={(e) => { setUser({ ...user, firstName: e.target.value }); setErr({ ...err, firstName: false }); }} style={{ ...inputStyle, borderColor: err.firstName ? "#C7305A" : B.border }} />
              <input placeholder="Email address" type="email" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }); setErr({ ...err, email: false }); }} style={{ ...inputStyle, borderColor: err.email ? "#C7305A" : B.border }} />
              <input placeholder="Mobile (optional)" type="tel" value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} style={inputStyle} />
              {(err.firstName || err.email) && <p style={{ fontSize: 12.5, color: "#C7305A", margin: "8px 0 0" }}>Please enter your name and a valid email to continue.</p>}
              <button onClick={submitGate} style={{ width: "100%", marginTop: 16, background: B.navy, color: B.white, border: "none", borderRadius: 999, padding: "14px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: SANS, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>Begin assessment <ArrowRight size={16} /></button>
              <p style={{ fontSize: 11.5, color: B.muted, margin: "12px 0 0", textAlign: "center", lineHeight: 1.5 }}>Private. We never share your information.</p>
            </div>
          </div>
        )}

        {stage === "quiz" && (
          <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {DIMS.map((d, i) => (<div key={d.id} style={{ flex: 1, height: 4, borderRadius: 4, background: i < di ? d.color : i === di ? `${d.color}66` : "rgba(14,34,64,0.10)", transition: "background .4s" }} />))}
            </div>
            <div style={{ background: B.warmWhite, border: `1px solid ${B.border}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 50px -34px rgba(14,34,64,0.25)" }}>
              <div style={{ height: 5, background: D.color }} />
              <div style={{ padding: "24px 24px 28px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: D.eb, margin: "0 0 6px" }}>{D.code} / {D.name}</p>
                <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 4px" }}><Ring value={dimPts} color={D.color} /></div>
                {qi < D.qs.length ? (
                  <div>
                    <div style={{ minHeight: 18, textAlign: "center", marginBottom: 8 }}>{lastIns && <span style={{ fontSize: 13, color: D.eb, lineHeight: 1.4 }}>{lastIns}</span>}</div>
                    <div style={{ fontSize: 11, color: B.muted, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8, textAlign: "center" }}>Question {qi + 1} of {D.qs.length}</div>
                    <p style={{ fontFamily: SERIF, fontSize: 20, lineHeight: 1.3, color: B.navy, margin: "0 0 6px", textAlign: "center" }}>{D.qs[qi].q}</p>
                    {D.qs[qi].opts.map((o, k) => (<button key={k} onClick={() => answer(o.pts, o.ins)} style={optStyle} onMouseEnter={(e) => { e.currentTarget.style.borderColor = B.navy; e.currentTarget.style.background = B.cream; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = B.border; e.currentTarget.style.background = B.white; }}>{o.l}</button>))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <span style={{ display: "inline-block", background: `${D.color}1a`, color: D.eb, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "5px 13px", borderRadius: 999, margin: "4px 0 12px" }}>Your {D.name} read</span>
                    <p style={{ fontFamily: SERIF, fontSize: 21, lineHeight: 1.3, color: B.navy, margin: "0 0 8px" }}>{D.headline}</p>
                    <p style={{ fontSize: 14.5, color: B.body, lineHeight: 1.6, margin: "0 0 20px" }}>{bandLine(dimPts)}</p>
                    <button onClick={next} style={{ background: di < DIMS.length - 1 ? D.color : B.navy, color: B.white, border: "none", borderRadius: 999, padding: "13px 24px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", fontFamily: SANS, display: "inline-flex", alignItems: "center", gap: 8 }}>{di < DIMS.length - 1 ? "Continue" : "See your Primary iD"} <ArrowRight size={15} /></button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {stage === "done" && (
          <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: B.blue, margin: "0 0 6px" }}>{user.firstName ? user.firstName + ", your" : "Your"} Primary iD</p>
            <div style={{ fontFamily: SERIF, fontSize: 66, color: B.navy, lineHeight: 1 }}>{composite}<span style={{ fontSize: 22, color: B.muted }}> / 100</span></div>
            <p style={{ fontFamily: SERIF, fontSize: 22, color: B.navy, margin: "8px 0 4px" }}>{tierWord(composite)}</p>
            <p style={{ fontSize: 15, color: B.body, lineHeight: 1.6, margin: "0 auto 22px", maxWidth: 380 }}>{bandLine(composite)}</p>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 4, marginBottom: 26 }}>
              {DIMS.map((d, i) => (<div key={d.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}><Ring value={scores[i] ?? 0} color={d.color} size={58} sw={12} showNum={false} /><span style={{ fontFamily: SERIF, fontSize: 17, color: B.navy, marginTop: -4 }}>{scores[i] ?? 0}</span><span style={{ fontSize: 9.5, color: B.muted, lineHeight: 1.2, maxWidth: 66 }}>{d.name}</span></div>))}
            </div>
            <a href="/book/" style={{ background: B.navy, color: B.white, textDecoration: "none", borderRadius: 999, padding: "15px 30px", fontSize: 15, fontWeight: 600, fontFamily: SANS, display: "inline-flex", alignItems: "center", gap: 8 }}>Book your visit with Dr. Gabi <ArrowRight size={16} /></a>
            <div style={{ marginTop: 16 }}><button onClick={startQuiz} style={{ background: "none", border: "none", color: B.navy, fontWeight: 600, fontSize: 13.5, cursor: "pointer", fontFamily: SANS, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "underline", textUnderlineOffset: 3 }}><RotateCcw size={13} /> Start over</button></div>
            <p style={{ fontSize: 12.5, color: B.muted, margin: "22px auto 0", maxWidth: 380, lineHeight: 1.5 }}>Your Primary iD is saved. Dr. Gabi builds on it at your first visit.</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
