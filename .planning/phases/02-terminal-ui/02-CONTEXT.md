# Phase 2: Terminal UI - Context

**Gathered:** 2026-01-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the live monitor terminal component that displays call status, captured fields (Issue, Urgency, Location, Intent), final summary, and control statement. The terminal shows real-time data during demo calls with animated feedback. Hook integration and section layout belong to other phases.

</domain>

<decisions>
## Implementation Decisions

### Terminal Visual Style
- Modern dark dashboard aesthetic (not retro CRT)
- Card with shadow — elevated look, distinct from background
- Cyan/teal accent color for active/highlight states
- Header bar with "LIVE MONITOR" title + status chip
- Monospace font for terminal content
- Noticeable scan line animation during active state (clear visual indicator)
- Subtle cyan glow on active elements (status chip, fields when updating)

### Field Display Layout
- Flowing cards — each field as a small card that appears as data arrives
- Icon + label format (small icon representing each field type alongside label)
- Skeleton loading placeholders before data arrives
- Glow briefly then show — field card glows cyan, then value appears

### State Transitions
- **Standby:** Decorative idle state with subtle animation/pattern indicating ready
- **Active:** Pulsing status chip + scan line + subtle border glow (all three effects)
- **Processing:** Brief "Processing..." indicator for 1-2 seconds after call ends
- **Captured:** Animations stop cleanly, status chip shows "Captured", data stays visible

### Control Statement
- Appears as overlay/banner on the captured terminal (bold and central)
- Wording: "You decide what happens next."
- Typewriter effect animation — types out character by character

### Claude's Discretion
- Terminal size/dimensions (size based on content and layout)
- Exact icon choices for each field type
- Specific animation timing and easing curves
- Decorative idle state pattern/animation details
- Skeleton loading implementation details

</decisions>

<specifics>
## Specific Ideas

- Status chip states: "Standby" → "Active Call" → "Processing..." → "Captured"
- The scan line should be engaging — users should clearly see something is happening
- Glow effects should be subtle/tasteful, not sci-fi overwhelming
- Control statement is the takeaway — it should feel like the punchline of the demo

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-terminal-ui*
*Context gathered: 2026-01-22*
