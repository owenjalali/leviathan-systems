import { useState, useRef, useEffect } from 'react'
import { AlertCircle, Gauge, MapPin, Target, FileText } from 'lucide-react'

/**
 * LiveMonitorTerminal - Visual display component for live demo data
 *
 * Shows real-time call data with animated feedback. Receives data from
 * useLiveMonitor hook via parent component.
 *
 * @param {Object} props
 * @param {Object|null} props.data - Data from useLiveMonitor
 * @param {boolean} props.isPolling - Whether polling is active
 * @param {string[]} props.changedFields - Fields that changed on last update
 * @param {'standby'|'active'|'processing'|'captured'} props.status - Terminal state
 */

// Status chip configuration
const statusConfig = {
  standby: {
    label: 'Standby',
    bgColor: 'bg-[#1a2332]',
    textColor: 'text-[#6b7280]',
    dotColor: 'bg-[#4b5563]',
    pulse: false
  },
  active: {
    label: 'Active Call',
    bgColor: 'bg-[#00d4cf]/10',
    textColor: 'text-[#00d4cf]',
    dotColor: 'bg-[#00d4cf]',
    pulse: true
  },
  processing: {
    label: 'Processing...',
    bgColor: 'bg-[#7c72ff]/10',
    textColor: 'text-[#7c72ff]',
    dotColor: 'bg-[#7c72ff]',
    pulse: true
  },
  captured: {
    label: 'Captured',
    bgColor: 'bg-[#00d4cf]/10',
    textColor: 'text-[#00d4cf]',
    dotColor: 'bg-[#00d4cf]',
    pulse: false
  }
}

// Field configuration for display
const fieldConfig = [
  { key: 'issue', label: 'Issue', icon: AlertCircle },
  { key: 'urgency', label: 'Urgency', icon: Gauge },
  { key: 'location_city', label: 'Location', icon: MapPin },
  { key: 'intent', label: 'Intent', icon: Target },
]

// Event log configuration
const events = [
  { id: 'capture', label: 'CAPTURE', description: 'Lead information extracted' },
  { id: 'classify', label: 'CLASSIFY', description: 'Urgency and intent determined' },
  { id: 'queue', label: 'QUEUE', description: 'Ready for owner review' },
]

/**
 * Custom hook for typewriter effect
 * @param {string|null} text - Text to animate
 * @param {number} speed - Milliseconds per character
 */
function useTypewriter(text, speed = 30) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!text) {
      setDisplayedText('')
      setIsComplete(false)
      return
    }

    let index = 0
    setDisplayedText('')
    setIsComplete(false)

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return { displayedText, isComplete }
}

/**
 * StatusChip - Displays current terminal state
 */
