# Leviathan Systems — Website Redesign

## What This Is

A complete website redesign for Leviathan Systems, repositioning from an "AI receptionist" demo site to an AI consulting agency that builds custom AI systems for businesses. The old site (Vapi call demo, loss calculator, chatbot-adjacent messaging) no longer matches the business doctrine. Everything has been rebuilt — content, design, structure — except the protected Audit/Begin/Book pages.

## Core Value

The website communicates what Leviathan Systems actually does — builds custom AI systems tailored to each business — through clear copy, authoritative design, and a compelling interactive demo that shows the system in action. Content drives everything; design serves the message.

## Current Status

**Phases 1-3: COMPLETE** — Content finalized, design system built, full homepage assembled and polished (Hero, Problem bento grid, Reframe + CPU, Pillars, Testimonials, FAQ, CTA). All sections mobile-responsive. Doctrine-aligned.

**Phase 4: Interactive Demos — NEXT** — The three-part cohesive demo is the centerpiece. Customer Experience, System Logic, and Owner Dashboard as one continuous experience.

**Phase 5: Polish & Ship** — Final QA, accessibility, performance, SEO.

## Context

**Business positioning:** Leviathan Systems is an AI consulting agency that builds custom AI systems for service businesses. We identify bottlenecks, design tailored solutions, and deploy systems that handle work autonomously while humans stay informed. We don't sell tools or chatbots. We deliver outcomes: speed, reliability, consistency, and captured revenue.

**Target aesthetic:** Very dark background (near-black), teal/cyan accent, Inter font family, cards with subtle borders and restrained glassmorphism, lots of breathing room, animations that feel inevitable not decorative. Premium, calm, authoritative.

**Homepage flow:**
Hero → Problem → Reframe → Demo (3-part) → Pillars → Testimonials → FAQ → CTA

## Constraints

- **Tech stack**: React 18 + Vite + Tailwind CSS v4 — no framework changes
- **Protected pages**: Audit.jsx, Begin.jsx, Book.jsx — zero form logic changes
- **Integrations**: Formspree (xbdrwznd) and Calendly (leviathanaidev) must continue working
- **Deployment**: Vercel — `npm run build` must succeed
- **Animation library**: GSAP free tier only (no paid plugins)
- **Performance**: Lighthouse > 90
- **Accessibility**: prefers-reduced-motion must show static states
- **Responsive**: 320px to 1536px

## Key Decisions

| Decision | Rationale | Status |
|----------|-----------|--------|
| Reposition from "AI receptionist" to "infrastructure/systems" | Business doctrine changed — company builds systems, not chatbots | DONE |
| Remove Vapi call demo entirely | Doesn't represent actual product offering | DONE |
| Remove loss calculator | Gimmick, not a conversion tool | DONE |
| Use GSAP for demos | ScrollTrigger needed for scroll-scrubbed animation | DECIDED |
| 5-phase divide and conquer | Content → Design → Homepage → Demos → Polish | DONE (phases 1-3) |
| Content-first approach | Nail every word of copy before touching design or code | DONE |
| 21st.dev MCP for design components | Saved components as design foundation | DONE |
| Three-part demo is ONE cohesive demo | Three perspectives of the same system — non-negotiable | DECIDED |
| Problem → Reframe narrative flow | "It's not you, it's missing infrastructure" — critical positioning | DONE |
| GlassButton over GradientButton | Frosted glass aesthetic, premium feel — user explicitly requested | DONE |
| Pillar 1 = Bottleneck Mapping | Not "Revenue Capture" — maps bottlenecks, applies systems | DONE |
| FAQ doctrine-aligned | AI consulting agency language, varied vocabulary, not lead-gen focused | DONE |
| About page deferred | Coming later — not part of initial redesign | DEFERRED |
| "What we do" section TBD | Concept vs. services distinction needs discussion | DEFERRED |

## Deferred

- "What we do" / Services section — concept vs. services distinction needs resolution
- About page — philosophy, team, mission (separate destination)
- Solution section — may merge with "what we do"

## Out of Scope

- Audit.jsx / Begin.jsx / Book.jsx form logic — protected, working
- Backend/API development — frontend redesign only
- CMS or content management — static content in code
- Chat widget / chatbot — contradicts positioning
- Pricing page — consulting, not SaaS

---
*Last updated: 2026-02-11*
