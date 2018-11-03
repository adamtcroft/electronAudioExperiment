const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let mainWindow;
let openFileDialogOptions = {
    title: "Choose an Audio File",
    filters: [
        { name: 'Audio Files', extensions: ['wav', 'mp3'] }
    ]
};
let selectedFilePath;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow()

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
}

app.on('ready', createWindow)

ipcMain.on('Open', (event) => {
    dialog.showOpenDialog(openFileDialogOptions, function (filepath) {
        selectedFilePath = filepath[0];
    });
});

ipcMain.on('Play', (event) => {
    mainWindow.webContents.send('PlaySound', selectedFilePath);
});

ipcMain.on('Stop', (event) => {
    mainWindow.webContents.send('StopSound');
});