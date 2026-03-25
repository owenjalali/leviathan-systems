import { auditHero, auditProcess } from '../../content/audit'

function getStepState(currentStep, stepId) {
  const currentIndex = auditProcess.findIndex((item) => item.id === currentStep)
  const stepIndex = auditProcess.findIndex((item) => item.id === stepId)

  if (stepIndex < currentIndex) {
    return 'complete'
  }

  if (stepIndex === currentIndex) {
    return 'active'
  }

  return 'upcoming'
}

export default function AuditHero({ step }) {
  return (
    <div className="space-y-8 lg:sticky lg:top-28">
      <div className="space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
          {auditHero.eyebrow}
        </p>
        <h1 className="max-w-xl text-[clamp(2.35rem,4.7vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--text-primary)]">
          {auditHero.title}
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-[var(--text-secondary)]">
          {auditHero.intro}
        </p>
      </div>

      <div className="rounded-[30px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(20,184,166,0.08),rgba(255,255,255,0.02))] p-5">
        <div className="space-y-3">
          {auditProcess.map((item, index) => {
            const state = getStepState(step, item.id)

            return (
              <div
                key={item.id}
                className={`flex items-start gap-4 rounded-[22px] border px-4 py-4 transition-colors ${
                  state === 'active'
                    ? 'border-[var(--accent)]/30 bg-[var(--accent)]/10'
                    : state === 'complete'
                    ? 'border-white/[0.08] bg-white/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.02]'
                }`}
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                    state === 'active'
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--bg-primary)]'
                      : state === 'complete'
                      ? 'border-white/[0.12] bg-white/[0.05] text-[var(--text-primary)]'
                      : 'border-white/[0.08] bg-transparent text-[var(--text-muted)]'
                  }`}
                >
                  {index + 1}
                </div>

                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {item.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
