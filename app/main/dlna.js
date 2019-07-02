var Browser = require('nodecast-js');
const ipc = require('electron');

const DLNA = {
	browser: null,
	start: () => {
    if (DLNA.browser !== null) {
      DLNA.destroy();
    }
		return new Promise(resolve => {
			DLNA.browser = new Browser();
			DLNA.browser.onDevice(function () {
				resolve(DLNA.browser.getList());
      });
      setTimeout(() => {
        resolve([]);
      }, 8000);
			DLNA.browser.start();
		});
	},
	stop: () => {
    DLNA.browser && DLNA.browser.destroy();
    DLNA.browser = null;
  }
};

let localDevices = [];
ipc.ipcMain.on('dlna-request', function (event, arg) {
  DLNA.start().then(devices => {
    localDevices = devices;
    event.sender.send('dlna-reply', devices);
  });
});
ipc.ipcMain.on('dlna-destory', function (event, arg) {
  DLNA.stop();
});
ipc.ipcMain.on('dlna-play', function (event, host, url) {
  localDevices.find(device => device.host === host).play(url, 60);
});

module.exports = DLNA;