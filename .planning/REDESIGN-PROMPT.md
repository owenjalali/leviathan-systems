# Leviathan Systems — Full Website Redesign

## Context

Leviathan Systems is repositioning from an "AI receptionist" demo site to an **AI consulting agency that builds business infrastructure**. The current website (Vapi call demo, loss calculator, chatbot-adjacent messaging) no longer matches the doctrine. Everything gets rebuilt except the Audit page logic.

This is a massive project. We're chunking it into GSD phases with **deep one-on-one conversation before each phase** to nail the details. The plan below is a roadmap — the specifics emerge from those discussions.

**Nothing from the old site is sacred** (except Audit.jsx form logic + Calendly + Formspree).

---

## Design Direction

**Reference sites studied:**
- **Linear** — near-black (#08090a), Inter font, enterprise-grade minimalism, gradient text clipping, restrained accent colors
- **Stripe** — modular cards, concrete metrics, progressive disclosure, authoritative yet approachable
- **Vercel** — dark theme, Geist typefaces, card-based features, minimalist clarity
- **Kavalsia** — teal (#00b482) on black, Inter Tight bold headings, aggressive modern tech
- **Notion** — bento card grid, abundant negative space, clean CTAs
- **GitHub** — themed sections, gradient overlays, clear content hierarchy

**Direction for Leviathan:**
- Very dark background (near-black)
- Teal/cyan accent (engineered, not flashy)
- Inter font family, tight letter-spacing for headings
- Cards with subtle borders and glassmorphism (restrained)
- Lots of breathing room — let sections breathe
- Animations that feel inevitable, not decorative
- Premium, calm, authoritative — "of course this is how it works"

---

## Website Structure

```
Hero
  → Problem / Why You Should Care
    → Reframe (it's not you, it's missing infrastructure)
      → Solution / What We Do + How We Work
        → Demo Part I: Customer Experience
          → Demo Part II: System Logic (scroll-driven)
            → Demo Part III: Owner Dashboard
              → Social Proof (placeholder testimonials)
                → Final CTA
```

**Other pages:**
- About — real content (positioning, philosophy, three pillars)
- Audit — visual refresh only (form logic UNTOUCHED)
- Book — keep as-is or visual refresh

---

## Phase Breakdown (4 Major Phases)

Each phase starts with `/gsd:discuss-phase` — we talk through every detail before anything gets built.

### Phase 1: Foundation + Content
**Goal:** Clean slate. Nail every word of copy before touching design.

**What happens:**
1. Remove ALL old code (Vapi, calculator, old components, old hooks)
2. Install GSAP, set up project structure
3. **Write all homepage copy** — every headline, subheadline, description, CTA
4. **Write About page copy**
5. Write demo sequence scripts (exact SMS messages, form fields, dashboard data)
6. Update nav structure and routing

**This is where we TALK the most.** Content drives everything. We discuss:
- Hero headline and value proposition
- Problem section messaging (what replaces the 78% stat)
- Reframe section narrative
- Solution section — how to present the 5 infrastructure types simply
- Demo scripts — exact form data, SMS conversation, dashboard numbers
- CTA copy and tone
- About page positioning

**Protected:** Audit.jsx `calculatorResults` dependency removed (calculator is gone), hero simplified to single state. Zero form logic changes.

---

### Phase 2: Design System + Static Sections
**Goal:** Make it beautiful. Build the visual language, implement all non-interactive sections.

**What happens:**
1. Design tokens (colors, typography scale, spacing, borders)
2. Shared UI primitives (SectionWrapper, GlowOrb, AnimatedText, GridOverlay)
3. Build Hero section
4. Build Problem section
5. Build Reframe section
6. Build Solution / How We Work section
7. Build Testimonials section (placeholder content)
8. Build Final CTA section
9. Build About page
10. Audit.jsx visual refresh (colors, typography, spacing only)
11. MainLayout update (nav, footer)

**We discuss:** Color palette refinement, typography scale, card patterns, animation style, section transitions, responsive breakpoints. This is where 21st.dev components get incorporated if shared.

---

### Phase 3: Interactive Demos
**Goal:** Build the 3-part animated demo — the centerpiece of the site.

**What happens:**
1. Demo Part I: Customer Experience
   - Auto-filling form animation (fields type character-by-character)
   - Phone mockup with SMS conversation sequence
   - Timed sequence, plays once on viewport entry
2. Demo Part II: System Logic (HIGHEST COMPLEXITY)
   - GSAP ScrollTrigger scroll-scrubbed animation
   - Node graph: New Lead → Qualification → Branch → Follow-Up/Quote → Feedback Loop → Review
   - SVG connection lines animated via stroke-dashoffset
   - Reversible on scroll-up, auto-play fallback on mobile
3. Demo Part III: Owner Dashboard
   - Three-rail layout (Lead Activity | Lead Status | Performance Metrics)
   - Animated counters, pipeline card transitions, live-feeling updates
   - Window frame mockup

**We discuss:** Animation timing, easing, mobile behavior, what data to show, how each part transitions into the next.

---

### Phase 4: Polish, Performance & Ship
**Goal:** Production-ready. Every pixel, every device, every edge case.

**What happens:**
1. GSAP cleanup and memory leak prevention
2. Reduced motion accessibility (`prefers-reduced-motion` → static states)
3. Lazy loading demo components below fold
4. Responsive QA (320px → 1536px)
5. Audit form end-to-end test (Formspree + Calendly)
6. SEO meta tags, OG tags
7. `npm run build` verification
8. Lighthouse performance audit
9. Final CSS cleanup (remove unused animations)

---

## What Gets Removed

| File | Why |
|------|-----|
| `src/components/LossCalculator.jsx` | Calculator removed per user decision |
| `src/components/VapiCallButton.jsx` | Vapi demo removed — no "AI receptionist" |
| `src/components/DemoSection.jsx` | Vapi orchestrator — gone |
| `src/components/LiveMonitorTerminal.jsx` | Vapi terminal — gone |
| `src/components/AnimatedStats.jsx` | Old stats — rebuilding fresh |
| `src/components/SystemDiagram.jsx` | Old diagram — rebuilding fresh |
| `src/hooks/useLiveMonitor.js` | n8n polling — no longer needed |
| `src/hooks/useVapiCall.js` | Vapi SDK — no longer needed |
| `src/pages/Infrastructure.jsx` | Old page — content moves to About |
| `@vapi-ai/web` dependency | Vapi SDK removed |

## What Gets Added

| Dependency | Why |
|------------|-----|
| `gsap` (free tier) | ScrollTrigger for Part II scroll-scrubbed animation, timeline orchestration for Parts I & III |

---

## What's PROTECTED

**Audit.jsx** — form fields, validation logic, Formspree submission (`xbdrwznd`), Calendly integration (`leviathanaidev`), step flow, session ID linking. Visual refresh ONLY (colors, typography, spacing, card styling).

**Begin.jsx** — currently redirects to /audit. Keep as-is.

**Book.jsx** — Calendly embed. Keep or visual refresh only.

---

## Key Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| GSAP ScrollTrigger + React pinning | High | Prototype early in Phase 2 foundation |
| Breaking Audit.jsx | High | CSS-only changes, test Formspree + Calendly after |
| Demo perf on mobile | Medium | GPU-only transforms, lazy load, reduced-motion fallback |
| Scroll-scrub on touch devices | Medium | Auto-play fallback using `ScrollTrigger.isTouch` |
| Content/copy misalignment | Medium | Phase 1 is ALL content — nail it before design |

---

## Verification (After Each Phase)

1. `npm run dev` — no console errors
2. Visual check at 375px and 1280px
3. Audit page: submit form → Formspree receives → Calendly loads

**Final ship check:**
- `npm run build` succeeds
- All homepage sections render
- Demo Part II scroll-scrub on desktop, auto-play on mobile
- Audit form end-to-end works
- `prefers-reduced-motion` shows static states
- Lighthouse > 90

---

## GSD Workflow

This plan becomes PROJECT.md + REQUIREMENTS.md + ROADMAP.md via `/gsd:new-project`.

**Critical:** Each phase starts with `/gsd:discuss-phase N` for deep one-on-one conversation. The roadmap is the skeleton. The discussions are the meat.

**21st.dev MCP:** Not connected yet. When available, component references get incorporated into Phase 2 design work.

---

## User's Phase Division (5 Phases)

The user explicitly requested this division:

1. **Information/Text** — What will the text be on the website? What information will we display about Leviathan Systems? Just text, nothing else.
2. **Design Components** — The visual design system, UI components, and design tokens.
3. **Website Structure** — Building the actual page structure and layout with the content and components.
4. **Demos** — The interactive 3-part demo sequence (customer experience, system logic, owner dashboard).
5. **Beautification/Polish** — Smoothing out rough edges, performance, accessibility, responsive QA.
