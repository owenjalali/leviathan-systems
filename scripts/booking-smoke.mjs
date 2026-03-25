import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { DateTime } from 'luxon'
import { createBookingApi } from '../src/server/booking/api.js'
import { runBookingReminder } from '../src/server/booking/notifications.js'
import { createBookingRuntime } from '../src/server/booking/runtime.js'
import { enqueueBookingLifecycleNotification } from '../src/server/booking/trigger.js'
import { parseManageUrl } from '../shared/manageLink.js'

const execFileAsync = promisify(execFile)
const vercelCliPath = fileURLToPath(
  new URL('../node_modules/vercel/dist/vc.js', import.meta.url)
)

function buildSmokeLead() {
  return {
    businessName: process.env.BOOKING_SMOKE_BUSINESS_NAME || 'Leviathan Smoke Test',
    website: process.env.BOOKING_SMOKE_WEBSITE || 'example.com',
    industry: process.env.BOOKING_SMOKE_INDUSTRY || 'Professional Services',
    industryOther: '',
    contactEmail:
      process.env.BOOKING_SMOKE_CONTACT_EMAIL || 'smoke-test@example.com',
    phoneCountryCode: process.env.BOOKING_SMOKE_PHONE_COUNTRY_CODE || '+1',
    phoneNumber: process.env.BOOKING_SMOKE_PHONE_NUMBER || '(416) 555-0101',
    addressLine1: process.env.BOOKING_SMOKE_ADDRESS_LINE_1 || '100 Front Street',
    addressLine2: process.env.BOOKING_SMOKE_ADDRESS_LINE_2 || '',
    city: process.env.BOOKING_SMOKE_CITY || 'Toronto',
    provinceState: process.env.BOOKING_SMOKE_PROVINCE || 'ON',
    postalCode: process.env.BOOKING_SMOKE_POSTAL_CODE || 'M5V 2T6',
    countryCode: process.env.BOOKING_SMOKE_COUNTRY_CODE || 'CA',
    auditGoals:
      process.env.BOOKING_SMOKE_AUDIT_GOALS ||
      'Run the Leviathan booking smoke flow.',
  }
}

function monthKey(offsetMonths = 0) {
  return DateTime.now().plus({ months: offsetMonths }).toFormat('yyyy-MM')
}

function getMonthKey(slotStartIso) {
  return String(slotStartIso || '').slice(0, 7) || monthKey()
}

async function parseJsonResponse(response) {
  let body = {}

  try {
    body = await response.json()
  } catch {
    body = {}
  }

  if (!response.ok) {
    throw createRemoteRequestError(body, response.status)
  }

  return body
}

function createRemoteRequestError(body, status) {
  const error = new Error(
    body.message || `Remote smoke request failed with status ${status}.`
  )

  error.status = status
  error.code = body.code || null

  return error
}

