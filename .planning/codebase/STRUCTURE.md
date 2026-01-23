# Codebase Structure

**Analysis Date:** 2026-01-23

## Directory Layout

```
leviathan-systems/
├── .claude/                # Claude Code configuration
├── .planning/              # GSD planning artifacts
│   ├── codebase/          # Codebase analysis documents
│   └── milestones/        # Phase planning documents
├── dist/                   # Production build output (generated)
├── node_modules/           # npm dependencies (generated)
├── public/                 # Static assets served at root
├── src/                    # Application source code
│   ├── assets/            # Images, logos
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layout components
│   ├── pages/             # Route page components
│   ├── App.jsx            # Root app component with routing
│   ├── main.jsx           # Application entry point
│   ├── index.css          # Global styles and Tailwind imports
│   └── index-redesign.css # Alternative stylesheet (unused)
├── index.html              # HTML entry point
├── package.json            # npm dependencies and scripts
├── vite.config.js          # Vite build configuration
├── eslint.config.js        # ESLint configuration
├── CLAUDE.md               # Project instructions for Claude Code
└── README.md               # Project documentation
```

## Directory Purposes

**src/pages/:**
- Purpose: Top-level page components for each route
- Contains: Full-page views rendered by React Router
- Key files: `Home.jsx`, `Audit.jsx`, `About.jsx`, `Begin.jsx` (legacy), `Book.jsx` (legacy), `Services.jsx` (legacy), `Infrastructure.jsx` (legacy)
- Active routes: Home (`/`), Audit (`/audit`), About (`/about`)

**src/components/:**
- Purpose: Reusable UI components used across pages
- Contains: Standalone components with props-based configuration
- Key files:
  - `VapiCallButton.jsx` - Voice call demo button with state management
  - `DemoSection.jsx` - Live demo coordinator (combines button + terminal)
  - `LiveMonitorTerminal.jsx` - Real-time data display terminal
  - `LossCalculator.jsx` - Revenue loss calculator widget
  - `ScrollToTop.jsx` - Router integration for scroll-to-top behavior
  - `SystemDiagram.jsx` - Animated system visualization
  - `AnimatedStats.jsx` - Number counter animation component

**src/hooks/:**
- Purpose: Custom React hooks encapsulating stateful logic
- Contains: Reusable hooks for side effects and external integrations
- Key files:
  - `useVapiCall.js` - Vapi voice SDK integration
  - `useLiveMonitor.js` - n8n endpoint polling for demo data
  - `useScrollAnimation.js` - IntersectionObserver-based scroll animations

**src/layouts/:**
- Purpose: Page layout wrappers
- Contains: Layout components providing navigation/footer structure
- Key files: `MainLayout.jsx` - Primary layout with header, footer, mobile menu

**src/assets/:**
- Purpose: Static images and media files
- Contains: Logo files, graphics
- Key files: `Fully New Improved Leviathan Systems Logo.png`

**public/:**
- Purpose: Static files served directly at root URL
- Contains: favicon, robots.txt, other root-level assets
- Key files: `favicon.png`

**.planning/:**
- Purpose: GSD planning artifacts and codebase documentation
- Contains: Codebase analysis docs, milestone plans
- Key directories: `codebase/`, `milestones/`

## Key File Locations

**Entry Points:**
- `index.html`: HTML entry point, loads fonts and Calendly widget
- `src/main.jsx`: JavaScript entry point, mounts React app
- `src/App.jsx`: Routing configuration and layout wrapper

**Configuration:**
- `vite.config.js`: Vite bundler configuration (React + Tailwind plugins)
- `package.json`: Dependencies, scripts, project metadata
- `eslint.config.js`: Linting rules
- `CLAUDE.md`: Project instructions and constraints for Claude Code

**Core Logic:**
- `src/pages/Home.jsx`: Main landing page with hero, demo, calculator, CTAs
- `src/pages/Audit.jsx`: Multi-step form with Calendly booking integration
- `src/components/VapiCallButton.jsx`: Voice call interaction
- `src/hooks/useVapiCall.js`: Vapi SDK wrapper
- `src/hooks/useLiveMonitor.js`: Real-time polling for demo data

**Styling:**
- `src/index.css`: Global CSS, Tailwind imports, CSS animations, CSS variables

## Naming Conventions

