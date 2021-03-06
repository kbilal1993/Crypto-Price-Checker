const { readFileSync } = require('fs');

console.log("Loaded Preload");

window.readConfig = function() {
  const data = readFileSync('./config.json').toString();
  return JSON.parse(data);
}
