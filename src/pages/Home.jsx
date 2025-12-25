import { useNavigate } from 'react-router-dom'
import { ArrowDown, Phone, Clock, CheckCircle, Calendar, ArrowRight } from 'lucide-react'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const statRef = useRef(null)
  const [systemRef, systemVisible] = useScrollAnimation(0.1)
  const [calcRef, calcVisible] = useScrollAnimation(0.1)
  const [flowStep, setFlowStep] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [statValue, setStatValue] = useState(0)
  const [statVisible, setStatVisible] = useState(false)

  // Animated flow sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowStep((prev) => (prev + 1) % 5)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

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

    if (statRef.current) {
      observer.observe(statRef.current)
    }

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current)
      }
    }
  }, [statVisible])

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 60,
        y: (e.clientY - rect.top - rect.height / 2) / 60
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

  const scrollToSystem = () => {
    document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' })
  }

  const flowSteps = [
    { icon: Phone, label: 'Lead', color: '#00d4cf' },
    { icon: Clock, label: 'Respond', color: '#00d4cf' },
    { icon: CheckCircle, label: 'Qualify', color: '#7c72ff' },
    { icon: Calendar, label: 'Book', color: '#7c72ff' },
    { icon: CheckCircle, label: 'Sync', color: '#00d4cf' },
  ]

  return (
    <div className="bg-[#030306] overflow-hidden">

      {/* ============================================
          HERO — CREATIVE VISUAL-FIRST
          ============================================ */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center pt-24 pb-32 relative overflow-hidden">
        
        {/* Multi-layer animated gradient background */}
        <div className="absolute inset-0">
          {/* Primary gradient orb */}
          <div
            className="absolute w-[1400px] h-[1400px] -top-[500px] -left-[200px] rounded-full opacity-25 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.4) 0%, rgba(124,114,255,0.3) 40%, transparent 70%)',
              transform: `translate(${mousePos.x * 4}px, ${mousePos.y * 4}px)`,
              transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
              animation: 'pulse-glow 8s ease-in-out infinite'
            }}
          />
          {/* Secondary gradient orb */}
          <div
            className="absolute w-[1000px] h-[1000px] top-[20%] -right-[300px] rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(124,114,255,0.4) 0%, rgba(0,212,207,0.2) 50%, transparent 70%)',
              transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)`,
              transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
              animation: 'pulse-glow 10s ease-in-out infinite 2s'
            }}
          />
          {/* Tertiary accent */}
          <div
            className="absolute w-[800px] h-[800px] bottom-[10%] left-[10%] rounded-full opacity-15 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.3) 0%, transparent 60%)',
              transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
              transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
              animation: 'pulse-glow 12s ease-in-out infinite 4s'
            }}
          />
        </div>

        {/* Animated grid overlay with subtle movement */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 blur-xl"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(0,212,207,0.6), transparent)'
                : 'radial-gradient(circle, rgba(124,114,255,0.6), transparent)',
              animation: `float ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Minimal text */}
            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-8 animate-fade-in-up">
                Response speed is revenue infrastructure.
              </h1>
              <p className="text-2xl text-[#9ca3af] leading-relaxed mb-12 animate-fade-in-up animation-delay-100">
                Inbound leads captured, qualified, and booked automatically—before competitors respond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
                <button
                  onClick={scrollToCalculator}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#030306] font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,212,207,0.4)]"
                >
                  <span>Run the Lead Leak Check</span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </button>
                <button
                  onClick={scrollToSystem}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#2a3441] text-white font-semibold rounded-full transition-all duration-300 hover:border-[#00d4cf]/50 hover:bg-[#00d4cf]/5 hover:scale-105"
                >
                  <span>View the system</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right: Animated system flow */}
            <div className="relative">
              <div className="relative p-12 rounded-3xl border border-[#1a2332]/50 bg-[#0a0f1a]/40 backdrop-blur-2xl">
                
                {/* Animated flow line with gradient */}
                <div className="absolute top-1/2 left-0 right-0 h-[3px]">
                  <div className="absolute inset-0 bg-[#1a2332]" />
                  <div
                    className="absolute inset-y-0 left-0 h-full bg-gradient-to-r from-[#00d4cf] via-[#7c72ff] to-[#00d4cf]"
                    style={{
                      width: `${((flowStep + 1) / 5) * 100}%`,
                      transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                      boxShadow: '0 0 20px rgba(0,212,207,0.5)'
                    }}
                  />
                  {/* Moving glow dot */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#00d4cf]"
                    style={{
                      left: `${((flowStep + 1) / 5) * 100}%`,
                      transition: 'left 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                      boxShadow: '0 0 20px rgba(0,212,207,0.8)',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </div>

                {/* Flow nodes with enhanced animations */}
                <div className="relative flex justify-between items-center">
                  {flowSteps.map((step, i) => {
                    const isActive = i <= flowStep
                    const isCurrent = i === flowStep
                    return (
                      <div
                        key={i}
                        className="relative flex flex-col items-center"
                        style={{
                          transform: isCurrent ? 'scale(1.15)' : isActive ? 'scale(1.05)' : 'scale(1)',
                          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                        }}
                      >
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500 relative"
                          style={{
                            background: isActive
                              ? `linear-gradient(135deg, ${step.color}25, ${step.color}10)`
                              : 'rgba(26, 35, 50, 0.5)',
                            border: `2px solid ${isActive ? step.color : '#1a2332'}`,
                            boxShadow: isCurrent
                              ? `0 0 40px ${step.color}60, inset 0 0 20px ${step.color}20`
                              : isActive
                              ? `0 0 20px ${step.color}30`
                              : 'none'
                          }}
                        >
                          <step.icon
                            className="w-7 h-7 transition-all duration-500"
                            style={{
                              color: isActive ? step.color : '#4b5563',
                              filter: isCurrent ? 'drop-shadow(0 0 8px currentColor)' : 'none'
                            }}
                          />
                          {/* Ripple effect for current step */}
                          {isCurrent && (
                            <div
                              className="absolute inset-0 rounded-2xl border-2"
                              style={{
                                borderColor: step.color,
                                animation: 'ripple 2s ease-out infinite'
                              }}
                            />
                          )}
                        </div>
                        <span
                          className="text-sm font-medium transition-colors duration-500"
                          style={{
                            color: isActive ? '#ffffff' : '#4b5563',
                            textShadow: isCurrent ? `0 0 10px ${step.color}80` : 'none'
                          }}
                        >
                          {step.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Pulse indicator */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-[#6b7280]"
                style={{
                  opacity: systemVisible ? 1 : 0,
                  transition: 'opacity 0.5s'
                }}
              >
                <div className="w-2 h-2 rounded-full bg-[#00d4cf] animate-pulse" style={{ boxShadow: '0 0 10px rgba(0,212,207,0.8)' }} />
                <span>Live system flow</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          PROBLEM — ANIMATED STAT
          ============================================ */}
      <section ref={statRef} className="py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/30 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.3) 0%, transparent 60%)',
              animation: 'pulse-glow 4s ease-in-out infinite'
            }}
          />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-16 leading-[1.05]">
            Response delay is revenue decay.
          </h2>
          
          {/* Animated stat with counting effect */}
          <div className="inline-block relative">
            <div 
              className="text-9xl sm:text-[12rem] font-bold text-white mb-6 relative"
              style={{
                textShadow: '0 0 60px rgba(0,212,207,0.5)',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              <span className="inline-block" style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00d4cf 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {statValue}%
              </span>
              {/* Glowing ring around number */}
              <div
                className="absolute inset-0 rounded-full border-4"
                style={{
                  borderColor: '#00d4cf',
                  opacity: statVisible ? 0.3 : 0,
                  transform: 'scale(1.2)',
                  transition: 'opacity 0.5s',
                  animation: statVisible ? 'pulse-ring 2s ease-in-out infinite' : 'none',
                  filter: 'blur(2px)'
                }}
              />
            </div>
            <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
              of customers hire whoever responds first.
            </p>
            
            {/* Animated progress bar */}
            <div className="mt-8 w-full max-w-md mx-auto h-1 bg-[#1a2332] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00d4cf] to-[#7c72ff] rounded-full"
                style={{
                  width: statVisible ? '78%' : '0%',
                  transition: 'width 2s cubic-bezier(0.22, 1, 0.36, 1)',
                  boxShadow: '0 0 20px rgba(0,212,207,0.6)'
                }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          SYSTEM — ENHANCED FLOW VISUALIZATION
          ============================================ */}
      <section id="system" className="py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/50 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        {/* Creative background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-5 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(124,114,255,0.4), transparent)',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
        </div>

        <div
          ref={systemRef}
          className={`mx-auto max-w-7xl px-6 relative z-10 transition-all duration-1000 ${
            systemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="text-center mb-24">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Lead → Response → Qualification → Booking → CRM
            </h2>
            <p className="text-xl text-[#6b7280]">
              One system. All channels. Automatic.
            </p>
          </div>

          {/* Large flow visualization with enhanced animations */}
          <div className="relative">
            <div className="grid grid-cols-5 gap-8">
              {flowSteps.map((step, i) => (
                <div
                  key={i}
                  className="relative group"
                  style={{
                    opacity: systemVisible ? 1 : 0,
                    transform: systemVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.15}s`
                  }}
                >
                  {/* Enhanced connecting arrow with glow */}
                  {i < flowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-24 left-full w-8 h-[3px] bg-[#1a2332] z-0">
                      <div
                        className="absolute inset-y-0 left-0 h-full bg-gradient-to-r from-[#00d4cf] to-[#7c72ff]"
                        style={{
                          width: systemVisible ? '100%' : '0%',
                          transition: `width 1s cubic-bezier(0.22, 1, 0.36, 1) ${0.5 + i * 0.15}s`,
                          boxShadow: '0 0 10px rgba(0,212,207,0.5)'
                        }}
                      />
                    </div>
                  )}

                  <div className="relative p-10 rounded-3xl border border-[#1a2332] bg-[#0a0f1a]/60 backdrop-blur-xl transition-all duration-500 group-hover:border-[#2a3441] group-hover:bg-[#0d1320] group-hover:scale-105 group-hover:shadow-[0_20px_60px_-15px_rgba(0,212,207,0.2)]">
                    {/* Glow effect on hover */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${step.color}20 0%, transparent 70%)`
                      }}
                    />
                    
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-[#00d4cf]/10 border border-[#00d4cf]/20 group-hover:scale-110 group-hover:bg-[#00d4cf]/20 transition-all duration-300 relative">
                      <step.icon className="w-10 h-10 text-[#00d4cf] group-hover:drop-shadow-[0_0_15px_currentColor]" />
                      {/* Rotating ring on hover */}
                      <div
                        className="absolute inset-0 rounded-2xl border-2 border-[#00d4cf] opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                        style={{
                          animation: 'spin 3s linear infinite'
                        }}
                      />
                    </div>
                    <p className="text-xl font-semibold text-white">{step.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          CALCULATOR — VISUAL DIAGNOSTIC
          ============================================ */}
      <section id="calculator" className="py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/30 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,207,0.3) 0%, transparent 60%)',
            animation: 'pulse-glow 6s ease-in-out infinite'
          }}
        />

        <div
          ref={calcRef}
          className={`mx-auto max-w-7xl px-6 relative z-10 transition-all duration-1000 ${
            calcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-[1.05]">
                How much are slow responses costing you?
              </h2>
              <p className="text-xl text-[#9ca3af] leading-relaxed">
                Every minute between a lead coming in and someone responding, the chance of booking that job drops.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[#00d4cf]/10 to-[#7c72ff]/10 blur-2xl opacity-50 animate-pulse-glow" />
              <div className="relative">
                <LossCalculator onComplete={handleCalculatorComplete} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          OUTCOME — MINIMAL VISUAL STATEMENTS
          ============================================ */}
      <section className="py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/50 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Every inbound lead is responded to, qualified, and booked automatically.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'No missed leads', desc: 'Every call, form, and text captured and responded to within 60 seconds.' },
              { title: 'Automatic qualification', desc: 'System asks your questions and filters out bad fits before you spend time.' },
              { title: 'Instant booking', desc: 'Qualified leads book directly into your calendar. No back-and-forth.' },
              { title: 'Complete sync', desc: 'All lead data and interactions flow into your CRM automatically.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="p-10 rounded-3xl border border-[#1a2332] bg-[#0a0f1a]/60 backdrop-blur-sm transition-all duration-500 hover:border-[#2a3441] hover:bg-[#0d1320] hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(0,212,207,0.1)]"
                style={{
                  opacity: calcVisible ? 1 : 0,
                  transform: calcVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.1}s`
                }}
              >
                <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-[#6b7280] leading-relaxed text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================
          PROOF — MOVED TO BOTTOM
          ============================================ */}
      <section className="py-40 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(124,114,255,0.2) 0%, transparent 60%)',
              animation: 'pulse-glow 8s ease-in-out infinite'
            }}
          />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl sm:text-6xl font-bold text-white leading-[1.05] mb-8">
                78% of customers hire whoever responds first.
              </h2>
              <p className="text-xl text-[#9ca3af] leading-relaxed mb-6">
                Built for home service businesses. HVAC, plumbing, electrical, roofing, landscaping, cleaning.
              </p>
              <p className="text-lg text-[#6b7280] leading-relaxed">
                Custom infrastructure. You own it. Working systems that capture, respond, and book—automatically.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-[#1a2332] bg-[#0a0f1a]/60 backdrop-blur-sm">
              <p className="text-sm text-white font-semibold mb-6">Response decay model</p>
              <div className="space-y-3 text-sm text-[#9ca3af] mb-6">
                <div className="flex justify-between">
                  <span>Under 5 min</span>
                  <span className="text-[#00d4cf] font-mono">0% loss</span>
                </div>
                <div className="flex justify-between">
                  <span>5-15 min</span>
                  <span className="text-[#00d4cf] font-mono">10% lost</span>
                </div>
                <div className="flex justify-between">
                  <span>15-60 min</span>
                  <span className="text-[#00d4cf] font-mono">25% lost</span>
                </div>
                <div className="flex justify-between">
                  <span>1-4 hours</span>
                  <span className="text-[#00d4cf] font-mono">40% lost</span>
                </div>
                <div className="flex justify-between">
                  <span>4-24 hours</span>
                  <span className="text-[#00d4cf] font-mono">60% lost</span>
                </div>
              </div>
              <p className="text-xs text-[#4b5563] pt-6 border-t border-[#1a2332]">
                Based on industry response data. Conservative estimates. Even if this model is off by 50%, the loss is still material.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          FINAL CTA — DECLARATIVE
          ============================================ */}
      <section className="py-40 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,212,207,0.2) 0%, transparent 60%)',
            animation: 'pulse-glow 6s ease-in-out infinite'
          }}
        />

        <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8">
            Stop losing leads.
          </h2>
          <p className="text-xl text-[#6b7280] mb-12 max-w-2xl mx-auto">
            Schedule a 30-minute call. We'll look at your current response flow and show you exactly how the system would work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToCalculator}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#030306] font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(0,212,207,0.5)]"
            >
              <span>Run the Lead Leak Check</span>
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={scrollToSystem}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-[#2a3441] text-white font-semibold rounded-full text-lg transition-all duration-300 hover:border-[#00d4cf]/50 hover:bg-[#00d4cf]/5 hover:scale-105"
            >
              <span>View the system</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
