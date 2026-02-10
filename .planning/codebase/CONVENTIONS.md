# Coding Conventions

**Analysis Date:** 2026-02-09

## Naming Patterns

**Files:**
- React components: PascalCase with .jsx extension (e.g., `VapiCallButton.jsx`, `LossCalculator.jsx`)
- Hooks: camelCase with use prefix and .js extension (e.g., `useVapiCall.js`, `useScrollAnimation.js`)
- Pages: PascalCase with .jsx extension (e.g., `Home.jsx`, `About.jsx`)
- Utilities: camelCase (e.g., `getDecayRate`, `formatCurrency`)
- Config files: lowercase with dots (e.g., `eslint.config.js`, `vite.config.js`, `tailwind.config.js`)

**Functions and Hooks:**
- Exported hooks: camelCase with `use` prefix (e.g., `useVapiCall`, `useScrollAnimation`, `useLiveMonitor`)
- Component functions: PascalCase (e.g., `VapiCallButton`, `AudioBars`, `ErrorDisplay`)
- Helper functions: camelCase (e.g., `getDecayRate`, `formatCurrency`, `detectChangedFields`)
- Event handlers: camelCase starting with `handle` prefix (e.g., `handleStartCall`, `handleStopCall`, `handleSubmit`)
- Computed/derived state: camelCase or adjective descriptors (e.g., `elapsedTime`, `isDisabled`, `showResults`)

**Variables:**
- State variables: camelCase (e.g., `leadsPerWeek`, `volumeLevel`, `callStatus`)
- Refs: camelCase with `Ref` suffix (e.g., `vapiRef`, `mountedRef`, `heroRef`, `prevStatusRef`)
- Constants: camelCase for module-level, UPPERCASE for API keys/config (e.g., `VAPI_PUBLIC_KEY`, `VAPI_ASSISTANT_ID`, `responseOptions`)
- Boolean flags: camelCase starting with `is`, `has`, `should`, `can` prefixes (e.g., `isActive`, `hasAllInputs`, `showResults`)

**Types/Classes:**
- React component names: PascalCase (e.g., `VapiCallButton`, `LossCalculator`)
- Object configuration objects: camelCase (e.g., `statusConfig`, `fieldConfig`, `events`)

## Code Style

**Formatting:**
- Tool: ESLint (flat config)
- Indentation: 2 spaces
- Line breaks: Uses actual newlines (not escaped)
- Arrow functions preferred over function declarations for callbacks and handlers
- Template literals used for string interpolation and conditional classes

**Linting:**
- Tool: ESLint v9.39.1 with flat config (`eslint.config.js`)
- Key rules enforced:
  - `no-unused-vars`: Error, with pattern `^[A-Z_]` ignored (allows unused component props, constants)
  - React Hooks rules from `eslint-plugin-react-hooks`
  - React Refresh rules from `eslint-plugin-react-refresh`
- Recommended config from `@eslint/js`
- No Prettier configured; formatting relies on ESLint rules

**JSDoc/TSDoc:**
- Used extensively for public hooks and components with complex interfaces
- Format: Block comments with `@param`, `@returns`, `@property` tags
- Example from `useVapiCall.js`:
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

## Import Organization

**Order:**
1. React and React Router imports (e.g., `import { useState, useEffect } from 'react'`)
2. Third-party libraries (e.g., `import { Phone, PhoneOff } from 'lucide-react'`)
3. Vapi SDK (e.g., `import Vapi from '@vapi-ai/web'`)
4. Custom hooks (e.g., `import { useVapiCall } from '../hooks/useVapiCall'`)
5. Custom components (e.g., `import LossCalculator from '../components/LossCalculator'`)
6. Utilities and data (e.g., `import logo from '../assets/...'`)

**Path Aliases:**
- No aliases configured; uses relative paths (e.g., `../components/`, `../hooks/`, `../pages/`)
- Paths follow directory structure without shortcuts

## Error Handling

**Patterns:**
- Try-catch blocks used in async functions for SDK calls and fetch operations
- Errors logged to console with prefixed context labels: `[hookName]` or `[ComponentName]`
  - Example: `console.error('[useVapiCall] Error starting call:', err)`
  - Example: `console.warn('useVapiCall: No public key provided')`
