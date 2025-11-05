# セットアップガイド

## Supabaseプロジェクトの設定

### 1. Supabaseプロジェクトの作成
1. [Supabase](https://supabase.com/) にアクセスしてアカウント作成
2. 新しいプロジェクトを作成
3. プロジェクトのダッシュボードに移動

### 2. 環境変数の設定
1. プロジェクト設定 → API から以下を取得：
   - Project URL
   - anon public key

2. `.env.example` を `.env` にコピー：
```bash
cp .env.example .env
```

3. `.env` ファイルを編集して取得した値を設定：
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. データベースのセットアップ

1. Supabaseダッシュボードで SQL Editor を開く
2. `supabase_migrations.sql` の内容をコピー＆ペースト
3. 実行してテーブルとRLSポリシーを作成

### 4. ローカル開発の開始

```bash
# 依存関係のインストール
npm install

# D1データベースのマイグレーション（ローカルCloudflare D1用）
npm run db:migrate:local

# ビルド
npm run build

# 開発サーバーの起動
npm run dev:sandbox
```

### 5. Dockerでの実行

```bash
# Dockerイメージのビルド
docker build -t printer-app .

# コンテナの起動
docker run -p 5173:5173 --env-file .env printer-app

# または docker-compose を使用
docker-compose up -d
```

## 初回ユーザー登録

1. アプリケーションにアクセス
2. 「アカウントをお持ちでないですか？登録」をクリック
3. メールアドレスとパスワード（6文字以上）を入力
4. Supabaseから確認メールが届くので、リンクをクリックして確認
5. ログインしてアプリケーションを使用

## ユーザーロールの設定

デフォルトでは、新規ユーザーは `viewer`（閲覧のみ）として作成されます。

編集権限を付与するには、SupabaseのSQL Editorで以下を実行：

```sql
-- ユーザーIDの確認
SELECT id, email FROM auth.users;

-- 編集権限の付与
UPDATE user_roles 
SET role = 'editor' 
WHERE user_id = 'ユーザーID';
```

## トラブルシューティング

### 認証エラーが発生する場合
- `.env` ファイルが正しく設定されているか確認
- SupabaseのURL and Keyが正確か確認
- ブラウザのコンソールでエラーメッセージを確認

### データベース接続エラー
- `supabase_migrations.sql` が正しく実行されているか確認
- RLSポリシーが有効化されているか確認

### Dockerコンテナが起動しない
- `.env` ファイルが存在するか確認
- ポート5173が他のプロセスで使用されていないか確認
- ログを確認: `docker logs printer-app`
