import { z } from 'zod'
import {
  countryCodeSet,
  DEFAULT_COUNTRY_CODE,
  DEFAULT_DIALING_CODE,
  dialingCodeSet,
} from './countryData.js'

export const industryOptions = [
  'Home Services',
  'Agency / Marketing',
  'Healthcare / Clinic',
  'Professional Services',
  'Real Estate',
  'Other',
]

const websitePattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i
const postalPattern = /^[A-Za-z0-9][A-Za-z0-9 -]{1,10}[A-Za-z0-9]$/

const trimOptionalString = z.string().trim()

export function getPhoneMaxDigits(phoneCountryCode) {
  return phoneCountryCode === '+1' ? 10 : 15
}

export function getPhoneMinDigits(phoneCountryCode) {
  return phoneCountryCode === '+1' ? 10 : 7
}

export function sanitizePhoneInput(value, phoneCountryCode) {
  return String(value || '')
    .replace(/\D/g, '')
    .slice(0, getPhoneMaxDigits(phoneCountryCode))
}

export function formatPhoneDisplay(value, phoneCountryCode) {
  const digits = sanitizePhoneInput(value, phoneCountryCode)

  if (!digits) {
    return ''
  }

  if (phoneCountryCode === '+1') {
    if (digits.length <= 3) {
      return digits
    }

    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  return digits.match(/.{1,3}/g)?.join(' ') || digits
}

export function validateLivePhoneNumber(value, phoneCountryCode) {
  const digits = sanitizePhoneInput(value, phoneCountryCode)

  if (!digits.length) {
    return ''
  }

  if (phoneCountryCode === '+1') {
    return digits.length === 10 ? '' : 'Enter a 10-digit phone number.'
  }

  return digits.length >= 7 ? '' : 'Enter at least 7 digits.'
}

export function validateLiveEmail(value) {
  const email = String(value || '')

  if (!email) {
    return ''
  }

  if (/\s/.test(email)) {
    return 'Email cannot contain spaces.'
  }

  const atCount = email.split('@').length - 1

  if (atCount === 0 && email.length < 6 && !email.includes('.')) {
    return ''
  }

  if (atCount === 0) {
    return 'Include @ in the email address.'
  }

  if (atCount > 1) {
    return 'Use a single @ in the email address.'
  }

  const [localPart, domainPart] = email.split('@')

  if (!localPart || !domainPart) {
    return 'Enter a complete email address.'
  }

  if (email.includes('..')) {
    return 'Email cannot contain consecutive dots.'
  }

  if (
    !domainPart.includes('.') ||
    domainPart.startsWith('.') ||
    domainPart.endsWith('.') ||
    domainPart.split('.').some((segment) => !segment)
  ) {
    return 'Add a valid domain like company.com.'
  }

  return ''
}

export const auditSchema = z
  .object({
    businessName: z.string().trim().min(1, 'Business name is required.'),
    website: trimOptionalString.refine(
      (value) => !value || websitePattern.test(value),
      'Enter a valid website, for example example.com.'
    ),
    industry: z.string().trim().min(1, 'Select an industry.'),
    industryOther: trimOptionalString,
    contactEmail: z.string().trim().email('Enter a valid contact email.'),
    phoneCountryCode: z
      .string()
      .trim()
      .min(1, 'Select an international calling code.'),
    phoneNumber: z.string().trim().min(1, 'Phone number is required.'),
    addressLine1: z.string().trim().min(1, 'Address line 1 is required.'),
    addressLine2: trimOptionalString,
    city: z.string().trim().min(1, 'City is required.'),
    provinceState: z.string().trim().min(1, 'Province or state is required.'),
    postalCode: z.string().trim().min(1, 'Postal code is required.'),
    countryCode: z.string().trim().min(1, 'Select a country.'),
    auditGoals: z.string().trim().min(1, 'Audit goal is required.'),
  })
  .superRefine((values, context) => {
    if (!industryOptions.includes(values.industry)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['industry'],
        message: 'Select a valid industry.',
      })
    }

    if (values.industry === 'Other' && !values.industryOther.trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['industryOther'],
        message: 'Specify your industry.',
      })
    }

    if (!dialingCodeSet.has(values.phoneCountryCode)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phoneCountryCode'],
        message: 'Select a valid international calling code.',
      })
    }

    const phoneDigits = sanitizePhoneInput(
      values.phoneNumber,
      values.phoneCountryCode
    )

    if (!phoneDigits.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phoneNumber'],
        message: 'Phone number is required.',
      })
    } else if (values.phoneCountryCode === '+1' && phoneDigits.length !== 10) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phoneNumber'],
        message: 'Enter a 10-digit phone number.',
      })
    } else if (
      values.phoneCountryCode !== '+1' &&
      (phoneDigits.length < 7 || phoneDigits.length > 15)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phoneNumber'],
        message: 'Enter a phone number between 7 and 15 digits.',
      })
    }

    if (!countryCodeSet.has(values.countryCode)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['countryCode'],
        message: 'Select a valid country.',
      })
    }

    if (!postalPattern.test(values.postalCode)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['postalCode'],
        message: 'Enter a valid postal or ZIP code.',
      })
    }
  })

export function createAuditDefaultValues() {
  return {
    businessName: '',
    website: '',
    industry: '',
    industryOther: '',
    contactEmail: '',
    phoneCountryCode: DEFAULT_DIALING_CODE,
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    provinceState: '',
    postalCode: '',
    countryCode: DEFAULT_COUNTRY_CODE,
    auditGoals: '',
  }
}

export function buildFieldErrors(zodError) {
  return zodError.issues.reduce((fieldErrors, issue) => {
    const fieldName = issue.path[0]

    if (typeof fieldName === 'string' && !fieldErrors[fieldName]) {
      fieldErrors[fieldName] = issue.message
    }

    return fieldErrors
  }, {})
}

export function validateAuditValues(values) {
  const parsed = auditSchema.safeParse(values)

  if (parsed.success) {
    return {}
  }

  return buildFieldErrors(parsed.error)
}

export function validateAuditField(values, fieldName) {
  const parsed = auditSchema.safeParse(values)

  if (parsed.success) {
    return ''
  }

  return parsed.error.issues.find((issue) => issue.path[0] === fieldName)?.message || ''
}

export function normalizeWebsite(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export function normalizeAuditSubmission(values) {
  const parsed = auditSchema.parse(values)

  return {
    ...parsed,
    website: normalizeWebsite(parsed.website),
    postalCode: parsed.postalCode.toUpperCase(),
    phoneNumber: formatPhoneDisplay(parsed.phoneNumber, parsed.phoneCountryCode),
    auditGoals: parsed.auditGoals.trim(),
  }
}
