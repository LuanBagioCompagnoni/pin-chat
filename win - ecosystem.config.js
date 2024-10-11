module.exports = {
  apps: [
    {
      name: "celestial-auth",
      script: "./pin-services/auth/server.js",
      ignore_watch: ["node_modules", "logs"],
      watch: true,
    },
    {
      name: "pin-app",
      script: "node_modules/next/dist/bin/next",
      args: "dev",
      cwd: "./pin-app",
      ignore_watch: ["node_modules", ".next"],
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 80,
      },
    },
  ],
};
