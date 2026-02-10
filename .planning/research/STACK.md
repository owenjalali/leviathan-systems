# Stack Research: Premium Agency Website with Interactive Demos

## Existing Stack (Keep)

| Technology | Version | Confidence | Notes |
|-----------|---------|------------|-------|
| React | 18.x | HIGH | Stable, excellent GSAP compatibility |
| Vite | 6.x | HIGH | Fast dev/build, good code splitting |
| Tailwind CSS | v4 | HIGH | Already using @tailwindcss/vite plugin |
| React Router DOM | v7 | HIGH | Routing works, no changes needed |
| Lucide React | latest | HIGH | Icon library, keep |

## Add: Animation

| Technology | Version | Confidence | Rationale |
|-----------|---------|------------|-----------|
| GSAP (free tier) | 3.12+ | HIGH | ScrollTrigger for scroll-scrubbed animations, timeline orchestration. Industry standard for premium web animation. Free tier covers all needed features (ScrollTrigger, timeline, SVG). |

**Why GSAP over alternatives:**
- **Framer Motion**: Great for React component transitions, but ScrollTrigger-style scroll scrubbing is GSAP's strength. Framer Motion's scroll API is less mature for complex multi-element orchestration.
- **Lottie**: Good for pre-rendered animations (icons, illustrations), but the demo needs programmatic control over individual elements (SVG paths, counters, form fields). GSAP gives that control.
- **CSS-only**: Not viable for scroll-scrubbed reversible animations or complex timelines.

**GSAP + React integration pattern:**
- Use `useGSAP()` hook from `@gsap/react` (official React wrapper)
- Register plugins in component: `gsap.registerPlugin(ScrollTrigger)`
- Cleanup happens automatically via useGSAP's context
- Refs for DOM elements, not querySelector

## Add: Performance

| Technology | Why | Confidence |
|-----------|-----|------------|
| React.lazy + Suspense | Lazy load demo components below fold | HIGH |
| Intersection Observer (native) | Trigger animations on viewport entry (non-GSAP sections) | HIGH |

## Do NOT Add

| Technology | Why Not |
|-----------|---------|
| Three.js / WebGL | Overkill for 2D node graph and form animations |
| Framer Motion | Redundant with GSAP; two animation libs = bundle bloat + coordination headaches |
| Styled Components / CSS-in-JS | Tailwind already handles styling |
| Next.js / Remix | Overkill — this is a marketing site, not an app. Vite SPA is fine. |
| Headless CMS | Content is static, changes infrequently. Keep in code. |
| Lottie | Demo needs programmatic control, not pre-rendered animations |

## Design System Approach

No additional library needed. Use:
- **CSS custom properties** (already in index.css `:root`) for design tokens
- **Tailwind config** for spacing/typography scale
- **React components** for UI primitives (SectionWrapper, etc.)

## Font Strategy

- **Inter** — already specified, widely available via Google Fonts or self-hosted
- Self-host for performance (avoid Google Fonts render-blocking)
- Variable font for weight flexibility without multiple file loads

## Bundle Size Considerations

| Package | Estimated Size (gzipped) |
|---------|-------------------------|
| gsap core | ~25KB |
| ScrollTrigger plugin | ~10KB |
| @gsap/react | ~2KB |
| **Total addition** | **~37KB** |

Acceptable for the functionality gained. Lazy-load demo components to defer this cost.

---
*Researched: 2026-02-10*
*Confidence: HIGH for existing stack decisions, HIGH for GSAP choice, MEDIUM for exact version numbers*
