export class BookingError extends Error {
  constructor(
    message,
    {
      status = 500,
      code = 'BOOKING_ERROR',
      fieldErrors,
      details,
      expose = true,
      cause,
    } = {}
  ) {
    super(message, cause ? { cause } : undefined)
    this.name = 'BookingError'
    this.status = status
    this.code = code
    this.fieldErrors = fieldErrors
    this.details = details
    this.expose = expose
  }
}

export function createValidationError(message, fieldErrors) {
  return new BookingError(message, {
    status: 422,
    code: 'VALIDATION_ERROR',
    fieldErrors,
  })
}

export function createConfigurationError(
  missing,
  message = 'Booking is not configured yet.'
) {
  return new BookingError(message, {
    status: 503,
    code: 'CONFIGURATION_ERROR',
    details: { missing },
  })
}

export function normalizeError(error) {
  if (error instanceof BookingError) {
    return error
  }

  if (error?.name === 'ZodError') {
    return new BookingError('Please review the required fields and try again.', {
      status: 422,
      code: 'VALIDATION_ERROR',
    })
  }

  return new BookingError('Booking service failed. Please try again.', {
    status: 500,
    code: 'INTERNAL_ERROR',
    expose: false,
    cause: error,
  })
}

export function toErrorBody(error) {
  const normalized = normalizeError(error)
  const message =
    !normalized.expose
      ? 'Booking service failed. Please try again.'
      : normalized.code === 'CONFIGURATION_ERROR'
        ? 'Booking is not configured yet.'
        : normalized.message
  const body = {
    message,
    code: normalized.code,
  }

  if (normalized.fieldErrors) {
    body.fieldErrors = normalized.fieldErrors
  }

  return body
}
