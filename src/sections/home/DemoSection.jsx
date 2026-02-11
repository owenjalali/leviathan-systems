import Timeline from '../../components/ui/Timeline'
import { demoIntro, demoParts } from '../../content/home'

/**
 * DemoSection — Aceternity-style scroll timeline.
 * Replaces DemoIntroSection + DemoPlaceholder with a
 * scroll-progress timeline showing the 3 demo parts.
 */
export default function DemoSection() {
  const timelineData = demoParts.map((demo) => ({
    title: `Part ${demo.part}`,
    content: (
      <div>
        <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
          {demo.title}
        </h4>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6 max-w-lg">
          {demo.description}
        </p>

        {/* Visual placeholder card per part */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-[var(--accent)]">
              {demo.title}
            </span>
          </div>
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-[var(--border)] w-full" />
            <div className="h-2 rounded-full bg-[var(--border)] w-4/5" />
            <div className="h-2 rounded-full bg-[var(--border)] w-3/5" />
          </div>
        </div>
      </div>
    ),
  }))

  return (
    <section className="bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-[1200px] px-6 py-[120px]">
        {/* Section intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-6">
            {demoIntro.headline}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {demoIntro.body}
          </p>
        </div>

        <Timeline data={timelineData} />
      </div>
    </section>
  )
}
