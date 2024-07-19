module.exports = {
    apps: [
      {
        name: "celestial-auth",
        script: "./celestial-service/auth/server.js",
        ignore_watch: ["node_modules", "logs"],
        watch: true,
        env: {
	  DB_CONNECTION_STRING: "mongodb+srv://admin:QRox96TcvVybDzog@celestial.ijfhzun.mongodb.net/auth",
	  JWT_SECRET: "U9e4p5MeYtBdAbvQkkkQBrG38kyC",
        },
      },
      {
        name: "celestial-application",
        script: "npm",
        args: "run dev",
        cwd: "./celestial-application",
        ignore_watch: ["node_modules", ".next"],
        watch: true,
        env: {
          NODE_ENV: "development",
        },
      },
    ],
  };
  
