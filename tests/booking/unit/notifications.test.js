import assert from 'node:assert/strict'
import test from 'node:test'
import {
  runBookingReminder,
  sendLifecycleEmails,
} from '../../../src/server/booking/notifications.js'

test('lifecycle emails keep the client copy short and include full intake answers for the owner', async () => {
  const sentMessages = []

  await sendLifecycleEmails(
    {
      kind: 'booked',
      eventId: 'audittestfixture001',
      slotStartIso: '2026-03-02T10:30:00-05:00',
      slotEndIso: '2026-03-02T11:00:00-05:00',
      meetingUrl: 'https://meet.google.com/test-link',
      businessName: 'Northwind Plumbing',
      clientEmail: 'ops@northwind.example',
      clientPhone: '+1 (416) 555-1234',
      ownerEmail: 'owner@leviathan.example',
      timezone: 'America/Toronto',
      clientManageUrl: 'https://leviathan.example/manage-booking#client',
      ownerManageUrl: 'https://leviathan.example/manage-booking#owner',
      website: 'https://northwindplumbing.com',
      industry: 'Home Services',
      addressLine1: '123 Front Street',
      addressLine2: 'Suite 200',
      city: 'Toronto',
      provinceState: 'ON',
      postalCode: 'M5V 2T6',
      countryCode: 'CA',
      formattedAddress: '123 Front Street, Suite 200, Toronto, ON M5V 2T6, CA',
      auditGoals: 'Map scheduling bottlenecks and missed follow-up.',
    },
    {
      smtpGateway: {
        async sendMessage(message) {
          sentMessages.push(message)
        },
      },
      appBaseUrl: 'https://leviathan.example',
    }
  )

  assert.equal(sentMessages.length, 2)
  const clientMessage = sentMessages[0]
  const ownerMessage = sentMessages[1]

  const expectedFields = [
    'Business name: Northwind Plumbing',
    'Website: https://northwindplumbing.com',
    'Industry: Home Services',
    'Client email: ops@northwind.example',
    'Client phone: \\+1 \\(416\\) 555-1234',
    'Address line 1: 123 Front Street',
    'Address line 2: Suite 200',
    'City: Toronto',
    'Province/State: ON',
    'Postal code: M5V 2T6',
    'Country: CA',
    'Audit goals: Map scheduling bottlenecks and missed follow-up\\.',
  ]

  assert.match(clientMessage.text, /Audit page: https:\/\/leviathan\.example\/audit/)
  assert.match(clientMessage.text, /Leviathan Systems: https:\/\/leviathan\.example\//)
  assert.match(clientMessage.html, /Open the audit page/)
  assert.match(clientMessage.html, /Visit Leviathan Systems/)
  assert.doesNotMatch(clientMessage.text, /Business:/)
  assert.doesNotMatch(clientMessage.text, /Phone:/)
  assert.doesNotMatch(clientMessage.text, /Website: https:\/\/northwindplumbing\.com/)
  assert.doesNotMatch(clientMessage.text, /Audit goals:/)

  for (const field of expectedFields) {
    assert.match(ownerMessage.text, new RegExp(field))
  }

  assert.match(ownerMessage.html, /Business name:/)
  assert.match(ownerMessage.html, /Address line 2:/)
  assert.match(ownerMessage.html, /Audit goals:/)
})

test('reminder task self-skips when the event start no longer matches the payload slot', async () => {
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
      clientManageUrl: 'https://leviathan.example/client',
      ownerManageUrl: 'https://leviathan.example/owner',
    },
    {
      calendarGateway: {
        getEvent: async () => ({
          id: 'audit20260302t153000utc',
          status: 'confirmed',
          start: {
            dateTime: '2026-03-02T11:30:00-05:00',
          },
          end: {
            dateTime: '2026-03-02T12:00:00-05:00',
          },
        }),
      },
      smtpGateway: {
        async sendMessage() {
          throw new Error('should not send')
        },
      },
    }
  )

  assert.deepEqual(result, {
    skipped: true,
    reason: 'stale_slot',
  })
})
