import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CalendarCheck2,
  ChevronDown,
  CircleAlert,
  Mail,
  Phone,
  RefreshCw,
  Building2,
  Trash2,
  XCircle,
} from 'lucide-react'
import {
  cancelBooking,
  getCurrentMonthKey,
  loadManageContext,
  rescheduleBooking,
} from '../lib/auditApi'
import AuditSlotPicker from '../sections/audit/AuditSlotPicker'
import {
  buildManageUrl,
  normalizeManageUrl,
  parseManageUrl,
} from '../../shared/manageLink.js'

const EMPTY_MANAGE_PARAMS = {
  eventId: '',
  actor: '',
  token: '',
}

function buildNotificationLabel(notificationDelivery) {
  if (notificationDelivery === 'queued') {
    return 'Confirmation emails are being sent.'
  }

  if (notificationDelivery === 'smtp_fallback') {
    return 'Confirmation emails have been sent.'
  }

  return 'Your booking has been updated.'
}

function hasManageParams(manageParams) {
  return Boolean(
    manageParams?.eventId && manageParams?.actor && manageParams?.token
  )
}

function getInitialManagePageState() {
  if (typeof window === 'undefined') {
    return {
      manageParams: EMPTY_MANAGE_PARAMS,
      monthFromUrl: '',
      selectedMonth: getCurrentMonthKey(),
      normalizedUrl: '',
      didNormalize: false,
    }
  }

  const normalized = normalizeManageUrl(window.location.href)
  const manageParams = normalized?.manageParams
    ? {
        eventId: normalized.manageParams.eventId,
        actor: normalized.manageParams.actor,
        token: normalized.manageParams.token,
      }
    : EMPTY_MANAGE_PARAMS
  const monthFromUrl = normalized?.month || ''

  return {
    manageParams,
    monthFromUrl,
    selectedMonth: monthFromUrl || getCurrentMonthKey(),
    normalizedUrl: normalized?.url || '',
    didNormalize: Boolean(normalized?.migrated),
  }
}

function replaceBrowserManageUrl(manageParams, monthKey) {
  if (typeof window === 'undefined' || !hasManageParams(manageParams)) {
    return
  }

  const nextUrl = buildManageUrl({
    baseUrl: window.location.origin,
    ...manageParams,
    month: monthKey,
  })

  if (!nextUrl) {
    return
  }

  const parsed = new URL(nextUrl)
  const nextPath = `${parsed.pathname}${parsed.search}${parsed.hash}`
  const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (currentPath !== nextPath) {
    window.history.replaceState(null, '', nextPath)
  }
}

function getMonthKey(isoValue) {
  return String(isoValue || '').slice(0, 7) || getCurrentMonthKey()
}

function SummaryRow({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="flex items-center gap-3 text-[13px] text-[var(--text-secondary)]">
        {Icon ? <Icon className="h-4 w-4 text-[var(--accent)]" /> : null}
        <span>{label}</span>
      </div>
      <span className="text-right text-[14px] font-semibold text-[var(--text-primary)]">
        {value}
      </span>
    </div>
  )
}

function availabilityHasSlot(availability, slotStartIso) {
  return availability?.days?.some((day) =>
    day.slots.some((slot) => slot.startIso === slotStartIso)
  )
}

function findAvailabilitySlot(availability, slotStartIso) {
  for (const day of availability?.days || []) {
    const slot = day.slots.find((entry) => entry.startIso === slotStartIso)

    if (slot) {
      return {
        day,
        slot,
      }
    }
  }

  return null
}

