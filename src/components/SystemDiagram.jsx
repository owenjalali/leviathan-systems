import { useState, useEffect } from 'react'
import { Phone, Zap, CheckCircle, Calendar, Database } from 'lucide-react'

export default function SystemDiagram() {
  const [activeNode, setActiveNode] = useState(0)
  const [pulseKey, setPulseKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => {
        const next = (prev + 1) % 5
        if (next === 0) setPulseKey(k => k + 1)
        return next
      })
    }, 2000)
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
      {/* Ambient glow behind the diagram */}
      <div className="absolute inset-0 -inset-x-20 -inset-y-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#00d4cf]/5 rounded-full blur-[80px]" />
      </div>

      {/* The flow container */}
      <div className="relative bg-[#0a0f1a]/80 border border-[#1a2332] rounded-2xl p-8 sm:p-12 backdrop-blur-sm">

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                             linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Connection line - base */}
        <div className="absolute top-1/2 left-16 right-16 sm:left-24 sm:right-24 h-px bg-[#1a2332] -translate-y-1/2 hidden sm:block" />

        {/* Connection line - progress glow */}
        <div
          className="absolute top-1/2 left-16 sm:left-24 h-px -translate-y-1/2 hidden sm:block transition-all duration-[1800ms] ease-out"
          style={{
            width: `calc(${(activeNode / 4) * 100}% - ${activeNode === 4 ? '0px' : '48px'})`,
            background: 'linear-gradient(90deg, #00d4cf 0%, #00d4cf 80%, transparent 100%)',
            boxShadow: '0 0 20px rgba(0, 212, 207, 0.5), 0 0 40px rgba(0, 212, 207, 0.2)'
          }}
        />

        {/* Data packet animation */}
        <div
          key={pulseKey}
          className="absolute top-1/2 left-16 sm:left-24 w-3 h-3 -translate-y-1/2 hidden sm:block"
          style={{
            animation: 'dataFlow 10s linear infinite'
          }}
        >
          <div className="w-3 h-3 rounded-full bg-[#00d4cf] shadow-[0_0_12px_rgba(0,212,207,0.8),0_0_24px_rgba(0,212,207,0.4)]" />
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
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: `${i * 50}ms`
                }}
              >
                {/* Glow ring for current */}
                {isCurrent && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-16 sm:h-16 rounded-full bg-[#00d4cf]/20 blur-xl animate-pulse" />
                )}

                {/* Node circle */}
                <div
                  className={`
                    relative w-16 h-16 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center
                    transition-all duration-500 ease-out
                    ${isCurrent
                      ? 'bg-[#00d4cf]/10 border-[#00d4cf] shadow-[0_0_30px_rgba(0,212,207,0.3)]'
                      : isActive
                        ? 'bg-[#0d1320] border-[#00d4cf]/40'
                        : 'bg-[#0d1320] border-[#1a2332]'
                    }
                  `}
                >
                  <Icon
                    className={`
                      w-6 h-6 sm:w-5 sm:h-5 transition-all duration-500
                      ${isCurrent
                        ? 'text-[#00d4cf]'
                        : isActive
                          ? 'text-[#00d4cf]/70'
                          : 'text-[#2a3441]'
                      }
                    `}
                  />

                  {/* Inner pulse for current */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#00d4cf] animate-ping opacity-20" />
                  )}
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
                      text-xs mt-1 transition-colors duration-500
                      ${isCurrent ? 'text-[#00d4cf]' : isActive ? 'text-[#6b7280]' : 'text-[#2a3441]'}
                    `}
                  >
                    {node.sub}
                  </p>
                </div>

                {/* Connector dots between nodes - hidden on mobile */}
                {i < 4 && (
                  <div className="hidden sm:flex absolute top-7 -right-4 gap-1">
                    {[0, 1, 2].map((dot) => (
                      <div
                        key={dot}
                        className={`
                          w-1 h-1 rounded-full transition-all duration-500
                          ${i < activeNode ? 'bg-[#00d4cf]/60' : 'bg-[#1a2332]'}
                        `}
                        style={{
                          transitionDelay: `${dot * 100}ms`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Status bar */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00d4cf] shadow-[0_0_8px_rgba(0,212,207,0.6)] animate-pulse" />
            <span className="text-xs text-[#4b5563] font-mono tracking-wider uppercase">
              System Active
            </span>
          </div>
          <div className="w-px h-4 bg-[#1a2332]" />
          <span className="text-xs text-[#2a3441] font-mono">
            24/7 Coverage
          </span>
        </div>
      </div>

      {/* CSS for data flow animation */}
      <style>{`
        @keyframes dataFlow {
          0% { left: 6%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: calc(100% - 6%); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
