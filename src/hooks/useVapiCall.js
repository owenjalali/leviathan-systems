import { useState, useRef, useEffect, useCallback } from 'react'
import Vapi from '@vapi-ai/web'

/**
 * useVapiCall - Vapi SDK integration hook for voice calls
 *
 * Manages Vapi SDK lifecycle, call states, and event handling.
 * Generates unique session IDs for each call and passes to assistant.
 *
 * @param {string} publicKey - Vapi public API key
 * @returns {Object} Hook state and controls
 * @property {'idle'|'connecting'|'active'|'ending'} callStatus - Current call state
 * @property {number} volumeLevel - Current volume level (0-1) for audio visualization
 * @property {Error|null} error - Error object if call failed
 * @property {string|null} sessionId - Current session ID (persists after call ends)
 * @property {Function} startCall - Start a call (assistantId, metadata?) => void
 * @property {Function} stopCall - Stop active call () => void
 * @property {Function} clearError - Clear error state () => void
 */
export function useVapiCall(publicKey) {
  // State
  const [callStatus, setCallStatus] = useState('idle') // 'idle' | 'connecting' | 'active' | 'ending'
  const [volumeLevel, setVolumeLevel] = useState(0) // 0-1 float
  const [error, setError] = useState(null)

  // Refs for cleanup and stale closure prevention
  const vapiRef = useRef(null)
  const sessionIdRef = useRef(null)
  const mountedRef = useRef(true)

  /**
   * Initialize Vapi instance and set up event listeners
   */
  useEffect(() => {
    if (!publicKey) {
      console.warn('useVapiCall: No public key provided')
      return
    }

    // Create Vapi instance
    vapiRef.current = new Vapi(publicKey)
    const vapi = vapiRef.current

    // Call start event - call is now active
    vapi.on('call-start', () => {
      if (!mountedRef.current) return
      setCallStatus('active')
      setError(null) // Clear any previous error
    })

    // Call end event - call has ended
    vapi.on('call-end', () => {
      if (!mountedRef.current) return
      setCallStatus('idle')
      setVolumeLevel(0)
      // Preserve sessionId for polling continuation
    })

    // Volume level event - AI voice output level for visualization
    vapi.on('volume-level', (volume) => {
      if (!mountedRef.current) return
      // volume is 0-1 float
      setVolumeLevel(volume)
    })

    // Error event - something went wrong
    vapi.on('error', (err) => {
      if (!mountedRef.current) return
      setError(err)
      setCallStatus('idle')
      setVolumeLevel(0)
    })

    // Cleanup on unmount
    return () => {
      mountedRef.current = false
      if (vapi) {
        vapi.stop()
      }
    }
  }, [publicKey])

  /**
   * Start a call with the given assistant ID
   * @param {string} assistantId - Vapi assistant ID to call
   * @param {Object} metadata - Optional metadata to pass to assistant
   */
  const startCall = useCallback(async (assistantId, metadata = {}) => {
    if (!vapiRef.current) {
      console.error('useVapiCall: Vapi instance not initialized')
      return
    }

    // Generate unique session ID
    const sessionId = crypto.randomUUID()
    sessionIdRef.current = sessionId

    // Set connecting state
    setCallStatus('connecting')
    setError(null)
    setVolumeLevel(0)

    try {
      // Start the call, passing session ID to assistant
      await vapiRef.current.start(assistantId, {
        variableValues: {
          demo_session_id: sessionId,
          ...metadata
        }
      })
      // Note: call-start event will transition to 'active' state
    } catch (err) {
      if (!mountedRef.current) return
      setError(err)
      setCallStatus('idle')
      setVolumeLevel(0)
    }
  }, [])

  /**
   * Stop the active call
   */
  const stopCall = useCallback(() => {
    if (!vapiRef.current) return

    setCallStatus('ending')
    vapiRef.current.stop()
    // Note: call-end event will transition to 'idle' state
  }, [])

  /**
   * Clear error state (for retry functionality)
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    callStatus,
    volumeLevel,
    error,
    sessionId: sessionIdRef.current,
    startCall,
    stopCall,
    clearError
  }
}
