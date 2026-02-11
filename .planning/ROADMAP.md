---
milestone: Website Redesign
version: 1.0.0
updated: 2026-02-11
---

# Roadmap

> **Current Phase:** 4 - Interactive Demos
> **Status:** planning

## Must-Haves (from SPEC)

- [x] All homepage copy finalized
- [x] Design system built
- [x] Homepage assembled and polished
- [ ] Three-part cohesive demo
- [ ] Production-ready polish

---

## Phases

### Phase 1: Content & Cleanup
**Status:** ✅ Complete
**Objective:** Nail every word of copy and clean the codebase.
**Requirements:** COPY-01 through COPY-10, CLEAN-01 through CLEAN-06

Finalized all copy (`home.js`, `demo-data.js`), removed old components/hooks/pages (Vapi, calculator, old demos), swapped `@vapi-ai/web` for `gsap` + `@gsap/react`, cleaned `index.css`.

---

### Phase 2: Design System & Components
**Status:** ✅ Complete
**Objective:** Build the visual language using 21st.dev saved components as foundation.
**Requirements:** DESGN-01 through DESGN-05
**Depends on:** Phase 1

Built design tokens (CSS variables), self-hosted Inter variable font. Created UI components: SectionWrapper, BackgroundPaths, BackgroundBeams, GlassButton, CpuArchitecture, BentoGrid, FeatureCard, Timeline, MarqueeTrack, TestimonialCard, PulseBeams. Navbar with scroll-aware behavior. Footer.

---

### Phase 3: Homepage Assembly & Polish
**Status:** ✅ Complete
**Objective:** Assemble the full homepage, iterate on visual quality based on user feedback.
**Requirements:** HOME-01 through HOME-06, LAYOUT-01 through LAYOUT-03
**Depends on:** Phase 2

Assembled full homepage flow: Hero, Problem (bento grid), Reframe (CPU diagram), Demo intro, Pillars (doctrine-aligned), Testimonials, FAQ (6 accordion items), CTA. Iterated on: glass buttons, pillar naming/illustrations, FAQ doctrine alignment, mobile responsiveness, CPU visual visibility.

---

### Phase 4: Interactive Demos
**Status:** 🔄 In Progress
**Objective:** Build the three-part cohesive demo — the centerpiece of the site.
**Requirements:** DEMO-01 through DEMO-05
**Depends on:** Phase 3

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

**Plans:**
- [ ] Plan 4.1: TBD

---

### Phase 5: Polish & Ship
**Status:** ⬜ Not Started
**Objective:** Production-ready. Every pixel, every device, every edge case.
**Requirements:** POLISH-01 through POLISH-06
**Depends on:** Phase 4

**What gets built/verified:**
- Responsive QA across full range (320px to 1536px)
- Accessibility audit (prefers-reduced-motion, contrast, focus states)
- Performance optimization (lazy loading demos, Lighthouse > 90)
- SEO meta tags and OG tags
- Build verification
- End-to-end Audit page test (form to Formspree to Calendly)

**Success criteria:**
1. Lighthouse performance > 90
2. All sections render correctly at 320px, 375px, 768px, 1024px, 1280px, 1536px
3. prefers-reduced-motion shows static content (no animations)
4. `npm run build` succeeds with no warnings
5. Audit page: form submits to Formspree, Calendly loads correctly
6. OG tags render proper preview when URL shared
7. No console errors on any page

---

## Progress Summary

| Phase | Status | Complete |
|-------|--------|----------|
| 1 | ✅ | Done |
| 2 | ✅ | Done |
| 3 | ✅ | Done |
| 4 | 🔄 | Planning |
| 5 | ⬜ | — |

**Coverage:** 32 total requirements / 21 complete / 11 remaining
