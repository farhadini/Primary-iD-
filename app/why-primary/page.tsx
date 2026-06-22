"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

// ── Brand tokens ──────────────────────────────────────────────
const B = {
  navy: "#0E2240",
  blue: "#24A7E0",
  blueSoft: "#5BC0EC",
  gold: "#D4B584",
  purple: "#7B68EE",
  green: "#48C28C",
  rose: "#D97757",
  peach: "#E8985E",
  cream: "#FAF8F5",
  warm: "#FEFCF9",
  ink: "#121a2b",
  inkSoft: "#3a4a66",
  line: "rgba(14, 34, 64, 0.12)",
  lineSoft: "rgba(14, 34, 64, 0.06)",
  white: "#FFFFFF",
  body: "#3B4A5E",
  muted: "#7A8695",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Montserrat', 'Helvetica Neue', Arial, sans-serif";

// ── Slider Data ───────────────────────────────────────────────
const SLIDES = [
  { id: "id", label: "Your Primary iD" },
  { id: "oral", label: "Oral health" },
  { id: "sleep", label: "Sleep & airway" },
  { id: "msg", label: "A note from Dr. Gabi" },
  { id: "nutrition", label: "Nutrition & longevity" },
];

// ── CountUp Hook ──────────────────────────────────────────────
function useCountUp(target: number, duration = 900, start = false) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;
    const startTime = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return value;
}

// ── Slide Components ──────────────────────────────────────────
function SlideBase({ active, leaving, children }: { active: boolean; leaving: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      position: "absolute", inset: 0, padding: "20px 24px 26px",
      display: "flex", alignItems: "center", gap: 16,
      opacity: active ? 1 : 0,
      transform: active ? "translateX(0)" : leaving ? "translateX(-32px)" : "translateX(32px)",
      transition: "opacity 0.55s ease, transform 0.55s cubic-bezier(.2,.8,.2,1)",
      pointerEvents: active ? "auto" : "none",
    }}>
      {children}
    </div>
  );
}

function SlideID({ active, leaving }: { active: boolean; leaving: boolean }) {
  const score = useCountUp(78, 900, active);
  return (
    <SlideBase active={active} leaving={leaving}>
      <div style={{
        width: 68, height: 68, borderRadius: "50%", flexShrink: 0,
        background: `conic-gradient(from 0deg, ${B.gold} 0 20%, ${B.purple} 20% 40%, ${B.green} 40% 60%, ${B.rose} 60% 80%, ${B.blue} 80% 100%)`,
        padding: 5,
        animation: active ? "rotate 40s linear infinite" : "none",
      }}>
        <div style={{
          width: "100%", height: "100%", background: B.warm, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: SERIF, fontSize: 22, color: B.navy,
        }}>iD</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkSoft, marginBottom: 6 }}>Your Primary iD</div>
        <div style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: B.navy, lineHeight: 1, letterSpacing: "-0.01em" }}>
          {score}<span style={{ fontSize: 16, color: B.inkSoft, marginLeft: 4 }}>/ 100</span>
        </div>
        <div style={{ fontFamily: SANS, fontSize: 12, color: B.inkSoft, marginTop: 6 }}>5 dimensions · updated today</div>
      </div>
      <style>{`@keyframes rotate { to { transform: rotate(360deg); } }`}</style>
    </SlideBase>
  );
}

function SlideOral({ active, leaving }: { active: boolean; leaving: boolean }) {
  const score = useCountUp(82, 900, active);
  return (
    <SlideBase active={active} leaving={leaving}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkSoft, marginBottom: 6 }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: B.gold, marginRight: 6, verticalAlign: "middle" }} />
          Oral
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: B.navy, lineHeight: 1, letterSpacing: "-0.01em" }}>{score}</div>
        <svg viewBox="0 0 180 32" width="180" height="32" style={{ marginTop: 8 }}>
          <polyline
            fill="none" stroke={B.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            points="0,22 22,20 44,24 66,18 88,16 110,14 132,10 154,12 176,8"
            style={{
              strokeDasharray: 280,
              strokeDashoffset: active ? 0 : 280,
              transition: "stroke-dashoffset 0.9s ease-out 0.25s",
            }}
          />
          <circle cx="176" cy="8" r="3" fill={B.gold} style={{ opacity: active ? 1 : 0, transition: "opacity 0.3s ease-out 1.1s" }} />
        </svg>
        <div style={{ fontFamily: SANS, fontSize: 12, color: B.inkSoft, marginTop: 8 }}>CAMBRA · low caries risk</div>
      </div>
    </SlideBase>
  );
}

function SlideSleep({ active, leaving }: { active: boolean; leaving: boolean }) {
  return (
    <SlideBase active={active} leaving={leaving}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkSoft, marginBottom: 6 }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: B.purple, marginRight: 6, verticalAlign: "middle" }} />
          Sleep &amp; Airway
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: B.navy, lineHeight: 1, letterSpacing: "-0.01em" }}>
          6.4<span style={{ fontSize: 18, color: B.inkSoft, marginLeft: 6 }}>hrs</span>
        </div>
        <div style={{ fontFamily: SANS, fontSize: 12, color: B.inkSoft, marginTop: 6 }}>STOP-BANG flagged · at-home study queued</div>
      </div>
    </SlideBase>
  );
}

