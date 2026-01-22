# Features Research

## Table Stakes

Must-have for any live terminal display:

| Feature | Complexity | Notes |
|---------|------------|-------|
| Status indicator | Low | Dot + label (Standby/Active/Done) |
| Field labels | Low | Clear labeling of each data point |
| Loading state | Low | Graceful "waiting for data" |
| Error handling | Low | Network errors, timeout messaging |
| Responsive layout | Medium | Stack on mobile |

## Differentiators

What makes it Stripe/Linear-level premium:

| Feature | Complexity | Impact |
|---------|------------|--------|
| **Scan line animation** | Medium | Creates "active monitoring" feel |
| **Field glow on update** | Medium | Shows data is live, not static |
| **Status chip pulse** | Low | Subtle life during active call |
| **Typewriter summary** | Medium | Premium feel, not instant dump |
| **Staggered event log** | Low | CAPTURE → CLASSIFY → QUEUE fade in |
| **Monospace accents** | Low | Terminal aesthetic without being cheesy |
| **Subtle grid overlay** | Low | Depth without distraction |
| **Border glow active state** | Low | Clear visual state change |

Key insight: Premium = restraint. Each animation serves a purpose (showing liveness, drawing attention to updates). No animation for animation's sake.

## Anti-Features

Things to deliberately NOT build:

| Anti-Feature | Why Avoid |
|--------------|-----------|
| Blinking cursor everywhere | Cheesy, distracting |
| Sound effects | Annoying, unexpected |
| Particle effects | Gimmicky, performance hit |
| Fake "typing" in all fields | Only summary needs typewriter |
| Random flickering | Looks broken, not premium |
| Matrix-style falling characters | Too themey, unprofessional |
| Counter animations | No fake numbers/metrics |
| "Success" confetti | Undermines trust messaging |
| Auto-scrolling transcript | Overwhelming, not the point |

## Animation Patterns

**Scan line:**
- Thin horizontal line (1-2px)
- Moves top-to-bottom over 3s
- Subtle opacity (0.3-0.5)
- Only during active call
- CSS: `position: absolute`, keyframe animation

**Field glow:**
- Trigger: field value changes
- Effect: brief box-shadow glow (0.5s)
- Color: cyan accent (#00d4cf)
- One-shot, not looping

**Status pulse:**
- Trigger: status === 'active_call'
- Effect: soft pulse animation (2s loop)
- Tailwind: `animate-pulse` or custom

**Typewriter:**
- Trigger: call ends, summary appears
- Speed: ~30-50ms per character
- Cursor: blinking underscore at end
- Stop cursor after complete

## Reference Examples

Premium terminal/dashboard UIs:

1. **Vercel deployment logs** - Clean, monospace, subtle animations
2. **Linear changelog** - Restrained motion, clear hierarchy
3. **Stripe dashboard** - Data updates feel instant but smooth
4. **Raycast** - Command palette with live search feel
5. **GitHub Actions** - Log streaming without overwhelm

Common thread: Information density without visual noise. Motion serves comprehension, not decoration.
