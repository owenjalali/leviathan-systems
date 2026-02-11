# Phase 04: Interactive Demos - Research

**Researched:** 2026-02-11
**Domain:** GSAP viewport-triggered animations, SVG stroke animations, React integration
**Confidence:** HIGH

## Summary

Phase 4 builds three distinct auto-play demo sections using GSAP ScrollTrigger with viewport entry triggers. The codebase already has GSAP 3.14.2 and @gsap/react 2.1.2 installed with working implementations in BackgroundPaths.jsx and BackgroundBeams.jsx, establishing proven patterns for SVG stroke-dashoffset animations and useGSAP cleanup.

The three parts require different animation approaches: Part I combines form input auto-fill with CSS phone mockup SMS conversation (side-by-side layout), Part II uses SVG node graph with stroke-dashoffset connection animations, and Part III displays an animated dashboard with window frame mockup, counters, and approval buttons. All three auto-play on viewport entry (not scroll-scrub), are distinct sections with headers, and support prefers-reduced-motion.

**Primary recommendation:** Use GSAP timelines with ScrollTrigger `once: true` for viewport-triggered auto-play. Build custom SVG node graph and phone mockup components using Tailwind CSS. Implement gsap.matchMedia() for prefers-reduced-motion handling. Leverage existing useGSAP patterns from BackgroundPaths.jsx for cleanup and scoping.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Demo Narrative & Data:**
- Generic/abstract business scenario — no specific industry. Show "a customer request" flowing through a system without naming plumbing, consulting, etc.
- Part I: Customer fills a request form on a website, then gets an instant SMS confirmation/booking. Show both the web form and phone mockup side by side.
- Part III: Activity feed showing what the system just handled, with one-tap approve/override buttons. Emphasizes human-safe autonomy (not a metrics dashboard).
- Realistic but fictional data — real-sounding names ("Sarah M."), realistic messages ("Hi, I'd like to schedule a consultation"), plausible numbers. Makes it feel tangible.

**Animation & Scroll Behavior:**
- All three parts auto-play when they scroll into viewport. No scroll-scrub, no click-to-play.
- Three parts are distinct sections with clear separation (headers like "Part I: Customer Experience"). Not a continuous flow or tab interface.
- Animation timing: Claude's discretion — pick the right pacing per part individually.

**Visual Style & Layout:**
- Phone mockup (Part I SMS): Realistic device frame (iPhone-style outline) with SMS conversation inside.
- Node graph (Part II): Clean and minimal — simple rounded rectangles with labels, thin connection lines, subtle glow on active connections. Think Linear or Figma-style flow diagrams.
- Owner Dashboard (Part III): Window frame mockup (title bar, dots) containing the activity feed. Establishes this as "the app the owner uses."
- Background treatment: Claude's discretion — pick the right visual distinction for the demo zone.

**Mobile Experience:**
- Mobile animations auto-play on scroll-in, same as desktop. Consistent experience.
- Which parts to show on mobile and layout sizing: Claude's discretion — optimize for what renders well at small breakpoints.
- Responsive device targeting: Claude's discretion — standard responsive approach.

### Claude's Discretion

- Animation timing for each part (quick vs medium vs leisurely per section)
- Background treatment for demo sections
- Mobile: which parts to show, phone mockup sizing, node graph simplification
- Mobile: responsive breakpoint strategy
- How Part I form + phone arrange on different screen sizes

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| GSAP | 3.14.2 | Animation engine | Industry standard for complex timelines, superior performance, already installed |
| @gsap/react | 2.1.2 | React integration | Official React hook with automatic cleanup via gsap.context() |
| ScrollTrigger | (GSAP plugin) | Viewport triggers | Built-in GSAP plugin, handles viewport detection more efficiently than IntersectionObserver |
| Tailwind CSS | 4.1.18 | Styling | Project standard, already configured with Vite plugin |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.562.0 | Icons | Already installed for UI icons (approval buttons, window controls) |
| React | 19.2.0 | Framework | Project framework |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| ScrollTrigger | IntersectionObserver API | ScrollTrigger is more performant (processes upfront vs constantly watching), GSAP integration cleaner |
| Custom SVG | React Flow library | React Flow is 200KB+, overkill for static demo graph. Custom SVG with GSAP is lighter and fits design requirements |
| CSS animations | Framer Motion | Framer Motion already installed but GSAP timelines better for complex sequences with precise timing control |
| Devices.css library | Custom CSS phone mockup | Devices.css adds dependency, custom Tailwind mockup gives full control and matches site aesthetic |

