# Pitfalls Research: React Website Redesign with GSAP Demos

## Critical Pitfalls

### 1. GSAP Memory Leaks in React (Severity: HIGH)

**The problem:** GSAP animations and ScrollTrigger instances persist after React component unmount if not properly cleaned up. This causes memory leaks, ghost animations, and scroll position bugs.

**Warning signs:**
- Animations fire on unmounted components
- Console warnings about updating unmounted components
- Scroll position jumps after navigating away and back
- Performance degrades over time

**Prevention:**
- Use `@gsap/react` `useGSAP()` hook — it auto-cleans ScrollTrigger instances
- Never create animations outside of `useGSAP` or `useEffect` with cleanup
- Test by navigating away and back to the page — animations should restart cleanly

**Phase:** 3 (Demo implementation) and 4 (Cleanup verification)

---

### 2. ScrollTrigger Pinning Breaks Layout (Severity: HIGH)

**The problem:** `pin: true` takes an element out of document flow and creates a spacer div. This commonly breaks:
- Elements below the pinned section jump
- Flex/grid containers miscalculate heights
- Other ScrollTrigger instances get confused about scroll positions

**Warning signs:**
- Content jumps when entering/leaving pinned section
- Gap appears above or below pinned section
- Other scroll-triggered animations fire at wrong positions

**Prevention:**
- Pin a wrapper div, not the content div directly
- Set `pinSpacing: true` (default) — don't override unless you know why
- Call `ScrollTrigger.refresh()` after any layout changes
- Give pinned container explicit `min-height` matching expected scroll distance
- Test with `markers: true` during development to visualize trigger points

**Phase:** 3 (Demo Part II specifically)

---

### 3. Mobile Touch Scroll + ScrollTrigger (Severity: HIGH)

**The problem:** Scroll-scrubbing feels terrible on touch devices. iOS has momentum scrolling that fights scrub. Android has inconsistent scroll event timing. Users expect swipe = fast movement, not slow scrubbed animation.

**Warning signs:**
- Animation feels laggy/jerky on phones
- Users scroll past the section without seeing the animation
- Pinned section feels "stuck" — users think the page is broken

**Prevention:**
- Detect touch: `ScrollTrigger.isTouch` (0 = no touch, 1 = touch only, 2 = touch + pointer)
- On touch devices: replace scrub with auto-play timeline triggered on viewport entry
- Use `anticipatePin: 1` to reduce pin jump on mobile
- Test on REAL devices, not just Chrome DevTools mobile view

**Phase:** 3 (implementation) and 4 (mobile QA)

---

### 4. Breaking Protected Pages During Redesign (Severity: HIGH)

**The problem:** CSS changes (new design tokens, reset styles, Tailwind config changes) can cascade into Audit.jsx, breaking form styling, Calendly embed, or Formspree submission.

**Warning signs:**
- Form fields change appearance unexpectedly
- Calendly embed styling breaks (wrong colors, broken layout)
- Formspree submission stops working (usually a form `name` or `action` issue)
- Step navigation breaks

**Prevention:**
- After EVERY CSS/Tailwind change, verify Audit page:
  1. All form fields render correctly
  2. Step navigation works (next/back)
  3. Submit form → check Formspree receives data
  4. Calendly embed loads with correct theming
- Consider scoping new styles to avoid cascading into Audit
- Run Audit check as part of each phase verification

**Phase:** 2 (design tokens), 4 (end-to-end test), and after every merge

---

## Moderate Pitfalls

### 5. Glassmorphism Performance (Severity: MEDIUM)

**The problem:** `backdrop-filter: blur()` is GPU-intensive. Multiple overlapping blur layers on a page cause frame drops, especially on:
- Older mobile devices
- Low-end Chromebooks
- Firefox (historically slower blur implementation)

**Warning signs:**
- Scroll jank when glassmorphic elements are visible
- GPU memory spikes in DevTools
- FPS drops below 30 on mobile

**Prevention:**
- Limit to 2-3 glassmorphic elements visible simultaneously
- Use `will-change: transform` on blur containers (but remove when not animating)
- Reduce blur radius (8-12px is usually enough, 20px+ is expensive)
- Test on a mid-range phone (not just flagship)

**Phase:** 2 (design system) and 4 (performance audit)

---

### 6. SVG Animation Performance (Severity: MEDIUM)

**The problem:** Animating SVG stroke-dashoffset for connection lines is elegant but can cause jank if:
- SVG paths are complex (many points)
- Multiple paths animate simultaneously
- SVG is large and re-rendering frequently

**Warning signs:**
- Choppy line drawing animation
- DevTools shows paint/layout thrashing during SVG animation

**Prevention:**
- Keep SVG paths simple (straight lines and curves, not complex shapes)
- Use `will-change: stroke-dashoffset` on animated paths
- Animate with GSAP (GPU-accelerated) not CSS transitions
- Set `vector-effect: non-scaling-stroke` for consistent stroke width

**Phase:** 3 (Demo Part II)

---

### 7. Content-Design Misalignment (Severity: MEDIUM)

**The problem:** Writing content and designing simultaneously leads to:
- Copy that doesn't fit the layout
- Sections that feel forced because content was retrofitted
- Constant rework as copy changes break visual rhythm

**Warning signs:**
- "Can we make this headline shorter?" during design phase
- Sections with wildly different content density
- Copy feels like placeholder text even though it's "final"

**Prevention:**
- Phase 1 is ALL content — this is already the plan
- Content approval happens before ANY design work
- Demo scripts (exact SMS messages, form fields, dashboard numbers) finalized in Phase 1
- Content docs include character counts and line limits

**Phase:** 1 (this is the entire point of content-first)

---

### 8. Animation Overload (Severity: MEDIUM)

**The problem:** Every section has "entrance animations" and the page feels like a PowerPoint presentation. The premium sites this project references (Linear, Stripe, Vercel) are actually quite restrained — most content is simply THERE, with animation reserved for the focal points.

**Warning signs:**
- Every section fades in from below
- Scrolling feels slow because you're waiting for animations
- Users start scrolling past animations before they finish

**Prevention:**
- Reserve animation for:
  - Hero entrance (first impression)
  - Demo sections (the centerpiece)
  - Counters/stats (inherently animated)
- Static sections (Problem, Reframe, Solution, CTA) can simply BE there
- If animating entrance: use IntersectionObserver with 0.1 threshold, play once, 300ms max duration
- Test: cover the screen, scroll, uncover — if you're waiting for animations, there are too many

**Phase:** 2 (static sections) and 4 (animation audit)

---

### 9. Responsive Retrofit (Severity: MEDIUM)

**The problem:** Building desktop-first then "making it responsive" always results in:
- Cramped mobile layouts
- Broken demo sections on small screens
- Font sizes that don't scale well

**Prevention:**
- Use Tailwind's mobile-first approach (base = mobile, `md:` = tablet, `lg:` = desktop)
- Design token scale should work at all breakpoints (use rem/em, not px for most values)
- Demo Part II (node graph) needs an explicit mobile layout — it can't just shrink
- Test at 375px width during development, not just as a final pass

**Phase:** 2 through 4 (ongoing, not just Phase 4)

---

### 10. Font Loading Flash (Severity: LOW)

**The problem:** Custom fonts (Inter) cause FOUT (flash of unstyled text) or FOIT (flash of invisible text) if not loaded properly.

**Prevention:**
- Self-host Inter (don't rely on Google Fonts CDN)
- Use `font-display: swap` in @font-face
- Preload the primary weight (400) and bold (700) in `<head>`
- Variable font file = one download for all weights

**Phase:** 2 (design system setup)

---
*Researched: 2026-02-10*
