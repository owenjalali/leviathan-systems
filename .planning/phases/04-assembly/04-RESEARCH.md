# Phase 4: Assembly - Research

**Researched:** 2026-01-22
**Domain:** React component integration, responsive layout design
**Confidence:** HIGH

## Summary

Phase 04 assembles pre-built components (VapiCallButton, LiveMonitorTerminal, useLiveMonitor hook from Phases 1-3) into a cohesive demo section on the homepage. This is a pure integration phase—no new features, just wiring existing pieces with parent state coordination.

The codebase uses React 19 with Vite, Tailwind CSS v4, and follows a mobile-first design approach. The homepage consists of discrete sections with consistent spacing patterns (`py-32 sm:py-40`), border separators, and background treatments using CSS variables. Existing sections use scroll-triggered animations via `useScrollAnimation` hook and `IntersectionObserver`.

The standard integration pattern is "lifting state up"—the demo section component will own the session ID state, pass it down to child components via props, and coordinate state transitions between VapiCallButton (call lifecycle) and LiveMonitorTerminal (data polling).

**Primary recommendation:** Create a single DemoSection component that owns session ID state, renders VapiCallButton and LiveMonitorTerminal in a responsive two-column grid (desktop) / single-column stack (mobile), and matches existing section styling patterns.

## Standard Stack

The codebase is already configured with all required dependencies. No new installations needed.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.0 | UI framework | Already in use, modern hooks-based architecture |
| React DOM | 19.2.0 | React renderer | Paired with React core |
| Tailwind CSS | 4.1.18 | Utility-first CSS | Project standard, v4 with @tailwindcss/vite plugin |
| Vite | 7.2.4 | Build tool | Fast dev server, project standard |
| Lucide React | 0.562.0 | Icon library | Consistent with existing component icons |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React Router DOM | 7.11.0 | Routing | Already configured for navigation |
| @vapi-ai/web | 2.5.2 | Voice AI SDK | Already integrated in Phase 3 |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Lifting state up | Context API | Context adds complexity for simple parent-child coordination. Lifting state is sufficient for single section. |
| CSS Grid | Flexbox | Both work. Grid is cleaner for equal-width columns. Codebase uses grid elsewhere (`grid lg:grid-cols-3`). |
| IntersectionObserver | Scroll event listener | IntersectionObserver is more performant, already used in codebase (`useScrollAnimation` hook). |

**Installation:**
```bash
# No new dependencies required
# All libraries already installed in package.json
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── pages/
│   └── Home.jsx              # Insert DemoSection after hero, before "How We Work"
├── components/
│   ├── DemoSection.jsx       # NEW: Container for demo (owns state)
│   ├── VapiCallButton.jsx    # EXISTS: Call button (Phase 3)
│   └── LiveMonitorTerminal.jsx # EXISTS: Terminal display (Phase 2)
└── hooks/
    ├── useLiveMonitor.js     # EXISTS: Polling hook (Phase 1)
    ├── useVapiCall.js        # EXISTS: Vapi SDK hook (Phase 3)
    └── useScrollAnimation.js # EXISTS: Scroll-triggered animation
```

### Pattern 1: Lifting State Up (Parent-Child Coordination)
**What:** Parent component owns shared state (session ID), passes down to children via props, receives callbacks for state changes.
**When to use:** Coordinating sibling components that need to share data (button generates session ID, terminal consumes it).
**Example:**
```jsx
// Source: React Official Docs - Sharing State Between Components
// https://react.dev/learn/sharing-state-between-components

function DemoSection() {
  const [sessionId, setSessionId] = useState(null)

  const handleCallStart = (newSessionId) => {
    setSessionId(newSessionId)
  }

  const handleCallEnd = () => {
    // Session ID persists for continued polling
    // Do NOT reset sessionId here
  }

  return (
    <div>
      <VapiCallButton onCallStart={handleCallStart} onCallEnd={handleCallEnd} />
      <LiveMonitorTerminal sessionId={sessionId} />
    </div>
  )
}
```

