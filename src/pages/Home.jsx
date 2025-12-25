import { useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowRight } from 'lucide-react'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const signatureRef = useRef(null)
  const [signatureVisible, setSignatureVisible] = useState(false)
  const [calcRef, calcVisible] = useScrollAnimation(0.1)
  const [statValue, setStatValue] = useState(0)
  const [statVisible, setStatVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [timeDecay, setTimeDecay] = useState(0)

  // Animated counter for 78%
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statVisible) {
          setStatVisible(true)
          let current = 0
          const target = 78
          const duration = 1800
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
      { threshold: 0.2 }
    )

    const statElement = document.getElementById('stat-section')
    if (statElement) {
      observer.observe(statElement)
    }

    return () => {
      if (statElement) {
        observer.unobserve(statElement)
      }
    }
  }, [statVisible])

  // Signature section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSignatureVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const currentRef = signatureRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  // Time decay visualization
  useEffect(() => {
    if (signatureVisible) {
      let progress = 0
      const duration = 3000
      const interval = setInterval(() => {
        progress += 2
        if (progress >= 100) {
          setTimeDecay(100)
          clearInterval(interval)
        } else {
          setTimeDecay(progress)
        }
      }, duration / 50)
      return () => clearInterval(interval)
    }
  }, [signatureVisible])

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 100,
        y: (e.clientY - rect.top - rect.height / 2) / 100
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
    <div className="bg-[#030306] overflow-hidden">

      {/* ============================================
          HERO — MINIMAL, VISUAL-FIRST
          ============================================ */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center pt-32 pb-40 relative overflow-hidden">
        
        {/* Single gradient orb */}
        <div className="absolute inset-0">
          <div
            className="absolute w-[1600px] h-[1600px] -top-[600px] left-1/2 -translate-x-1/2 rounded-full opacity-15 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.4) 0%, transparent 70%)',
              transform: `translate(calc(-50% + ${mousePos.x * 5}px), ${mousePos.y * 5}px)`,
              transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-12 animate-fade-in-up">
              Response speed is revenue infrastructure.
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-20 animate-fade-in-up animation-delay-200">
              <button
                onClick={scrollToCalculator}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#030306] font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(0,212,207,0.5)]"
              >
                <span>Run the Lead Leak Check</span>
                <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          SIGNATURE MOMENT — TIME DECAY VISUALIZATION
          ============================================ */}
      <section ref={signatureRef} className="min-h-screen flex items-center justify-center py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/20 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            
            {/* Left: Minimal text */}
            <div>
              <div className="text-8xl sm:text-9xl font-bold text-white leading-[0.85] tracking-tight mb-16">
                Response delay is revenue decay.
              </div>
            </div>

            {/* Right: Time decay visualization */}
            <div className="relative">
              {/* Time axis */}
              <div className="relative h-96">
                {/* Vertical timeline */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#1a2332]" />
                
                {/* Decay curve */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="decayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d4cf" stopOpacity="1" />
                      <stop offset="100%" stopColor="#7c72ff" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  
                  {/* Animated decay path */}
                  <path
                    d={`M 0 0 Q 100 ${100 + timeDecay * 2} 200 ${150 + timeDecay * 1.5} T 400 ${200 + timeDecay}`}
                    fill="none"
                    stroke="url(#decayGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      opacity: signatureVisible ? 1 : 0,
                      transition: 'opacity 1s',
                      filter: 'drop-shadow(0 0 20px rgba(0,212,207,0.5))'
                    }}
                  />
                  
                  {/* Time markers */}
                  {[0, 1, 2, 3, 4].map((hour, i) => (
                    <g key={i}>
                      <line
                        x1={i * 100}
                        y1={0}
                        x2={i * 100}
                        y2={400}
                        stroke="#1a2332"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                      <text
                        x={i * 100}
                        y={390}
                        fill="#6b7280"
                        fontSize="12"
                        textAnchor="middle"
                      >
                        {hour}h
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Decay percentage indicators */}
                <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-8">
                  {[0, 10, 25, 40, 60].map((percent, i) => (
                    <div
                      key={i}
                      className="text-right"
                      style={{
                        opacity: signatureVisible && timeDecay > i * 15 ? 1 : 0.3,
                        transform: signatureVisible && timeDecay > i * 15 ? 'translateX(0)' : 'translateX(20px)',
                        transition: `all 0.5s ${i * 0.1}s`
                      }}
                    >
                      <span className="text-2xl font-bold text-white">{percent}%</span>
                      <span className="text-sm text-[#6b7280] ml-2">lost</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          STAT — ANIMATED, VISUAL
          ============================================ */}
      <section id="stat-section" className="py-60 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/30 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div className="mx-auto max-w-6xl px-6 text-center relative z-10">
          <div className="inline-block relative">
            {/* Large animated number */}
            <div 
              className="text-[20rem] sm:text-[24rem] font-bold text-white mb-8 relative leading-none"
              style={{
                fontVariantNumeric: 'tabular-nums',
                textShadow: statVisible ? '0 0 100px rgba(0,212,207,0.6)' : 'none',
                transition: 'text-shadow 0.5s'
              }}
            >
              <span 
                className="inline-block"
                style={{
                  background: statVisible 
                    ? 'linear-gradient(135deg, #ffffff 0%, #00d4cf 50%, #7c72ff 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transition: 'background 2s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                {statValue}%
              </span>
              
              {/* Expanding rings */}
              {statVisible && [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border-4 border-[#00d4cf]"
                  style={{
                    opacity: 0.2 - (i * 0.1),
                    transform: `scale(${1.1 + i * 0.15})`,
                    animation: `pulse-ring 3s ease-out infinite ${i * 0.5}s`
                  }}
                />
              ))}
            </div>
            
            <div className="text-3xl text-[#6b7280] max-w-2xl mx-auto">
              of customers hire whoever responds first.
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          CALCULATOR — MINIMAL CONTEXT
          ============================================ */}
      <section id="calculator" className="py-60 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/30 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div
          ref={calcRef}
          className={`mx-auto max-w-5xl px-6 relative z-10 transition-all duration-1000 ${
            calcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <div className="text-6xl sm:text-7xl font-bold text-white mb-12 leading-[1.05]">
                How much are slow responses costing you?
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[#00d4cf]/10 to-[#7c72ff]/10 blur-2xl opacity-50" />
              <div className="relative">
                <LossCalculator onComplete={handleCalculatorComplete} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          FINAL CTA — DECLARATIVE
          ============================================ */}
      <section className="py-60 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <div className="text-7xl sm:text-8xl font-bold text-white mb-16 leading-[0.9]">
            Stop losing leads.
          </div>
          
          <button
            onClick={scrollToCalculator}
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-white text-[#030306] font-semibold rounded-full text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(0,212,207,0.6)]"
          >
            <span>Run the Lead Leak Check</span>
            <ArrowDown className="w-6 h-6 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </section>

    </div>
  )
}
