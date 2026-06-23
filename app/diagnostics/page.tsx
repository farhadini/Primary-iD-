"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, ChevronDown, RotateCcw, Calendar, Sparkles } from "lucide-react";
import { SiteNav } from "@/components/site-nav";

// ── CUSTOM SVG DIMENSION ICONS ────────────────────────────────
// Each returns a sized SVG mark, stroked in the passed color
function IconOral({ color, size = 36 }) {
  const s = size / 40;
  return (
    <svg width={size} height={size} viewBox="0 0 40 42" fill="none" stroke={color} strokeWidth={1.5 / s} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 1C12 1 6 6 6 13C6 20 8 32 10 38C11 41 13 42 15 42C17 42 18 39 18 36C18 39 19 42 21 42C23 42 25 41 26 38C28 32 30 20 30 13C30 6 24 1 20 1Z"/>
      <polyline points="7,21 11,21 14,14 17,28 20,16 23,24 29,24" strokeWidth={1.2 / s} opacity="0.75"/>
    </svg>
  );
}

function IconSleep({ color, size = 36 }) {
  const s = size / 40;
  return (
    <svg width={size} height={size} viewBox="0 0 36 42" fill="none" stroke={color} strokeWidth={1.5 / s} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2C13 4 6 11 6 21C6 31 12 38 22 40C12 36 8 28 8 21C8 14 13 7 22 2Z" fill={`${color}18`} stroke={color}/>
      <path d="M16 21C18 16 20 26 22 21C24 16 26 26 28 21" strokeWidth={1.3 / s} opacity="0.8"/>
      <circle cx="26" cy="9" r="1.5" fill={color} stroke="none"/>
      <circle cx="30" cy="15" r="1.1" fill={color} stroke="none"/>
      <circle cx="28" cy="5" r="0.9" fill={color} stroke="none"/>
    </svg>
  );
}

function IconNutrition({ color, size = 36 }) {
  const s = size / 40;
  return (
    <svg width={size} height={size} viewBox="0 0 28 42" fill="none" stroke={color} strokeWidth={1.5 / s} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 40C14 40 2 28 2 16C2 7 7 2 14 2C21 2 26 7 26 16C26 28 14 40 14 40Z"/>
      <line x1="14" y1="40" x2="14" y2="6" strokeWidth={1 / s}/>
      <line x1="14" y1="14" x2="7" y2="10" strokeWidth={0.9 / s} opacity="0.65"/>
      <line x1="14" y1="21" x2="6" y2="19" strokeWidth={0.9 / s} opacity="0.65"/>
      <line x1="14" y1="14" x2="21" y2="10" strokeWidth={0.9 / s} opacity="0.65"/>
      <line x1="14" y1="21" x2="22" y2="19" strokeWidth={0.9 / s} opacity="0.65"/>
      <circle cx="10" cy="29" r="2" fill={`${color}70`} stroke="none"/>
      <circle cx="18" cy="31" r="1.4" fill={`${color}60`} stroke="none"/>
      <circle cx="14" cy="34" r="1.6" fill={`${color}55`} stroke="none"/>
    </svg>
  );
}

function IconGenetics({ color, size = 36 }) {
  const s = size / 40;
  return (
    <svg width={size} height={size} viewBox="0 0 28 44" fill="none" stroke={color} strokeWidth={1.5 / s} strokeLinecap="round">
      <path d="M8 0C8 6 18 9 18 16C18 23 8 26 8 32C8 38 18 41 18 44"/>
      <path d="M18 0C18 6 8 9 8 16C8 23 18 26 18 32C18 38 8 41 8 44"/>
      <line x1="8" y1="4" x2="18" y2="4" strokeWidth={1 / s} opacity="0.55"/>
      <line x1="9" y1="12" x2="17" y2="12" strokeWidth={1 / s} opacity="0.55"/>
      <line x1="8" y1="20" x2="18" y2="20" strokeWidth={1 / s} opacity="0.55"/>
      <line x1="9" y1="28" x2="17" y2="28" strokeWidth={1 / s} opacity="0.55"/>
      <line x1="8" y1="36" x2="18" y2="36" strokeWidth={1 / s} opacity="0.55"/>
    </svg>
  );
}

function IconAirway({ color, size = 36 }) {
  const s = size / 40;
  return (
    <svg width={size} height={size} viewBox="0 0 32 42" fill="none" stroke={color} strokeWidth={1.5 / s} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 34C4 20 7 10 16 4C25 10 28 20 28 34"/>
      <path d="M4 34C4 39 7 41 10 40C12 39 13 37 14 36C15 37 15 39 17 40C20 41 28 39 28 34"/>
      <path d="M11 28C11 22 12 17 16 14C20 17 21 22 21 28" strokeWidth={1.1 / s} opacity="0.65"/>
      <line x1="16" y1="8" x2="16" y2="4" strokeWidth={1 / s} opacity="0.6"/>
      <polyline points="13,7 16,4 19,7" strokeWidth={1 / s} opacity="0.6"/>
    </svg>
  );
}

// Map dim id to its icon component
const DIM_ICON = {
  oral:      (color, size) => <IconOral      color={color} size={size} />,
  sleep:     (color, size) => <IconSleep     color={color} size={size} />,
  nutrition: (color, size) => <IconNutrition color={color} size={size} />,
  genetics:  (color, size) => <IconGenetics  color={color} size={size} />,
  airway:    (color, size) => <IconAirway    color={color} size={size} />,
};

function DimIcon({ id, color, size = 36 }) {
  return DIM_ICON[id] ? DIM_ICON[id](color, size) : null;
}

// Primary logo mark SVG (reused from homepage)
function PrimaryMark({ size = 16, color = "#FFFFFF" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V18c0-.55-.45-1-1-1s-1 .45-1 1v1.93C7.06 19.44 4.56 16.94 4.07 13H6c.55 0 1-.45 1-1s-.45-1-1-1H4.07C4.56 7.06 7.06 4.56 11 4.07V6c0 .55.45 1 1 1s1-.45 1-1V4.07C16.94 4.56 19.44 7.06 19.93 11H18c-.55 0-1 .45-1 1s.45 1 1 1h1.93c-.49 3.94-2.99 6.44-6.93 6.93z"/>
    </svg>
  );
}

// ── BRAND ─────────────────────────────────────────────────────
const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  cream: "#FAF8F5",
  warmWhite: "#FEFCF9",
  white: "#FFFFFF",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  border: "rgba(14,34,64,0.07)",
  accent: "#E8985E",
  purple: "#7B68EE",
  pink: "#E05BBF",
};

