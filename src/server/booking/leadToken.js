import { createHmac, timingSafeEqual } from 'node:crypto'
import { BookingError } from './errors.js'

const TOKEN_VERSION = 1

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url')
}

function base64UrlDecode(value) {
  return Buffer.from(value, 'base64url').toString('utf8')
}

function createSignature(encodedPayload, secret) {
  return createHmac('sha256', secret).update(encodedPayload).digest('base64url')
}

function signaturesMatch(left, right) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

export function signLeadToken({
  lead,
  secret,
  issuedAt = new Date(),
  ttlMinutes,
}) {
  const issuedAtDate = new Date(issuedAt)
  const expiresAtDate = new Date(
    issuedAtDate.getTime() + ttlMinutes * 60_000
  )
  const payload = {
    v: TOKEN_VERSION,
    iat: issuedAtDate.toISOString(),
    exp: expiresAtDate.toISOString(),
    lead,
  }
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = createSignature(encodedPayload, secret)

  return `${encodedPayload}.${signature}`
}

export function verifyLeadToken(token, { secret, now = new Date() }) {
  const [encodedPayload, signature] = String(token || '').split('.')

  if (!encodedPayload || !signature) {
    throw new BookingError('That booking session is invalid.', {
      status: 403,
      code: 'INVALID_LEAD_TOKEN',
    })
  }

  const expectedSignature = createSignature(encodedPayload, secret)

  if (!signaturesMatch(signature, expectedSignature)) {
    throw new BookingError('That booking session is invalid.', {
      status: 403,
      code: 'INVALID_LEAD_TOKEN',
    })
  }

  let payload

  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload))
  } catch {
    throw new BookingError('That booking session is invalid.', {
      status: 403,
      code: 'INVALID_LEAD_TOKEN',
    })
  }

  if (payload?.v !== TOKEN_VERSION || !payload?.lead || !payload?.exp) {
    throw new BookingError('That booking session is invalid.', {
      status: 403,
      code: 'INVALID_LEAD_TOKEN',
    })
  }

  if (new Date(payload.exp).getTime() <= new Date(now).getTime()) {
    throw new BookingError(
      'Your booking session has expired. Please resubmit the intake.',
      {
        status: 404,
        code: 'EXPIRED_LEAD_TOKEN',
      }
    )
  }

  return payload
}
