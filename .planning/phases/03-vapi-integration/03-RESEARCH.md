# Phase 3: Vapi Integration - Research

**Researched:** 2026-01-22
**Domain:** Voice AI SDK integration (browser-based)
**Confidence:** HIGH

## Summary

This phase integrates the Vapi Web SDK to enable users to start demo voice calls directly from the website. The SDK provides a straightforward event-driven API for managing call lifecycle, handling microphone permissions, and receiving real-time audio level data for visualization.

The Vapi Web SDK (`@vapi-ai/web` v2.5.2) is the official client library. It wraps Daily.js for WebRTC under the hood. Key capabilities include: starting calls with an assistant ID, receiving volume-level events for visualization, listening to call lifecycle events, and handling errors gracefully.

The primary technical challenges are: (1) creating responsive audio bar animations that react to the AI's voice output, (2) managing call state transitions (idle -> connecting -> active -> ending -> idle), and (3) handling microphone permission errors without disrupting user experience.

**Primary recommendation:** Create a custom `useVapiCall` hook that encapsulates SDK initialization, event handling, and state management. Audio bars should use CSS transforms with inline styles driven by the volume-level event value (0-1 range).

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @vapi-ai/web | ^2.5.2 | Voice AI SDK | Official Vapi client, wraps Daily.js for WebRTC |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| crypto.randomUUID() | Native | Session ID generation | Built into browsers, no dependency needed |
| lucide-react | ^0.562.0 | Icons (Phone, PhoneOff, etc.) | Already in project |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| crypto.randomUUID() | uuid npm package | Native is faster and has excellent browser support; uuid adds unnecessary dependency |
| CSS transforms for bars | Canvas/Web Audio API | CSS is simpler, sufficient for 3-5 bars; Canvas overkill for this use case |
| Custom hook | Direct SDK usage | Hook provides better React integration, cleanup, and reusability |

**Installation:**
```bash
npm install @vapi-ai/web
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── hooks/
│   ├── useLiveMonitor.js      # (existing) Polling for n8n data
│   └── useVapiCall.js         # NEW: Vapi SDK integration
├── components/
│   ├── LiveMonitorTerminal.jsx # (existing) Data display
│   └── VapiCallButton.jsx      # NEW: Call button with audio bars
└── pages/
    └── Home.jsx                # Section assembly (Phase 4)
```

### Pattern 1: Custom Hook for SDK Integration
**What:** Encapsulate Vapi SDK lifecycle in a custom hook
**When to use:** Always - provides clean separation, proper cleanup, React integration
**Example:**
```javascript
// Source: https://www.vapiblocks.com/docs/quickstart
import { useEffect, useRef, useState, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

export function useVapiCall(publicKey) {
  const [callStatus, setCallStatus] = useState('idle'); // idle | connecting | active | ending
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [error, setError] = useState(null);
  const vapiRef = useRef(null);
  const sessionIdRef = useRef(null);

  // Initialize Vapi instance once
  useEffect(() => {
    vapiRef.current = new Vapi(publicKey);

    const vapi = vapiRef.current;

    vapi.on('call-start', () => {
      setCallStatus('active');
      setError(null);
    });

    vapi.on('call-end', () => {
      setCallStatus('idle');
      setVolumeLevel(0);
    });

    vapi.on('volume-level', (volume) => {
      // volume is 0-1 range
      setVolumeLevel(volume);
    });

    vapi.on('error', (err) => {
      setError(err);
      setCallStatus('idle');
    });

    return () => {
      vapi.stop();
    };
  }, [publicKey]);

  const startCall = useCallback(async (assistantId, metadata = {}) => {
    if (!vapiRef.current) return;

    const sessionId = crypto.randomUUID();
    sessionIdRef.current = sessionId;

    setCallStatus('connecting');
    setError(null);

    try {
      await vapiRef.current.start(assistantId, {
        variableValues: {
          demo_session_id: sessionId,
          ...metadata
        }
      });
    } catch (err) {
      setError(err);
      setCallStatus('idle');
    }
  }, []);

  const stopCall = useCallback(async () => {
    if (!vapiRef.current) return;

    setCallStatus('ending');
    vapiRef.current.stop();
  }, []);

  return {
    callStatus,
    volumeLevel,
    error,
    sessionId: sessionIdRef.current,
    startCall,
    stopCall
  };
}
```

