# Thanks App
Thanks Appは、ユーザーが手紙を読み書き・編集できるWebアプリケーションです。

https://thanks-app-two.vercel.app/


## 概要
- **フレームワーク**: Next.js (TypeScript)
- **デプロイ**: Vercel
- **データベース**: Supabase
- **認証**: Supabase Authentication によるGoogleログイン

## 機能
- **手紙の読み込み**: 保存された手紙を閲覧可能
- **手紙の作成・編集**: 新しい手紙を作成、または既存の手紙を編集
- **ユーザー認証**: Google OAuthログインおよびパスワード管理
- **セキュリティ**: パスワードはbcryptでハッシュ化されて安全に保存

## 開発環境の準備
ローカル環境で開発サーバーを起動するための手順
1. リポジトリをクローン
2. 依存パッケージをインストール
   ```bash
   npm install
   ```
3. Supabaseの環境変数を設定
   `.env.local`ファイルを作成
   ```env
   NEXT_PUBLIC_SUPABASE_URL=***************
   NEXT_PUBLIC_SUPABASE_ANON_KEY=***************
   ```
4. 開発サーバーを起動します:
   ```bash
   vercel dev
   ```

## 技術スタック
- **フロントエンド**: Next.js
- **バックエンド**: Supabase
- **デプロイ**: Vercel
