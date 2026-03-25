import { idempotencyKeys, tasks } from '@trigger.dev/sdk'

export async function enqueueBookingLifecycleNotification(payload) {
  const idempotencyKey = await idempotencyKeys.create(
    ['booking-lifecycle-notifications', payload.kind, payload.eventId, payload.slotStartIso],
    { scope: 'global' }
  )

  return tasks.trigger('booking-lifecycle-notifications', payload, {
    idempotencyKey,
  })
}