### Pattern 2: Responsive Two-Column Layout with Tailwind Grid
**What:** Mobile-first responsive layout using CSS Grid. Single column on mobile, two columns on desktop.
**When to use:** Side-by-side display on larger screens, stacked on mobile.
**Example:**
```jsx
// Source: Tailwind CSS Official Docs - Grid Template Columns
// https://tailwindcss.com/docs/grid-template-columns

// Mobile-first approach: single column by default, grid on lg breakpoint
<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
  <div>{/* Left column - Button */}</div>
  <div>{/* Right column - Terminal */}</div>
</div>
```

### Pattern 3: Section Styling Consistency
**What:** Sections follow consistent spacing, border, and background patterns.
**When to use:** Every top-level section on homepage.
**Example:**
```jsx
// Source: Existing codebase patterns from Home.jsx

<section className="py-32 sm:py-40 relative overflow-hidden">
  {/* Top border separator */}
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

  {/* Background accent (optional) */}
  <div className="absolute w-[600px] h-[600px] top-[20%] -right-[100px] rounded-full pointer-events-none"
       style={{ background: 'radial-gradient(circle, rgba(0,212,207,0.04) 0%, transparent 60%)' }} />

  {/* Background grid pattern (optional) */}
  <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
       style={{
         backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
         backgroundSize: '80px 80px'
       }} />

  {/* Content container */}
  <div className="mx-auto max-w-6xl px-6 relative z-10">
    {/* Section content */}
  </div>
</section>
```

### Pattern 4: Scroll-Triggered Animation
**What:** Sections fade in when scrolled into view using IntersectionObserver.
**When to use:** Adding polish to section entrance animations.
**Example:**
```jsx
// Source: Existing codebase patterns from Home.jsx

import { useScrollAnimation } from '../hooks/useScrollAnimation'

function DemoSection() {
  const [demoRef, demoVisible] = useScrollAnimation(0.15)

  return (
    <section ref={demoRef} className="py-32 sm:py-40 relative overflow-hidden">
      <div className={`transition-all duration-700 ${demoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Content appears when visible */}
      </div>
    </section>
  )
}
```

### Pattern 5: useEffect Cleanup for Polling
**What:** Clean up intervals/subscriptions when component unmounts to prevent memory leaks.
**When to use:** Any component that starts polling or subscriptions (already implemented in useLiveMonitor hook).
**Example:**
```jsx
// Source: React Official Docs - useEffect
// https://react.dev/reference/react/useEffect

