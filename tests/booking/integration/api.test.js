import assert from 'node:assert/strict'
import test from 'node:test'
import { DateTime } from 'luxon'
import { createBookingApi } from '../../../src/server/booking/api.js'
import { clearAvailabilityCache } from '../../../src/server/booking/availabilityCache.js'
import { clearManageContextCache } from '../../../src/server/booking/manageContextCache.js'
import { verifyLeadToken } from '../../../src/server/booking/leadToken.js'
import { resetMutationRateLimiter } from '../../../src/server/booking/rateLimit.js'
import { clearSlotLocks } from '../../../src/server/booking/slotLock.js'
import { runBookingReminder } from '../../../src/server/booking/notifications.js'
import { parseManageUrl } from '../../../shared/manageLink.js'
import {
  createFixedNow,
  createTestEnv,
  createValidLead,
} from '../helpers.js'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

let eventIdSequence = 1

function createTestEventId() {
  const eventId = `audittest${String(eventIdSequence).padStart(6, '0')}`
  eventIdSequence += 1
  return eventId
}

function createStoredEvent({
  slot,
  policy,
  lead = createValidLead(),
  manageTokens = {
    client: 'client-token',
    owner: 'owner-token',
  },
  manageTokenHashes = {
    client: 'client-token-hash',
    owner: 'owner-token-hash',
  },
  status = 'confirmed',
  id = createTestEventId(),
}) {
  return {
    id,
    status,
    summary: `Leviathan operational audit with ${lead.businessName}`,
    description: [
      `Business: ${lead.businessName}`,
      `Client email: ${lead.contactEmail}`,
      `Client phone: ${lead.phoneCountryCode} ${lead.phoneNumber}`,
      `Website: ${lead.website || 'Not provided'}`,
      `Industry: ${lead.industry}`,
      `Address line 1: ${lead.addressLine1}`,
      ...(lead.addressLine2 ? [`Address line 2: ${lead.addressLine2}`] : []),
      `City: ${lead.city}`,
      `Province/State: ${lead.provinceState}`,
      `Postal code: ${lead.postalCode}`,
      `Country: ${lead.countryCode}`,
      `Location: ${lead.addressLine1}, ${lead.city}, ${lead.provinceState} ${lead.postalCode}, ${lead.countryCode}`,
      `Audit goals: ${lead.auditGoals}`,
    ].join('\n'),
    start: {
      dateTime: slot.startIso,
      timeZone: policy.timezone,
    },
    end: {
      dateTime: slot.endIso,
      timeZone: policy.timezone,
    },
    attendees: [{ email: lead.contactEmail }],
    hangoutLink: 'https://meet.google.com/test-link',
    conferenceData: {
      entryPoints: [
        {
          entryPointType: 'video',
          uri: 'https://meet.google.com/test-link',
        },
      ],
    },
    extendedProperties: {
      private: {
        schemaVersion: 'phase3',
        bookingSource: 'leviathan-audit',
        clientName: lead.businessName,
        clientEmail: lead.contactEmail,
        clientPhone: `${lead.phoneCountryCode} ${lead.phoneNumber}`,
        clientToken: manageTokens.client,
        ownerToken: manageTokens.owner,
        clientTokenHash: manageTokenHashes.client,
        ownerTokenHash: manageTokenHashes.owner,
        clientWebsite: lead.website,
        clientIndustry: lead.industry,
        clientAddressLine1: lead.addressLine1,
        clientAddressLine2: lead.addressLine2,
        clientCity: lead.city,
        clientProvinceState: lead.provinceState,
        clientPostalCode: lead.postalCode,
        clientCountryCode: lead.countryCode,
        auditGoals: lead.auditGoals,
      },
    },
  }
}

