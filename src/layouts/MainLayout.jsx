import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import ScrollToTop from '../components/ScrollToTop'
import logo from '../assets/logo.png'

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
    <div className="min-h-screen bg-[#050509]">
      <ScrollToTop />

      {/* Navigation - Minimal per doctrine */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050509]/95 backdrop-blur-md border-b border-[#1a2332]'
          : 'bg-transparent'
      }`}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex-1">
            <Link to="/" className="group">
              <img
                src={logo}
                alt="Leviathan Systems"
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop navigation - Minimal */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm transition-colors duration-200 ${
                location.pathname === '/'
                  ? 'text-white'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00d4cf] hover:bg-[#00e5df] text-[#050509] text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#00d4cf]/25"
            >
              Get Your Audit
              <ArrowRight className="h-4 w-4" />
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
          <div className="px-6 pb-6 pt-2 bg-[#050509]/95 backdrop-blur-md border-t border-[#1a2332]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 text-base transition-colors ${
                location.pathname === '/'
                  ? 'text-white'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/audit"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-base text-[#00d4cf] font-medium"
            >
              Get Your Audit
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer - Minimal */}
      <footer className="bg-[#050509] border-t border-[#1a2332]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Leviathan Systems"
                className="h-8 w-auto opacity-60"
              />
              <p className="text-[#6b7280] text-sm">
                Revenue capture infrastructure.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/"
                className="text-[#6b7280] hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/audit"
                className="text-[#6b7280] hover:text-white transition-colors"
              >
                Audit
              </Link>
              <a
                href="mailto:hello@leviathansystems.com"
                className="text-[#6b7280] hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#1a2332] text-center text-xs text-[#4b5563]">
            © {currentYear} Leviathan Systems
          </div>
        </div>
      </footer>
    </div>
  )
}
