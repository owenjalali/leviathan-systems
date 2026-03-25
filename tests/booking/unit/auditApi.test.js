import assert from 'node:assert/strict'
import test from 'node:test'
import { bookSlot } from '../../../src/lib/auditApi.js'

test('client API errors preserve the server error code', async () => {
  const originalFetch = global.fetch

  global.fetch = async () =>
    new Response(
      JSON.stringify({
        message: 'That slot has already been taken.',
        code: 'STALE_SLOT',
      }),
      {
        status: 409,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

  try {
    await assert.rejects(
      () =>
        bookSlot({
          leadToken: 'lead-token',
          slotStartIso: '2026-03-03T10:30:00-05:00',
        }),
      (error) =>
        error?.status === 409 &&
        error?.code === 'STALE_SLOT' &&
        error?.message === 'That slot has already been taken.'
    )
  } finally {
    global.fetch = originalFetch
  }
})
