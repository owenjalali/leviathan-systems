# Phase 4: Interactive Demos - Context

**Gathered:** 2026-02-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a three-part cohesive demo showing one customer request from three perspectives: the customer experience (form + SMS), the system logic (node graph), and the owner's dashboard (activity feed + approval). Each part is a distinct section on the homepage. The demo is the centerpiece of the site — it shows what Leviathan builds, not just describes it.

</domain>

<decisions>
## Implementation Decisions

### Demo Narrative & Data
- Generic/abstract business scenario — no specific industry. Show "a customer request" flowing through a system without naming plumbing, consulting, etc.
- Part I: Customer fills a request form on a website, then gets an instant SMS confirmation/booking. Show both the web form and phone mockup side by side.
- Part III: Activity feed showing what the system just handled, with one-tap approve/override buttons. Emphasizes human-safe autonomy (not a metrics dashboard).
- Realistic but fictional data — real-sounding names ("Sarah M."), realistic messages ("Hi, I'd like to schedule a consultation"), plausible numbers. Makes it feel tangible.

### Animation & Scroll Behavior
- All three parts auto-play when they scroll into viewport. No scroll-scrub, no click-to-play.
- Three parts are distinct sections with clear separation (headers like "Part I: Customer Experience"). Not a continuous flow or tab interface.
- Animation timing: Claude's discretion — pick the right pacing per part individually.

### Visual Style & Layout
- Phone mockup (Part I SMS): Realistic device frame (iPhone-style outline) with SMS conversation inside.
- Node graph (Part II): Clean and minimal — simple rounded rectangles with labels, thin connection lines, subtle glow on active connections. Think Linear or Figma-style flow diagrams.
- Owner Dashboard (Part III): Window frame mockup (title bar, dots) containing the activity feed. Establishes this as "the app the owner uses."
- Background treatment: Claude's discretion — pick the right visual distinction for the demo zone.

### Mobile Experience
- Mobile animations auto-play on scroll-in, same as desktop. Consistent experience.
- Which parts to show on mobile and layout sizing: Claude's discretion — optimize for what renders well at small breakpoints.
- Responsive device targeting: Claude's discretion — standard responsive approach.

### Claude's Discretion
- Animation timing for each part (quick vs medium vs leisurely per section)
- Background treatment for demo sections
- Mobile: which parts to show, phone mockup sizing, node graph simplification
- Mobile: responsive breakpoint strategy
- How Part I form + phone arrange on different screen sizes

</decisions>

<specifics>
## Specific Ideas

- The demo exists in `src/content/demo-data.js` already — use it as the data source (form fields, SMS messages, node labels, dashboard data)
- The existing `DemoIntroSection.jsx` sets up the demo — all three parts follow it on the homepage
- The existing GSAP + @gsap/react setup is ready for viewport-triggered animations
- Part III dashboard should reinforce the "human-safe autonomy" pillar — the system handled everything, owner just approves
- Phone mockup should feel premium — this is a centerpiece visual, not a sketch

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-interactive-demos*
*Context gathered: 2026-02-11*
