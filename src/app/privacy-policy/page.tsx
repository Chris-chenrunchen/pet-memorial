import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-primary hover:text-primary/80 mb-8 inline-block">
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl font-serif text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: December 2024
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                At Pet Memorial Heaven, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website and use our pet memorial services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                When you create a pet memorial account, we may collect:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Name and email address</li>
                <li>Pet information (name, photos, stories)</li>
                <li>Account credentials</li>
                <li>Memorial content and preferences</li>
              </ul>
              
              <h3 className="text-xl font-medium text-foreground mb-3">Automatically Collected Information</h3>
              <p className="text-muted-foreground mb-4">
                We automatically collect certain information about your device and usage, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>IP address and browser type</li>
                <li>Pages visited and time spent</li>
                <li>Device identifiers and operating system</li>
                <li>Referring website information</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Create and maintain your pet memorial</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our website and services</li>
                <li>Send important account notifications</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your personal information and pet memorial content. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may use trusted third-party services for hosting, analytics, and email communications, which are bound by confidentiality agreements.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your account</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your memorial content</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes are made constitutes acceptance of the updated policy.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="text-muted-foreground">
                Email: privacy@petmemorialheaven.com<br />
                Address: Pet Memorial Heaven, Privacy Department, 123 Memorial Lane, Comfort City, CC 12345
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}