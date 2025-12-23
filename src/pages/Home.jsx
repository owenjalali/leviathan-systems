import { Link } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Calendar, RefreshCw } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[#d4af37]/[0.03] blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#d4af37]/[0.02] blur-[80px]" />
        </div>

        <div className="mx-auto max-w-4xl px-6 py-32 text-center">
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.4em] uppercase mb-8">
            Leviathan Systems
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
            Stop losing leads
            <br />
            <span className="text-gray-500">when you're busy.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            We build automation systems that answer, qualify, and book—so revenue
            doesn't depend on someone picking up the phone.
          </p>

          {/* Proof chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['24/7 response', 'Fewer missed leads', 'Automatic booking', 'CRM stays updated'].map((chip) => (
              <span key={chip} className="px-4 py-2 text-sm text-gray-400 border border-[#2d2d2d] rounded-full">
                {chip}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/begin"
              className="group inline-flex items-center gap-3 bg-[#d4af37] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#f4d03f] transition-all duration-300"
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
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#d4af37]/30 to-transparent" />
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
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
            ].map((item) => (
              <div key={item} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-2.5 shrink-0" />
                <p className="text-gray-400 text-lg">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-xl text-white">
            Every gap is money gone.
          </p>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-5xl px-6">
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
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
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
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
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
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Clarity
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            We're an automation agency.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">We are</h3>
              <div className="space-y-4">
                {[
                  'Builders + implementers',
                  'Custom workflow designers',
                  'Integration specialists',
                  'Ongoing optimization partners'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                    <span className="text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">We're not</h3>
              <div className="space-y-4">
                {[
                  'A chatbot company',
                  'A SaaS product',
                  'A one-time installer',
                  '"Set it and forget it"'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
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
        <div className="mx-auto max-w-5xl px-6">
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
            ].map((outcome) => (
              <div key={outcome.title} className="p-6 border border-[#1a1a1a] rounded-xl">
                <outcome.icon className="h-6 w-6 text-[#d4af37] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{outcome.title}</h3>
                <p className="text-gray-400">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            How We Build
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            Engineered. Not hacked together.
          </h2>

          <div className="space-y-8">
            {[
              { num: '01', title: 'Diagnose', desc: 'Map your inbound flow and find the leaks.' },
              { num: '02', title: 'Design', desc: 'Build the workflow, rules, and safeguards.' },
              { num: '03', title: 'Integrate', desc: 'Connect to your tools—CRM, calendar, phones.' },
              { num: '04', title: 'Test', desc: 'Edge cases, failure states, real scenarios.' },
              { num: '05', title: 'Deploy', desc: 'Monitored rollout with human oversight.' },
              { num: '06', title: 'Optimize', desc: 'Weekly review. Continuous improvement.' }
            ].map((step) => (
              <div key={step.num} className="flex gap-6 items-baseline">
                <span className="text-[#d4af37]/40 text-2xl font-bold w-12">{step.num}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-gray-400 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Fit
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Built for service businesses.
          </h2>

          <p className="text-xl text-gray-400 mb-8">
            If your revenue depends on answering leads fast and booking jobs consistently, this is for you.
          </p>

          <p className="text-sm text-gray-600">
            Home services • Agencies • Clinics • Professional services • Multi-location businesses
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            If inbound leads matter, this matters.
          </h2>

          <p className="text-xl text-gray-400 mb-12">
            A short conversation to see where leads are slipping and what a system would look like.
          </p>

          <Link
            to="/begin"
            className="group inline-flex items-center gap-3 bg-[#d4af37] text-black px-10 py-4 rounded-full font-semibold hover:bg-[#f4d03f] transition-all duration-300"
          >
            Begin
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <p className="mt-8 text-sm text-gray-600">
            No pitch. No pressure. Just clarity.
          </p>
        </div>
      </section>

    </div>
  )
}
