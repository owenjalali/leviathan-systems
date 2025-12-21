# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Leviathan Systems - Professional website for an AI automation agency that builds autonomous AI agents for small businesses using n8n. Services include AI receptionists, appointment scheduling, and custom automation workflows.

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS v4 (using @tailwindcss/vite plugin)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Deployment**: TBD (Vercel or Netlify recommended)

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
├── pages/            # Route components (Home, About, Services, Contact, Book)
├── components/       # Reusable UI components
├── assets/           # Static assets (images, logo)
└── index.css         # Tailwind imports and CSS variables
```

## Design System

- **Black**: #0a0a0a (background)
- **Black Light**: #1a1a1a (cards, sections)
- **Gray Dark**: #2d2d2d (borders)
- **Gold**: #d4af37 (accent, CTAs)
- **Gold Light**: #f4d03f (hover states)
- **Style**: Dark, minimal, professional with gold accents

## Key Files

- `src/layouts/MainLayout.jsx` - Navigation, footer, page wrapper with logo
- `src/pages/Book.jsx` - Calendly embed (leviathanaidev)
- `src/index.css` - CSS animations and theme variables
- `src/components/ScrollToTop.jsx` - Ensures pages scroll to top on navigation

## Integrations

- **Calendly**: Embedded in Book.jsx (https://calendly.com/leviathanaidev)
- **n8n**: Future integration for appointment automation

## Animations

Custom CSS animations defined in index.css:
- `animate-fade-in-up` - Fade in from bottom
- `animate-slide-in-left/right` - Slide animations
- `card-hover` - Lift effect on cards
- `delay-100` to `delay-500` - Staggered animation delays

## Service Tiers

1. AI Receptionist - Phone handling, appointment scheduling
2. Full Suite - Above + email automation, CRM, analytics
3. Custom Solutions - Tailored workflows for specific needs
