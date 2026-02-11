import HeroSection from '../sections/home/HeroSection'
import ProblemSection from '../sections/home/ProblemSection'
import ReframeSection from '../sections/home/ReframeSection'
import DemoIntroSection from '../sections/home/DemoIntroSection'
import DemoPartOne from '../sections/home/DemoPartOne'
import DemoPartTwo from '../sections/home/DemoPartTwo'
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
      <DemoIntroSection />
      <DemoPartOne />
      <DemoPartTwo />
      <PillarsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
