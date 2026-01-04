import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function About() {
  const [heroRef, heroVisible] = useScrollAnimation(0.1)
  const [howRef, howVisible] = useScrollAnimation(0.1)
  const [beliefRef, beliefVisible] = useScrollAnimation(0.1)
  const [ctaRef, ctaVisible] = useScrollAnimation(0.1)

  return (
    <div className="bg-[#030306] pt-24">

      {/* HERO - WHO WE ARE */}
      <section ref={heroRef} className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.3) 0%, transparent 60%)' }}
        />

        <div className="mx-auto max-w-4xl px-6 relative z-10">
          <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-10">
              We're Leviathan Systems.
            </h1>

            <div className="space-y-6 text-xl text-[#9ca3af] leading-relaxed max-w-2xl">
              <p>
                We partner with service businesses to build automation that captures revenue you're currently losing.
              </p>
              <p className="text-white">
                Not software you install and forget.
                <br />
                Not a chatbot that frustrates your customers.
                <br />
                A system built around how <span className="text-[#00d4cf]">your</span> business actually works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK - PARTNERSHIP */}
      <section ref={howRef} className="py-24 sm:py-32 relative overflow-hidden border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className={`transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[#00d4cf] text-sm font-medium tracking-[0.2em] uppercase mb-6">
              How We Work
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-10">
              Every business is different.
            </h2>

            <div className="space-y-6 text-xl text-[#9ca3af] leading-relaxed max-w-2xl">
              <p>
                That's why we start by learning yours—how leads find you, what happens when they do, and where things break down.
              </p>
              <p>
                Then we build a system that fits. Not a template. Not a one-size-fits-all solution.
              </p>
              <p className="text-white font-medium">
                Yours.
              </p>
            </div>
          </div>

          {/* What we do together */}
          <div className={`mt-16 grid sm:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              'We learn how your business operates',
              'We identify where opportunities slip away',
              'We design automation around your actual workflow',
              'We implement, monitor, and refine'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00d4cf]/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#00d4cf]" />
                </div>
                <p className="text-[#9ca3af]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BELIEF */}
      <section ref={beliefRef} className="py-24 sm:py-32 relative overflow-hidden border-t border-white/5">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,114,255,0.3) 0%, transparent 60%)' }}
        />

        <div className="mx-auto max-w-4xl px-6 relative z-10">
          <div className={`transition-all duration-700 ${beliefVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[#00d4cf] text-sm font-medium tracking-[0.2em] uppercase mb-6">
              What We Believe
            </p>

            <blockquote className="text-3xl sm:text-4xl text-white font-semibold leading-[1.2] mb-10">
              Speed isn't the advantage.
              <br />
              <span className="text-[#6b7280]">Consistency is.</span>
            </blockquote>

            <div className="space-y-6 text-xl text-[#9ca3af] leading-relaxed max-w-2xl">
              <p>
                Anyone can answer fast on a good day.
              </p>
              <p>
                We build systems that answer fast <span className="text-white">every day</span>—whether you're busy, closed, or on vacation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-24 sm:py-32 relative overflow-hidden border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className={`transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
              Want to see if we're a fit?
            </h2>

            <p className="text-xl text-[#9ca3af] mb-10">
              Book a free 30-minute call. We'll learn about your business and tell you honestly if we can help.
            </p>

            <Link
              to="/audit"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#030306] font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,212,207,0.4)] hover:scale-[1.02]"
            >
              Book a Free Assessment
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
