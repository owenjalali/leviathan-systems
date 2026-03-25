import { createBookingApi } from './api.js'
import { createBookingRuntime } from './runtime.js'
import { enqueueBookingLifecycleNotification } from './trigger.js'

function createDefaultRouteContext() {
  const runtime = createBookingRuntime()

  return {
    runtime,
    api: createBookingApi({
      env: runtime.env,
      calendarGateway: runtime.calendarGateway,
      smtpGateway: runtime.smtpGateway,
      triggerClient: { enqueueBookingLifecycleNotification },
      verifyGoogleAccess: runtime.verifyGoogleAccess,
      verifySmtpAccess: runtime.verifySmtpAccess,
      logger: runtime.logger,
    }),
  }
}

let createRouteContext = createDefaultRouteContext
let cachedRouteContext

export function getBookingRouteContext() {
  if (!cachedRouteContext) {
    cachedRouteContext = createRouteContext()
  }

  return cachedRouteContext
}

export function resetBookingRouteContextCache() {
  cachedRouteContext = undefined
}

export function setBookingRouteContextFactoryForTests(factory) {
  createRouteContext = factory
  resetBookingRouteContextCache()
}

export function resetBookingRouteContextFactoryForTests() {
  createRouteContext = createDefaultRouteContext
  resetBookingRouteContextCache()
}
