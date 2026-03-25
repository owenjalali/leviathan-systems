import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { getCurrentMonthKey } from '../../lib/auditApi'

function shiftMonth(monthKey, delta) {
  const [year, month] = monthKey.split('-').map(Number)
  const shifted = new Date(Date.UTC(year, month - 1 + delta, 1))
  const shiftedYear = shifted.getUTCFullYear()
  const shiftedMonth = String(shifted.getUTCMonth() + 1).padStart(2, '0')

  return `${shiftedYear}-${shiftedMonth}`
}

const WEEKDAY_LABELS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

export default function AuditSlotPicker({
  availability,
  compact = false,
  selectedMonth,
  selectedSlotIso,
  isLoading,
  isSubmitting,
  onMonthChange,
  onSelectSlot,
  slotActionLabel = 'Select time',
  emptyStateMessage = 'No audit availability is open in this month.',
}) {
  const monthLabel = availability?.monthMeta?.label || 'Loading availability'
  const previousMonth = availability?.monthMeta?.previousKey ?? null
  const nextMonth =
    availability?.monthMeta?.nextKey || shiftMonth(selectedMonth, 1)
  const currentMonthKey =
    availability?.monthMeta?.currentMonthKey || getCurrentMonthKey()
  const isSelectedCurrent = selectedMonth === currentMonthKey

  const [activeDate, setActiveDate] = useState(null)
  const resolvedActiveDate =
    availability?.days?.find((day) => day.date === activeDate)?.date ||
    availability?.days?.[0]?.date ||
    null
  const activeDay = availability?.days?.find(
    (day) => day.date === resolvedActiveDate
  )

  const calendarCells = useMemo(() => {
    if (!selectedMonth) {
      return []
    }

    const [year, month] = selectedMonth.split('-').map(Number)
    const firstDayOffset = new Date(year, month - 1, 1).getDay()
    const daysInMonth = new Date(year, month, 0).getDate()
    const cells = []

    for (let emptyIndex = 0; emptyIndex < firstDayOffset; emptyIndex += 1) {
      cells.push({
        key: `empty-${emptyIndex}`,
        dayNumber: null,
        dateKey: null,
        hasAvailability: false,
      })
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayData = availability?.days?.find((entry) => entry.date === dateKey)

      cells.push({
        key: dateKey,
        dayNumber: day,
        dateKey,
        hasAvailability: Boolean(dayData),
      })
    }

    return cells
  }, [availability?.days, selectedMonth])

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-[rgba(15,15,20,0.4)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 border-b border-white/[0.04] bg-white/[0.01] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-[var(--accent)]" />
          <p className="text-lg font-medium text-[var(--text-primary)]">{monthLabel}</p>
          {!isSelectedCurrent ? (
            <button
              type="button"
              disabled={isLoading || isSubmitting}
              className="ml-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] disabled:opacity-40"
              onClick={() => onMonthChange(currentMonthKey)}
            >
              Today
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isLoading || isSubmitting || !previousMonth}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] disabled:opacity-40"
            onClick={() => {
              if (previousMonth) {
                onMonthChange(previousMonth)
              }
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={isLoading || isSubmitting}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] disabled:opacity-40"
            onClick={() => onMonthChange(nextMonth)}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-6 sm:p-8">
          <div className="flex gap-4 overflow-hidden pb-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-28 w-24 flex-shrink-0 animate-pulse rounded-2xl bg-white/[0.03]"
              />
            ))}
          </div>
        </div>
      ) : null}

      {!isLoading && !availability?.days?.length ? (
        <div className="p-12 text-center text-[var(--text-secondary)]">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.03]">
            <CalendarDays className="h-6 w-6 opacity-50" />
          </div>
          <p className="text-[15px]">{emptyStateMessage}</p>
          <button
            type="button"
            className="mt-6 text-sm font-medium text-[var(--accent)] hover:underline"
            onClick={() => onMonthChange(nextMonth)}
          >
            Check next month &rarr;
          </button>
        </div>
      ) : null}

      {!isLoading && availability?.days?.length ? (
        <div
          className={`flex flex-col gap-8 p-6 sm:p-8 ${
            compact ? '' : '2xl:flex-row 2xl:gap-12'
          }`}
        >
          <div
            className={
              compact
                ? 'w-full'
                : 'w-full 2xl:w-[380px] 2xl:flex-shrink-0'
            }
          >
            <div className="grid grid-cols-7 gap-2 sm:gap-2.5">
              {WEEKDAY_LABELS.map((label) => (
                <div
                  key={label}
                  className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]"
                >
                  {label}
                </div>
              ))}

              {calendarCells.map((cell) => {
                const isActive = resolvedActiveDate === cell.dateKey

                return (
                  <button
                    key={cell.key}
                    type="button"
                    disabled={
                      !cell.dateKey ||
                      !cell.hasAvailability ||
                      isLoading ||
                      isSubmitting
                    }
                    onClick={() => {
                      if (cell.dateKey && cell.hasAvailability) {
                        setActiveDate(cell.dateKey)
                      }
                    }}
                    className={`relative flex aspect-square items-center justify-center rounded-xl text-[14px] font-medium transition-all duration-300 ${
                      !cell.dateKey
                        ? 'cursor-default bg-transparent text-transparent'
                        : isActive
                          ? 'z-10 scale-[1.05] border-2 border-[var(--accent)] bg-[var(--accent)] text-[var(--bg-primary)] shadow-[0_0_20px_-3px_var(--accent)]'
                          : cell.hasAvailability
                            ? 'border border-white/[0.08] bg-white/[0.03] text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/15 hover:text-[var(--accent)]'
                            : 'cursor-not-allowed border border-dashed border-white/[0.03] bg-transparent text-[var(--text-muted)] opacity-40'
                    }`}
                  >
                    {cell.dayNumber}
                    {isActive ? (
                      <div className="absolute -bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-white/40 blur-[1px]" />
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>

          <div
            className={`flex-1 ${
              compact ? '' : '2xl:border-l 2xl:border-white/[0.04] 2xl:pl-10'
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-[15px] font-medium text-[var(--text-primary)]">
                <Clock3 className="h-4 w-4 text-[var(--text-muted)]" />
                Available times for {activeDay?.fullLabel || 'Selected date'}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {activeDay?.slots?.map((slot) => {
                const isCurrentSlot = selectedSlotIso === slot.startIso

                return (
                  <button
                    key={slot.startIso}
                    type="button"
                    disabled={isSubmitting}
                    className={`group relative flex min-h-[56px] items-center justify-center overflow-hidden rounded-xl border px-3 text-center text-[14px] font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
                      isCurrentSlot
                        ? 'border-2 border-[var(--accent)] bg-[var(--accent)] text-[var(--bg-primary)] shadow-[0_0_20px_-5px_var(--accent)]'
                        : 'border-white/[0.08] bg-white/[0.02] text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5'
                    }`}
                    onClick={() => onSelectSlot(slot.startIso)}
                  >
                    {isCurrentSlot ? (
                      <span className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.12em]">
                        <CheckCircle2 className="h-4 w-4" />
                        Selected
                      </span>
                    ) : (
                      <>
                        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[150%]">
                          {slot.label}
                        </span>
                        <div className="absolute inset-0 z-0 flex translate-y-[150%] items-center justify-center bg-[var(--accent)] px-2 text-[var(--bg-primary)] transition-transform duration-300 group-hover:translate-y-0">
                          <span className="flex items-center gap-1.5 text-[12px] font-bold tracking-[0.08em]">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {slotActionLabel}
                          </span>
                        </div>
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
