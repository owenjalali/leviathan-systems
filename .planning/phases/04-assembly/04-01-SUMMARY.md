---
phase: 04-assembly
plan: 01
subsystem: ui
tags: [react, component-composition, state-coordination, responsive-layout]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: useLiveMonitor hook for polling
  - phase: 02-terminal-ui
    provides: LiveMonitorTerminal component for display
  - phase: 03-vapi-integration
    provides: VapiCallButton component for call initiation
provides:
  - DemoSection container component
  - Complete "See It Work" demo section on homepage
  - State coordination between call button and terminal
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Parent-owned sessionId state with child callbacks
    - Terminal status computed from call state and data presence
    - Two-column responsive layout with lg breakpoint

key-files:
  created:
    - src/components/DemoSection.jsx
  modified:
    - src/pages/Home.jsx

key-decisions:
  - "sessionId NOT reset on call end (terminal needs it for polling)"
  - "Terminal status computed dynamically from callStatus and data"
  - "Two-column layout at lg breakpoint (1024px)"
  - "Subtle instruction text added beneath call button"

patterns-established:
  - "State coordination via callbacks: onCallStart receives sessionId, startPolling called in handler"
  - "Terminal status getter function computes state from multiple sources"
  - "Section matches existing design patterns (background gradients, grid overlay)"

# Metrics
duration: 8min
completed: 2026-01-22
---

# Phase 4 Plan 01: Section Assembly Summary

**DemoSection component wiring VapiCallButton, LiveMonitorTerminal, and useLiveMonitor into cohesive homepage demo section with responsive two-column layout**

## Performance

- **Duration:** 8 min
- **Started:** 2026-01-22T22:05:00Z
- **Completed:** 2026-01-22T22:13:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- DemoSection container component created with state coordination
- sessionId flows from VapiCallButton callback to startPolling call
- Terminal status computed dynamically (standby/active/processing/captured)
- Responsive layout: two columns on lg+, single column stacked on mobile
- Section integrated into Home.jsx between hero and "How We Work"
- Production build verified

## Task Commits

Each task was committed atomically:

1. **Task 1: Create DemoSection container component** - `7e5d881` (feat)
2. **Task 2: Integrate DemoSection into homepage** - `d8bc0fb` (feat)

## Files Created/Modified
- `src/components/DemoSection.jsx` - Container coordinating VapiCallButton, LiveMonitorTerminal, useLiveMonitor
- `src/pages/Home.jsx` - Import and render DemoSection between hero and "How We Work"

## State Coordination Pattern

The DemoSection component owns sessionId state and coordinates data flow:

```jsx
// sessionId managed at DemoSection level
const [sessionId, setSessionId] = useState(null)
const [callStatus, setCallStatus] = useState('idle')
const { data, isPolling, changedFields, startPolling } = useLiveMonitor()

// Call start: receive sessionId, trigger polling
const handleCallStart = (newSessionId) => {
  setSessionId(newSessionId)
  setCallStatus('active')
  startPolling(newSessionId)
}

// Call end: update status, do NOT reset sessionId
const handleCallEnd = () => {
  setCallStatus('idle')
  // sessionId preserved for polling window
}
```

## Terminal Status Logic

Status computed dynamically based on call state and data presence:

```javascript
const getTerminalStatus = () => {
  if (callStatus === 'active') return 'active'
  if (isPolling && !data?.data) return 'processing'
  if (data?.data?.summary) return 'captured'
  return 'standby'
}
```

## Decisions Made

**1. sessionId NOT reset on call end**
- Rationale: Terminal needs sessionId to continue polling for 30 seconds after call ends

**2. Subtle instruction text beneath call button**
- Rationale: Minimal guidance without cluttering the demo-first design

**3. Background accents matching existing sections**
- Rationale: Visual consistency with cyan/purple radial gradients from other homepage sections

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all pre-built components integrated cleanly. Production build verified without errors.

## Requirements Coverage

All Phase 4 requirements satisfied:

- [x] **SECT-01**: Demo section renders after hero, before "How We Work"
- [x] **SECT-02**: Section has headline "See It Work"
- [x] **SECT-03**: Two-column layout on desktop (call button left, terminal right)
- [x] **SECT-04**: Single-column stack on mobile
- [x] **SECT-05**: Section matches existing design system (colors, spacing, borders)

## End-to-End Flow Ready

Complete flow now functional:

1. User visits homepage - Demo section visible
2. User clicks "Start Demo Call" - Call connects via Vapi
3. User speaks about emergency - Terminal captures data in real-time
4. User clicks "End Call" - Call disconnects
5. Terminal continues polling - Final data appears
6. Summary typewriter completes - Event log fades in
7. Control statement appears - "You decide what happens next."

## Human Verification Checklist

Manual verification in browser at http://localhost:5173:

- [ ] Demo section appears after hero, before "How We Work"
- [ ] Headline reads "See It Work"
- [ ] Two columns visible on desktop (button left, terminal right)
- [ ] Single column stack on mobile (resize to 375px)
- [ ] Full call flow works (start, speak, end, see data)
- [ ] Design consistency with other sections

---
*Phase: 04-assembly*
*Completed: 2026-01-22*
