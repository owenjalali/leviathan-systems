import { useState, useEffect, useRef } from 'react'

function AnimatedNumber({ value, duration = 2000, suffix = '', prefix = '' }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  // Parse the numeric part from the value
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0
  const isDecimal = value.includes('.')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateValue()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateValue = () => {
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      const current = numericValue * easeOutQuart
      setDisplayValue(isDecimal ? current.toFixed(1) : Math.floor(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(isDecimal ? numericValue.toFixed(1) : numericValue)
      }
    }
    animate()
  }

  // Format the display based on the original value format
  const formatDisplay = () => {
    if (value === '24/7') return hasAnimated ? '24/7' : '0/0'
    if (value === '< 1s') return hasAnimated ? '< 1s' : '< 0s'
    if (value.includes('%')) return `${displayValue}%`
    if (value.includes('x')) return `${displayValue}x`
    return `${prefix}${displayValue}${suffix}`
  }

  return (
    <span ref={ref} className="tabular-nums">
      {formatDisplay()}
    </span>
  )
}

const stats = [
  { value: '24/7', label: 'Availability', icon: '🕐' },
  { value: '99.9%', label: 'Uptime', icon: '📈' },
  { value: '10x', label: 'Efficiency Gain', icon: '⚡' },
  { value: '< 1s', label: 'Response Time', icon: '🚀' },
]

export default function AnimatedStats() {
  return (
    <section className="py-20 border-t border-[#1a1a1a] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative text-center p-6 rounded-2xl bg-[#1a1a1a]/50 border border-[#2d2d2d] hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated border glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/10 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="text-4xl sm:text-5xl font-bold text-[#d4af37] mb-2 tracking-tight">
                  <AnimatedNumber value={stat.value} duration={2000} />
                </div>
                <div className="text-sm text-gray-400 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>

                {/* Decorative line */}
                <div className="mt-4 mx-auto w-12 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent group-hover:w-20 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
