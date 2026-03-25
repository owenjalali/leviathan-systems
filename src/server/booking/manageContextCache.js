import { createInMemoryCache } from './inMemoryCache.js'

// Serverless instances do not share this cache, so it only speeds up warm-instance manage lookups.
const manageContextCache = createInMemoryCache({
  ttlMs: 30_000,
})

export function createManageContextCacheKey({
  eventId,
  actor,
  monthKey,
  tokenHash,
}) {
  return `${eventId}:${actor}:${monthKey}:${tokenHash}`
}

export function loadCachedManageContext(key, loader) {
  // Cross-instance serverless traffic can read stale confirmed state immediately
  // after a cancel or reschedule, so manage-context reads bypass the warm cache.
  return loader()
}

export function clearManageContextCache(eventId) {
  if (!eventId) {
    manageContextCache.clear()
    return
  }

  manageContextCache.deleteWhere((key) => key.startsWith(`${eventId}:`))
}

export function getManageContextCacheStats() {
  return manageContextCache.getStats()
}
