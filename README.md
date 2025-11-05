# 不動産月次収支報告書システム

## プロジェクト概要
- **名称**: 不動産月次収支報告書システム
- **目的**: 不動産物件の月次収支報告書を簡単に作成・管理できるWebアプリケーション
- **主な機能**: 
  - 物件管理（物件情報の登録・編集）
  - 部屋管理（部屋番号、階数の管理）
  - 契約管理（賃料、管理費、駐車料金の登録）
  - 支出管理（管理料、清掃費、光熱費などの記録）
  - 月次報告書の自動生成と表示
  - PDF出力対応（印刷機能）

## 現在完了している機能

### ✅ 実装済み
1. **データベース設計** - Cloudflare D1による永続化
   - 物件テーブル
   - 部屋テーブル
   - 契約テーブル
   - 支出テーブル
   - 月次報告書テーブル
   - 統合マイグレーションファイル（サンプルデータ含む）

2. **バックエンドAPI** - Honoフレームワーク
   - 物件CRUD API（作成、読み取り、更新、削除）
   - 部屋CRUD API（完全実装）
   - 契約CRUD API（完全実装）
   - 支出CRUD API（完全実装）
   - 月次報告書データ取得API

3. **フロントエンド** - コンポーネント化された構造
   - レスポンシブデザイン（PC/スマートフォン対応）
   - 月次報告書表示機能（収入の部・支出の部・収支サマリー）
   - 契約管理（一覧表示・新規登録・編集・削除）
   - 支出管理（一覧表示・追加・編集・削除）
   - 部屋管理（一覧表示・新規登録・編集・削除）
   - タブによる画面切り替え
   - 年月選択機能
   - モーダルフォーム実装

4. **サンプルデータ**
   - 「シロハイヌ春日出」物件データ
   - 8部屋の登録
   - 2025年9月分の契約データ（PDFに合わせて更新）
   - 2025年9月分の支出データ（PDFに合わせて更新）

### ❌ 未実装（将来の拡張機能）
- PDF生成ライブラリを使った高度なPDF出力
- ユーザー認証機能
- 複数物件の切り替え機能
- データのエクスポート（CSV/Excel）
- 収支推移グラフ・ダッシュボード

## 機能別URI一覧

### フロントエンド
- **トップページ**: `/`
  - 月次報告書表示タブ（デフォルト）
  - 契約管理タブ
  - 支出管理タブ
  - 部屋管理タブ

### バックエンドAPI

#### 物件API
- `GET /api/properties` - 物件一覧取得
- `GET /api/properties/:id` - 物件詳細取得
- `POST /api/properties` - 物件作成
  - Body: `{ "name": "物件名", "address": "住所" }`
- `PUT /api/properties/:id` - 物件更新
  - Body: `{ "name": "物件名", "address": "住所" }`
- `DELETE /api/properties/:id` - 物件削除

#### 部屋API
- `GET /api/properties/:propertyId/rooms` - 物件の部屋一覧取得
- `POST /api/rooms` - 部屋作成
  - Body: `{ "property_id": 1, "room_number": "201", "floor": "2階" }`
- `PUT /api/rooms/:id` - 部屋更新
- `DELETE /api/rooms/:id` - 部屋削除

#### 契約API
- `GET /api/rooms/:roomId/contracts` - 部屋の契約一覧取得
- `GET /api/properties/:propertyId/active-contracts` - 有効な契約一覧取得
- `POST /api/contracts` - 契約作成
  - Body: `{ "room_id": 1, "contractor_name": "契約者名", "rent": 50000, "management_fee": 3000, "parking_fee": 0, "other_fee": 0, "start_date": "2025-01-01", "is_active": 1 }`
- `PUT /api/contracts/:id` - 契約更新
- `DELETE /api/contracts/:id` - 契約削除

#### 支出API
- `GET /api/properties/:propertyId/expenses?year_month=2025-07` - 支出一覧取得
- `POST /api/expenses` - 支出作成
  - Body: `{ "property_id": 1, "year_month": "2025-07", "item_name": "管理料", "description": "", "amount": 19524, "tax": 1952, "total": 21476 }`
- `PUT /api/expenses/:id` - 支出更新
- `DELETE /api/expenses/:id` - 支出削除

#### 月次報告書API
- `GET /api/properties/:propertyId/report?year_month=2025-07` - 月次報告書データ取得
  - レスポンス: 物件情報、契約リスト、支出リスト、収支サマリー

## URLs
- **開発環境**: https://3000-i96pecg29fjtskovnboqe-dfc00ec5.sandbox.novita.ai
- **本番環境**: 未デプロイ（Cloudflare Pagesへのデプロイ準備完了）
- **GitHub**: （後ほど設定）

## データアーキテクチャ

### データモデル
1. **Properties（物件）**
   - id, name, address, created_at, updated_at

2. **Rooms（部屋）**
   - id, property_id, room_number, floor, created_at, updated_at

3. **Contracts（契約）**
   - id, room_id, contractor_name, tenant_name, rent, management_fee, parking_fee, other_fee, start_date, end_date, is_active, created_at, updated_at

4. **Expenses（支出）**
   - id, property_id, year_month, item_name, description, amount, tax, total, created_at, updated_at

5. **Reports（月次報告書）**
   - id, property_id, year_month, report_date, total_income, total_expense, net_income, created_at, updated_at

### ストレージサービス
- **Cloudflare D1**: SQLiteベースのグローバル分散データベース
- **ローカル開発**: `.wrangler/state/v3/d1` にローカルSQLiteを自動生成

### データフロー
1. フロントエンドから各種API（物件、部屋、契約、支出）へリクエスト
2. Honoバックエンドがリクエストを処理し、D1データベースにアクセス
3. データベースから取得したデータをJSON形式で返却
4. フロントエンドが受け取ったデータを整形して表示

