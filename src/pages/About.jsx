import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About Leviathan Systems
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We believe small businesses deserve the same powerful automation tools
              that enterprise companies use. That's why we build AI agents that are
              affordable, reliable, and easy to deploy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Mission</h2>
            <p className="mt-6 text-lg text-gray-600">
              To empower small businesses with autonomous AI that handles the mundane
              so owners can focus on growth. We're not just building technology—we're
              giving business owners their time back.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">What We Do</h2>
            <div className="mt-8 space-y-6 text-gray-600">
              <p>
                Using n8n and cutting-edge AI models, we create custom automation
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
      <section className="bg-[#1e3a5f] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Let's build something great together
          </h2>
          <p className="mt-4 text-gray-300">
            Ready to see what AI can do for your business?
          </p>
          <Link
            to="/book"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#1e3a5f] hover:bg-gray-100 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
