import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import ScrollToTop from '../components/ScrollToTop'
import logo from '../assets/Fully New Improved Leviathan Systems Logo.png'

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <div className="min-h-screen bg-[#030306]">
      <ScrollToTop />

      {/* Navigation - Minimal per doctrine */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030306]/80 backdrop-blur-xl border-b border-[#1a2332]/50'
          : 'bg-transparent'
      }`}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex-1">
            <a href="/" onClick={handleLogoClick} className="group cursor-pointer">
              <img
                src={logo}
                alt="Leviathan Systems"
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/about"
              className="text-sm text-[#9ca3af] hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/audit"
              className="text-sm text-[#9ca3af] hover:text-white transition-colors duration-200"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#9ca3af] hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 pb-6 pt-2 bg-[#030306]/95 backdrop-blur-xl border-t border-[#1a2332]/50">
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-base text-[#9ca3af] hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/audit"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-base text-[#9ca3af] hover:text-white transition-colors"
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

      {/* Footer - Minimal */}
      <footer className="bg-[#030306] border-t border-[#1a2332]/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Leviathan Systems"
                className="h-14 w-auto opacity-60"
              />
            </div>
            <p className="text-xs text-[#4b5563]">
              © {currentYear} Leviathan Systems
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
