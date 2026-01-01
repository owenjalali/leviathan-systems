import { Link } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Calendar, Database, Mail, Filter, Route, Bell, CheckCircle } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import servicesImage from '../assets/Leviathan Systems Services.png'

const services = [
  {
    icon: Phone,
    title: 'Inbound Capture',
    description: 'Never miss a lead, even at 2am.',
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
  { label: 'Lead Captured', desc: 'Phone, chat, form', icon: Phone },
  { label: 'Qualified', desc: 'Smart questions', icon: Filter },
  { label: 'Routed', desc: 'Right person', icon: Route },
  { label: 'Booked', desc: 'Auto-scheduled', icon: Calendar },
  { label: 'Reminded', desc: 'No no-shows', icon: Bell },
  { label: 'Synced', desc: 'CRM updated', icon: CheckCircle }
]

export default function Services() {
  const [heroRef, heroVisible] = useScrollAnimation(0.1)
  const [flowRef, flowVisible] = useScrollAnimation(0.2)
  const [integrationsRef, integrationsVisible] = useScrollAnimation(0.15)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.15)

  return (
    <div className="bg-[#050510] pt-24">

      {/* HERO */}
      <section className="py-24 relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-glow absolute top-0 right-1/4 w-[400px] h-[400px]" />
          <div className="orb-purple absolute bottom-0 left-1/4 w-[300px] h-[300px]" />
        </div>

        <div
          ref={heroRef}
          className={`mx-auto max-w-6xl px-6 relative z-10 transition-all duration-[1500ms] ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.3em] uppercase text-[#00fff7] bg-[#00fff7]/10 rounded-full border border-[#00fff7]/20">
                Services
              </span>

              <h1 className="text-4xl sm:text-5xl font-bold text-[#e8ecf0] leading-tight mb-6">
                What we build for
                <br />
                <span className="text-[#8899a6]">service businesses.</span>
              </h1>

              <p className="text-xl text-[#8899a6] max-w-lg">
                Every system is custom. Here's what's possible.
              </p>
            </div>

            {/* Image */}
            <div
              className={`relative transition-all duration-[1500ms] ${
                heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-[#00fff7]/10 blur-3xl rounded-full scale-75" />
                <img
                  src={servicesImage}
                  alt="Leviathan Systems Services"
                  className="relative w-full h-auto rounded-2xl shadow-2xl shadow-black/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-12 border-t border-[#00fff7]/10 section-glow-border relative">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-0">
            {services.map((service, index) => {
              const [ref, isVisible] = useScrollAnimation(0.15)
              return (
                <div
                  key={service.title}
                  ref={ref}
                  className={`py-16 ${index !== services.length - 1 ? 'border-b border-[#00fff7]/10' : ''} transition-all duration-700 ${
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
                      <div className="icon-orb w-14 h-14 flex items-center justify-center mb-6">
                        <service.icon className="h-6 w-6 text-[#00fff7]" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#e8ecf0] mb-4">
                        {service.title}
                      </h2>
                      <p className="text-lg text-[#8899a6]">
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
                          <div className="w-1.5 h-1.5 bg-[#00fff7] rounded-full mt-2.5 shrink-0 shadow-lg shadow-[#00fff7]/50" />
                          <p className="text-[#8899a6]">{bullet}</p>
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
      <section className="py-24 bg-[#0a1628]/50 border-t border-[#00fff7]/10 overflow-hidden relative">
        {/* Ambient orb */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" />
        </div>

        <div
          ref={flowRef}
          className={`mx-auto max-w-6xl px-6 relative z-10 transition-all duration-[1500ms] ${
            flowVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.3em] uppercase text-[#00fff7] bg-[#00fff7]/10 rounded-full border border-[#00fff7]/20">
              The System
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#e8ecf0]">
              How it fits together.
            </h2>
          </div>

          {/* Premium Flow Diagram */}
          <div className="relative">
            {/* Desktop flow */}
            <div className="hidden lg:block">
              {/* SVG Connection Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <defs>
                  <linearGradient id="lineGradientCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00fff7" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#00fff7" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00fff7" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="glowCyan">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Animated connection lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    {/* Base line */}
                    <line
                      x1={`${8 + i * 16.8}%`}
                      y1="50%"
                      x2={`${24.8 + i * 16.8}%`}
                      y2="50%"
                      stroke="url(#lineGradientCyan)"
                      strokeWidth="2"
                      className="transition-all duration-[1500ms]"
                      style={{
                        opacity: flowVisible ? 1 : 0,
                        transitionDelay: `${400 + i * 150}ms`
                      }}
                    />
                    {/* Animated pulse */}
                    <circle
                      r="4"
                      fill="#00fff7"
                      filter="url(#glowCyan)"
                      className="flow-pulse"
                      style={{
                        opacity: flowVisible ? 0.8 : 0,
                        animationDelay: `${i * 0.3}s`
                      }}
                    >
                      <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={`M${80 + i * 168},100 L${248 + i * 168},100`}
                      />
                    </circle>
                  </g>
                ))}
              </svg>

              <div className="flex items-stretch justify-between relative z-10">
                {flowSteps.map((step, index) => (
                  <div
                    key={step.label}
                    className="flex flex-col items-center flex-1 max-w-[140px] transition-all duration-700"
                    style={{
                      transitionDelay: flowVisible ? `${200 + index * 120}ms` : '0ms',
                      opacity: flowVisible ? 1 : 0,
                      transform: flowVisible ? 'translateY(0)' : 'translateY(30px)'
                    }}
                  >
                    {/* Node */}
                    <div className="relative group">
                      <div className={`relative w-16 h-16 rounded-2xl bg-[#050510] border-2 border-[#00fff7]/30 flex items-center justify-center transition-all duration-300 group-hover:border-[#00fff7] group-hover:shadow-lg group-hover:shadow-[#00fff7]/20`}>
                        <step.icon className="w-6 h-6 text-[#00fff7]" />
                        {/* Pulse ring on hover */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-[#00fff7]/0 group-hover:border-[#00fff7]/40 group-hover:scale-110 transition-all duration-300" />
                      </div>
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00fff7] flex items-center justify-center shadow-lg shadow-[#00fff7]/30">
                        <span className="text-[#050510] text-xs font-bold">{index + 1}</span>
                      </div>
                    </div>

                    {/* Label */}
                    <p className="text-sm text-[#e8ecf0] mt-4 text-center font-medium">
                      {step.label}
                    </p>
                    <p className="text-xs text-[#8899a6] mt-1 text-center">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile flow - Vertical */}
            <div className="lg:hidden">
              <div className="relative">
                {/* Vertical animated line */}
                <div
                  className="absolute left-7 top-8 bottom-8 w-0.5 overflow-hidden"
                  style={{
                    opacity: flowVisible ? 1 : 0,
                    transition: 'opacity 0.5s ease 0.3s'
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-[#00fff7]/10 via-[#00fff7]/40 to-[#00fff7]/10" />
                  <div className="absolute top-0 left-0 w-full h-8 bg-[#00fff7]/60 animate-flow-down" />
                </div>

                <div className="space-y-6">
                  {flowSteps.map((step, index) => (
                    <div
                      key={step.label}
                      className="flex items-start gap-4 relative transition-all duration-500"
                      style={{
                        transitionDelay: flowVisible ? `${200 + index * 100}ms` : '0ms',
                        opacity: flowVisible ? 1 : 0,
                        transform: flowVisible ? 'translateX(0)' : 'translateX(-20px)'
                      }}
                    >
                      {/* Node */}
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-[#050510] border-2 border-[#00fff7]/30 flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-[#00fff7]" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00fff7] flex items-center justify-center shadow-lg shadow-[#00fff7]/30">
                          <span className="text-[#050510] text-[10px] font-bold">{index + 1}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-[#e8ecf0] font-medium">{step.label}</p>
                        <p className="text-[#8899a6] text-sm mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p
            className="text-center text-[#8899a6] mt-16 text-sm transition-all duration-700"
            style={{
              transitionDelay: flowVisible ? '1000ms' : '0ms',
              opacity: flowVisible ? 1 : 0
            }}
          >
            All automatic. All connected. All monitored.
          </p>
        </div>
      </section>

      {/* WHAT WE INTEGRATE WITH */}
      <section className="py-24 border-t border-[#00fff7]/10 section-glow-border relative">
        <div
          ref={integrationsRef}
          className={`mx-auto max-w-4xl px-6 transition-all duration-[1500ms] ${
            integrationsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.3em] uppercase text-[#00fff7] bg-[#00fff7]/10 rounded-full border border-[#00fff7]/20">
            Integrations
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8ecf0] mb-6">
            We work with your tools.
          </h2>

          <p className="text-lg text-[#8899a6] mb-12 max-w-2xl">
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
                className={`tag-ocean px-4 py-2 text-sm cursor-default ${
                  integrationsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                style={{
                  transition: integrationsVisible
                    ? `opacity 0.5s ease ${200 + i * 40}ms, transform 0.5s ease ${200 + i * 40}ms`
                    : 'opacity 0.5s ease, transform 0.5s ease'
                }}
              >
                {tool}
              </span>
            ))}
          </div>

          <p
            className="text-sm text-[#4a5568] mt-8 transition-all duration-500"
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
      <section className="py-24 bg-[#0a1628]/30 border-t border-[#00fff7]/10 relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]" />
          <div className="orb-purple absolute top-1/4 right-1/4 w-[300px] h-[300px]" />
        </div>

        <div
          ref={ctaRef}
          className={`mx-auto max-w-3xl px-6 text-center relative z-10 transition-all duration-[1500ms] ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8ecf0] mb-6 glow-text">
            Not sure what you need?
          </h2>

          <p className="text-xl text-[#8899a6] mb-12">
            Start with a conversation. We'll map it out.
          </p>

          <Link
            to="/begin"
            className="btn-glow group inline-flex items-center gap-3 px-10 py-4 text-lg"
          >
            Begin
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  )
}
