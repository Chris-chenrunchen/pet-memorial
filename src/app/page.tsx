import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PetShowcaseSection } from "@/components/pet-showcase-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pet Heaven - Pet Memorial, Pet Memorial Stone​, Pet Memorials",
  description: "A peaceful place to honor beloved pets who have crossed the rainbow bridge",
  alternates: {
    canonical: "https://petheaven.top"
  }
}

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
