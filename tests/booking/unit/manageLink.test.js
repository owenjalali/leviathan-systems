import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildManageUrl,
  normalizeManageUrl,
  parseManageUrl,
} from '../../../shared/manageLink.js'

test('new manage links are issued with fragment tokens', () => {
  const manageUrl = buildManageUrl({
    baseUrl: 'https://leviathan.example',
    eventId: 'audit20260302t153000utc',
    actor: 'client',
    token: 'client-token',
  })

  assert.equal(
    manageUrl,
    'https://leviathan.example/manage-booking#eventId=audit20260302t153000utc&actor=client&token=client-token'
  )
})

test('parseManageUrl accepts both fragment and legacy query formats', () => {
  const fragmentParams = parseManageUrl(
    'https://leviathan.example/manage-booking#eventId=audit20260302t153000utc&actor=client&token=client-token'
  )
  const legacyParams = parseManageUrl(
    'https://leviathan.example/manage-booking?eventId=audit20260302t153000utc&actor=owner&token=owner-token&month=2026-03'
  )

  assert.deepEqual(fragmentParams, {
    eventId: 'audit20260302t153000utc',
    actor: 'client',
    token: 'client-token',
    month: '',
    source: 'fragment',
  })
  assert.deepEqual(legacyParams, {
    eventId: 'audit20260302t153000utc',
    actor: 'owner',
    token: 'owner-token',
    month: '2026-03',
    source: 'query',
  })
})

test('normalizeManageUrl rewrites legacy query tokens into fragment form', () => {
  const normalized = normalizeManageUrl(
    'https://leviathan.example/manage-booking?eventId=audit20260302t153000utc&actor=owner&token=owner-token&month=2026-03'
  )

  assert.equal(normalized.migrated, true)
  assert.equal(
    normalized.url,
    'https://leviathan.example/manage-booking?month=2026-03#eventId=audit20260302t153000utc&actor=owner&token=owner-token'
  )
  assert.deepEqual(normalized.manageParams, {
    eventId: 'audit20260302t153000utc',
    actor: 'owner',
    token: 'owner-token',
    month: '2026-03',
    source: 'fragment',
  })
})
