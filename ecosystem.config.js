module.exports = {
  apps: [
    {
      name: "library",
      script: "index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 3025,
      },
      // env_production: {
      //   NODE_ENV: "production",
      //   PORT: 3000,
      // },
    },
  ],
};
