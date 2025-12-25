import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SystemDiagram from '../components/SystemDiagram'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Home() {
  const navigate = useNavigate()
  const [systemRef, systemVisible] = useScrollAnimation(0.15)
  const [calcRef, calcVisible] = useScrollAnimation(0.1)
  const [beliefRef, beliefVisible] = useScrollAnimation(0.2)
  const [outcomeRef, outcomeVisible] = useScrollAnimation(0.15)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.2)

  const handleCalculatorComplete = (results) => {
    sessionStorage.setItem('calculatorResults', JSON.stringify(results))
    navigate('/audit')
  }

  return (
    <div className="bg-[#050509] overflow-hidden">

      {/* ============================================
          SECTION 1: HERO — STATUS FILTER
          70% visual, 30% text. Declarative. No pain.
          ============================================ */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 relative">
        {/* Atmospheric background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050509] via-[#080c14] to-[#050509]" />

          {/* Ambient orbs */}
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-[#00d4cf]/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-[#00d4cf]/[0.02] rounded-full blur-[100px]" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                               linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />

          {/* Top line accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          {/* Minimal text - declarative only */}
          <div className="max-w-2xl mb-16 sm:mb-20">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-[#1a2332] bg-[#0a0f1a]/50"
              style={{ animation: 'fadeInUp 0.8s ease-out' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00d4cf] animate-pulse" />
              <span className="text-xs text-[#6b7280] font-mono uppercase tracking-wider">
                Infrastructure
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight mb-6"
              style={{ animation: 'fadeInUp 0.8s ease-out 0.1s backwards' }}
            >
              Revenue capture
              <span className="block text-[#6b7280]">infrastructure.</span>
            </h1>

            <p
              className="text-lg text-[#6b7280] leading-relaxed max-w-lg"
              style={{ animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}
            >
              Inbound leads responded to in under 60 seconds.
              <span className="text-[#9ca3af]"> Qualified. Booked. Synced.</span> Around the clock.
            </p>
          </div>

          {/* The visual - this is 70% of the hero */}
          <div style={{ animation: 'fadeInUp 0.8s ease-out 0.3s backwards' }}>
            <SystemDiagram />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#4b5563] to-transparent" />
        </div>
      </section>


      {/* ============================================
          SECTION 2: SYSTEM OVERVIEW — SILENT PROOF
          Let the system speak. Observation > explanation.
          ============================================ */}
      <section className="py-24 sm:py-32 relative">
        {/* Section background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050509] via-[#0a0f1a] to-[#050509]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />
        </div>

        <div
          ref={systemRef}
          className={`mx-auto max-w-5xl px-6 relative z-10 transition-all duration-1000 ease-out ${
            systemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-px bg-[#1a2332]/50 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            {[
              { metric: '<60s', label: 'Response time', sublabel: 'Every lead, instantly' },
              { metric: '24/7', label: 'Coverage', sublabel: 'No gaps, no delays' },
              { metric: '0', label: 'Leads forgotten', sublabel: 'Complete capture' },
            ].map((item, i) => (
              <div
                key={item.label}
                className="relative bg-[#0a0f1a] p-8 sm:p-10 text-center group overflow-hidden"
                style={{
                  transitionDelay: systemVisible ? `${i * 100}ms` : '0ms'
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00d4cf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <p className="relative text-4xl sm:text-5xl font-semibold text-white mb-2 font-mono tracking-tight">
                  {item.metric}
                </p>
                <p className="relative text-sm text-[#9ca3af] font-medium mb-1">
                  {item.label}
                </p>
                <p className="relative text-xs text-[#4b5563]">
                  {item.sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 3: LOSS CALCULATOR — PAIN, NOW EARNED
          Authority established. Now quantify the problem.
          Math, not fear. Diagnosis, not blame.
          ============================================ */}
      <section className="py-24 sm:py-32 relative">
        {/* Section background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#050509]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

          {/* Ambient glow */}
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#00d4cf]/[0.02] rounded-full blur-[100px] -translate-y-1/2" />
        </div>

        <div
          ref={calcRef}
          className={`mx-auto max-w-6xl px-6 relative z-10 transition-all duration-1000 ease-out ${
            calcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Context - minimal */}
            <div
              className="max-w-md"
              style={{
                transitionDelay: calcVisible ? '100ms' : '0ms'
              }}
            >
              <p className="text-xs text-[#4b5563] uppercase tracking-widest mb-4 font-mono">
                Latency Audit
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 leading-tight">
                Measure response
                <span className="text-[#6b7280]"> delay cost.</span>
              </h2>
              <p className="text-[#6b7280] leading-relaxed mb-8">
                Every minute between inbound and response compounds into lost revenue. This calculates the current gap.
              </p>

              {/* Visual accent */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex -space-x-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-[#1a2332] border-2 border-[#050509]"
                      style={{
                        animationDelay: `${i * 200}ms`,
                        animation: calcVisible ? 'fadeIn 0.5s ease-out backwards' : 'none'
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#2a3441]">
                  Based on response decay model
                </span>
              </div>
            </div>

            {/* Calculator with glow */}
            <div
              className="relative"
              style={{
                transitionDelay: calcVisible ? '200ms' : '0ms'
              }}
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00d4cf]/5 via-transparent to-transparent rounded-3xl blur-xl opacity-60" />
              <div className="relative">
                <LossCalculator onComplete={handleCalculatorComplete} />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 4: WHY THIS EXISTS — BELIEF LAYER
          1-2 statements maximum. No storytelling.
          ============================================ */}
      <section className="py-24 sm:py-32 relative">
        {/* Section background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050509] via-[#080c14] to-[#050509]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />
        </div>

        <div
          ref={beliefRef}
          className={`mx-auto max-w-3xl px-6 text-center relative z-10 transition-all duration-1000 ease-out ${
            beliefVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#1a2332]" />
            <div className="w-2 h-2 rounded-full border border-[#1a2332]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#1a2332]" />
          </div>

          <p className="text-xl sm:text-2xl lg:text-3xl text-[#9ca3af] leading-relaxed font-light">
            Speed compounds.
            <span className="text-[#6b7280]"> Humans introduce latency.</span>
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white leading-relaxed mt-4 font-normal">
            Latency kills inbound economics.
          </p>

          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#1a2332]" />
            <div className="w-2 h-2 rounded-full border border-[#1a2332]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#1a2332]" />
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 5: OUTCOMES — ABSTRACTED IMPLEMENTATION
          Results, not features. No tools, no APIs, no tech.
          ============================================ */}
      <section className="py-24 sm:py-32 relative">
        {/* Section background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#050509]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />
        </div>

        <div
          ref={outcomeRef}
          className={`mx-auto max-w-4xl px-6 relative z-10 transition-all duration-1000 ease-out ${
            outcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
            {[
              { outcome: 'Response time drops to seconds.', delay: 0 },
              { outcome: 'Booking rate increases.', delay: 100 },
              { outcome: 'Lead decay eliminated.', delay: 200 },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center group"
                style={{
                  transitionDelay: outcomeVisible ? `${item.delay}ms` : '0ms'
                }}
              >
                {/* Animated line */}
                <div className="relative w-px h-12 mx-auto mb-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a2332] to-transparent" />
                  <div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00d4cf] to-transparent transition-all duration-700 group-hover:h-full"
                    style={{ height: outcomeVisible ? '100%' : '0%' }}
                  />
                </div>

                <p className="text-white text-lg font-medium">
                  {item.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 6: CTA — CONFIDENT, SOFT
          Invite exploration. No urgency.
          ============================================ */}
      <section className="py-24 sm:py-32 relative">
        {/* Section background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050509] via-[#0a0f1a] to-[#050509]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00d4cf]/[0.02] rounded-full blur-[100px]" />
        </div>

        <div
          ref={ctaRef}
          className={`mx-auto max-w-2xl px-6 text-center relative z-10 transition-all duration-1000 ease-out ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-6">
            See if it fits.
          </h2>
          <p className="text-[#6b7280] mb-10 max-w-md mx-auto leading-relaxed">
            30 minutes. We review your current response flow and show how the system maps to it.
          </p>

          <Link
            to="/audit"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#050509] font-medium rounded-full transition-all duration-300 hover:bg-[#00d4cf] hover:shadow-[0_0_40px_rgba(0,212,207,0.3)]"
          >
            View response architecture
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <p className="text-[#2a3441] text-sm mt-8">
            No pitch. No pressure.
          </p>
        </div>
      </section>

      {/* Global animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

    </div>
  )
}
