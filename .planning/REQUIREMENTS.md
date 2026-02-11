# Requirements: Leviathan Systems Website Redesign

**Defined:** 2026-02-10
**Core Value:** Communicate what Leviathan Systems does through clear copy, authoritative design, and a compelling interactive demo.

## Completed Requirements (Phases 1-3)

All 21 requirements below are done. Details in `completed/` folder.

- **COPY-01 to COPY-10** — All homepage copy finalized (hero, problem, reframe, demo intro, testimonials, CTA, nav/footer)
- **CLEAN-01 to CLEAN-06** — Old code removed (Vapi, calculator, old components/hooks/pages), gsap installed, index.css cleaned
- **DESGN-01 to DESGN-05** — Design tokens, UI primitives, 21st.dev components adapted, Inter font, responsive breakpoints
- **HOME-01 to HOME-06** — All homepage sections built and polished (Hero, Problem bento grid, Reframe + CPU, Pillars, Testimonials, FAQ, CTA, section transitions)
- **LAYOUT-01 to LAYOUT-03** — MainLayout updated, mobile nav, scroll-aware header

## Active Requirements

### Three-Part Demo (Phase 4 — NEXT)

- [ ] **DEMO-01**: Demo Part I — Customer Experience: auto-filling form animation, phone mockup with SMS conversation, timed sequence on viewport entry
- [ ] **DEMO-02**: Demo Part II — System Logic: GSAP ScrollTrigger scroll-scrubbed node graph, SVG connection lines with stroke-dashoffset animation, reversible on scroll-up
- [ ] **DEMO-03**: Demo Part III — Owner Dashboard: three-rail layout (Lead Activity | Lead Status | Performance Metrics), animated counters, pipeline cards, window frame mockup
- [ ] **DEMO-04**: Mobile demo fallback — auto-play timeline on touch devices instead of scroll-scrub
- [ ] **DEMO-05**: Demo narrative flow — smooth transitions between all three parts as one cohesive experience

### Polish & Production (Phase 5)

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

**Coverage:** 32 total / 21 complete / 11 remaining (Phases 4-5)

---
*Requirements defined: 2026-02-10*
*Last updated: 2026-02-11*
