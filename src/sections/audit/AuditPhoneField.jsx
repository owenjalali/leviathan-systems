import AuditSelect from './AuditSelect'
import { formatPhoneDisplay } from '../../../shared/auditSchema'

function inputClass(hasError) {
  return `w-full rounded-2xl border bg-white/[0.02] px-5 py-4 text-[15px] font-medium text-[var(--text-primary)] placeholder:text-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] backdrop-blur-md transition-all duration-300 focus:border-[var(--accent)]/50 focus:bg-white/[0.04] focus:outline-none focus:ring-[4px] focus:ring-[var(--accent)]/10 ${
    hasError
      ? 'border-red-500/50 hover:border-red-500/70'
      : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.03]'
  }`
}

export default function AuditPhoneField({
  countryError,
  onPhoneCountryBlur,
  onPhoneCountryChange,
  onPhoneNumberBlur,
  onPhoneNumberChange,
  options,
  phoneCountryCode,
  phoneNumber,
  phoneNumberError,
  selectedOptionCode,
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,0.46fr)_minmax(0,1fr)]">
      <AuditSelect
        ariaLabel="Phone country code"
        error={countryError}
        name="phoneCountryCode"
        options={options}
        placeholder="Code"
        searchPlaceholder="Search country or code"
        value={selectedOptionCode}
        onBlur={onPhoneCountryBlur}
        onChange={onPhoneCountryChange}
        renderTriggerContent={(option) => (
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="text-lg leading-none">{option.flag}</span>
            <span className="truncate font-medium text-[var(--text-primary)]">
              {option.optionCode}
            </span>
          </div>
        )}
        renderOptionContent={(option) => (
          <div className="flex min-w-0 items-center gap-3">
            <span className="text-xl leading-none">{option.flag}</span>
            <span className="truncate text-[15px] font-medium text-[var(--text-primary)]">
              {option.name}
            </span>
            <span className="ml-auto flex-shrink-0 text-sm font-medium text-[var(--text-muted)]">
              {option.dialCode}
            </span>
          </div>
        )}
      />

      <input
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={phoneNumber}
        maxLength={phoneCountryCode === '+1' ? 14 : 19}
        className={inputClass(phoneNumberError)}
        placeholder={phoneCountryCode === '+1' ? '(416) 555-0123' : 'Phone number'}
        onBlur={() => onPhoneNumberBlur('phoneNumber')}
        onChange={(event) =>
          onPhoneNumberChange(
            formatPhoneDisplay(event.target.value, phoneCountryCode)
          )
        }
        onPaste={(event) => {
          event.preventDefault()

          const pastedValue = event.clipboardData.getData('text')
          onPhoneNumberChange(formatPhoneDisplay(pastedValue, phoneCountryCode))
        }}
      />
    </div>
  )
}
