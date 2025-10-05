import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PetShowcaseSection } from "@/components/pet-showcase-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <PetShowcaseSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
