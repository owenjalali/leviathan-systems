import { useEffect } from 'react'

export default function Book() {
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
    <div className="bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Book a <span className="text-[#d4af37]">Consultation</span>
            </h1>
            <p className="animate-fade-in-up delay-100 mt-6 text-lg text-gray-400">
              Schedule a free 30-minute call to discuss how AI can transform your business.
            </p>
          </div>
        </div>
      </section>

      {/* Calendly Embed */}
      <section className="pb-16">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="animate-fade-in-up delay-200 rounded-2xl overflow-hidden shadow-2xl">
            <div
              id="calendly-embed"
              className="calendly-inline-widget"
              data-url="https://calendly.com/leviathanaidev?background_color=ffffff&text_color=1a1a1a&primary_color=d4af37"
              style={{ minWidth: '280px', height: '600px' }}
            />
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="border-t border-[#1a1a1a] py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center sm:text-3xl">
            What to <span className="text-[#d4af37]">Expect</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Discovery',
                description: 'We learn about your business and current processes',
              },
              {
                step: '2',
                title: 'Solution Design',
                description: 'We show you how AI can solve your specific challenges',
              },
              {
                step: '3',
                title: 'Next Steps',
                description: 'We outline a clear path to implementation',
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className={`text-center animate-fade-in-up delay-${(index + 1) * 100}`}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37] text-black font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="mt-6 font-semibold text-white text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