function overlaps(slotStartIso, slotEndIso, event) {
  const eventStart = new Date(event.start.dateTime).getTime()
  const eventEnd = new Date(event.end.dateTime).getTime()
  const slotStart = new Date(slotStartIso).getTime()
  const slotEnd = new Date(slotEndIso).getTime()

  return event.status !== 'cancelled' && eventStart < slotEnd && eventEnd > slotStart
}

function createCalendarHarness({
  initialEvents = [],
  queryBusyRanges,
  isSlotFree,
  listEventsOverlappingSlot,
  createEvent,
  getEvent,
  patchEvent,
  cancelEvent,
} = {}) {
  const store = new Map(
    initialEvents.map((event) => [event.id, clone(event)])
  )

  const gateway = {
    async queryBusyRanges({ timeMin, timeMax }) {
      if (queryBusyRanges) {
        return queryBusyRanges({ timeMin, timeMax, store })
      }

      return [...store.values()]
        .filter((event) => overlaps(timeMin, timeMax, event))
        .map((event) => ({
          start: event.start.dateTime,
          end: event.end.dateTime,
        }))
    },
    async isSlotFree({ slotStartIso, slotEndIso }) {
      if (isSlotFree) {
        return isSlotFree({ slotStartIso, slotEndIso, store })
      }

      return ![...store.values()].some((event) =>
        overlaps(slotStartIso, slotEndIso, event)
      )
    },
    async listEventsOverlappingSlot({ slotStartIso, slotEndIso, excludeEventId }) {
      if (listEventsOverlappingSlot) {
        return listEventsOverlappingSlot({
          slotStartIso,
          slotEndIso,
          excludeEventId,
          store,
        })
      }

      return [...store.values()]
        .filter((event) => event.id !== excludeEventId)
        .filter((event) => overlaps(slotStartIso, slotEndIso, event))
        .map(clone)
    },
    async createEvent({
      eventId,
      lead,
      slot,
      policy,
      manageTokens,
      manageTokenHashes,
    }) {
      if (createEvent) {
        return createEvent({
          eventId,
          lead,
          slot,
          policy,
          manageTokens,
          manageTokenHashes,
          store,
        })
      }

      const event = createStoredEvent({
        id: eventId,
        lead,
        slot,
        policy,
        manageTokens,
        manageTokenHashes,
      })

      store.set(event.id, clone(event))
      return clone(event)
    },
    async getEvent(eventId, options = {}) {
      if (getEvent) {
        return getEvent(eventId, options, store)
      }

      const event = store.get(eventId)

      if (!event && options.allowMissing) {
        return null
      }

      return event ? clone(event) : null
    },
    async patchEvent({ eventId, existingEvent, updates }) {
      if (patchEvent) {
        return patchEvent({ eventId, existingEvent, updates, store })
      }

      const currentEvent = store.get(eventId) || clone(existingEvent)
      const nextEvent = {
        ...currentEvent,
        ...updates,
        start: updates.start || currentEvent.start,
        end: updates.end || currentEvent.end,
        description: updates.description ?? currentEvent.description,
        extendedProperties: {
          private: {
            ...(currentEvent.extendedProperties?.private || {}),
            ...(updates.extendedProperties?.private || {}),
          },
        },
      }

      store.set(eventId, clone(nextEvent))
      return clone(nextEvent)
    },
    async cancelEvent({ eventId, existingEvent, description, privateMetadata }) {
      if (cancelEvent) {
        return cancelEvent({
          eventId,
          existingEvent,
          description,
          privateMetadata,
          store,
        })
      }

      const currentEvent = store.get(eventId) || clone(existingEvent)
      const nextEvent = {
        ...currentEvent,
        status: 'cancelled',
        description: description ?? currentEvent.description,
        extendedProperties: {
          private: {
            ...(currentEvent.extendedProperties?.private || {}),
            ...(privateMetadata || {}),
          },
        },
      }

      store.set(eventId, clone(nextEvent))
      return clone(nextEvent)
    },
  }

  return {
    store,
    gateway,
  }
}

