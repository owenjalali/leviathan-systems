import BackgroundBeams from '../../components/ui/BackgroundBeams'
import GlassButton from '../../components/ui/GlassButton'
import { cta } from '../../content/home'
import { ArrowRight } from 'lucide-react'

/**
 * CTASection — Background Beams + headline + Glass CTA.
 * This is the crescendo — clean glass button, no spinning animation.
 * 140px vertical padding.
 */
export default function CTASection() {
    return (
        <section className="relative overflow-hidden bg-[var(--bg-primary)]">
            <BackgroundBeams />

            <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-[140px] text-center">
                <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-6 max-w-3xl mx-auto">
                    {cta.headline}
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto mb-10">
                    {cta.body}
                </p>

                <GlassButton to="/audit" size="lg">
                    {cta.button}
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </GlassButton>
            </div>
        </section>
    )
}
