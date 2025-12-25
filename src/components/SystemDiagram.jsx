import { useState, useEffect } from 'react'
import { Phone, Zap, CheckCircle, Calendar, Database } from 'lucide-react'

export default function SystemDiagram() {
  const [activeNode, setActiveNode] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % 5)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  const nodes = [
    { id: 'inbound', label: 'Capture', sub: 'Every channel', icon: Phone },
    { id: 'respond', label: 'Respond', sub: '<60 seconds', icon: Zap },
    { id: 'qualify', label: 'Qualify', sub: 'Your criteria', icon: CheckCircle },
    { id: 'book', label: 'Book', sub: 'Auto-schedule', icon: Calendar },
    { id: 'sync', label: 'Sync', sub: 'CRM updated', icon: Database },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Outer glow */}
      <div className="absolute -inset-10 bg-gradient-to-r from-[#00d4cf]/5 via-transparent to-[#7c72ff]/5 rounded-[40px] blur-3xl opacity-60" />

      {/* Main container */}
      <div className="relative rounded-3xl border border-[#1a2332]/50 bg-[#0a0f1a]/40 backdrop-blur-2xl overflow-hidden">

        {/* Top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#00d4cf]/50 to-transparent" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative p-8 sm:p-12 lg:p-16">

          {/* Connection line container */}
          <div className="hidden sm:block absolute top-[calc(50%-20px)] left-20 right-20 lg:left-28 lg:right-28 h-0.5">
            {/* Base line */}
            <div className="absolute inset-0 bg-[#1a2332]/50 rounded-full" />

            {/* Animated progress line */}
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-[2000ms] ease-out"
              style={{
                width: `${(activeNode / 4) * 100}%`,
                background: 'linear-gradient(90deg, #00d4cf 0%, #00d4cf 90%, transparent 100%)',
                boxShadow: '0 0 20px rgba(0,212,207,0.6), 0 0 40px rgba(0,212,207,0.3)'
              }}
            />

            {/* Traveling particle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-[2000ms] ease-out"
              style={{
                left: `calc(${(activeNode / 4) * 100}% - 8px)`,
              }}
            >
              <div className="w-4 h-4 rounded-full bg-[#00d4cf] shadow-[0_0_15px_rgba(0,212,207,0.9),0_0_30px_rgba(0,212,207,0.5)]" />
              <div className="absolute inset-0 rounded-full bg-white/50 animate-ping" />
            </div>
          </div>

          {/* Nodes */}
          <div className="relative grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4">
            {nodes.map((node, i) => {
              const isActive = i <= activeNode
              const isCurrent = i === activeNode
              const Icon = node.icon

              return (
                <div
                  key={node.id}
                  className="flex flex-col items-center relative"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease-out ${i * 0.1}s`
                  }}
                >
                  {/* Glow behind current node */}
                  <div
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#00d4cf]/20 blur-2xl transition-opacity duration-500 ${
                      isCurrent ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Node */}
                  <div
                    className={`
                      relative w-16 h-16 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center
                      transition-all duration-500 ease-out overflow-hidden
                      ${isCurrent
                        ? 'bg-gradient-to-br from-[#00d4cf]/20 to-[#00d4cf]/5 border-2 border-[#00d4cf] shadow-[0_0_40px_rgba(0,212,207,0.4),inset_0_0_20px_rgba(0,212,207,0.1)]'
                        : isActive
                          ? 'bg-[#0d1320] border-2 border-[#00d4cf]/30'
                          : 'bg-[#0d1320] border-2 border-[#1a2332]'
                      }
                    `}
                  >
                    {/* Inner shine */}
                    {isCurrent && (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    )}

                    <Icon
                      className={`
                        w-6 h-6 sm:w-5 sm:h-5 relative z-10 transition-all duration-500
                        ${isCurrent
                          ? 'text-[#00d4cf] drop-shadow-[0_0_10px_rgba(0,212,207,0.8)]'
                          : isActive
                            ? 'text-[#00d4cf]/60'
                            : 'text-[#2a3441]'
                        }
                      `}
                    />

                    {/* Ping on current */}
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-[#00d4cf]/50 animate-ping opacity-30" />
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-5 text-center">
                    <p
                      className={`text-sm font-medium transition-all duration-500 ${
                        isActive ? 'text-white' : 'text-[#4b5563]'
                      }`}
                    >
                      {node.label}
                    </p>
                    <p
                      className={`text-xs mt-1 transition-all duration-500 ${
                        isCurrent ? 'text-[#00d4cf]' : isActive ? 'text-[#6b7280]' : 'text-[#2a3441]'
                      }`}
                    >
                      {node.sub}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Status bar */}
          <div className="mt-12 flex items-center justify-center">
            <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-[#0d1320]/80 border border-[#1a2332]/50 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#00d4cf]" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#00d4cf] animate-ping opacity-75" />
                </div>
                <span className="text-xs text-[#9ca3af] font-medium tracking-wide">
                  System Active
                </span>
              </div>
              <div className="w-px h-4 bg-[#1a2332]" />
              <span className="text-xs text-[#4b5563]">
                24/7 Response
              </span>
            </div>
          </div>
        </div>

        {/* Bottom subtle glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#1a2332] to-transparent" />
      </div>
    </div>
  )
}
