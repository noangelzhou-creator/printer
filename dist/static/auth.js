/**
 * 認証関連のクライアントサイド処理
 * Supabase認証を使用したログイン・ログアウト機能
 */

// Supabase設定（.envから読み込み）
const SUPABASE_URL = 'https://uaaanqyxgenthrrzgmcp.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhYWFucXl4Z2VudGhycnpnbWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMTI5MDYsImV4cCI6MjA3Nzg4ODkwNn0.vRGQic8xgfn_8amqVEOcNwWFsI42_IIFUQ2damOffk8'

// Supabaseクライアントの初期化
let supabaseClient = null

function initSupabase() {
  if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
}

// グローバル変数：現在のユーザーとロール
let currentUser = null
let currentUserRole = null

// ページ読み込み時の処理
async function initAuth() {
  initSupabase()
  
  if (!supabaseClient) {
    console.warn('Supabase client not initialized')
    return
  }

  // セッションの確認
  const { data: { session } } = await supabaseClient.auth.getSession()
  
  if (session) {
    currentUser = session.user
    await loadUserRole()
    showMainApp()
  } else {
    showAuthForm()
  }

  // 認証状態の変更を監視
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      currentUser = session.user
      await loadUserRole()
      showMainApp()
    } else if (event === 'SIGNED_OUT') {
      currentUser = null
      currentUserRole = null
      showAuthForm()
    }
  })
}

// ユーザーロールの読み込み
async function loadUserRole() {
  if (!currentUser) return

  try {
    const { data, error } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', currentUser.id)
      .single()

    if (error) {
      // ロールが存在しない場合はデフォルトでviewerとして作成
      if (error.code === 'PGRST116') {
        await createDefaultUserRole()
      } else {
        console.error('ユーザーロールの取得エラー:', error)
      }
    } else {
      currentUserRole = data?.role || 'viewer'
    }
  } catch (err) {
    console.error('ユーザーロール取得エラー:', err)
    currentUserRole = 'viewer' // デフォルト
  }
}

// デフォルトユーザーロールの作成
async function createDefaultUserRole() {
  try {
    const { data, error } = await supabaseClient
      .from('user_roles')
      .insert({ user_id: currentUser.id, role: 'viewer' })
      .select()

    if (error) {
      console.error('ユーザーロール作成エラー:', error)
    } else {
      currentUserRole = 'viewer'
    }
  } catch (err) {
    console.error('ユーザーロール作成エラー:', err)
  }
}

// サインアップ
async function signUp(email, password) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw new Error(`サインアップに失敗しました: ${error.message}`)
  }

  return data
}

// サインイン
async function signIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(`ログインに失敗しました: ${error.message}`)
  }

  return data
}

// サインアウト
async function signOut() {
  const { error } = await supabaseClient.auth.signOut()

  if (error) {
    throw new Error(`ログアウトに失敗しました: ${error.message}`)
  }
}

// 認証フォームの表示
function showAuthForm() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            <i class="fas fa-building mr-2"></i>
            不動産月次収支報告書システム
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600" id="auth-mode-text">
            ログイン
          </p>
        </div>
        
        <form class="mt-8 space-y-6" onsubmit="handleAuthSubmit(event)">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email" class="sr-only">メールアドレス</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="メールアドレス"
              />
            </div>
            <div>
              <label for="password" class="sr-only">パスワード</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="パスワード（6文字以上）"
                minlength="6"
              />
            </div>
          </div>

          <div id="auth-error" class="hidden rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <i class="fas fa-exclamation-circle text-red-400"></i>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700" id="auth-error-message"></p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              id="auth-submit-btn"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ログイン
            </button>
          </div>

          <div class="text-center">
            <button
              type="button"
              class="text-sm text-blue-600 hover:text-blue-500"
              onclick="toggleAuthMode()"
            >
              <span id="auth-toggle-text">アカウントをお持ちでないですか？登録</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `
}

// メインアプリの表示
function showMainApp() {
  // 既存のrenderApp()を呼び出す
  if (typeof renderApp === 'function') {
    renderApp()
    updateUIForUserRole()
  }
}

// ユーザーロールに応じてUIを更新
function updateUIForUserRole() {
  // ヘッダーにユーザー情報とログアウトボタンを追加
  const header = document.querySelector('header .max-w-7xl')
  if (header && currentUser) {
    const userInfo = document.createElement('div')
    userInfo.className = 'mt-4 flex items-center justify-between'
    userInfo.innerHTML = `
      <div class="text-sm text-gray-600">
        <i class="fas fa-user mr-2"></i>
        <span>${currentUser.email}</span>
        <span class="ml-3 px-2 py-1 text-xs rounded ${currentUserRole === 'editor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">
          ${currentUserRole === 'editor' ? '編集可' : '閲覧のみ'}
        </span>
      </div>
      <button
        onclick="handleSignOut()"
        class="text-sm text-red-600 hover:text-red-700"
      >
        <i class="fas fa-sign-out-alt mr-1"></i>ログアウト
      </button>
    `
    header.appendChild(userInfo)
  }

  // viewerの場合は編集ボタンを非表示または無効化
  if (currentUserRole === 'viewer') {
    document.querySelectorAll('[data-editor-only]').forEach(el => {
      el.style.display = 'none'
    })
  }
}

// 認証モード切り替え（ログイン⇔サインアップ）
let isSignUpMode = false

function toggleAuthMode() {
  isSignUpMode = !isSignUpMode
  document.getElementById('auth-mode-text').textContent = isSignUpMode ? 'アカウント作成' : 'ログイン'
  document.getElementById('auth-submit-btn').textContent = isSignUpMode ? 'アカウント作成' : 'ログイン'
  document.getElementById('auth-toggle-text').textContent = isSignUpMode 
    ? 'すでにアカウントをお持ちですか？ログイン' 
    : 'アカウントをお持ちでないですか？登録'
  hideAuthError()
}

// 認証フォーム送信処理
async function handleAuthSubmit(event) {
  event.preventDefault()
  
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  
  hideAuthError()
  
  try {
    if (isSignUpMode) {
      await signUp(email, password)
      showAuthSuccess('アカウントが作成されました。確認メールをご確認ください。')
    } else {
      await signIn(email, password)
    }
  } catch (error) {
    showAuthError(error.message)
  }
}

// ログアウト処理
async function handleSignOut() {
  try {
    await signOut()
  } catch (error) {
    alert('ログアウトに失敗しました: ' + error.message)
  }
}

// エラーメッセージの表示
function showAuthError(message) {
  const errorDiv = document.getElementById('auth-error')
  const errorMessage = document.getElementById('auth-error-message')
  errorMessage.textContent = message
  errorDiv.classList.remove('hidden')
}

// エラーメッセージの非表示
function hideAuthError() {
  const errorDiv = document.getElementById('auth-error')
  if (errorDiv) {
    errorDiv.classList.add('hidden')
  }
}

// 成功メッセージの表示
function showAuthSuccess(message) {
  alert(message)
}

// ページ読み込み時に認証初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth)
} else {
  initAuth()
}