function SlideMessage({ active, leaving }: { active: boolean; leaving: boolean }) {
  return (
    <SlideBase active={active} leaving={leaving}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
        background: `linear-gradient(135deg, ${B.blue}, ${B.purple})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: B.warm, fontSize: 15, fontFamily: SANS, fontWeight: 600,
      }}>G</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: SERIF, fontSize: 15, fontStyle: "italic", color: B.navy, lineHeight: 1.4, margin: 0 }}>
          &quot;Your CBCT is in. I want to talk about the airway finding before we plan the crown.&quot;
        </p>
        <span style={{ fontFamily: SANS, display: "block", marginTop: 6, fontSize: 11, fontWeight: 600, color: B.inkSoft, letterSpacing: "0.06em" }}>Dr. Tzur Gabi</span>
      </div>
    </SlideBase>
  );
}

function SlideNutrition({ active, leaving }: { active: boolean; leaving: boolean }) {
  const longevity = useCountUp(74, 900, active);
  return (
    <SlideBase active={active} leaving={leaving}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkSoft, marginBottom: 6 }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: B.green, marginRight: 6, verticalAlign: "middle" }} />
          Nutrition
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, color: B.navy, lineHeight: 1, letterSpacing: "-0.01em" }}>
          9<span style={{ fontSize: 14, color: B.inkSoft }}>/14</span>
        </div>
        <div style={{ fontFamily: SANS, fontSize: 12, color: B.inkSoft, marginTop: 6 }}>MEDAS</div>
      </div>
      <div style={{ borderLeft: `1px solid ${B.line}`, paddingLeft: 22, marginLeft: 22, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkSoft, marginBottom: 6 }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: B.blue, marginRight: 6, verticalAlign: "middle" }} />
          Longevity
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, color: B.navy, lineHeight: 1, letterSpacing: "-0.01em" }}>{longevity}</div>
        <div style={{ fontFamily: SANS, fontSize: 12, color: B.inkSoft, marginTop: 6 }}>LE8</div>
      </div>
    </SlideBase>
  );
}

// ── Hero Section ──────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [idx, setIdx] = useState(0);
  const [leaving, setLeaving] = useState(-1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const show = (next: number) => {
    if (next === idx) return;
    setLeaving(idx);
    setIdx(next);
    setTimeout(() => setLeaving(-1), 550);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setIdx(prev => {
          const next = (prev + 1) % SLIDES.length;
          setLeaving(prev);
          setTimeout(() => setLeaving(-1), 550);
          return next;
        });
      }
    }, 3800);
  };

  useEffect(() => {
    const t = setTimeout(startTimer, 1800);
    return () => { clearTimeout(t); if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <section style={{
      background: `radial-gradient(1200px 600px at 85% 20%, rgba(36, 167, 224, 0.08), transparent 60%),
                   radial-gradient(900px 500px at 10% 90%, rgba(232, 152, 94, 0.07), transparent 60%),
                   ${B.cream}`,
      padding: "80px 40px 120px",
      overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1360, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 80, alignItems: "center",
      }}>
        {/* Left: Copy */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontSize: 11, fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.14em", color: B.blue, marginBottom: 32,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s ease-out 0.1s",
          }}>
            <span style={{ width: 28, height: 1, background: B.blue }} />
            Why Primary
          </div>

          <h1 style={{
            fontFamily: SERIF,
            fontSize: "clamp(42px, 5.2vw, 72px)",
            fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.02em",
            color: B.navy, marginBottom: 32,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.2s",
          }}>
            Your mouth is the gateway to your <em style={{ fontStyle: "italic", color: B.blue }}>wellbeing.</em>
          </h1>

          <p style={{
            fontFamily: SERIF,
            fontSize: 19, lineHeight: 1.6, color: B.inkSoft, maxWidth: 560, marginBottom: 24,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.4s",
          }}>
            Care that helps you feel better, smile more, and live longer.
          </p>

          <p style={{
            fontFamily: SERIF,
            fontSize: 14, lineHeight: 1.65, color: B.muted, maxWidth: 520, marginBottom: 36,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.48s",
          }}>
            A growing body of scientific research is connecting the health of the mouth with{" "}
            <span style={{ color: B.navy, fontWeight: 500 }}>cardiovascular disease</span>,{" "}
            <span style={{ color: B.navy, fontWeight: 500 }}>cognitive decline</span>,{" "}
            <span style={{ color: B.navy, fontWeight: 500 }}>metabolic health</span>, and{" "}
            <span style={{ color: B.navy, fontWeight: 500 }}>longevity</span>.{" "}
            <Link href="/oral-systemic/" style={{ color: B.blue, textDecoration: "none", fontWeight: 500 }}>
              See the research →
            </Link>
          </p>

          <div style={{
            display: "flex", gap: 14, flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.55s",
          }}>
            <Link href="/diagnostics/" style={{
              fontFamily: SANS,
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 30px", background: B.navy, color: B.warm,
              textDecoration: "none", borderRadius: 999,
              fontSize: 14, fontWeight: 600, letterSpacing: "0.02em",
              transition: "background 0.2s ease, transform 0.2s ease",
            }}>
              Build my Primary iD
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/#book" style={{
              fontFamily: SANS,
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 30px", background: "transparent", color: B.navy,
              textDecoration: "none", borderRadius: 999,
              border: `1.5px solid ${B.navy}`,
              fontSize: 14, fontWeight: 600, letterSpacing: "0.02em",
              transition: "background 0.2s ease, color 0.2s ease",
            }}>
              Book a comprehensive evaluation
            </Link>
          </div>
        </div>

        {/* Right: Portrait with Slider */}
        <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto" }}>
          <div style={{
            position: "relative", aspectRatio: "4/5",
            background: "linear-gradient(160deg, #F4EFE8 0%, #E6DDD0 45%, #D4C5B0 100%)",
            borderRadius: 36, overflow: "hidden",
            boxShadow: "0 40px 80px -20px rgba(14, 34, 64, 0.28)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "scale(1)" : "scale(1.04)",
            transition: "all 1.2s ease-out",
          }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/why-primary-hero-portrait.-ka5zLy2HYDCpcSpoYnjM1iBfOeGjmK.png"
              alt="A Primary patient with a radiant smile"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "relative", zIndex: 1 }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, transparent 0%, transparent 65%, rgba(14, 34, 64, 0.12) 100%)",
              zIndex: 2, pointerEvents: "none",
            }} />
            <span style={{
              position: "absolute", top: 28, left: 28, zIndex: 3,
              fontFamily: SANS,
              fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(14, 34, 64, 0.55)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", background: B.blue,
                animation: "pulseDot 2s ease-in-out infinite",
              }} />
              LIVE · Primary iD
            </span>

            {/* Slider */}
            <div
              style={{
                position: "absolute", left: 20, right: 20, bottom: 22, zIndex: 5,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(14px)",
                transition: "all 0.8s ease-out 1.2s",
              }}
              onMouseEnter={() => { pausedRef.current = true; }}
              onMouseLeave={() => { pausedRef.current = false; }}
            >
              <div style={{
                position: "relative", height: 124, overflow: "hidden", borderRadius: 22,
                background: "rgba(254, 252, 249, 0.72)",
                backdropFilter: "blur(18px) saturate(1.4)",
                WebkitBackdropFilter: "blur(18px) saturate(1.4)",
                border: "1px solid rgba(255, 255, 255, 0.55)",
                boxShadow: "0 26px 60px -20px rgba(14, 34, 64, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
              }}>
                <SlideID active={idx === 0} leaving={leaving === 0} />
                <SlideOral active={idx === 1} leaving={leaving === 1} />
                <SlideSleep active={idx === 2} leaving={leaving === 2} />
                <SlideMessage active={idx === 3} leaving={leaving === 3} />
                <SlideNutrition active={idx === 4} leaving={leaving === 4} />

                {/* Controls */}
                <div style={{
                  position: "absolute", bottom: 10, left: 0, right: 0,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0 24px", zIndex: 2,
                }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {SLIDES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { show(i); startTimer(); }}
                        style={{
                          width: idx === i ? 28 : 18, height: 3, borderRadius: 2,
                          border: "none", cursor: "pointer", padding: 0,
                          background: idx === i ? B.blue : "rgba(14, 34, 64, 0.22)",
                          transition: "background 0.3s ease, width 0.3s ease",
                        }}
                        aria-label={SLIDES[i].label}
                      />
                    ))}
                  </div>
                  <div style={{
                    fontFamily: SANS,
                    fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: B.inkSoft,
                  }}>
                    <span style={{ color: B.navy, fontWeight: 600 }}>{String(idx + 1).padStart(2, "0")}</span> / 05
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @media (max-width: 1080px) {
          section > div { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
        @media (max-width: 640px) {
          section { padding: 60px 24px 80px !important; }
        }
      `}</style>
    </section>
  );
}

