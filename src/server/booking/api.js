import {
  auditSchema,
  buildFieldErrors,
  normalizeAuditSubmission,
} from '../../../shared/auditSchema.js'
import {
  BOOKING_ENV_REQUIREMENTS,
  assertEnvKeys,
  getMissingEnvKeys,
  loadBookingEnv,
} from './env.js'
import { BookingError, createValidationError } from './errors.js'
import {
  appendEventAuditTrail,
  buildBookingStateFromEvent,
  buildLifecycleNotificationPayload,
  buildManageUrls,
  createBookingEventId,
  extractEventSlot,
  extractPrivateBookingMetadata,
} from './eventPayload.js'
import { verifyLeadToken, signLeadToken } from './leadToken.js'
import {
  buildAvailabilityResponse,
  buildBookingPolicy,
  buildContactSummary,
  excludeBusyRangeForSlot,
  findBookableSlot,
  parseMonthKey,
  removeSlotFromAvailability,
  slotStartsMatch,
  toPublicBookingPolicy,
} from './policy.js'
import { createAvailabilityCacheKey, getAvailabilityCacheStats, loadCachedAvailability, clearAvailabilityCache } from './availabilityCache.js'
import {
  clearManageContextCache,
  createManageContextCacheKey,
  getManageContextCacheStats,
  loadCachedManageContext,
} from './manageContextCache.js'
import { buildManagePermissions, assertManageActionAllowed } from './managePolicy.js'
import {
  createManageTokenSet,
  hashManageToken,
  normalizeManageActor,
  verifyManageToken,
} from './manageTokens.js'
import { sendLifecycleEmails } from './notifications.js'
import {
  assertBookingMutationRateLimit,
  assertManageMutationRateLimit,
} from './rateLimit.js'
import { getSlotLockStats, withSlotLock } from './slotLock.js'

const GOOGLE_CONFIG_KEYS = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REFRESH_TOKEN',
]

const MANAGE_CONFIG_KEYS = [
  'BOOKING_MANAGE_BASE_URL',
  'BOOKING_MANAGE_TOKEN_SECRET',
]

function buildSlotConflictError() {
  return new BookingError(
    'That slot has already been taken. Please choose another one.',
    {
      status: 409,
      code: 'STALE_SLOT',
    }
  )
}

function buildMissingBookingError() {
  return new BookingError('That booking could not be found.', {
    status: 404,
    code: 'BOOKING_NOT_FOUND',
  })
}

function ensureReason(reason) {
  const normalizedReason = String(reason || '').trim()

  if (!normalizedReason) {
    throw new BookingError('Enter a reason before submitting this change.', {
      status: 422,
      code: 'REASON_REQUIRED',
      fieldErrors: {
        reason: 'A reason is required.',
      },
    })
  }

  return normalizedReason
}

function getNotificationDispatchMode({
  triggerReady,
  smtpReady,
}) {
  if (triggerReady && smtpReady) {
    return 'trigger_primary_with_smtp_fallback'
  }

  if (triggerReady) {
    return 'trigger_only_without_sync_fallback'
  }

  if (smtpReady) {
    return 'smtp_only_immediate'
  }

  return 'disabled'
}

function clearMutationState(eventId) {
  clearAvailabilityCache()
  clearManageContextCache(eventId)
}

