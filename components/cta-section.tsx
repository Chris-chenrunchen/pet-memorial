import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Begin Your Pet Memorial Today</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Create a beautiful pet memorial that honors the unconditional love and joy your pet brought to your life. Start your pet memorial journey today and preserve their memory forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/my-love">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
                Create Pet Memorial
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-accent px-8 py-3 text-base">
                View Pet Memorial Examples
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