**Installation:**
No new dependencies required — all libraries already installed.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── sections/
│   └── home/
│       ├── DemoPartOne.jsx          # Form + SMS phone mockup
│       ├── DemoPartTwo.jsx          # Node graph with SVG animations
│       ├── DemoPartThree.jsx        # Dashboard window frame mockup
│       └── DemoSection.jsx          # Wrapper - replaces current DemoSection
├── components/
│   └── ui/
│       ├── PhoneMockup.jsx          # Reusable iPhone frame
│       ├── WindowFrame.jsx          # Reusable macOS window chrome
│       └── NodeGraph.jsx            # SVG node graph component
├── content/
│   └── demo-data.js                 # Already exists - data source
```

### Pattern 1: Viewport-Triggered Auto-Play with ScrollTrigger

**What:** Trigger GSAP timeline playback when section enters viewport, play once, clean up automatically.

**When to use:** All three demo parts — animations play on scroll-in, not scrub-based.

**Example:**
```javascript
// Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DemoPartOne() {
    const containerRef = useRef(null)
    const tlRef = useRef()

    useGSAP(() => {
        tlRef.current = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",     // When top of section hits 80% down viewport
                once: true,           // Play once, then kill ScrollTrigger
                // toggleActions auto-set to "play none none none" by once: true
            }
        })

        tlRef.current
            .to(".form-field", { opacity: 1, y: 0, stagger: 0.15 })
            .to(".sms-bubble", { opacity: 1, y: 0, stagger: 0.2 }, "-=0.3")
    }, { scope: containerRef })

    return (
        <section ref={containerRef}>
            {/* Demo content */}
        </section>
    )
}
```

### Pattern 2: SVG Stroke Animation for Node Graph Connections

**What:** Animate SVG path connections using stroke-dasharray and stroke-dashoffset, creating "drawing" effect.

**When to use:** Part II node graph connections — lines draw between nodes in sequence.

**Example:**
```javascript
// Source: Existing BackgroundPaths.jsx (lines 64-89) + https://css-tricks.com/svg-line-animation-works/
useGSAP(() => {
    const connections = containerRef.current.querySelectorAll('.connection-path')

    connections.forEach((path, i) => {
        const length = path.getTotalLength()

        // Set up: path invisible, fully offset
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
        })

        // Animate: draw the line
        tlRef.current.to(path, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
        }, i * 0.3) // Stagger by 0.3s
    })
}, { scope: containerRef })
```

### Pattern 3: Counter Animation for Dashboard Metrics

**What:** Animate numbers from 0 to target value, common for dashboard stats.

**When to use:** Part III dashboard counters (leads captured, conversion rate, etc.).

**Example:**
```javascript
// Source: https://gsap.com/community/forums/topic/30195-gsap-animated-counter/
useGSAP(() => {
    const counters = [
        { target: 12, selector: '.leads-count' },
        { target: 34, selector: '.conversion-rate' },
    ]

    counters.forEach(({ target, selector }) => {
        const obj = { value: 0 }
        const element = containerRef.current.querySelector(selector)

        tlRef.current.to(obj, {
            value: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                element.textContent = Math.round(obj.value)
            }
        }, "-=1.5") // Overlap with previous animation
    })
}, { scope: containerRef })
```

### Pattern 4: Accessibility with prefers-reduced-motion

**What:** Detect user's motion preference and conditionally apply animations or static fallbacks.

**When to use:** All three demo parts — required for accessibility compliance.

**Example:**
```javascript
// Source: https://gsap.com/resources/a11y/
useGSAP(() => {
    const mm = gsap.matchMedia()

    // Full animations for users with no preference
    mm.add("(prefers-reduced-motion: no-preference)", () => {
        tlRef.current = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                once: true,
            }
        })
        tlRef.current.to(".element", { x: 100, rotation: 360, duration: 1.5 })
    })

    // Simplified animations for motion-sensitive users
    mm.add("(prefers-reduced-motion: reduce)", () => {
        tlRef.current = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                once: true,
            }
        })
        tlRef.current.to(".element", { opacity: 1, duration: 0.5 }) // Just fade in
    })
}, { scope: containerRef })
```

### Pattern 5: Scoped Cleanup with useGSAP

**What:** useGSAP automatically cleans up all GSAP animations created during hook execution when component unmounts.

**When to use:** All components with GSAP animations — critical for React 18 strict mode and SPA navigation.

**Example:**
```javascript
// Source: https://gsap.com/resources/React/ + existing BackgroundPaths.jsx (line 105)
const containerRef = useRef(null)

