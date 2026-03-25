# Project Overview

## Purpose

Leviathan Systems is now a focused React + Vite application with two active
product surfaces:

- the public marketing site
- the Leviathan audit booking system

The booking system is designed to turn the audit flow into an operational
workflow:

- intake submission
- signed lead session
- live monthly availability from Google Calendar
- booking creation
- actor-scoped manage links
- self-service reschedule/cancel
- lifecycle notifications

## Active Stack

- frontend: React 19, Vite, React Router
- validation: Zod
- calendar provider: Google Calendar API
- email transport: SMTP via Nodemailer
- orchestration: Trigger.dev
- tests: Node built-in test runner

## Active Routes

Frontend routes:

- `/`
- `/about`
- `/audit`
- `/manage-booking`

API routes:

- `POST /api/audit/lead`
- `GET /api/audit/availability`
- `POST /api/audit/booking`
- `GET /api/audit/manage/context`
- `POST /api/audit/manage/cancel`
- `POST /api/audit/manage/reschedule`
- `GET /api/health/booking`

## Runtime Shape

Synchronous API responsibilities:

- validate inputs
- create and verify lead tokens
- load availability
- perform booking mutations
- perform cancel and reschedule mutations
- enforce permission rules
- clear caches after mutations

Asynchronous responsibilities:

- lifecycle notification fan-out
- delayed reminders

## Booking Rules

Current defaults in code:

- timezone: `America/Toronto`
- working days: Monday to Friday
- hours: `09:00` to `17:00`
- slot duration: `30` minutes
- slot interval: `30` minutes
- minimum notice: `240` minutes
- client self-service cutoff: `12` hours
- Google attendee updates: `all`

## Deployment Notes

- local secrets belong in `.env`
- `.env.example` stays sanitized
- production envs must be mirrored in the hosting platform and Trigger.dev
- the health endpoint should be treated as the first deploy check