// ── The Gap Section ────────────────────────────────────────────
const SYMPTOM_LANES = [
  { direction: "right", speed: "medium", pills: [
    { text: "Sleep Apnea", accent: "blue", size: "lg" },
    { text: "Snoring", accent: null, size: "md" },
    { text: "Chronic Pain", accent: "rose", size: "lg" },
    { text: "Headaches", accent: null, size: "md" },
    { text: "Jaw Pain", accent: null, size: "sm" },
    { text: "Bad Breath", accent: null, size: "md" },
  ]},
  { direction: "left", speed: "slow", pills: [
    { text: "Low Energy Level", accent: "purple", size: "lg" },
    { text: "Brain Fog", accent: null, size: "md" },
    { text: "Bleeding Gums", accent: "gold", size: "md" },
    { text: "Acid Reflux", accent: null, size: "md" },
    { text: "Mood Swings", accent: null, size: "sm" },
    { text: "Anxiety", accent: null, size: "md" },
  ]},
  { direction: "right", speed: "fast", pills: [
    { text: "Toxicity", accent: "green", size: "lg" },
    { text: "Weight Gain", accent: null, size: "md" },
    { text: "Decreased Sex Drive", accent: "rose", size: "lg" },
    { text: "Diabetes Risk", accent: null, size: "md" },
    { text: "Inflammation", accent: null, size: "sm" },
    { text: "Heart Disease", accent: null, size: "md" },
  ]},
  { direction: "left", speed: "medium", pills: [
    { text: "Persistent Cough", accent: "blue", size: "lg" },
    { text: "High Blood Pressure", accent: null, size: "md" },
    { text: "Grinding Teeth", accent: "gold", size: "md" },
    { text: "Stroke Risk", accent: null, size: "sm" },
    { text: "Dementia Risk", accent: null, size: "md" },
    { text: "Autoimmune Flares", accent: null, size: "sm" },
  ]},
];

