module.exports = {
  apps: [
    {
      name: "notion-todo",
      script: "dist/main.js",
      exec_mode: "cluster",
      watch: true,
      instances: 1,
      autorestart: true,
      max_memory_restart: "200M",
    },
  ],
};
