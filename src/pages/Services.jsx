import { Link } from 'react-router-dom'
import { Phone, Layers, Wrench, Check } from 'lucide-react'

const services = [
  {
    name: 'AI Receptionist',
    description: 'Your 24/7 virtual front desk',
    icon: Phone,
    features: [
      'Answer calls professionally, any time of day',
      'Schedule and cancel appointments automatically',
      'Route calls to the right person or department',
      'Capture lead information and send follow-ups',
      'Handle FAQs without human intervention',
    ],
    popular: false,
  },
  {
    name: 'Full Suite',
    description: 'Complete business automation',
    icon: Layers,
    features: [
      'Everything in AI Receptionist',
      'Email automation and smart responses',
      'CRM integration and lead management',
      'Appointment reminders and confirmations',
      'Customer follow-up sequences',
      'Analytics dashboard',
    ],
    popular: true,
  },
  {
    name: 'Custom Solutions',
    description: 'Built for your unique needs',
    icon: Wrench,
    features: [
      'Custom workflow design',
      'Integration with your existing tools',
      'Industry-specific AI training',
      'Dedicated support and maintenance',
      'Scalable architecture',
      'White-glove onboarding',
    ],
    popular: false,
  },
]

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Choose the automation package that fits your business.
              All solutions are built with n8n for reliability and flexibility.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className={`relative rounded-2xl p-8 ${
                  service.popular
                    ? 'bg-[#1e3a5f] text-white ring-2 ring-[#3b82f6]'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-[#3b82f6] px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    service.popular ? 'bg-white/10' : 'bg-gray-100'
                  }`}>
                    <service.icon className={`h-6 w-6 ${
                      service.popular ? 'text-white' : 'text-[#1e3a5f]'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{service.name}</h3>
                    <p className={`text-sm ${service.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                      {service.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-8 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 flex-shrink-0 ${
                        service.popular ? 'text-[#3b82f6]' : 'text-green-500'
                      }`} />
                      <span className={`text-sm ${
                        service.popular ? 'text-gray-200' : 'text-gray-600'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/book"
                  className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                    service.popular
                      ? 'bg-white text-[#1e3a5f] hover:bg-gray-100'
                      : 'bg-[#1e3a5f] text-white hover:bg-[#0f2744]'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ/CTA */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Not sure which option is right for you?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Book a free consultation and we'll help you find the perfect solution for your business.
            </p>
            <Link
              to="/book"
              className="mt-8 inline-block rounded-full bg-[#3b82f6] px-8 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Schedule a Free Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
