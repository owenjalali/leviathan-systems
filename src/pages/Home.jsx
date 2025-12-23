import { Link } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Calendar, RefreshCw } from 'lucide-react'
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

          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
            Stop losing leads
            <br />
            <span className="text-gray-500">when you're busy.</span>
          </h1>

          <p className="hero-subtitle text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
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
          className={`mx-auto max-w-4xl px-6 transition-all duration-1000 ${
            problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            The Problem
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            Leads don't wait.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {[
              "You miss calls while you're on the job.",
              "Slow follow-up kills conversions.",
              "Admin work steals time from real work.",
              "CRM and calendar fall out of sync."
            ].map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-4 transition-all duration-500"
                style={{
                  transitionDelay: problemVisible ? `${i * 100}ms` : '0ms',
                  opacity: problemVisible ? 1 : 0,
                  transform: problemVisible ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-2.5 shrink-0" />
                <p className="text-gray-400 text-lg">{item}</p>
              </div>
            ))}
          </div>

          <p
            className="text-xl text-white transition-all duration-700"
            style={{
              transitionDelay: problemVisible ? '400ms' : '0ms',
              opacity: problemVisible ? 1 : 0
            }}
          >
            Every gap is money gone.
          </p>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div
          ref={buildRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-1000 ${
            buildVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            What We Build
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Automation systems for revenue and operations.
          </h2>

          <p className="text-gray-400 text-lg mb-12 max-w-2xl">
            Custom-built for your workflow. Not a template.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            <div className="space-y-4">
              {[
                'Inbound call handling',
                'Web chat + SMS capture',
                'Lead qualification',
                'Appointment scheduling'
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-4 transition-all duration-500"
                  style={{
                    transitionDelay: buildVisible ? `${i * 80}ms` : '0ms',
                    opacity: buildVisible ? 1 : 0,
                    transform: buildVisible ? 'translateX(0)' : 'translateX(-20px)'
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                'Follow-up sequences',
                'CRM integration',
                'Pipeline automation',
                'Notifications + handoffs'
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-4 transition-all duration-500"
                  style={{
                    transitionDelay: buildVisible ? `${(i + 4) * 80}ms` : '0ms',
                    opacity: buildVisible ? 1 : 0,
                    transform: buildVisible ? 'translateX(0)' : 'translateX(-20px)'
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-12 transition-all duration-500"
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
          className={`mx-auto max-w-5xl px-6 transition-all duration-1000 ${
            clarityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Clarity
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            We're an automation agency.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div
              className="transition-all duration-700"
              style={{
                transitionDelay: clarityVisible ? '200ms' : '0ms',
                opacity: clarityVisible ? 1 : 0,
                transform: clarityVisible ? 'translateX(0)' : 'translateX(-30px)'
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">We are</h3>
              <div className="space-y-4">
                {[
                  'Builders + implementers',
                  'Custom workflow designers',
                  'Integration specialists',
                  'Ongoing optimization partners'
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 transition-all duration-500"
                    style={{
                      transitionDelay: clarityVisible ? `${300 + i * 80}ms` : '0ms',
                      opacity: clarityVisible ? 1 : 0
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                    <span className="text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="transition-all duration-700"
              style={{
                transitionDelay: clarityVisible ? '400ms' : '0ms',
                opacity: clarityVisible ? 1 : 0,
                transform: clarityVisible ? 'translateX(0)' : 'translateX(30px)'
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">We're not</h3>
              <div className="space-y-4">
                {[
                  'A chatbot company',
                  'A SaaS product',
                  'A one-time installer',
                  '"Set it and forget it"'
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 transition-all duration-500"
                    style={{
                      transitionDelay: clarityVisible ? `${500 + i * 80}ms` : '0ms',
                      opacity: clarityVisible ? 1 : 0
                    }}
                  >
                    <div className="w-4 h-px bg-[#2d2d2d]" />
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
          className={`mx-auto max-w-5xl px-6 transition-all duration-1000 ${
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
          className={`mx-auto max-w-4xl px-6 transition-all duration-1000 ${
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

      {/* WHO IT'S FOR */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div
          ref={fitRef}
          className={`mx-auto max-w-4xl px-6 transition-all duration-1000 ${
            fitVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Fit
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
                className="px-4 py-2 text-sm text-gray-500 border border-[#1a1a1a] rounded-full tag-hover transition-all duration-500"
                style={{
                  transitionDelay: fitVisible ? `${300 + i * 80}ms` : '0ms',
                  opacity: fitVisible ? 1 : 0
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
          className={`mx-auto max-w-3xl px-6 text-center relative z-10 transition-all duration-1000 ${
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
