import { useState, useEffect } from 'react'
import { ArrowRight, Check, AlertCircle, ChevronDown } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const industries = [
  'Home Services',
  'Agency / Marketing',
  'Healthcare / Clinic',
  'Professional Services',
  'Real Estate',
  'Other'
]

const volumes = [
  'Less than 500',
  '500 – 2,000',
  '2,000 – 10,000',
  '10,000+'
]

const channels = [
  'Inbound calls',
  'Web chat',
  'SMS',
  'Contact forms',
  'Other'
]

const painPoints = [
  'Missed calls / slow response',
  'Scheduling bottlenecks',
  'Follow-up falling through',
  'CRM out of sync',
  'Lead qualification',
  'Something else'
]

// Country data with flags and phone codes
const countries = [
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  { code: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
  { code: 'AE', name: 'UAE', dial: '+971', flag: '🇦🇪' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
]

export default function Begin() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    industry: '',
    name: '',
    email: '',
    country: countries[0],
    phone: '',
    volume: '',
    channels: [],
    painPoints: [],
    crm: '',
    schedulingTool: ''
  })
  const [errors, setErrors] = useState({})

  const [heroRef, heroVisible] = useScrollAnimation(0.1)

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
  }

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePhone = (phone) => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '')
    // Check if it has a reasonable length (7-15 digits)
    return digits.length >= 7 && digits.length <= 15
  }

  const formatPhone = (value) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '')

    // Format based on length (US/CA format)
    if (formData.country.dial === '+1') {
      if (digits.length <= 3) return digits
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    }

    return digits
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value)
    updateField('phone', formatted)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required'
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select an industry'
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.volume) {
      newErrors.volume = 'Please select your monthly volume'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    // Prepare form data for submission
    const submitData = {
      businessName: formData.businessName,
      website: formData.website,
      industry: formData.industry,
      name: formData.name,
      email: formData.email,
      phone: `${formData.country.dial} ${formData.phone}`,
      country: formData.country.name,
      volume: formData.volume,
      channels: formData.channels.join(', '),
      painPoints: formData.painPoints.join(', '),
      crm: formData.crm,
      schedulingTool: formData.schedulingTool,
      submittedAt: new Date().toISOString()
    }

    try {
      // Send to Formspree - submissions go to leviathanaidev@gmail.com
      // Note: You need to verify this form at formspree.io after first submission
      const response = await fetch('https://formspree.io/f/mwpkpqjd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submitData)
      })

      if (response.ok) {
        setStep(2)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      setSubmitError('Something went wrong. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Initialize Calendly when step 2 is shown
  useEffect(() => {
    if (step === 2 && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/leviathanaidev?background_color=ffffff&text_color=1a1a1a&primary_color=d4af37',
        parentElement: document.getElementById('calendly-embed'),
      })
    }
  }, [step])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownOpen && !e.target.closest('.country-selector')) {
        setCountryDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [countryDropdownOpen])

  return (
    <div className="bg-[#0a0a0a] pt-24 min-h-screen">

      {/* HERO */}
      <section className="py-16 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#d4af37]/[0.02] blur-[100px] pointer-events-none" />

        <div
          ref={heroRef}
          className={`mx-auto max-w-2xl px-6 text-center relative z-10 transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="hero-badge text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Begin
          </p>

          <h1 className="hero-title text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
            Let's see if automation fits.
          </h1>

          <p className="hero-subtitle text-lg text-gray-400 leading-relaxed">
            This isn't a sales call. It's a short diagnostic to see where leads
            are slipping and what a system would look like.
          </p>
        </div>
      </section>

      {/* FORM / CALENDAR */}
      <section className="py-12 border-t border-[#1a1a1a] section-fade-border">
        <div className="mx-auto max-w-2xl px-6">

          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-12">

              {/* BUSINESS DETAILS */}
              <div className="animate-fade-section" style={{ animationDelay: '0.1s' }}>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  Business Details
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Business name *</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => updateField('businessName', e.target.value)}
                      className={`input-premium w-full bg-[#0d0d0d] border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors ${
                        errors.businessName ? 'border-red-500' : 'border-[#2d2d2d] focus:border-[#d4af37]'
                      }`}
                      placeholder="Your company name"
                    />
                    {errors.businessName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.businessName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Website (optional)</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      className="input-premium w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none"
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Industry *</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => updateField('industry', e.target.value)}
                      className={`input-premium w-full bg-[#0d0d0d] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                        errors.industry ? 'border-red-500' : 'border-[#2d2d2d] focus:border-[#d4af37]'
                      }`}
                    >
                      <option value="">Select industry</option>
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.industry}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* CONTACT */}
              <div className="animate-fade-section" style={{ animationDelay: '0.2s' }}>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  Contact
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className={`input-premium w-full bg-[#0d0d0d] border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-[#2d2d2d] focus:border-[#d4af37]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={`input-premium w-full bg-[#0d0d0d] border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-[#2d2d2d] focus:border-[#d4af37]'
                      }`}
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone *</label>
                    <div className="flex gap-2">
                      {/* Country Selector */}
                      <div className="relative country-selector">
                        <button
                          type="button"
                          onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                          className="flex items-center gap-2 bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-3 py-3 text-white hover:border-[#d4af37]/50 transition-colors min-w-[120px]"
                        >
                          <span className="text-xl">{formData.country.flag}</span>
                          <span className="text-gray-400 text-sm">{formData.country.dial}</span>
                          <ChevronDown className={`w-4 h-4 text-gray-500 ml-auto transition-transform ${countryDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {countryDropdownOpen && (
                          <div className="absolute top-full left-0 mt-1 w-64 bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto overscroll-contain"
                            style={{
                              scrollbarWidth: 'thin',
                              scrollbarColor: '#d4af37 #1a1a1a'
                            }}
                          >
                            {countries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  updateField('country', country)
                                  setCountryDropdownOpen(false)
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#1a1a1a] transition-colors text-left ${
                                  formData.country.code === country.code ? 'bg-[#1a1a1a]' : ''
                                }`}
                              >
                                <span className="text-xl">{country.flag}</span>
                                <span className="text-white text-sm">{country.name}</span>
                                <span className="text-gray-500 text-sm ml-auto">{country.dial}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Phone Input */}
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`input-premium flex-1 bg-[#0d0d0d] border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-[#2d2d2d] focus:border-[#d4af37]'
                        }`}
                        placeholder={formData.country.dial === '+1' ? '(555) 123-4567' : 'Phone number'}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* VOLUME + CHANNELS */}
              <div className="animate-fade-section" style={{ animationDelay: '0.3s' }}>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  Volume + Channels
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Monthly inbound interactions *</label>
                    <select
                      value={formData.volume}
                      onChange={(e) => updateField('volume', e.target.value)}
                      className={`input-premium w-full bg-[#0d0d0d] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
                        errors.volume ? 'border-red-500' : 'border-[#2d2d2d] focus:border-[#d4af37]'
                      }`}
                    >
                      <option value="">Select volume</option>
                      {volumes.map(vol => (
                        <option key={vol} value={vol}>{vol}</option>
                      ))}
                    </select>
                    {errors.volume && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.volume}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-3">Channels you use</label>
                    <div className="flex flex-wrap gap-2">
                      {channels.map(channel => (
                        <button
                          key={channel}
                          type="button"
                          onClick={() => toggleArrayField('channels', channel)}
                          className={`chip-select px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                            formData.channels.includes(channel)
                              ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                              : 'bg-transparent text-gray-400 border-[#2d2d2d] hover:border-[#d4af37]/50 hover:text-gray-300'
                          }`}
                        >
                          {channel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* PAIN POINTS */}
              <div className="animate-fade-section" style={{ animationDelay: '0.4s' }}>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  What are you trying to fix?
                </p>
                <div className="flex flex-wrap gap-2">
                  {painPoints.map(point => (
                    <button
                      key={point}
                      type="button"
                      onClick={() => toggleArrayField('painPoints', point)}
                      className={`chip-select px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                        formData.painPoints.includes(point)
                          ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                          : 'bg-transparent text-gray-400 border-[#2d2d2d] hover:border-[#d4af37]/50 hover:text-gray-300'
                      }`}
                    >
                      {point}
                    </button>
                  ))}
                </div>
              </div>

              {/* TOOLS */}
              <div className="animate-fade-section" style={{ animationDelay: '0.5s' }}>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  Current Tools
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">CRM you use</label>
                    <input
                      type="text"
                      value={formData.crm}
                      onChange={(e) => updateField('crm', e.target.value)}
                      className="input-premium w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none"
                      placeholder="e.g. HubSpot, Salesforce, GoHighLevel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Scheduling tool</label>
                    <input
                      type="text"
                      value={formData.schedulingTool}
                      onChange={(e) => updateField('schedulingTool', e.target.value)}
                      className="input-premium w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none"
                      placeholder="e.g. Calendly, ServiceTitan"
                    />
                  </div>
                </div>
              </div>

              {/* ERROR MESSAGE */}
              {submitError && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {submitError}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full group flex items-center justify-center gap-3 bg-[#d4af37] text-black py-4 rounded-full font-semibold hover:bg-[#f4d03f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Continue to scheduling
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>

            </form>
          )}

          {step === 2 && (
            <div className="space-y-12">
              {/* Success message */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#d4af37]/10 to-transparent border border-[#d4af37]/20 rounded-xl animate-fade-section">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shadow-lg shadow-[#d4af37]/30">
                  <Check className="h-5 w-5 text-black" />
                </div>
                <p className="text-white font-medium">
                  Thanks, {formData.name}. Now pick a time.
                </p>
              </div>

              {/* Calendar */}
              <div className="animate-fade-section" style={{ animationDelay: '0.2s' }}>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                  Pick a Time
                </p>
                <p className="text-gray-400 mb-6">
                  30 minutes. We'll review your answers beforehand.
                </p>
                <div className="rounded-2xl overflow-hidden border border-[#1a1a1a] shadow-2xl shadow-black/50">
                  <div
                    id="calendly-embed"
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/leviathanaidev?background_color=ffffff&text_color=1a1a1a&primary_color=d4af37"
                    style={{ minWidth: '280px', height: '650px' }}
                  />
                </div>
              </div>

              {/* What happens next */}
              <div className="border-t border-[#1a1a1a] pt-12 animate-fade-section" style={{ animationDelay: '0.4s' }}>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  After You Book
                </p>
                <div className="space-y-4">
                  {[
                    "We review your answers before the call.",
                    "We map where leads are leaking.",
                    "You leave with a clear recommendation—even if we're not the right fit."
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex gap-4 p-4 rounded-lg bg-[#0d0d0d]/50 border border-[#1a1a1a]/50 transition-all duration-300 hover:border-[#d4af37]/20"
                    >
                      <span className="text-[#d4af37] font-bold text-lg">{index + 1}.</span>
                      <p className="text-gray-400">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* NOT READY */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-sm text-gray-600">
            Prefer email?{' '}
            <a
              href="mailto:hello@leviathansystems.com"
              className="text-gray-400 hover:text-[#d4af37] transition-colors duration-300"
            >
              hello@leviathansystems.com
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
