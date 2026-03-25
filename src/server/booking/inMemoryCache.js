function createEntry(value, ttlMs) {
  return {
    value,
    expiresAt: Date.now() + ttlMs,
  }
}

export function createInMemoryCache({ ttlMs }) {
  const values = new Map()
  const inflight = new Map()

  function pruneExpiredEntries() {
    const now = Date.now()

    for (const [key, entry] of values.entries()) {
      if (entry.expiresAt <= now) {
        values.delete(key)
      }
    }
  }

  function get(key) {
    pruneExpiredEntries()
    const entry = values.get(key)
    return entry ? entry.value : undefined
  }

  function set(key, value) {
    values.set(key, createEntry(value, ttlMs))
    return value
  }

  async function getOrLoad(key, loadValue) {
    const cachedValue = get(key)

    if (cachedValue !== undefined) {
      return cachedValue
    }

    if (inflight.has(key)) {
      return inflight.get(key)
    }

    const pending = Promise.resolve()
      .then(loadValue)
      .then((value) => set(key, value))
      .finally(() => {
        inflight.delete(key)
      })

    inflight.set(key, pending)

    return pending
  }

  function deleteKey(key) {
    values.delete(key)
    inflight.delete(key)
  }

  function deleteWhere(predicate) {
    for (const key of values.keys()) {
      if (predicate(key)) {
        values.delete(key)
      }
    }

    for (const key of inflight.keys()) {
      if (predicate(key)) {
        inflight.delete(key)
      }
    }
  }

  function clear() {
    values.clear()
    inflight.clear()
  }

  function getStats() {
    pruneExpiredEntries()

    return {
      ttlMs,
      entryCount: values.size,
      inflightCount: inflight.size,
    }
  }

  return {
    get,
    set,
    getOrLoad,
    delete: deleteKey,
    deleteWhere,
    clear,
    getStats,
  }
}
