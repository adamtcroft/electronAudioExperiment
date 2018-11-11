const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { AudioFileListManager } = require('./audioFileListManager');

let mainWindow;
const AFLM = new AudioFileListManager();
let openFileDialogOptions = {
    title: "Choose an Audio File",
    properties: ['openFile'],
    filters: [
        { name: 'Audio Files', extensions: ['wav'] }
    ]
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ height: 480, width: 550 });
    //mainWindow.setMenu(null);

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('Open', (event) => {
    dialog.showOpenDialog(openFileDialogOptions, function (filepath) {
        try {
            var itWasAdded = AFLM.AddToList(filepath);
            if(itWasAdded){
                mainWindow.webContents.send('FileAdded', filepath);
            }
        }
        catch(e){
            if(e.name == 'TypeError'){
                return;
            }
        }
    });
});

ipcMain.on('Pause', (event) => {
    mainWindow.webContents.send('PauseSound');
});

ipcMain.on('Stop', (event) => {
    mainWindow.webContents.send('StopSound');
});