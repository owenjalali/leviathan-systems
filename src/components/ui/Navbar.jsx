import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { nav } from '../../content/home'
import logo from '../../assets/Fully New Improved Leviathan Systems Logo.png'

/**
 * Navbar — Floating nav with scroll-aware blur.
 * 3 items: Logo (left), About (link), CTA button (right).
 * Tubelight-inspired active indicator via GSAP.
 */
export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const navRef = useRef(null)
    const indicatorRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Tubelight active indicator
    useGSAP(() => {
        if (!indicatorRef.current || !navRef.current) return
        const activeLink = navRef.current.querySelector('[data-active="true"]')
        if (activeLink) {
            const navRect = navRef.current.getBoundingClientRect()
            const linkRect = activeLink.getBoundingClientRect()
            gsap.to(indicatorRef.current, {
                x: linkRect.left - navRect.left,
                width: linkRect.width,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            })
        } else {
            gsap.to(indicatorRef.current, { opacity: 0, duration: 0.2 })
        }
    }, { dependencies: [location.pathname], scope: navRef })

    const handleLogoClick = (e) => {
        e.preventDefault()
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate('/')
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
        }
    }

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)]'
                    : 'bg-transparent'
                }`}
        >
            <nav
                ref={navRef}
                className="relative mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4"
            >
                {/* Logo */}
                <a href="/" onClick={handleLogoClick} className="group cursor-pointer flex-shrink-0">
                    <img
                        src={logo}
                        alt="Leviathan Systems"
                        className="h-14 w-auto transition-transform duration-200 group-hover:scale-105"
                    />
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Active indicator (tubelight glow) */}
                    <div
                        ref={indicatorRef}
                        className="absolute bottom-0 h-[2px] rounded-full bg-[var(--accent)] opacity-0"
                        style={{ boxShadow: '0 0 8px var(--accent-glow), 0 0 20px var(--accent-glow)' }}
                    />

                    {nav.items.map((item) =>
                        item.isCta ? (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="bg-[var(--accent)] text-[var(--bg-primary)] rounded-[10px] px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <Link
                                key={item.to}
                                to={item.to}
                                data-active={location.pathname === item.to}
                                className={`text-sm transition-colors duration-200 ${location.pathname === item.to
                                        ? 'text-[var(--text-primary)]'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        )
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 pb-6 pt-2 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-t border-[var(--border)]">
                    {nav.items.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-3 text-base transition-colors ${item.isCta
                                    ? 'text-[var(--accent)] font-medium'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
}