function TheGap() {
  const accentColors: Record<string, { bg: string; border: string; color: string; glow: string }> = {
    blue: { bg: "rgba(36, 167, 224, 0.14)", border: "rgba(91, 192, 236, 0.55)", color: "#5BC0EC", glow: "rgba(36, 167, 224, 0.18)" },
    gold: { bg: "rgba(212, 181, 132, 0.14)", border: "rgba(212, 181, 132, 0.55)", color: "#D4B584", glow: "rgba(212, 181, 132, 0.18)" },
    purple: { bg: "rgba(123, 104, 238, 0.16)", border: "rgba(123, 104, 238, 0.55)", color: "#B4A6F0", glow: "rgba(123, 104, 238, 0.18)" },
    green: { bg: "rgba(72, 194, 140, 0.14)", border: "rgba(72, 194, 140, 0.55)", color: "#7CD4A8", glow: "rgba(72, 194, 140, 0.18)" },
    rose: { bg: "rgba(217, 119, 87, 0.14)", border: "rgba(217, 119, 87, 0.55)", color: "#E8A88D", glow: "rgba(217, 119, 87, 0.18)" },
  };

  const speeds: Record<string, number> = { slow: 72, medium: 55, fast: 42 };

  return (
    <section style={{
      position: "relative",
      background: `radial-gradient(1200px 700px at 50% 100%, #12305C 0%, ${B.navy} 45%, #091832 100%)`,
      color: B.warm,
      padding: "120px 24px",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(600px 400px at 15% 20%, rgba(36, 167, 224, 0.12), transparent 60%),
          radial-gradient(600px 400px at 85% 80%, rgba(123, 104, 238, 0.10), transparent 60%)
        `,
      }} />

      {/* Copy */}
      <div style={{
        position: "relative", zIndex: 3,
        maxWidth: 780, margin: "0 auto 80px", textAlign: "center", padding: "0 16px",
      }}>
        <span style={{
          fontFamily: SANS,
          display: "inline-flex", alignItems: "center", gap: 10,
          fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em",
          color: "#5BC0EC", marginBottom: 28,
        }}>
          <span style={{ width: 28, height: 1, background: "#5BC0EC" }} />
          The Gap
        </span>
        <h2 style={{
          fontFamily: SERIF,
          fontSize: "clamp(36px, 4.4vw, 60px)", fontWeight: 400,
          lineHeight: 1.08, letterSpacing: "-0.02em",
          color: B.warm, margin: "0 0 28px",
        }}>
          What your mouth is trying to <em style={{ fontStyle: "italic", color: "#5BC0EC" }}>tell you.</em>
        </h2>
        <p style={{
          fontFamily: SERIF,
          fontSize: 19, lineHeight: 1.6, color: "rgba(254, 252, 249, 0.78)",
          maxWidth: 560, margin: "0 auto",
        }}>
          Symptoms you&apos;ve been living with. Signals your dentist or primary care doctor never caught. Care that finally connects the two.
        </p>
      </div>

      {/* Lanes */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", gap: 18, padding: "8px 0 4px",
        maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}>
        {SYMPTOM_LANES.map((lane, laneIdx) => {
          const duration = speeds[lane.speed];
          const animName = lane.direction === "right" ? "laneRight" : "laneLeft";
          return (
            <div key={laneIdx} style={{ position: "relative", overflow: "visible", height: 62 }}>
              <div style={{
                position: "absolute", top: 0, left: 0, height: "100%",
                display: "flex", alignItems: "center", gap: 22, width: "max-content",
                animation: `${animName} ${duration}s linear infinite`,
              }}>
                {/* Duplicate pills for seamless loop */}
                {[...lane.pills, ...lane.pills].map((pill, i) => {
                  const accent = pill.accent ? accentColors[pill.accent] : null;
                  const fontSize = pill.size === "lg" ? 17 : pill.size === "sm" ? 12 : 14;
                  const padding = pill.size === "lg" ? "14px 28px" : pill.size === "sm" ? "9px 18px" : "11px 22px";
                  return (
                    <span key={i} style={{
                      display: "inline-flex", alignItems: "center",
                      padding, borderRadius: 999,
                      background: accent ? accent.bg : "rgba(255, 255, 255, 0.05)",
                      border: `1px solid ${accent ? accent.border : "rgba(255, 255, 255, 0.14)"}`,
                      color: accent ? accent.color : "rgba(255, 255, 255, 0.82)",
                      fontFamily: SANS, fontSize, fontWeight: 500, letterSpacing: "0.01em",
                      whiteSpace: "nowrap",
                      backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
                      boxShadow: accent
                        ? `0 0 28px ${accent.glow}, inset 0 1px 0 ${accent.border}`
                        : "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                    }}>
                      {pill.text}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes laneRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @keyframes laneLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation"] { animation: none !important; }
        }
        @media (max-width: 720px) {
          section { padding: 90px 16px 100px !important; }
        }
      `}</style>
    </section>
  );
}

// ── The Comparison Section ────────────────────────────────────
const COMPARISON_ROWS = [
  { label: "Training", conventional: "DDS / DMD only", primary: "DDS + functional, integrative & airway", highlight: "functional, integrative & airway" },
  { label: "Time with the doctor", conventional: "5–10 min with a general dentist", primary: "30+ min with a prosthodontist specialist", highlight: "30+ min" },
  { label: "Diagnostics", conventional: "2D X-ray, occasional pano", primary: "3D CBCT + intra-oral scan + biomarker panels + microbiome + at-home sleep", highlight: "3D CBCT" },
  { label: "Assessment", conventional: "Single-tooth check", primary: "5-dimension Primary iD score", highlight: "5-dimension Primary iD" },
  { label: "Care team", conventional: "Dentist + hygienist", primary: "Dentist + hygienist + nutrition, sleep & microbiome partners", highlight: "nutrition, sleep & microbiome partners" },
  { label: "Between visits", conventional: "Call if something breaks", primary: "Continuous membership + your live Primary iD", highlight: "Continuous membership" },
  { label: "Plan", conventional: "Per-procedure quote", primary: "Whole-body plan, priced to your scores", highlight: "Whole-body plan" },
  { label: "Tech in the chair", conventional: "Basic", primary: "Full digital + laser + ozone + 3D printing", highlight: "Full digital" },
  { label: "Insurance", conventional: "You're capped at coverage", primary: "Use insurance + supplement what it skips", highlight: "supplement what it skips" },
];

function TheComparison() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section style={{
      position: "relative",
      padding: "140px 24px 160px",
      background: B.cream,
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(900px 520px at 85% 10%, rgba(36, 167, 224, 0.06), transparent 60%),
          radial-gradient(900px 520px at 15% 90%, rgba(212, 181, 132, 0.08), transparent 60%)
        `,
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
        {/* Intro */}
        <div style={{ maxWidth: 720, margin: "0 auto 72px", textAlign: "center" }}>
          <span style={{
            fontFamily: SANS,
            display: "inline-flex", alignItems: "center", gap: 10,
            fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em",
            color: B.blue, marginBottom: 28,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s ease-out 0.1s",
          }}>
            <span style={{ width: 28, height: 1, background: B.blue }} />
            The Comparison
          </span>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: "clamp(36px, 4.4vw, 58px)", fontWeight: 400,
            lineHeight: 1.08, letterSpacing: "-0.02em",
            color: B.navy, margin: "0 0 24px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.22s",
          }}>
            Same chair. A different <em style={{ fontStyle: "italic", color: B.blue }}>model of care.</em>
          </h2>
          <p style={{
            fontFamily: SERIF,
            fontSize: 19, lineHeight: 1.6, color: B.inkSoft, maxWidth: 560, margin: "0 auto",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.4s",
          }}>
            On paper, every dentist looks the same. What actually happens in the room, and what you walk out with, is not.
          </p>
        </div>

        {/* Comparison Card */}
        <div style={{
          background: B.warm,
          border: `1px solid ${B.line}`,
          borderRadius: 24,
          boxShadow: "0 34px 80px -40px rgba(14, 34, 64, 0.28)",
          overflow: "hidden",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.9s ease-out 0.55s",
        }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            background: "linear-gradient(180deg, rgba(14, 34, 64, 0.04), rgba(14, 34, 64, 0) 100%)",
            borderBottom: `1px solid ${B.line}`,
          }}>
            <div style={{ padding: "28px 32px" }} />
            <div style={{
              padding: "28px 32px",
              fontFamily: SANS, fontSize: 11, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: B.muted, borderLeft: `1px solid ${B.line}`,
            }}>
              Conventional
            </div>
            <div style={{
              padding: "28px 32px",
              fontFamily: SANS, fontSize: 11, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: B.navy, borderLeft: `1px solid ${B.line}`,
              background: "linear-gradient(180deg, rgba(36, 167, 224, 0.08), rgba(36, 167, 224, 0.02))",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", left: 0, right: 0, top: 0, height: 2,
                background: `linear-gradient(90deg, ${B.blue}, ${B.gold})`,
              }} />
              Primary
            </div>
          </div>

          {/* Rows */}
          {COMPARISON_ROWS.map((row, i) => (
            <div key={row.label} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              borderBottom: i < COMPARISON_ROWS.length - 1 ? `1px solid rgba(14, 34, 64, 0.06)` : "none",
              transition: "background 0.2s ease",
            }}
              onMouseOver={e => (e.currentTarget.style.background = "rgba(36, 167, 224, 0.025)")}
              onMouseOut={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{
                padding: "26px 32px",
                fontFamily: SANS, fontSize: 12, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: B.navy, background: "rgba(14, 34, 64, 0.015)",
                display: "flex", alignItems: "center",
              }}>
                {row.label}
              </div>
              <div style={{
                padding: "26px 32px",
                fontFamily: SERIF, fontSize: 16, lineHeight: 1.5,
                color: B.muted, borderLeft: `1px solid rgba(14, 34, 64, 0.06)`,
                display: "flex", alignItems: "center",
              }}>
                {row.conventional}
              </div>
              <div style={{
                padding: "26px 32px",
                fontFamily: SERIF, fontSize: 16, lineHeight: 1.5,
                color: B.navy, fontWeight: 500,
                borderLeft: `1px solid rgba(14, 34, 64, 0.06)`,
                background: "linear-gradient(180deg, rgba(36, 167, 224, 0.03), rgba(36, 167, 224, 0.01))",
                display: "flex", alignItems: "center",
              }}>
                {row.primary.split(row.highlight).map((part, j, arr) => (
                  <span key={j}>
                    {part}
                    {j < arr.length - 1 && <strong style={{ fontWeight: 600 }}>{row.highlight}</strong>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div style={{
          marginTop: 56, textAlign: "center", maxWidth: 680, marginLeft: "auto", marginRight: "auto",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.8s ease-out 0.85s",
        }}>
          <p style={{
            fontFamily: SERIF, fontStyle: "italic",
            fontSize: 22, lineHeight: 1.5,
            color: B.navy, letterSpacing: "-0.01em",
          }}>
            Why settle for the model that <em style={{ color: B.blue }}>hasn&apos;t changed in 50 years?</em>
          </p>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 820px) {
          section { padding: 90px 16px 100px !important; }
        }
      `}</style>
    </section>
  );
}

