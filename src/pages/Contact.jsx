import { Link } from 'react-router-dom'
import { Mail, MessageSquare, Calendar } from 'lucide-react'

export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Have questions about our AI solutions? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1e3a5f]">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Book a Call</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Schedule a free consultation
                </p>
                <Link
                  to="/book"
                  className="mt-4 inline-block text-sm font-medium text-[#3b82f6] hover:text-blue-500"
                >
                  Schedule now →
                </Link>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1e3a5f]">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Email Us</h3>
                <p className="mt-2 text-sm text-gray-600">
                  We'll respond within 24 hours
                </p>
                <a
                  href="mailto:hello@leviathansystems.com"
                  className="mt-4 inline-block text-sm font-medium text-[#3b82f6] hover:text-blue-500"
                >
                  hello@leviathansystems.com
                </a>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1e3a5f]">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Live Chat</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Talk to our AI assistant
                </p>
                <span className="mt-4 inline-block text-sm text-gray-400">
                  Coming soon
                </span>
              </div>
            </div>

            {/* Preferred: Book a call */}
            <div className="mt-16 rounded-2xl bg-gray-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                The fastest way to get started
              </h2>
              <p className="mt-4 text-gray-600">
                Book a free 30-minute consultation. We'll discuss your business needs
                and show you exactly how our AI solutions can help.
              </p>
              <Link
                to="/book"
                className="mt-6 inline-block rounded-full bg-[#1e3a5f] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0f2744] transition-colors"
              >
                Book Your Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
