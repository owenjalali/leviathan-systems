import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { auditProcess } from '../content/audit'
import AuditAvailability from '../sections/audit/AuditAvailability'
import AuditConfirmation from '../sections/audit/AuditConfirmation'
import AuditHero from '../sections/audit/AuditHero'
import AuditIntakeForm from '../sections/audit/AuditIntakeForm'
import {
  bookSlot,
  getCurrentMonthKey,
  loadAvailability,
  submitLead,
} from '../lib/auditApi'
import {
  createAuditDefaultValues,
  formatPhoneDisplay,
  validateAuditField,
  validateAuditValues,
  validateLiveEmail,
  validateLivePhoneNumber,
} from '../../shared/auditSchema'
import {
  countries,
  DEFAULT_COUNTRY_CODE,
  DEFAULT_PHONE_COUNTRY_OPTION_CODE,
  findCountryByCode,
  findFirstPhoneCountryOptionByDialCode,
  findPhoneCountryOptionByCode,
  phoneCountryOptions,
} from '../../shared/countryData'

const SESSION_KEY = 'leviathan.audit.phase1'
const STEP_ORDER = auditProcess.map((item) => item.id)

function loadSessionState() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function getDefaultCountry() {
  return findCountryByCode(DEFAULT_COUNTRY_CODE)
}

function createInitialValues(persistedValues) {
  const defaultValues = createAuditDefaultValues()
  const defaultCountry = getDefaultCountry()
  const currentCountry =
    findCountryByCode(persistedValues?.countryCode) || defaultCountry
  const currentPhoneOption =
    findFirstPhoneCountryOptionByDialCode(persistedValues?.phoneCountryCode) ||
    findPhoneCountryOptionByCode(currentCountry.code) ||
    findPhoneCountryOptionByCode(DEFAULT_PHONE_COUNTRY_OPTION_CODE)
  const phoneCountryCode = currentPhoneOption?.dialCode || defaultCountry.dialCode

  return {
    ...defaultValues,
    ...persistedValues,
    countryCode: currentCountry.code,
    phoneCountryCode,
    phoneNumber: formatPhoneDisplay(persistedValues?.phoneNumber, phoneCountryCode),
  }
}

function createInitialPhoneUiState(persistedUiState, values) {
  const persistedOption = findPhoneCountryOptionByCode(
    persistedUiState?.phoneCountryOptionCode
  )
  const countryOption = findPhoneCountryOptionByCode(values.countryCode)
  const fallbackOption =
    (persistedOption && persistedOption.dialCode === values.phoneCountryCode
      ? persistedOption
      : null) ||
    (countryOption && countryOption.dialCode === values.phoneCountryCode
      ? countryOption
      : null) ||
    findFirstPhoneCountryOptionByDialCode(values.phoneCountryCode) ||
    findPhoneCountryOptionByCode(DEFAULT_PHONE_COUNTRY_OPTION_CODE)

  return {
    phoneCountryOptionCode:
      fallbackOption?.optionCode || DEFAULT_PHONE_COUNTRY_OPTION_CODE,
    phoneCountryManuallySelected: Boolean(
      persistedUiState?.phoneCountryManuallySelected &&
        persistedOption &&
        persistedOption.optionCode === fallbackOption?.optionCode
    ),
  }
}

function buildNextFieldState(values, phoneUiState, field, value) {
  const nextPhoneUiState = { ...phoneUiState }
  const nextValues = { ...values, [field]: value }

  if (field === 'industry' && value !== 'Other') {
    nextValues.industryOther = ''
  }

  if (field === 'contactEmail') {
    nextValues.contactEmail = String(value || '').replace(/\s+/g, '')
  }

  if (field === 'phoneNumber') {
    nextValues.phoneNumber = formatPhoneDisplay(value, nextValues.phoneCountryCode)
  }

  if (field === 'countryCode') {
    const country = findCountryByCode(value) || getDefaultCountry()

    nextValues.countryCode = country.code

    if (!nextPhoneUiState.phoneCountryManuallySelected) {
      nextValues.phoneCountryCode = country.dialCode
      nextValues.phoneNumber = formatPhoneDisplay(
        nextValues.phoneNumber,
        country.dialCode
      )
      nextPhoneUiState.phoneCountryOptionCode = country.code
    }
  }

  return { nextValues, nextPhoneUiState }
}

