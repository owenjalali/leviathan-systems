# Coding Conventions

**Analysis Date:** 2026-01-23

## Naming Patterns

**Files:**
- React components: PascalCase with `.jsx` extension (`VapiCallButton.jsx`, `MainLayout.jsx`)
- Custom hooks: camelCase with `use` prefix, `.js` extension (`useVapiCall.js`, `useLiveMonitor.js`, `useScrollAnimation.js`)
- Pages: PascalCase in `src/pages/` directory (`Home.jsx`, `About.jsx`, `Audit.jsx`)
- Layouts: PascalCase in `src/layouts/` directory (`MainLayout.jsx`)

**Functions:**
- Component functions: PascalCase matching filename (`export default function Home()`, `export function VapiCallButton()`)
- Helper functions: camelCase (`handleStartCall`, `detectChangedFields`, `scrollToCalculator`)
- Hook functions: camelCase with `use` prefix (`useVapiCall`, `useLiveMonitor`, `useTypewriter`)

**Variables:**
- State variables: camelCase (`callStatus`, `volumeLevel`, `mousePos`, `isLoaded`)
- Constants: SCREAMING_SNAKE_CASE for API keys/config (`VAPI_PUBLIC_KEY`, `VAPI_ASSISTANT_ID`)
- Configuration objects: camelCase (`statusConfig`, `fieldConfig`, `events`)
- Refs: camelCase with `Ref` suffix (`mountedRef`, `vapiRef`, `heroRef`, `prevStatusRef`)

**CSS Classes:**
- Tailwind utility classes exclusively - no custom CSS classes
- CSS variables: kebab-case with `--color-` prefix (`--color-accent`, `--color-text-primary`, `--color-bg`)
- Animation names: kebab-case (`fade-in-up`, `pulse-glow`, `scan-line`)

## Code Style

**Formatting:**
- Tool: ESLint v9 with flat config system
- Config: `eslint.config.js` (flat config format)
- No Prettier config detected - relying on ESLint for formatting

