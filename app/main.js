const { app, BrowserWindow } = require('electron');
require('./main/dlna');
const update = require('./main/update');

let mainWindow = null;

app.on('window-all-closed', () => {
  app.quit()
});

let winProps = {
  title: '小可乐看电影',
  width: 1200,
  height: 800,
  backgroundColor: '#0D4966',
  autoHideMenuBar: true,
  webPreferences: {
    webSecurity: false,
    nodeIntegration: true
  }
};

app.on('ready', () => {
  update.init();
  mainWindow = new BrowserWindow(winProps);

  mainWindow.loadURL(`file://${__dirname}/output/index.html`);

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null
  });
});

app.update = update;