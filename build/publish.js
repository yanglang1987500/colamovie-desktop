const fs = require('fs');
const increaseVersion = require('increase-version');

const outerJson = JSON.parse(fs.readFileSync('./package.json'));
const innerJson = JSON.parse(fs.readFileSync('./app/package.json'));
const updateDarwinJson = JSON.parse(fs.readFileSync('./update-darwin.json'));
const updateWin32Json = JSON.parse(fs.readFileSync('./update-win32.json'));

const version = outerJson.version;
const newVersion = increaseVersion.changeVersion(version, increaseVersion.constants.type.BUILD);
outerJson.version = newVersion;
innerJson.version = newVersion;
updateDarwinJson.version = newVersion;
updateWin32Json.version = newVersion;

fs.writeFileSync('./package.json', JSON.stringify(outerJson, null, 2));
fs.writeFileSync('./app/package.json',  JSON.stringify(innerJson, null, 2));
fs.writeFileSync('./update-darwin.json',  JSON.stringify(updateDarwinJson, null, 2));
fs.writeFileSync('./update-win32.json',  JSON.stringify(updateWin32Json, null, 2));