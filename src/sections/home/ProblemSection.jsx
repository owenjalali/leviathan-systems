import { problem } from '../../content/home'

/**
 * ProblemSection — Bento grid layout inspired by Tailark features-8.
 * Five cards in an asymmetric grid with clean SVG visuals.
 */

function Card({ className = '', children }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] ${className}`}
    >
      {children}
    </div>
  )
}

export default function ProblemSection() {
  return (
    <section className="bg-[var(--bg-primary)] py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-4 max-w-3xl">
          {problem.headline}
        </h2>
        <p className="text-[var(--text-secondary)] mb-16 max-w-2xl">
          Most businesses lose revenue not from bad products — but from slow systems, missed follow-ups, and repetitive manual work.
        </p>

        <div className="grid grid-cols-6 gap-3">
          {/* Card 1 — Manual Follow-Up (tall left card) */}
          <Card className="col-span-full lg:col-span-2 flex">
            <div className="relative m-auto p-6 pt-8 w-full">
              {/* Visual: cascading notification cards */}
              <div className="relative h-28 w-full mb-6 flex items-center justify-center">
                <div className="absolute w-44 space-y-2">
                  {['Reminder sent', 'Follow up?', 'Still waiting...'].map(
                    (text, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2"
                        style={{ opacity: 1 - i * 0.25, transform: `translateX(${i * 8}px)` }}
                      >
                        <div
                          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              i === 0
                                ? 'var(--accent)'
                                : i === 1
                                ? '#eab308'
                                : '#666680',
                          }}
                        />
                        <span className="text-xs text-[var(--text-secondary)]">
                          {text}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] text-center mb-2">
                {problem.painPoints[0].title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] text-center leading-relaxed">
                {problem.painPoints[0].body}
              </p>
            </div>
          </Card>

          {/* Card 2 — Speed */}
          <Card className="col-span-full sm:col-span-3 lg:col-span-2">
            <div className="p-6 pt-8">
              {/* Visual: response time comparison */}
              <div className="relative mx-auto flex aspect-square w-28 rounded-full border border-white/[0.06] items-center justify-center mb-6 before:absolute before:-inset-2 before:rounded-full before:border before:border-white/[0.03]">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-[var(--accent)]">2h</span>
                  <span className="block text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">avg reply</span>
                </div>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {problem.painPoints[1].title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {problem.painPoints[1].body}
                </p>
              </div>
            </div>
          </Card>

          {/* Card 3 — Repetition (with activity chart) */}
          <Card className="col-span-full sm:col-span-3 lg:col-span-2">
            <div className="p-6 pt-8">
              <div className="mb-6 px-2">
                {/* Visual: repeating task bars */}
                <div className="space-y-2">
                  {[0.85, 0.85, 0.85, 0.85, 0.85].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" style={{ opacity: 0.3 + i * 0.05 }} />
                      <div
                        className="h-2 rounded-full bg-white/[0.06]"
                        style={{ width: `${w * 100}%` }}
                      >
                        <div
                          className="h-full rounded-full bg-[var(--accent)]"
                          style={{ width: `${60 + Math.random() * 30}%`, opacity: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[var(--text-muted)] text-right mt-2 uppercase tracking-wider">Same tasks, every week</p>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {problem.painPoints[2].title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {problem.painPoints[2].body}
                </p>
              </div>
            </div>
          </Card>

          {/* Card 4 — The Cost (wide bottom-left card) */}
          <Card className="col-span-full lg:col-span-3">
            <div className="p-6 sm:flex sm:items-center sm:gap-6">
              <div className="flex-shrink-0 mb-4 sm:mb-0">
                {/* Visual: declining bar chart */}
                <div className="relative w-28 h-20 mx-auto sm:mx-0 flex items-end justify-center gap-1.5 pb-1">
                  {[72, 58, 44, 30, 18].map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className="w-4 rounded-sm"
                        style={{
                          height: `${h}px`,
                          background: i < 3
                            ? `rgba(239, 68, 68, ${0.3 + i * 0.1})`
                            : `rgba(239, 68, 68, ${0.5 + i * 0.05})`,
                        }}
                      />
                    </div>
                  ))}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  The Real Cost
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Every manual process has a price tag. Slow responses, missed leads, and repetitive tasks quietly drain thousands each month — and it compounds.
                </p>
              </div>
            </div>
          </Card>

          {/* Card 5 — The Pattern (wide bottom-right card) */}
          <Card className="col-span-full lg:col-span-3">
            <div className="p-6 sm:flex sm:items-center sm:gap-6">
              <div className="flex-shrink-0 mb-4 sm:mb-0">
                {/* Visual: infinite loop icon */}
                <div className="relative w-20 h-20 mx-auto sm:mx-0 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
                  <div className="absolute inset-2 rounded-full border border-dashed border-[var(--accent)]/20" />
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[var(--accent)] opacity-50">
                    <path
                      d="M12 6C8.69 6 6 8.69 6 12s2.69 6 6 6 6-2.69 6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 8V12H14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  The Pattern
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Hire more people. Work longer hours. Try harder. The loop never ends because the problem isn't effort — it's architecture. Without systems, growth just means more of the same.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
