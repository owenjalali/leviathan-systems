const DEFAULT_SLOT_LOCK_TTL_MS = 15_000
const slotQueues = new Map()
const activeLocks = new Map()

// Slot locks only coordinate concurrent mutations inside the current instance;
// the post-write overlap rollback remains the correctness layer across instances.
function deleteIfCurrent(map, key, value) {
  if (map.get(key) === value) {
    map.delete(key)
  }
}

export async function withSlotLock(slotKey, handler) {
  const previousGate = slotQueues.get(slotKey)
  let releaseGate
  const currentGate = new Promise((resolve) => {
    releaseGate = resolve
  })

  slotQueues.set(slotKey, currentGate)

  if (previousGate) {
    await previousGate.catch(() => {})
  }

  activeLocks.set(slotKey, {
    expiresAt: Date.now() + DEFAULT_SLOT_LOCK_TTL_MS,
  })

  try {
    return await handler()
  } finally {
    activeLocks.delete(slotKey)
    deleteIfCurrent(slotQueues, slotKey, currentGate)
    releaseGate()
  }
}

export function clearSlotLocks() {
  slotQueues.clear()
  activeLocks.clear()
}

export function getSlotLockStats() {
  const now = Date.now()

  for (const [slotKey, lock] of activeLocks.entries()) {
    if (lock.expiresAt <= now) {
      activeLocks.delete(slotKey)
    }
  }

  return {
    ttlMs: DEFAULT_SLOT_LOCK_TTL_MS,
    activeCount: activeLocks.size,
  }
}
