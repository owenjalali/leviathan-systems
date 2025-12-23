import { Link } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Calendar, Database, Mail } from 'lucide-react'

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

export default function Services() {
  return (
    <div className="bg-[#0a0a0a] pt-24">

      {/* HERO */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
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
      <section className="py-12 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-0">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`py-16 ${index !== services.length - 1 ? 'border-b border-[#1a1a1a]' : ''}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <service.icon className="h-8 w-8 text-[#d4af37] mb-6" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-400">
                      {service.description}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {service.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-4">
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-2.5 shrink-0" />
                        <p className="text-gray-300">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS TOGETHER */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            The System
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            How it fits together.
          </h2>

          {/* Simple flow visualization */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
            {['Lead comes in', 'Qualified', 'Routed', 'Booked', 'Followed up', 'CRM updated'].map((step, index) => (
              <div key={step} className="flex items-center gap-2 md:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center">
                    <span className="text-[#d4af37] text-sm font-medium">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 text-center max-w-[80px]">{step}</p>
                </div>
                {index < 5 && (
                  <ArrowRight className="h-4 w-4 text-[#2d2d2d] hidden md:block" />
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-12">
            All automatic. All connected. All monitored.
          </p>
        </div>
      </section>

      {/* WHAT WE INTEGRATE WITH */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
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
            ].map((tool) => (
              <span key={tool} className="px-4 py-2 text-sm text-gray-500 border border-[#1a1a1a] rounded-full">
                {tool}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-600 mt-8">
            Don't see your tool? We probably support it.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Not sure what you need?
          </h2>

          <p className="text-xl text-gray-400 mb-12">
            Start with a conversation. We'll map it out.
          </p>

          <Link
            to="/begin"
            className="group inline-flex items-center gap-3 bg-[#d4af37] text-black px-10 py-4 rounded-full font-semibold hover:bg-[#f4d03f] transition-all duration-300"
          >
            Begin
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  )
}
