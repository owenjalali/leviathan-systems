# Phase 3: Homepage Assembly & Polish — Decisions

**Date:** 2026-02-11
**Status:** COMPLETE

## What Was Done

Phase 3 was the assembly of the full homepage using Phase 1 content and Phase 2 components, plus significant visual polish based on user feedback.

### Changes Made

1. **Hero Section**
   - Subtitle text visibility increased (`#a0a0b0` → `#c8c8d8`)
   - Supporting text bumped (`#666680` → `#8888a0`)
   - Replaced spinning `GradientButton` with frosted `GlassButton` component
   - Added subtle arrow icon with hover animation

2. **Problem Section ("You're Working Harder Than You Need To")**
   - Full redesign from 3-card row to 5-card bento grid
   - Inspired by Tailark features-8 from 21st.dev
   - Top row: 3 cards (Follow-Up, Speed, Repetition) with data-driven visuals
   - Bottom row: 2 wide cards (The Real Cost, The Pattern) — new content
   - Replaced basic SVG icons with contextual visuals (notification cards, "2h avg reply" metric, task bars, declining bar chart, loop icon)
   - Cards use ultra-subtle borders (`white/[0.06]`) and minimal background (`white/[0.02]`)

3. **Pillars Section (Three Pillars of Infrastructure)**
   - Removed solid `fill="var(--bg-secondary)"` backgrounds from SVG illustrations
   - Changed inner panel fills to `var(--bg-primary)` for seamless blending
   - Reduced stroke widths and opacities on borders
   - Illustrations now float naturally against the dark page background

4. **FAQ Section (NEW)**
   - Added after Testimonials, before CTA
   - Accordion-style with smooth CSS grid-rows animation
   - 6 questions aligned with Leviathan doctrine
   - Inspired by Efferd FAQ component from 21st.dev
   - ChevronDown icon rotates on expand, first item open by default
   - FAQ content updated to align with AI consulting agency + infrastructure identity

5. **CTA Section**
   - Replaced spinning `GradientButton` with frosted `GlassButton`
   - Added arrow icon matching hero treatment

6. **New Component: GlassButton**
   - Frosted glass aesthetic: `backdrop-blur-md`, `bg-white/[0.05]`, soft border
   - Layered inset shadow for depth
   - Supports `to` (router link), `href` (external), and button modes
   - Sizes: sm, default, lg

7. **CPU Architecture Visual (Reframe Section)**
   - Made visible on mobile (was `hidden md:flex`, now `flex` at all breakpoints)
   - Scaled down for mobile (`max-w-[320px]`) with larger desktop size (`max-w-[500px]`)

8. **Mobile Responsiveness**
   - All grids use `col-span-full` on small breakpoints
   - FAQ uses centered `max-w-3xl` layout
   - Glass buttons scale with responsive padding

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Glass buttons over gradient | User explicitly rejected spinning animation as "cheap looking" |
| Bento grid for problem section | User wanted Tailark features-8 style; adds visual interest and density |
| 5 cards instead of 3 | Two extra cards ("The Real Cost" + "The Pattern") strengthen the narrative arc |
| No Radix accordion dependency | Built FAQ with pure React state + CSS grid animation to keep dependencies light |
| FAQ after testimonials | Natural flow: social proof → address objections → CTA |
| CPU visual on mobile | User explicitly loves this visual and wanted it visible everywhere |

## Files Modified/Created

- `src/components/ui/GlassButton.jsx` (new)
- `src/sections/home/FAQSection.jsx` (new)
- `src/sections/home/HeroSection.jsx` (updated)
- `src/sections/home/ProblemSection.jsx` (rewritten)
- `src/sections/home/PillarsSection.jsx` (updated — SVG blending)
- `src/sections/home/CTASection.jsx` (updated)
- `src/sections/home/ReframeSection.jsx` (updated — mobile CPU)
- `src/pages/Home.jsx` (updated — added FAQSection)
