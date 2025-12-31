import { useNavigate } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Mail, Check, Zap, Calendar } from 'lucide-react'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const statRef = useRef(null)
  const [calcRef, calcVisible] = useScrollAnimation(0.1)
  const [howRef, howVisible] = useScrollAnimation(0.15)
  const [engageRef, engageVisible] = useScrollAnimation(0.15)
  const [statValue, setStatValue] = useState(0)
  const [statVisible, setStatVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeLead, setActiveLead] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  // Simulated live leads
  const leads = [
    { id: 1, icon: Phone, source: 'Inbound Call', time: '0:08', location: 'Phoenix, AZ' },
    { id: 2, icon: MessageSquare, source: 'Web Form', time: '0:12', location: 'Austin, TX' },
    { id: 3, icon: Mail, source: 'SMS', time: '0:05', location: 'Denver, CO' },
  ]

  // Initial load animation
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Cycle through leads
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLead((prev) => (prev + 1) % leads.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [leads.length])

  // Cycle through steps when visible
  useEffect(() => {
    if (!howVisible) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(interval)
  }, [howVisible])

  // Animated counter for 78%
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statVisible) {
          setStatVisible(true)
          let current = 0
          const target = 78
          const duration = 2000
          const increment = target / (duration / 16)

          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setStatValue(target)
              clearInterval(timer)
            } else {
              setStatValue(Math.floor(current))
            }
          }, 16)
        }
      },
      { threshold: 0.3 }
    )

    const currentRef = statRef.current
    if (currentRef) observer.observe(currentRef)
    return () => { if (currentRef) observer.unobserve(currentRef) }
  }, [statVisible])

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 80,
        y: (e.clientY - rect.top - rect.height / 2) / 80
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleCalculatorComplete = (results) => {
    sessionStorage.setItem('calculatorResults', JSON.stringify(results))
    navigate('/audit')
  }

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#030306]">

      {/* ============================================
          HERO — PRODUCT VISUALIZATION
          ============================================ */}
      <section ref={heroRef} className="min-h-screen flex items-center pt-20 pb-32 relative overflow-hidden">

        {/* Gradient mesh background */}
        <div className="absolute inset-0">
          <div
            className="absolute w-[1200px] h-[1200px] -top-[400px] left-1/2 -translate-x-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.15) 0%, rgba(0,212,207,0.05) 40%, transparent 70%)',
              transform: `translate(calc(-50% + ${mousePos.x * 3}px), ${mousePos.y * 3}px)`,
              transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
          <div
            className="absolute w-[800px] h-[800px] top-[20%] -right-[200px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(124,114,255,0.1) 0%, transparent 60%)',
              transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)`,
              transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Copy */}
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-semibold text-white leading-[1] tracking-[-0.03em] mb-8">
                We eliminate revenue loss
                <br />
                <span className="text-[#6b7280]">caused by human delay.</span>
              </h1>

              <p className="text-xl text-[#6b7280] mb-12 max-w-lg">
                Leviathan builds automated systems that respond instantly, qualify automatically, and book appointments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToCalculator}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#030306] font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,212,207,0.4)] hover:scale-[1.02]"
                >
                  Calculate Losses
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate('/audit')}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00d4cf] text-[#030306] font-semibold rounded-full transition-all duration-300 hover:bg-[#00e5df] hover:shadow-[0_0_50px_rgba(0,212,207,0.4)] hover:scale-[1.02]"
                >
                  Start Saving
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right: Live Product Demo */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * -0.5}deg) rotateX(${mousePos.y * 0.5}deg)`,
                transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#00d4cf]/20 via-transparent to-[#7c72ff]/20 blur-2xl opacity-50" />

              <div className="relative rounded-2xl border border-white/10 bg-[#0a0f1a]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-xs text-[#6b7280] font-medium">Live Feed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00d4cf] animate-pulse" />
                    <span className="text-xs text-[#6b7280]">Active</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {leads.map((lead, i) => {
                    const Icon = lead.icon
                    const isActive = i === activeLead
                    return (
                      <div
                        key={lead.id}
                        className={`relative p-4 rounded-xl border transition-all duration-500 ${
                          isActive ? 'border-[#00d4cf]/30 bg-[#00d4cf]/5' : 'border-white/5 bg-white/[0.02]'
                        }`}
                        style={{ opacity: isActive ? 1 : 0.5, transform: isActive ? 'scale(1)' : 'scale(0.98)' }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-[#00d4cf]/20' : 'bg-white/5'}`}>
                              <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-[#00d4cf]' : 'text-[#6b7280]'}`} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{lead.source}</div>
                              <div className="text-xs text-[#6b7280]">{lead.location}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xs font-mono transition-colors duration-300 ${isActive ? 'text-[#00d4cf]' : 'text-[#6b7280]'}`}>
                              {lead.time}
                            </div>
                            {isActive && (
                              <div className="flex items-center gap-1 mt-1">
                                <Check className="w-3 h-3 text-[#00d4cf]" />
                                <span className="text-xs text-[#00d4cf]">Responded</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="px-6 py-4 border-t border-white/5 bg-black/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-semibold text-white">$12,400</div>
                      <div className="text-xs text-[#6b7280]">Revenue captured today</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-[#00d4cf]">&lt;60s</div>
                      <div className="text-xs text-[#6b7280]">Avg response</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* ============================================
          STAT — THE HOOK (FIXED)
          ============================================ */}
      <section ref={statRef} className="py-40 sm:py-56 relative overflow-hidden">
        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border transition-all duration-1000 ${
              statVisible ? 'border-[#00d4cf]/20 scale-100 opacity-100' : 'border-transparent scale-50 opacity-0'
            }`}
            style={{ transitionDelay: '0.2s' }}
          />
          <div
            className={`absolute w-[450px] h-[450px] sm:w-[700px] sm:h-[700px] rounded-full border transition-all duration-1000 ${
              statVisible ? 'border-[#00d4cf]/10 scale-100 opacity-100' : 'border-transparent scale-50 opacity-0'
            }`}
            style={{ transitionDelay: '0.4s' }}
          />
          <div
            className={`absolute w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full border transition-all duration-1000 ${
              statVisible ? 'border-[#00d4cf]/5 scale-100 opacity-100' : 'border-transparent scale-50 opacity-0'
            }`}
            style={{ transitionDelay: '0.6s' }}
          />
        </div>

        {/* Center glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full transition-opacity duration-1000 ${
            statVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(0,212,207,0.3) 0%, rgba(0,212,207,0.1) 40%, transparent 70%)',
          }}
        />

        <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
          {/* Giant number */}
          <div
            className={`text-[8rem] sm:text-[12rem] lg:text-[18rem] font-bold leading-none mb-6 transition-all duration-1000 ${
              statVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.04em',
            }}
          >
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00d4cf 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {statValue}%
            </span>
          </div>

          <p className={`text-xl sm:text-2xl text-[#9ca3af] max-w-lg mx-auto transition-all duration-700 ${
            statVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '0.5s' }}>
            of customers hire whoever responds first.
          </p>
        </div>
      </section>


      {/* ============================================
          HOW IT WORKS — VISUAL FLOW
          ============================================ */}
      <section ref={howRef} className="py-32 sm:py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,114,255,0.2) 0%, transparent 60%)' }}
        />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className={`text-center mb-20 transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-[#6b7280]">
              Lead to booked appointment. Automatically.
            </p>
          </div>

          {/* Visual flow */}
          <div className="relative">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Phone,
                  num: '01',
                  title: 'Lead comes in',
                  desc: 'Phone call, web form, or text message. Any channel, any time.',
                  color: '#00d4cf'
                },
                {
                  icon: Zap,
                  num: '02',
                  title: 'Instant response',
                  desc: 'Under 60 seconds. Automated. Before they call your competitor.',
                  color: '#7c72ff'
                },
                {
                  icon: Calendar,
                  num: '03',
                  title: 'Appointment booked',
                  desc: 'Qualified, scheduled, and synced to your calendar automatically.',
                  color: '#00d4cf'
                },
              ].map((step, i) => {
                const Icon = step.icon
                const isActive = i === activeStep
                return (
                  <div
                    key={step.num}
                    className={`relative transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
                  >
                    {/* Card */}
                    <div className={`relative p-8 rounded-3xl border transition-all duration-500 ${
                      isActive
                        ? 'border-white/20 bg-white/[0.04] scale-[1.02]'
                        : 'border-white/5 bg-white/[0.02]'
                    }`}>
                      {/* Glow effect when active */}
                      {isActive && (
                        <div
                          className="absolute -inset-px rounded-3xl opacity-50 blur-xl transition-opacity duration-500"
                          style={{ background: `radial-gradient(circle at 50% 0%, ${step.color}30 0%, transparent 70%)` }}
                        />
                      )}

                      {/* Icon with ring */}
                      <div className="relative mb-8">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            isActive ? 'scale-110' : 'scale-100'
                          }`}
                          style={{
                            background: `linear-gradient(135deg, ${step.color}20 0%, ${step.color}05 100%)`,
                            border: `1px solid ${step.color}30`
                          }}
                        >
                          <Icon className="w-7 h-7" style={{ color: step.color }} />
                        </div>
                        {/* Pulse ring */}
                        {isActive && (
                          <div
                            className="absolute inset-0 rounded-2xl animate-ping"
                            style={{
                              background: `${step.color}10`,
                              animationDuration: '2s'
                            }}
                          />
                        )}
                        {/* Step number badge */}
                        <div
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            background: isActive ? step.color : '#1a2332',
                            color: isActive ? '#030306' : '#6b7280'
                          }}
                        >
                          {step.num}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                      <p className="text-[#6b7280] leading-relaxed">{step.desc}</p>

                    </div>
                  </div>
                )
              })}
            </div>

            {/* Progress dots - mobile */}
            <div className="flex lg:hidden justify-center gap-2 mt-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeStep ? 'bg-[#00d4cf] w-6' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          ENGAGEMENT MODEL — PARTNERSHIP LAYER
          ============================================ */}
      <section ref={engageRef} className="py-32 sm:py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Background gradient wash — subtle, doesn't compete with hero */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,212,207,0.2) 0%, rgba(124,114,255,0.1) 50%, transparent 80%)'
          }}
        />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          {/* Eyebrow — plain text, no pill, no brackets */}
          <div className={`text-center mb-8 transition-all duration-700 ${engageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#6b7280]/60">
              Partner-Led Revenue Infrastructure
            </span>
          </div>

          {/* Headline — two lines, sequential animation */}
          <h2
            className={`text-center text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] transition-all duration-700 ${engageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '0.15s' }}
          >
            From diagnosis to deployment.
          </h2>
          <h2
            className={`text-center text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#6b7280] leading-[1.1] mt-1 mb-6 transition-all duration-700 ${engageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            With you, not just for you.
          </h2>

          {/* Subhead */}
          <p
            className={`text-center text-lg text-[#6b7280] max-w-xl mx-auto mb-20 transition-all duration-700 ${engageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            Every business leaks revenue in different places.
            We start by finding yours — then design the system that removes it.
          </p>

          {/* Columns container with spine */}
          <div className="relative mb-16">
            {/* Visual spine — gradient glow rail (bias slightly left toward Column 1) */}
            <div
              className={`absolute hidden lg:block left-[30%] top-0 bottom-0 w-px pointer-events-none transition-all duration-700 ${engageVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '0.6s' }}
            >
              <div
                className="absolute inset-0 w-6 -translate-x-1/2 blur-xl opacity-15"
                style={{
                  background: 'linear-gradient(180deg, #00d4cf 0%, #7c72ff 100%)'
                }}
              />
            </div>

            {/* Node dots above columns */}
            <div
              className={`absolute hidden lg:flex top-0 left-0 right-0 justify-around px-[8%] -translate-y-4 pointer-events-none transition-all duration-700 ${engageVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '0.6s' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00d4cf]/40 blur-[2px]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#00d4cf]/25 blur-[2px]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#7c72ff]/25 blur-[2px]" />
            </div>

            {/* Three columns */}
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Column 1 — Revenue Diagnosis (Entry Vector) */}
              <div
                className={`relative lg:translate-y-0 transition-all duration-700 ${engageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: '0.8s' }}
              >
                {/* Glow behind Column 1 */}
                <div
                  className="absolute -inset-3 rounded-3xl blur-2xl opacity-30"
                  style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.2) 0%, transparent 70%)' }}
                />
                {/* Card */}
                <div className="relative p-8 rounded-2xl border border-[#00d4cf]/15 bg-white/[0.025]">
                  <h3 className="text-lg font-semibold text-white mb-4">Revenue diagnosis</h3>
                  <p className="text-[#9ca3af] leading-relaxed mb-6">
                    We map where revenue breaks — response delays, follow-ups, handoffs, and capacity gaps.
                    You see the losses clearly before anything is built.
                  </p>
                  <button
                    onClick={() => navigate('/audit')}
                    className="group inline-flex items-center gap-2 text-[#00d4cf] text-sm font-medium transition-colors hover:text-[#00e5df]"
                  >
                    Run the audit
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Column 2 — System Design (offset lower) */}
              <div
                className={`relative lg:translate-y-4 transition-all duration-700 ${engageVisible ? 'opacity-100 translate-y-0 lg:translate-y-4' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: '1.05s' }}
              >
                <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
                  <h3 className="text-lg font-semibold text-white mb-4">System design</h3>
                  <p className="text-[#9ca3af] leading-relaxed">
                    We design automation around your lead flow, sales motion, and constraints.
                    No templates. No generic workflows.
                  </p>
                </div>
              </div>

              {/* Column 3 — Implementation (offset mid) */}
              <div
                className={`relative lg:translate-y-2 transition-all duration-700 ${engageVisible ? 'opacity-100 translate-y-0 lg:translate-y-2' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: '1.3s' }}
              >
                <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
                  <h3 className="text-lg font-semibold text-white mb-4">Implementation & optimization</h3>
                  <p className="text-[#9ca3af] leading-relaxed">
                    We implement, monitor, and refine.
                    Systems run automatically. We stay involved where it matters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership line — premium, quiet */}
          <div
            className={`flex items-center justify-center gap-2 transition-all duration-700 ${engageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1.6s' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00d4cf]/40" />
            <p className="text-sm text-[#4b5563]">
              We work with a small number of partners at a time.
            </p>
          </div>
        </div>
      </section>


      {/* ============================================
          CALCULATOR
          ============================================ */}
      <section id="calculator" className="py-32 sm:py-40 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.3) 0%, transparent 60%)' }}
        />

        <div
          ref={calcRef}
          className={`mx-auto max-w-5xl px-6 relative z-10 transition-all duration-1000 ${
            calcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-6">
                Calculate what slow response
                <br />
                <span className="text-[#6b7280]">is costing you.</span>
              </h2>
              <p className="text-lg text-[#6b7280] max-w-sm">
                See how delays waste hours and reduce revenue every month.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#00d4cf]/10 to-[#7c72ff]/10 blur-xl opacity-40" />
              <div className="relative">
                <LossCalculator onComplete={handleCalculatorComplete} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="py-32 sm:py-40 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.2) 0%, transparent 60%)' }}
        />

        <div className="mx-auto max-w-3xl px-6 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-[1.1]">
            Time is money.
            <br />
            <span className="text-[#6b7280]">So why waste both?</span>
          </h2>
          <p className="text-xl text-[#6b7280] mb-12">
            Talk to us about optimizing your time and your revenue.
          </p>

          <button
            onClick={scrollToCalculator}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-[#030306] font-semibold rounded-full text-lg transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,212,207,0.5)] hover:scale-[1.02]"
          >
            Get started
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

    </div>
  )
}