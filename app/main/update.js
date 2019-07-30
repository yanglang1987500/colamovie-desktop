const EAU = require('electron-asar-hot-updater-sniyve');
const { app, dialog } = require('electron');
const packageInfo = require('../package.json');
let fn = () => {};
const api = process.platform === 'darwin' ? 'http://cdn.yaoleyaotou.xin/update-darwin.json' : 'http://cdn.yaoleyaotou.xin/update-win32.json';
module.exports = {
  init: () => {
    EAU.init({
      'api': api + '?t='+ new Date().getTime(), // The API EAU will talk to
      'server': false, // Where to check. true: server side, false: client side, default: true.
      'debug': true, // Default: false.
      'body': {
        name: packageInfo.name,
        current: packageInfo.version
      },
      'formatRes': function(res) { res.asar = res.asar + '?t='+new Date().getTime(); return res; }
    });
  },
  check: (callback) => {
    console.log('check')
    EAU.check(function (error, last, body) {
      console.log(error, body)
      callback(error, body);
    });
  },
  update: (options) => {
    console.log('update')
    const onProgress = options.onProgress || fn;
    const onError = options.onPronErrorogress || fn;
    const onComplete = options.onComplete || fn;
    EAU.progress(function (state) {
      onProgress(state);
    });
    EAU.download(function (error) {
      if (error) {
        onError(error);
        return false;
      }
      onComplete();
      if (process.platform === 'darwin') {
        app.relaunch()
        app.quit()
      } else {
        app.quit()
      }
    })
  }
};