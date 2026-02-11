# Phase 2 Decisions — Design System & Components

**Date:** 2026-02-10
**Status:** FINALIZED

---

## 1. Animation Library Strategy

**Decision: Option C — Components as inspiration, rebuild custom with GSAP**

- GSAP is our **sole** animation library. Nothing else gets installed.
- Framer Motion is **NOT** added — the 21st.dev components are used purely as **visual reference**, not copy-pasted.
- All animations, scroll effects, and transitions are built with GSAP + `@gsap/react` (`useGSAP` hook).
- This keeps the bundle lean, avoids coordination headaches, and gives us full control.

**Rationale:** 13 of 16 saved components depend on Framer Motion + shadcn infrastructure (`@/lib/utils`, Radix UI, class-variance-authority, TypeScript). None of that is in our stack. Rebuilding inspired-by versions in GSAP + Tailwind is cleaner than importing an entire second ecosystem.

---

## 2. Component Inspiration Map

### Components We're Drawing From

| Component | Used As Inspiration For | What We Take |
|-----------|------------------------|-------------|
| **Background Paths** | Hero section background | Animated SVG paths behind headline |
| **Background Beams** | Final CTA section background | Animated beam lines for dramatic closing |
| **Shimmer/Gradient Button** | CTA buttons | Gradient + shimmer hover effects |
| **Text Reveal** | Problem section (if scroll-driven) | Word-by-word highlight on scroll |
| **Testimonials with Marquee** | Testimonials section | Horizontal auto-scrolling cards |
| **Tubelight Navbar** | Navigation bar | Floating pill with glowing active indicator |
| **Container Scroll Animation** | Demo Part III (dashboard) | 3D perspective frame for mockup |
| **Footer 4-Column** | Footer (simplified) | Layout structure only — we only need © + links |
| **Section With Mockup** | Demo Part I (form + phone) | Side-by-side layout concept |

### Components We're Skipping

| Component | Why |
|-----------|-----|
| **Theme Toggle** | Dark-only site — no toggle needed |
| **Radial Orbital Timeline** | Cool but doesn't fit Leviathan's story |
| **Database With REST API** | Data viz for dev tools, not our audience |
| **Hero 195** | Using Background Paths instead |
| **Features-7** | Generic grid — will build custom if needed |
| **Timeline** (aceternity) | Vertical scroll timeline not in our sections |
| **ShadCN Button** | Rebuilding our own button system |
| **Pulse Beams** | Redundant with Background Beams |

---

## 3. Color Palette

**Direction:** Teal/cyan accent on near-black. Premium, not neon.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0a0f` | Page background |
| `--bg-secondary` | `#111118` | Card/section backgrounds |
| `--bg-elevated` | `#1a1a24` | Elevated surfaces |
| `--accent` | `#00d4aa` → `#14b8a6` | Teal/cyan — CTAs, highlights, glow |
| `--accent-glow` | `rgba(0, 212, 170, 0.15)` | Glow effects behind elements |
| `--text-primary` | `#f0f0f0` | Headings |
| `--text-secondary` | `#a0a0b0` | Body copy |
| `--text-muted` | `#666680` | Subtle labels |
| `--border` | `rgba(255, 255, 255, 0.08)` | Subtle borders |
| `--glass` | `rgba(255, 255, 255, 0.04)` | Glassmorphism fill |

---

## 4. Typography

**Font:** Inter (variable, self-hosted for performance)

| Role | Weight | Size | Letter Spacing | Usage |
|------|--------|------|----------------|-------|
| Display | 700-800 | 4rem–5rem | -0.03em | Hero headline |
| Heading | 600-700 | 2rem–3rem | -0.02em | Section headlines |
| Subheading | 500 | 1.25rem | -0.01em | Section intros |
| Body | 400 | 1rem | normal | Paragraphs |
| Small | 400 | 0.875rem | 0.01em | Labels, captions |

---

## 5. Animation Philosophy

**Principle:** Reserve animation for hero + demos, let other sections breathe. Nothing gratuitous.

| Section | Animation | Type |
|---------|-----------|------|
| Hero | ✅ Yes | Background Paths + button shimmer |
| Problem | ✅ Subtle | Text Reveal OR clean fade-in |
| Reframe | ❌ Static | Let the words breathe |
| Demo Intro | ❌ Static | Brief transition text |
| Demo I–III | ✅ Full | GSAP scroll-driven (Phase 4) |
| Testimonials | ⚡ Auto | Marquee horizontal scroll |
| Final CTA | ✅ Yes | Background Beams + button glow |
| Navbar | ⚡ Micro | Active indicator animation only |
| Footer | ❌ Static | No animation |

---

## 6. Section → Component Architecture

Each homepage section from [CONTENT-SPEC.md](file:///c:/Users/owenj/leviathan-systems/.planning/phases/phase-1-content/CONTENT-SPEC.md) maps to custom-built components:

```
sections/home/
  ├── HeroSection.jsx          ← Background Paths + headline + CTA
  ├── ProblemSection.jsx       ← Text Reveal or card grid
  ├── ReframeSection.jsx       ← Static empathetic copy
  ├── DemoIntroSection.jsx     ← Transitional text
  ├── DemoSection.jsx          ← Parts I–III (Phase 4 scope)
  ├── TestimonialsSection.jsx  ← Marquee cards
  └── CTASection.jsx           ← Background Beams + final CTA
```

```
components/ui/
  ├── Button.jsx               ← Gradient/shimmer variants
  ├── Navbar.jsx               ← Tubelight-inspired floating nav
  ├── Footer.jsx               ← Minimal © + links
  ├── SectionWrapper.jsx       ← Consistent padding, max-width
  ├── AnimatedText.jsx         ← GSAP text animations
  ├── BackgroundPaths.jsx      ← SVG path animation (hero)
  ├── BackgroundBeams.jsx      ← SVG beam animation (CTA)
  ├── MarqueeTrack.jsx         ← Horizontal scroll container
  └── TestimonialCard.jsx      ← Individual testimonial card
```

---

## 7. Quality Bar

**Standard: Professional web design agency output.**

- No vibe-coded aesthetics. Every pixel intentional.
- Smooth 60fps animations. No jank.
- Responsive from 320px to 4K.
- Accessible (keyboard nav, screen reader labels, contrast ratios).
- Fast (< 3s LCP, < 100ms FID).

---

## Summary of Key Decisions

| # | Decision | Choice |
|---|----------|--------|
| 1 | Animation library | GSAP only — no Framer Motion |
| 2 | Component approach | Inspiration-based rebuild, not copy-paste |
| 3 | Color direction | Teal/cyan accent on near-black |
| 4 | Font | Inter variable, self-hosted |
| 5 | Hero background | Background Paths (organic/flowing) |
| 6 | CTA background | Background Beams (geometric/tech) |
| 7 | Data viz components | Skipped — don't fit Leviathan's story |
| 8 | Theme toggle | Skipped — dark-only |
| 9 | Animation philosophy | Purposeful — hero, demos, CTA only |
| 10 | Quality standard | Professional agency output, not MVP |
