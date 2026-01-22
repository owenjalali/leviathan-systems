# Pitfalls Research

## Vapi Integration Pitfalls

| Pitfall | Warning Signs | Prevention |
|---------|---------------|------------|
| **Script loading race condition** | Call fails silently, vapi undefined | Use useEffect with loading state, don't call start until SDK ready |
| **Multiple Vapi instances** | Echo, duplicate events | Initialize once in useEffect, store in ref or state |
| **No cleanup on unmount** | Memory leak, zombie calls | Always call `vapi.stop()` in useEffect cleanup |
| **Browser microphone permissions** | Call starts but no audio | Handle permission denied gracefully, show user message |
| **HTTPS requirement** | Microphone blocked | Vapi requires HTTPS in production (Vercel handles this) |
| **Missing error handler** | Silent failures | Always attach `vapi.on('error', ...)` |

**Key code pattern:**
```javascript
useEffect(() => {
  const vapi = new Vapi(PUBLIC_KEY);
  vapiRef.current = vapi;

  vapi.on('error', (e) => setError(e.message));

  return () => vapi.stop(); // CRITICAL: cleanup
}, []);
```

## Real-time Polling Pitfalls

| Pitfall | Warning Signs | Prevention |
|---------|---------------|------------|
| **Memory leak from intervals** | Increasing memory over time | Store interval ID in ref, clear in cleanup |
| **Stale closure** | Old sessionId used after new call | Use refs for values accessed in interval callback |
| **Race condition on stop** | Data updates after "stopped" | Check mounted flag before setState |
| **No error handling** | Silent failures on network error | Wrap fetch in try/catch, show error state |
| **Polling after unmount** | React warning, memory leak | Check mounted ref before any setState |

**Key code pattern:**
```javascript
const mountedRef = useRef(true);
const intervalRef = useRef(null);

useEffect(() => {
  mountedRef.current = true;
  return () => {
    mountedRef.current = false;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, []);

// In fetch callback:
if (mountedRef.current) setData(result);
```

## Animation Pitfalls

| Pitfall | Warning Signs | Prevention |
|---------|---------------|------------|
| **Jank from JS animations** | Choppy movement, high CPU | Use CSS keyframes, not requestAnimationFrame for these effects |
| **Animation on every render** | Constant flickering | Only trigger animation when field actually changes |
| **No reduced motion support** | Accessibility complaint | Respect `prefers-reduced-motion` media query |
| **Too many simultaneous animations** | Visual chaos, slow | Limit concurrent animations, use `animation-delay` |
| **Infinite loops** | Constant CPU usage | Use `animation-iteration-count: 1` for one-shots |

**Key code pattern:**
```css
@media (prefers-reduced-motion: reduce) {
  .animate-scan-line,
  .animate-field-glow {
    animation: none;
  }
}
```

## Trust/UX Pitfalls

| Pitfall | Warning Signs | Prevention |
|---------|---------------|------------|
| **Implying action was taken** | User expects callback | NEVER show "booked", "sent", "scheduled" |
| **Missing control statement** | User confusion | ALWAYS show "NO ACTIONS EXECUTED" after call |
| **Showing fake data** | Loss of trust | Only display what actually came from the call |
| **Auto-playing without consent** | User surprise | Require explicit click to start call |
| **No way to end call** | User trapped | Always show visible "End Call" button |
| **Hiding the demo nature** | Deception | Keep "demo" prominent in UI |

**Trust checklist:**
- [ ] "Demo" is visible in the UI
- [ ] Control statement appears after every call
- [ ] No success messaging implies real action
- [ ] User must click to start (no auto-play)
- [ ] Clear end call option

## Prevention Summary by Phase

| Phase | Pitfalls to Address |
|-------|---------------------|
| Hook development | Memory leaks, stale closures, race conditions |
| Terminal UI | Animation performance, reduced motion |
| Vapi integration | Script loading, cleanup, error handling |
| Section assembly | Trust messaging, UX flow |
| Testing | End-to-end error scenarios |
