# Codebase Concerns

**Analysis Date:** 2026-02-09

## Security Issues

**Hardcoded API Credentials:**
- Issue: Vapi public key and assistant ID are hardcoded in source code
- Files: `src/components/VapiCallButton.jsx` (lines 6-7)
  - `VAPI_PUBLIC_KEY = '935fb085-0c34-4f20-82cf-76cff78f3934'`
  - `VAPI_ASSISTANT_ID = '955decb7-0492-40c9-b788-0b0e16f73a0a'`
- Impact: Credentials are exposed in version control and public codebase. While these are "public" keys per Vapi's design, storing them hardcoded violates secure configuration best practices. If API key permission changes, it's difficult to rotate.
- Fix approach: Move credentials to environment variables (`.env.local` for development, process.env for production via Vercel). Use `import.meta.env.VITE_*` for Vite environment variables.

**Missing Environment Configuration:**
- Issue: No `.env.example` or documented environment variables
- Files: Project root
- Impact: New developers won't know what environment variables are required. Production deployment may fail without proper env var setup.
- Fix approach: Create `.env.example` with placeholder values for `VITE_VAPI_PUBLIC_KEY`, `VITE_VAPI_ASSISTANT_ID`, and any other external APIs.

---

## Performance Concerns

**Excessive Console Logging in Production:**
- Issue: Verbose console logs throughout app remain active in production
- Files:
  - `src/hooks/useLiveMonitor.js` (14 console.log/warn/error calls)
  - `src/hooks/useVapiCall.js` (3 console calls)
  - `src/components/DemoSection.jsx` (4 console.log calls)
- Impact: Console spam reduces performance slightly; verbose logs expose internal architecture to users and competitors. Logs are not captured or monitored anywhere.
- Fix approach: Use conditional logging based on environment (e.g., `if (import.meta.env.DEV)`) or implement a logging service that doesn't output to browser console in production.

**Polling Without Backoff Strategy:**
- Issue: `useLiveMonitor` polls n8n endpoint every 1 second with no exponential backoff or rate limiting
- Files: `src/hooks/useLiveMonitor.js` (line 149)
- Impact: If n8n webhook is slow or overwhelmed, constant polling at 1s interval will create load. No jitter means all clients hammer the endpoint simultaneously.
- Fix approach: Implement exponential backoff for failed requests, add jitter to polling interval, or implement server-side rate limiting headers detection.

**LiveMonitorTerminal Typewriter Animation Performance:**
- Issue: Typewriter effect uses `setInterval` with string slicing at every character (30ms default)
- Files: `src/components/LiveMonitorTerminal.jsx` (lines 105-121)
- Impact: High frequency re-renders with substring operations. For long summary text, this causes unnecessary DOM updates and CPU usage.
- Fix approach: Use `requestAnimationFrame` instead of `setInterval` for smoother animation with frame-sync performance.

---

## Fragile Areas

**Complex State Management in LiveMonitorTerminal:**
- Files: `src/components/LiveMonitorTerminal.jsx` (355 lines)
- Why fragile: Multiple interdependent state flows:
  - Summary typewriter state depends on `data?.data?.final_summary` and `summaryShownRef`
  - Event visibility depends on `status === 'captured'` and `visibleEvents` array
  - Control statement visibility depends on `summaryComplete && visibleEvents.length === events.length`
  - Changes to data flow or visibility logic easily break animation timing
- Safe modification: Changes to animation logic must verify all three completion conditions (summary, events, control). Consider extracting animation orchestration to separate custom hook.
- Test coverage: No tests exist for animation state transitions. Risk of flashing/stuttering on edge cases.

**Polling and Call State Coupling:**
- Files: `src/components/DemoSection.jsx`, `src/hooks/useLiveMonitor.js`, `src/components/VapiCallButton.jsx`
- Why fragile: Session ID and polling state must sync perfectly:
  - Session ID created on call start (`useVapiCall` hook)
  - Must be passed to polling hook (`useLiveMonitor`) via parent component
  - Polling continues after call ends, preserving session ID
  - If call ends before polling stops, stale requests occur; if polling stops too early, data loss
- Safe modification: Changes to call lifecycle must update `DemoSection` to ensure polling cleanup aligns with call termination.
- Test coverage: No integration tests for call-to-polling flow. Risk: session ID timing mismatches go undetected.

