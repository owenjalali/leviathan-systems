# Phase 4: Assembly - Context

**Gathered:** 2026-01-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire VapiCallButton, LiveMonitorTerminal, and useLiveMonitor hook into a cohesive demo section on the homepage. Section demonstrates real-time lead capture in action. Components are already built (Phases 1-3) — this phase integrates them into the user-facing demo experience.

</domain>

<decisions>
## Implementation Decisions

### Section placement
- Renders after hero section, before "How We Work" section on homepage
- Top-level section with equal visual weight to other homepage sections
- Matches existing section spacing and padding patterns

### Layout structure
- Two-column layout on desktop (call button left, terminal right)
- Single-column stack on mobile (button above terminal)
- Columns should feel balanced — neither dominates visually
- Standard responsive breakpoint (likely 768px or 1024px based on existing patterns)

### Headline treatment
- Section headline: "See It Work"
- Consistent with existing headline styling (size, weight, color)
- No additional explanatory copy above the demo — headline is sufficient

### State coordination
- VapiCallButton generates session ID on call start
- Session ID passed to LiveMonitorTerminal via props
- Terminal begins polling when sessionId prop is truthy
- Terminal continues polling 30 seconds after call ends
- Button and terminal operate independently but share session ID as the coordination point

### Visual integration
- Section background matches existing design system (black #0a0a0a or black-light #0d0d0d)
- Gold accent (#d4af37) used consistently with rest of site
- Terminal and button components already match design system (built in Phases 2-3)
- Section should feel cohesive with existing homepage sections

### Control statement
- Terminal displays control statement after call ends and data is captured
- Statement emphasizes "you stayed in control" messaging
- Positioning handled by LiveMonitorTerminal component (already built)

### Claude's Discretion
- Exact column width proportions (as long as balanced)
- Section top/bottom padding values (match existing patterns)
- Responsive breakpoint choice (standard Tailwind breakpoint)
- Whether to add subtle borders or dividers between columns

</decisions>

<specifics>
## Specific Ideas

- Section should feel like a natural continuation of the homepage, not a jarring insert
- Demo is the content — minimize surrounding explanation
- Two-column layout keeps button and terminal visible simultaneously on desktop (user sees cause and effect side-by-side)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-assembly*
*Context gathered: 2026-01-22*
