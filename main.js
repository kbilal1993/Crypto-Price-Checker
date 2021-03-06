const {app, BrowserWindow} = require('electron');
const path = require('path');
const {readFileSync} = require('fs');

let window = null;

// Read config file
const config = JSON.parse(readFileSync('./config.json').toString());

// This runs when the application has finished loading
app.once('ready', () => {
  window = new BrowserWindow({
    width: 300,
    minHeight: 500,
    resizable: config.app.resizable,
    show: false,
    title: "Crypto Price Checker",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: false
    }
  });
  if (!config.app.devmode) {
    window.removeMenu();
  }
  window.loadFile("./index.html");
  window.once('ready-to-show', () => {
    window.show();
  });
});

