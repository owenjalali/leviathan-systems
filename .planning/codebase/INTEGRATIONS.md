# External Integrations

**Analysis Date:** 2026-01-23

## APIs & External Services

**Voice AI:**
- Vapi AI - Voice call automation service
  - SDK/Client: @vapi-ai/web ^2.5.2
  - Public Key: `935fb085-0c34-4f20-82cf-76cff78f3934` (hardcoded in `src/components/VapiCallButton.jsx`)
  - Assistant ID: `955decb7-0492-40c9-b788-0b0e16f73a0a` (hardcoded in `src/components/VapiCallButton.jsx`)
  - Used for: Demo voice calls with real-time audio visualization
  - Integration: `src/hooks/useVapiCall.js`, `src/components/VapiCallButton.jsx`
  - Events tracked: call-start, call-end, volume-level, speech-start, speech-end, error

**Form Handling:**
- Formspree - Form submission service
  - Endpoint: `https://formspree.io/f/xbdrwznd`
  - Used in: `src/pages/Begin.jsx` (line 219), `src/pages/Audit.jsx` (line 171)
  - Purpose: Collect qualification form data before booking
  - Data collected: Business details, contact info, volume, channels, pain points, tools

**Scheduling:**
- Calendly - Appointment booking service
  - Embed URL: `https://calendly.com/leviathanaidev`
  - Theme: `background_color=ffffff&text_color=1a1a1a&primary_color=00d4cf`
  - Integration: Widget.js loaded in `index.html` (line 16)
  - Used in: `src/pages/Begin.jsx` (line 244), `src/pages/Audit.jsx` (line 200)
  - Session tracking: Passes session ID via utm_content parameter in Audit flow

**Demo Data:**
- Custom n8n Webhook - Real-time demo session data
  - Endpoint: `https://systems.leviathan-systems.com/webhook/demo/latest`
  - Query param: `demo_session_id`
  - Integration: `src/hooks/useLiveMonitor.js`
  - Polling: 1-second interval during active calls
  - Used in: `src/components/LiveMonitorTerminal.jsx`
  - Fields tracked: issue, urgency, location_city, intent, final_summary, status
  - 404 handling: Silently continues polling until data available

## Data Storage

**Databases:**
- None - Pure frontend application

**File Storage:**
- Local filesystem only (static assets in `src/assets/`)

**Caching:**
- sessionStorage - Used for calculator results persistence between Audit flow steps (`src/pages/Audit.jsx` line 43-48)

## Authentication & Identity

**Auth Provider:**
- None - Public-facing application with no user authentication

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- Console logging only (browser DevTools)

## CI/CD & Deployment

**Hosting:**
- Vercel (per CLAUDE.md)

**CI Pipeline:**
- None detected in repository

## Environment Configuration

**Required env vars:**
- None - All credentials hardcoded in source files

**Secrets location:**
- Embedded in source code:
  - `src/components/VapiCallButton.jsx` - Vapi credentials
  - `src/pages/Begin.jsx` - Formspree endpoint
  - `src/pages/Audit.jsx` - Formspree endpoint
  - `src/hooks/useLiveMonitor.js` - n8n webhook endpoint

## Webhooks & Callbacks

**Incoming:**
- None - Frontend only

**Outgoing:**
- Vapi AI - Receives demo_session_id and metadata during call initiation (`src/hooks/useVapiCall.js` line 119-124)
- n8n webhook - Polled for demo data updates, no direct callback

## External Assets

**Fonts:**
- Google Fonts - Inter font family (weights: 400, 500, 600, 700)
  - Loaded in `index.html` (lines 11-13)

**Third-Party Scripts:**
- Calendly Widget - `https://assets.calendly.com/assets/external/widget.js` (async)
- Calendly Styles - `https://assets.calendly.com/assets/external/widget.css`

---

*Integration audit: 2026-01-23*
