const electron = require('electron');
const {app, BrowserWindow, ipcMain, dialog} = electron;

let win;
let openDialogOptions = {
    title: "Choose an Audio File",
    filters:[
        {name: 'Audio Files', extensions: ['wav', 'mp3']}
    ]
};

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow()

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.on('ready', createWindow)

ipcMain.on('Open', (event) => {
    dialog.showOpenDialog(openDialogOptions, (filenames) =>{

    });
});