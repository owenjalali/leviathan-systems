# Roadmap: Leviathan Live Demo Section

**Milestone:** v1.0 Live Demo Section
**Created:** 2026-01-21
**Phases:** 4
**Requirements:** 26

## Phase Overview

| # | Phase | Goal | Requirements | Success Criteria | Status |
|---|-------|------|--------------|------------------|--------|
| 1 | Foundation | Polling hook and CSS animations | POLL-01-05, ANIM-06 | 6 | Complete |
| 2 | Terminal UI | Live monitor terminal component | TERM-01-07, ANIM-01-05 | 5 | Complete |
| 3 | Vapi Integration | Call button with SDK | VAPI-01-07 | 5 | Planned |
| 4 | Assembly | Wire together and integrate | SECT-01-05 | 5 | Pending |

---

## Phase 1: Foundation

**Goal:** Build the polling infrastructure and animation foundation
**Status:** Complete (2026-01-22)

**Plans:** 1 plan

Plans:
- [x] 01-01-PLAN.md - useLiveMonitor hook + CSS keyframes

**Requirements:**
- POLL-01: System polls n8n endpoint every 1 second during active call
- POLL-02: Polling starts when call begins
- POLL-03: Polling continues 30 seconds after call ends
- POLL-04: Polling stops cleanly without memory leaks
- POLL-05: Network errors are handled gracefully
- ANIM-06: Animations respect prefers-reduced-motion

**Deliverables:**
- `src/hooks/useLiveMonitor.js`
- CSS keyframes in `src/index.css`

**Success Criteria:**
1. Hook can start polling a given session ID
2. Hook stops polling cleanly on command
3. Hook detects and reports changed fields
4. No memory leaks when component unmounts
5. Keyframes render correctly in browser
6. Reduced motion media query disables animations

---

## Phase 2: Terminal UI

**Goal:** Build the live monitor terminal with all animations
**Status:** Complete (2026-01-22)

**Plans:** 1 plan

Plans:
- [x] 02-01-PLAN.md - LiveMonitorTerminal component

**Requirements:**
- TERM-01: Terminal displays current status (Standby/Active Call/Captured)
- TERM-02: Terminal shows Issue field when captured
- TERM-03: Terminal shows Urgency field when captured
- TERM-04: Terminal shows Location field when captured
- TERM-05: Terminal shows Intent field when captured
- TERM-06: Terminal shows Final Summary after call ends
- TERM-07: Control statement displays after call
- ANIM-01: Scan line animation runs during active call
- ANIM-02: Status chip pulses during active call
- ANIM-03: Fields glow briefly when receiving new data
- ANIM-04: Final summary appears with typewriter effect
- ANIM-05: Event log fades in sequentially

**Deliverables:**
- `src/components/LiveMonitorTerminal.jsx`

**Success Criteria:**
1. Terminal renders with mock data (test without real call)
2. Status transitions visually (Standby -> Active -> Captured)
3. Scan line animates during "active" state
4. Fields glow when props change
5. Typewriter effect works on summary text

---

## Phase 3: Vapi Integration

**Goal:** Build the call button with full Vapi SDK integration
**Status:** Planned (2026-01-22)

**Plans:** 1 plan

Plans:
- [ ] 03-01-PLAN.md - useVapiCall hook + VapiCallButton component

**Requirements:**
- VAPI-01: Vapi SDK loads in browser without blocking page render
- VAPI-02: User can start a demo call by clicking the call button
- VAPI-03: User can end an active call
- VAPI-04: System generates unique session ID for each call
- VAPI-05: Session ID is passed to Vapi assistant via metadata
- VAPI-06: Call status (active/ended) is tracked and displayed
- VAPI-07: Microphone permission errors are handled gracefully

**Deliverables:**
- `src/hooks/useVapiCall.js`
- `src/components/VapiCallButton.jsx`
- Install `@vapi-ai/web` package

**Success Criteria:**
1. Vapi SDK loads without console errors
2. Clicking button starts a real call
3. Call can be ended with stop button
4. Session ID is generated and passed
5. Permission denied shows user-friendly message

---

## Phase 4: Assembly

**Goal:** Wire components together and integrate into homepage

**Requirements:**
- SECT-01: Demo section renders after hero, before "How We Work"
- SECT-02: Section has headline "See It Work"
- SECT-03: Two-column layout on desktop
- SECT-04: Single-column stack on mobile
- SECT-05: Section matches existing design system

**Deliverables:**
- `src/components/LeviathanLiveDemoSection.jsx`
- Modified `src/pages/Home.jsx`

**Success Criteria:**
1. Section appears in correct position on homepage
2. Two columns render on desktop viewport
3. Single column stacks on mobile viewport
4. Starting a call triggers terminal to poll
5. End-to-end flow works: click -> call -> data appears -> call ends -> control statement shows

---

## Dependency Graph

```
Phase 1 (Foundation)
    |
Phase 2 (Terminal UI) <--+
    |                    |
Phase 3 (Vapi) ----------+
    |
Phase 4 (Assembly)
```

Phase 2 and 3 can be worked in parallel after Phase 1 completes.

---

## Risk Mitigation

| Risk | Mitigation | Phase |
|------|------------|-------|
| Memory leaks from polling | Cleanup in useEffect, mounted ref | 1 |
| Vapi SDK loading issues | Async script loading, error handling | 3 |
| Animation performance | CSS keyframes, not JS | 1, 2 |
| n8n endpoint not responding | Graceful error states, retry logic | 1 |

---
*Roadmap created: 2026-01-21*
