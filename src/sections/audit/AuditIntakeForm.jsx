import { AlertCircle, ArrowRight, Building2 } from 'lucide-react'
import AuditPhoneField from './AuditPhoneField'
import AuditSelect from './AuditSelect'
import {
  industryOptions,
} from '../../../shared/auditSchema'

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="space-y-2 mb-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
        {title}
      </h3>
      {body ? (
        <p className="max-w-xl text-[15px] leading-relaxed text-[var(--text-secondary)]">
          {body}
        </p>
      ) : null}
    </div>
  )
}

function ErrorText({ error }) {
  if (!error) {
    return null
  }

  return (
    <p className="mt-2 flex items-center gap-2 text-sm font-medium text-red-400">
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{error}</span>
    </p>
  )
}

function Label({ htmlFor, required, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]"
    >
      {children}
      {required ? <span className="ml-1 text-[var(--accent)]">*</span> : null}
    </label>
  )
}

function inputClass(hasError) {
  return `w-full rounded-2xl border bg-white/[0.02] px-5 py-4 text-[15px] font-medium text-[var(--text-primary)] placeholder:text-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] backdrop-blur-md transition-all duration-300 focus:border-[var(--accent)]/50 focus:bg-white/[0.04] focus:outline-none focus:ring-[4px] focus:ring-[var(--accent)]/10 ${
    hasError
      ? 'border-red-500/50 hover:border-red-500/70'
      : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.03]'
  }`
}

function Field({ name, label, required, error, children }) {
  return (
    <div className="relative group" data-field={name}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      {children}
      <ErrorText error={error} />
    </div>
  )
}

