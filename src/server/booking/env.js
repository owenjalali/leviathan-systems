import { BookingError, createConfigurationError } from './errors.js'

const DEFAULT_BOOKING_TIMEZONE = 'America/Toronto'
const DEFAULT_WORKING_DAYS = [1, 2, 3, 4, 5]
const DEFAULT_DAY_START = '09:00'
const DEFAULT_DAY_END = '17:00'
const DEFAULT_SLOT_DURATION_MINUTES = 30
const DEFAULT_SLOT_INTERVAL_MINUTES = 30
const DEFAULT_MIN_NOTICE_MINUTES = 240
const DEFAULT_SELF_SERVICE_CUTOFF_MINUTES = 12 * 60
const DEFAULT_LEAD_TOKEN_TTL_MINUTES = 24 * 60
const DEFAULT_REMINDER_LEAD_MINUTES = 60
const DEFAULT_GOOGLE_SEND_UPDATES = 'all'
const DEFAULT_SMTP_PORT = 587

const GOOGLE_SEND_UPDATE_OPTIONS = ['all', 'externalOnly', 'none']

const ENV_KEY_MAP = {
  APP_BASE_URL: 'appBaseUrl',
  BOOKING_MANAGE_BASE_URL: 'bookingManageBaseUrl',
  HEALTH_SECRET: 'healthSecret',
  AUDIT_LEAD_TOKEN_SECRET: 'auditLeadTokenSecret',
  BOOKING_MANAGE_TOKEN_SECRET: 'bookingManageTokenSecret',
  GOOGLE_CLIENT_ID: 'googleClientId',
  GOOGLE_CLIENT_SECRET: 'googleClientSecret',
  GOOGLE_REFRESH_TOKEN: 'googleRefreshToken',
  GOOGLE_CALENDAR_ID: 'googleCalendarId',
  GOOGLE_ORGANIZER_EMAIL: 'googleOrganizerEmail',
  BOOKING_OWNER_EMAIL: 'bookingOwnerEmail',
  BOOKING_SELF_SERVICE_CUTOFF_MINUTES: 'bookingSelfServiceCutoffMinutes',
  BOOKING_GOOGLE_SEND_UPDATES: 'bookingGoogleSendUpdates',
  BOOKING_REMINDER_LEAD_MINUTES: 'reminderLeadMinutes',
  SMTP_HOST: 'smtpHost',
  SMTP_PORT: 'smtpPort',
  SMTP_SECURE: 'smtpSecure',
  SMTP_USER: 'smtpUser',
  SMTP_PASS: 'smtpPass',
  SMTP_FROM: 'smtpFrom',
  SMTP_REPLY_TO: 'smtpReplyTo',
  TRIGGER_SECRET_KEY: 'triggerSecretKey',
  TRIGGER_PROJECT_REF: 'triggerProjectRef',
}

export const BOOKING_ENV_REQUIREMENTS = {
  lead: ['AUDIT_LEAD_TOKEN_SECRET'],
  availability: [
    'AUDIT_LEAD_TOKEN_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_REFRESH_TOKEN',
  ],
  booking: [
    'AUDIT_LEAD_TOKEN_SECRET',
    'BOOKING_MANAGE_BASE_URL',
    'BOOKING_MANAGE_TOKEN_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_REFRESH_TOKEN',
  ],
  manage: [
    'BOOKING_MANAGE_BASE_URL',
    'BOOKING_MANAGE_TOKEN_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_REFRESH_TOKEN',
  ],
  notifications: [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_FROM',
    'BOOKING_OWNER_EMAIL',
  ],
  trigger: ['TRIGGER_SECRET_KEY', 'TRIGGER_PROJECT_REF'],
}

function readString(source, key, fallback = '') {
  const value = source[key]
  return typeof value === 'string' ? value.trim() : fallback
}

function readVercelBaseUrl(source) {
  const vercelUrl = readString(source, 'VERCEL_URL')

  if (!vercelUrl) {
    return ''
  }

  return vercelUrl.startsWith('http://') || vercelUrl.startsWith('https://')
    ? vercelUrl
    : `https://${vercelUrl}`
}