// ── DIMENSION DATA : 10 Yes/No questions each ─────────────────
const DIMS = [
  {
    id: "oral",
    label: "Oral Health",
    color: B.green,
    lightBg: "#E8F8F0",
    tagline: "The foundation of everything.",
    intro: "Your mouth is the starting point for whole-body health. 10 quick questions reveal your oral foundation.",
    fact: "Gum disease doubles your risk of heart disease. Most people have no idea.",
    questions: [
      { q: "Do your gums bleed when you brush or floss?",                  yScore: 0,  nScore: 10, insight: "Bleeding gums signal active inflammation, a direct pathway to systemic health issues including heart disease." },
      { q: "Have you had a dental exam in the last 6 months?",             yScore: 10, nScore: 0,  insight: "Regular exams catch problems before they become expensive or dangerous. Most systemic signals appear here first." },
      { q: "Do you have tooth sensitivity to hot, cold, or sweet?",        yScore: 2,  nScore: 10, insight: "Sensitivity often signals enamel erosion or early decay, both highly preventable with the right care." },
      { q: "Do you brush twice a day and floss daily?",                    yScore: 10, nScore: 2,  insight: "This simple habit reduces your risk of gum disease by over 60%. It also changes your systemic inflammation profile." },
      { q: "Have you noticed any loose teeth or changes in your bite?",    yScore: 1,  nScore: 10, insight: "These are early signs of bone loss, one of the most underdiagnosed oral-systemic risks in adults." },
      { q: "Do you have any dental work older than 10 years?",             yScore: 4,  nScore: 10, insight: "Older materials can degrade and release substances that affect systemic health. Worth a comprehensive review." },
      { q: "Do you experience jaw pain, clicking, or tension?",            yScore: 2,  nScore: 10, insight: "TMJ dysfunction is often connected to sleep, airway, and nervous system issues, not just a jaw problem." },
      { q: "Would you describe your breath as consistently fresh?",        yScore: 10, nScore: 2,  insight: "Persistent bad breath often signals an imbalanced oral microbiome, the first ecosystem in your body." },
      { q: "Have you ever been told you have gum disease or gingivitis?",  yScore: 2,  nScore: 10, insight: "Periodontal bacteria enter the bloodstream and trigger inflammatory responses throughout the body." },
      { q: "Do you feel confident in how your smile looks and functions?", yScore: 10, nScore: 4,  insight: "Oral confidence affects mental health, social behavior, and willingness to seek care, all measurable health factors." },
    ],
  },
  {
    id: "sleep",
    label: "Sleep & Airway",
    color: B.blue,
    lightBg: "#E8F6FC",
    tagline: "How you breathe changes everything.",
    intro: "This exam can detect sleep apnea before any other clinician does. Find out what your airway is telling us.",
    fact: "80% of people with sleep apnea are undiagnosed. A routine exam is often first to spot it.",
    questions: [
      { q: "Do you wake up feeling genuinely rested most mornings?",               yScore: 10, nScore: 0,  insight: "Unrefreshing sleep is the hallmark of sleep-disordered breathing, even without snoring or gasping." },
      { q: "Has anyone told you that you snore or stop breathing at night?",       yScore: 0,  nScore: 10, insight: "Witnessed apneas are among the strongest predictors of obstructive sleep apnea, a serious cardiovascular risk." },
      { q: "Do you grind or clench your teeth?",                                   yScore: 1,  nScore: 10, insight: "Bruxism (teeth grinding) is often the body's response to airway obstruction during sleep, a signal most practitioners miss." },
      { q: "Do you breathe primarily through your nose?",                          yScore: 10, nScore: 2,  insight: "Nasal breathing produces nitric oxide, critical for oxygen absorption, immunity, and cardiovascular health." },
      { q: "Do you feel alert throughout the day without relying on caffeine?",    yScore: 10, nScore: 2,  insight: "Daytime fatigue is the most common unrecognized symptom of sleep-disordered breathing." },
      { q: "Do you wake up with a dry mouth or sore throat?",                      yScore: 2,  nScore: 10, insight: "Morning dry mouth is a strong indicator of mouth breathing during sleep, directly tied to airway health." },
      { q: "Do you fall asleep easily and stay asleep through the night?",         yScore: 10, nScore: 2,  insight: "Fragmented sleep architecture is often caused by micro-arousals from airway restriction, invisible to the sleeper." },
      { q: "Have you ever been evaluated for sleep apnea?",                        yScore: 8,  nScore: 4,  insight: "Most adults have never been screened. We are uniquely positioned to assess airway risk at every visit." },
      { q: "Do you wake up with headaches or jaw tension?",                        yScore: 2,  nScore: 10, insight: "Morning headaches and jaw tension are a classic triad with airway compromise, often dismissed as stress." },
      { q: "Is your sleep generally 7 to 9 hours per night?",                     yScore: 10, nScore: 2,  insight: "Chronic short sleep is linked to accelerated biological aging, metabolic dysfunction, and oral inflammation." },
    ],
  },
  {
    id: "nutrition",
    label: "Nutrition",
    color: "#C7305A",
    lightBg: "#FCE8EE",
    tagline: "You feed your mouth first.",
    intro: "What you eat shapes your oral microbiome, and everything downstream from it. These 10 questions reveal your nutrition picture.",
    fact: "Every time you swallow, billions of oral bacteria travel to your gut. Your diet determines which ones.",
    questions: [
      { q: "Do you eat mostly whole, unprocessed foods?",                          yScore: 10, nScore: 2,  insight: "Whole foods feed beneficial oral bacteria and reduce the acidic environment that drives decay and inflammation." },
      { q: "Do you consume sugary drinks or snacks daily?",                        yScore: 0,  nScore: 10, insight: "Sugar is the primary fuel for harmful oral bacteria. Even 'healthy' sugar sources count." },
      { q: "Do you eat fermented foods like yogurt, kefir, or sauerkraut?",       yScore: 10, nScore: 4,  insight: "Fermented foods seed your oral and gut microbiome with beneficial bacteria, a direct health investment." },
      { q: "Do you drink at least 8 glasses of water daily?",                     yScore: 10, nScore: 2,  insight: "Saliva is your mouth's built-in defense system. Dehydration suppresses it and invites bacterial overgrowth." },
      { q: "Do you chew your food slowly and thoroughly?",                        yScore: 10, nScore: 4,  insight: "Digestion begins in the mouth. Thorough chewing activates salivary enzymes and reduces digestive stress downstream." },
      { q: "Do you limit alcohol to fewer than 7 drinks per week?",              yScore: 10, nScore: 2,  insight: "Alcohol disrupts the oral microbiome, dries the mouth, and increases oral cancer risk significantly." },
      { q: "Do you eat leafy greens or cruciferous vegetables most days?",        yScore: 10, nScore: 4,  insight: "These vegetables feed nitrate-reducing oral bacteria that produce nitric oxide, essential for cardiovascular health." },
      { q: "Do you avoid grazing or snacking between meals?",                     yScore: 10, nScore: 4,  insight: "Constant snacking keeps oral pH acidic and prevents the remineralization cycle your teeth depend on." },
      { q: "Do you take a probiotic or eat prebiotics regularly?",                yScore: 10, nScore: 5,  insight: "Oral probiotics are one of the most underused tools for microbiome health, and one of the most impactful." },
      { q: "Is your diet mostly anti-inflammatory in nature?",                    yScore: 10, nScore: 2,  insight: "Systemic inflammation starts with what you eat. The oral microbiome is the first place that change is measurable." },
    ],
  },
  {
    id: "genetics",
    label: "Genetics & Microbiome",
    color: B.purple,
    lightBg: "#EDE8FE",
    tagline: "Your biology is unique. Your care should be too.",
    intro: "Your genetics and oral microbiome shape your susceptibility to everything from gum disease to Alzheimer's.",
    fact: "A specific oral bacterium, P. gingivalis, has been found in the brains of Alzheimer's patients.",
    questions: [
      { q: "Do you have a family history of gum disease?",                         yScore: 2,  nScore: 10, insight: "Periodontal susceptibility has a strong genetic component, and knowing it early changes your prevention strategy." },
      { q: "Do you have a family history of heart disease or diabetes?",           yScore: 3,  nScore: 10, insight: "These conditions share inflammatory pathways with oral disease. Your risk profile needs to be understood together." },
      { q: "Have you ever had genetic testing like 23andMe or similar?",           yScore: 8,  nScore: 5,  insight: "Genetic insights let us personalize your care from day one. Some people are genetically wired for higher inflammation." },
      { q: "Do you experience chronic inflammation symptoms like joint pain or fatigue?", yScore: 2, nScore: 10, insight: "Chronic systemic inflammation is the common thread between gum disease and most major chronic diseases." },
      { q: "Do you have known sensitivities to metals or dental materials?",       yScore: 3,  nScore: 10, insight: "Metal sensitivities can cause systemic reactions from dental work that go undiagnosed for years." },
      { q: "Have you ever had a comprehensive microbiome test?",                   yScore: 9,  nScore: 5,  insight: "Most people have never looked at their oral microbiome. It's the most upstream intervention available." },
      { q: "Do you have autoimmune conditions in your family history?",            yScore: 3,  nScore: 10, insight: "Oral inflammation activates the same immune pathways that drive autoimmune conditions, often the first trigger." },
      { q: "Do you have a history of frequent cavities despite good hygiene?",     yScore: 2,  nScore: 10, insight: "Cavity-prone patients often have a specific genetic variant affecting enamel, and a treatable microbiome profile." },
      { q: "Do you feel your current dental care is personalized to your biology?", yScore: 8, nScore: 4,  insight: "Personalized care based on your genetic and microbiome profile is the future of dentistry. Very few practices offer it." },
      { q: "Are you curious about what your oral microbiome looks like right now?", yScore: 10, nScore: 5, insight: "Curiosity is the first step. We can test your oral microbiome at your next visit and show you exactly what's there." },
    ],
  },
  {
    id: "airway",
    label: "Airway Health",
    color: B.navy,
    lightBg: "#E8ECF2",
    tagline: "The dimension most routine care never looks at.",
    intro: "Airway health is the hidden dimension. It affects sleep, energy, focus, and how your face develops over time.",
    fact: "Tongue posture affects your airway every moment you're alive, yet almost no one has ever been evaluated for it.",
    questions: [
      { q: "Do you breathe through your nose more than your mouth?",               yScore: 10, nScore: 2,  insight: "Nasal breathing filters, humidifies, and oxygenates air. Mouth breathing bypasses all of it and dries oral tissue." },
      { q: "Does your tongue rest against the roof of your mouth when closed?",    yScore: 10, nScore: 2,  insight: "Correct tongue posture is critical for airway patency. Incorrect posture contributes to airway collapse during sleep." },
      { q: "Can you breathe comfortably through your nose during exercise?",       yScore: 10, nScore: 3,  insight: "Nasal breathing capacity during exertion is one of the best indicators of functional airway health." },
      { q: "Do you feel congested or blocked in your nose frequently?",            yScore: 2,  nScore: 10, insight: "Chronic nasal congestion forces mouth breathing, disrupts sleep, and dries out the oral environment." },
      { q: "Have you ever been evaluated for a deviated septum or narrow palate?", yScore: 7,  nScore: 5,  insight: "Structural airway issues are common, underdiagnosed, and often correctable, especially in younger patients." },
      { q: "Do you experience jaw tension, clicking, or limited opening?",         yScore: 2,  nScore: 10, insight: "TMJ issues and airway problems are closely linked. The jaw position affects airway space directly." },
      { q: "Have you ever been told your tonsils are enlarged?",                   yScore: 3,  nScore: 10, insight: "Enlarged tonsils reduce airway space and are a primary cause of pediatric sleep apnea and poor development." },
      { q: "Do you have good posture, head balanced above your shoulders?",       yScore: 10, nScore: 3,  insight: "Forward head posture reduces airway diameter by up to 30%, directly connected to chronic airway compression." },
      { q: "Do you feel like you can take a full, deep breath easily?",            yScore: 10, nScore: 2,  insight: "Restricted breathing often originates in the airway anatomy, something a trained clinician can assess visually." },
      { q: "Are you free of chronic sinus infections or nasal issues?",            yScore: 10, nScore: 3,  insight: "Chronic sinusitis and oral health are bidirectionally linked through the same mucosal immune pathways." },
    ],
  },
];