useGSAP(() => {
    // All animations created here are automatically reverted on unmount
    gsap.to(".element", { x: 100 })
    gsap.timeline().to(".other", { y: 50 })
    // ScrollTriggers created here also auto-killed
}, { scope: containerRef }) // Scope selectors to container descendants
```

### Anti-Patterns to Avoid

- **Creating animations outside useGSAP:** Event handlers and setTimeout callbacks need `contextSafe()` wrapper or manual cleanup
- **Individual refs per animated element:** Use scoped selectors with single container ref
- **Scrub-based animations when auto-play required:** CONTEXT.md specifies auto-play, not scroll-scrub
- **Animating on every render:** Store timelines in refs, use dependency arrays carefully
- **Forgetting ScrollTrigger.refresh():** Call after DOM changes or delayed renders

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Typing effect animation | Custom char-by-char loop with setTimeout | GSAP text plugin or simple stagger | Edge cases: pausing, rewinding, screenreader accessibility |
| Viewport detection | Custom scroll listeners + getBoundingClientRect | GSAP ScrollTrigger | Performance (processes upfront), automatic cleanup, better mobile handling |
| Timeline sequencing | Manual delay calculations with setTimeout | GSAP Timeline with position parameters | Impossible to pause/reverse, brittle timing, no scrubbing |
| SVG path morphing | Manual path interpolation | GSAP (or accept static paths) | Complex math, browser inconsistencies, performance |
| Phone mockup SVG | Hand-coded SVG device frames | Tailwind CSS with border-radius + box-shadow | Maintainability, file size, responsive scaling |

**Key insight:** GSAP handles the low-level animation timing, easing, and cleanup that seems simple but has dozens of edge cases (React strict mode double-render, navigation cleanup, reduced motion, scroll position tracking). Custom solutions inevitably miss these.

## Common Pitfalls

### Pitfall 1: ScrollTrigger Not Refreshing After Layout Changes

**What goes wrong:** ScrollTrigger calculates start/end positions on creation. If DOM changes (images load, content expands), positions become wrong and animations trigger at incorrect scroll positions.

**Why it happens:** ScrollTrigger caches calculations for performance. Doesn't auto-detect layout changes.

**How to avoid:** Call `ScrollTrigger.refresh()` after delays, image loads, or dynamic content insertion.

**Warning signs:** Animations trigger too early/late, especially after navigating back to page.

**Code example:**
```javascript
useGSAP(() => {
    tlRef.current = gsap.timeline({
        scrollTrigger: { trigger: ".demo", start: "top 80%", once: true }
    })
    // ... animations

    // If images or async content loads:
    setTimeout(() => ScrollTrigger.refresh(), 100)
}, { scope: containerRef })
```

### Pitfall 2: React 18 Strict Mode Double-Render Without Cleanup

**What goes wrong:** React 18 runs effects twice in development. Without proper cleanup, GSAP animations run twice, creating duplicate conflicting tweens.

**Why it happens:** useGSAP's automatic cleanup requires animations to be created during hook execution. Animations in event handlers or callbacks aren't auto-cleaned.

**How to avoid:** Use `contextSafe()` to wrap any animation created outside the useGSAP hook (click handlers, setTimeout).

**Warning signs:** Janky animations in development, console warnings about conflicting tweens, animation doesn't restart properly after navigation.

**Code example:**
```javascript
// WRONG - not cleaned up
useGSAP(() => {
    const button = containerRef.current.querySelector('.button')
    button.addEventListener('click', () => {
        gsap.to('.element', { x: 100 }) // NOT cleaned up on unmount
    })
}, { scope: containerRef })

// CORRECT - contextSafe wrapper
const { contextSafe } = useGSAP({ scope: containerRef })

const handleClick = contextSafe(() => {
    gsap.to('.element', { x: 100 }) // Now cleaned up automatically
})

