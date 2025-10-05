export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      pet: "Golden Retriever, Max",
      quote:
        "Creating Max's memorial helped our whole family process our grief. It's beautiful to have a place where we can all share our favorite memories of him.",
    },
    {
      name: "David L.",
      pet: "Tabby Cat, Luna",
      quote:
        "Luna's memorial page is perfect. The design is so peaceful, and I love that I can visit anytime to feel close to her again.",
    },
    {
      name: "Maria R.",
      pet: "Border Collie, Scout",
      quote:
        "The memorial we created for Scout has brought so much comfort to our family. It's a beautiful way to keep his memory alive.",
    },
  ]

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Pet Memorial Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from families who have found comfort in creating beautiful pet memorials for their beloved companions. These pet memorial stories celebrate the love we share.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-8 rounded-lg shadow-sm border">
              <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t pt-4">
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">In memory of {testimonial.pet}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
