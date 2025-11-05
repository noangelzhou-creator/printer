import { createClient } from '@supabase/supabase-js'

// Supabase設定の取得（Vite環境変数またはプロセス環境変数から読み込み）
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file.')
}

// Supabaseクライアントの作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// 型定義
export interface UserRole {
  id: string
  user_id: string
  role: 'editor' | 'viewer'
  created_at?: string
  updated_at?: string
}

export interface Document {
  id: string
  title: string
  content: string
  created_by: string
  created_at?: string
  updated_at?: string
}
