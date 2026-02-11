import HeroSection from '../sections/home/HeroSection'
import ProblemSection from '../sections/home/ProblemSection'
import ReframeSection from '../sections/home/ReframeSection'
import DemoSection from '../sections/home/DemoSection'
import PillarsSection from '../sections/home/PillarsSection'
import TestimonialsSection from '../sections/home/TestimonialsSection'
import FAQSection from '../sections/home/FAQSection'
import CTASection from '../sections/home/CTASection'

/**
 * Home — Thin composition layer.
 * All content and logic lives in individual section components.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ReframeSection />
      <DemoSection />
      <PillarsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
