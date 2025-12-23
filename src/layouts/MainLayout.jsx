import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import ScrollToTop from '../components/ScrollToTop'
import logo from '../assets/logo.png'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Infrastructure', href: '/infrastructure' },
]

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const currentYear = new Date().getFullYear()

  // Add scroll effect for navbar
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
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#1a1a1a]'
          : 'bg-transparent'
      }`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex flex-col items-center group">
              <img
                src={logo}
                alt="Leviathan Systems"
                className="h-12 w-auto transition-all duration-500 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(212,175,55,0.2)]"
              />
              <span className="text-xs font-bold text-white mt-1.5 tracking-[0.15em]">
                LEVIATHAN <span className="text-[#d4af37]">SYSTEMS</span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-gray-400 hover:text-white transition-colors duration-300"
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
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  location.pathname === item.href
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1.5 left-0 h-px bg-[#d4af37] transition-all duration-500 ${
                  location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/begin"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#d4af37] hover:text-[#f4d03f] transition-all duration-500"
            >
              <span className="hover-line">Begin</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-1 px-6 pb-8 pt-2 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#1a1a1a]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-4 text-base font-medium transition-colors duration-300 ${
                  location.pathname === item.href
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/begin"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 block py-4 text-base font-medium text-[#d4af37]"
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
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <div className="flex flex-col items-start mb-6">
                <img
                  src={logo}
                  alt="Leviathan Systems"
                  className="h-14 w-auto drop-shadow-[0_0_12px_rgba(212,175,55,0.2)]"
                />
                <span className="text-sm font-bold text-white mt-2 tracking-[0.15em]">
                  LEVIATHAN <span className="text-[#d4af37]">SYSTEMS</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Autonomous revenue infrastructure for operations where control matters.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-6 tracking-wide">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/begin"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Begin
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-6 tracking-wide">Contact</h4>
              <a
                href="mailto:hello@leviathansystems.com"
                className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
              >
                hello@leviathansystems.com
              </a>
            </div>
          </div>
          <div className="mt-16 pt-10 border-t border-[#1a1a1a] text-center text-sm text-gray-600">
            {currentYear} Leviathan Systems
          </div>
        </div>
      </footer>
    </div>
  )
}
