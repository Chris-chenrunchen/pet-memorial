'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/auth-provider'

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Processing authentication...')
  const router = useRouter()
  const { supabase } = useAuth()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 获取URL中的认证code
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        
        if (!code) {
          setStatus('error')
          setMessage('Invalid authentication code')
          return
        }

        // 交换code获取session
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        
        if (error) {
          setStatus('error')
          setMessage(`Authentication failed: ${error.message}`)
          return
        }

        if (data.session) {
          setStatus('success')
          setMessage('Email verified successfully! Redirecting to dashboard...')
          
          // 3秒后重定向到首页或仪表板
          setTimeout(() => {
            router.push('/')
          }, 3000)
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        setStatus('error')
        setMessage('An unexpected error occurred during authentication')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            {status === 'loading' && 'Processing...'}
            {status === 'success' && 'Success!'}
            {status === 'error' && 'Error'}
          </CardTitle>
          <CardDescription>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === 'loading' && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          )}
          
          {status === 'error' && (
            <Button onClick={() => router.push('/register')} className="mt-4">
              Back to Register
            </Button>
          )}
          
          {status === 'success' && (
            <p className="text-sm text-muted-foreground">
              You will be redirected shortly...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}