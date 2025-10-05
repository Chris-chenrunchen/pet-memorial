import { createClient } from '@supabase/supabase-js'

// 需要用户提供的环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// 创建Supabase客户端实例
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase