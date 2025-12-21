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

- **Primary**: #1e3a5f (dark blue)
- **Primary Dark**: #0f2744
- **Accent**: #3b82f6 (blue)
- **Style**: Clean, minimal, professional with lots of whitespace

## Key Files

- `src/layouts/MainLayout.jsx` - Navigation, footer, page wrapper
- `src/pages/Book.jsx` - Calendly embed placeholder (needs configuration)
- `src/index.css` - CSS custom properties for theme colors

## Integrations

- **Calendly**: Book.jsx has placeholder for Calendly embed widget
- **n8n**: Future integration for appointment automation

## Service Tiers

1. AI Receptionist - Phone handling, appointment scheduling
2. Full Suite - Above + email automation, CRM, analytics
3. Custom Solutions - Tailored workflows for specific needs
