# Codebase Concerns

**Analysis Date:** 2026-01-23

## Tech Debt

**Hardcoded API Credentials in Source:**
- Issue: Vapi public key and assistant ID are hardcoded directly in `src/components/VapiCallButton.jsx` lines 6-7
- Files: `src/components/VapiCallButton.jsx`
- Impact: Cannot change credentials without code deployment. Credentials exposed in client-side bundle. No environment-based configuration (dev/staging/prod).
- Fix approach: Move to environment variables (`VITE_VAPI_PUBLIC_KEY`, `VITE_VAPI_ASSISTANT_ID`), add `.env.example` template, update deployment config

**Duplicated Form Logic:**
- Issue: `src/pages/Audit.jsx` (690 lines) and `src/pages/Begin.jsx` (757 lines) contain near-identical form validation, state management, and submission logic
- Files: `src/pages/Audit.jsx`, `src/pages/Begin.jsx`
- Impact: Bug fixes and feature changes require dual maintenance. Form field additions need to be synchronized manually. Increases testing surface.
- Fix approach: Extract shared form logic into custom hooks (`useFormValidation`, `useFormSubmission`). Create reusable form field components. Share validation schemas.

**Unused Page File:**
- Issue: `src/pages/Home-redesign.jsx` (790 lines) exists but is not imported or routed in `src/App.jsx`
- Files: `src/pages/Home-redesign.jsx`
- Impact: Dead code increases bundle size. Contains complex Leviathan SVG animation that may be intended for future use. Unclear if this is WIP or abandoned.
- Fix approach: Delete if abandoned, or document if it's WIP. If keeping, move to `/drafts` folder outside src.

**Protected Pages Directive Not Enforced:**
- Issue: `CLAUDE.md` declares three pages as "protected" (Audit.jsx, Begin.jsx, Book.jsx) but no technical enforcement exists
- Files: `src/pages/Audit.jsx`, `src/pages/Begin.jsx`, `src/pages/Book.jsx`
- Impact: Convention-only protection. No pre-commit hooks, no file watchers. Easy to accidentally modify.
- Fix approach: Add ESLint plugin to detect changes to protected files, or implement pre-commit git hook to warn/block changes

**Missing Test Infrastructure:**
- Issue: No test files exist despite having 22 source files. No test runner configuration detected.
- Files: All `src/**/*.{jsx,js}` files
- Impact: No automated verification of component behavior. Hooks like `useLiveMonitor.js` and `useVapiCall.js` have complex state management but no tests. Refactoring is risky.
- Fix approach: Install Vitest, create test setup, prioritize testing hooks and form validation logic first

## Known Bugs

**Route Mismatch:**
- Symptoms: `src/App.jsx` redirects `/begin` to `/audit` and `/services` to `/`, but `src/pages/Begin.jsx` and navigation links may reference old routes
- Files: `src/App.jsx`, `src/layouts/MainLayout.jsx`
- Trigger: Users following old bookmarks or links will be redirected, potentially causing confusion
- Workaround: Redirects handle this, but user experience is degraded

**Polling Continues After Component Unmount:**
- Symptoms: `useLiveMonitor.js` uses `mountedRef` to prevent state updates after unmount, but interval cleanup only happens in useEffect cleanup
- Files: `src/hooks/useLiveMonitor.js` lines 152-163
- Trigger: If `stopPolling()` is not called before unmount, interval continues making network requests
- Workaround: Properly call `stopPolling()` in parent component cleanup

## Security Considerations

**Client-Side API Keys:**
- Risk: Vapi public key is exposed in client bundle, allowing anyone to inspect and potentially abuse the key
- Files: `src/components/VapiCallButton.jsx`
- Current mitigation: Key is labeled "public" suggesting it's intended for client use. Vapi likely has rate limiting and domain restrictions.
- Recommendations: Verify Vapi dashboard has domain whitelist configured. Consider backend proxy for sensitive operations.

