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

  const handleCalculatorComplete = (results) => {
    sessionStorage.setItem('calculatorResults', JSON.stringify(results))
    navigate('/audit')
  }

  return (
    <div className="bg-[#050509]">

      {/* ============================================
          SECTION 1: HERO — STATUS FILTER
          70% visual, 30% text. Declarative. No pain.
          ============================================ */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-6">

          {/* Minimal text - declarative only */}
          <div className="max-w-2xl mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] tracking-tight mb-6">
              Revenue capture infrastructure.
            </h1>
            <p className="text-lg text-[#6b7280] leading-relaxed max-w-lg">
              Inbound leads responded to in under 60 seconds. Qualified. Booked. Synced. Around the clock.
            </p>
          </div>

          {/* The visual - this is 70% of the hero */}
          <SystemDiagram />

        </div>
      </section>


      {/* ============================================
          SECTION 2: SYSTEM OVERVIEW — SILENT PROOF
          Let the system speak. Observation > explanation.
          ============================================ */}
      <section className="py-32 border-t border-[#1a2332]/50">
        <div
          ref={systemRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-1000 ease-out ${
            systemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-px bg-[#1a2332]/30 rounded-2xl overflow-hidden">
            {[
              { metric: '<60s', label: 'Response time' },
              { metric: '24/7', label: 'Coverage' },
              { metric: '0', label: 'Leads forgotten' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#0a0f1a] p-10 text-center"
              >
                <p className="text-4xl sm:text-5xl font-semibold text-white mb-2 font-mono tracking-tight">
                  {item.metric}
                </p>
                <p className="text-sm text-[#4b5563]">
                  {item.label}
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
      <section className="py-32 border-t border-[#1a2332]/50">
        <div
          ref={calcRef}
          className={`mx-auto max-w-6xl px-6 transition-all duration-1000 ease-out ${
            calcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Context - minimal */}
            <div className="max-w-md">
              <p className="text-xs text-[#4b5563] uppercase tracking-widest mb-4 font-mono">
                Latency audit
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 leading-tight">
                Measure response delay cost.
              </h2>
              <p className="text-[#6b7280] leading-relaxed">
                Every minute between inbound and response compounds into lost revenue. This calculates the current gap.
              </p>
            </div>

            {/* Calculator */}
            <div>
              <LossCalculator onComplete={handleCalculatorComplete} />
            </div>

          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 4: WHY THIS EXISTS — BELIEF LAYER
          1-2 statements maximum. No storytelling.
          ============================================ */}
      <section className="py-32 border-t border-[#1a2332]/50">
        <div
          ref={beliefRef}
          className={`mx-auto max-w-3xl px-6 text-center transition-all duration-1000 ease-out ${
            beliefVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xl sm:text-2xl text-[#9ca3af] leading-relaxed font-light">
            Speed compounds. Humans introduce latency.
            <span className="block mt-2 text-white font-normal">
              Latency kills inbound economics.
            </span>
          </p>
        </div>
      </section>


      {/* ============================================
          SECTION 5: OUTCOMES — ABSTRACTED IMPLEMENTATION
          Results, not features. No tools, no APIs, no tech.
          ============================================ */}
      <section className="py-32 border-t border-[#1a2332]/50">
        <div
          ref={outcomeRef}
          className={`mx-auto max-w-4xl px-6 transition-all duration-1000 ease-out ${
            outcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid sm:grid-cols-3 gap-12">
            {[
              { outcome: 'Response time drops to seconds.' },
              { outcome: 'Booking rate increases.' },
              { outcome: 'Lead decay eliminated.' },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center"
              >
                <div className="w-px h-8 bg-[#1a2332] mx-auto mb-6" />
                <p className="text-white text-lg">
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
      <section className="py-32 border-t border-[#1a2332]/50">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
            See if it fits.
          </h2>
          <p className="text-[#6b7280] mb-10 max-w-md mx-auto">
            30 minutes. We review your current response flow and show how the system maps to it.
          </p>
          <Link
            to="/audit"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#050509] font-medium rounded-full transition-all duration-300 hover:bg-[#e5e5e5]"
          >
            View response architecture
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  )
}
