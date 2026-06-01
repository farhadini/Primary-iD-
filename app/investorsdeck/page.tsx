"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Fraunces, Inter } from "next/font/google"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
})

// =====================================================
// TYPES
// =====================================================

type PCPAnswer = "Within six months" | "Within the year" | "Over a year ago" | "I don't have one" | null

type IDScores = {
  sleep: number | null
  oral: number | null
  nutrition: number | null
  airway: number | null
  longevity: number | null
}

// =====================================================
// MAIN PAGE
// =====================================================

export default function FoundersDeck() {
  const [current, setCurrent] = useState(1)
  const [pcpAnswer, setPcpAnswer] = useState<PCPAnswer>(null)
  const [idScores, setIdScores] = useState<IDScores>({
    sleep: null,
    oral: null,
    nutrition: null,
    airway: null,
    longevity: null,
  })
  const [openAnswer, setOpenAnswer] = useState("")

  const total = 37

  // Restore PCP answer from sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("primary_pcp_answer")
      if (stored) setPcpAnswer(stored as PCPAnswer)
    } catch {}
  }, [])

  // Persist PCP answer
  useEffect(() => {
    if (pcpAnswer) {
      try {
        sessionStorage.setItem("primary_pcp_answer", pcpAnswer)
      } catch {}
    }
  }, [pcpAnswer])

  const next = useCallback(() => {
    if (current === 6 && !pcpAnswer) return
    if (current >= 13 && current <= 16) {
      const dimMap: Record<number, keyof IDScores> = { 13: "sleep", 14: "oral", 15: "nutrition", 16: "airway" }
      if (idScores[dimMap[current]] == null) return
    }
    if (current < total) setCurrent((c) => c + 1)
  }, [current, pcpAnswer, idScores, total])

  const prev = useCallback(() => {
    if (current > 1) setCurrent((c) => c - 1)
  }, [current])

// Keyboard nav - skip auto-advance for beats with custom click handling
  useEffect(() => {
  const handler = (e: KeyboardEvent) => {
  if (document.activeElement?.tagName === "TEXTAREA") return
  // Beat 3 has its own click-through animation
  if (current === 3 && (e.key === "ArrowRight" || e.key === " ")) {
    return // Let Beat03 handle its own progression
  }
  if (e.key === "ArrowRight" || e.key === " ") {
  e.preventDefault()
  next()
  }
  if (e.key === "ArrowLeft") {
  e.preventDefault()
  prev()
  }
  }
  window.addEventListener("keydown", handler)
  return () => window.removeEventListener("keydown", handler)
  }, [next, prev, current])

// Click anywhere to advance (excluding interactive elements and custom-click slides)
  const handleStageClick = (e: React.MouseEvent) => {
  console.log("[v0] handleStageClick ENTRY - currentBeat:", current)
  // Beat 3 has its own click-through animation - don't auto-advance
  if (current === 3) {
    console.log("[v0] handleStageClick - SKIPPING beat 3, returning early")
    return
  }
  const target = e.target as HTMLElement
  console.log("[v0] handleStageClick - target:", target.tagName, "currentBeat:", current)
  if (target.closest("button, input, textarea, a, [data-custom-click]")) return
  next()
  }

  const setIdScore = (dim: keyof IDScores, score: number) => {
    setIdScores((s) => ({ ...s, [dim]: score }))
    setTimeout(() => next(), 600)
  }

  const sectionLabels: Record<number, string> = {
    1: "The opening",
    2: "The claim",
    3: "The intersection",
    4: "The convergence",
    5: "The bet",
    6: "A question, first",
    7: "Why now · the claim",
    8: "Why now · force one",
    9: "Why now · force two",
    10: "Why now · the unclaimed layer",
    11: "Why now · the rhyme",
    12: "Now, an experience",
    13: "iD · question 1 of 6",
    14: "iD · question 2 of 6",
    15: "iD · question 3 of 6",
    16: "iD · question 4 of 6",
    17: "iD · question 5 of 6",
    18: "iD · question 6 of 6",
    19: "Your Primary iD",
    20: "The realization",
    21: "Primary, the place",
    22: "The oral physician",
    23: "The agentic OS",
    24: "The arc of care",
    25: "The first autonomous patient journey",
    26: "The architecture",
    27: "The partner stack",
    28: "What this is, in one line",
    29: "Why Primary wins",
    30: "The moat",
    31: "What's real today",
    32: "The team",
    33: "The founding circle",
    34: "A callback",
    35: "What the round funds",
    36: "Founding patient",
    37: "Two ways forward",
  }

  return (
    <div
      className={`${fraunces.variable} ${inter.variable} font-sans bg-[#0F1B2D] text-[#F5F1E8] min-h-screen overflow-hidden fixed inset-0`}
      onClick={handleStageClick}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-[#4FB3D9]/10 z-50">
        <div
          className="h-full bg-[#4FB3D9] transition-[width] duration-700 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>

      {/* Top chrome */}
      <div className="fixed top-0 left-0 right-0 px-8 py-6 flex justify-between items-center z-40 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FB3D9]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FB3D9]/60" />
          </div>
          <p className="text-[13px] font-medium tracking-tight text-[#E8E4D8]">Primary</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[11px] tracking-[0.18em] uppercase font-medium text-[#8A9BB0]">
            {sectionLabels[current]}
          </p>
          <p className="text-[11px] tracking-[0.14em] font-medium text-[#8A9BB0]">
            {String(current).padStart(2, "0")} / {total}
          </p>
        </div>
      </div>

      {/* Stage */}
      <div className="relative w-full h-screen overflow-hidden cursor-pointer">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <BeatWrapper key={n} active={current === n}>
            <Beat
              n={n}
              isActive={current === n}
              pcpAnswer={pcpAnswer}
              setPcpAnswer={setPcpAnswer}
              idScores={idScores}
              setIdScore={setIdScore}
              setIdScoreDirect={(dim, score) => setIdScores((s) => ({ ...s, [dim]: score }))}
              openAnswer={openAnswer}
              setOpenAnswer={setOpenAnswer}
              next={next}
            />
          </BeatWrapper>
        ))}
      </div>

      {/* Bottom chrome */}
      <div className="fixed bottom-0 left-0 right-0 px-8 py-6 flex justify-between items-center z-40 pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation()
            prev()
          }}
          disabled={current === 1}
          className="pointer-events-auto bg-white/5 text-[#C0C8D4] border border-white/10 px-4 py-2 rounded-md text-[11px] tracking-[0.14em] uppercase font-semibold transition-all hover:border-[#4FB3D9] hover:text-[#4FB3D9] disabled:opacity-30 disabled:pointer-events-none"
        >
          ← Back
        </button>
        <p className="text-[10px] text-[#8A9BB0] tracking-[0.22em] uppercase font-semibold">
          Tap anywhere to continue →
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation()
            next()
          }}
          disabled={current === total}
          className="pointer-events-auto bg-[#4FB3D9]/15 text-[#4FB3D9] border border-[#4FB3D9]/30 px-4 py-2 rounded-md text-[11px] tracking-[0.14em] uppercase font-semibold transition-all hover:bg-[#4FB3D9] hover:text-[#0F1B2D] disabled:opacity-30 disabled:pointer-events-none"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

// =====================================================
// BEAT WRAPPER
// =====================================================

function BeatWrapper({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {children}
    </div>
  )
}

// =====================================================
// BEAT ROUTER
// =====================================================

type BeatProps = {
  n: number
  isActive: boolean
  pcpAnswer: PCPAnswer
  setPcpAnswer: (a: PCPAnswer) => void
  idScores: IDScores
  setIdScore: (dim: keyof IDScores, score: number) => void
  setIdScoreDirect: (dim: keyof IDScores, score: number) => void
  openAnswer: string
  setOpenAnswer: (s: string) => void
  next: () => void
}