function createApiHarness({
  envOverrides = {},
  now = createFixedNow,
  calendarConfig = {},
  triggerOverrides = {},
  smtpOverrides = {},
  logger = { error() {} },
} = {}) {
  const env = createTestEnv(envOverrides)
  const calendarHarness = createCalendarHarness({
    env,
    ...calendarConfig,
  })
  const queuedPayloads = []
  const sentMessages = []
  const smtpGateway = {
    async sendMessage(message) {
      sentMessages.push(message)
      return { id: `smtp_${sentMessages.length}` }
    },
    ...smtpOverrides,
  }
  const triggerClient = {
    async enqueueBookingLifecycleNotification(payload) {
      queuedPayloads.push(payload)
      return { id: 'run_123' }
    },
    ...triggerOverrides,
  }

  return {
    env,
    store: calendarHarness.store,
    queuedPayloads,
    sentMessages,
    api: createBookingApi({
      env,
      calendarGateway: calendarHarness.gateway,
      smtpGateway,
      triggerClient,
      verifyGoogleAccess: async () => true,
      verifySmtpAccess: async () => true,
      now,
      logger,
    }),
  }
}

test.beforeEach(() => {
  eventIdSequence = 1
  clearAvailabilityCache()
  clearManageContextCache()
  clearSlotLocks()
  resetMutationRateLimiter()
})

test('valid lead submit returns a signed token and booking policy', async () => {
  const { api, env } = createApiHarness()
  const response = await api.submitLead(createValidLead())
  const verified = verifyLeadToken(response.leadToken, {
    secret: env.auditLeadTokenSecret,
    now: createFixedNow(),
  })

  assert.equal(response.contactSummary.businessName, 'Northwind Plumbing')
  assert.equal(response.bookingPolicy.timezone, 'America/Toronto')
  assert.equal(verified.lead.contactEmail, 'ops@northwind.example')
})

test('availability response returns month data with busy slots filtered out', async () => {
  const { api } = createApiHarness({
    calendarConfig: {
      queryBusyRanges: async () => [
        {
          start: '2026-03-02T10:30:00-05:00',
          end: '2026-03-02T11:00:00-05:00',
        },
      ],
    },
  })
  const lead = await api.submitLead(createValidLead())
  const availability = await api.loadAvailability({
    month: '2026-03',
    leadToken: lead.leadToken,
  })
  const firstDay = availability.days.find((day) => day.date === '2026-03-02')

  assert.equal(availability.monthMeta.key, '2026-03')
  assert.equal(availability.monthMeta.currentMonthKey, '2026-03')
  assert.equal(availability.monthMeta.previousKey, null)
  assert.ok(firstDay)
  assert.ok(
    !firstDay.slots.some(
      (slot) => slot.startIso === '2026-03-02T10:30:00-05:00'
    )
  )
})

test('availability month navigation is bounded by the current booking month', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const currentMonth = await api.loadAvailability({
    month: '2026-03',
    leadToken: lead.leadToken,
  })
  const futureMonth = await api.loadAvailability({
    month: '2026-05',
    leadToken: lead.leadToken,
  })

  assert.equal(currentMonth.monthMeta.previousKey, null)
  assert.equal(currentMonth.monthMeta.currentMonthKey, '2026-03')
  assert.equal(futureMonth.monthMeta.previousKey, '2026-04')
  assert.equal(futureMonth.monthMeta.nextKey, '2026-06')
})

test('booking success returns queued lifecycle delivery and manage links', async () => {
  const { api, queuedPayloads } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const availability = await api.loadAvailability({
    month: '2026-03',
    leadToken: lead.leadToken,
  })
  const response = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: availability.days[0].slots[0].startIso,
  })

  assert.equal(response.meetingUrl, 'https://meet.google.com/test-link')
  assert.equal(response.notificationDelivery, 'queued')
  assert.ok(response.clientManageUrl.includes('/manage-booking#'))
  assert.ok(response.ownerManageUrl.includes('/manage-booking#'))
  assert.equal(queuedPayloads.length, 1)
  assert.equal(queuedPayloads[0].kind, 'booked')
  assert.equal(queuedPayloads[0].clientEmail, 'ops@northwind.example')
})

