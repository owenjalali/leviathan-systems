import { useState, useEffect } from 'react'

// The visual proof. No words needed.
export default function SystemDiagram() {
  const [activeNode, setActiveNode] = useState(0)

  // Slow, intentional animation - system initializing
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % 5)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  const nodes = [
    { id: 'inbound', label: 'Inbound', sub: 'Any channel' },
    { id: 'respond', label: 'Response', sub: '<60s' },
    { id: 'qualify', label: 'Qualify', sub: 'Your criteria' },
    { id: 'book', label: 'Book', sub: 'Calendar sync' },
    { id: 'sync', label: 'Sync', sub: 'CRM updated' },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* The flow */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#1a2332] -translate-y-1/2" />

        {/* Progress indicator */}
        <div
          className="absolute top-1/2 left-0 h-px bg-[#00d4cf]/60 -translate-y-1/2 transition-all duration-[2000ms] ease-linear"
          style={{ width: `${(activeNode / 4) * 100}%` }}
        />

        {/* Nodes */}
        <div className="relative flex justify-between">
          {nodes.map((node, i) => {
            const isActive = i <= activeNode
            const isCurrent = i === activeNode

            return (
              <div
                key={node.id}
                className="flex flex-col items-center"
              >
                {/* Node circle */}
                <div
                  className={`
                    w-14 h-14 rounded-full border-2 flex items-center justify-center
                    transition-all duration-700 ease-out
                    ${isCurrent
                      ? 'bg-[#00d4cf]/10 border-[#00d4cf] scale-110'
                      : isActive
                        ? 'bg-[#0a0f1a] border-[#00d4cf]/50'
                        : 'bg-[#0a0f1a] border-[#1a2332]'
                    }
                  `}
                >
                  <div
                    className={`
                      w-2.5 h-2.5 rounded-full transition-all duration-500
                      ${isCurrent
                        ? 'bg-[#00d4cf] shadow-[0_0_12px_rgba(0,212,207,0.6)]'
                        : isActive
                          ? 'bg-[#00d4cf]/70'
                          : 'bg-[#2a3441]'
                      }
                    `}
                  />
                </div>

                {/* Label */}
                <div className="mt-4 text-center">
                  <p
                    className={`
                      text-sm font-medium transition-colors duration-500
                      ${isActive ? 'text-white' : 'text-[#4b5563]'}
                    `}
                  >
                    {node.label}
                  </p>
                  <p
                    className={`
                      text-xs mt-0.5 transition-colors duration-500
                      ${isActive ? 'text-[#6b7280]' : 'text-[#2a3441]'}
                    `}
                  >
                    {node.sub}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Status indicator - like a real system */}
      <div className="mt-12 flex items-center justify-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00d4cf] animate-pulse" />
        <span className="text-xs text-[#4b5563] font-mono tracking-wide">
          SYSTEM ACTIVE
        </span>
      </div>
    </div>
  )
}
