# Phase 3: Vapi Integration - Context

**Gathered:** 2026-01-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a call button with full Vapi SDK integration. Users can start and end demo calls, system generates unique session IDs passed to Vapi, and call status is tracked. This is the user interaction layer for initiating calls — the terminal display (Phase 2) and section assembly (Phase 4) are separate.

</domain>

<decisions>
## Implementation Decisions

### Button states & appearance
- Solid accent button when idle (CTA style, matches design system)
- Button text like "Start Demo Call" for idle state
- Same button transforms to stop button during active call

### Active call animation
- Audio bars (equalizer-style) that react to Vapi's actual voice audio
- Bars should move based on when AI is speaking — more alive, shows activity
- Not a static pulse — responds to real audio output

### Call state transitions
- "Connecting..." state with both spinner and text after click
- "Ending..." state shown explicitly when user stops call before returning to idle
- Show elapsed call duration timer near button during active call

### Call lifecycle
- Call starts immediately on click — no confirmation dialog
- One-click to start, same button to stop
- Frictionless interaction

### Error handling
- Errors show minimal UI — just a retry button, no verbose explanation
- Errors auto-dismiss after 5-10 seconds
- User can retry anytime without clearing error state manually

### Claude's Discretion
- Mic permission denied messaging approach (inline, toast, or modal)
- Call drop handling (auto-retry once vs show error only)
- Exact audio bar styling and count
- Timer position and formatting

</decisions>

<specifics>
## Specific Ideas

- User mentioned wanting something like "Siri" for the voice animation feel — chose audio bars as the implementation, but the intent is a lively, responsive visual that shows the AI is "alive" during conversation
- Button should feel immediate and responsive — no friction to start a demo

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-vapi-integration*
*Context gathered: 2026-01-22*
