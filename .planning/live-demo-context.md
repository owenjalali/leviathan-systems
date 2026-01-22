# Leviathan Live Demo Section - Implementation Plan

## Overview
Build a premium, two-column demo section that showcases the AI receptionist in action. Left column has Vapi web-call widget, right column shows a live monitor terminal with real-time updates.

**Headline:** "See It Work"

## Vapi Credentials
- **Public Key:** `2d8f4fe8-8e5f-485f-a50f-05f63886fae9`
- **Assistant ID:** `955decb7-0492-40c9-b788-0b0e16f73a0a`
- **Status:** Vapi assistant is functional with system prompt and knowledge base
- **Note:** n8n webhook integration still needs to be connected

## Placement
**Location:** `src/pages/Home.jsx` line ~173 (after Hero section, before "How We Work")

## Component Structure

```
src/
├── components/
│   ├── LeviathanLiveDemoSection.jsx   # Main section wrapper
│   ├── VapiCallButton.jsx              # Left column - Vapi integration
│   └── LiveMonitorTerminal.jsx         # Right column - live feed display
├── hooks/
│   └── useLiveMonitor.js               # Polling hook for demo data
└── pages/
    └── Home.jsx                        # Add section import
```

## Files to Create/Modify

### 1. `src/hooks/useLiveMonitor.js` (NEW)
Polling hook that fetches demo session data from n8n endpoint.

**Key features:**
- Polls `https://systems.leviathan-systems.com/webhook/demo/latest?demo_session_id={id}` every 1s during active call
- Tracks field changes for animation triggers
- Stops polling 30s after call ends
- Returns: `{ data, isPolling, error, startPolling, stopPolling, changedFields }`

### 2. `src/components/VapiCallButton.jsx` (NEW)
Left column component with Vapi web-call widget.

**Structure:**
- Premium card with dark glass-morphism styling
- Phone icon with subtle pulse animation
- Primary text: "Call as a homeowner (leaky pipe demo)"
- Subtext: "45–90s • No booking • Approval required"
- Loads Vapi script via useEffect (client-side only)
- Generates UUID session ID on call start
- Passes session ID to parent for monitor sync

**Styling (matching existing patterns):**
- `bg-[#0a0f1a]` card background
- `border-[#1a2332]` border
- `rounded-2xl` corners
- Accent glow on hover: `shadow-[0_0_30px_rgba(0,212,207,0.15)]`

### 3. `src/components/LiveMonitorTerminal.jsx` (NEW)
Right column "Leviathan Live Monitor Terminal" with real-time updates.

**Structure:**
```
┌─────────────────────────────────────────┐
│ LEVIATHAN LIVE MONITOR    [STATUS CHIP] │  <- Header with scan line
├─────────────────────────────────────────┤
│ Status: ● Standby / Active Call / Done  │
│ Issue:  [field - pulses on update]      │
│ Urgency: [chip - pulses on update]      │
│ Location: [field]                       │
│ Intent: [field]                         │
│ Summary: [types in when call ends]      │
├─────────────────────────────────────────┤
│ ┌─ Event Log ─────────────────────────┐ │
│ │ ○ CAPTURE                           │ │  <- 3-line event log
│ │ ○ CLASSIFY                          │ │
│ │ ○ QUEUE                             │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ NO ACTIONS EXECUTED — OWNER APPROVAL    │  <- Control statement
│ REQUIRED                                │
└─────────────────────────────────────────┘
```

**Animations:**
1. **Scan line:** CSS keyframe that moves a horizontal line top-to-bottom during Active Call
2. **Status chip pulse:** Animate-pulse class when Active Call
3. **Field glow:** Brief cyan glow + scale bump when field receives data
4. **Summary typewriter:** Fast character-by-character reveal (not cheesy)
5. **Event log fade-in:** Each line fades in sequentially

**Styling:**
- Terminal aesthetic with monospace font accents
- `bg-[#030306]` main background (darker than card)
- `border-[#1a2332]` with accent glow during Active Call
- Grid lines at very low opacity for "system" feel

### 4. `src/components/LeviathanLiveDemoSection.jsx` (NEW)
Main section wrapper that composes the demo.

**Structure:**
- Section with standard padding: `py-32 sm:py-40`
- Top divider line (gradient)
- Background accents (subtle radial glows)
- Two-column grid: `grid md:grid-cols-2 gap-8 lg:gap-12`
- Manages shared state between VapiCallButton and LiveMonitorTerminal
- Section headline above columns

**Content:**
- Headline: "See It Work" or "Live Infrastructure Demo"
- Subtext: Brief explanation of what they're about to experience

### 5. `src/pages/Home.jsx` (MODIFY)
- Import LeviathanLiveDemoSection
- Add section after Hero (line ~173)

