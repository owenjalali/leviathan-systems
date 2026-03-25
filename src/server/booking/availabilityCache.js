import { createInMemoryCache } from './inMemoryCache.js'

// Serverless instances do not share this cache, so it only speeds up warm-instance reads.
const availabilityCache = createInMemoryCache({
  ttlMs: 30_000,
})

export function createAvailabilityCacheKey({ monthKey, timezone }) {
  return `${timezone}:${monthKey}`
}

export function getCachedAvailability(key) {
  return availabilityCache.get(key)
}

export function loadCachedAvailability(key, loader) {
  return availabilityCache.getOrLoad(key, loader)
}

export function clearAvailabilityCache() {
  availabilityCache.clear()
}

export function getAvailabilityCacheStats() {
  return availabilityCache.getStats()
}