useEffect(() => {
  const interval = setInterval(fetchData, 1000)

  // Cleanup function runs on unmount or before re-run
  return () => {
    clearInterval(interval)
  }
}, [dependencies])
```

### Anti-Patterns to Avoid
- **Don't pass entire hook return objects as props:** Pass only what's needed (`sessionId`), not `{ data, isPolling, error, changedFields, startPolling, stopPolling }`. Child components should be dumb presentational components.
- **Don't reset sessionId on call end:** Session ID must persist after call ends so terminal can continue polling for final data (30-second window).
- **Don't use Context API for simple parent-child state:** Context is overkill when lifting state up suffices. Only one section needs this coordination.
- **Don't break mobile-first responsive pattern:** Always define mobile (unprefixed) classes first, then add breakpoint prefixes (`lg:`) for larger screens.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Polling data from API | Custom setInterval logic | useLiveMonitor hook (Phase 1) | Already handles mounting/unmounting cleanup, changed field detection, error handling, 1-second intervals |
| Vapi call lifecycle | Custom Vapi SDK wrapper | useVapiCall hook (Phase 3) | Already handles session ID generation, volume levels, call states, cleanup |
| Scroll-triggered animations | Custom IntersectionObserver | useScrollAnimation hook (existing) | Already implemented in codebase, used by multiple sections |
| Responsive breakpoints | Custom media queries | Tailwind responsive prefixes | Mobile-first approach, consistent with codebase |
| Terminal display logic | Custom data display component | LiveMonitorTerminal (Phase 2) | Already handles typewriter effects, status states, field animations |
| Call button UI | Custom button with states | VapiCallButton (Phase 3) | Already handles all call states, audio bars, error display |

**Key insight:** This phase is pure assembly. Every piece already exists. The only new code is the container component that owns session ID state and passes props.

## Common Pitfalls

### Pitfall 1: Resetting Session ID on Call End
**What goes wrong:** If you clear `sessionId` state when `onCallEnd` fires, the terminal stops polling immediately and never displays the final captured data.
**Why it happens:** Natural instinct to "clean up" state when an event completes, but polling needs to continue 30 seconds after call ends to capture backend processing results.
**How to avoid:** Only set sessionId on call start. Never reset it to null. Let the terminal's internal polling logic handle when to stop (30-second window after call ends).
**Warning signs:** Terminal shows "System Ready" immediately after call ends instead of displaying captured data.

### Pitfall 2: Breaking Homepage Section Flow
**What goes wrong:** Inserting demo section without matching existing spacing/border patterns makes it look disconnected from the rest of the page.
**Why it happens:** Not examining existing section structure before adding new section.
**How to avoid:** Copy section structure from existing sections (top border, padding, background, container). Use same `py-32 sm:py-40` spacing, same `max-w-6xl` container, same border separator.
**Warning signs:** Visual gap or bunching around new section, inconsistent vertical rhythm.

### Pitfall 3: Column Order on Mobile
**What goes wrong:** Terminal appears above button on mobile, user sees empty terminal before knowing to start a call.
**Why it happens:** Grid defaults to source order (button first in JSX renders on top).
**How to avoid:** Ensure button appears first in JSX source order. Grid will naturally stack button above terminal on mobile. No need for `order-` utilities.
**Warning signs:** User sees "System Ready" terminal at top of section on mobile before seeing call button.

### Pitfall 4: Passing Hook Objects as Props
**What goes wrong:** Passing entire hook return objects (`{data, isPolling, error, ...}`) creates tight coupling and makes components harder to test.
**Why it happens:** Convenience—easier to spread all hook values to child component.
**How to avoid:** Extract only what child needs. VapiCallButton already has callbacks (`onCallStart`, `onCallEnd`). LiveMonitorTerminal only needs `sessionId` prop, it calls `useLiveMonitor` internally.
**Warning signs:** Child component re-renders excessively, or component can't be tested without mocking entire hook.

### Pitfall 5: Forgetting useEffect Cleanup
**What goes wrong:** Polling continues after component unmounts, causing "Can't perform a React state update on an unmounted component" warnings and memory leaks.
**Why it happens:** Starting intervals/subscriptions without cleanup function.
**How to avoid:** Already handled by `useLiveMonitor` and `useVapiCall` hooks. If creating new effects, always return cleanup function. Examine existing hooks for reference.
**Warning signs:** Console warnings about state updates on unmounted components, memory usage increasing over time.

### Pitfall 6: Not Testing Responsive Breakpoints
**What goes wrong:** Layout looks good on desktop, breaks on mobile (overlapping columns, text overflow, button too small to tap).
**Why it happens:** Only testing on desktop during development.
**How to avoid:** Test at 375px (mobile), 768px (tablet), and 1024px+ (desktop) breakpoints. Use browser DevTools responsive mode. Check that button/terminal are tappable (min 44px touch target).
**Warning signs:** User reports can't use demo on mobile, horizontal scrolling appears.

## Code Examples

Verified patterns from official sources and existing codebase:

### Section Integration Pattern
```jsx
// Source: Existing Home.jsx structure

import { useState } from 'react'
import { VapiCallButton } from '../components/VapiCallButton'
import { LiveMonitorTerminal } from '../components/LiveMonitorTerminal'
import { useLiveMonitor } from '../hooks/useLiveMonitor'

