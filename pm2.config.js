module.exports = {
  apps: [{
    name: "tongue-tingler",
    script: "./build/app.js",
    watch: false,
    env: {
      NODE_PATH: "./build"
    }
  }]
}
