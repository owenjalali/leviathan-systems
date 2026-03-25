import assert from 'node:assert/strict'
import test from 'node:test'
import { loadBookingEnv } from '../../../src/server/booking/env.js'

test('loadBookingEnv falls back to VERCEL_URL for base URLs when explicit values are absent', () => {
  const env = loadBookingEnv({
    VERCEL_URL: 'preview-example.vercel.app',
    AUDIT_LEAD_TOKEN_SECRET: 'lead-secret',
    BOOKING_MANAGE_TOKEN_SECRET: 'manage-secret',
    GOOGLE_CLIENT_ID: 'google-client-id',
    GOOGLE_CLIENT_SECRET: 'google-client-secret',
    GOOGLE_REFRESH_TOKEN: 'google-refresh-token',
  })

  assert.equal(env.appBaseUrl, 'https://preview-example.vercel.app')
  assert.equal(
    env.bookingManageBaseUrl,
    'https://preview-example.vercel.app'
  )
})
