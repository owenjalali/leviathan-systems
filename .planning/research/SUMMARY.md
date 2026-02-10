# Research Summary: Leviathan Systems Website Redesign

## Stack Decision

**Keep:** React 18 + Vite + Tailwind CSS v4 + React Router DOM v7 + Lucide React
**Add:** GSAP 3.12+ with @gsap/react wrapper and ScrollTrigger plugin (~37KB gzipped)
**Remove:** @vapi-ai/web (Vapi SDK no longer needed)
**Do NOT add:** Framer Motion (redundant), Three.js (overkill), CSS-in-JS (Tailwind handles it), Next.js (SPA is fine for marketing site)

Self-host Inter font (variable file) for performance.

## Table Stakes (Must Have)

- Clear hero with value proposition above fold
- Problem/solution narrative flow
- Concrete services description
- Social proof section (even placeholder)
- Single primary CTA ("Get Your Audit")
- Mobile responsive (320px–1536px)
- Fast load (<3s), Lighthouse > 90
- SEO basics (meta, OG tags)
- Accessible (prefers-reduced-motion, WCAG AA contrast)

## Differentiators

- **Interactive 3-part product demo** — the centerpiece. Shows the system in action.
- **Scroll-driven animation** (Demo Part II) — GSAP ScrollTrigger, tied to scroll position
- **Section-specific visual moods** while maintaining coherence
- **Premium typography** — tight letter-spacing, display type hierarchy
- **Restrained glassmorphism** — subtle, not overdone
- **Animated counters and dashboard** — live-feeling stats

## Anti-Features (Don't Build)

Chat widget, pop-ups, pricing page, blog, newsletter, video autoplay, parallax backgrounds, animated cursor followers, sound.

## Architecture

- Content in dedicated `content/` directory (content-first approach)
- Homepage sections in `sections/home/` — 9 sections rendered by Home.jsx
- UI primitives in `components/ui/` — shared by all sections
- Demo sub-components in `components/demo/`
- GSAP integrated via `@gsap/react` useGSAP hook (auto-cleanup)
- ScrollTrigger scroll-scrub for Demo Part II, auto-play fallback on mobile

## Critical Watch-Outs

1. **GSAP memory leaks** — use useGSAP hook, never raw useEffect without cleanup
2. **ScrollTrigger pinning breaks layout** — pin wrapper div, use markers during dev
3. **Mobile scroll-scrub feels bad** — detect touch, fallback to auto-play
4. **Protected pages cascade** — verify Audit after every CSS change
5. **Glassmorphism performance** — limit to 2-3 blur layers simultaneously
6. **Animation overload** — reserve animation for hero + demos, let other sections breathe
7. **Content-design misalignment** — solved by content-first Phase 1

## Build Order Implication

```
Phase 1: Content (text only, no dependencies)
Phase 2: Design system → UI primitives → Static sections + Layout
Phase 3: GSAP setup → Demo I → Demo II (highest complexity) → Demo III
Phase 4: Responsive QA → Accessibility → Performance → SEO → Ship
```

This maps cleanly to the user's 5-phase request:
1. Information/Text → Phase 1
2. Design Components → Phase 2 (tokens + primitives)
3. Website Structure → Phase 2 (sections + layout) + Phase 3 setup
4. Demos → Phase 3
5. Polish → Phase 4

---
*Synthesized: 2026-02-10*
