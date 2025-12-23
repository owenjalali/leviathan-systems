import { useEffect } from 'react'

export default function Begin() {
  // Reinitialize Calendly widget when component mounts
  useEffect(() => {
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/leviathanaidev?background_color=ffffff&text_color=1a1a1a&primary_color=d4af37',
        parentElement: document.getElementById('calendly-embed'),
      })
    }
  }, [])

  return (
    <div className="bg-[#0a0a0a] pt-24">

      {/* HERO */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-6 animate-reveal">
            Begin
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 animate-reveal delay-100">
            Explore if infrastructure
            <br />
            <span className="text-gray-500">fits your operation.</span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl animate-reveal delay-200">
            This is not a sales call. It's a conversation to determine whether
            Leviathan infrastructure is appropriate for your business — and whether
            you're ready for it.
          </p>
        </div>
      </section>

      {/* WHAT THIS IS */}
      <section className="py-20 border-t border-[#1a1a1a] section-depth">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="animate-layer delay-100">
              <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-4">
                What This Is
              </p>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  A direct conversation about your operation — where revenue is
                  at risk, where control is lacking, and whether infrastructure
                  can address it.
                </p>
                <p className="text-gray-300">
                  No pitch. No pressure. Just clarity.
                </p>
              </div>
            </div>
            <div className="animate-layer delay-200">
              <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-4">
                What We'll Discuss
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Where inbound opportunities are being missed
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Current operational bottlenecks
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Whether autonomous systems make sense
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Next steps — if any
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALENDLY */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12 animate-layer">
            <p className="text-[#d4af37] text-sm font-medium tracking-[0.3em] uppercase mb-4">
              Schedule
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Select a time that works.
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden animate-scale delay-200">
            <div
              id="calendly-embed"
              className="calendly-inline-widget"
              data-url="https://calendly.com/leviathanaidev?background_color=ffffff&text_color=1a1a1a&primary_color=d4af37"
              style={{ minWidth: '280px', height: '650px' }}
            />
          </div>
        </div>
      </section>

      {/* NOT READY */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-lg text-gray-500 mb-4 animate-fade">
            Not ready for a conversation?
          </p>
          <p className="text-lg text-gray-400 animate-fade delay-100">
            That's fine. When you are —{' '}
            <span className="text-white">we'll be here.</span>
          </p>

          <div className="mt-16 pt-12 border-t border-[#1a1a1a]">
            <p className="text-sm text-gray-600">
              Prefer email?{' '}
              <a
                href="mailto:hello@leviathansystems.com"
                className="text-gray-400 hover:text-[#d4af37] transition-colors duration-500"
              >
                hello@leviathansystems.com
              </a>
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
