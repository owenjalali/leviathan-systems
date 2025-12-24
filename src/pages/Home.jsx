import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Check, X, Phone, Filter, Route, Calendar, Bell, RefreshCw, Database, Clock, Shield, ChevronRight } from 'lucide-react'
import LossCalculator from '../components/LossCalculator'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const [whyRef, whyVisible] = useScrollAnimation(0.2)
  const [systemRef, systemVisible] = useScrollAnimation(0.15)
  const [proofRef, proofVisible] = useScrollAnimation(0.15)
  const [clarityRef, clarityVisible] = useScrollAnimation(0.15)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.15)

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      document.querySelector('#calculator input')?.focus()
    }, 500)
  }

  const scrollToSystem = () => {
    document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCalculatorComplete = (results) => {
    sessionStorage.setItem('calculatorResults', JSON.stringify(results))
    navigate('/audit')
  }

  return (
    <div className="bg-[#050509]">

      {/* ============================================
          SECTION 1: HERO — TENSION + ACCUSATION
          ============================================ */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/5 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Copy */}
            <div className="max-w-xl">
              {/* Tension headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                You're losing leads
                <span className="block text-[#6b7280]">right now.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-[#9ca3af] leading-relaxed mb-4">
                Every minute a lead waits, your close rate drops.
              </p>
              <p className="text-base text-[#6b7280] mb-8">
                78% of customers buy from whoever responds first. How long does it take you?
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={scrollToCalculator}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#00d4cf] hover:bg-[#00e5df] text-[#050509] font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#00d4cf]/25"
                >
                  Run the Lead Leak Check
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </button>
                <button
                  onClick={scrollToSystem}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#2a3441] hover:border-[#3d4a59] text-[#9ca3af] hover:text-white rounded-full transition-all duration-200"
                >
                  See how the system stops it
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust anchor */}
              <p className="text-sm text-[#4b5563]">
                No pitch. No pressure. Just the numbers.
              </p>
            </div>

            {/* Right: Calculator (visible on desktop) */}
            <div className="hidden lg:block">
              <LossCalculator onComplete={handleCalculatorComplete} />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator on mobile - full width */}
      <section className="lg:hidden py-12 px-6 bg-[#050509]">
        <LossCalculator onComplete={handleCalculatorComplete} />
      </section>


      {/* ============================================
          SECTION 3: WHY THIS HAPPENS
          ============================================ */}
      <section className="py-20 bg-[#050509] border-t border-[#1a2332]">
        <div
          ref={whyRef}
          className={`mx-auto max-w-3xl px-6 transition-all duration-700 ${
            whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Why this keeps happening.
          </h2>

          <div className="space-y-6">
            {[
              {
                num: '1',
                text: "You're on a job when the lead comes in.",
                sub: "You're doing the work. That's not the problem."
              },
              {
                num: '2',
                text: "No one answers instantly.",
                sub: "Your team is busy. Or it goes to voicemail."
              },
              {
                num: '3',
                text: "They call the next company.",
                sub: "The lead is gone before you knew you had it."
              }
            ].map((item, i) => (
              <div
                key={item.num}
                className="flex gap-5 p-5 bg-[#0a0f1a] border border-[#1a2332] rounded-xl"
                style={{
                  transitionDelay: whyVisible ? `${i * 100}ms` : '0ms',
                  opacity: whyVisible ? 1 : 0,
                  transform: whyVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.5s ease'
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <span className="text-red-400 font-semibold text-sm">{item.num}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{item.text}</p>
                  <p className="text-[#6b7280] text-sm mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[#6b7280] mt-8 text-center">
            This isn't about working harder. It's about working differently.
          </p>
        </div>
      </section>


      {/* ============================================
          SECTION 4: THE REVENUE CAPTURE SYSTEM
          ============================================ */}
      <section id="system" className="py-24 bg-gradient-to-b from-[#050509] to-[#0a0f1a]">
        <div
          ref={systemRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${
            systemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase text-[#00d4cf] bg-[#00d4cf]/10 rounded-full border border-[#00d4cf]/20">
              The Fix
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The Revenue Capture System
            </h2>
            <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
              Responds in under 60 seconds. Qualifies. Books. Syncs. 24/7.
            </p>
          </div>

          {/* System flow */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              { icon: Phone, label: 'Capture', desc: 'Every channel' },
              { icon: Filter, label: 'Qualify', desc: 'Your questions' },
              { icon: Route, label: 'Route', desc: 'Right person' },
              { icon: Calendar, label: 'Book', desc: 'Auto-schedule' },
              { icon: Bell, label: 'Follow-up', desc: 'Never forget' },
              { icon: Database, label: 'Sync', desc: 'CRM updated' },
            ].map((step, i) => (
              <div
                key={step.label}
                className="relative p-4 bg-[#0a0f1a] border border-[#1a2332] rounded-xl text-center group hover:border-[#00d4cf]/30 transition-all duration-300"
                style={{
                  transitionDelay: systemVisible ? `${i * 80}ms` : '0ms',
                  opacity: systemVisible ? 1 : 0,
                  transform: systemVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease'
                }}
              >
                {/* Connector line */}
                {i < 5 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-[#1a2332] to-transparent" />
                )}
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-[#00d4cf]/10 border border-[#00d4cf]/20 flex items-center justify-center group-hover:border-[#00d4cf]/40 transition-colors">
                  <step.icon className="w-5 h-5 text-[#00d4cf]" />
                </div>
                <p className="text-white font-medium text-sm">{step.label}</p>
                <p className="text-[#6b7280] text-xs mt-1">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* What it connects to */}
          <div className="p-6 bg-[#0a0f1a]/50 border border-[#1a2332] rounded-xl">
            <p className="text-[#6b7280] text-sm mb-4">Connects to your existing stack:</p>
            <div className="flex flex-wrap gap-2">
              {['CRMs', 'Calendars', 'Phone systems', 'SMS platforms', 'Zapier', 'Make', 'Custom APIs'].map((tool) => (
                <span key={tool} className="px-3 py-1.5 bg-[#1a2332] text-[#9ca3af] text-xs rounded-lg">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 5: PROOF VIA MECHANICS
          ============================================ */}
      <section className="py-20 bg-[#0a0f1a] border-t border-[#1a2332]">
        <div
          ref={proofRef}
          className={`mx-auto max-w-4xl px-6 transition-all duration-700 ${
            proofVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Clock,
                title: '<60 second response',
                desc: 'Every lead acknowledged instantly, 24/7/365.'
              },
              {
                icon: Filter,
                title: 'Qualification built for you',
                desc: 'Your services. Your questions. Your criteria.'
              },
              {
                icon: Bell,
                title: 'No-show reduction',
                desc: 'Automated reminders. Confirmation sequences.'
              },
              {
                icon: Database,
                title: 'CRM auto-updates',
                desc: 'Contacts created. Stages moved. Notes added.'
              },
              {
                icon: Shield,
                title: 'Edge cases handled',
                desc: 'Escalation rules. Fallbacks. Human handoff.'
              },
              {
                icon: RefreshCw,
                title: 'Continuous optimization',
                desc: 'Weekly reviews. Ongoing improvements.'
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="p-5 bg-[#050509] border border-[#1a2332] rounded-xl"
                style={{
                  transitionDelay: proofVisible ? `${i * 60}ms` : '0ms',
                  opacity: proofVisible ? 1 : 0,
                  transition: 'all 0.5s ease'
                }}
              >
                <item.icon className="w-5 h-5 text-[#00d4cf] mb-3" />
                <h3 className="text-white font-medium mb-1">{item.title}</h3>
                <p className="text-[#6b7280] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 6: CLARITY (We Are / We're Not)
          ============================================ */}
      <section className="py-20 bg-[#050509] border-t border-[#1a2332]">
        <div
          ref={clarityRef}
          className={`mx-auto max-w-4xl px-6 transition-all duration-700 ${
            clarityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* We are */}
            <div
              className="p-6 bg-[#0a0f1a] border border-[#1a2332] rounded-xl"
              style={{
                transitionDelay: clarityVisible ? '100ms' : '0ms',
                opacity: clarityVisible ? 1 : 0,
                transform: clarityVisible ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.5s ease'
              }}
            >
              <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#00d4cf]/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#00d4cf]" />
                </div>
                We are
              </h3>
              <ul className="space-y-3">
                {[
                  'Builders + implementers',
                  'Custom workflow designers',
                  'Integration specialists',
                  'Ongoing optimization partners'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#9ca3af]">
                    <Check className="w-4 h-4 text-[#00d4cf] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* We're not */}
            <div
              className="p-6 bg-[#0a0f1a] border border-[#1a2332] rounded-xl"
              style={{
                transitionDelay: clarityVisible ? '200ms' : '0ms',
                opacity: clarityVisible ? 1 : 0,
                transform: clarityVisible ? 'translateX(0)' : 'translateX(20px)',
                transition: 'all 0.5s ease'
              }}
            >
              <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#1a2332] flex items-center justify-center">
                  <X className="w-4 h-4 text-[#6b7280]" />
                </div>
                We're not
              </h3>
              <ul className="space-y-3">
                {[
                  'A chatbot company',
                  'A SaaS product',
                  'A one-time installer',
                  '"Set it and forget it"'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#6b7280]">
                    <X className="w-4 h-4 text-[#4b5563] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 7: AUDIT CTA — Final Push
          ============================================ */}
      <section className="py-24 bg-gradient-to-b from-[#050509] to-[#0a0f1a] border-t border-[#1a2332]">
        <div
          ref={ctaRef}
          className={`mx-auto max-w-2xl px-6 text-center transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Want the leak fixed?
          </h2>
          <p className="text-[#9ca3af] text-lg mb-10">
            30 minutes. We map the leak, show the system, and give you a plan.
          </p>

          <Link
            to="/audit"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00d4cf] hover:bg-[#00e5df] text-[#050509] font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#00d4cf]/25"
          >
            Get Your Automation Audit
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-[#4b5563] text-sm mt-6">
            No pitch. No pressure. Just clarity.
          </p>
        </div>
      </section>

    </div>
  )
}
