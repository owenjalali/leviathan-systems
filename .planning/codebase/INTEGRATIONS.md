# External Integrations

**Analysis Date:** 2026-02-09

## APIs & External Services

**Voice Calling:**
- Vapi AI - AI voice assistant platform
  - SDK: `@vapi-ai/web` (v2.5.2)
  - Public Key: `935fb085-0c34-4f20-82cf-76cff78f3934` (hardcoded in `src/components/VapiCallButton.jsx`)
  - Assistant ID: `955decb7-0492-40c9-b788-0b0e16f73a0a` (hardcoded in `src/components/VapiCallButton.jsx`)
  - Implementation: `src/hooks/useVapiCall.js`
  - Events: call-start, call-end, volume-level, speech-start, speech-end, error
  - Session tracking: Uses UUID for demo_session_id passed to assistant

**Automation & Webhooks:**
- n8n - Automation platform
  - Endpoint: `https://systems.leviathan-systems.com/webhook/demo/latest`
  - Query param: `demo_session_id` (session ID from Vapi call)
  - Implementation: `src/hooks/useLiveMonitor.js`
  - Purpose: Poll real-time demo data extraction results
  - Response format: JSON with success flag, issue, urgency, location_city, intent, final_summary, status

**Form Submission & Email:**
- Formspree - Form submission and email service
  - Endpoint: `https://formspree.io/f/xbdrwznd`
  - Method: POST with JSON body
  - Used in: `src/pages/Audit.jsx` (line 171), `src/pages/Begin.jsx` (line 219)
  - Data submitted: Business details, contact info, volume, channels, pain points, CRM, scheduling tool, calculator results
  - Session ID tracking: Generated with crypto.randomUUID() to match with Calendly bookings

## Appointment Booking

**Calendar Scheduling:**
- Calendly - Meeting scheduling platform
  - Calendar URL: `https://calendly.com/leviathanaidev`
  - Embed method: Inline widget via `window.Calendly.initInlineWidget()`
  - Widget script: Loaded in `index.html` line 16 (`https://assets.calendly.com/assets/external/widget.js`)
  - Widget CSS: Loaded in `index.html` line 17 (`https://assets.calendly.com/assets/external/widget.css`)
  - Implementations:
    - `src/pages/Audit.jsx` (line 198-206) - Includes sessionId as utm_content parameter
    - `src/pages/Begin.jsx` (line 242-249)
    - `src/pages/Book.jsx` (line 6-10)
  - Session tracking: SessionId passed via utm_content query parameter to track which form submission corresponds to which booking
  - Color customization:
    - Audit/Begin: `background_color=ffffff&text_color=1a1a1a&primary_color=00d4cf`
    - Book: `background_color=ffffff&text_color=1a1a1a&primary_color=d4af37`

## Data Storage

**Databases:**
- Not detected - Application is client-side only

**File Storage:**
- Local filesystem only - No cloud storage integration
- Static assets served from `/src/assets/` directory

**Caching:**
- Browser session storage - Used for calculator results in `src/pages/Audit.jsx` (sessionStorage)
- Browser memory - Vapi session state in custom hook

## Authentication & Identity

**Auth Provider:**
- None detected - Public application with no user authentication system

## Monitoring & Observability

**Error Tracking:**
- None detected - Error handling is local to components

**Logs:**
- Console logging - Debug logs in `src/hooks/useLiveMonitor.js` and `src/hooks/useVapiCall.js`
- Example: `[useLiveMonitor]` and `[useVapiCall]` prefixed console messages

## CI/CD & Deployment

**Hosting:**
- Vercel (implied by CLAUDE.md)

**CI Pipeline:**
- Not detected in codebase

**Deployment Strategy:**
- Static site deployment via `npm run build` → `/dist`

## Environment Configuration

**Required Environment Variables:**
- None currently required (credentials hardcoded)

**Recommended for Production:**
- `VAPI_PUBLIC_KEY` - Vapi SDK key
- `VAPI_ASSISTANT_ID` - Vapi assistant identifier
- `N8N_WEBHOOK_ENDPOINT` - n8n webhook for demo data polling
- `FORMSPREE_ENDPOINT` - Formspree form endpoint
- `CALENDLY_URL` - Calendly booking URL

**Secrets Location:**
- Currently hardcoded in source files (not secure for production)
- Should be migrated to environment variables

## Webhooks & Callbacks

**Incoming Webhooks:**
- None implemented

**Outgoing Webhooks:**
- n8n polling (via HTTP GET) - `src/hooks/useLiveMonitor.js` polls every 1 second
- Formspree form submission - `src/pages/Audit.jsx` and `src/pages/Begin.jsx`
- Calendly embeds webhook parameters (utm_content) - Session ID tracking mechanism

## Data Flow Summary

**Demo Call Workflow:**
1. User initiates Vapi call via `src/components/VapiCallButton.jsx`
2. `useVapiCall()` generates unique session ID (crypto.randomUUID())
3. Session ID passed to Vapi assistant as `demo_session_id` variable
4. Simultaneously, `useLiveMonitor()` begins polling n8n endpoint with session ID
5. n8n webhook processes Vapi call data and extracts structured information
6. Client polls `/webhook/demo/latest?demo_session_id={id}` every 1 second
7. `LiveMonitorTerminal` component displays real-time data extraction results

**Form Submission Workflow:**
1. User fills Audit form in `src/pages/Audit.jsx`
2. Form data submitted to Formspree endpoint via POST
3. Session ID generated (crypto.randomUUID()) for tracking
4. Session ID stored in state and passed to Calendly as utm_content parameter
5. Calendly embed loads with session ID in URL query string
6. Subsequent booking in Calendly captures session ID via utm_content

## Third-Party Widget Integration

**Google Fonts:**
- CDN: `https://fonts.googleapis.com`
- Font: Inter (weights 400, 500, 600, 700)
- Loaded in `index.html` lines 11-13

---

*Integration audit: 2026-02-09*
