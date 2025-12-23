import { useState, useEffect } from 'react'
import { ArrowRight, Check } from 'lucide-react'

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

const timelines = [
  'ASAP',
  'Next 30 days',
  '60–90 days',
  'Just exploring'
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

export default function Begin() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    industry: '',
    name: '',
    email: '',
    phone: '',
    volume: '',
    channels: [],
    painPoints: [],
    crm: '',
    schedulingTool: '',
    decisionMaker: '',
    timeline: '',
    budget: ''
  })

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(2)
    // In production, you'd send formData to your backend here
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

  return (
    <div className="bg-[#0a0a0a] pt-24 min-h-screen">

      {/* HERO */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
            Begin
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
            Let's see if automation fits.
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed">
            This isn't a sales call. It's a short diagnostic to see where leads
            are slipping and what a system would look like.
          </p>
        </div>
      </section>

      {/* FORM / CALENDAR */}
      <section className="py-12 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-2xl px-6">

          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-12">

              {/* BUSINESS DETAILS */}
              <div>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  Business Details
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Business name *</label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => updateField('businessName', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Website (optional)</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Industry *</label>
                    <select
                      required
                      value={formData.industry}
                      onChange={(e) => updateField('industry', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                    >
                      <option value="">Select industry</option>
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* CONTACT */}
              <div>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  Contact
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* VOLUME + CHANNELS */}
              <div>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  Volume + Channels
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Monthly inbound interactions *</label>
                    <select
                      required
                      value={formData.volume}
                      onChange={(e) => updateField('volume', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                    >
                      <option value="">Select volume</option>
                      {volumes.map(vol => (
                        <option key={vol} value={vol}>{vol}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-3">Channels you use</label>
                    <div className="flex flex-wrap gap-2">
                      {channels.map(channel => (
                        <button
                          key={channel}
                          type="button"
                          onClick={() => toggleArrayField('channels', channel)}
                          className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                            formData.channels.includes(channel)
                              ? 'bg-[#d4af37] text-black border-[#d4af37]'
                              : 'bg-transparent text-gray-400 border-[#2d2d2d] hover:border-gray-500'
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
              <div>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  What are you trying to fix?
                </p>
                <div className="flex flex-wrap gap-2">
                  {painPoints.map(point => (
                    <button
                      key={point}
                      type="button"
                      onClick={() => toggleArrayField('painPoints', point)}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                        formData.painPoints.includes(point)
                          ? 'bg-[#d4af37] text-black border-[#d4af37]'
                          : 'bg-transparent text-gray-400 border-[#2d2d2d] hover:border-gray-500'
                      }`}
                    >
                      {point}
                    </button>
                  ))}
                </div>
              </div>

              {/* TOOLS */}
              <div>
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
                      className="w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                      placeholder="e.g. HubSpot, Salesforce, GoHighLevel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Scheduling tool</label>
                    <input
                      type="text"
                      value={formData.schedulingTool}
                      onChange={(e) => updateField('schedulingTool', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                      placeholder="e.g. Calendly, ServiceTitan"
                    />
                  </div>
                </div>
              </div>

              {/* DECISION */}
              <div>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  Decision
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Are you the decision-maker? *</label>
                    <div className="flex gap-4">
                      {['Yes', 'No', 'One of them'].map(option => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField('decisionMaker', option)}
                          className={`px-6 py-2 rounded-full text-sm border transition-colors ${
                            formData.decisionMaker === option
                              ? 'bg-[#d4af37] text-black border-[#d4af37]'
                              : 'bg-transparent text-gray-400 border-[#2d2d2d] hover:border-gray-500'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Timeline *</label>
                    <select
                      required
                      value={formData.timeline}
                      onChange={(e) => updateField('timeline', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                    >
                      <option value="">Select timeline</option>
                      {timelines.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Comfortable investing in a done-for-you build?
                    </label>
                    <div className="flex gap-4">
                      {['Yes', 'Not sure', 'No'].map(option => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField('budget', option)}
                          className={`px-6 py-2 rounded-full text-sm border transition-colors ${
                            formData.budget === option
                              ? 'bg-[#d4af37] text-black border-[#d4af37]'
                              : 'bg-transparent text-gray-400 border-[#2d2d2d] hover:border-gray-500'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full group flex items-center justify-center gap-3 bg-[#d4af37] text-black py-4 rounded-full font-semibold hover:bg-[#f4d03f] transition-all duration-300"
              >
                Continue to scheduling
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

            </form>
          )}

          {step === 2 && (
            <div className="space-y-12">
              {/* Success message */}
              <div className="flex items-center gap-3 p-4 bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center">
                  <Check className="h-4 w-4 text-black" />
                </div>
                <p className="text-gray-300">
                  Thanks, {formData.name}. Now pick a time.
                </p>
              </div>

              {/* Calendar */}
              <div>
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-4">
                  Pick a Time
                </p>
                <p className="text-gray-400 mb-6">
                  30 minutes. We'll review your answers beforehand.
                </p>
                <div className="rounded-2xl overflow-hidden border border-[#1a1a1a]">
                  <div
                    id="calendly-embed"
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/leviathanaidev?background_color=ffffff&text_color=1a1a1a&primary_color=d4af37"
                    style={{ minWidth: '280px', height: '650px' }}
                  />
                </div>
              </div>

              {/* What happens next */}
              <div className="border-t border-[#1a1a1a] pt-12">
                <p className="text-[#d4af37] text-xs font-medium tracking-[0.3em] uppercase mb-6">
                  After You Book
                </p>
                <div className="space-y-4">
                  {[
                    "We review your answers before the call.",
                    "We map where leads are leaking.",
                    "You leave with a clear recommendation—even if we're not the right fit."
                  ].map((item, index) => (
                    <div key={item} className="flex gap-4">
                      <span className="text-[#d4af37]/50 font-bold">{index + 1}.</span>
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
              className="text-gray-400 hover:text-white transition-colors"
            >
              hello@leviathansystems.com
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
