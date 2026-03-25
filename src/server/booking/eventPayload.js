import { randomBytes, randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
import {
  buildFormattedAddress,
  buildLocationSummary,
  formatBookingSlot,
  resolveLeadIndustry,
} from './policy.js'
import { buildManageUrl as buildFragmentManageUrl } from '../../../shared/manageLink.js'

const BOOKING_SOURCE = 'leviathan-audit'
const SCHEMA_VERSION = 'phase3'
const AUDIT_TRAIL_HEADER = 'Audit trail'

function truncateMetadataValue(value, limit = 1024) {
  return String(value || '').slice(0, limit)
}

function normalizeIso(value) {
  return DateTime.fromISO(String(value || '')).toISO({
    suppressMilliseconds: true,
  })
}

function parseBusinessName(summary = '') {
  const prefix = 'Leviathan operational audit with '
  return summary.startsWith(prefix) ? summary.slice(prefix.length) : summary
}

function cleanOptionalValue(value, emptyValues = []) {
  const normalized = String(value || '').trim()

  if (!normalized) {
    return ''
  }

  return emptyValues.some(
    (emptyValue) => normalized.toLowerCase() === emptyValue.toLowerCase()
  )
    ? ''
    : normalized
}

function parseDescriptionFields(description = '') {
  const fields = {}
  const labels = {
    'Business': 'businessName',
    'Client email': 'clientEmail',
    'Client phone': 'clientPhone',
    'Website': 'website',
    'Industry': 'industry',
    'Address line 1': 'addressLine1',
    'Address line 2': 'addressLine2',
    'City': 'city',
    'Province/State': 'provinceState',
    'Postal code': 'postalCode',
    'Country': 'countryCode',
    'Location': 'location',
    'Audit goals': 'auditGoals',
  }

  for (const line of String(description || '').split(/\r?\n/)) {
    for (const [label, fieldName] of Object.entries(labels)) {
      const prefix = `${label}: `

      if (line.startsWith(prefix)) {
        fields[fieldName] = line.slice(prefix.length).trim()
        break
      }
    }
  }

  return fields
}

function parseLegacyLocation(location = '') {
  const parts = String(location || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  if (parts.length === 0) {
    return {}
  }

  if (parts.length === 1) {
    return {
      city: parts[0],
    }
  }

  if (parts.length === 2) {
    return {
      city: parts[0],
      provinceState: parts[1],
    }
  }

  return {
    city: parts.slice(0, -2).join(', '),
    provinceState: parts.at(-2),
    countryCode: parts.at(-1),
  }
}

function buildLocationFields(source) {
  const formattedAddress =
    buildFormattedAddress(source) || cleanOptionalValue(source.location)
  const location =
    buildLocationSummary(source) ||
    cleanOptionalValue(source.location) ||
    formattedAddress

  return {
    formattedAddress,
    location,
  }
}

export function createBookingEventId() {
  return `audit${randomBytes(16).toString('hex')}`
}

function buildEventDescription({ lead, slot, policy }) {
  const slotDisplay = formatBookingSlot({
    slotStartIso: slot.startIso,
    slotEndIso: slot.endIso,
    timeZone: policy.timezone,
  })
  const industry = resolveLeadIndustry(lead)
  const formattedAddress = buildFormattedAddress(lead)

  return [
    `Business: ${lead.businessName}`,
    `Client email: ${lead.contactEmail}`,
    `Client phone: ${lead.phoneCountryCode} ${lead.phoneNumber}`,
    `Website: ${lead.website || 'Not provided'}`,
    `Industry: ${industry || 'Not specified'}`,
    `Address line 1: ${lead.addressLine1}`,
    ...(lead.addressLine2 ? [`Address line 2: ${lead.addressLine2}`] : []),
    `City: ${lead.city}`,
    `Province/State: ${lead.provinceState}`,
    `Postal code: ${lead.postalCode}`,
    `Country: ${lead.countryCode}`,
    ...(formattedAddress ? [`Location: ${formattedAddress}`] : []),
    `Audit goals: ${lead.auditGoals}`,
    `Window: ${slotDisplay.formattedDate} at ${slotDisplay.formattedWindow} ${policy.timezone}`,
  ].join('\n')
}

function buildAuditTrailLine({ timestampIso, actor, action, reason }) {
  return `- ${timestampIso} | actor=${actor} | action=${action} | reason=${reason}`
}

export function buildBookingPrivateMetadata({
  lead,
  manageTokens,
  manageTokenHashes,
}) {
  const industry = resolveLeadIndustry(lead)

  return {
    schemaVersion: SCHEMA_VERSION,
    bookingSource: BOOKING_SOURCE,
    clientName: truncateMetadataValue(lead.businessName),
    clientEmail: truncateMetadataValue(lead.contactEmail),
    clientPhone: truncateMetadataValue(
      `${lead.phoneCountryCode} ${lead.phoneNumber}`
    ),
    clientToken: truncateMetadataValue(manageTokens.client),
    ownerToken: truncateMetadataValue(manageTokens.owner),
    clientTokenHash: manageTokenHashes.client,
    ownerTokenHash: manageTokenHashes.owner,
    clientWebsite: truncateMetadataValue(lead.website),
    clientIndustry: truncateMetadataValue(industry),
    clientAddressLine1: truncateMetadataValue(lead.addressLine1),
    clientAddressLine2: truncateMetadataValue(lead.addressLine2),
    clientCity: truncateMetadataValue(lead.city),
    clientProvinceState: truncateMetadataValue(lead.provinceState),
    clientPostalCode: truncateMetadataValue(lead.postalCode),
    clientCountryCode: truncateMetadataValue(lead.countryCode),
    auditGoals: truncateMetadataValue(lead.auditGoals),
  }
}

export function preservePrivateMetadata(existingPrivate = {}, nextPrivate = {}) {
  return {
    ...existingPrivate,
    ...nextPrivate,
  }
}

export function appendEventAuditTrail(
  description,
  {
    timestampIso,
    actor,
    action,
    reason,
  }
) {
  const baseDescription = String(description || '').trimEnd()
  const nextLine = buildAuditTrailLine({
    timestampIso,
    actor,
    action,
    reason,
  })

  if (!baseDescription) {
    return `${AUDIT_TRAIL_HEADER}\n${nextLine}`
  }

  if (baseDescription.includes(`\n${AUDIT_TRAIL_HEADER}\n`)) {
    return `${baseDescription}\n${nextLine}`
  }

  return `${baseDescription}\n\n${AUDIT_TRAIL_HEADER}\n${nextLine}`
}

export function buildGoogleEventPayload({
  eventId,
  lead,
  slot,
  policy,
  manageTokens,
  manageTokenHashes,
}) {
  return {
    id: eventId,
    summary: `Leviathan operational audit with ${lead.businessName}`,
    description: buildEventDescription({ lead, slot, policy }),
    location: 'Google Meet',
    visibility: 'private',
    guestsCanModify: false,
    guestsCanInviteOthers: false,
    start: {
      dateTime: slot.startIso,
      timeZone: policy.timezone,
    },
    end: {
      dateTime: slot.endIso,
      timeZone: policy.timezone,
    },
    attendees: [{ email: lead.contactEmail }],
    conferenceData: {
      createRequest: {
        requestId: randomUUID().replaceAll('-', ''),
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
    extendedProperties: {
      private: buildBookingPrivateMetadata({
        lead,
        manageTokens,
        manageTokenHashes,
      }),
    },
  }
}

export function extractMeetingUrl(event) {
  const videoEntryPoint = event?.conferenceData?.entryPoints?.find(
    (entryPoint) => entryPoint.entryPointType === 'video'
  )

  return event?.hangoutLink || videoEntryPoint?.uri || null
}

export function extractPrivateBookingMetadata(event) {
  const privateMetadata = event?.extendedProperties?.private || {}
  const descriptionFields = parseDescriptionFields(event?.description)
  const legacyLocationFields = parseLegacyLocation(descriptionFields.location)
  const addressLine1 =
    privateMetadata.clientAddressLine1 || descriptionFields.addressLine1 || ''
  const addressLine2 =
    privateMetadata.clientAddressLine2 || descriptionFields.addressLine2 || ''
  const city =
    privateMetadata.clientCity ||
    descriptionFields.city ||
    legacyLocationFields.city ||
    ''
  const provinceState =
    privateMetadata.clientProvinceState ||
    descriptionFields.provinceState ||
    legacyLocationFields.provinceState ||
    ''
  const postalCode =
    privateMetadata.clientPostalCode || descriptionFields.postalCode || ''
  const countryCode =
    privateMetadata.clientCountryCode ||
    descriptionFields.countryCode ||
    legacyLocationFields.countryCode ||
    ''
  const website = cleanOptionalValue(
    privateMetadata.clientWebsite || privateMetadata.website || descriptionFields.website,
    ['Not provided']
  )
  const industry = cleanOptionalValue(
    privateMetadata.clientIndustry || privateMetadata.industry || descriptionFields.industry,
    ['Not specified']
  )
  const auditGoals = cleanOptionalValue(
    privateMetadata.auditGoals || descriptionFields.auditGoals
  )
  const locationFields = buildLocationFields({
    addressLine1,
    addressLine2,
    city,
    provinceState,
    postalCode,
    countryCode,
    location: descriptionFields.location,
  })

  return {
    schemaVersion: privateMetadata.schemaVersion || null,
    bookingSource: privateMetadata.bookingSource || null,
    clientName:
      privateMetadata.clientName ||
      privateMetadata.businessName ||
      descriptionFields.businessName ||
      parseBusinessName(event?.summary),
    clientEmail: privateMetadata.clientEmail || descriptionFields.clientEmail || '',
    clientPhone: privateMetadata.clientPhone || descriptionFields.clientPhone || '',
    clientToken: privateMetadata.clientToken || '',
    ownerToken: privateMetadata.ownerToken || '',
    clientTokenHash: privateMetadata.clientTokenHash || '',
    ownerTokenHash: privateMetadata.ownerTokenHash || '',
    website,
    industry,
    addressLine1,
    addressLine2,
    city,
    provinceState,
    postalCode,
    countryCode,
    formattedAddress: locationFields.formattedAddress,
    location: locationFields.location,
    auditGoals,
  }
}

export function extractEventSlot(event, timeZone) {
  const startSource = event?.start?.dateTime || event?.start?.date || ''
  const endSource = event?.end?.dateTime || event?.end?.date || ''
  const startIso =
    DateTime.fromISO(startSource, {
      zone: timeZone,
    }).toISO({
      suppressMilliseconds: true,
    }) || ''
  const endIso =
    DateTime.fromISO(endSource, {
      zone: timeZone,
    }).toISO({
      suppressMilliseconds: true,
    }) || ''

  return {
    startIso,
    endIso,
  }
}

export function eventStartsAt(event, slotStartIso) {
  return normalizeIso(extractEventSlot(event).startIso) === normalizeIso(slotStartIso)
}

export function buildManageUrl({
  baseUrl,
  eventId,
  actor,
  token,
  month,
}) {
  return buildFragmentManageUrl({
    baseUrl,
    eventId,
    actor,
    token,
    month,
  })
}

export function buildManageUrls({
  baseUrl,
  eventId,
  clientToken,
  ownerToken,
}) {
  return {
    client: buildManageUrl({
      baseUrl,
      eventId,
      actor: 'client',
      token: clientToken,
    }),
    owner: buildManageUrl({
      baseUrl,
      eventId,
      actor: 'owner',
      token: ownerToken,
    }),
  }
}

export function buildBookingStateFromEvent({
  event,
  policy,
}) {
  const metadata = extractPrivateBookingMetadata(event)
  const slot = extractEventSlot(event, policy.timezone)
  const slotDisplay = formatBookingSlot({
    slotStartIso: slot.startIso,
    slotEndIso: slot.endIso,
    timeZone: policy.timezone,
  })

  return {
    eventId: event.id,
    slotStartIso: slot.startIso,
    slotEndIso: slot.endIso,
    formattedDate: slotDisplay.formattedDate,
    formattedTime: slotDisplay.formattedTime,
    timezone: policy.timezone,
    businessName: metadata.clientName,
    contactEmail: metadata.clientEmail,
    clientPhone: metadata.clientPhone,
    meetingUrl: extractMeetingUrl(event),
    summary:
      event.summary || `Leviathan operational audit with ${metadata.clientName}`,
  }
}

export function buildLifecycleNotificationPayload({
  kind,
  event,
  env,
  policy,
  manageUrls,
  previousSlotStartIso,
  reason,
  initiatedBy,
}) {
  const metadata = extractPrivateBookingMetadata(event)
  const slot = extractEventSlot(event, policy.timezone)

  return {
    kind,
    eventId: event.id,
    slotStartIso: slot.startIso,
    slotEndIso: slot.endIso,
    previousSlotStartIso: previousSlotStartIso || null,
    meetingUrl: extractMeetingUrl(event),
    businessName: metadata.clientName,
    clientEmail: metadata.clientEmail,
    clientPhone: metadata.clientPhone,
    ownerEmail: env.bookingOwnerEmail || env.googleOrganizerEmail,
    timezone: policy.timezone,
    clientManageUrl: manageUrls.client,
    ownerManageUrl: manageUrls.owner,
    reason: reason || null,
    initiatedBy: initiatedBy || null,
    website: metadata.website,
    addressLine1: metadata.addressLine1,
    addressLine2: metadata.addressLine2,
    city: metadata.city,
    provinceState: metadata.provinceState,
    postalCode: metadata.postalCode,
    countryCode: metadata.countryCode,
    formattedAddress: metadata.formattedAddress,
    location: metadata.location,
    industry: metadata.industry,
    auditGoals: metadata.auditGoals,
  }
}

export function buildEmailTemplateContext(payload) {
  const slotDisplay = formatBookingSlot({
    slotStartIso: payload.slotStartIso,
    slotEndIso: payload.slotEndIso,
    timeZone: payload.timezone,
  })
  const slotStart = DateTime.fromISO(payload.slotStartIso).setZone(payload.timezone)

  return {
    ...payload,
    formattedDate: slotDisplay.formattedDate,
    formattedTime: slotDisplay.formattedTime,
    formattedWindow: slotDisplay.formattedWindow,
    weekday: slotStart.toFormat('cccc'),
    monthDay: slotStart.toFormat('LLLL d'),
  }
}
