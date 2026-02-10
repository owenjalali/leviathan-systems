# Technology Stack

**Analysis Date:** 2026-02-09

## Languages

**Primary:**
- JavaScript (JSX/ES6+) - All source code in `src/`
- CSS (Tailwind CSS v4) - Styling system

**Configuration:**
- JavaScript - Build and configuration files

## Runtime

**Environment:**
- Node.js (v18 or later recommended, per modern npm ecosystem)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- React 18.2.0 - UI library and component framework
- React Router DOM 7.11.0 - Client-side routing in `src/App.jsx`
- Vite 7.2.4 - Build tool and dev server

**Styling:**
- Tailwind CSS 4.1.18 - Utility-first CSS framework with `@tailwindcss/vite` plugin
- Custom CSS animations - Defined in `src/index.css`

**UI Components:**
- Lucide React 0.562.0 - Icon library used throughout components

**External Integrations:**
- @vapi-ai/web 2.5.2 - Voice API SDK for AI calling (used in `src/hooks/useVapiCall.js` and `src/components/VapiCallButton.jsx`)

## Key Dependencies

**Critical:**
- @vapi-ai/web - Voice calling integration, hardcoded credentials in `src/components/VapiCallButton.jsx`
  - VAPI_PUBLIC_KEY: `935fb085-0c34-4f20-82cf-76cff78f3934`
  - VAPI_ASSISTANT_ID: `955decb7-0492-40c9-b788-0b0e16f73a0a`

## Development Dependencies

**Build & Bundling:**
- @vitejs/plugin-react 5.1.1 - React Fast Refresh for Vite

**Code Quality:**
- ESLint 9.39.1 - Linter
  - @eslint/js 9.39.1 - ESLint config
  - eslint-plugin-react-hooks 7.0.1 - React hooks rules
  - eslint-plugin-react-refresh 0.4.24 - React Refresh rules
- Globals 16.5.0 - Global variable definitions

**Type Support:**
- @types/react 19.2.5 - TypeScript definitions
- @types/react-dom 19.2.3 - TypeScript definitions

## Configuration Files

**Build & Dev:**
- `vite.config.js` - Vite configuration with React and Tailwind plugins
- `tailwind.config.js` - Tailwind CSS configuration scanning `src/`, `index.html`
- `eslint.config.js` - ESLint flat config with React and hooks support

**Other:**
- `package.json` - Project manifest and scripts

## Scripts

**Development & Build:**
```bash
npm run dev        # Start Vite dev server on http://localhost:5173
npm run build      # Production build to /dist
npm run preview    # Preview production build locally
npm run lint       # Run ESLint on codebase
npm run verify:tailwind  # Verify Tailwind v4 setup (scripts/verify-tailwind-v4.mjs)
```

## Platform Requirements

**Development:**
- Node.js 18+ with npm 9+
- Modern browser with ES2020+ support

**Production:**
- Static hosting (Vercel, Netlify, etc.)
- No backend server required - client-side React SPA
- Requires internet connection for external integrations

## Environment & Secrets

**Configuration Approach:**
- No `.env` file required for basic operation
- Vapi credentials hardcoded in source code (not recommended for production)
- External endpoints hardcoded in page components

**Secrets in Use:**
- Vapi Public Key - in `src/components/VapiCallButton.jsx` line 6
- Vapi Assistant ID - in `src/components/VapiCallButton.jsx` line 7
- Formspree endpoint - in `src/pages/Audit.jsx` and `src/pages/Begin.jsx` (form submission)
- n8n webhook endpoint - in `src/hooks/useLiveMonitor.js` line 68

## Build Output

**Artifact:**
- Location: `/dist` directory
- Type: Static files (HTML, JS, CSS)
- Entry: `index.html`
- Compatible with: Any static hosting platform

---

*Stack analysis: 2026-02-09*
