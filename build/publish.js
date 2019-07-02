const fs = require('fs');
const increaseVersion = require('increase-version');

const outerJson = JSON.parse(fs.readFileSync('./package.json'));
const innerJson = JSON.parse(fs.readFileSync('./app/package.json'));
const updateJson = JSON.parse(fs.readFileSync('./update.json'));

const version = outerJson.version;
const newVersion = increaseVersion.changeVersion(version, increaseVersion.constants.type.BUILD);
outerJson.version = newVersion;
innerJson.version = newVersion;
updateJson.version = newVersion;

fs.writeFileSync('./package.json', JSON.stringify(outerJson, null, 2));
fs.writeFileSync('./app/package.json',  JSON.stringify(innerJson, null, 2));
fs.writeFileSync('./update.json',  JSON.stringify(updateJson, null, 2));