const path = require('path');
const fs = require('fs');
const firefoxDeploy = require('firefox-extension-deploy');

const manifest = require('../src/manifest.json');
const { applications: { gecko: { id }}, version, name } = manifest;
const extensionName = name.toLowerCase().split(' ').join('_');
const { FIREFOX_ISSUER, FIREFOX_SECRET } = process.env;
const src = fs.createReadStream(
  path.resolve(
    process.cwd(), 
    'deploy', 
    `${extensionName}-${version}.zip`
  ));

console.log(`Uploading to Firefox AMO: ${name} v${version}`);

firefoxDeploy({
  issuer: FIREFOX_ISSUER,
  secret: FIREFOX_SECRET,
  id,
  version,
  src,
}).then(() => {
    console.log('Upload to Firefox AMO success!');
    process.exit(0);
  }).catch(error => {
    console.error(`Upload to Firefox AMO failure!\n${error.message}`);
    process.exit(1);
  });

