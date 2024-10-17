const fs = require('fs-extra');

async function copyStaticFiles() {
  await fs.copy('./static', './build/static');
}

copyStaticFiles()
  .then(() => console.log('Static files copied!'))
  .catch(err => console.error(err));
