import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Users, Award, Shield, Sparkles, Star } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us - Pet Heaven",
  description: "Learn about Pet Heaven - A peaceful place to honor beloved pets who have crossed the rainbow bridge",
}

export default function AboutPage() {
  const features = [
    {
      icon: Heart,
      title: "From the Heart",
      description: "Every feature we build comes from a place of understanding and compassion for those who have lost a beloved pet."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We believe in the power of community support and sharing stories to help heal hearts."
    },
    {
      icon: Award,
      title: "Meaningful Memorials",
      description: "Creating lasting tributes that celebrate the unique bond between pets and their families."
    },
    {
      icon: Shield,
      title: "Safe & Private",
      description: "Your memories are precious, and we ensure they are kept safe and secure."
    }
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & Pet Lover",
      description: "Inspired by the loss of her beloved Golden Retriever, Max, Sarah created Pet Heaven to help others honor their furry friends."
    },
    {
      name: "Michael Rodriguez",
      role: "Developer",
      description: "A passionate developer who believes technology can help preserve precious memories and bring comfort to those grieving."
    },
    {
      name: "Emma Thompson",
      role: "Community Manager",
      description: "Dedicated to building a supportive community where pet owners can share their stories and find comfort."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Memorials Created" },
    { number: "50,000+", label: "Happy Pet Owners" },
    { number: "5,000+", label: "Stories Shared" },
    { number: "24/7", label: "Support Available" }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Peaceful pet memorial"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />
        </div>
        <div className="absolute top-20 left-10 text-primary/30">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-10 text-primary/30">
          <Star className="w-6 h-6 animate-pulse" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-foreground mb-8 leading-tight">
              About <span className="text-primary">Pet Heaven</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              A peaceful place to honor beloved pets who have crossed the rainbow bridge. 
              We understand the deep bond between pets and their families, and we're here to help you create lasting memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/my-love">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg">
                  Create Memorial
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=800&fit=crop"
            alt="Happy pets"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
        </div>
        <div className="absolute top-10 right-20 text-primary/30">
          <Heart className="w-10 h-10 animate-pulse" />
        </div>
        <div className="absolute bottom-10 left-20 text-primary/30">
          <Star className="w-8 h-8 animate-pulse" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-foreground mb-8 leading-tight">
            Our Mission
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            To provide a beautiful, meaningful, and supportive platform where pet owners can create lasting memorials, share stories, and find comfort in knowing they are not alone in their grief.
          </p>
          <Button asChild size="lg" className="px-8 py-3 text-lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-br from-muted/20 via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              What We Believe In
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 border border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-gradient-to-br from-muted/20 via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The people behind Pet Heaven, united by our love for animals and dedication to helping others
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-2">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full" />
                  <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center border-2 border-primary/20">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4 text-lg">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Peaceful sunset with pets"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-background/20" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8">
              Ready to Create a Memorial?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of pet owners who have created beautiful memorials for their beloved companions. 
              Start your journey of remembrance today.
            </p>
            <Link href="/my-love">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 text-xl">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}