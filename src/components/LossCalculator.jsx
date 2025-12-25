import { useState } from 'react'
import { DollarSign, Clock, Users, Percent, ChevronDown } from 'lucide-react'

const getDecayRate = (minutes) => {
  if (minutes < 5) return 0
  if (minutes <= 15) return 0.10
  if (minutes <= 60) return 0.25
  if (minutes <= 240) return 0.40
  if (minutes <= 1440) return 0.60
  return 0.75
}

const responseOptions = [
  { label: 'Under 5 minutes', value: 3, decay: '0%' },
  { label: '5-15 minutes', value: 10, decay: '10%' },
  { label: '15-60 minutes', value: 30, decay: '25%' },
  { label: '1-4 hours', value: 120, decay: '40%' },
  { label: '4-24 hours', value: 720, decay: '60%' },
  { label: 'Over 24 hours', value: 2880, decay: '75%' },
]

const formatCurrency = (num) => {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`
  return `$${num.toLocaleString()}`
}

export default function LossCalculator({ onComplete }) {
  const [leadsPerWeek, setLeadsPerWeek] = useState('')
  const [avgJobValue, setAvgJobValue] = useState('')
  const [responseTime, setResponseTime] = useState(null)
  const [closeRate, setCloseRate] = useState('')
  const [errors, setErrors] = useState({})

  const calculate = () => {
    const leads = parseFloat(leadsPerWeek) || 0
    const jobValue = parseFloat(avgJobValue) || 0
    const rate = parseFloat(closeRate) / 100 || 0
    const decay = responseTime ? getDecayRate(responseTime.value) : 0

    const lostLeadsPerWeek = leads * decay
    const monthlyLoss = lostLeadsPerWeek * 4.33 * jobValue * rate
    const monthlyJobsLost = lostLeadsPerWeek * 4.33 * rate

    return {
      lostLeadsPerWeek: Math.round(lostLeadsPerWeek * 10) / 10,
      monthlyLoss: Math.round(monthlyLoss),
      monthlyJobsLost: Math.round(monthlyJobsLost * 10) / 10,
      decayPercent: decay * 100
    }
  }

  const results = calculate()
  const hasAllInputs = leadsPerWeek && avgJobValue && responseTime && closeRate
  const showResults = hasAllInputs

  const validate = () => {
    const newErrors = {}
    if (!leadsPerWeek) newErrors.leadsPerWeek = true
    if (!avgJobValue) newErrors.avgJobValue = true
    if (!responseTime) newErrors.responseTime = true
    if (!closeRate) newErrors.closeRate = true
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate() && onComplete) {
      onComplete(results)
    }
  }

  return (
    <div id="calculator-form" className="w-full max-w-xl">
      <div className="bg-[#0a0f1a] border border-[#1a2332] rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1a2332]">
          <h3 className="text-lg font-semibold text-white">Lead Leak Check</h3>
        </div>

        {/* Example result — shown before interaction */}
        {!hasAllInputs && (
          <div className="px-6 py-4 bg-[#0d1320] border-b border-[#1a2332]">
            <p className="text-sm text-[#9ca3af] mb-3">
              20 leads/week, $2,500 avg job, 30% close rate, 1-4 hour response:
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">$8,650</span>
              <span className="text-sm text-[#6b7280]">lost per month</span>
            </div>
          </div>
        )}

        {/* Inputs */}
        <div className="p-6 space-y-5">

          <div>
            <label className="flex items-center gap-2 text-sm text-[#9ca3af] mb-2">
              <Users className="w-4 h-4" />
              How many leads do you get per week?
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={leadsPerWeek}
              onChange={(e) => {
                setLeadsPerWeek(e.target.value)
                setErrors(prev => ({ ...prev, leadsPerWeek: false }))
              }}
              placeholder="e.g., 20"
              className={`w-full px-4 py-3.5 bg-[#030306] border rounded-xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] transition-colors ${
                errors.leadsPerWeek ? 'border-red-500/50' : 'border-[#1a2332]'
              }`}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-[#9ca3af] mb-2">
              <DollarSign className="w-4 h-4" />
              What's your average job value?
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]">$</span>
              <input
                type="number"
                inputMode="numeric"
                value={avgJobValue}
                onChange={(e) => {
                  setAvgJobValue(e.target.value)
                  setErrors(prev => ({ ...prev, avgJobValue: false }))
                }}
                placeholder="e.g., 2,500"
                className={`w-full pl-8 pr-4 py-3.5 bg-[#030306] border rounded-xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] transition-colors ${
                  errors.avgJobValue ? 'border-red-500/50' : 'border-[#1a2332]'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-[#9ca3af] mb-2">
              <Clock className="w-4 h-4" />
              How long does it usually take you to respond?
            </label>
            <div className="relative">
              <select
                value={responseTime ? responseTime.value : ''}
                onChange={(e) => {
                  const selected = responseOptions.find(opt => opt.value === parseInt(e.target.value))
                  setResponseTime(selected)
                  setErrors(prev => ({ ...prev, responseTime: false }))
                }}
                className={`w-full px-4 py-3.5 bg-[#030306] border rounded-xl text-white appearance-none focus:outline-none focus:border-[#00d4cf] transition-colors cursor-pointer ${
                  errors.responseTime ? 'border-red-500/50' : 'border-[#1a2332]'
                } ${!responseTime ? 'text-[#4b5563]' : ''}`}
              >
                <option value="" disabled>Select your typical response time</option>
                {responseOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-[#9ca3af] mb-2">
              <Percent className="w-4 h-4" />
              What percentage of leads do you usually close?
            </label>
            <div className="relative">
              <input
                type="number"
                inputMode="numeric"
                value={closeRate}
                onChange={(e) => {
                  const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                  setCloseRate(e.target.value ? String(val) : '')
                  setErrors(prev => ({ ...prev, closeRate: false }))
                }}
                placeholder="e.g., 30"
                className={`w-full pr-10 pl-4 py-3.5 bg-[#030306] border rounded-xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] transition-colors ${
                  errors.closeRate ? 'border-red-500/50' : 'border-[#1a2332]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280]">%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        {showResults && hasAllInputs && (
          <div className="border-t border-[#1a2332] p-6 bg-[#0d1320]">
            <p className="text-sm text-[#9ca3af] mb-4">
              Based on your numbers, slow response time is likely costing you:
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#030306] rounded-xl border border-[#1a2332]">
                <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-1">
                  Lost per month
                </p>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(results.monthlyLoss)}
                </p>
              </div>
              <div className="p-4 bg-[#030306] rounded-xl border border-[#1a2332]">
                <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-1">
                  Jobs missed
                </p>
                <p className="text-3xl font-bold text-white">
                  ~{results.monthlyJobsLost}<span className="text-lg font-normal text-[#6b7280]">/mo</span>
                </p>
              </div>
            </div>

            <p className="text-sm text-[#6b7280] mb-4">
              That's roughly <span className="text-white font-medium">{results.lostLeadsPerWeek} leads per week</span> that likely went to a competitor who responded faster.
            </p>

            <div className="p-4 bg-[#030306]/50 rounded-xl border border-[#1a2332] mb-6">
              <p className="text-sm text-[#9ca3af] mb-2">
                Based on industry response data. Conservative estimates.
              </p>
              <p className="text-sm text-white font-medium">
                Even if this model is wrong by 50%, the loss is still material.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 px-6 bg-white text-[#030306] font-semibold rounded-xl transition-all duration-300 hover:bg-[#00d4cf]"
            >
              Run the Lead Leak Check
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
