module.exports = {
  apps: [
    {
      name: "pin-auth",
      script: "./pin-services/auth/server.js",
      ignore_watch: ["node_modules", "logs"],
      watch: false,
      log_date_format: 'DDMMM HH:mm:ss',
      env_development: {
        NODE_ENV: 'development',
        BUILD_ENV: 'development',
        NODE_TLS_REJECT_UNAUTHORIZED: 0,
        watch: true,
        ignore_watch: ['node_modules', 'public', 'arquivos', 'backup', 'locales', 'src/migration', 'iptables', '*.log', 'front-end', 'core']
      }
    },
    {
      name: "pin-chat",
      script: "./pin-services/chat/server.js",
      ignore_watch: ["node_modules", "logs"],
      watch: false,
      log_date_format: 'DDMMM HH:mm:ss',
      env_development: {
        NODE_ENV: 'development',
        BUILD_ENV: 'development',
        NODE_TLS_REJECT_UNAUTHORIZED: 0,
        watch: true,
        ignore_watch: ['node_modules', 'public', 'arquivos', 'backup', 'locales', 'src/migration', 'iptables', '*.log', 'front-end', 'core']
      }
    },
    /*{
      name: "pin-app",
      script: "npm",
      args: "run dev -- -p 80 ",
      cwd: "./pin-app",
      ignore_watch: ["node_modules", ".next"],
      watch: true,
      log_date_format: 'DDMMM HH:mm:ss',
      env_development: {
        NODE_ENV: 'development',
        BUILD_ENV: 'development',
        NODE_TLS_REJECT_UNAUTHORIZED: 0,
        watch: true,
        ignore_watch: ['node_modules', 'public', 'arquivos', 'backup', 'locales', 'src/migration', 'iptables', '*.log', 'front-end', 'core']
    }
    },*/
  ],
};