// In JSX: <button onClick={handleClick}>
```

### Pitfall 3: Forgetting `once: true` on Viewport-Triggered Animations

**What goes wrong:** Animation replays every time user scrolls back to section. Can be jarring, waste performance, conflict with user expectations.

**Why it happens:** Default ScrollTrigger behavior is to replay on every scroll pass unless `once: true` or custom `toggleActions` set.

**How to avoid:** Add `once: true` to scrollTrigger config for one-time demo animations.

**Warning signs:** Animation restarts when scrolling up and back down.

### Pitfall 4: Hardcoded Animation Timing Without Mobile Consideration

**What goes wrong:** Animations feel too slow or too fast on mobile. Sequence timing that works at desktop viewport height breaks at mobile height.

**Why it happens:** Same absolute timings (1s, 2s) feel different based on scroll speed and viewport size.

**How to avoid:** Test animations on mobile. Consider viewport-relative timing or separate mobile timelines with gsap.matchMedia().

**Warning signs:** Users report animations "dragging" on mobile or feeling rushed.

### Pitfall 5: Not Handling prefers-reduced-motion

**What goes wrong:** Users with vestibular disorders experience nausea, dizziness from large movement animations. Fails WCAG 2.1 accessibility compliance.

**Why it happens:** Developers forget or don't know about motion sensitivity accessibility requirement.

**How to avoid:** Always implement gsap.matchMedia() with separate "reduce" and "no-preference" conditions. Simplify rather than eliminate animations for reduced motion.

**Warning signs:** Accessibility audits fail, user complaints about motion sickness.

### Pitfall 6: SVG Path getTotalLength() Before DOM Ready

**What goes wrong:** `path.getTotalLength()` returns 0 or throws error if called before path is in DOM.

**Why it happens:** useGSAP runs during layout/effect phase, but refs might not be attached yet in certain edge cases.

**How to avoid:** Always null-check refs and path elements before calling getTotalLength().

**Warning signs:** Console errors in development, animations don't play on first render.

**Code example:**
```javascript
useGSAP(() => {
    const path = containerRef.current?.querySelector('.connection-path')
    if (!path) return

    const length = path.getTotalLength()
    // ... animation
}, { scope: containerRef })
```

## Code Examples

Verified patterns from official sources and existing codebase:

### Timeline with Stagger (Form Auto-Fill)

```javascript
// Source: https://gsap.com/resources/react-basics/
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { formFields } from '../../content/demo-data'

gsap.registerPlugin(ScrollTrigger)

export default function DemoPartOne() {
    const containerRef = useRef(null)
    const tlRef = useRef()

    useGSAP(() => {
        const mm = gsap.matchMedia()

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            tlRef.current = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    once: true,
                }
            })

            // Auto-fill form fields with stagger
            tlRef.current
                .from(".form-field", {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.15, // 0.15s between each field
                    ease: "power2.out"
                })
                .from(".sms-bubble", {
                    opacity: 0,
                    y: 10,
                    duration: 0.5,
                    stagger: 0.3, // Slower for readability
                    ease: "back.out(1.2)"
                }, "-=0.2") // Overlap 0.2s before form finishes
        })

        // Simplified for reduced motion
        mm.add("(prefers-reduced-motion: reduce)", () => {
            tlRef.current = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    once: true,
                }
            })

            tlRef.current.from([".form-field", ".sms-bubble"], {
                opacity: 0,
                duration: 0.3,
            })
        })
    }, { scope: containerRef })

    return (
        <section ref={containerRef} className="py-20">
            <h2 className="text-2xl font-bold mb-8">Part I: Customer Experience</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    {formFields.map((field, i) => (
                        <div key={i} className="form-field opacity-0">
                            <label className="block text-sm mb-1">{field.label}</label>
                            <input
                                type="text"
                                value={field.value}
                                readOnly
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                    ))}
                </div>
                <div className="phone-mockup">
                    {/* SMS bubbles */}
                </div>
            </div>
        </section>
    )
}
```

### SVG Stroke Animation (Node Graph Connections)

```javascript
// Source: Existing BackgroundPaths.jsx + https://css-tricks.com/svg-line-animation-works/
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { systemNodes } from '../../content/demo-data'

gsap.registerPlugin(ScrollTrigger)

