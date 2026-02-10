# Roadmap: Leviathan Systems Website Redesign

**Created:** 2026-02-10
**Phases:** 5
**Approach:** Divide and conquer — each phase discussed before execution

## Phase 1: Content & Cleanup
**Goal:** Nail every word of copy and clean the codebase. No design, no code structure — just text and removal of old code.

**Requirements:** COPY-01 through COPY-10, CLEAN-01 through CLEAN-06

**What gets decided in discussion:**
- Hero headline and value proposition
- Problem section messaging (what replaces the 78% stat)
- Reframe narrative ("it's not you, it's missing infrastructure")
- Demo scripts — exact form data, SMS conversation, dashboard numbers
- CTA copy and tone
- Nav items

**What gets built:**
- Content constants files (home.js, demo-data.js) with all finalized copy
- Old components/hooks/pages removed
- @vapi-ai/web removed, gsap + @gsap/react installed
- index.css cleaned of unused animations

**Success criteria:**
1. Every homepage section has finalized, approved copy in content files
2. No old Vapi/calculator/demo code remains in src/
3. `npm run dev` runs without errors
4. `npm run build` succeeds
5. Audit page still works (Formspree + Calendly)

---

## Phase 2: Design System & Components
**Goal:** Build the visual language using 21st.dev saved components as foundation. Premium, not vibe-coded.

**Requirements:** DESGN-01 through DESGN-05

**What gets decided in discussion:**
- Review 21st.dev saved components (heroes, CTAs, testimonials, scroll animations, buttons)
- Select and adapt components for Leviathan's aesthetic
- Color palette refinement (teal/cyan accent on near-black)
- Typography scale (Inter variable font, heading weights, letter-spacing)
- Card patterns, glassmorphism level, border treatments
- Animation style for non-demo sections (subtle or static?)
- Responsive approach

**What gets built:**
- Design tokens (CSS variables + Tailwind config)
- Self-hosted Inter variable font
- UI primitive components (SectionWrapper, Card, Button, GlowOrb, AnimatedText, GridOverlay)
- Component library ready for sections to use

**Success criteria:**
1. Design tokens defined and applied globally
2. All UI primitives render correctly at mobile and desktop widths
3. Components match premium aesthetic (Linear/Stripe level, not generic)
4. Font loads without FOUT/FOIT
5. Build succeeds

---

## Phase 3: Website Structure & Sections
**Goal:** Assemble the homepage and layout using content (Phase 1) and components (Phase 2).

**Requirements:** HOME-01 through HOME-06, LAYOUT-01 through LAYOUT-03

**What gets decided in discussion:**
- Final section order and flow
- Section-specific visual treatments (how each section looks distinct but cohesive)
- How sections transition into each other
- Nav items and footer layout
- Whether we need any additional sections or adjustments

**What gets built:**
- Homepage with all static sections (Hero, Problem, Reframe, Testimonials, CTA)
- Placeholder slots for demo sections (Phase 4 fills these)
- MainLayout with updated nav and footer
- Mobile navigation
- Scroll-aware header

**Success criteria:**
1. Homepage renders all static sections with finalized copy
2. Demo placeholder sections exist (marked for Phase 4)
3. Navigation works on mobile and desktop
4. Header blurs/adjusts on scroll
5. Responsive at 375px and 1280px
6. Audit page unaffected
7. Build succeeds

---

## Phase 4: Interactive Demo
**Goal:** Build the three-part cohesive demo — the centerpiece of the site.

**Requirements:** DEMO-01 through DEMO-05

**What gets decided in discussion:**
- Animation timing and easing for each part
- Exact scroll distance for Part II scrub
- Mobile auto-play behavior
- How the three parts transition into each other
- What data to show in dashboard mockup
- Node graph layout and connection paths

**What gets built:**
- Demo Part I: Customer Experience (auto-fill form, SMS phone mockup)
- Demo Part II: System Logic (GSAP ScrollTrigger, node graph, SVG stroke animations)
- Demo Part III: Owner Dashboard (three-rail layout, counters, pipeline cards)
- Mobile fallback (auto-play on touch devices)
- Seamless transitions between all three parts

**Success criteria:**
1. Demo Part I plays on viewport entry with auto-filling form and SMS conversation
2. Demo Part II scroll-scrubs forward and backward on desktop
3. Demo Part II auto-plays on mobile (touch detection)
4. Demo Part III shows animated counters and pipeline data
5. All three parts feel like one continuous demo
6. No GSAP memory leaks (navigate away and back — clean restart)
7. prefers-reduced-motion shows static state
8. Build succeeds

---

## Phase 5: Polish & Ship
**Goal:** Production-ready. Every pixel, every device, every edge case.

**Requirements:** POLISH-01 through POLISH-06

**What gets decided in discussion:**
- Any final visual adjustments from live testing
- Mobile-specific tweaks
- Performance bottlenecks found during testing

**What gets built/verified:**
- Responsive QA across full range (320px → 1536px)
- Accessibility audit (prefers-reduced-motion, contrast, focus states)
- Performance optimization (lazy loading demos, Lighthouse > 90)
- SEO meta tags and OG tags
- Build verification
- End-to-end Audit page test (form → Formspree → Calendly)

**Success criteria:**
1. Lighthouse performance > 90
2. All sections render correctly at 320px, 375px, 768px, 1024px, 1280px, 1536px
3. prefers-reduced-motion shows static content (no animations)
4. `npm run build` succeeds with no warnings
5. Audit page: form submits to Formspree, Calendly loads correctly
6. OG tags render proper preview when URL shared
7. No console errors on any page

---

## Phase Dependencies

```
Phase 1 (Content & Cleanup)
  ↓ content files + clean codebase
Phase 2 (Design System)
  ↓ tokens + UI primitives
Phase 3 (Website Structure)
  ↓ assembled pages with demo placeholders
Phase 4 (Interactive Demo)
  ↓ complete homepage with demos
Phase 5 (Polish & Ship)
  → production-ready
```

Each phase MUST be discussed via `/gsd:discuss-phase N` before planning/execution.

---
*Roadmap created: 2026-02-10*
*Last updated: 2026-02-10*
