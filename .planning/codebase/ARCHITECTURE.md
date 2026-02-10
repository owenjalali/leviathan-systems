# Architecture

**Analysis Date:** 2026-02-09

## Pattern Overview

**Overall:** Component-driven SPA with React Router, centered on page routes and reusable UI components.

**Key Characteristics:**
- Client-side routing using React Router DOM v7
- Layered component architecture (Pages → Components → Hooks → CSS)
- Integration-heavy: Vapi (voice calls), n8n webhooks (live data polling), Formspree (form submissions)
- Minimal state management: Local component state and sessionStorage for cross-page data
- Tailwind CSS for styling, custom CSS animations for motion effects

## Layers

**Pages:**
- Purpose: Route-level components representing distinct user journeys
- Location: `./src/pages/`
- Contains: Home, About, Audit (booking form), Begin (legacy), Book, Contact, Services (legacy versions)
- Depends on: Components, hooks, layouts
- Used by: App.jsx router

**Components:**
- Purpose: Reusable UI building blocks and feature sections
- Location: `./src/components/`
- Contains: DemoSection, LiveMonitorTerminal, VapiCallButton, LossCalculator, SystemDiagram, AnimatedStats, ScrollToTop
- Depends on: Hooks, Lucide icons, Tailwind
- Used by: Pages and other components

**Hooks:**
- Purpose: Custom React hooks for side effects and state management
- Location: `./src/hooks/`
- Contains: useLiveMonitor (polling n8n webhook), useVapiCall (Vapi integration), useScrollAnimation (intersection observer)
- Depends on: React core APIs
- Used by: Components and pages

**Layouts:**
- Purpose: Page wrapper with navigation and footer
- Location: `./src/layouts/`
- Contains: MainLayout (fixed header with logo, nav links, footer)
- Depends on: React Router, Lucide icons
- Used by: App.jsx as route wrapper

**Styling:**
- Purpose: Theme, animations, and global styles
- Location: `./src/index.css`
- Contains: CSS custom properties, animations (fade-in-up, bar-idle), Tailwind directives
- Used by: All components via Tailwind classes

## Data Flow

**Booking Journey (Most Complex):**

1. **Home.jsx** → User sees loss calculator
2. **LossCalculator.jsx** → User inputs business metrics, results stored in sessionStorage
3. **Home.jsx** → CTA button navigates to `/audit`
4. **Audit.jsx** → Multi-step form retrieves calculator results from sessionStorage, collects business info
5. **Audit.jsx** → Form submission to Formspree endpoint, creates Calendly booking

**Live Demo Flow (Call + Data Monitoring):**

1. **Home.jsx** → DemoSection displayed with call button
2. **DemoSection.jsx** → User clicks VapiCallButton
3. **VapiCallButton.jsx** → useVapiCall hook initiates Vapi call, returns sessionId
4. **DemoSection.jsx** → sessionId passed to useLiveMonitor hook, polling starts
5. **useLiveMonitor.js** → Polls `https://systems.leviathan-systems.com/webhook/demo/latest?demo_session_id=[sessionId]` every 1s
6. **LiveMonitorTerminal.jsx** → Receives data and displays with typewriter animations

**State Management:**

- **sessionStorage**: Cross-page data (calculator results, session IDs for demos)
- **Local component state**: UI state (form fields, validation errors, animation flags, visibility states)
- **Refs**: Timing-sensitive data (polling intervals, intersection observer state, animation progress)
- **URL params/location**: Current route, redirects (old routes redirect to new ones)

## Key Abstractions

**useLiveMonitor Hook:**
- Purpose: Abstracts n8n webhook polling logic
- Examples: `./src/hooks/useLiveMonitor.js`
- Pattern: Polling interval managed internally, field change detection, handles 404 silently (data not ready yet)

**useScrollAnimation Hook:**
- Purpose: Trigger component animations when scrolled into viewport
- Examples: `./src/hooks/useScrollAnimation.js`
- Pattern: IntersectionObserver wrapper, returns ref and visibility boolean for conditional rendering/CSS

**useVapiCall Hook:**
- Purpose: Manages Vapi voice call lifecycle
- Examples: `./src/hooks/useVapiCall.js`
- Pattern: Call state machine (idle → connecting → active → ended), volume level tracking, session ID generation

**DemoSection Component:**
- Purpose: Coordinates live demo call and data display
- Examples: `./src/components/DemoSection.jsx`
- Pattern: Container component managing communication between VapiCallButton and LiveMonitorTerminal

**Form Components:**
- Purpose: Multi-step forms with validation and submission
- Examples: `./src/pages/Audit.jsx`
- Pattern: Step-based navigation, field-level validation with error scrolling, Formspree submission

## Entry Points

**App.jsx:**
- Location: `./src/App.jsx`
- Triggers: Application startup (mounted in `main.jsx`)
- Responsibilities: BrowserRouter setup, route definitions, MainLayout wrapper

**main.jsx:**
- Location: `./src/main.jsx`
- Triggers: Module load via Vite
- Responsibilities: React root creation, App component render

**Home.jsx:**
- Location: `./src/pages/Home.jsx`
- Triggers: User navigates to `/`
- Responsibilities: Landing page, hero section, problem/solution framing, loss calculator showcase, demo section, CTA to booking

**Audit.jsx:**
- Location: `./src/pages/Audit.jsx`
- Triggers: User navigates to `/audit`
- Responsibilities: Multi-step booking form, business assessment, Formspree submission, Calendly integration

## Error Handling

**Strategy:** Silent failures with fallback states

**Patterns:**

- **Network errors**: useLiveMonitor catches fetch errors, logs to console, keeps last known data state
- **Form validation**: Field-level error state, scrolls to first error on submit attempt
- **Missing data**: Poll continues on 404 (session not created yet), shows "standby" terminal state
- **Vapi failures**: useVapiCall catches call initiation errors, shows error toast/message

## Cross-Cutting Concerns

**Logging:** Console-based, prefixed with component/hook name (`[useLiveMonitor]`, `[DemoSection]`)

**Validation:** Form validation in Audit.jsx with regex patterns for URL fields, required field checks

**Authentication:** None at application level (Calendly/Formspree handle auth)

**Performance:** Lazy evaluation in calculations (LossCalculator), IntersectionObserver for scroll animations, polling interval throttling (1s minimum)

---

*Architecture analysis: 2026-02-09*
