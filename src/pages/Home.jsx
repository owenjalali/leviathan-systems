import { useNavigate } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'
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

  // Simulated live leads
  const leads = [
    { id: 1, source: 'Phone', time: '0:12', status: 'Responded', value: '$2,500' },
    { id: 2, source: 'Form', time: '0:08', status: 'Responded', value: '$1,800' },
    { id: 3, source: 'SMS', time: '0:15', status: 'Responded', value: '$3,200' },
    { id: 4, source: 'Phone', time: '0:05', status: 'Responded', value: '$2,100' },
  ]

  // Cycle through leads
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLead((prev) => (prev + 1) % 4)
    }, 3000)
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
      { threshold: 0.2 }
    )

    const currentRef = statRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [statVisible])

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 120,
        y: (e.clientY - rect.top - rect.height / 2) / 120
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
          HERO — PRODUCT IN ACTION
          ============================================ */}
      <section ref={heroRef} className="min-h-screen flex items-center pt-32 pb-40 relative overflow-hidden">
        
        <div className="absolute inset-0">
          <div
            className="absolute w-[1800px] h-[1800px] -top-[700px] left-1/2 -translate-x-1/2 rounded-full opacity-12 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.4) 0%, transparent 70%)',
              transform: `translate(calc(-50% + ${mousePos.x * 6}px), ${mousePos.y * 6}px)`,
              transition: 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            
            {/* Left: Text */}
            <div className="lg:col-span-2">
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-16">
                Response speed is revenue infrastructure.
              </h1>
              
              <button
                onClick={scrollToCalculator}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#030306] font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(0,212,207,0.5)]"
              >
                <span>Run the Lead Leak Check</span>
                <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>

            {/* Right: Dashboard */}
            <div className="lg:col-span-3 relative">
              <div className="relative rounded-3xl border border-[#1a2332]/50 bg-[#0a0f1a]/60 backdrop-blur-2xl overflow-hidden">
                
                <div className="px-8 py-6 border-b border-[#1a2332] flex items-center justify-between">
                  <div>
                    <div className="text-sm text-[#6b7280] mb-1">Today</div>
                    <div className="text-2xl font-bold text-white">$9,600</div>
                    <div className="text-xs text-[#00d4cf] mt-1">+4 leads responded</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00d4cf] animate-pulse" />
                    <span className="text-xs text-[#6b7280]">Live</span>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  {leads.map((lead, i) => (
                    <div
                      key={lead.id}
                      className={`p-6 rounded-2xl border transition-all duration-500 ${
                        i === activeLead
                          ? 'border-[#00d4cf]/50 bg-[#00d4cf]/5 scale-[1.02]'
                          : 'border-[#1a2332] bg-[#030306]/50'
                      }`}
                      style={{
                        opacity: i === activeLead ? 1 : 0.6,
                        transform: i === activeLead ? 'translateX(0)' : 'translateX(-10px)'
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            i === activeLead ? 'bg-[#00d4cf] animate-pulse' : 'bg-[#4b5563]'
                          }`} />
                          <span className="text-sm font-medium text-white">{lead.source}</span>
                        </div>
                        <span className="text-xs text-[#6b7280] font-mono">{lead.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          i === activeLead ? 'text-[#00d4cf]' : 'text-[#6b7280]'
                        }`}>
                          {lead.status}
                        </span>
                        <span className="text-lg font-bold text-white">{lead.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-8 py-6 border-t border-[#1a2332] bg-[#030306]/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6b7280]">Response time</span>
                    <span className="text-[#00d4cf] font-mono font-bold">&lt;60s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          STAT — ANIMATED NUMBER
          ============================================ */}
      <section ref={statRef} id="stat-section" className="py-60 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/20 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
          <div 
            className="text-[12rem] sm:text-[16rem] lg:text-[20rem] font-bold text-white mb-8 leading-none"
            style={{
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.05em',
              textShadow: statVisible ? '0 0 100px rgba(0,212,207,0.5)' : 'none',
              transition: 'text-shadow 0.5s'
            }}
          >
            <span 
              style={{
                background: statVisible 
                  ? 'linear-gradient(135deg, #ffffff 0%, #00d4cf 50%, #7c72ff 100%)'
                  : '#ffffff',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transition: 'background 2s cubic-bezier(0.22, 1, 0.36, 1)',
                display: 'inline-block'
              }}
            >
              {statValue}%
            </span>
          </div>
          
          <div className="text-2xl text-[#6b7280] max-w-xl mx-auto">
            of customers hire whoever responds first.
          </div>
        </div>
      </section>


      {/* ============================================
          CALCULATOR
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
          FINAL CTA
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
