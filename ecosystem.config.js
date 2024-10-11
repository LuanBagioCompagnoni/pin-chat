module.exports = {
  apps: [
    {
      name: "pin-auth",
      script: "./pin-services/auth/server.js",
      ignore_watch: ["node_modules", "logs"],
      watch: false,
    },
    {
      name: "pin-chat",
      script: "./pin-services/chat/server.js",
      ignore_watch: ["node_modules", "logs"],
      watch: false,
    },
    /*{
      name: "pin-app",
      script: "npm",
      args: "run dev -- -p 80 ",
      cwd: "./pin-app",
      ignore_watch: ["node_modules", ".next"],
      watch: true,
    },*/
  ],
};

