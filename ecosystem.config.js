module.exports = {
  apps: [{
    name: 'express-typescript-app',
    script: 'build/app.js',  // Pointing to the compiled JS file
    node_args: '-r module-alias/register',  // If using module-alias
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
