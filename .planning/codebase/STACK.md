# Technology Stack

**Analysis Date:** 2026-01-23

## Languages

**Primary:**
- JavaScript (JSX) - React components and application code
- CSS - Styling via Tailwind CSS

**Secondary:**
- HTML - Entry point and structure

## Runtime

**Environment:**
- Node.js v25.2.1

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React ^19.2.0 - UI framework
- React DOM ^19.2.0 - DOM rendering
- React Router DOM ^7.11.0 - Client-side routing
- Vite ^7.2.4 - Build tool and dev server

**Styling:**
- Tailwind CSS ^4.1.18 - Utility-first CSS framework
- @tailwindcss/vite ^4.1.18 - Vite integration plugin

**Testing:**
- Not detected

**Build/Dev:**
- Vite ^7.2.4 - Build tool with hot module replacement
- @vitejs/plugin-react ^5.1.1 - React Fast Refresh support

## Key Dependencies

**Critical:**
- @vapi-ai/web ^2.5.2 - Voice AI integration for demo calls (used in `src/hooks/useVapiCall.js` and `src/components/VapiCallButton.jsx`)
- lucide-react ^0.562.0 - Icon library used throughout UI

**Infrastructure:**
- None - Pure frontend application

## Configuration

**Environment:**
- No `.env` files detected in repository
- API keys hardcoded in source:
  - Vapi public key in `src/components/VapiCallButton.jsx`
  - Formspree endpoint in `src/pages/Begin.jsx` and `src/pages/Audit.jsx`
  - Calendly embed URL in multiple pages

**Build:**
- `vite.config.js` - Vite configuration with React and Tailwind plugins
- `eslint.config.js` - ESLint flat config with React hooks and refresh plugins
- No TypeScript configuration (pure JavaScript project)

**Linting:**
- ESLint ^9.39.1 with flat config format
- @eslint/js ^9.39.1 - Core ESLint rules
- eslint-plugin-react-hooks ^7.0.1 - React hooks linting
- eslint-plugin-react-refresh ^0.4.24 - Fast refresh validation
- globals ^16.5.0 - Browser globals for linting

## Platform Requirements

**Development:**
- Node.js (v25.2.1 currently in use)
- npm for package management
- Modern browser with ES2020 support

**Production:**
- Vercel (implied by project structure and CLAUDE.md notes)
- Static hosting for SPA
- No server-side runtime required

---

*Stack analysis: 2026-01-23*
