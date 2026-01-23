# Requirements: Leviathan Live Demo Section

**Defined:** 2026-01-21
**Core Value:** Demonstrate that Leviathan captures leads instantly while owner stays in control

## v1.0 Requirements

Requirements for Live Demo Section. Each maps to roadmap phases.

### Vapi Integration

- [x] **VAPI-01**: Vapi SDK loads in browser without blocking page render
- [x] **VAPI-02**: User can start a demo call by clicking the call button
- [x] **VAPI-03**: User can end an active call
- [x] **VAPI-04**: System generates unique session ID for each call
- [x] **VAPI-05**: Session ID is passed to Vapi assistant via metadata
- [x] **VAPI-06**: Call status (active/ended) is tracked and displayed
- [x] **VAPI-07**: Microphone permission errors are handled gracefully

### Live Monitor Terminal

- [x] **TERM-01**: Terminal displays current status (Standby/Active Call/Captured)
- [x] **TERM-02**: Terminal shows Issue field when captured
- [x] **TERM-03**: Terminal shows Urgency field when captured
- [x] **TERM-04**: Terminal shows Location field when captured
- [x] **TERM-05**: Terminal shows Intent field when captured
- [x] **TERM-06**: Terminal shows Final Summary after call ends
- [x] **TERM-07**: Control statement displays after call: "NO ACTIONS EXECUTED — OWNER APPROVAL REQUIRED"

### Polling & Data Flow

- [x] **POLL-01**: System polls n8n endpoint every 1 second during active call
- [x] **POLL-02**: Polling starts when call begins
- [x] **POLL-03**: Polling continues 30 seconds after call ends (to catch final summary)
- [x] **POLL-04**: Polling stops cleanly without memory leaks
- [x] **POLL-05**: Network errors are handled gracefully

### Animations

- [x] **ANIM-01**: Scan line animation runs during active call
- [x] **ANIM-02**: Status chip pulses during active call
- [x] **ANIM-03**: Fields glow briefly when receiving new data
- [x] **ANIM-04**: Final summary appears with typewriter effect
- [x] **ANIM-05**: Event log (CAPTURE/CLASSIFY/QUEUE) fades in sequentially
- [x] **ANIM-06**: Animations respect prefers-reduced-motion

### Section Layout

- [x] **SECT-01**: Demo section renders after hero, before "How We Work"
- [x] **SECT-02**: Section has headline "See It Work"
- [x] **SECT-03**: Two-column layout on desktop (call button left, terminal right)
- [x] **SECT-04**: Single-column stack on mobile
- [x] **SECT-05**: Section matches existing design system (colors, spacing, borders)

## Future Requirements

Deferred to later milestones.

### Enhanced Features

- **FUTURE-01**: Show real-time transcript during call
- **FUTURE-02**: Multiple demo scenarios (not just plumbing)
- **FUTURE-03**: Mobile-optimized Vapi integration
- **FUTURE-04**: Persist demo history for returning visitors

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Mock/simulation mode | User wants real integration only |
| Charts or ROI metrics | Keep demo grounded, no fake numbers |
| "Booked" or "Scheduled" messaging | Never imply actions were taken |
| Sound effects | Potentially annoying, unexpected |
| Auto-play call | User must explicitly click to start |
| Transcript display | Focus on captured data, not full conversation |

## Traceability

Which phases cover which requirements.

| Requirement | Phase | Status |
|-------------|-------|--------|
| POLL-01 | Phase 1 | Complete |
| POLL-02 | Phase 1 | Complete |
| POLL-03 | Phase 1 | Complete |
| POLL-04 | Phase 1 | Complete |
| POLL-05 | Phase 1 | Complete |
| ANIM-06 | Phase 1 | Complete |
| TERM-01 | Phase 2 | Complete |
| TERM-02 | Phase 2 | Complete |
| TERM-03 | Phase 2 | Complete |
| TERM-04 | Phase 2 | Complete |
| TERM-05 | Phase 2 | Complete |
| TERM-06 | Phase 2 | Complete |
| TERM-07 | Phase 2 | Complete |
| ANIM-01 | Phase 2 | Complete |
| ANIM-02 | Phase 2 | Complete |
| ANIM-03 | Phase 2 | Complete |
| ANIM-04 | Phase 2 | Complete |
| ANIM-05 | Phase 2 | Complete |
| VAPI-01 | Phase 3 | Complete |
| VAPI-02 | Phase 3 | Complete |
| VAPI-03 | Phase 3 | Complete |
| VAPI-04 | Phase 3 | Complete |
| VAPI-05 | Phase 3 | Complete |
| VAPI-06 | Phase 3 | Complete |
| VAPI-07 | Phase 3 | Complete |
| SECT-01 | Phase 4 | Complete |
| SECT-02 | Phase 4 | Complete |
| SECT-03 | Phase 4 | Complete |
| SECT-04 | Phase 4 | Complete |
| SECT-05 | Phase 4 | Complete |

**Coverage:**
- v1.0 requirements: 26 total
- Mapped to phases: 26 ✓
- Unmapped: 0

---
*Requirements defined: 2026-01-21*
*Last updated: 2026-01-22 — All v1.0 requirements complete*
