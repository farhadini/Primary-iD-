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

// ── Canonical question bank + scoring (Source of Truth: Primary_iD_Questions_and_Scoring) ──
// Each option carries its 0–100 item score (100 = most protective). A dimension
// score is the simple average of its 8 item scores; the composite is the equal-
// weight average of the five dimensions. Tiers apply to both.
type Opt = { l: string; s: number };
type Dim = { id: string; code: string; name: string; instrument: string; color: string; eb: string; headline: string; qs: { q: string; opts: Opt[] }[] };

const DIMS: Dim[] = [
  { id: "oral", code: "01", name: "Oral Health", instrument: "CAMBRA · OHIP-14", color: B.green, eb: "#2d8a5f", headline: "What your mouth says about the rest of you.",
    qs: [
      { q: "How often do you have sugary drinks or snacks between meals?", opts: [{l:"Rarely",s:92},{l:"Once a day",s:70},{l:"2–3 times a day",s:48},{l:"Constantly",s:28}] },
      { q: "Have you had a new cavity in the last 3 years?", opts: [{l:"No",s:90},{l:"Yes",s:42}] },
      { q: "Do you use fluoridated toothpaste twice a day?", opts: [{l:"Yes",s:88},{l:"No",s:50}] },
      { q: "Do your gums bleed when you brush or floss?", opts: [{l:"No",s:90},{l:"Yes",s:40}] },
      { q: "When was your last professional cleaning?", opts: [{l:"Under 6 months",s:92},{l:"6–12 months",s:72},{l:"1–2 years",s:48},{l:"2+ years",s:28}] },
      { q: "Do you often feel like your mouth is dry?", opts: [{l:"No",s:88},{l:"Yes",s:50}] },
      { q: "Do you grind or clench your teeth?", opts: [{l:"No",s:85},{l:"Yes",s:55}] },
      { q: "How confident do you feel about your smile?", opts: [{l:"Very confident",s:92},{l:"Somewhat",s:72},{l:"Not very",s:50},{l:"Not at all",s:32}] },
    ] },
  { id: "sleep", code: "02", name: "Sleep & Airway", instrument: "STOP-BANG · Epworth", color: B.blue, eb: "#1a6f9c", headline: "How you breathe shapes how you heal.",
    qs: [
      { q: "Do you snore loudly (heard through a door)?", opts: [{l:"No",s:88},{l:"Yes",s:45}] },
      { q: "Do you often feel tired or sleepy during the day?", opts: [{l:"No",s:85},{l:"Yes",s:48}] },
      { q: "Has anyone observed you stop breathing or gasp in sleep?", opts: [{l:"No",s:92},{l:"Yes",s:30}] },
      { q: "Are you being treated for high blood pressure?", opts: [{l:"No",s:82},{l:"Yes",s:52}] },
      { q: "Which best describes your build?", opts: [{l:"Slim / average",s:88},{l:"A bit heavy",s:66},{l:"Overweight",s:46},{l:"Larger",s:30}] },
      { q: "Your age range?", opts: [{l:"Under 50",s:85},{l:"50–64",s:66},{l:"65+",s:52}] },
      { q: "How would you describe your neck?", opts: [{l:"Slim",s:88},{l:"Average",s:68},{l:"Thick / large",s:46}] },
      { q: "Sitting and reading, how likely are you to doze?", opts: [{l:"Would never",s:90},{l:"Slight chance",s:70},{l:"Moderate chance",s:50},{l:"High chance",s:32}] },
    ] },
  { id: "nutrition", code: "03", name: "Nutrition", instrument: "MEDAS · BEVQ-15", color: B.pink, eb: "#992c4a", headline: "The ecosystem you feed every day.",
    qs: [
      { q: "Do you use olive oil as your main cooking fat?", opts: [{l:"Yes",s:88},{l:"No",s:58}] },
      { q: "How many servings of vegetables per day?", opts: [{l:"2+ a day",s:92},{l:"1 a day",s:66},{l:"A few a week",s:46},{l:"Rarely",s:30}] },
      { q: "How many fruits per day?", opts: [{l:"3+ a day",s:90},{l:"1–2 a day",s:70},{l:"A few a week",s:48},{l:"Rarely",s:30}] },
      { q: "How often do you eat red or processed meat?", opts: [{l:"Rarely",s:90},{l:"1–2 a week",s:72},{l:"Most days",s:48},{l:"Daily",s:30}] },
      { q: "How many sugar-sweetened beverages per week?", opts: [{l:"0–1",s:92},{l:"2–4",s:68},{l:"Daily",s:44},{l:"Several daily",s:26}] },
      { q: "How many glasses of water per day?", opts: [{l:"6+",s:88},{l:"3–5",s:68},{l:"1–2",s:46},{l:"Rarely",s:30}] },
      { q: "How often do you drink alcohol?", opts: [{l:"Rarely / none",s:88},{l:"Socially",s:70},{l:"A few times a week",s:52},{l:"Daily",s:34}] },
      { q: "Are most of your grains whole-grain?", opts: [{l:"Yes",s:86},{l:"No",s:56}] },
    ] },
  { id: "family", code: "04", name: "Family History", instrument: "AAP / EFP grading", color: B.purple, eb: "#4f3fb0", headline: "Your biology, not a template.",
    qs: [
      { q: "Did a parent or sibling lose teeth to gum disease?", opts: [{l:"No",s:88},{l:"Yes",s:46}] },
      { q: "Does diabetes run in your immediate family?", opts: [{l:"No",s:84},{l:"Yes",s:54}] },
      { q: "Heart attack or stroke in a parent or sibling before 65?", opts: [{l:"No",s:84},{l:"Yes",s:54}] },
      { q: "Your smoking history?", opts: [{l:"Never",s:92},{l:"Former",s:66},{l:"Current, light",s:46},{l:"Current, heavy",s:26}] },
      { q: "Have you lost any teeth to gum disease?", opts: [{l:"No",s:88},{l:"Yes",s:42}] },
      { q: "Do you or a close relative have an autoimmune condition?", opts: [{l:"No",s:82},{l:"Yes",s:56}] },
      { q: "Did you have gum problems during pregnancy (if applicable)?", opts: [{l:"No",s:80},{l:"Yes / not applicable",s:62}] },
      { q: "How would you rate your current stress?", opts: [{l:"Low",s:88},{l:"Moderate",s:68},{l:"High",s:48},{l:"Very high",s:32}] },
    ] },
  { id: "longevity", code: "05", name: "Longevity", instrument: "AHA Life's Essential 8", color: B.navy, eb: B.navy, headline: "Why your mouth can add years, or take them.",
    qs: [
      { q: "Your tobacco or vaping exposure?", opts: [{l:"Never / none",s:95},{l:"Former",s:68},{l:"Occasional",s:48},{l:"Daily",s:26}] },
      { q: "Minutes of moderate exercise per week?", opts: [{l:"150+",s:92},{l:"75–150",s:72},{l:"Some",s:52},{l:"Rarely",s:32}] },
      { q: "Average hours of sleep per night?", opts: [{l:"7–9",s:92},{l:"6–7",s:70},{l:"Under 6 or over 9",s:46}] },
      { q: "Your weight feels…", opts: [{l:"Right where I want",s:88},{l:"A little high",s:66},{l:"Higher than I'd like",s:46},{l:"Much higher",s:30}] },
      { q: "Do you know your current cholesterol numbers?", opts: [{l:"Yes",s:80},{l:"No",s:60}] },
      { q: "Do you have pre-diabetes or diabetes?", opts: [{l:"No",s:84},{l:"Yes",s:50}] },
      { q: "Your blood pressure is…", opts: [{l:"Normal / great",s:90},{l:"A little high",s:66},{l:"High",s:46},{l:"Not sure",s:58}] },
      { q: "Overall, how would you rate your diet?", opts: [{l:"Excellent",s:90},{l:"Good",s:72},{l:"Fair",s:52},{l:"Poor",s:32}] },
    ] },
];

