# Design References — What Premium Looks Like

**Purpose:** Extracted design patterns from 6 reference sites to guide custom component development. These principles prevent AI-generated aesthetics and ensure professional agency-quality output.

---

## Raw Design System Data

### Vercel
- **Font:** Geist (custom sans-serif)
- **Colors:** `#FAFAFA` bg, `#171717` text/accent, `#0062D1` primary blue
- **Spacing:** 4px base unit, `6px` border-radius
- **Buttons:** Pill-shaped (`border-radius: 100px`), primary is solid dark, secondary is white with sophisticated multi-layer shadow: `rgba(0,0,0,0.08) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 2px`
- **Key takeaway:** Extreme restraint. Near-monochrome. Color is barely used.

### Linear
- **Font:** Inter body, SF Pro Display heading
- **Colors:** `#08090A` bg (nearly pure black), `#F7F8F8` text, `#5E6AD2` primary (muted indigo)
- **Spacing:** 4px base unit, `8px` border-radius
- **Buttons:** `10px` radius (NOT pill). Primary is light-on-dark (`#E6E6E6` bg, `#08090A` text). Secondary is `#28282C` bg with `#3E3E44` border. Primary has layered shadow.
- **Typography:** h1 = **64px**, h2 = **56px**, body = **17px**
- **Key takeaway:** Our closest reference. Dark theme, Inter font, muted accent color, generous typography sizes.

### Stripe
- **Font:** Sohne body, SF Pro Display heading (both custom)
- **Colors:** `#FFFFFF` bg, `#061B31` primary dark, `#533AFD` accent purple
- **Spacing:** 8px base unit, `0px` border-radius (sharp edges!)
- **Buttons:** Very small radius (`4px`), crisp and architectural. No pill shapes.
- **Typography:** h1 = **48px**, h2 = **32px**, body = **32px** (unusually large body text)
- **Key takeaway:** Confidence through simplicity. Sharp corners. Large body text. One bold accent color.

### GitHub
- **Font:** Mona Sans (custom)
- **Colors:** `#0D1117` bg (dark blue-black), `#F0F6FC` text, `#1A7F37` accent green
- **Spacing:** 4px base unit, `6px` border-radius
- **Buttons:** `6px` radius. Primary green with no shadow. Secondary transparent with `#4A4D51` border + inset white shadow.
- **Typography:** h1 = **32px**, h2 = **24px**, body = **14px** (compact)
- **Key takeaway:** Green accent used surgically (only on primary CTA). Everything else is neutral.

### Notion
- **Font:** Inter (same as ours)
- **Colors:** `#FFFFFF` bg, `#0D0D0D` text, `#0075DE` accent blue
- **Spacing:** 4px base unit, `8px` border-radius
- **Buttons:** Primary = `10px` radius, secondary = `8px`. No shadows on buttons.
- **Typography:** h1 = **64px**, body = **14px**
- **Key takeaway:** Inter at scale. Clean, zero shadows on interactive elements. Let content breathe.

### Kavalsia (Competitor Context)
- **Product:** AI phone agent for small businesses — near-identical positioning to Leviathan
- **Content flow:** Hero → rotating headlines → testimonials → features grid → pricing → CTA → FAQ
- **Pricing:** $199/mo starting
- **Observations:** Content-heavy, lots of testimonials (40+), feature cards for each tool. Functional but not premium — this is what we need to clearly surpass.

---

## Extracted Design Principles

### 1. Typography Is the Hero

| Principle | Evidence |
|-----------|----------|
| **Headlines are massive** | Linear: 64px. Stripe: 48px. Notion: 64px. |
| **Body text is generous** | Stripe: 32px. Linear: 17px. Most premium sites use 16-18px minimum. |
| **Tight letter-spacing on headings** | All sites use negative letter-spacing on h1 (-0.02em to -0.04em) |
| **Weight contrast creates hierarchy** | Bold 700+ headings, 400 body. Never 500 for everything. |

**For Leviathan:** Our h1 should be 56-72px. Body at 17-18px. Letter-spacing of -0.03em on display text. This alone will feel more "designed."

### 2. Color Is Surgical, Never Decorative

| Principle | Evidence |
|-----------|----------|
| **One accent color maximum** | GitHub: green only on CTA. Linear: indigo appears ~3 places. |
| **Background is near-black or pure white** | Linear: `#08090A`. GitHub: `#0D1117`. Never `#1a1a1a` gray. |
| **Accent used only for:** | CTAs, active states, and highlights. Never backgrounds or borders. |
| **No gradients on backgrounds** | Zero sites use gradient backgrounds on sections. |

**For Leviathan:** Teal accent appears ONLY on: primary CTA button, navbar active indicator, and glow effects. Everything else is `#0a0a0f` + white text. Gradient reserved for ONE button hover effect, nothing else.

