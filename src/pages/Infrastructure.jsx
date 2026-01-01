import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Infrastructure() {
  return (
    <div className="bg-[#0a0a0a] pt-24">

      {/* HERO */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-6 animate-reveal">
            Infrastructure
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 animate-reveal delay-100">
            Systems that run
            <br />
            <span className="text-gray-500">while you don't.</span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl animate-reveal delay-200">
            Leviathan infrastructure operates continuously: capturing revenue,
            maintaining control, and scaling without human dependency.
          </p>
        </div>
      </section>

      {/* THREE PILLARS DETAILED */}
      <section className="py-24 border-t border-[#1a1a1a] section-depth">
        <div className="mx-auto max-w-5xl px-6">

          {/* Pillar 1 */}
          <div className="py-20 border-b border-[#1a1a1a]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="animate-layer">
                <p className="text-[#d4af37]/40 text-8xl font-bold mb-6 leading-none">01</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Revenue Capture
                </h2>
              </div>
              <div className="space-y-6 text-gray-400 leading-relaxed animate-layer delay-200">
                <p className="text-lg">
                  Every inbound opportunity: every call, every inquiry, every signal of
                  interest is acknowledged, qualified, and routed.
                </p>
                <p className="text-lg text-gray-300">
                  Without delay. Without exception. Without depending on someone being available.
                </p>
                <p className="text-lg">
                  Revenue capture isn't about answering faster. It's about never missing
                  the moment when a prospect is ready to engage.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="py-20 border-b border-[#1a1a1a]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="animate-layer">
                <p className="text-[#d4af37]/40 text-8xl font-bold mb-6 leading-none">02</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Operational Control
                </h2>
              </div>
              <div className="space-y-6 text-gray-400 leading-relaxed animate-layer delay-200">
                <p className="text-lg">
                  Visibility into what's working, what's breaking, and where money is at risk.
                </p>
                <p className="text-lg text-gray-300">
                  Control isn't about micromanaging. It's about knowing, in real time,
                  the state of every process that touches revenue.
                </p>
                <p className="text-lg">
                  When something breaks, you know immediately. When something succeeds,
                  you understand why.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="animate-layer">
                <p className="text-[#d4af37]/40 text-8xl font-bold mb-6 leading-none">03</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Human-Safe Autonomy
                </h2>
              </div>
              <div className="space-y-6 text-gray-400 leading-relaxed animate-layer delay-200">
                <p className="text-lg">
                  Systems that operate independently while keeping humans informed and in control.
                </p>
                <p className="text-lg text-gray-300">
                  Autonomy doesn't mean replacement. It means relief. Your team focuses on
                  high-value work while infrastructure handles the rest.
                </p>
                <p className="text-lg">
                  The system runs. Humans decide. Nothing happens in the dark.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECRETARY */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-6 animate-reveal">
            First Layer
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 animate-reveal delay-100">
            Secretary
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
            <div className="animate-layer delay-200">
              <p className="text-xl text-gray-300 leading-relaxed">
                The entry point to Leviathan infrastructure.
              </p>
              <p className="text-lg text-gray-400 mt-6 leading-relaxed">
                Secretary handles inbound demand: calls, inquiries, and scheduling,
                so opportunities never wait for a human to be available.
              </p>
            </div>
            <div className="space-y-5 text-gray-400 animate-layer delay-300">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                24/7 call handling
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                Intelligent routing
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                Lead qualification
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                Appointment scheduling
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                CRM integration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-2xl text-gray-400 font-light mb-4 animate-reveal">
            Infrastructure requires commitment.
          </p>
          <p className="text-2xl text-white font-light mb-16 animate-reveal delay-100">
            For those ready to build, we're here.
          </p>

          <Link
            to="/begin"
            className="group inline-flex items-center gap-3 bg-[#d4af37] text-black px-10 py-4 rounded-full font-semibold hover:bg-[#f4d03f] transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] animate-scale delay-200"
          >
            Explore If Infrastructure Fits
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  )
}
