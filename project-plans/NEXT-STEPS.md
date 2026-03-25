# Next Steps

## Immediate

- confirm `.env` values are correct locally
- mirror the required env values to Vercel and Trigger.dev
- hit `GET /api/health/booking` and confirm readiness looks correct

## Before Launch

- run `npm run smoke:booking` against a real test calendar and inbox
- manually validate:
  - `/audit`
  - `/manage-booking`
- optionally run:
  - `npm run backfill:manage -- --dry-run`
  - `npm run backfill:manage -- --apply`

## Recommended Follow-Up

- decide whether to fix the remaining unrelated lint issues in the active UI files
- add privacy and terms pages if footer links are meant to stay live
- consider code-splitting if bundle size becomes a concern
- add deployment notes for Vercel and Trigger.dev env syncing
