import { DateTime } from 'luxon'
import { BookingError } from './errors.js'

function toIso(value) {
  return value.toISO({ suppressMilliseconds: true })
}

function toJsWeekday(dateTime) {
  return dateTime.weekday % 7
}

export function buildBookingPolicy(env) {
  return {
    timezone: env.bookingTimezone,
    workingDays: [...env.bookingWorkingDays],
    startHour: Math.floor(env.bookingDayStartMinutes / 60),
    endHour: Math.floor(env.bookingDayEndMinutes / 60),
    slotDurationMinutes: env.bookingSlotDurationMinutes,
    slotIntervalMinutes: env.bookingSlotIntervalMinutes,
    minNoticeHours: env.bookingMinNoticeMinutes / 60,
    dayStartMinutes: env.bookingDayStartMinutes,
    dayEndMinutes: env.bookingDayEndMinutes,
    minNoticeMinutes: env.bookingMinNoticeMinutes,
  }
}

export function toPublicBookingPolicy(policy) {
  return {
    timezone: policy.timezone,
    workingDays: [...policy.workingDays],
    startHour: policy.startHour,
    endHour: policy.endHour,
    dayStartMinutes: policy.dayStartMinutes,
    dayEndMinutes: policy.dayEndMinutes,
    slotDurationMinutes: policy.slotDurationMinutes,
    slotIntervalMinutes: policy.slotIntervalMinutes,
    minNoticeHours: policy.minNoticeHours,
  }
}

export function buildContactSummary(lead) {
  const formattedAddress =
    buildFormattedAddress(lead) || buildLocationSummary(lead)

  return {
    businessName: lead.businessName,
    contactEmail: lead.contactEmail,
    phone: `${lead.phoneCountryCode} ${lead.phoneNumber}`,
    addressLine1: lead.addressLine1,
    addressLine2: lead.addressLine2,
    city: lead.city,
    provinceState: lead.provinceState,
    postalCode: lead.postalCode,
    countryCode: lead.countryCode,
    location: buildLocationSummary(lead),
    formattedAddress,
    website: lead.website,
    industry: resolveLeadIndustry(lead),
    auditGoals: lead.auditGoals,
  }
}

function compactValues(values = []) {
  return values.map((value) => String(value || '').trim()).filter(Boolean)
}

export function resolveLeadIndustry(lead) {
  return lead?.industry === 'Other' ? lead?.industryOther || '' : lead?.industry || ''
}

export function buildLocationSummary({
  city,
  provinceState,
  countryCode,
}) {
  return compactValues([city, provinceState, countryCode]).join(', ')
}

export function buildFormattedAddress({
  addressLine1,
  addressLine2,
  city,
  provinceState,
  postalCode,
  countryCode,
}) {
  const cityRegionPostal = compactValues([
    city,
    [provinceState, postalCode].map((value) => String(value || '').trim()).filter(Boolean).join(' '),
  ]).join(', ')

  return compactValues([
    addressLine1,
    addressLine2,
    cityRegionPostal,
    countryCode,
  ]).join(', ')
}

export function parseMonthKey(monthKey, timeZone) {
  const parsed = DateTime.fromFormat(`${monthKey}-01`, 'yyyy-MM-dd', {
    zone: timeZone,
  }).startOf('month')

  if (!parsed.isValid || parsed.toFormat('yyyy-MM') !== monthKey) {
    throw new BookingError('Use month=YYYY-MM when loading availability.', {
      status: 422,
      code: 'INVALID_MONTH',
    })
  }

  return parsed
}

function parseSlotStartIso(slotStartIso, timeZone) {
  const value = String(slotStartIso || '').trim()

  if (!value) {
    return null
  }

  const withExplicitZone = DateTime.fromISO(value, {
    setZone: true,
  })

  if (withExplicitZone.isValid) {
    return withExplicitZone.setZone(timeZone)
  }

  const inPolicyZone = DateTime.fromISO(value, {
    zone: timeZone,
  })

  return inPolicyZone.isValid ? inPolicyZone : null
}

export function normalizeSlotStartIso(slotStartIso, timeZone) {
  const parsed = parseSlotStartIso(slotStartIso, timeZone)

  return parsed
    ? parsed.toISO({
        suppressMilliseconds: true,
      })
    : ''
}

export function slotStartsMatch(slotStartIso, otherSlotStartIso, timeZone) {
  const normalizedSlotStartIso = normalizeSlotStartIso(slotStartIso, timeZone)
  const normalizedOtherSlotStartIso = normalizeSlotStartIso(
    otherSlotStartIso,
    timeZone
  )

  return Boolean(
    normalizedSlotStartIso &&
      normalizedOtherSlotStartIso &&
      normalizedSlotStartIso === normalizedOtherSlotStartIso
  )
}

export function buildMonthMeta(monthKey, timeZone, now = new Date()) {
  const monthStart = parseMonthKey(monthKey, timeZone)
  const currentMonthKey = DateTime.fromJSDate(now, {
    zone: timeZone,
  })
    .startOf('month')
    .toFormat('yyyy-MM')
  const currentMonthStart = parseMonthKey(currentMonthKey, timeZone)

  return {
    key: monthKey,
    label: monthStart.toFormat('LLLL yyyy'),
    previousKey:
      monthStart.toMillis() <= currentMonthStart.toMillis()
        ? null
        : monthStart.minus({ months: 1 }).toFormat('yyyy-MM'),
    nextKey: monthStart.plus({ months: 1 }).toFormat('yyyy-MM'),
    currentMonthKey,
  }
}

