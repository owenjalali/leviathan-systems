# Booking System Hardening

## Goal

Finish the Leviathan audit booking system so it behaves like a real booking
product instead of a partial demo implementation.

## Main Changes Added

### Config surface

- sanitized `.env.example`
- added manage-link, SMTP, reminder, and Google send-updates env support
- split `AUDIT_LEAD_TOKEN_SECRET` from `BOOKING_MANAGE_TOKEN_SECRET`

### Notification architecture

- removed Gmail transport usage from the booking flow
- added SMTP delivery with Nodemailer
- kept Trigger.dev as the primary lifecycle dispatcher
- added SMTP fallback for immediate lifecycle emails when Trigger enqueue fails

### Booking domain

- added actor-scoped manage token generation and verification
- added self-service permission rules
- added in-memory availability cache
- added in-memory manage-context cache
- added in-process slot locking
- added best-effort mutation rate limiting
- added overlap verification after create and reschedule
- added rollback behavior on stale-slot detection

### Calendar event metadata

- store manage state in `extendedProperties.private`
- preserve private metadata across patches
- append an audit-trail line into the event description on mutation

### Manage flow

- added manage context endpoint
- added cancel endpoint
- added reschedule endpoint
- added dedicated frontend `/manage-booking` page
- added shared slot picker for both initial booking and rescheduling

### Trigger tasks

- replaced the old booking-only flow with lifecycle-aware notification tasks
- kept reminder tasks delayed and made them self-skip when stale or cancelled
- keyed idempotency on `kind + eventId + slotStartIso`

### Health and operations

- expanded `/api/health/booking`
- exposed config, provider, cache, and slot-lock state
- added live smoke script
- added manage-link backfill script

## Validation Completed

- `npm test`
- `npm run build`
- script syntax checks for:
  - `scripts/booking-smoke.mjs`
  - `scripts/backfill-booking-manage.mjs`

## Validation Still Requiring Real Infrastructure

- live smoke against real calendar and SMTP inbox
- manual browser pass for `/audit` and `/manage-booking`
- optional backfill dry-run and apply flow