**No Rate Limiting on Form Submissions:**
- Risk: Formspree endpoint in `src/pages/Audit.jsx` and `src/pages/Begin.jsx` has no client-side rate limiting
- Files: `src/pages/Audit.jsx`, `src/pages/Begin.jsx`
- Current mitigation: Formspree likely has backend rate limiting. Submit button shows loading state.
- Recommendations: Add client-side debouncing and prevent rapid resubmission. Track submission attempts in localStorage.

**External Polling Endpoint Hardcoded:**
- Risk: Live monitor polls `https://systems.leviathan-systems.com/webhook/demo/latest` with session IDs in query params
- Files: `src/hooks/useLiveMonitor.js` line 65
- Current mitigation: Session IDs are UUIDs (hard to guess). 404 responses are handled gracefully.
- Recommendations: Move endpoint URL to environment variable. Consider adding authentication header if endpoint exposes sensitive data.

**No Input Sanitization on Display:**
- Risk: Data from external API (`useLiveMonitor`) is rendered directly in `LiveMonitorTerminal.jsx` without sanitization
- Files: `src/components/LiveMonitorTerminal.jsx` lines 254, 271
- Current mitigation: React automatically escapes JSX content. Fields are text-only.
- Recommendations: Current approach is safe for text. If rich content is added, implement DOMPurify.

## Performance Bottlenecks

**Aggressive Polling Interval:**
- Problem: `useLiveMonitor.js` polls every 1 second during active calls
- Files: `src/hooks/useLiveMonitor.js` line 136
- Cause: Real-time updates require frequent checks, but 1s may be excessive for most use cases
- Improvement path: Implement exponential backoff (1s → 2s → 5s) when no changes detected. Use WebSocket for true real-time updates.

**Large Page Components:**
- Problem: `Home-redesign.jsx` (790 lines), `Begin.jsx` (757 lines), `Audit.jsx` (690 lines) are monolithic
- Files: `src/pages/Home-redesign.jsx`, `src/pages/Begin.jsx`, `src/pages/Audit.jsx`
- Cause: No component decomposition. Inline form validation, state management, and UI all in single file.
- Improvement path: Extract form sections into separate components. Move validation logic to separate functions/hooks. Use React.lazy for code splitting on route level.

**Leviathan SVG Complexity:**
- Problem: `Home-redesign.jsx` contains 250+ line SVG with multiple animated elements, gradients, and filters
- Files: `src/pages/Home-redesign.jsx` lines 26-273
- Cause: Complex multi-headed Leviathan creature rendered inline with elaborate animations
- Improvement path: Extract to separate SVG file, optimize with SVGO, consider sprite sheet for animation frames

## Fragile Areas

**Live Demo Integration:**
- Files: `src/components/DemoSection.jsx`, `src/hooks/useLiveMonitor.js`, `src/hooks/useVapiCall.js`, `src/components/LiveMonitorTerminal.jsx`
- Why fragile: Tight coupling between Vapi call state, polling state, and UI state. Three separate state machines must stay synchronized (callStatus, polling status, terminal status).
- Safe modification: Any changes to call lifecycle should update all three components in tandem. Test with actual Vapi calls, not just mocks.
- Test coverage: Zero

**Form Submission Flow:**
- Files: `src/pages/Audit.jsx` lines 140-190, `src/pages/Begin.jsx` lines 150-200
- Why fragile: Multi-step form with session storage, Formspree submission, Calendly integration, and error handling. Many external dependencies.
- Safe modification: Test thoroughly with actual Formspree endpoint. Verify session storage persistence across page reloads. Check Calendly embed loads correctly.
- Test coverage: Zero

**Navigation State:**
- Files: `src/layouts/MainLayout.jsx` lines 8-130
- Why fragile: Mobile menu state, scroll detection, route highlighting, and logo logic all in one component. useEffect hooks depend on location changes.
- Safe modification: Test mobile menu open/close on route changes. Verify scroll-based styling updates correctly.
- Test coverage: Zero

