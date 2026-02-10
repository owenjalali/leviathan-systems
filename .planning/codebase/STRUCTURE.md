# Codebase Structure

**Analysis Date:** 2026-02-09

## Directory Layout

```
leviathan-systems/
├── src/
│   ├── layouts/
│   │   └── MainLayout.jsx          # Page wrapper, header nav, footer
│   ├── pages/
│   │   ├── Home.jsx                # Landing page (active)
│   │   ├── About.jsx               # Coming soon page
│   │   ├── Audit.jsx               # Multi-step booking form (active, protected)
│   │   ├── Begin.jsx               # Legacy booking form (redirects to /audit)
│   │   ├── Book.jsx                # Simple booking page (legacy)
│   │   ├── Contact.jsx             # Contact page (unused)
│   │   ├── Services.jsx            # Services page (unused)
│   │   └── Home-redesign.jsx       # Backup/redesign version (unused)
│   ├── components/
│   │   ├── DemoSection.jsx         # Live demo orchestrator
│   │   ├── VapiCallButton.jsx      # Voice call trigger button
│   │   ├── LiveMonitorTerminal.jsx # Real-time data display
│   │   ├── LossCalculator.jsx      # Revenue loss calculator
│   │   ├── SystemDiagram.jsx       # Infrastructure visualization
│   │   ├── AnimatedStats.jsx       # Statistics display with animation
│   │   └── ScrollToTop.jsx         # Scroll-to-top button component
│   ├── hooks/
│   │   ├── useLiveMonitor.js       # n8n webhook polling hook
│   │   ├── useVapiCall.js          # Vapi call lifecycle hook
│   │   └── useScrollAnimation.js   # Intersection observer hook
│   ├── assets/
│   │   ├── Fully New Improved Leviathan Systems Logo.png
│   │   └── react.svg
│   ├── App.jsx                     # Route definitions
│   ├── main.jsx                    # React root entry
│   ├── index.css                   # Global styles, animations, theme
│   └── index-redesign.css          # Backup CSS (unused)
├── public/
│   └── index.html                  # HTML entry point
├── vite.config.js                  # Vite config
├── tailwind.config.js              # Tailwind config
├── package.json                    # Dependencies
├── CLAUDE.md                       # Project guidelines
└── .planning/
    └── codebase/                   # Analysis documents (this folder)
```

## Directory Purposes