export default function DemoPartTwo() {
    const containerRef = useRef(null)
    const tlRef = useRef()

    // Generate connection paths between nodes
    const connections = [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        // ... etc
    ]

    useGSAP(() => {
        const paths = containerRef.current.querySelectorAll('.connection-path')
        if (!paths.length) return

        tlRef.current = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                once: true,
            }
        })

        paths.forEach((path, i) => {
            const length = path.getTotalLength()

            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
            })

            tlRef.current.to(path, {
                strokeDashoffset: 0,
                duration: 1,
                ease: "power2.inOut",
            }, i * 0.25) // Each line starts 0.25s after previous
        })

        // Glow effect on active connections
        tlRef.current.to(".connection-path", {
            filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.6))",
            duration: 0.5,
            stagger: 0.25,
        }, 0)
    }, { scope: containerRef })

    return (
        <section ref={containerRef} className="py-20">
            <h2 className="text-2xl font-bold mb-8">Part II: System Logic</h2>
            <svg viewBox="0 0 800 600" className="w-full">
                {/* Node rectangles */}
                {systemNodes.map((node, i) => (
                    <rect
                        key={node.id}
                        x={100 + node.level * 100}
                        y={200}
                        width={80}
                        height={40}
                        rx={8}
                        fill="var(--bg-secondary)"
                        stroke="var(--border)"
                    />
                ))}

                {/* Connection paths */}
                {connections.map((conn, i) => (
                    <path
                        key={i}
                        className="connection-path"
                        d={`M ${150 + systemNodes[conn.from].level * 100} 220 L ${150 + systemNodes[conn.to].level * 100} 220`}
                        stroke="var(--accent)"
                        strokeWidth={2}
                        fill="none"
                    />
                ))}
            </svg>
        </section>
    )
}
```

### Phone Mockup with Tailwind CSS

```javascript
// Source: https://flowbite.com/docs/components/device-mockups/ pattern adapted to Tailwind v4
import { smsConversation } from '../../content/demo-data'

