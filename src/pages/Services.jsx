import { Link } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Calendar, Database, Mail, ChevronRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const services = [
  {
    icon: Phone,
    title: 'Inbound Capture',
    description: 'Never miss a lead—even at 2am.',
    bullets: [
      'Phone, web chat, SMS, and form capture',
      'Instant acknowledgment',
      'Routing to the right person or system'
    ]
  },
  {
    icon: MessageSquare,
    title: 'Qualification + Routing',
    description: 'Ask the right questions. Route to the right place.',
    bullets: [
      'Automated qualification flows',
      'Lead scoring based on your criteria',
      'Rules-based routing (location, urgency, service type)'
    ]
  },
  {
    icon: Calendar,
    title: 'Scheduling + Reminders',
    description: 'Book jobs automatically. Reduce no-shows.',
    bullets: [
      'Direct calendar booking',
      'Confirmation messages',
      'Reminder sequences (SMS + email)'
    ]
  },
  {
    icon: Database,
    title: 'CRM + Pipeline',
    description: 'Keep your CRM accurate without manual entry.',
    bullets: [
      'Auto-create and update contacts',
      'Stage movement rules',
      'Task assignment + notes'
    ]
  },
  {
    icon: Mail,
    title: 'Follow-up Systems',
    description: 'Rescue stale leads. Stay top of mind.',
    bullets: [
      'Automated follow-up sequences',
      '"Stale lead" reactivation',
      'Re-engagement campaigns'
    ]
  }
]

const flowSteps = [
  { label: 'Lead comes in', color: 'from-[#d4af37]/20 to-[#d4af37]/10' },
  { label: 'Qualified', color: 'from-[#d4af37]/25 to-[#d4af37]/15' },
  { label: 'Routed', color: 'from-[#d4af37]/30 to-[#d4af37]/20' },
  { label: 'Booked', color: 'from-[#d4af37]/35 to-[#d4af37]/25' },
  { label: 'Followed up', color: 'from-[#d4af37]/40 to-[#d4af37]/30' },
  { label: 'CRM updated', color: 'from-[#d4af37]/50 to-[#d4af37]/40' }
]

