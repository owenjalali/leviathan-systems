import assert from 'node:assert/strict'
import test from 'node:test'
import { signLeadToken, verifyLeadToken } from '../../../src/server/booking/leadToken.js'
import { createValidLead } from '../helpers.js'

test('lead token signs and verifies normalized lead payloads', () => {
  const lead = createValidLead()
  const token = signLeadToken({
    lead,
    secret: 'super-secret',
    issuedAt: new Date('2026-03-02T10:00:00.000Z'),
    ttlMinutes: 60,
  })
  const verified = verifyLeadToken(token, {
    secret: 'super-secret',
    now: new Date('2026-03-02T10:30:00.000Z'),
  })

  assert.equal(verified.lead.businessName, lead.businessName)
  assert.equal(verified.exp, '2026-03-02T11:00:00.000Z')
})

test('lead token expiry returns a 404-style session error', () => {
  const token = signLeadToken({
    lead: createValidLead(),
    secret: 'super-secret',
    issuedAt: new Date('2026-03-02T10:00:00.000Z'),
    ttlMinutes: 30,
  })

  assert.throws(
    () =>
      verifyLeadToken(token, {
        secret: 'super-secret',
        now: new Date('2026-03-02T10:31:00.000Z'),
      }),
    (error) =>
      error?.status === 404 &&
      error?.code === 'EXPIRED_LEAD_TOKEN' &&
      /expired/i.test(error.message)
  )
})