// ── How We See You (Dimensions) ────────────────────────────────
const DIMENSIONS = [
  { num: "01", key: "oral", name: "Oral", desc: "Your mouth, bite, and airway: the front door to everything downstream.", color: B.blue, colorSoft: "rgba(36, 167, 224, 0.15)" },
  { num: "02", key: "sleep", name: "Sleep", desc: "How well your nights restore you: breath, brain, and recovery.", color: "#7B68EE", colorSoft: "rgba(123, 104, 238, 0.18)" },
  { num: "03", key: "nutrition", name: "Nutrition", desc: "What fuels you and how: food, absorption, and the microbiome.", color: B.green, colorSoft: "rgba(72, 194, 140, 0.15)" },
  { num: "04", key: "family", name: "Family", desc: "The patterns written in your history, and the ones you can shift.", color: B.gold, colorSoft: "rgba(212, 181, 132, 0.15)" },
  { num: "05", key: "longevity", name: "Longevity", desc: "The biomarkers and habits that add years, and life to them.", color: "#D97757", colorSoft: "rgba(217, 119, 87, 0.15)" },
];

function HowWeSeeYou() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section style={{
      position: "relative",
      background: `radial-gradient(1200px 700px at 50% 0%, #12305C 0%, ${B.navy} 45%, #091832 100%)`,
      color: B.warm,
      padding: "140px 24px 160px",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(700px 400px at 12% 85%, rgba(36, 167, 224, 0.10), transparent 60%),
          radial-gradient(700px 400px at 88% 15%, rgba(217, 119, 87, 0.08), transparent 60%),
          radial-gradient(500px 300px at 50% 55%, rgba(123, 104, 238, 0.06), transparent 60%)
        `,
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto" }}>
        {/* Intro */}
        <div style={{ maxWidth: 780, margin: "0 auto 80px", textAlign: "center" }}>
          <span style={{
            fontFamily: SANS,
            display: "inline-flex", alignItems: "center", gap: 10,
            fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em",
            color: "#5BC0EC", marginBottom: 28,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s ease-out 0.1s",
          }}>
            <span style={{ width: 28, height: 1, background: "#5BC0EC" }} />
            How we see you
          </span>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: "clamp(36px, 4.4vw, 60px)", fontWeight: 400,
            lineHeight: 1.08, letterSpacing: "-0.02em",
            color: B.warm, margin: "0 0 24px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.25s",
          }}>
            One mouth. Five dimensions of <em style={{ fontStyle: "italic", color: "#5BC0EC" }}>you.</em>
          </h2>
          <p style={{
            fontFamily: SERIF,
            fontSize: 19, lineHeight: 1.6, color: "rgba(254, 252, 249, 0.78)",
            maxWidth: 620, margin: "0 auto",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.45s",
          }}>
            A live read across five dimensions, so the care fits the actual you, not just your teeth.
          </p>
        </div>

        {/* 5 Dimension Cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.9s ease-out 0.55s",
        }} className="dim-grid-responsive">
          {DIMENSIONS.map((dim) => (
            <article
              key={dim.key}
              style={{
                position: "relative",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.10)",
                borderRadius: 18,
                padding: "34px 24px 30px",
                minHeight: 260,
                display: "flex", flexDirection: "column",
                backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
                transition: "transform 0.28s ease, background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease",
                overflow: "hidden",
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.boxShadow = "0 30px 70px -30px rgba(0, 0, 0, 0.6)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.10)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: dim.color, opacity: 0.75,
              }} />
              {/* Hover glow */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `radial-gradient(260px 180px at 50% 0%, ${dim.colorSoft}, transparent 70%)`,
                opacity: 0, transition: "opacity 0.35s ease",
              }} className="dim-hover-glow" />

              <div style={{
                fontFamily: SANS, fontSize: 11, fontWeight: 600,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: dim.color, marginBottom: 22,
                display: "inline-flex", alignItems: "center", gap: 10,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: dim.color, boxShadow: `0 0 14px ${dim.color}`,
                }} />
                {dim.num} · {dim.name}
              </div>

              <div style={{
                fontFamily: SERIF, fontSize: 26, fontWeight: 400,
                letterSpacing: "-0.01em", color: B.warm, marginBottom: 12,
              }}>
                {dim.name}
              </div>

              <p style={{
                fontFamily: SERIF, fontSize: 15, lineHeight: 1.55,
                color: "rgba(254, 252, 249, 0.68)", marginTop: "auto",
              }}>
                {dim.desc}
              </p>
            </article>
          ))}
        </div>

        {/* Cross-links */}
        <div style={{
          marginTop: 64, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.8s ease-out 0.75s",
        }}>
          <Link href="/oral-systemic/" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 26px", borderRadius: 999,
            fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
            textDecoration: "none", background: B.warm, color: B.navy,
            border: `1px solid ${B.warm}`,
            transition: "transform 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
          }}
            onMouseOver={e => {
              e.currentTarget.style.background = B.blue;
              e.currentTarget.style.borderColor = B.blue;
              e.currentTarget.style.color = B.warm;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = B.warm;
              e.currentTarget.style.borderColor = B.warm;
              e.currentTarget.style.color = B.navy;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Read the full science
            <span>→</span>
          </Link>
          <Link href="/#approach" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 26px", borderRadius: 999,
            fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
            textDecoration: "none", background: "transparent", color: B.warm,
            border: "1px solid rgba(255, 255, 255, 0.30)",
            transition: "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease",
          }}
            onMouseOver={e => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.55)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.30)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            See the outcomes
            <span>→</span>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .dim-grid-responsive { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 720px) {
          .dim-grid-responsive { grid-template-columns: 1fr !important; gap: 14px !important; }
          .dim-grid-responsive article { min-height: 0 !important; padding: 26px 22px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="transition"] { transition: none !important; }
        }
      `}</style>
    </section>
  );
}