function Beat(props: BeatProps) {
  switch (props.n) {
    case 1: return <Beat01 />
    case 2: return <Beat02 />
    case 3: return <Beat03 next={props.next} isActive={props.isActive} />
    case 4: return <Beat04 isActive={props.isActive} />
    case 5: return <Beat05 />
    case 6: return <Beat06 pcpAnswer={props.pcpAnswer} setPcpAnswer={props.setPcpAnswer} />
    case 7: return <Beat07 />
    case 8: return <Beat08 />
    case 9: return <Beat09 />
    case 10: return <Beat10 />
    case 11: return <Beat11 />
    case 12: return <Beat12 />
    case 13: return (
      <BeatIDQuestion
        qNum={1}
        dim="sleep"
        dimLabel="Sleep & Airway"
        dimColor="#B9A3E8"
        question={
          <>
            How often do you wake up <em className="italic text-[#4FB3D9]">feeling tired?</em>
          </>
        }
        options={[
          { label: "Rarely — I wake up rested", score: 100 },
          { label: "Sometimes", score: 70 },
          { label: "Often", score: 40 },
          { label: "Every day", score: 15 },
        ]}
        setIdScore={props.setIdScore}
      />
    )
    case 14: return (
      <BeatIDQuestion
        qNum={2}
        dim="oral"
        dimLabel="Oral Health"
        dimColor="#5DCAA5"
        question={
          <>
            How often do your gums <em className="italic text-[#4FB3D9]">bleed when you brush?</em>
          </>
        }
        options={[
          { label: "Never", score: 95 },
          { label: "Rarely", score: 65 },
          { label: "Sometimes", score: 35 },
          { label: "Often", score: 10 },
        ]}
        setIdScore={props.setIdScore}
      />
    )
    case 15: return (
      <BeatIDQuestion
        qNum={3}
        dim="nutrition"
        dimLabel="Nutrition"
        dimColor="#E8B5A3"
        question={
          <>
            How would you describe your diet <em className="italic text-[#4FB3D9]">most weeks?</em>
          </>
        }
        options={[
          { label: "Whole foods, mostly home-cooked", score: 92 },
          { label: "Balanced, some processed food", score: 68 },
          { label: "Inconsistent — depends on the week", score: 38 },
          { label: "Mostly takeout or skipping meals", score: 18 },
        ]}
        setIdScore={props.setIdScore}
      />
    )
    case 16: return (
      <BeatIDQuestion
        qNum={4}
        dim="airway"
        dimLabel="Sleep & Airway"
        dimColor="#B9A3E8"
        question={
          <>
            Do you snore, or has anyone <em className="italic text-[#4FB3D9]">told you that you do?</em>
          </>
        }
        options={[
          { label: "Never that I know of", score: 90 },
          { label: "Occasionally", score: 60 },
          { label: "Frequently", score: 30 },
          { label: "Every night", score: 12 },
        ]}
        setIdScore={props.setIdScore}
      />
    )
    case 17: return <Beat17 setIdScoreDirect={props.setIdScoreDirect} next={props.next} />
    case 18: return <Beat18 openAnswer={props.openAnswer} setOpenAnswer={props.setOpenAnswer} next={props.next} />
    case 19: return <Beat19 idScores={props.idScores} />
    case 20: return <Beat20 />
    case 21: return <Beat21 />
    case 22: return <Beat22 />
    case 23: return <Beat23 />
    case 24: return <Beat24 />
    case 25: return <Beat25 />
    case 26: return <Beat26 />
    case 27: return <Beat27 />
    case 28: return <Beat28 />
    case 29: return <Beat29 />
    case 30: return <Beat30 />
    case 31: return <Beat31 />
    case 32: return <Beat32 />
    case 33: return <Beat33 />
    case 34: return <Beat34 pcpAnswer={props.pcpAnswer} />
    case 35: return <Beat35 />
    case 36: return <Beat36 />
    case 37: return <Beat37 />
    default: return null
  }
}

// =====================================================
// SHARED COMPONENTS
// =====================================================

function Stage({ children, justify = "center", align = "start", className = "" }: {
  children: React.ReactNode
  justify?: "center" | "start"
  align?: "center" | "start"
  className?: string
}) {
  const j = justify === "center" ? "justify-center" : "justify-start pt-[12vh]"
  const a = align === "center" ? "items-center text-center" : "items-start"
  return (
    <div className={`flex flex-col ${j} ${a} h-full px-[8vw] py-[8vh] overflow-y-auto ${className}`}>
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] text-[#4FB3D9] tracking-[0.24em] uppercase font-semibold mb-8">
      — {children}
    </p>
  )
}

// =====================================================
// BEATS 1-11 (Already-built opening + why now)
// =====================================================

function Beat01() {
  return (
    <Stage justify="center">
      <p className="text-[12px] text-[#4FB3D9] tracking-[0.24em] uppercase font-semibold mb-6">
        — A founders circle invitation
      </p>
      <h1 className="font-serif text-[clamp(64px,11vw,140px)] leading-[0.95] font-normal tracking-[-0.035em]">
        Primary <em className="italic text-[#4FB3D9]">iD</em>.<br />
        <em className="italic text-[#4FB3D9]">The new front door.</em>
      </h1>
      <p className="mt-8 text-[clamp(15px,1.2vw,18px)] text-[#8A9BB0] max-w-[540px] leading-relaxed">
        A founders-circle preview of what we're building, written for the operators we're inviting in.
      </p>
    </Stage>
  )
}

function Beat02() {
  return (
    <Stage>
      <Label>The claim</Label>
      <h2 className="font-serif text-[clamp(40px,6vw,80px)] leading-[1.05] font-normal tracking-[-0.025em] max-w-[1000px]">
        The dental visit is the<br />
        <em className="italic text-[#4FB3D9]">most-utilized recurring</em><br />
        healthcare visit in America.
      </h2>
      <p className="mt-6 text-[clamp(15px,1.2vw,18px)] text-[#8A9BB0] max-w-[540px]">
        Twice a year. Every year. By design.
      </p>
    </Stage>
  )
}

