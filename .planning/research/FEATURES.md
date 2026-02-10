# Features Research: Premium Agency/SaaS Marketing Website

## Reference Sites Studied

Linear, Stripe, Vercel, Kavalsia, Notion, GitHub — dark-themed tech companies positioning as infrastructure/platform providers.

## Table Stakes (Must Have)

These are baseline expectations. Missing any of these makes the site feel unfinished.

| Feature | Complexity | Notes |
|---------|-----------|-------|
| Clear value proposition in hero | Low | Above fold, immediately scannable |
| Problem/solution narrative flow | Low | Visitors need to feel understood before they'll engage |
| What we do / services section | Low | Concrete, not abstract |
| Social proof (testimonials/logos) | Low | Even placeholder structure matters |
| Single clear CTA | Low | One primary action, repeated |
| Mobile responsive | Medium | 60%+ of agency site traffic is mobile |
| Fast load time (<3s) | Medium | Bounce rate spikes after 3s |
| Dark/light appropriate contrast | Low | WCAG AA minimum |
| Navigation with clear hierarchy | Low | Max 4-5 top-level items |
| Footer with contact/legal | Low | Trust signal |
| SEO basics (title, meta, OG) | Low | Shareable, findable |

## Differentiators (Competitive Advantage)

These separate premium sites from generic templates.

| Feature | Complexity | Notes |
|---------|-----------|-------|
| Interactive product demo | HIGH | The centerpiece. Shows don't tell. Linear's roadmap demo, Stripe's payment flow animation. |
| Scroll-driven animations | HIGH | GSAP ScrollTrigger, tied to scroll position not time. Feels intentional, not decorative. |
| Section-specific visual themes | Medium | Each section has its own mood while maintaining coherence |
| Micro-interactions | Medium | Hover states, button feedback, cursor effects — premium feel |
| Typography hierarchy | Low-Medium | Display type for headlines, tight letter-spacing, clear scale |
| Glassmorphism / depth effects | Medium | Subtle backdrop-blur, border highlights — restrained, not overdone |
| Progressive disclosure | Medium | Information revealed as you scroll, not dumped upfront |
| Animated counters/stats | Low-Medium | Numbers that count up on viewport entry |
| Custom illustrations/diagrams | Medium | Not stock icons — bespoke visual language |
| Loading/transition states | Low-Medium | Smooth page transitions, skeleton states |

## Anti-Features (Deliberately NOT Building)

| Feature | Why Not |
|---------|---------|
| Chat widget / chatbot | Contradicts "infrastructure not chatbot" positioning |
| Pop-ups or modals on load | Aggressive, damages trust |
| Pricing page | This is consulting, not SaaS. Custom scoping via audit. |
| Blog | Not in scope, adds maintenance burden |
| Newsletter signup | Not the conversion goal — audit/booking is |
| Video autoplay | Performance killer, mobile data concerns |
| Parallax backgrounds | Dated technique, performance issues on mobile |
| Animated cursor followers | Gimmicky, accessibility issues |
| Sound/audio | Universally hated, accessibility nightmare |
| Hamburger menu on desktop | Only mobile gets collapsed nav |

## Feature Dependencies

```
Typography/Design Tokens → All visual components
Content/Copy → All sections (content-first approach)
SectionWrapper component → All homepage sections
GSAP setup → All demo components
Demo Part I → Demo Part II (narrative flow)
Demo Part II → Demo Part III (narrative flow)
Nav/Footer → All pages
```

## Conversion Architecture

The site has ONE conversion goal: get visitors to the Audit page.

**Primary CTA:** "Get Your Audit" or similar (appears in hero + final CTA section)
**Secondary CTA:** "Book a Call" (nav, footer)
**Conversion path:** Homepage → Audit → Formspree submit → Calendly booking

Every section should move the visitor closer to believing they need this audit. The demo is the key persuasion mechanism — "look at what this system does for your business."

---
*Researched: 2026-02-10*
