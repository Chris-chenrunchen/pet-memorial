import Link from "next/link"

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-primary hover:text-primary/80 mb-8 inline-block">
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl font-serif text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: December 2024
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using Pet Memorial Heaven, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                Pet Memorial Heaven provides an online platform for creating, maintaining, and sharing digital pet memorials. Our services include memorial creation tools, photo galleries, story sharing, and community features for honoring beloved pets.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">User Accounts</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">Registration</h3>
              <p className="text-muted-foreground mb-4">
                You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              
              <h3 className="text-xl font-medium text-foreground mb-3">Account Security</h3>
              <p className="text-muted-foreground mb-4">
                You agree to notify us immediately of any unauthorized use of your account or any other security breach. We are not liable for any loss or damage arising from your failure to comply with security obligations.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">User Content</h2>
              <h3 className="text-xl font-medium text-foreground mb-3">Ownership</h3>
              <p className="text-muted-foreground mb-4">
                You retain ownership of all content you upload, post, or create on Pet Memorial Heaven, including pet photos, stories, and memorial information.
              </p>
              
              <h3 className="text-xl font-medium text-foreground mb-3">License</h3>
              <p className="text-muted-foreground mb-4">
                By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your content solely for the purpose of providing and improving our services.
              </p>
              
              <h3 className="text-xl font-medium text-foreground mb-3">Content Guidelines</h3>
              <p className="text-muted-foreground mb-4">
                You agree not to upload or post content that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Infringes on any intellectual property rights</li>
                <li>Contains offensive, harmful, or inappropriate material</li>
                <li>Violates any laws or regulations</li>
                <li>Is misleading or fraudulent</li>
                <li>Contains viruses or malicious code</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">
                You agree to use Pet Memorial Heaven only for lawful purposes and in accordance with these Terms. You may not:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Use automated systems to access our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper working of our services</li>
                <li>Impersonate any person or entity</li>
                <li>Collect personal information of other users without consent</li>
                <li>Use our services for commercial purposes without permission</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content, features, and functionality of Pet Memorial Heaven, including but not limited to text, graphics, logos, and software, are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Termination</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to suspend or terminate your account and access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is otherwise harmful to other users or our services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Disclaimer of Warranties</h2>
              <p className="text-muted-foreground mb-4">
                Pet Memorial Heaven is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free. We are not responsible for the accuracy or completeness of any content posted by users.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, Pet Memorial Heaven shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, or goodwill.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Indemnification</h2>
              <p className="text-muted-foreground mb-4">
                You agree to indemnify and hold harmless Pet Memorial Heaven and its affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services or violation of these Terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We may modify these Terms at any time. We will notify you of changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of our services after changes are made constitutes acceptance of the modified terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <p className="text-muted-foreground">
                Email: legal@petmemorialheaven.com<br />
                Address: Pet Memorial Heaven, Legal Department, 123 Memorial Lane, Comfort City, CC 12345
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}