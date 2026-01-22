# Requirements: Leviathan Live Demo Section

**Defined:** 2026-01-21
**Core Value:** Demonstrate that Leviathan captures leads instantly while owner stays in control

## v1.0 Requirements

Requirements for Live Demo Section. Each maps to roadmap phases.

### Vapi Integration

- [ ] **VAPI-01**: Vapi SDK loads in browser without blocking page render
- [ ] **VAPI-02**: User can start a demo call by clicking the call button
- [ ] **VAPI-03**: User can end an active call
- [ ] **VAPI-04**: System generates unique session ID for each call
- [ ] **VAPI-05**: Session ID is passed to Vapi assistant via metadata
- [ ] **VAPI-06**: Call status (active/ended) is tracked and displayed
- [ ] **VAPI-07**: Microphone permission errors are handled gracefully

### Live Monitor Terminal

- [ ] **TERM-01**: Terminal displays current status (Standby/Active Call/Captured)
- [ ] **TERM-02**: Terminal shows Issue field when captured
- [ ] **TERM-03**: Terminal shows Urgency field when captured
- [ ] **TERM-04**: Terminal shows Location field when captured
- [ ] **TERM-05**: Terminal shows Intent field when captured
- [ ] **TERM-06**: Terminal shows Final Summary after call ends
- [ ] **TERM-07**: Control statement displays after call: "NO ACTIONS EXECUTED — OWNER APPROVAL REQUIRED"

### Polling & Data Flow

- [ ] **POLL-01**: System polls n8n endpoint every 1 second during active call
- [ ] **POLL-02**: Polling starts when call begins
- [ ] **POLL-03**: Polling continues 30 seconds after call ends (to catch final summary)
- [ ] **POLL-04**: Polling stops cleanly without memory leaks
- [ ] **POLL-05**: Network errors are handled gracefully

### Animations

- [ ] **ANIM-01**: Scan line animation runs during active call
- [ ] **ANIM-02**: Status chip pulses during active call
- [ ] **ANIM-03**: Fields glow briefly when receiving new data
- [ ] **ANIM-04**: Final summary appears with typewriter effect
- [ ] **ANIM-05**: Event log (CAPTURE/CLASSIFY/QUEUE) fades in sequentially
- [ ] **ANIM-06**: Animations respect prefers-reduced-motion

### Section Layout

- [ ] **SECT-01**: Demo section renders after hero, before "How We Work"
- [ ] **SECT-02**: Section has headline "See It Work"
- [ ] **SECT-03**: Two-column layout on desktop (call button left, terminal right)
- [ ] **SECT-04**: Single-column stack on mobile
- [ ] **SECT-05**: Section matches existing design system (colors, spacing, borders)

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
| POLL-01 | Phase 1 | Pending |
| POLL-02 | Phase 1 | Pending |
| POLL-03 | Phase 1 | Pending |
| POLL-04 | Phase 1 | Pending |
| POLL-05 | Phase 1 | Pending |
| ANIM-06 | Phase 1 | Pending |
| TERM-01 | Phase 2 | Pending |
| TERM-02 | Phase 2 | Pending |
| TERM-03 | Phase 2 | Pending |
| TERM-04 | Phase 2 | Pending |
| TERM-05 | Phase 2 | Pending |
| TERM-06 | Phase 2 | Pending |
| TERM-07 | Phase 2 | Pending |
| ANIM-01 | Phase 2 | Pending |
| ANIM-02 | Phase 2 | Pending |
| ANIM-03 | Phase 2 | Pending |
| ANIM-04 | Phase 2 | Pending |
| ANIM-05 | Phase 2 | Pending |
| VAPI-01 | Phase 3 | Pending |
| VAPI-02 | Phase 3 | Pending |
| VAPI-03 | Phase 3 | Pending |
| VAPI-04 | Phase 3 | Pending |
| VAPI-05 | Phase 3 | Pending |
| VAPI-06 | Phase 3 | Pending |
| VAPI-07 | Phase 3 | Pending |
| SECT-01 | Phase 4 | Pending |
| SECT-02 | Phase 4 | Pending |
| SECT-03 | Phase 4 | Pending |
| SECT-04 | Phase 4 | Pending |
| SECT-05 | Phase 4 | Pending |

**Coverage:**
- v1.0 requirements: 26 total
- Mapped to phases: 26 ✓
- Unmapped: 0

---
*Requirements defined: 2026-01-21*
*Last updated: 2026-01-21 after initial definition*
