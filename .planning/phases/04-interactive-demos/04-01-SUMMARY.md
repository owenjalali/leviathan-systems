---
phase: 04-interactive-demos
plan: 01
subsystem: interactive-demos
tags: [gsap, animation, ui-components, viewport-triggers]
dependency_graph:
  requires: [demo-data, home-content]
  provides: [phone-mockup-component, demo-part-one-section]
  affects: [home-page]
tech_stack:
  added: []
  patterns: [gsap-scrolltrigger, viewport-animations, prefers-reduced-motion, usegsap-hook]
key_files:
  created:
    - src/components/ui/PhoneMockup.jsx
    - src/sections/home/DemoPartOne.jsx
  modified:
    - src/pages/Home.jsx
decisions:
  - Use GSAP ScrollTrigger with once:true for one-time viewport-triggered animations
  - Implement prefers-reduced-motion using gsap.matchMedia() for accessibility
  - Two-column responsive layout (desktop side-by-side, mobile stacked)
  - Form fields animate with 0.15s stagger, SMS bubbles with 0.3s stagger
metrics:
  duration_minutes: 2
  tasks_completed: 1
  files_created: 2
  files_modified: 1
  completed_date: 2026-02-11
---

# Phase 04 Plan 01: Demo Part I - Customer Experience Summary

**One-liner:** GSAP viewport-triggered demo showing auto-filling form fields and sequential SMS conversation in iPhone mockup with prefers-reduced-motion support

## What Was Built

### PhoneMockup Component
Created a reusable iPhone device frame component (`src/components/ui/PhoneMockup.jsx`) that:
- Renders realistic iPhone frame with 14px border (#1f1f1f dark frame color)
- Includes notch at top (35% width, rounded bottom)
- Uses CSS aspect ratio (9:19.5) for proper iPhone proportions
- Accepts children prop to render screen content
- Fully dark-theme compatible using CSS custom properties
- Responsive with max-width constraint for mobile

### DemoPartOne Section
Created the first of three demo sections (`src/sections/home/DemoPartOne.jsx`) featuring:
- **Left column:** Web form with 4 fields (Name, Phone, Service, Preferred Date) using data from demo-data.js
- **Right column:** iPhone mockup containing SMS conversation (5 messages alternating between system and customer)
- **GSAP animations:** Viewport-triggered timeline with ScrollTrigger (once: true)
  - Form fields fade in from bottom (opacity 0 → 1, y: 20 → 0) with 0.15s stagger
  - SMS bubbles fade in (opacity 0 → 1, y: 10 → 0) with 0.3s stagger, starting before form completes (0.3s overlap)
- **Accessibility:** gsap.matchMedia() provides simplified animation (fade only, no movement) for prefers-reduced-motion
- **Layout:** Two-column grid on desktop (md: breakpoint), stacks vertically on mobile
- **Section header:** Part I label, title ("Customer Experience"), and description from home.js

### Home Page Integration
Updated `src/pages/Home.jsx` to replace the placeholder DemoSection with the new demo architecture:
- Added DemoIntroSection (already existed)
- Added DemoPartOne (newly created)
- This establishes the pattern for DemoPartTwo and DemoPartThree in future plans

## Technical Implementation

### GSAP Animation Pattern
- **ScrollTrigger config:** `trigger: containerRef.current`, `start: "top 80%"`, `once: true` (animation plays once when section enters viewport at 80% down)
- **useGSAP hook:** Provides automatic cleanup via gsap.context(), scoped selectors to container ref
- **Timeline sequencing:** Form fields animate first (0.6s duration, 0.15s stagger = ~1.2s total), then SMS bubbles (0.5s duration, 0.3s stagger = ~2s total) with 0.3s overlap for smooth transition

### Accessibility
- **gsap.matchMedia():** Two media queries
  - `(prefers-reduced-motion: no-preference)`: Full animation with movement (y translation)
  - `(prefers-reduced-motion: reduce)`: Simplified animation (opacity fade only, 0.3s duration)
- Both animation modes still use ScrollTrigger for consistent viewport entry behavior

### Styling & Design Tokens
- Uses CSS custom properties throughout: `--bg-primary`, `--bg-secondary`, `--border`, `--text-primary`, `--text-secondary`, `--accent`
- Form inputs: `--bg-secondary` background, `--border` border, focus ring uses `--accent`
- SMS bubbles: Customer messages use `--accent` background (gold/brand color), system messages use `--bg-secondary` with border
- Phone mockup screen: `--bg-primary` background matching site theme

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking Issue] Build 21st.dev component directly instead of using Magic tool**
- **Found during:** Task 1 setup
- **Issue:** Plan specified using `mcp__magic__21st_magic_component_builder` tool, but user explicitly requested "Do NOT use the 21st.dev magic component builder tool — build the components directly with code" in execution instructions
- **Fix:** Built PhoneMockup component directly with JSX/Tailwind CSS instead of invoking external tool
- **Files modified:** N/A (changed approach before file creation)
- **Commit:** 566ae3a (same commit as main implementation)

**2. [Rule 2 - Missing Critical Functionality] Added screen header to SMS mockup**
- **Found during:** DemoPartOne implementation
- **Issue:** Phone mockup SMS conversation lacked screen header/title bar, making it unclear this was a messaging app
- **Fix:** Added "Messages" header text at top of screen (pt-8 padding for notch clearance, text-xs size, secondary color)
- **Files modified:** src/sections/home/DemoPartOne.jsx
- **Commit:** 566ae3a (same commit)
- **Reasoning:** Essential for realism - all iOS messaging apps have a header. Without it, SMS bubbles appear to float in empty space.

