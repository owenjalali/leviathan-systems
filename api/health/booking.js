import { timingSafeEqual } from 'node:crypto'
import { createRouteHandler } from '../../src/server/booking/http.js'
import { getBookingRouteContext } from '../../src/server/booking/routeContext.js'

function hasMatchingHealthKey(req, expectedKey) {
  const providedHeader = req?.headers?.['x-health-key']
  const providedKey = Array.isArray(providedHeader)
    ? providedHeader[0]
    : providedHeader || ''
  const expectedValue = String(expectedKey || '')
  const providedValue = String(providedKey || '')

  if (!expectedValue || !providedValue) {
    return false
  }

  const expectedBuffer = Buffer.from(expectedValue)
  const providedBuffer = Buffer.from(providedValue)

  if (expectedBuffer.length !== providedBuffer.length) {
    return false
  }

  return timingSafeEqual(expectedBuffer, providedBuffer)
}

export default createRouteHandler({
  method: 'GET',
  handler: async ({ req }) => {
    const includeDiagnostics = hasMatchingHealthKey(
      req,
      process.env.HEALTH_SECRET
    )

    try {
      const { api } = getBookingRouteContext()

      return includeDiagnostics
        ? api.getHealthDiagnostics()
        : api.getPublicHealth()
    } catch (error) {
      if (includeDiagnostics) {
        throw error
      }

      console.error?.('Booking health route fell back to degraded summary.', {
        method: req?.method || 'GET',
        path: '/api/health/booking',
        errorMessage:
          error instanceof Error ? error.message : String(error || 'Unknown error'),
      })

      return {
        status: 'degraded',
      }
    }
  },
})
