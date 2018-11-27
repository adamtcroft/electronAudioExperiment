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
    mainWindow.setMenu(null);

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('Open', (event) => {
    dialog.showOpenDialog(openFileDialogOptions, function (filepath) {
        try {
            var itWasAdded = AFLM.AddToList(filepath);
            if (itWasAdded) {
                mainWindow.webContents.send('FileAdded', filepath);
            }
        }
        catch (e) {
            if (e.name == 'TypeError') {
                return;
            }
        }
    });
});

ipcMain.on('Remove', (event, shortNameOfActiveFile) => {
    console.log("in remove " + shortNameOfActiveFile);
    AFLM.audioFileList.forEach((fileInList) => {
        let n = fileInList.lastIndexOf('\\');
        let filenameSubstring = fileInList.substring(n + 1);
        if(shortNameOfActiveFile === filenameSubstring){
            var index = AFLM.audioFileList.indexOf(fileInList);
            AFLM.audioFileList.splice(index, 1);
            console.log(AFLM.audioFileList);
        }
    })
})