# Repository Cleanup

## Why This Cleanup Happened

The repo had drifted into a mix of live app code, abandoned experiments,
generated screenshots, local tool state, and old planning artifacts. The goal of
this cleanup was to leave only what supports the active Leviathan site and
booking system.

## Removed

Top-level clutter:

- screenshot PNG artifacts in the repo root
- old redesign and benchmark markdown files
- old phase log file
- stray `nul` file
- generated `dist/`

Workflow and tool debris:

- `workflows/n8n/`
- `.playwright-mcp/`
- `.agent/`
- `.claude/`
- `.gemini/`
- `.gsd/`
- hidden `.planning/`

Dead source files:

- `src/pages/Begin.jsx`
- `src/pages/Book.jsx`
- `src/hooks/useScrollAnimation.js`
- `src/sections/home/DemoIntroSection.jsx`
- `src/sections/home/DemoPlaceholder.jsx`
- unused UI components:
  - `BentoGrid.jsx`
  - `Button.jsx`
  - `FeatureCard.jsx`
  - `GradientButton.jsx`
  - `MarqueeTrack.jsx`
  - `PulseBeams.jsx`
  - `ShimmerButton.jsx`
  - `TestimonialCard.jsx`
  - `Timeline.jsx`
- unused asset:
  - `src/assets/react.svg`

Tooling cleanup:

- removed the stale `verify:tailwind` npm script
- added `.claude/`, `.planning/`, and `.playwright-mcp/` to `.gitignore`

## Kept Intentionally

- `trigger.config.mjs`
  Trigger.dev is still part of the booking system.
- `vercel.json`
  Needed for SPA/API deploy shape on Vercel.
- `scripts/booking-smoke.mjs`
  Used for live end-to-end validation.
- `scripts/backfill-booking-manage.mjs`
  Used for legacy event migration.
- `src/content/demo-data.js` and the active demo sections
  These are still part of the public site content.

## Note About Playwright MCP

`.playwright-mcp/` was not product code. It was just local browser automation
console logs created by tooling. It did not belong in the app repo and was
removed.