test('booking accepts an equivalent UTC slot timestamp', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const availability = await api.loadAvailability({
    month: '2026-03',
    leadToken: lead.leadToken,
  })
  const slotStartIso = DateTime.fromISO(availability.days[0].slots[0].startIso)
    .toUTC()
    .toISO({
      suppressMilliseconds: true,
    })
  const response = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso,
  })

  assert.equal(response.booking.slotStartIso, '2026-03-02T10:30:00-05:00')
})

test('booking success falls back to SMTP when Trigger enqueue fails', async () => {
  const loggedErrors = []
  const { api, sentMessages } = createApiHarness({
    triggerOverrides: {
      async enqueueBookingLifecycleNotification() {
        throw new Error('queue offline')
      },
    },
    logger: {
      error(...args) {
        loggedErrors.push(args)
      },
    },
  })
  const lead = await api.submitLead(createValidLead())
  const availability = await api.loadAvailability({
    month: '2026-03',
    leadToken: lead.leadToken,
  })
  const response = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: availability.days[0].slots[0].startIso,
  })

  assert.equal(response.notificationDelivery, 'smtp_fallback')
  assert.equal(sentMessages.length, 2)
  assert.equal(loggedErrors.length, 1)
})

test('same-slot concurrent booking returns one success and one stale-slot error', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const availability = await api.loadAvailability({
    month: '2026-03',
    leadToken: lead.leadToken,
  })
  const slotStartIso = availability.days[0].slots[0].startIso
  const results = await Promise.allSettled([
    api.bookSlot({
      leadToken: lead.leadToken,
      slotStartIso,
    }),
    api.bookSlot({
      leadToken: lead.leadToken,
      slotStartIso,
    }),
  ])

  assert.equal(
    results.filter((result) => result.status === 'fulfilled').length,
    1
  )
  assert.equal(
    results.filter(
      (result) =>
        result.status === 'rejected' && result.reason?.code === 'STALE_SLOT'
    ).length,
    1
  )
})

test('post-insert overlap verification reverts the new booking and returns 409', async () => {
  let overlapInjected = false
  const { api, store } = createApiHarness({
    calendarConfig: {
      listEventsOverlappingSlot: async ({ slotStartIso, slotEndIso, excludeEventId, store: eventStore }) => {
        const confirmedEvents = [...eventStore.values()].filter(
          (event) => event.id !== excludeEventId && overlaps(slotStartIso, slotEndIso, event)
        )

        if (confirmedEvents.length > 0) {
          return confirmedEvents.map(clone)
        }

        if (!overlapInjected) {
          overlapInjected = true
          return [
            {
              id: 'external-conflict',
              status: 'confirmed',
              start: { dateTime: slotStartIso },
              end: { dateTime: slotEndIso },
            },
          ]
        }

        return []
      },
    },
  })
  const lead = await api.submitLead(createValidLead())
  const availability = await api.loadAvailability({
    month: '2026-03',
    leadToken: lead.leadToken,
  })
  const slotStartIso = availability.days[0].slots[0].startIso

  await assert.rejects(
    () =>
      api.bookSlot({
        leadToken: lead.leadToken,
        slotStartIso,
      }),
    (error) => error?.status === 409 && error?.code === 'STALE_SLOT'
  )

  const revertedEvent = [...store.values()].find(
    (event) => event.start?.dateTime === slotStartIso
  )

  assert.equal(revertedEvent?.status, 'cancelled')
})

