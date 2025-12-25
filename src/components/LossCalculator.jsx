import { useState, useEffect, useRef } from 'react'
import { Activity, DollarSign, Clock, Users, Percent, ChevronDown, Info } from 'lucide-react'

// Response latency decay model
const getDecayRate = (minutes) => {
  if (minutes < 5) return 0
  if (minutes <= 15) return 0.10
  if (minutes <= 60) return 0.25
  if (minutes <= 240) return 0.40
  if (minutes <= 1440) return 0.60
  return 0.75
}

const latencyOptions = [
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
  const [latency, setLatency] = useState(null)
  const [closeRate, setCloseRate] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [errors, setErrors] = useState({})
  const [showMethodology, setShowMethodology] = useState(false)

  const firstInputRef = useRef(null)

  const calculate = () => {
    const leads = parseFloat(leadsPerWeek) || 0
    const jobValue = parseFloat(avgJobValue) || 0
    const rate = parseFloat(closeRate) / 100 || 0
    const decay = latency ? getDecayRate(latency.value) : 0

    const decayedLeadsPerWeek = leads * decay
    const monthlyRevenueLoss = decayedLeadsPerWeek * 4.33 * jobValue * rate
    const monthlyJobsLost = decayedLeadsPerWeek * 4.33 * rate

    return {
      decayedLeadsPerWeek: Math.round(decayedLeadsPerWeek * 10) / 10,
      monthlyRevenueLoss: Math.round(monthlyRevenueLoss),
      monthlyJobsLost: Math.round(monthlyJobsLost * 10) / 10,
      decayPercent: decay * 100
    }
  }

  const results = calculate()
  const hasAllInputs = leadsPerWeek && avgJobValue && latency && closeRate

  useEffect(() => {
    if (hasAllInputs && !showResults) {
      setShowResults(true)
    }
  }, [hasAllInputs])

  const validate = () => {
    const newErrors = {}
    if (!leadsPerWeek) newErrors.leadsPerWeek = true
    if (!avgJobValue) newErrors.avgJobValue = true
    if (!latency) newErrors.latency = true
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
    <div id="calculator" className="w-full max-w-xl">
      <div className="bg-[#0a0f1a] border border-[#1a2332] rounded-xl overflow-hidden">

        {/* Header - minimal */}
        <div className="px-6 py-4 border-b border-[#1a2332]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1a2332] flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#6b7280]" />
            </div>
            <p className="text-sm text-[#6b7280] font-mono uppercase tracking-wider">
              Latency Calculator
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="p-6 space-y-5">

          <div>
            <label className="flex items-center gap-2 text-sm text-[#6b7280] mb-2">
              <Users className="w-4 h-4" />
              Weekly inbound volume
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
              placeholder="25"
              className={`w-full px-4 py-3 bg-[#050509] border rounded-lg text-white placeholder-[#2a3441] focus:outline-none focus:border-[#3d4a59] transition-colors ${
                errors.leadsPerWeek ? 'border-red-500/50' : 'border-[#1a2332]'
              }`}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-[#6b7280] mb-2">
              <DollarSign className="w-4 h-4" />
              Average contract value
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]">$</span>
              <input
                type="number"
                inputMode="numeric"
                value={avgJobValue}
                onChange={(e) => {
                  setAvgJobValue(e.target.value)
                  setErrors(prev => ({ ...prev, avgJobValue: false }))
                }}
                placeholder="2500"
                className={`w-full pl-8 pr-4 py-3 bg-[#050509] border rounded-lg text-white placeholder-[#2a3441] focus:outline-none focus:border-[#3d4a59] transition-colors ${
                  errors.avgJobValue ? 'border-red-500/50' : 'border-[#1a2332]'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-[#6b7280] mb-2">
              <Clock className="w-4 h-4" />
              Current response latency
            </label>
            <div className="relative">
              <select
                value={latency ? latency.value : ''}
                onChange={(e) => {
                  const selected = latencyOptions.find(opt => opt.value === parseInt(e.target.value))
                  setLatency(selected)
                  setErrors(prev => ({ ...prev, latency: false }))
                }}
                className={`w-full px-4 py-3 bg-[#050509] border rounded-lg text-white appearance-none focus:outline-none focus:border-[#3d4a59] transition-colors cursor-pointer ${
                  errors.latency ? 'border-red-500/50' : 'border-[#1a2332]'
                } ${!latency ? 'text-[#2a3441]' : ''}`}
              >
                <option value="" disabled>Select latency</option>
                {latencyOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} — {opt.decay} decay
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563] pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-[#6b7280] mb-2">
              <Percent className="w-4 h-4" />
              Close rate
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
                placeholder="30"
                className={`w-full pr-8 pl-4 py-3 bg-[#050509] border rounded-lg text-white placeholder-[#2a3441] focus:outline-none focus:border-[#3d4a59] transition-colors ${
                  errors.closeRate ? 'border-red-500/50' : 'border-[#1a2332]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4b5563]">%</span>
            </div>
          </div>
        </div>

        {/* Results - clinical, not dramatic */}
        {showResults && hasAllInputs && (
          <div className="border-t border-[#1a2332] p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#050509] rounded-lg border border-[#1a2332]">
                <p className="text-xs text-[#4b5563] uppercase tracking-wider mb-1 font-mono">
                  Monthly gap
                </p>
                <p className="text-2xl font-semibold text-white font-mono">
                  {formatCurrency(results.monthlyRevenueLoss)}
                </p>
              </div>
              <div className="p-4 bg-[#050509] rounded-lg border border-[#1a2332]">
                <p className="text-xs text-[#4b5563] uppercase tracking-wider mb-1 font-mono">
                  Jobs affected
                </p>
                <p className="text-2xl font-semibold text-white font-mono">
                  {results.monthlyJobsLost}/mo
                </p>
              </div>
            </div>

            <p className="text-sm text-[#6b7280] mb-6">
              At {latency.decay} decay rate, approximately {results.decayedLeadsPerWeek} leads per week do not convert due to response latency.
            </p>

            <button
              onClick={handleSubmit}
              className="w-full py-3.5 px-6 bg-white text-[#050509] font-medium rounded-lg transition-colors duration-200 hover:bg-[#e5e5e5]"
            >
              Review response architecture
            </button>
          </div>
        )}

        {/* Methodology */}
        <div className="px-6 pb-5">
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="flex items-center gap-2 text-xs text-[#4b5563] hover:text-[#6b7280] transition-colors"
          >
            <Info className="w-3 h-3" />
            {showMethodology ? 'Hide' : 'View'} decay model
          </button>

          {showMethodology && (
            <div className="mt-3 p-4 bg-[#050509] rounded-lg border border-[#1a2332] text-xs text-[#4b5563] font-mono space-y-1">
              <p>&lt;5 min = 0% decay</p>
              <p>5-15 min = 10% decay</p>
              <p>15-60 min = 25% decay</p>
              <p>1-4 hours = 40% decay</p>
              <p>4-24 hours = 60% decay</p>
              <p>&gt;24 hours = 75% decay</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
