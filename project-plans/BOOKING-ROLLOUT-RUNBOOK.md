# Booking Rollout Runbook

## Scope

This runbook covers the Leviathan booking rollout with:

- preview first, production second
- Trigger staging for preview and Trigger prod for production
- Vercel app deploy plus Trigger worker deploy on every rollout
- `syncVercelEnvVars()` for Trigger env parity
- committed-code production cutovers only

## Required Credentials

Runtime:

- `HEALTH_SECRET`
- preview/staging `TRIGGER_SECRET_KEY`
- production `TRIGGER_SECRET_KEY`
- booking runtime env vars for Google Calendar, SMTP, and manage tokens

Deploy-time only:

- `VERCEL_ACCESS_TOKEN`
- `VERCEL_PROJECT_ID`
- `VERCEL_TEAM_ID`

## Sequence

1. Install dependencies: `npm install`
2. Validate locally: `npm test` and `npm run build`
3. Confirm Vercel preview/prod envs contain the booking runtime vars plus the correct environment-specific `TRIGGER_SECRET_KEY`
4. Confirm the deploy shell has `VERCEL_ACCESS_TOKEN`, `VERCEL_PROJECT_ID`, and `VERCEL_TEAM_ID`
5. Link the repo to `owenjalalis-projects/leviathan-systems` non-interactively if `.vercel/project.json` is missing
6. Deploy Trigger staging: `npm run deploy:trigger:staging`
7. Deploy Vercel preview: `npm run deploy:vercel:preview`
8. Run remote smoke against the preview URL:
   `BOOKING_SMOKE_BASE_URL=<preview-url> BOOKING_SMOKE_HEALTH_SECRET=<HEALTH_SECRET> BOOKING_SMOKE_VERCEL_DEPLOYMENT=<preview-url> BOOKING_SMOKE_VERCEL_SCOPE=owenjalalis-projects npm run smoke:booking`
9. Verify Trigger staging received lifecycle runs from the preview booking flow
10. Commit the validated code
11. Deploy Trigger prod from the committed state: `npm run deploy:trigger:prod`
12. Deploy Vercel production from the committed state: `npm run deploy:vercel:prod`
13. Run remote smoke against `https://www.leviathan-systems.com`:
   `BOOKING_SMOKE_BASE_URL=https://www.leviathan-systems.com BOOKING_SMOKE_HEALTH_SECRET=<HEALTH_SECRET> npm run smoke:booking`
14. Verify Trigger prod received lifecycle runs and confirm `/api/health/booking` no longer returns `404`

## Notes

- Public `GET /api/health/booking` should only return `{ status }`.
- Authenticated diagnostics require `x-health-key: <HEALTH_SECRET>`.
- Remote HTTP smoke exercises the client manage flow because the public booking response intentionally does not expose the owner manage link.
- The local smoke still validates the richer owner-link and stale-reminder paths directly against the provider-backed API.
- Protected Vercel previews should be exercised through `vercel curl` by setting `BOOKING_SMOKE_VERCEL_DEPLOYMENT`; production smoke can continue to use direct HTTP.
