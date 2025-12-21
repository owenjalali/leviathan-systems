import { Link } from 'react-router-dom'
import { Mail, MessageSquare, Calendar, ArrowRight } from 'lucide-react'

const contactOptions = [
  {
    icon: Calendar,
    title: 'Book a Call',
    description: 'Schedule a free consultation',
    action: { type: 'link', to: '/book', text: 'Schedule now' },
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: "We'll respond within 24 hours",
    action: { type: 'email', href: 'mailto:hello@leviathansystems.com', text: 'hello@leviathansystems.com' },
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Talk to our AI assistant',
    action: { type: 'soon', text: 'Coming soon' },
  },
]

export default function Contact() {
  return (
    <div className="bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Get in <span className="text-[#d4af37]">Touch</span>
            </h1>
            <p className="animate-fade-in-up delay-100 mt-6 text-lg text-gray-400">
              Have questions about our AI solutions? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {contactOptions.map((option, index) => (
                <div
                  key={option.title}
                  className={`group text-center p-8 rounded-2xl bg-[#1a1a1a] border border-[#2d2d2d] hover:border-[#d4af37]/50 transition-all duration-300 card-hover animate-fade-in-up delay-${(index + 1) * 100}`}
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0a0a0a] border border-[#2d2d2d] group-hover:border-[#d4af37]/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300">
                    <option.icon className="h-8 w-8 text-[#d4af37]" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">{option.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {option.description}
                  </p>
                  {option.action.type === 'link' && (
                    <Link
                      to={option.action.to}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#d4af37] hover:text-[#f4d03f] transition-colors group/link"
                    >
                      {option.action.text}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  )}
                  {option.action.type === 'email' && (
                    <a
                      href={option.action.href}
                      className="mt-4 inline-block text-sm font-medium text-[#d4af37] hover:text-[#f4d03f] transition-colors"
                    >
                      {option.action.text}
                    </a>
                  )}
                  {option.action.type === 'soon' && (
                    <span className="mt-4 inline-block text-sm text-gray-500">
                      {option.action.text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Preferred: Book a call */}
            <div className="mt-16 relative rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2d2d2d] p-12 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl" />
              <div className="relative">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  The fastest way to get started
                </h2>
                <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                  Book a free 30-minute consultation. We'll discuss your business needs
                  and show you exactly how our AI solutions can help.
                </p>
                <Link
                  to="/book"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-4 text-sm font-semibold text-black hover:bg-[#f4d03f] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group"
                >
                  Book Your Free Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
