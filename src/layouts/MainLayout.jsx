import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import ScrollToTop from '../components/ScrollToTop'
import logo from '../assets/logo.png'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
]

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ScrollToTop />

      {/* Navigation */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]'
          : 'bg-transparent'
      }`}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex-1">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="Leviathan Systems"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-sm font-semibold text-white tracking-wide hidden sm:block">
                LEVIATHAN
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm transition-colors duration-300 ${
                  location.pathname === item.href
                    ? 'text-white'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/begin"
              className="inline-flex items-center gap-2 bg-[#d4af37] text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#f4d03f] transition-colors duration-300"
            >
              Begin
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 pb-6 pt-2 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-[#1a1a1a]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 text-base transition-colors ${
                  location.pathname === item.href
                    ? 'text-white'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/begin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-base text-[#d4af37]"
            >
              Begin
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={logo}
                  alt="Leviathan Systems"
                  className="h-10 w-auto"
                />
                <span className="text-sm font-semibold text-white tracking-wide">
                  LEVIATHAN
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                We build automation systems that answer, qualify, and book—so you don't lose revenue when you're busy.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Navigation</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/begin" className="hover:text-white transition-colors">
                    Begin
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-4">Contact</h4>
              <a
                href="mailto:hello@leviathansystems.com"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                hello@leviathansystems.com
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#1a1a1a] text-center text-sm text-gray-600">
            © {currentYear} Leviathan Systems
          </div>
        </div>
      </footer>
    </div>
  )
}
