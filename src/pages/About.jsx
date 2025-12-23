import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function About() {
  return (
    <div className="bg-[#0a0a0a] pt-24">

      {/* HERO */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-6 animate-reveal">
            About
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-10 animate-reveal delay-100">
            Infrastructure,
            <br />
            <span className="text-gray-500">not software.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-2xl animate-reveal delay-200">
            Leviathan Systems builds autonomous revenue infrastructure for operations
            where money depends on consistency, speed, and control.
          </p>
        </div>
      </section>

      {/* WHAT WE ARE NOT */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-6 animate-layer">
            Clarity
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-14 animate-layer delay-100">
            What we are not.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              'An automation agency',
              'A SaaS platform',
              'A chatbot company',
              'A software installer'
            ].map((item, index) => (
              <div
                key={item}
                className={`flex items-center gap-5 text-lg text-gray-500 animate-layer delay-${(index + 2) * 100}`}
              >
                <div className="w-6 h-px bg-[#2d2d2d]" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-20 pt-16 border-t border-[#1a1a1a]">
            <p className="text-xl text-gray-400 leading-relaxed animate-layer delay-400">
              Those are mechanisms. Not identity.
            </p>
            <p className="text-xl text-white mt-5 animate-layer delay-500">
              Leviathan sells revenue protection, control, and predictability.
              The systems are simply how the infrastructure is delivered.
            </p>
          </div>
        </div>
      </section>

      {/* BELIEF */}
      <section className="py-24 border-t border-[#1a1a1a] section-depth">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-10 animate-layer">
            Foundational Belief
          </p>

          <blockquote className="text-3xl sm:text-4xl text-white font-light leading-relaxed animate-layer delay-100">
            "If money touches a process, it should never rely on memory or humans alone."
          </blockquote>

          <div className="mt-20 space-y-8 text-lg sm:text-xl text-gray-400 leading-relaxed">
            <p className="animate-layer delay-200">
              Leviathan exists to eliminate missed opportunities, revenue leakage,
              operational chaos, and growth bottlenecks caused by human limits.
            </p>
            <p className="text-gray-300 animate-layer delay-300">
              We replace fragile processes with always-on systems.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE PROVIDE */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-10 animate-layer">
            What We Provide
          </p>

          <div className="space-y-14">
            {[
              {
                title: 'Strength',
                description: 'Systems that don\'t break under pressure.'
              },
              {
                title: 'Control',
                description: 'Visibility into every process that touches revenue.'
              },
              {
                title: 'Scale',
                description: 'Growth without proportional headcount.'
              },
              {
                title: 'Trust',
                description: 'Infrastructure you can rely on when it matters.'
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className={`flex gap-10 items-baseline animate-layer delay-${(index + 1) * 100}`}
              >
                <h3 className="text-xl font-semibold text-white w-32 shrink-0">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[#1a1a1a] section-depth">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-2xl text-gray-400 font-light mb-10 leading-relaxed animate-reveal">
            The question isn't whether you need infrastructure.
            <br />
            <span className="text-white">It's whether you're ready for it.</span>
          </p>

          <Link
            to="/begin"
            className="group inline-flex items-center gap-3 text-[#d4af37] text-sm font-medium tracking-wide hover:text-[#f4d03f] transition-all duration-500 animate-scale delay-100"
          >
            <span className="hover-line">Explore If Infrastructure Fits</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

    </div>
  )
}
