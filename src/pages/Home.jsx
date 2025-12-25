import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowDown, Clock, Phone, Calendar, CheckCircle, ChevronRight } from 'lucide-react'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const [problemRef, problemVisible] = useScrollAnimation(0.1)
  const [systemRef, systemVisible] = useScrollAnimation(0.1)
  const [proofRef, proofVisible] = useScrollAnimation(0.1)
  const [calcRef, calcVisible] = useScrollAnimation(0.1)
  const [outcomeRef, outcomeVisible] = useScrollAnimation(0.1)
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

  const scrollToSystem = () => {
    document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#030306] overflow-hidden">

      {/* ============================================
          HERO — ANSWERS 4 QUESTIONS IN <5 SECONDS
          ============================================ */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center pt-24 pb-20 relative overflow-hidden">

        {/* Subtle gradient mesh */}
        <div className="absolute inset-0">
          <div
            className="absolute w-[1000px] h-[1000px] -top-[300px] left-1/2 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0,212,207,0.2) 0%, rgba(0,212,207,0.05) 40%, transparent 70%)',
              transform: `translate(calc(-50% + ${mousePos.x * 2}px), ${mousePos.y * 2}px)`,
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Content */}
        <div className="mx-auto max-w-5xl px-6 relative z-10">
          {/* Primary headline — outcome-focused */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-8 animate-fade-in-up">
            Response speed is revenue infrastructure.
          </h1>

          {/* Grounding layer — explicit explanation */}
          <div className="mb-12 space-y-4 animate-fade-in-up animation-delay-100">
            <p className="text-xl sm:text-2xl text-[#9ca3af] leading-relaxed max-w-3xl">
              <strong className="text-white">What it is:</strong> Automation infrastructure that captures, qualifies, and books inbound leads for service businesses—automatically.
            </p>
            <p className="text-lg sm:text-xl text-[#6b7280] leading-relaxed max-w-3xl">
              <strong className="text-[#9ca3af]">Who it's for:</strong> Home service businesses (HVAC, plumbing, electrical, roofing, landscaping, cleaning) where response speed determines who gets the job.
            </p>
            <p className="text-lg sm:text-xl text-[#6b7280] leading-relaxed max-w-3xl">
              <strong className="text-[#9ca3af]">What it does:</strong> When someone calls or submits a form, the system responds in under 60 seconds. Before they call your competitor.
            </p>
            <p className="text-lg sm:text-xl text-[#6b7280] leading-relaxed max-w-3xl">
              <strong className="text-[#9ca3af]">Why it matters:</strong> 78% of customers hire whoever responds first. Speed directly impacts revenue.
            </p>
          </div>

          {/* CTAs — Two intentional paths */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <button
              onClick={scrollToCalculator}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#030306] font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,212,207,0.3)]"
            >
              <span className="relative z-10">Run the Lead Leak Check</span>
              <ArrowDown className="w-4 h-4 relative z-10 transition-transform group-hover:translate-y-0.5" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d4cf] to-[#00e5df] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={scrollToSystem}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#2a3441] text-white font-semibold rounded-full transition-all duration-300 hover:border-[#00d4cf]/50 hover:bg-[#00d4cf]/5 backdrop-blur-sm hover:scale-105"
            >
              <span className="relative z-10">See How the System Works</span>
              <ChevronRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>


      {/* ============================================
          PROBLEM — RESPONSE DELAY = REVENUE DECAY
          ============================================ */}
      <section ref={problemRef} className="py-32 sm:py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/50 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div
          className={`mx-auto max-w-4xl px-6 relative z-10 transition-all duration-1000 ${
            problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
              Response delay is revenue decay.
            </h2>
            <p className="text-xl text-[#9ca3af] mb-6 leading-relaxed max-w-2xl mx-auto">
              You're on a job. Phone rings. You can't answer. By the time you call back—they've already booked someone else.
            </p>
            <p className="text-lg text-[#6b7280] leading-relaxed max-w-2xl mx-auto">
              This isn't a technology problem. It's a physics problem. You can't be in two places at once. But your response system can.
            </p>
          </div>

          {/* Stat */}
          <div className="mt-16 pt-12 border-t border-[#1a2332]">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-bold text-white mb-3">78%</div>
              <p className="text-lg text-[#6b7280] max-w-xl mx-auto">
                of customers hire whoever responds first. The math is simple: faster response = more bookings.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          SYSTEM — ONE COHERENT SYSTEM
          ============================================ */}
      <section id="system" className="py-32 sm:py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/50 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div
          ref={systemRef}
          className={`mx-auto max-w-6xl px-6 relative z-10 transition-all duration-1000 ${
            systemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="text-center mb-20">
            <p className="text-[#00d4cf] text-sm font-medium tracking-wide uppercase mb-4">The System</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Capture → Respond → Qualify → Book → Sync
            </h2>
            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
              One system. All channels. Automatic.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Animated connecting line */}
            <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-[2px]">
              <div className="absolute inset-0 bg-[#1a2332]" />
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00d4cf] to-[#7c72ff]"
                style={{
                  width: systemVisible ? '100%' : '0%',
                  transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s'
                }}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                {
                  step: '01',
                  title: 'Capture',
                  desc: 'Phone call, form, or text—any channel, any time.',
                  plain: 'All inbound leads are captured immediately, regardless of source.'
                },
                {
                  step: '02',
                  title: 'Respond',
                  desc: 'Under 60 seconds. Before they call your competitor.',
                  plain: 'The system responds instantly with a personalized message or call.'
                },
                {
                  step: '03',
                  title: 'Qualify',
                  desc: 'Asks your questions. Filters out bad fits.',
                  plain: 'Automated qualification based on your business rules and criteria.'
                },
                {
                  step: '04',
                  title: 'Book',
                  desc: 'Syncs with your calendar. You show up ready.',
                  plain: 'Appointments are scheduled automatically into your calendar.'
                },
                {
                  step: '05',
                  title: 'Sync',
                  desc: 'Everything flows into your CRM. No manual entry.',
                  plain: 'All lead data and interactions sync to your existing systems.'
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="relative group"
                  style={{
                    opacity: systemVisible ? 1 : 0,
                    transform: systemVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.1}s`
                  }}
                >
                  <div className="relative p-8 rounded-3xl border border-[#1a2332] bg-[#0a0f1a]/80 backdrop-blur-xl transition-all duration-500 group-hover:border-[#2a3441] group-hover:bg-[#0d1320]">
                    <div className="relative mb-6">
                      <span className="text-xs font-mono text-[#4b5563] tracking-wider">STEP</span>
                      <span className="ml-2 text-4xl font-bold text-[#00d4cf]">
                        {item.step}
                      </span>
                    </div>

                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#00d4cf]/10 border border-[#00d4cf]/20">
                      {item.step === '01' && <Phone className="w-6 h-6 text-[#00d4cf]" />}
                      {item.step === '02' && <Clock className="w-6 h-6 text-[#00d4cf]" />}
                      {item.step === '03' && <CheckCircle className="w-6 h-6 text-[#00d4cf]" />}
                      {item.step === '04' && <Calendar className="w-6 h-6 text-[#00d4cf]" />}
                      {item.step === '05' && <CheckCircle className="w-6 h-6 text-[#00d4cf]" />}
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-[#6b7280] leading-relaxed mb-2">{item.desc}</p>
                    <p className="text-sm text-[#4b5563] italic">{item.plain}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          TRUST & PROOF — TARGET MARKET + CREDIBILITY
          ============================================ */}
      <section className="py-32 sm:py-40 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
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
            {/* Left — Target Market Definition */}
            <div>
              <p className="text-[#00d4cf] text-sm font-medium tracking-wide uppercase mb-6">Built For</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
                Home service businesses.
              </h2>
              <p className="text-xl text-[#9ca3af] mb-6 leading-relaxed">
                HVAC, plumbing, electrical, roofing, landscaping, cleaning. Any business where response speed determines who gets the job.
              </p>
              <div className="p-6 rounded-2xl border border-[#1a2332] bg-[#0a0f1a]/60 backdrop-blur-sm mb-6">
                <p className="text-sm text-white font-semibold mb-3">How we work</p>
                <p className="text-sm text-[#9ca3af] leading-relaxed mb-3">
                  We build custom infrastructure. You own it. Not a SaaS fee. Not a subscription. Working systems that capture, respond, and book—automatically.
                </p>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  Operators, not salespeople. We've built automation systems for years. No pitch decks. Just working infrastructure.
                </p>
              </div>
            </div>

            {/* Right — Assumptions */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-[#1a2332] bg-[#0a0f1a]/60 backdrop-blur-sm">
                <p className="text-sm text-white font-semibold mb-4">How we think about this</p>
                <div className="space-y-3 text-sm text-[#9ca3af]">
                  <p>• Response time under 5 minutes: 0% loss</p>
                  <p>• 5-15 minutes: 10% of leads lost</p>
                  <p>• 15-60 minutes: 25% of leads lost</p>
                  <p>• 1-4 hours: 40% of leads lost</p>
                  <p>• 4-24 hours: 60% of leads lost</p>
                </div>
                <p className="text-xs text-[#4b5563] mt-4 pt-4 border-t border-[#1a2332]">
                  Based on industry response data. These are conservative estimates.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#1a2332] bg-[#0a0f1a]/60 backdrop-blur-sm">
                <p className="text-sm text-white font-semibold mb-4">The tradeoff</p>
                <p className="text-sm text-[#9ca3af] leading-relaxed">
                  If you're handling 20 leads per week and responding in 1-4 hours, you're likely losing 8 leads per week to competitors. That's roughly 35 leads per month. Even if our model is off by 50%, the loss is still material.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          CALCULATOR — CORE CONVERSION ENGINE
          ============================================ */}
      <section id="calculator" className="py-32 sm:py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/30 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
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
              <p className="text-[#00d4cf] text-sm font-medium tracking-wide uppercase mb-2">Lead Leak Check</p>
              <p className="text-sm text-[#6b7280] mb-6 italic">
                See how many leads you lose when no one responds fast enough
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-[1.1]">
                How much are slow responses costing you?
              </h2>

              <p className="text-xl text-[#9ca3af] mb-8 leading-relaxed">
                Every minute between a lead coming in and someone responding, the chance of booking that job drops.
              </p>

              {/* Methodology */}
              <div className="p-6 rounded-2xl border border-[#1a2332] bg-[#0a0f1a]/60 backdrop-blur-sm mb-6">
                <p className="text-sm text-white font-semibold mb-4">What this measures</p>
                <p className="text-sm text-[#9ca3af] mb-4 leading-relaxed">
                  This calculator estimates monthly revenue loss based on your response time and lead volume. It assumes that slower responses result in leads going to competitors.
                </p>
                <p className="text-sm text-white font-semibold mb-3">Assumptions</p>
                <div className="space-y-2 text-sm text-[#9ca3af]">
                  <p>• Under 5 min: 0% loss (baseline)</p>
                  <p>• 5-15 min: 10% lost</p>
                  <p>• 15-60 min: 25% lost</p>
                  <p>• 1-4 hours: 40% lost</p>
                  <p>• 4-24 hours: 60% lost</p>
                </div>
                <p className="text-xs text-[#4b5563] mt-4 pt-4 border-t border-[#1a2332]">
                  Based on industry response data. These are conservative estimates. Even if this model is off by 50%, the loss is still material.
                </p>
              </div>

              <p className="text-sm text-[#6b7280] italic">
                The cost of inaction compounds. Every week you delay, more leads leak to competitors.
              </p>
            </div>

            {/* Right — Calculator */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#00d4cf]/10 to-[#7c72ff]/10 blur-2xl opacity-50" />
              <div className="relative">
                <LossCalculator onComplete={handleCalculatorComplete} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          OUTCOME — WHAT CHANGES AFTER IMPLEMENTATION
          ============================================ */}
      <section className="py-32 sm:py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030306] via-[#0a0f1a]/50 to-[#030306]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div
          ref={outcomeRef}
          className={`mx-auto max-w-4xl px-6 relative z-10 transition-all duration-1000 ${
            outcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-[#00d4cf] text-sm font-medium tracking-wide uppercase mb-4">After Implementation</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              What changes
            </h2>
            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
              Every inbound lead is responded to, qualified, and booked automatically—fast enough to prevent revenue decay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'No missed leads',
                desc: 'Every call, form, and text is captured and responded to within 60 seconds. No exceptions.'
              },
              {
                title: 'Automatic qualification',
                desc: 'The system asks your questions and filters out bad fits before you spend time on them.'
              },
              {
                title: 'Instant booking',
                desc: 'Qualified leads book directly into your calendar. You show up ready, no back-and-forth.'
              },
              {
                title: 'Complete sync',
                desc: 'All lead data and interactions flow into your CRM automatically. No manual entry.'
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl border border-[#1a2332] bg-[#0a0f1a]/60 backdrop-blur-sm transition-all duration-500 hover:border-[#2a3441] hover:bg-[#0d1320]"
                style={{
                  opacity: outcomeVisible ? 1 : 0,
                  transform: outcomeVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.1}s`
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-[#6b7280] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================
          FINAL CTA — CONFIDENT, LOW-PRESSURE
          ============================================ */}
      <section className="py-32 sm:py-40 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
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
            <button
              onClick={scrollToCalculator}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#030306] font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,212,207,0.4)]"
            >
              <span className="relative z-10">Run the Lead Leak Check</span>
              <ArrowDown className="w-5 h-5 relative z-10 transition-transform group-hover:translate-y-0.5" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d4cf] to-[#00e5df] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={scrollToSystem}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-[#2a3441] text-white font-semibold rounded-full text-lg transition-all duration-300 hover:border-[#00d4cf]/50 hover:bg-[#00d4cf]/5 hover:scale-105"
            >
              <span className="relative z-10">See How the System Works</span>
              <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
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
