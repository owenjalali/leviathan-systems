---
phase: 03-vapi-integration
plan: 01
subsystem: ui
tags: [vapi, voice-ai, react, hooks, audio-visualization, webrtc]

# Dependency graph
requires:
  - phase: 02-terminal-ui
    provides: LiveMonitorTerminal component and useLiveMonitor pattern
provides:
  - useVapiCall hook for Vapi SDK integration
  - VapiCallButton component with full call state management
  - Audio visualization with reactive equalizer bars
  - Call lifecycle management (idle/connecting/active/ending)
affects: [04-section-assembly]

# Tech tracking
tech-stack:
  added: [@vapi-ai/web@2.5.2]
  patterns:
    - Event-driven SDK integration with useRef persistence
    - Volume-level driven CSS transforms for audio visualization
    - Inline timer hooks for real-time elapsed time
    - Auto-dismissing error displays with retry

key-files:
  created:
    - src/hooks/useVapiCall.js
    - src/components/VapiCallButton.jsx
  modified:
    - src/index.css
    - package.json

key-decisions:
  - "Use crypto.randomUUID() for session ID generation (native, no dependency)"
  - "Audio bars with CSS transforms (scaleY) driven by volumeLevel (0-1)"
  - "Inline error display with 7-second auto-dismiss and retry button"
  - "Preserve sessionId after call ends for polling continuation"
  - "Minimum 20% bar height when call active but AI not speaking"

patterns-established:
  - "Vapi SDK in useRef, not useState (prevents multiple instances)"
  - "mountedRef pattern for safe state updates after unmount"
  - "useCallback for startCall/stopCall to prevent stale closures"
  - "Inline timer hooks when simple and single-use"
  - "Audio visualization with varied bar multipliers for natural appearance"

# Metrics
duration: 15min
completed: 2026-01-22
---

# Phase 3 Plan 01: Vapi Integration Summary

**Voice call button with Vapi SDK integration, real-time audio bars, call states (idle/connecting/active/ending), and 7-second auto-dismiss error handling**

## Performance

- **Duration:** 15 min
- **Started:** 2026-01-22T21:25:00Z
- **Completed:** 2026-01-22T21:40:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Vapi Web SDK (@vapi-ai/web v2.5.2) integrated with custom React hook
- VapiCallButton component with 4 distinct call states and smooth transitions
- Real-time audio visualization with 5 equalizer bars scaling based on AI voice output
- Elapsed call timer showing duration in M:SS format
- Error handling with auto-dismissing retry button
- Session ID generation and passing to Vapi assistant for n8n polling

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Vapi SDK and create useVapiCall hook** - `357e2ee` (feat)
2. **Task 2: Create VapiCallButton component with audio bars and all states** - `8b83dd3` (feat)

## Files Created/Modified
- `src/hooks/useVapiCall.js` - Vapi SDK integration hook with event-driven state management
- `src/components/VapiCallButton.jsx` - Interactive call button with audio visualization
- `src/index.css` - Added bar-idle keyframe animation for audio bars
- `package.json` - Added @vapi-ai/web@2.5.2 dependency

## Decisions Made

**1. crypto.randomUUID() for session ID generation**
- Rationale: Native browser API, RFC-compliant, cryptographically secure, no npm dependency needed

**2. CSS transforms with inline styles for audio bars**
- Rationale: Simpler than Canvas/Web Audio API for 5 bars, performant, easy to maintain

**3. 7-second auto-dismiss for errors**
- Rationale: Per CONTEXT.md (Claude's discretion), balances visibility with not blocking UI permanently

**4. Preserve sessionId after call ends**
- Rationale: Allows useLiveMonitor to continue polling after call disconnects (per Phase 1 design)

**5. Minimum 20% bar height during active call**
- Rationale: Prevents bars from appearing "dead" during AI pauses, shows call is active even when not speaking

**6. Inline error display, not modal**
- Rationale: Per CONTEXT.md (Claude's discretion), keeps friction low, user can still interact with page

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - implementation followed research patterns from 03-RESEARCH.md. Vapi SDK integration worked as documented.

## User Setup Required

None - Vapi credentials hardcoded in component per PROJECT.md (public key and assistant ID). No environment variables needed for Phase 3.

## Next Phase Readiness

**Ready for Phase 4 (Section Assembly):**
- VapiCallButton can be imported and used in Home.jsx
- onCallStart callback provides sessionId for useLiveMonitor
- onCallEnd callback can trigger cleanup/reset
- All call states have proper visual feedback

**Integration pattern for Phase 4:**
```jsx
<VapiCallButton
  onCallStart={(sessionId) => startPolling(sessionId)}
  onCallEnd={() => stopPolling()}
/>
```

**No blockers.** Component is self-contained and ready for integration.

---
*Phase: 03-vapi-integration*
*Completed: 2026-01-22*
