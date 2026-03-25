export function createTestEnv(overrides = {}) {
  return {
    appBaseUrl: 'https://leviathan.example',
    bookingManageBaseUrl: 'https://leviathan.example',
    healthSecret: 'test-health-secret',
    auditLeadTokenSecret: 'test-audit-lead-token-secret',
    bookingManageTokenSecret: 'test-booking-manage-token-secret',
    bookingTimezone: 'America/Toronto',
    bookingWorkingDays: [1, 2, 3, 4, 5],
    bookingDayStartMinutes: 9 * 60,
    bookingDayEndMinutes: 17 * 60,
    bookingSlotDurationMinutes: 30,
    bookingSlotIntervalMinutes: 30,
    bookingMinNoticeMinutes: 240,
    bookingSelfServiceCutoffMinutes: 12 * 60,
    leadTokenTtlMinutes: 24 * 60,
    reminderLeadMinutes: 60,
    bookingGoogleSendUpdates: 'all',
    googleClientId: 'google-client-id',
    googleClientSecret: 'google-client-secret',
    googleRefreshToken: 'google-refresh-token',
    googleCalendarId: 'primary',
    googleOrganizerEmail: 'owner@leviathan.example',
    bookingOwnerEmail: 'owner@leviathan.example',
    smtpHost: 'smtp.leviathan.example',
    smtpPort: 587,
    smtpSecure: false,
    smtpUser: 'smtp-user',
    smtpPass: 'smtp-pass',
    smtpFrom: 'Leviathan Systems <owner@leviathan.example>',
    smtpReplyTo: 'owner@leviathan.example',
    triggerSecretKey: 'tr_test_secret',
    triggerProjectRef: 'proj_test_ref',
    ...overrides,
  }
}

export function createValidLead(overrides = {}) {
  return {
    businessName: 'Northwind Plumbing',
    website: 'northwindplumbing.com',
    industry: 'Home Services',
    industryOther: '',
    contactEmail: 'ops@northwind.example',
    phoneCountryCode: '+1',
    phoneNumber: '(416) 555-1234',
    addressLine1: '123 Front Street',
    addressLine2: '',
    city: 'Toronto',
    provinceState: 'ON',
    postalCode: 'M5V 2T6',
    countryCode: 'CA',
    auditGoals: 'Map scheduling bottlenecks and missed follow-up.',
    ...overrides,
  }
}

export function createFixedNow() {
  return new Date('2026-03-02T06:00:00-05:00')
}
