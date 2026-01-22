# Stack Research

## Vapi Web SDK

**Package:** `@vapi-ai/web`

**Installation:**
```bash
npm install @vapi-ai/web
```

**Key API:**
```javascript
import Vapi from '@vapi-ai/web';

const vapi = new Vapi('PUBLIC_KEY');

// Start call with metadata
vapi.start('ASSISTANT_ID', {
  assistantOverrides: {
    variableValues: {
      demo_session_id: 'uuid-here'
    }
  }
});

// Events
vapi.on('call-start', () => {});
vapi.on('call-end', () => {});
vapi.on('speech-start', () => {});
vapi.on('speech-end', () => {});
vapi.on('message', (msg) => {
  if (msg.type === 'transcript') { /* real-time transcript */ }
});
vapi.on('error', (error) => {});

// Stop
vapi.stop();
```

**Note:** The metadata/variableValues approach passes custom data to the assistant. The Vapi assistant's tool can then access this via the call context.

## Animation Approach

**Recommendation:** Pure CSS + Tailwind

No animation library needed. The existing codebase already has:
- Custom keyframes in index.css
- `animate-fade-in-up`, `animate-pulse-glow`, `animate-float`
- Animation delay utilities

**New keyframes to add:**
- `scan-line` - horizontal line sweep
- `field-glow` - brief glow on update
- `typewriter` - cursor blink for summary

CSS animations are more performant than JS libraries for these effects.

## Real-time Data

**Approach:** Custom polling hook

```javascript
// useLiveMonitor.js pattern
const [data, setData] = useState(null);
const intervalRef = useRef(null);

const startPolling = (sessionId) => {
  intervalRef.current = setInterval(async () => {
    const res = await fetch(`/webhook/demo/latest?demo_session_id=${sessionId}`);
    const json = await res.json();
    if (json.success) setData(json.data);
  }, 1000);
};

const stopPolling = () => clearInterval(intervalRef.current);

// Cleanup on unmount
useEffect(() => () => stopPolling(), []);
```

No external library needed - simple fetch + setInterval.

## Recommended Additions

| Package | Version | Purpose |
|---------|---------|---------|
| `@vapi-ai/web` | latest | Vapi browser SDK |

That's it. No other packages needed.

## Do NOT Add

| Package | Reason |
|---------|--------|
| Framer Motion | Overkill for these animations, adds bundle size |
| React Query | Simple polling doesn't need caching layer |
| Socket.io | n8n endpoint is REST, polling is simpler |
| GSAP | CSS keyframes sufficient for these effects |

Keep the bundle lean. CSS + native fetch is all that's needed.
