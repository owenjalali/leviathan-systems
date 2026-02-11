import SectionWrapper from '../../components/ui/SectionWrapper'
import CpuArchitecture from '../../components/ui/CpuArchitecture'
import { reframe } from '../../content/home'

/**
 * ReframeSection — Two-column layout: text left, CPU diagram right.
 * CPU is now prominently sized as a major visual element.
 */
export default function ReframeSection() {
  return (
    <section className="bg-[var(--bg-primary)]">
      <SectionWrapper spacing="content">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
          {/* Text column */}
          <div className="max-w-xl">
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-12">
              {reframe.headline}
            </h2>

            <div className="space-y-6">
              {reframe.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${
                    i === reframe.paragraphs.length - 1
                      ? 'text-[var(--text-primary)] font-medium text-lg'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* CPU Architecture diagram — visible on all breakpoints */}
          <div className="flex items-center justify-center mt-8 lg:mt-0">
            <CpuArchitecture className="w-full max-w-[320px] md:max-w-[500px] aspect-square" />
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
