import { supabase, UserRole } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

/**
 * ユーザー認証関連のヘルパー関数
 */

// サインアップ
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  
  if (error) {
    throw new Error(`サインアップに失敗しました: ${error.message}`)
  }
  
  return data
}

// サインイン
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    throw new Error(`ログインに失敗しました: ${error.message}`)
  }
  
  return data
}

// サインアウト
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw new Error(`ログアウトに失敗しました: ${error.message}`)
  }
}

// 現在のユーザー取得
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// 現在のセッション取得
export async function getCurrentSession(): Promise<Session | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// ユーザーロール取得
export async function getUserRole(userId: string): Promise<'editor' | 'viewer' | null> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single()
  
  if (error) {
    console.error('ユーザーロールの取得に失敗しました:', error)
    return null
  }
  
  return data?.role || null
}

// ユーザーロール作成または更新
export async function setUserRole(userId: string, role: 'editor' | 'viewer') {
  const { data, error } = await supabase
    .from('user_roles')
    .upsert({ user_id: userId, role })
    .select()
  
  if (error) {
    throw new Error(`ユーザーロールの設定に失敗しました: ${error.message}`)
  }
  
  return data
}

// 認証状態の変更を監視
export function onAuthStateChange(callback: (event: string, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}

// 編集権限チェック
export async function checkEditPermission(userId: string): Promise<boolean> {
  const role = await getUserRole(userId)
  return role === 'editor'
}

// 閲覧権限チェック（editor または viewer）
export async function checkViewPermission(userId: string): Promise<boolean> {
  const role = await getUserRole(userId)
  return role === 'editor' || role === 'viewer'
}
