import { task } from '@trigger.dev/sdk'
import { runBookingReminder } from '../server/booking/notifications.js'
import { createBookingRuntime } from '../server/booking/runtime.js'

export const bookingReminder = task({
  id: 'booking-reminder',
  machine: {
    preset: 'small-2x',
  },
  retry: {
    maxAttempts: 3,
  },
  run: async (payload) => {
    const runtime = createBookingRuntime()

    return runBookingReminder(payload, {
      calendarGateway: runtime.calendarGateway,
      smtpGateway: runtime.smtpGateway,
    })
  },
})
