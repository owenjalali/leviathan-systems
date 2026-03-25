import { BookingError } from './errors.js'

function createSlidingWindowRateLimiter({ windowMs, maxHits }) {
  const buckets = new Map()

  // This limiter is per-instance only, so distributed protection must come from upstream infrastructure.
  function pruneBucket(key) {
    const now = Date.now()
    const entries = buckets.get(key) || []
    const nextEntries = entries.filter((value) => value > now - windowMs)

    if (nextEntries.length === 0) {
      buckets.delete(key)
      return []
    }

    buckets.set(key, nextEntries)
    return nextEntries
  }

  function assertAllowed(key) {
    const entries = pruneBucket(key)

    if (entries.length >= maxHits) {
      throw new BookingError(
        'Too many booking changes were submitted from this connection. Please wait a moment and try again.',
        {
          status: 429,
          code: 'RATE_LIMITED',
        }
      )
    }

    entries.push(Date.now())
    buckets.set(key, entries)
  }

  function reset() {
    buckets.clear()
  }

  return {
    assertAllowed,
    reset,
  }
}

const mutationRateLimiter = createSlidingWindowRateLimiter({
  windowMs: 60_000,
  maxHits: 8,
})

export function assertBookingMutationRateLimit(clientKey) {
  mutationRateLimiter.assertAllowed(`booking:${clientKey || 'unknown'}`)
}

export function assertManageMutationRateLimit(clientKey) {
  mutationRateLimiter.assertAllowed(`manage:${clientKey || 'unknown'}`)
}

export function resetMutationRateLimiter() {
  mutationRateLimiter.reset()
}
