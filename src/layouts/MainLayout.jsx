import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import ScrollToTop from '../components/ScrollToTop'
import logo from '../assets/Leviathan Systems.png'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
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
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2d2d2d] shadow-lg'
          : 'bg-transparent'
      }`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex flex-col items-center group">
              <img
                src={logo}
                alt="Leviathan Systems"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                style={{ mixBlendMode: 'lighten' }}
              />
              <span className="text-xs font-bold text-white mt-1 tracking-wider">
                LEVIATHAN <span className="text-[#d4af37]">SYSTEMS</span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 hover:text-[#d4af37] transition-colors"
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
                    ? 'text-[#d4af37]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#d4af37] transition-all duration-300 ${
                  location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/book"
              className="rounded-full bg-[#d4af37] px-6 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#f4d03f] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Book a Call
            </Link>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-1 px-6 pb-6 bg-[#0a0a0a]/95 backdrop-blur-md">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 text-base font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-[#d4af37]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 block rounded-full bg-[#d4af37] px-6 py-2.5 text-center text-sm font-semibold text-black"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#2d2d2d]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="animate-fade-in-up">
              <div className="flex flex-col items-start mb-4">
                <img
                  src={logo}
                  alt="Leviathan Systems"
                  className="h-14 w-auto"
                  style={{ mixBlendMode: 'lighten' }}
                />
                <span className="text-sm font-bold text-white mt-2 tracking-wider">
                  LEVIATHAN <span className="text-[#d4af37]">SYSTEMS</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Autonomous AI agents for small businesses. Automate your operations and scale effortlessly.
              </p>
            </div>
            <div className="animate-fade-in-up delay-100">
              <h4 className="text-sm font-semibold mb-6 text-[#d4af37]">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="h-px w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-4" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fade-in-up delay-200">
              <h4 className="text-sm font-semibold mb-6 text-[#d4af37]">Contact</h4>
              <p className="text-sm text-gray-400 mb-4">
                Ready to automate your business?
              </p>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#f4d03f] transition-colors text-sm font-medium group"
              >
                Schedule a consultation
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#2d2d2d] text-center text-sm text-gray-500">
            © {currentYear} Leviathan Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