**src/layouts/**
- Purpose: Shared page structure (navigation, footer)
- Contains: Single MainLayout component that wraps all pages
- Key files: `MainLayout.jsx` (fixed header with logo, nav links, mobile menu, footer)

**src/pages/**
- Purpose: Route-level page components
- Contains: Full-page implementations for distinct user journeys
- Key files:
  - `Home.jsx` - Landing page (active, primary entry point)
  - `Audit.jsx` - Multi-step booking form (active, protected from modification)
  - `About.jsx` - Coming soon placeholder

**src/components/**
- Purpose: Reusable UI building blocks and feature sections
- Contains: Functional components used by pages
- Key files:
  - `DemoSection.jsx` - Orchestrates live demo (call + terminal)
  - `VapiCallButton.jsx` - Voice call button with audio visualization
  - `LiveMonitorTerminal.jsx` - Real-time data display with typewriter effect
  - `LossCalculator.jsx` - Revenue loss calculator (financial inputs)

**src/hooks/**
- Purpose: Custom React hooks for state management and side effects
- Contains: Pure logic extracted from components
- Key files:
  - `useLiveMonitor.js` - Polling hook for n8n webhook
  - `useVapiCall.js` - Vapi call state machine
  - `useScrollAnimation.js` - IntersectionObserver wrapper

**src/assets/**
- Purpose: Static images and SVG assets
- Contains: Logo and icon files
- Key files: Leviathan Systems logo (PNG)

## Key File Locations

**Entry Points:**
- `./src/main.jsx`: React root creation and App mount
- `./src/App.jsx`: BrowserRouter setup, route definitions
- `./public/index.html`: HTML shell (Vite serves this)

**Configuration:**
- `./vite.config.js`: Vite build config, React + Tailwind plugins
- `./tailwind.config.js`: Tailwind content paths
- `./CLAUDE.md`: Project guidelines for Claude

**Core Logic:**
- `./src/pages/Home.jsx`: Landing page, loss calculator, demo section
- `./src/pages/Audit.jsx`: Booking form with validation, Formspree submission
- `./src/hooks/useLiveMonitor.js`: Polling logic for demo data
- `./src/components/DemoSection.jsx`: Demo coordination

**Styling:**
- `./src/index.css`: Tailwind imports, CSS variables, custom animations
- Classes: All Tailwind utilities plus custom animations (animate-fade-in-up, animate-bar-idle)

**Testing:**
- No test files present in codebase

## Naming Conventions

**Files:**
- PascalCase for React components: `DemoSection.jsx`, `VapiCallButton.jsx`, `MainLayout.jsx`
- camelCase for hooks: `useLiveMonitor.js`, `useScrollAnimation.js`
- camelCase for utility directories: `assets`, `components`, `hooks`, `pages`, `layouts`

**Directories:**
- PascalCase not used for directories
- Single-word descriptive names: `pages`, `components`, `hooks`, `layouts`, `assets`

**CSS Classes:**
- kebab-case for Tailwind utilities: `bg-[#030306]`, `text-white`, `flex-col`
- CSS custom property names: `--color-bg`, `--color-accent`, `--color-text-primary`

**JavaScript Variables:**
- camelCase: `leadsPerWeek`, `formData`, `sessionId`, `isPolling`
- Boolean prefixes: `is`, `has`: `isVisible`, `hasAllInputs`, `isPolling`
- Function names: camelCase: `handleCallStart`, `updateField`, `calculate`

## Where to Add New Code

**New Feature (e.g., new page/journey):**
- Primary code: `./src/pages/[NewPage].jsx`
- Supporting components: `./src/components/[Feature]/`
- Custom hooks: `./src/hooks/use[Feature].js`
- Tests: `./src/pages/[NewPage].test.jsx` (pattern not established, create if needed)

**New Component (reusable UI element):**
- Implementation: `./src/components/[ComponentName].jsx`
- If component has complex logic, extract hook: `./src/hooks/use[ComponentName].js`
- Register in parent page

**New Hook (state/side effect logic):**
- Implementation: `./src/hooks/use[HookName].js`
- Export from hook file
- Use in components via import

**Utilities (shared functions, constants):**
- No utilities directory exists; add to `./src/utils/` if needed
- Or embed in hook files (current pattern)

**Styles:**
- Component-scoped: Use Tailwind classes inline in JSX
- Global/animations: Add to `./src/index.css`
- Theme variables: Define in `:root` block in `index.css`

**Static Assets:**
- Images: `./src/assets/`
- Icons: Use Lucide React (don't add icon files)

## Special Directories

**src/assets/:**
- Purpose: Logo and static images
- Generated: No
- Committed: Yes
- Notes: Only contains logo PNG and unused react.svg

**.planning/codebase/:**
- Purpose: Architecture and code analysis documents
- Generated: No (user-created)
- Committed: Yes
- Notes: New directory created for GSD mapping

**./skills/:**
- Purpose: External skill packages (get-shit-done, n8n-skills)
- Generated: No (git submodules)
- Committed: Yes
- Notes: Not part of main application code

**node_modules/:**
- Purpose: Installed dependencies
- Generated: Yes (npm install)
- Committed: No

**dist/:**
- Purpose: Production build output
- Generated: Yes (npm run build)
- Committed: No

## Route Structure

**Active Routes:**
- `/` → Home.jsx
- `/about` → About.jsx (Coming Soon placeholder)
- `/audit` → Audit.jsx (Protected booking form)

**Redirect Routes:**
- `/begin` → redirects to `/audit`
- `/services` → redirects to `/`

**Legacy Pages (in src/ but not routed):**
- Begin.jsx (functionality moved to Audit)
- Book.jsx
- Contact.jsx
- Services.jsx
- Home-redesign.jsx

---

*Structure analysis: 2026-02-09*