export function generateMonthSlots({ monthKey, policy, now = new Date() }) {
  const monthStart = parseMonthKey(monthKey, policy.timezone)
  const bookingCutoff = DateTime.fromJSDate(now, {
    zone: policy.timezone,
  }).plus({ minutes: policy.minNoticeMinutes })
  const days = []

  for (
    let currentDay = monthStart;
    currentDay.month === monthStart.month;
    currentDay = currentDay.plus({ days: 1 })
  ) {
    if (!policy.workingDays.includes(toJsWeekday(currentDay))) {
      continue
    }

    const dayStart = currentDay.startOf('day')
    const slots = []

    for (
      let minute = policy.dayStartMinutes;
      minute <= policy.dayEndMinutes - policy.slotDurationMinutes;
      minute += policy.slotIntervalMinutes
    ) {
      const slotStart = dayStart.plus({ minutes: minute })

      if (slotStart <= bookingCutoff) {
        continue
      }

      const slotEnd = slotStart.plus({ minutes: policy.slotDurationMinutes })

      slots.push({
        startIso: toIso(slotStart),
        endIso: toIso(slotEnd),
        label: slotStart.toFormat('h:mm a'),
      })
    }

    if (slots.length === 0) {
      continue
    }

    days.push({
      date: currentDay.toFormat('yyyy-MM-dd'),
      weekdayLabel: currentDay.toFormat('ccc'),
      fullLabel: currentDay.toFormat('cccc, LLL d'),
      slots,
    })
  }

  return days
}

export function normalizeBusyRanges(busyRanges = []) {
  return busyRanges
    .map((range) => ({
      startMs: new Date(range.start || range.startIso).getTime(),
      endMs: new Date(range.end || range.endIso).getTime(),
      startIso: range.start || range.startIso,
      endIso: range.end || range.endIso,
    }))
    .filter((range) => Number.isFinite(range.startMs) && Number.isFinite(range.endMs))
}

export function slotOverlapsBusyRange(slot, busyRange) {
  const slotStartMs = new Date(slot.startIso).getTime()
  const slotEndMs = new Date(slot.endIso).getTime()

  return slotStartMs < busyRange.endMs && slotEndMs > busyRange.startMs
}

export function filterBusySlots(days, busyRanges = []) {
  const normalizedRanges = normalizeBusyRanges(busyRanges)

  return days
    .map((day) => ({
      ...day,
      slots: day.slots.filter(
        (slot) =>
          !normalizedRanges.some((busyRange) =>
            slotOverlapsBusyRange(slot, busyRange)
          )
      ),
    }))
    .filter((day) => day.slots.length > 0)
}

export function buildAvailabilityResponse({
  monthKey,
  policy,
  busyRanges = [],
  now = new Date(),
}) {
  return {
    monthMeta: buildMonthMeta(monthKey, policy.timezone, now),
    timezone: policy.timezone,
    bookingPolicy: toPublicBookingPolicy(policy),
    days: filterBusySlots(
      generateMonthSlots({ monthKey, policy, now }),
      busyRanges
    ),
  }
}

export function excludeBusyRangeForSlot(busyRanges, slot) {
  const slotStartMs = new Date(slot.startIso).getTime()
  const slotEndMs = new Date(slot.endIso).getTime()

  return normalizeBusyRanges(busyRanges).filter((range) => {
    return !(range.startMs === slotStartMs && range.endMs === slotEndMs)
  })
}

export function removeSlotFromAvailability(availability, slotStartIso) {
  return {
    ...availability,
    days: availability.days
      .map((day) => ({
        ...day,
        slots: day.slots.filter((slot) => slot.startIso !== slotStartIso),
      }))
      .filter((day) => day.slots.length > 0),
  }
}

export function findBookableSlot({
  monthKey,
  slotStartIso,
  policy,
  now = new Date(),
}) {
  const normalizedSlotStartIso = normalizeSlotStartIso(
    slotStartIso,
    policy.timezone
  )

  if (!normalizedSlotStartIso) {
    return null
  }

  const resolvedMonthKey =
    monthKey || normalizedSlotStartIso.slice(0, 7)

  return generateMonthSlots({ monthKey: resolvedMonthKey, policy, now })
    .flatMap((day) => day.slots)
    .find((slot) => slot.startIso === normalizedSlotStartIso)
}

export function formatBookingSlot({
  slotStartIso,
  slotEndIso,
  timeZone,
}) {
  const start = DateTime.fromISO(slotStartIso).setZone(timeZone)
  const end = DateTime.fromISO(slotEndIso).setZone(timeZone)

  return {
    formattedDate: start.toFormat('cccc, LLLL d'),
    formattedTime: start.toFormat('h:mm a'),
    formattedWindow: `${start.toFormat('h:mm a')} to ${end.toFormat('h:mm a')}`,
  }
}
