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

  // Count filled inputs for progress
  const filledCount = [leadsPerWeek, avgJobValue, latency, closeRate].filter(Boolean).length

  return (
    <div id="calculator" className="w-full max-w-xl">
      <div className="relative bg-[#0a0f1a] border border-[#1a2332] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                             linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />

        {/* Header */}
        <div className="relative px-6 py-5 border-b border-[#1a2332]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1a2332] flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#00d4cf]" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">
                  Latency Calculator
                </p>
                <p className="text-xs text-[#4b5563]">
                  Response delay cost
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i < filledCount ? 'bg-[#00d4cf]' : 'bg-[#1a2332]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="relative p-6 space-y-5">

          <div className="group">
            <label className="flex items-center gap-2 text-sm text-[#6b7280] mb-2.5 group-focus-within:text-[#9ca3af] transition-colors">
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
              className={`w-full px-4 py-3.5 bg-[#050509] border rounded-xl text-white placeholder-[#2a3441] focus:outline-none focus:border-[#00d4cf]/50 focus:bg-[#080c14] transition-all ${
                errors.leadsPerWeek ? 'border-red-500/50' : 'border-[#1a2332]'
              }`}
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm text-[#6b7280] mb-2.5 group-focus-within:text-[#9ca3af] transition-colors">
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
                className={`w-full pl-8 pr-4 py-3.5 bg-[#050509] border rounded-xl text-white placeholder-[#2a3441] focus:outline-none focus:border-[#00d4cf]/50 focus:bg-[#080c14] transition-all ${
                  errors.avgJobValue ? 'border-red-500/50' : 'border-[#1a2332]'
                }`}
              />
            </div>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm text-[#6b7280] mb-2.5 group-focus-within:text-[#9ca3af] transition-colors">
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
                className={`w-full px-4 py-3.5 bg-[#050509] border rounded-xl text-white appearance-none focus:outline-none focus:border-[#00d4cf]/50 focus:bg-[#080c14] transition-all cursor-pointer ${
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

          <div className="group">
            <label className="flex items-center gap-2 text-sm text-[#6b7280] mb-2.5 group-focus-within:text-[#9ca3af] transition-colors">
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
                className={`w-full pr-10 pl-4 py-3.5 bg-[#050509] border rounded-xl text-white placeholder-[#2a3441] focus:outline-none focus:border-[#00d4cf]/50 focus:bg-[#080c14] transition-all ${
                  errors.closeRate ? 'border-red-500/50' : 'border-[#1a2332]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4b5563]">%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        {showResults && hasAllInputs && (
          <div className="relative border-t border-[#1a2332] p-6 bg-gradient-to-b from-[#0d1320] to-[#0a0f1a]">
            {/* Results glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#00d4cf]/30 to-transparent" />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#050509] rounded-xl border border-[#1a2332] group hover:border-[#1a2332]/80 transition-colors">
                <p className="text-xs text-[#4b5563] uppercase tracking-wider mb-1.5 font-mono">
                  Monthly Gap
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-white font-mono tracking-tight">
                  {formatCurrency(results.monthlyRevenueLoss)}
                </p>
              </div>
              <div className="p-4 bg-[#050509] rounded-xl border border-[#1a2332] group hover:border-[#1a2332]/80 transition-colors">
                <p className="text-xs text-[#4b5563] uppercase tracking-wider mb-1.5 font-mono">
                  Jobs Affected
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-white font-mono tracking-tight">
                  {results.monthlyJobsLost}<span className="text-lg text-[#6b7280]">/mo</span>
                </p>
              </div>
            </div>

            <p className="text-sm text-[#6b7280] mb-6">
              At <span className="text-[#9ca3af]">{latency.decay}</span> decay rate, approximately <span className="text-white">{results.decayedLeadsPerWeek} leads</span> per week do not convert due to response latency.
            </p>

            <button
              onClick={handleSubmit}
              className="w-full py-4 px-6 bg-white text-[#050509] font-medium rounded-xl transition-all duration-300 hover:bg-[#00d4cf] hover:shadow-[0_0_30px_rgba(0,212,207,0.2)]"
            >
              Review response architecture
            </button>
          </div>
        )}

        {/* Methodology */}
        <div className="relative px-6 pb-5">
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="flex items-center gap-2 text-xs text-[#4b5563] hover:text-[#6b7280] transition-colors"
          >
            <Info className="w-3 h-3" />
            {showMethodology ? 'Hide' : 'View'} decay model
          </button>

          {showMethodology && (
            <div className="mt-3 p-4 bg-[#050509] rounded-xl border border-[#1a2332] text-xs text-[#4b5563] font-mono space-y-1">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span>&lt;5 min = 0%</span>
                <span>1-4 hrs = 40%</span>
                <span>5-15 min = 10%</span>
                <span>4-24 hrs = 60%</span>
                <span>15-60 min = 25%</span>
                <span>&gt;24 hrs = 75%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
