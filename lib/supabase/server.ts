import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// 需要用户提供的环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export function createClient() {
  const cookieStore = cookies()
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => {
          const cookie = cookieStore.get(key)
          return cookie?.value ?? null
        },
        setItem: (key: string, value: string) => {
          // 服务器端不需要设置cookie，由客户端处理
        },
        removeItem: (key: string) => {
          // 服务器端不需要移除cookie，由客户端处理
        },
      },
    },
  })
}