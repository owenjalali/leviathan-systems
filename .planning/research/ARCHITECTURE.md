# Architecture Research

## Component Structure

```
src/
├── components/
│   ├── LeviathanLiveDemoSection.jsx  # Parent - manages state, layout
│   ├── VapiCallButton.jsx             # Left column - call controls
│   └── LiveMonitorTerminal.jsx        # Right column - data display
├── hooks/
│   └── useLiveMonitor.js              # Polling logic, state management
└── pages/
    └── Home.jsx                       # Import and place section
```

**Component Responsibilities:**

| Component | Owns | Receives |
|-----------|------|----------|
| LeviathanLiveDemoSection | sessionId, callStatus | — |
| VapiCallButton | Vapi instance | onCallStart, onCallEnd, callStatus |
| LiveMonitorTerminal | — | data, isPolling, callStatus |
| useLiveMonitor | polling interval, data state | sessionId |

## State Management

**No Redux/Context needed.** Simple prop drilling:

```jsx
// LeviathanLiveDemoSection.jsx
const [sessionId, setSessionId] = useState(null);
const [callStatus, setCallStatus] = useState('standby'); // standby | active | ended
const { data, isPolling, startPolling, stopPolling } = useLiveMonitor();

const handleCallStart = (newSessionId) => {
  setSessionId(newSessionId);
  setCallStatus('active');
  startPolling(newSessionId);
};

const handleCallEnd = () => {
  setCallStatus('ended');
  // Keep polling for 30s to catch final summary
};

return (
  <section>
    <VapiCallButton
      onCallStart={handleCallStart}
      onCallEnd={handleCallEnd}
      callStatus={callStatus}
    />
    <LiveMonitorTerminal
      data={data}
      callStatus={callStatus}
      isPolling={isPolling}
    />
  </section>
);
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER CLICKS CALL                                         │
│    └─> VapiCallButton.handleStartCall()                     │
│        └─> Generate sessionId (crypto.randomUUID())         │
│        └─> onCallStart(sessionId) → parent                  │
│        └─> vapi.start(assistantId, { variableValues })      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. VAPI CALL ACTIVE                                         │
│    └─> Vapi assistant talks to user                         │
│    └─> Assistant's tool sends POST to n8n webhook           │
│    └─> n8n stores in Redis (2hr TTL)                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. FRONTEND POLLS                                           │
│    └─> useLiveMonitor polls GET /webhook/demo/latest        │
│    └─> Every 1s while callStatus !== 'standby'              │
│    └─> Compares prev data to detect changed fields          │
│    └─> Updates state → triggers re-render                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. CALL ENDS                                                │
│    └─> vapi.on('call-end') fires                            │
│    └─> onCallEnd() → parent sets callStatus='ended'         │
│    └─> Continue polling 30s for final summary               │
│    └─> Stop polling, show control statement                 │
└─────────────────────────────────────────────────────────────┘
```

## Integration Points

| Existing Code | Touch Point | Change |
|---------------|-------------|--------|
| `src/pages/Home.jsx` | After hero section (~line 173) | Import and render `<LeviathanLiveDemoSection />` |
| `src/index.css` | After existing keyframes | Add scan-line, field-glow, typewriter keyframes |
| `src/hooks/` | New file | Add `useLiveMonitor.js` |

**No changes to:**
- MainLayout.jsx
- Protected pages (Audit, Begin, Book)
- Existing components
- Routing

## Build Order

Recommended sequence for incremental testing:

1. **useLiveMonitor.js** - Test polling in isolation
2. **LiveMonitorTerminal.jsx** - Build UI with mock data
3. **CSS animations** - Add keyframes, test animations
4. **VapiCallButton.jsx** - Integrate Vapi SDK
5. **LeviathanLiveDemoSection.jsx** - Wire components together
6. **Home.jsx integration** - Place section, final testing

Each step produces a testable artifact. Don't skip to integration before unit pieces work.
