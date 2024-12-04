module.exports = {
  apps: [
    {
      name: 'Prod',
      script: './build/app.js', // Your Express.js entry file
      env: {
        NEW_RELIC_HOME: './newrelic.js', // Set the New Relic config file path
      },
    },
  ],
};

if (process.env.NEW_RELIC_ENABLED === 'true') {
  console.log('here')
  const l = require('./newrelic.js')
  console.log(l)
}
