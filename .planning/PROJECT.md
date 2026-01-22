# Leviathan Systems Website

## What This Is

Marketing website for Leviathan Systems, an automation company that builds revenue-critical systems for service businesses. The site positions Leviathan as infrastructure (not a marketing agency or chatbot company), targeting skeptical trades business owners who fear losing control.

## Core Value

Demonstrate that Leviathan captures and organizes leads instantly — while keeping the owner in control.

## Current Milestone: v1.0 Live Demo Section

**Goal:** Build a premium, interactive demo section that lets visitors experience the AI receptionist in action and see real-time lead capture — proving the value proposition without sales pressure.

**Target features:**
- Vapi web-call integration (real AI receptionist demo)
- Live Monitor Terminal with real-time field updates
- Premium animations (scan line, pulse, glow effects)
- Trust messaging (owner approval required, no auto-actions)

## Requirements

### Validated

<!-- Shipped and confirmed valuable. Existing website features. -->

- ✓ Hero section with value proposition — v0
- ✓ "How We Work" partnership flow — v0
- ✓ "What Changes" before/after comparison — v0
- ✓ 78% stat section (animated) — v0
- ✓ Loss Calculator component — v0
- ✓ Final CTA section — v0
- ✓ Responsive design (mobile-first) — v0
- ✓ Dark theme with cyan/purple accents — v0

### Active

<!-- Current scope. Building toward these. -->

- [ ] Vapi web-call button with real AI receptionist
- [ ] Live Monitor Terminal with real-time updates
- [ ] Polling hook for n8n webhook data
- [ ] Premium animations (scan line, field glow, typewriter)
- [ ] Trust/control messaging throughout
- [ ] Section placement after hero, before "How We Work"

### Out of Scope

<!-- Explicit boundaries. -->

- Mock/simulation mode — Real integration only, no fake demos
- Charts or ROI metrics in demo — Keep it grounded, no fake numbers
- "Booked" or "Scheduled" messaging — Never imply actions were taken
- Mobile Vapi integration — Focus on desktop web-call first

## Context

**Technical environment:**
- React 18 + Vite
- Tailwind CSS v4 (using @tailwindcss/vite plugin)
- React Router DOM v7
- Deployed on Vercel

**Design system:**
- Background: #030306 (very dark)
- Accent primary: #00d4cf (cyan)
- Accent secondary: #7c72ff (purple)
- Cards: bg-[#0a0f1a] with border-[#1a2332]
- Existing animations: fade-in-up, pulse-glow, float

**Existing components:**
- LossCalculator (form with loss calculation)
- SystemDiagram (5-node animated flow)
- ScrollToTop, useScrollAnimation hook

**Integration endpoints (already deployed):**
- POST: `https://systems.leviathan-systems.com/webhook/demo/update`
- GET: `https://systems.leviathan-systems.com/webhook/demo/latest?demo_session_id={id}`

**Vapi credentials:**
- Public Key: `2d8f4fe8-8e5f-485f-a50f-05f63886fae9`
- Assistant ID: `955decb7-0492-40c9-b788-0b0e16f73a0a`

## Constraints

- **Protected pages**: Audit.jsx, Begin.jsx, Book.jsx — DO NOT MODIFY
- **Git workflow**: Feature branch required, merge to master after approval
- **Placement**: Demo section MUST go after hero, before "How We Work"
- **Trust first**: All messaging must emphasize owner control

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Real Vapi integration only | User wants authentic demo, no mocks | — Pending |
| Cyan accent for active states | Matches existing design system | — Pending |
| Polling (not WebSocket) | Simpler, n8n endpoint already built | — Pending |
| "See It Work" headline | User's choice from options | — Pending |

---
*Last updated: 2026-01-21 after milestone v1.0 initialization*