const TOTAL_QS = DIMS.reduce((s, d) => s + d.questions.length, 0); // 50

// ── SCORE HELPERS ─────────────────────────────────────────────
function getLabel(score) {
  if (score >= 85) return { text: "Optimal",       color: B.green,  bg: "#E8F8F0" };
  if (score >= 65) return { text: "Good",           color: B.blue,   bg: "#E8F6FC" };
  if (score >= 45) return { text: "Developing",     color: B.accent, bg: "#FFF0E8" };
  return               { text: "Needs Attention", color: "#E05B5B", bg: "#FEE8E8" };
}

function dimScore(answers, dimId) {
  const dim = DIMS.find(d => d.id === dimId);
  if (!dim) return 0;
  let total = 0, max = 0;
  dim.questions.forEach((q, i) => {
    const key = `${dimId}-${i}`;
    if (answers[key] !== undefined) {
      total += answers[key] ? q.yScore : q.nScore;
      max += 10;
    }
  });
  return max === 0 ? 0 : Math.round((total / max) * 100);
}

function overallScore(answers) {
  const scores = DIMS.map(d => dimScore(answers, d.id));
  return Math.round(scores.reduce((s, v) => s + v, 0) / DIMS.length);
}

// ── ANIMATED COUNTER ──────────────────────────────────────────
function Counter({ target, duration = 1200, style: s = {} }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return <span style={s}>{val}</span>;
}

