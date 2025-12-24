import { useState, useEffect, useRef } from 'react'
import { AlertTriangle, TrendingDown, DollarSign, Clock, Users, Percent, ChevronDown, Info } from 'lucide-react'

// Response time decay model (from doctrine)
const getResponsePenalty = (minutes) => {
  if (minutes < 5) return 0
  if (minutes <= 15) return 0.10
  if (minutes <= 60) return 0.25
  if (minutes <= 240) return 0.40  // 4 hours
  if (minutes <= 1440) return 0.60 // 24 hours
  return 0.75
}

const responseTimeOptions = [
  { label: 'Under 5 minutes', value: 3, penalty: '0%' },
  { label: '5-15 minutes', value: 10, penalty: '10%' },
  { label: '15-60 minutes', value: 30, penalty: '25%' },
  { label: '1-4 hours', value: 120, penalty: '40%' },
  { label: '4-24 hours', value: 720, penalty: '60%' },
  { label: 'Over 24 hours', value: 2880, penalty: '75%' },
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
  const [showResults, setShowResults] = useState(false)
  const [errors, setErrors] = useState({})
  const [showMethodology, setShowMethodology] = useState(false)

  const firstInputRef = useRef(null)

  // Calculate losses
  const calculateLoss = () => {
    const leads = parseFloat(leadsPerWeek) || 0
    const jobValue = parseFloat(avgJobValue) || 0
    const rate = parseFloat(closeRate) / 100 || 0
    const penalty = responseTime ? getResponsePenalty(responseTime.value) : 0

    const lostLeadsPerWeek = leads * penalty
    const lostRevenuePerMonth = lostLeadsPerWeek * 4.33 * jobValue * rate
    const lostJobsPerMonth = lostLeadsPerWeek * 4.33 * rate

    return {
      lostLeadsPerWeek: Math.round(lostLeadsPerWeek * 10) / 10,
      lostRevenuePerMonth: Math.round(lostRevenuePerMonth),
      lostJobsPerMonth: Math.round(lostJobsPerMonth * 10) / 10,
      penalty: penalty * 100
    }
  }

  const results = calculateLoss()
  const hasAllInputs = leadsPerWeek && avgJobValue && responseTime && closeRate

  // Focus first input on mount
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [])

  // Show results when all inputs filled
  useEffect(() => {
    if (hasAllInputs && !showResults) {
      setShowResults(true)
    }
  }, [hasAllInputs])

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
    <div id="calculator" className="w-full max-w-2xl mx-auto">
      {/* Calculator Card */}
      <div className="bg-[#0a0f1a] border border-[#1a2332] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">

        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1a2332] bg-gradient-to-r from-[#0d1320] to-[#0a0f1a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Lead Leak Check</h2>
              <p className="text-sm text-[#6b7280]">See what delayed response is costing you</p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="p-6 space-y-5">

          {/* Leads per week */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#9ca3af] mb-2">
              <Users className="w-4 h-4" />
              Leads per week
            </label>
            <input
              ref={firstInputRef}
              type="number"
              inputMode="numeric"
              value={leadsPerWeek}
              onChange={(e) => {
                setLeadsPerWeek(e.target.value)
                setErrors(prev => ({ ...prev, leadsPerWeek: false }))
              }}
              placeholder="e.g. 25"
              className={`w-full px-4 py-3.5 bg-[#0d1320] border rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all ${
                errors.leadsPerWeek ? 'border-red-500' : 'border-[#1a2332]'
              }`}
            />
          </div>

          {/* Average job value */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#9ca3af] mb-2">
              <DollarSign className="w-4 h-4" />
              Average job value
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
                placeholder="e.g. 2500"
                className={`w-full pl-8 pr-4 py-3.5 bg-[#0d1320] border rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all ${
                  errors.avgJobValue ? 'border-red-500' : 'border-[#1a2332]'
                }`}
              />
            </div>
          </div>

          {/* Response time */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#9ca3af] mb-2">
              <Clock className="w-4 h-4" />
              Typical response time
            </label>
            <div className="relative">
              <select
                value={responseTime ? responseTime.value : ''}
                onChange={(e) => {
                  const selected = responseTimeOptions.find(opt => opt.value === parseInt(e.target.value))
                  setResponseTime(selected)
                  setErrors(prev => ({ ...prev, responseTime: false }))
                }}
                className={`w-full px-4 py-3.5 bg-[#0d1320] border rounded-2xl text-white appearance-none focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all cursor-pointer ${
                  errors.responseTime ? 'border-red-500' : 'border-[#1a2332]'
                } ${!responseTime ? 'text-[#4b5563]' : ''}`}
              >
                <option value="" disabled>Select response time</option>
                {responseTimeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} ({opt.penalty} leak rate)
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
            </div>
          </div>

          {/* Close rate */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#9ca3af] mb-2">
              <Percent className="w-4 h-4" />
              Close rate on qualified leads
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
                placeholder="e.g. 30"
                className={`w-full pr-8 pl-4 py-3.5 bg-[#0d1320] border rounded-2xl text-white placeholder-[#4b5563] focus:outline-none focus:border-[#00d4cf] focus:ring-1 focus:ring-[#00d4cf]/30 transition-all ${
                  errors.closeRate ? 'border-red-500' : 'border-[#1a2332]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280]">%</span>
            </div>
          </div>
        </div>

        {/* Results - Always visible once all inputs filled */}
        {showResults && hasAllInputs && (
          <div className="border-t border-[#1a2332]">
            {/* Loss summary */}
            <div className="p-6 bg-gradient-to-br from-red-950/30 to-[#0a0f1a]">
              <div className="flex items-start gap-3 mb-5">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-red-400 font-medium">You're leaking revenue.</p>
                  <p className="text-[#9ca3af] text-sm mt-1">
                    Based on {responseTime.penalty} lead decay at {responseTime.label.toLowerCase()} response.
                  </p>
                </div>
              </div>

              {/* Big numbers */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-[#0d1320]/80 rounded-xl p-4 border border-red-500/20">
                  <p className="text-[#9ca3af] text-xs uppercase tracking-wider mb-1">Lost Revenue / Month</p>
                  <p className="text-3xl font-bold text-red-400">{formatCurrency(results.lostRevenuePerMonth)}</p>
                </div>
                <div className="bg-[#0d1320]/80 rounded-xl p-4 border border-[#1a2332]">
                  <p className="text-[#9ca3af] text-xs uppercase tracking-wider mb-1">Lost Jobs / Month</p>
                  <p className="text-3xl font-bold text-white">{results.lostJobsPerMonth}</p>
                </div>
              </div>

              <p className="text-[#9ca3af] text-sm">
                That's <span className="text-white font-medium">~{results.lostLeadsPerWeek} leads per week</span> you never got the chance to win.
              </p>
            </div>

            {/* CTA */}
            <div className="p-6 pt-0 bg-gradient-to-br from-red-950/30 to-[#0a0f1a]">
              <button
                onClick={handleSubmit}
                className="w-full py-4 px-6 bg-[#00d4cf] hover:bg-[#00e5df] text-[#0a0f1a] font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#00d4cf]/25"
              >
                Get Your Automation Audit
              </button>
              <p className="text-center text-[#6b7280] text-xs mt-3">
                30 minutes. We map the leak and show you the fix.
              </p>
            </div>
          </div>
        )}

        {/* Methodology toggle */}
        <div className="px-6 pb-5">
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="flex items-center gap-2 text-xs text-[#6b7280] hover:text-[#9ca3af] transition-colors"
          >
            <Info className="w-3 h-3" />
            {showMethodology ? 'Hide' : 'Show'} methodology
          </button>

          {showMethodology && (
            <div className="mt-3 p-4 bg-[#0d1320] rounded-lg border border-[#1a2332] text-xs text-[#6b7280] space-y-2">
              <p><strong className="text-[#9ca3af]">Response Time Decay Model:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>&lt;5 min = 0% loss (gold standard)</li>
                <li>5-15 min = 10% loss</li>
                <li>15-60 min = 25% loss</li>
                <li>1-4 hours = 40% loss</li>
                <li>4-24 hours = 60% loss</li>
                <li>&gt;24 hours = 75% loss</li>
              </ul>
              <p className="pt-2 border-t border-[#1a2332]">
                Lost revenue = (leads × decay rate) × 4.33 weeks × job value × close rate
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
