require('ts-node').register({ transpileOnly: true }); // Register ts-node to transpile TypeScript files
module.exports = require('./config.ts').default; // Import TypeScript config
