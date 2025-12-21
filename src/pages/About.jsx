import { Link } from 'react-router-dom'
import { Target, Zap, Users, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Purpose-Driven',
    description: 'Every solution we build has one goal: giving you back your time.',
  },
  {
    icon: Zap,
    title: 'Cutting-Edge',
    description: 'We use the latest AI technology to deliver powerful, reliable automation.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: "We're not just vendors—we're partners invested in your success.",
  },
]

export default function About() {
  return (
    <div className="bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About <span className="text-[#d4af37]">Leviathan Systems</span>
            </h1>
            <p className="animate-fade-in-up delay-100 mt-8 text-xl leading-8 text-gray-400">
              We believe small businesses deserve the same powerful automation tools
              that enterprise companies use. That's why we build AI agents that are
              affordable, reliable, and easy to deploy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-[#1a1a1a] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <span className="text-[#d4af37] font-medium text-sm tracking-wider uppercase">Our Mission</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Empowering small businesses with enterprise-level AI
              </h2>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                To empower small businesses with autonomous AI that handles the mundane
                so owners can focus on growth. We're not just building technology—we're
                giving business owners their time back.
              </p>
            </div>
            <div className="animate-slide-in-right grid grid-cols-1 gap-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`group flex gap-4 p-6 rounded-2xl bg-[#1a1a1a] border border-[#2d2d2d] hover:border-[#d4af37]/50 transition-all duration-300 animate-fade-in-up delay-${(index + 1) * 100}`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0a0a] border border-[#2d2d2d] group-hover:border-[#d4af37]/50 transition-colors">
                    <value.icon className="h-6 w-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{value.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="border-t border-[#1a1a1a] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <span className="text-[#d4af37] font-medium text-sm tracking-wider uppercase">What We Do</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Custom AI automation built for you
            </h2>
            <div className="mt-8 space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Using <span className="text-white font-medium">n8n</span> and cutting-edge AI models, we create custom automation
                workflows tailored to your business needs. From AI receptionists
                that handle phone calls to intelligent systems that manage your
                entire customer journey—we build it all.
              </p>
              <p>
                Every business is different. That's why we don't offer one-size-fits-all
                solutions. We work closely with you to understand your processes,
                identify bottlenecks, and deploy AI agents that make a real impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1a1a1a] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2d2d2d] p-12 sm:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl" />
            <div className="relative text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Let's build something great together
              </h2>
              <p className="mt-4 text-gray-400">
                Ready to see what AI can do for your business?
              </p>
              <Link
                to="/book"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-4 text-sm font-semibold text-black hover:bg-[#f4d03f] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
