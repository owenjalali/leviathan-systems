import { createRouteHandler } from '../../../src/server/booking/http.js'
import { getBookingRouteContext } from '../../../src/server/booking/routeContext.js'

export default createRouteHandler({
  method: 'POST',
  handler: async ({ body }) => {
    const { api } = getBookingRouteContext()

    return api.getManageContext(body)
  },
})
