import { DateTime } from 'luxon'
import { buildEmailTemplateContext, eventStartsAt } from './eventPayload.js'

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function buildAuditUrl(appBaseUrl) {
  if (!appBaseUrl) {
    return ''
  }

  try {
    return new URL('/audit', appBaseUrl).toString()
  } catch {
    return ''
  }
}

function buildSiteUrl(appBaseUrl) {
  if (!appBaseUrl) {
    return ''
  }

  try {
    return new URL('/', appBaseUrl).toString()
  } catch {
    return ''
  }
}

function buildManageLines(url, label) {
  if (!url) {
    return {
      text: [],
      html: '',
    }
  }

  return {
    text: ['', `${label}: ${url}`],
    html: `<p><a href="${escapeHtml(url)}">${escapeHtml(label)}</a></p>`,
  }
}

function buildOwnerIntakeRows(context) {
  return [
    ['Business name', context.businessName],
    ['Website', context.website || 'Not provided'],
    ['Industry', context.industry || 'Not specified'],
    ['Client email', context.clientEmail],
    ['Client phone', context.clientPhone],
    ['Address line 1', context.addressLine1 || 'Not provided'],
    ...(context.addressLine2
      ? [['Address line 2', context.addressLine2]]
      : []),
    ['City', context.city || 'Not provided'],
    ['Province/State', context.provinceState || 'Not provided'],
    ['Postal code', context.postalCode || 'Not provided'],
    ['Country', context.countryCode || 'Not provided'],
    ['Audit goals', context.auditGoals || 'Not provided'],
  ]
}

function formatMultilineHtml(value) {
  return escapeHtml(value).replaceAll('\n', '<br />')
}

function buildQuestionAnswerText(rows) {
  return [
    'Submitted intake:',
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ]
}

