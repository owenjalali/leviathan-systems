import { BookingError } from './errors.js'
import {
  buildGoogleEventPayload,
  extractEventSlot,
  extractMeetingUrl,
  preservePrivateMetadata,
} from './eventPayload.js'

function defaultWait(durationMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs)
  })
}

function getGoogleStatus(error) {
  return (
    error?.response?.status ||
    error?.status ||
    error?.code ||
    error?.response?.data?.error?.code
  )
}

function createProviderError(message, code, error) {
  return new BookingError(message, {
    status: 502,
    code,
    cause: error,
  })
}

function toMs(value) {
  return new Date(value).getTime()
}

export function eventOverlapsSlot(
  event,
  {
    slotStartIso,
    slotEndIso,
  }
) {
  if (!event || event.status === 'cancelled') {
    return false
  }

  const slot = extractEventSlot(event)
  const eventStartMs = toMs(slot.startIso)
  const eventEndMs = toMs(slot.endIso)
  const slotStartMs = toMs(slotStartIso)
  const slotEndMs = toMs(slotEndIso)

  if (
    !Number.isFinite(eventStartMs) ||
    !Number.isFinite(eventEndMs) ||
    !Number.isFinite(slotStartMs) ||
    !Number.isFinite(slotEndMs)
  ) {
    return false
  }

  return eventStartMs < slotEndMs && eventEndMs > slotStartMs
}

export function filterOverlappingEvents(
  events,
  {
    slotStartIso,
    slotEndIso,
    excludeEventId,
  }
) {
  return (events || []).filter((event) => {
    if (excludeEventId && event.id === excludeEventId) {
      return false
    }

    return eventOverlapsSlot(event, {
      slotStartIso,
      slotEndIso,
    })
  })
}

export function createCalendarGateway({
  calendarClient,
  calendarId,
  timeZone,
  wait = defaultWait,
}) {
  async function queryBusyRanges({ timeMin, timeMax }) {
    try {
      const response = await calendarClient.freebusy.query({
        requestBody: {
          timeMin,
          timeMax,
          timeZone,
          items: [{ id: calendarId }],
        },
      })

      return response.data?.calendars?.[calendarId]?.busy || []
    } catch (error) {
      throw createProviderError(
        'Google Calendar availability could not be loaded right now.',
        'GOOGLE_FREEBUSY_ERROR',
        error
      )
    }
  }

  async function isSlotFree({ slotStartIso, slotEndIso }) {
    const busyRanges = await queryBusyRanges({
      timeMin: slotStartIso,
      timeMax: slotEndIso,
    })

    return busyRanges.length === 0
  }

  async function getEvent(eventId, { allowMissing = false } = {}) {
    try {
      const response = await calendarClient.events.get({
        calendarId,
        eventId,
        conferenceDataVersion: 1,
      })

      return response.data
    } catch (error) {
      if (allowMissing && getGoogleStatus(error) === 404) {
        return null
      }

      throw createProviderError(
        'Google Calendar event lookup failed.',
        'GOOGLE_EVENT_LOOKUP_ERROR',
        error
      )
    }
  }

  async function listFutureEvents({
    timeMin,
    timeMax,
    pageToken,
    query,
    maxResults = 250,
  } = {}) {
    try {
      const response = await calendarClient.events.list({
        calendarId,
        singleEvents: true,
        showDeleted: false,
        orderBy: 'startTime',
        timeMin,
        timeMax,
        pageToken,
        q: query,
        maxResults,
      })

      return {
        items: response.data?.items || [],
        nextPageToken: response.data?.nextPageToken || null,
      }
    } catch (error) {
      throw createProviderError(
        'Google Calendar events could not be listed right now.',
        'GOOGLE_EVENT_LIST_ERROR',
        error
      )
    }
  }

  async function listEventsOverlappingSlot({
    slotStartIso,
    slotEndIso,
    excludeEventId,
  }) {
    try {
      const response = await calendarClient.events.list({
        calendarId,
        singleEvents: true,
        showDeleted: false,
        orderBy: 'startTime',
        timeMin: slotStartIso,
        timeMax: slotEndIso,
        maxResults: 20,
      })

      return filterOverlappingEvents(response.data?.items || [], {
        slotStartIso,
        slotEndIso,
        excludeEventId,
      })
    } catch (error) {
      throw createProviderError(
        'Google Calendar overlap verification failed.',
        'GOOGLE_EVENT_LIST_ERROR',
        error
      )
    }
  }

  async function hydrateMeetingData(eventId, event) {
    let currentEvent = event

    if (extractMeetingUrl(currentEvent)) {
      return currentEvent
    }

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await wait(350 * (attempt + 1))
      currentEvent = await getEvent(eventId)

      const conferenceStatus =
        currentEvent?.conferenceData?.createRequest?.status?.statusCode

      if (extractMeetingUrl(currentEvent) || conferenceStatus === 'failure') {
        return currentEvent
      }
    }

    return currentEvent
  }

  async function createEvent({
    eventId,
    lead,
    slot,
    policy,
    manageTokens,
    manageTokenHashes,
    sendUpdates = 'all',
  }) {
    try {
      const response = await calendarClient.events.insert({
        calendarId,
        conferenceDataVersion: 1,
        sendUpdates,
        requestBody: buildGoogleEventPayload({
          eventId,
          lead,
          slot,
          policy,
          manageTokens,
          manageTokenHashes,
        }),
      })

      return hydrateMeetingData(response.data.id, response.data)
    } catch (error) {
      if (getGoogleStatus(error) === 409) {
        throw new BookingError(
          'That slot has already been taken. Please choose another one.',
          {
            status: 409,
            code: 'STALE_SLOT',
            cause: error,
          }
        )
      }

      throw createProviderError(
        'Google Calendar could not create the booking right now.',
        'GOOGLE_EVENT_CREATE_ERROR',
        error
      )
    }
  }

  async function patchEvent({
    eventId,
    existingEvent,
    updates,
    sendUpdates = 'all',
  }) {
    try {
      const nextPrivateMetadata = preservePrivateMetadata(
        existingEvent?.extendedProperties?.private,
        updates?.extendedProperties?.private
      )
      const requestBody = {
        ...updates,
        extendedProperties: {
          private: nextPrivateMetadata,
        },
      }
      const response = await calendarClient.events.patch({
        calendarId,
        eventId,
        conferenceDataVersion: 1,
        sendUpdates,
        requestBody,
      })

      return updates?.status === 'cancelled'
        ? response.data
        : hydrateMeetingData(eventId, response.data)
    } catch (error) {
      if (getGoogleStatus(error) === 409) {
        throw new BookingError(
          'That slot has already been taken. Please choose another one.',
          {
            status: 409,
            code: 'STALE_SLOT',
            cause: error,
          }
        )
      }

      throw createProviderError(
        'Google Calendar could not update the booking right now.',
        'GOOGLE_EVENT_PATCH_ERROR',
        error
      )
    }
  }

  async function cancelEvent({
    eventId,
    existingEvent,
    description,
    privateMetadata,
    sendUpdates = 'all',
  }) {
    return patchEvent({
      eventId,
      existingEvent,
      sendUpdates,
      updates: {
        status: 'cancelled',
        description: description ?? existingEvent?.description,
        extendedProperties: {
          private: privateMetadata || {},
        },
      },
    })
  }

  return {
    queryBusyRanges,
    isSlotFree,
    getEvent,
    listFutureEvents,
    listEventsOverlappingSlot,
    createEvent,
    patchEvent,
    cancelEvent,
  }
}