test('a cancelled slot can be booked again with a new event id', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const firstBooking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })

  await api.cancelBooking({
    ...parseManageUrl(firstBooking.ownerManageUrl),
    reason: 'Free the time for another booking.',
  })

  const secondLead = await api.submitLead(
    createValidLead({
      businessName: 'Contoso HVAC',
      contactEmail: 'ops@contoso.example',
      phoneNumber: '(416) 555-4567',
    })
  )
  const secondBooking = await api.bookSlot({
    leadToken: secondLead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })

  assert.notEqual(secondBooking.googleEventId, firstBooking.googleEventId)
  assert.equal(secondBooking.booking.slotStartIso, '2026-03-03T10:30:00-05:00')
})

test('manage context accepts a valid actor token and rejects an invalid token', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const availability = await api.loadAvailability({
    month: '2026-03',
    leadToken: lead.leadToken,
  })
  const booking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: availability.days[0].slots[0].startIso,
  })
  const clientLink = parseManageUrl(booking.clientManageUrl)

  const context = await api.getManageContext(clientLink)

  assert.equal(context.actor, 'client')
  assert.equal(context.eventStatus, 'confirmed')
  assert.equal(context.booking.eventId, booking.googleEventId)

  await assert.rejects(
    () =>
      api.getManageContext({
        ...clientLink,
        token: 'not-the-real-token',
      }),
    (error) =>
      error?.status === 403 && error?.code === 'INVALID_MANAGE_TOKEN'
  )
})

test('client is blocked inside the self-service cutoff', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const response = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-02T16:00:00-05:00',
  })
  const clientLink = parseManageUrl(response.clientManageUrl)
  const context = await api.getManageContext(clientLink)

  assert.equal(context.permissions.canCancel, false)
  assert.match(context.lockedReason, /self-service closes/i)
})

test('owner is allowed inside the cutoff but blocked after the event start', async () => {
  const bookingHarness = createApiHarness()
  const lead = await bookingHarness.api.submitLead(createValidLead())
  const response = await bookingHarness.api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-02T16:00:00-05:00',
  })
  const ownerLink = parseManageUrl(response.ownerManageUrl)
  const ownerContext = await bookingHarness.api.getManageContext(ownerLink)

  assert.equal(ownerContext.permissions.canCancel, true)
  clearManageContextCache()

  const lateHarness = createApiHarness({
    calendarConfig: {
      initialEvents: [...bookingHarness.store.values()].map(clone),
    },
    now: () => new Date('2026-03-02T17:01:00-05:00'),
  })
  const lockedContext = await lateHarness.api.getManageContext(ownerLink)

  assert.equal(lockedContext.permissions.canCancel, false)
  assert.match(lockedContext.lockedReason, /locked after the scheduled start time/i)
})

test('rescheduling to an occupied slot returns 409', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const firstBooking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })
  await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T11:00:00-05:00',
  })

  await assert.rejects(
    () =>
      api.rescheduleBooking({
        ...parseManageUrl(firstBooking.ownerManageUrl),
        slotStartIso: '2026-03-03T11:00:00-05:00',
        reason: 'Move to the next slot.',
      }),
    (error) => error?.status === 409 && error?.code === 'STALE_SLOT'
  )
})

test('rescheduling to the current slot returns 422', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const booking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })
  const ownerLink = parseManageUrl(booking.ownerManageUrl)

  await assert.rejects(
    () =>
      api.rescheduleBooking({
        ...ownerLink,
        slotStartIso: '2026-03-03T10:30:00-05:00',
        reason: 'Keep the same time.',
      }),
    (error) => error?.status === 422 && error?.code === 'CURRENT_SLOT'
  )
})

test('rescheduling rejects the current slot even when the timestamp is UTC-normalized', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const booking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })

  await assert.rejects(
    () =>
      api.rescheduleBooking({
        ...parseManageUrl(booking.ownerManageUrl),
        slotStartIso: DateTime.fromISO('2026-03-03T10:30:00-05:00')
          .toUTC()
          .toISO({
            suppressMilliseconds: true,
          }),
        reason: 'Keep the same time.',
      }),
    (error) => error?.status === 422 && error?.code === 'CURRENT_SLOT'
  )
})