function Beat03({ next, isActive }: { next: () => void; isActive: boolean }) {
  const [frame, setFrame] = useState(1)
  const totalFrames = 6

  // Reset frame when slide becomes active
  useEffect(() => {
    if (isActive) {
      console.log("[v0] Beat03 is now ACTIVE, resetting frame to 1")
      setFrame(1)
    } else {
      console.log("[v0] Beat03 is now INACTIVE")
    }
  }, [isActive])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    console.log("[v0] Beat03 handleClick - current frame:", frame, "totalFrames:", totalFrames)
    if (frame < totalFrames) {
      setFrame(f => f + 1)
    } else {
      next()
    }
  }

  // Each market sits at a fixed quadrant relative to dental center.
  // Markets appear at: M=NW, L=NE, S=SW, B=SE
  const markets = [
    {
      key: "medicine",
      name: "Medicine",
      num: "$4.9T",
      color: "#5DCAA5",
      frame: "80% of chronic disease shows up orally first.",
      // Center positioning relative to dental's center (which is at 50%, 50%)
      // Larger circles offset further to give breathing room
      style: { left: "calc(50% - 280px)", top: "calc(50% - 220px)", width: "340px", height: "340px" },
      appearAt: 2,
    },
    {
      key: "longevity",
      name: "Longevity",
      num: "$600B",
      color: "#4FB3D9",
      frame: "Oral inflammation accelerates biological age.",
      style: { left: "calc(50% - 60px)", top: "calc(50% - 220px)", width: "260px", height: "260px" },
      appearAt: 3,
    },
    {
      key: "sleep",
      name: "Sleep",
      num: "$80B",
      color: "#B9A3E8",
      frame: "80% of sleep apnea is undiagnosed; first signs in the mouth.",
      style: { left: "calc(50% - 280px)", top: "calc(50% - 50px)", width: "200px", height: "200px" },
      appearAt: 4,
    },
    {
      key: "beauty",
      name: "Beauty",
      num: "$600B",
      color: "#E8B5A3",
      frame: "The smile is the most-photographed feature on earth.",
      style: { left: "calc(50% + 60px)", top: "calc(50% - 30px)", width: "260px", height: "260px" },
      appearAt: 5,
    },
  ]

  // Determine the active "current" market for caption display
  const activeMarket = markets.find((m) => m.appearAt === frame)

  return (
    <div
      data-custom-click
      className="flex flex-col h-full px-[8vw] py-[8vh] overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-[12px] text-[#4FB3D9] tracking-[0.24em] uppercase font-semibold mb-4">
        — The intersection
      </p>

      {/* Frame counter (subtle) */}
      <p className="text-[10px] text-[#4A5566] tracking-[0.2em] uppercase font-medium mb-8">
        {String(frame).padStart(2, "0")} / 06
      </p>

      {/* Visual canvas */}
      <div className="relative flex-1 flex items-center justify-center min-h-[480px]">
        {/* Dental circle — always present, center anchor */}
        <div
          className="absolute rounded-full flex flex-col items-center justify-center transition-all duration-1000 ease-out"
          style={{
            left: "calc(50% - 80px)",
            top: "calc(50% - 80px)",
            width: "160px",
            height: "160px",
            background: "rgba(245, 241, 232, 0.06)",
            border: "1.5px solid rgba(245, 241, 232, 0.4)",
            zIndex: 10,
            boxShadow: frame === 6 ? "0 0 60px rgba(245, 241, 232, 0.25)" : "none",
          }}
        >
          <p className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#F5F1E8] mb-1">
            Dental
          </p>
          <p className="font-serif text-[28px] text-[#F5F1E8] tracking-tight font-normal">$168B</p>
          <p className="text-[9px] text-[#C0C8D4] tracking-wider mt-1 max-w-[110px] text-center leading-snug">
            US dental services
          </p>
        </div>

        {/* Adjacent market circles — appear in sequence */}
        {markets.map((m) => {
          const visible = frame >= m.appearAt
          return (
            <div
              key={m.key}
              className="absolute rounded-full flex flex-col items-center justify-center transition-all duration-[1200ms] ease-out"
              style={{
                ...m.style,
                background: visible
                  ? `radial-gradient(circle, ${m.color}22 0%, ${m.color}10 60%, transparent 100%)`
                  : "transparent",
                border: visible ? `1px solid ${m.color}66` : `1px solid ${m.color}00`,
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.6)",
                zIndex: 5,
              }}
            >
              <p
                className="text-[10px] tracking-[0.24em] uppercase font-semibold mb-1"
                style={{ color: m.color }}
              >
                {m.name}
              </p>
              <p className="font-serif text-[clamp(24px,2.6vw,34px)] text-[#F5F1E8] tracking-tight font-normal">
                {m.num}
              </p>
            </div>
          )
        })}

        {/* Caption — changes with each frame */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center transition-opacity duration-700"
          style={{
            bottom: "0px",
            maxWidth: "640px",
            width: "90%",
          }}
        >
          {frame === 1 && (
            <p className="font-serif text-[clamp(18px,1.8vw,22px)] leading-[1.5] text-[#C0C8D4] italic">
              The most-utilized recurring healthcare visit in America. Smaller market than people realize.
            </p>
          )}
          {activeMarket && frame >= 2 && frame <= 5 && (
            <p className="font-serif text-[clamp(18px,1.8vw,22px)] leading-[1.5] italic" style={{ color: activeMarket.color }}>
              {activeMarket.frame}
            </p>
          )}
          {frame === 6 && (
            <div>
              <p className="font-serif text-[clamp(24px,2.8vw,34px)] leading-[1.25] text-[#F5F1E8] mb-2 tracking-tight">
                $6.2T sits across four categories.<br />
                They <em className="italic text-[#4FB3D9]">all converge here.</em>
              </p>
              <p className="text-[13px] text-[#8A9BB0] mt-3 italic">
                And dental is the only one with the recurring physical visit already in place.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Beat04({ isActive }: { isActive: boolean }) {
  const [drawn, setDrawn] = useState(false)
  const [reveal, setReveal] = useState(false)

  useEffect(() => {
    if (!isActive) {
      // Reset when slide becomes inactive
      setDrawn(false)
      setReveal(false)
      return
    }
    // Trigger line draw shortly after becoming active
    const t1 = setTimeout(() => setDrawn(true), 200)
    // Reveal headline + dot after lines complete
    const t2 = setTimeout(() => setReveal(true), 1900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isActive])

  // Each path is a quadratic curve from a corner anchor down to the convergence point.
  // Path length is roughly ~200 for our curves; we use 220 to be safe.
  const paths = [
    { d: "M 60 20 Q 260 80 260 130", color: "#5DCAA5", delay: 0 },
    { d: "M 190 20 Q 260 80 260 130", color: "#4FB3D9", delay: 200 },
    { d: "M 330 20 Q 260 80 260 130", color: "#B9A3E8", delay: 400 },
    { d: "M 460 20 Q 260 80 260 130", color: "#E8B5A3", delay: 600 },
  ]

  const labels = [
    { x: 60, label: "Medicine", color: "#5DCAA5" },
    { x: 190, label: "Longevity", color: "#4FB3D9" },
    { x: 330, label: "Sleep", color: "#B9A3E8" },
    { x: 460, label: "Beauty", color: "#E8B5A3" },
  ]

  return (
    <Stage justify="center" align="center">
      <p className="text-[12px] text-[#4FB3D9] tracking-[0.24em] uppercase font-semibold mb-10">
        The convergence point
      </p>

      <svg
        width="520"
        height="180"
        viewBox="0 0 520 180"
        className="mb-12 max-w-full"
        style={{ overflow: "visible" }}
      >
        {/* Top-edge category labels */}
        {labels.map((l) => (
          <text
            key={l.label}
            x={l.x}
            y={10}
            fill={l.color}
            fontSize="10"
            fontWeight="600"
            letterSpacing="2"
            textAnchor="middle"
            style={{ textTransform: "uppercase" }}
            opacity={drawn ? 1 : 0}
          >
            {l.label.toUpperCase()}
          </text>
        ))}

        {/* Animated lines */}
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke={p.color}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset={drawn ? 0 : 220}
            style={{
              transition: `stroke-dashoffset 1100ms cubic-bezier(0.4, 0, 0.2, 1) ${p.delay}ms`,
            }}
          />
        ))}

        {/* Convergence dot */}
        <circle
          cx="260"
          cy="130"
          r="6"
          fill="#4FB3D9"
          opacity={reveal ? 1 : 0}
          style={{ transition: "opacity 600ms ease-out" }}
        />
        {/* Pulse ring around the dot */}
        {reveal && (
          <circle cx="260" cy="130" r="6" fill="none" stroke="#4FB3D9" strokeWidth="1.5">
            <animate attributeName="r" from="6" to="28" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.7" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      <h2
        className="font-serif text-[clamp(48px,7vw,88px)] leading-[1.05] font-normal tracking-[-0.025em] mb-8 transition-opacity duration-700"
        style={{ opacity: reveal ? 1 : 0 }}
      >
        The <em className="italic text-[#4FB3D9]">dental visit.</em>
      </h2>
      <p
        className="text-[clamp(16px,1.3vw,19px)] text-[#C0C8D4] max-w-[640px] leading-[1.6] transition-opacity duration-700"
        style={{ opacity: reveal ? 1 : 0, transitionDelay: "300ms" }}
      >
        Recurring. Physical. Trusted. Already in the routine. Sitting at the exact center of the four largest consumer healthcare categories — and structurally invisible to all of them.
      </p>
    </Stage>
  )
}

function Beat05() {
  return (
    <Stage>
      <Label>The bet</Label>
      <p className="font-serif text-[clamp(40px,5.5vw,72px)] leading-[1.1] font-normal tracking-[-0.02em] mb-6 max-w-[1000px]">
        We believe it's the front door<br />to solving the American healthcare crisis.
      </p>
      <p className="font-serif text-[clamp(40px,5.5vw,72px)] leading-[1.1] font-normal italic tracking-[-0.02em] text-[#4FB3D9] mb-10 max-w-[1000px]">
        We're building it.
      </p>
      <p className="text-[14px] text-[#E8E4D8] font-medium tracking-wide">
        Primary iD, in five sections. →
      </p>
    </Stage>
  )
}

function Beat06({ pcpAnswer, setPcpAnswer }: { pcpAnswer: PCPAnswer; setPcpAnswer: (a: PCPAnswer) => void }) {
  const choices: PCPAnswer[] = ["Within six months", "Within the year", "Over a year ago", "I don't have one"]
  return (
    <Stage>
      <Label>A question, first</Label>
      <h2 className="font-serif text-[clamp(36px,5.2vw,64px)] leading-[1.1] font-normal tracking-[-0.02em] mb-4 max-w-[900px]">
        When was the last time you saw your <em className="italic text-[#4FB3D9]">primary care doctor?</em>
      </h2>
      <p className="text-[14px] text-[#8A9BB0] mb-12 tracking-wide">It'll matter later.</p>
      <div className={`flex flex-col gap-3 max-w-[420px] transition-opacity duration-500 ${pcpAnswer ? "opacity-0 pointer-events-none" : ""}`}>
        {choices.map((c) => (
          <button
            key={c}
            onClick={(e) => {
              e.stopPropagation()
              setPcpAnswer(c)
            }}
            className="bg-white/[0.04] border border-white/20 px-6 py-4 text-[15px] text-[#F5F1E8] rounded-lg text-left transition-all hover:border-[#4FB3D9] hover:text-[#4FB3D9] hover:bg-[#4FB3D9]/5 hover:translate-x-1"
          >
            {c}
          </button>
        ))}
      </div>
      {pcpAnswer && (
        <p className="font-serif text-[26px] text-[#4FB3D9] mt-9 italic transition-opacity duration-700">
          Thank you. We'll come back to that.
        </p>
      )}
    </Stage>
  )
}

function Beat07() {
  return (
    <Stage justify="center">
      <Label>Why now</Label>
      <h2 className="font-serif text-[clamp(48px,7vw,88px)] leading-[1.04] font-normal tracking-[-0.025em] mb-7 max-w-[1100px]">
        AI is making healthcare<br /><em className="italic text-[#4FB3D9]">personalized.</em>
      </h2>
      <p className="font-serif text-[clamp(36px,5vw,64px)] leading-[1.1] font-normal tracking-[-0.02em] text-[#C0C8D4] mb-14 max-w-[1000px]">
        But personalized care still needs<br />a <em className="italic text-[#E8B5A3]">physical place</em> to land.
      </p>
      <p className="text-[clamp(15px,1.2vw,18px)] text-[#8A9BB0] leading-[1.6] max-w-[540px]">
        Two forces are reshaping American healthcare in parallel.<br />They both point at the same missing piece.
      </p>
    </Stage>
  )
}

function Beat08() {
  return (
    <Stage justify="center">
      <p className="text-[11px] text-[#4FB3D9] tracking-[0.28em] uppercase font-semibold mb-8">
        Force one of two
      </p>
      <h2 className="font-serif text-[clamp(48px,6.5vw,84px)] leading-[1.05] font-normal tracking-[-0.025em] mb-8 max-w-[1000px]">
        The diagnostic <em className="italic text-[#4FB3D9]">explosion.</em>
      </h2>
      <p className="text-[clamp(18px,1.5vw,22px)] text-[#C0C8D4] leading-[1.55] max-w-[720px] mb-9">
        A new generation of consumer diagnostics is generating more health signal than the system has ever had to coordinate.
      </p>
      <div className="flex flex-wrap gap-2.5 mb-9">
        {["Function", "Superpower", "Levels", "Viome", "HappySleep"].map((p) => (
          <span key={p} className="bg-[#4FB3D9]/10 border border-[#4FB3D9]/30 text-[#4FB3D9] px-4 py-2 rounded-full text-[13px] font-medium">
            {p}
          </span>
        ))}
      </div>
      <p className="text-[clamp(15px,1.3vw,17px)] text-[#C0C8D4] leading-[1.65] max-w-[680px] mb-10">
        Bloodwork. Biomarkers. Microbiome. Sleep. Cardiometabolic risk. All reaching consumers directly. All generating data that needs somewhere to be acted on.
      </p>
      <p className="font-serif text-[clamp(22px,2.4vw,32px)] leading-[1.3] text-[#4FB3D9] italic max-w-[720px] pt-7 border-t border-[#4FB3D9]/25">
        The signal is multiplying.<br />The coordination point isn't.
      </p>
    </Stage>
  )
}

function Beat09() {
  return (
    <Stage justify="center">
      <p className="text-[11px] text-[#4FB3D9] tracking-[0.28em] uppercase font-semibold mb-8">
        Force two of two
      </p>
      <h2 className="font-serif text-[clamp(48px,6.5vw,84px)] leading-[1.05] font-normal tracking-[-0.025em] mb-8 max-w-[1000px]">
        The <em className="italic text-[#4FB3D9]">engaged</em> healthcare consumer.
      </h2>
      <p className="text-[clamp(18px,1.5vw,22px)] text-[#C0C8D4] leading-[1.55] max-w-[720px] mb-9">
        A growing segment of Americans is managing their own preventive and chronic care — and paying out-of-pocket for it.
      </p>
      <p className="text-[clamp(15px,1.3vw,17px)] text-[#C0C8D4] leading-[1.65] max-w-[680px] mb-10">
        Function and Hims proved willingness to pay outside reimbursement is no longer a niche. It's the fastest-growing segment of American healthcare.
      </p>
      <p className="font-serif text-[clamp(22px,2.4vw,32px)] leading-[1.3] text-[#4FB3D9] italic max-w-[720px] pt-7 border-t border-[#4FB3D9]/25">
        They're paying for diagnostics.<br />They're not getting coordinated care.
      </p>
    </Stage>
  )
}

function Beat10() {
  return (
    <div className="flex flex-col justify-center h-full px-[8vw] py-[8vh] bg-gradient-to-b from-[#0F1B2D] to-[#1A2B47] overflow-y-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-[60px] h-px bg-[#E8B5A3]/50" />
        <p className="text-[11px] text-[#E8B5A3] tracking-[0.24em] uppercase font-semibold">Both forces point here</p>
        <div className="w-[60px] h-px bg-[#E8B5A3]/50" />
      </div>
      <p className="text-[13px] text-[#E8B5A3] tracking-[0.28em] uppercase font-semibold mb-7">
        The unclaimed layer
      </p>
      <h2 className="font-serif text-[clamp(40px,5.6vw,72px)] leading-[1.1] font-normal tracking-[-0.025em] mb-9 max-w-[1100px]">
        The dental visit is the only<br />
        recurring physical healthcare visit<br />
        Americans <em className="italic text-[#F5F1E8]">already trust,</em><br />
        <em className="italic text-[#F5F1E8]">already attend,</em> and <em className="italic text-[#F5F1E8]">already pay for.</em>
      </h2>
      <p className="text-[clamp(17px,1.5vw,21px)] text-[#C0C8D4] leading-[1.6] max-w-[800px]">
        It's the most natural place for personalized care to be <em className="italic text-[#4FB3D9]">coordinated, delivered, and continuously updated.</em>
      </p>
    </div>
  )
}

function Beat11() {
  return (
    <Stage justify="center">
      <p className="font-serif text-[clamp(42px,6vw,76px)] leading-[1.1] font-normal tracking-[-0.025em] text-[#C0C8D4] mb-8 max-w-[1100px]">
        Personalization without coordination<br />is <em className="italic text-[#E8B5A3]">just data.</em>
      </p>
      <p className="font-serif text-[clamp(42px,6vw,76px)] leading-[1.1] font-normal tracking-[-0.025em] text-[#F5F1E8] max-w-[1100px]">
        Primary <em className="italic text-[#4FB3D9]">iD</em> is where personalization<br /><em className="italic text-[#4FB3D9]">meets care.</em>
      </p>
    </Stage>
  )
}

// =====================================================
// BEATS 12-20 (iD Demo)
// =====================================================

function Beat12() {
  return (
    <Stage justify="center">
      <Label>Now, an experience</Label>
      <h2 className="font-serif text-[clamp(44px,6.4vw,80px)] leading-[1.06] font-normal tracking-[-0.025em] mb-8 max-w-[1100px]">
        Before we tell you what we built,<br />we want to <em className="italic text-[#4FB3D9]">show you.</em>
      </h2>
      <p className="text-[clamp(18px,1.5vw,22px)] text-[#C0C8D4] leading-[1.6] max-w-[700px] mb-8">
        Take 90 seconds. Take part of what every Primary patient takes.<br />Six questions. Five dimensions. One score.
      </p>
      <p className="text-[14px] text-[#4FB3D9] font-medium tracking-wide">This is the wedge. →</p>
    </Stage>
  )
}

function BeatIDQuestion({
  qNum,
  dim,
  dimLabel,
  dimColor,
  question,
  options,
  setIdScore,
}: {
  qNum: number
  dim: keyof IDScores
  dimLabel: string
  dimColor: string
  question: React.ReactNode
  options: { label: string; score: number }[]
  setIdScore: (dim: keyof IDScores, score: number) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  return (
    <Stage justify="center">
      <p className="text-[11px] text-[#8A9BB0] tracking-[0.22em] uppercase font-semibold mb-9">
        Question {qNum} of 6 ·{" "}
        <span className="font-semibold tracking-[0.16em]" style={{ color: dimColor }}>
          {dimLabel}
        </span>
      </p>
      <h2 className="font-serif text-[clamp(40px,5.6vw,72px)] leading-[1.1] font-normal tracking-[-0.025em] mb-12 max-w-[1000px]">
        {question}
      </h2>
      <div className="flex flex-col gap-3 max-w-[540px]">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              setSelected(i)
              setIdScore(dim, opt.score)
            }}
            disabled={selected !== null}
            className={`px-6 py-[18px] text-[16px] rounded-[10px] text-left transition-all duration-200 ${
              selected === i
                ? "border border-[#4FB3D9] text-[#4FB3D9] bg-[#4FB3D9]/10"
                : selected !== null
                ? "bg-white/[0.04] border border-white/[0.18] text-[#F5F1E8] opacity-30"
                : "bg-white/[0.04] border border-white/[0.18] text-[#F5F1E8] hover:border-[#4FB3D9] hover:text-[#4FB3D9] hover:bg-[#4FB3D9]/5 hover:translate-x-1.5"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </Stage>
  )
}

function Beat17({ setIdScoreDirect, next }: { setIdScoreDirect: (dim: keyof IDScores, score: number) => void; next: () => void }) {
  const [value, setValue] = useState(7)
  const handleContinue = (e: React.MouseEvent) => {
    e.stopPropagation()
    const score = Math.round(15 + ((value - 1) / 9) * 80)
    setIdScoreDirect("longevity", score)
    setTimeout(() => next(), 100)
  }
  return (
    <Stage justify="center">
      <p className="text-[11px] text-[#8A9BB0] tracking-[0.22em] uppercase font-semibold mb-9">
        Question 5 of 6 · <span className="text-[#4FB3D9] font-semibold tracking-[0.16em]">Longevity</span>
      </p>
      <h2 className="font-serif text-[clamp(40px,5.6vw,72px)] leading-[1.1] font-normal tracking-[-0.025em] mb-12 max-w-[1000px]">
        How would you rate your <em className="italic text-[#4FB3D9]">overall energy?</em>
      </h2>
      <div className="max-w-[560px] w-full mb-8">
        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          onClick={(e) => e.stopPropagation()}
          className="w-full h-1 bg-[#4FB3D9]/20 rounded-full appearance-none outline-none mb-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4FB3D9] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0F1B2D] [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between items-center text-[13px] text-[#8A9BB0]">
          <span>Low</span>
          <span className="font-serif text-[28px] text-[#4FB3D9]">{value}</span>
          <span>High</span>
        </div>
      </div>
      <button
        onClick={handleContinue}
        className="bg-[#4FB3D9]/15 text-[#4FB3D9] border border-[#4FB3D9]/40 px-7 py-3.5 rounded-lg text-[14px] font-semibold tracking-wide transition-all hover:bg-[#4FB3D9] hover:text-[#0F1B2D]"
      >
        Continue →
      </button>
    </Stage>
  )
}

function Beat18({ openAnswer, setOpenAnswer, next }: { openAnswer: string; setOpenAnswer: (s: string) => void; next: () => void }) {
  return (
    <Stage justify="center">
      <p className="text-[11px] text-[#8A9BB0] tracking-[0.22em] uppercase font-semibold mb-9">
        Question 6 of 6 · <span className="text-[#C8B8E0] font-semibold tracking-[0.16em]">In your words</span>
      </p>
      <h2 className="font-serif text-[clamp(40px,5.6vw,72px)] leading-[1.1] font-normal tracking-[-0.025em] mb-9 max-w-[1000px]">
        What's the one thing about your health<br />you wish someone would <em className="italic text-[#4FB3D9]">actually look at?</em>
      </h2>
      <textarea
        value={openAnswer}
        onChange={(e) => setOpenAnswer(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        placeholder="A sentence is enough."
        rows={3}
        maxLength={280}
        className="w-full max-w-[720px] bg-white/[0.04] border border-white/[0.18] rounded-[10px] px-6 py-[18px] text-[#F5F1E8] text-[16px] leading-[1.55] resize-none mb-7 outline-none transition-colors focus:border-[#4FB3D9] placeholder:text-[#6A7488] font-sans"
      />
      <button
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        className="bg-[#4FB3D9]/15 text-[#4FB3D9] border border-[#4FB3D9]/40 px-7 py-3.5 rounded-lg text-[14px] font-semibold tracking-wide transition-all hover:bg-[#4FB3D9] hover:text-[#0F1B2D]"
      >
        See my Primary iD →
      </button>
    </Stage>
  )
}

function Beat19({ idScores }: { idScores: IDScores }) {
  const dials = [
    { name: "sleep", label: "Sleep & Airway", color: "#B9A3E8" },
    { name: "oral", label: "Oral Health", color: "#5DCAA5" },
    { name: "nutrition", label: "Nutrition", color: "#E8B5A3" },
    { name: "longevity", label: "Longevity", color: "#4FB3D9" },
    { name: "genetic", label: "Genetics & Microbiome", color: "#C8B8E0" },
  ]

  // Compute final scores
  const sleepScore = idScores.sleep != null && idScores.airway != null
    ? Math.round((idScores.sleep + idScores.airway) / 2) : 65
  const oralScore = idScores.oral ?? 60
  const nutritionScore = idScores.nutrition ?? 60
  const longevityScore = idScores.longevity ?? 60
  const geneticScore = Math.round((oralScore + nutritionScore) / 2)

  const scoreMap: Record<string, number> = {
    sleep: sleepScore,
    oral: oralScore,
    nutrition: nutritionScore,
    longevity: longevityScore,
    genetic: geneticScore,
  }

  return (
    <Stage>
      <Label>Your Primary <em className="italic text-[#4FB3D9]">iD</em></Label>
      <h2 className="font-serif text-[clamp(40px,5.4vw,64px)] leading-[1.1] font-normal tracking-[-0.025em] mb-14">
        Five dimensions. <em className="italic text-[#4FB3D9]">One score.</em>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-[1100px] w-full mb-10">
        {dials.map((d, i) => (
          <Dial key={d.name} name={d.name} label={d.label} color={d.color} score={scoreMap[d.name]} delay={i * 200} />
        ))}
      </div>
      <p className="text-[13px] text-[#6A7488] italic">
        Sample-weighted from six questions. The full iD is fifty.
      </p>
    </Stage>
  )
}

function Dial({ name, label, color, score, delay }: { name: string; label: string; color: string; score: number; delay: number }) {
  const [animScore, setAnimScore] = useState(0)
  const [animOffset, setAnimOffset] = useState(264)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (animatedRef.current) return
    animatedRef.current = true
    const startTimer = setTimeout(() => {
      const offset = 264 - (score / 100) * 264
      setAnimOffset(offset)
      let v = 0
      const step = Math.max(1, Math.round(score / 30))
      const interval = setInterval(() => {
        v += step
        if (v >= score) {
          v = score
          clearInterval(interval)
        }
        setAnimScore(v)
      }, 40)
    }, delay + 800)
    return () => clearTimeout(startTimer)
  }, [score, delay])

  return (
    <div className="text-center">
      <div className="relative mx-auto" style={{ maxWidth: 140 }}>
        <svg viewBox="0 0 100 100" className="w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="264"
            strokeDashoffset={animOffset}
            style={{ transition: "stroke-dashoffset 1500ms cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>
        <p className="absolute inset-0 flex items-center justify-center font-serif text-[clamp(28px,3vw,40px)] text-[#F5F1E8]">
          {animScore}
        </p>
      </div>
      <p className="text-[11px] text-[#8A9BB0] tracking-[0.16em] uppercase font-semibold mt-2">{label}</p>
    </div>
  )
}

function Beat20() {
  return (
    <Stage justify="center">
      <Label>What just happened</Label>
      <h2 className="font-serif text-[clamp(40px,5.6vw,72px)] leading-[1.1] font-normal tracking-[-0.025em] mb-9 max-w-[1100px]">
        This is what every Primary patient does <em className="italic text-[#4FB3D9]">before they walk in.</em>
      </h2>
      <p className="text-[clamp(17px,1.5vw,21px)] text-[#C0C8D4] leading-[1.65] max-w-[800px] mb-12">
        By the time they sit in the chair, we already know them. They already know themselves better. The visit is no longer the beginning of care — <em className="italic text-[#4FB3D9]">it's the third act of it.</em>
      </p>
      <p className="font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.2] text-[#E8B5A3] italic font-normal tracking-[-0.015em]">
        You just experienced the wedge.
      </p>
    </Stage>
  )
}

// =====================================================
// BEATS 21-22 (The place + the doctor)
// =====================================================

function Beat21() {
  const stats = [
    { num: "500+", label: "Five-star patient reviews" },
    { num: "25 yrs", label: "Of clinical practice" },
    { num: "90 min", label: "Of chair time per visit" },
  ]
  return (
    <Stage justify="center">
      <Label>Primary, the place</Label>
      <h2 className="font-serif text-[clamp(56px,8vw,104px)] leading-[1.02] font-normal tracking-[-0.03em] mb-8">
        A flagship in <em className="italic text-[#4FB3D9]">Brentwood.</em>
      </h2>
      <p className="text-[clamp(18px,1.5vw,22px)] text-[#C0C8D4] leading-[1.6] max-w-[720px] mb-14">
        Where the model lives. Where every claim in this deck has to be true. Where the first hundred founding patients walk in.
      </p>
      <div className="grid grid-cols-3 gap-8 max-w-[720px]">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-serif text-[clamp(36px,4.2vw,52px)] text-[#4FB3D9] mb-2 tracking-tight">{s.num}</p>
            <p className="text-[13px] text-[#8A9BB0] leading-snug">{s.label}</p>
          </div>
        ))}
      </div>
    </Stage>
  )
}

function Beat22() {
  return (
    <Stage justify="center">
      <Label>The oral physician</Label>
      <h2 className="font-serif text-[clamp(56px,8vw,104px)] leading-[1.02] font-normal tracking-[-0.03em] mb-4">
        Dr. <em className="italic text-[#4FB3D9]">Tzur Gabi.</em>
      </h2>
      <p className="text-[14px] text-[#8A9BB0] tracking-wide mb-12">
        DMD · Functional Prosthodontist · Oral Physician · Founder, Primary
      </p>
      <div className="bg-[#4FB3D9]/[0.06] border-l-[3px] border-[#4FB3D9] rounded-r-xl px-10 py-8 mb-10 max-w-[880px]">
        <p className="font-serif text-[64px] text-[#4FB3D9] leading-[0.5] mb-2">"</p>
        <p className="font-serif text-[clamp(22px,2.4vw,32px)] leading-[1.35] text-[#F5F1E8]">
          The dental chair is the only place in healthcare a patient sits down twice a year for an hour. <em className="italic text-[#4FB3D9]">We've decided to use the time.</em>
        </p>
      </div>
      <p className="text-[clamp(15px,1.3vw,18px)] text-[#C0C8D4] leading-[1.65] max-w-[760px]">
        Twenty-five years of full-arch reconstructive work taught Tzur what most dentists never see: the mouth as the earliest, most-instrumentable read on systemic health. Primary is the model he's been building toward his whole career.
      </p>
    </Stage>
  )
}

// =====================================================
// BEATS 23-28 (Agentic OS + partners + Travis line)
// =====================================================

function Beat23() {
  return (
    <Stage justify="center">
      <Label>The agentic OS</Label>
      <h2 className="font-serif text-[clamp(48px,7vw,88px)] leading-[1.05] font-normal tracking-[-0.025em] text-[#C0C8D4] mb-4 max-w-[1100px]">
        The chair is the <em className="italic text-[#C0C8D4]">showroom.</em>
      </h2>
      <h2 className="font-serif text-[clamp(48px,7vw,88px)] leading-[1.05] font-normal tracking-[-0.025em] text-[#F5F1E8] mb-9 max-w-[1100px]">
        The OS is the <em className="italic text-[#4FB3D9]">thing.</em>
      </h2>
      <p className="text-[clamp(15px,1.3vw,18px)] text-[#8A9BB0] leading-[1.65] max-w-[680px]">
        A coordination layer built around the recurring physical visit — and architected to run anywhere it goes next.
      </p>
    </Stage>
  )
}

function Beat24() {
  return (
    <Stage>
      <Label>The arc of care</Label>
      <h2 className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.08] font-normal tracking-[-0.02em] mb-10 max-w-[980px]">
        Care doesn't start at the chair anymore.<br />It doesn't <em className="italic text-[#4FB3D9]">stop there</em> either.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1100px]">
        <div className="bg-white/[0.04] rounded-xl p-7 border-l-[3px]" style={{ borderLeftColor: "#4FB3D9" }}>
          <p className="text-[11px] tracking-[0.22em] uppercase font-semibold mb-3 text-[#4FB3D9]">
            Before the visit
          </p>
          <p className="font-serif text-[22px] leading-[1.3] mb-3">
            The Primary <em className="italic">iD.</em>
          </p>
          <p className="text-[13px] text-[#C0C8D4] leading-[1.65]">
            Five dimensions. Fifty questions. A personalized score and playbook delivered before the patient sits down. <em className="italic">Information-gathering as the product itself.</em>
          </p>
        </div>
        <div className="bg-white/[0.04] rounded-xl p-7 border-l-[3px]" style={{ borderLeftColor: "#5DCAA5" }}>
          <p className="text-[11px] tracking-[0.22em] uppercase font-semibold mb-3 text-[#5DCAA5]">
            During the visit
          </p>
          <p className="font-serif text-[22px] leading-[1.3] mb-3">
            The <em className="italic">oral physician.</em>
          </p>
          <p className="text-[13px] text-[#C0C8D4] leading-[1.65]">
            Dr. Gabi plus a virtual MD plus a new health-optimizer mid-level workforce. The visit becomes the coordination point for sleep, longevity, nutrition, beauty.
          </p>
        </div>
        <div className="bg-white/[0.04] rounded-xl p-7 border-l-[3px]" style={{ borderLeftColor: "#B9A3E8" }}>
          <p className="text-[11px] tracking-[0.22em] uppercase font-semibold mb-3 text-[#B9A3E8]">
            Between visits
          </p>
          <p className="font-serif text-[22px] leading-[1.3] mb-3">
            The <em className="italic">agentic backend.</em>
          </p>
          <p className="text-[13px] text-[#C0C8D4] leading-[1.65]">
            Continuous, autonomous coordination between visits. Voice, charting, diagnostics, and follow-up — orchestrated, not scheduled.
          </p>
        </div>
      </div>
    </Stage>
  )
}

function Beat25() {
  return (
    <Stage justify="center">
      <Label>What we're actually building</Label>
      <h2 className="font-serif text-[clamp(48px,7.2vw,96px)] leading-[1.02] font-normal tracking-[-0.03em] mb-10 max-w-[1100px]">
        The first <em className="italic text-[#4FB3D9]">autonomous</em><br />
        patient journey<br />
        in healthcare.
      </h2>
      <p className="text-[clamp(17px,1.5vw,21px)] text-[#C0C8D4] leading-[1.65] max-w-[800px] mb-9">
        Not a dental practice with software. Not a SaaS tool with a clinic attached. <em className="italic text-[#4FB3D9]">An end-to-end patient experience that runs on agentic infrastructure</em> — communication, revenue, clinical, diagnostic, workforce — all orchestrated through a single coordination layer.
      </p>
      <p className="font-serif text-[clamp(22px,2.4vw,32px)] leading-[1.35] text-[#F5F1E8] italic max-w-[880px] pt-6 border-t border-[#4FB3D9]/25">
        Primary is the <em className="italic text-[#4FB3D9]">Tesla showroom</em> for what care looks like when every layer of the stack is autonomous.
      </p>
    </Stage>
  )
}

function Beat26() {
  const layers = [
    { tier: "Communication", fn: "Agentic patient communication", color: "#B9A3E8" },
    { tier: "Revenue cycle", fn: "Autonomous reimbursement rails", color: "#5DCAA5" },
    { tier: "Clinical operations", fn: "Automated clinical data layer", color: "#E8B5A3" },
    { tier: "Human capital", fn: "Predictive workforce intelligence", color: "#C8B8E0" },
  ]
  return (
    <Stage>
      <Label>The architecture</Label>
      <h2 className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.1] font-normal tracking-[-0.025em] mb-3 max-w-[1000px]">
        Five layers. <em className="italic text-[#4FB3D9]">One source of truth.</em>
      </h2>
      <p className="text-[clamp(15px,1.3vw,18px)] text-[#8A9BB0] mb-9 max-w-[720px]">
        Primary iD owns the patient relationship. Every other layer feeds it.
      </p>
      <div className="max-w-[1100px] w-full">
        <div className="bg-[#4FB3D9]/[0.14] border border-[#4FB3D9]/50 rounded-xl px-9 py-7">
          <p className="text-[11px] text-[#4FB3D9] tracking-[0.24em] uppercase font-semibold mb-1">Source of truth</p>
          <p className="font-serif text-[clamp(28px,3.2vw,42px)] text-[#F5F1E8] mb-2 leading-tight">
            Primary <em className="italic text-[#4FB3D9]">iD</em>
          </p>
          <p className="text-[14px] text-[#C0C8D4] leading-[1.6] max-w-[720px]">
            The patient relationship. The coordination layer. Where every signal becomes care.
          </p>
        </div>
        <svg width="100%" height="48" viewBox="0 0 600 48" preserveAspectRatio="none" className="block">
          <path d="M 100 48 L 100 12 L 80 28 M 100 12 L 120 28" stroke="#4FB3D9" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 240 48 L 240 12 L 220 28 M 240 12 L 260 28" stroke="#4FB3D9" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 360 48 L 360 12 L 340 28 M 360 12 L 380 28" stroke="#4FB3D9" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 480 48 L 480 12 L 460 28 M 480 12 L 500 28" stroke="#4FB3D9" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-3.5">
          {layers.map((l) => (
            <div key={l.tier} className="bg-white/[0.05] border border-white/[0.18] rounded-[10px] py-4 px-4 text-center">
              <p className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-2" style={{ color: l.color }}>
                {l.tier}
              </p>
              <p className="font-serif text-[clamp(13px,1.1vw,15px)] text-[#F5F1E8] leading-[1.35]">{l.fn}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.025] border border-dashed border-white/[0.18] rounded-[10px] py-3.5 px-5 text-center">
          <p className="text-[10px] text-[#8A9BB0] tracking-[0.22em] uppercase font-semibold mb-1">
            Diagnostic signal feeding upstream
          </p>
          <p className="font-serif text-[14px] text-[#C0C8D4] italic">Viome · HappySleep · Superpower</p>
        </div>
      </div>
    </Stage>
  )
}

function Beat27() {
  const partners = [
    {
      tier: "Communication",
      name: "Mango",
      signal: "16,000+ dental practices",
      detail: "Building agentic patient communication infrastructure inside Primary. Voice, scheduling, recall, and follow-up — all autonomous, all orchestrated.",
    },
    {
      tier: "Revenue cycle",
      name: "DayDream",
      signal: "Backed by Palantir co-founder",
      detail: "Agentic RCM. Fully automating reimbursement rails — claims, denials, posting, AR. The economic backbone of the visit, autonomous end-to-end.",
    },
    {
      tier: "Clinical operations",
      name: "Avora",
      signal: "Y Combinator",
      detail: "Clinical data layer. Fully automating clinical operations — charting, treatment planning, intra-op documentation, post-visit handoff.",
    },
    {
      tier: "Human capital",
      name: "onDiem",
      signal: "Workforce intelligence",
      detail: "Building the first predictive staffing model in dental. Workforce as autonomous infrastructure — the right clinician, the right hour, the right visit.",
    },
  ]
  return (
    <Stage>
      <Label>The partners</Label>
      <h2 className="font-serif text-[clamp(34px,4.8vw,56px)] leading-[1.1] font-normal tracking-[-0.025em] mb-3.5 max-w-[1000px]">
        We don't build what's <em className="italic text-[#4FB3D9]">already being built well.</em>
      </h2>
      <p className="text-[clamp(15px,1.3vw,17px)] text-[#8A9BB0] leading-[1.6] mb-9 max-w-[760px]">
        Each layer is a category-defining company. All are committed to building the autonomous patient experience inside Primary.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8 max-w-[1100px]">
        {partners.map((p) => (
          <div key={p.name} className="bg-white/[0.04] border border-[#4FB3D9]/25 rounded-xl px-7 py-6">
            <div className="mb-3.5 pb-3 border-b border-[#4FB3D9]/20">
              <p className="text-[10px] text-[#8A9BB0] tracking-[0.22em] uppercase font-semibold mb-2">{p.tier}</p>
              <p className="font-serif text-[clamp(28px,3.2vw,40px)] text-[#F5F1E8] leading-none italic tracking-tight">
                {p.name}
              </p>
            </div>
            <p className="text-[12px] text-[#4FB3D9] font-medium tracking-wide mb-3">{p.signal}</p>
            <p className="text-[14px] text-[#C0C8D4] leading-[1.6]">{p.detail}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-white/[0.12] pt-6 max-w-[1100px]">
        <p className="font-serif text-[clamp(20px,2vw,26px)] leading-[1.4] text-[#8A9BB0] italic mb-1">
          Each one a category leader.
        </p>
        <p className="font-serif text-[clamp(20px,2vw,26px)] leading-[1.4] text-[#C0C8D4] mb-1">
          Together: the strongest infrastructure stack in dental.
        </p>
        <p className="font-serif text-[clamp(20px,2vw,26px)] leading-[1.4] text-[#F5F1E8]">
          All feeding <em className="italic text-[#4FB3D9]">Primary iD.</em>
        </p>
      </div>
    </Stage>
  )
}

function Beat28() {
  return (
    <Stage>
      <Label>What this is, in one line</Label>
      <p className="font-serif text-[clamp(36px,4.8vw,60px)] leading-[1.15] text-[#C0C8D4] tracking-[-0.015em] mb-3 max-w-[1000px]">
        We're not selling AI to dentists.
      </p>
      <p className="font-serif text-[clamp(36px,4.8vw,60px)] leading-[1.15] text-[#C0C8D4] tracking-[-0.015em] mb-3 max-w-[1000px]">
        We're not selling software to practices.
      </p>
      <p className="font-serif text-[clamp(38px,5.2vw,64px)] leading-[1.15] text-[#F5F1E8] tracking-[-0.02em] mt-8 max-w-[1100px]">
        We're building a clinic that <em className="italic text-[#4FB3D9]">proves a model</em> —<br />
        and the operating system that makes it<br />
        <em className="italic text-[#4FB3D9]">run anywhere it goes next.</em>
      </p>
    </Stage>
  )
}

// =====================================================
// BEATS 29-32 (Why Primary wins + traction + team)
// =====================================================

function Beat29() {
  const cards = [
    { name: "Concierge primary care", missing: "No chair.", detail: "One Medical, Forward, Parsley. Solve the medical visit. Don't have a recurring physical touchpoint patients already attend." },
    { name: "Longevity brands", missing: "No visit.", detail: "Function, Superpower, Levels. Solve the diagnostic. Have no place for the data to become coordinated care." },
    { name: "Medspa & aesthetics", missing: "No doctor.", detail: "Aesthetic outcomes without the integrated clinical relationship. Discretionary, not foundational." },
    { name: "Insurance & DSOs", missing: "No coordination.", detail: "Built around procedure reimbursement. Structurally incapable of carrying the conversation forward." },
  ]
  return (
    <Stage>
      <Label>Why Primary wins</Label>
      <h2 className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.08] font-normal tracking-[-0.02em] mb-10 max-w-[1000px]">
        Every adjacent player is missing <em className="italic text-[#4FB3D9]">one of four pieces.</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mb-8">
        {cards.map((c) => (
          <div key={c.name} className="bg-white/[0.04] border border-white/[0.15] rounded-xl px-7 py-6">
            <p className="text-[12px] text-[#8A9BB0] tracking-[0.18em] uppercase font-semibold mb-3">{c.name}</p>
            <p className="font-serif text-[clamp(22px,2.2vw,30px)] text-[#E8B5A3] italic mb-3 tracking-tight">{c.missing}</p>
            <p className="text-[14px] text-[#C0C8D4] leading-[1.6]">{c.detail}</p>
          </div>
        ))}
      </div>
      <p className="font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.25] tracking-[-0.015em] mt-4">
        Primary is the only model with <em className="italic text-[#4FB3D9]">all four.</em>
      </p>
    </Stage>
  )
}

function Beat30() {
  return (
    <Stage justify="center">
      <Label>The moat</Label>
      <h2 className="font-serif text-[clamp(44px,6.4vw,80px)] leading-[1.06] font-normal text-[#C0C8D4] tracking-[-0.025em] mb-4 max-w-[1100px]">
        The ancillary layer is <em className="italic text-[#E8B5A3]">commoditizing.</em>
      </h2>
      <h2 className="font-serif text-[clamp(44px,6.4vw,80px)] leading-[1.06] font-normal text-[#F5F1E8] tracking-[-0.025em] mb-12 max-w-[1100px]">
        The patient relationship is <em className="italic text-[#4FB3D9]">the prize.</em>
      </h2>
      <p className="text-[clamp(16px,1.4vw,19px)] text-[#C0C8D4] leading-[1.65] max-w-[800px] mb-7">
        Forty years of dental healthtech tried to fix the visit from the outside in — the EMR, the PMS, the phone system, the patient acquisition layer. Every layer wrapped around the visit. None of them entered it.
      </p>
      <p className="font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.35] text-[#4FB3D9] italic max-w-[820px] pt-6 border-t border-[#4FB3D9]/30">
        Primary is the patient relationship layer. The thing nobody built. The thing that turns a 60-minute appointment into a year of care.
      </p>
    </Stage>
  )
}

function Beat31() {
  const items = [
    { status: "Live", headline: "The Brentwood flagship", detail: "Open. Operating. 500+ five-star patients on Google. Dr. Gabi's existing practice as the seed." },
    { status: "This quarter", headline: "The Primary iD launches", detail: "Five dimensions, fifty questions, real scoring, the personalized playbook. The consumer-facing wedge in market." },
    { status: "Confirmed", headline: "Mango as voice partner", detail: "16,000-practice distribution alongside the agentic build. Founder of Mango committed as first investor." },
    { status: "Onboarding", headline: "Virtual MD layer", detail: "First medical doctor joining the network this summer. Functional medicine background, scaled across the network." },
  ]
  return (
    <Stage>
      <Label>What's real today</Label>
      <h2 className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.08] font-normal tracking-[-0.02em] mb-10 max-w-[980px]">
        This isn't a deck. <em className="italic text-[#4FB3D9]">It's a working clinic.</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1100px]">
        {items.map((i) => (
          <div key={i.headline} className="bg-white/[0.04] border border-[#4FB3D9]/20 rounded-xl px-7 py-6">
            <span className="inline-block text-[10px] text-[#4FB3D9] tracking-[0.22em] uppercase font-semibold bg-[#4FB3D9]/12 px-2.5 py-1 rounded-full mb-3.5">
              {i.status}
            </span>
            <p className="font-serif text-[clamp(20px,2vw,26px)] text-[#F5F1E8] mb-2.5 leading-tight">{i.headline}</p>
            <p className="text-[14px] text-[#C0C8D4] leading-[1.6]">{i.detail}</p>
          </div>
        ))}
      </div>
    </Stage>
  )
}

function Beat32() {
  const team = [
    { name: "Dr. Tzur Gabi", role: "Clinical founder · Oral Physician", detail: "DMD. Functional Prosthodontist. 25 years of full-arch reconstruction. The clinical model is his life's work." },
    { name: "Farhad Attaie", role: "Ecosystem architect · Founder", detail: "Strategic architect across dental technology, media, and consumer brand. Building the agentic infrastructure end-to-end." },
    { name: "Founding engineer", role: "Joining at close · Round-funded", detail: "First full-time engineer. Owner of the agentic stack across iD, playbook, voice, scribe, and diagnostics integration." },
    { name: "Strategic advisors", role: "Operators & clinicians", detail: "Founders and operators from dental SaaS, primary care, and the longevity category. Pattern recognition as a foundational asset." },
  ]
  return (
    <Stage>
      <Label>The team</Label>
      <h2 className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.08] font-normal tracking-[-0.02em] mb-10 max-w-[980px]">
        The people <em className="italic text-[#4FB3D9]">building this.</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1100px]">
        {team.map((t) => (
          <div key={t.name} className="bg-white/[0.04] border-l-[3px] border-[#4FB3D9] rounded-r-xl px-7 py-5">
            <p className="font-serif text-[clamp(20px,2vw,26px)] text-[#F5F1E8] leading-tight mb-1">{t.name}</p>
            <p className="text-[13px] text-[#4FB3D9] tracking-wide mb-3">{t.role}</p>
            <p className="text-[14px] text-[#C0C8D4] leading-[1.6]">{t.detail}</p>
          </div>
        ))}
      </div>
    </Stage>
  )
}

// =====================================================
// BEATS 33-37 (Founding circle + ask + close)
// =====================================================

function Beat33() {
  return (
    <Stage justify="center">
      <Label>The founding circle</Label>
      <h2 className="font-serif text-[clamp(44px,6.4vw,80px)] leading-[1.06] font-normal tracking-[-0.025em] mb-9 max-w-[1100px]">
        We're not raising from people<br />who haven't <em className="italic text-[#4FB3D9]">lived this.</em>
      </h2>
      <p className="text-[clamp(17px,1.5vw,21px)] text-[#C0C8D4] leading-[1.65] max-w-[800px] mb-9">
        We're raising from operators who built the layer that's about to commoditize. Clinicians who've felt the chair from inside. Strategics whose pattern recognition is worth more than their check.
      </p>
      <p className="font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.35] text-[#4FB3D9] italic max-w-[800px]">
        The circle is small. The relationships are long. The bet is shared.
      </p>
    </Stage>
  )
}

function Beat34({ pcpAnswer }: { pcpAnswer: PCPAnswer }) {
  let recall: React.ReactNode = "You answered the question about your primary care doctor. Most patients walking into Primary haven't either, or it's been over a year."
  let resolve: React.ReactNode = (<em className="italic text-[#E8B5A3]">So we built the visit to do what their PCP didn't have time to.</em>)

  if (pcpAnswer === "Within six months") {
    recall = "You said you saw your PCP within the last six months. You're in the rare 30%."
    resolve = (<em className="italic text-[#E8B5A3]">Most of our patients couldn't say the same — so we built the visit to do what their PCP didn't have time to.</em>)
  } else if (pcpAnswer === "Within the year") {
    recall = "You said it's been within the year. That puts you ahead of most."
    resolve = (<em className="italic text-[#E8B5A3]">Most of our patients haven't been in over a year, or don't have one — so we built the visit to do what their PCP didn't have time to.</em>)
  } else if (pcpAnswer === "Over a year ago") {
    recall = "You said it's been over a year. You're not alone — most of our patients say the same."
    resolve = (<em className="italic text-[#E8B5A3]">So we built the visit to do what their PCP didn't have time to.</em>)
  } else if (pcpAnswer === "I don't have one") {
    recall = "You said you don't have a primary care doctor. A growing share of our patients say the same."
    resolve = (<em className="italic text-[#E8B5A3]">So we built the visit to be the one they finally have.</em>)
  }

  return (
    <Stage justify="center">
      <Label>Earlier, we asked you something</Label>
      <p className="text-[clamp(15px,1.3vw,18px)] text-[#8A9BB0] mb-7 max-w-[720px]">
        When you started this, we asked when you last saw your primary care doctor.
      </p>
      <p className="font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.25] tracking-[-0.015em] max-w-[1100px]">
        {recall} {resolve}
      </p>
    </Stage>
  )
}

function Beat35() {
  const items = [
    { label: "Founding engineer", detail: "First full-time hire. Owner of the agentic stack. Joins at close." },
    { label: "First 100 founding patients", detail: "The full agentic loop, end-to-end, on a real cohort. Outcomes data as the priced-round substrate." },
    { label: "The data substrate", detail: "12 months of real patient interaction with the iD, the playbook, and the visit. The thing that makes the priced round inevitable." },
  ]
  return (
    <Stage justify="center">
      <Label>The round</Label>
      <h2 className="font-serif text-[clamp(40px,5.6vw,72px)] leading-[1.1] font-normal tracking-[-0.025em] mb-12 max-w-[1100px]">
        $1M friends-and-family.<br /><em className="italic text-[#4FB3D9]">SAFE. Closes when the circle does.</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1100px] mb-8">
        {items.map((i) => (
          <div key={i.label} className="bg-[#4FB3D9]/[0.06] border border-[#4FB3D9]/25 rounded-xl px-6 py-6">
            <p className="font-serif text-[clamp(18px,1.7vw,22px)] text-[#4FB3D9] mb-3 leading-snug">{i.label}</p>
            <p className="text-[13px] text-[#C0C8D4] leading-[1.6]">{i.detail}</p>
          </div>
        ))}
      </div>
      <p className="font-serif text-[clamp(18px,1.7vw,22px)] leading-[1.5] text-[#C0C8D4] italic max-w-[880px] mt-4">
        Twelve months out, the loop is closed and the model is provable on outcomes — not promises.
      </p>
    </Stage>
  )
}

function Beat36() {
  return (
    <Stage>
      <p className="font-serif text-[clamp(48px,7vw,88px)] leading-[1.05] font-normal tracking-[-0.025em] text-[#F5F1E8] mb-8 max-w-[1100px]">
        If you're in this round,<br />you're also a <em className="italic text-[#4FB3D9]">founding patient.</em>
      </p>
      <p className="font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.4] text-[#C0C8D4] italic max-w-[720px]">
        Patient zero is Tzur. We hope one of the first hundred is you.
      </p>
    </Stage>
  )
}

function Beat37() {
  return (
    <Stage>
      <Label>Two ways forward</Label>
      <h2 className="font-serif text-[clamp(40px,5.6vw,72px)] leading-[1.1] font-normal tracking-[-0.025em] mb-8 max-w-[1100px]">
        Talk with us. Or take<br />the <em className="italic text-[#4FB3D9]">full Primary iD</em> yourself.
      </h2>
      <p className="text-[clamp(15px,1.3vw,18px)] text-[#C0C8D4] leading-[1.65] max-w-[720px] mb-10">
        Either path is a fine first move. The investor conversation gives you the strategic frame; the iD gives you the patient experience. Most founders end up doing both.
      </p>
      <div className="flex gap-3.5 flex-wrap">
        <button
          onClick={(e) => e.stopPropagation()}
          className="bg-[#4FB3D9] text-[#0F1B2D] px-7 py-4 rounded-lg text-[14px] font-semibold tracking-wide transition-all hover:bg-[#6BC4E5] hover:-translate-y-0.5"
        >
          Talk with Farhad and Tzur →
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="bg-transparent text-[#F5F1E8] border border-[#F5F1E8]/30 px-7 py-4 rounded-lg text-[14px] font-semibold tracking-wide transition-all hover:border-[#4FB3D9] hover:text-[#4FB3D9]"
        >
          Take the full Primary iD →
        </button>
      </div>
      <p className="mt-12 font-serif text-[clamp(16px,1.4vw,20px)] text-[#8A9BB0]">
        Primary <em className="italic text-[#4FB3D9]">iD.</em> The new front door.
      </p>
    </Stage>
  )
}
