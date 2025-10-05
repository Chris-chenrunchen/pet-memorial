"use client"

import { PetCard } from "@/components/pet-card"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight } from "lucide-react"
import { demoPets } from "@/lib/demo-data"
import Link from "next/link"

export function PetShowcaseSection() {
  return (
    <section className="py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Beautiful Pet Memorials</h2>
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how others have honored their beloved companions with beautiful pet memorials. These pet memorial examples showcase the love and care that goes into each tribute.
          </p>
        </div>

        {/* Pet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {demoPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} isDemo={true} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-card rounded-lg p-8 border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif text-foreground mb-4">
              Create Your Own Memorial
            </h3>
            <p className="text-muted-foreground mb-6">
              Honor your beloved pet with a beautiful, lasting tribute that celebrates the joy they brought to your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/my-love">
                <Button size="lg" className="gap-2">
                <Heart className="h-5 w-5" />
                Create Pet Memorial
              </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="gap-2">
                View Pet Memorial Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}