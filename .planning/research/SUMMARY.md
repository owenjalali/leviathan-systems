# Research Summary

## Stack Additions

**One package needed:** `@vapi-ai/web`

Everything else uses existing stack:
- CSS keyframes for animations (no Framer Motion)
- Native fetch for polling (no React Query)
- Simple useState/useRef (no state library)

## Feature Table Stakes

Must have:
- Status indicator (Standby/Active/Captured)
- Field labels with clear hierarchy
- Loading and error states
- Mobile responsive layout

## Differentiators (Premium Feel)

| Feature | Purpose |
|---------|---------|
| Scan line | Shows active monitoring |
| Field glow on update | Proves data is live |
| Status pulse | Subtle life during call |
| Typewriter summary | Premium reveal |
| Event log stagger | CAPTURE → CLASSIFY → QUEUE |

Key principle: **Restraint.** Every animation serves a purpose.

## Architecture

```
LeviathanLiveDemoSection (parent, manages state)
├── VapiCallButton (left column)
└── LiveMonitorTerminal (right column)

useLiveMonitor hook (polling logic)
```

Simple prop drilling, no global state needed.

## Build Order

1. `useLiveMonitor.js` — Polling hook
2. `LiveMonitorTerminal.jsx` — UI with mock data
3. CSS animations — Keyframes in index.css
4. `VapiCallButton.jsx` — Vapi SDK integration
5. `LeviathanLiveDemoSection.jsx` — Wire together
6. `Home.jsx` — Place section

## Critical Pitfalls

| Category | Top Risk | Prevention |
|----------|----------|------------|
| Vapi | No cleanup on unmount | Always `vapi.stop()` in useEffect cleanup |
| Polling | Memory leak | Clear interval in cleanup, check mounted |
| Animation | Jank | Use CSS keyframes, not JS |
| Trust | Implying action taken | ALWAYS show control statement |

## Key Decisions Made

1. **CSS over animation libraries** — Bundle size, simplicity
2. **Polling over WebSocket** — n8n endpoint is REST
3. **No mock mode** — Real integration only
4. **Refs for interval cleanup** — Prevent stale closures

## Files to Create

| File | Type |
|------|------|
| `src/hooks/useLiveMonitor.js` | New |
| `src/components/LeviathanLiveDemoSection.jsx` | New |
| `src/components/VapiCallButton.jsx` | New |
| `src/components/LiveMonitorTerminal.jsx` | New |

## Files to Modify

| File | Change |
|------|--------|
| `src/index.css` | Add animation keyframes |
| `src/pages/Home.jsx` | Import and render section |

---
*Research completed: 2026-01-21*
