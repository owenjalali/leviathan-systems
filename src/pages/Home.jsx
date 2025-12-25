import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowDown, Clock, Phone, Calendar, CheckCircle, ChevronRight } from 'lucide-react'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Home() {
  const navigate = useNavigate()
  const [howRef, howVisible] = useScrollAnimation(0.1)
  const [proofRef, proofVisible] = useScrollAnimation(0.1)
  const [calcRef, calcVisible] = useScrollAnimation(0.1)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.1)

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
    <div className="bg-[#030306]">

      {/* ============================================
          HERO — CLARITY FIRST
          Poetic headline + literal grounding
          ============================================ */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-20 relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,212,207,0.08),transparent)]" />

        <div className="mx-auto max-w-5xl px-6 relative z-10">
          {/* Target market — immediate clarity */}
          <p className="text-[#00d4cf] text-sm font-medium tracking-wide mb-6">
            For service businesses
          </p>

          {/* Poetic headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.08] tracking-tight mb-8">
            Every lead answered.
            <br />
            <span className="text-[#6b7280]">Under 60 seconds.</span>
          </h1>

          {/* GROUNDING — This is the fix. Literal explanation. */}
          <p className="text-xl sm:text-2xl text-[#9ca3af] leading-relaxed max-w-2xl mb-6">
            Automated lead response for home service companies.
            <span className="text-white"> When someone calls or fills out a form, our system responds instantly</span>—qualifies them, answers questions, and books the appointment.
          </p>

          <p className="text-lg text-[#6b7280] max-w-xl mb-10">
            No missed calls. No slow follow-ups. No leads lost to competitors who picked up first.
          </p>

          {/* TWO CLEAR CTAs — Both intentional */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToCalculator}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#030306] font-semibold rounded-full transition-all duration-300 hover:bg-[#00d4cf]"
            >
              Calculate your lead loss
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={scrollToHow}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#2a3441] text-white font-medium rounded-full transition-all duration-300 hover:border-[#4b5563] hover:bg-white/5"
            >
              See how it works
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>


      {/* ============================================
          HOW IT WORKS — Simple, visual explanation
          Motion that EXPLAINS, not decorates
          ============================================ */}
      <section id="how-it-works" className="py-24 sm:py-32 border-t border-[#1a2332]/50">
        <div
          ref={howRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${
            howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
              A lead comes in. Within seconds, our system handles everything—so you can focus on the job, not the phone.
            </p>
          </div>

          {/* Step by step — Clear, not clever */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                step: '1',
                title: 'Lead comes in',
                desc: 'Phone call, form submission, or text message—any channel.'
              },
              {
                icon: Clock,
                step: '2',
                title: 'Instant response',
                desc: 'Within 60 seconds. Before they have time to call your competitor.'
              },
              {
                icon: CheckCircle,
                step: '3',
                title: 'Qualified automatically',
                desc: 'Asks your qualifying questions. Filters out bad fits.'
              },
              {
                icon: Calendar,
                step: '4',
                title: 'Appointment booked',
                desc: "Syncs with your calendar. You show up, they're ready."
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative"
                style={{
                  transitionDelay: howVisible ? `${i * 100}ms` : '0ms'
                }}
              >
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#1a2332] to-transparent" />
                )}

                <div className="relative p-6 rounded-2xl border border-[#1a2332]/50 bg-[#0a0f1a]/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00d4cf]/10 border border-[#00d4cf]/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#00d4cf]" />
                    </div>
                    <span className="text-xs text-[#4b5563] font-mono">Step {item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================
          PROOF / TRUST — Reduce risk perception
          Target market + credibility
          ============================================ */}
      <section className="py-24 sm:py-32 border-t border-[#1a2332]/50 bg-[#0a0f1a]/20">
        <div
          ref={proofRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${
            proofVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — The problem, made real */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6 leading-tight">
                78% of customers hire whoever responds first.
              </h2>
              <p className="text-lg text-[#9ca3af] mb-6 leading-relaxed">
                You're on a job. Phone rings. You can't answer. By the time you call back, they've already booked someone else.
              </p>
              <p className="text-lg text-[#6b7280] leading-relaxed">
                This isn't a technology problem. It's a physics problem. You can't be in two places at once. But your response system can.
              </p>
            </div>

            {/* Right — Trust signals */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-[#1a2332]/50 bg-[#0a0f1a]/50">
                <p className="text-sm text-[#00d4cf] font-medium mb-2">Built for</p>
                <p className="text-white font-semibold text-lg">Home service businesses</p>
                <p className="text-sm text-[#6b7280] mt-2">HVAC, plumbing, electrical, roofing, landscaping, cleaning, and more.</p>
              </div>

              <div className="p-6 rounded-2xl border border-[#1a2332]/50 bg-[#0a0f1a]/50">
                <p className="text-sm text-[#00d4cf] font-medium mb-2">How we're different</p>
                <p className="text-white font-semibold text-lg">We build the system. You own it.</p>
                <p className="text-sm text-[#6b7280] mt-2">Not a monthly SaaS fee. Custom infrastructure built for your business, maintained by us.</p>
              </div>

              <div className="p-6 rounded-2xl border border-[#1a2332]/50 bg-[#0a0f1a]/50">
                <p className="text-sm text-[#00d4cf] font-medium mb-2">Our approach</p>
                <p className="text-white font-semibold text-lg">Operators, not salespeople</p>
                <p className="text-sm text-[#6b7280] mt-2">We've built automation systems for years. No pitch decks. Just working infrastructure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          CALCULATOR — With proper framing
          Context + methodology + example
          ============================================ */}
      <section id="calculator" className="py-24 sm:py-32 border-t border-[#1a2332]/50">
        <div
          ref={calcRef}
          className={`mx-auto max-w-6xl px-6 transition-all duration-700 ${
            calcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Context and framing */}
            <div className="lg:sticky lg:top-32">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6 leading-tight">
                How much are slow responses costing you?
              </h2>

              <p className="text-lg text-[#9ca3af] mb-6 leading-relaxed">
                Every minute between a lead coming in and someone responding, the chance of booking that job drops. This calculator estimates what that costs you each month.
              </p>

              {/* Methodology — Stripe-style explanation */}
              <div className="p-5 rounded-xl border border-[#1a2332]/50 bg-[#0a0f1a]/30 mb-6">
                <p className="text-sm text-white font-medium mb-3">How we calculate this</p>
                <ul className="space-y-2 text-sm text-[#6b7280]">
                  <li className="flex gap-2">
                    <span className="text-[#00d4cf]">•</span>
                    Response under 5 min = baseline (no penalty)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00d4cf]">•</span>
                    5-15 min = 10% of leads lost
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00d4cf]">•</span>
                    15-60 min = 25% lost
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00d4cf]">•</span>
                    1-4 hours = 40% lost
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00d4cf]">•</span>
                    4-24 hours = 60% lost
                  </li>
                </ul>
                <p className="text-xs text-[#4b5563] mt-4 pt-3 border-t border-[#1a2332]">
                  Based on industry response data. These are conservative estimates—actual loss rates may be higher.
                </p>
              </div>

              <p className="text-sm text-[#6b7280] italic">
                Even if these numbers are off by 50%, the monthly loss is still significant.
              </p>
            </div>

            {/* Right — Calculator */}
            <div>
              <LossCalculator onComplete={handleCalculatorComplete} />
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          FINAL CTA — Confident, not pushy
          ============================================ */}
      <section className="py-24 sm:py-32 border-t border-[#1a2332]/50">
        <div
          ref={ctaRef}
          className={`mx-auto max-w-3xl px-6 text-center transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
            Ready to stop losing leads?
          </h2>
          <p className="text-lg text-[#6b7280] mb-10 max-w-xl mx-auto">
            Schedule a 30-minute call. We'll look at your current response flow and show you exactly how the system would work for your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/audit"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#030306] font-semibold rounded-full transition-all duration-300 hover:bg-[#00d4cf]"
            >
              Schedule a call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={scrollToCalculator}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#2a3441] text-white font-medium rounded-full transition-all duration-300 hover:border-[#4b5563]"
            >
              Calculate your loss first
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-[#4b5563] mt-8">
            No sales pitch. Just a technical conversation about your lead flow.
          </p>
        </div>
      </section>

    </div>
  )
}