### 6. `src/index.css` (MODIFY)
Add custom keyframes for demo animations:

```css
/* Scan line animation */
@keyframes scan-line {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* Field update glow */
@keyframes field-glow {
  0% { box-shadow: 0 0 0 rgba(0, 212, 207, 0); }
  50% { box-shadow: 0 0 20px rgba(0, 212, 207, 0.4); }
  100% { box-shadow: 0 0 0 rgba(0, 212, 207, 0); }
}

/* Typewriter cursor blink */
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

## Data Flow

```
1. User clicks "Call as a homeowner"
   └─> VapiCallButton generates UUID, calls startPolling(uuid)
   └─> Vapi.start() with metadata: { demo_session_id: uuid }

2. During call, Vapi sends updates to n8n webhook
   └─> n8n stores in Redis with 2hr TTL

3. LiveMonitorTerminal polls n8n every 1s
   └─> useLiveMonitor hook fetches /webhook/demo/latest?demo_session_id={uuid}
   └─> Compares fields to detect changes
   └─> Triggers animations on changed fields

4. Call ends
   └─> Status changes to "call_ended"
   └─> Final summary types in
   └─> Event log completes
   └─> Control statement appears
   └─> Polling continues 30s then stops
```

## Vapi Integration Details

**Script loading (in VapiCallButton.jsx):**
```jsx
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://cdn.vapi.ai/vapi-web-1.0.0.js';
  script.async = true;
  script.onload = () => {
    window.vapi = new window.Vapi('2d8f4fe8-8e5f-485f-a50f-05f63886fae9');
  };
  document.body.appendChild(script);
  return () => document.body.removeChild(script);
}, []);
```

**Starting call:**
```jsx
const handleStartCall = () => {
  const sessionId = crypto.randomUUID();
  onCallStart(sessionId); // Parent starts polling
  window.vapi?.start('955decb7-0492-40c9-b788-0b0e16f73a0a', {
    metadata: { demo_session_id: sessionId }
  });
};
```

**Vapi event handling:**
```jsx
// Listen for call events to sync UI state
window.vapi?.on('call-start', () => setCallActive(true));
window.vapi?.on('call-end', () => setCallActive(false));
```

## Animation Specifications

| Animation | Trigger | Duration | Style |
|-----------|---------|----------|-------|
| Scan line | Active Call status | 3s loop | Subtle horizontal line moving down |
| Status pulse | Active Call status | 2s loop | Soft pulse on status chip |
| Field glow | Field receives new value | 0.6s once | Cyan glow + slight scale |
| Summary typewriter | Call ends | ~50ms/char | Fast but readable |
| Event log fade | Each event captured | 0.3s stagger | Fade in from left |
| Border glow | Active Call | Constant | Subtle cyan border glow |

## Trust/Control Requirements

- Status shows: "Standby" → "Active Call" → "Captured" (never "Booked")
- Event log shows: CAPTURE / CLASSIFY / QUEUE (never "SENT" or "SCHEDULED")
- Control statement always visible after call: "NO ACTIONS EXECUTED — OWNER APPROVAL REQUIRED"
- No fake metrics, ROI numbers, or charts
- No "calendar invite sent" or "CRM updated" success messages

## Implementation Order

1. Create `src/hooks/useLiveMonitor.js`
2. Create `src/components/LiveMonitorTerminal.jsx`
3. Create `src/components/VapiCallButton.jsx`
4. Create `src/components/LeviathanLiveDemoSection.jsx`
5. Add CSS keyframes to `src/index.css`
6. Integrate into `src/pages/Home.jsx`
7. Test with mock data first
8. Connect to real Vapi/n8n endpoints

## Verification

1. Start dev server: `npm run dev`
2. Navigate to homepage
3. Verify demo section appears after hero
4. Click call button - verify Vapi widget loads
5. During call - verify scan line, status pulse animations
6. As fields populate - verify glow animations trigger
7. Call ends - verify typewriter summary, event log, control statement
8. Verify mobile responsiveness (single column stack)

## n8n Webhook Integration Notes

**Current Status:** Vapi assistant is ready, but n8n webhook isn't connected yet.

**The implementation will:**
- Poll the n8n endpoint as designed
- Handle gracefully when no data is returned (show "Waiting for data...")
- Display any data that does come through when the webhook is connected

**To complete the integration:**
1. Configure Vapi's `send_demo_update` tool to POST to `https://systems.leviathan-systems.com/webhook/demo/update`
2. Include `demo_session_id` from call metadata in each update
3. Test end-to-end flow

**Endpoints:**
- POST (Vapi → n8n): `https://systems.leviathan-systems.com/webhook/demo/update`
- GET (Website polling): `https://systems.leviathan-systems.com/webhook/demo/latest?demo_session_id={id}`
