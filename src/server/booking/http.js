import { normalizeError, toErrorBody } from './errors.js'

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }

  if (typeof req.body === 'string') {
    return req.body ? JSON.parse(req.body) : {}
  }

  let raw = ''

  for await (const chunk of req) {
    raw += chunk
  }

  return raw ? JSON.parse(raw) : {}
}

function readQuery(req) {
  if (req.query) {
    return req.query
  }

  const url = new URL(req.url || '/', 'http://localhost')
  return Object.fromEntries(url.searchParams.entries())
}

function sendJson(res, status, body) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(status).json(body)
    return
  }

  if (typeof res.setHeader === 'function') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
  }

  res.statusCode = status
  res.end(JSON.stringify(body))
}

function getRequestPath(req) {
  try {
    return new URL(req?.url || '/', 'http://localhost').pathname
  } catch {
    return req?.url || '/'
  }
}

function logRouteError(logger, req, error, normalized) {
  logger.error?.('Booking route error.', {
    method: req?.method || 'UNKNOWN',
    path: getRequestPath(req),
    status: normalized.status,
    code: normalized.code,
    message: normalized.message,
    fieldErrors: normalized.fieldErrors || null,
    details: normalized.details || null,
    causeMessage:
      normalized.cause?.message ||
      (error instanceof Error ? error.message : String(error || '')),
  })
}

export function getRequestClientKey(req) {
  const forwardedFor = req?.headers?.['x-forwarded-for']
  const realIp = req?.headers?.['x-real-ip']
  const remoteAddress = req?.socket?.remoteAddress || req?.connection?.remoteAddress

  return String(
    Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor || realIp || remoteAddress || 'unknown'
  )
    .split(',')[0]
    .trim()
}

export function createRouteHandler({ method, handler, logger = console }) {
  return async function routeHandler(req, res) {
    if (req.method !== method) {
      if (typeof res.setHeader === 'function') {
        res.setHeader('Allow', method)
      }

      sendJson(res, 405, {
        message: 'Method not allowed.',
        code: 'METHOD_NOT_ALLOWED',
      })
      return
    }

    try {
      const result = await handler({
        body: method === 'POST' ? await readJsonBody(req) : undefined,
        query: readQuery(req),
        req,
      })

      sendJson(res, 200, result)
    } catch (error) {
      const normalized = normalizeError(error)
      logRouteError(logger, req, error, normalized)
      sendJson(res, normalized.status, toErrorBody(normalized))
    }
  }
}