## Scaling Limits

**Client-Side Polling:**
- Current capacity: Single user polling at 1s interval is fine
- Limit: If multiple browser tabs open or many concurrent users, each polls independently. N users = N requests/second to n8n endpoint.
- Scaling path: Backend should implement WebSocket pub/sub. Use shared worker to deduplicate polling across browser tabs.

**Session Storage for Form State:**
- Current capacity: Works for single-page calculator → form flow
- Limit: Session storage cleared on tab close. No persistence across devices. Calculator results lost if user returns via different session.
- Scaling path: Move to backend session management or localStorage with expiration. Use URL parameters for cross-device sharing.

## Dependencies at Risk

**React Router v7:**
- Risk: Recently upgraded to v7 based on package.json, which has significant API changes from v6
- Files: `package.json` line 17, `src/App.jsx`, `src/layouts/MainLayout.jsx`
- Impact: If docs examples are v6-based, copy-pasting code may cause runtime errors
- Migration plan: None needed currently, but document that project uses v7 API

**Vite v7:**
- Risk: Bleeding edge version (7.2.4) may have undiscovered bugs
- Files: `package.json` line 30, `vite.config.js`
- Impact: Build errors or HMR issues possible. Community support may lag.
- Migration plan: Can downgrade to Vite v5 (stable LTS) if issues arise

**Tailwind CSS v4:**
- Risk: Using beta version (4.1.18) with new Vite plugin approach
- Files: `package.json` lines 21, 29, `src/index.css` line 1
- Impact: Breaking changes possible before stable release. Plugin API may change.
- Migration plan: Lock version until v4 reaches stable. Can fall back to v3 with PostCSS approach.

## Missing Critical Features

**Error Boundary:**
- Problem: No React error boundaries implemented
- Blocks: If any component throws during render, entire app crashes with blank screen
- Priority: High

**Loading States:**
- Problem: No global loading indicator for route transitions
- Blocks: User sees blank screen briefly when navigating between heavy pages
- Priority: Medium

**Analytics/Monitoring:**
- Problem: No error tracking (Sentry) or analytics (GA, Plausible) detected
- Blocks: Cannot measure conversion funnel, cannot debug production errors
- Priority: High for production deployment

**Environment Variable Validation:**
- Problem: No runtime check that required env vars are present
- Blocks: App may fail silently if Vapi key is missing or malformed
- Priority: Medium

## Test Coverage Gaps

**Form Validation Logic:**
- What's not tested: Email validation, URL validation, multi-select field logic, conditional field visibility
- Files: `src/pages/Audit.jsx` lines 96-133, `src/pages/Begin.jsx` lines 100-150
- Risk: Validation bugs allow invalid submissions or block valid ones
- Priority: High

**Custom Hooks:**
- What's not tested: `useLiveMonitor.js` polling lifecycle, state transitions, error handling. `useVapiCall.js` SDK integration, event handlers.
- Files: `src/hooks/useLiveMonitor.js`, `src/hooks/useVapiCall.js`, `src/hooks/useScrollAnimation.js`
- Risk: State management bugs cause UI to hang or show stale data
- Priority: High

**Animation Timing:**
- What's not tested: Scroll-based animations, typewriter effects, status transitions in LiveMonitorTerminal
- Files: `src/hooks/useScrollAnimation.js`, `src/components/LiveMonitorTerminal.jsx` lines 69-97
- Risk: Race conditions cause animations to skip or repeat unexpectedly
- Priority: Low

**Redirect Logic:**
- What's not tested: Route redirects in App.jsx correctly preserve query parameters and handle edge cases
- Files: `src/App.jsx` lines 16-17
- Risk: Users lose state or get stuck in redirect loops
- Priority: Medium

---

*Concerns audit: 2026-01-23*
