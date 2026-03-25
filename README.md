# Leviathan Systems

This repo now includes the full Leviathan audit booking flow:

- lead intake and signed lead tokens
- live Google Calendar availability
- booking create, cancel, reschedule, and manage links
- Trigger.dev lifecycle notifications with SMTP fallback
- delayed reminders that self-skip when a booking is stale or cancelled
- public booking health plus authenticated diagnostics
- backfill and live smoke scripts

Planning and repo-context documents now live in `project-plans/`.

## Local scripts

```bash
npm install
npm run dev
```

```bash
npm test
npm run build
```

```bash
npm run smoke:booking
npm run backfill:manage -- --dry-run
```

## Environment setup

Copy `.env.example` and fill every placeholder before using the booking flow.

### Google Calendar

1. In Google Calendar, open the calendar settings and copy the calendar's `Calendar ID` into `GOOGLE_CALENDAR_ID`.
2. Create or reuse a Google OAuth client and place the client id and client secret into `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
3. Generate `GOOGLE_REFRESH_TOKEN` separately with OAuth Playground using Calendar scope. Do not reuse a browser session token.
4. Keep `BOOKING_GOOGLE_SEND_UPDATES=all` unless you intentionally want to suppress attendee updates.

### SMTP

SMTP is the booking email transport. Configure it separately from Google Calendar auth:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SMTP_REPLY_TO`

`BOOKING_OWNER_EMAIL` should point at the owner inbox that receives lifecycle notifications.

### Trigger.dev

Trigger.dev remains the primary dispatcher for:

- booking confirmations
- reschedule notifications
- cancellation notifications
- delayed reminders

Set an environment-specific `TRIGGER_SECRET_KEY` and `TRIGGER_PROJECT_REF`, then let `syncVercelEnvVars()` pull the matching Vercel env vars into the Trigger worker at deploy time.

Deployment-only env vars for Trigger/Vercel sync:

- `VERCEL_ACCESS_TOKEN`
- `VERCEL_PROJECT_ID`
- `VERCEL_TEAM_ID`

These are deploy credentials, not normal app runtime env vars.

### Manage links

- `AUDIT_LEAD_TOKEN_SECRET` signs the short-lived post-intake lead token.
- `BOOKING_MANAGE_TOKEN_SECRET` signs actor-scoped manage links.
- `BOOKING_MANAGE_BASE_URL` must match the public frontend origin so emailed manage links resolve to `/manage-booking`.
- New manage links use URL fragments so bearer tokens stay out of normal request URLs.
- Legacy query-param manage links are still accepted and rewritten client-side to fragment form.

## Health endpoint

`GET /api/health/booking` now has two modes:

- public: returns only `{ "status": "ok" | "degraded" }`
- authenticated: send `x-health-key: <HEALTH_SECRET>` to receive the full diagnostics payload

The authenticated diagnostics include booking, Google, SMTP, Trigger, cache, lock, and dispatch state. The public response stays intentionally cheap and non-sensitive.

## Operational scripts

### Live smoke

`npm run smoke:booking` exercises the live booking domain with configured providers:

1. checks public `/api/health/booking`
2. checks authenticated diagnostics when `BOOKING_SMOKE_HEALTH_SECRET` is set
3. submits a lead
4. books a live slot
5. loads manage context over HTTP when `BOOKING_SMOKE_BASE_URL` is set
6. reschedules once
7. cancels the booking
8. verifies the final context is cancelled and locked

When `BOOKING_SMOKE_BASE_URL` is unset, the script runs the richer local provider smoke and also verifies the stale reminder regression path.

Remote smoke environment variables:

- `BOOKING_SMOKE_BASE_URL=https://preview-or-prod.example`
- `BOOKING_SMOKE_HEALTH_SECRET=<HEALTH_SECRET>` to validate authenticated diagnostics
- `BOOKING_SMOKE_VERCEL_DEPLOYMENT=<preview-url>` to route requests through `vercel curl` for protected preview deployments
- `BOOKING_SMOKE_VERCEL_SCOPE=<team-slug>` when the preview deployment lives under a team scope
- `BOOKING_SMOKE_VERCEL_TOKEN=<token>` only if the local Vercel CLI is not already authenticated

The script uses real provider credentials from the environment. Run it against a disposable calendar window and inbox.

## Rollout Runbook

Use the preview-to-production rollout sequence in `project-plans/BOOKING-ROLLOUT-RUNBOOK.md`.

### Manage-link backfill

`npm run backfill:manage -- --dry-run` scans future Leviathan audit events for missing manage metadata.

- `--dry-run` prints candidates without mutating events.
- `--apply` patches private metadata and appends a description audit-trail entry without notifying attendees.

If legacy events predate private metadata, the script reconstructs client details from the existing event description before patching.
