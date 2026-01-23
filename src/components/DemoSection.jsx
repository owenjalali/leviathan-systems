import { useState } from 'react'
import { VapiCallButton } from './VapiCallButton'
import LiveMonitorTerminal from './LiveMonitorTerminal'
import { useLiveMonitor } from '../hooks/useLiveMonitor'

/**
 * DemoSection - Live demo section coordinating Vapi call and monitor terminal
 *
 * Coordinates state between VapiCallButton (call trigger) and LiveMonitorTerminal
 * (data display). Session ID flows from call start to polling hook.
 */
export function DemoSection() {
  // Session ID state - set on call start, NOT reset on call end
  const [sessionId, setSessionId] = useState(null)

  // Call status tracking for terminal status computation
  const [callStatus, setCallStatus] = useState('idle')

  // Live monitor hook for polling
  const { data, isPolling, changedFields, startPolling } = useLiveMonitor()

  /**
   * Compute terminal status based on call state and data
   * - active: Call is in progress
   * - processing: Call ended, polling but no data yet
   * - captured: Data with summary received
   * - standby: Default/idle state
   */
  const getTerminalStatus = () => {
    if (callStatus === 'active') return 'active'
    if (isPolling && !data?.data) return 'processing'
    if (data?.data?.final_summary) return 'captured'
    return 'standby'
  }

  /**
   * Handle call start - receives sessionId from VapiCallButton
   */
  const handleCallStart = (newSessionId) => {
    setSessionId(newSessionId)
    setCallStatus('active')
    startPolling(newSessionId)
  }

  /**
   * Handle call end - DO NOT reset sessionId (terminal needs it for polling)
   */
  const handleCallEnd = () => {
    setCallStatus('idle')
    // Intentionally NOT resetting sessionId - terminal continues polling
  }

  return (
    <section className="py-32 sm:py-40 relative overflow-hidden">
      {/* Top border separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Subtle background accent */}
      <div
        className="absolute w-[600px] h-[600px] top-[10%] -left-[100px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.05) 0%, transparent 60%)' }}
      />
      <div
        className="absolute w-[400px] h-[400px] top-[40%] -right-[50px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,114,255,0.04) 0%, transparent 60%)' }}
      />

      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section headline */}
        <h2 className="text-4xl sm:text-5xl font-semibold text-white text-center mb-12">
          See It Work
        </h2>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left column: Call button */}
          <div className="flex flex-col items-center lg:items-start justify-center lg:pt-8">
            <VapiCallButton
              onCallStart={handleCallStart}
              onCallEnd={handleCallEnd}
            />

            {/* Subtle instruction text */}
            <p className="mt-4 text-sm text-[#6b7280] text-center lg:text-left">
              Click to start a demo call and watch data capture in real-time.
            </p>
          </div>

          {/* Right column: Live monitor terminal */}
          <div>
            <LiveMonitorTerminal
              data={data}
              isPolling={isPolling}
              changedFields={changedFields}
              status={getTerminalStatus()}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DemoSection
