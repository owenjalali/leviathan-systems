function readManageParams(params) {
  const eventId = params.get('eventId')?.trim() || ''
  const actor = params.get('actor')?.trim() || ''
  const token = params.get('token')?.trim() || ''

  if (!eventId || !actor || !token) {
    return null
  }

  return {
    eventId,
    actor,
    token,
  }
}

function createUrl(value, baseUrl = 'http://localhost') {
  try {
    return new URL(value, baseUrl)
  } catch {
    return null
  }
}

export function createManageHash({
  eventId,
  actor,
  token,
}) {
  if (!eventId || !actor || !token) {
    return ''
  }

  const params = new URLSearchParams({
    eventId,
    actor,
    token,
  })

  return params.toString()
}

export function buildManageUrl({
  baseUrl,
  eventId,
  actor,
  token,
  month,
}) {
  if (!baseUrl) {
    return ''
  }

  const url = createUrl('/manage-booking', baseUrl)
  const hash = createManageHash({
    eventId,
    actor,
    token,
  })

  if (!url || !hash) {
    return ''
  }

  if (month) {
    url.searchParams.set('month', month)
  }

  url.hash = hash
  return url.toString()
}

export function parseManageUrl(url, { baseUrl = 'http://localhost' } = {}) {
  const parsed = createUrl(url, baseUrl)

  if (!parsed) {
    return null
  }

  const month = parsed.searchParams.get('month') || ''
  const fragmentParams = readManageParams(
    new URLSearchParams(parsed.hash.replace(/^#/, ''))
  )

  if (fragmentParams) {
    return {
      ...fragmentParams,
      month,
      source: 'fragment',
    }
  }

  const queryParams = readManageParams(parsed.searchParams)

  if (!queryParams) {
    return null
  }

  return {
    ...queryParams,
    month,
    source: 'query',
  }
}

export function normalizeManageUrl(url, { baseUrl = 'http://localhost' } = {}) {
  const parsed = createUrl(url, baseUrl)

  if (!parsed) {
    return null
  }

  const manageParams = parseManageUrl(parsed.toString(), { baseUrl })

  if (!manageParams) {
    return {
      url: parsed.toString(),
      manageParams: null,
      migrated: false,
      month: parsed.searchParams.get('month') || '',
    }
  }

  if (manageParams.source === 'fragment') {
    return {
      url: parsed.toString(),
      manageParams,
      migrated: false,
      month: manageParams.month,
    }
  }

  parsed.searchParams.delete('eventId')
  parsed.searchParams.delete('actor')
  parsed.searchParams.delete('token')
  parsed.hash = createManageHash(manageParams)

  return {
    url: parsed.toString(),
    manageParams: {
      ...manageParams,
      source: 'fragment',
    },
    migrated: true,
    month: manageParams.month,
  }
}
