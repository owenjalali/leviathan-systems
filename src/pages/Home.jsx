import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">

      {/* HERO — IDENTITY LOCK */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient background - slow drifting orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Primary orb */}
          <div
            className="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-[#d4af37]/[0.04] blur-[120px] animate-drift"
            style={{ animationDelay: '0s' }}
          />
          {/* Secondary orb */}
          <div
            className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#d4af37]/[0.03] blur-[100px] animate-drift"
            style={{ animationDelay: '-10s' }}
          />
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 grid-overlay" />
        </div>

        <div className="mx-auto max-w-5xl px-6 py-32 text-center">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.4em] uppercase mb-10 animate-reveal">
            Leviathan Systems
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] animate-reveal delay-100">
            Autonomous Revenue
            <br />
            <span className="text-[#d4af37]">Infrastructure</span>
          </h1>

          <p className="mt-10 text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-reveal delay-200">
            We eliminate the gaps where money disappears. Missed calls. Slow follow-ups.
            Forgotten opportunities. Leviathan ensures nothing slips through.
          </p>

          <div className="mt-14 animate-reveal delay-300">
            <Link
              to="/begin"
              className="group inline-flex items-center gap-3 text-[#d4af37] text-sm font-medium tracking-wide hover:text-[#f4d03f] transition-all duration-500"
            >
              <span className="hover-line">Explore If Infrastructure Fits</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator - subtle line */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#d4af37]/30 to-transparent animate-glow" />
        </div>
      </section>

      {/* THE PROBLEM — UNSPOKEN PAIN */}
      <section className="py-32 border-t border-[#1a1a1a] section-depth">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-8 animate-layer">
            The Quiet Cost of Growth
          </p>

          <div className="space-y-10 text-2xl sm:text-3xl text-gray-300 font-light leading-relaxed">
            <p className="animate-layer delay-100">
              Every business has them. The calls that rang out. The leads that went cold.
              The follow-ups that never happened.
            </p>
            <p className="text-gray-500 animate-layer delay-200">
              Not because anyone failed.
              <br />
              Because the system was never built.
            </p>
            <p className="text-white animate-layer delay-300">
              Revenue doesn't leak through incompetence. It leaks through gaps
              no one sees until the damage is done.
            </p>
          </div>
        </div>
      </section>

      {/* THE REFRAME — SYSTEMS THINKING */}
      <section className="py-32 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-8 animate-layer">
            The Shift
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-14 animate-layer delay-100">
            Revenue should not depend
            <br />
            <span className="text-gray-500">on memory.</span>
          </h2>

          <div className="space-y-8 text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl">
            <p className="animate-layer delay-200">
              When money touches a process, it should never rely on a person being
              available, attentive, or remembering.
            </p>
            <p className="animate-layer delay-300">
              Humans create variance. Systems create consistency.
            </p>
            <p className="text-gray-300 animate-layer delay-400">
              The businesses that scale aren't working harder. They've replaced fragile
              processes with infrastructure that never sleeps.
            </p>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-32 border-t border-[#1a1a1a] section-depth">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-8 animate-layer">
            What Leviathan Provides
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
            {[
              {
                title: 'Revenue Capture',
                description: 'Every inbound opportunity is acknowledged, qualified, and routed — without delay, without exception.'
              },
              {
                title: 'Operational Control',
                description: 'Visibility into what\'s working, what\'s breaking, and where money is at risk.'
              },
              {
                title: 'Human-Safe Autonomy',
                description: 'Systems that operate independently while keeping humans informed and in control.'
              }
            ].map((pillar, index) => (
              <div key={pillar.title} className={`group animate-layer delay-${(index + 1) * 100}`}>
                <div className="text-[#d4af37]/20 text-7xl font-bold mb-6 leading-none">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white mb-5">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR — CONDITIONS */}
      <section className="py-32 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-8 animate-layer">
            Is This For You
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-14 animate-layer delay-100">
            We don't serve industries.
            <br />
            <span className="text-gray-500">We serve conditions.</span>
          </h2>

          <div className="space-y-6">
            {[
              'Delays cost real money',
              'Inbound demand exceeds response capacity',
              'Growth has outpaced manual reliability',
              'Control matters more than convenience'
            ].map((condition, index) => (
              <div
                key={condition}
                className={`flex items-center gap-5 text-lg text-gray-300 animate-layer delay-${(index + 2) * 100}`}
              >
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                {condition}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECRETARY — FIRST SYSTEM */}
      <section className="py-32 border-t border-[#1a1a1a] section-depth">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-8 animate-layer">
            First Layer
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10 animate-layer delay-100">
            Secretary
          </h2>

          <p className="text-xl text-gray-400 mb-10 animate-layer delay-200">
            The first layer of Leviathan infrastructure.
          </p>

          <div className="space-y-6 text-lg text-gray-400 leading-relaxed border-l border-[#2d2d2d] pl-8">
            <p className="animate-layer delay-300">
              Secretary is not a chatbot. Not an answering service. Not a widget.
            </p>
            <p className="text-gray-300 animate-layer delay-400">
              It is a revenue-capture system for inbound demand. Every call answered.
              Every opportunity acknowledged. Every lead preserved — before it becomes
              someone else's customer.
            </p>
          </div>
        </div>
      </section>

      {/* WHY THIS WORKS — AUTHORITY */}
      <section className="py-32 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-10 animate-layer">
            The Logic
          </p>

          <div className="space-y-5 text-2xl sm:text-3xl text-gray-300 font-light">
            <p className="animate-layer delay-100">Humans forget. <span className="text-white">Systems don't.</span></p>
            <p className="animate-layer delay-200">Humans sleep. <span className="text-white">Systems don't.</span></p>
            <p className="animate-layer delay-300">Humans get overwhelmed. <span className="text-white">Systems scale.</span></p>
          </div>

          <div className="mt-20 pt-16 border-t border-[#1a1a1a]">
            <p className="text-lg text-gray-400 leading-relaxed animate-layer delay-400">
              Growth doesn't break good people. It breaks manual processes.
            </p>
            <p className="text-xl text-white mt-5 animate-layer delay-500">
              Leviathan replaces the fragile with the inevitable.
            </p>
          </div>
        </div>
      </section>

      {/* INVITATION — QUIET CTA */}
      <section className="py-32 border-t border-[#1a1a1a] section-depth">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-10 animate-layer">
            Begin Here
          </p>

          <p className="text-2xl sm:text-3xl text-gray-400 font-light leading-relaxed mb-5 animate-layer delay-100">
            Not every operation is ready for infrastructure.
          </p>
          <p className="text-2xl sm:text-3xl text-white font-light animate-layer delay-200">
            For those that are — we're here.
          </p>

          <div className="mt-16 animate-scale delay-300">
            <Link
              to="/begin"
              className="group inline-flex items-center gap-3 bg-[#d4af37] text-black px-10 py-4 rounded-full font-semibold hover:bg-[#f4d03f] transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.25)]"
            >
              Explore If Infrastructure Fits
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="mt-10 text-sm text-gray-600 animate-fade delay-400">
            No pitch. No pressure. Just clarity.
          </p>
        </div>
      </section>

    </div>
  )
}
