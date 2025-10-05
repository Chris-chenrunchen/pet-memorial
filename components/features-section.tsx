import { Heart, Camera, Users, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Heart,
      title: "Personalized Pet Memorials",
      description: "Create a unique pet memorial that captures your pet's personality and the special bond you shared in your pet memorial tribute.",
    },
    {
      icon: Camera,
      title: "Pet Memorial Photo Galleries",
      description: "Preserve precious pet memorial memories with unlimited photo and video uploads in beautiful pet memorial galleries.",
    },
    {
      icon: Users,
      title: "Share Your Pet Memorial",
      description: "Invite family and friends to contribute memories and leave loving messages on your pet memorial page.",
    },
    {
      icon: Shield,
      title: "Forever Safe Pet Memorial",
      description: "Your pet memorial is securely hosted and will remain accessible as a lasting tribute for years to come.",
    },
  ]

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Pet Memorial Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create a beautiful pet memorial that celebrates the joy and unconditional love your beloved companion brought to your life. Our pet memorial platform provides everything you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
