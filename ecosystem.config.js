module.exports = {
    apps: [
        {
            name: 'my-app',
            script: './build/app.js', // Your Express.js entry file
            env: {
                NEW_RELIC_HOME: './newrelic.js', // Set the New Relic config file path
            },
        },
    ],
};
