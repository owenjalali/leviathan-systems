import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { footer } from '../../content/home'

const MotionDiv = motion.div

const footerSections = [
  {
    label: 'Navigation',
    links: footer.links,
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
]

function AnimatedContainer({ className, delay = 0.1, children }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <MotionDiv
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </MotionDiv>
  )
}

export default function Footer() {
  return (
    <footer className="relative w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center rounded-t-3xl md:rounded-t-[2.5rem] border-t border-[var(--border)] bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.04),transparent)] px-6 py-12 lg:py-16">
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur bg-[var(--text-muted)]" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Leviathan
          </span>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            Infrastructure that eliminates redundancy.
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-8">
            {footer.copyright}
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          {footerSections.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  )
}
