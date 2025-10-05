import { PetShowcaseSection } from "@/components/pet-showcase-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pet Memorial Examples - Pet Heaven",
  description: "Browse beautiful pet memorial examples to get inspiration for creating your own tribute.",
  alternates: {
    canonical: "https://petheaven.top/demo"
  }
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Pet Memorial Examples
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Browse through these beautiful pet memorial examples to get inspiration for creating your own tribute
          </p>
        </div>
      </section>

      {/* Pet Showcase Section */}
      <PetShowcaseSection />
      
      <Footer />
    </div>
  )
}