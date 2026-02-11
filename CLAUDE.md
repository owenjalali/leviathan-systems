# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Default Context**: When discussing Leviathan Systems in any conversation, use the business framing, positioning, and tone guidelines below as the default context. This applies to code, copy, strategy, and any client-facing content.

## Git Workflow (Required)

**Always create a branch for any changes.** Never commit directly to master.

1. Create a feature branch before making any changes
2. Make commits on the feature branch
3. Push the branch to remote
4. **Start dev server (`npm run dev`) and provide localhost link for user to preview changes**
5. Provide GitHub compare link for user to review code
6. Wait for user approval before merging
7. Merge to master only after approval
8. Delete the feature branch after merging

This workflow is non-negotiable for all code changes.

## Protected Pages (DO NOT MODIFY)

The following pages are protected and should NEVER be modified:
- `src/pages/Audit.jsx` - Audit form and booking flow
- `src/pages/Begin.jsx` - Alternative booking flow
- `src/pages/Book.jsx` - Simple booking page

These pages contain critical form logic, Formspree integration, and Calendly booking. Any changes could break the user journey.

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
## Brand Voice

- Calm, authoritative, restrained
- Outcome-focused, not feature-focused
- No tech jargon ("AI-powered", "cutting-edge", etc.)
- No urgency tactics or sales pressure
- CTA: "Explore If Infrastructure Fits" or "Begin"

## Three Pillars

1. **Revenue Capture** - Every inbound opportunity acknowledged, qualified, routed
2. **Operational Control** - Visibility into what's working and where money is at risk
3. **Human-Safe Autonomy** - Systems operate independently while humans stay informed

## Integrations

- **Calendly**: Embedded in Begin.jsx (https://calendly.com/leviathanaidev)
- Dark theme: background_color=0a0a0a, text_color=ffffff, primary_color=d4af37