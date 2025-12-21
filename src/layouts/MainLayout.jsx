import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
]

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-xl font-bold text-[#1e3a5f]">Leviathan Systems</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-[#3b82f6]'
                    : 'text-gray-700 hover:text-[#1e3a5f]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/book"
              className="rounded-full bg-[#1e3a5f] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0f2744] transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-6 pb-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium ${
                    location.pathname === item.href
                      ? 'text-[#3b82f6]'
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 block rounded-full bg-[#1e3a5f] px-6 py-2.5 text-center text-sm font-semibold text-white"
              >
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0f2744] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Leviathan Systems</h3>
              <p className="text-gray-300 text-sm">
                Autonomous AI agents for small businesses. Automate your operations and scale effortlessly.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Contact</h4>
              <p className="text-sm text-gray-300">
                Ready to automate your business?
              </p>
              <Link
                to="/book"
                className="mt-4 inline-block text-[#3b82f6] hover:text-blue-400 transition-colors text-sm"
              >
                Schedule a consultation →
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            © {currentYear} Leviathan Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
