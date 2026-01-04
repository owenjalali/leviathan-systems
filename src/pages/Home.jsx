import { useNavigate } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Clock, Check, Users, Calendar, Shield, Eye } from 'lucide-react'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const statRef = useRef(null)
  const [calcRef, calcVisible] = useScrollAnimation(0.1)
  const [howRef, howVisible] = useScrollAnimation(0.15)
  const [outcomesRef, outcomesVisible] = useScrollAnimation(0.15)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.15)
  const [statValue, setStatValue] = useState(0)
  const [statVisible, setStatVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  // Initial load animation
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Cycle through steps when visible
  useEffect(() => {
    if (!howVisible) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)
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
          HERO — CLEAR VALUE PROPOSITION
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
          <div className="max-w-3xl mx-auto text-center">

            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-[-0.03em] mb-8">
                Stop losing customers
                <br />
                <span className="text-[#6b7280]">to slow responses.</span>
              </h1>

              <p className="text-xl text-[#9ca3af] mb-12 max-w-xl mx-auto">
                We help your business capture leads, automatically.
                No more missed calls. No more forgotten follow-ups.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToCalculator}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#030306] font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,212,207,0.4)] hover:scale-[1.02]"
                >
                  See What You're Losing
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate('/audit')}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/5 hover:border-white/30"
                >
                  Book a Free Assessment
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Simple trust indicators */}
            <div className={`mt-20 flex flex-wrap items-center justify-center gap-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-2 text-[#6b7280]">
                <Clock className="w-4 h-4 text-[#00d4cf]" />
                <span className="text-sm">Responds in under 60 seconds</span>
              </div>
              <div className="flex items-center gap-2 text-[#6b7280]">
                <Phone className="w-4 h-4 text-[#00d4cf]" />
                <span className="text-sm">Handles calls, texts, and forms</span>
              </div>
              <div className="flex items-center gap-2 text-[#6b7280]">
                <Calendar className="w-4 h-4 text-[#00d4cf]" />
                <span className="text-sm">Books appointments automatically</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ============================================
          STAT — THE PROBLEM
          ============================================ */}
      <section ref={statRef} className="py-40 sm:py-56 relative overflow-hidden">
        {/* Background orbs like hero */}
        <div
          className="absolute w-[1000px] h-[1000px] -top-[300px] left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.12) 0%, rgba(0,212,207,0.04) 40%, transparent 70%)' }}
        />
        <div
          className="absolute w-[600px] h-[600px] top-[30%] -right-[150px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,114,255,0.08) 0%, transparent 60%)' }}
        />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
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

          <p className={`text-xl sm:text-2xl text-[#9ca3af] max-w-2xl mx-auto transition-all duration-700 ${
            statVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '0.5s' }}>
            of customers hire whoever responds first.
          </p>

          <p className={`text-lg text-[#6b7280] max-w-xl mx-auto mt-6 transition-all duration-700 ${
            statVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '0.7s' }}>
            When a lead calls and you're busy, they call your competitor.
            <br />
            When a form sits overnight, they've already booked elsewhere.
          </p>
        </div>
      </section>


      {/* ============================================
          HOW WE WORK — PARTNERSHIP FLOW
          ============================================ */}
      <section ref={howRef} className="py-32 sm:py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Background orbs like hero */}
        <div
          className="absolute w-[900px] h-[900px] -top-[200px] -left-[200px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,114,255,0.1) 0%, rgba(124,114,255,0.03) 40%, transparent 70%)' }}
        />
        <div
          className="absolute w-[800px] h-[800px] top-[40%] -right-[200px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.1) 0%, rgba(0,212,207,0.03) 40%, transparent 70%)' }}
        />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className={`text-center mb-20 transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6">
              How we work with you
            </h2>
            <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
              We don't sell you a box and walk away. We partner with you to understand your business, find where you're losing money, and build a system that actually works.
            </p>
          </div>

          {/* 3-Step Flow */}
          <div className="relative">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Users,
                  num: '01',
                  title: 'We Learn Your Business',
                  desc: 'We start with a conversation. How do leads reach you? What happens when you\'re busy? Where do things fall through the cracks?',
                  color: '#00d4cf'
                },
                {
                  icon: Eye,
                  num: '02',
                  title: 'We Find Where You\'re Losing Money',
                  desc: 'We look at your current process and identify exactly where opportunities slip away. Missed calls. Slow follow-ups. Leads that go cold.',
                  color: '#7c72ff'
                },
                {
                  icon: Shield,
                  num: '03',
                  title: 'We Build a System to Fix It',
                  desc: 'Custom automation that handles responses, qualifies leads, and books appointments. All without you lifting a finger.',
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
                      <p className="text-[#9ca3af] leading-relaxed">{step.desc}</p>

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
          WHAT YOU GET — OUTCOMES
          ============================================ */}
      <section ref={outcomesRef} className="py-32 sm:py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Background orbs like hero */}
        <div
          className="absolute w-[800px] h-[800px] -top-[100px] -right-[200px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.1) 0%, rgba(0,212,207,0.03) 40%, transparent 70%)' }}
        />
        <div
          className="absolute w-[700px] h-[700px] top-[50%] -left-[200px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,114,255,0.08) 0%, rgba(124,114,255,0.02) 40%, transparent 70%)' }}
        />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />

        <div className="mx-auto max-w-4xl px-6 relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${outcomesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6">
              What changes for you
            </h2>
            <p className="text-lg text-[#9ca3af]">
              After we implement your system:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                text: 'Every call gets answered, even at 2am',
                icon: Phone
              },
              {
                text: 'Every lead gets an instant response',
                icon: MessageSquare
              },
              {
                text: 'Qualified appointments land on your calendar',
                icon: Calendar
              },
              {
                text: 'You see exactly what\'s happening, in real-time',
                icon: Eye
              }
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-700 ${outcomesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#00d4cf]/10 border border-[#00d4cf]/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#00d4cf]" />
                  </div>
                  <p className="text-lg text-white/90 pt-1.5">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ============================================
          CALCULATOR
          ============================================ */}
      <section id="calculator" className="py-32 sm:py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Background orbs like hero */}
        <div
          className="absolute w-[900px] h-[900px] -top-[200px] -left-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,114,255,0.1) 0%, rgba(124,114,255,0.03) 40%, transparent 70%)' }}
        />
        <div
          className="absolute w-[800px] h-[800px] top-[20%] -right-[200px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.12) 0%, rgba(0,212,207,0.04) 40%, transparent 70%)' }}
        />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
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
                How much could slow responses
                <br />
                <span className="text-[#6b7280]">be costing you?</span>
              </h2>
              <p className="text-lg text-[#9ca3af] max-w-sm">
                Most service businesses lose thousands every month to missed calls and delayed follow-ups. Let's see your number.
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
          THE CALL CTA
          ============================================ */}
      <section ref={ctaRef} className="py-32 sm:py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Background orbs like hero */}
        <div
          className="absolute w-[1000px] h-[1000px] -top-[300px] left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.12) 0%, rgba(0,212,207,0.04) 40%, transparent 70%)' }}
        />
        <div
          className="absolute w-[700px] h-[700px] top-[40%] -left-[200px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,114,255,0.1) 0%, rgba(124,114,255,0.03) 40%, transparent 70%)' }}
        />
        <div
          className="absolute w-[600px] h-[600px] top-[30%] -right-[150px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,114,255,0.08) 0%, transparent 60%)' }}
        />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />

        <div className="mx-auto max-w-3xl px-6 text-center relative z-10">
          <div className={`transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-[1.1]">
              Let's figure out
              <br />
              <span className="text-[#6b7280]">if we can help.</span>
            </h2>

            <p className="text-xl text-[#9ca3af] mb-10">
              Book a free 30-minute call with our team.
            </p>

            {/* What happens on the call */}
            <div className="text-left max-w-md mx-auto mb-12 space-y-4">
              <p className="text-[#6b7280] font-medium mb-4">What happens on the call:</p>
              {[
                'We learn about your business and how leads reach you today',
                'We identify where opportunities might be slipping through',
                'We tell you honestly if automation makes sense for you'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00d4cf]/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-[#00d4cf]" />
                  </div>
                  <p className="text-[#9ca3af]">{item}</p>
                </div>
              ))}
            </div>

            {/* Final CTA - inline with Call section */}
            <div className="mt-16 pt-10 border-t border-white/10">
              <p className="text-xl text-[#6b7280] mb-6">
                Ready to stop losing money to slow responses?
              </p>
              <button
                onClick={() => navigate('/audit')}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-[#030306] font-semibold rounded-full text-lg transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,212,207,0.5)] hover:scale-[1.02]"
              >
                Book a Free Assessment
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