// ── CIRCULAR SCORE RING ───────────────────────────────────────
function ScoreRing({ score, color, size = 120, stroke = 8, children }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const [dash, setDash] = useState(circ);
  useEffect(() => {
    const t = setTimeout(() => setDash(circ * (1 - score / 100)), 80);
    return () => clearTimeout(t);
  }, [score, circ]);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.23,1,0.32,1)" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

// ── CONFETTI ──────────────────────────────────────────────────
function Confetti({ active }) {
  if (!active) return null;
  const colors = [B.blue, B.green, B.accent, B.purple, B.pink, "#FFD700"];
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }}>
      <style>{`@keyframes cfFall{0%{transform:translateY(-20px) rotate(0);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}`}</style>
      {Array.from({ length: 48 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: 0,
          width: 6 + Math.random() * 6,
          height: 6 + Math.random() * 6,
          borderRadius: Math.random() > 0.5 ? "50%" : 2,
          background: colors[i % colors.length],
          animation: `cfFall ${1.4 + Math.random() * 0.8}s ease-out ${Math.random() * 0.5}s forwards`,
        }} />
      ))}
    </div>
  );
}

// ── PENTAGON CHART ────────────────────────────────────────────
function Pentagon({ scores }) {
  const cx = 140, cy = 130, r = 90;
  const angles = DIMS.map((_, i) => (i * 2 * Math.PI / 5) - Math.PI / 2);
  const pt = (score, angle) => {
    const d = (score / 100) * r;
    return [cx + d * Math.cos(angle), cy + d * Math.sin(angle)];
  };
  const gridPts = (frac) => angles.map(a => pt(frac * 100, a));

  const filled = angles.map((a, i) => pt(scores[i] || 0, a));
  const filledPath = filled.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + " Z";

  return (
    <svg viewBox="0 0 280 260" width="100%" style={{ display: "block", overflow: "visible" }}>
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map(frac => {
        const pts = gridPts(frac);
        const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + " Z";
        return <path key={frac} d={path} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />;
      })}
      {/* Spokes */}
      {angles.map((a, i) => {
        const [x, y] = pt(100, a);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />;
      })}
      {/* Filled area */}
      <path d={filledPath} fill={`${B.blue}22`} stroke={B.blue} strokeWidth="1.5" strokeLinejoin="round"
        style={{ transition: "all 1s cubic-bezier(0.23,1,0.32,1)" }} />
      {/* Score dots */}
      {filled.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={DIMS[i].color}
          style={{ transition: "all 1s cubic-bezier(0.23,1,0.32,1)" }} />
      ))}
      {/* Labels */}
      {angles.map((a, i) => {
        const [x, y] = pt(118, a);
        return (
          <g key={i}>
            <text x={x} y={y - 6} textAnchor="middle" fontFamily="Georgia,serif" fontSize="10"
              fill={DIMS[i].color} dominantBaseline="middle">{DIMS[i].icon}</text>
            <text x={x} y={y + 7} textAnchor="middle" fontFamily="Georgia,serif" fontSize="8"
              fill="rgba(255,255,255,0.5)" dominantBaseline="middle">{DIMS[i].label.split(" & ")[0]}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── SCREENS ───────────────────────────────────────────────────

// 0. LANDING : choose your path
function Landing({ onStart, onStartAll }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState(null); // dim id or "all"

  const proceed = () => {
    const e = {};
    if (!name.trim()) e.name = true;
    if (!email.trim() || !email.includes("@")) e.email = true;
    if (!selected) e.selected = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    if (selected === "all") onStartAll({ name: name.trim(), email: email.trim() });
    else onStart(selected, { name: name.trim(), email: email.trim() });
  };

  return (
    <div style={{ minHeight: "100vh", background: B.navy, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes float0{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fadeUp{animation:fadeUp .6s cubic-bezier(0.23,1,0.32,1) forwards}
      `}</style>

      {/* Floating orbs */}
      <div style={{ position: "absolute", top: "8%", right: "12%", width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(36,167,224,0.12)", animation: "float0 7s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "8%", width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(72,194,140,0.1)", animation: "float1 9s ease-in-out infinite", pointerEvents: "none" }} />

      {/* Nav */}
      <SiteNav />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 24px 48px", maxWidth: 640, margin: "0 auto", width: "100%" }}>

        {/* Hero */}
        <div className="fadeUp" style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PrimaryMark size={28} color={B.white} />
            </div>
          </div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: B.white, margin: "0 0 16px" }}>
            Discover your<br />
            <span style={{ fontStyle: "italic", color: B.blue }}>Primary Health Score.</span>
          </h1>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0, maxWidth: 420 }}>
            5 dimensions. 50 questions. A complete picture of your oral-systemic health, in under 10 minutes.
          </p>
        </div>

        {/* Capture */}
        <div className="fadeUp" style={{ animationDelay: "0.1s", opacity: 0, width: "100%", marginBottom: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 4 }}>
            <input
              value={name} onChange={e => { setName(e.target.value); setErrors(er => ({ ...er, name: false })); }}
              placeholder="Your first name"
              style={{ background: errors.name ? "rgba(224,91,91,0.1)" : "rgba(255,255,255,0.06)", border: `1px solid ${errors.name ? "rgba(224,91,91,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, padding: "14px 18px", fontFamily: "Georgia,serif", fontSize: 15, color: B.white, outline: "none", width: "100%", boxSizing: "border-box", transition: "border 0.2s" }}
              onFocus={e => e.target.style.borderColor = "rgba(36,167,224,0.4)"}
              onBlur={e => e.target.style.borderColor = errors.name ? "rgba(224,91,91,0.5)" : "rgba(255,255,255,0.1)"}
            />
            <input
              value={email} onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: false })); }}
              placeholder="Your email address"
              type="email"
              style={{ background: errors.email ? "rgba(224,91,91,0.1)" : "rgba(255,255,255,0.06)", border: `1px solid ${errors.email ? "rgba(224,91,91,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, padding: "14px 18px", fontFamily: "Georgia,serif", fontSize: 15, color: B.white, outline: "none", width: "100%", boxSizing: "border-box", transition: "border 0.2s" }}
              onFocus={e => e.target.style.borderColor = "rgba(36,167,224,0.4)"}
              onBlur={e => e.target.style.borderColor = errors.email ? "rgba(224,91,91,0.5)" : "rgba(255,255,255,0.1)"}
            />
            {(errors.name || errors.email) && (
              <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "#E05B5B" }}>Please enter your name and email to continue.</div>
            )}
          </div>
        </div>

        {/* Choose path */}
        <div className="fadeUp" style={{ animationDelay: "0.18s", opacity: 0, width: "100%", marginBottom: 24 }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", marginBottom: 14, textAlign: "center" }}>
            WHERE DO YOU WANT TO START?
          </div>
          {errors.selected && <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "#E05B5B", textAlign: "center", marginBottom: 10 }}>Please choose an assessment to begin.</div>}

          {/* Complete score option */}
          <div onClick={() => setSelected("all")} style={{
            background: selected === "all" ? `${B.blue}18` : "rgba(255,255,255,0.03)",
            border: `1.5px solid ${selected === "all" ? B.blue : "rgba(255,255,255,0.08)"}`,
            borderRadius: 14, padding: "18px 20px", cursor: "pointer", marginBottom: 10,
            display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s ease",
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: selected === "all" ? `${B.blue}25` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Sparkles size={20} color={selected === "all" ? B.blue : "rgba(255,255,255,0.4)"} strokeWidth={1.5} />
                </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 15, color: selected === "all" ? B.white : "rgba(255,255,255,0.8)", marginBottom: 2 }}>Complete Primary Health Score</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>All 5 dimensions · 50 questions · ~10 min</div>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected === "all" ? B.blue : "rgba(255,255,255,0.2)"}`, background: selected === "all" ? B.blue : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
              {selected === "all" && <div style={{ width: 8, height: 8, borderRadius: "50%", background: B.white }} />}
            </div>
          </div>

          {/* Individual dimensions */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {DIMS.map(dim => (
              <div key={dim.id} onClick={() => setSelected(dim.id)} style={{
                background: selected === dim.id ? `${dim.color}18` : "rgba(255,255,255,0.03)",
                border: `1.5px solid ${selected === dim.id ? dim.color : "rgba(255,255,255,0.08)"}`,
                borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s ease",
              }}>
                <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <DimIcon id={dim.id} color={selected === dim.id ? dim.color : "rgba(255,255,255,0.35)"} size={28} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: selected === dim.id ? B.white : "rgba(255,255,255,0.65)", lineHeight: 1.3 }}>{dim.label}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>10 questions · ~2 min</div>
                </div>
                <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${selected === dim.id ? dim.color : "rgba(255,255,255,0.2)"}`, background: selected === dim.id ? dim.color : "transparent", flexShrink: 0, transition: "all 0.2s" }} />
              </div>
            ))}
          </div>
        </div>

        <div className="fadeUp" style={{ animationDelay: "0.26s", opacity: 0, width: "100%" }}>
          <button onClick={proceed} style={{
            width: "100%", padding: "16px", background: B.blue, color: B.white,
            border: "none", borderRadius: 14, fontFamily: "Georgia,serif", fontSize: 16,
            cursor: "pointer", transition: "all 0.25s ease",
            boxShadow: `0 4px 20px ${B.blue}40`,
          }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${B.blue}50`; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 20px ${B.blue}40`; }}
          >
            {selected === "all" ? <span style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>Start my complete health score <ArrowRight size={16}/></span> : selected ? <span style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>Start {DIMS.find(d=>d.id===selected)?.label} <ArrowRight size={16}/></span> : <span style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>Begin assessment <ArrowRight size={16}/></span>}
          </button>
          <div style={{ textAlign: "center", marginTop: 12, fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
            Your results are sent to your inbox. We never share your information.
          </div>
        </div>
      </div>
    </div>
  );
}

// 1. DIM INTRO : animated entry to a dimension
function DimIntro({ dim, user, qsDone, totalDims, onBegin }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 60); return () => clearTimeout(t); }, []);
  return (
    <div style={{ minHeight: "100vh", background: B.navy, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <style>{`@keyframes dimIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}`}</style>
      <div style={{ opacity: ready ? 1 : 0, transform: ready ? "scale(1)" : "scale(0.92)", transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)", maxWidth: 480 }}>

        {/* Progress breadcrumb */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 32 }}>
          {DIMS.map((d, i) => (
            <div key={d.id} style={{ height: 4, width: d.id === dim.id ? 28 : 10, borderRadius: 2, background: d.id === dim.id ? dim.color : (qsDone > i * 10 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)"), transition: "all 0.3s ease" }} />
          ))}
        </div>

        <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: `${dim.color}18`, border: `1.5px solid ${dim.color}35`, display: "flex", alignItems: "center", justifyContent: "center", animation: "dimIn 0.5s ease" }}>
            <DimIcon id={dim.id} color={dim.color} size={44} />
          </div>
        </div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: dim.color, letterSpacing: "0.1em", marginBottom: 12 }}>DIMENSION {DIMS.findIndex(d => d.id === dim.id) + 1} OF 5</div>
        <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.018em", color: B.white, margin: "0 0 12px" }}>
          {dim.label}
        </h2>
        <p style={{ fontFamily: "Georgia,serif", fontSize: 16, color: dim.color, fontStyle: "italic", margin: "0 0 20px" }}>{dim.tagline}</p>
        <p style={{ fontFamily: "Georgia,serif", fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: "0 0 28px" }}>{dim.intro}</p>

        {/* Fact card */}
        <div style={{ background: `${dim.color}12`, border: `1px solid ${dim.color}25`, borderRadius: 14, padding: "16px 20px", marginBottom: 32, textAlign: "left" }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: dim.color, letterSpacing: "0.08em", marginBottom: 8 }}>QUICK FACT</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, fontStyle: "italic" }}>{dim.fact}</div>
        </div>

          <button onClick={onBegin} style={{ background: dim.color, color: B.white, border: "none", borderRadius: 14, padding: "15px 40px", fontFamily: "Georgia,serif", fontSize: 16, cursor: "pointer", transition: "all 0.25s ease", boxShadow: `0 4px 20px ${dim.color}40`, display: "inline-flex", alignItems: "center", gap: 10 }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${dim.color}55`; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 20px ${dim.color}40`; }}
          >
            Let's go <ArrowRight size={16} strokeWidth={2} />
          </button>
        <div style={{ marginTop: 12, fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>10 questions · Yes or No · about 2 minutes</div>
      </div>
    </div>
  );
}

// 2. QUESTION : single yes/no question
function Question({ dim, question, questionIndex, totalQuestions, onAnswer, answered }) {
  const [selected, setSelected] = useState(null);
  const [animOut, setAnimOut] = useState(false);

  const [confirmed, setConfirmed] = useState(false);

  const choose = (val) => {
    if (selected !== null) return;
    setSelected(val);
  };

  const advance = () => {
    setConfirmed(true);
    setAnimOut(true);
    setTimeout(() => { setSelected(null); setAnimOut(false); setConfirmed(false); onAnswer(selected); }, 320);
  };

  const pct = ((questionIndex) / totalQuestions) * 100;
  const isLastQ = questionIndex === totalQuestions - 1;

  return (
    <div style={{ minHeight: "100vh", background: B.navy, display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes qSlideIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
        @keyframes qSlideOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-24px)}}
        @keyframes btnPop{0%{transform:scale(1)}50%{transform:scale(1.04)}100%{transform:scale(1)}}
        @keyframes insightIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Top bar */}
      <div style={{ padding: "16px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <DimIcon id={dim.id} color={dim.color} size={18} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{dim.label}</span>
          </div>
          <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            {questionIndex + 1} / {totalQuestions}
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((questionIndex + 1) / totalQuestions) * 100}%`, background: `linear-gradient(90deg, ${dim.color}88, ${dim.color})`, borderRadius: 2, transition: "width 0.5s cubic-bezier(0.23,1,0.32,1)" }} />
        </div>
      </div>

      {/* Question card */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 24px" }}>
        <div style={{
          maxWidth: 520, width: "100%",
          animation: animOut ? "qSlideOut 0.32s ease forwards" : "qSlideIn 0.4s cubic-bezier(0.23,1,0.32,1) forwards",
        }}>
          {/* Q number badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ background: `${dim.color}18`, border: `1px solid ${dim.color}30`, borderRadius: 20, padding: "5px 16px", fontFamily: "Georgia,serif", fontSize: 11, color: dim.color, letterSpacing: "0.06em" }}>
              Question {questionIndex + 1}
            </div>
          </div>

          {/* White question card */}
          <div style={{ background: B.white, borderRadius: 20, padding: "32px 28px", marginBottom: 14, boxShadow: "0 16px 48px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 400, lineHeight: 1.4, color: B.navy, textAlign: "center", margin: 0 }}>
              {question.q}
            </h2>
          </div>

          {/* YES / NO buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[
              { val: true,  label: "Yes", icon: <Check size={26} strokeWidth={2} /> },
              { val: false, label: "No",  icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> },
            ].map(opt => {
              const isChosen = selected === opt.val;
              const isOther = selected !== null && selected !== opt.val;
              return (
                <button key={opt.label} onClick={() => choose(opt.val)} style={{
                  background: isChosen ? B.white : "rgba(255,255,255,0.06)",
                  border: `2px solid ${isChosen ? dim.color : "rgba(255,255,255,0.12)"}`,
                  borderRadius: 16, padding: "18px 16px",
                  cursor: selected !== null && !isChosen ? "default" : "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  opacity: isOther ? 0.25 : 1,
                  transform: isChosen ? "scale(1.03)" : "scale(1)",
                  transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
                  animation: isChosen ? "btnPop 0.35s ease" : "none",
                }}>
                  <div style={{ color: isChosen ? dim.color : "rgba(255,255,255,0.5)", transition: "color 0.25s" }}>{opt.icon}</div>
                  <span style={{ fontFamily: "Georgia,serif", fontSize: 17, color: isChosen ? dim.color : B.white, transition: "color 0.25s" }}>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Insight card : slides in after answer, stays until Continue */}
          {selected !== null && (
            <div style={{ animation: "insightIn 0.4s cubic-bezier(0.23,1,0.32,1) forwards", marginBottom: 14 }}>
              <div style={{
                background: `${dim.color}10`,
                border: `1px solid ${dim.color}30`,
                borderRadius: 14, padding: "16px 18px",
              }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: `${dim.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={dim.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6L15 18H9l-.7-3C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: dim.color, letterSpacing: "0.07em", marginBottom: 5 }}>DID YOU KNOW</div>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>{question.insight}</span>
                  </div>
                </div>

                {/* Continue button lives inside the insight card */}
                <button onClick={advance} disabled={confirmed} style={{
                  width: "100%", padding: "12px 20px",
                  background: dim.color, color: B.white, border: "none",
                  borderRadius: 10, fontFamily: "Georgia,serif", fontSize: 14,
                  cursor: confirmed ? "default" : "pointer",
                  opacity: confirmed ? 0.6 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "all 0.2s ease",
                }}
                  onMouseOver={e => { if (!confirmed) e.currentTarget.style.opacity = "0.85"; }}
                  onMouseOut={e => { if (!confirmed) e.currentTarget.style.opacity = "1"; }}
                >
                  {isLastQ ? "See my score" : "Got it, next question"}
                  <ArrowRight size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ padding: "0 24px 20px", display: "flex", justifyContent: "center", gap: 5 }}>
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div key={i} style={{ height: 5, width: i === questionIndex ? 20 : 6, borderRadius: 3, background: i < questionIndex ? "rgba(255,255,255,0.45)" : i === questionIndex ? dim.color : "rgba(255,255,255,0.12)", transition: "all 0.3s ease" }} />
        ))}
      </div>
    </div>
  );
}

// 3. DIM RESULT : score reveal + invitation to next
function DimResult({ dim, score, user, nextDim, completedDims, answers, onNext, onNextDim, onViewAll }) {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 100); return () => clearTimeout(t); }, []);
  const lbl = getLabel(score);
  const isAllDone = completedDims.length === DIMS.length;

  return (
    <div style={{ minHeight: "100vh", background: B.navy, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
      <Confetti active={shown && score >= 75} />
      <style>{`@keyframes revealUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>

        {/* Score ring */}
        <div style={{ opacity: shown ? 1 : 0, transition: "opacity 0.5s ease", display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <ScoreRing score={score} color={dim.color} size={140} stroke={9}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 32, color: B.white, lineHeight: 1 }}>
                {shown ? <Counter target={score} /> : 0}
              </div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>/100</div>
            </div>
          </ScoreRing>
        </div>

        <div style={{ animation: shown ? "revealUp 0.6s ease 0.3s both" : "none" }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: dim.color, letterSpacing: "0.09em", marginBottom: 10 }}>{dim.label.toUpperCase()} SCORE</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: lbl.bg, border: `1px solid ${lbl.color}25`, borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: lbl.color }} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: lbl.color }}>{lbl.text}</span>
          </div>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 400, lineHeight: 1.2, color: B.white, margin: "0 0 14px" }}>
            {score >= 80 ? "You're ahead of the curve." : score >= 60 ? "There's more to discover." : "Let's get the full picture."}
          </h2>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: "0 0 28px" }}>
            {score >= 80
              ? `Your ${dim.label.toLowerCase()} foundation is strong. A clinical assessment will show us the details that questionnaires can't capture.`
              : score >= 60
              ? `Your ${dim.label.toLowerCase()} picture shows opportunity. A visit with Dr. Gabi will reveal what's happening beneath the surface.`
              : `Your ${dim.label.toLowerCase()} score suggests areas worth addressing proactively. The sooner we look, the more options you have.`}
          </p>

          {/* Progress dots showing all 5 dims */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
            {DIMS.map(d => {
              const done = completedDims.includes(d.id);
              const current = d.id === dim.id;
              return (
                <div key={d.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: current ? 40 : 32, height: 32, borderRadius: 12, background: done ? `${d.color}25` : "rgba(255,255,255,0.05)", border: `1.5px solid ${done || current ? d.color : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
                    {done
                      ? <Check size={14} color={d.color} strokeWidth={2.5} />
                      : <DimIcon id={d.id} color={current ? d.color : "rgba(255,255,255,0.25)"} size={16} />
                    }
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          {isAllDone ? (
            <button onClick={onViewAll} style={{ width: "100%", padding: "16px", background: B.blue, color: B.white, border: "none", borderRadius: 14, fontFamily: "Georgia,serif", fontSize: 16, cursor: "pointer", transition: "all 0.25s ease", boxShadow: `0 4px 20px ${B.blue}40`, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              See my complete Primary Health Score <ArrowRight size={16} strokeWidth={2} />
            </button>
          ) : nextDim ? (
            <div>
              <button onClick={onNextDim} style={{ width: "100%", padding: "16px", background: nextDim.color, color: B.white, border: "none", borderRadius: 14, fontFamily: "Georgia,serif", fontSize: 15, cursor: "pointer", transition: "all 0.25s ease", boxShadow: `0 4px 20px ${nextDim.color}40`, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <DimIcon id={nextDim.id} color={B.white} size={18} />
                Next: {nextDim.label} <ArrowRight size={15} strokeWidth={2} />
              </button>
              <button onClick={onViewAll} style={{ width: "100%", padding: "12px", background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, fontFamily: "Georgia,serif", fontSize: 13, cursor: "pointer" }}>
                See partial results ({completedDims.length}/5 complete)
              </button>
            </div>
          ) : (
            <button onClick={onViewAll} style={{ width: "100%", padding: "16px", background: B.blue, color: B.white, border: "none", borderRadius: 14, fontFamily: "Georgia,serif", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              See my results <ArrowRight size={16} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 4. FULL RESULTS : pentagon + all 5 scores + CTA
function FullResults({ answers, user, completedDims, onRetake, onStart }) {
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 100); return () => clearTimeout(t); }, []);

  const scores = DIMS.map(d => dimScore(answers, d.id));
  const overall = completedDims.length === 5 ? overallScore(answers) : null;
  const lbl = overall !== null ? getLabel(overall) : null;
  const isPartial = completedDims.length < 5;

  return (
    <div style={{ minHeight: "100vh", background: B.navy, padding: "40px 24px 60px", overflow: "auto" }}>
      <Confetti active={shown && !isPartial && (overall || 0) >= 70} />
      <style>{`@keyframes scoreReveal{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32, opacity: shown ? 1 : 0, transition: "opacity 0.5s ease" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={B.white}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V18c0-.55-.45-1-1-1s-1 .45-1 1v1.93C7.06 19.44 4.56 16.94 4.07 13H6c.55 0 1-.45 1-1s-.45-1-1-1H4.07C4.56 7.06 7.06 4.56 11 4.07V6c0 .55.45 1 1 1s1-.45 1-1V4.07C16.94 4.56 19.44 7.06 19.93 11H18c-.55 0-1 .45-1 1s.45 1 1 1h1.93c-.49 3.94-2.99 6.44-6.93 6.93z"/></svg>
            </div>
            <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.white }}>Primary</span>
          </div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.018em", color: B.white, margin: "0 0 8px" }}>
            {user?.name ? `${user.name.split(" ")[0]}'s` : "Your"} Primary Health Score
          </h1>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
            {isPartial ? `${completedDims.length} of 5 dimensions complete` : "Complete oral-systemic health picture"}
          </p>
        </div>

        {/* Overall score + pentagon */}
        {!isPartial && overall !== null && (
          <div style={{ animation: shown ? "scoreReveal 0.6s ease 0.2s both" : "none", marginBottom: 28 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px 20px", display: "flex", alignItems: "center", gap: 20, marginBottom: 12 }}>
              <ScoreRing score={overall} color={lbl.color} size={100} stroke={7}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 26, color: B.white, lineHeight: 1 }}>
                    {shown ? <Counter target={overall} /> : 0}
                  </div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 9, color: "rgba(255,255,255,0.35)" }}>/100</div>
                </div>
              </ScoreRing>
              <div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", marginBottom: 6 }}>OVERALL HEALTH SCORE</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: lbl.bg, border: `1px solid ${lbl.color}25`, borderRadius: 16, padding: "5px 13px", marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: lbl.color }} />
                  <span style={{ fontFamily: "Georgia,serif", fontSize: 13, color: lbl.color }}>{lbl.text}</span>
                </div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                  {overall >= 80 ? "You are ahead of most people your age. Let's keep it that way." : overall >= 60 ? "A strong foundation with real opportunities to optimize." : "Significant opportunities to improve your health trajectory."}
                </div>
              </div>
            </div>

            {/* Pentagon */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px 8px 8px" }}>
              <Pentagon scores={scores} />
            </div>
          </div>
        )}

        {/* Individual dim scores */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
          {DIMS.map((dim, i) => {
            const isDone = completedDims.includes(dim.id);
            const sc = isDone ? scores[i] : null;
            const dl = sc !== null ? getLabel(sc) : null;
            return (
              <div key={dim.id} style={{
                background: isDone ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isDone ? `${dim.color}20` : "rgba(255,255,255,0.06)"}`,
                borderRadius: 14, padding: "16px 18px",
                display: "flex", alignItems: "center", gap: 14,
                animation: isDone && shown ? `scoreReveal 0.5s ease ${0.1 + i * 0.08}s both` : "none",
                opacity: isDone ? 1 : 0.4,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: isDone ? `${dim.color}18` : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <DimIcon id={dim.id} color={isDone ? dim.color : "rgba(255,255,255,0.2)"} size={26} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: isDone ? B.white : "rgba(255,255,255,0.35)", marginBottom: 4 }}>{dim.label}</div>
                  {isDone && dl ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: shown ? `${sc}%` : "0%", background: dim.color, borderRadius: 3, transition: `width 1s cubic-bezier(0.23,1,0.32,1) ${0.3 + i * 0.08}s` }} />
                      </div>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: 13, color: dim.color, minWidth: 28 }}>{sc}</span>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: dl.color, background: dl.bg, padding: "2px 8px", borderRadius: 8 }}>{dl.text}</span>
                    </div>
                  ) : (
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>Not yet completed</div>
                  )}
                </div>
                {!isDone && (
                  <button onClick={() => onStart(dim.id)} style={{ background: `${dim.color}18`, border: `1px solid ${dim.color}30`, borderRadius: 9, padding: "7px 14px", fontFamily: "Georgia,serif", fontSize: 12, color: dim.color, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                    Start <ArrowRight size={11} strokeWidth={2} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Email confirmation */}
        {user?.email && (
          <div style={{ background: `${B.green}12`, border: `1px solid ${B.green}25`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <Check size={14} color={B.green} strokeWidth={2.5} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.green }}>Results sent to {user.email}</span>
          </div>
        )}

        {/* CTA */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.07em", marginBottom: 12 }}>WHAT COMES NEXT</div>
          <h3 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 400, lineHeight: 1.25, color: B.white, margin: "0 0 12px" }}>
            Your score is a starting point.<br />
            <span style={{ fontStyle: "italic", color: B.blue }}>A clinical visit goes much deeper.</span>
          </h3>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 13.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: "0 0 20px" }}>
            Primary uses advanced diagnostics, 3D imaging, salivary testing, and airway assessment, to see what questionnaires can only hint at.
          </p>
          <a href="/book/" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "15px", background: B.blue, color: B.white, borderRadius: 12, fontFamily: "Georgia,serif", fontSize: 15, textDecoration: "none", marginBottom: 10, boxShadow: `0 4px 20px ${B.blue}40`, transition: "all 0.25s ease" }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Book a comprehensive evaluation <ArrowRight size={16} strokeWidth={2} />
          </a>
          <button onClick={onRetake} style={{ width: "100%", padding: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.35)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <RotateCcw size={13} strokeWidth={1.8} /> Start over
          </button>
          <div style={{ marginTop: 16, fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
            11980 San Vicente Blvd, Suite 902 · Brentwood, Los Angeles · (310) 564-8990
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────
// screens: "landing" | "dimIntro" | "question" | "dimResult" | "fullResults"
export default function PrimaryHealthScore() {
  const [screen, setScreen] = useState("landing");
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState({});
  const [completedDims, setCompletedDims] = useState([]);
  const [dimQueue, setDimQueue] = useState([]); // dims to do in sequence
  const [currentDimIdx, setCurrentDimIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [latestScore, setLatestScore] = useState(0);

  const currentDim = dimQueue[currentDimIdx] ? DIMS.find(d => d.id === dimQueue[currentDimIdx]) : null;

  // Start a single dim
  const startSingle = (dimId, userData) => {
    setUser(userData);
    setDimQueue([dimId]);
    setCurrentDimIdx(0);
    setQuestionIdx(0);
    setScreen("dimIntro");
  };

  // Start all 5 dims
  const startAll = (userData) => {
    setUser(userData);
    setDimQueue(DIMS.map(d => d.id));
    setCurrentDimIdx(0);
    setQuestionIdx(0);
    setScreen("dimIntro");
  };

  const handleBeginDim = () => setScreen("question");

  // Submit assessment data to Google Sheets
  const submitToGoogleSheets = async (newAnswers: Record<string, boolean>, newCompleted: string[]) => {
    try {
      const scores = {
        oral: dimScore(newAnswers, "oral"),
        sleep: dimScore(newAnswers, "sleep"),
        nutrition: dimScore(newAnswers, "nutrition"),
        genetics: dimScore(newAnswers, "genetics"),
        airway: dimScore(newAnswers, "airway"),
      };
      const overall = newCompleted.length === 5 ? overallScore(newAnswers) : null;
      
      await fetch("/api/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          answers: newAnswers,
          scores,
          completedDims: newCompleted,
          overallScore: overall,
        }),
      });
    } catch (error) {
      console.error("[v0] Failed to submit to Google Sheets:", error);
    }
  };

  const handleAnswer = (val) => {
    const key = `${currentDim.id}-${questionIdx}`;
    const newAnswers = { ...answers, [key]: val };
    setAnswers(newAnswers);

    const isLastQ = questionIdx === currentDim.questions.length - 1;
    if (isLastQ) {
      const sc = dimScore(newAnswers, currentDim.id);
      setLatestScore(sc);
      const newCompleted = completedDims.includes(currentDim.id)
        ? completedDims
        : [...completedDims, currentDim.id];
      setCompletedDims(newCompleted);
      
      // Submit to Google Sheets after each dimension is completed
      submitToGoogleSheets(newAnswers, newCompleted);
      
      setScreen("dimResult");
    } else {
      setQuestionIdx(qi => qi + 1);
    }
  };

  const handleNextDim = () => {
    const nextIdx = currentDimIdx + 1;
    if (nextIdx < dimQueue.length) {
      setCurrentDimIdx(nextIdx);
      setQuestionIdx(0);
      setScreen("dimIntro");
    } else {
      setScreen("fullResults");
    }
  };

  const handleStartDimFromResults = (dimId) => {
    setDimQueue(prev => {
      const remaining = DIMS.filter(d => !completedDims.includes(d.id) || d.id === dimId).map(d => d.id);
      return remaining;
    });
    setCurrentDimIdx(0);
    setQuestionIdx(0);
    setScreen("dimIntro");
  };

  const handleRetake = () => {
    setAnswers({});
    setCompletedDims([]);
    setUser(null);
    setDimQueue([]);
    setCurrentDimIdx(0);
    setQuestionIdx(0);
    setScreen("landing");
  };

  const nextDim = dimQueue[currentDimIdx + 1] ? DIMS.find(d => d.id === dimQueue[currentDimIdx + 1]) : null;

  return (
    <div style={{ fontFamily: "Georgia,serif" }}>
      <style>{`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${B.navy}; }`}</style>

      {screen === "landing" && (
        <Landing onStart={startSingle} onStartAll={startAll} />
      )}
      {screen === "dimIntro" && currentDim && (
        <DimIntro
          dim={currentDim}
          user={user}
          qsDone={completedDims.length * 10}
          totalDims={dimQueue.length}
          onBegin={handleBeginDim}
        />
      )}
      {screen === "question" && currentDim && (
        <Question
          dim={currentDim}
          question={currentDim.questions[questionIdx]}
          questionIndex={questionIdx}
          totalQuestions={currentDim.questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {screen === "dimResult" && currentDim && (
        <DimResult
          dim={currentDim}
          score={latestScore}
          user={user}
          nextDim={nextDim}
          completedDims={completedDims}
          answers={answers}
          onNext={handleNextDim}
          onNextDim={handleNextDim}
          onViewAll={() => setScreen("fullResults")}
        />
      )}
      {screen === "fullResults" && (
        <FullResults
          answers={answers}
          user={user}
          completedDims={completedDims}
          onRetake={handleRetake}
          onStart={handleStartDimFromResults}
        />
      )}
    </div>
  );
}
