const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let mainWindow;
let audioFileList = [];
let openFileDialogOptions = {
    title: "Choose an Audio File",
    properties: ['multiSelections', 'openFile'],
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

app.on('ready', createWindow)

ipcMain.on('Open', (event) => {
    dialog.showOpenDialog(openFileDialogOptions, function (filepaths) {
        filepaths.forEach((path) => {
            audioFileList.push(path);
        });
        console.log(audioFileList);
        mainWindow.webContents.send('AddFiles', audioFileList);
    });
});

ipcMain.on('Pause', (event) => {
    mainWindow.webContents.send('PauseSound');
});

ipcMain.on('Stop', (event) => {
    mainWindow.webContents.send('StopSound');
});