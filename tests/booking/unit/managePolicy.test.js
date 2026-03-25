import assert from 'node:assert/strict'
import test from 'node:test'
import {
  assertManageActionAllowed,
  buildManagePermissions,
} from '../../../src/server/booking/managePolicy.js'

const slotStartIso = '2026-03-02T16:00:00-05:00'
const baseInput = {
  slotStartIso,
  timezone: 'America/Toronto',
  selfServiceCutoffMinutes: 12 * 60,
}

test('client is blocked inside the self-service cutoff window', () => {
  const permissions = buildManagePermissions({
    ...baseInput,
    actor: 'client',
    eventStatus: 'confirmed',
    now: new Date('2026-03-02T06:30:00-05:00'),
  })

  assert.equal(permissions.canCancel, false)
  assert.equal(permissions.canReschedule, false)
  assert.match(permissions.lockedReason, /self-service closes/i)
})

test('owner is allowed inside the cutoff but blocked after start', () => {
  const ownerPermissions = buildManagePermissions({
    ...baseInput,
    actor: 'owner',
    eventStatus: 'confirmed',
    now: new Date('2026-03-02T06:30:00-05:00'),
  })

  assert.equal(ownerPermissions.canCancel, true)
  assert.equal(ownerPermissions.canReschedule, true)

  const lockedPermissions = buildManagePermissions({
    ...baseInput,
    actor: 'owner',
    eventStatus: 'confirmed',
    now: new Date('2026-03-02T16:01:00-05:00'),
  })

  assert.equal(lockedPermissions.canCancel, false)
  assert.match(lockedPermissions.lockedReason, /locked after the scheduled start time/i)
})

test('cancelled bookings are locked for everyone', () => {
  const permissions = buildManagePermissions({
    ...baseInput,
    actor: 'client',
    eventStatus: 'cancelled',
    now: new Date('2026-03-02T05:00:00-05:00'),
  })

  assert.equal(permissions.canCancel, false)
  assert.equal(permissions.canReschedule, false)
  assert.throws(
    () =>
      assertManageActionAllowed({
        permissions,
        action: 'cancel',
      }),
    (error) => error?.status === 409 && error?.code === 'BOOKING_LOCKED'
  )
})