function parseClock(value, key) {
  const match = /^(?<hour>[01]\d|2[0-3]):(?<minute>[0-5]\d)$/.exec(value)

  if (!match?.groups) {
    throw new BookingError(`${key} must use HH:MM 24-hour format.`, {
      status: 500,
      code: 'CONFIGURATION_ERROR',
      details: { key },
    })
  }

  return Number(match.groups.hour) * 60 + Number(match.groups.minute)
}

function parsePositiveInteger(value, fallback, key) {
  const parsed = Number.parseInt(String(value || fallback), 10)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new BookingError(`${key} must be a positive integer.`, {
      status: 500,
      code: 'CONFIGURATION_ERROR',
      details: { key },
    })
  }

  return parsed
}

function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') {
    return fallback
  }

  const normalized = String(value).trim().toLowerCase()

  if (['true', '1', 'yes', 'on'].includes(normalized)) {
    return true
  }

  if (['false', '0', 'no', 'off'].includes(normalized)) {
    return false
  }

  throw new BookingError('SMTP_SECURE must be true or false.', {
    status: 500,
    code: 'CONFIGURATION_ERROR',
    details: { key: 'SMTP_SECURE' },
  })
}

function parseWorkingDays(value) {
  if (!value) {
    return [...DEFAULT_WORKING_DAYS]
  }

  const parsed = value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => Number.parseInt(entry, 10))

  if (
    parsed.length === 0 ||
    parsed.some((day) => !Number.isInteger(day) || day < 0 || day > 6)
  ) {
    throw new BookingError(
      'BOOKING_WORKING_DAYS must be a comma-separated list of integers from 0 to 6.',
      {
        status: 500,
        code: 'CONFIGURATION_ERROR',
        details: { key: 'BOOKING_WORKING_DAYS' },
      }
    )
  }

  return [...new Set(parsed)]
}

function parseGoogleSendUpdates(value) {
  const normalized =
    readString(
      { BOOKING_GOOGLE_SEND_UPDATES: value },
      'BOOKING_GOOGLE_SEND_UPDATES',
      DEFAULT_GOOGLE_SEND_UPDATES
    ) || DEFAULT_GOOGLE_SEND_UPDATES

  if (!GOOGLE_SEND_UPDATE_OPTIONS.includes(normalized)) {
    throw new BookingError(
      `BOOKING_GOOGLE_SEND_UPDATES must be one of ${GOOGLE_SEND_UPDATE_OPTIONS.join(
        ', '
      )}.`,
      {
        status: 500,
        code: 'CONFIGURATION_ERROR',
        details: { key: 'BOOKING_GOOGLE_SEND_UPDATES' },
      }
    )
  }

  return normalized
}

