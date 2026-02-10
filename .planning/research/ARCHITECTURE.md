# Architecture Research: Premium Agency Website with Interactive Demos

## Component Architecture

### Layer 1: Layout
```
App.jsx
└── MainLayout.jsx
    ├── Header (fixed, scroll-aware blur)
    ├── <Outlet /> (page content)
    └── Footer
```

### Layer 2: Pages
```
pages/
├── Home.jsx          ← orchestrates all homepage sections
├── About.jsx         ← standalone page
├── Audit.jsx         ← PROTECTED (form logic)
├── Begin.jsx         ← PROTECTED (redirect)
└── Book.jsx          ← PROTECTED (Calendly)
```

### Layer 3: Homepage Sections (ordered)
```
sections/home/
├── HeroSection.jsx
├── ProblemSection.jsx
├── ReframeSection.jsx
├── SolutionSection.jsx
├── DemoPart1.jsx         ← Customer Experience
├── DemoPart2.jsx         ← System Logic (ScrollTrigger)
├── DemoPart3.jsx         ← Owner Dashboard
├── TestimonialsSection.jsx
└── CTASection.jsx
```

### Layer 4: UI Primitives
```
components/ui/
├── SectionWrapper.jsx    ← consistent padding, max-width, optional glow
├── AnimatedText.jsx      ← text that reveals on scroll
├── GlowOrb.jsx           ← background glow effect
├── GridOverlay.jsx        ← subtle grid pattern background
├── Card.jsx              ← bordered card with optional glassmorphism
└── Button.jsx            ← primary/secondary/ghost variants
```

### Layer 5: Demo Sub-Components
```
components/demo/
├── FormMockup.jsx        ← auto-filling form fields
├── PhoneMockup.jsx       ← SMS conversation display
├── NodeGraph.jsx         ← SVG node graph with connections
├── NodeGraphNode.jsx     ← individual node in graph
├── DashboardMockup.jsx   ← window-framed dashboard
├── LeadActivityRail.jsx  ← dashboard left rail
├── LeadStatusRail.jsx    ← dashboard center rail
└── MetricsRail.jsx       ← dashboard right rail
```

## Data Flow

### Content Flow
```
Content (hardcoded in section files or content constants)
  → Section Components (render copy + structure)
    → UI Primitives (handle visual presentation)
```

**Recommendation:** Keep content as constants at the top of each section file OR in a dedicated `content/` directory. For a site this size, a separate content directory is cleaner — especially since Phase 1 is content-only.

```
content/
├── home.js       ← all homepage section copy
├── about.js      ← about page copy
└── demo-data.js  ← demo sequence data (form fields, SMS messages, dashboard numbers)
```

### Animation Flow
```
GSAP Registration (App-level or lazy)
  → ScrollTrigger (page-level scroll tracking)
    → Section-level animations (fade-in, reveal)
    → Demo Part 2 (scroll-scrubbed timeline)
      → Individual node animations
      → SVG path animations
```

## GSAP + React Integration Pattern

### Setup
```jsx
// In demo components:
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```

### The useGSAP Hook Pattern
```jsx
function DemoPart2() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // All GSAP code here — auto-cleanup on unmount
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3000',  // scroll distance
        scrub: 1,        // smooth scrubbing
        pin: true,        // pin during animation
      }
    })

    tl.to('.node-1', { opacity: 1, scale: 1 })
      .to('.connection-1', { strokeDashoffset: 0 })
      .to('.node-2', { opacity: 1, scale: 1 })
    // ... etc
  }, { scope: containerRef }) // scope limits querySelector to container

  return <div ref={containerRef}>...</div>
}
```

### Key Rules
1. **Never use `document.querySelector`** — use refs and GSAP's scope
2. **useGSAP handles cleanup** — no manual `ScrollTrigger.kill()` needed
3. **Register plugins once** per component that uses them
4. **Pin containers need explicit height** — the pinned section needs enough scroll distance

## ScrollTrigger Scroll-Scrub Architecture (Demo Part II)

This is the highest-complexity component. Architecture:

```
DemoPart2.jsx (container, pinned)
├── ScrollTrigger config (start, end, scrub, pin)
├── GSAP Timeline (master timeline, scrubbed by scroll)
│   ├── Phase: New Lead node appears
│   ├── Phase: Connection line draws to Qualification
│   ├── Phase: Qualification node activates
│   ├── Phase: Branch decision highlights
│   ├── Phase: Follow-Up/Quote path animates
│   ├── Phase: Feedback Loop path animates
│   └── Phase: Review node completes
├── SVG Layer (connection lines with stroke-dasharray/dashoffset)
└── Node Layer (positioned divs or SVG groups)
```

**Mobile fallback:**
```jsx
if (ScrollTrigger.isTouch === 1) {
  // Replace scroll-scrub with auto-play timeline
  tl.play() // instead of scrub
}
```

## Build Order (Dependencies)

```
Phase 1: Content (no code dependencies)
  ↓
Phase 2: Design System + Static Sections
  - Design tokens FIRST (everything depends on them)
  - UI primitives SECOND (sections depend on them)
  - Sections THIRD (use primitives + content)
  - Layout (nav/footer) can parallel with sections
  ↓
Phase 3: Interactive Demos
  - GSAP setup FIRST
  - Demo Part I (simplest, establishes patterns)
  - Demo Part II (highest complexity, most time)
  - Demo Part III (builds on Part I patterns)
  ↓
Phase 4: Polish
  - All sections must exist first
  - Responsive, a11y, perf, SEO
```

## File Structure After Redesign

```
src/
├── assets/
│   └── logo.png
├── content/
│   ├── home.js
│   ├── about.js
│   └── demo-data.js
├── components/
│   ├── ui/
│   │   ├── SectionWrapper.jsx
│   │   ├── AnimatedText.jsx
│   │   ├── GlowOrb.jsx
│   │   ├── GridOverlay.jsx
│   │   ├── Card.jsx
│   │   └── Button.jsx
│   ├── demo/
│   │   ├── FormMockup.jsx
│   │   ├── PhoneMockup.jsx
│   │   ├── NodeGraph.jsx
│   │   ├── DashboardMockup.jsx
│   │   └── ... (sub-components)
│   └── ScrollToTop.jsx (keep)
├── sections/
│   └── home/
│       ├── HeroSection.jsx
│       ├── ProblemSection.jsx
│       ├── ReframeSection.jsx
│       ├── SolutionSection.jsx
│       ├── DemoPart1.jsx
│       ├── DemoPart2.jsx
│       ├── DemoPart3.jsx
│       ├── TestimonialsSection.jsx
│       └── CTASection.jsx
├── hooks/
│   └── useScrollAnimation.js (keep or replace with GSAP)
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Audit.jsx (PROTECTED)
│   ├── Begin.jsx (PROTECTED)
│   └── Book.jsx (PROTECTED)
├── App.jsx
├── main.jsx
└── index.css
```

---
*Researched: 2026-02-10*
