import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pillars } from '../../content/home'

// Custom SVG icons — purpose-built for each pillar
function RevenueCaptureIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 10L12 14L20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 10L4 16L12 20L20 16L20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

function OperationalControlIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6.5" cy="6.5" r="1.5" fill="currentColor" opacity="0.6" />
      <path d="M16 6.5H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 17.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17.5" cy="17.5" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

function HumanSafeIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
      <path d="M9.5 14.5C9.5 13.1 10.6 12 12 12C13.4 12 14.5 13.1 14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const pillarIcons = {
  'revenue-capture': RevenueCaptureIcon,
  'operational-control': OperationalControlIcon,
  'human-safe-autonomy': HumanSafeIcon,
}

// Premium SVG illustrations — seamless background blending (no borders)
function RevenueIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Subtle grid dots */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={30 + col * 32}
            cy={25 + row * 35}
            r="1"
            fill="var(--text-muted)"
            opacity="0.1"
          />
        ))
      )}

      {/* Incoming signal paths — three streams converging */}
      <path d="M30 80 C60 80 80 100 120 120 C160 140 180 160 200 170" stroke="var(--accent)" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      <path d="M30 150 C80 150 130 155 160 160 C190 165 195 168 200 170" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <path d="M30 220 C70 215 100 200 140 190 C170 182 190 175 200 170" stroke="var(--accent)" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />

      {/* Signal pulses on paths */}
      <circle cx="70" cy="85" r="3" fill="var(--accent)" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="110" cy="152" r="3" fill="var(--accent)" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="90" cy="210" r="3" fill="var(--accent)" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* Central processing node */}
      <rect x="190" y="140" width="60" height="60" rx="8" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
      <rect x="198" y="148" width="44" height="44" rx="4" fill="var(--accent)" opacity="0.06" />

      {/* Processing indicator */}
      <circle cx="220" cy="170" r="8" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="220" cy="170" r="3" fill="var(--accent)" opacity="0.8">
        <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Output paths — organized streams */}
      <path d="M250 155 C280 150 310 135 340 130" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <path d="M250 170 C280 170 310 170 340 170" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M250 185 C280 190 310 205 340 210" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />

      {/* Captured data cards */}
      <rect x="340" y="118" width="36" height="24" rx="4" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
      <rect x="346" y="124" width="12" height="3" rx="1" fill="var(--accent)" opacity="0.4" />
      <rect x="346" y="130" width="20" height="3" rx="1" fill="var(--accent)" opacity="0.2" />

      <rect x="340" y="158" width="36" height="24" rx="4" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.6" />
      <rect x="346" y="164" width="16" height="3" rx="1" fill="var(--accent)" opacity="0.4" />
      <rect x="346" y="170" width="22" height="3" rx="1" fill="var(--accent)" opacity="0.2" />

      <rect x="340" y="198" width="36" height="24" rx="4" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
      <rect x="346" y="204" width="10" height="3" rx="1" fill="var(--accent)" opacity="0.4" />
      <rect x="346" y="210" width="18" height="3" rx="1" fill="var(--accent)" opacity="0.2" />

      {/* Status bar at bottom */}
      <rect x="30" y="262" width="340" height="1" fill="var(--accent)" opacity="0.08" />
      <circle cx="44" cy="278" r="4" fill="var(--accent)" opacity="0.6" />
      <rect x="56" y="275" width="48" height="6" rx="3" fill="var(--accent)" opacity="0.1" />
      <rect x="56" y="275" width="36" height="6" rx="3" fill="var(--accent)" opacity="0.3" />
    </svg>
  )
}

function ControlIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Top row — two metric panels */}
      <rect x="24" y="24" width="168" height="90" rx="8" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
      <rect x="208" y="24" width="168" height="90" rx="8" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />

      {/* Left panel — Response Time */}
      <rect x="36" y="38" width="40" height="5" rx="2" fill="var(--text-muted)" opacity="0.3" />
      <rect x="36" y="56" width="60" height="14" rx="2" fill="var(--accent)" opacity="0.6" />
      {/* Mini sparkline */}
      <polyline
        points="36,92 52,88 68,90 84,82 100,84 116,78 132,80 148,74 164,70 176,72"
        stroke="var(--accent)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right panel — Conversion */}
      <rect x="220" y="38" width="52" height="5" rx="2" fill="var(--text-muted)" opacity="0.3" />
      <rect x="220" y="56" width="44" height="14" rx="2" fill="var(--accent)" opacity="0.6" />
      {/* Ring chart */}
      <circle cx="340" cy="70" r="22" fill="none" stroke="var(--accent)" strokeWidth="4" opacity="0.1" />
      <circle cx="340" cy="70" r="22" fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="46 92" strokeLinecap="round" opacity="0.5" />

      {/* Bottom panel — Activity feed */}
      <rect x="24" y="130" width="352" height="146" rx="8" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />

      {/* Activity rows */}
      {[0, 1, 2, 3].map((i) => {
        const y = 150 + i * 30
        const widths = [100, 140, 80, 120]
        const opacities = [0.6, 0.5, 0.4, 0.5]
        return (
          <g key={i}>
            <circle cx="44" cy={y} r="4" fill="var(--accent)" opacity={opacities[i]} />
            <rect x="58" y={y - 4} width={widths[i]} height="8" rx="2" fill="var(--accent)" opacity="0.08" />
            <rect x="320" y={y - 3} width="36" height="6" rx="2" fill="var(--text-muted)" opacity="0.15" />
          </g>
        )
      })}

      {/* Live indicator */}
      <circle cx="350" cy="142" r="3" fill="var(--accent)">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

function AutonomyIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Outer automation ring */}
      <circle cx="200" cy="150" r="100" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="6 4" opacity="0.15" />
      <circle cx="200" cy="150" r="75" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.08" />

      {/* Automation nodes — cardinal positions */}
      {/* Top — TRIGGER */}
      <rect x="175" y="36" width="50" height="28" rx="6" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
      <rect x="183" y="46" width="34" height="4" rx="2" fill="var(--accent)" opacity="0.3" />
      <line x1="200" y1="64" x2="200" y2="90" stroke="var(--accent)" strokeWidth="1" opacity="0.2" />

      {/* Right — QUALIFY */}
      <rect x="290" y="136" width="50" height="28" rx="6" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
      <rect x="298" y="146" width="34" height="4" rx="2" fill="var(--accent)" opacity="0.3" />
      <line x1="290" y1="150" x2="260" y2="150" stroke="var(--accent)" strokeWidth="1" opacity="0.2" />

      {/* Bottom — ROUTE */}
      <rect x="175" y="236" width="50" height="28" rx="6" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
      <rect x="183" y="246" width="34" height="4" rx="2" fill="var(--accent)" opacity="0.3" />
      <line x1="200" y1="236" x2="200" y2="210" stroke="var(--accent)" strokeWidth="1" opacity="0.2" />

      {/* Left — EXECUTE */}
      <rect x="60" y="136" width="50" height="28" rx="6" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="0.75" opacity="0.5" />
      <rect x="68" y="146" width="34" height="4" rx="2" fill="var(--accent)" opacity="0.3" />
      <line x1="110" y1="150" x2="140" y2="150" stroke="var(--accent)" strokeWidth="1" opacity="0.2" />

      {/* Flow arrows on the ring */}
      <circle cx="248" cy="88" r="2.5" fill="var(--accent)" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="260" cy="200" r="2.5" fill="var(--accent)" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" begin="0.75s" />
      </circle>
      <circle cx="140" cy="210" r="2.5" fill="var(--accent)" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" begin="1.5s" />
      </circle>
      <circle cx="148" cy="96" r="2.5" fill="var(--accent)" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" begin="2.25s" />
      </circle>

      {/* Central HUMAN node — prominent, protected */}
      <circle cx="200" cy="150" r="36" fill="var(--accent)" opacity="0.04" />
      <circle cx="200" cy="150" r="36" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.35" />
      <circle cx="200" cy="150" r="28" fill="none" stroke="var(--accent)" strokeWidth="0.75" opacity="0.15" />

      {/* Human figure — minimalist */}
      <circle cx="200" cy="140" r="6" fill="var(--accent)" opacity="0.5" />
      <path d="M190 158 C190 152 195 148 200 148 C205 148 210 152 210 158" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />

      {/* Override indicator */}
      <circle cx="200" cy="170" r="2" fill="var(--accent)" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

const illustrations = {
  'revenue-capture': RevenueIllustration,
  'operational-control': ControlIllustration,
  'human-safe-autonomy': AutonomyIllustration,
}

export default function PillarsSection() {
  const [currentPillar, setCurrentPillar] = useState(0)
  const [progress, setProgress] = useState(0)
  const autoPlayInterval = 5000

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentPillar((prev) => (prev + 1) % pillars.length)
        setProgress(0)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [progress])

  const Illustration = illustrations[pillars[currentPillar].id]

  return (
    <section className="bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-[1200px] px-6 py-[120px]">
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-16 text-center">
          Three Pillars of Infrastructure
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-10">
          {/* Steps list */}
          <div className="order-2 md:order-1 space-y-6">
            {pillars.map((pillar, index) => {
              const StepIcon = pillarIcons[pillar.id]
              return (
                <motion.button
                  key={pillar.id}
                  className="flex items-start gap-6 w-full text-left"
                  onClick={() => {
                    setCurrentPillar(index)
                    setProgress(0)
                  }}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: index === currentPillar ? 1 : 0.4 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                      index === currentPillar
                        ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--bg-primary)]'
                        : 'bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-muted)]'
                    }`}
                  >
                    {index < currentPillar ? (
                      <span className="text-sm font-bold">&#10003;</span>
                    ) : (
                      <StepIcon size={18} />
                    )}
                  </motion.div>

                  <div className="flex-1 pt-1">
                    <h3 className="text-lg md:text-xl font-semibold text-[var(--text-primary)] mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                      {pillar.description}
                    </p>
                    {pillar.tags.length > 0 && index === currentPillar && (
                      <motion.div
                        className="flex flex-wrap gap-2 mt-3"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {pillar.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-[var(--border)] bg-[var(--glass)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Illustration — seamless, no border wrapper */}
          <div className="order-1 md:order-2 relative h-[250px] md:h-[400px] overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar}
                className="absolute inset-0 rounded-xl overflow-hidden"
                initial={{ y: 60, opacity: 0, rotateX: -10 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -60, opacity: 0, rotateX: 10 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Illustration />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
