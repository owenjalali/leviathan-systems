import SectionWrapper from '../../components/ui/SectionWrapper'
import { demoParts } from '../../content/home'

/**
 * DemoPlaceholder — Placeholder for Demo Parts I, II, III.
 * Will be replaced with interactive GSAP demos in Phase 4.
 */
export default function DemoPlaceholder() {
    return (
        <section className="bg-[var(--bg-secondary)]">
            <SectionWrapper spacing="dense">
                <div className="grid gap-6 md:grid-cols-3">
                    {demoParts.map((demo) => (
                        <div
                            key={demo.part}
                            className="rounded-lg border border-[var(--border)] bg-[var(--glass)] p-8 backdrop-blur-sm"
                        >
                            <span className="text-xs font-medium tracking-wider uppercase text-[var(--accent)] mb-3 block">
                                Part {demo.part}
                            </span>
                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                                {demo.title}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                {demo.description}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </section>
    )
}
