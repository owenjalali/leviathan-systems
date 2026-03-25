import { DateTime } from 'luxon'
import { BookingError } from './errors.js'
import { normalizeManageActor } from './manageTokens.js'

function formatCutoffHours(cutoffMinutes) {
  const cutoffHours = cutoffMinutes / 60
  return Number.isInteger(cutoffHours)
    ? `${cutoffHours} hour${cutoffHours === 1 ? '' : 's'}`
    : `${cutoffMinutes} minutes`
}

export function buildManagePermissions({
  actor,
  eventStatus,
  slotStartIso,
  timezone,
  selfServiceCutoffMinutes,
  now = new Date(),
}) {
  const normalizedActor = normalizeManageActor(actor)
  const bookingStart = DateTime.fromISO(slotStartIso, {
    zone: timezone,
  })
  const currentTime = DateTime.fromJSDate(now, {
    zone: timezone,
  })

  if (eventStatus === 'cancelled') {
    return {
      actor: normalizedActor,
      canCancel: false,
      canReschedule: false,
      lockedReason: 'This booking has already been cancelled.',
      lockedCode: 'CANCELLED',
    }
  }

  if (!bookingStart.isValid || currentTime >= bookingStart) {
    return {
      actor: normalizedActor,
      canCancel: false,
      canReschedule: false,
      lockedReason: 'This booking is locked after the scheduled start time.',
      lockedCode: 'STARTED',
    }
  }

  if (normalizedActor === 'client') {
    const clientCutoff = bookingStart.minus({
      minutes: selfServiceCutoffMinutes,
    })

    if (currentTime >= clientCutoff) {
      return {
        actor: normalizedActor,
        canCancel: false,
        canReschedule: false,
        lockedReason: `Client self-service closes ${formatCutoffHours(
          selfServiceCutoffMinutes
        )} before the audit starts.`,
        lockedCode: 'CLIENT_CUTOFF',
      }
    }
  }

  return {
    actor: normalizedActor,
    canCancel: true,
    canReschedule: true,
    lockedReason: null,
    lockedCode: null,
  }
}

export function assertManageActionAllowed({
  permissions,
  action,
}) {
  const canProceed =
    action === 'cancel' ? permissions.canCancel : permissions.canReschedule

  if (!canProceed) {
    throw new BookingError(
      permissions.lockedReason || 'This booking can no longer be changed.',
      {
        status: 409,
        code: 'BOOKING_LOCKED',
        details: {
          action,
          lockedCode: permissions.lockedCode,
        },
      }
    )
  }
}
