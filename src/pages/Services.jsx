import { Link } from 'react-router-dom'
import { Phone, Layers, Wrench, Check, ArrowRight, Sparkles } from 'lucide-react'

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
    <div className="bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="animate-fade-in-up mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] border border-[#2d2d2d] px-4 py-2 text-sm text-gray-300">
                <Sparkles className="h-4 w-4 text-[#d4af37]" />
                Flexible Solutions
              </span>
            </div>
            <h1 className="animate-fade-in-up delay-100 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our <span className="text-[#d4af37]">Services</span>
            </h1>
            <p className="animate-fade-in-up delay-200 mt-6 text-lg text-gray-400">
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
            {services.map((service, index) => (
              <div
                key={service.name}
                className={`relative rounded-2xl p-8 transition-all duration-500 card-hover animate-fade-in-up delay-${(index + 1) * 100} ${
                  service.popular
                    ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.15)]'
                    : 'bg-[#1a1a1a] border border-[#2d2d2d] hover:border-[#d4af37]/50'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-[#d4af37] px-4 py-1 text-xs font-semibold text-black">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                    service.popular
                      ? 'bg-[#d4af37]/10 border border-[#d4af37]/30'
                      : 'bg-[#0a0a0a] border border-[#2d2d2d]'
                  }`}>
                    <service.icon className="h-7 w-7 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.name}</h3>
                    <p className="text-sm text-gray-400">
                      {service.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-8 space-y-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-[#d4af37]" />
                      <span className="text-sm text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/book"
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-300 group ${
                    service.popular
                      ? 'bg-[#d4af37] text-black hover:bg-[#f4d03f] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                      : 'bg-[#2d2d2d] text-white hover:bg-[#3d3d3d]'
                  }`}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ/CTA */}
      <section className="border-t border-[#1a1a1a] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Not sure which option is right for you?
            </h2>
            <p className="mt-6 text-lg text-gray-400">
              Book a free consultation and we'll help you find the perfect solution for your business.
            </p>
            <Link
              to="/book"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-4 text-sm font-semibold text-black hover:bg-[#f4d03f] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group"
            >
              Schedule a Free Call
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
