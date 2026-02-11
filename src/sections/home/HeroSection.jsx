import BackgroundPaths from '../../components/ui/BackgroundPaths'
import GlassButton from '../../components/ui/GlassButton'
import { hero } from '../../content/home'
import { ArrowRight } from 'lucide-react'

/**
 * HeroSection — Background Paths + large headline + Glass CTA.
 * Text is immediately visible — NO fade-in-from-below.
 * 160px vertical padding.
 */
export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <BackgroundPaths />

            <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-40 text-center">
                <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)] mb-6 max-w-4xl mx-auto">
                    {hero.headline}
                </h1>

                <p className="text-[clamp(1.05rem,2vw,1.3rem)] text-[#c8c8d8] leading-relaxed max-w-2xl mx-auto mb-4">
                    {hero.subheadline}
                </p>

                <p className="text-[0.9375rem] text-[#8888a0] mb-10 max-w-lg mx-auto leading-relaxed">
                    {hero.ctaSupporting}
                </p>

                <GlassButton to="/audit" size="lg">
                    {hero.cta}
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </GlassButton>
            </div>
        </section>
    )
}
