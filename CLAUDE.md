# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Default Context**: When discussing Leviathan Systems in any conversation, use the business framing, positioning, and tone guidelines below as the default context. This applies to code, copy, strategy, and any client-facing content.

## Git Workflow (Required)

**Always create a branch for any changes.** Never commit directly to master.

1. Create a feature branch before making any changes
2. Make commits on the feature branch
3. Push the branch and create a PR
4. Wait for user approval before merging
5. Merge to master only after approval
6. Delete the feature branch after merging

This workflow is non-negotiable for all code changes.

## Project Overview

Leviathan Systems is an automation company that builds revenue-critical systems for service businesses.

**Core belief**: Time leakage equals revenue leakage. Any business that relies on humans to respond, qualify, or follow up is structurally losing money.

**What we do**: Leviathan designs and implements automated systems that handle inbound demand end-to-end. These systems respond instantly, qualify leads automatically, route them correctly, and book appointments or trigger next actions without delay. Our focus is not individual tools or features. We build systems that remove dependence on human speed, availability, and consistency.

**Positioning**: We are not a traditional marketing agency, software reseller, or AI "chatbot" company. We are infrastructure.
- If a business is slow, our systems recover lost revenue
- If a business is fast, our systems protect them from risk, inconsistency, and human failure

## Business Framing

How to frame Leviathan:
- Automation as reliability
- Systems as protection
- Speed as a baseline, not the value
- Consistency and coverage as the real advantage

**Tone**: Clear, confident, and technical but accessible. No hype, no buzzwords, no exaggerated claims. Frame everything in terms of risk removal, certainty, and operational leverage.

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS v4 (using @tailwindcss/vite plugin)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Deployment**: Vercel

## Commands

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Production build to /dist
npm run preview  # Preview production build locally
```

## Architecture

```
src/
├── layouts/          # Page layouts (MainLayout with nav/footer)
├── pages/            # Route components (Home, About, Infrastructure, Begin)
├── components/       # Reusable UI components
├── assets/           # Static assets (images, logo)
└── index.css         # Tailwind imports and CSS variables
```

## Design System

- **Black**: #0a0a0a (background)
- **Black Light**: #0d0d0d (alternate sections)
- **Border**: #1a1a1a (subtle dividers)
- **Gold**: #d4af37 (accent, CTAs)
- **Gold Light**: #f4d03f (hover states)
- **Style**: Dark, minimal, authoritative. Lots of breathing room. Restrained.

## Brand Voice

- Calm, authoritative, restrained
- Outcome-focused, not feature-focused
- No tech jargon ("AI-powered", "cutting-edge", etc.)
- No urgency tactics or sales pressure
- CTA: "Explore If Infrastructure Fits" or "Begin"

## Key Files

- `src/layouts/MainLayout.jsx` - Navigation, footer, page wrapper with logo
- `src/pages/Home.jsx` - Main landing with problem/solution/pillars
- `src/pages/About.jsx` - Infrastructure positioning, what we provide
- `src/pages/Infrastructure.jsx` - Three pillars detailed, Secretary system
- `src/pages/Begin.jsx` - Quiet invitation with Calendly embed
- `src/index.css` - CSS animations and theme variables

## Three Pillars

1. **Revenue Capture** - Every inbound opportunity acknowledged, qualified, routed
2. **Operational Control** - Visibility into what's working and where money is at risk
3. **Human-Safe Autonomy** - Systems operate independently while humans stay informed

## Integrations

- **Calendly**: Embedded in Begin.jsx (https://calendly.com/leviathanaidev)
- Dark theme: background_color=0a0a0a, text_color=ffffff, primary_color=d4af37

## Animations

Custom CSS animations defined in index.css:
- `animate-fade-in-up` - Fade in from bottom
- `delay-100` to `delay-500` - Staggered animation delays