export default function AuditIntakeForm({
  countries,
  errors,
  isSubmitting,
  onBlur,
  onChange,
  onPhoneCountryChange,
  onSubmit,
  phoneCountryOptionCode,
  phoneCountryOptions,
  values,
}) {
  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
    name: country.name,
    flag: country.flag,
    dialCode: country.dialCode,
    searchText: `${country.name} ${country.code} ${country.dialCode}`,
  }))

  const industryOpts = industryOptions.map(opt => ({
    value: opt,
    label: opt,
    name: opt,
    searchText: opt.toLowerCase()
  }))

  return (
    <form noValidate className="space-y-12" onSubmit={onSubmit}>
      <section className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7">
        <SectionHeading
          eyebrow="Business Details"
          title="Give us the essentials."
          body="After intake, you'll review these answers, choose a time, and confirm the booking."
        />

        <div className="grid gap-x-6 gap-y-7 md:grid-cols-2">
          <Field
            name="businessName"
            label="Business name"
            required
            error={errors.businessName}
          >
            <input
              id="businessName"
              name="businessName"
              type="text"
              autoComplete="organization"
              value={values.businessName}
              className={inputClass(errors.businessName)}
              placeholder="Your company name"
              onBlur={() => onBlur('businessName')}
              onChange={(event) => onChange('businessName', event.target.value)}
            />
          </Field>

          <Field
            name="industry"
            label="Industry"
            required
            error={errors.industry}
          >
            <AuditSelect
              name="industry"
              ariaLabel="Industry"
              value={values.industry}
              error={errors.industry}
              options={industryOpts}
              placeholder="Select industry"
              searchPlaceholder="Search industries"
              onBlur={onBlur}
              onChange={(option) => onChange('industry', option.value)}
              renderTriggerContent={(option) => (
                <div className="flex min-w-0 items-center gap-3 text-[15px]">
                  <span className="truncate font-medium text-[var(--text-primary)]">
                    {option.name}
                  </span>
                </div>
              )}
              renderOptionContent={(option) => (
                <div className="flex min-w-0 items-center gap-3 text-[15px]">
                  <Building2 className="h-4 w-4 text-[var(--text-muted)]" />
                  <span className="truncate font-medium text-[var(--text-primary)]">
                    {option.name}
                  </span>
                </div>
              )}
            />
          </Field>

          <div className="md:col-span-2">
            <Field name="website" label="Website" error={errors.website}>
              <input
                id="website"
                name="website"
                type="text"
                autoComplete="url"
                value={values.website}
                className={inputClass(errors.website)}
                placeholder="example.com"
                onBlur={() => onBlur('website')}
                onChange={(event) => onChange('website', event.target.value)}
              />
            </Field>
          </div>

          {values.industry === 'Other' ? (
            <Field
              name="industryOther"
              label="Describe Industry"
              required
              error={errors.industryOther}
            >
              <input
                id="industryOther"
                name="industryOther"
                type="text"
                value={values.industryOther}
                className={inputClass(errors.industryOther)}
                placeholder="Describe your industry"
                onBlur={() => onBlur('industryOther')}
                onChange={(event) => onChange('industryOther', event.target.value)}
              />
            </Field>
          ) : null}
        </div>
      </section>

      <section className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7">
        <SectionHeading
          eyebrow="Audit Goals"
          title="What should this audit solve?"
          body="Name the bottleneck, where it shows up, and what a better outcome looks like."
        />

        <Field
          name="auditGoals"
          label="Audit goal"
          required
          error={errors.auditGoals}
        >
          <textarea
            id="auditGoals"
            name="auditGoals"
            rows={5}
            value={values.auditGoals}
            className={`${inputClass(errors.auditGoals)} min-h-[140px] resize-y leading-relaxed`}
            placeholder="E.g., We are spending 10 hours a week manually entering data from Typeform into the CRM..."
            onBlur={() => onBlur('auditGoals')}
            onChange={(event) => onChange('auditGoals', event.target.value)}
          />
        </Field>
      </section>

      <section className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7">
        <SectionHeading
          eyebrow="Contact And Address"
          title="Where should we send updates?"
          body="We'll use these details in the calendar invite, owner notifications, and your manage link."
        />

        <div className="grid gap-x-6 gap-y-7 md:grid-cols-2">
          <Field
            name="contactEmail"
            label="Contact email"
            required
            error={errors.contactEmail}
          >
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.contactEmail}
              className={inputClass(errors.contactEmail)}
              placeholder="name@company.com"
              onBlur={() => onBlur('contactEmail')}
              onChange={(event) => onChange('contactEmail', event.target.value)}
              onKeyDown={(event) => {
                if (event.key === ' ') {
                  event.preventDefault()
                }
              }}
            />
          </Field>

          <Field
            name="phoneNumber"
            label="Phone"
            required
            error={errors.phoneNumber || errors.phoneCountryCode}
          >
            <AuditPhoneField
              countryError={errors.phoneCountryCode}
              options={phoneCountryOptions}
              phoneCountryCode={values.phoneCountryCode}
              phoneNumber={values.phoneNumber}
              phoneNumberError={errors.phoneNumber}
              selectedOptionCode={phoneCountryOptionCode}
              onPhoneCountryBlur={onBlur}
              onPhoneCountryChange={onPhoneCountryChange}
              onPhoneNumberBlur={onBlur}
              onPhoneNumberChange={(value) => onChange('phoneNumber', value)}
            />
          </Field>

          <div className="md:col-span-2">
            <Field
              name="addressLine1"
              label="Address line 1"
              required
              error={errors.addressLine1}
            >
              <input
                id="addressLine1"
                name="addressLine1"
                type="text"
                autoComplete="address-line1"
                value={values.addressLine1}
                className={inputClass(errors.addressLine1)}
                placeholder="Street address"
                onBlur={() => onBlur('addressLine1')}
                onChange={(event) => onChange('addressLine1', event.target.value)}
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field
              name="addressLine2"
              label="Address line 2"
              error={errors.addressLine2}
            >
              <input
                id="addressLine2"
                name="addressLine2"
                type="text"
                autoComplete="address-line2"
                value={values.addressLine2}
                className={inputClass(errors.addressLine2)}
                placeholder="Suite, unit, or floor"
                onBlur={() => onBlur('addressLine2')}
                onChange={(event) => onChange('addressLine2', event.target.value)}
              />
            </Field>
          </div>

          <Field name="city" label="City" required error={errors.city}>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              value={values.city}
              className={inputClass(errors.city)}
              placeholder="City"
              onBlur={() => onBlur('city')}
              onChange={(event) => onChange('city', event.target.value)}
            />
          </Field>

          <Field
            name="provinceState"
            label="Province / State"
            required
            error={errors.provinceState}
          >
            <input
              id="provinceState"
              name="provinceState"
              type="text"
              autoComplete="address-level1"
              value={values.provinceState}
              className={inputClass(errors.provinceState)}
              placeholder="Province or state"
              onBlur={() => onBlur('provinceState')}
              onChange={(event) => onChange('provinceState', event.target.value)}
            />
          </Field>

          <Field
            name="postalCode"
            label="Postal code"
            required
            error={errors.postalCode}
          >
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              autoComplete="postal-code"
              value={values.postalCode}
              className={inputClass(errors.postalCode)}
              placeholder="Postal or ZIP code"
              onBlur={() => onBlur('postalCode')}
              onChange={(event) => onChange('postalCode', event.target.value)}
            />
          </Field>

          <Field
            name="countryCode"
            label="Country"
            required
            error={errors.countryCode}
          >
            <AuditSelect
              ariaLabel="Country"
              error={errors.countryCode}
              name="countryCode"
              options={countryOptions}
              placeholder="Select country"
              searchPlaceholder="Search country"
              value={values.countryCode}
              onBlur={onBlur}
              onChange={(option) => onChange('countryCode', option.value)}
              renderTriggerContent={(option) => (
                <div className="flex min-w-0 items-center gap-3">
                  <span className="text-xl leading-none">{option.flag}</span>
                  <span className="truncate text-[15px] font-medium text-[var(--text-primary)]">
                    {option.name}
                  </span>
                </div>
              )}
              renderOptionContent={(option) => (
                <div className="flex min-w-0 items-center gap-3">
                  <span className="text-xl leading-none">{option.flag}</span>
                  <span className="truncate text-[15px] font-medium text-[var(--text-primary)]">
                    {option.name}
                  </span>
                  <span className="ml-auto flex-shrink-0 text-[13px] font-medium text-[var(--text-muted)]">
                    {option.dialCode}
                  </span>
                </div>
              )}
            />
          </Field>
        </div>
      </section>

      <div className="pt-4 border-t border-white/[0.04]">
        <p className="mb-4 text-[13px] leading-relaxed text-[var(--text-secondary)]">
          Next step: review your submitted answers, select a slot, and confirm
          the booking.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[var(--accent)] px-8 py-5 text-[15px] font-bold text-[var(--bg-primary)] shadow-[0_0_40px_-10px_var(--accent)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_var(--accent)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitting ? 'Preparing scheduler...' : 'Continue to availability'}
            {isSubmitting ? null : (
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </span>
          <div className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
      </div>
    </form>
  )
}
