import { copy } from 'fs-extra';

async function copyStaticFiles() {
  await copy('./static', './build/static');
}

copyStaticFiles()
  .then(() => console.log('Static files copied!'))
  .catch(err => console.error(err));