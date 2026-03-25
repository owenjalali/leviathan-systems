import { idempotencyKeys, task } from '@trigger.dev/sdk'
import { runBookingLifecycleNotifications } from '../server/booking/notifications.js'
import { createBookingRuntime } from '../server/booking/runtime.js'
import { bookingReminder } from './bookingReminder.js'

export const bookingLifecycleNotifications = task({
  id: 'booking-lifecycle-notifications',
  machine: {
    preset: 'small-2x',
  },
  retry: {
    maxAttempts: 3,
  },
  run: async (payload) => {
    const runtime = createBookingRuntime()

    return runBookingLifecycleNotifications(payload, {
      smtpGateway: runtime.smtpGateway,
      reminderLeadMinutes: runtime.env.reminderLeadMinutes,
      appBaseUrl: runtime.env.appBaseUrl,
      scheduleReminder: async ({ payload: reminderPayload, delay }) => {
        const idempotencyKey = await idempotencyKeys.create(
          ['booking-reminder', payload.eventId, payload.slotStartIso],
          { scope: 'global' }
        )

        return bookingReminder.trigger(reminderPayload, {
          delay,
          idempotencyKey,
        })
      },
    })
  },
})