function StatusChip({ status }) {
  const config = statusConfig[status] || statusConfig.standby
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.pulse ? 'animate-status-chip-pulse' : ''}`}>
      <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      <span className={`text-xs font-medium ${config.textColor}`}>
        {config.label}
      </span>
    </div>
  )
}

/**
 * FieldCard - Displays a single captured field
 */
function FieldCard({ icon: Icon, label, value, isGlowing }) {
  return (
    <div className={`
      p-3 rounded-lg border border-[#1a2332] bg-[#0d1320]
      ${isGlowing ? 'animate-field-glow' : ''}
    `}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5 flex-shrink-0 text-[#00d4cf]" />
        <span className="text-xs text-[#6b7280] uppercase tracking-wide">
          {label}
        </span>
      </div>
      {value ? (
        <p className="text-sm text-white font-mono break-words">
          {value}
        </p>
      ) : (
        <div className="h-4 w-3/4 bg-[#1a2332] rounded animate-pulse" />
      )}
    </div>
  )
}

export default function LiveMonitorTerminal({ data, isPolling, changedFields = [], status = 'standby' }) {
  // Track visible events for staggered animation
  const [visibleEvents, setVisibleEvents] = useState([])

  // Track if summary has been shown (to avoid re-animating)
  const summaryShownRef = useRef(false)

  // Typewriter for summary
  const shouldTypewriteSummary = data?.data?.final_summary && !summaryShownRef.current
  const { displayedText: summaryText, isComplete: summaryComplete } = useTypewriter(
    shouldTypewriteSummary ? data?.data?.final_summary : (summaryShownRef.current ? data?.data?.final_summary : null),
    30
  )

  // Mark summary as shown when typewriter completes
  useEffect(() => {
    if (summaryComplete && data?.data?.final_summary) {
      summaryShownRef.current = true
    }
  }, [summaryComplete, data?.data?.final_summary])

  // Reset summary tracking when data clears
  useEffect(() => {
    if (!data?.data?.final_summary) {
      summaryShownRef.current = false
    }
  }, [data?.data?.final_summary])

  // Typewriter for control statement (appears after summary and events)
  const showControl = status === 'captured' && summaryComplete && visibleEvents.length === events.length
  const { displayedText: controlText, isComplete: controlComplete } = useTypewriter(
    showControl ? "You decide what happens next." : null,
    40
  )

  // Show events when status becomes 'captured'
  useEffect(() => {
    if (status === 'captured' && visibleEvents.length === 0) {
      events.forEach((event, index) => {
        setTimeout(() => {
          setVisibleEvents(prev => {
            if (!prev.includes(event.id)) {
              return [...prev, event.id]
            }
            return prev
          })
        }, index * 400)
      })
    }

    // Reset when going back to standby
    if (status === 'standby') {
      setVisibleEvents([])
    }
  }, [status, visibleEvents.length])

  // Determine if we should show field grid or standby idle state
  const showFieldGrid = status !== 'standby' || data?.data

  return (
    <div className={`
      relative rounded-xl sm:rounded-2xl border bg-[#0a0f1a] overflow-hidden
      shadow-[0_4px_30px_rgba(0,0,0,0.5)]
      ${status === 'active'
        ? 'border-[#00d4cf]/30 shadow-[0_0_30px_rgba(0,212,207,0.15)]'
        : 'border-[#1a2332]'}
    `}>
      {/* Scan line - only during active state */}
      {status === 'active' && (
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4cf]/60 to-transparent animate-scan-line pointer-events-none z-10"
          style={{ top: 0 }}
        />
      )}

      {/* Header bar */}
      <div className="px-4 py-3 border-b border-[#1a2332] flex items-center justify-between">
        <span className="text-xs font-medium text-[#6b7280] tracking-wider uppercase">
          Live Monitor
        </span>
        <StatusChip status={status} />
      </div>

      {/* Content area */}
      <div className="p-4 sm:p-6 font-mono text-sm min-h-[300px] sm:min-h-[350px]">

        {/* Standby idle state */}
        {status === 'standby' && !data?.data && (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            {/* Subtle animated circles */}
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border border-[#1a2332] animate-pulse" />
              <div className="absolute inset-2 rounded-full border border-[#1a2332]/50" />
              <div className="absolute inset-4 rounded-full bg-[#1a2332]/30" />
            </div>

            <p className="text-sm text-[#6b7280] mb-1">
              System Ready
            </p>
            <p className="text-xs text-[#4b5563]">
              Start a demo call to see live capture
            </p>
          </div>
        )}

        {/* Field cards grid */}
        {showFieldGrid && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {fieldConfig.map(({ key, label, icon }) => (
              <FieldCard
                key={`${key}-${changedFields.includes(key) ? Date.now() : 'stable'}`}
                icon={icon}
                label={label}
                value={data?.data?.[key]}
                isGlowing={changedFields.includes(key)}
              />
            ))}
          </div>
        )}

        {/* Summary section - appears after call ends */}
        {data?.data?.final_summary && (
          <div className="mt-4 p-4 rounded-lg border border-[#1a2332] bg-[#0d1320]">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-3.5 h-3.5 flex-shrink-0 text-[#00d4cf]" />
              <span className="text-xs text-[#6b7280] uppercase tracking-wide">
                Summary
              </span>
            </div>
            <p className="text-sm text-white font-mono leading-relaxed break-words">
              {summaryShownRef.current ? data?.data?.final_summary : summaryText}
              {!summaryShownRef.current && !summaryComplete && (
                <span className="inline-block w-2 h-4 bg-[#00d4cf] ml-0.5 animate-cursor-blink" />
              )}
            </p>
          </div>
        )}

        {/* Event log - appears when captured */}
        {status === 'captured' && (
          <div className="mt-4 pt-4 border-t border-[#1a2332]">
            <div className="space-y-2">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`
                    flex items-center gap-3
                    ${visibleEvents.includes(event.id) ? 'animate-event-fade-in' : 'opacity-0'}
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#00d4cf]" />
                  <span className="text-xs font-mono text-[#00d4cf] font-medium">
                    {event.label}
                  </span>
                  <span className="text-xs text-[#6b7280]">
                    {event.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Control statement - appears when captured, after events */}
        {status === 'captured' && summaryComplete && visibleEvents.length === events.length && (
          <div className="mt-6 relative">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4cf]/5 via-[#00d4cf]/10 to-[#00d4cf]/5 rounded-lg blur-xl" />

            {/* Statement */}
            <div className="relative p-4 rounded-lg border border-[#00d4cf]/20 bg-[#0a0f1a]/80 text-center">
              <p className="text-sm font-medium text-white">
                {controlText}
                {!controlComplete && controlText && (
                  <span className="inline-block w-2 h-4 bg-[#00d4cf] ml-0.5 animate-cursor-blink" />
                )}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
