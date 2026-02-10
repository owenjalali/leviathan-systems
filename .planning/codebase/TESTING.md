# Testing Patterns

**Analysis Date:** 2026-02-09

## Test Framework Status

**Runner:**
- No test runner currently configured
- No `jest.config.js`, `vitest.config.js`, or `package.json` test scripts
- No test files present in `src/` directory

**Assertion Library:**
- None configured

**Test Commands:**
- Currently: `npm run lint` (only linting available)
- No test execution commands available

## Test File Organization

**Current State:**
- No test files found in codebase (`*.test.*` or `*.spec.*`)
- No dedicated test directory structure (e.g., `src/__tests__/`, `tests/`)
- Would follow co-location pattern if implemented (tests next to component files)

**Recommended Location Pattern:**
```
src/
├── components/
│   ├── VapiCallButton.jsx
│   ├── VapiCallButton.test.jsx      ← Test co-located
│   ├── LossCalculator.jsx
│   └── LossCalculator.test.jsx
├── hooks/
│   ├── useVapiCall.js
│   ├── useVapiCall.test.js          ← Test co-located
│   ├── useLiveMonitor.js
│   └── useLiveMonitor.test.js
└── pages/
    ├── Home.jsx
    └── Home.test.jsx
```

**Recommended Naming:**
- `ComponentName.test.jsx` for component tests
- `hookName.test.js` for hook tests

## Testing Approach (Recommended)

Based on codebase patterns, recommended approach would be:

**Framework Recommendation:**
- Vitest (aligns with Vite setup, modern, fast)
- React Testing Library (for component testing, aligns with modern React practices)

**Setup Example (if implementing):**
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: [],
  },
})
```

## Component Testing Patterns (If Implemented)

**Structure Pattern:**
```javascript
// Example: VapiCallButton.test.jsx
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { VapiCallButton } from './VapiCallButton'

describe('VapiCallButton', () => {
  it('should render start call button when idle', () => {
    // Test implementation
  })

  it('should call onCallStart when call starts', async () => {
    // Test implementation
  })
})
```

## Hook Testing Patterns (If Implemented)

**Structure Pattern:**
```javascript
// Example: useVapiCall.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useVapiCall } from './useVapiCall'

describe('useVapiCall', () => {
  const mockPublicKey = 'test-key'

  it('should initialize with idle status', () => {
    const { result } = renderHook(() => useVapiCall(mockPublicKey))
    expect(result.current.callStatus).toBe('idle')
  })

  it('should handle call start transitions', async () => {
    const { result } = renderHook(() => useVapiCall(mockPublicKey))
    // Test implementation
  })
})
```

## Mocking Patterns (For Future Implementation)

**What to Mock:**
- External APIs (Vapi SDK methods, n8n webhooks)
- Browser APIs (IntersectionObserver, requestAnimationFrame)
- Timers (setInterval, setTimeout)
- Router navigation (`useNavigate`)

**What NOT to Mock:**
- React hooks (`useState`, `useEffect`, `useRef`)
- React utilities (`useScrollAnimation`, custom hooks logic itself)
- Component output (unless testing integration points)

**Mock Examples (Recommended Pattern):**

```javascript
// Mock Vapi SDK
vi.mock('@vapi-ai/web', () => ({
  default: vi.fn(() => ({
    on: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  }))
}))

// Mock IntersectionObserver (used extensively in codebase)
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock fetch for useLiveMonitor
global.fetch = vi.fn()
```

## Test Types

**Unit Tests:**
- Scope: Individual functions, hooks, components in isolation
- Approach: Test inputs and outputs
- Examples to test:
  - `useVapiCall`: State transitions, error handling, cleanup
  - `useLiveMonitor`: Polling logic, data change detection, fetch error handling
  - `useScrollAnimation`: Intersection observer setup, ref assignment, visibility toggle
  - Utility functions: `getDecayRate`, `formatCurrency`, `detectChangedFields`
  - Sub-components: `AudioBars`, `ErrorDisplay`, `AnimatedNumber`

**Integration Tests:**
- Scope: Component + hooks working together
- Approach: Test user interactions and state flow
- Examples to test:
  - `VapiCallButton` + `useVapiCall`: Start call → show connecting → show active → end call flow
  - `LossCalculator` with form validation and result display
  - `Home` page with scroll animations and calculator submission

**E2E Tests:**
- Current: Not used
- Could test: Full user journeys (landing page → calculator → booking page)
- Recommended tool: Playwright or Cypress

## Async Testing Patterns (Recommended)

**Async Component/Hook Testing:**
```javascript
// Testing async state updates in hooks
it('should handle async call start', async () => {
  const { result } = renderHook(() => useVapiCall(mockPublicKey))

  await act(async () => {
    await result.current.startCall('assistant-id')
  })

  expect(result.current.callStatus).toBe('connecting')
})