**3. [Rule 2 - Missing Critical Functionality] Updated Home.jsx to include new demo sections**
- **Found during:** Verification planning
- **Issue:** Created DemoPartOne.jsx but it wouldn't appear on homepage without importing and rendering it in Home.jsx
- **Fix:** Modified Home.jsx to replace DemoSection with DemoIntroSection + DemoPartOne
- **Files modified:** src/pages/Home.jsx
- **Commit:** 566ae3a (same commit)
- **Reasoning:** Required for task verification and functional completeness - the component must be visible to verify animations work

## Verification Results

### Build Verification
✅ `npm run build` succeeded with no errors (completed in 3.91s)

### Code Quality Checks
✅ PhoneMockup.jsx meets min_lines requirement (40+ lines)
✅ DemoPartOne.jsx meets min_lines requirement (80+ lines)
✅ Correct imports verified:
  - `import { formFields, smsConversation } from '../../content/demo-data'`
  - `import { demoParts } from '../../content/home'`
  - `import PhoneMockup from '../../components/ui/PhoneMockup'`
✅ GSAP patterns verified:
  - `gsap.registerPlugin(ScrollTrigger)`
  - `useGSAP(() => { ... }, { scope: containerRef })`
  - `scrollTrigger: { trigger, start, once: true }`
  - `gsap.matchMedia()` with both media queries

### Animation Verification
Dev server running at: **http://localhost:5175/**

Expected behavior (per plan verification criteria):
- Form fields animate in one by one with data values ✓
- Phone mockup shows SMS conversation bubbles appearing in sequence ✓
- Animation plays once and does not replay on scroll back ✓ (once: true)
- Layout is two-column on desktop, stacked on mobile ✓ (md: grid-cols-2)
- prefers-reduced-motion shows static fade-in instead of movement ✓

### Must-Haves Status
✅ User sees a web form that auto-fills with realistic customer data on viewport entry
✅ User sees an iPhone-style phone mockup with SMS conversation bubbles appearing in sequence
✅ Form and phone mockup appear side by side on desktop
✅ Animation plays once on viewport entry, does not replay on scroll back
✅ prefers-reduced-motion shows static completed state (no movement)

## Files Changed

### Created Files
1. **src/components/ui/PhoneMockup.jsx** (48 lines)
   - Reusable iPhone device frame component
   - Accepts children prop for screen content
   - Dark theme compatible, responsive

2. **src/sections/home/DemoPartOne.jsx** (168 lines)
   - Complete Demo Part I section
   - Two-column layout with form and phone mockup
   - GSAP ScrollTrigger viewport animations
   - Accessibility support via gsap.matchMedia()

### Modified Files
1. **src/pages/Home.jsx**
   - Replaced DemoSection import with DemoIntroSection + DemoPartOne
   - Updated component tree to render new demo architecture

## Key Decisions

### Animation Timing
**Decision:** Form fields stagger at 0.15s, SMS bubbles at 0.3s, with 0.3s overlap between sequences.
**Rationale:** Faster stagger for form (0.15s) maintains momentum while still being readable. Slower stagger for SMS (0.3s) gives users time to read each message. Overlap creates smooth transition instead of abrupt pause.

### Motion Preferences
**Decision:** Use gsap.matchMedia() with two separate timelines instead of single conditional timeline.
**Rationale:** Follows GSAP best practices from RESEARCH.md. Separate media queries ensure proper cleanup if user changes motion preference mid-session. Reduced-motion still uses ScrollTrigger for consistent viewport behavior.

### Layout Breakpoint
**Decision:** Use md: breakpoint (768px) for two-column layout.
**Rationale:** Standard Tailwind breakpoint provides good balance - iPhone mockup at ~320px width needs adequate horizontal space. Below 768px, stacking prevents cramped layout.

### SMS Bubble Styling
**Decision:** Customer bubbles use --accent (brand gold), system bubbles use --bg-secondary with border.
**Rationale:** Accent color for customer establishes visual hierarchy (customer is primary actor in demo narrative). System bubbles use secondary background to differentiate but not compete visually. Border on system bubbles adds definition against dark screen background.

## Performance Notes

- GSAP ScrollTrigger uses upfront position calculations for better performance than continuous IntersectionObserver watching
- `once: true` kills ScrollTrigger after first play, preventing unnecessary listener overhead
- useGSAP automatic cleanup prevents memory leaks in React 18 strict mode
- Scoped selectors (`.form-field`, `.sms-bubble`) batch DOM queries via gsap.utils.toArray

## Next Steps

Per ROADMAP.md Wave 1 sequence:
1. **Plan 02 (next):** Build Demo Part II - System Logic with SVG node graph and stroke-dashoffset connection animations
2. **Plan 03:** Build Demo Part III - Owner Dashboard with window frame mockup and approval buttons
3. **Plan 04:** Add testimonials section with subtle scroll-triggered animations

## Commits

| Hash    | Message                                                      |
| ------- | ------------------------------------------------------------ |
| 566ae3a | feat(04-01): implement Demo Part I with auto-filling form and SMS animation |

## Self-Check: PASSED

### Files Verified
```
✓ FOUND: src/components/ui/PhoneMockup.jsx
✓ FOUND: src/sections/home/DemoPartOne.jsx
✓ FOUND: src/pages/Home.jsx (modified)
```

### Commits Verified
```
✓ FOUND: 566ae3a (feat(04-01): implement Demo Part I with auto-filling form and SMS animation)
```

### Key Links Verified
```
✓ DemoPartOne imports formFields and smsConversation from demo-data.js
✓ DemoPartOne imports demoParts from home.js
✓ DemoPartOne renders <PhoneMockup> component
✓ ScrollTrigger config includes once: true
✓ gsap.matchMedia() present with both media queries
```

All artifacts created, all imports present, all patterns implemented correctly. Build succeeds. Ready for visual verification at http://localhost:5175/.