// ── The Ecosystem Section ────────────────────────────────────
const PARTNERS = [
  {
    key: "superpower",
    name: "Superpower",
    gradient: "linear-gradient(135deg, #D4B584 0%, #E8985E 100%)",
    eyebrow: "Biomarker labs",
    headline: "Over 100 biomarkers, ordered and interpreted as part of your membership.",
    description: "The hormone, vitamin, metabolic, and inflammation markers your PCP doesn't routinely run, ordered alongside your oral findings and interpreted together.",
    unlocks: [
      "Hormone, thyroid, and metabolic panels",
      "Inflammatory markers (hs-CRP, HbA1c, homocysteine)",
      "Vitamin D, B12, and nutrient panel",
      "Full panel read alongside oral findings",
    ],
  },
  {
    key: "sleep",
    name: "Happy Sleep",
    gradient: "linear-gradient(135deg, #7B68EE 0%, #24A7E0 100%)",
    eyebrow: "At-home sleep diagnostics",
    headline: "Real sleep diagnosis, covered by most medical insurance.",
    description: "An at-home sleep study plus a smart ring that tracks your nightly recovery, so sleep apnea, bruxism (teeth grinding), and airway dysfunction get diagnosed without a hospital lab.",
    unlocks: [
      "At-home polysomnography (no sleep lab)",
      "Smart ring for nightly recovery tracking",
      "Apnea, snoring, and bruxism screening",
      "Usually covered by medical insurance",
    ],
  },
  {
    key: "viome",
    name: "Viome",
    gradient: "linear-gradient(135deg, #48C28C 0%, #24A7E0 100%)",
    eyebrow: "Microbiome + early detection",
    headline: "Organism-level read of your mouth and gut.",
    description: "Oral and gut microbiome testing paired with early-detection screening for oral and esophageal cancer, the two cancers a dentist is best positioned to catch first.",
    unlocks: [
      "Oral + gut microbiome analysis",
      "Personalized food and supplement guidance",
      "Early-detection signals for oral cancer",
      "Early-detection signals for esophageal cancer",
    ],
  },
];

