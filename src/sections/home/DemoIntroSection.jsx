import SectionWrapper from '../../components/ui/SectionWrapper'
import { demoIntro } from '../../content/home'

/**
 * DemoIntroSection — Transitional text before the demo.
 * Static. Brief. 100px vertical padding.
 */
export default function DemoIntroSection() {
    return (
        <section className="bg-[var(--bg-primary)]">
            <SectionWrapper spacing="dense">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-6">
                        {demoIntro.headline}
                    </h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                        {demoIntro.body}
                    </p>
                </div>
            </SectionWrapper>
        </section>
    )
}
