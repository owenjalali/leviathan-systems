import {
  CalendarCheck2,
  ExternalLink,
  Link2,
  Mail,
  MapPinned,
  Phone,
  RotateCcw,
  Building2,
  Globe2,
  Video,
} from 'lucide-react'
import { confirmationContent } from '../../content/audit'

function DetailRow({ label, value, icon: Icon, highlight, wrap }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {Icon ? <Icon className="h-4 w-4 text-[var(--text-muted)]" /> : null}
        <span className="text-[13px] font-medium text-[var(--text-secondary)]">
          {label}
        </span>
      </div>
      <span
        className={`max-w-[60%] text-right text-[14px] font-semibold ${
          wrap ? 'text-wrap' : 'truncate'
        } ${highlight ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}
      >
        {value}
      </span>
    </div>
  )
}

function ResourceCard({ label, value, href, helper, icon: Icon }) {
  return (
    <div className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all hover:border-[var(--accent)]/40 hover:bg-white/[0.04]">
      <div className="min-w-0 flex-1">
        <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-[var(--accent)]">
          {label}
        </span>
        <div className="flex items-center gap-2">
          {Icon ? <Icon className="h-4 w-4 text-[var(--text-muted)]" /> : null}
          <code className="block truncate text-[13px] text-[var(--text-primary)]">
            {value}
          </code>
        </div>
        {helper ? (
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-secondary)]">
            {helper}
          </p>
        ) : null}
      </div>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.03] text-[var(--text-primary)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-primary)]"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}
    </div>
  )
}

function buildStatusCopy(confirmation) {
  if (
    confirmation.notificationDelivery === 'queued' ||
    (!confirmation.notificationDelivery && confirmation.notificationsQueued)
  ) {
    return "A confirmation email is on its way. You'll also receive a Google Calendar invitation."
  }

  if (confirmation.notificationDelivery === 'smtp_fallback') {
    return "A confirmation email has been sent. You'll also receive a Google Calendar invitation."
  }

  return "You'll receive a Google Calendar invitation with the meeting details."
}

export default function AuditConfirmation({ confirmation, onStartOver }) {
  const meetingUrlLabel =
    confirmation.meetingUrl ||
    'See the Google Calendar invitation for the Meet link.'

  return (
    <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(20,20,30,0.6),rgba(10,10,15,0.8))] shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <div className="relative overflow-hidden bg-[var(--accent)]/[0.03] px-8 py-10 text-center sm:px-10">
          <div className="absolute left-1/2 top-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-20 blur-[60px]" />

          <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--bg-primary)] shadow-[0_0_40px_-10px_var(--accent)]">
            <CalendarCheck2 className="h-8 w-8" />
          </div>

          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
            {confirmationContent.eyebrow}
          </p>
          <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            {confirmationContent.title}
          </h3>

          <p className="mt-4 text-[15px] text-[var(--text-secondary)]">
            {buildStatusCopy(confirmation)}
          </p>
        </div>

        <div className="relative flex items-center">
          <div className="absolute -left-3 h-6 w-6 rounded-full border border-white/[0.08] border-l-transparent border-t-transparent -rotate-45 bg-[var(--bg-primary)]" />
          <div className="h-[1px] w-full border-t-2 border-dashed border-white/[0.08]" />
          <div className="absolute -right-3 h-6 w-6 rounded-full border border-white/[0.08] border-r-transparent border-t-transparent rotate-45 bg-[var(--bg-primary)]" />
        </div>

        <div className="px-8 py-8 sm:px-10">
          <div className="grid gap-x-12 gap-y-2 sm:grid-cols-2">
            <div className="space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                Date & Time
              </span>
              <span className="block text-lg font-semibold text-[var(--text-primary)]">
                {confirmation.booking.formattedDate}
              </span>
              <span className="block text-[15px] text-[var(--text-secondary)]">
                {confirmation.booking.formattedTime}
              </span>
            </div>
            <div className="mt-4 space-y-1 sm:mt-0">
              <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                Timezone
              </span>
              <span className="flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)]">
                <Globe2 className="h-4 w-4 text-[var(--accent)]" />
                {confirmation.booking.timezone}
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-white/[0.04] pt-6">
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Contact Snapshot
            </h4>
            <div className="divide-y divide-white/[0.04]">
              <DetailRow
                label="Business Name"
                value={confirmation.booking.businessName}
                icon={Building2}
                highlight
              />
              <DetailRow
                label="Email Address"
                value={confirmation.booking.contactEmail}
                icon={Mail}
                highlight
              />
              <DetailRow
                label="Phone Number"
                value={confirmation.contactSummary.phone}
                icon={Phone}
              />
              <DetailRow
                label="Location"
                value={
                  confirmation.contactSummary.formattedAddress ||
                  confirmation.contactSummary.location
                }
                icon={MapPinned}
                wrap
              />
            </div>
          </div>

          <div className="mt-8 border-t border-white/[0.04] pt-6">
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Meeting Access
            </h4>
            <ResourceCard
              label="Google Meet"
              value={meetingUrlLabel}
              href={confirmation.meetingUrl || undefined}
              helper="Use this Meet link or the Google Calendar invitation that was sent automatically."
              icon={Video}
            />
            {confirmation.clientManageUrl ? (
              <div className="mt-4">
                <ResourceCard
                  label="Reschedule or Cancel"
                  value="Manage your booking"
                  href={confirmation.clientManageUrl}
                  helper="Use this link to reschedule or cancel before the cutoff."
                  icon={Link2}
                />
              </div>
            ) : null}
          </div>

        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3 text-[13px] font-medium text-[var(--text-secondary)] transition-all hover:scale-105 hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
          onClick={onStartOver}
        >
          <RotateCcw className="h-4 w-4" />
          Book another audit
        </button>
      </div>
    </div>
  )
}