export default function Services() {
  const [heroRef, heroVisible] = useScrollAnimation(0.1)
  const [flowRef, flowVisible] = useScrollAnimation(0.2)
  const [integrationsRef, integrationsVisible] = useScrollAnimation(0.15)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.15)

  return (
    <div className="bg-[#0a0a0a] pt-24">

      {/* HERO */}
      <section className="py-24">
        <div
          ref={heroRef}
          className={`mx-auto max-w-4xl px-6 transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Services
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            What we build for
            <br />
            <span className="text-gray-500">service businesses.</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl">
            Every system is custom. Here's what's possible.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-12 border-t border-[#1a1a1a] section-fade-border">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-0">
            {services.map((service, index) => {
              const [ref, isVisible] = useScrollAnimation(0.15)
              return (
                <div
                  key={service.title}
                  ref={ref}
                  className={`py-16 ${index !== services.length - 1 ? 'border-b border-[#1a1a1a]' : ''} transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div
                      className="transition-all duration-700"
                      style={{
                        transitionDelay: isVisible ? '100ms' : '0ms',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
                      }}
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center mb-6">
                        <service.icon className="h-6 w-6 text-[#d4af37]" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        {service.title}
                      </h2>
                      <p className="text-lg text-gray-400">
                        {service.description}
                      </p>
                    </div>
                    <div className="space-y-4">
                      {service.bullets.map((bullet, i) => (
                        <div
                          key={bullet}
                          className="flex items-start gap-4 transition-all duration-500"
                          style={{
                            transitionDelay: isVisible ? `${200 + i * 100}ms` : '0ms',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0)' : 'translateX(20px)'
                          }}
                        >
                          <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-2.5 shrink-0" />
                          <p className="text-gray-300">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS TOGETHER - Premium Flow Diagram */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a] overflow-hidden">
        <div
          ref={flowRef}
          className={`mx-auto max-w-5xl px-6 transition-all duration-1000 ${
            flowVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            The System
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16">
            How it fits together.
          </h2>

          {/* Premium Flow Diagram */}
          <div className="relative">
            {/* Desktop flow */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Connecting line */}
                <div
                  className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent -translate-y-1/2 z-0"
                  style={{
                    opacity: flowVisible ? 1 : 0,
                    transition: 'opacity 1s ease 0.3s'
                  }}
                />

                {/* Animated shimmer line */}
                <div
                  className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0 overflow-hidden"
                  style={{
                    opacity: flowVisible ? 1 : 0,
                    transition: 'opacity 1s ease 0.5s'
                  }}
                >
                  <div className="w-full h-full flow-line" />
                </div>

                <div className="flex items-center justify-between relative z-10">
                  {flowSteps.map((step, index) => (
                    <div
                      key={step.label}
                      className="flex flex-col items-center transition-all duration-700"
                      style={{
                        transitionDelay: flowVisible ? `${300 + index * 150}ms` : '0ms',
                        opacity: flowVisible ? 1 : 0,
                        transform: flowVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)'
                      }}
                    >
                      {/* Node */}
                      <div className={`flow-node relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} border border-[#d4af37]/30 flex items-center justify-center group cursor-default`}>
                        <span className="text-[#d4af37] text-lg font-bold">{index + 1}</span>

                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-[#d4af37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Label */}
                      <p className="text-sm text-gray-400 mt-4 text-center max-w-[100px] font-medium">
                        {step.label}
                      </p>

                      {/* Connector arrow (except last) */}
                      {index < flowSteps.length - 1 && (
                        <div
                          className="absolute top-1/2 -translate-y-1/2 left-full -ml-2"
                          style={{
                            opacity: flowVisible ? 1 : 0,
                            transition: `opacity 0.5s ease ${0.5 + index * 0.15}s`
                          }}
                        >
                          <ChevronRight className="w-5 h-5 text-[#d4af37]/40" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile flow */}
            <div className="lg:hidden">
              <div className="relative pl-8">
                {/* Vertical line */}
                <div
                  className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/30 to-[#d4af37]/10"
                  style={{
                    opacity: flowVisible ? 1 : 0,
                    transform: flowVisible ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top',
                    transition: 'all 1s ease 0.3s'
                  }}
                />

                <div className="space-y-8">
                  {flowSteps.map((step, index) => (
                    <div
                      key={step.label}
                      className="flex items-center gap-6 relative transition-all duration-500"
                      style={{
                        transitionDelay: flowVisible ? `${200 + index * 100}ms` : '0ms',
                        opacity: flowVisible ? 1 : 0,
                        transform: flowVisible ? 'translateX(0)' : 'translateX(-20px)'
                      }}
                    >
                      {/* Dot */}
                      <div className="absolute left-[-8px] w-4 h-4 rounded-full bg-[#0d0d0d] border-2 border-[#d4af37]/40 z-10" />

                      {/* Node */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} border border-[#d4af37]/30 flex items-center justify-center shrink-0`}>
                        <span className="text-[#d4af37] text-sm font-bold">{index + 1}</span>
                      </div>

                      <p className="text-gray-400 font-medium">{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p
            className="text-center text-gray-500 mt-16 transition-all duration-700"
            style={{
              transitionDelay: flowVisible ? '1200ms' : '0ms',
              opacity: flowVisible ? 1 : 0
            }}
          >
            All automatic. All connected. All monitored.
          </p>
        </div>
      </section>

      {/* WHAT WE INTEGRATE WITH */}
      <section className="py-24 border-t border-[#1a1a1a] section-fade-border">
        <div
          ref={integrationsRef}
          className={`mx-auto max-w-4xl px-6 transition-all duration-1000 ${
            integrationsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Integrations
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            We work with your tools.
          </h2>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl">
            CRMs, calendars, phone systems, messaging platforms. If it has an API, we can connect it.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              'HubSpot', 'Salesforce', 'GoHighLevel', 'Pipedrive',
              'Calendly', 'Cal.com', 'Google Calendar',
              'Twilio', 'RingCentral', 'OpenPhone',
              'Slack', 'Teams', 'Zapier', 'Make',
              'ServiceTitan', 'Jobber', 'Housecall Pro'
            ].map((tool, i) => (
              <span
                key={tool}
                className="px-4 py-2 text-sm text-gray-500 border border-[#1a1a1a] rounded-full tag-hover transition-all duration-500"
                style={{
                  transitionDelay: integrationsVisible ? `${200 + i * 40}ms` : '0ms',
                  opacity: integrationsVisible ? 1 : 0,
                  transform: integrationsVisible ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                {tool}
              </span>
            ))}
          </div>

          <p
            className="text-sm text-gray-600 mt-8 transition-all duration-500"
            style={{
              transitionDelay: integrationsVisible ? '900ms' : '0ms',
              opacity: integrationsVisible ? 1 : 0
            }}
          >
            Don't see your tool? We probably support it.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#d4af37]/[0.02] blur-[100px] pointer-events-none" />

        <div
          ref={ctaRef}
          className={`mx-auto max-w-3xl px-6 text-center relative z-10 transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-glow">
            Not sure what you need?
          </h2>

          <p className="text-xl text-gray-400 mb-12">
            Start with a conversation. We'll map it out.
          </p>

          <Link
            to="/begin"
            className="btn-primary group inline-flex items-center gap-3 bg-[#d4af37] text-black px-10 py-4 rounded-full font-semibold hover:bg-[#f4d03f] transition-all duration-300"
          >
            Begin
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  )
}
