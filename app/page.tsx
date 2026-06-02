"use client";

import { useState, useEffect, useRef } from "react";
import OralSystemicSection from "@/components/oral-systemic-section";
import MeetYourPrimaryID from "@/components/meet-your-primary-id";
import CarePathways from "@/components/care-pathways";
import NewPatientVisit from "@/components/new-patient-visit";
import OurApproach from "@/components/our-approach";
import Testimonials from "@/components/testimonials";
import MobileStickyCTA from "@/components/mobile-sticky-cta";
import FinancialMembership from "@/components/financial-membership";

// ============================================================
// PRIMARY — Homepage
// Quiet luxury editorial · Booking-primary · Assessment as depth
// Design: cream/navy/serif · two-column editorial · restrained motion
// ============================================================

const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  green: "#48C28C",
  cream: "#FAF8F5",
  warmWhite: "#FEFCF9",
  white: "#FFFFFF",
  lightBlue: "#E8F6FC",
  body: "#4A4A5A",
  muted: "#8A8A9A",
  border: "rgba(14,34,64,0.07)",
  accent: "#E8985E",
};

// ── Utility: fade-in on scroll ────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 18, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.75s cubic-bezier(0.23,1,0.32,1) ${delay}s, transform 0.75s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────
function Nav({ scrolled }) {
  return (
    <>
    <style>{`
      @media (min-width: 760px) {
        .nav-phone { display: inline-flex !important; }
      }
    `}</style>
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(250,248,245,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${B.border}` : "none",
      transition: "all 0.4s ease",
      padding: "0 32px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img 
            src="/images/primary-brand-logo.png" 
            alt="Primary" 
            style={{ height: 64, width: "auto" }} 
          />
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {[
            { label: "Why Primary", href: "/why-primary/" },
            { label: "Five Dimensions", href: "/five-dimensions/" },
            { label: "Services", href: "#services" },
            { label: "Dr. Gabi", href: "/about/" },
            { label: "Membership", href: "#membership" },
            { label: "Journal", href: "/blogs/" },
          ].map(item => (
            <a key={item.label} href={item.href} style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, textDecoration: "none", opacity: 0.7, transition: "opacity 0.2s" }}
              onMouseOver={e => (e.target as HTMLElement).style.opacity = "1"}
              onMouseOut={e => (e.target as HTMLElement).style.opacity = "0.7"}
            >{item.label}</a>
          ))}
        </div>

        {/* Primary CTA */}
        <a
          href="tel:+13105648990"
          style={{
            display: "none",
            color: B.navy, textDecoration: "none",
            fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 500,
            marginRight: 18, alignItems: "center", gap: 6,
            opacity: 0.85,
          }}
          className="nav-phone"
          onMouseOver={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          onMouseOut={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          (310) 564-8990
        </a>
        <a href="#book" style={{
          background: B.navy, color: B.white, textDecoration: "none",
          borderRadius: 8, padding: "9px 20px",
          fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 400,
          letterSpacing: "0.01em",
          boxShadow: "0 2px 12px rgba(14,34,64,0.18)",
          transition: "all 0.2s ease",
          display: "inline-block",
        }}
          onMouseOver={e => { e.currentTarget.style.background = "#1a3a5c"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(14,34,64,0.28)"; }}
          onMouseOut={e => { e.currentTarget.style.background = B.navy; e.currentTarget.style.boxShadow = "0 2px 12px rgba(14,34,64,0.18)"; }}
        >
          Book a visit
        </a>
      </div>
    </nav>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const trustItems = [
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/><polyline points="9 12 11 14 15 10"/></svg>, text: "Rated 4.9 by 373+ patients on Google" },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M4 4h10l6 6v10H4z"/><path d="M8 9h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>, text: "Functional prosthodontist + integrative team" },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 8-11 5 3 8 7 8 11a7 7 0 0 1-7 7z"/><path d="M12 4v16"/></svg>, text: "Whole-body dentistry, not just teeth" },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg>, text: "Start with a free 6-minute online assessment" },
  ];

  return (
    <section style={{
      background: B.cream,
      padding: "120px 48px 96px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)", gap: 64, alignItems: "center", position: "relative", zIndex: 1 }}>
        {/* Left: Content */}
        <div>
          {/* Headline */}
          <h1 style={{
            fontFamily: "Georgia,serif",
            fontSize: "clamp(36px, 5.4vw, 78px)",
            fontWeight: 400,
            color: B.navy,
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            margin: 0,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.2s",
          }}>
            Dentistry reimagined to see <span style={{ fontStyle: "italic", color: B.blue }}>the whole you</span>.
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 18, lineHeight: 1.55,
            color: B.body, maxWidth: 520,
            marginTop: 32,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.35s",
          }}>
            Most dental practices treat what&apos;s in front of them. We start with you, your sleep, your history, your whole health, and work backwards to your mouth.
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap",
            marginTop: 40,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.5s",
          }}>
            <a href="#book" style={{
              background: B.navy, color: B.white,
              padding: "16px 32px", borderRadius: 9,
              textDecoration: "none", fontWeight: 600, fontSize: 15,
              transition: "background 0.15s ease",
            }}
              onMouseOver={e => { e.currentTarget.style.background = "#1a3259"; }}
              onMouseOut={e => { e.currentTarget.style.background = B.navy; }}
            >
              Book a visit
            </a>

            <a href="/diagnostics/" style={{
              color: B.navy, textDecoration: "none", fontWeight: 500, fontSize: 15,
              display: "inline-flex", alignItems: "center", gap: 8,
              borderBottom: "1px solid rgba(14,34,64,0.2)",
              paddingBottom: 4,
              transition: "border-color 0.15s ease, color 0.15s ease",
            }}
              onMouseOver={e => { e.currentTarget.style.color = B.blue; e.currentTarget.style.borderBottomColor = B.blue; }}
              onMouseOut={e => { e.currentTarget.style.color = B.navy; e.currentTarget.style.borderBottomColor = "rgba(14,34,64,0.2)"; }}
            >
              Take the health assessment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <div style={{
              fontFamily: "Georgia,serif",
              fontSize: 12.5,
              color: B.muted,
              marginTop: -4,
              letterSpacing: "0.01em",
              opacity: 0.85,
            }}>
              Free · Private · Results sent to your inbox.
            </div>
          </div>

          {/* Trust Strip */}
          <ul style={{
            listStyle: "none", margin: "40px 0 0", padding: 0,
            display: "grid", gridTemplateColumns: "1fr", gap: 14,
            maxWidth: 520,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.6s",
          }}>
            {trustItems.map((item, i) => (
              <li key={i} style={{
                display: "grid", gridTemplateColumns: "24px 1fr", alignItems: "center", gap: 14,
                fontSize: 16, lineHeight: 1.4, color: B.navy, fontWeight: 500,
              }}>
                {item.icon}
                {item.text}
              </li>
            ))}
          </ul>

          {/* Credential */}
          <div style={{
            marginTop: 48, fontFamily: "Georgia,serif", fontStyle: "italic",
            color: B.muted, fontSize: 14, lineHeight: 1.6,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 0.8s",
          }}>
            Founded by <a href="/about/" style={{ color: B.muted, textDecoration: "none" }} onMouseOver={e => e.currentTarget.style.color = B.navy} onMouseOut={e => e.currentTarget.style.color = B.muted}>Dr. Tzur Gabi, Functional Prosthodontist &amp; Oral Physician</a>
          </div>
        </div>

        {/* Right: Video Card */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s cubic-bezier(0.23,1,0.32,1) 0.4s",
        }}>
          <div 
            onClick={() => setVideoPlaying(true)}
            style={{ 
              position: "relative", width: "100%", aspectRatio: "16/10",
              borderRadius: 14, overflow: "hidden", background: "#0a1a2e",
              boxShadow: "0 30px 60px -20px rgba(14,34,64,0.25)",
              cursor: videoPlaying ? "default" : "pointer",
            }}
          >
            {!videoPlaying ? (
              <>
                {/* Poster background - actual video thumbnail */}
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-04-26%20at%207.35.36%E2%80%AFPM-jpiQLD7s4IpU7vEnPnsGyUwMPlPe46.png"
                  alt="Meet Dr. Tzur Gabi - Video thumbnail"
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                  }}
                />

                {/* Play button */}
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 88, height: 62, borderRadius: 14,
                  background: "#FF0000",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                  transition: "transform 0.15s ease, background 0.15s ease",
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.06)"; e.currentTarget.style.background = "#c00"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "translate(-50%, -50%)"; e.currentTarget.style.background = "#FF0000"; }}
                >
                  <svg width="34" height="24" viewBox="0 0 24 24" fill="white"><polygon points="8 5 20 12 8 19 8 5"/></svg>
                </div>

                {/* Chrome bottom */}
                <div style={{
                  position: "absolute", bottom: 12, right: 16, zIndex: 2,
                  background: "rgba(0,0,0,0.7)", color: "white",
                  padding: "6px 12px", borderRadius: 20,
                  fontSize: 12, fontWeight: 500,
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                  Watch on
                  <svg width="48" height="12" viewBox="0 0 90 20" fill="white"><path d="M88.3 3.1c-.4-1.5-1.6-2.7-3.1-3.1C82.5 0 45 0 45 0S7.5 0 4.8 0C3.3.4 2.1 1.6 1.7 3.1 1 5.8 1 10 1 10s0 4.2.7 6.9c.4 1.5 1.6 2.7 3.1 3.1C7.5 20 45 20 45 20s37.5 0 40.2-.7c1.5-.4 2.7-1.6 3.1-3.1.7-2.7.7-6.9.7-6.9s0-4.2-.7-6.9z"/><polygon points="36 14.3 54 10 36 5.7" fill="#c00"/></svg>
                </div>
              </>
            ) : (
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube-nocookie.com/embed/6-PaAY5zcsI?autoplay=1&rel=0" 
                title="Meet Dr. Gabi" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ position: "absolute", inset: 0, border: "none" }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PRIMARY iD UNIFIED EXPERIENCE ─────────────────────────────
// Step 0: Intro strip (the 5 dimensions teaser)
// Step 1: Name + email capture
// Step 2: Live assessment (per dimension)
// Step 3: Results + email confirmation
// ── PRE-APPOINTMENT PRESCREENING DATA ─────────────────────────
const PS_QUESTIONS = [
  { id:"q1", type:"multi_select", emoji:"🏠", label:"GETTING STARTED", q:"What brings you to Primary?", subtitle:"Select all that apply — there's no wrong answer.", options:[{id:"routine",text:"A routine cleaning or checkup",icon:"🪥"},{id:"specific",text:"Something specific is bothering me",icon:"🎯"},{id:"second",text:"I want a second opinion",icon:"🔍"},{id:"cosmetic",text:"I'm exploring cosmetic or alignment options",icon:"✨"},{id:"holistic",text:"I'm interested in a more holistic approach",icon:"🌿"},{id:"referred",text:"Someone recommended Primary to me",icon:"💬"}], insight:"Most of our patients come in for one reason and discover three more. That's the Primary difference — we see what others miss." },
  { id:"q2", type:"single_select", emoji:"📅", label:"YOUR HISTORY", q:"When was your last dental visit?", subtitle:"However long it's been — you're here now.", options:[{id:"recent",text:"Within the last 6 months",icon:"✓"},{id:"year",text:"6 months to a year ago",icon:"📆"},{id:"few_years",text:"1–3 years ago",icon:"⏳"},{id:"long",text:"More than 3 years",icon:"🕰️"},{id:"unknown",text:"I honestly can't remember",icon:"🤷"}], insight:"At Primary, we see patients more often than any other doctor. However long it's been, this visit is a chance to get the full picture." },
  { id:"q3", type:"multi_select", emoji:"👀", label:"WHAT YOU'VE NOTICED", q:"Have you noticed any of these?", subtitle:"Check anything that sounds familiar. Even if it seems minor.", options:[{id:"bleeding",text:"Bleeding when brushing or flossing",icon:"🩸"},{id:"sensitivity",text:"Sensitivity to hot, cold, or sweet",icon:"🧊"},{id:"jaw",text:"Jaw pain, clicking, or tension",icon:"😣"},{id:"loose",text:"A tooth that feels loose or different",icon:"🦷"},{id:"breath",text:"Persistent bad breath",icon:"💨"},{id:"spot",text:"Something that doesn't look right",icon:"🔎"},{id:"headache",text:"Waking up with headaches or a sore jaw",icon:"🤕"},{id:"none",text:"None of these",icon:"👍",exclusive:true}], insight:"Each of these is your body communicating. At Primary, we don't just treat symptoms — we find out what they're connected to." },
  { id:"q4", type:"single_select", emoji:"🔧", label:"YOUR DENTAL WORK", q:"Do you have older dental work you've wondered about?", subtitle:"Fillings, crowns, bridges — anything from past visits.", options:[{id:"none",text:"I don't have any dental work",icon:"✨"},{id:"fine",text:"I have some and it's all fine",icon:"👌"},{id:"questions",text:"I have some and I've had questions",icon:"🤔"},{id:"assess",text:"I have quite a bit and I'd like it assessed",icon:"📋"},{id:"unsure",text:"I'm not sure what I have honestly",icon:"🤷"}], insight:"Dental materials don't last forever. We use advanced 3D imaging to assess every piece of existing work — because what's already in your mouth matters as much as what we put in." },
  { id:"q5", type:"single_select", emoji:"🌡️", label:"YOUR EXPERIENCE", q:"How does your mouth feel most days?", subtitle:"There's no right answer. Just your honest experience.", options:[{id:"great",text:"Great — I don't think about it",icon:"😊"},{id:"fine",text:"Fine, but not perfect",icon:"🙂"},{id:"off",text:"Something's off but I can't pinpoint it",icon:"😐"},{id:"not_great",text:"Honestly, not great",icon:"😔"}], insight:"Your daily experience matters to us as much as what we find clinically. Sometimes the two don't match — and that gap is exactly what a comprehensive assessment uncovers." },
  { id:"q6", type:"multi_select", emoji:"🔗", label:"THE BIGGER PICTURE", q:"Do any of these sound like you?", subtitle:"This is where dentistry meets medicine.", options:[{id:"grind",text:"I grind or clench my teeth",icon:"😬"},{id:"snore",text:"I snore or stop breathing at night",icon:"💤"},{id:"mouth_breathe",text:"I breathe through my mouth more than my nose",icon:"👄"},{id:"reflux",text:"I deal with acid reflux or digestive issues",icon:"🔥"},{id:"family",text:"Family history of heart disease, diabetes, or gum disease",icon:"👨‍👩‍👧"},{id:"dry_mouth",text:"I'm on medications that cause dry mouth",icon:"💊"},{id:"none",text:"None of these",icon:"👍",exclusive:true}], insight:"Your mouth is connected to everything — your sleep, your digestion, your heart, your DNA. We're the practice that actually looks at all of it." },
  { id:"q7", type:"pick_two", emoji:"✨", label:"WHAT MATTERS TO YOU", q:"What matters most to you about your dental care?", subtitle:"Pick up to two.", options:[{id:"understand",text:"Understanding what's actually going on in my body",icon:"🧠"},{id:"smile",text:"My smile looking and feeling its best",icon:"😁"},{id:"prevent",text:"Preventing problems before they start",icon:"🛡️"},{id:"listen",text:"Someone who really listens and explains things",icon:"👂"},{id:"tech",text:"The most advanced technology available",icon:"🔬"}], insight:"Every answer here shapes how we personalize your visit. There are no wrong priorities — only yours." },
  { id:"q8", type:"free_text", emoji:"💬", label:"YOUR SPACE", q:"Anything else you want us to know?", subtitle:"Dental anxiety, a past experience, something specific you're hoping for — anything at all.", placeholder:"This is totally optional. But if there's something on your mind, we'd love to hear it...", insight:"Whatever you share here, our team will read before your visit. You'll never have to repeat yourself." },
];

function psGenerateSnapshot(answers) {
  const symptoms = answers.q3 || []; const systemic = answers.q6 || [];
  const hasSymptoms = symptoms.length > 0 && !symptoms.includes("none");
  const hasSystemic = systemic.length > 0 && !systemic.includes("none");
  const symptomCount = hasSymptoms ? symptoms.length : 0;
  const systemicCount = hasSystemic ? systemic.length : 0;
  const recency = answers.q2; const subjective = answers.q5; const restorations = answers.q4;
  const values = answers.q7 || [];
  let tier = "ahead";
  if (symptomCount >= 3 || systemicCount >= 3 || subjective === "not_great" || recency === "long" || recency === "unknown") tier = "full_picture";
  else if (symptomCount >= 1 || systemicCount >= 1 || subjective === "off" || recency === "few_years" || restorations === "questions" || restorations === "assess") tier = "discover";
  const symptomMap = { bleeding:{label:"Gum health & inflammation",icon:"🩸"}, sensitivity:{label:"Tooth structure & decay screening",icon:"🧊"}, jaw:{label:"TMJ & jaw function",icon:"😣"}, loose:{label:"Bone health & periodontal assessment",icon:"🦷"}, breath:{label:"Oral microbiome balance",icon:"💨"}, spot:{label:"Soft tissue screening",icon:"🔎"}, headache:{label:"Sleep & airway connection",icon:"🤕"} };
  const systemicMap = { grind:{label:"Bruxism & stress patterns",icon:"😬"}, snore:{label:"Sleep-disordered breathing",icon:"💤"}, mouth_breathe:{label:"Airway & breathing assessment",icon:"👄"}, reflux:{label:"Acid erosion & GI connection",icon:"🔥"}, family:{label:"Genetic predisposition screening",icon:"👨‍👩‍👧"}, dry_mouth:{label:"Salivary flow & caries risk",icon:"💊"} };
  const areas = [];
  if (hasSymptoms) symptoms.forEach(s => { if (symptomMap[s]) areas.push(symptomMap[s]); });
  if (hasSystemic) systemic.forEach(s => { if (systemicMap[s]) areas.push(systemicMap[s]); });
  if (["questions","assess","unsure"].includes(restorations)) areas.push({label:"Existing dental work assessment",icon:"🔧"});
  if (["few_years","long","unknown"].includes(recency)) areas.push({label:"Comprehensive baseline imaging",icon:"📸"});
  if (areas.length === 0) { areas.push({label:"Proactive wellness baseline",icon:"🛡️"}); areas.push({label:"Oral-systemic health screening",icon:"🔗"}); }
  let personalNote = "";
  if (values.includes("understand")) personalNote = "You want to understand what's really going on. We'll walk you through every finding with the kind of detail most practices never share.";
  else if (values.includes("listen")) personalNote = "You want someone who really listens. Dr. Gabi will take the time to hear your story and explain everything clearly.";
  else if (values.includes("prevent")) personalNote = "You're thinking ahead. We'll focus on what we can catch early and build a proactive plan to keep you healthy.";
  else if (values.includes("smile")) personalNote = "Your smile matters. We'll look at function and aesthetics together — because the best results come from healthy foundations.";
  else if (values.includes("tech")) personalNote = "You appreciate precision. We'll show you exactly what our 3D imaging and advanced diagnostics reveal.";
  return { tier, areas: areas.slice(0,5), personalNote };
}

const PS_TIERS = {
  ahead: { headline:"You're ahead of the curve.", body:"You're already paying attention to your health. A Primary evaluation will help us see the things that are invisible to the naked eye — what 3D imaging reveals, what your oral microbiome tells us, and how to keep you in this great position for years to come.", color:B.green },
  discover: { headline:"There's more to discover.", body:"Your body is giving you signals — and that's a good thing. It means there's an opportunity to understand what's really happening beneath the surface. This is exactly what Primary's comprehensive assessment is built for.", color:B.blue },
  full_picture: { headline:"Let's get the full picture.", body:"You're in the right place. There's a lot your body has been wanting to tell you, and we have the tools to listen. A comprehensive evaluation with advanced imaging will give us both clarity — and a clear path forward.", color:B.accent },
};

function PsMultiOption({ opt, isSelected, onToggle, color, disabled }) {
  return (
    <div
      onClick={() => !disabled && onToggle(opt.id)}
      style={{
        boxSizing: "border-box",
        width: "100%",
        padding: "11px 14px",
        background: isSelected ? `${color}12` : "#F4F5F7",
        border: `2px solid ${isSelected ? color : "transparent"}`,
        borderRadius: 12,
        cursor: disabled && !isSelected ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10,
        transition: "all 0.18s ease",
        opacity: disabled && !isSelected ? 0.35 : 1,
        userSelect: "none",
      }}
    >
      <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, border: isSelected ? `2px solid ${color}` : "2px solid rgba(14,34,64,0.18)", background: isSelected ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s ease" }}>
        {isSelected && <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, lineHeight: 1 }}>✓</span>}
      </div>
      <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1 }}>{opt.icon}</span>
      <span style={{ fontFamily: "Georgia, serif", fontSize: 14, color: isSelected ? B.navy : "#3A3A4A", lineHeight: 1.4, flex: 1 }}>{opt.text}</span>
    </div>
  );
}

function PsSingleOption({ opt, isSelected, onSelect, color }) {
  return (
    <div
      onClick={() => onSelect(opt.id)}
      style={{
        boxSizing: "border-box",
        width: "100%",
        padding: "11px 14px",
        background: isSelected ? `${color}12` : "#F4F5F7",
        border: `2px solid ${isSelected ? color : "transparent"}`,
        borderRadius: 12,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10,
        transition: "all 0.18s ease",
        userSelect: "none",
      }}
    >
      <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, border: isSelected ? `2px solid ${color}` : "2px solid rgba(14,34,64,0.18)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s ease" }}>
        {isSelected && <div style={{ width: 9, height: 9, borderRadius: "50%", background: color }} />}
      </div>
      <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1 }}>{opt.icon}</span>
      <span style={{ fontFamily: "Georgia, serif", fontSize: 14, color: isSelected ? B.navy : "#3A3A4A", lineHeight: 1.4, flex: 1 }}>{opt.text}</span>
    </div>
  );
}

// ── UNIFIED HOMEPAGE EXPERIENCE ────────────────────────────────
// step 0 = teaser strip  |  1 = lead capture
// step 2–9 = prescreening questions (8 Qs)  |  10 = snapshot results
const PS_OFFSET = 2; // questions start at step 2

function PrimaryiDExperience() {
  const [step, setStep] = useState(0); // 0=strip, 1=capture, 2-9=Qs, 10=results
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [answers, setAnswers] = useState({});
  const [freeText, setFreeText] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const sectionRef = useRef(null);

  const fname = name.trim().split(" ")[0];
  const qIdx = step - PS_OFFSET; // 0-7 when in question phase
  const question = (step >= PS_OFFSET && step < PS_OFFSET + PS_QUESTIONS.length) ? PS_QUESTIONS[qIdx] : null;
  const progress = step >= PS_OFFSET ? (qIdx / PS_QUESTIONS.length) * 100 : 0;
  const currentAnswer = question ? answers[question.id] : undefined;

  const canProceed = (() => {
    if (!question) return false;
    if (question.type === "free_text") return true;
    if (question.type === "multi_select" || question.type === "pick_two") return currentAnswer && currentAnswer.length > 0;
    if (question.type === "single_select") return !!currentAnswer;
    return false;
  })();

  const handleCapture = () => {
    const ne = !name.trim();
    const ee = !email.trim() || !email.includes("@");
    setNameError(ne); setEmailError(ee);
    if (!ne && !ee) setStep(PS_OFFSET);
  };

  function handleMultiToggle(optId) {
    const q = question;
    const current = answers[q.id] || [];
    const opt = q.options.find(o => o.id === optId);
    if (opt?.exclusive) { setAnswers(prev => ({ ...prev, [q.id]: [optId] })); return; }
    const filtered = current.filter(id => !q.options.find(x => x.id === id)?.exclusive);
    if (filtered.includes(optId)) {
      setAnswers(prev => ({ ...prev, [q.id]: filtered.filter(id => id !== optId) }));
    } else {
      if (q.type === "pick_two" && filtered.length >= 2) return;
      setAnswers(prev => ({ ...prev, [q.id]: [...filtered, optId] }));
    }
  }

  function handleSingleSelect(optId) {
    setAnswers(prev => ({ ...prev, [question.id]: optId }));
  }

  function goNext() {
    const isLastQ = qIdx === PS_QUESTIONS.length - 1;
    if (isLastQ) {
      if (freeText.trim()) setAnswers(prev => ({ ...prev, q8_text: freeText }));
      setShowConfetti(true);
      setTransitioning(true);
      setTimeout(() => { setStep(PS_OFFSET + PS_QUESTIONS.length); setTransitioning(false); }, 350);
      return;
    }
    setShowInsight(false);
    setTransitioning(true);
    setTimeout(() => { setStep(s => s + 1); setTransitioning(false); setShowInsight(false); }, 280);
  }

  // ── STEP 0: Oral-Systemic Section (imported component) ──
  if (step === 0) {
    return <OralSystemicSection />;
  }

  // ── CAPTURE (step 1) ──
  if (step === 1) {
    return (
      <section ref={sectionRef} style={{ background: B.navy, padding: "80px 32px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 24, height: 1, background: B.blue }} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.blue, letterSpacing: "0.06em" }}>ORAL HEALTH SNAPSHOT</span>
            <div style={{ width: 24, height: 1, background: B.blue }} />
          </div>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: B.white, lineHeight: 1.12, letterSpacing: "-0.015em", margin: "0 0 14px" }}>
            Let's make this<br /><span style={{ fontStyle: "italic", color: B.blue }}>personal.</span>
          </h2>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: "0 0 36px" }}>
            Enter your name and email and we'll send your personalized oral health snapshot straight to your inbox when you're done.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
            <input type="text" placeholder="Your first name" value={name}
              onChange={e => { setName(e.target.value); setNameError(false); }}
              onKeyDown={e => e.key === "Enter" && handleCapture()}
              style={{ background: nameError ? "rgba(232,152,94,0.08)" : "rgba(255,255,255,0.05)", border: nameError ? `1px solid ${B.accent}60` : "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 20px", fontFamily: "Georgia,serif", fontSize: 15, color: B.white, outline: "none", width: "100%", boxSizing: "border-box", transition: "border 0.2s ease" }}
              onFocus={e => { if (!nameError) e.target.style.borderColor = "rgba(255,255,255,0.25)"; }}
              onBlur={e => { if (!nameError) e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
            {nameError && <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: B.accent, textAlign: "left" }}>Please enter your name</div>}
            <input type="email" placeholder="Your email address" value={email}
              onChange={e => { setEmail(e.target.value); setEmailError(false); }}
              onKeyDown={e => e.key === "Enter" && handleCapture()}
              style={{ background: emailError ? "rgba(232,152,94,0.08)" : "rgba(255,255,255,0.05)", border: emailError ? `1px solid ${B.accent}60` : "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 20px", fontFamily: "Georgia,serif", fontSize: 15, color: B.white, outline: "none", width: "100%", boxSizing: "border-box", transition: "border 0.2s ease" }}
              onFocus={e => { if (!emailError) e.target.style.borderColor = "rgba(255,255,255,0.25)"; }}
              onBlur={e => { if (!emailError) e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
            {emailError && <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: B.accent, textAlign: "left" }}>Please enter a valid email</div>}
          </div>
          <button onClick={handleCapture} style={{ background: B.white, color: B.navy, border: "none", borderRadius: 9, padding: "14px 40px", cursor: "pointer", fontFamily: "Georgia,serif", fontSize: 15, width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "all 0.25s ease" }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"; }}
          >
            Start my snapshot →
          </button>
          <div style={{ marginTop: 14, fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.18)", fontStyle: "italic" }}>
            No spam. We'll only send your results.
          </div>
        </div>
      </section>
    );
  }

  // ── QUESTIONS (steps 2–9) ──
  if (question) {
    const qColor = B.blue;
    return (
      <section ref={sectionRef} style={{ background: B.navy, padding: "0" }}>
        <style>{`
          @keyframes psFloat { 0%,100%{transform:translateY(0);opacity:0.4} 50%{transform:translateY(-12px);opacity:0.7} }
          @keyframes psBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
          @keyframes psConfetti { 0%{transform:translateY(0) rotate(0);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
        `}</style>
        {showConfetti && (
          <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 300 }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: -20, width: 5 + Math.random() * 5, height: 5 + Math.random() * 5, background: [B.blue, B.green, B.accent, "#7B68EE", "#FFD700"][i % 5], borderRadius: Math.random() > 0.5 ? "50%" : 2, animation: `psConfetti ${1.2 + Math.random() * 0.8}s ease-out ${Math.random() * 0.4}s forwards` }} />
            ))}
          </div>
        )}

        {/* Progress bar */}
        <div style={{ height: 3, background: "rgba(255,255,255,0.06)" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${B.green}, ${B.blue})`, transition: "width 0.5s cubic-bezier(0.23,1,0.32,1)" }} />
        </div>

        <div style={{ maxWidth: 620, margin: "0 auto", padding: "40px 24px 48px", boxSizing: "border-box" }}>
          {/* Nav row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <button onClick={() => { if (step === PS_OFFSET) { setStep(1); } else { setTransitioning(true); setTimeout(() => { setStep(s => s - 1); setTransitioning(false); setShowInsight(false); }, 250); } }} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 9, padding: "8px 14px", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontFamily: "Georgia,serif", fontSize: 13, transition: "all 0.2s ease" }}>
              ← Back
            </button>
            <div style={{ display: "flex", gap: 5 }}>
              {PS_QUESTIONS.map((_, i) => (
                <div key={i} style={{ width: i === qIdx ? 18 : 6, height: 5, borderRadius: 3, background: i < qIdx ? "rgba(255,255,255,0.4)" : i === qIdx ? B.white : "rgba(255,255,255,0.1)", transition: "all 0.3s ease" }} />
              ))}
            </div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
              {fname ? `${fname} · ` : ""}{qIdx + 1} of {PS_QUESTIONS.length}
            </div>
          </div>

          {/* Question card */}
          <div key={`ps-${step}`} style={{ boxSizing: "border-box", width: "100%", background: B.warmWhite, borderRadius: 20, padding: "28px 24px", boxShadow: "0 16px 48px rgba(0,0,0,0.2)", opacity: transitioning ? 0 : 1, transform: transitioning ? "translateX(-12px) scale(0.98)" : "translateX(0) scale(1)", transition: "all 0.28s ease", marginBottom: 14 }}>
            {/* Label + emoji */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 10, color: qColor, letterSpacing: "0.07em", marginBottom: 10 }}>{question.label}</div>
              <div style={{ fontSize: 40, marginBottom: 12, display: "inline-block", animation: "psBounce 2.5s ease-in-out infinite" }}>{question.emoji}</div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 400, color: B.navy, lineHeight: 1.25, margin: "0 0 6px" }}>{question.q}</h2>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 13, color: B.body, opacity: 0.55, lineHeight: 1.45, margin: 0 }}>{question.subtitle}</p>
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7, boxSizing: "border-box" }}>
              {question.type === "multi_select" && question.options.map(opt => {
                const selected = (currentAnswer || []).includes(opt.id);
                const noneSelected = (currentAnswer || []).includes("none");
                return <PsMultiOption key={opt.id} opt={opt} isSelected={selected} onToggle={handleMultiToggle} color={qColor} disabled={opt.exclusive ? false : noneSelected} />;
              })}
              {question.type === "pick_two" && question.options.map(opt => {
                const selected = (currentAnswer || []).includes(opt.id);
                const atMax = (currentAnswer || []).length >= 2 && !selected;
                return <PsMultiOption key={opt.id} opt={opt} isSelected={selected} onToggle={handleMultiToggle} color={"#7B68EE"} disabled={atMax} />;
              })}
              {question.type === "single_select" && question.options.map(opt => (
                <PsSingleOption key={opt.id} opt={opt} isSelected={currentAnswer === opt.id} onSelect={handleSingleSelect} color={qColor} />
              ))}
              {question.type === "free_text" && (
                <textarea value={freeText} onChange={e => setFreeText(e.target.value)} placeholder={question.placeholder}
                  style={{ width: "100%", minHeight: 90, padding: "14px 16px", background: "#F0F2F5", border: `1.5px solid ${freeText ? qColor : "transparent"}`, borderRadius: 12, fontFamily: "Georgia,serif", fontSize: 14, color: B.navy, lineHeight: 1.6, resize: "vertical", outline: "none", transition: "border-color 0.2s ease", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = `${qColor}60`}
                  onBlur={e => e.target.style.borderColor = freeText ? qColor : "transparent"}
                />
              )}
            </div>
          </div>

          {/* Why we ask — collapsible */}
          {question.insight && (
            <div style={{ marginBottom: 20 }}>
              <button onClick={() => setShowInsight(!showInsight)} style={{ width: "100%", padding: "10px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.2s ease" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                  <span>💡</span> Why we ask this
                </span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, transform: showInsight ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>▼</span>
              </button>
              <div style={{ maxHeight: showInsight ? 160 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.23,1,0.32,1)" }}>
                <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, fontStyle: "italic", padding: "12px 16px 0", margin: 0 }}>{question.insight}</p>
              </div>
            </div>
          )}

          {/* Continue button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={goNext} disabled={!canProceed && question.type !== "free_text"} style={{ padding: "13px 36px", borderRadius: 28, background: (canProceed || question.type === "free_text") ? `linear-gradient(90deg, ${B.green}, ${B.blue})` : "rgba(255,255,255,0.07)", color: (canProceed || question.type === "free_text") ? B.white : "rgba(255,255,255,0.2)", border: "none", fontFamily: "Georgia,serif", fontSize: 15, cursor: (canProceed || question.type === "free_text") ? "pointer" : "default", transition: "all 0.25s ease", transform: (canProceed || question.type === "free_text") ? "scale(1)" : "scale(0.96)" }}
              onMouseOver={e => { if (canProceed || question.type === "free_text") e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseOut={e => { if (canProceed || question.type === "free_text") e.currentTarget.style.transform = "scale(1)"; }}
            >
              {qIdx === PS_QUESTIONS.length - 1 ? (freeText.trim() ? "See my snapshot →" : "Skip & see my snapshot →") : "Continue →"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── SNAPSHOT RESULTS (step 10) ──
  const snapshot = psGenerateSnapshot(answers);
  const tier = PS_TIERS[snapshot.tier];
  const tierBg = { ahead: `linear-gradient(135deg, ${B.green}, #35A070)`, discover: `linear-gradient(135deg, ${B.blue}, #1890C8)`, full_picture: `linear-gradient(135deg, ${B.accent}, #D07840)` }[snapshot.tier];

  return (
    <section ref={sectionRef} style={{ background: tierBg, padding: "0", position: "relative", overflow: "hidden" }}>
      <style>{`@keyframes psFloat{0%,100%{transform:translateY(0);opacity:0.3}50%{transform:translateY(-14px);opacity:0.6}} @keyframes psPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}`}</style>
      {/* Floating particles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", width: 4 + Math.random() * 6, height: 4 + Math.random() * 6, background: "rgba(255,255,255,0.12)", borderRadius: "50%", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `psFloat ${3 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s` }} />
        ))}
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "56px 32px 64px", position: "relative", zIndex: 10 }}>
        {/* Label */}
        <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", marginBottom: 24, textAlign: "center" }}>
          {fname ? `${fname.toUpperCase()}'S ORAL HEALTH SNAPSHOT` : "YOUR ORAL HEALTH SNAPSHOT"}
        </div>

        {/* White result card */}
        <div style={{ background: B.white, borderRadius: 24, padding: "32px 28px", boxShadow: "0 20px 60px rgba(0,0,0,0.14)" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🌟</div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, color: B.navy, lineHeight: 1.2, margin: "0 0 12px" }}>
              {tier.headline}
            </h2>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 14.5, color: B.body, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
              {tier.body}
            </p>
          </div>

          {/* Areas to explore */}
          {snapshot.areas.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: tier.color, letterSpacing: "0.06em", marginBottom: 10 }}>WHAT WE'LL EXPLORE TOGETHER</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {snapshot.areas.map((area, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: `${tier.color}07`, borderRadius: 10, border: `1px solid ${tier.color}14` }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{area.icon}</span>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: 13.5, color: B.navy, lineHeight: 1.35 }}>{area.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal note */}
          {snapshot.personalNote && (
            <div style={{ marginBottom: 24, padding: "14px 16px", background: B.cream, borderRadius: 12, borderLeft: `3px solid ${tier.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: B.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>👨‍⚕️</div>
                <span style={{ fontFamily: "Georgia,serif", fontSize: 10, color: B.navy, letterSpacing: "0.05em" }}>A NOTE FOR {fname ? fname.toUpperCase() : "YOU"}</span>
              </div>
              <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>"{snapshot.personalNote}"</p>
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href="#book" style={{ display: "block", width: "100%", padding: "14px 20px", background: B.navy, color: B.white, border: "none", borderRadius: 28, fontFamily: "Georgia,serif", fontSize: 15, cursor: "pointer", textAlign: "center", textDecoration: "none", boxSizing: "border-box", animation: "psPulse 3s ease-in-out infinite" }}>
              Book your first visit →
            </a>
            <button onClick={() => { setAnswers({}); setFreeText(""); setStep(0); setShowConfetti(false); }} style={{ width: "100%", padding: "10px 20px", background: "transparent", color: B.body, border: `1.5px solid ${B.border}`, borderRadius: 28, fontFamily: "Georgia,serif", fontSize: 13, cursor: "pointer" }}>
              Start over
            </button>
          </div>
        </div>

        {/* Email confirmation */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "8px 18px", marginBottom: 10 }}>
            <span style={{ color: B.white, fontSize: 12 }}>✓</span>
            <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.75)" }}>Snapshot sent to {email}</span>
          </div>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, margin: 0 }}>
            Our team will review your answers before your visit. You'll never have to repeat yourself.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Editorial Two-Column Section ───────────────────────────────
function Editorial({ label, headline, subheadline, body, image, reverse = false, accent = B.blue }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <section ref={ref} style={{ background: B.warmWhite, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          direction: reverse ? "rtl" : "ltr",
        }}>
          {/* Text side */}
          <div style={{ direction: "ltr" }}>
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.7s cubic-bezier(0.23,1,0.32,1) 0s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 24, height: 1, background: accent }} />
                <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: accent, letterSpacing: "0.06em" }}>{label}</span>
              </div>
              <h2 style={{
                fontFamily: "Georgia,serif",
                fontSize: "clamp(26px, 3vw, 38px)",
                fontWeight: 400,
                color: B.navy,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                margin: "0 0 12px",
              }}>{headline}</h2>
              {subheadline && <p style={{ fontFamily: "Georgia,serif", fontSize: 17, color: B.navy, fontStyle: "italic", opacity: 0.55, margin: "0 0 20px" }}>{subheadline}</p>}
              <p style={{ fontFamily: "Georgia,serif", fontSize: 15, color: B.body, lineHeight: 1.75, margin: "0 0 32px" }}>{body}</p>
              <a href="/oral-systemic/" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "Georgia,serif", fontSize: 14, color: B.navy,
                textDecoration: "none",
                borderBottom: `1px solid rgba(14,34,64,0.25)`,
                paddingBottom: 2,
              }}>
                Learn more
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={B.navy} strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          {/* Visual side */}
          <div style={{ direction: "ltr" }}>
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.15s",
            }}>
              {image}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Visual: Mouth-Body diagram ────────────────────────────────
function MouthBodyDiagram() {
  const cx = 340, cy = 252;
  
  // Icons as SVG paths for each node
  const icons = {
    Brain: <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 4.5 3.5 5.5V15c0 .5.5 1 1 1h3c.5 0 1-.5 1-1v-1.5c2-1 3.5-3 3.5-5.5 0-3.5-2.5-6-6-6zm-1 14v2h2v-2h-2zm0 3v1h2v-1h-2z" fill="currentColor" />,
    Heart: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />,
    Sleep: <path d="M12.5 3C7.81 3 4 6.81 4 11.5c0 2.89 1.44 5.43 3.63 6.97L6.5 21l3.35-1.68c.84.27 1.73.43 2.65.43 4.69 0 8.5-3.81 8.5-8.5S17.19 3 12.5 3zm-2 13l-2-2 1.41-1.41L11.5 14.17l4.09-4.09L17 11.5l-5.5 5.5-1-.5z" fill="currentColor" />,
    Gut: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor" />,
    Immune: <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z" fill="currentColor" />,
  };

  const nodes = [
    { label: "Brain",  x: 340, y: 98,  color: "#7B68EE", lineEnd: { x: 340, y: 138 } },
    { label: "Heart",  x: 500, y: 206, color: "#E05B5B", lineEnd: { x: 470, y: 206 } },
    { label: "Sleep",  x: 470, y: 390, color: "#24A7E0", lineEnd: { x: 445, y: 370 } },
    { label: "Gut",    x: 210, y: 390, color: "#48C28C", lineEnd: { x: 235, y: 370 } },
    { label: "Immune", x: 180, y: 206, color: "#E8985E", lineEnd: { x: 210, y: 206 } },
  ];

  return (
    <div style={{ background: B.cream, borderRadius: 20, padding: 0, border: `1px solid ${B.border}`, overflow: "hidden" }}>
      <svg viewBox="0 0 680 520" width="100%" style={{ display: "block" }}>
        <defs>
          <style>{`
            @keyframes dot0 { 0%,15%{offset-distance:0%;opacity:0} 20%{opacity:1} 80%{opacity:1} 85%,100%{offset-distance:100%;opacity:0} }
            @keyframes dot1 { 0%,15%{offset-distance:0%;opacity:0} 20%{opacity:1} 80%{opacity:1} 85%,100%{offset-distance:100%;opacity:0} }
            @keyframes dot2 { 0%,15%{offset-distance:0%;opacity:0} 20%{opacity:1} 80%{opacity:1} 85%,100%{offset-distance:100%;opacity:0} }
            @keyframes dot3 { 0%,15%{offset-distance:0%;opacity:0} 20%{opacity:1} 80%{opacity:1} 85%,100%{offset-distance:100%;opacity:0} }
            @keyframes dot4 { 0%,15%{offset-distance:0%;opacity:0} 20%{opacity:1} 80%{opacity:1} 85%,100%{offset-distance:100%;opacity:0} }
            @keyframes glow0 { 0%,15%{opacity:0.5} 40%,60%{opacity:1} 85%,100%{opacity:0.5} }
            @keyframes glow1 { 0%,15%{opacity:0.5} 40%,60%{opacity:1} 85%,100%{opacity:0.5} }
            @keyframes glow2 { 0%,15%{opacity:0.5} 40%,60%{opacity:1} 85%,100%{opacity:0.5} }
            @keyframes glow3 { 0%,15%{opacity:0.5} 40%,60%{opacity:1} 85%,100%{opacity:0.5} }
            @keyframes glow4 { 0%,15%{opacity:0.5} 40%,60%{opacity:1} 85%,100%{opacity:0.5} }
          `}</style>
        </defs>

        {/* Dashed spoke lines - thicker and more visible */}
        <line x1={cx} y1={cy - 20} x2={nodes[0].lineEnd.x} y2={nodes[0].lineEnd.y} stroke={nodes[0].color} strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
        <line x1={cx + 20} y1={cy} x2={nodes[1].lineEnd.x} y2={nodes[1].lineEnd.y} stroke={nodes[1].color} strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
        <line x1={cx + 15} y1={cy + 20} x2={nodes[2].lineEnd.x} y2={nodes[2].lineEnd.y} stroke={nodes[2].color} strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
        <line x1={cx - 15} y1={cy + 20} x2={nodes[3].lineEnd.x} y2={nodes[3].lineEnd.y} stroke={nodes[3].color} strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
        <line x1={cx - 20} y1={cy} x2={nodes[4].lineEnd.x} y2={nodes[4].lineEnd.y} stroke={nodes[4].color} strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />

        {/* Travelling signal dots - larger */}
        <circle r="5" fill={nodes[0].color} opacity="0" style={{ offsetPath: `path('M${cx} ${cy - 20} L${nodes[0].lineEnd.x} ${nodes[0].lineEnd.y}')`, animation: "dot0 5s ease-in-out infinite 0s" }} />
        <circle r="5" fill={nodes[1].color} opacity="0" style={{ offsetPath: `path('M${cx + 20} ${cy} L${nodes[1].lineEnd.x} ${nodes[1].lineEnd.y}')`, animation: "dot1 5s ease-in-out infinite 0.4s" }} />
        <circle r="5" fill={nodes[2].color} opacity="0" style={{ offsetPath: `path('M${cx + 15} ${cy + 20} L${nodes[2].lineEnd.x} ${nodes[2].lineEnd.y}')`, animation: "dot2 5s ease-in-out infinite 0.8s" }} />
        <circle r="5" fill={nodes[3].color} opacity="0" style={{ offsetPath: `path('M${cx - 15} ${cy + 20} L${nodes[3].lineEnd.x} ${nodes[3].lineEnd.y}')`, animation: "dot3 5s ease-in-out infinite 1.2s" }} />
        <circle r="5" fill={nodes[4].color} opacity="0" style={{ offsetPath: `path('M${cx - 20} ${cy} L${nodes[4].lineEnd.x} ${nodes[4].lineEnd.y}')`, animation: "dot4 5s ease-in-out infinite 1.6s" }} />

        {/* Pulse rings on center */}
        <circle cx={cx} cy={cy} r="20" fill="none" stroke={B.navy} strokeWidth="1.5">
          <animate attributeName="r" values="20;50" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.25;0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r="20" fill="none" stroke={B.navy} strokeWidth="1">
          <animate attributeName="r" values="20;38" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.18;0" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>

        {/* Center node - larger */}
        <circle cx={cx} cy={cy} r="42" fill={B.navy} />
        <text x={cx} y={cy - 6} textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="500" fill={B.white} fontFamily="Georgia, serif">Mouth</text>

        {/* Outer nodes with icons and brighter text */}
        {nodes.map((n, i) => (
          <g key={n.label} style={{ animation: `glow${i} 5s ease-in-out infinite ${i * 0.4}s`, opacity: 0.5 }}>
            {/* Background pill */}
            <rect x={n.x - 58} y={n.y - 24} width="116" height="48" rx="24" fill={B.white} stroke={n.color} strokeWidth="2" />
            {/* Icon circle */}
            <circle cx={n.x - 30} cy={n.y} r="16" fill={n.color} fillOpacity="0.15" />
            {/* Icon */}
            <g transform={`translate(${n.x - 42}, ${n.y - 12}) scale(1)`} style={{ color: n.color }}>
              {icons[n.label as keyof typeof icons]}
            </g>
            {/* Label - bolder and darker */}
            <text x={n.x + 8} y={n.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="15" fontWeight="500" fill={n.color} fontFamily="Georgia, serif">{n.label}</text>
          </g>
        ))}

        {/* Caption - darker */}
        <text x={cx} y="488" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fill={B.body} fontStyle="italic">Your mouth is the gateway to all of it.</text>
      </svg>
    </div>
  );
}

// ── LIVE ASSESSMENT DATA ──────────────────────────────────────
const DIMENSIONS = [
  {
    id: "oral", label: "Oral Health", icon: "🦷", color: B.blue,
    intro: "Your oral health is the foundation. Let's understand where you're starting from.",
    questions: [
      { q: "How would you describe your teeth and gums overall?", options: ["Excellent — no concerns", "Good — minor issues", "Fair — ongoing concerns", "Poor — significant problems"], scores: [10,7,4,1], why: "This gives us a baseline before we even look in your mouth." },
      { q: "Do your gums bleed when brushing or flossing?", options: ["Never", "Rarely", "Sometimes", "Frequently"], scores: [10,7,4,1], why: "Bleeding gums are an early inflammation signal — often linked to systemic health." },
      { q: "When was your last comprehensive dental exam?", options: ["Within 6 months", "6–12 months ago", "1–2 years ago", "Over 2 years ago"], scores: [10,7,4,1], why: "Gaps in care often let small issues become complex ones." },
      { q: "Do you have existing dental work that concerns you?", options: ["No concerns", "Some work, it's fine", "Some concerns about older work", "Significant concerns"], scores: [10,7,4,1], why: "Older materials can degrade and affect your systemic health over time." },
    ],
  },
  {
    id: "sleep", label: "Sleep & Airway", icon: "🌙", color: "#7B68EE",
    intro: "Most people don't realize their dentist can spot sleep apnea. Your sleep affects everything.",
    questions: [
      { q: "How would you rate your overall sleep quality?", options: ["I sleep great, wake refreshed", "Generally okay with occasional issues", "I frequently struggle to sleep", "Chronic sleep problems"], scores: [10,7,4,1], why: "Poor sleep is directly linked to inflammation, weight, and heart disease." },
      { q: "Has anyone mentioned you snore or gasp during sleep?", options: ["No, never", "Occasionally", "Yes, regularly", "Yes — told it's concerning"], scores: [10,7,4,1], why: "80% of people with sleep apnea don't know they have it." },
      { q: "Do you grind your teeth or clench your jaw at night?", options: ["No, never", "Occasionally", "Frequently", "Yes, I have a guard or jaw pain"], scores: [10,7,4,1], why: "Bruxism often signals airway stress and disrupted sleep cycles." },
      { q: "How often do you feel fatigued during the day?", options: ["Rarely — I have good energy", "Sometimes after poor sleep", "Most days I feel tired", "Constant fatigue"], scores: [10,7,4,1], why: "Daytime fatigue is often the first sign of sleep-disordered breathing." },
    ],
  },
  {
    id: "nutrition", label: "Nutrition", icon: "🥬", color: B.green,
    intro: "What you eat shapes your oral microbiome — and your whole-body health starts in your mouth.",
    questions: [
      { q: "How would you describe your daily diet?", options: ["Mostly whole foods & vegetables", "Generally healthy, some processed", "Fairly processed, limited whole foods", "Mostly processed & convenience foods"], scores: [10,7,4,1], why: "Your diet directly feeds the bacteria in your mouth — for better or worse." },
      { q: "How often do you consume sugary drinks or snacks?", options: ["Rarely or never", "A few times a week", "Daily", "Multiple times daily"], scores: [10,7,4,1], why: "Sugar is the primary fuel for harmful oral bacteria." },
      { q: "Do you include fermented foods in your diet?", options: ["Regularly", "Sometimes", "Rarely", "Never"], scores: [10,7,4,1], why: "Fermented foods introduce beneficial bacteria to your oral and gut microbiome." },
      { q: "How much water do you drink daily?", options: ["8+ glasses", "5–7 glasses", "3–4 glasses", "Fewer than 3 glasses"], scores: [10,7,4,1], why: "Hydration directly impacts saliva production — your mouth's built-in defense system." },
    ],
  },
  {
    id: "genetics", label: "Genetics & Microbiome", icon: "🧬", color: "#E05BBF",
    intro: "Your unique genetics and microbiome influence everything from inflammation to heart health.",
    questions: [
      { q: "Do you have family history of gum disease, heart disease, or diabetes?", options: ["No known family history", "One condition in family", "Multiple conditions", "Unsure — don't know my history"], scores: [10,7,4,2], why: "Genetic predispositions can make you more susceptible to certain oral-systemic conditions." },
      { q: "Have you ever had genetic or microbiome testing?", options: ["Yes, comprehensive testing", "Basic genetic testing (23andMe etc.)", "No, but I'm interested", "No — not sure what it involves"], scores: [10,7,5,3], why: "Knowing your genetic profile lets us personalize your care from day one." },
      { q: "Do you experience chronic inflammation symptoms?", options: ["None", "Mild, occasional", "Moderate, recurring", "Significant, chronic"], scores: [10,7,4,1], why: "Chronic inflammation is the common thread between gum disease and systemic conditions." },
      { q: "Do you have known sensitivities to metals or materials?", options: ["No, none", "Mild sensitivities", "Yes, confirmed allergies", "Unsure — never tested"], scores: [10,7,4,3], why: "Metal sensitivities in dental work can cause systemic reactions that go undiagnosed for years." },
    ],
  },
  {
    id: "airway", label: "Airway Health", icon: "💨", color: B.accent,
    intro: "Your airway is the hidden dimension. It affects how you sleep, breathe, and feel every day.",
    questions: [
      { q: "Do you primarily breathe through your nose or mouth?", options: ["Almost always nose", "Mostly nose, sometimes mouth", "Often through my mouth", "Primarily mouth breather"], scores: [10,7,4,1], why: "Nasal breathing produces nitric oxide — a molecule critical for oxygen absorption and immunity." },
      { q: "Do you feel congested or have difficulty breathing through your nose?", options: ["Rarely or never", "Seasonally", "Frequently", "Almost always"], scores: [10,7,4,1], why: "Chronic congestion forces mouth breathing, which disrupts sleep and dries out your oral environment." },
      { q: "Do you experience dry mouth, morning headaches, or jaw tension?", options: ["None of these", "One occasionally", "Two or more occasionally", "Multiple symptoms regularly"], scores: [10,7,4,1], why: "This cluster often indicates airway compromise during sleep." },
      { q: "Where does your tongue rest when your mouth is closed?", options: ["Against the roof of my mouth", "Behind my front teeth", "At the bottom of my mouth", "I'm not sure / never noticed"], scores: [10,7,3,4], why: "Tongue posture directly affects airway patency. Most people's is suboptimal and don't know it." },
    ],
  },
];

// ── OLD AssessmentCTA removed — replaced by PrimaryiDExperience above ──
// eslint-disable-next-line no-unused-vars
function AssessmentCTA_DELETED() {
  const [ref, visible] = useReveal(0.06);
  const [activeDim, setActiveDim] = useState(0);
  const [activeQ, setActiveQ] = useState(0);
  const [answers, setAnswers] = useState({}); // { "oral-0": 2, "sleep-1": 0, ... }
  const [showResult, setShowResult] = useState(false);
  const [justAnswered, setJustAnswered] = useState(false);

  const dim = DIMENSIONS[activeDim];
  const qKey = (dIdx, qIdx) => `${DIMENSIONS[dIdx].id}-${qIdx}`;

  // Count answered questions per dimension
  const dimScore = (dIdx) => {
    const d = DIMENSIONS[dIdx];
    let total = 0, count = 0;
    d.questions.forEach((q, qi) => {
      const k = qKey(dIdx, qi);
      if (answers[k] !== undefined) {
        total += q.scores[answers[k]];
        count++;
      }
    });
    return count === 0 ? null : { score: (total / count).toFixed(1), count, max: d.questions.length };
  };

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = DIMENSIONS.reduce((s, d) => s + d.questions.length, 0);
  const allDone = totalAnswered >= totalQuestions;

  const handleAnswer = (optIdx) => {
    const k = qKey(activeDim, activeQ);
    setAnswers(prev => ({ ...prev, [k]: optIdx }));
    setJustAnswered(true);
    setTimeout(() => {
      setJustAnswered(false);
      // Auto-advance
      if (activeQ < dim.questions.length - 1) {
        setActiveQ(activeQ + 1);
      } else {
        // Move to next unanswered dimension
        const nextDim = DIMENSIONS.findIndex((d, i) => {
          if (i <= activeDim) return false;
          return d.questions.some((_, qi) => answers[qKey(i, qi)] === undefined);
        });
        if (nextDim !== -1) {
          setActiveDim(nextDim);
          setActiveQ(0);
        } else if (allDone || totalAnswered + 1 >= totalQuestions) {
          setShowResult(true);
        }
      }
    }, 380);
  };

  const getLabel = (score) => {
    if (score >= 8.5) return { text: "Optimal", color: B.green };
    if (score >= 7) return { text: "Good", color: B.blue };
    if (score >= 5) return { text: "Fair", color: B.accent };
    return { text: "Needs attention", color: "#E05BBF" };
  };

  return (
    <section id="assessment" ref={ref} style={{ background: B.navy, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          marginBottom: 48,
          opacity: visible ? 1 : 0, transition: "opacity 0.7s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 24, height: 1, background: B.blue }} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.blue, letterSpacing: "0.06em" }}>YOUR PRIMARY iD</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end" }}>
            <h2 style={{
              fontFamily: "Georgia,serif", fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 400, color: B.white, lineHeight: 1.12,
              letterSpacing: "-0.01em", margin: 0,
            }}>
              Tell us about yourself.<br />
              <span style={{ fontStyle: "italic", color: B.blue }}>We'll show you what we see.</span>
            </h2>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, margin: 0 }}>
              Answer a few questions across five dimensions of health. As you do, your Primary iD begins to take shape — and you'll start to see connections you've never been shown before.
            </p>
          </div>
        </div>

        {showResult ? (
          /* ── RESULTS VIEW ── */
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s ease",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
              {/* Scores */}
              <div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em", marginBottom: 24 }}>YOUR PRIMARY iD RESULTS</div>
                {DIMENSIONS.map((d, i) => {
                  const s = dimScore(i);
                  const score = s ? parseFloat(s.score) : 0;
                  const lbl = getLabel(score);
                  return (
                    <div key={d.id} style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 16 }}>{d.icon}</span>
                          <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.white }}>{d.label}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: lbl.color, background: `${lbl.color}15`, padding: "2px 10px", borderRadius: 10 }}>{lbl.text}</span>
                          <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: d.color }}>{score.toFixed(1)}</span>
                        </div>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                        <div style={{
                          width: `${(score / 10) * 100}%`, height: "100%",
                          background: `linear-gradient(90deg, ${d.color}80, ${d.color})`,
                          borderRadius: 2,
                          transition: "width 1s cubic-bezier(0.23,1,0.32,1)",
                        }} />
                      </div>
                    </div>
                  );
                })}
                <div style={{ marginTop: 8, fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
                  This is a self-reported snapshot. Your clinical Primary iD goes much deeper.
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 24, borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>✨</div>
                <h3 style={{ fontFamily: "Georgia,serif", fontSize: 24, fontWeight: 400, color: B.white, margin: "0 0 14px", lineHeight: 1.2 }}>
                  Your Primary iD<br /><span style={{ fontStyle: "italic", color: B.blue }}>is ready to go deeper.</span>
                </h3>
                <p style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: "0 0 28px" }}>
                  What you just answered is the surface. A full Primary visit includes 3D imaging, salivary diagnostics, airway analysis, and a conversation with Dr. Gabi — giving you a clinical picture that no online assessment can match.
                </p>
                <a href="#book" style={{
                  background: B.white, color: B.navy, textDecoration: "none",
                  borderRadius: 9, padding: "14px 28px",
                  fontFamily: "Georgia,serif", fontSize: 14,
                  display: "inline-block", transition: "all 0.25s ease",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  marginBottom: 12,
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"; }}
                >
                  Book my comprehensive assessment
                </a>
                <button onClick={() => { setAnswers({}); setShowResult(false); setActiveDim(0); setActiveQ(0); }} style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  fontFamily: "Georgia,serif", fontSize: 12,
                  color: "rgba(255,255,255,0.25)", textDecoration: "underline", padding: 0,
                }}>
                  Retake assessment
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── QUESTION VIEW ── */
          <div style={{
            display: "grid", gridTemplateColumns: "260px 1fr",
            gap: 32, alignItems: "start",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.1s",
          }}>

            {/* Left: dimension tabs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {DIMENSIONS.map((d, i) => {
                const s = dimScore(i);
                const isActive = activeDim === i;
                const answered = DIMENSIONS[i].questions.filter((_, qi) => answers[qKey(i, qi)] !== undefined).length;
                return (
                  <button key={d.id} onClick={() => { setActiveDim(i); setActiveQ(0); }} style={{
                    background: isActive ? `${d.color}12` : "transparent",
                    border: isActive ? `1px solid ${d.color}25` : "1px solid transparent",
                    borderRadius: 12, padding: "12px 16px", cursor: "pointer",
                    textAlign: "left", transition: "all 0.25s ease",
                    display: "flex", alignItems: "center", gap: 12,
                  }}>
                    <span style={{ fontSize: 18 }}>{d.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: isActive ? d.color : "rgba(255,255,255,0.6)" }}>{d.label}</div>
                      {s ? (
                        <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: d.color, fontStyle: "italic" }}>
                          {s.count}/{s.max} · {s.score}
                        </div>
                      ) : (
                        <div style={{ fontFamily: "Georgia,serif", fontSize: 10, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
                          {answered > 0 ? `${answered}/${DIMENSIONS[i].questions.length}` : `${DIMENSIONS[i].questions.length} questions`}
                        </div>
                      )}
                    </div>
                    {/* Mini progress */}
                    <div style={{ width: 28, height: 28, position: "relative" }}>
                      <svg width="28" height="28" style={{ transform: "rotate(-90deg)" }}>
                        <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5"/>
                        <circle cx="14" cy="14" r="11" fill="none" stroke={d.color}
                          strokeWidth="2.5"
                          strokeDasharray={`${2 * Math.PI * 11}`}
                          strokeDashoffset={`${2 * Math.PI * 11 * (1 - answered / DIMENSIONS[i].questions.length)}`}
                          strokeLinecap="round"
                          style={{ transition: "stroke-dashoffset 0.5s ease" }}
                        />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: question card */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 20, padding: "32px 36px",
              border: `1px solid ${dim.color}15`,
              minHeight: 340,
            }}>
              {/* Dimension header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${dim.color}15`, display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: 22,
                  border: `1px solid ${dim.color}20`,
                }}>
                  {dim.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: dim.color }}>{dim.label}</div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>
                    Question {activeQ + 1} of {dim.questions.length}
                  </div>
                </div>
                {/* Q progress dots */}
                <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
                  {dim.questions.map((_, qi) => (
                    <div key={qi} style={{
                      width: answers[qKey(activeDim, qi)] !== undefined ? 8 : 6,
                      height: answers[qKey(activeDim, qi)] !== undefined ? 8 : 6,
                      borderRadius: "50%",
                      background: answers[qKey(activeDim, qi)] !== undefined ? dim.color :
                        qi === activeQ ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }} onClick={() => setActiveQ(qi)} />
                  ))}
                </div>
              </div>

              {/* Question */}
              <div style={{
                fontFamily: "Georgia,serif", fontSize: "clamp(15px, 2vw, 18px)",
                color: B.white, lineHeight: 1.45, marginBottom: 28,
                opacity: justAnswered ? 0.3 : 1, transition: "opacity 0.3s ease",
              }}>
                {dim.questions[activeQ].q}
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {dim.questions[activeQ].options.map((opt, oi) => {
                  const k = qKey(activeDim, activeQ);
                  const isSelected = answers[k] === oi;
                  return (
                    <button key={oi} onClick={() => handleAnswer(oi)} style={{
                      background: isSelected ? `${dim.color}18` : "rgba(255,255,255,0.03)",
                      border: isSelected ? `1px solid ${dim.color}40` : "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 10, padding: "13px 18px",
                      cursor: "pointer", textAlign: "left",
                      fontFamily: "Georgia,serif", fontSize: 14,
                      color: isSelected ? dim.color : "rgba(255,255,255,0.7)",
                      transition: "all 0.2s ease",
                      display: "flex", alignItems: "center", gap: 12,
                    }}
                      onMouseOver={e => { if (!isSelected) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = `${dim.color}20`; e.currentTarget.style.color = B.white; }}}
                      onMouseOut={e => { if (!isSelected) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}}
                    >
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                        border: isSelected ? `2px solid ${dim.color}` : "1px solid rgba(255,255,255,0.15)",
                        background: isSelected ? dim.color : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s ease",
                      }}>
                        {isSelected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: B.navy }} />}
                      </div>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Why we ask */}
              <div style={{
                marginTop: 20, padding: "10px 16px",
                background: `${dim.color}06`, borderRadius: 8,
                border: `1px solid ${dim.color}10`,
                display: "flex", gap: 8, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 12 }}>💡</span>
                <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.3)", fontStyle: "italic", lineHeight: 1.5 }}>
                  {dim.questions[activeQ].why}
                </span>
              </div>

              {/* Nav row */}
              <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={() => { if (activeQ > 0) setActiveQ(activeQ - 1); }} style={{
                  background: "transparent", border: "none", cursor: activeQ > 0 ? "pointer" : "default",
                  fontFamily: "Georgia,serif", fontSize: 12,
                  color: activeQ > 0 ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)",
                  padding: 0, display: "flex", alignItems: "center", gap: 6,
                }}>
                  ← Previous
                </button>
                {totalAnswered > 0 && (
                  <button onClick={() => setShowResult(true)} style={{
                    background: "transparent", border: `1px solid ${dim.color}30`,
                    borderRadius: 8, padding: "7px 16px",
                    cursor: "pointer", fontFamily: "Georgia,serif", fontSize: 12,
                    color: dim.color, transition: "all 0.2s ease",
                  }}>
                    See results so far →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Appointment types ─────────────────────────────────────────
function Appointments() {
  const [ref, visible] = useReveal(0.1);
  const types = [
    {
      title: "Preventive & Whole-Body Care",
      sub: "Cleanings, checkups, and proactive health monitoring",
      color: B.blue,
      tag: null,
    },
    {
      title: "Alignment & Airway",
      sub: "Aligners, bite analysis, breathing assessment, TMJ care",
      color: B.green,
      tag: null,
    },
    {
      title: "Cosmetic & Aesthetic",
      sub: "Veneers, whitening, and smile design",
      color: B.accent,
      tag: null,
    },
    {
      title: "Full Arch & Implants",
      sub: "Implants, restoration, and complex full-arch cases",
      color: "#7B68EE",
      tag: null,
    },
  ];

  return (
    <section ref={ref} style={{ background: B.cream, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ maxWidth: 560, marginBottom: 56 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
            opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
          }}>
            <div style={{ width: 24, height: 1, background: B.navy, opacity: 0.2 }} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.muted, letterSpacing: "0.06em" }}>WHAT BRINGS YOU IN</span>
          </div>
          <h2 style={{
            fontFamily: "Georgia,serif",
            fontSize: "clamp(26px, 3vw, 36px)",
            fontWeight: 400,
            color: B.navy,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s",
          }}>
            Whatever brings you in,<br />you'll leave knowing<br /><span style={{ fontStyle: "italic" }}>more than you expected.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {types.map((type, i) => (
            <div
              key={type.title}
              style={{
                background: B.warmWhite,
                borderRadius: 16,
                padding: "28px 24px",
                border: `1px solid ${B.border}`,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                transitionDelay: `${0.15 + i * 0.08}s`,
                display: "flex", flexDirection: "column", gap: 12,
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 36px ${type.color}12`;
                e.currentTarget.style.borderColor = `${type.color}25`;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = B.border;
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${type.color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: type.color, opacity: 0.7 }} />
                </div>
                {type.tag && (
                  <span style={{ fontFamily: "Georgia,serif", fontSize: 10, color: type.color, background: `${type.color}10`, padding: "3px 9px", borderRadius: 10 }}>
                    {type.tag}
                  </span>
                )}
              </div>
              <div>
                <h3 style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 400, color: B.navy, margin: "0 0 6px", lineHeight: 1.3 }}>{type.title}</h3>
                <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: B.body, margin: 0, lineHeight: 1.55, opacity: 0.7 }}>{type.sub}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: type.color }}>Book this visit</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={type.color} strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Assessment CTA section ─────────────────────────────────────
// ── Booking CTA ───────────────────────────────────────────────
function BookingCTA() {
  const [ref, visible] = useReveal();
  return (
    <section id="book" ref={ref} style={{ background: B.cream, padding: "100px 32px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)",
        }}>
          <div style={{ fontSize: 24, marginBottom: 16, color: B.navy, opacity: 0.15, fontFamily: "Georgia,serif" }}>"</div>
          <h2 style={{
            fontFamily: "Georgia,serif",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 400,
            color: B.navy,
            lineHeight: 1.12,
            letterSpacing: "-0.015em",
            margin: "0 0 20px",
          }}>
            Most people have never had<br />
            someone look at their health<br />
            <span style={{ fontStyle: "italic", color: B.blue }}>the way we do.</span>
          </h2>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 16, color: B.body, lineHeight: 1.7, margin: "0 auto 40px", maxWidth: 480, opacity: 0.7 }}>
            Schedule a visit and experience what it feels like when dental care looks at the whole you — not just the problem in front of us.
          </p>

          <a href="/new-patient/" style={{
            background: B.navy, color: B.white, textDecoration: "none",
            borderRadius: 9, padding: "16px 40px",
            fontFamily: "Georgia,serif", fontSize: 16,
            boxShadow: "0 4px 24px rgba(14,34,64,0.2)",
            transition: "all 0.25s ease",
            display: "inline-block",
          }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(14,34,64,0.28)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(14,34,64,0.2)"; }}
          >
            Book a visit
          </a>

          {/* Trust marks */}
          <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {[
              { n: "25+", label: "Years experience" },
              { n: "373+", label: "5★ Google reviews" },
              { n: "360°", label: "Health evaluation" },
            ].map(stat => (
              <div key={stat.n} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: B.navy }}>{stat.n}</div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.muted, fontStyle: "italic" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Membership strip ───────────────────────────────────────────
function MembershipStrip() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ background: B.warmWhite, padding: "72px 32px", borderTop: `1px solid ${B.border}`, borderBottom: `1px solid ${B.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
        }}>
          <div style={{ maxWidth: 500 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 24, height: 1, background: B.green }} />
              <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.green, letterSpacing: "0.06em" }}>MEMBERSHIP</span>
            </div>
            <h3 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 400, color: B.navy, margin: "0 0 10px", lineHeight: 1.2 }}>
              Care that grows with you,<br /><span style={{ fontStyle: "italic" }}>not against you.</span>
            </h3>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 14, color: B.body, lineHeight: 1.65, margin: 0, opacity: 0.7 }}>
              Our membership plans replace traditional insurance with a model built around your ongoing wellness — not your episodic problems.
            </p>
          </div>
          <a href="https://primaryid.subscribili.com" target="_blank" rel="noopener" style={{
            background: B.green, color: B.white, textDecoration: "none",
            borderRadius: 9, padding: "14px 28px",
            fontFamily: "Georgia,serif", fontSize: 14,
            whiteSpace: "nowrap",
            boxShadow: `0 4px 16px ${B.green}30`,
            transition: "all 0.25s ease",
            display: "inline-block",
          }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Explore membership
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
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
  ]

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
            © 2025 Primary Integrative Dentistry
          </span>
          <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
            Dr. Tzur Gabi, Founder
          </span>
        </div>
      </div>
    </footer>
  );
}