### Pattern 2: Audio Bars with CSS Transforms
**What:** Equalizer-style bars that respond to volume level
**When to use:** For "AI is speaking" visual feedback
**Example:**
```javascript
// Source: CSS-Tricks equalizer patterns + Vapi volume-level docs
function AudioBars({ volumeLevel, isActive }) {
  // Create 5 bars with slightly different heights
  const bars = [0.6, 1.0, 0.8, 0.9, 0.5]; // height multipliers

  return (
    <div className="flex items-center gap-0.5 h-4">
      {bars.map((multiplier, i) => {
        const height = isActive
          ? Math.max(0.2, volumeLevel * multiplier) // min 20% when active
          : 0.1; // nearly flat when inactive

        return (
          <div
            key={i}
            className="w-1 bg-[#00d4cf] rounded-full transition-transform duration-100"
            style={{
              transform: `scaleY(${height})`,
              transformOrigin: 'center',
              height: '16px'
            }}
          />
        );
      })}
    </div>
  );
}
```

### Pattern 3: Elapsed Timer
**What:** Show call duration during active call
**When to use:** During active call state
**Example:**
```javascript
function useElapsedTime(isActive) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      startRef.current = Date.now();
      const interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setElapsed(0);
      startRef.current = null;
    }
  }, [isActive]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
```

### Anti-Patterns to Avoid
- **Creating Vapi instance on every render:** Use useRef to hold single instance
- **Not cleaning up on unmount:** Always call vapi.stop() in useEffect cleanup
- **Blocking page render with SDK load:** Vapi loads async, don't await before render
- **Ignoring "ending" state:** Users expect feedback that stop was received

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| UUID generation | Custom random string | crypto.randomUUID() | RFC-compliant, cryptographically secure, native |
| WebRTC handling | Custom WebRTC implementation | Vapi SDK (uses Daily.js) | WebRTC is complex, SDK handles all edge cases |
| Microphone access | Direct getUserMedia | Vapi SDK handles it | SDK manages permissions, fallbacks, error states |
| Audio analysis | Web Audio API for visualization | Vapi volume-level event | SDK provides pre-processed 0-1 value |

**Key insight:** Vapi SDK already handles the complex WebRTC and audio processing. The volume-level event gives exactly what we need (0-1 float) without direct Web Audio API access.

## Common Pitfalls

### Pitfall 1: Microphone Permission Errors
**What goes wrong:** User denies mic permission, call fails silently or with cryptic error
**Why it happens:** Browser requires explicit permission; denial throws NotAllowedError
**How to avoid:**
- Listen to Vapi 'error' event
- Check for `customer-did-not-give-microphone-permission` in call-end reason
- Show user-friendly retry button, not technical error message
**Warning signs:** Call enters "connecting" but never reaches "active"

### Pitfall 2: Multiple Vapi Instances
**What goes wrong:** Creating new Vapi() on each render causes multiple connections
**Why it happens:** Not using useRef to persist instance across renders
**How to avoid:**
- Create Vapi instance in useEffect with empty deps
- Store in useRef, not useState
**Warning signs:** Multiple "call-start" events, audio issues

### Pitfall 3: Missing Cleanup
**What goes wrong:** Component unmounts while call active, memory leak, orphan connection
**Why it happens:** Not calling vapi.stop() in useEffect cleanup
**How to avoid:** Always return cleanup function that calls stop()
**Warning signs:** Console errors after navigation, continued audio

### Pitfall 4: HTTPS Requirement
**What goes wrong:** Microphone access blocked on HTTP
**Why it happens:** Browser security requires secure context for getUserMedia
**How to avoid:**
- Development: localhost is allowed
- Production: Must be HTTPS (Vercel handles this)
**Warning signs:** Permission request never appears

### Pitfall 5: "Ending" State Ignored
**What goes wrong:** User clicks stop, button immediately shows "Start" but call still closing
**Why it happens:** stop() is async, call-end event fires later
**How to avoid:** Track "ending" state, show "Ending..." until call-end event
**Warning signs:** User can spam stop button, confusing behavior

### Pitfall 6: Volume Level During Silence
**What goes wrong:** Bars go flat when AI pauses, looks "dead"
**Why it happens:** volume-level is 0 during AI silence
**How to avoid:**
- Keep minimum bar height when call is active (not just when speaking)
- Or use speech-start/speech-end to show "thinking" vs "speaking" states
**Warning signs:** Bars appear frozen or dead during natural pauses

## Code Examples

Verified patterns from official sources:

