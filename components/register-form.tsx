'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/components/auth-provider'

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { supabase } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 验证输入
    if (!email || !password || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      // 使用Supabase创建用户
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            // 可以在这里添加额外的用户数据
            created_at: new Date().toISOString(),
          }
        }
      })

      if (error) {
        toast({
          title: 'Registration Failed',
          description: error.message,
          variant: 'destructive',
        })
        return
      }

      // 注册成功
      toast({
        title: 'Success!',
        description: 'Account created successfully. Please check your email to verify your account.',
      })

      // 自动登录并重定向
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!signInError) {
        router.push('/my-love')
        router.refresh()
      } else {
        // 如果自动登录失败，仍然跳转到登录页
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }

    } catch (error) {
      console.error('Registration error:', error)
      toast({
        title: 'Registration Failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          minLength={6}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
          minLength={6}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200" 
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <a href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </a>
      </p>
    </form>
  )
}