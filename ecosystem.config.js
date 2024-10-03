module.exports = {
  apps: [
    {
      name: "celestial-auth",
      script: "./celestial-webservices/auth/server.js",
      ignore_watch: ["node_modules", "logs"],
      watch: true,
    },
    {
      name: "celestial-chat",
      script: "./celestial-webservices/chat/server.js",
      ignore_watch: ["node_modules", "logs"],
      watch: true,
    },
    /*{
      name: "celestial-application",
      script: "npm",
      args: "run dev -- -p 80 ",
      cwd: "./celestial-application",
      ignore_watch: ["node_modules", ".next"],
      watch: true,
    },*/
  ],
};