async function requestRemoteJson(
  baseUrl,
  path,
  {
    method = 'POST',
    body,
    headers = {},
    transport = null,
  } = {}
) {
  if (transport?.kind === 'vercel-curl') {
    return requestVercelCurlJson(path, {
      method,
      body,
      headers,
      deployment: transport.deployment,
      scope: transport.scope,
      token: transport.token,
      protectionBypass: transport.protectionBypass,
    })
  }

  const response = await fetch(new URL(path, baseUrl), {
    method,
    headers: {
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  return parseJsonResponse(response)
}

async function requestVercelCurlJson(
  path,
  { method = 'POST', body, headers = {}, deployment, scope, token, protectionBypass }
) {
  const command = process.execPath
  const args = [vercelCliPath, 'curl', path, '--deployment', deployment]

  if (scope) {
    args.push('--scope', scope)
  }

  if (token) {
    args.push('--token', token)
  }

  if (protectionBypass) {
    args.push('--protection-bypass', protectionBypass)
  }

  args.push(
    '--',
    '--silent',
    '--show-error',
    '--location',
    '--request',
    method,
    '--write-out',
    '__STATUS__:%{http_code}'
  )

  const requestHeaders = {
    ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    ...headers,
  }

  for (const [key, value] of Object.entries(requestHeaders)) {
    args.push('--header', `${key}: ${value}`)
  }

  if (body !== undefined) {
    args.push('--data', JSON.stringify(body))
  }

  const { stdout, stderr } = await execFileAsync(command, args, {
    cwd: process.cwd(),
    env: process.env,
    maxBuffer: 10 * 1024 * 1024,
  })
  const statusMarker = '__STATUS__:'
  const markerIndex = stdout.lastIndexOf(statusMarker)

  if (markerIndex === -1) {
    throw new Error(stderr?.trim() || 'vercel curl did not return an HTTP status.')
  }

  const responseText = stdout.slice(0, markerIndex).trim()
  const status = Number.parseInt(
    stdout.slice(markerIndex + statusMarker.length).trim(),
    10
  )
  let responseBody = {}

  if (responseText) {
    try {
      responseBody = JSON.parse(responseText)
    } catch {
      responseBody = {}
    }
  }

  if (!Number.isFinite(status) || status < 200 || status >= 300) {
    throw createRemoteRequestError(responseBody, status)
  }

  return responseBody
}

async function checkRemoteHealth(baseUrl, healthSecret, transport) {
  const publicHealth = await requestRemoteJson(baseUrl, '/api/health/booking', {
    method: 'GET',
    transport,
  })

  assert.equal(Object.keys(publicHealth).length, 1)
  assert.ok(publicHealth.status)

  let diagnostics = null

  if (healthSecret) {
    diagnostics = await requestRemoteJson(baseUrl, '/api/health/booking', {
      method: 'GET',
      headers: {
        'x-health-key': healthSecret,
      },
      transport,
    })

    assert.ok(diagnostics.booking)
    assert.ok(diagnostics.trigger)
  }

  return {
    publicHealth,
    diagnostics,
  }
}

function createRemoteSmokeClient({
  baseUrl,
  healthSecret,
  vercelDeployment,
  vercelScope,
  vercelToken,
  vercelProtectionBypass,
}) {
  const transport = vercelDeployment
    ? {
        kind: 'vercel-curl',
        deployment: vercelDeployment,
        scope: vercelScope,
        token: vercelToken,
        protectionBypass: vercelProtectionBypass,
      }
    : null

  return {
    mode: 'remote',
    async checkHealth() {
      return checkRemoteHealth(baseUrl, healthSecret, transport)
    },
    async submitLead(payload) {
      return requestRemoteJson(baseUrl, '/api/audit/lead', {
        body: payload,
        transport,
      })
    },
    async loadAvailability({ month, leadToken }) {
      return requestRemoteJson(baseUrl, '/api/audit/availability', {
        body: {
          month,
          leadToken,
        },
        transport,
      })
    },
    async bookSlot({ leadToken, slotStartIso }) {
      return requestRemoteJson(baseUrl, '/api/audit/booking', {
        body: {
          leadToken,
          slotStartIso,
        },
        transport,
      })
    },
    async getManageContext(payload) {
      return requestRemoteJson(baseUrl, '/api/audit/manage/context', {
        body: payload,
        transport,
      })
    },
    async rescheduleBooking(payload) {
      return requestRemoteJson(baseUrl, '/api/audit/manage/reschedule', {
        body: payload,
        transport,
      })
    },
    async cancelBooking(payload) {
      return requestRemoteJson(baseUrl, '/api/audit/manage/cancel', {
        body: payload,
        transport,
      })
    },
  }
}

function createLocalSmokeClient(runtime) {
  const api = createBookingApi({
    env: runtime.env,
    calendarGateway: runtime.calendarGateway,
    smtpGateway: runtime.smtpGateway,
    triggerClient: {
      enqueueBookingLifecycleNotification,
    },
    verifyGoogleAccess: runtime.verifyGoogleAccess,
    verifySmtpAccess: runtime.verifySmtpAccess,
    logger: runtime.logger,
  })

  return {
    mode: 'local',
    runtime,
    api,
    async checkHealth() {
      const publicHealth = api.getPublicHealth()

      assert.equal(Object.keys(publicHealth).length, 1)

      return {
        publicHealth,
        diagnostics: await api.getHealthDiagnostics(),
      }
    },
    submitLead(payload) {
      return api.submitLead(payload)
    },
    loadAvailability(payload) {
      return api.loadAvailability(payload)
    },
    bookSlot(payload) {
      return api.bookSlot(payload)
    },
    getManageContext(payload) {
      return api.getManageContext(payload)
    },
    rescheduleBooking(payload) {
      return api.rescheduleBooking(payload)
    },
    cancelBooking(payload) {
      return api.cancelBooking(payload)
    },
  }
}

async function findBookableSlot(client, leadToken) {
  for (let offset = 0; offset < 4; offset += 1) {
    const month = monthKey(offset)
    const availability = await client.loadAvailability({
      month,
      leadToken,
    })
    const slot = availability.days.flatMap((day) => day.slots)[0]

    if (slot) {
      return {
        month,
        slot,
      }
    }
  }

  throw new Error('No smoke-test slots were available in the next four months.')
}

function isStaleSlotError(error) {
  return error?.code === 'STALE_SLOT' || error?.status === 409
}

async function bookFirstAvailableSlot(client, leadToken) {
  for (let offset = 0; offset < 4; offset += 1) {
    const month = monthKey(offset)
    const availability = await client.loadAvailability({
      month,
      leadToken,
    })
    const slots = availability.days.flatMap((day) => day.slots)

    for (const slot of slots) {
      try {
        const booking = await client.bookSlot({
          leadToken,
          slotStartIso: slot.startIso,
        })

        return {
          month,
          booking,
        }
      } catch (error) {
        if (isStaleSlotError(error)) {
          continue
        }

        throw error
      }
    }
  }

  throw new Error('No smoke-test slots could be booked in the next four months.')
}

function selectAlternateSlot(availability, currentSlotStartIso) {
  return availability.days
    .flatMap((day) => day.slots)
    .find((slot) => slot.startIso !== currentSlotStartIso)
}

async function runLocalReminderRegression(client, booking) {
  return runBookingReminder(
    {
      kind: 'booked',
      eventId: booking.googleEventId,
      slotStartIso: booking.booking.slotStartIso,
      slotEndIso: booking.booking.slotEndIso,
      meetingUrl: booking.meetingUrl,
      businessName: booking.booking.businessName,
      clientEmail: booking.booking.contactEmail,
      clientPhone: booking.contactSummary.phone,
      ownerEmail:
        client.runtime.env.bookingOwnerEmail ||
        client.runtime.env.googleOrganizerEmail,
      timezone: booking.booking.timezone,
      clientManageUrl: booking.clientManageUrl,
      ownerManageUrl: booking.ownerManageUrl,
    },
    {
      calendarGateway: client.runtime.calendarGateway,
      smtpGateway: {
        async sendMessage() {
          throw new Error('The stale reminder path should not send email.')
        },
      },
    }
  )
}

async function main() {
  const baseUrl = process.env.BOOKING_SMOKE_BASE_URL
  const healthSecret =
    process.env.BOOKING_SMOKE_HEALTH_SECRET || process.env.HEALTH_SECRET || ''
  const vercelDeployment = process.env.BOOKING_SMOKE_VERCEL_DEPLOYMENT || ''
  const vercelScope = process.env.BOOKING_SMOKE_VERCEL_SCOPE || ''
  const vercelToken = process.env.BOOKING_SMOKE_VERCEL_TOKEN || ''
  const vercelProtectionBypass =
    process.env.BOOKING_SMOKE_VERCEL_BYPASS_SECRET || ''
  const client = baseUrl
    ? createRemoteSmokeClient({
        baseUrl,
        healthSecret,
        vercelDeployment,
        vercelScope,
        vercelToken,
        vercelProtectionBypass,
      })
    : createLocalSmokeClient(createBookingRuntime())
  const health = await client.checkHealth()
  const lead = await client.submitLead(buildSmokeLead())
  const firstSlot = await bookFirstAvailableSlot(client, lead.leadToken)
  const { booking } = firstSlot
  const clientLink = parseManageUrl(booking.clientManageUrl)

  assert.ok(clientLink, 'Expected a client manage link in the booking response.')

  const clientContext = await client.getManageContext({
    ...clientLink,
    month: firstSlot.month,
  })
  const ownerLink =
    client.mode === 'local' ? parseManageUrl(booking.ownerManageUrl) : null
  const ownerContext =
    client.mode === 'local'
      ? await client.getManageContext({
          ...ownerLink,
          month: firstSlot.month,
        })
      : null
  const manageLink = ownerLink || clientLink
  const rescheduleAvailability = (ownerContext || clientContext).availability
  const alternateSlot = selectAlternateSlot(
    rescheduleAvailability,
    booking.booking.slotStartIso
  )

  assert.ok(alternateSlot, 'Expected a second slot for the reschedule step.')

  const reschedule = await client.rescheduleBooking({
    ...manageLink,
    slotStartIso: alternateSlot.startIso,
    reason: 'Smoke test reschedule.',
  })
  const refreshedManageLink = parseManageUrl(reschedule.actorManageUrl) || manageLink
  const staleReminderResult =
    client.mode === 'local'
      ? await runLocalReminderRegression(client, booking)
      : null
  const cancellation = await client.cancelBooking({
    ...refreshedManageLink,
    reason: 'Smoke test cancellation.',
  })
  const finalContext = await client.getManageContext({
    ...refreshedManageLink,
    month: getMonthKey(cancellation.booking.slotStartIso),
  })

  assert.equal(clientContext.actor, 'client')

  if (ownerContext) {
    assert.equal(ownerContext.actor, 'owner')
  }

  if (staleReminderResult) {
    assert.deepEqual(staleReminderResult, {
      skipped: true,
      reason: 'stale_slot',
    })
  }

  assert.equal(finalContext.eventStatus, 'cancelled')
  assert.equal(finalContext.permissions.canCancel, false)

  console.log(
    JSON.stringify(
      {
        mode: client.mode,
        healthStatus: health.publicHealth.status,
        diagnosticsStatus: health.diagnostics?.status || null,
        bookedEventId: booking.googleEventId,
        firstSlot: booking.booking.slotStartIso,
        rescheduledSlot: reschedule.booking.slotStartIso,
        cancellationStatus: cancellation.eventStatus,
        staleReminderResult,
      },
      null,
      2
    )
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
