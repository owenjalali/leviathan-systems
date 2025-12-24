import { Link } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Calendar, RefreshCw, PhoneMissed, Clock, ClipboardList, AlertTriangle, Bot, Workflow, Plug, Settings, X, Check, Zap } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useRef } from 'react'

// Floating particles component
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
            opacity: 0.3 + Math.random() * 0.4
          }}
        />
      ))}
    </div>
  )
}

// Multi-layer ocean wave component with Leviathan
function OceanWaves() {
  return (
    <div className="wave-container">
      {/* Back wave - slowest, most transparent */}
      <svg className="wave-layer-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 C1150,90 1200,60 1200,60 L1200,120 L0,120 Z"
          fill="rgba(0, 255, 247, 0.08)"
        />
      </svg>

      {/* Middle wave - medium speed */}
      <svg className="wave-layer-2" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,80 C200,50 400,100 600,70 C800,40 1000,90 1200,60 L1200,120 L0,120 Z"
          fill="rgba(0, 255, 247, 0.06)"
        />
      </svg>

      {/* THE LEVIATHAN - MULTI-HEADED HYDRA */}
      <div className="leviathan-container">
        <svg className="leviathan" viewBox="0 0 280 140" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Strong glow filter */}
            <filter id="leviathan-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Body gradient */}
            <linearGradient id="leviathan-body-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a3a5c"/>
              <stop offset="50%" stopColor="#0d2847"/>
              <stop offset="100%" stopColor="#0a1628"/>
            </linearGradient>
            {/* Head gradient - darker, more menacing */}
            <linearGradient id="head-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e4a6d"/>
              <stop offset="100%" stopColor="#0a1628"/>
            </linearGradient>
            {/* Cyan edge glow */}
            <linearGradient id="leviathan-edge-glow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00fff7" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#00fff7" stopOpacity="0.3"/>
            </linearGradient>
          </defs>

          <g filter="url(#leviathan-glow)">
            {/* === MAIN BODY === */}
            {/* Body outer glow */}
            <path
              d="M260,130 Q200,120 150,100 Q100,80 60,90 Q30,95 10,110"
              fill="none"
              stroke="#00fff7"
              strokeWidth="28"
              strokeLinecap="round"
              opacity="0.2"
            />
            {/* Main thick body */}
            <path
              d="M260,130 Q200,120 150,100 Q100,80 60,90 Q30,95 10,110"
              fill="none"
              stroke="url(#leviathan-body-gradient)"
              strokeWidth="22"
              strokeLinecap="round"
            />
            {/* Body highlight */}
            <path
              d="M260,130 Q200,120 150,100 Q100,80 60,90 Q30,95 10,110"
              fill="none"
              stroke="#1e4a6d"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* === NECK SPLITS INTO HEADS === */}

            {/* CENTER HEAD - Main, largest */}
            <path
              d="M60,90 Q45,60 35,35 Q30,20 20,10"
              fill="none"
              stroke="url(#leviathan-body-gradient)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M60,90 Q45,60 35,35 Q30,20 20,10"
              fill="none"
              stroke="#1e4a6d"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Center head shape */}
            <ellipse cx="18" cy="8" rx="12" ry="8" fill="url(#head-gradient)" />
            <ellipse cx="18" cy="8" rx="10" ry="6" fill="#1e4a6d" />
            {/* Center head eye */}
            <ellipse cx="12" cy="6" rx="4" ry="3" fill="#00fff7" className="leviathan-eye"/>
            <ellipse cx="11" cy="5" rx="2" ry="1.5" fill="#fff"/>
            {/* Center head fangs */}
            <path d="M8,14 L6,20" stroke="#00fff7" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
            <path d="M14,15 L13,22" stroke="#00fff7" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
            <path d="M20,14 L22,19" stroke="#00fff7" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
            {/* Center jaw line */}
            <path d="M6,12 Q12,16 24,10" fill="none" stroke="#00fff7" strokeWidth="1" opacity="0.6"/>

            {/* LEFT HEAD - Slightly smaller */}
            <path
              d="M70,85 Q55,55 30,40 Q15,32 -5,28"
              fill="none"
              stroke="url(#leviathan-body-gradient)"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M70,85 Q55,55 30,40 Q15,32 -5,28"
              fill="none"
              stroke="#1e4a6d"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Left head shape */}
            <ellipse cx="-8" cy="26" rx="10" ry="7" fill="url(#head-gradient)" transform="rotate(-15, -8, 26)"/>
            <ellipse cx="-8" cy="26" rx="8" ry="5" fill="#1e4a6d" transform="rotate(-15, -8, 26)"/>
            {/* Left head eye */}
            <ellipse cx="-12" cy="23" rx="3.5" ry="2.5" fill="#00fff7" className="leviathan-eye"/>
            <ellipse cx="-13" cy="22" rx="1.5" ry="1" fill="#fff"/>
            {/* Left head fangs */}
            <path d="M-16,30 L-20,36" stroke="#00fff7" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
            <path d="M-10,32 L-11,38" stroke="#00fff7" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>

            {/* RIGHT HEAD - Slightly smaller */}
            <path
              d="M55,95 Q40,70 50,45 Q55,30 65,15"
              fill="none"
              stroke="url(#leviathan-body-gradient)"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M55,95 Q40,70 50,45 Q55,30 65,15"
              fill="none"
              stroke="#1e4a6d"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Right head shape */}
            <ellipse cx="67" cy="12" rx="10" ry="7" fill="url(#head-gradient)" transform="rotate(20, 67, 12)"/>
            <ellipse cx="67" cy="12" rx="8" ry="5" fill="#1e4a6d" transform="rotate(20, 67, 12)"/>
            {/* Right head eye */}
            <ellipse cx="62" cy="9" rx="3.5" ry="2.5" fill="#00fff7" className="leviathan-eye"/>
            <ellipse cx="61" cy="8" rx="1.5" ry="1" fill="#fff"/>
            {/* Right head fangs */}
            <path d="M72,18 L78,22" stroke="#00fff7" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
            <path d="M68,20 L70,27" stroke="#00fff7" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>

            {/* FAR RIGHT HEAD - Smallest, emerging */}
            <path
              d="M80,92 Q85,70 95,50 Q105,35 115,25"
              fill="none"
              stroke="url(#leviathan-body-gradient)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M80,92 Q85,70 95,50 Q105,35 115,25"
              fill="none"
              stroke="#1e4a6d"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Far right head shape */}
            <ellipse cx="118" cy="22" rx="8" ry="6" fill="url(#head-gradient)" transform="rotate(35, 118, 22)"/>
            <ellipse cx="118" cy="22" rx="6" ry="4" fill="#1e4a6d" transform="rotate(35, 118, 22)"/>
            {/* Far right head eye */}
            <ellipse cx="114" cy="19" rx="3" ry="2" fill="#00fff7" className="leviathan-eye"/>
            <ellipse cx="113" cy="18" rx="1.2" ry="0.8" fill="#fff"/>
            {/* Far right head fangs */}
            <path d="M122,27 L128,30" stroke="#00fff7" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>

            {/* === DORSAL SPINES along body === */}
            <path d="M240,118 L245,105 L250,120" fill="none" stroke="#00fff7" strokeWidth="2" opacity="0.7"/>
            <path d="M210,112 L218,98 L226,115" fill="none" stroke="#00fff7" strokeWidth="2.5" opacity="0.8"/>
            <path d="M180,105 L190,88 L200,108" fill="none" stroke="#00fff7" strokeWidth="3" opacity="0.9"/>
            <path d="M150,98 L162,80 L174,102" fill="none" stroke="#00fff7" strokeWidth="3" opacity="1"/>
            <path d="M120,92 L130,76 L140,96" fill="none" stroke="#00fff7" strokeWidth="2.5" opacity="0.9"/>
            <path d="M95,88 L103,74 L111,92" fill="none" stroke="#00fff7" strokeWidth="2" opacity="0.8"/>

            {/* === BIOLUMINESCENT SPOTS === */}
            {/* Along body */}
            <circle cx="230" cy="125" r="4" fill="#00fff7" opacity="0.9" className="bio-pulse"/>
            <circle cx="195" cy="115" r="5" fill="#00fff7" opacity="1" className="bio-pulse-delay-1"/>
            <circle cx="160" cy="102" r="5" fill="#00fff7" opacity="1" className="bio-pulse-delay-2"/>
            <circle cx="125" cy="92" r="4" fill="#00fff7" opacity="0.9" className="bio-pulse"/>
            <circle cx="90" cy="88" r="4" fill="#00fff7" opacity="0.9" className="bio-pulse-delay-1"/>

            {/* On necks */}
            <circle cx="50" cy="65" r="3" fill="#00fff7" opacity="0.8" className="bio-pulse-delay-2"/>
            <circle cx="38" cy="48" r="2.5" fill="#00fff7" opacity="0.8" className="bio-pulse"/>
            <circle cx="55" cy="55" r="2" fill="#00fff7" opacity="0.7" className="bio-pulse-delay-1"/>
            <circle cx="75" cy="60" r="2.5" fill="#00fff7" opacity="0.8" className="bio-pulse-delay-2"/>
            <circle cx="95" cy="55" r="2" fill="#00fff7" opacity="0.7" className="bio-pulse"/>

            {/* === ARMORED SCALES pattern === */}
            <path d="M200,110 Q205,115 210,110" fill="none" stroke="#00fff7" strokeWidth="0.8" opacity="0.4"/>
            <path d="M170,100 Q175,105 180,100" fill="none" stroke="#00fff7" strokeWidth="0.8" opacity="0.4"/>
            <path d="M140,94 Q145,99 150,94" fill="none" stroke="#00fff7" strokeWidth="0.8" opacity="0.4"/>
            <path d="M110,90 Q115,95 120,90" fill="none" stroke="#00fff7" strokeWidth="0.8" opacity="0.4"/>

            {/* === TAIL END with fin === */}
            <path
              d="M260,130 Q275,125 285,135 Q280,140 270,138 Q265,132 260,130"
              fill="url(#head-gradient)"
              stroke="#00fff7"
              strokeWidth="1"
              opacity="0.8"
            />
          </g>
        </svg>

        {/* Water splash effects */}
        <div className="splash splash-entry"></div>
        <div className="splash splash-exit"></div>
      </div>

      {/* Front wave - fastest, most visible */}
      <svg className="wave-layer-3" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,90 C100,70 300,100 450,85 C600,70 750,95 900,80 C1050,65 1150,90 1200,85 L1200,120 L0,120 Z"
          fill="rgba(0, 255, 247, 0.12)"
        />
        {/* Glow effect on wave crest */}
        <path
          d="M0,90 C100,70 300,100 450,85 C600,70 750,95 900,80 C1050,65 1150,90 1200,85"
          fill="none"
          stroke="rgba(0, 255, 247, 0.4)"
          strokeWidth="2"
          style={{ filter: 'blur(2px)' }}
        />
      </svg>

      {/* Glowing line at bottom */}
      <div className="wave-glow" />
    </div>
  )
}