test('rescheduling accepts an equivalent UTC slot timestamp', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const booking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })
  const response = await api.rescheduleBooking({
    ...parseManageUrl(booking.ownerManageUrl),
    slotStartIso: DateTime.fromISO('2026-03-03T11:00:00-05:00')
      .toUTC()
      .toISO({
        suppressMilliseconds: true,
      }),
    reason: 'Move later in the day.',
  })

  assert.equal(response.booking.slotStartIso, '2026-03-03T11:00:00-05:00')
})

test('the original slot can be booked again after a reschedule away from it', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const booking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })

  await api.rescheduleBooking({
    ...parseManageUrl(booking.ownerManageUrl),
    slotStartIso: '2026-03-03T11:00:00-05:00',
    reason: 'Move later in the day.',
  })

  const secondLead = await api.submitLead(
    createValidLead({
      businessName: 'Wingtip Dispatch',
      contactEmail: 'ops@wingtip.example',
      phoneNumber: '(416) 555-6789',
    })
  )
  const rebooked = await api.bookSlot({
    leadToken: secondLead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })

  assert.equal(rebooked.booking.slotStartIso, '2026-03-03T10:30:00-05:00')
})

test('lifecycle notification payloads keep the full intake answers across booking changes', async () => {
  const { api, queuedPayloads } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const booking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })
  const ownerLink = parseManageUrl(booking.ownerManageUrl)

  await api.rescheduleBooking({
    ...ownerLink,
    slotStartIso: '2026-03-03T11:00:00-05:00',
    reason: 'Move later in the day.',
  })
  await api.cancelBooking({
    ...ownerLink,
    reason: 'Client withdrew the request.',
  })

  const lifecycleKinds = queuedPayloads.map((payload) => payload.kind)

  assert.deepEqual(lifecycleKinds, ['booked', 'rescheduled', 'cancelled'])

  for (const payload of queuedPayloads) {
    assert.equal(payload.businessName, 'Northwind Plumbing')
    assert.equal(payload.clientEmail, 'ops@northwind.example')
    assert.equal(payload.clientPhone, '+1 (416) 555-1234')
    assert.equal(payload.website, 'https://northwindplumbing.com')
    assert.equal(payload.industry, 'Home Services')
    assert.equal(payload.addressLine1, '123 Front Street')
    assert.equal(payload.addressLine2, '')
    assert.equal(payload.city, 'Toronto')
    assert.equal(payload.provinceState, 'ON')
    assert.equal(payload.postalCode, 'M5V 2T6')
    assert.equal(payload.countryCode, 'CA')
    assert.equal(
      payload.formattedAddress,
      '123 Front Street, Toronto, ON M5V 2T6, CA'
    )
    assert.equal(
      payload.auditGoals,
      'Map scheduling bottlenecks and missed follow-up.'
    )
  }
})

test("rescheduling preserves both actors' original manage links", async () => {
  const { api, queuedPayloads, store } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const booking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })
  const clientLink = booking.clientManageUrl
  const ownerLink = booking.ownerManageUrl
  const originalEvent = clone(store.get(booking.googleEventId))

  const response = await api.rescheduleBooking({
    ...parseManageUrl(ownerLink),
    slotStartIso: '2026-03-03T11:00:00-05:00',
    reason: 'Move later in the day.',
  })
  const updatedEvent = store.get(booking.googleEventId)
  const notificationPayload = queuedPayloads.at(-1)

  assert.equal(response.actorManageUrl, ownerLink)
  assert.equal(notificationPayload.clientManageUrl, clientLink)
  assert.equal(notificationPayload.ownerManageUrl, ownerLink)
  assert.equal(
    updatedEvent.extendedProperties.private.clientTokenHash,
    originalEvent.extendedProperties.private.clientTokenHash
  )
  assert.equal(
    updatedEvent.extendedProperties.private.ownerTokenHash,
    originalEvent.extendedProperties.private.ownerTokenHash
  )
  assert.equal(
    updatedEvent.extendedProperties.private.clientToken,
    originalEvent.extendedProperties.private.clientToken
  )
  assert.equal(
    updatedEvent.extendedProperties.private.ownerToken,
    originalEvent.extendedProperties.private.ownerToken
  )
})

