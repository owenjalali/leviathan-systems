import {
  createRouteHandler,
  getRequestClientKey,
} from '../../src/server/booking/http.js'
import { getBookingRouteContext } from '../../src/server/booking/routeContext.js'

export default createRouteHandler({
  method: 'POST',
  handler: async ({ body, req }) => {
    const { api } = getBookingRouteContext()
    const result = await api.bookSlot({
      ...body,
      clientKey: getRequestClientKey(req),
    })

    return {
      ...result,
      ownerManageUrl: undefined,
      actorManageUrl: undefined,
    }
  },
})