**Form Validation and Navigation:**
- Files: `src/pages/Audit.jsx` (690 lines)
- Why fragile: Complex multi-step form with calculator result passing via `sessionStorage`:
  - Calculator results passed via `sessionStorage` from `Home.jsx` → `Audit.jsx`
  - Form state persists via local component state (no persistence)
  - Validation errors require scrollIntoView targeting specific DOM elements
  - Step navigation tightly coupled to form validation
- Safe modification: Avoid changing validation logic without testing all step transitions. Store results in React Context instead of sessionStorage for reliability.
- Test coverage: No tests for form flow or sessionStorage data handling.

---

## Missing Error Handling

**Unhandled Network Failures in Polling:**
- Issue: `useLiveMonitor` hook handles 404 and errors gracefully, but parent components don't indicate polling failure to user
- Files: `src/hooks/useLiveMonitor.js` (lines 110-118), `src/components/DemoSection.jsx`
- Impact: If n8n endpoint is down, user sees "System Ready" terminal state forever. No indication that data capture failed.
- Fix approach: Pass error state through to `DemoSection` and `LiveMonitorTerminal` to show "Connection Lost" or "Unable to fetch data" message.

**Vapi Call Errors Auto-Dismiss:**
- Issue: Error display auto-dismisses after 7 seconds regardless of error severity
- Files: `src/components/VapiCallButton.jsx` (lines 72-78)
- Impact: Critical errors (network failure, permission denied) disappear before user can take action. Only "Retry" button visible during error window.
- Fix approach: Keep errors visible until dismissed by user or call is retried. Differentiate error types (temporary vs permanent) with different auto-dismiss timings.

---

## Data Integrity Risks

**Calculator Results Lost on Page Refresh:**
- Issue: `LossCalculator` passes results via callback to parent, then via `sessionStorage` to `Audit` page
- Files: `src/pages/Home.jsx` (line 80), `src/pages/Audit.jsx` (lines 44-49)
- Impact: If user refreshes `Audit` page, calculator results disappear. No validation that results exist before using them.
- Fix approach: Store results in React Context or URL query params. Add fallback UI if results missing.

**No Input Validation on N8N Response:**
- Issue: `useLiveMonitor` hook uses response data without schema validation
- Files: `src/hooks/useLiveMonitor.js` (lines 86-106)
- Impact: If n8n webhook returns malformed data, `changedFields` detection breaks. UI may crash if expected fields missing.
- Fix approach: Validate response schema with Zod or similar. Provide type-safe data extraction with defaults.

---

## Test Coverage Gaps

**No Unit Tests Exist:**
- Impact: Critical hooks and components lack test coverage
- Untested areas:
  - `useLiveMonitor.js` - Polling logic, changed field detection, error handling
  - `useVapiCall.js` - Vapi SDK lifecycle, session ID generation, event handling
  - `LiveMonitorTerminal.jsx` - Typewriter animation timing, event visibility, status transitions
  - `LossCalculator.jsx` - Calculation accuracy, validation logic, result generation

**No Integration Tests:**
- Impact: Multi-component flows untested
- Gaps:
  - Call start → polling flow → data display
  - Calculator form → session storage → Audit page
  - Form validation with calculator results

**No E2E Tests:**
- Impact: User journeys from Home to Audit to form submission untested
- Risk: Formspree integration, Calendly embedding, and booking flows could break silently

---

## Dependencies at Risk

**React 19.2.0:**
- Status: Latest major version with potential breaking changes
- Risk: Component lifecycle hooks may behave differently than React 18. `useEffect` cleanup timing changed.
- Mitigation: Monitor for issues with concurrent rendering and cleanup order.

**React Router v7:**
- Status: Recent major version upgrade
- Risk: Navigation behavior and hook APIs differ from v6. `useNavigate` behavior may change.
- Mitigation: Document any router-specific configurations. Test navigation flows thoroughly.

**Vapi SDK (@vapi-ai/web v2.5.2):**
- Status: External dependency, version may be outdated
- Risk: API changes, security patches, bug fixes
- Mitigation: Monitor Vapi changelog. Lock version in package-lock.json (already done). Set up automated dependency updates.

