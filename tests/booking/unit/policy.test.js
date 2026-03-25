import assert from 'node:assert/strict'
import test from 'node:test'
import { DateTime } from 'luxon'
import {
  buildAvailabilityResponse,
  buildBookingPolicy,
  buildMonthMeta,
  filterBusySlots,
  findBookableSlot,
} from '../../../src/server/booking/policy.js'
import { createFixedNow, createTestEnv } from '../helpers.js'

test('slot generation respects weekdays and minimum notice', () => {
  const policy = buildBookingPolicy(createTestEnv())
  const availability = buildAvailabilityResponse({
    monthKey: '2026-03',
    policy,
    now: createFixedNow(),
  })
  const firstDay = availability.days[0]

  assert.equal(firstDay.date, '2026-03-02')
  assert.equal(firstDay.slots[0].startIso, '2026-03-02T10:30:00-05:00')
  assert.ok(!availability.days.some((day) => day.date === '2026-03-07'))
  assert.ok(!availability.days.some((day) => day.date === '2026-03-08'))
})

test('busy range overlap filtering removes conflicting slots', () => {
  const filteredDays = filterBusySlots(
    [
      {
        date: '2026-03-02',
        weekdayLabel: 'Mon',
        fullLabel: 'Monday, Mar 2',
        slots: [
          {
            startIso: '2026-03-02T10:30:00-05:00',
            endIso: '2026-03-02T11:00:00-05:00',
            label: '10:30 AM',
          },
          {
            startIso: '2026-03-02T11:00:00-05:00',
            endIso: '2026-03-02T11:30:00-05:00',
            label: '11:00 AM',
          },
          {
            startIso: '2026-03-02T11:30:00-05:00',
            endIso: '2026-03-02T12:00:00-05:00',
            label: '11:30 AM',
          },
        ],
      },
    ],
    [
      {
        start: '2026-03-02T10:45:00-05:00',
        end: '2026-03-02T11:15:00-05:00',
      },
    ]
  )

  assert.deepEqual(
    filteredDays[0].slots.map((slot) => slot.startIso),
    ['2026-03-02T11:30:00-05:00']
  )
})

test('bookable slot lookup accepts equivalent UTC slot timestamps', () => {
  const policy = buildBookingPolicy(createTestEnv())
  const slot = findBookableSlot({
    slotStartIso: DateTime.fromISO('2026-03-03T10:30:00-05:00')
      .toUTC()
      .toISO({
        suppressMilliseconds: true,
      }),
    policy,
    now: createFixedNow(),
  })

  assert.equal(slot?.startIso, '2026-03-03T10:30:00-05:00')
})

test('month metadata uses the booking timezone for current month and bounds previous navigation', () => {
  const now = new Date('2026-03-02T06:00:00-05:00')

  assert.deepEqual(buildMonthMeta('2026-02', 'America/Toronto', now), {
    key: '2026-02',
    label: 'February 2026',
    previousKey: null,
    nextKey: '2026-03',
    currentMonthKey: '2026-03',
  })
  assert.deepEqual(buildMonthMeta('2026-03', 'America/Toronto', now), {
    key: '2026-03',
    label: 'March 2026',
    previousKey: null,
    nextKey: '2026-04',
    currentMonthKey: '2026-03',
  })
  assert.deepEqual(buildMonthMeta('2026-05', 'America/Toronto', now), {
    key: '2026-05',
    label: 'May 2026',
    previousKey: '2026-04',
    nextKey: '2026-06',
    currentMonthKey: '2026-03',
  })
})
