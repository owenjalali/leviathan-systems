# Leviathan Systems Website

## What This Is

Marketing website for Leviathan Systems, an automation company that builds revenue-critical systems for service businesses. The site positions Leviathan as infrastructure (not a marketing agency or chatbot company), targeting skeptical trades business owners who fear losing control. Features an interactive demo where visitors can experience the AI receptionist in action.

## Core Value

Demonstrate that Leviathan captures and organizes leads instantly — while keeping the owner in control.

## Current Milestone: v1.1 Bug Fix

**Goal:** Fix live monitor panel - ensure real-time data updates from Vapi calls display correctly in LiveMonitorTerminal

**Issue:** Vapi calling works, but LiveMonitorTerminal side panel not updating with call data. Likely n8n webhook integration issue.

## Current State

**Shipped:** v1.0 Live Demo Section (2026-01-22)
- Interactive demo with real Vapi AI receptionist
- Live Monitor Terminal with real-time field updates
- Premium animations (scan line, pulse, glow, typewriter)
- Trust messaging (owner approval required, no auto-actions)

**Codebase:** 5,509 lines JavaScript/JSX
**Tech stack:** React 18 + Vite, Tailwind CSS v4, React Router DOM v7, Vapi SDK

## Requirements

### Validated

- ✓ Hero section with value proposition — v0
- ✓ "How We Work" partnership flow — v0
- ✓ "What Changes" before/after comparison — v0
- ✓ 78% stat section (animated) — v0
- ✓ Loss Calculator component — v0
- ✓ Final CTA section — v0
- ✓ Responsive design (mobile-first) — v0
- ✓ Dark theme with cyan/purple accents — v0
- ✓ Vapi web-call button with real AI receptionist — v1.0
- ✓ Live Monitor Terminal with real-time updates — v1.0
- ✓ Polling hook for n8n webhook data — v1.0
- ✓ Premium animations (scan line, field glow, typewriter) — v1.0
- ✓ Trust/control messaging throughout — v1.0
- ✓ Section placement after hero, before "How We Work" — v1.0

### Active

- [ ] **BUG-01**: Live monitor panel updates correctly with data from Vapi calls

### Out of Scope

- Mock/simulation mode — Real integration only, no fake demos
- Charts or ROI metrics in demo — Keep it grounded, no fake numbers
- "Booked" or "Scheduled" messaging — Never imply actions were taken
- Mobile Vapi integration — Focus on desktop web-call first

## Context

**Technical environment:**
- React 18 + Vite
- Tailwind CSS v4 (using @tailwindcss/vite plugin)
- React Router DOM v7
- Vapi SDK (@vapi-ai/web)
- Deployed on Vercel

**Design system:**
- Background: #030306 (very dark)
- Accent primary: #00d4cf (cyan)
- Accent secondary: #7c72ff (purple)
- Cards: bg-[#0a0f1a] with border-[#1a2332]
- Animations: fade-in-up, pulse-glow, float, scan-line, field-glow, typewriter

**Key components (v1.0):**
- `useLiveMonitor` — Polling hook for n8n webhook data
- `useVapiCall` — Vapi SDK integration hook
- `LiveMonitorTerminal` — Real-time field display with animations
- `VapiCallButton` — Call control with audio visualization
- `DemoSection` — Container component for demo experience

**Integration endpoints:**
- POST: `https://systems.leviathan-systems.com/webhook/demo/update`
- GET: `https://systems.leviathan-systems.com/webhook/demo/latest?demo_session_id={id}`

## Constraints

- **Protected pages**: Audit.jsx, Begin.jsx, Book.jsx — DO NOT MODIFY
- **Git workflow**: Feature branch required, merge to master after approval
- **Trust first**: All messaging must emphasize owner control

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Real Vapi integration only | User wants authentic demo, no mocks | ✓ Good — authentic experience |
| Cyan accent for active states | Matches existing design system | ✓ Good — consistent visuals |
| Polling (not WebSocket) | Simpler, n8n endpoint already built | ✓ Good — reliable, easy to debug |
| "See It Work" headline | User's choice from options | ✓ Good — clear and direct |

---
*Last updated: 2026-01-23 after starting v1.1 maintenance milestone*
