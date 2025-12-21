import { Link } from 'react-router-dom'
import { Bot, Clock, TrendingUp, Shield, ArrowRight, Sparkles } from 'lucide-react'

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
    <div className="bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden min-h-screen flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 w-full">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="animate-fade-in-up mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] border border-[#2d2d2d] px-4 py-2 text-sm text-gray-300">
                <Sparkles className="h-4 w-4 text-[#d4af37]" />
                AI-Powered Business Automation
              </span>
            </div>

            <h1 className="animate-fade-in-up delay-100 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Autonomous AI Agents for{' '}
              <span className="text-gold-gradient">Small Businesses</span>
            </h1>

            <p className="animate-fade-in-up delay-200 mt-8 text-lg leading-8 text-gray-400 sm:text-xl">
              Stop losing customers to missed calls and slow response times.
              Our AI agents handle appointments, answer questions, and work 24/7
              so you can focus on growing your business.
            </p>

            <div className="animate-fade-in-up delay-300 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/book"
                className="group rounded-full bg-[#d4af37] px-8 py-4 text-sm font-semibold text-black shadow-lg hover:bg-[#f4d03f] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="group rounded-full border border-[#2d2d2d] px-8 py-4 text-sm font-semibold text-gray-300 hover:text-white hover:border-[#4a4a4a] transition-all duration-300 flex items-center gap-2"
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-[#2d2d2d] flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#d4af37] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Why Choose <span className="text-[#d4af37]">Leviathan Systems</span>?
            </h2>
            <p className="mt-6 text-lg text-gray-400">
              We build AI that works as hard as you do.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`group bg-[#1a1a1a] rounded-2xl p-8 border border-[#2d2d2d] hover:border-[#d4af37]/50 transition-all duration-500 card-hover animate-fade-in-up delay-${(index + 1) * 100}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0a0a0a] border border-[#2d2d2d] group-hover:border-[#d4af37]/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500">
                      <feature.icon className="h-7 w-7 text-[#d4af37]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.name}</h3>
                  </div>
                  <p className="mt-4 text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '24/7', label: 'Availability' },
              { value: '99.9%', label: 'Uptime' },
              { value: '10x', label: 'Efficiency Gain' },
              { value: '< 1s', label: 'Response Time' },
            ].map((stat, index) => (
              <div key={stat.label} className={`text-center animate-fade-in-up delay-${(index + 1) * 100}`}>
                <div className="text-3xl sm:text-4xl font-bold text-[#d4af37]">{stat.value}</div>
                <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2d2d2d] p-12 sm:p-16 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl" />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to automate your business?
              </h2>
              <p className="mt-6 text-lg text-gray-400">
                Book a free consultation and discover how AI can transform your operations.
              </p>
              <Link
                to="/book"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-4 text-sm font-semibold text-black shadow-lg hover:bg-[#f4d03f] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group"
              >
                Schedule Your Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
