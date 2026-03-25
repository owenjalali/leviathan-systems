import { loadBookingEnv, getMissingEnvKeys, BOOKING_ENV_REQUIREMENTS } from './env.js'
import { createCalendarGateway } from './calendar.js'
import { createSmtpGateway, createSmtpTransport } from './smtp.js'
import {
  createGoogleCalendarClient,
  createGoogleOAuthClient,
  verifyGoogleAccess,
} from './googleAuth.js'

const warnedGroups = new Set()

function warnOnce(logger, key, message, details) {
  if (warnedGroups.has(key)) {
    return
  }

  warnedGroups.add(key)
  logger.warn?.(message, details)
}

function emitStartupWarnings(logger, env) {
  const groups = [
    ['google', BOOKING_ENV_REQUIREMENTS.booking],
    ['smtp', BOOKING_ENV_REQUIREMENTS.notifications],
    ['trigger', BOOKING_ENV_REQUIREMENTS.trigger],
    ['manage', ['BOOKING_MANAGE_BASE_URL', 'BOOKING_MANAGE_TOKEN_SECRET']],
  ]

  for (const [groupKey, keys] of groups) {
    const missing = getMissingEnvKeys(env, keys)

    if (missing.length > 0) {
      warnOnce(
        logger,
        `${groupKey}:${missing.join(',')}`,
        `Booking startup warning: ${groupKey} configuration is incomplete.`,
        { missing }
      )
    }
  }
}

export function createBookingRuntime({ env = loadBookingEnv(), logger = console } = {}) {
  const authClient = createGoogleOAuthClient(env)
  const smtpConfigured =
    getMissingEnvKeys(env, BOOKING_ENV_REQUIREMENTS.notifications).length === 0
  const smtpTransport = smtpConfigured ? createSmtpTransport(env) : null

  emitStartupWarnings(logger, env)

  return {
    env,
    logger,
    calendarGateway: createCalendarGateway({
      calendarClient: createGoogleCalendarClient(env, authClient),
      calendarId: env.googleCalendarId,
      timeZone: env.bookingTimezone,
    }),
    smtpGateway: smtpTransport
      ? createSmtpGateway({
          transport: smtpTransport,
          from: env.smtpFrom,
          replyTo: env.smtpReplyTo || env.bookingOwnerEmail || undefined,
        })
      : null,
    verifyGoogleAccess: () => verifyGoogleAccess(authClient),
    verifySmtpAccess: async () => {
      if (!smtpTransport) {
        return false
      }

      await smtpTransport.verify()
      return true
    },
  }
}
