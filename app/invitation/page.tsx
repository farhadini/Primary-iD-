"use client"
import { useState, useEffect } from "react"

// Ecosystem Visualization Component
function EcosystemVisualization() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [visibleNodes, setVisibleNodes] = useState<string[]>([])
  const [visibleConnections, setVisibleConnections] = useState<string[]>([])

  const nodes = [
    { id: "functional", label: "Functional Medicine", icon: "🩺", angle: 150, delay: 0 },
    { id: "chiro", label: "Chiropractic & PT", icon: "🦴", angle: 195, delay: 200 },
    { id: "nutrition", label: "Nutrition & Gut Health", icon: "🥗", angle: 240, delay: 400 },
    { id: "longevity", label: "Longevity & Optimization", icon: "⚡", angle: 270, delay: 600, isCenter: true },
    { id: "mindbody", label: "Mind-Body & Sleep", icon: "🧘", angle: 300, delay: 800 },
    { id: "wellness", label: "Wellness Brands", icon: "✨", angle: 345, delay: 1000 },
    { id: "dental", label: "Integrative Dentistry", icon: "🦷", angle: 30, delay: 1200 },
  ]

  // Animate nodes appearing one by one
  useEffect(() => {
    const timers = nodes.map((node, index) => {
      return setTimeout(
        () => {
          setVisibleNodes((prev) => [...prev, node.id])
        },
        300 + index * 200,
      )
    })

    // Start connection animations after nodes appear
    const connectionTimer = setTimeout(
      () => {
        setAnimationPhase(1)
      },
      300 + nodes.length * 200 + 500,
    )

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(connectionTimer)
    }
  }, [])

  // Animate connections drawing
  useEffect(() => {
    if (animationPhase === 1) {
      const connections = [
        "func-center",
        "chiro-center",
        "nutrition-center",
        "mindbody-center",
        "wellness-center",
        "dental-center",
      ]
      connections.forEach((conn, index) => {
        setTimeout(() => {
          setVisibleConnections((prev) => [...prev, conn])
        }, index * 150)
      })

      // Move to pulse phase
      setTimeout(
        () => {
          setAnimationPhase(2)
        },
        connections.length * 150 + 500,
      )
    }
  }, [animationPhase])

  const getNodePosition = (angle: number, radius = 180) => {
    const radian = (angle * Math.PI) / 180
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    }
  }

  return (
    <div className="relative h-[380px] sm:h-[400px] lg:h-[420px] flex items-center justify-center">
      {/* SVG for connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="-300 -300 600 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient for lines */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines from each node to center */}
        {nodes
          .filter((n) => !n.isCenter)
          .map((node, index) => {
            const pos = getNodePosition(node.angle)
            const isVisible = visibleConnections.includes(`${node.id.slice(0, 4)}-center`) || animationPhase >= 2

            return (
              <g key={`line-${node.id}`}>
                {/* Base line */}
                <line
                  x1={0}
                  y1={0}
                  x2={pos.x}
                  y2={pos.y}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
                  strokeDasharray={isVisible ? "none" : "300"}
                  strokeDashoffset={isVisible ? "0" : "300"}
                />

                {/* Animated pulse on line */}
                {animationPhase >= 2 && (
                  <circle r="4" fill="#22d3ee" filter="url(#glow)">
                    <animateMotion
                      dur={`${2 + index * 0.3}s`}
                      repeatCount="indefinite"
                      path={`M0,0 L${pos.x},${pos.y}`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      dur={`${2 + index * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            )
          })}

        {/* Orbital rings */}
        <circle
          cx="0"
          cy="0"
          r="180"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="opacity-50"
        />
        <circle
          cx="0"
          cy="0"
          r="120"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="opacity-30"
        />
      </svg>

      {/* Center Node - Shared Values */}
      <div
        className={`absolute z-20 flex flex-col items-center transition-all duration-700 ${
          visibleNodes.includes("longevity") ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="relative">
          {/* Pulse rings */}
          <div
            className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cyan-500 opacity-20 animate-ping"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cyan-500 opacity-10 animate-ping"
            style={{ animationDuration: "3s", animationDelay: "1s" }}
          />

          {/* Main circle */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl">⚡</span>
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Connected by</p>
          <p className="font-semibold text-slate-700">Shared Values</p>
        </div>
      </div>

      {/* Outer Nodes */}
      {nodes
        .filter((n) => !n.isCenter)
        .map((node) => {
          const pos = getNodePosition(node.angle)
          const isVisible = visibleNodes.includes(node.id)
          const isActive = activeNode === node.id

          return (
            <div
              key={node.id}
              className={`absolute z-10 flex flex-col items-center transition-all duration-500 cursor-pointer ${
                isVisible ? "opacity-100" : "opacity-0"
              } ${isActive ? "scale-110" : "scale-100"}`}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) ${isActive ? "scale(1.1)" : "scale(1)"}`,
                transitionDelay: isVisible ? "0ms" : `${node.delay}ms`,
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-lg border-2 flex items-center justify-center transition-all duration-300 ${
                  isActive ? "border-cyan-500 shadow-cyan-500/20" : "border-gray-100"
                }`}
              >
                <span className="text-xl sm:text-2xl">{node.icon}</span>
              </div>
              <p
                className={`mt-2 text-xs sm:text-sm font-medium text-center max-w-[100px] transition-colors duration-300 ${
                  isActive ? "text-cyan-600" : "text-slate-600"
                }`}
              >
                {node.label}
              </p>
            </div>
          )
        })}
    </div>
  )
}

export default function PrimaryInvitationPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src="/images/primary-20brand-20-20logo-20.png" alt="Primary" className="h-16" />
          </a>
          <a
            href="#apply"
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-sky-500 transition-colors"
          >
            Accept Invitation
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-32 pb-24 px-6 bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(14,165,233,0.05),transparent_50%),radial-gradient(circle_at_90%_10%,rgba(16,185,129,0.05),transparent_50%)]" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-full shadow-sm mb-8">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-slate-700">Limited to 100 Practitioners</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-slate-900 mb-6">
              An invitation to experience dentistry in a whole <em className="italic text-emerald-600">new way.</em>
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed max-w-xl mb-10">
              You care for others every day. Now experience the care you deserve, and become part of a collaborative
              ecosystem redefining how practitioners work together in Los Angeles.
            </p>

            <div className="flex items-center gap-8 mb-6 pt-6 border-t border-slate-200">
              <div>
                <div className="font-serif text-3xl text-slate-900">37</div>
                <div className="text-sm text-slate-500">Spots remaining</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-slate-900">$1,247</div>
                <div className="text-sm text-slate-500">Value included</div>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center gap-3 mb-10">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-white" />
              </div>
              <span className="text-sm text-slate-600">Join 37 LA-based practitioners</span>
            </div>

            <a
              href="#apply"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-sky-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/25 transition-all"
            >
              Accept This Invitation
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div>
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50">
              {isVideoPlaying ? (
                <div className="aspect-video bg-white rounded-2xl overflow-hidden relative">
                  <video
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captions_376A7A-8qVnXcHtVEodlJXKlUJFqfnSzUp0xH.mov"
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    onEnded={() => setIsVideoPlaying(false)}
                  />
                </div>
              ) : (
                <>
                  <div className="aspect-video bg-white rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(14,165,233,0.1),transparent_50%)]" />
                    <button
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform relative z-10 shadow-xl"
                    >
                      <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </button>
                    <span className="mt-4 text-sm text-slate-600 relative z-10">
                      Watch Dr. Gabi's Message to You 90 Seconds ...
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dr. Gabi Message Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[280px_1fr] gap-16 items-start">
          <div className="md:sticky md:top-32">
            <div className="relative">
              <div className="absolute -top-2 -left-2 right-2 bottom-2 border border-sky-500/30 rounded-2xl" />
              <div className="aspect-[3/4] bg-gradient-to-br from-sky-50 to-emerald-50 rounded-2xl overflow-hidden">
                <img src="/images/image.png" alt="Dr. Tzur Gabi" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="mt-5 text-center">
              <div className="font-semibold text-slate-900">Dr. Tzur Gabi</div>
              <div className="text-xs text-slate-600 mb-1">Functional Prostodontist, Oral Physician</div>
              <div className="text-sm text-slate-500">Founder, Primary</div>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-sky-500" />
              <span className="text-xs font-semibold tracking-widest uppercase text-sky-500">A Personal Note</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-normal text-slate-900 mb-8">
              Why I'm reaching out to you
            </h2>

            <div className="space-y-6 text-lg text-slate-500 leading-relaxed">
              <p>
                Most practitioners I know have never had someone look at their health the way they look at their
                patients'.
              </p>
              <p>
                The mouth is a window to systemic health: inflammation, airway dysfunction, immune load, sleep quality.
                Yet it's rarely examined with the depth it deserves.
              </p>
              <p>
                I built Primary in Los Angeles for people who want to understand what's actually happening in their body.
                I believe the practitioners who dedicate their lives to helping others deserve that same level of care.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200">
              <span className="font-serif text-xl italic text-slate-900">— Dr. Gabi</span>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building - Ecosystem Section with Animations */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-cyan-500" />
              <p className="text-cyan-500 text-sm font-semibold tracking-widest uppercase">The Vision</p>
              <div className="h-px w-8 bg-cyan-500" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              An integrated ecosystem of wellbeing, <span className="text-cyan-500">starting in Los Angeles.</span>
            </h2>

            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              We're bringing together the most aligned practitioners across disciplines: functional medicine,
              integrative health, wellness, and dental care, into a trusted, collaborative network. Not a hierarchy. A
              collective.
            </p>
          </div>

          {/* Animated Ecosystem Visualization */}
          <EcosystemVisualization />

          {/* Bottom CTA */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">You're invited to be among the first.</p>
          </div>
        </div>
      </section>

      {/* More Than An Offer Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-50/50 via-white to-sky-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.03),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.03),transparent_50%)]" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-sky-500" />
              <span className="text-xs font-semibold tracking-widest uppercase text-sky-500">More Than An Offer</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-slate-900 mb-7">
              This is not a promotion. It's the beginning of something <em className="italic text-emerald-600">new.</em>
            </h2>

            <p className="text-lg text-slate-500 leading-relaxed max-w-md mb-7">
              We are quietly forming the world's first oral-systemic ecosystem. A trusted circle of clinicians who
              understand that the mouth is not separate from the body, and that healthcare works best when it is
              collaborative, preventive, and human.
            </p>

            <div className="p-4 bg-slate-900/5 border-l-3 border-sky-500 text-sm text-slate-700 italic mb-10">
              We're not selling anything. We're building something together.
            </div>

            <div className="flex items-center gap-4 pt-8 border-t border-slate-200">
              <img
                src="/images/image.png"
                alt="Dr. Tzur Gabi"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-500/20"
              />
              <div>
                <div className="font-semibold text-slate-900">Dr. Tzur Gabi</div>
                <div className="text-sm text-slate-500">Founder, Primary Integrative Dentistry</div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-xl shadow-slate-200/50 relative">
              <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-b" />

              <div className="text-xs font-semibold text-white/50 tracking-wide mb-8">Those invited in will:</div>

              <div className="space-y-7">
                {[
                  {
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-5 h-5 text-sky-500"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    ),
                    title: "Experience It First",
                    description: "Be among the first practitioners to experience oral-systemic care firsthand",
                  },
                  {
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-5 h-5 text-sky-500"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    ),
                    title: "Enter the Circle",
                    description: "Access to future education, conversations, and collaborations",
                  },
                  {
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-5 h-5 text-sky-500"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    ),
                    title: "Shape the Movement",
                    description: "Join a growing ecosystem redefining how patients are seen, referred, and supported",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 pb-7 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/10 to-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 p-5 bg-emerald-500/10 rounded-xl text-center text-sm text-slate-700 italic">
                This is how movements start. Quietly, intentionally, with the right people.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary iD Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase text-sky-500 mb-5">
              Your Oral-Systemic Health, Reimagined
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-slate-900 mb-5">
              We look at what others miss.
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Primary iD is a comprehensive assessment across five dimensions of health, providing a personalized
              snapshot that informs a treatment plan tailored to you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Panel - Dimensions Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-10">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                  <span className="px-3 py-1 bg-sky-500/10 rounded-full text-xs font-semibold text-sky-600 tracking-wide">
                    PRIMARY iD
                  </span>
                  <span className="text-sm text-slate-400">Five Dimensions of Health</span>
                </div>

                {[
                  {
                    name: "Oral Health",
                    desc: "Inflammation, infection, structural issues",
                    status: "Review",
                    color: "sky",
                  },
                  {
                    name: "Sleep & Airway",
                    desc: "Breathing patterns, sleep quality",
                    status: "Average",
                    color: "amber",
                  },
                  { name: "Nutrition", desc: "Dietary impact on health", status: "Optimal", color: "emerald" },
                  {
                    name: "Genetics & Microbiome",
                    desc: "Your biological blueprint",
                    status: "Optimal",
                    color: "emerald",
                  },
                  { name: "Lifestyle", desc: "Stress, habits, daily patterns", status: "Average", color: "amber" },
                ].map((dim, i) => (
                  <div key={i} className="flex items-center gap-4 py-3.5 border-b border-slate-100 last:border-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        dim.color === "sky"
                          ? "bg-sky-500/10"
                          : dim.color === "emerald"
                            ? "bg-emerald-500/10"
                            : "bg-amber-500/10"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          dim.color === "sky"
                            ? "bg-sky-500"
                            : dim.color === "emerald"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-slate-900">{dim.name}</div>
                      <div className="text-xs text-slate-500">{dim.desc}</div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        dim.status === "Optimal"
                          ? "bg-emerald-500/10 text-emerald-700"
                          : dim.status === "Average"
                            ? "bg-amber-500/10 text-amber-700"
                            : "bg-sky-500/10 text-sky-700"
                      }`}
                    >
                      {dim.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right Panel - Description */}
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-6">
                Five dimensions. One complete picture.
              </h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                Unlike traditional dental exams that focus only on teeth and gums, Primary iD examines the interconnected
                systems that determine your overall health.
              </p>

              <div className="space-y-5">
                {[
                  {
                    title: "Advanced Diagnostics",
                    desc: "3D CBCT imaging, salivary diagnostics, and genetic testing",
                  },
                  {
                    title: "Personalized Protocol",
                    desc: "Treatment recommendations tailored to your unique biology",
                  },
                  {
                    title: "Systemic Connection",
                    desc: "Understanding how oral health impacts your whole body",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-900 mb-1">{item.title}</h5>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Section */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(14,165,233,0.1),transparent_60%)]" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-5">
              Our Wellness Partners
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-5">
              We've partnered with the best wellbeing brands to optimize your oral-systemic appointment.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {/* Featured Card */}
            <div className="md:col-span-2 p-7 bg-gradient-to-br from-sky-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-slate-900 text-sm shrink-0">
                  PiD
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Primary iD Assessment</h4>
                  <p className="text-sm text-white/60">
                    Comprehensive assessment across five dimensions: Oral Health, Sleep & Airway, Nutrition, Genetics &
                    Microbiome, and Lifestyle.
                  </p>
                </div>
              </div>
            </div>

            {[
              {
                logo: "/images/superpower.png",
                name: "Superpower Health Optimization",
                desc: "Full metabolic panel with personalized optimization protocol.",
              },
              {
                logo: "/images/viome-logo.png",
                name: "Viome Gut Intelligence",
                desc: "At-home microbiome testing with personalized nutrition recommendations.",
              },
              {
                logo: "/images/open-20logo-20.png",
                name: "Open Meditation",
                desc: "12-month premium subscription for stress reduction and mindfulness.",
              },
              {
                logo: "/images/guru-nanda-logo.png",
                name: "Curated Oral Wellness Kit",
                desc: "Premium products selected to support your oral health journey.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-7 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-sky-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-12 bg-white rounded-xl flex items-center justify-center p-2 shrink-0">
                    <img src={item.logo || "/placeholder.svg"} alt={item.name} className="h-8 w-auto object-contain" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{item.name}</h4>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-8 bg-white/5 rounded-2xl">
            <div className="text-lg font-semibold text-emerald-400 mb-4">37 of 100 Founding Spots Remain</div>
            <a
              href="#apply"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-emerald-400 transition-colors shadow-lg shadow-white/20"
            >
              Yes, I'm In
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Reimagined Visit / Oral-Systemic Section */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Panel - Philosophy & Dimensions */}
            <div className="bg-slate-50 rounded-3xl p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-px bg-sky-500" />
                <span className="text-xs font-semibold tracking-widest uppercase text-sky-500">
                  The Primary Approach
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl font-normal text-slate-900 mb-8 leading-tight">
                We've reimagined the new patient visit.
              </h2>

              <div className="space-y-5 text-slate-600 leading-relaxed mb-12">
                <p>
                  We've been pioneering the future of oral-systemic dentistry and integrative healthcare, developing an
                  innovative vision of what it means to be truly healthy.
                </p>
                <p>
                  We've studied and created advanced protocols. We're partnering with the most forward-thinking brands
                  and technologies. And we're building a trust-based wellbeing practitioner network.
                </p>
                <p className="text-slate-500 text-sm">
                  Backed by science, cutting-edge technology, and a renowned multidisciplinary team, we treat from the
                  inside out.
                </p>
              </div>

              {/* Animated Dimensions Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
                  <span className="px-2.5 py-1 bg-sky-500/10 rounded-full text-[10px] font-bold text-sky-600 tracking-wider">
                    PRIMARY iD
                  </span>
                  <span className="text-xs text-slate-400">Five Dimensions of Health</span>
                </div>

                <div className="space-y-0">
                  {[
                    { name: "Genetic Testing + Oral Microbiome", delay: "0s" },
                    { name: "Nutrition Analysis", delay: "0.15s" },
                    { name: "Dental + Oral Assessment", delay: "0.3s" },
                    { name: "Sleep & Lifestyle", delay: "0.45s" },
                    { name: "Myofunctional & Airway Health", delay: "0.6s" },
                  ].map((dim, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 group animate-fadeIn opacity-0"
                      style={{
                        animationDelay: dim.delay,
                        animationFillMode: "forwards",
                      }}
                    >
                      <div className="flex-1">
                        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                          {dim.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-16 h-px bg-gradient-to-r from-transparent via-sky-300 to-sky-500 animate-expandLine origin-right"
                          style={{ animationDelay: dim.delay }}
                        />
                        <div
                          className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse shadow-lg shadow-sky-500/50"
                          style={{ animationDelay: dim.delay }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Live Visualization */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden h-[700px] lg:h-full min-h-[600px]">
              {/* Animated background layers */}
              <div
                className="absolute inset-0 opacity-50 animate-gradientShift"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom right, rgba(14,165,233,0.2) 0%, rgba(16,185,129,0.2) 100%)",
                }}
              />

              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat animate-slowZoom"
                style={{
                  backgroundImage: `url('/images/untitled-20-28250-20x-20250-20px-29-20-281-29.png')`,
                  backgroundPosition: "center center",
                  transform: "scale(0.85)",
                }}
              />

              <div className="absolute top-[48%] left-[28%] w-4 h-4">
                <div className="absolute inset-0 bg-sky-400 rounded-full animate-ping opacity-75" />
                <div className="absolute inset-1 bg-sky-500 rounded-full" />
              </div>

              <div className="absolute top-[52%] left-[42%] w-3 h-3">
                <div
                  className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "0.5s" }}
                />
                <div className="absolute inset-0.5 bg-emerald-500 rounded-full" />
              </div>

              <div className="absolute top-[62%] left-[35%] w-3 h-3">
                <div
                  className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75"
                  style={{ animationDelay: "1s" }}
                />
                <div className="absolute inset-0.5 bg-amber-500 rounded-full" />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/10" />

              {/* Floating info badge with hover animation */}
              <div className="absolute bottom-8 left-8 right-8 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center animate-pulse">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Oral-Systemic Connection</div>
                      <div className="text-xs text-slate-500">Mouth · Brain · Spine · Body</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-6 right-6">
                <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-sky-600 tracking-wider shadow-lg">
                  LIVE VISUALIZATION
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-sky-500 mb-5">Is This For You?</div>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-slate-900 mb-8">
              This invitation is for practitioners who:
            </h2>

            <div className="space-y-5">
              {[
                "See health as a system, not symptoms",
                "Want to experience care at the level they provide",
                "Believe prevention beats intervention",
                "Are curious about the oral-systemic connection",
                "Value depth over convenience",
                "Are open to being part of a collaborative ecosystem",
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500/10 to-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-10 relative">
            <div className="font-serif text-8xl text-sky-500/10 absolute top-6 left-8 leading-none">"</div>
            <blockquote className="font-serif text-2xl italic text-slate-900 leading-relaxed mb-8 relative">
              It would be an honor to explore what's possible together.
            </blockquote>
            <div className="flex items-center gap-4">
              <img
                src="/images/image.png"
                alt="Dr. Tzur Gabi"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-sky-500/20"
              />
              <div>
                <div className="font-semibold text-slate-900">Dr. Tzur Gabi</div>
                <div className="text-sm text-slate-500">Founder, Primary Integrative Dentistry</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="apply" className="py-24 px-6 bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/30">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-xs font-semibold tracking-widest uppercase text-sky-500 mb-5">Begin Your Journey</div>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-slate-900 mb-4">Accept This Invitation</h2>
          <p className="text-lg text-slate-500 mb-10">Only 37 spots remaining</p>

          <div className="bg-white rounded-3xl p-10 shadow-xl shadow-slate-200/50">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="block text-sm font-semibold text-slate-600 mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="Your first name"
                    className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition-all"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Your last name"
                    className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition-all"
                  />
                </div>
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold text-slate-600 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition-all"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold text-slate-600 mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-sky-500 transition-colors mt-6"
              >
                Yes, I'm In
              </button>
            </form>
            <p className="text-sm text-slate-500 mt-5">We'll reach out within 24 hours</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-900 text-center">
        <div className="font-semibold text-white text-lg mb-4">Primary</div>
        <div className="text-sm text-white/50 mb-6">11980 San Vicente Blvd #902 · Los Angeles, CA 90049</div>
        <div className="text-xs text-white/30">© 2025 Primary Integrative Dentistry</div>
      </footer>
    </div>
  )
}
