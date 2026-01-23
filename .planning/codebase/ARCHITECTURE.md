# Architecture

**Analysis Date:** 2026-01-23

## Pattern Overview

**Overall:** Single Page Application (SPA) with Client-Side Routing

**Key Characteristics:**
- React-based frontend with declarative component architecture
- Client-side routing via React Router DOM v7
- State management using React hooks (useState, useEffect, useRef, custom hooks)
- Event-driven integration with external services (Vapi voice SDK, n8n webhooks, Calendly, Formspree)
- Real-time data polling for demo interactions

## Layers

**Presentation Layer:**
- Purpose: Renders UI, handles user interaction, manages visual state
- Location: `src/pages/`, `src/components/`
- Contains: Page components, reusable UI components, animations, form handling
- Depends on: Hooks layer, assets, routing
- Used by: Layout layer

**Layout Layer:**
- Purpose: Provides consistent page structure (header, footer, navigation)
- Location: `src/layouts/MainLayout.jsx`
- Contains: Navigation, footer, logo, mobile menu, scroll behavior
- Depends on: Routing (Outlet), ScrollToTop component, assets
- Used by: All pages via React Router

**Hooks Layer:**
- Purpose: Encapsulates stateful logic, side effects, and external service integration
- Location: `src/hooks/`
- Contains: Custom hooks for animations, voice calls, live monitoring
- Depends on: React core hooks, external SDKs (@vapi-ai/web)
- Used by: Components, pages

**Integration Layer:**
- Purpose: Connects to external services and APIs
- Location: Embedded in hooks (`src/hooks/useVapiCall.js`, `src/hooks/useLiveMonitor.js`) and form handlers (`src/pages/Audit.jsx`)
- Contains: Vapi SDK integration, n8n polling, Formspree submission, Calendly embedding
- Depends on: Browser APIs (fetch, crypto.randomUUID), external SDKs
- Used by: Demo section, audit form

**Routing Layer:**
- Purpose: Maps URLs to page components, handles navigation
- Location: `src/App.jsx`
- Contains: Route definitions, redirects, layout nesting
- Depends on: React Router DOM, page components, MainLayout
- Used by: Application entry point

## Data Flow

**Page Navigation Flow:**

1. User clicks navigation link or enters URL
2. React Router matches route in `src/App.jsx`
3. MainLayout renders with navigation/footer wrapper
4. Page component renders via `<Outlet />` in MainLayout
5. Page mounts, runs useEffect hooks, loads data if needed

**State Management:**
- Local component state via useState for UI state (forms, toggles, visibility)
- useRef for DOM references, interval IDs, preventing stale closures
- Session storage for passing calculator results between pages
- No global state management (Redux/Context) - state lifted to parent components when shared

**Voice Call Demo Flow:**

1. User clicks "Start Demo Call" in VapiCallButton component (`src/components/VapiCallButton.jsx`)
2. useVapiCall hook generates unique sessionId, starts Vapi SDK call (`src/hooks/useVapiCall.js`)
3. Vapi SDK fires 'call-start' event, hook updates callStatus to 'active'
4. DemoSection receives sessionId via onCallStart callback (`src/components/DemoSection.jsx`)
5. DemoSection starts polling via useLiveMonitor hook (`src/hooks/useLiveMonitor.js`)
6. useLiveMonitor polls n8n endpoint every 1 second with sessionId
7. LiveMonitorTerminal displays data as it arrives, highlights changed fields (`src/components/LiveMonitorTerminal.jsx`)
8. User ends call, VapiCallButton fires 'call-end' event, polling continues until data complete

**Audit Form Flow:**

1. User fills form on Audit page (`src/pages/Audit.jsx`)
2. Calculator results loaded from sessionStorage (if arriving from Home page)
3. Form validation runs on submit, errors displayed inline
4. Valid form generates sessionId, submits to Formspree endpoint
5. On success, step advances to 2, Calendly widget embedded with sessionId in UTM params
6. User books appointment, Calendly webhook matches sessionId to form data

## Key Abstractions

**Custom Hooks:**
- Purpose: Encapsulate reusable stateful logic and side effects
- Examples: `src/hooks/useVapiCall.js`, `src/hooks/useLiveMonitor.js`, `src/hooks/useScrollAnimation.js`
- Pattern: Return state and control functions, manage cleanup via useEffect

**Page Components:**
- Purpose: Top-level views for each route
- Examples: `src/pages/Home.jsx`, `src/pages/Audit.jsx`, `src/pages/About.jsx`
- Pattern: Import reusable components, manage page-level state, handle navigation

**Reusable Components:**
- Purpose: Self-contained UI elements used across multiple pages
- Examples: `src/components/VapiCallButton.jsx`, `src/components/LossCalculator.jsx`, `src/components/ScrollToTop.jsx`
- Pattern: Props-based configuration, callbacks for parent communication, internal state for UI concerns

**Layout Components:**
- Purpose: Provide consistent structure across all pages
- Examples: `src/layouts/MainLayout.jsx`
- Pattern: Wraps children via React Router Outlet, manages navigation state

## Entry Points

**Application Entry:**
- Location: `src/main.jsx`
- Triggers: Browser loads index.html, script tag executes
- Responsibilities: Mounts React app to #root div, wraps with StrictMode, imports CSS

**Routing Entry:**
- Location: `src/App.jsx`
- Triggers: Mounted by main.jsx
- Responsibilities: Defines route structure, wraps routes with BrowserRouter, applies MainLayout to all routes

**HTML Entry:**
- Location: `index.html`
- Triggers: Initial HTTP request
- Responsibilities: Loads fonts (Inter), Calendly widget script, defines root mounting point, imports main.jsx

## Error Handling

**Strategy:** Localized error handling at integration boundaries, graceful degradation with user feedback

**Patterns:**
- **Voice calls**: Error state in useVapiCall hook, displayed via ErrorDisplay component with retry button, auto-dismiss after 7s
- **Live polling**: Catch fetch errors, preserve last known data, continue polling (transient failures), 404 treated as "no data yet" not error
- **Form submission**: Validation errors displayed inline with field-specific messages, submission errors shown in dedicated error box above submit button
- **Scroll behavior**: IntersectionObserver errors silently ignored, animation simply doesn't trigger

## Cross-Cutting Concerns

**Logging:** Browser console.log/warn/error for development debugging. No structured logging framework detected.

**Validation:**
- Form validation in Audit page: Required field checks, email/website format validation, conditional validation for "Other" fields
- Validation errors stored in component state, displayed inline with field highlighting

**Authentication:** None. This is a public marketing site with no login or user accounts.

**Analytics/Tracking:** No analytics framework detected. Session IDs used for matching form submissions to Calendly bookings.

**Performance:**
- Intersection Observer API for scroll animations (lazy triggering)
- Debounced/throttled scroll listeners in MainLayout
- React.StrictMode enabled for development checks
- Vite production build with tree-shaking and minification

---

*Architecture analysis: 2026-01-23*
