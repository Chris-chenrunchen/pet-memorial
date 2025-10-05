export function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Create Your Pet Memorial",
      description: "Start your pet memorial by sharing your pet's name, photos, and the story of your precious time together.",
    },
    {
      step: "2",
      title: "Customize Your Pet Memorial",
      description: "Choose from beautiful pet memorial themes and add special touches that reflect your pet's unique spirit in your memorial.",
    },
    {
      step: "3",
      title: "Share Your Pet Memorial",
      description:
        "Share your pet memorial with family and friends so they can contribute their own memories and loving messages to honor your pet.",
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Creating Your Pet Memorial</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In just a few simple steps, you can create a beautiful pet memorial that serves as a lasting tribute to your beloved companion. Our pet memorial platform makes it easy to honor their memory.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-12 h-12 mx-auto mb-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
