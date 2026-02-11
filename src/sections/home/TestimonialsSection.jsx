import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { testimonials } from '../../content/demo-data'
import { testimonialsSection } from '../../content/home'

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('right')
  const [isPaused, setIsPaused] = useState(false)

  const activeReview = testimonials[currentIndex]

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setDirection('right')
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  const handleNext = () => {
    setDirection('right')
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setDirection('left')
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const textVariants = {
    enter: (dir) => ({
      x: dir === 'right' ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir === 'right' ? -40 : 40,
      opacity: 0,
    }),
  }

  return (
    <section className="bg-[var(--bg-primary)]">
      <div
        className="relative mx-auto max-w-[1200px] px-6 py-[120px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-16 text-center">
          {testimonialsSection.headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Counter + nav dots */}
          <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-4">
            <span className="text-sm text-[var(--text-muted)] font-mono tabular-nums">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(testimonials.length).padStart(2, '0')}
            </span>
            <div className="flex md:flex-col gap-2 mt-0 md:mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 'right' : 'left')
                    setCurrentIndex(i)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-8 bg-[var(--accent)]'
                      : 'w-4 bg-[var(--border-hover)] hover:bg-[var(--text-muted)]'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Quote content */}
          <div className="md:col-span-8 relative min-h-[200px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <Quote
                  size={32}
                  className="text-[var(--accent)] opacity-30 mb-6"
                />
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium leading-snug text-[var(--text-primary)] mb-8">
                  &ldquo;{activeReview.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="text-base font-semibold text-[var(--text-primary)]">
                    {activeReview.name}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {activeReview.role}, {activeReview.business}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <div className="md:col-span-2 flex items-center md:justify-end gap-2">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--accent)] text-[var(--bg-primary)] hover:brightness-110 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
