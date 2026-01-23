# Testing Patterns

**Analysis Date:** 2026-01-23

## Test Framework

**Runner:**
- Not detected - no test framework currently configured

**Assertion Library:**
- Not detected

**Run Commands:**
- No test scripts in `package.json`
- No test configuration files found

**Status:**
This codebase does not currently have a testing infrastructure. The following sections describe recommended patterns for when testing is implemented.

## Test File Organization

**Location:**
- Not applicable - no test files found

**Naming:**
- Expected pattern: `*.test.jsx` or `*.spec.jsx` (based on common React practices)

**Structure:**
- Not applicable - no existing test directory structure

**Recommendation:**
When implementing tests, consider co-locating test files with source files:
```
src/
├── components/
│   ├── VapiCallButton.jsx
│   └── VapiCallButton.test.jsx
├── hooks/
│   ├── useVapiCall.js
│   └── useVapiCall.test.js
```

Or using a separate test directory that mirrors source structure:
```
src/
├── components/
│   └── VapiCallButton.jsx
tests/
├── components/
│   └── VapiCallButton.test.jsx
```

## Test Structure

**Suite Organization:**
Not applicable - no tests currently exist

**Recommended Pattern for React Components:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import { VapiCallButton } from '../components/VapiCallButton'

describe('VapiCallButton', () => {
  describe('idle state', () => {
    it('should render start call button', () => {
      // test
    })
  })

  describe('active call', () => {
    it('should show end call button', () => {
      // test
    })
  })
})
```

**Recommended Pattern for Hooks:**
```javascript
import { renderHook, act } from '@testing-library/react'
import { useVapiCall } from '../hooks/useVapiCall'

describe('useVapiCall', () => {
  it('should initialize with idle status', () => {
    const { result } = renderHook(() => useVapiCall(PUBLIC_KEY))
    expect(result.current.callStatus).toBe('idle')
  })
})
```

## Mocking

**Framework:**
Not detected - no mocking library configured

**Recommendation:**
Given the codebase relies on external services (Vapi SDK, n8n webhooks), implement mocking for:
- Vapi SDK (`@vapi-ai/web`) in `src/hooks/useVapiCall.js`
- Fetch requests in `src/hooks/useLiveMonitor.js`
- Browser APIs (`IntersectionObserver`, `window.scrollTo`)

**Suggested Mocking Pattern:**
```javascript
// Mock Vapi SDK
jest.mock('@vapi-ai/web', () => {
  return jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    on: jest.fn()
  }))
})

// Mock fetch for polling hook
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ success: true, data: {} })
  })
)
```

## Fixtures and Factories

**Test Data:**
Not applicable - no fixtures currently exist

**Recommendation:**
Create test fixtures for:
- Vapi SDK event payloads
- API responses from n8n webhook
- Demo session data structure

**Suggested Location:**
- `tests/fixtures/vapiEvents.js`
- `tests/fixtures/liveMonitorData.js`

**Example Fixture:**
```javascript
// tests/fixtures/liveMonitorData.js
export const mockDemoData = {
  success: true,
  data: {
    issue: 'Water leak in basement',
    urgency: 'high',
    location_city: 'Boston',
    intent: 'repair',
    final_summary: 'Customer needs emergency plumbing service'
  }
}
```

## Coverage

**Requirements:**
- No coverage targets currently enforced

**Recommendation:**
Set coverage thresholds in test config:
- Branches: 70%
- Functions: 80%
- Lines: 80%
- Statements: 80%

**View Coverage:**
When implemented, typical command would be:
```bash
npm test -- --coverage
```

## Test Types

**Unit Tests:**
Recommended focus areas:
- Custom hooks (`src/hooks/useVapiCall.js`, `src/hooks/useLiveMonitor.js`)
- Utility functions (field change detection, typewriter effect logic)
- Component state transitions

**Integration Tests:**
Recommended focus areas:
- Vapi SDK integration in `VapiCallButton`
- Live monitor polling and data updates
- Form submission flows in `Audit.jsx`

**E2E Tests:**
Not applicable currently

**Recommendation:**
Consider Playwright or Cypress for E2E tests covering:
- Calculator → Audit flow
- Demo call → Live monitor visualization
- Mobile navigation menu

## Common Patterns

**Async Testing:**
Not applicable - no tests currently exist

**Recommended Pattern:**
```javascript
it('should fetch demo data', async () => {
  const { result } = renderHook(() => useLiveMonitor())

  await act(async () => {
    result.current.startPolling('test-session-id')
  })

  await waitFor(() => {
    expect(result.current.data).toBeDefined()
  })
})
```

**Error Testing:**
Not applicable - no tests currently exist

**Recommended Pattern:**
```javascript
it('should handle fetch errors gracefully', async () => {
  global.fetch.mockRejectedValueOnce(new Error('Network error'))

  const { result } = renderHook(() => useLiveMonitor())

  await act(async () => {
    result.current.startPolling('test-session-id')
  })

  expect(result.current.error).toBeTruthy()
})
```

## Priority Testing Areas

Based on codebase complexity and critical paths, prioritize testing for:

**High Priority:**
1. `src/hooks/useVapiCall.js` - Core call functionality, state machine logic
2. `src/hooks/useLiveMonitor.js` - Polling logic, change detection, error handling
3. `src/components/VapiCallButton.jsx` - User interaction, state transitions, callbacks

**Medium Priority:**
4. `src/components/LiveMonitorTerminal.jsx` - Data display, typewriter effects, animations
5. `src/pages/Audit.jsx` - Form validation, submission (currently protected from modification)
6. `src/components/LossCalculator.jsx` - Calculator logic, data validation

**Lower Priority:**
7. Layout components (`src/layouts/MainLayout.jsx`)
8. Static pages (`src/pages/About.jsx`)
9. Routing configuration (`src/App.jsx`)

## Test Infrastructure Setup

**Recommended Stack:**
- **Test Runner:** Vitest (fastest for Vite projects)
- **React Testing:** `@testing-library/react` + `@testing-library/react-hooks`
- **User Events:** `@testing-library/user-event`
- **Assertions:** Vitest built-in or `@testing-library/jest-dom`
- **Mocking:** Vitest built-in mocking utilities

**Installation:**
```bash
npm install -D vitest @testing-library/react @testing-library/react-hooks @testing-library/jest-dom @testing-library/user-event jsdom
```

**Recommended Config (`vitest.config.js`):**
```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.js'
      ]
    }
  }
})
```

**Recommended Scripts (`package.json`):**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

*Testing analysis: 2026-01-23*
