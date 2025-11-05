/**
 * PM2設定ファイル
 * Node.jsアプリケーションのプロセス管理
 */

module.exports = {
  apps: [
    {
      name: 'webapp',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/user/webapp',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 8080
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080
      },
      // ログ設定
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      // リスタート設定
      min_uptime: '10s',
      max_restarts: 10,
      // クラスタモードの設定（必要に応じて）
      exec_mode: 'fork',
      // 環境変数ファイルの読み込み
      env_file: '.env'
    }
  ]
}