function buildNextPhoneCountryState(values, option) {
  return {
    nextValues: {
      ...values,
      phoneCountryCode: option.dialCode,
      phoneNumber: formatPhoneDisplay(values.phoneNumber, option.dialCode),
    },
    nextPhoneUiState: {
      phoneCountryOptionCode: option.optionCode,
      phoneCountryManuallySelected: option.optionCode !== values.countryCode,
    },
  }
}

function setFieldError(nextErrors, fieldName, message) {
  if (message) {
    nextErrors[fieldName] = message
    return
  }

  delete nextErrors[fieldName]
}

function mergeFieldErrors(previousErrors, nextValues, field, behavior = 'change') {
  const nextErrors = { ...previousErrors }
  const isBlur = behavior === 'blur'

  if (field === 'contactEmail') {
    setFieldError(
      nextErrors,
      'contactEmail',
      isBlur
        ? validateAuditField(nextValues, 'contactEmail')
        : validateLiveEmail(nextValues.contactEmail)
    )

    return nextErrors
  }

  if (
    field === 'phoneNumber' ||
    field === 'phoneCountryCode' ||
    field === 'countryCode'
  ) {
    setFieldError(
      nextErrors,
      'phoneNumber',
      isBlur
        ? validateAuditField(nextValues, 'phoneNumber')
        : validateLivePhoneNumber(nextValues.phoneNumber, nextValues.phoneCountryCode)
    )

    if (isBlur || nextErrors.phoneCountryCode || field === 'phoneCountryCode') {
      setFieldError(
        nextErrors,
        'phoneCountryCode',
        validateAuditField(nextValues, 'phoneCountryCode')
      )
    }

    if (isBlur || nextErrors.countryCode || field === 'countryCode') {
      setFieldError(
        nextErrors,
        'countryCode',
        validateAuditField(nextValues, 'countryCode')
      )
    }

    return nextErrors
  }

  if (isBlur || nextErrors[field]) {
    setFieldError(nextErrors, field, validateAuditField(nextValues, field))
  }

  if (field === 'industry' && nextValues.industry !== 'Other') {
    delete nextErrors.industryOther
  }

  return nextErrors
}

function getBlurValues(values, field) {
  if (field === 'contactEmail') {
    return {
      ...values,
      contactEmail: values.contactEmail.trim(),
    }
  }

  if (field === 'phoneNumber') {
    return {
      ...values,
      phoneNumber: formatPhoneDisplay(values.phoneNumber, values.phoneCountryCode),
    }
  }

  return values
}

function availabilityHasSlot(availability, slotStartIso) {
  return availability?.days?.some((day) =>
    day.slots.some((slot) => slot.startIso === slotStartIso)
  )
}

