const { app, Menu } = require('electron');
console.log(app.getName())
const template = [
  

]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)