export default function ManageBooking() {
  const initialState = useMemo(() => getInitialManagePageState(), [])
  const [manageParams, setManageParams] = useState(initialState.manageParams)
  const [selectedMonth, setSelectedMonth] = useState(initialState.selectedMonth)
  const [context, setContext] = useState(null)
  const [panelError, setPanelError] = useState('')
  const [panelNotice, setPanelNotice] = useState('')
  const [selectedSlotIso, setSelectedSlotIso] = useState('')
  const [cancelReason, setCancelReason] = useState('')
  const [rescheduleReason, setRescheduleReason] = useState('')
  const [mutationStatus, setMutationStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isRescheduling, setIsRescheduling] = useState(false)
  const [rescheduleConfirmed, setRescheduleConfirmed] = useState(false)
  const [cancelConfirmed, setCancelConfirmed] = useState(false)
  const [showCancelSection, setShowCancelSection] = useState(false)
  const [contextRefreshKey, setContextRefreshKey] = useState(0)
  const hasAutoAdvanced = useRef(false)

  useEffect(() => {
    if (!initialState.didNormalize || !initialState.normalizedUrl || typeof window === 'undefined') {
      return
    }

    const parsed = new URL(initialState.normalizedUrl)
    window.history.replaceState(
      null,
      '',
      `${parsed.pathname}${parsed.search}${parsed.hash}`
    )
  }, [initialState])

  useEffect(() => {
    replaceBrowserManageUrl(manageParams, selectedMonth)
  }, [manageParams, selectedMonth])

  useEffect(() => {
    if (!hasManageParams(manageParams)) {
      setPanelError('This manage link is incomplete.')
      setContext(null)
      return
    }

    let isActive = true

    async function fetchContext() {
      setIsLoading(true)
      setPanelError('')

      try {
        const response = await loadManageContext({
          ...manageParams,
          month: selectedMonth,
        })

        if (!isActive) {
          return
        }

        setContext(response)
        setMutationStatus('')
      } catch (error) {
        if (!isActive) {
          return
        }

        setPanelError(
          error?.message || 'This manage link could not be loaded right now.'
        )
        setContext(null)
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void fetchContext()

    return () => {
      isActive = false
    }
  }, [contextRefreshKey, manageParams, selectedMonth])

  useEffect(() => {
    if (context?.booking?.slotStartIso) {
      const bookingMonth = getMonthKey(context.booking.slotStartIso)

      if (!initialState.monthFromUrl && selectedMonth !== bookingMonth) {
        setSelectedMonth(bookingMonth)
      }
    }
  }, [context, initialState.monthFromUrl, selectedMonth])

  useEffect(() => {
    if (!context?.availability || isLoading) {
      return
    }

    const currentMonth = context.availability.monthMeta?.currentMonthKey
    const isCurrentEmpty =
      Boolean(currentMonth) &&
      context.availability.monthMeta?.key === currentMonth &&
      context.availability.days?.length === 0 &&
      context.availability.monthMeta?.nextKey

    if (!hasAutoAdvanced.current && isCurrentEmpty) {
      hasAutoAdvanced.current = true
      setSelectedMonth(context.availability.monthMeta.nextKey)
    } else if (context.availability.days?.length > 0) {
      hasAutoAdvanced.current = true
    }
  }, [context?.availability, isLoading, selectedMonth])

  useEffect(() => {
    if (!selectedSlotIso || availabilityHasSlot(context?.availability, selectedSlotIso)) {
      return
    }

    setSelectedSlotIso('')
  }, [context?.availability, selectedSlotIso])

  function handleMonthChange(nextMonth) {
    setPanelError('')
    setPanelNotice('')
    setSelectedSlotIso('')
    setSelectedMonth(nextMonth)
  }

  function handleSelectSlot(slotStartIso) {
    setPanelError('')
    setPanelNotice('')
    setSelectedSlotIso(slotStartIso)
  }

  function syncManageUrl(actorManageUrl, monthKey) {
    const nextParams = parseManageUrl(actorManageUrl)

    if (!nextParams) {
      return
    }

    const nextManageParams = {
      eventId: nextParams.eventId,
      actor: nextParams.actor,
      token: nextParams.token,
    }

    setManageParams(nextManageParams)
    replaceBrowserManageUrl(nextManageParams, monthKey)
  }

  async function handleCancel() {
    if (!context) {
      return
    }

    setIsCancelling(true)
    setPanelError('')
    setPanelNotice('')
    setRescheduleConfirmed(false)
    setCancelConfirmed(false)

    try {
      const response = await cancelBooking({
        ...manageParams,
        reason: cancelReason,
      })

      syncManageUrl(response.actorManageUrl, selectedMonth)
      setContext((previousContext) => ({
        ...previousContext,
        ...response,
        availability: previousContext?.availability || null,
      }))
      setMutationStatus(buildNotificationLabel(response.notificationDelivery))
      setCancelConfirmed(true)
      setSelectedSlotIso('')
    } catch (error) {
      setPanelError(
        error?.message || 'The booking could not be cancelled right now.'
      )
    } finally {
      setIsCancelling(false)
    }
  }

  async function handleReschedule() {
    if (!context) {
      return
    }

    setIsRescheduling(true)
    setPanelError('')
    setPanelNotice('')
    setRescheduleConfirmed(false)
    setCancelConfirmed(false)

    try {
      const response = await rescheduleBooking({
        ...manageParams,
        slotStartIso: selectedSlotIso,
        reason: rescheduleReason,
      })
      const nextMonth = getMonthKey(response.booking?.slotStartIso)

      syncManageUrl(response.actorManageUrl, nextMonth)
      setSelectedMonth(nextMonth)
      setContext((previousContext) => ({
        ...previousContext,
        ...response,
      }))
      setMutationStatus(buildNotificationLabel(response.notificationDelivery))
      setRescheduleConfirmed(true)
      setRescheduleReason('')
      setSelectedSlotIso('')
    } catch (error) {
      if (error?.code === 'STALE_SLOT') {
        setSelectedSlotIso('')
        setPanelNotice('That time was just taken. Availability has been refreshed.')
        setContextRefreshKey((value) => value + 1)
      } else if (error?.code === 'CURRENT_SLOT') {
        setSelectedSlotIso('')
        setPanelNotice('Choose a different slot before confirming the reschedule.')
      } else {
        setPanelError(
          error?.message || 'The booking could not be rescheduled right now.'
        )
      }
    } finally {
      setIsRescheduling(false)
    }
  }

  const booking = context?.booking
  const permissions = context?.permissions
  const isLocked = Boolean(context?.lockedReason)
  const selectedSlot = findAvailabilitySlot(context?.availability, selectedSlotIso)

  // Post-action confirmation: reschedule
  if (rescheduleConfirmed && booking) {
    return (
      <div className="relative overflow-hidden bg-[var(--bg-primary)] pb-20 pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[var(--accent-glow)] blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <div className="rounded-[32px] border border-emerald-500/20 bg-[linear-gradient(180deg,rgba(17,17,24,0.96),rgba(10,10,15,0.94))] p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]">
              <CalendarCheck2 className="h-8 w-8" />
            </div>

            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
              Rescheduled successfully
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Your audit has been moved to{' '}
              <span className="font-semibold text-[var(--text-primary)]">
                {booking.formattedDate}
              </span>{' '}
              at{' '}
              <span className="font-semibold text-[var(--text-primary)]">
                {booking.formattedTime}
              </span>{' '}
              {booking.timezone}.
            </p>
            <p className="mt-3 text-[13px] text-[var(--text-muted)]">
              Updated calendar invitations and confirmation emails have been
              sent.
            </p>

            <button
              type="button"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3 text-[13px] font-medium text-[var(--text-secondary)] transition-all hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
              onClick={() => setRescheduleConfirmed(false)}
            >
              Back to booking
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Post-action confirmation: cancel
  if (cancelConfirmed && booking) {
    return (
      <div className="relative overflow-hidden bg-[var(--bg-primary)] pb-20 pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/[0.02] blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <div className="rounded-[32px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(17,17,24,0.96),rgba(10,10,15,0.94))] p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <XCircle className="h-8 w-8" />
            </div>

            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
              Booking cancelled
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Your audit on{' '}
              <span className="font-semibold text-[var(--text-primary)]">
                {booking.formattedDate}
              </span>{' '}
              at{' '}
              <span className="font-semibold text-[var(--text-primary)]">
                {booking.formattedTime}
              </span>{' '}
              has been cancelled.
            </p>
            {cancelReason ? (
              <p className="mt-3 text-[13px] text-[var(--text-muted)]">
                Reason: {cancelReason}
              </p>
            ) : null}
            <p className="mt-3 text-[13px] text-[var(--text-muted)]">
              Cancellation confirmations have been sent to all parties.
            </p>

            <a
              href="/audit"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3 text-[13px] font-medium text-[var(--text-secondary)] transition-all hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
            >
              Book a new audit
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-[var(--bg-primary)] pb-20 pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[var(--accent-glow)] blur-[130px]" />
        <div className="absolute right-10 top-32 h-[18rem] w-[18rem] rounded-full bg-cyan-500/8 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-8 px-6">
        {/* Page header */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            Audit Booking
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl">
            Manage your booking
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Use this page to select a new time, confirm the reschedule, or
            cancel the audit.
          </p>
        </div>

        {/* Error banner */}
        {panelError ? (
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/25 bg-red-500/10 px-5 py-4 text-[14px] text-red-200">
            <CircleAlert className="h-5 w-5 flex-shrink-0 text-red-400" />
            <p>{panelError}</p>
          </div>
        ) : null}

        {!panelError && panelNotice ? (
          <div className="flex items-center gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-5 py-4 text-[14px] text-amber-100">
            <CircleAlert className="h-5 w-5 flex-shrink-0 text-amber-300" />
            <p>{panelNotice}</p>
          </div>
        ) : null}

        {/* Success banner */}
        {mutationStatus && !rescheduleConfirmed && !cancelConfirmed ? (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-5 py-4 text-[14px] text-emerald-100">
            <CalendarCheck2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />
            <p>{mutationStatus}</p>
          </div>
        ) : null}

        {/* ── Booking Summary Card ── */}
        <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(17,17,24,0.96),rgba(10,10,15,0.94))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Booking details
            </h2>
            <div className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              {context?.eventStatus || (isLoading ? 'loading' : 'pending')}
            </div>
          </div>

          {isLocked ? (
            <div className="mt-5 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-4 text-sm text-amber-100">
              <div className="flex items-start gap-3">
                <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{context.lockedReason}</span>
              </div>
            </div>
          ) : null}

          {booking ? (
            <div className="mt-6 divide-y divide-white/[0.04]">
              <SummaryRow
                label="Date"
                value={booking.formattedDate}
                icon={CalendarCheck2}
              />
              <SummaryRow
                label="Time"
                value={`${booking.formattedTime} ${booking.timezone}`}
                icon={CalendarCheck2}
              />
              <SummaryRow
                label="Business"
                value={booking.businessName}
                icon={Building2}
              />
              <SummaryRow
                label="Email"
                value={booking.contactEmail}
                icon={Mail}
              />
              <SummaryRow
                label="Phone"
                value={booking.clientPhone || 'Not provided'}
                icon={Phone}
              />
            </div>
          ) : null}

          {!isLocked && (permissions?.canReschedule || permissions?.canCancel) ? (
            <p className="mt-6 rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3 text-[13px] text-[var(--text-muted)]">
              You can reschedule or cancel up to 12 hours before your audit. A
              reason is required for changes.
            </p>
          ) : null}
        </div>

        {/* ── Reschedule Section ── */}
        {permissions?.canReschedule ? (
          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(17,17,24,0.96),rgba(10,10,15,0.94))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Need a different time?
              </h2>
              <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">
                Select a new time in the picker, then confirm the reschedule in
                the summary panel below.
              </p>
            </div>

            <div className="mt-6">
              <AuditSlotPicker
                availability={context?.availability}
                compact
                selectedMonth={selectedMonth}
                selectedSlotIso={selectedSlotIso}
                isLoading={isLoading}
                isSubmitting={isRescheduling}
                onMonthChange={handleMonthChange}
                onSelectSlot={handleSelectSlot}
                slotActionLabel="Select time"
                emptyStateMessage="No reschedule slots are open in this month."
              />
            </div>

            <div className="mt-6 rounded-[28px] border border-white/[0.06] bg-black/15 p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                      Reschedule summary
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                      The current booking stays in place until you confirm the
                      new slot here.
                    </p>
                  </div>

                  {booking ? (
                    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        Current slot
                      </p>
                      <p className="mt-1 text-[14px] font-medium text-[var(--text-primary)]">
                        {booking.formattedDate}
                      </p>
                      <p className="text-[14px] text-[var(--text-secondary)]">
                        {booking.formattedTime} {booking.timezone}
                      </p>
                    </div>
                  ) : null}

                  <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Selected slot
                    </p>
                    {selectedSlot ? (
                      <>
                        <p className="mt-1 text-[14px] font-medium text-[var(--text-primary)]">
                          {selectedSlot.day.fullLabel}
                        </p>
                        <p className="text-[14px] text-[var(--text-secondary)]">
                          {selectedSlot.slot.label} {context?.availability?.timezone}
                        </p>
                      </>
                    ) : (
                      <p className="mt-1 text-[14px] text-[var(--text-secondary)]">
                        Select a different time above, then confirm the move
                        below.
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full max-w-xl space-y-3">
                  <label
                    htmlFor="reschedule-reason"
                    className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]"
                  >
                    Reason for rescheduling
                  </label>
                  <textarea
                    id="reschedule-reason"
                    value={rescheduleReason}
                    onChange={(event) => setRescheduleReason(event.target.value)}
                    rows={3}
                    disabled={isRescheduling}
                    className="w-full rounded-xl border border-white/[0.08] bg-[rgba(8,8,12,0.78)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="e.g. Schedule conflict, need to move to next week"
                  />

                  <button
                    type="button"
                    disabled={!selectedSlotIso || !rescheduleReason.trim() || isRescheduling}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-[var(--accent)] px-6 py-3.5 text-[14px] font-semibold text-[var(--bg-primary)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => {
                      void handleReschedule()
                    }}
                  >
                    {isRescheduling ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    Confirm reschedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Cancel Section ── */}
        {permissions?.canCancel ? (
          <div className="rounded-[32px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(17,17,24,0.96),rgba(10,10,15,0.94))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-8">
            {!showCancelSection ? (
              <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                onClick={() => setShowCancelSection(true)}
              >
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    Cancel booking
                  </h2>
                  <p className="mt-1 text-[13px] text-[var(--text-muted)]">
                    This action cannot be undone.
                  </p>
                </div>
                <ChevronDown className="h-5 w-5 text-[var(--text-muted)] transition-transform" />
              </button>
            ) : (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    Cancel booking
                  </h2>
                  <p className="mt-1 text-[13px] text-red-300/80">
                    This action cannot be undone. Calendar invitations will be
                    removed and all parties will be notified.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="cancel-reason"
                    className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]"
                  >
                    Reason for cancellation
                  </label>
                  <textarea
                    id="cancel-reason"
                    value={cancelReason}
                    onChange={(event) => setCancelReason(event.target.value)}
                    rows={3}
                    disabled={isCancelling}
                    className="w-full rounded-xl border border-white/[0.08] bg-[rgba(8,8,12,0.78)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-red-500/50 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="Please let us know why you're cancelling"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={!cancelReason.trim() || isCancelling}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/30 bg-red-500/12 px-5 py-3 text-[13px] font-semibold text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => {
                      void handleCancel()
                    }}
                  >
                    {isCancelling ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Cancel booking
                  </button>
                  <button
                    type="button"
                    className="rounded-full px-4 py-3 text-[13px] font-medium text-[var(--text-muted)] transition hover:text-[var(--text-secondary)]"
                    onClick={() => {
                      setShowCancelSection(false)
                      setCancelReason('')
                    }}
                  >
                    Never mind
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
