import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowDown, Clock, Phone, Calendar, CheckCircle, ChevronRight, Zap, Shield, BarChart3 } from 'lucide-react'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const [howRef, howVisible] = useScrollAnimation(0.1)
  const [proofRef, proofVisible] = useScrollAnimation(0.1)
  const [calcRef, calcVisible] = useScrollAnimation(0.1)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.1)

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 50,
        y: (e.clientY - rect.top - rect.height / 2) / 50
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

  const scrollToHow = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#030306] overflow-hidden">

      {/* ============================================
          HERO — VISUAL-FIRST WITH CLARITY
          ============================================ */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center pt-24 pb-20 relative overflow-hidden">

        {/* Animated gradient mesh */}
        <div className="absolute inset-0">
          {/* Primary gradient orb */}
          <div
            className="absolute w-[1000px] h-[1000px] -top-[300px] left-1/2 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.3) 0%, rgba(0,212,207,0.1) 40%, transparent 70%)',
              transform: `translate(calc(-50% + ${mousePos.x * 2}px), ${mousePos.y * 2}px)`,
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
          {/* Secondary accent orb */}
          <div
            className="absolute w-[600px] h-[600px] top-[20%] -right-[200px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(124,114,255,0.4) 0%, transparent 70%)',
              transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`,
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
          {/* Bottom glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,212,207,0.3) 0%, transparent 70%)'
            }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating geometric elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[15%] left-[10%] w-24 h-24 border border-[#00d4cf]/20 rounded-2xl"
            style={{
              transform: `rotate(12deg) translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)`,
              transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
          <div
            className="absolute top-[60%] right-[8%] w-32 h-32 border border-[#7c72ff]/15 rounded-full"
            style={{
              transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)`,
              transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
          <div
            className="absolute top-[30%] right-[15%] w-3 h-3 bg-[#00d4cf]/40 rounded-full"
            style={{
              transform: `translate(${mousePos.x * 4}px, ${mousePos.y * 4}px)`,
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
          <div
            className="absolute bottom-[25%] left-[12%] w-2 h-2 bg-[#7c72ff]/30 rounded-full"
            style={{
              transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)`,
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4cf]/10 border border-[#00d4cf]/20 mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-[#00d4cf] animate-pulse" />
            <span className="text-[#00d4cf] text-sm font-medium">For service businesses</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-8 animate-fade-in-up">
            Every lead answered.
            <br />
            <span className="bg-gradient-to-r from-[#6b7280] to-[#4b5563] bg-clip-text text-transparent">Under 60 seconds.</span>
          </h1>

          {/* Grounding copy */}
          <p className="text-xl sm:text-2xl text-[#9ca3af] leading-relaxed max-w-2xl mb-4 animate-fade-in-up animation-delay-100">
            Automated lead response for home service companies.
          </p>
          <p className="text-lg sm:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-12 animate-fade-in-up animation-delay-200">
            When someone calls or submits a form, our system responds instantly—qualifies them, answers questions, and books the appointment. Before they call your competitor.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <button
              onClick={scrollToCalculator}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#030306] font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,212,207,0.3)]"
            >
              <span className="relative z-10">Calculate your lead loss</span>
              <ArrowDown className="w-4 h-4 relative z-10 transition-transform group-hover:translate-y-0.5" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d4cf] to-[#00e5df] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={scrollToHow}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#2a3441] text-white font-medium rounded-full transition-all duration-300 hover:border-[#00d4cf]/50 hover:bg-[#00d4cf]/5 backdrop-blur-sm"
            >
              See how it works
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 sm:gap-16 mt-16 pt-8 border-t border-[#1a2332]/50 animate-fade-in-up animation-delay-400">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">&lt;60s</div>
              <div className="text-sm text-[#6b7280] mt-1">Response time</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">24/7</div>
              <div className="text-sm text-[#6b7280] mt-1">Always on</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">100%</div>
              <div className="text-sm text-[#6b7280] mt-1">Leads captured</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[#2a3441] flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-[#00d4cf] animate-scroll-hint" />
          </div>
        </div>
      </section>


      {/* ============================================
          HOW IT WORKS — VISUAL FLOW
          ============================================ */}
      <section id="how-it-works" className="py-32 sm:py-40 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/50 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div
          ref={howRef}
          className={`mx-auto max-w-6xl px-6 relative z-10 transition-all duration-1000 ${
            howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="text-center mb-20">
            <p className="text-[#00d4cf] text-sm font-medium tracking-wide uppercase mb-4">How it works</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              From lead to booking.
              <br />
              <span className="text-[#6b7280]">Automatically.</span>
            </h2>
            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
              A lead comes in. Within seconds, our system handles everything—so you can focus on the job, not the phone.
            </p>
          </div>

          {/* Steps with connecting line */}
          <div className="relative">
            {/* Animated connecting line */}
            <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-[2px]">
              <div className="absolute inset-0 bg-[#1a2332]" />
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00d4cf] to-[#7c72ff]"
                style={{
                  width: howVisible ? '100%' : '0%',
                  transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s'
                }}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Phone,
                  step: '01',
                  title: 'Lead comes in',
                  desc: 'Phone call, form, or text—any channel, any time.',
                  color: '#00d4cf'
                },
                {
                  icon: Zap,
                  step: '02',
                  title: 'Instant response',
                  desc: 'Under 60 seconds. Before they call your competitor.',
                  color: '#00d4cf'
                },
                {
                  icon: CheckCircle,
                  step: '03',
                  title: 'Auto-qualified',
                  desc: 'Asks your questions. Filters out bad fits.',
                  color: '#7c72ff'
                },
                {
                  icon: Calendar,
                  step: '04',
                  title: 'Booked',
                  desc: "Syncs with your calendar. You show up ready.",
                  color: '#7c72ff'
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="relative group"
                  style={{
                    opacity: howVisible ? 1 : 0,
                    transform: howVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.15}s`
                  }}
                >
                  {/* Card */}
                  <div className="relative p-8 rounded-3xl border border-[#1a2332] bg-[#0a0f1a]/80 backdrop-blur-xl transition-all duration-500 group-hover:border-[#2a3441] group-hover:bg-[#0d1320] group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                    {/* Glow effect on hover */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${item.color}15 0%, transparent 70%)`
                      }}
                    />

                    {/* Step number */}
                    <div className="relative mb-6">
                      <span className="text-xs font-mono text-[#4b5563] tracking-wider">STEP</span>
                      <span
                        className="ml-2 text-4xl font-bold"
                        style={{ color: item.color }}
                      >
                        {item.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}05 100%)`,
                        border: `1px solid ${item.color}30`
                      }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-[#6b7280] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          PROOF / TRUST — PREMIUM CARDS
          ============================================ */}
      <section className="py-32 sm:py-40 relative">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(124,114,255,0.2) 0%, transparent 60%)'
            }}
          />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div
          ref={proofRef}
          className={`mx-auto max-w-6xl px-6 relative z-10 transition-all duration-1000 ${
            proofVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Statement */}
            <div>
              <p className="text-[#00d4cf] text-sm font-medium tracking-wide uppercase mb-6">The reality</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
                <span className="bg-gradient-to-r from-white to-[#9ca3af] bg-clip-text text-transparent">78%</span> of customers hire whoever responds first.
              </h2>
              <p className="text-xl text-[#9ca3af] mb-6 leading-relaxed">
                You're on a job. Phone rings. You can't answer. By the time you call back—they've already booked someone else.
              </p>
              <p className="text-lg text-[#6b7280] leading-relaxed">
                This isn't a technology problem. It's a physics problem. You can't be in two places at once. But your response system can.
              </p>
            </div>

            {/* Right — Feature cards */}
            <div className="space-y-6">
              {[
                {
                  icon: Shield,
                  label: 'Built for',
                  title: 'Home service businesses',
                  desc: 'HVAC, plumbing, electrical, roofing, landscaping, cleaning.',
                  gradient: 'from-[#00d4cf] to-[#00a8a4]'
                },
                {
                  icon: Zap,
                  label: 'How we work',
                  title: 'We build it. You own it.',
                  desc: 'Not a SaaS fee. Custom infrastructure built and maintained for you.',
                  gradient: 'from-[#7c72ff] to-[#5b4fd9]'
                },
                {
                  icon: BarChart3,
                  label: 'Our approach',
                  title: 'Operators, not salespeople',
                  desc: "We've built automation systems for years. No pitch decks. Just working infrastructure.",
                  gradient: 'from-[#00d4cf] to-[#7c72ff]'
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="group relative p-6 rounded-2xl border border-[#1a2332] bg-[#0a0f1a]/60 backdrop-blur-sm transition-all duration-500 hover:border-[#2a3441] hover:bg-[#0d1320]"
                  style={{
                    opacity: proofVisible ? 1 : 0,
                    transform: proofVisible ? 'translateX(0)' : 'translateX(20px)',
                    transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.1}s`
                  }}
                >
                  <div className="flex gap-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-1">{item.label}</p>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-[#6b7280]">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          CALCULATOR — PREMIUM PRESENTATION
          ============================================ */}
      <section id="calculator" className="py-32 sm:py-40 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/30 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        {/* Glow behind calculator */}
        <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,207,0.2) 0%, transparent 60%)'
          }}
        />

        <div
          ref={calcRef}
          className={`mx-auto max-w-6xl px-6 relative z-10 transition-all duration-1000 ${
            calcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Left — Context */}
            <div className="lg:sticky lg:top-32">
              <p className="text-[#00d4cf] text-sm font-medium tracking-wide uppercase mb-6">Lead loss calculator</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-[1.1]">
                How much are slow responses costing you?
              </h2>

              <p className="text-xl text-[#9ca3af] mb-8 leading-relaxed">
                Every minute between a lead coming in and someone responding, the chance of booking that job drops.
              </p>

              {/* Methodology */}
              <div className="p-6 rounded-2xl border border-[#1a2332] bg-[#0a0f1a]/60 backdrop-blur-sm mb-6">
                <p className="text-sm text-white font-semibold mb-4">How we calculate this</p>
                <div className="space-y-3">
                  {[
                    { time: 'Under 5 min', rate: '0%', label: 'baseline' },
                    { time: '5-15 min', rate: '10%', label: 'lost' },
                    { time: '15-60 min', rate: '25%', label: 'lost' },
                    { time: '1-4 hours', rate: '40%', label: 'lost' },
                    { time: '4-24 hours', rate: '60%', label: 'lost' },
                  ].map((item) => (
                    <div key={item.time} className="flex items-center justify-between text-sm">
                      <span className="text-[#9ca3af]">{item.time}</span>
                      <span className="text-[#00d4cf] font-mono">{item.rate} <span className="text-[#6b7280]">{item.label}</span></span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#4b5563] mt-4 pt-4 border-t border-[#1a2332]">
                  Based on industry response data. These are conservative estimates.
                </p>
              </div>

              <p className="text-sm text-[#6b7280] italic">
                Even if these numbers are off by 50%, the monthly loss is still significant.
              </p>
            </div>

            {/* Right — Calculator */}
            <div className="relative">
              {/* Glow wrapper */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#00d4cf]/10 to-[#7c72ff]/10 blur-2xl opacity-50" />
              <div className="relative">
                <LossCalculator onComplete={handleCalculatorComplete} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          FINAL CTA — CONFIDENT
          ============================================ */}
      <section className="py-32 sm:py-40 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,212,207,0.2) 0%, transparent 60%)'
          }}
        />

        <div
          ref={ctaRef}
          className={`mx-auto max-w-4xl px-6 text-center relative z-10 transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to stop losing leads?
          </h2>
          <p className="text-xl text-[#6b7280] mb-12 max-w-2xl mx-auto">
            Schedule a 30-minute call. We'll look at your current response flow and show you exactly how the system would work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/audit"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#030306] font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,212,207,0.4)]"
            >
              <span className="relative z-10">Schedule a call</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d4cf] to-[#00e5df] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <button
              onClick={scrollToCalculator}
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-[#2a3441] text-white font-medium rounded-full text-lg transition-all duration-300 hover:border-[#00d4cf]/50 hover:bg-[#00d4cf]/5"
            >
              Calculate your loss first
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </button>
          </div>

          <p className="text-sm text-[#4b5563] mt-10">
            No sales pitch. Just a technical conversation about your lead flow.
          </p>
        </div>
      </section>

    </div>
  )
}