export default function PhoneMockup() {
    return (
        <div className="relative mx-auto border-[14px] border-[#1f1f1f] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[25px] bg-[#1f1f1f] rounded-b-[1rem]" />

            {/* Screen */}
            <div className="relative h-full w-full overflow-y-auto bg-white rounded-[2rem] p-4">
                {/* SMS Conversation */}
                <div className="space-y-3">
                    {smsConversation.map((msg, i) => (
                        <div
                            key={i}
                            className={`sms-bubble flex ${
                                msg.sender === 'customer' ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                                    msg.sender === 'customer'
                                        ? 'bg-blue-500 text-white rounded-br-sm'
                                        : 'bg-gray-200 text-gray-900 rounded-bl-sm'
                                }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
```

### macOS Window Frame Mockup

```javascript
// Source: https://github.com/kapetan/titlebar pattern + Tailwind v4
export default function WindowFrame({ children }) {
    return (
        <div className="border border-[var(--border)] rounded-lg overflow-hidden shadow-2xl bg-[var(--bg-secondary)]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-[var(--border)]">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="ml-2 text-xs text-[var(--text-secondary)]">
                    Owner Dashboard
                </span>
            </div>

            {/* Window content */}
            <div className="p-6">
                {children}
            </div>
        </div>
    )
}
```

### Counter Animation

```javascript
// Source: https://gsap.com/community/forums/topic/30195-gsap-animated-counter/
useGSAP(() => {
    const counters = [
        { target: 12, selector: '.leads-count' },
        { target: 34, selector: '.conversion-rate', suffix: '%' },
    ]

    tlRef.current = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
        }
    })

    counters.forEach(({ target, selector, suffix = '' }) => {
        const obj = { value: 0 }
        const element = containerRef.current.querySelector(selector)

        tlRef.current.to(obj, {
            value: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                element.textContent = Math.round(obj.value) + suffix
            }
        }, 0.5) // All counters start at 0.5s
    })
}, { scope: containerRef })
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Intersection Observer + CSS animations | GSAP ScrollTrigger | GSAP 3.0 (2019) | Better performance (upfront calculations), easier complex sequences, automatic cleanup |
| useEffect/useLayoutEffect | useGSAP hook | @gsap/react 2.0 (2023) | Automatic cleanup via gsap.context(), prevents React 18 strict mode issues |
| Individual element refs | Scoped selectors | GSAP 3.11 (2022) | Cleaner code, less ref overhead, easier to animate groups |
| Manual reduced-motion checks | gsap.matchMedia() | GSAP 3.11 (2022) | Declarative motion preference handling, auto-cleanup on media query change |
| scrub: true (1:1 scroll) | scrub: 1 (delayed) | Always available | Smoother feel with catch-up delay vs instant response |

**Deprecated/outdated:**
- TweenMax/TimelineMax: Replaced by unified `gsap` import in GSAP 3.0+
- Manually calling `kill()` on unmount: useGSAP handles cleanup automatically
- Custom scroll listeners: ScrollTrigger is more performant and maintains better

## Open Questions

1. **Should node graph connections draw sequentially or in parallel?**
   - What we know: Sequential (one-by-one) is clearer for showing flow, parallel is faster
   - What's unclear: User testing needed to determine optimal pacing
   - Recommendation: Start with sequential (stagger: 0.25s), can adjust based on feel. Linear/Figma-style flows typically show sequential logic progression.

2. **How to handle very tall phone mockup on mobile viewports?**
   - What we know: iPhone frame at realistic proportions is ~600px tall, may dominate mobile viewport
   - What's unclear: Scale down entire mockup or show partial conversation with scroll
   - Recommendation: Scale down to max-h-[500px] on mobile (sm: breakpoint), maintain aspect ratio. User can still read SMS conversation clearly at smaller size.

3. **Should dashboard metrics show realistic or impressive numbers?**
   - What we know: data shows 12 leads, 34% conversion — realistic but modest
   - What's unclear: Whether higher numbers (50 leads, 65% conversion) would be more compelling
   - Recommendation: Keep realistic numbers per CONTEXT.md decision. "Realistic but fictional" builds trust. Exaggerated metrics feel like stock marketing.

## Sources

### Primary (HIGH confidence)

**GSAP Official Documentation:**
- [ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) - Viewport triggers, toggleActions, once parameter
- [React & GSAP Official Guide](https://gsap.com/resources/React/) - useGSAP patterns, scoped selectors, cleanup
- [Accessible Animation Guide](https://gsap.com/resources/a11y/) - gsap.matchMedia() for prefers-reduced-motion
- [Timeline Documentation](https://gsap.com/docs/v3/GSAP/Timeline/) - Position parameters, labels, sequencing

**Codebase:**
- `src/components/ui/BackgroundPaths.jsx` - Proven SVG stroke-dashoffset pattern, useGSAP scoping
- `src/content/demo-data.js` - Data source for all three demo parts
- `package.json` - Confirmed GSAP 3.14.2, @gsap/react 2.1.2 installed

**Community/Official Resources:**
- [@gsap/react npm package](https://www.npmjs.com/package/@gsap/react) - Hook API, cleanup behavior
- [GitHub greensock/react](https://github.com/greensock/react) - Official React integration repository

### Secondary (MEDIUM confidence)

**CSS/UI Patterns:**
- [Flowbite Device Mockups](https://flowbite.com/docs/components/device-mockups/) - Tailwind CSS phone mockup patterns
- [Flowbite Chat Bubbles](https://flowbite.com/docs/components/chat-bubble/) - SMS conversation bubble styling
- [Samuel Kraft iOS Chat Bubbles](https://samuelkraft.com/blog/ios-chat-bubbles-css) - iOS-specific chat bubble design
- [system.css](https://sakofchit.github.io/system.css/) - macOS window frame design patterns

**Technical Resources:**
- [CSS-Tricks: SVG Line Animation](https://css-tricks.com/svg-line-animation-works/) - stroke-dashoffset technique explanation
- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Alternative approach (not used, reference)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) - Accessibility media query

**GSAP Community Forums:**
- [GSAP Animated Counter](https://gsap.com/community/forums/topic/30195-gsap-animated-counter/) - Counter animation pattern
- [ScrollTrigger React Cleanup](https://gsap.com/community/forums/topic/35810-scrolltrigger-and-react-component-cycle-cleanup/) - React cleanup discussion
- [Timeline Position Parameter](https://gsap.com/community/position-parameter/) - Timeline sequencing guide

**Blog Posts/Tutorials:**
- [LogRocket: GSAP ScrollTrigger in React](https://blog.logrocket.com/how-to-use-the-gsap-scrolltrigger-plugin-in-react/)
- [Medium: GSAP Context React Guide](https://medium.com/@hello.kweku/gsap-context-a-react-developers-guide-to-smoother-animations-4135680fe523)
- [Medium: useGSAP Simplifying Animations](https://medium.com/@hello.kweku/simplifying-react-animations-with-usegsap-automatic-cleanup-and-beyond-354edfec31dc)

### Tertiary (LOW confidence - reference only)

**Library Alternatives (not used):**
- [React Flow](https://reactflow.dev) - Node-based UI library (too heavy for static demo)
- [Devices.css](https://devicescss.xyz/) - CSS device mockup library (adds dependency)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - GSAP and Tailwind already installed and working in codebase
- Architecture: HIGH - Patterns verified in existing BackgroundPaths.jsx, official GSAP docs
- Pitfalls: HIGH - Documented in official GSAP React guide and community forums
- Visual mockups: MEDIUM - Tailwind patterns proven but will need custom implementation
- Animation timing: MEDIUM - Best practices clear, specific durations require user testing

**Research date:** 2026-02-11
**Valid until:** 2026-03-13 (30 days - stable domain, GSAP updates infrequent)
