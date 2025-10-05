"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // TODO: 替换为你的 EmailJS 配置
      const serviceId = "service_o6dewnf"
      const templateId = "template_uzo1k7u"
      const publicKey = "iq7TB73TRTleNzE4t"

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Pet Memorial Heaven Team",
        reply_to: formData.email,
        date: new Date().toLocaleString()
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      
      setSubmitStatus("success")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      })
    } catch (error) {
      console.error("Failed to send email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We'd love to hear from you. Whether you have questions about our pet memorial services or need support, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Have questions about creating a memorial for your beloved pet? We're here to support you during this difficult time.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">[chenrunchen84@gmail.com]</p>
                      <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                    </div>
                  </div>


                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {submitStatus === "success" && (
                        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                          ✓ Message sent successfully! We'll get back to you soon.
                        </div>
                      )}
                      {submitStatus === "error" && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                          ✗ Failed to send message. Please try again or contact us directly.
                        </div>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="Your first name"
                            className="border-border"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Your last name"
                            className="border-border"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="border-border"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help you?"
                          className="border-border"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your pet or how we can assist you..."
                          rows={6}
                          className="border-border resize-none"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-serif text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our pet memorial services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">How do I create a pet memorial?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Creating a memorial is simple. Register for an account, then use our intuitive form to add your pet's information, photos, and memories. You can customize the memorial and share it with friends and family.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Is my memorial private?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Yes, your memorial is private by default. You control who can view it, and you can choose to share it with specific people or make it public if you wish.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Can I edit my pet's memorial later?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Absolutely. You can log in anytime to update your pet's information, add new photos, or modify the content. Your memorial grows and evolves with your memories.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}