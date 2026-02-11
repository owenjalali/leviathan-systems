# Requirements: Leviathan Systems Website Redesign

**Defined:** 2026-02-10
**Core Value:** Communicate what Leviathan Systems does through clear copy, authoritative design, and a compelling interactive demo.

## Requirements

### Content & Copy

- [ ] **COPY-01**: Homepage hero — headline, subheadline, primary CTA
- [ ] **COPY-02**: Problem section — messaging that replaces the 78% stat, speaks to business owner pain
- [ ] **COPY-03**: Reframe section — "it's not you, it's missing infrastructure" narrative
- [ ] **COPY-04**: Demo section intro copy — what the visitor is about to see
- [ ] **COPY-05**: Demo Part I script — exact form field data, SMS conversation messages
- [ ] **COPY-06**: Demo Part II script — node labels, connection descriptions, what each workflow step does
- [ ] **COPY-07**: Demo Part III script — dashboard numbers, metric labels, pipeline data
- [ ] **COPY-08**: Testimonials section — placeholder structure with realistic content
- [ ] **COPY-09**: Final CTA section — closing copy and call to action
- [ ] **COPY-10**: Nav items and footer content

### Design System

- [ ] **DESGN-01**: Design tokens — colors, typography scale, spacing, borders, shadows
- [ ] **DESGN-02**: UI primitives — SectionWrapper, Card, Button variants, GlowOrb, AnimatedText
- [ ] **DESGN-03**: 21st.dev component selection — review saved heroes, CTAs, testimonials, scroll animations, buttons and select/adapt for Leviathan
- [ ] **DESGN-04**: Typography — self-hosted Inter variable font, heading/body/caption scale
- [ ] **DESGN-05**: Responsive breakpoints — mobile-first: base → md (768) → lg (1024) → xl (1280)

### Homepage Sections

- [ ] **HOME-01**: Hero section — headline, subheadline, CTA, background treatment
- [ ] **HOME-02**: Problem section — pain points, visual treatment
- [ ] **HOME-03**: Reframe section — repositioning narrative, visual treatment
- [ ] **HOME-04**: Testimonials section — placeholder testimonials with proper structure
- [ ] **HOME-05**: Final CTA section — closing pitch, action button
- [ ] **HOME-06**: Section transitions — how sections flow into each other visually

### Layout & Navigation

- [ ] **LAYOUT-01**: MainLayout — updated nav (simplified), footer
- [ ] **LAYOUT-02**: Mobile navigation — hamburger menu, smooth transitions
- [ ] **LAYOUT-03**: Scroll-aware header — blur/opacity on scroll

### Three-Part Demo (One Cohesive Demo)

- [ ] **DEMO-01**: Demo Part I — Customer Experience: auto-filling form animation, phone mockup with SMS conversation, timed sequence on viewport entry
- [ ] **DEMO-02**: Demo Part II — System Logic: GSAP ScrollTrigger scroll-scrubbed node graph, SVG connection lines with stroke-dashoffset animation, reversible on scroll-up
- [ ] **DEMO-03**: Demo Part III — Owner Dashboard: three-rail layout (Lead Activity | Lead Status | Performance Metrics), animated counters, pipeline cards, window frame mockup
- [ ] **DEMO-04**: Mobile demo fallback — auto-play timeline on touch devices instead of scroll-scrub
- [ ] **DEMO-05**: Demo narrative flow — smooth transitions between all three parts as one cohesive experience

### Cleanup & Migration

- [ ] **CLEAN-01**: Remove old components (VapiCallButton, DemoSection, LiveMonitorTerminal, LossCalculator, AnimatedStats, SystemDiagram)
- [ ] **CLEAN-02**: Remove old hooks (useVapiCall, useLiveMonitor)
- [ ] **CLEAN-03**: Remove old pages (Infrastructure.jsx, index-redesign.css, Home-redesign.jsx if exists)
- [ ] **CLEAN-04**: Remove @vapi-ai/web dependency
- [ ] **CLEAN-05**: Install gsap and @gsap/react
- [ ] **CLEAN-06**: Clean up index.css — remove unused Vapi/dashboard animations

### Polish & Production

- [ ] **POLISH-01**: Responsive QA — 320px through 1536px
- [ ] **POLISH-02**: Accessibility — prefers-reduced-motion shows static states
- [ ] **POLISH-03**: Performance — lazy load demo components, GPU-only transforms, Lighthouse > 90
- [ ] **POLISH-04**: SEO — meta tags, OG tags for social sharing
- [ ] **POLISH-05**: Build verification — `npm run build` succeeds clean
- [ ] **POLISH-06**: Protected page verification — Audit form submits to Formspree, Calendly loads

## Deferred (Discuss in Future Phases)

- **DEFER-01**: "What we do" / Services section — concept vs. services distinction unresolved
- **DEFER-02**: About page — philosophy, team, mission (separate destination, coming later)
- **DEFER-03**: Solution section — may merge with "what we do", needs discussion

## Out of Scope

| Feature | Reason |
|---------|--------|
| Audit.jsx form logic changes | Protected — working, must not break |
| Begin.jsx / Book.jsx logic | Protected |
| Backend / API development | Frontend redesign only |
| CMS / content management | Static content in code |
| Blog / content publishing | Not applicable |
| Chat widget / chatbot | Contradicts "infrastructure not chatbot" positioning |
| Pricing page | Consulting, not SaaS — custom scoping via audit |
| Video autoplay | Performance killer, mobile data concerns |
| Parallax backgrounds | Dated technique, performance issues |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| COPY-01 through COPY-10 | Phase 1 | COMPLETE |
| CLEAN-01 through CLEAN-06 | Phase 1 | COMPLETE |
| DESGN-01 through DESGN-05 | Phase 2 | COMPLETE |
| HOME-01 through HOME-06 | Phase 3 | COMPLETE |
| LAYOUT-01 through LAYOUT-03 | Phase 3 | COMPLETE |
| DEMO-01 through DEMO-05 | Phase 4 | Pending — NEXT |
| POLISH-01 through POLISH-06 | Phase 5 | Pending |

**Coverage:**
- Total requirements: 32
- Mapped to phases: 32
- Completed: 21 (Phases 1-3)
- Remaining: 11 (Phases 4-5)

---
*Requirements defined: 2026-02-10*
*Last updated: 2026-02-11*
