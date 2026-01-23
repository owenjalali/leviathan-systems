import { useState, useRef, useEffect } from 'react'

/**
 * useLiveMonitor - Polling hook for live demo data from n8n endpoint
 *
 * Polls the n8n webhook endpoint to fetch real-time demo session data.
 * Designed for the Live Demo Section to show call data as it's being extracted.
 *
 * @returns {Object} Hook state and controls
 * @property {Object|null} data - Current demo data from n8n
 * @property {boolean} isPolling - Whether polling is active
 * @property {string|null} error - Error message if fetch failed
 * @property {string[]} changedFields - Fields that changed on last update
 * @property {Function} startPolling - Start polling with session ID
 * @property {Function} stopPolling - Stop polling (preserves final data)
 */
export function useLiveMonitor() {
  // State
  const [data, setData] = useState(null)
  const [isPolling, setIsPolling] = useState(false)
  const [error, setError] = useState(null)
  const [changedFields, setChangedFields] = useState([])

  // Refs for cleanup and stale closure prevention
  const intervalRef = useRef(null)
  const mountedRef = useRef(true)
  const sessionIdRef = useRef(null)
  const prevDataRef = useRef(null)

  /**
   * Detect which fields changed between previous and current data
   * @param {Object|null} prev - Previous data object
   * @param {Object|null} current - Current data object
   * @returns {string[]} Array of field names that changed
   */
  const detectChangedFields = (prev, current) => {
    if (!prev || !current) return []
    if (!prev.data || !current.data) return []

    const fields = ['issue', 'urgency', 'location_city', 'intent', 'final_summary', 'status']
    const changed = []

    for (const field of fields) {
      const prevValue = prev.data[field]
      const currValue = current.data[field]

      // Consider a field changed if:
      // - It went from null/undefined to having a value
      // - Its value actually changed
      if (prevValue !== currValue) {
        changed.push(field)
      }
    }

    return changed
  }

  /**
   * Fetch data from n8n endpoint
   */
  const fetchData = async () => {
    const sessionId = sessionIdRef.current
    if (!sessionId) {
      console.warn('[useLiveMonitor] fetchData called without sessionId')
      return
    }

    const endpoint = `https://systems.leviathan-systems.com/webhook/demo/latest?demo_session_id=${sessionId}`
    console.log('[useLiveMonitor] Fetching from:', endpoint)

    try {
      const response = await fetch(endpoint)
      console.log('[useLiveMonitor] Response status:', response.status)

      // 404 means no data yet - this is expected, not an error
      if (response.status === 404) {
        console.log('[useLiveMonitor] 404 - Session not found yet, continuing to poll')
        // Session not found yet, keep polling silently
        return
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('[useLiveMonitor] Response data:', result)

      // Check if response indicates no data (success: false)
      if (result.success === false) {
        console.log('[useLiveMonitor] No data yet (success: false), continuing to poll')
        // No data yet, keep polling silently
        return
      }

      // Only update state if still mounted
      if (!mountedRef.current) return

      // Detect changed fields before updating
      const changed = detectChangedFields(prevDataRef.current, result)
      console.log('[useLiveMonitor] Changed fields detected:', changed)

      // Update refs and state
      prevDataRef.current = result
      setData(result)
      setChangedFields(changed)
      setError(null) // Clear any previous error on success
      console.log('[useLiveMonitor] Data state updated')

    } catch (err) {
      console.error('[useLiveMonitor] Fetch error:', err)
      // Only update state if still mounted
      if (!mountedRef.current) return

      // Set error but do NOT stop polling (transient failures should retry)
      setError(err.message || 'Failed to fetch demo data')
      // Don't clear data - keep showing last known state
    }
  }

  /**
   * Start polling for a given session ID
   * @param {string} sessionId - The demo session ID to poll for
   */
  const startPolling = (sessionId) => {
    if (!sessionId) {
      console.warn('[useLiveMonitor] Cannot start polling without sessionId')
      return
    }

    console.log('[useLiveMonitor] startPolling called with sessionId:', sessionId)

    // Store session ID in ref to avoid stale closures
    sessionIdRef.current = sessionId

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Reset state for new polling session
    setIsPolling(true)
    setError(null)
    setChangedFields([])
    prevDataRef.current = null

    // Fetch immediately, then poll every 1 second
    fetchData()
    intervalRef.current = setInterval(fetchData, 1000)
  }

  /**
   * Stop polling
   * Does NOT reset data - preserves final state for display
   */
  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPolling(false)
    // Intentionally NOT resetting data - keeps final state visible
  }

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  return {
    data,
    isPolling,
    error,
    changedFields,
    startPolling,
    stopPolling
  }
}
