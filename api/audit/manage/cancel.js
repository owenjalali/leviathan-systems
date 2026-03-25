import {
  createRouteHandler,
  getRequestClientKey,
} from '../../../src/server/booking/http.js'
import { getBookingRouteContext } from '../../../src/server/booking/routeContext.js'

export default createRouteHandler({
  method: 'POST',
  handler: async ({ body, req }) => {
    const { api } = getBookingRouteContext()

    return api.cancelBooking({
      ...body,
      clientKey: getRequestClientKey(req),
    })
  },
})