**Linting:**
- Tool: ESLint v9.39.1
- Base: `@eslint/js` recommended config
- Plugins: `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- ECMAScript: 2020, JSX enabled, browser globals
- Custom rules:
  - `no-unused-vars` with pattern exception for uppercase variables (`{ varsIgnorePattern: '^[A-Z_]' }`)
- Run: `npm run lint`

**Indentation:**
- 2 spaces (observed consistently across all files)

**Quotes:**
- Single quotes for strings
- Template literals for interpolation

**Semicolons:**
- Not used - omitted throughout codebase

**Line Length:**
- No enforced limit, but lines generally wrap around 100-120 characters

## Import Organization

**Order:**
1. External dependencies (React, React Router, third-party libraries)
2. Local components (relative imports from `../components/`)
3. Local hooks (relative imports from `../hooks/`)
4. Assets (images, logos)

**Example from `src/pages/Home.jsx`:**
```javascript
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare, Clock, Check, Users, Calendar, Shield, Eye } from 'lucide-react'
import LossCalculator from '../components/LossCalculator'
import { DemoSection } from '../components/DemoSection'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useState, useRef } from 'react'
```

**Path Aliases:**
- Not configured - all imports use relative paths (`../components/`, `../hooks/`, `../layouts/`)

**Import Style:**
- Default exports: `import ComponentName from './path'`
- Named exports: `import { functionName } from './path'`
- Destructured imports for multiple exports: `import { a, b, c } from 'library'`

## Error Handling

**Patterns:**
- Try-catch blocks for async operations in hooks (`src/hooks/useVapiCall.js`, `src/hooks/useLiveMonitor.js`)
- Mounted ref checks to prevent state updates after unmount (`if (!mountedRef.current) return`)
- Error state stored in component state, cleared on retry (`setError(null)`)
- HTTP 404 handled as non-error case (expected in polling scenario)

**Example from `src/hooks/useLiveMonitor.js`:**
```javascript
try {
  const response = await fetch(endpoint)

  if (response.status === 404) {
    return // Expected, not an error
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const result = await response.json()
  if (!mountedRef.current) return

  setData(result)
  setError(null)
} catch (err) {
  if (!mountedRef.current) return
  setError(err.message || 'Failed to fetch demo data')
}
```

## Logging

**Framework:** Native `console` methods

**Patterns:**
- `console.warn()` for non-critical issues (`useVapiCall: No public key provided`)
- `console.error()` for critical errors (`useVapiCall: Vapi instance not initialized`)
- No logging in production code beyond warnings/errors
- No logging framework or structured logging detected

## Comments

**When to Comment:**
- JSDoc for component/hook purpose and API (`src/components/VapiCallButton.jsx`, `src/hooks/useVapiCall.js`)
- Section dividers in large files (`/* ============ HERO SECTION ============ */`)
- Complex logic explanations (volume level calculations, state transitions)
- Hook parameter documentation

**JSDoc/TSDoc:**
- Used extensively for exported components and hooks
- Includes `@param` and `@property` tags
- Describes purpose, state, and behavior
- Example from `src/hooks/useVapiCall.js`:

```javascript
/**
 * useVapiCall - Vapi SDK integration hook for voice calls
 *
 * Manages Vapi SDK lifecycle, call states, and event handling.
 * Generates unique session IDs for each call and passes to assistant.
 *
 * @param {string} publicKey - Vapi public API key
 * @returns {Object} Hook state and controls
 * @property {'idle'|'connecting'|'active'|'ending'} callStatus - Current call state
 * @property {number} volumeLevel - Current volume level (0-1) for audio visualization
 * @property {Error|null} error - Error object if call failed
 */
```

**Inline Comments:**
- Used to explain non-obvious logic
- Clarify intent behind state transitions
- Document timing/delay decisions

## Function Design

**Size:**
- Components: 50-650 lines (large components like `Home.jsx` are acceptable)
- Hooks: 50-175 lines
- Helper functions: 10-50 lines
- Prefer extracting sub-components over splitting large components

**Parameters:**
- Components receive props destructured in signature: `function Component({ prop1, prop2, className = '' })`
- Hooks receive config parameters: `useVapiCall(publicKey)`
- Default parameters for optional values: `className = ''`, `metadata = {}`

**Return Values:**
- Components return JSX
- Hooks return object with named properties: `return { callStatus, volumeLevel, error, startCall, stopCall }`
- Helper functions return values directly

**Example from `src/hooks/useVapiCall.js`:**
```javascript
export function useVapiCall(publicKey) {
  const [callStatus, setCallStatus] = useState('idle')
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [error, setError] = useState(null)

  // ... implementation

  return {
    callStatus,
    volumeLevel,
    error,
    startCall,
    stopCall,
    clearError
  }
}
```

## Module Design

**Exports:**
- Default export for main component: `export default function ComponentName()`
- Named exports for utilities/sub-components: `export function HelperComponent()`
- One component per file (except small helper components)

**Barrel Files:**
- Not used - direct imports from component files

**File Organization:**
- Components in `src/components/`
- Custom hooks in `src/hooks/`
- Pages in `src/pages/`
- Layouts in `src/layouts/`
- Single entry point: `src/main.jsx`

## React Patterns

**Hooks Usage:**
- `useState` for component state
- `useEffect` for side effects, subscriptions, cleanup
- `useRef` for mutable values, DOM refs, preventing stale closures
- `useCallback` for memoized callbacks (especially in custom hooks)
- Custom hooks for reusable stateful logic

**State Management:**
- Local component state with `useState`
- `useRef` for values that don't trigger re-renders
- Props drilling for simple data flow
- Session storage for cross-page data (`sessionStorage.setItem('calculatorResults', ...)`)
- No global state management library (Redux, Zustand, etc.)

**Event Handlers:**
- Named with `handle` prefix: `handleStartCall`, `handleLogoClick`, `handleDismissError`
- Defined inline for simple handlers, extracted for complex logic
- Optional chaining for callbacks: `onCallStart?.(sessionId)`

**Conditional Rendering:**
- Ternary operators: `{isActive ? <ComponentA /> : <ComponentB />}`
- Logical AND: `{showError && <ErrorDisplay />}`
- Early returns in functions: `if (!error) return null`

---

*Convention analysis: 2026-01-23*
