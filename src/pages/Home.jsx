import { useNavigate } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Mail, Check } from 'lucide-react'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const statRef = useRef(null)
  const [calcRef, calcVisible] = useScrollAnimation(0.1)
  const [statValue, setStatValue] = useState(0)
  const [statVisible, setStatVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeLead, setActiveLead] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

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
          {/* Primary glow - top center */}
          <div
            className="absolute w-[1200px] h-[1200px] -top-[400px] left-1/2 -translate-x-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.15) 0%, rgba(0,212,207,0.05) 40%, transparent 70%)',
              transform: `translate(calc(-50% + ${mousePos.x * 3}px), ${mousePos.y * 3}px)`,
              transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
          {/* Secondary glow - right */}
          <div
            className="absolute w-[800px] h-[800px] top-[20%] -right-[200px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(124,114,255,0.1) 0%, transparent 60%)',
              transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)`,
              transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
          {/* Grid overlay */}
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
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00d4cf]" />
                <span className="text-xs text-[#9ca3af] font-medium">For home service businesses</span>
              </div>

              {/* Headline */}
              <h1 className="text-[3.5rem] sm:text-7xl lg:text-8xl font-semibold text-white leading-[0.95] tracking-[-0.03em] mb-8">
                Never miss
                <br />
                <span className="text-[#6b7280]">another lead.</span>
              </h1>

              {/* Subhead - one line */}
              <p className="text-xl text-[#6b7280] mb-12 max-w-md">
                Instant response. Automatic qualification. Booked appointments.
              </p>

              {/* CTA */}
              <button
                onClick={scrollToCalculator}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#030306] font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,212,207,0.4)] hover:scale-[1.02]"
              >
                Calculate your lead loss
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Right: Live Product Demo */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * -0.5}deg) rotateX(${mousePos.y * 0.5}deg)`,
                transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              {/* Glow behind card */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#00d4cf]/20 via-transparent to-[#7c72ff]/20 blur-2xl opacity-50" />

              {/* Dashboard card */}
              <div className="relative rounded-2xl border border-white/10 bg-[#0a0f1a]/80 backdrop-blur-xl overflow-hidden shadow-2xl">

                {/* Header */}
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

                {/* Leads */}
                <div className="p-4 space-y-3">
                  {leads.map((lead, i) => {
                    const Icon = lead.icon
                    const isActive = i === activeLead
                    return (
                      <div
                        key={lead.id}
                        className={`relative p-4 rounded-xl border transition-all duration-500 ${
                          isActive
                            ? 'border-[#00d4cf]/30 bg-[#00d4cf]/5'
                            : 'border-white/5 bg-white/[0.02]'
                        }`}
                        style={{
                          opacity: isActive ? 1 : 0.5,
                          transform: isActive ? 'scale(1)' : 'scale(0.98)'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                              isActive ? 'bg-[#00d4cf]/20' : 'bg-white/5'
                            }`}>
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

                {/* Footer stats */}
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
          SOCIAL PROOF STRIP
          ============================================ */}
      <section className="py-16 border-y border-white/5">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[#4b5563]">
            <span className="text-sm">Built for</span>
            <span className="text-white font-medium">HVAC</span>
            <span className="text-white font-medium">Plumbing</span>
            <span className="text-white font-medium">Electrical</span>
            <span className="text-white font-medium">Roofing</span>
            <span className="text-white font-medium">Landscaping</span>
          </div>
        </div>
      </section>


      {/* ============================================
          STAT — THE HOOK
          ============================================ */}
      <section ref={statRef} className="py-40 sm:py-56 relative">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1a]/30 to-transparent" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.2) 0%, transparent 60%)',
              filter: 'blur(80px)'
            }}
          />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
          {/* Giant number */}
          <div
            className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-bold leading-none mb-6"
            style={{
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.04em',
            }}
          >
            <span
              style={{
                background: statVisible
                  ? 'linear-gradient(135deg, #ffffff 0%, #00d4cf 100%)'
                  : '#ffffff',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transition: 'all 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
                textShadow: statVisible ? '0 0 120px rgba(0,212,207,0.5)' : 'none',
              }}
            >
              {statValue}%
            </span>
          </div>

          <p className="text-xl sm:text-2xl text-[#6b7280] max-w-lg mx-auto">
            of customers hire whoever responds first.
          </p>
        </div>
      </section>


      {/* ============================================
          HOW IT WORKS — 3 STEPS
          ============================================ */}
      <section className="py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-[#6b7280]">
              Lead to booked appointment. Automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Lead comes in',
                desc: 'Phone, form, or text. Any channel.',
              },
              {
                num: '02',
                title: 'Instant response',
                desc: 'Under 60 seconds. Every time.',
              },
              {
                num: '03',
                title: 'Appointment booked',
                desc: 'Qualified and scheduled automatically.',
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="text-5xl font-bold text-[#00d4cf]/20 mb-6 transition-colors group-hover:text-[#00d4cf]/40">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[#6b7280]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================
          CALCULATOR
          ============================================ */}
      <section id="calculator" className="py-32 sm:py-40 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Background glow */}
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
            {/* Left: Headline */}
            <div className="lg:sticky lg:top-32">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-6">
                Calculate your
                <br />
                <span className="text-[#6b7280]">lead loss.</span>
              </h2>
              <p className="text-lg text-[#6b7280] max-w-sm">
                See how much slow response times are costing your business every month.
              </p>
            </div>

            {/* Right: Calculator */}
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

        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.2) 0%, transparent 60%)' }}
        />

        <div className="mx-auto max-w-3xl px-6 text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-[0.95]">
            Stop losing leads.
          </h2>
          <p className="text-xl text-[#6b7280] mb-12">
            Talk to us about fixing your response time.
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