test("cancelling preserves both actors' original manage links", async () => {
  const { api, queuedPayloads, store } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const booking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })
  const clientLink = booking.clientManageUrl
  const ownerLink = booking.ownerManageUrl
  const originalEvent = clone(store.get(booking.googleEventId))

  const response = await api.cancelBooking({
    ...parseManageUrl(ownerLink),
    reason: 'Client withdrew the request.',
  })
  const updatedEvent = store.get(booking.googleEventId)
  const notificationPayload = queuedPayloads.at(-1)

  assert.equal(response.actorManageUrl, ownerLink)
  assert.equal(notificationPayload.clientManageUrl, clientLink)
  assert.equal(notificationPayload.ownerManageUrl, ownerLink)
  assert.equal(
    updatedEvent.extendedProperties.private.clientTokenHash,
    originalEvent.extendedProperties.private.clientTokenHash
  )
  assert.equal(
    updatedEvent.extendedProperties.private.ownerTokenHash,
    originalEvent.extendedProperties.private.ownerTokenHash
  )
  assert.equal(
    updatedEvent.extendedProperties.private.clientToken,
    originalEvent.extendedProperties.private.clientToken
  )
  assert.equal(
    updatedEvent.extendedProperties.private.ownerToken,
    originalEvent.extendedProperties.private.ownerToken
  )
})

test('cancel on an already cancelled booking returns a locked-state error', async () => {
  const { api } = createApiHarness()
  const lead = await api.submitLead(createValidLead())
  const booking = await api.bookSlot({
    leadToken: lead.leadToken,
    slotStartIso: '2026-03-03T10:30:00-05:00',
  })
  const ownerLink = parseManageUrl(booking.ownerManageUrl)

  await api.cancelBooking({
    ...ownerLink,
    reason: 'Client withdrew the request.',
  })

  await assert.rejects(
    () =>
      api.cancelBooking({
        ...parseManageUrl(booking.ownerManageUrl),
        reason: 'Repeat cancellation attempt.',
      }),
    (error) => error?.status === 403 || error?.status === 409
  )
})

test('reminder task skips sends when the calendar event is cancelled', async () => {
  const sentMessages = []
  const result = await runBookingReminder(
    {
      eventId: 'audit20260302t153000utc',
      slotStartIso: '2026-03-02T10:30:00-05:00',
      slotEndIso: '2026-03-02T11:00:00-05:00',
      meetingUrl: 'https://meet.google.com/test-link',
      businessName: 'Northwind Plumbing',
      clientEmail: 'ops@northwind.example',
      clientPhone: '+1 (416) 555-1234',
      ownerEmail: 'owner@leviathan.example',
      timezone: 'America/Toronto',
      clientManageUrl:
        'https://leviathan.example/manage-booking#eventId=audit20260302t153000utc&actor=client&token=client-token',
      ownerManageUrl:
        'https://leviathan.example/manage-booking#eventId=audit20260302t153000utc&actor=owner&token=owner-token',
    },
    {
      calendarGateway: {
        getEvent: async () => ({
          id: 'audit20260302t153000utc',
          status: 'cancelled',
        }),
      },
      smtpGateway: {
        async sendMessage(message) {
          sentMessages.push(message)
        },
      },
    }
  )

  assert.deepEqual(result, {
    skipped: true,
    reason: 'cancelled',
  })
  assert.equal(sentMessages.length, 0)
})