export default function Audit() {
  const persistedState = useMemo(() => loadSessionState(), [])
  const initialValues = useMemo(
    () => createInitialValues(persistedState?.values),
    [persistedState]
  )
  const initialPhoneUiState = useMemo(
    () => createInitialPhoneUiState(persistedState?.uiState, initialValues),
    [initialValues, persistedState]
  )
  const initialMonth = persistedState?.selectedMonth || getCurrentMonthKey()

  const [step, setStep] = useState(
    persistedState?.step && STEP_ORDER.includes(persistedState.step)
      ? persistedState.step
      : 'intake'
  )
  const [values, setValues] = useState(initialValues)
  const [phoneUiState, setPhoneUiState] = useState(initialPhoneUiState)
  const [errors, setErrors] = useState({})
  const [leadContext, setLeadContext] = useState(persistedState?.leadContext || null)
  const [availability, setAvailability] = useState(
    persistedState?.availability || null
  )
  const [selectedMonth, setSelectedMonth] = useState(initialMonth)
  const [confirmation, setConfirmation] = useState(
    persistedState?.confirmation || null
  )
  const [panelError, setPanelError] = useState('')
  const [panelNotice, setPanelNotice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSlotIso, setBookingSlotIso] = useState('')

  const panelRef = useRef(null)
  const availabilityRequestRef = useRef(null)
  const hasAutoAdvanced = useRef(false)

  const fetchAvailability = useCallback(
    async (month, leadTokenOverride) => {
      const activeLeadToken = leadTokenOverride || leadContext?.leadToken

      if (!activeLeadToken) {
        return false
      }

      availabilityRequestRef.current?.abort()
      const controller = new AbortController()
      availabilityRequestRef.current = controller

      setSelectedMonth(month)
      setIsLoadingAvailability(true)
      setPanelError('')

      try {
        const response = await loadAvailability({
          month,
          leadToken: activeLeadToken,
          signal: controller.signal,
        })

        if (controller.signal.aborted) {
          return false
        }

        setAvailability(response)
        return true
      } catch (error) {
        if (error?.name === 'AbortError') {
          return false
        }

        setPanelError(
          error?.message || 'Availability could not be loaded. Please try again.'
        )
        return false
      } finally {
        if (availabilityRequestRef.current === controller) {
          availabilityRequestRef.current = null
          setIsLoadingAvailability(false)
        }
      }
    },
    [leadContext?.leadToken]
  )

  useEffect(() => {
    return () => {
      availabilityRequestRef.current?.abort()
    }
  }, [])

  useEffect(() => {
    if (step !== 'availability' || !availability || isLoadingAvailability) {
      return
    }

    const currentMonth = availability.monthMeta?.currentMonthKey
    const isCurrentEmpty =
      Boolean(currentMonth) &&
      availability.monthMeta?.key === currentMonth &&
      availability.days?.length === 0 &&
      availability.monthMeta?.nextKey

    if (!hasAutoAdvanced.current && isCurrentEmpty) {
      hasAutoAdvanced.current = true
      void fetchAvailability(
        availability.monthMeta.nextKey,
        leadContext?.leadToken
      )
    } else if (availability.days?.length > 0) {
      hasAutoAdvanced.current = true
    }
  }, [
    availability,
    fetchAvailability,
    isLoadingAvailability,
    leadContext?.leadToken,
    selectedMonth,
    step,
  ])

  useEffect(() => {
    if (!bookingSlotIso || availabilityHasSlot(availability, bookingSlotIso)) {
      return
    }

    setBookingSlotIso('')
  }, [availability, bookingSlotIso])

  useEffect(() => {
    const sessionSnapshot = {
      step,
      values,
      uiState: phoneUiState,
      leadContext,
      availability,
      selectedMonth,
      confirmation,
    }

    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionSnapshot))
  }, [
    availability,
    confirmation,
    leadContext,
    phoneUiState,
    selectedMonth,
    step,
    values,
  ])

  useEffect(() => {
    if (step !== 'availability' || !leadContext?.leadToken || availability) {
      return
    }

    void fetchAvailability(selectedMonth, leadContext.leadToken)
  }, [availability, fetchAvailability, leadContext, selectedMonth, step])

  function focusFirstError(fieldErrors) {
    const firstField = Object.keys(fieldErrors)[0]

    if (!firstField || !panelRef.current) {
      return
    }

    const element = panelRef.current.querySelector(`[name="${firstField}"]`)

    if (element) {
      element.focus()
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  function updateField(field, value) {
    const { nextValues, nextPhoneUiState } = buildNextFieldState(
      values,
      phoneUiState,
      field,
      value
    )

    setValues(nextValues)
    setPhoneUiState(nextPhoneUiState)
    setPanelError('')
    setPanelNotice('')
    setErrors((previousErrors) =>
      mergeFieldErrors(previousErrors, nextValues, field, 'change')
    )
  }

  function updatePhoneCountry(option) {
    const { nextValues, nextPhoneUiState } = buildNextPhoneCountryState(
      values,
      option
    )

    setValues(nextValues)
    setPhoneUiState(nextPhoneUiState)
    setPanelError('')
    setPanelNotice('')
    setErrors((previousErrors) =>
      mergeFieldErrors(previousErrors, nextValues, 'phoneCountryCode', 'change')
    )
  }

  function blurField(field) {
    const nextValues = getBlurValues(values, field)

    if (nextValues !== values) {
      setValues(nextValues)
    }

    setErrors((previousErrors) =>
      mergeFieldErrors(previousErrors, nextValues, field, 'blur')
    )
  }

  async function handleIntakeSubmit(event) {
    event.preventDefault()

    const validationErrors = validateAuditValues(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      focusFirstError(validationErrors)
      return
    }

    setIsSubmitting(true)
    setPanelError('')
    setPanelNotice('')

    try {
      const response = await submitLead(values)
      const monthKey = getCurrentMonthKey()

      hasAutoAdvanced.current = false
      setLeadContext(response)
      setConfirmation(null)
      setStep('availability')
      setSelectedMonth(monthKey)
      setAvailability(null)

      await fetchAvailability(monthKey, response.leadToken)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      if (error?.fieldErrors) {
        setErrors(error.fieldErrors)
        focusFirstError(error.fieldErrors)
      }

      setPanelError(
        error?.message || 'Your intake could not be submitted. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleBookSlot(slotStartIso) {
    if (!leadContext?.leadToken) {
      return
    }

    setIsBooking(true)
    setPanelError('')
    setPanelNotice('')

    try {
      const response = await bookSlot({
        leadToken: leadContext.leadToken,
        slotStartIso,
      })

      setConfirmation(response)
      setStep('confirmed')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      if (error?.code === 'STALE_SLOT') {
        setBookingSlotIso('')
        const didRefresh = await fetchAvailability(selectedMonth)

        setPanelNotice(
          didRefresh
            ? 'That time was just taken. Availability has been refreshed.'
            : 'That time was just taken. Refresh availability and choose another slot.'
        )
      } else {
        setPanelError(
          error?.message || 'That slot is no longer available. Please pick another time.'
        )
      }
    } finally {
      setIsBooking(false)
    }
  }

  function handleMonthChange(nextMonth) {
    setBookingSlotIso('')
    setPanelError('')
    setPanelNotice('')
    void fetchAvailability(nextMonth)
  }

  function handleSelectSlot(slotStartIso) {
    setBookingSlotIso(slotStartIso)
    setPanelError('')
    setPanelNotice('')
  }

  function handleReturnToIntake() {
    setStep('intake')
    setLeadContext(null)
    setAvailability(null)
    setConfirmation(null)
    setPanelError('')
    setPanelNotice('')
    setBookingSlotIso('')
  }

  function handleStartOver() {
    const defaultValues = createInitialValues()

    setStep('intake')
    setValues(defaultValues)
    setPhoneUiState(createInitialPhoneUiState(null, defaultValues))
    setErrors({})
    setLeadContext(null)
    setAvailability(null)
    setConfirmation(null)
    setPanelError('')
    setPanelNotice('')
    setSelectedMonth(getCurrentMonthKey())
    setBookingSlotIso('')
    hasAutoAdvanced.current = false
    window.sessionStorage.removeItem(SESSION_KEY)
  }

  return (
    <div className="relative overflow-hidden bg-[var(--bg-primary)] pb-20 pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[var(--accent-glow)] blur-[130px]" />
        <div className="absolute right-0 top-40 h-[22rem] w-[22rem] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-white/[0.03] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1240px] gap-10 px-6 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-start">
        <AuditHero step={step} />

        <div
          ref={panelRef}
          className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(17,17,24,0.96),rgba(10,10,15,0.94))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-7"
        >
          {panelError ? (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/25 bg-red-500/10 px-5 py-4 text-[14px] text-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p>{panelError}</p>
            </div>
          ) : null}

          {!panelError && panelNotice ? (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-5 py-4 text-[14px] text-amber-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <p>{panelNotice}</p>
            </div>
          ) : null}

          {step === 'intake' ? (
            <AuditIntakeForm
              countries={countries}
              errors={errors}
              isSubmitting={isSubmitting}
              phoneCountryOptionCode={phoneUiState.phoneCountryOptionCode}
              phoneCountryOptions={phoneCountryOptions}
              values={values}
              onBlur={blurField}
              onChange={updateField}
              onPhoneCountryChange={updatePhoneCountry}
              onSubmit={handleIntakeSubmit}
            />
          ) : null}

          {step === 'availability' ? (
            <AuditAvailability
              availability={availability}
              isBooking={isBooking}
              isLoading={isLoadingAvailability}
              leadContext={leadContext}
              onConfirmBooking={handleBookSlot}
              onMonthChange={handleMonthChange}
              onReset={handleReturnToIntake}
              onSelectSlot={handleSelectSlot}
              selectedMonth={selectedMonth}
              selectedSlotIso={bookingSlotIso}
            />
          ) : null}

          {step === 'confirmed' && confirmation ? (
            <AuditConfirmation
              confirmation={confirmation}
              onStartOver={handleStartOver}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
