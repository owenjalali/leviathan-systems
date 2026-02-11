import { demoIntro } from '../../content/home'
import DemoPartOne from './DemoPartOne'
import DemoPartTwo from './DemoPartTwo'
import DemoPartThree from './DemoPartThree'

/**
 * DemoSection — Unified demo experience
 * Composes the demo intro with all three interactive demo parts.
 * Each part is a self-contained section with its own ScrollTrigger animations.
 */
export default function DemoSection() {
    return (
        <>
            {/* Demo Intro */}
            <section className="bg-[var(--bg-primary)] py-20 border-t border-[var(--border)]">
                <div className="mx-auto max-w-[1200px] px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-6">
                            {demoIntro.headline}
                        </h2>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            {demoIntro.body}
                        </p>
                    </div>
                </div>
            </section>

            {/* Three distinct demo parts */}
            <DemoPartOne />
            <DemoPartTwo />
            <DemoPartThree />
        </>
    )
}