## 使い方ガイド

### 月次報告書の閲覧
1. トップページにアクセス
2. 「月次報告書」タブ（デフォルト表示）で報告書を確認
3. 年月セレクトボックスで対象月を変更可能
4. 「PDF出力」ボタンまたはブラウザの印刷機能で印刷

### 支出の追加
1. 「支出管理」タブをクリック
2. 「支出を追加」ボタンをクリック
3. 項目名、摘要、本体、税、総額を入力
4. 「保存」ボタンで登録完了

### 契約・部屋の管理
1. 「契約管理」タブで契約情報を確認
2. 「部屋管理」タブで部屋情報を確認
3. 編集・削除ボタンで管理（一部機能は実装中）

## 📋 セットアップ（重要）

### 初回セットアップ
詳細は `SETUP.md` をご覧ください。

1. **環境変数の設定**
```bash
cp .env.example .env
# .envファイルを編集してSupabase認証情報を設定
```

2. **Supabaseデータベースのセットアップ**
- `supabase_migrations.sql` をSupabaseのSQLエディタで実行
- user_rolesテーブルとRLSポリシーが作成されます

### ローカル開発

```bash
# 依存関係のインストール
npm install

# データベースのマイグレーション（Cloudflare D1用）
npm run db:migrate:local

# ビルド
npm run build

# 開発サーバー起動（PM2使用）
pm2 start ecosystem.config.cjs

# または直接起動
npm run dev:sandbox

# サービスの確認
pm2 list
pm2 logs webapp --nostream

# サーバーの停止
pm2 stop webapp

# サーバーの再起動
pm2 restart webapp
```

### 🐳 Docker での実行

```bash
# Dockerイメージのビルド
docker build -t printer-app .

# コンテナの起動
docker run -p 5173:5173 --env-file .env printer-app

# または docker-compose を使用
docker-compose up -d

# ログの確認
docker-compose logs -f

# 停止
docker-compose down
```

### Cloudflare Pagesへのデプロイ
```bash
# 本番データベースの作成（初回のみ）
npx wrangler d1 create webapp-production
# 出力されたdatabase_idをwrangler.jsoncに設定

# 本番環境へのマイグレーション
npm run db:migrate:prod

# デプロイ
npm run deploy:prod
```

## 技術スタック
- **バックエンド**: Hono (Cloudflare Workers)
- **フロントエンド**: Vanilla JavaScript + TailwindCSS
- **データベース**: Cloudflare D1 (SQLite)
- **デプロイ**: Cloudflare Pages
- **開発ツール**: Vite, Wrangler, PM2

## 実装完了機能の詳細

### ✅ 完全実装済み（2025年11月5日）
1. **契約管理機能** - 新規登録・編集・削除フォーム完全実装
2. **部屋管理機能** - 新規登録・編集・削除フォーム完全実装
3. **支出管理機能** - 追加・編集・削除フォーム完全実装
4. **統合マイグレーション** - 単一ファイルでスキーマとサンプルデータを管理
5. **コンポーネント化** - 収入の部、支出の部、収支サマリーを適切に分離

## 推奨される次のステップ

### 優先度: 高
1. **Cloudflare Pagesへのデプロイ** - 本番環境への配置
2. **データ検証強化** - フォーム入力のバリデーション追加
3. **エラーハンドリング改善** - より詳細なエラーメッセージ

### 優先度: 中
4. **物件切り替え機能** - 複数物件を管理できるように
5. **PDF生成ライブラリの導入** - jsPDFなどを使った高度なPDF出力
6. **レスポンシブデザインの改善** - スマートフォン表示の最適化
7. **検索・フィルタ機能** - 契約や支出の検索機能

### 優先度: 低
8. **ユーザー認証** - ログイン機能の追加
9. **履歴管理** - 過去の報告書の保存と閲覧
10. **エクスポート機能** - CSV/Excelへのデータ出力
11. **ダッシュボード** - 収支の推移グラフなど

## 🔐 認証機能の使用方法

### 新規ユーザー登録
1. アプリケーションにアクセス
2. 「アカウントをお持ちでないですか？登録」をクリック
3. メールアドレスとパスワード（6文字以上）を入力
4. 確認メールのリンクをクリック

### ログイン
1. メールアドレスとパスワードを入力
2. ログイン後、自動的にダッシュボードへ遷移

### ユーザーロールの設定
デフォルト: `viewer`（閲覧のみ）

Editorロールに変更するには、SupabaseのSQLエディタで実行：
```sql
UPDATE user_roles 
SET role = 'editor' 
WHERE user_id = 'ユーザーID';
```

### 権限による機能制限
- **Editor**: 全機能（閲覧・編集・削除）
- **Viewer**: 閲覧のみ（編集ボタン非表示）

## 最終更新日
2025年11月5日

## ステータス
- **開発**: ✅ 完了（認証機能含む全機能実装済み）
- **認証**: ✅ 完了（Supabase Auth統合済み）
- **テスト**: ⏳ 準備中（認証フローのテスト必要）
- **デプロイ**: ❌ 未実施（Docker/Cloudflare Pages準備完了）

## 主要な変更履歴

### 2025年11月5日
- ✅ seed.sqlをマイグレーションファイルに統合
- ✅ 契約の新規登録・編集フォーム実装
- ✅ 部屋の新規登録・編集フォーム実装
- ✅ 支出の編集機能実装
- ✅ 全てのCRUD操作が完全に動作可能に
- ✅ コンポーネント化の確認完了
- ✅ サンプルデータを2025年9月分に更新（PDFに合わせて）
