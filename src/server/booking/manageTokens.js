import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { BookingError } from './errors.js'

export const BOOKING_ACTORS = ['client', 'owner']

function assertActor(actor) {
  if (!BOOKING_ACTORS.includes(actor)) {
    throw new BookingError('Use actor=client or actor=owner.', {
      status: 422,
      code: 'INVALID_ACTOR',
    })
  }
}

function assertTokenSecret(secret) {
  if (!secret) {
    throw new BookingError('Manage links are not configured yet.', {
      status: 503,
      code: 'CONFIGURATION_ERROR',
      details: {
        missing: ['BOOKING_MANAGE_TOKEN_SECRET'],
      },
    })
  }
}

function toHexBuffer(value) {
  return Buffer.from(String(value || ''), 'hex')
}

function safeCompareHex(left, right) {
  const leftBuffer = toHexBuffer(left)
  const rightBuffer = toHexBuffer(right)

  if (leftBuffer.length === 0 || leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

export function normalizeManageActor(actor) {
  const normalized = String(actor || '').trim().toLowerCase()
  assertActor(normalized)
  return normalized
}

export function generateManageToken() {
  return randomBytes(24).toString('base64url')
}

export function hashManageToken({ eventId, actor, token, secret }) {
  assertActor(actor)
  assertTokenSecret(secret)

  return createHmac('sha256', secret)
    .update(`${eventId}:${actor}:${token}`)
    .digest('hex')
}

export function createManageTokenSet({ eventId, secret }) {
  const clientToken = generateManageToken()
  const ownerToken = generateManageToken()

  return {
    client: {
      token: clientToken,
      hash: hashManageToken({
        eventId,
        actor: 'client',
        token: clientToken,
        secret,
      }),
    },
    owner: {
      token: ownerToken,
      hash: hashManageToken({
        eventId,
        actor: 'owner',
        token: ownerToken,
        secret,
      }),
    },
  }
}

export function verifyManageToken({
  eventId,
  actor,
  token,
  secret,
  expectedHash,
}) {
  const normalizedActor = normalizeManageActor(actor)

  if (!token || !expectedHash) {
    throw new BookingError('That manage link is invalid.', {
      status: 403,
      code: 'INVALID_MANAGE_TOKEN',
    })
  }

  const actualHash = hashManageToken({
    eventId,
    actor: normalizedActor,
    token,
    secret,
  })

  if (!safeCompareHex(actualHash, expectedHash)) {
    throw new BookingError('That manage link is invalid.', {
      status: 403,
      code: 'INVALID_MANAGE_TOKEN',
    })
  }

  return normalizedActor
}