**No Typescript Despite Complex State:**
- Risk: Without type checking, component prop contracts are implicit. Easy to pass wrong types to components.
- Impact: Runtime errors in production when props are unexpected.
- Fix approach: Migrate to TypeScript or add JSDoc type annotations for critical components.

---

## Deployment & Configuration Issues

**No Build Output Optimization:**
- Issue: Vite configuration is minimal
- Files: `vite.config.js`
- Impact: No code splitting, no asset optimization, no environment-specific builds
- Fix approach: Add build configuration for production: code splitting, asset compression, source maps for staging only.

**Tailwind v4 Verification Script Unused:**
- Issue: `verify:tailwind` script in package.json exists but not documented or run in CI
- Files: `package.json` (line 11), `scripts/verify-tailwind-v4.mjs`
- Impact: Tailwind configuration drift goes undetected. Build may fail in CI if verification not run.
- Fix approach: Add pre-build hook or CI step to run verification automatically.

**No Pre-commit Hooks:**
- Issue: Code can be committed without linting
- Impact: Console logs, debugging code, style issues slip into production
- Fix approach: Add husky with pre-commit lint-staged hooks.

---

## Code Quality Issues

**Unused State and Refs:**
- Files: `src/components/VapiCallButton.jsx` - `isSpeaking` state generated but never used (lines 24)
- Impact: Dead code adds confusion. Suggests incomplete feature or oversight.
- Fix approach: Remove unused `isSpeaking` from hook or implement talk-detection UI.

**Magic Numbers Throughout:**
- Animation delays: 3000ms, 400ms, 100ms, 2000ms hardcoded throughout
- Polling interval: 1000ms hardcoded in `useLiveMonitor`
- Decay rate thresholds: 5, 15, 60, 240, 1440 minutes in `LossCalculator`
- Impact: Difficult to adjust timing globally. No single source of truth for animation/polling constants.
- Fix approach: Extract to constants file: `src/config/timing.js` with POLLING_INTERVAL, ANIMATION_DELAYS, etc.

**Parallel State Updates:**
- Files: `src/pages/Home.jsx` - Multiple `useState` calls managing related animation states (lines 15-19)
- Impact: Difficult to reason about state synchronization. Could lead to inconsistent UI state.
- Fix approach: Consider `useReducer` for coordinated animation state.

---

## Known Browser/Platform Issues

**No Mobile Testing Documentation:**
- Components use responsive classes, but no documented mobile testing procedure
- Risk: Responsive behavior breaks on new screen sizes
- Fix approach: Document mobile viewport breakpoints used. Add mobile testing to QA checklist.

**No Accessibility Audit:**
- Alert: Components have interactive elements but no ARIA labels or role attributes
- Impact: Screen reader users cannot navigate form or call button
- Files: `src/components/VapiCallButton.jsx`, `src/pages/Audit.jsx`
- Fix approach: Add `aria-label`, `aria-describedby`, `role` attributes. Test with screen readers.

---

## Production Readiness Gaps

**No Error Boundary:**
- Issue: No React Error Boundary component exists
- Impact: Single component crash crashes entire app
- Fix approach: Add Error Boundary wrapper in `MainLayout.jsx` with fallback UI.

**No Rate Limiting Awareness:**
- Vapi API calls and n8n polling have no rate limit detection
- Risk: High call volume could trigger rate limiting silently
- Fix approach: Parse rate limit headers from responses and backoff accordingly.

**No Monitoring/Analytics:**
- No tracking of call success/failure rates, polling errors, or user interactions
- Impact: Production issues go undetected until user reports
- Fix approach: Integrate Sentry for error tracking. Add analytics for call completion rates.

---

## Scalability Concerns

**Polling at 1s Interval Doesn't Scale:**
- Each active demo call polls n8n every 1 second
- If 10 concurrent demo calls → 10 requests/second to n8n webhook
- If 100 concurrent → 100 requests/second
- Impact: n8n webhook becomes bottleneck at scale
- Fix approach: Implement WebSocket or Server-Sent Events (SSE) instead of polling. Implement client-side rate limiting with request coalescing.

**Live Monitor Component Re-renders on Every Interval:**
- Issue: Typewriter effect triggers re-render every 30ms
- Impact: 200+ re-renders per second for visible component tree
- Fix approach: Memoize sub-components with `React.memo`. Use `useCallback` for event handlers.

---

*Concerns audit: 2026-02-09*
