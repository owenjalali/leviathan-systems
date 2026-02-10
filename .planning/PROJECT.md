# Leviathan Systems — Website Redesign

## What This Is

A complete website redesign for Leviathan Systems, repositioning from an "AI receptionist" demo site to an AI consulting agency that builds business infrastructure. The current site (Vapi call demo, loss calculator, chatbot-adjacent messaging) no longer matches the business doctrine. Everything gets rebuilt — the content, the design, the structure, the demos — except the Audit page form logic, Begin page, and Book page.

## Core Value

The website must communicate what Leviathan Systems actually does — builds automated infrastructure for service businesses — through clear copy, authoritative design, and a compelling interactive demo that shows the system in action. Content drives everything; design serves the message.

## Requirements

### Validated

- ✓ Audit page multi-step form with Formspree submission (xbdrwznd) — existing, protected
- ✓ Audit page Calendly integration (leviathanaidev) — existing, protected
- ✓ Begin page booking flow — existing, protected
- ✓ Book page Calendly embed — existing, protected
- ✓ React 18 + Vite + Tailwind CSS v4 stack — existing
- ✓ React Router DOM v7 routing — existing
- ✓ Vercel deployment — existing
- ✓ Dark theme design direction — existing

### Active

- [ ] All homepage copy (hero, problem, reframe, demo scripts, testimonials, CTA)
- [ ] Design system using 21st.dev saved components (heroes, CTAs, testimonials, scroll animations, buttons)
- [ ] Shared UI primitives (SectionWrapper, GlowOrb, AnimatedText, GridOverlay)
- [ ] Homepage sections (Hero, Problem, Reframe, Testimonials, CTA)
- [ ] MainLayout update (nav, footer)
- [ ] Audit page visual refresh (CSS-only — colors, typography, spacing)
- [ ] Three-part cohesive demo (one demo, three perspectives):
  - Demo Part I: Customer Experience (auto-fill form, SMS phone mockup)
  - Demo Part II: System Logic (GSAP ScrollTrigger, node graph, SVG animations)
  - Demo Part III: Owner Dashboard (three-rail layout, animated counters)
- [ ] Responsive design (320px → 1536px)
- [ ] Accessibility (prefers-reduced-motion → static states)
- [ ] Performance optimization (lazy loading, GPU transforms)
- [ ] SEO (meta tags, OG tags)
- [ ] Old code removal (Vapi, calculator, old components/hooks)

### Deferred (Discuss Later)

- "What we do" / Services section — difference between concept vs. what we provide needs resolution
- About page — separate destination for philosophy/team/mission, coming later
- Solution section — may merge with or become "what we do", needs discussion

### Out of Scope

- Audit.jsx form logic changes — protected, working, must not break
- Begin.jsx logic changes — protected
- Book.jsx logic changes — protected
- Backend/API development — frontend redesign only
- CMS or content management — static content in code
- User accounts or authentication — not applicable
- E-commerce or payments — not applicable
- Blog or content publishing — not applicable
- Chat widget / chatbot — contradicts "infrastructure not chatbot" positioning
- Pricing page — consulting, not SaaS; custom scoping via audit

## Context

**Business positioning:** Leviathan Systems is an automation company that builds revenue-critical systems for service businesses. Core belief: time leakage equals revenue leakage. The company designs and implements automated systems that handle inbound demand end-to-end — respond instantly, qualify leads, route correctly, book appointments.

**Current site problems:**
- "AI receptionist" framing is wrong — the company builds infrastructure, not chatbots
- Vapi call demo doesn't represent the actual product
- Loss calculator was a gimmick, not a conversion tool
- 78% stat and chatbot messaging don't match the doctrine
- Design is functional but not premium enough for the positioning

**Design direction studied from:**
- Linear — near-black bg, Inter font, enterprise minimalism, gradient text
- Stripe — modular cards, concrete metrics, progressive disclosure
- Vercel — dark theme, card-based features, minimalist clarity
- Kavalsia — teal on black, bold headings, aggressive modern tech
- Notion — bento card grid, negative space, clean CTAs
- GitHub — themed sections, gradient overlays, content hierarchy

**Target aesthetic:** Very dark background (near-black), teal/cyan accent, Inter font family, cards with subtle borders and restrained glassmorphism, lots of breathing room, animations that feel inevitable not decorative. Premium, calm, authoritative.

**Homepage flow (confirmed):**
Hero → Problem → Reframe → [TBD: Solution/"What We Do" — discuss later] → Demo (3-part cohesive: Customer → System Logic → Owner Dashboard) → Testimonials → Final CTA

**Key narrative insight (confirmed):** The Problem → Reframe flow is critical. Reframe shifts blame from the business owner to the absence of infrastructure. "It's not you, it's missing infrastructure." This is the positioning play that makes Leviathan's offering feel inevitable, not optional.

**Brand voice:** Calm, authoritative, restrained. Outcome-focused not feature-focused. No tech jargon. No urgency tactics.

**Existing dependencies to remove:** @vapi-ai/web
**New dependencies to add:** gsap (free tier, for ScrollTrigger and timeline orchestration)

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

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Reposition from "AI receptionist" to "infrastructure" | Business doctrine changed — company builds systems, not chatbots | — Pending |
| Remove Vapi call demo entirely | Doesn't represent actual product offering | — Pending |
| Remove loss calculator | Gimmick, not a conversion tool | — Pending |
| Use GSAP for demos | ScrollTrigger needed for scroll-scrubbed animation, timeline for orchestration | — Pending |
| 5-phase divide and conquer | User-specified: (1) Text, (2) Design, (3) Structure, (4) Demos, (5) Polish | — Pending |
| Content-first approach | Nail every word of copy before touching design or code | — Pending |
| Discussion before each phase | Deep one-on-one via /gsd:discuss-phase before any phase work | — Pending |
| 21st.dev MCP for design components | User has saved heroes, CTAs, testimonials, buttons, scroll animations — use as design foundation to avoid "vibe-coded" look | — Pending |
| Three-part demo is ONE cohesive demo | Three perspectives of the same system (customer, logic, owner) — non-negotiable | — Pending |
| Problem → Reframe confirmed | "It's not you, it's missing infrastructure" — critical positioning play | — Pending |
| About page deferred | Coming later — philosophy/team/mission, not part of initial homepage redesign | — Pending |
| "What we do" section TBD | Concept vs. services distinction needs more discussion | — Pending |
| Execution model: Claude plans, Codex executes | Plans must be extremely detailed for Codex handoff | — Pending |

---
*Last updated: 2026-02-10 after questioning refinement*
