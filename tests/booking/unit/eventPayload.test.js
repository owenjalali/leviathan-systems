import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildGoogleEventPayload,
  buildLifecycleNotificationPayload,
  createBookingEventId,
  extractPrivateBookingMetadata,
} from '../../../src/server/booking/eventPayload.js'
import { buildBookingPolicy } from '../../../src/server/booking/policy.js'
import { createTestEnv, createValidLead } from '../helpers.js'

function createEventFixture({
  id = 'audittestfixture001',
  lead = createValidLead(),
  privateMetadata = {},
  description,
} = {}) {
  return {
    id,
    summary: `Leviathan operational audit with ${lead.businessName}`,
    description:
      description ||
      [
        `Business: ${lead.businessName}`,
        `Client email: ${lead.contactEmail}`,
        `Client phone: ${lead.phoneCountryCode} ${lead.phoneNumber}`,
        `Website: ${lead.website}`,
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
      dateTime: '2026-03-03T14:00:00-05:00',
      timeZone: 'America/Toronto',
    },
    end: {
      dateTime: '2026-03-03T14:30:00-05:00',
      timeZone: 'America/Toronto',
    },
    hangoutLink: 'https://meet.google.com/test-link',
    extendedProperties: {
      private: {
        schemaVersion: 'phase3',
        bookingSource: 'leviathan-audit',
        clientName: lead.businessName,
        clientEmail: lead.contactEmail,
        clientPhone: `${lead.phoneCountryCode} ${lead.phoneNumber}`,
        clientToken: 'client-token',
        ownerToken: 'owner-token',
        clientTokenHash: 'client-hash',
        ownerTokenHash: 'owner-hash',
        ...privateMetadata,
      },
    },
  }
}

test('google event payload builder includes meet, attendee, and structured private metadata', () => {
  const payload = buildGoogleEventPayload({
    eventId: createBookingEventId(),
    lead: createValidLead(),
    slot: {
      startIso: '2026-03-03T14:00:00-05:00',
      endIso: '2026-03-03T14:30:00-05:00',
    },
    policy: buildBookingPolicy(createTestEnv()),
    manageTokens: {
      client: 'client-token',
      owner: 'owner-token',
    },
    manageTokenHashes: {
      client: 'client-hash',
      owner: 'owner-hash',
    },
  })

  assert.match(payload.id, /^audit[a-f0-9]{32}$/)
  assert.equal(payload.summary, 'Leviathan operational audit with Northwind Plumbing')
  assert.equal(payload.location, 'Google Meet')
  assert.equal(payload.visibility, 'private')
  assert.equal(payload.attendees[0].email, 'ops@northwind.example')
  assert.equal(payload.extendedProperties.private.bookingSource, 'leviathan-audit')
  assert.equal(payload.extendedProperties.private.schemaVersion, 'phase3')
  assert.equal(payload.extendedProperties.private.clientToken, 'client-token')
  assert.equal(payload.extendedProperties.private.ownerToken, 'owner-token')
  assert.equal(payload.extendedProperties.private.clientTokenHash, 'client-hash')
  assert.equal(payload.extendedProperties.private.ownerTokenHash, 'owner-hash')
  assert.equal(
    payload.extendedProperties.private.clientAddressLine1,
    '123 Front Street'
  )
  assert.equal(payload.extendedProperties.private.clientCity, 'Toronto')
  assert.equal(payload.extendedProperties.private.clientCountryCode, 'CA')
  assert.equal(
    payload.extendedProperties.private.auditGoals,
    'Map scheduling bottlenecks and missed follow-up.'
  )
  assert.match(payload.description, /Address line 1: 123 Front Street/)
  assert.match(payload.description, /Postal code: M5V 2T6/)
  assert.ok(payload.conferenceData.createRequest.requestId)
})

