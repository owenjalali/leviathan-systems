import assert from 'node:assert/strict'
import test from 'node:test'
import availabilityRoute from '../../../api/audit/availability.js'
import manageContextRoute from '../../../api/audit/manage/context.js'
import healthRoute from '../../../api/health/booking.js'
import { BookingError } from '../../../src/server/booking/errors.js'
import {
  resetBookingRouteContextFactoryForTests,
  setBookingRouteContextFactoryForTests,
} from '../../../src/server/booking/routeContext.js'

function createResponseCapture() {
  return {
    headers: {},
    statusCode: 200,
    body: '',
    setHeader(name, value) {
      this.headers[name] = value
    },
    end(value) {
      this.body = value
    },
  }
}

async function invokeRoute(
  handler,
  {
    method = 'GET',
    url = '/',
    headers = {},
    body,
  } = {}
) {
  const req = {
    method,
    url,
    headers,
    body,
  }
  const res = createResponseCapture()

  await handler(req, res)

  return {
    status: res.statusCode,
    headers: res.headers,
    body: res.body ? JSON.parse(res.body) : null,
  }
}

test.afterEach(() => {
  resetBookingRouteContextFactoryForTests()
  delete process.env.HEALTH_SECRET
})

test('public health stays minimal while x-health-key unlocks diagnostics', async () => {
  process.env.HEALTH_SECRET = 'health-secret'
  setBookingRouteContextFactoryForTests(() => ({
    api: {
      getPublicHealth() {
        return { status: 'ok' }
      },
      async getHealthDiagnostics() {
        return {
          status: 'ok',
          booking: {
            configReady: true,
          },
          trigger: {
            ready: true,
          },
        }
      },
    },
  }))

  const publicResponse = await invokeRoute(healthRoute, {
    url: '/api/health/booking',
  })
  const authenticatedResponse = await invokeRoute(healthRoute, {
    url: '/api/health/booking',
    headers: {
      'x-health-key': 'health-secret',
    },
  })

  assert.equal(publicResponse.status, 200)
  assert.deepEqual(publicResponse.body, {
    status: 'ok',
  })
  assert.equal(authenticatedResponse.status, 200)
  assert.deepEqual(authenticatedResponse.body, {
    status: 'ok',
    booking: {
      configReady: true,
    },
    trigger: {
      ready: true,
    },
  })
})

test('availability route accepts POST JSON bodies', async () => {
  setBookingRouteContextFactoryForTests(() => ({
    api: {
      async loadAvailability(payload) {
        return {
          accepted: payload,
        }
      },
    },
  }))

  const response = await invokeRoute(availabilityRoute, {
    method: 'POST',
    url: '/api/audit/availability',
    body: JSON.stringify({
      month: '2026-03',
      leadToken: 'lead-token',
    }),
  })

  assert.equal(response.status, 200)
  assert.deepEqual(response.body, {
    accepted: {
      month: '2026-03',
      leadToken: 'lead-token',
    },
  })
})

test('manage context route accepts POST JSON bodies', async () => {
  setBookingRouteContextFactoryForTests(() => ({
    api: {
      async getManageContext(payload) {
        return {
          accepted: payload,
        }
      },
    },
  }))

  const response = await invokeRoute(manageContextRoute, {
    method: 'POST',
    url: '/api/audit/manage/context',
    body: JSON.stringify({
      eventId: 'audit20260302t153000utc',
      actor: 'client',
      token: 'manage-token',
      month: '2026-03',
    }),
  })

  assert.equal(response.status, 200)
  assert.deepEqual(response.body, {
    accepted: {
      eventId: 'audit20260302t153000utc',
      actor: 'client',
      token: 'manage-token',
      month: '2026-03',
    },
  })
})

test('route errors hide details from clients and keep structured server logs', async () => {
  const loggedErrors = []
  const originalConsoleError = console.error

  console.error = (...args) => {
    loggedErrors.push(args)
  }

  try {
    setBookingRouteContextFactoryForTests(() => ({
      api: {
        async loadAvailability() {
          throw new BookingError(
            'BOOKING_DAY_END must be after BOOKING_DAY_START.',
            {
              status: 503,
              code: 'CONFIGURATION_ERROR',
              details: {
                key: 'BOOKING_DAY_END',
                missing: ['GOOGLE_CLIENT_ID'],
              },
            }
          )
        },
      },
    }))

    const response = await invokeRoute(availabilityRoute, {
      method: 'POST',
      url: '/api/audit/availability',
      body: JSON.stringify({
        month: '2026-03',
        leadToken: 'lead-token',
      }),
    })

    assert.equal(response.status, 503)
    assert.deepEqual(response.body, {
      message: 'Booking is not configured yet.',
      code: 'CONFIGURATION_ERROR',
    })
    assert.equal(loggedErrors.length, 1)
    assert.equal(loggedErrors[0][0], 'Booking route error.')
    assert.deepEqual(loggedErrors[0][1].details, {
      key: 'BOOKING_DAY_END',
      missing: ['GOOGLE_CLIENT_ID'],
    })
  } finally {
    console.error = originalConsoleError
  }
})