function buildQuestionAnswerHtml(rows) {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
      <tbody>
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:4px 16px 4px 0; vertical-align:top;"><strong>${escapeHtml(label)}:</strong></td>
                <td style="padding:4px 0; vertical-align:top;">${formatMultilineHtml(value)}</td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  `.trim()
}

function buildClientLifecycleEmail(payload, appBaseUrl) {
  const context = buildEmailTemplateContext(payload)
  const auditUrl = buildAuditUrl(appBaseUrl)
  const siteUrl = buildSiteUrl(appBaseUrl)
  const manageLink = buildManageLines(payload.clientManageUrl, 'Manage this booking')
  const lifecycleCopy = {
    booked: {
      subject: `Audit booked for ${context.monthDay} at ${context.formattedTime}`,
      intro: `Your Leviathan operational audit is booked for ${context.formattedDate} at ${context.formattedWindow} ${context.timezone}.`,
    },
    rescheduled: {
      subject: `Audit rescheduled to ${context.monthDay} at ${context.formattedTime}`,
      intro: `Your Leviathan operational audit was rescheduled to ${context.formattedDate} at ${context.formattedWindow} ${context.timezone}.`,
    },
    cancelled: {
      subject: `Audit cancelled for ${context.monthDay}`,
      intro: `Your Leviathan operational audit scheduled for ${context.formattedDate} at ${context.formattedWindow} ${context.timezone} was cancelled.`,
    },
  }[payload.kind]

  const reasonLine = payload.reason ? ['', `Reason: ${payload.reason}`] : []

  return {
    to: payload.clientEmail,
    subject: lifecycleCopy.subject,
    text: [
      lifecycleCopy.intro,
      '',
      `Google Meet: ${context.meetingUrl || 'See the calendar invitation for the Meet link.'}`,
      'Google Calendar attendee updates remain enabled for this booking.',
      ...reasonLine,
      ...manageLink.text,
      ...(auditUrl ? ['', `Audit page: ${auditUrl}`] : []),
      ...(siteUrl ? [`Leviathan Systems: ${siteUrl}`] : []),
    ].join('\n'),
    html: `
      <p>${escapeHtml(lifecycleCopy.intro)}</p>
      <p><strong>Google Meet:</strong> ${
        context.meetingUrl
          ? `<a href="${escapeHtml(context.meetingUrl)}">${escapeHtml(
              context.meetingUrl
            )}</a>`
          : 'See the calendar invitation for the Meet link.'
      }</p>
      <p>Google Calendar attendee updates remain enabled for this booking.</p>
      ${
        payload.reason
          ? `<p><strong>Reason:</strong> ${escapeHtml(payload.reason)}</p>`
          : ''
      }
      ${manageLink.html}
      ${
        auditUrl
          ? `<p><a href="${escapeHtml(auditUrl)}">Open the audit page</a></p>`
          : ''
      }
      ${
        siteUrl
          ? `<p><a href="${escapeHtml(siteUrl)}">Visit Leviathan Systems</a></p>`
          : ''
      }
    `.trim(),
  }
}

function buildOwnerLifecycleEmail(payload, appBaseUrl) {
  const context = buildEmailTemplateContext(payload)
  const auditUrl = buildAuditUrl(appBaseUrl)
  const manageLink = buildManageLines(payload.ownerManageUrl, 'Open the owner manage link')
  const intakeRows = buildOwnerIntakeRows(context)
  const lifecycleCopy = {
    booked: {
      subject: `New Leviathan audit booked: ${context.businessName}`,
      intro: `A new Leviathan operational audit was booked for ${context.formattedDate} at ${context.formattedWindow} ${context.timezone}.`,
    },
    rescheduled: {
      subject: `Leviathan audit rescheduled: ${context.businessName}`,
      intro: `The Leviathan operational audit for ${context.businessName} was rescheduled to ${context.formattedDate} at ${context.formattedWindow} ${context.timezone}.`,
    },
    cancelled: {
      subject: `Leviathan audit cancelled: ${context.businessName}`,
      intro: `The Leviathan operational audit for ${context.businessName} scheduled on ${context.formattedDate} at ${context.formattedWindow} ${context.timezone} was cancelled.`,
    },
  }[payload.kind]

  const previousSlotLine =
    payload.kind === 'rescheduled' && payload.previousSlotStartIso
      ? [
          '',
          `Previous slot: ${DateTime.fromISO(payload.previousSlotStartIso)
            .setZone(context.timezone)
            .toFormat('cccc, LLLL d h:mm a')} ${context.timezone}`,
        ]
      : []
  const reasonLine = payload.reason ? ['', `Reason: ${payload.reason}`] : []

  return {
    to: payload.ownerEmail,
    subject: lifecycleCopy.subject,
    text: [
      lifecycleCopy.intro,
      '',
      ...buildQuestionAnswerText(intakeRows),
      ...(context.formattedAddress
        ? ['', `Formatted address: ${context.formattedAddress}`]
        : []),
      '',
      `Google Meet: ${context.meetingUrl || 'Pending on the calendar event.'}`,
      ...previousSlotLine,
      ...reasonLine,
      ...manageLink.text,
      ...(auditUrl ? ['', `Audit page: ${auditUrl}`] : []),
    ].join('\n'),
    html: `
      <p>${escapeHtml(lifecycleCopy.intro)}</p>
      ${buildQuestionAnswerHtml(intakeRows)}
      ${
        context.formattedAddress
          ? `<p><strong>Formatted address:</strong> ${escapeHtml(
              context.formattedAddress
            )}</p>`
          : ''
      }
      <p><strong>Google Meet:</strong> ${
        context.meetingUrl
          ? `<a href="${escapeHtml(context.meetingUrl)}">${escapeHtml(
              context.meetingUrl
            )}</a>`
          : 'Pending on the calendar event.'
      }</p>
      ${
        payload.kind === 'rescheduled' && payload.previousSlotStartIso
          ? `<p><strong>Previous slot:</strong> ${escapeHtml(
              DateTime.fromISO(payload.previousSlotStartIso)
                .setZone(context.timezone)
                .toFormat('cccc, LLLL d h:mm a')
            )} ${escapeHtml(context.timezone)}</p>`
          : ''
      }
      ${
        payload.reason
          ? `<p><strong>Reason:</strong> ${escapeHtml(payload.reason)}</p>`
          : ''
      }
      ${manageLink.html}
      ${
        auditUrl
          ? `<p><a href="${escapeHtml(auditUrl)}">Open the audit page</a></p>`
          : ''
      }
    `.trim(),
  }
}

function buildClientReminderEmail(payload) {
  const context = buildEmailTemplateContext(payload)
  const manageLink = buildManageLines(payload.clientManageUrl, 'Manage this booking')

  return {
    to: payload.clientEmail,
    subject: `Reminder: Leviathan audit at ${context.formattedTime}`,
    text: [
      'Reminder: your Leviathan operational audit starts soon.',
      '',
      `${context.formattedDate} at ${context.formattedWindow} ${context.timezone}`,
      `Google Meet: ${context.meetingUrl || 'See your calendar invite for the Meet link.'}`,
      ...manageLink.text,
    ].join('\n'),
    html: `
      <p>Reminder: your Leviathan operational audit starts soon.</p>
      <p><strong>${escapeHtml(context.formattedDate)}</strong> at <strong>${escapeHtml(
        context.formattedWindow
      )}</strong> ${escapeHtml(context.timezone)}</p>
      <p><strong>Google Meet:</strong> ${
        context.meetingUrl
          ? `<a href="${escapeHtml(context.meetingUrl)}">${escapeHtml(
              context.meetingUrl
            )}</a>`
          : 'See your calendar invite for the Meet link.'
      }</p>
      ${manageLink.html}
    `.trim(),
  }
}

function buildOwnerReminderEmail(payload) {
  const context = buildEmailTemplateContext(payload)
  const manageLink = buildManageLines(payload.ownerManageUrl, 'Open the owner manage link')

  return {
    to: payload.ownerEmail,
    subject: `Reminder: ${context.businessName} audit starts soon`,
    text: [
      `Reminder: ${context.businessName} starts soon.`,
      '',
      `${context.formattedDate} at ${context.formattedWindow} ${context.timezone}`,
      `Client email: ${context.clientEmail}`,
      `Client phone: ${context.clientPhone}`,
      `Google Meet: ${context.meetingUrl || 'See the calendar event for the Meet link.'}`,
      ...manageLink.text,
    ].join('\n'),
    html: `
      <p>Reminder: <strong>${escapeHtml(
        context.businessName
      )}</strong> starts soon.</p>
      <p><strong>${escapeHtml(context.formattedDate)}</strong> at <strong>${escapeHtml(
        context.formattedWindow
      )}</strong> ${escapeHtml(context.timezone)}</p>
      <p><strong>Client email:</strong> ${escapeHtml(
        context.clientEmail
      )}<br /><strong>Client phone:</strong> ${escapeHtml(
        context.clientPhone
      )}</p>
      <p><strong>Google Meet:</strong> ${
        context.meetingUrl
          ? `<a href="${escapeHtml(context.meetingUrl)}">${escapeHtml(
              context.meetingUrl
            )}</a>`
          : 'See the calendar event for the Meet link.'
      }</p>
      ${manageLink.html}
    `.trim(),
  }
}

export async function sendLifecycleEmails(
  payload,
  {
    smtpGateway,
    appBaseUrl = '',
  }
) {
  await smtpGateway.sendMessage(buildClientLifecycleEmail(payload, appBaseUrl))
  await smtpGateway.sendMessage(buildOwnerLifecycleEmail(payload, appBaseUrl))

  return {
    clientNotificationSent: true,
    ownerNotificationSent: true,
  }
}

export async function runBookingLifecycleNotifications(
  payload,
  {
    smtpGateway,
    scheduleReminder,
    reminderLeadMinutes = 60,
    appBaseUrl = '',
  }
) {
  const emailResult = await sendLifecycleEmails(payload, {
    smtpGateway,
    appBaseUrl,
  })

  if (payload.kind !== 'booked' && payload.kind !== 'rescheduled') {
    return {
      ...emailResult,
      reminderScheduledAt: null,
      reminderHandle: null,
    }
  }

  const reminderAt = DateTime.fromISO(payload.slotStartIso).minus({
    minutes: reminderLeadMinutes,
  })

  if (reminderAt <= DateTime.now()) {
    return {
      ...emailResult,
      reminderScheduledAt: null,
      reminderHandle: null,
    }
  }

  const reminderHandle = await scheduleReminder({
    payload,
    delay: reminderAt.toJSDate(),
  })

  return {
    ...emailResult,
    reminderScheduledAt: reminderAt.toISO(),
    reminderHandle,
  }
}

export async function runBookingReminder(
  payload,
  {
    calendarGateway,
    smtpGateway,
  }
) {
  const event = await calendarGateway.getEvent(payload.eventId, {
    allowMissing: true,
  })

  if (!event || event.status === 'cancelled') {
    return {
      skipped: true,
      reason: event ? 'cancelled' : 'missing',
    }
  }

  if (!eventStartsAt(event, payload.slotStartIso)) {
    return {
      skipped: true,
      reason: 'stale_slot',
    }
  }

  await smtpGateway.sendMessage(buildClientReminderEmail(payload))
  await smtpGateway.sendMessage(buildOwnerReminderEmail(payload))

  return {
    skipped: false,
    clientReminderSent: true,
    ownerReminderSent: true,
  }
}
