const fs = require('fs-extra')
const Zip = require('node-zip');
const path = require('path');
 


const isWin32 = process.platform !== 'darwin';
const asarPath = isWin32 ? '/resources'
  : '/Cola Movie.app/Contents/Resources';

exports.default = function(context) {
  fs.copySync(context.appOutDir + asarPath + '/app.asar', './update.asar');
  isWin32 && fs.copySync(context.appOutDir + asarPath + '/app.asar.unpacked', './app.asar.unpacked');
  const zip = new Zip();
  zip.file('update.asar', fs.readFileSync('./update.asar'));
  isWin32 && walk('app.asar.unpacked', zip);
  const data = zip.generate({ base64:false, compression: 'DEFLATE' });
  fs.writeFileSync(isWin32 ? 'update-win32.zip' : 'update-darwin.zip', data, 'binary');
  fs.unlink('./update.asar', () => {});
  fs.remove('./app.asar.unpacked', () => {});
}

const walk = (path, zip) => {
  let dirList = fs.readdirSync(path);
  for(let i=0;i<dirList.length;i++) {
    let item = dirList[i];
    let innerPath = path + '/' + item;
    if (fs.statSync(innerPath).isDirectory()) {
        console.log(innerPath);
        zip.folder(innerPath);
        walk(path + '/' + item, zip);
    } else if (fs.statSync(innerPath).isFile()) {
      zip.file(innerPath, fs.readFileSync(innerPath));
    }
  }
}