export function loadBookingEnv(source = process.env) {
  const vercelBaseUrl = readVercelBaseUrl(source)
  const bookingDayStartMinutes = parseClock(
    readString(source, 'BOOKING_DAY_START', DEFAULT_DAY_START),
    'BOOKING_DAY_START'
  )
  const bookingDayEndMinutes = parseClock(
    readString(source, 'BOOKING_DAY_END', DEFAULT_DAY_END),
    'BOOKING_DAY_END'
  )

  if (bookingDayEndMinutes <= bookingDayStartMinutes) {
    throw new BookingError('BOOKING_DAY_END must be after BOOKING_DAY_START.', {
      status: 500,
      code: 'CONFIGURATION_ERROR',
      details: { key: 'BOOKING_DAY_END' },
    })
  }

  return {
    appBaseUrl: readString(source, 'APP_BASE_URL', vercelBaseUrl),
    healthSecret: readString(source, 'HEALTH_SECRET'),
    auditLeadTokenSecret: readString(source, 'AUDIT_LEAD_TOKEN_SECRET'),
    bookingTimezone: readString(
      source,
      'BOOKING_TIMEZONE',
      DEFAULT_BOOKING_TIMEZONE
    ),
    bookingWorkingDays: parseWorkingDays(
      readString(source, 'BOOKING_WORKING_DAYS')
    ),
    bookingDayStartMinutes,
    bookingDayEndMinutes,
    bookingSlotDurationMinutes: parsePositiveInteger(
      readString(source, 'BOOKING_SLOT_DURATION_MINUTES'),
      DEFAULT_SLOT_DURATION_MINUTES,
      'BOOKING_SLOT_DURATION_MINUTES'
    ),
    bookingSlotIntervalMinutes: parsePositiveInteger(
      readString(source, 'BOOKING_SLOT_INTERVAL_MINUTES'),
      DEFAULT_SLOT_INTERVAL_MINUTES,
      'BOOKING_SLOT_INTERVAL_MINUTES'
    ),
    bookingMinNoticeMinutes: parsePositiveInteger(
      readString(source, 'BOOKING_MIN_NOTICE_MINUTES'),
      DEFAULT_MIN_NOTICE_MINUTES,
      'BOOKING_MIN_NOTICE_MINUTES'
    ),
    bookingSelfServiceCutoffMinutes: parsePositiveInteger(
      readString(source, 'BOOKING_SELF_SERVICE_CUTOFF_MINUTES'),
      DEFAULT_SELF_SERVICE_CUTOFF_MINUTES,
      'BOOKING_SELF_SERVICE_CUTOFF_MINUTES'
    ),
    leadTokenTtlMinutes: DEFAULT_LEAD_TOKEN_TTL_MINUTES,
    reminderLeadMinutes: parsePositiveInteger(
      readString(source, 'BOOKING_REMINDER_LEAD_MINUTES'),
      DEFAULT_REMINDER_LEAD_MINUTES,
      'BOOKING_REMINDER_LEAD_MINUTES'
    ),
    bookingGoogleSendUpdates: parseGoogleSendUpdates(
      readString(source, 'BOOKING_GOOGLE_SEND_UPDATES')
    ),
    googleClientId: readString(source, 'GOOGLE_CLIENT_ID'),
    googleClientSecret: readString(source, 'GOOGLE_CLIENT_SECRET'),
    googleRefreshToken: readString(source, 'GOOGLE_REFRESH_TOKEN'),
    googleCalendarId: readString(source, 'GOOGLE_CALENDAR_ID', 'primary') || 'primary',
    googleOrganizerEmail: readString(source, 'GOOGLE_ORGANIZER_EMAIL'),
    bookingManageBaseUrl: readString(
      source,
      'BOOKING_MANAGE_BASE_URL',
      vercelBaseUrl
    ),
    bookingManageTokenSecret: readString(source, 'BOOKING_MANAGE_TOKEN_SECRET'),
    bookingOwnerEmail:
      readString(source, 'BOOKING_OWNER_EMAIL') ||
      readString(source, 'GOOGLE_ORGANIZER_EMAIL'),
    smtpHost: readString(source, 'SMTP_HOST'),
    smtpPort: parsePositiveInteger(
      readString(source, 'SMTP_PORT'),
      DEFAULT_SMTP_PORT,
      'SMTP_PORT'
    ),
    smtpSecure: parseBoolean(readString(source, 'SMTP_SECURE'), false),
    smtpUser: readString(source, 'SMTP_USER'),
    smtpPass: readString(source, 'SMTP_PASS'),
    smtpFrom: readString(source, 'SMTP_FROM'),
    smtpReplyTo: readString(source, 'SMTP_REPLY_TO'),
    triggerSecretKey: readString(source, 'TRIGGER_SECRET_KEY'),
    triggerProjectRef: readString(source, 'TRIGGER_PROJECT_REF'),
  }
}

export function getMissingEnvKeys(env, keys) {
  return keys.filter((key) => {
    const propertyName = ENV_KEY_MAP[key]
    return propertyName ? !env[propertyName] : false
  })
}

export function assertEnvKeys(env, keys, message) {
  const missing = getMissingEnvKeys(env, keys)

  if (missing.length > 0) {
    throw createConfigurationError(missing, message)
  }
}
