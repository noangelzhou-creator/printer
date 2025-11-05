-- ==================== Supabase用テーブル設計 ====================
-- このファイルはSupabaseダッシュボードのSQLエディタで実行してください
-- https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql

-- ==================== user_roles テーブル ====================
-- ユーザーの権限管理テーブル
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- user_rolesテーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);

-- ==================== documents テーブル（例） ====================
-- 文書管理テーブル（仕様書に記載のサンプル）
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- documentsテーブルのインデックス
CREATE INDEX IF NOT EXISTS idx_documents_created_by ON documents(created_by);

-- ==================== Row Level Security (RLS) ポリシー ====================

-- user_roles テーブルのRLS有効化
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のロール情報のみ参照可能
CREATE POLICY "Users can view their own role"
  ON user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- 管理者のみロール作成・更新可能（※管理者判定は別途実装が必要）
-- 現在は全員が自分のロールを作成・更新可能
CREATE POLICY "Users can insert their own role"
  ON user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own role"
  ON user_roles FOR UPDATE
  USING (auth.uid() = user_id);

-- documents テーブルのRLS有効化
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- 自分が作成したデータのみ参照可能
CREATE POLICY "Users can view their own documents"
  ON documents FOR SELECT
  USING (auth.uid() = created_by);

-- 全ユーザーが文書作成可能
CREATE POLICY "Authenticated users can create documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- 編集権限を持つユーザーのみ更新可能
CREATE POLICY "Editors can update their documents"
  ON documents FOR UPDATE
  USING (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'editor'
    )
  );

-- 編集権限を持つユーザーのみ削除可能
CREATE POLICY "Editors can delete their documents"
  ON documents FOR DELETE
  USING (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'editor'
    )
  );

-- ==================== トリガー：updated_at自動更新 ====================

-- updated_at自動更新関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- user_rolesテーブルにトリガー設定
CREATE TRIGGER update_user_roles_updated_at
  BEFORE UPDATE ON user_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- documentsテーブルにトリガー設定
CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==================== サンプルデータ（テスト用） ====================
-- 注意: 実際のユーザーIDは、auth.usersテーブルに登録されたものを使用してください

-- サンプル：ユーザーロールの作成（実際のuser_idに置き換えてください）
-- INSERT INTO user_roles (user_id, role) VALUES 
--   ('sample-user-uuid-1', 'editor'),
--   ('sample-user-uuid-2', 'viewer');

-- サンプル：文書の作成（実際のuser_idに置き換えてください）
-- INSERT INTO documents (title, content, created_by) VALUES 
--   ('サンプル文書1', 'これはテスト文書です', 'sample-user-uuid-1'),
--   ('サンプル文書2', '閲覧専用ユーザーの文書', 'sample-user-uuid-2');

-- ==================== 確認用クエリ ====================
-- テーブル一覧確認
-- SELECT * FROM user_roles;
-- SELECT * FROM documents;

-- RLSポリシー確認
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies
-- WHERE tablename IN ('user_roles', 'documents');
