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

          {/* Desktop navigation - Minimal, confident */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/audit"
              className="text-sm text-[#9ca3af] hover:text-white transition-colors duration-200"
            >
              See how it works
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
          mobileMenuOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 pb-6 pt-2 bg-[#050509]/95 backdrop-blur-md border-t border-[#1a2332]">
            <Link
              to="/audit"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-base text-[#9ca3af] hover:text-white transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer - Minimal */}
      <footer className="bg-[#050509] border-t border-[#1a2332]/50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Leviathan Systems"
                className="h-8 w-auto opacity-40"
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
