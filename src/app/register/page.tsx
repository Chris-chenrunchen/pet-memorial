import { RegisterForm } from "@/components/register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: 'Register - Pet Memorial',
  description: 'Create your account to start creating beautiful pet memorials.',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Join Pet Memorial to create beautiful tributes for your beloved pets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}