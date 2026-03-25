import { DateTime } from 'luxon'
import { appendEventAuditTrail, buildManageUrls, extractPrivateBookingMetadata } from '../src/server/booking/eventPayload.js'
import { createManageTokenSet } from '../src/server/booking/manageTokens.js'
import { createBookingRuntime } from '../src/server/booking/runtime.js'

function readMode(argv) {
  if (argv.includes('--apply')) {
    return 'apply'
  }

  return 'dry-run'
}

function hasManageMetadata(metadata) {
  return Boolean(
    metadata.bookingSource === 'leviathan-audit' &&
      metadata.clientToken &&
      metadata.ownerToken &&
      metadata.clientTokenHash &&
      metadata.ownerTokenHash
  )
}

async function listFutureAuditEvents(calendarGateway) {
  const items = []
  let pageToken = null

  do {
    const page = await calendarGateway.listFutureEvents({
      timeMin: DateTime.now().toUTC().toISO(),
      timeMax: DateTime.now().plus({ months: 12 }).toUTC().toISO(),
      query: 'Leviathan operational audit',
      pageToken,
    })

    items.push(...page.items)
    pageToken = page.nextPageToken
  } while (pageToken)

  return items
}

async function main() {
  const mode = readMode(process.argv.slice(2))
  const runtime = createBookingRuntime()
  const events = await listFutureAuditEvents(runtime.calendarGateway)
  const candidates = []

  for (const event of events) {
    const metadata = extractPrivateBookingMetadata(event)

    if (hasManageMetadata(metadata)) {
      continue
    }

    if (!metadata.clientName || !metadata.clientEmail) {
      candidates.push({
        eventId: event.id,
        status: 'skipped',
        reason: 'Missing client name or client email in event metadata/description.',
      })
      continue
    }

    const tokenSet = createManageTokenSet({
      eventId: event.id,
      secret: runtime.env.bookingManageTokenSecret,
    })
    const manageUrls = buildManageUrls({
      baseUrl: runtime.env.bookingManageBaseUrl,
      eventId: event.id,
      clientToken: tokenSet.client.token,
      ownerToken: tokenSet.owner.token,
    })
    const nextPrivateMetadata = {
      ...(event.extendedProperties?.private || {}),
      schemaVersion: 'phase3',
      bookingSource: 'leviathan-audit',
      clientName: metadata.clientName,
      clientEmail: metadata.clientEmail,
      clientPhone: metadata.clientPhone || '',
      clientToken: tokenSet.client.token,
      ownerToken: tokenSet.owner.token,
      clientTokenHash: tokenSet.client.hash,
      ownerTokenHash: tokenSet.owner.hash,
    }
    const nextDescription = appendEventAuditTrail(event.description, {
      timestampIso: new Date().toISOString(),
      actor: 'system',
      action: 'backfilled_manage_metadata',
      reason: 'Backfilled legacy manage metadata.',
    })

    if (mode === 'apply') {
      await runtime.calendarGateway.patchEvent({
        eventId: event.id,
        existingEvent: event,
        sendUpdates: 'none',
        updates: {
          description: nextDescription,
          extendedProperties: {
            private: nextPrivateMetadata,
          },
        },
      })
    }

    candidates.push({
      eventId: event.id,
      status: mode === 'apply' ? 'applied' : 'candidate',
      clientEmail: metadata.clientEmail,
      clientManageUrl: manageUrls.client,
      ownerManageUrl: manageUrls.owner,
    })
  }

  console.log(
    JSON.stringify(
      {
        mode,
        totalEventsScanned: events.length,
        candidates,
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