**Files:**
- **Components/Pages/Layouts:** PascalCase with `.jsx` extension (e.g., `VapiCallButton.jsx`, `MainLayout.jsx`, `Home.jsx`)
- **Hooks:** camelCase with `.js` extension, prefixed with `use` (e.g., `useVapiCall.js`, `useLiveMonitor.js`)
- **Config files:** kebab-case with appropriate extension (e.g., `vite.config.js`, `eslint.config.js`)
- **Documentation:** UPPERCASE.md (e.g., `CLAUDE.md`, `README.md`)

**Components:**
- PascalCase for component names matching file names
- Named exports for multi-component files (e.g., `export function VapiCallButton`)
- Default exports for single-component files (e.g., `export default Home`)

**Directories:**
- Lowercase, singular nouns (e.g., `components/`, `hooks/`, `pages/`)
- Exception: `layouts/` uses plural

**Variables:**
- camelCase for variables and functions (e.g., `callStatus`, `startPolling`)
- SCREAMING_SNAKE_CASE for constants (e.g., `VAPI_PUBLIC_KEY`, `VAPI_ASSISTANT_ID`)

## Where to Add New Code

**New Page:**
- Primary code: `src/pages/NewPage.jsx`
- Add route in: `src/App.jsx` inside `<Routes>` block
- Import in App.jsx: `import NewPage from './pages/NewPage'`
- Tests: Not currently using test framework

**New Reusable Component:**
- Implementation: `src/components/ComponentName.jsx`
- Import in pages: `import ComponentName from '../components/ComponentName'`
- Use props for configuration, callbacks for parent communication

**New Custom Hook:**
- Implementation: `src/hooks/useHookName.js`
- Import in components: `import { useHookName } from '../hooks/useHookName'`
- Name must start with `use` per React conventions

**Utilities/Helpers:**
- No dedicated utils directory currently
- Helper functions defined inline within components/hooks
- Consider creating `src/utils/` if shared utilities emerge

**New Route:**
1. Create page component in `src/pages/`
2. Import page in `src/App.jsx`
3. Add `<Route>` element inside MainLayout routes
4. Route paths are relative (e.g., `path="about"` not `path="/about"`)

**External Service Integration:**
- Create custom hook in `src/hooks/` wrapping the integration
- Example pattern: See `useVapiCall.js` for SDK integration, `useLiveMonitor.js` for HTTP polling
- Store API keys/endpoints as constants at top of hook file or component

## Special Directories

**dist/:**
- Purpose: Production build output from Vite
- Generated: Yes (by `npm run build`)
- Committed: No (in .gitignore)
- Contents: Minified JS/CSS bundles, processed HTML, optimized assets

**node_modules/:**
- Purpose: npm package dependencies
- Generated: Yes (by `npm install`)
- Committed: No (in .gitignore)
- Contents: Third-party packages and their dependencies

**.planning/:**
- Purpose: GSD planning system artifacts
- Generated: Yes (by GSD commands)
- Committed: Yes (planning docs tracked in git)
- Contents: Codebase analysis, milestone plans, implementation tracking

**.claude/:**
- Purpose: Claude Code configuration
- Generated: No (manually configured)
- Committed: Partially (settings.local.json ignored)
- Contents: Claude Code settings and preferences

**public/:**
- Purpose: Static assets served directly without processing
- Generated: No (manually maintained)
- Committed: Yes
- Contents: favicon, any root-level static files
- Access: Files served at root URL (e.g., `public/favicon.png` → `/favicon.png`)

## File Organization Patterns

**Component Co-location:**
- Components and their logic live in single files
- No separate `.css` files per component (Tailwind used for styling)
- Helper functions defined at top of component file if only used there

**Import Order Pattern:**
- External packages first (React, third-party libraries)
- Internal absolute imports next (components, hooks)
- Relative imports last (assets)
- Example from `src/pages/Home.jsx`:
  ```javascript
  import { useNavigate } from 'react-router-dom'  // External
  import { ArrowRight, Phone } from 'lucide-react'  // External icons
  import LossCalculator from '../components/LossCalculator'  // Internal component
  import { useScrollAnimation } from '../hooks/useScrollAnimation'  // Internal hook
  ```

**Protected Pages Note:**
- `src/pages/Audit.jsx`, `src/pages/Begin.jsx`, `src/pages/Book.jsx` marked as protected in CLAUDE.md
- These contain critical form/booking logic - modifications require explicit approval
- Current active booking flow is `/audit` route

---

*Structure analysis: 2026-01-23*
