function pad(value) {
  return String(value).padStart(2, '0')
}

function createApiError(message, status = 400, fieldErrors, code) {
  const error = new Error(message)
  error.status = status
  error.fieldErrors = fieldErrors
  error.code = code || null
  return error
}

async function parseJsonResponse(response) {
  let body = {}

  try {
    body = await response.json()
  } catch {
    body = {}
  }

  if (!response.ok) {
    throw createApiError(
      body.message || 'The booking request failed. Please try again.',
      response.status,
      body.fieldErrors,
      body.code
    )
  }

  return body
}

async function requestJson(path, options = {}) {
  try {
    const response = await fetch(path, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    return await parseJsonResponse(response)
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error
    }

    if (error instanceof Error && 'status' in error) {
      throw error
    }

    throw createApiError(
      'The booking service could not be reached. Please try again.'
    )
  }
}

export function getCurrentMonthKey() {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}`
}

export async function submitLead(payload) {
  return requestJson('/api/audit/lead', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function loadAvailability({ month, leadToken, signal }) {
  return requestJson('/api/audit/availability', {
    method: 'POST',
    body: JSON.stringify({
      month,
      leadToken,
    }),
    signal,
  })
}

export async function bookSlot({ leadToken, slotStartIso }) {
  return requestJson('/api/audit/booking', {
    method: 'POST',
    body: JSON.stringify({
      leadToken,
      slotStartIso,
    }),
  })
}

export async function loadManageContext({ eventId, actor, token, month }) {
  return requestJson('/api/audit/manage/context', {
    method: 'POST',
    body: JSON.stringify({
      eventId,
      actor,
      token,
      month,
    }),
  })
}

export async function cancelBooking({ eventId, actor, token, reason }) {
  return requestJson('/api/audit/manage/cancel', {
    method: 'POST',
    body: JSON.stringify({
      eventId,
      actor,
      token,
      reason,
    }),
  })
}

export async function rescheduleBooking({
  eventId,
  actor,
  token,
  slotStartIso,
  reason,
}) {
  return requestJson('/api/audit/manage/reschedule', {
    method: 'POST',
    body: JSON.stringify({
      eventId,
      actor,
      token,
      slotStartIso,
      reason,
    }),
  })
}
