/**
 * 認証関連のヘルパー関数
 */

import { supabase } from './supabase'

/**
 * ユーザーのロールを取得
 */
export async function getUserRole(userId: string): Promise<'editor' | 'viewer'> {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // ロールが存在しない場合はデフォルトでviewerを作成
        await createUserRole(userId, 'viewer')
        return 'viewer'
      }
      console.error('ユーザーロール取得エラー:', error)
      return 'viewer'
    }

    return data?.role || 'viewer'
  } catch (err) {
    console.error('ユーザーロール取得エラー:', err)
    return 'viewer'
  }
}

/**
 * ユーザーロールを作成
 */
export async function createUserRole(
  userId: string,
  role: 'editor' | 'viewer' = 'viewer'
): Promise<void> {
  try {
    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role })

    if (error) {
      console.error('ユーザーロール作成エラー:', error)
    }
  } catch (err) {
    console.error('ユーザーロール作成エラー:', err)
  }
}

/**
 * ユーザーロールを更新
 */
export async function updateUserRole(
  userId: string,
  role: 'editor' | 'viewer'
): Promise<void> {
  try {
    const { error } = await supabase
      .from('user_roles')
      .update({ role })
      .eq('user_id', userId)

    if (error) {
      console.error('ユーザーロール更新エラー:', error)
    }
  } catch (err) {
    console.error('ユーザーロール更新エラー:', err)
  }
}

/**
 * 現在のユーザーがEditorかどうかを確認
 */
export async function isEditor(userId: string): Promise<boolean> {
  const role = await getUserRole(userId)
  return role === 'editor'
}

/**
 * セッションから現在のユーザーを取得
 */
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user || null
}

/**
 * ユーザーがサインインしているかを確認
 */
export async function isSignedIn(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}