const C = 2 * Math.PI * 54;
function tierWord(v: number){ return v>=85?"Thriving":v>=70?"Strong":v>=50?"Foundational":"Needs focus"; }
function bandLine(v: number){ return v>=85?"Doing the quiet work.":v>=70?"A solid foundation, a couple of clear levers.":v>=50?"Real signal worth acting on.":"Let's slow down and do this right."; }
function avg(a: number[]){ return a.length ? Math.round(a.reduce((x,y)=>x+y,0)/a.length) : 0; }

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

const optStyle: React.CSSProperties = { display: "block", width: "100%", textAlign: "left", border: `1px solid ${B.border}`, background: B.white, borderRadius: 12, padding: "13px 16px", fontSize: 15, color: B.navy, cursor: "pointer", marginTop: 9, fontFamily: SANS, transition: "border-color .18s, background .18s" };
const inputStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: `1px solid ${B.border}`, background: B.white, borderRadius: 12, padding: "14px 16px", fontSize: 15, color: B.navy, fontFamily: SANS, marginTop: 10, outline: "none" };

export default function DiagnosticsPage() {
  const [stage, setStage] = useState<"gate" | "quiz" | "done">("gate");
  const [di, setDi] = useState(0);
  const [qi, setQi] = useState(0);
  const [itemScores, setItemScores] = useState<number[]>([]); // current dimension
  const [scores, setScores] = useState<number[]>([]);          // final per dimension
  const [user, setUser] = useState({ firstName: "", email: "", mobile: "" });
  const [err, setErr] = useState<{ firstName?: boolean; email?: boolean }>({});

  const D = DIMS[di];
  const ringVal = avg(itemScores);

  function startQuiz() { setStage("quiz"); setDi(0); setQi(0); setItemScores([]); setScores([]); }
  function submitGate() {
    const e: { firstName?: boolean; email?: boolean } = {};
    if (!user.firstName.trim()) e.firstName = true;
    if (!user.email.includes("@") || !user.email.includes(".")) e.email = true;
    setErr(e);
    if (Object.keys(e).length) return;
    startQuiz();
  }
  function answer(s: number) {
    const arr = [...itemScores, s];
    setItemScores(arr);
    if (qi < D.qs.length - 1) { setQi(qi + 1); }
    else { setScores((prev) => { const c = [...prev]; c[di] = avg(arr); return c; }); setQi(D.qs.length); }
  }
  function next() {
    if (di < DIMS.length - 1) { setDi(di + 1); setQi(0); setItemScores([]); }
    else { setStage("done"); }
  }

  const composite = avg(scores);

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
      <main style={{ maxWidth: 620, margin: "0 auto", padding: "52px 20px 80px" }}>

        {/* ENTRY = capture screen (no separate intro click) */}
        {stage === "gate" && (
          <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: B.blue, margin: "0 0 12px" }}>The Primary iD Assessment</p>
            <h1 style={{ fontFamily: SERIF, fontSize: 34, lineHeight: 1.14, color: B.navy, margin: "0 0 12px", fontWeight: 400 }}>See your whole health in <span style={{ fontStyle: "italic", color: B.blue }}>five dimensions</span>.</h1>
            <p style={{ fontSize: 15.5, lineHeight: 1.55, color: B.body, maxWidth: 400, margin: "0 auto 16px" }}>Built on validated instruments, translated into your Primary iD. About 6 minutes.</p>
            <div className="r-wrap" style={{ display: "flex", gap: 6, margin: "0 0 22px" }}>
              {DIMS.map((d) => (<div key={d.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}><span style={{ width: 13, height: 13, borderRadius: "50%", background: d.color }} /><span style={{ fontSize: 9.5, color: B.muted, textAlign: "center", lineHeight: 1.2 }}>{d.name}</span></div>))}
            </div>
            <div style={{ background: B.warmWhite, border: `1px solid ${B.border}`, borderRadius: 18, padding: "24px 24px 22px", boxShadow: "0 24px 50px -34px rgba(14,34,64,0.25)", textAlign: "left" }}>
              <input placeholder="First name" value={user.firstName} onChange={(e) => { setUser({ ...user, firstName: e.target.value }); setErr({ ...err, firstName: false }); }} style={{ ...inputStyle, marginTop: 0, borderColor: err.firstName ? "#C7305A" : B.border }} />
              <input placeholder="Email address" type="email" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }); setErr({ ...err, email: false }); }} style={{ ...inputStyle, borderColor: err.email ? "#C7305A" : B.border }} />
              <input placeholder="Mobile (optional)" type="tel" value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} style={inputStyle} />
              {(err.firstName || err.email) && <p style={{ fontSize: 12.5, color: "#C7305A", margin: "8px 0 0" }}>Please enter your name and a valid email to continue.</p>}
              <button onClick={submitGate} style={{ width: "100%", marginTop: 14, background: B.navy, color: B.white, border: "none", borderRadius: 999, padding: "15px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: SANS, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>Start my assessment <ArrowRight size={16} /></button>
            </div>
            <p style={{ fontSize: 12, color: B.muted, margin: "14px 0 0" }}>Free and private. We never share your information.</p>
          </div>
        )}

        {stage === "quiz" && (
          <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {DIMS.map((d, i) => (<div key={d.id} style={{ flex: 1, height: 4, borderRadius: 4, background: i < di ? d.color : i === di ? `${d.color}66` : "rgba(14,34,64,0.10)", transition: "background .4s" }} />))}
            </div>
            <div style={{ background: B.warmWhite, border: `1px solid ${B.border}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 50px -34px rgba(14,34,64,0.25)" }}>
              <div style={{ height: 5, background: D.color }} />
              <div style={{ padding: "22px 24px 26px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: D.eb, margin: "0 0 2px" }}>{D.code} / {D.name}</p>
                <p style={{ fontSize: 10.5, color: B.muted, letterSpacing: "0.06em", margin: "0 0 4px" }}>{D.instrument}</p>
                <div style={{ display: "flex", justifyContent: "center", margin: "6px 0 4px" }}><Ring value={ringVal} color={D.color} /></div>
                {qi < D.qs.length ? (
                  <div>
                    <div style={{ fontSize: 11, color: B.muted, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8, textAlign: "center" }}>Question {qi + 1} of {D.qs.length}</div>
                    <p style={{ fontFamily: SERIF, fontSize: 20, lineHeight: 1.3, color: B.navy, margin: "0 0 6px", textAlign: "center" }}>{D.qs[qi].q}</p>
                    {D.qs[qi].opts.map((o, k) => (<button key={k} onClick={() => answer(o.s)} style={optStyle} onMouseEnter={(e) => { e.currentTarget.style.borderColor = B.navy; e.currentTarget.style.background = B.cream; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = B.border; e.currentTarget.style.background = B.white; }}>{o.l}</button>))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <span style={{ display: "inline-block", background: `${D.color}1a`, color: D.eb, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "5px 13px", borderRadius: 999, margin: "4px 0 12px" }}>Your {D.name} read: {tierWord(ringVal)}</span>
                    <p style={{ fontFamily: SERIF, fontSize: 21, lineHeight: 1.3, color: B.navy, margin: "0 0 8px" }}>{D.headline}</p>
                    <p style={{ fontSize: 14.5, color: B.body, lineHeight: 1.6, margin: "0 0 20px" }}>{bandLine(ringVal)}</p>
                    <button onClick={next} className="r-cta" style={{ background: di < DIMS.length - 1 ? D.color : B.navy, color: B.white, border: "none", borderRadius: 999, padding: "13px 24px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", fontFamily: SANS, display: "inline-flex", alignItems: "center", gap: 8 }}>{di < DIMS.length - 1 ? "Continue" : "See your Primary iD"} <ArrowRight size={15} /></button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {stage === "done" && (
          <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: B.blue, margin: "0 0 6px" }}>{user.firstName ? user.firstName + ", your" : "Your"} Primary iD</p>
            <div className="r-h1" style={{ fontFamily: SERIF, fontSize: 66, color: B.navy, lineHeight: 1 }}>{composite}<span style={{ fontSize: 22, color: B.muted }}> / 100</span></div>
            <p style={{ fontFamily: SERIF, fontSize: 22, color: B.navy, margin: "8px 0 4px" }}>{tierWord(composite)}</p>
            <p style={{ fontSize: 15, color: B.body, lineHeight: 1.6, margin: "0 auto 22px", maxWidth: 380 }}>{bandLine(composite)}</p>
            <div className="r-wrap" style={{ display: "flex", justifyContent: "space-between", gap: 4, marginBottom: 26 }}>
              {DIMS.map((d, i) => (<div key={d.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}><Ring value={scores[i] ?? 0} color={d.color} size={58} sw={12} showNum={false} /><span style={{ fontFamily: SERIF, fontSize: 17, color: B.navy, marginTop: -4 }}>{scores[i] ?? 0}</span><span style={{ fontSize: 9.5, color: B.muted, lineHeight: 1.2, maxWidth: 66 }}>{d.name}</span></div>))}
            </div>
            <a href="/book/" className="r-cta" style={{ background: B.navy, color: B.white, textDecoration: "none", borderRadius: 999, padding: "15px 30px", fontSize: 15, fontWeight: 600, fontFamily: SANS, display: "inline-flex", alignItems: "center", gap: 8 }}>Book your visit with Dr. Gabi <ArrowRight size={16} /></a>
            <div style={{ marginTop: 16 }}><button onClick={startQuiz} style={{ background: "none", border: "none", color: B.navy, fontWeight: 600, fontSize: 13.5, cursor: "pointer", fontFamily: SANS, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "underline", textUnderlineOffset: 3 }}><RotateCcw size={13} /> Start over</button></div>
            <p style={{ fontSize: 12.5, color: B.muted, margin: "22px auto 0", maxWidth: 380, lineHeight: 1.5 }}>A directional read, not a diagnosis. Dr. Gabi confirms it against the exam at your first visit.</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
