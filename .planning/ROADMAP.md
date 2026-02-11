# Roadmap: Leviathan Systems Website Redesign

**Created:** 2026-02-10
**Last updated:** 2026-02-11
**Approach:** Divide and conquer — each phase discussed before execution

---

## Completed Work (Phases 1-3)

All content, design system, and homepage assembly work is done. Details archived in `.planning/completed/`.

**Phase 1 — Content & Cleanup:** Finalized all copy (`home.js`, `demo-data.js`), removed old components/hooks/pages (Vapi, calculator, old demos), swapped `@vapi-ai/web` for `gsap` + `@gsap/react`, cleaned `index.css`.

**Phase 2 — Design System & Components:** Built design tokens (CSS variables), self-hosted Inter variable font. Created UI components: SectionWrapper, BackgroundPaths, BackgroundBeams, GlassButton, CpuArchitecture, BentoGrid, FeatureCard, Timeline, MarqueeTrack, TestimonialCard, PulseBeams. Navbar with scroll-aware behavior. Footer.

**Phase 3 — Homepage Assembly & Polish:** Assembled full homepage flow: Hero, Problem (bento grid), Reframe (CPU diagram), Demo intro, Pillars (doctrine-aligned), Testimonials, FAQ (6 accordion items), CTA. Iterated on: glass buttons, pillar naming/illustrations, FAQ doctrine alignment, mobile responsiveness, CPU visual visibility.

**21 of 32 requirements complete.**

---

## Phase 4: Interactive Demos — NEXT

**Goal:** Build the three-part cohesive demo — the centerpiece of the site.

**Requirements:** DEMO-01 through DEMO-05

**What needs to be discussed:**
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

## Phase Dependencies

```
Phases 1-3 (Content, Design, Homepage) ..... COMPLETE
  |
Phase 4 (Interactive Demos) ................ NEXT
  |
Phase 5 (Polish & Ship)
```

---
*Roadmap created: 2026-02-10*
*Last updated: 2026-02-11*
