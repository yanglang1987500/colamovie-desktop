const fs = require('fs');
const Zip = require('node-zip');
const path = require('path');

const asarPath = process.platform === 'darwin' ? '/Cola Movie.app/Contents/Resources/app.asar'
  : '/resources/app.asar'

exports.default = function(context) {
  fs.copyFileSync(context.appOutDir + asarPath, './update.asar');
  const zip = new Zip();
  zip.file('update.asar', fs.readFileSync('./update.asar'));
  const data = zip.generate({ base64:false, compression: 'DEFLATE' });
  fs.writeFileSync('update.zip', data, 'binary');
  fs.unlink('./update.asar', () => {});
}