import { useState, useEffect, useRef } from 'react'
import { Phone, PhoneOff, Loader2, Mic } from 'lucide-react'
import { useVapiCall } from '../hooks/useVapiCall'

// Vapi credentials from PROJECT.md
const VAPI_PUBLIC_KEY = '935fb085-0c34-4f20-82cf-76cff78f3934'
const VAPI_ASSISTANT_ID = '955decb7-0492-40c9-b788-0b0e16f73a0a'

/**
 * AudioBars - Equalizer-style audio visualization
 * Shows AI voice activity with reactive bars
 */
function AudioBars({ volumeLevel, isActive }) {
  // Bar height multipliers for varied appearance
  const bars = [0.6, 1.0, 0.8, 0.9, 0.5]

  return (
    <div className="flex items-center gap-0.5 h-4">
      {bars.map((multiplier, i) => {
        // When call is active but AI not speaking, show minimum height
        // When AI speaking, scale based on volume level
        const height = isActive
          ? Math.max(0.2, volumeLevel * multiplier) // min 20% when active
          : 0.1 // nearly flat when inactive

        return (
          <div
            key={i}
            className={`w-1 bg-[var(--color-accent)] rounded-full transition-transform duration-100 ${
              isActive && volumeLevel < 0.1 ? 'animate-bar-idle' : ''
            }`}
            style={{
              transform: `scaleY(${height})`,
              transformOrigin: 'center',
              height: '16px'
            }}
          />
        )
      })}
    </div>
  )
}

/**
 * useElapsedTime - Hook for call duration timer
 */
function useElapsedTime(isActive) {
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(null)

  useEffect(() => {
    if (isActive) {
      startRef.current = Date.now()
      const interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setElapsed(0)
      startRef.current = null
    }
  }, [isActive])

  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

/**
 * ErrorDisplay - Shows error with retry button and auto-dismiss
 */
function ErrorDisplay({ error, onRetry, onDismiss }) {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(onDismiss, 7000) // 7 second auto-dismiss
      return () => clearTimeout(timer)
    }
  }, [error, onDismiss])

  if (!error) return null

  return (
    <div className="mt-3 flex items-center gap-2 text-sm text-[var(--color-danger)]">
      <button
        onClick={onRetry}
        className="px-3 py-1 bg-[var(--color-danger)]/10 rounded hover:bg-[var(--color-danger)]/20 transition-colors"
      >
        Retry
      </button>
      <span className="text-[var(--color-text-muted)]">Call failed</span>
    </div>
  )
}

/**
 * VapiCallButton - Interactive voice call button with full state management
 *
 * Provides one-click demo calling experience with visual feedback:
 * - Idle: Solid accent button with "Start Demo Call"
 * - Connecting: Spinner + "Connecting..." (disabled)
 * - Active: Red stop button with audio bars and timer
 * - Ending: "Ending..." (disabled)
 * - Error: Shows retry button, auto-dismisses after 7s
 *
 * @param {Function} onCallStart - Called when call starts (receives sessionId)
 * @param {Function} onCallEnd - Called when call ends
 * @param {string} className - Optional additional CSS classes
 */
export function VapiCallButton({ onCallStart, onCallEnd, className = '' }) {
  const { callStatus, volumeLevel, isSpeaking, error, sessionId, startCall, stopCall, clearError } =
    useVapiCall(VAPI_PUBLIC_KEY)

  const elapsedTime = useElapsedTime(callStatus === 'active')
  const [showError, setShowError] = useState(false)

  // Track previous call status to fire callbacks on transitions
  const prevStatusRef = useRef(callStatus)

  useEffect(() => {
    const prevStatus = prevStatusRef.current
    prevStatusRef.current = callStatus

    // Call started
    if (prevStatus !== 'active' && callStatus === 'active') {
      onCallStart?.(sessionId)
    }

    // Call ended
    if (prevStatus === 'active' && callStatus === 'idle') {
      onCallEnd?.()
    }
  }, [callStatus, sessionId, onCallStart, onCallEnd])

  // Show error when error state changes
  useEffect(() => {
    if (error) {
      setShowError(true)
    }
  }, [error])

  const handleStartCall = () => {
    startCall(VAPI_ASSISTANT_ID)
  }

  const handleStopCall = () => {
    stopCall()
  }

  const handleRetry = () => {
    clearError()
    setShowError(false)
    startCall(VAPI_ASSISTANT_ID)
  }

  const handleDismissError = () => {
    setShowError(false)
    clearError()
  }

  // Button disabled during connecting/ending states
  const isDisabled = callStatus === 'connecting' || callStatus === 'ending'

  return (
    <div className={className}>
      {callStatus === 'idle' && (
        <button
          onClick={handleStartCall}
          disabled={isDisabled}
          className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold rounded-lg
                     hover:bg-[var(--color-accent-hover)] transition-all duration-200
                     flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Phone className="w-5 h-5" />
          <span>Start Demo Call</span>
        </button>
      )}

      {callStatus === 'connecting' && (
        <button
          disabled
          className="px-6 py-3 bg-[var(--color-accent)]/20 text-[var(--color-text-primary)] font-semibold rounded-lg
                     flex items-center gap-2 cursor-not-allowed animate-pulse-glow"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Connecting...</span>
        </button>
      )}

      {callStatus === 'active' && (
        <div className="flex flex-col items-center lg:items-start gap-3">
          <button
            onClick={handleStopCall}
            className="px-6 py-3 bg-[var(--color-danger)] text-white font-semibold rounded-lg
                       hover:bg-[var(--color-danger)]/90 transition-all duration-200
                       flex items-center gap-3"
          >
            <PhoneOff className="w-5 h-5" />
            <span>End Call</span>
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/20">
              <AudioBars volumeLevel={volumeLevel} isActive={true} />
              <span className="text-sm font-mono">{elapsedTime}</span>
            </div>
          </button>

          {/* Talk indicator - shows speaking states */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'bg-green-500/20 text-green-400 shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                : volumeLevel < 0.1
                  ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)]'
                  : 'bg-white/5 text-[var(--color-text-muted)]'
            }`}
          >
            <Mic className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-medium">
              {isSpeaking ? 'Listening...' : volumeLevel < 0.1 ? 'Your turn to speak' : 'AI speaking...'}
            </span>
          </div>
        </div>
      )}

      {callStatus === 'ending' && (
        <button
          disabled
          className="px-6 py-3 bg-[var(--color-danger)]/20 text-[var(--color-text-primary)] font-semibold rounded-lg
                     flex items-center gap-2 cursor-not-allowed"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Ending...</span>
        </button>
      )}

      {/* Error display - shows alongside button, not replacing it */}
      <ErrorDisplay
        error={showError ? error : null}
        onRetry={handleRetry}
        onDismiss={handleDismissError}
      />
    </div>
  )
}
