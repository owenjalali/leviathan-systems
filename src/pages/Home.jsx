import { Link } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Calendar, RefreshCw, PhoneMissed, Clock, ClipboardList, AlertTriangle, Bot, Workflow, Plug, Settings, X, Check } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Home() {
  const [problemRef, problemVisible] = useScrollAnimation(0.15)
  const [buildRef, buildVisible] = useScrollAnimation(0.15)
  const [clarityRef, clarityVisible] = useScrollAnimation(0.15)
  const [outcomesRef, outcomesVisible] = useScrollAnimation(0.15)
  const [processRef, processVisible] = useScrollAnimation(0.15)
  const [fitRef, fitVisible] = useScrollAnimation(0.15)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.15)

  return (
    <div className="bg-[#0a0a0a]">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[#d4af37]/[0.03] blur-[100px] bg-orb" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#d4af37]/[0.02] blur-[80px] bg-orb-slow" />
        </div>

        <div className="mx-auto max-w-4xl px-6 py-32 text-center">
          <p className="hero-badge text-[#d4af37] text-xs font-medium tracking-[0.4em] uppercase mb-8">
            Leviathan Systems
          </p>

          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
            Stop losing leads
            <br />
            <span className="text-gray-500">when you're busy.</span>
          </h1>

          <p className="hero-subtitle text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            We build automation systems that answer, qualify, and book—so revenue
            doesn't depend on someone picking up the phone.
          </p>

          {/* Proof chips */}
          <div className="hero-cta flex flex-wrap justify-center gap-3 mb-12">
            {['24/7 response', 'Fewer missed leads', 'Automatic booking', 'CRM stays updated'].map((chip, i) => (
              <span
                key={chip}
                className="px-4 py-2 text-sm text-gray-400 border border-[#2d2d2d] rounded-full tag-hover"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                {chip}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/begin"
              className="btn-primary group inline-flex items-center gap-3 bg-[#d4af37] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f4d03f] transition-all duration-300"
            >
              See if we're a fit
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              View what we build
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#d4af37]/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-24 border-t border-[#1a1a1a] section-fade-border">
        <div
          ref={problemRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-[1500ms] ${
            problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
              The Problem
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Leads don't wait.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              While you're busy running your business, opportunities slip away.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {[
              { icon: PhoneMissed, text: "You miss calls while you're on the job.", color: 'from-red-500/20 to-red-500/5' },
              { icon: Clock, text: "Slow follow-up kills conversions.", color: 'from-orange-500/20 to-orange-500/5' },
              { icon: ClipboardList, text: "Admin work steals time from real work.", color: 'from-yellow-500/20 to-yellow-500/5' },
              { icon: AlertTriangle, text: "CRM and calendar fall out of sync.", color: 'from-amber-500/20 to-amber-500/5' }
            ].map((item, i) => (
              <div
                key={item.text}
                className="group relative p-5 rounded-xl border border-[#1a1a1a] bg-[#0d0d0d]/50 hover:border-red-500/30 transition-all duration-300"
                style={{
                  transitionDelay: problemVisible ? `${i * 100}ms` : '0ms',
                  opacity: problemVisible ? 1 : 0,
                  transform: problemVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} border border-red-500/20 flex items-center justify-center shrink-0`}>
                    <item.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-gray-400 text-base pt-1.5">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-center text-xl text-white font-medium transition-all duration-700"
            style={{
              transitionDelay: problemVisible ? '400ms' : '0ms',
              opacity: problemVisible ? 1 : 0
            }}
          >
            Every gap is <span className="text-red-400">money gone</span>.
          </p>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div
          ref={buildRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-[1500ms] ${
            buildVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
              What We Build
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Automation systems for revenue and operations.
            </h2>

            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Custom-built for your workflow. Not a template.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Phone, label: 'Inbound call handling' },
              { icon: MessageSquare, label: 'Web chat + SMS' },
              { icon: Bot, label: 'Lead qualification' },
              { icon: Calendar, label: 'Appointment scheduling' },
              { icon: RefreshCw, label: 'Follow-up sequences' },
              { icon: Plug, label: 'CRM integration' },
              { icon: Workflow, label: 'Pipeline automation' },
              { icon: Settings, label: 'Notifications + handoffs' }
            ].map((item, i) => (
              <div
                key={item.label}
                className="group p-4 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]/50 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 transition-all duration-300 text-center"
                style={{
                  transitionDelay: buildVisible ? `${i * 60}ms` : '0ms',
                  opacity: buildVisible ? 1 : 0,
                  transform: buildVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
                }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{item.label}</p>
              </div>
            ))}
          </div>

          <div
            className="text-center transition-all duration-500"
            style={{
              transitionDelay: buildVisible ? '600ms' : '0ms',
              opacity: buildVisible ? 1 : 0
            }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#f4d03f] transition-colors duration-300"
            >
              See the full list
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CLARITY */}
      <section className="py-24 border-t border-[#1a1a1a] section-fade-border">
        <div
          ref={clarityRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-[1500ms] ${
            clarityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
              Clarity
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              We're an automation agency.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Here's exactly what that means.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* We Are */}
            <div
              className="p-6 rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/5 to-transparent transition-all duration-700"
              style={{
                transitionDelay: clarityVisible ? '200ms' : '0ms',
                opacity: clarityVisible ? 1 : 0,
                transform: clarityVisible ? 'translateX(0)' : 'translateX(-30px)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/30 flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#d4af37]" />
                </div>
                <h3 className="text-lg font-semibold text-white">We are</h3>
              </div>
              <div className="space-y-4">
                {[
                  'Builders + implementers',
                  'Custom workflow designers',
                  'Integration specialists',
                  'Ongoing optimization partners'
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 transition-all duration-500"
                    style={{
                      transitionDelay: clarityVisible ? `${300 + i * 80}ms` : '0ms',
                      opacity: clarityVisible ? 1 : 0
                    }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#d4af37]" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* We're Not */}
            <div
              className="p-6 rounded-2xl border border-[#2d2d2d] bg-[#0d0d0d]/50 transition-all duration-700"
              style={{
                transitionDelay: clarityVisible ? '400ms' : '0ms',
                opacity: clarityVisible ? 1 : 0,
                transform: clarityVisible ? 'translateX(0)' : 'translateX(30px)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#2d2d2d] border border-[#3d3d3d] flex items-center justify-center">
                  <X className="w-5 h-5 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">We're not</h3>
              </div>
              <div className="space-y-4">
                {[
                  'A chatbot company',
                  'A SaaS product',
                  'A one-time installer',
                  '"Set it and forget it"'
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 transition-all duration-500"
                    style={{
                      transitionDelay: clarityVisible ? `${500 + i * 80}ms` : '0ms',
                      opacity: clarityVisible ? 1 : 0
                    }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
                      <X className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="text-gray-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div
          ref={outcomesRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-[1500ms] ${
            outcomesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Outcomes
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            What changes after.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                icon: Phone,
                title: 'Faster response',
                description: "Every lead gets an answer immediately—not when someone's free."
              },
              {
                icon: Calendar,
                title: 'More booked jobs',
                description: 'Qualified leads move to scheduling automatically.'
              },
              {
                icon: RefreshCw,
                title: 'Cleaner operations',
                description: 'CRM stays accurate without nagging your team.'
              },
              {
                icon: MessageSquare,
                title: 'Less headcount pressure',
                description: 'Scale without adding admin staff.'
              }
            ].map((outcome, i) => (
              <div
                key={outcome.title}
                className="card-premium card-glow p-6 rounded-xl transition-all duration-500"
                style={{
                  transitionDelay: outcomesVisible ? `${i * 100}ms` : '0ms',
                  opacity: outcomesVisible ? 1 : 0,
                  transform: outcomesVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
                }}
              >
                <outcome.icon className="h-6 w-6 text-[#d4af37] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{outcome.title}</h3>
                <p className="text-gray-400">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 border-t border-[#1a1a1a] section-fade-border relative">
        <div
          ref={processRef}
          className={`mx-auto max-w-4xl px-6 transition-all duration-[1500ms] ${
            processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            How We Build
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            Engineered. Not hacked together.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: '01', title: 'Diagnose', desc: 'Map your inbound flow and find the leaks.' },
              { num: '02', title: 'Design', desc: 'Build the workflow, rules, and safeguards.' },
              { num: '03', title: 'Integrate', desc: 'Connect to your tools—CRM, calendar, phones.' },
              { num: '04', title: 'Test', desc: 'Edge cases, failure states, real scenarios.' },
              { num: '05', title: 'Deploy', desc: 'Monitored rollout with human oversight.' },
              { num: '06', title: 'Optimize', desc: 'Weekly review. Continuous improvement.' }
            ].map((step, i) => (
              <div
                key={step.num}
                className="group relative p-6 rounded-xl border border-[#1a1a1a] bg-[#0d0d0d]/50 hover:border-[#d4af37]/30 transition-all duration-500"
                style={{
                  transitionDelay: processVisible ? `${i * 100}ms` : '0ms',
                  opacity: processVisible ? 1 : 0,
                  transform: processVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {/* Number badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/30 flex items-center justify-center">
                  <span className="text-[#d4af37] text-sm font-bold">{step.num}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#d4af37] transition-colors">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div
          ref={fitRef}
          className={`mx-auto max-w-4xl px-6 transition-all duration-[1500ms] ${
            fitVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Who We Help
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Built for service businesses.
          </h2>

          <p className="text-xl text-gray-400 mb-8">
            If your revenue depends on answering leads fast and booking jobs consistently, this is for you.
          </p>

          <div className="flex flex-wrap gap-3">
            {['Home services', 'Agencies', 'Clinics', 'Professional services', 'Multi-location businesses'].map((industry, i) => (
              <span
                key={industry}
                className={`px-4 py-2 text-sm text-gray-500 border border-[#1a1a1a] rounded-full tag-hover instant-hover cursor-default ${
                  fitVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transition: fitVisible ? `opacity 0.5s ease ${300 + i * 80}ms` : 'opacity 0.5s ease'
                }}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 border-t border-[#1a1a1a] section-fade-border relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#d4af37]/[0.02] blur-[100px] pointer-events-none" />

        <div
          ref={ctaRef}
          className={`mx-auto max-w-3xl px-6 text-center relative z-10 transition-all duration-[1500ms] ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-glow">
            If inbound leads matter, this matters.
          </h2>

          <p className="text-xl text-gray-400 mb-12">
            A short conversation to see where leads are slipping and what a system would look like.
          </p>

          <Link
            to="/begin"
            className="btn-primary group inline-flex items-center gap-3 bg-[#d4af37] text-black px-10 py-4 rounded-full font-semibold hover:bg-[#f4d03f] transition-all duration-300"
            style={{
              transitionDelay: ctaVisible ? '300ms' : '0ms',
              opacity: ctaVisible ? 1 : 0
            }}
          >
            Begin
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <p
            className="mt-8 text-sm text-gray-600 transition-all duration-500"
            style={{
              transitionDelay: ctaVisible ? '500ms' : '0ms',
              opacity: ctaVisible ? 1 : 0
            }}
          >
            No pitch. No pressure. Just clarity.
          </p>
        </div>
      </section>

    </div>
  )
}