export function createBookingApi({
  env = loadBookingEnv(),
  calendarGateway,
  smtpGateway = null,
  triggerClient,
  verifyGoogleAccess = async () => false,
  verifySmtpAccess = async () => false,
  now = () => new Date(),
  logger = console,
}) {
  const bookingPolicy = buildBookingPolicy(env)

  function getActorTokenHash(metadata, actor) {
    return actor === 'client' ? metadata.clientTokenHash : metadata.ownerTokenHash
  }

  function buildCurrentManageUrls({
    eventId,
    metadata,
    actor,
    token,
  }) {
    return buildManageUrls({
      baseUrl: env.bookingManageBaseUrl,
      eventId,
      clientToken:
        metadata.clientToken || (actor === 'client' ? token : ''),
      ownerToken:
        metadata.ownerToken || (actor === 'owner' ? token : ''),
    })
  }

  function getPublicHealthStatus() {
    const bookingReady = getMissingEnvKeys(
      env,
      BOOKING_ENV_REQUIREMENTS.booking
    ).length === 0
    const notificationsReady = getMissingEnvKeys(
      env,
      BOOKING_ENV_REQUIREMENTS.notifications
    ).length === 0
    const triggerReady = getMissingEnvKeys(
      env,
      BOOKING_ENV_REQUIREMENTS.trigger
    ).length === 0
    const manageReady = getMissingEnvKeys(env, MANAGE_CONFIG_KEYS).length === 0

    return bookingReady && notificationsReady && triggerReady && manageReady
      ? 'ok'
      : 'degraded'
  }

  async function dispatchLifecycleNotification(payload) {
    const smtpReady =
      getMissingEnvKeys(env, BOOKING_ENV_REQUIREMENTS.notifications).length === 0 &&
      Boolean(smtpGateway)
    const triggerReady =
      getMissingEnvKeys(env, BOOKING_ENV_REQUIREMENTS.trigger).length === 0 &&
      Boolean(triggerClient?.enqueueBookingLifecycleNotification)

    if (triggerReady) {
      try {
        await triggerClient.enqueueBookingLifecycleNotification(payload)
        return 'queued'
      } catch (error) {
        logger.error?.(
          'Trigger.dev enqueue failed after booking mutation succeeded.',
          error
        )
      }
    }

    if (smtpReady) {
      try {
        await sendLifecycleEmails(payload, {
          smtpGateway,
          appBaseUrl: env.appBaseUrl,
        })
        return 'smtp_fallback'
      } catch (error) {
        logger.error?.(
          'SMTP fallback failed after booking mutation succeeded.',
          error
        )
      }
    }

    return 'skipped'
  }

  async function loadManagedEvent({
    eventId,
    actor,
    token,
  }) {
    const normalizedActor = normalizeManageActor(actor)
    const event = await calendarGateway.getEvent(eventId, {
      allowMissing: true,
    })

    if (!event) {
      throw buildMissingBookingError()
    }

    const metadata = extractPrivateBookingMetadata(event)

    verifyManageToken({
      eventId,
      actor: normalizedActor,
      token,
      secret: env.bookingManageTokenSecret,
      expectedHash: getActorTokenHash(metadata, normalizedActor),
    })

    const slot = extractEventSlot(event, bookingPolicy.timezone)
    const permissions = buildManagePermissions({
      actor: normalizedActor,
      eventStatus: event.status || 'confirmed',
      slotStartIso: slot.startIso,
      timezone: bookingPolicy.timezone,
      selfServiceCutoffMinutes: env.bookingSelfServiceCutoffMinutes,
      now: now(),
    })

    return {
      actor: normalizedActor,
      event,
      metadata,
      slot,
      permissions,
    }
  }

  async function buildManageContextResponse({
    eventId,
    actor,
    token,
    month,
  }) {
    const monthKey = month || ''
    const tokenHash = hashManageToken({
      eventId,
      actor,
      token,
      secret: env.bookingManageTokenSecret,
    })

    return loadCachedManageContext(
      createManageContextCacheKey({
        eventId,
        actor,
        monthKey: monthKey || 'current',
        tokenHash,
      }),
      async () => {
        const managedEvent = await loadManagedEvent({
          eventId,
          actor,
          token,
        })
        const activeMonthKey = monthKey || managedEvent.slot.startIso.slice(0, 7)
        const monthStart = parseMonthKey(activeMonthKey, bookingPolicy.timezone)
        const busyRanges = excludeBusyRangeForSlot(
          await calendarGateway.queryBusyRanges({
            timeMin: monthStart.toISO(),
            timeMax: monthStart.plus({ months: 1 }).toISO(),
          }),
          managedEvent.slot
        )
        const availability = removeSlotFromAvailability(
          buildAvailabilityResponse({
            monthKey: activeMonthKey,
            policy: bookingPolicy,
            busyRanges,
            now: now(),
          }),
          managedEvent.slot.startIso
        )

        return {
          actor: managedEvent.actor,
          eventStatus: managedEvent.event.status || 'confirmed',
          booking: buildBookingStateFromEvent({
            event: managedEvent.event,
            policy: bookingPolicy,
          }),
          permissions: {
            canCancel: managedEvent.permissions.canCancel,
            canReschedule: managedEvent.permissions.canReschedule,
          },
          lockedReason: managedEvent.permissions.lockedReason,
          availability,
        }
      }
    )
  }

  return {
    async submitLead(payload) {
      assertEnvKeys(
        env,
        BOOKING_ENV_REQUIREMENTS.lead,
        'Lead intake is not configured yet.'
      )

      const parsed = auditSchema.safeParse(payload)

      if (!parsed.success) {
        throw createValidationError(
          'Please review the required fields and try again.',
          buildFieldErrors(parsed.error)
        )
      }

      const normalizedLead = normalizeAuditSubmission(parsed.data)

      return {
        leadToken: signLeadToken({
          lead: normalizedLead,
          secret: env.auditLeadTokenSecret,
          issuedAt: now(),
          ttlMinutes: env.leadTokenTtlMinutes,
        }),
        contactSummary: buildContactSummary(normalizedLead),
        bookingPolicy: toPublicBookingPolicy(bookingPolicy),
      }
    },

    async loadAvailability({ month, leadToken }) {
      assertEnvKeys(
        env,
        BOOKING_ENV_REQUIREMENTS.availability,
        'Availability is not configured yet.'
      )

      verifyLeadToken(leadToken, {
        secret: env.auditLeadTokenSecret,
        now: now(),
      })

      parseMonthKey(month, bookingPolicy.timezone)

      return loadCachedAvailability(
        createAvailabilityCacheKey({
          monthKey: month,
          timezone: bookingPolicy.timezone,
        }),
        async () => {
          const monthStart = parseMonthKey(month, bookingPolicy.timezone)
          const busyRanges = await calendarGateway.queryBusyRanges({
            timeMin: monthStart.toISO(),
            timeMax: monthStart.plus({ months: 1 }).toISO(),
          })

          return buildAvailabilityResponse({
            monthKey: month,
            policy: bookingPolicy,
            busyRanges,
            now: now(),
          })
        }
      )
    },

    async bookSlot({
      leadToken,
      slotStartIso,
      clientKey = 'unknown',
    }) {
      assertBookingMutationRateLimit(clientKey)
      assertEnvKeys(
        env,
        BOOKING_ENV_REQUIREMENTS.booking,
        'Booking is not configured yet.'
      )

      const verifiedLeadToken = verifyLeadToken(leadToken, {
        secret: env.auditLeadTokenSecret,
        now: now(),
      })
      const lead = verifiedLeadToken.lead
      const slot = findBookableSlot({
        slotStartIso,
        policy: bookingPolicy,
        now: now(),
      })

      if (!slot) {
        throw buildSlotConflictError()
      }

      return withSlotLock(slot.startIso, async () => {
        const slotIsFree = await calendarGateway.isSlotFree({
          slotStartIso: slot.startIso,
          slotEndIso: slot.endIso,
        })

        if (!slotIsFree) {
          throw buildSlotConflictError()
        }

        const eventId = createBookingEventId()
        const manageTokens = createManageTokenSet({
          eventId,
          secret: env.bookingManageTokenSecret,
        })
        const manageUrls = buildManageUrls({
          baseUrl: env.bookingManageBaseUrl,
          eventId,
          clientToken: manageTokens.client.token,
          ownerToken: manageTokens.owner.token,
        })
        const event = await calendarGateway.createEvent({
          eventId,
          lead,
          slot,
          policy: bookingPolicy,
          manageTokens: {
            client: manageTokens.client.token,
            owner: manageTokens.owner.token,
          },
          manageTokenHashes: {
            client: manageTokens.client.hash,
            owner: manageTokens.owner.hash,
          },
          sendUpdates: env.bookingGoogleSendUpdates,
        })
        const overlaps = await calendarGateway.listEventsOverlappingSlot({
          slotStartIso: slot.startIso,
          slotEndIso: slot.endIso,
          excludeEventId: event.id,
        })

        if (overlaps.length > 0) {
          try {
            await calendarGateway.cancelEvent({
              eventId: event.id,
              existingEvent: event,
              description: appendEventAuditTrail(event.description, {
                timestampIso: now().toISOString(),
                actor: 'system',
                action: 'reverted',
                reason: 'Overlap detected immediately after create.',
              }),
              privateMetadata: event.extendedProperties?.private || {},
              sendUpdates: 'none',
            })
          } catch (error) {
            logger.error?.('Failed to roll back overlapping booking insert.', error)
          }

          throw buildSlotConflictError()
        }

        clearMutationState(event.id)

        const notificationPayload = buildLifecycleNotificationPayload({
          kind: 'booked',
          event,
          env,
          policy: bookingPolicy,
          manageUrls,
        })
        const notificationDelivery = await dispatchLifecycleNotification(
          notificationPayload
        )
        const bookingState = buildBookingStateFromEvent({
          event,
          policy: bookingPolicy,
        })

        return {
          booking: bookingState,
          googleEventId: event.id,
          meetingUrl: bookingState.meetingUrl,
          contactSummary: buildContactSummary(lead),
          clientManageUrl: manageUrls.client,
          ownerManageUrl: manageUrls.owner,
          actorManageUrl: manageUrls.client,
          notificationDelivery,
          notificationsQueued: notificationDelivery === 'queued',
        }
      })
    },

    async getManageContext({
      eventId,
      actor,
      token,
      month,
    }) {
      assertEnvKeys(
        env,
        BOOKING_ENV_REQUIREMENTS.manage,
        'Manage links are not configured yet.'
      )

      if (!eventId) {
        throw new BookingError('That booking could not be found.', {
          status: 404,
          code: 'BOOKING_NOT_FOUND',
        })
      }

      return buildManageContextResponse({
        eventId,
        actor,
        token,
        month,
      })
    },

    async cancelBooking({
      eventId,
      actor,
      token,
      reason,
      clientKey = 'unknown',
    }) {
      assertManageMutationRateLimit(clientKey)
      assertEnvKeys(
        env,
        BOOKING_ENV_REQUIREMENTS.manage,
        'Manage links are not configured yet.'
      )

      const normalizedReason = ensureReason(reason)
      const managedEvent = await loadManagedEvent({
        eventId,
        actor,
        token,
      })

      assertManageActionAllowed({
        permissions: managedEvent.permissions,
        action: 'cancel',
      })

      const nextPrivateMetadata = {
        ...managedEvent.event.extendedProperties?.private,
        ...(managedEvent.actor === 'client'
          ? { clientToken: token }
          : { ownerToken: token }),
      }
      const manageUrls = buildCurrentManageUrls({
        eventId,
        metadata: {
          ...managedEvent.metadata,
          ...nextPrivateMetadata,
        },
        actor: managedEvent.actor,
        token,
      })
      const nextDescription = appendEventAuditTrail(
        managedEvent.event.description,
        {
          timestampIso: now().toISOString(),
          actor: managedEvent.actor,
          action: 'cancelled',
          reason: normalizedReason,
        }
      )

      await calendarGateway.cancelEvent({
        eventId,
        existingEvent: managedEvent.event,
        description: nextDescription,
        privateMetadata: nextPrivateMetadata,
        sendUpdates: env.bookingGoogleSendUpdates,
      })

      const refreshedEvent =
        (await calendarGateway.getEvent(eventId, {
          allowMissing: true,
        })) || {
          ...managedEvent.event,
          status: 'cancelled',
          description: nextDescription,
          extendedProperties: {
            private: nextPrivateMetadata,
          },
        }

      clearMutationState(eventId)

      const notificationPayload = buildLifecycleNotificationPayload({
        kind: 'cancelled',
        event: refreshedEvent,
        env,
        policy: bookingPolicy,
        manageUrls,
        reason: normalizedReason,
        initiatedBy: managedEvent.actor,
      })
      const notificationDelivery = await dispatchLifecycleNotification(
        notificationPayload
      )
      const nextPermissions = buildManagePermissions({
        actor: managedEvent.actor,
        eventStatus: refreshedEvent.status || 'cancelled',
        slotStartIso: managedEvent.slot.startIso,
        timezone: bookingPolicy.timezone,
        selfServiceCutoffMinutes: env.bookingSelfServiceCutoffMinutes,
        now: now(),
      })

      return {
        actor: managedEvent.actor,
        eventStatus: refreshedEvent.status || 'cancelled',
        booking: buildBookingStateFromEvent({
          event: refreshedEvent,
          policy: bookingPolicy,
        }),
        permissions: {
          canCancel: nextPermissions.canCancel,
          canReschedule: nextPermissions.canReschedule,
        },
        lockedReason: nextPermissions.lockedReason,
        actorManageUrl: manageUrls[managedEvent.actor],
        notificationDelivery,
        notificationsQueued: notificationDelivery === 'queued',
      }
    },

    async rescheduleBooking({
      eventId,
      actor,
      token,
      slotStartIso,
      reason,
      clientKey = 'unknown',
    }) {
      assertManageMutationRateLimit(clientKey)
      assertEnvKeys(
        env,
        BOOKING_ENV_REQUIREMENTS.manage,
        'Manage links are not configured yet.'
      )

      const normalizedReason = ensureReason(reason)
      const managedEvent = await loadManagedEvent({
        eventId,
        actor,
        token,
      })

      assertManageActionAllowed({
        permissions: managedEvent.permissions,
        action: 'reschedule',
      })

      if (
        slotStartsMatch(
          slotStartIso,
          managedEvent.slot.startIso,
          bookingPolicy.timezone
        )
      ) {
        throw new BookingError('Choose a new slot before rescheduling.', {
          status: 422,
          code: 'CURRENT_SLOT',
          fieldErrors: {
            slotStartIso: 'Select a different slot.',
          },
        })
      }

      const nextSlot = findBookableSlot({
        slotStartIso,
        policy: bookingPolicy,
        now: now(),
      })

      if (!nextSlot) {
        throw buildSlotConflictError()
      }

      return withSlotLock(nextSlot.startIso, async () => {
        const slotIsFree = await calendarGateway.isSlotFree({
          slotStartIso: nextSlot.startIso,
          slotEndIso: nextSlot.endIso,
        })

        if (!slotIsFree) {
          throw buildSlotConflictError()
        }

        const nextPrivateMetadata = {
          ...managedEvent.event.extendedProperties?.private,
          ...(managedEvent.actor === 'client'
            ? { clientToken: token }
            : { ownerToken: token }),
        }
        const manageUrls = buildCurrentManageUrls({
          eventId,
          metadata: {
            ...managedEvent.metadata,
            ...nextPrivateMetadata,
          },
          actor: managedEvent.actor,
          token,
        })
        const nextDescription = appendEventAuditTrail(
          managedEvent.event.description,
          {
            timestampIso: now().toISOString(),
            actor: managedEvent.actor,
            action: 'rescheduled',
            reason: normalizedReason,
          }
        )
        const updatedEvent = await calendarGateway.patchEvent({
          eventId,
          existingEvent: managedEvent.event,
          sendUpdates: env.bookingGoogleSendUpdates,
          updates: {
            start: {
              dateTime: nextSlot.startIso,
              timeZone: bookingPolicy.timezone,
            },
            end: {
              dateTime: nextSlot.endIso,
              timeZone: bookingPolicy.timezone,
            },
            description: nextDescription,
            extendedProperties: {
              private: nextPrivateMetadata,
            },
          },
        })
        const overlaps = await calendarGateway.listEventsOverlappingSlot({
          slotStartIso: nextSlot.startIso,
          slotEndIso: nextSlot.endIso,
          excludeEventId: eventId,
        })

        if (overlaps.length > 0) {
          try {
            await calendarGateway.patchEvent({
              eventId,
              existingEvent: updatedEvent,
              sendUpdates: 'none',
              updates: {
                start: managedEvent.event.start,
                end: managedEvent.event.end,
                description: managedEvent.event.description,
                extendedProperties: {
                  private: managedEvent.event.extendedProperties?.private || {},
                },
              },
            })
          } catch (error) {
            logger.error?.('Failed to roll back overlapping reschedule.', error)
          }

          throw buildSlotConflictError()
        }

        clearMutationState(eventId)

        const notificationPayload = buildLifecycleNotificationPayload({
          kind: 'rescheduled',
          event: updatedEvent,
          env,
          policy: bookingPolicy,
          manageUrls,
          previousSlotStartIso: managedEvent.slot.startIso,
          reason: normalizedReason,
          initiatedBy: managedEvent.actor,
        })
        const notificationDelivery = await dispatchLifecycleNotification(
          notificationPayload
        )
        const nextPermissions = buildManagePermissions({
          actor: managedEvent.actor,
          eventStatus: updatedEvent.status || 'confirmed',
          slotStartIso: nextSlot.startIso,
          timezone: bookingPolicy.timezone,
          selfServiceCutoffMinutes: env.bookingSelfServiceCutoffMinutes,
          now: now(),
        })

        return {
          actor: managedEvent.actor,
          eventStatus: updatedEvent.status || 'confirmed',
          booking: buildBookingStateFromEvent({
            event: updatedEvent,
            policy: bookingPolicy,
          }),
          permissions: {
            canCancel: nextPermissions.canCancel,
            canReschedule: nextPermissions.canReschedule,
          },
          lockedReason: nextPermissions.lockedReason,
          actorManageUrl: manageUrls[managedEvent.actor],
          notificationDelivery,
          notificationsQueued: notificationDelivery === 'queued',
        }
      })
    },

    getPublicHealth() {
      return {
        status: getPublicHealthStatus(),
      }
    },

    async getHealthDiagnostics() {
      const googleMissing = getMissingEnvKeys(env, GOOGLE_CONFIG_KEYS)
      const smtpMissing = getMissingEnvKeys(env, BOOKING_ENV_REQUIREMENTS.notifications)
      const triggerMissing = getMissingEnvKeys(env, BOOKING_ENV_REQUIREMENTS.trigger)
      const manageMissing = getMissingEnvKeys(env, MANAGE_CONFIG_KEYS)
      const bookingMissing = getMissingEnvKeys(env, BOOKING_ENV_REQUIREMENTS.booking)

      let googleAuthReady = false
      let googleAuthError = null
      let smtpAuthReady = false
      let smtpAuthError = null

      if (googleMissing.length === 0) {
        try {
          googleAuthReady = Boolean(await verifyGoogleAccess())
        } catch (error) {
          googleAuthError = error?.message || 'Google access token refresh failed.'
        }
      }

      if (smtpMissing.length === 0) {
        try {
          smtpAuthReady = Boolean(await verifySmtpAccess())
        } catch (error) {
          smtpAuthError = error?.message || 'SMTP verify failed.'
        }
      }

      const triggerReady = triggerMissing.length === 0
      const smtpReady = smtpMissing.length === 0 && smtpAuthReady
      const manageReady = manageMissing.length === 0

      return {
        status:
          googleAuthReady && smtpReady && triggerReady && manageReady ? 'ok' : 'degraded',
        checkedAt: now().toISOString(),
        booking: {
          configReady: bookingMissing.length === 0,
          appBaseUrlPresent: Boolean(env.appBaseUrl),
          manageBaseUrlPresent: Boolean(env.bookingManageBaseUrl),
          leadTokenSecretPresent: Boolean(env.auditLeadTokenSecret),
          manageTokenSecretPresent: Boolean(env.bookingManageTokenSecret),
          policy: toPublicBookingPolicy(bookingPolicy),
          selfServiceCutoffMinutes: env.bookingSelfServiceCutoffMinutes,
          googleSendUpdates: env.bookingGoogleSendUpdates,
          reminderLeadMinutes: env.reminderLeadMinutes,
        },
        google: {
          configReady: googleMissing.length === 0,
          clientIdPresent: Boolean(env.googleClientId),
          clientSecretPresent: Boolean(env.googleClientSecret),
          refreshTokenPresent: Boolean(env.googleRefreshToken),
          calendarId: env.googleCalendarId || 'primary',
          organizerEmailPresent: Boolean(env.googleOrganizerEmail),
          authReady: googleAuthReady,
          authError: googleAuthError,
          missing: googleMissing,
        },
        smtp: {
          configReady: smtpMissing.length === 0,
          hostPresent: Boolean(env.smtpHost),
          fromPresent: Boolean(env.smtpFrom),
          replyToPresent: Boolean(env.smtpReplyTo),
          ownerEmail: env.bookingOwnerEmail || env.googleOrganizerEmail || null,
          authReady: smtpAuthReady,
          authError: smtpAuthError,
          missing: smtpMissing,
        },
        trigger: {
          secretKeyPresent: Boolean(env.triggerSecretKey),
          projectRefPresent: Boolean(env.triggerProjectRef),
          ready: triggerReady,
          missing: triggerMissing,
        },
        manage: {
          baseUrlPresent: Boolean(env.bookingManageBaseUrl),
          ready: manageReady,
          missing: manageMissing,
        },
        caches: {
          availability: getAvailabilityCacheStats(),
          manageContext: getManageContextCacheStats(),
        },
        slotLocks: getSlotLockStats(),
        dispatch: {
          mode: getNotificationDispatchMode({
            triggerReady,
            smtpReady,
          }),
          reminders: triggerReady ? 'trigger.dev delayed tasks' : 'unavailable',
        },
      }
    },
  }
}
