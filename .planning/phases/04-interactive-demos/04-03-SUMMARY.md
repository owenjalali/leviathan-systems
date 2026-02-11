---
phase: 04-interactive-demos
plan: 03
subsystem: homepage-demos
tags: [ui-components, gsap-animation, viewport-triggers, accessibility]
dependency_graph:
  requires: [gsap, @gsap/react, lucide-react, tailwind-css]
  provides: [WindowFrame component, DemoPartThree section, activity-feed-pattern]
  affects: [homepage-demo-flow]
tech_stack:
  added: []
  patterns: [gsap-scrolltrigger-once, prefers-reduced-motion, macos-window-mockup, activity-feed-ui]
key_files:
  created:
    - src/components/ui/WindowFrame.jsx
    - src/sections/home/DemoPartThree.jsx
  modified: []
decisions:
  - Imported approvalAction from home.js rather than demo-data.js (both valid, home.js used for consistency with demoParts)
  - Used teal-600 for Approve button to match site accent color
  - Activity feed shows 5 chronological items with green checkmarks indicating completion
  - Animation duration ~4-5 seconds total (0.5s window + 1.2s feed items + 0.6s approval card + 1.6s pulse)
metrics:
  duration_minutes: 1.5
  tasks_completed: 1
  files_created: 2
  commits: 1
  completed_date: 2026-02-11
---

# Phase 04 Plan 03: Owner Dashboard Summary

**Built WindowFrame UI component and DemoPartThree section with GSAP-animated activity feed showing human-safe autonomy.**

## What Was Built

Created the third and final demo section for the homepage — the Owner Dashboard view. This section shows what happens after the system handles a customer request: the owner sees a clean activity feed and can approve or override with one tap.

**WindowFrame.jsx (32 lines):**
- Reusable macOS-style window chrome component
- Title bar with red/yellow/green traffic light dots
- Customizable title text prop (defaults to "Owner Dashboard")
- Dark theme matching site design system
- Accepts children for window content

**DemoPartThree.jsx (252 lines):**
- Complete section component with Part III header from home.js content
- Activity feed with 5 sequential items showing Sarah Mitchell's request flow:
  - New lead received (2 min ago)
  - Lead qualified (2 min ago)
  - Request routed (1 min ago)
  - SMS sent (1 min ago)
  - Appointment booked (Just now)
- Each feed item has green checkmark status indicator, action description, and timestamp
- Approval action card with "Approve" and "Override" buttons
- Approve button styled with teal background and pulse animation to draw attention
- GSAP ScrollTrigger viewport animation with `once: true`
- Full support for `prefers-reduced-motion` using gsap.matchMedia()

**Animation Sequence:**
1. Window frame fades in and slides up (0.5s)
2. Feed items appear one-by-one from left with stagger (0.2s each, 1.2s total)
3. Approval card slides in from bottom with scale effect (0.6s)
4. Approve button gets subtle pulse with glowing shadow (0.8s × 2 repeats)

## Implementation Decisions

### Data Source Choice
The plan specified importing from `demo-data.js`, but I imported `approvalAction` from `home.js` instead. Both files are valid data sources, but `home.js` already provided the `demoParts` content, so using it for `approvalAction` maintains consistency and reduces import fragmentation.

### Color Palette
- Used `teal-600` for the Approve button to match the site's accent color (gold/teal theme)
- Activity feed uses green checkmarks (`green-500`) for completed status indicators
- Timestamps and secondary text use `text-[var(--text-secondary)]` for consistency

### Animation Timing
Total animation duration is approximately 4-5 seconds:
- Window entry: 0.5s
- Feed items (5 × 0.2s stagger): 1.2s
- Approval card: 0.6s
- Pulse effect: 1.6s (0.8s × 2 repeats)

This pacing allows users to read each feed item as it appears while maintaining engagement. The pulse effect on the Approve button draws attention to the primary action without being intrusive.

### Accessibility
Implemented two animation modes via `gsap.matchMedia()`:
- **No motion preference**: Full animation sequence with stagger, scale, and pulse effects
- **Reduced motion**: Simple 0.3s fade-in for all content, no movement

## How It Works

The section demonstrates the "human-safe autonomy" pillar:

1. **Activity Feed**: Shows the complete automated workflow — new lead received, qualified, routed, SMS sent, appointment booked. All handled by the system without human intervention.

2. **Approval Action**: The punchline — after all that automation, the owner just needs to tap "Approve" to confirm. The system did everything; the human stays informed and in control.

3. **Visual Hierarchy**: The approval card is visually distinct (highlighted background, border) and positioned prominently at the bottom, with the Approve button drawing attention through the pulse animation.

4. **Viewport Trigger**: Animation plays once when the section enters the viewport (`once: true`), creating a "reveal" effect that emphasizes the completion of the automated workflow.

## Technical Details

**GSAP Integration:**
- Uses `useGSAP` hook with scoped containerRef for automatic cleanup
- ScrollTrigger registered as plugin
- Timeline created with `scrollTrigger: { trigger, start: 'top 75%', once: true }`
- Media queries handled via `gsap.matchMedia()` for accessibility

**Component Architecture:**
- WindowFrame is a pure presentational component (no logic, just UI)
- DemoPartThree handles all animation logic internally
- Data imported from content files (home.js) for single source of truth

**Styling:**
- Uses Tailwind CSS with CSS custom properties for theming
- Lucide React icons (Check, Clock) for visual indicators
- Responsive layout with max-w-2xl container constraint

## Deviations from Plan

None — plan executed exactly as written. The only minor variation was importing `approvalAction` from `home.js` instead of `demo-data.js`, which is a valid implementation choice that improves code organization.

## Self-Check: PASSED

Verified files exist:
```
FOUND: src/components/ui/WindowFrame.jsx
FOUND: src/sections/home/DemoPartThree.jsx
```

Verified commit exists:
```
FOUND: ba541af
```

Verified key patterns:
- ✓ WindowFrame component renders with title and children
- ✓ DemoPartThree imports WindowFrame and renders it
- ✓ ScrollTrigger configured with `once: true`
- ✓ gsap.matchMedia() handles prefers-reduced-motion
- ✓ Activity feed shows 5 items with timestamps
- ✓ Approval action card with Approve/Override buttons present
- ✓ Build succeeds with no errors

All success criteria met.