test('private metadata extraction prefers structured metadata and derives location fields', () => {
  const metadata = extractPrivateBookingMetadata(
    createEventFixture({
      privateMetadata: {
        clientWebsite: 'https://structured.example',
        clientIndustry: 'Professional Services',
        clientAddressLine1: '500 King Street West',
        clientAddressLine2: 'Suite 200',
        clientCity: 'Toronto',
        clientProvinceState: 'ON',
        clientPostalCode: 'M5V 1L9',
        clientCountryCode: 'CA',
        auditGoals: 'Audit intake quality.',
      },
      description: [
        'Business: Old Name',
        'Client email: old@example.com',
        'Client phone: +1 (416) 555-0000',
        'Website: https://description.example',
        'Industry: Old Industry',
        'Address line 1: 1 Wrong Street',
        'City: Wrong City',
        'Province/State: ZZ',
        'Postal code: 00000',
        'Country: XX',
        'Location: Wrong City, ZZ, XX',
        'Audit goals: Old goals',
      ].join('\n'),
    })
  )

  assert.equal(metadata.website, 'https://structured.example')
  assert.equal(metadata.industry, 'Professional Services')
  assert.equal(metadata.addressLine1, '500 King Street West')
  assert.equal(metadata.addressLine2, 'Suite 200')
  assert.equal(metadata.city, 'Toronto')
  assert.equal(metadata.provinceState, 'ON')
  assert.equal(metadata.postalCode, 'M5V 1L9')
  assert.equal(metadata.countryCode, 'CA')
  assert.equal(
    metadata.formattedAddress,
    '500 King Street West, Suite 200, Toronto, ON M5V 1L9, CA'
  )
  assert.equal(metadata.location, 'Toronto, ON, CA')
  assert.equal(metadata.auditGoals, 'Audit intake quality.')
})

test('private metadata extraction falls back to explicit description fields and legacy location parsing', () => {
  const metadata = extractPrivateBookingMetadata(
    createEventFixture({
      privateMetadata: {
        clientName: 'Legacy HVAC',
        clientEmail: 'ops@legacy.example',
        clientPhone: '+1 (416) 555-1234',
      },
      description: [
        'Business: Legacy HVAC',
        'Client email: ops@legacy.example',
        'Client phone: +1 (416) 555-1234',
        'Website: legacy.example',
        'Industry: Home Services',
        'Location: Toronto, ON, CA',
        'Audit goals: Recover the old payload shape.',
      ].join('\n'),
    })
  )

  assert.equal(metadata.website, 'legacy.example')
  assert.equal(metadata.industry, 'Home Services')
  assert.equal(metadata.addressLine1, '')
  assert.equal(metadata.city, 'Toronto')
  assert.equal(metadata.provinceState, 'ON')
  assert.equal(metadata.countryCode, 'CA')
  assert.equal(metadata.formattedAddress, 'Toronto, ON, CA')
  assert.equal(metadata.location, 'Toronto, ON, CA')
  assert.equal(metadata.auditGoals, 'Recover the old payload shape.')
})

test('lifecycle notification payload includes the structured intake fields', () => {
  const env = createTestEnv()
  const policy = buildBookingPolicy(env)
  const payload = buildLifecycleNotificationPayload({
    kind: 'booked',
    event: createEventFixture({
      privateMetadata: {
        clientWebsite: 'https://northwindplumbing.com',
        clientIndustry: 'Home Services',
        clientAddressLine1: '123 Front Street',
        clientAddressLine2: '',
        clientCity: 'Toronto',
        clientProvinceState: 'ON',
        clientPostalCode: 'M5V 2T6',
        clientCountryCode: 'CA',
        auditGoals: 'Map scheduling bottlenecks and missed follow-up.',
      },
    }),
    env,
    policy,
    manageUrls: {
      client: 'https://leviathan.example/manage-booking#client',
      owner: 'https://leviathan.example/manage-booking#owner',
    },
  })

  assert.equal(payload.website, 'https://northwindplumbing.com')
  assert.equal(payload.industry, 'Home Services')
  assert.equal(payload.addressLine1, '123 Front Street')
  assert.equal(payload.addressLine2, '')
  assert.equal(payload.city, 'Toronto')
  assert.equal(payload.provinceState, 'ON')
  assert.equal(payload.postalCode, 'M5V 2T6')
  assert.equal(payload.countryCode, 'CA')
  assert.equal(payload.formattedAddress, '123 Front Street, Toronto, ON M5V 2T6, CA')
  assert.equal(payload.location, 'Toronto, ON, CA')
  assert.equal(payload.auditGoals, 'Map scheduling bottlenecks and missed follow-up.')
})
