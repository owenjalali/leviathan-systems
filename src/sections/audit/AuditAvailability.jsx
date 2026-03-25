import {
  ArrowRight,
  Building2,
  Globe2,
  Mail,
  MapPinned,
  RefreshCw,
  Target,
} from 'lucide-react'
import { availabilityContent } from '../../content/audit'
import AuditSlotPicker from './AuditSlotPicker'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatMinutes(value) {
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  const normalizedHours = ((hours + 11) % 12) + 1
  const meridiem = hours >= 12 ? 'PM' : 'AM'

  return `${normalizedHours}:${String(minutes).padStart(2, '0')} ${meridiem}`
}

function formatWorkingDays(workingDays = []) {
  const normalizedDays = [...new Set(workingDays)].sort((left, right) => left - right)
  const ranges = []
  let currentRange = []

  for (const day of normalizedDays) {
    const previousDay = currentRange[currentRange.length - 1]

    if (currentRange.length === 0 || day === previousDay + 1) {
      currentRange.push(day)
      continue
    }

    ranges.push(currentRange)
    currentRange = [day]
  }

  if (currentRange.length > 0) {
    ranges.push(currentRange)
  }

  return ranges
    .map((range) => {
      if (range.length === 1) {
        return WEEKDAY_LABELS[range[0]]
      }

      return `${WEEKDAY_LABELS[range[0]]}-${WEEKDAY_LABELS[range[range.length - 1]]}`
    })
    .join(', ')
}

function buildWindowLabel(policy) {
  if (!policy) {
    return 'Mon-Fri, 9:00 AM-5:00 PM'
  }

  const dayStartMinutes = policy.dayStartMinutes ?? policy.startHour * 60
  const dayEndMinutes = policy.dayEndMinutes ?? policy.endHour * 60

  return `${formatWorkingDays(policy.workingDays)}, ${formatMinutes(
    dayStartMinutes
  )}-${formatMinutes(dayEndMinutes)}`
}

function SummaryChip({ label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 backdrop-blur-md">
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
        {label}:
      </span>
      <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
    </div>
  )
}

function ReviewRow({ label, value, icon: Icon, multiline = false }) {
  const IconComponent = Icon

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/[0.05] bg-black/10 px-4 py-3">
      <div className="mt-0.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 text-[var(--accent)]">
        <IconComponent className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          {label}
        </p>
        <p
          className={`mt-1 text-[14px] text-[var(--text-primary)] ${
            multiline ? 'whitespace-pre-wrap leading-relaxed' : 'break-words'
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

function findSelectedSlot(availability, selectedSlotIso) {
  for (const day of availability?.days || []) {
    const slot = day.slots.find((entry) => entry.startIso === selectedSlotIso)

    if (slot) {
      return {
        day,
        slot,
      }
    }
  }

  return null
}

export default function AuditAvailability({
  availability,
  isBooking,
  isLoading,
  leadContext,
  onConfirmBooking,
  onMonthChange,
  onReset,
  onSelectSlot,
  selectedMonth,
  selectedSlotIso,
}) {
  const contactSummary = leadContext?.contactSummary || {}
  const selectedSlot = findSelectedSlot(availability, selectedSlotIso)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {availabilityContent.eyebrow}
            </p>
            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
              {availabilityContent.title}
            </h3>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Review the intake, pick a time, then confirm the booking in the
              final panel. Selecting a slot does not submit anything yet.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <SummaryChip
              label="Business"
              value={contactSummary.businessName || 'Lead'}
            />
            <SummaryChip
              label="Timezone"
              value={
                availability?.timezone ||
                leadContext?.bookingPolicy?.timezone ||
                'America/Toronto'
              }
            />
            <SummaryChip
              label="Window"
              value={buildWindowLabel(availability?.bookingPolicy || leadContext?.bookingPolicy)}
            />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/[0.08] px-5 py-2.5 text-[13px] font-medium text-[var(--text-secondary)] shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-all hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-[var(--text-primary)]"
          onClick={onReset}
        >
          Edit intake
        </button>
      </div>

      <div className="rounded-[28px] border border-white/[0.08] bg-[rgba(10,12,18,0.8)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Submitted answers
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
              This is the normalized intake that will be attached to the
              booking, notifications, and manage flow.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <ReviewRow
            label="Business"
            value={contactSummary.businessName || 'Not provided'}
            icon={Building2}
          />
          <ReviewRow
            label="Website / Industry"
            value={[
              contactSummary.website || 'Website not provided',
              contactSummary.industry || 'Industry not specified',
            ].join('\n')}
            icon={Globe2}
            multiline
          />
          <ReviewRow
            label="Email / Phone"
            value={[
              contactSummary.contactEmail || 'Email not provided',
              contactSummary.phone || 'Phone not provided',
            ].join('\n')}
            icon={Mail}
            multiline
          />
          <ReviewRow
            label="Address"
            value={
              contactSummary.formattedAddress ||
              contactSummary.location ||
              'Address not provided'
            }
            icon={MapPinned}
            multiline
          />
          <div className="md:col-span-2">
            <ReviewRow
              label="Audit goals"
              value={contactSummary.auditGoals || 'Not provided'}
              icon={Target}
              multiline
            />
          </div>
        </div>
      </div>

      <AuditSlotPicker
        availability={availability}
        compact
        selectedMonth={selectedMonth}
        selectedSlotIso={selectedSlotIso}
        isLoading={isLoading}
        isSubmitting={isBooking}
        onMonthChange={onMonthChange}
        onSelectSlot={onSelectSlot}
        slotActionLabel="Select time"
        emptyStateMessage="No audit slots are open in this month."
      />

      <div className="rounded-[28px] border border-white/[0.08] bg-[rgba(10,12,18,0.84)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Booking confirmation
            </p>
            {selectedSlot ? (
              <>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  {selectedSlot.day.fullLabel}
                </p>
                <p className="text-[14px] text-[var(--text-secondary)]">
                  {selectedSlot.slot.label} {availability?.timezone}
                </p>
              </>
            ) : (
              <p className="text-[14px] text-[var(--text-secondary)]">
                Select a slot above to stage the booking. Nothing is submitted
                until you confirm here.
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={!selectedSlot || isBooking}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-[var(--accent)] px-6 py-3.5 text-[14px] font-semibold text-[var(--bg-primary)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            onClick={() => {
              if (selectedSlot) {
                onConfirmBooking(selectedSlot.slot.startIso)
              }
            }}
          >
            {isBooking ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
            Confirm booking
          </button>
        </div>
      </div>
    </div>
  )
}
