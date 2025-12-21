export default function Book() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Book a Consultation
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Schedule a free 30-minute call to discuss how AI can transform your business.
            </p>
          </div>
        </div>
      </section>

      {/* Calendly Embed Placeholder */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <p className="text-gray-500">
              Calendly widget will be embedded here
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Add your Calendly embed code to activate scheduling
            </p>
            {
              
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/leviathanaidev"
                style={{ minWidth: '320px', height: '700px' }}
              />
            }
          </div>

          {/* What to Expect */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              What to Expect
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3a5f] text-white font-bold">
                  1
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">Discovery</h3>
                <p className="mt-2 text-sm text-gray-600">
                  We learn about your business and current processes
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3a5f] text-white font-bold">
                  2
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">Solution Design</h3>
                <p className="mt-2 text-sm text-gray-600">
                  We show you how AI can solve your specific challenges
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3a5f] text-white font-bold">
                  3
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">Next Steps</h3>
                <p className="mt-2 text-sm text-gray-600">
                  We outline a clear path to implementation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
