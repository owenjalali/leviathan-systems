import { Link } from 'react-router-dom'
import { Bot, Clock, TrendingUp, Shield } from 'lucide-react'

const features = [
  {
    name: 'AI Receptionist',
    description: 'Never miss a call. Our AI handles inquiries, schedules appointments, and routes calls 24/7.',
    icon: Bot,
  },
  {
    name: 'Save Time',
    description: 'Automate repetitive tasks and free up hours every week for what matters most.',
    icon: Clock,
  },
  {
    name: 'Scale Effortlessly',
    description: 'Handle 10x the volume without hiring additional staff.',
    icon: TrendingUp,
  },
  {
    name: 'Reliable & Secure',
    description: 'Enterprise-grade security with 99.9% uptime guarantee.',
    icon: Shield,
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Autonomous AI Agents for{' '}
              <span className="text-[#3b82f6]">Small Businesses</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stop losing customers to missed calls and slow response times.
              Our AI agents handle appointments, answer questions, and work 24/7
              so you can focus on growing your business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/book"
                className="rounded-full bg-[#1e3a5f] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0f2744] transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/services"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-[#3b82f6] transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Leviathan Systems?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We build AI that works as hard as you do.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a5f]">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                  </div>
                  <p className="mt-4 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to automate your business?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Book a free consultation and discover how AI can transform your operations.
            </p>
            <Link
              to="/book"
              className="mt-8 inline-block rounded-full bg-[#3b82f6] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Schedule Your Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
