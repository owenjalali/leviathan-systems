import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createManageTokenSet,
  hashManageToken,
  verifyManageToken,
} from '../../../src/server/booking/manageTokens.js'

test('manage tokens hash and verify per actor', () => {
  const tokenSet = createManageTokenSet({
    eventId: 'audit20260302t153000utc',
    secret: 'manage-secret',
  })

  assert.equal(
    hashManageToken({
      eventId: 'audit20260302t153000utc',
      actor: 'client',
      token: tokenSet.client.token,
      secret: 'manage-secret',
    }),
    tokenSet.client.hash
  )

  assert.equal(
    verifyManageToken({
      eventId: 'audit20260302t153000utc',
      actor: 'owner',
      token: tokenSet.owner.token,
      secret: 'manage-secret',
      expectedHash: tokenSet.owner.hash,
    }),
    'owner'
  )
})

test('manage token verification rejects mismatched actor tokens', () => {
  const tokenSet = createManageTokenSet({
    eventId: 'audit20260302t153000utc',
    secret: 'manage-secret',
  })

  assert.throws(
    () =>
      verifyManageToken({
        eventId: 'audit20260302t153000utc',
        actor: 'owner',
        token: tokenSet.client.token,
        secret: 'manage-secret',
        expectedHash: tokenSet.owner.hash,
      }),
    (error) =>
      error?.status === 403 && error?.code === 'INVALID_MANAGE_TOKEN'
  )
})
