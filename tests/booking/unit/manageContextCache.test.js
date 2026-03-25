import assert from 'node:assert/strict'
import test from 'node:test'
import {
  clearManageContextCache,
  loadCachedManageContext,
} from '../../../src/server/booking/manageContextCache.js'

test('manage context reads bypass the in-memory cache', async () => {
  clearManageContextCache()

  let loads = 0
  const key = 'event:client:2026-03:hash'

  const first = await loadCachedManageContext(key, async () => {
    loads += 1
    return { loads }
  })
  const second = await loadCachedManageContext(key, async () => {
    loads += 1
    return { loads }
  })

  assert.equal(first.loads, 1)
  assert.equal(second.loads, 2)
})
