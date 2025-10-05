import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start pt-20 lg:pt-24 overflow-hidden bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start min-h-[calc(100vh-5rem)]">
          {/* Left Side - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full h-[350px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/showpicture.png"
                alt="Pet memorial tribute"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-muted-foreground/10 rounded-full blur-lg" />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8 lg:space-y-10 text-left order-1 lg:order-2 flex flex-col justify-start pt-12">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
                Pet Memorial Tribute,
                <br />
                <span className="text-muted-foreground">Forever in Our Hearts</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Create a beautiful memorial for your beloved companion and preserve precious moments forever.
              </p>
            </div>

            {/* CTA Buttons - Positioned closer to top */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Link href="/my-love">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                  Create Pet Memorial
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-accent px-8 py-3 text-base"
                >
                  View Memorials
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with arrow only - positioned higher in Hero Section */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-muted-foreground/50 flex flex-col items-center">
        <svg
          className="w-4 h-4 animate-bounce mb-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
        <div className="text-xs font-medium tracking-wider">SCROLL</div>
      </div>
    </section>
  )
}