// ── New Patient Section ───────────────────────────────────────
function NewPatientSection() {
  const [ref, visible] = useReveal(0.08);

  const steps = [
    {
      n: "01",
      title: "Complete your assessment",
      sub: "Online, before you arrive",
      detail: "10 min across 5 health dimensions",
      color: B.blue,
    },
    {
      n: "02",
      title: "Arrive & be welcomed",
      sub: "No clipboard, no waiting room forms",
      detail: "Your care team has already reviewed your profile",
      color: B.green,
    },
    {
      n: "03",
      title: "Comprehensive diagnostics",
      sub: "3D imaging · salivary diagnostics · airway",
      detail: "We see what traditional exams miss",
      color: B.accent,
    },
    {
      n: "04",
      title: "Receive your Primary iD",
      sub: "A scored health roadmap — same day",
      detail: "Oral health, sleep, nutrition, genetics, airway",
      color: "#7B68EE",
    },
  ];

  return (
    <section ref={ref} style={{ background: B.navy, padding: "96px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: 52, flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 18,
              opacity: visible ? 1 : 0, transition: "opacity 0.6s ease",
            }}>
              <div style={{ width: 24, height: 1, background: B.accent }} />
              <span style={{ fontFamily: "Georgia,serif", fontSize: 11, color: B.accent, letterSpacing: "0.06em" }}>
                YOUR FIRST VISIT · ~90 MINUTES
              </span>
            </div>
            <h2 style={{
              fontFamily: "Georgia,serif",
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 400, color: B.white,
              lineHeight: 1.12, letterSpacing: "-0.01em",
              margin: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s",
            }}>
              We've reimagined<br />what a first visit<br />
              <span style={{ fontStyle: "italic", color: B.accent }}>feels like.</span>
            </h2>
          </div>

          <a href="/new-patient/" style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            fontFamily: "Georgia,serif", fontSize: 13,
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            paddingBottom: 3,
            transition: "all 0.2s ease",
            opacity: visible ? 1 : 0, transitionDelay: "0.3s",
            whiteSpace: "nowrap",
          }}
            onMouseOver={e => { e.currentTarget.style.color = B.white; e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.4)"; }}
            onMouseOut={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.15)"; }}
          >
            See the full visit breakdown
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* 4-step horizontal timeline */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          position: "relative",
        }}>
          {/* Connecting line */}
          <div style={{
            position: "absolute",
            top: 27, left: "12.5%", right: "12.5%",
            height: 1,
            background: "rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }} />

          {steps.map((step, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column",
              alignItems: "flex-start",
              padding: "0 20px 0 0",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              transition: `all 0.65s cubic-bezier(0.23,1,0.32,1) ${0.15 + i * 0.1}s`,
            }}>
              {/* Step circle */}
              <div style={{
                width: 54, height: 54, borderRadius: 14, flexShrink: 0,
                background: `${step.color}12`,
                border: `1px solid ${step.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
                position: "relative",
              }}>
                <span style={{ fontFamily: "Georgia,serif", fontSize: 13, color: step.color }}>{step.n}</span>
                {/* Connector dot on the line */}
                <div style={{
                  position: "absolute", top: "50%", right: -20,
                  width: 5, height: 5, borderRadius: "50%",
                  background: i < 3 ? "rgba(255,255,255,0.1)" : "transparent",
                  transform: "translateY(-50%)",
                }} />
              </div>

              <div style={{ fontFamily: "Georgia,serif", fontSize: 15, color: B.white, marginBottom: 6, lineHeight: 1.3 }}>
                {step.title}
              </div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: step.color, marginBottom: 8, fontStyle: "italic" }}>
                {step.sub}
              </div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
                {step.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div style={{
          marginTop: 52,
          paddingTop: 28,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 16,
          opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.55s",
        }}>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "rgba(255,255,255,0.35)", fontStyle: "italic", margin: 0, maxWidth: 460 }}>
            "Most people have never had someone look at their health the way we do."
            <span style={{ display: "block", fontSize: 11, marginTop: 5, color: "rgba(255,255,255,0.2)", fontStyle: "normal" }}>— Dr. Tzur Gabi, Founder</span>
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="/new-patient/" style={{
              fontFamily: "Georgia,serif", fontSize: 13,
              color: "rgba(255,255,255,0.6)", textDecoration: "none",
              padding: "11px 22px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.2s ease",
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = B.white; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            >
              Full visit details
            </a>
            <a href="#book" style={{
              fontFamily: "Georgia,serif", fontSize: 13,
              color: B.navy, textDecoration: "none",
              padding: "11px 22px", borderRadius: 8,
              background: B.white,
              transition: "all 0.2s ease",
              boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.18)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.12)"; }}
            >
              Book a visit
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────
export default function PrimaryHomepage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ fontFamily: "Georgia,serif", background: B.cream, minHeight: "100vh" }}>
      <Nav scrolled={scrolled} />
      <Hero />
      <PrimaryiDExperience />

      {/* Section 3: Meet Your Primary iD - Dimension Cards Carousel */}
      <MeetYourPrimaryID />

      {/* Section 4: Care Pathways - Horizontal Scroll Carousel */}
      <div id="services"><CarePathways /></div>

      {/* Section 5: The New Patient Visit, Reimagined */}
      <NewPatientVisit />

      {/* Section 6: Our Approach - Outcomes-first grid */}
      <OurApproach />
      <Testimonials />

      {/* Section 7: Financial / Membership */}
      <div id="membership">
        <FinancialMembership />
      </div>
      <MobileStickyCTA />

      {/* Booking CTA */}
      <BookingCTA />

      <Footer />
    </div>
  );
}
