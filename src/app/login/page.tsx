import { Metadata } from "next"
import { LoginForm } from "@/components/login-form"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Login - Pet Heaven",
  description: "Login to your Pet Heaven account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-foreground">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">Sign in to your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}