export default function Home() {
  const [problemRef, problemVisible] = useScrollAnimation(0.15)
  const [buildRef, buildVisible] = useScrollAnimation(0.15)
  const [clarityRef, clarityVisible] = useScrollAnimation(0.15)
  const [outcomesRef, outcomesVisible] = useScrollAnimation(0.15)
  const [processRef, processVisible] = useScrollAnimation(0.15)
  const [fitRef, fitVisible] = useScrollAnimation(0.15)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.15)

  return (
    <div className="bg-[#050510] noise-overlay">
      <FloatingParticles />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute inset-0 -z-10">
          <div className="orb-glow absolute top-1/4 left-1/4 w-[500px] h-[500px]" />
          <div className="orb-purple absolute bottom-1/4 right-1/4 w-[400px] h-[400px]" />
          <div className="orb-glow absolute top-1/2 right-1/3 w-[300px] h-[300px]" style={{ animationDelay: '-2s' }} />
        </div>

        <div className="mx-auto max-w-5xl px-6 py-32 text-center relative z-10">
          {/* Badge */}
          <div className="hero-cta mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00fff7]/10 border border-[#00fff7]/30 text-[#00fff7] text-xs font-medium tracking-widest uppercase">
              <Zap className="w-3 h-3" />
              Leviathan Systems
            </span>
          </div>

          <h1 className="hero-title text-5xl sm:text-6xl lg:text-8xl font-bold text-[#e8ecf0] leading-[1.05] mb-8 tracking-tight">
            Stop losing leads
            <br />
            <span className="text-gradient-ocean">when you're busy.</span>
          </h1>

          <p className="hero-subtitle text-xl sm:text-2xl text-[#8899a6] max-w-2xl mx-auto leading-relaxed mb-12">
            We build automation systems that answer, qualify, and book—so revenue
            doesn't depend on someone picking up the phone.
          </p>

          {/* Proof chips */}
          <div className="hero-cta flex flex-wrap justify-center gap-3 mb-12">
            {['24/7 response', 'Fewer missed leads', 'Automatic booking', 'CRM stays updated'].map((chip, i) => (
              <span
                key={chip}
                className="tag-ocean px-5 py-2.5 text-sm font-medium"
                style={{ animationDelay: `${0.6 + i * 0.1}s` }}
              >
                {chip}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/begin"
              className="btn-glow group inline-flex items-center gap-3 px-10 py-5 text-lg"
            >
              See if we're a fit
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="btn-outline-glow inline-flex items-center gap-2 px-8 py-4 text-base"
            >
              View what we build
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#00fff7]/50 to-transparent" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* Multi-layer ocean waves */}
      <OceanWaves />

      {/* THE PROBLEM */}
      <section className="py-28 section-depth section-glow-border relative">
        <div
          ref={problemRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-[1500ms] ${
            problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.3em] uppercase text-[#00fff7] bg-[#00fff7]/10 rounded-full border border-[#00fff7]/20">
              The Problem
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-[#e8ecf0] mb-6">
              Leads don't wait.
            </h2>
            <p className="text-[#8899a6] text-xl max-w-xl mx-auto">
              While you're busy running your business, opportunities slip away.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {[
              { icon: PhoneMissed, text: "You miss calls while you're on the job." },
              { icon: Clock, text: "Slow follow-up kills conversions." },
              { icon: ClipboardList, text: "Admin work steals time from real work." },
              { icon: AlertTriangle, text: "CRM and calendar fall out of sync." }
            ].map((item, i) => (
              <div
                key={item.text}
                className="card-abyss group p-6"
                style={{
                  transitionDelay: problemVisible ? `${i * 100}ms` : '0ms',
                  opacity: problemVisible ? 1 : 0,
                  transform: problemVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="flex items-start gap-5">
                  <div className="icon-orb w-14 h-14 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-[#00fff7]" />
                  </div>
                  <p className="text-[#8899a6] text-lg pt-3 group-hover:text-[#e8ecf0] transition-colors">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-center text-2xl text-[#e8ecf0] font-semibold glow-text transition-all duration-700"
            style={{
              transitionDelay: problemVisible ? '400ms' : '0ms',
              opacity: problemVisible ? 1 : 0
            }}
          >
            Every gap is <span className="text-[#f87171]">money gone</span>.
          </p>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-28 bg-[#0a1628]/50 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="orb-glow absolute top-0 right-1/4 w-[400px] h-[400px]" />
        </div>

        <div
          ref={buildRef}
          className={`mx-auto max-w-6xl px-6 relative z-10 transition-all duration-[1500ms] ${
            buildVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.3em] uppercase text-[#00fff7] bg-[#00fff7]/10 rounded-full border border-[#00fff7]/20">
              What We Build
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-[#e8ecf0] mb-6">
              Automation systems for revenue.
            </h2>

            <p className="text-[#8899a6] text-xl max-w-2xl mx-auto">
              Custom-built for your workflow. Not a template.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Phone, label: 'Inbound call handling' },
              { icon: MessageSquare, label: 'Web chat + SMS' },
              { icon: Bot, label: 'Lead qualification' },
              { icon: Calendar, label: 'Appointment scheduling' },
              { icon: RefreshCw, label: 'Follow-up sequences' },
              { icon: Plug, label: 'CRM integration' },
              { icon: Workflow, label: 'Pipeline automation' },
              { icon: Settings, label: 'Notifications + handoffs' }
            ].map((item, i) => (
              <div
                key={item.label}
                className="card-abyss group p-6 text-center cursor-default"
                style={{
                  transitionDelay: buildVisible ? `${i * 60}ms` : '0ms',
                  opacity: buildVisible ? 1 : 0,
                  transform: buildVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
                }}
              >
                <div className="icon-orb w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-[#00fff7]" />
                </div>
                <p className="text-[#8899a6] text-sm group-hover:text-[#e8ecf0] transition-colors">{item.label}</p>
              </div>
            ))}
          </div>

          <div
            className="text-center mt-14 transition-all duration-500"
            style={{
              transitionDelay: buildVisible ? '600ms' : '0ms',
              opacity: buildVisible ? 1 : 0
            }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#00fff7] hover:text-[#4ade80] transition-colors duration-300 font-medium"
            >
              See the full list
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CLARITY */}
      <section className="py-28 section-glow-border relative">
        <div
          ref={clarityRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-[1500ms] ${
            clarityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.3em] uppercase text-[#00fff7] bg-[#00fff7]/10 rounded-full border border-[#00fff7]/20">
              Clarity
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-[#e8ecf0] mb-6">
              We're an automation agency.
            </h2>
            <p className="text-[#8899a6] text-xl max-w-xl mx-auto">
              Here's exactly what that means.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* We Are */}
            <div
              className="card-abyss p-8 border-[#00fff7]/30"
              style={{
                transitionDelay: clarityVisible ? '200ms' : '0ms',
                opacity: clarityVisible ? 1 : 0,
                transform: clarityVisible ? 'translateX(0)' : 'translateX(-30px)'
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="icon-orb w-12 h-12 flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#00fff7]" />
                </div>
                <h3 className="text-xl font-bold text-[#e8ecf0]">We are</h3>
              </div>
              <div className="space-y-5">
                {[
                  'Builders + implementers',
                  'Custom workflow designers',
                  'Integration specialists',
                  'Ongoing optimization partners'
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                    style={{
                      transitionDelay: clarityVisible ? `${300 + i * 80}ms` : '0ms',
                      opacity: clarityVisible ? 1 : 0
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#00fff7]/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#00fff7]" />
                    </div>
                    <span className="text-[#e8ecf0] text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* We're Not */}
            <div
              className="card-abyss p-8 border-[#4a5568]/50"
              style={{
                transitionDelay: clarityVisible ? '400ms' : '0ms',
                opacity: clarityVisible ? 1 : 0,
                transform: clarityVisible ? 'translateX(0)' : 'translateX(30px)'
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a2e] border border-[#4a5568] flex items-center justify-center">
                  <X className="w-6 h-6 text-[#6b7280]" />
                </div>
                <h3 className="text-xl font-bold text-[#e8ecf0]">We're not</h3>
              </div>
              <div className="space-y-5">
                {[
                  'A chatbot company',
                  'A SaaS product',
                  'A one-time installer',
                  '"Set it and forget it"'
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                    style={{
                      transitionDelay: clarityVisible ? `${500 + i * 80}ms` : '0ms',
                      opacity: clarityVisible ? 1 : 0
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#1a1a2e] flex items-center justify-center shrink-0">
                      <X className="w-3.5 h-3.5 text-[#6b7280]" />
                    </div>
                    <span className="text-[#6b7280] text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-28 bg-[#0a1628]/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="orb-purple absolute bottom-0 left-1/4 w-[500px] h-[500px]" />
        </div>

        <div
          ref={outcomesRef}
          className={`mx-auto max-w-5xl px-6 relative z-10 transition-all duration-[1500ms] ${
            outcomesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.3em] uppercase text-[#00fff7] bg-[#00fff7]/10 rounded-full border border-[#00fff7]/20">
            Outcomes
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-[#e8ecf0] mb-16">
            What changes after.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                icon: Phone,
                title: 'Faster response',
                description: "Every lead gets an answer immediately—not when someone's free."
              },
              {
                icon: Calendar,
                title: 'More booked jobs',
                description: 'Qualified leads move to scheduling automatically.'
              },
              {
                icon: RefreshCw,
                title: 'Cleaner operations',
                description: 'CRM stays accurate without nagging your team.'
              },
              {
                icon: MessageSquare,
                title: 'Less headcount pressure',
                description: 'Scale without adding admin staff.'
              }
            ].map((outcome, i) => (
              <div
                key={outcome.title}
                className="card-abyss glow-box p-8"
                style={{
                  transitionDelay: outcomesVisible ? `${i * 100}ms` : '0ms',
                  opacity: outcomesVisible ? 1 : 0,
                  transform: outcomesVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
                }}
              >
                <div className="icon-orb w-14 h-14 flex items-center justify-center mb-6">
                  <outcome.icon className="h-7 w-7 text-[#00fff7]" />
                </div>
                <h3 className="text-xl font-bold text-[#e8ecf0] mb-3">{outcome.title}</h3>
                <p className="text-[#8899a6] leading-relaxed">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-28 section-glow-border relative">
        <div
          ref={processRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-[1500ms] ${
            processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.3em] uppercase text-[#00fff7] bg-[#00fff7]/10 rounded-full border border-[#00fff7]/20">
            How We Build
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-[#e8ecf0] mb-16">
            Engineered. Not hacked together.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Diagnose', desc: 'Map your inbound flow and find the leaks.' },
              { num: '02', title: 'Design', desc: 'Build the workflow, rules, and safeguards.' },
              { num: '03', title: 'Integrate', desc: 'Connect to your tools—CRM, calendar, phones.' },
              { num: '04', title: 'Test', desc: 'Edge cases, failure states, real scenarios.' },
              { num: '05', title: 'Deploy', desc: 'Monitored rollout with human oversight.' },
              { num: '06', title: 'Optimize', desc: 'Weekly review. Continuous improvement.' }
            ].map((step, i) => (
              <div
                key={step.num}
                className="card-abyss group relative p-7"
                style={{
                  transitionDelay: processVisible ? `${i * 100}ms` : '0ms',
                  opacity: processVisible ? 1 : 0,
                  transform: processVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {/* Number badge */}
                <div className="absolute -top-4 -left-2 w-12 h-12 rounded-xl bg-[#00fff7]/20 border border-[#00fff7]/40 flex items-center justify-center glow-border">
                  <span className="text-[#00fff7] text-sm font-bold">{step.num}</span>
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-bold text-[#e8ecf0] mb-2 group-hover:text-[#00fff7] transition-colors">{step.title}</h3>
                  <p className="text-[#8899a6] text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="py-28 bg-[#0a1628]/30">
        <div
          ref={fitRef}
          className={`mx-auto max-w-4xl px-6 transition-all duration-[1500ms] ${
            fitVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.3em] uppercase text-[#00fff7] bg-[#00fff7]/10 rounded-full border border-[#00fff7]/20">
            Who We Help
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-[#e8ecf0] mb-6">
            Built for service businesses.
          </h2>

          <p className="text-xl text-[#8899a6] mb-10">
            If your revenue depends on answering leads fast and booking jobs consistently, this is for you.
          </p>

          <div className="flex flex-wrap gap-4">
            {['Home services', 'Agencies', 'Clinics', 'Professional services', 'Multi-location businesses'].map((industry, i) => (
              <span
                key={industry}
                className={`tag-ocean px-6 py-3 text-base font-medium ${
                  fitVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transition: `opacity 0.5s ease ${300 + i * 80}ms, all 0.2s ease`
                }}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 section-glow-border relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute inset-0">
          <div className="orb-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" />
          <div className="orb-purple absolute top-1/4 right-1/4 w-[300px] h-[300px]" />
        </div>

        <div
          ref={ctaRef}
          className={`mx-auto max-w-3xl px-6 text-center relative z-10 transition-all duration-[1500ms] ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e8ecf0] mb-8 glow-text">
            If inbound leads matter, this matters.
          </h2>

          <p className="text-xl text-[#8899a6] mb-14">
            A short conversation to see where leads are slipping and what a system would look like.
          </p>

          <Link
            to="/begin"
            className="btn-glow group inline-flex items-center gap-3 px-12 py-5 text-lg"
            style={{
              transitionDelay: ctaVisible ? '300ms' : '0ms',
              opacity: ctaVisible ? 1 : 0
            }}
          >
            Begin
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <p
            className="mt-10 text-sm text-[#6b7280] transition-all duration-500"
            style={{
              transitionDelay: ctaVisible ? '500ms' : '0ms',
              opacity: ctaVisible ? 1 : 0
            }}
          >
            No pitch. No pressure. Just clarity.
          </p>
        </div>
      </section>

    </div>
  )
}
