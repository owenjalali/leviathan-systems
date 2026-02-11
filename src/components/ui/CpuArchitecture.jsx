import { useEffect, useRef } from 'react'

/**
 * CpuArchitecture — Animated SVG circuit diagram.
 * Pulses energy through paths on mount.
 */
export default function CpuArchitecture({ className = '' }) {
  const svgRef = useRef(null)

  useEffect(() => {
    // Animate the glowing dots along paths after mount
    const svg = svgRef.current
    if (!svg) return

    const dots = svg.querySelectorAll('.energy-dot')
    dots.forEach((dot, i) => {
      dot.style.animationDelay = `${i * 0.6}s`
    })
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Ambient glow behind — larger for prominence */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-[var(--accent)] opacity-[0.06] blur-[80px]" />
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central processor */}
        <rect
          x="150" y="150" width="100" height="100" rx="8"
          stroke="var(--accent)" strokeWidth="1.5" opacity="0.6"
        />
        <rect
          x="165" y="165" width="70" height="70" rx="4"
          stroke="var(--accent)" strokeWidth="1" opacity="0.3"
          fill="var(--accent-glow)"
        />

        {/* Center label */}
        <text x="200" y="205" textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="Inter, sans-serif" opacity="0.8">
          CORE
        </text>

        {/* Top paths */}
        <path d="M180 150 V100 H140 V60" className="circuit-path" />
        <path d="M200 150 V80" className="circuit-path" />
        <path d="M220 150 V100 H260 V60" className="circuit-path" />

        {/* Bottom paths */}
        <path d="M180 250 V300 H140 V340" className="circuit-path" />
        <path d="M200 250 V320" className="circuit-path" />
        <path d="M220 250 V300 H260 V340" className="circuit-path" />

        {/* Left paths */}
        <path d="M150 180 H100 V140 H60" className="circuit-path" />
        <path d="M150 200 H80" className="circuit-path" />
        <path d="M150 220 H100 V260 H60" className="circuit-path" />

        {/* Right paths */}
        <path d="M250 180 H300 V140 H340" className="circuit-path" />
        <path d="M250 200 H320" className="circuit-path" />
        <path d="M250 220 H300 V260 H340" className="circuit-path" />

        {/* Terminal nodes — top */}
        <circle cx="140" cy="60" r="4" className="terminal-node" />
        <circle cx="200" cy="80" r="4" className="terminal-node" />
        <circle cx="260" cy="60" r="4" className="terminal-node" />

        {/* Terminal nodes — bottom */}
        <circle cx="140" cy="340" r="4" className="terminal-node" />
        <circle cx="200" cy="320" r="4" className="terminal-node" />
        <circle cx="260" cy="340" r="4" className="terminal-node" />

        {/* Terminal nodes — left */}
        <circle cx="60" cy="140" r="4" className="terminal-node" />
        <circle cx="80" cy="200" r="4" className="terminal-node" />
        <circle cx="60" cy="260" r="4" className="terminal-node" />

        {/* Terminal nodes — right */}
        <circle cx="340" cy="140" r="4" className="terminal-node" />
        <circle cx="320" cy="200" r="4" className="terminal-node" />
        <circle cx="340" cy="260" r="4" className="terminal-node" />

        {/* Energy dots — animated along paths */}
        <circle r="3" className="energy-dot energy-dot-1" fill="var(--accent)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M200 150 V80" />
        </circle>
        <circle r="3" className="energy-dot energy-dot-2" fill="var(--accent)">
          <animateMotion dur="3.5s" repeatCount="indefinite" path="M250 200 H320" />
        </circle>
        <circle r="3" className="energy-dot energy-dot-3" fill="var(--accent)">
          <animateMotion dur="4s" repeatCount="indefinite" path="M200 250 V320" />
        </circle>
        <circle r="3" className="energy-dot energy-dot-4" fill="var(--accent)">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M150 200 H80" />
        </circle>
        <circle r="2.5" className="energy-dot energy-dot-5" fill="var(--accent)">
          <animateMotion dur="3.8s" repeatCount="indefinite" path="M180 150 V100 H140 V60" />
        </circle>
        <circle r="2.5" className="energy-dot energy-dot-6" fill="var(--accent)">
          <animateMotion dur="4.2s" repeatCount="indefinite" path="M250 220 H300 V260 H340" />
        </circle>
      </svg>
    </div>
  )
}
