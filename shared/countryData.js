const priorityByCode = {
  CA: 1,
  US: 2,
  GB: 3,
  AU: 4,
}

const countryDefinitions = [
  { code: 'AR', name: 'Argentina', dialCode: '+54' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'AT', name: 'Austria', dialCode: '+43' },
  { code: 'BE', name: 'Belgium', dialCode: '+32' },
  { code: 'BR', name: 'Brazil', dialCode: '+55' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'CL', name: 'Chile', dialCode: '+56' },
  { code: 'CN', name: 'China', dialCode: '+86' },
  { code: 'CO', name: 'Colombia', dialCode: '+57' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420' },
  { code: 'DK', name: 'Denmark', dialCode: '+45' },
  { code: 'EG', name: 'Egypt', dialCode: '+20' },
  { code: 'FI', name: 'Finland', dialCode: '+358' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'GR', name: 'Greece', dialCode: '+30' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62' },
  { code: 'IE', name: 'Ireland', dialCode: '+353' },
  { code: 'IL', name: 'Israel', dialCode: '+972' },
  { code: 'IT', name: 'Italy', dialCode: '+39' },
  { code: 'JP', name: 'Japan', dialCode: '+81' },
  { code: 'KE', name: 'Kenya', dialCode: '+254' },
  { code: 'MX', name: 'Mexico', dialCode: '+52' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234' },
  { code: 'NO', name: 'Norway', dialCode: '+47' },
  { code: 'PH', name: 'Philippines', dialCode: '+63' },
  { code: 'PL', name: 'Poland', dialCode: '+48' },
  { code: 'PT', name: 'Portugal', dialCode: '+351' },
  { code: 'QA', name: 'Qatar', dialCode: '+974' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966' },
  { code: 'SG', name: 'Singapore', dialCode: '+65' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27' },
  { code: 'KR', name: 'South Korea', dialCode: '+82' },
  { code: 'ES', name: 'Spain', dialCode: '+34' },
  { code: 'SE', name: 'Sweden', dialCode: '+46' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41' },
  { code: 'TR', name: 'Turkey', dialCode: '+90' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'US', name: 'United States', dialCode: '+1' },
]

function buildFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .split('')
    .map((character) => String.fromCodePoint(character.charCodeAt(0) + 127397))
    .join('')
}

function sortCountries(a, b) {
  const priorityA = priorityByCode[a.code] ?? Number.MAX_SAFE_INTEGER
  const priorityB = priorityByCode[b.code] ?? Number.MAX_SAFE_INTEGER

  if (priorityA !== priorityB) {
    return priorityA - priorityB
  }

  return a.name.localeCompare(b.name)
}

export const countries = countryDefinitions
  .map((country) => ({
    ...country,
    flag: buildFlagEmoji(country.code),
    priority: priorityByCode[country.code] ?? null,
  }))
  .sort(sortCountries)

export const DEFAULT_COUNTRY_CODE = 'CA'
export const DEFAULT_DIALING_CODE = '+1'
export const DEFAULT_PHONE_COUNTRY_OPTION_CODE = DEFAULT_COUNTRY_CODE

export const countryCodeSet = new Set(countries.map((country) => country.code))

export const countryByCode = Object.fromEntries(
  countries.map((country) => [country.code, country])
)

export const phoneCountryOptions = countries.map((country) => ({
  optionCode: country.code,
  countryCode: country.code,
  value: country.code,
  dialCode: country.dialCode,
  name: country.name,
  flag: country.flag,
  priority: country.priority,
  searchText: `${country.name} ${country.code} ${country.dialCode}`,
}))

export const phoneCountryOptionByCode = Object.fromEntries(
  phoneCountryOptions.map((option) => [option.optionCode, option])
)

export const dialingCodeOptions = phoneCountryOptions

export const dialingCodeSet = new Set(
  phoneCountryOptions.map((option) => option.dialCode)
)

export function findCountryByCode(countryCode) {
  return countryByCode[countryCode]
}

export function findPhoneCountryOptionByCode(optionCode) {
  return phoneCountryOptionByCode[optionCode]
}

export function findFirstPhoneCountryOptionByDialCode(dialCode) {
  return phoneCountryOptions.find((option) => option.dialCode === dialCode)
}