function DemoSection() {
  const [sessionId, setSessionId] = useState(null)
  const { data, isPolling, changedFields } = useLiveMonitor()

  const handleCallStart = (newSessionId) => {
    setSessionId(newSessionId)
    startPolling(newSessionId)
  }

  const handleCallEnd = () => {
    // Keep session ID for continued polling
    // Terminal will stop polling after 30 seconds
  }

  // Determine terminal status based on call state and data
  const getTerminalStatus = () => {
    if (callStatus === 'active') return 'active'
    if (isPolling && !data?.data) return 'processing'
    if (data?.data?.summary) return 'captured'
    return 'standby'
  }

  return (
    <section className="py-32 sm:py-40 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-semibold text-white text-center mb-12">
          See It Work
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <VapiCallButton
              onCallStart={handleCallStart}
              onCallEnd={handleCallEnd}
            />
          </div>

          <div>
            <LiveMonitorTerminal
              data={data}
              isPolling={isPolling}
              changedFields={changedFields}
              status={getTerminalStatus()}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DemoSection
```

### Responsive Grid Pattern
```jsx
// Source: Tailwind CSS Documentation - Grid Template Columns
// https://tailwindcss.com/docs/grid-template-columns

// Mobile-first: single column (default), two columns on lg breakpoint
<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
  <div>{/* Column 1 */}</div>
  <div>{/* Column 2 */}</div>
</div>

// Alternative with explicit single column on mobile
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
  <div>{/* Column 1 */}</div>
  <div>{/* Column 2 */}</div>
</div>

// Both produce same result (mobile-first principle)
```

### Scroll Animation Integration
```jsx
// Source: Existing Home.jsx pattern

import { useScrollAnimation } from '../hooks/useScrollAnimation'

function DemoSection() {
  const [demoRef, demoVisible] = useScrollAnimation(0.15)

  return (
    <section ref={demoRef} className="py-32 sm:py-40 relative overflow-hidden">
      <div className={`transition-all duration-700 ${demoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-4xl sm:text-5xl font-semibold text-white text-center mb-12">
          See It Work
        </h2>
        {/* Rest of section content */}
      </div>
    </section>
  )
}
```

### Home.jsx Insertion Point
```jsx
// Source: Existing Home.jsx line 173-179

{/* Hero section ends */}
</section>

{/* NEW: Demo Section - Insert here */}
<DemoSection />

{/* ============================================
    HOW WE WORK — PARTNERSHIP FLOW
    ============================================ */}
<section ref={howRef} className="py-32 sm:py-40 relative overflow-hidden">
  {/* Existing "How We Work" section */}
</section>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Class components with lifecycle methods | Functional components with hooks | React 16.8 (2019) | Simpler state management, better composition |
| Manual IntersectionObserver setup | useScrollAnimation custom hook | Implemented in codebase | Reusable scroll animation pattern across sections |
| Prop drilling through multiple levels | Lifting state up to nearest common parent | Always (React best practice) | Cleaner component tree, easier to reason about state flow |
| CSS-in-JS libraries (styled-components) | Tailwind CSS utility classes | Adopted in project | Faster development, smaller bundle, better performance |
| Create React App | Vite | Vite released 2020, widely adopted 2021+ | Faster dev server (10-100x), faster builds |
| Tailwind v3 with separate config | Tailwind v4 with @tailwindcss/vite | Tailwind v4 released late 2024 | Simplified setup, Vite plugin integration |

**Deprecated/outdated:**
- **Class-based lifecycle methods:** Use hooks instead (`useEffect`, `useState`, `useRef`)
- **componentDidMount/componentWillUnmount:** Use `useEffect` with cleanup function
- **Manual media query listeners in JS:** Use Tailwind responsive prefixes (mobile-first)
- **Separate polling logic in components:** Use `useLiveMonitor` hook (Phase 1)

## Open Questions

Things that couldn't be fully resolved:

1. **Should demo section have scroll animation?**
   - What we know: Other sections use `useScrollAnimation` for entrance effects
   - What's unclear: Whether demo section benefits from animation or should appear immediately (interactive element)
   - Recommendation: Use scroll animation for consistency, but with lower threshold (0.1-0.15) so it triggers earlier. User still sees section in viewport before it fully fades in.

2. **What max-width should section use?**
   - What we know: Hero uses `max-w-3xl`, other sections use `max-w-5xl` or `max-w-6xl`
   - What's unclear: Whether demo section should match "How We Work" (max-w-6xl) or use narrower container
   - Recommendation: Use `max-w-6xl` to match "How We Work" section—two-column layout needs room to breathe.

3. **Should columns be equal width or asymmetric?**
   - What we know: `lg:grid-cols-2` creates equal 50/50 split, could use `grid-cols-[40%_60%]` for asymmetric
   - What's unclear: Whether terminal should be visually dominant or balanced with button
   - Recommendation: Start with equal 50/50 split (`lg:grid-cols-2`). Terminal has more visual weight naturally (larger component), button side can have descriptive text if needed.

4. **Should section background alternate (dark vs darker)?**
   - What we know: Home.jsx uses `bg-[#030306]` as base, sections have no explicit background (inherit from parent)
   - What's unclear: Whether demo section should have `bg-[#0d0d0d]` (lighter) for visual separation
   - Recommendation: No explicit background—inherit from parent like other sections. Use subtle background accent (radial gradient) like existing sections for visual interest.

## Sources

### Primary (HIGH confidence)
- React Official Docs (Sharing State Between Components): https://react.dev/learn/sharing-state-between-components
- React Official Docs (useEffect): https://react.dev/reference/react/useEffect
- Tailwind CSS Official Docs (Grid Template Columns): https://tailwindcss.com/docs/grid-template-columns
- Tailwind CSS Official Docs (Responsive Design): https://tailwindcss.com/docs/responsive-design
- Existing codebase: Home.jsx (section patterns), VapiCallButton.jsx, LiveMonitorTerminal.jsx, useLiveMonitor.js, useVapiCall.js

### Secondary (MEDIUM confidence)
- [Sharing State Between Components – React](https://react.dev/learn/sharing-state-between-components) - React official guidance on lifting state up
- [The mystery of React Element, children, parents and re-renders](https://www.developerway.com/posts/react-elements-children-parents) - Component composition patterns
- [Compound Pattern - patterns.dev](https://www.patterns.dev/react/compound-pattern/) - Alternative composition pattern (not needed for this phase)
- [Mastering Responsive Layouts with Tailwind Grid](https://codeparrot.ai/blogs/mastering-responsive-layouts-with-tailwind-grid-in-react) - Grid layout patterns
- [CSS Grid Responsive Design: The Mobile-First Approach](https://medium.com/codetodeploy/css-grid-responsive-design-the-mobile-first-approach-that-actually-works-194bdab9bc52) - Mobile-first methodology
- [Understanding useEffect Execution & Cleanup in React](https://medium.com/@vinaykumarbr07/understanding-useeffect-execution-cleanup-in-react-with-examples-ad74f1c7a42b) - useEffect cleanup patterns
- [Understanding React's useEffect cleanup function - LogRocket Blog](https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/) - Cleanup best practices

### Tertiary (LOW confidence)
- [React Stack Patterns - patterns.dev](https://www.patterns.dev/react/react-2026/) - General patterns overview
- [Tailwind CSS Best Practices 2025-2026](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns) - Design system patterns
- [Polling in React - DEV Community](https://dev.to/tangoindiamango/polling-in-react-3h8a) - Polling patterns (already implemented in useLiveMonitor)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All dependencies already installed and verified in package.json
- Architecture: HIGH - Existing codebase provides clear patterns, React official docs confirm best practices
- Pitfalls: MEDIUM - Based on common React mistakes and analysis of existing hook implementations
- Code examples: HIGH - Extracted from existing codebase and official documentation

**Research date:** 2026-01-22
**Valid until:** 2026-02-22 (30 days for stable patterns - React/Tailwind fundamentals don't change rapidly)
