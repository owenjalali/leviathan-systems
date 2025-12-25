import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowDown } from 'lucide-react'
import SystemDiagram from '../components/SystemDiagram'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useState } from 'react'

// Floating orb component
const FloatingOrb = ({ className, delay = 0, duration = 20 }) => (
  <div
    className={`absolute rounded-full pointer-events-none ${className}`}
    style={{
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  />
)

// Noise texture overlay
const NoiseOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
)

export default function Home() {
  const navigate = useNavigate()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [systemRef, systemVisible] = useScrollAnimation(0.15)
  const [calcRef, calcVisible] = useScrollAnimation(0.1)
  const [beliefRef, beliefVisible] = useScrollAnimation(0.2)
  const [outcomeRef, outcomeVisible] = useScrollAnimation(0.15)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.2)

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleCalculatorComplete = (results) => {
    sessionStorage.setItem('calculatorResults', JSON.stringify(results))
    navigate('/audit')
  }

  return (
    <div className="bg-[#030306] overflow-hidden">

      {/* ============================================
          SECTION 1: HERO — ELITE VISUAL EXPERIENCE
          ============================================ */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 relative">

        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base dark gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,212,207,0.08),transparent)]" />

          {/* Animated gradient orbs */}
          <div
            className="absolute w-[800px] h-[800px] -top-[200px] -left-[200px] rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.12) 0%, transparent 70%)',
              transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] top-[20%] -right-[100px] rounded-full opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.08) 0%, transparent 70%)',
              transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] bottom-[10%] left-[20%] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(120,119,198,0.08) 0%, transparent 70%)',
              transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />

          {/* Floating geometric elements */}
          <FloatingOrb
            className="w-2 h-2 bg-[#00d4cf]/30 top-[20%] left-[15%] blur-[1px]"
            delay={0}
            duration={15}
          />
          <FloatingOrb
            className="w-3 h-3 bg-[#00d4cf]/20 top-[60%] left-[10%] blur-[2px]"
            delay={2}
            duration={18}
          />
          <FloatingOrb
            className="w-1.5 h-1.5 bg-white/20 top-[30%] right-[20%] blur-[1px]"
            delay={1}
            duration={20}
          />
          <FloatingOrb
            className="w-4 h-4 bg-[#00d4cf]/10 top-[70%] right-[15%] blur-[3px]"
            delay={3}
            duration={22}
          />
          <FloatingOrb
            className="w-2 h-2 bg-purple-500/15 top-[50%] left-[50%] blur-[2px]"
            delay={1.5}
            duration={17}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          />

          {/* Radial fade */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030306_75%)]" />

          <NoiseOverlay />
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          {/* Minimal text - declarative only */}
          <div className="max-w-3xl mb-16 sm:mb-20">
            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full border border-[#1a2332]/50 bg-[#0a0f1a]/30 backdrop-blur-xl"
              style={{ animation: 'blurIn 0.8s ease-out' }}
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-[#00d4cf]" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#00d4cf] animate-ping opacity-75" />
              </div>
              <span className="text-xs text-[#9ca3af] font-medium tracking-wide">
                Revenue Capture Infrastructure
              </span>
            </div>

            {/* Gradient headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-8"
              style={{ animation: 'blurIn 0.8s ease-out 0.1s backwards' }}
            >
              <span className="text-white">Every lead.</span>
              <br />
              <span className="bg-gradient-to-r from-[#00d4cf] via-[#00d4cf] to-[#7c72ff] bg-clip-text text-transparent">
                Under 60 seconds.
              </span>
            </h1>

            <p
              className="text-xl text-[#6b7280] leading-relaxed max-w-xl"
              style={{ animation: 'blurIn 0.8s ease-out 0.2s backwards' }}
            >
              Inbound response infrastructure that captures, qualifies, and books—
              <span className="text-[#9ca3af]">around the clock.</span>
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap items-center gap-4 mt-10"
              style={{ animation: 'blurIn 0.8s ease-out 0.3s backwards' }}
            >
              <Link
                to="/audit"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-white text-[#030306] font-medium rounded-full transition-all duration-300 hover:bg-[#00d4cf] hover:shadow-[0_0_50px_rgba(0,212,207,0.4)] hover:scale-[1.02]"
              >
                See how it works
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 px-6 py-4 text-[#9ca3af] hover:text-white transition-colors"
              >
                Calculate your gap
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* The visual - System Diagram */}
          <div style={{ animation: 'blurIn 1s ease-out 0.4s backwards' }}>
            <SystemDiagram />
          </div>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#00d4cf]/30 to-transparent animate-pulse" />
        </div>
      </section>


      {/* ============================================
          SECTION 2: METRICS — GLASS CARDS
          ============================================ */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#080c14] to-[#030306]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />
          <NoiseOverlay />
        </div>

        <div
          ref={systemRef}
          className={`mx-auto max-w-5xl px-6 relative z-10 transition-all duration-1000 ${
            systemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { metric: '<60s', label: 'Response', sublabel: 'Every lead, instantly' },
              { metric: '24/7', label: 'Coverage', sublabel: 'No gaps, no delays' },
              { metric: '0', label: 'Forgotten', sublabel: 'Complete capture' },
            ].map((item, i) => (
              <div
                key={item.label}
                className="group relative"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  animation: systemVisible ? `slideUp 0.6s ease-out ${i * 0.1}s backwards` : 'none'
                }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#00d4cf]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                {/* Card */}
                <div className="relative p-8 sm:p-10 rounded-2xl border border-[#1a2332]/50 bg-[#0a0f1a]/50 backdrop-blur-xl overflow-hidden">
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#00d4cf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                      backgroundSize: '24px 24px'
                    }}
                  />

                  <p className="relative text-5xl sm:text-6xl font-bold text-white mb-3 font-mono tracking-tighter">
                    {item.metric}
                  </p>
                  <p className="relative text-base text-white font-medium mb-1">
                    {item.label}
                  </p>
                  <p className="relative text-sm text-[#6b7280]">
                    {item.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 3: CALCULATOR — WITH AMBIENT GLOW
          ============================================ */}
      <section id="calculator" className="py-24 sm:py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#030306]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

          {/* Large ambient glow */}
          <div className="absolute top-1/2 right-[10%] w-[600px] h-[600px] bg-[#00d4cf]/[0.04] rounded-full blur-[150px] -translate-y-1/2" />

          <NoiseOverlay />
        </div>

        <div
          ref={calcRef}
          className={`mx-auto max-w-6xl px-6 relative z-10 transition-all duration-1000 ${
            calcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left - Context */}
            <div className="max-w-md lg:sticky lg:top-32">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-[#1a2332]/50 bg-[#0a0f1a]/30 backdrop-blur-xl"
              >
                <span className="text-xs text-[#6b7280] font-mono uppercase tracking-wider">
                  Latency Audit
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6 leading-tight">
                Measure response
                <span className="block text-[#6b7280]">delay cost.</span>
              </h2>

              <p className="text-lg text-[#6b7280] leading-relaxed mb-8">
                Every minute between inbound and response compounds into lost revenue. This calculates the current gap.
              </p>

              {/* Visual element */}
              <div className="hidden lg:block">
                <div className="flex items-center gap-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-8 rounded-full bg-gradient-to-t from-[#1a2332] to-[#00d4cf]/30"
                      style={{
                        height: `${20 + i * 10}px`,
                        opacity: 0.3 + i * 0.15
                      }}
                    />
                  ))}
                  <span className="ml-2 text-xs text-[#4b5563]">Response decay curve</span>
                </div>
              </div>
            </div>

            {/* Right - Calculator */}
            <div className="relative">
              {/* Glow behind calculator */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#00d4cf]/10 via-transparent to-purple-500/5 rounded-3xl blur-2xl opacity-50" />
              <div className="relative">
                <LossCalculator onComplete={handleCalculatorComplete} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 4: BELIEF — STATEMENT
          ============================================ */}
      <section className="py-32 sm:py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f14] to-[#030306]" />

          {/* Animated gradient background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(0,212,207,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(124,114,255,0.06) 0%, transparent 50%)'
            }}
          />

          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />
          <NoiseOverlay />
        </div>

        <div
          ref={beliefRef}
          className={`mx-auto max-w-4xl px-6 text-center relative z-10 transition-all duration-1000 ${
            beliefVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#00d4cf]/30" />
            <div className="w-2 h-2 rounded-full border border-[#00d4cf]/30" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#00d4cf]/30" />
          </div>

          <p className="text-2xl sm:text-3xl lg:text-4xl text-[#9ca3af] leading-relaxed font-light mb-6">
            Speed compounds.
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl leading-relaxed mb-6">
            <span className="text-[#6b7280]">Humans introduce </span>
            <span className="bg-gradient-to-r from-[#00d4cf] to-[#7c72ff] bg-clip-text text-transparent font-medium">
              latency.
            </span>
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white leading-relaxed font-medium">
            Latency kills inbound economics.
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#00d4cf]/30" />
            <div className="w-2 h-2 rounded-full border border-[#00d4cf]/30" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#00d4cf]/30" />
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 5: OUTCOMES — ANIMATED REVEALS
          ============================================ */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#030306]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />
          <NoiseOverlay />
        </div>

        <div
          ref={outcomeRef}
          className={`mx-auto max-w-5xl px-6 relative z-10 transition-all duration-1000 ${
            outcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-16">
            {[
              { outcome: 'Response time', highlight: 'drops to seconds.', delay: 0 },
              { outcome: 'Booking rate', highlight: 'increases.', delay: 150 },
              { outcome: 'Lead decay', highlight: 'eliminated.', delay: 300 },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center group"
                style={{
                  animation: outcomeVisible ? `slideUp 0.6s ease-out ${item.delay}ms backwards` : 'none'
                }}
              >
                {/* Animated line */}
                <div className="relative w-px h-20 mx-auto mb-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a2332] to-transparent" />
                  <div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00d4cf] via-[#00d4cf] to-transparent transition-all duration-1000"
                    style={{
                      height: outcomeVisible ? '100%' : '0%',
                      transitionDelay: `${item.delay + 300}ms`
                    }}
                  />
                  {/* Glowing dot */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00d4cf] shadow-[0_0_10px_rgba(0,212,207,0.8)] transition-all duration-500"
                    style={{
                      opacity: outcomeVisible ? 1 : 0,
                      transitionDelay: `${item.delay + 600}ms`
                    }}
                  />
                </div>

                <p className="text-lg text-[#6b7280] mb-1">
                  {item.outcome}
                </p>
                <p className="text-xl text-white font-medium">
                  {item.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 6: CTA — FINAL PUSH
          ============================================ */}
      <section className="py-32 sm:py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#080c14] to-[#030306]" />

          {/* Large glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00d4cf]/[0.06] rounded-full blur-[150px]" />

          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />
          <NoiseOverlay />
        </div>

        <div
          ref={ctaRef}
          className={`mx-auto max-w-2xl px-6 text-center relative z-10 transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            See if it fits.
          </h2>
          <p className="text-lg text-[#6b7280] mb-12 max-w-md mx-auto leading-relaxed">
            30 minutes. We review your current response flow and show how the system maps to it.
          </p>

          <Link
            to="/audit"
            className="group relative inline-flex items-center gap-3 px-10 py-5 font-medium rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02]"
          >
            {/* Button gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4cf] to-[#00d4cf] group-hover:from-[#00d4cf] group-hover:to-[#7c72ff] transition-all duration-500" />

            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#00d4cf] to-[#7c72ff] blur-xl" />

            <span className="relative text-[#030306] font-semibold">View response architecture</span>
            <ArrowRight className="relative w-5 h-5 text-[#030306] transition-transform group-hover:translate-x-1" />
          </Link>

          <p className="text-[#4b5563] text-sm mt-8">
            No pitch. No pressure.
          </p>
        </div>
      </section>

      {/* Global styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes blurIn {
          from {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