// Testing component effects after user interaction
it('should display error after failed call', async () => {
  render(<VapiCallButton onCallStart={vi.fn()} onCallEnd={vi.fn()} />)
  const button = screen.getByText('Start Demo Call')

  fireEvent.click(button)

  await waitFor(() => {
    expect(screen.getByText(/Call failed/i)).toBeInTheDocument()
  })
})
```

## Error Testing Patterns (Recommended)

**Error Handling in Hooks:**
```javascript
// Test error state and clearError function
it('should clear error when clearError is called', async () => {
  const { result } = renderHook(() => useVapiCall(mockPublicKey))

  // Trigger error somehow
  act(() => {
    // Error occurs
  })

  expect(result.current.error).toBeDefined()

  act(() => {
    result.current.clearError()
  })

  expect(result.current.error).toBeNull()
})
```

**Error Display in Components:**
```javascript
// Test error UI appears and auto-dismisses
it('should auto-dismiss error after 7 seconds', async () => {
  vi.useFakeTimers()
  render(<ErrorDisplay
    error={new Error('Test error')}
    onRetry={vi.fn()}
    onDismiss={vi.fn()}
  />)

  expect(screen.getByText(/Call failed/i)).toBeInTheDocument()

  vi.advanceTimersByTime(7000)

  await waitFor(() => {
    expect(screen.queryByText(/Call failed/i)).not.toBeInTheDocument()
  })

  vi.useRealTimers()
})
```

## Code Patterns to Test

**Validation Logic** (from `LossCalculator.jsx`):
```javascript
// Test the validate function
it('should mark required fields with errors', () => {
  const { getByText } = render(<LossCalculator />)
  fireEvent.click(getByText('Talk to us about fixing this'))
  // Check that error states are set
})
```

**Animation State** (from `Home.jsx`):
```javascript
// Test animated counter reaches target
it('should animate stat value to 78', async () => {
  vi.useFakeTimers()
  render(<Home />)

  // Wait for intersection observer to trigger
  vi.advanceTimersByTime(2000)

  expect(screen.getByText('78')).toBeInTheDocument()
})
```

**Polling Logic** (from `useLiveMonitor.js`):
```javascript
// Test polling starts and stops correctly
it('should poll endpoint at regular intervals', async () => {
  vi.useFakeTimers()
  const mockFetch = vi.fn().mockResolvedValue({
    status: 200,
    json: async () => ({ success: true, data: { issue: 'test' } })
  })
  global.fetch = mockFetch

  const { result } = renderHook(() => useLiveMonitor())

  act(() => {
    result.current.startPolling('session-123')
  })

  vi.advanceTimersByTime(500) // First poll

  expect(mockFetch).toHaveBeenCalledWith(
    expect.stringContaining('demo_session_id=session-123')
  )
})
```

## Coverage Goals

**Requirements:** Not enforced

**View Coverage (if implemented):**
```bash
npm run test:coverage
```

## Test Organization Example

For a hook like `useVapiCall.js`, test file structure:

```javascript
// src/hooks/useVapiCall.test.js

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useVapiCall } from './useVapiCall'

describe('useVapiCall', () => {
  let mockVapi

  beforeEach(() => {
    // Setup mocks
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with correct default state')
    it('should warn if no public key provided')
  })

  describe('startCall', () => {
    it('should transition to connecting state')
    it('should generate and pass session ID')
    it('should handle Vapi SDK errors')
  })

  describe('stopCall', () => {
    it('should transition to ending state')
    it('should stop the Vapi instance')
  })

  describe('event listeners', () => {
    it('should handle call-start event')
    it('should handle call-end event')
    it('should handle volume-level event')
    it('should handle error event')
  })

  describe('cleanup', () => {
    it('should stop Vapi on unmount')
    it('should prevent state updates after unmount')
  })
})
```

---

*Testing analysis: 2026-02-09*

**Note:** This codebase currently has no test infrastructure. These patterns document how tests would be structured if implemented, based on the existing codebase patterns and React best practices suitable for the technology stack.