### 3. Spacing Is Variable, Never Uniform

| Principle | Evidence |
|-----------|----------|
| **4px base grid** | Vercel, Linear, GitHub, Notion all use 4px. |
| **Section spacing varies** | Hero gets 120-160px padding. Content sections get 80-100px. Dense sections get 48-64px. |
| **Asymmetric layouts** | Text left-aligned, not centered. Content offset. |
| **Generous whitespace between sections** | Premium = breathing room. Budget sites cram. |

**For Leviathan:** Hero section: 160px vertical padding. Problem/Reframe: 120px. Demo sections: 100px. CTA: 140px. NEVER the same padding on every section.

### 4. Borders and Shadows Create Depth Without Noise

| Principle | Evidence |
|-----------|----------|
| **Borders are barely visible** | All sites use `rgba(255,255,255,0.08)` to `0.1` on dark |
| **Shadows are multi-layered and subtle** | Vercel: `rgba(0,0,0,0.08) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 2px` — NOT `0 4px 8px rgba(0,0,0,0.3)` |
| **No visible card borders** | Cards are defined by background contrast, not stroke |
| **Glassmorphism is extremely subtle** | `backdrop-blur` with 2-4% opacity fill, never 10%+ |

**For Leviathan:** Our `--border` should be `rgba(255,255,255,0.06)` (even subtler than initially proposed). Card backgrounds at 2-3% white, not 4%.

### 5. Buttons Are Restrained, Not Flashy

| Principle | Evidence |
|-----------|----------|
| **Border-radius varies** | Vercel: pill (100px). Linear: 10px. Stripe: 4px. GitHub: 6px. |
| **Primary CTAs are simple fills** | Solid color, no gradient. Maybe a hover scale/shadow. |
| **Secondary buttons are ghost/outline** | Transparent bg + subtle border. Never two colored buttons. |
| **Button text is short** | "Get started", "Deploy", "Sign up". Never "Start Your Free Trial Today!" |

**For Leviathan:** Primary CTA = solid `--accent` fill, 10px radius (Linear style). Secondary = transparent + `rgba(255,255,255,0.08)` border. No shimmer/gradient on the FIRST CTA — save special effects for the final CTA to create a crescendo.

### 6. Animation Is Functional, Not Decorative

| Principle | Evidence |
|-----------|----------|
| **Transitions are fast** | 200-300ms, never 500ms+ |
| **Hover states are subtle** | Slight brightness change, 2px translateY, opacity shift |
| **Scroll animations are rare** | Linear uses them on feature sections, but hero is static |
| **No fade-in-from-below on every section** | That's the #1 AI-generated tell |

**For Leviathan:** Avoid the universal `appear-from-below` pattern. Hero: background animation only, text is immediately present. Content sections: NO scroll entrance animation. Demos: yes, full scroll-driven GSAP. Testimonials: horizontal marquee.

---

## Anti-Patterns to Avoid (AI-Generated Tells)

| ❌ AI Pattern | ✅ Professional Alternative |
|---|---|
| Every section fades in from below | Content is already there. Only demos animate. |
| Gradient on every background | Single-tone backgrounds. One gradient max. |
| Perfectly centered everything | Left-aligned text, asymmetric layouts. |
| Card grids with identical padding | Variable card sizes, intentional whitespace. |
| `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` | Multi-layer subtle shadows or NO shadow. |
| Rainbow hover effects | Single-color brightness shift. |
| `border-radius: 16px` on everything | Mix: 6px cards, 10px buttons, 0px dividers. |
| Decorative orbs/blobs everywhere | Maximum ONE background effect per page. |
| Generic "hero-section", "feature-card" look | Unique section compositions. No cookie-cutter. |
| Uniform 80px section padding | Variable: 160px hero, 120px content, 100px dense. |

---

## How This Maps to Leviathan

1. **Hero:** Large headline (64px+), left-aligned or center with asymmetric subtitle placement. Background Paths animation is the ONE allowed background effect. Button is simple solid accent.
2. **Problem:** Clean text, possibly Text Reveal. NO card grid with icons. Words on screen, tight spacing, emotional weight.
3. **Reframe:** Static. Large text. Maximum whitespace. This section should feel like a deep breath.
4. **Demo sections:** This is where animation lives. Full GSAP. Interactive. These are the "wow" moments.
5. **Testimonials:** Horizontal marquee. Simple cards. Avatar + name + quote. No star ratings or fancy borders.
6. **CTA:** Background Beams for drama. One strong button. Short copy.
7. **Navbar:** Floating, minimal. Three items. Tubelight glow on active. Nothing else.
8. **Footer:** One line. © Leviathan Systems + 3 links. No 4-column newsletter signup enterprise footer.