function TheEcosystem() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section style={{
      padding: "140px 40px 160px",
      background: `linear-gradient(180deg, ${B.cream} 0%, ${B.warm} 100%)`,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Intro */}
        <div style={{ maxWidth: 920, marginBottom: 72 }}>
          <span style={{
            fontFamily: SANS,
            display: "inline-flex", alignItems: "center", gap: 10,
            fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em",
            color: B.blue, marginBottom: 24,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s ease-out 0.1s",
          }}>
            <span style={{ width: 28, height: 1, background: B.blue }} />
            Our ecosystem
          </span>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: "clamp(36px, 4.2vw, 56px)", fontWeight: 400,
            lineHeight: 1.08, letterSpacing: "-0.015em",
            color: B.navy, margin: "0 0 24px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.22s",
          }}>
            The best of modern medicine, <em style={{ fontStyle: "italic", color: B.blue }}>in one plan.</em>
          </h2>
          <p style={{
            fontFamily: SERIF,
            fontSize: 19, lineHeight: 1.6, color: B.inkSoft, maxWidth: 740,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.4s",
          }}>
            We don&apos;t rebuild what already exists. We partner with the world&apos;s best, so your labs, your sleep study, and your microbiome all land in one place, interpreted by a team that actually talks to each other.
          </p>
        </div>

        {/* Partner Grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.9s ease-out 0.55s",
        }} className="partner-grid-responsive">
          {PARTNERS.map(partner => (
            <article
              key={partner.key}
              style={{
                background: B.warm,
                borderRadius: 28,
                overflow: "hidden",
                border: `1px solid rgba(14, 34, 64, 0.06)`,
                display: "flex", flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 30px 60px -20px rgba(14, 34, 64, 0.20)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Visual header */}
              <div style={{
                aspectRatio: "16 / 10",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: partner.gradient,
              }}>
                <div style={{
                  fontFamily: SERIF, fontSize: 22, color: B.warm,
                  fontWeight: 400, textAlign: "center", letterSpacing: "-0.01em",
                }}>
                  <span style={{ fontWeight: 500 }}>Primary</span>
                  <span style={{ display: "inline-block", margin: "0 10px", opacity: 0.6, fontStyle: "italic" }}>×</span>
                  <span style={{ fontWeight: 500 }}>{partner.name}</span>
                </div>
              </div>

              {/* Body */}
              <div style={{
                padding: "32px 28px", display: "flex", flexDirection: "column", flex: 1,
              }}>
                <span style={{
                  fontFamily: SANS, fontSize: 10, fontWeight: 600,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: B.inkSoft, marginBottom: 12,
                }}>
                  {partner.eyebrow}
                </span>
                <h3 style={{
                  fontFamily: SERIF, fontSize: 24, fontWeight: 400,
                  color: B.navy, lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.01em",
                }}>
                  {partner.headline}
                </h3>
                <p style={{
                  fontFamily: SERIF, fontSize: 15, lineHeight: 1.55,
                  color: B.inkSoft, marginBottom: 22, flex: 1,
                }}>
                  {partner.description}
                </p>

                {/* Unlocks */}
                <div style={{
                  paddingTop: 20, borderTop: `1px solid rgba(14, 34, 64, 0.06)`,
                }}>
                  <div style={{
                    fontFamily: SANS, fontSize: 10, fontWeight: 600,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: B.blue, marginBottom: 10,
                  }}>
                    What it unlocks
                  </div>
                  <ul style={{ listStyle: "none", fontFamily: SERIF, fontSize: 14, lineHeight: 1.5, color: B.navy }}>
                    {partner.unlocks.map((item, i) => (
                      <li key={i} style={{ padding: "4px 0 4px 16px", position: "relative" }}>
                        <span style={{
                          position: "absolute", left: 0, color: B.blue, fontWeight: 600,
                        }}>+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Note */}
        <p style={{
          marginTop: 40,
          fontFamily: SANS, fontSize: 12, color: B.inkSoft,
          textAlign: "center", fontStyle: "italic",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease-out 0.75s",
        }}>
          Additional partners across supplementation, coaching, and continuous monitoring, announced as they&apos;re added.
        </p>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .partner-grid-responsive { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 720px) {
          section { padding: 72px 20px !important; }
        }
      `}</style>
    </section>
  );
}

// ── Technology Section ────────────────────────────────────────
const TECH_CARDS = [
  {
    key: "cbct",
    title: "3D CBCT imaging",
    desc: "A cone-beam scan that maps your airway, sinus, jaw, nerves, and bone in three dimensions, in under 20 seconds.",
    unlocks: ["Airway diagnosis", "Implant planning to within 0.5 mm", "Pathology that 2D X-rays miss"],
    gradient: "linear-gradient(135deg, rgba(36,167,224,0.3), rgba(36,167,224,0.1))",
    stroke: "#5BC0EC",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="10"/><circle cx="14" cy="14" r="5"/><path d="M14 4v20M4 14h20"/>
      </svg>
    ),
  },
  {
    key: "scanner",
    title: "Intra-oral scanner + clinical photography",
    desc: "Digital impressions and a full visual baseline of your mouth, no goopy trays, no guesswork.",
    unlocks: ["Year-over-year documented change", "Faster lab turnaround", "Better fit on every restoration"],
    gradient: "linear-gradient(135deg, rgba(212,181,132,0.3), rgba(212,181,132,0.1))",
    stroke: "#D4B584",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="7" width="20" height="14" rx="2"/><circle cx="14" cy="14" r="4"/><path d="M9 7V5h10v2"/>
      </svg>
    ),
  },
  {
    key: "laser",
    title: "Dental laser",
    desc: "Soft-tissue procedures without a drill, often without anesthetic, with dramatically less bleeding.",
    unlocks: ["Faster healing", "Less trauma", "Better cosmetic & periodontal outcomes"],
    gradient: "linear-gradient(135deg, rgba(217,119,87,0.3), rgba(217,119,87,0.1))",
    stroke: "#D97757",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 14h14M18 10l4 4-4 4"/><circle cx="21" cy="14" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    key: "smart",
    title: "SMART amalgam removal",
    desc: "Safe Mercury Amalgam Removal Technique: full IAOMT protocol when removing old silver fillings.",
    unlocks: ["Protects the patient", "Protects the clinical team", "Protects the environment from mercury vapor"],
    gradient: "linear-gradient(135deg, rgba(72,194,140,0.3), rgba(72,194,140,0.1))",
    stroke: "#48C28C",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 4L6 10v6c0 4 3.5 7 8 8 4.5-1 8-4 8-8v-6L14 4z"/><path d="M10 14l3 3 5-6"/>
      </svg>
    ),
  },
  {
    key: "ozone",
    title: "Ozone therapy",
    desc: "Antimicrobial sterilization without antibiotics, at the tissue, pocket, or canal level.",
    unlocks: ["Deep tissue sterilization", "Periodontal pocket treatment", "Root canal disinfection, no systemic drugs"],
    gradient: "linear-gradient(135deg, rgba(123,104,238,0.3), rgba(123,104,238,0.1))",
    stroke: "#7B68EE",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="4"/><circle cx="14" cy="14" r="8"/><circle cx="14" cy="14" r="11"/>
      </svg>
    ),
  },
  {
    key: "printing",
    title: "3D printing in-office",
    desc: "Same-day surgical guides, restorations, and appliances printed in the building, not shipped from a lab.",
    unlocks: ["Same-day turnaround", "Tighter fit, fewer revisions", "Lower cost per restoration"],
    gradient: "linear-gradient(135deg, rgba(232,152,94,0.3), rgba(232,152,94,0.1))",
    stroke: "#E8985E",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="6" width="18" height="13" rx="1"/><path d="M9 19v3M19 19v3M10 11l4-4 4 4M14 7v8"/>
      </svg>
    ),
  },
];

function TheTechnology() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section style={{
      position: "relative",
      padding: "120px 40px",
      background: B.navy,
      color: B.warm,
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(1200px 600px at 50% -20%, rgba(36, 167, 224, 0.12), transparent 60%)",
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto" }}>
        {/* Intro */}
        <div style={{ maxWidth: 900, marginBottom: 72 }}>
          <span style={{
            fontFamily: SANS,
            display: "inline-flex", alignItems: "center", gap: 10,
            fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em",
            color: "#5BC0EC", marginBottom: 24,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s ease-out 0.1s",
          }}>
            <span style={{ width: 28, height: 1, background: "#5BC0EC" }} />
            In the operatory
          </span>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: "clamp(36px, 4.4vw, 58px)", fontWeight: 400,
            lineHeight: 1.08, letterSpacing: "-0.015em",
            color: B.warm, margin: "0 0 22px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.22s",
          }}>
            World-class technology. <em style={{ fontStyle: "italic", color: "#5BC0EC" }}>Standard, not optional.</em>
          </h2>
          <p style={{
            fontFamily: SERIF,
            fontSize: 19, lineHeight: 1.6, color: "rgba(250, 248, 245, 0.72)",
            maxWidth: 740,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease-out 0.4s",
          }}>
            Whole-body dentistry only matters if it shows up in the room, not just the marketing. Here is what sits at every chair in our practice.
          </p>
        </div>

        {/* Tech Grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.9s ease-out 0.55s",
        }} className="tech-grid-responsive">
          {TECH_CARDS.map(card => (
            <article
              key={card.key}
              style={{
                padding: "32px 28px",
                borderRadius: 22,
                background: "rgba(250, 248, 245, 0.04)",
                border: "1px solid rgba(250, 248, 245, 0.10)",
                transition: "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = "rgba(250, 248, 245, 0.08)";
                e.currentTarget.style.borderColor = "rgba(36, 167, 224, 0.35)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "rgba(250, 248, 245, 0.04)";
                e.currentTarget.style.borderColor = "rgba(250, 248, 245, 0.10)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Badge */}
              <div style={{
                width: 56, height: 56,
                borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 22,
                background: card.gradient,
                color: card.stroke,
              }}>
                {card.icon}
              </div>

              <h3 style={{
                fontFamily: SERIF, fontSize: 24, fontWeight: 400,
                color: B.warm, marginBottom: 10,
                letterSpacing: "-0.01em", lineHeight: 1.15,
              }}>
                {card.title}
              </h3>

              <p style={{
                fontFamily: SERIF, fontSize: 15, lineHeight: 1.55,
                color: "rgba(250, 248, 245, 0.72)", marginBottom: 22,
              }}>
                {card.desc}
              </p>

              <div style={{
                fontFamily: SANS, fontSize: 10, fontWeight: 600,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#5BC0EC", marginBottom: 10,
              }}>
                What it unlocks
              </div>

              <div style={{
                fontFamily: SANS, fontSize: 13, lineHeight: 1.5,
                color: "rgba(250, 248, 245, 0.88)",
              }}>
                {card.unlocks.map((item, i) => (
                  <span key={i}>
                    {item}
                    {i < card.unlocks.length - 1 && <span style={{ color: "#5BC0EC" }}> · </span>}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .tech-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 720px) {
          section { padding: 72px 20px !important; }
          .tech-grid-responsive { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}

// ── The Outcome (New Smile Slider) ────────────────────────────
const SMILE_SLIDES = [
  { dim: "01", name: "Nutrition", wash: "#E8985E", img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farhadini_extreme_close-up_horizontal_crop_of_SUBJECTs_face_t_abab562d-ca9f-471b-b6c5-573cfff40981_0%20%282%29-vkEBf9fZ6MmunuOhUZMZkI0RqlsFfZ.png" },
  { dim: "02", name: "Oral Health", wash: "#48C28C", img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farhadini_Man_with_natural_gap_green_wash_extreme_close-up_ho_89e28d14-cd1b-4393-973c-471965a34ce0_1-s4E06aiYaGkMKVSnlgNPWBAoFkXJls.png" },
  { dim: "03", name: "Sleep & Airway", wash: "#24A7E0", img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farhadini_Horizontal_crop_Woman_with_blue_wash_extreme_close-_cac04987-643c-4ba6-bbe1-b1a3a723d728_0-fo8KcRiGGCtsdZIGjYRn6Y471yS8ya.png" },
  { dim: "04", name: "Longevity", wash: "#E05BBF", img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/farhadini_close-up_portrait_of_a_Black_woman_in_her_30s_with__4857f058-3552-4748-b087-e2add82799e2_1-NBfLtBgOar9xyRCGiBc8NlJK199d0t.png" },
];

function TheOutcome() {
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const DURATION = 4200;

  useEffect(() => { setLoaded(true); }, []);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % SMILE_SLIDES.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + SMILE_SLIDES.length) % SMILE_SLIDES.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  const slide = SMILE_SLIDES[current];

  return (
    <section style={{
      padding: "120px 40px",
      background: B.warm,
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",
      }} className="outcome-grid-responsive">
        {/* LEFT: Slider */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.9s ease-out 0.2s",
        }}>
          <div style={{
            position: "relative",
            aspectRatio: "3 / 4",
            borderRadius: 24,
            overflow: "hidden",
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, #F5DDC4 0%, #FBEFE3 45%, ${B.warm} 100%)`,
            boxShadow: `0 30px 80px -30px rgba(14, 34, 64, 0.18), 0 0 0 1px ${B.line}`,
          }}>
            {/* Progress bars */}
            <div style={{
              position: "absolute", top: 20, left: 24, right: 24, zIndex: 6,
              display: "flex", gap: 6,
            }}>
              {SMILE_SLIDES.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 2,
                  background: "rgba(14, 34, 64, 0.12)",
                  borderRadius: 2, overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    background: B.navy,
                    width: i < current ? "100%" : i === current ? "0%" : "0%",
                    animation: i === current ? `fillBar ${DURATION}ms linear forwards` : "none",
                  }} />
                </div>
              ))}
            </div>

            {/* Frames */}
            {SMILE_SLIDES.map((s, i) => (
              <div key={s.dim} style={{
                position: "absolute", inset: 0, zIndex: 2,
                opacity: i === current ? 1 : 0,
                transform: i === current ? "scale(1)" : "scale(1.04)",
                transition: "opacity 1s cubic-bezier(.4,0,.2,1), transform 5s cubic-bezier(.4,0,.2,1)",
              }}>
                <img
                  src={s.img}
                  alt={`${s.name} portrait`}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center 28%",
                  }}
                />
                {/* Vignette overlay */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: `linear-gradient(to bottom, transparent 60%, rgba(251, 239, 227, 0.4) 100%),
                    radial-gradient(ellipse at center, transparent 55%, rgba(251, 239, 227, 0.25) 100%)`,
                }} />
              </div>
            ))}

            {/* Caption */}
            <div style={{
              position: "absolute", left: 24, right: 24, bottom: 24, zIndex: 5,
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              color: B.navy, pointerEvents: "none",
            }}>
              <div>
                <span style={{
                  display: "block",
                  fontFamily: SANS, fontSize: 10, fontWeight: 500,
                  letterSpacing: "0.28em", textTransform: "uppercase",
                  color: B.muted, marginBottom: 4,
                }}>
                  DIMENSION {slide.dim}
                </span>
                <span style={{
                  fontFamily: SERIF, fontSize: 14, fontWeight: 400, fontStyle: "italic",
                }}>
                  {slide.name}
                </span>
              </div>
              <span style={{
                fontFamily: SANS, fontSize: 11, fontWeight: 500,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: B.muted,
              }}>
                {slide.dim} / 04
              </span>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: 18,
          }}>
            <button
              onClick={prev}
              aria-label="Previous smile"
              style={{
                width: 44, height: 44, borderRadius: "50%",
                border: `1px solid ${B.line}`, background: "transparent",
                color: B.navy, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = B.navy;
                e.currentTarget.style.color = B.warm;
                e.currentTarget.style.borderColor = B.navy;
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = B.navy;
                e.currentTarget.style.borderColor = B.line;
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 6l-6 6 6 6"/>
              </svg>
            </button>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {SMILE_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: B.muted, border: "none", padding: 0, cursor: "pointer",
                    opacity: i === current ? 1 : 0.3,
                    transform: i === current ? "scale(1.4)" : "scale(1)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next smile"
              style={{
                width: 44, height: 44, borderRadius: "50%",
                border: `1px solid ${B.line}`, background: "transparent",
                color: B.navy, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = B.navy;
                e.currentTarget.style.color = B.warm;
                e.currentTarget.style.borderColor = B.navy;
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = B.navy;
                e.currentTarget.style.borderColor = B.line;
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT: Copy */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.9s ease-out 0.4s",
        }}>
          <span style={{
            fontFamily: SANS,
            display: "inline-flex", alignItems: "center", gap: 10,
            fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em",
            color: B.blue, marginBottom: 24,
          }}>
            <span style={{ width: 28, height: 1, background: B.blue }} />
            The outcome
          </span>
          <h2 style={{
            fontFamily: SERIF,
            fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 400,
            lineHeight: 1.08, letterSpacing: "-0.015em",
            color: B.navy, margin: "0 0 24px",
          }}>
            A smile that reflects <em style={{ fontStyle: "italic", color: B.blue }}>everything we saw.</em>
          </h2>
          <p style={{
            fontFamily: SERIF, fontSize: 18, lineHeight: 1.6,
            color: B.inkSoft, marginBottom: 20, maxWidth: 520,
          }}>
            When the airway is clear, when the inflammation is settled, when the nutrition is working, the smile that shows up at the end isn&apos;t cosmetic. It&apos;s the visible proof of a whole system that&apos;s finally aligned.
          </p>
          <p style={{
            fontFamily: SERIF, fontSize: 18, lineHeight: 1.6,
            color: B.inkSoft, marginBottom: 28, maxWidth: 520,
          }}>
            This is what a Primary smile looks like. Not a veneer shade. A person in better shape than when they walked in.
          </p>
          <Link href="/#approach" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: SANS, fontSize: 14, fontWeight: 600,
            color: B.blue, textDecoration: "none",
            paddingBottom: 3, borderBottom: `1px solid ${B.blue}`,
            transition: "color 0.2s ease, border-color 0.2s ease",
          }}
            onMouseOver={e => {
              e.currentTarget.style.color = B.navy;
              e.currentTarget.style.borderColor = B.navy;
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = B.blue;
              e.currentTarget.style.borderColor = B.blue;
            }}
          >
            See the six outcomes →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fillBar {
          from { width: 0; }
          to { width: 100%; }
        }
        @media (max-width: 900px) {
          .outcome-grid-responsive { grid-template-columns: 1fr !important; gap: 48px !important; }
          .outcome-grid-responsive > div:first-child { max-width: 520px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 720px) {
          section { padding: 72px 20px !important; }
        }
      `}</style>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function WhyPrimaryPage() {
  return (
    <main style={{ background: B.cream, minHeight: "100vh" }}>
      <SiteNav />
      <Hero />
      <TheGap />
      <TheComparison />
      <HowWeSeeYou />
      <TheEcosystem />
      <TheTechnology />
      <TheOutcome />
      <SiteFooter />
    </main>
  );
}