- Error state managed in React hooks (e.g., `error` state in `useVapiCall`)
- Error UI components display errors with retry buttons and auto-dismiss timers (e.g., `ErrorDisplay` in `VapiCallButton.jsx`)
- Network errors distinguish between 404 (not-yet-found, expected) and actual errors
- Validation errors tracked in component state as boolean flags (e.g., `errors.leadsPerWeek`)

## Logging

**Framework:** `console.*` methods (no logging library)

**Patterns:**
- `console.warn()`: Non-fatal issues, missing config, expected degradations (e.g., "No public key provided")
- `console.error()`: Actual errors that affect functionality (e.g., "Error starting call", "Vapi instance not initialized")
- `console.log()`: Debug/development info, used with prefixes for traceability (e.g., `[useLiveMonitor] Fetching from:`)
- Prefixes follow the format `[HookName]` or `[ComponentName]` to indicate source
- Used primarily in hooks for SDK integration, polling, and state transitions
- Development debugging present in demo components (e.g., `DemoSection.jsx` logs call status)

## Comments

**When to Comment:**
- Block comments (/** ... */) at top of functions/components for public API documentation
- Inline comments for complex logic, temporary workarounds, or non-obvious algorithms
- Section comments marking major logical blocks (e.g., `// Animated counter for 78%`, `// Parallax mouse tracking`)
- Comments explain WHY, not WHAT (code should be self-documenting for WHAT)

**Examples:**
- Inline comments in `VapiCallButton.jsx`: "min 20% when active" explaining height calculations
- Section comments in `Home.jsx`: "// HERO — CLEAR VALUE PROPOSITION", "// Animated counter for 78%"
- Comments in `LossCalculator.jsx`: "// Preserve sessionId for polling continuation"
- In `useLiveMonitor.js`: "// 404 means no data yet - this is expected, not an error"

## Function Design

**Size:**
- Components: 50-300 lines (larger components break into smaller sub-components, e.g., `AudioBars`, `ErrorDisplay` extracted from `VapiCallButton`)
- Hooks: 50-200 lines
- Utility functions: 5-30 lines (pure functions like `getDecayRate`, `formatCurrency`)

**Parameters:**
- Components accept props as destructured objects with optional default values
- Hooks return objects with multiple named properties for easy destructuring
- Callback functions use optional pattern (e.g., `onCallStart?.()`)
- Prefer object parameters over multiple positional args (e.g., `{ onCallStart, onCallEnd, className }`)

**Return Values:**
- Components: JSX element
- Hooks: Objects with state, functions, and computed values (e.g., `{ callStatus, volumeLevel, error, sessionId, startCall, stopCall, clearError }`)
- Utility functions: Primitive values or simple objects
- Array returns use tuple destructuring pattern (e.g., `const [ref, isVisible] = useScrollAnimation()`)

## Module Design

**Exports:**
- Default export for page components (e.g., `export default function Home() {}`)
- Named exports for hooks (e.g., `export function useVapiCall()`)
- Named exports for sub-components (e.g., `function AudioBars()` then used internally, not exported in this file)
- Components sometimes include internal sub-components defined in the same file when tightly coupled

**Barrel Files:**
- Not used; imports are from individual files
- No index.js re-exports in component directories

## Styling

**Framework:** Tailwind CSS v4 with `@tailwindcss/vite` plugin

**Patterns:**
- Inline class strings for component styles
- Template literals for conditional classes
- CSS custom variables for colors (defined in `index.css` under `:root`)
  - `--color-bg`, `--color-accent`, `--color-text-primary`, etc.
  - Used via `var(--color-*)` in Tailwind and inline styles
- Responsive design using Tailwind breakpoints (e.g., `md:`, `lg:`, `sm:`)
- Animations defined in `index.css` and referenced in Tailwind (e.g., `animate-pulse-glow`, `animate-bar-idle`)
- Inline style objects used for dynamic values that can't be expressed in Tailwind (e.g., `style={{ transform: 'scaleY(...)' }}`)

**Example:** From `VapiCallButton.jsx`:
```jsx
className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold rounded-lg
           hover:bg-[var(--color-accent-hover)] transition-all duration-200
           flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
```

---

*Convention analysis: 2026-02-09*