### Starting a Call with Assistant ID and Overrides
```javascript
// Source: https://github.com/VapiAI/client-sdk-web + community docs
const assistantOverrides = {
  variableValues: {
    demo_session_id: crypto.randomUUID(),
    source: 'website_demo'
  }
};

vapi.start('your-assistant-id', assistantOverrides);
```

### Listening to All Relevant Events
```javascript
// Source: https://docs.vapi.ai/quickstart/web
vapi.on('call-start', () => {
  console.log('Call has started');
});

vapi.on('call-end', () => {
  console.log('Call has ended');
});

vapi.on('speech-start', () => {
  console.log('Assistant started speaking');
});

vapi.on('speech-end', () => {
  console.log('Assistant stopped speaking');
});

vapi.on('volume-level', (volume) => {
  // volume is 0-1 float representing assistant's voice level
  console.log(`Volume: ${volume}`);
});

vapi.on('error', (error) => {
  console.error('Vapi error:', error);
});

vapi.on('message', (message) => {
  // Transcripts and function call results
  if (message.type === 'transcript') {
    console.log(`${message.role}: ${message.transcript}`);
  }
});
```

### Error Display Pattern (Auto-Dismiss)
```javascript
// Auto-dismissing error with retry
function ErrorDisplay({ error, onRetry, onDismiss }) {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(onDismiss, 7000); // 7 second auto-dismiss
      return () => clearTimeout(timer);
    }
  }, [error, onDismiss]);

  if (!error) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-red-400">
      <button
        onClick={onRetry}
        className="px-3 py-1 bg-red-400/10 rounded hover:bg-red-400/20"
      >
        Retry
      </button>
    </div>
  );
}
```

### CSS for Audio Bars Animation
```css
/* Add to src/index.css */
@keyframes bar-idle {
  0%, 100% {
    transform: scaleY(0.15);
  }
  50% {
    transform: scaleY(0.25);
  }
}

.animate-bar-idle {
  animation: bar-idle 1.2s ease-in-out infinite;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Widget embed (iframe) | Native SDK integration | 2024 | Full control over UI, no iframe limitations |
| Polling for call status | Event-driven SDK | Always | Real-time updates, no polling overhead |
| Custom WebRTC | Vapi SDK (Daily.js) | Always | Simpler, maintained by Vapi |

**Deprecated/outdated:**
- Vapi widget embed: Still works but limits UI customization
- Manual WebRTC setup: Unnecessary complexity, SDK handles it

## Open Questions

Things that couldn't be fully resolved:

1. **Exact volume-level event frequency**
   - What we know: Events fire continuously during call with 0-1 values
   - What's unclear: Exact frequency (appears to be ~60fps based on behavior)
   - Recommendation: Use the values as-is; throttling may be needed if performance issues arise

2. **Call drop behavior**
   - What we know: call-end event fires with endedReason
   - What's unclear: Whether to auto-retry on network errors
   - Recommendation: Per CONTEXT.md, this is Claude's discretion. Suggest showing error + retry button (no auto-retry) to keep user in control

3. **Microphone permission UX**
   - What we know: Permission denied results in error event
   - What's unclear: Best UX pattern (inline vs toast)
   - Recommendation: Per CONTEXT.md, this is Claude's discretion. Suggest inline minimal error near button with retry

## Sources

### Primary (HIGH confidence)
- [GitHub VapiAI/client-sdk-web](https://github.com/VapiAI/client-sdk-web) - SDK README, methods, events
- [npm @vapi-ai/web](https://www.npmjs.com/package/@vapi-ai/web) - Version 2.5.2, dependencies
- [Vapi Blocks Quickstart](https://www.vapiblocks.com/docs/quickstart) - Complete useVapi hook example
- [Vapi Call Ended Reasons](https://docs.vapi.ai/calls/call-ended-reason) - Error codes

### Secondary (MEDIUM confidence)
- [Vapi Community Discussion on Audio Visualization](https://vapi.ai/community/m/1375349063335149628) - Confirmed volume-level is 0-1 range
- [MDN crypto.randomUUID](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) - Browser support, secure context requirement

### Tertiary (LOW confidence)
- CSS equalizer patterns from various CodePen examples - General approach, not Vapi-specific

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Vapi SDK, well-documented
- Architecture: HIGH - Patterns from official Vapi Blocks documentation
- Pitfalls: MEDIUM - Some from community discussions, core from official docs

**Research date:** 2026-01-22
**Valid until:** 60 days (SDK is stable, v2.x has been out since 2024)
