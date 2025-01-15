const path = require('path');

// Get the absolute path to the build directory

const rootDir = path.resolve(__dirname);

// Export using CommonJS style
module.exports = {
    folderPath: rootDir
};
