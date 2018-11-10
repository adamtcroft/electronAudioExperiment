const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let mainWindow;
let openFileDialogOptions = {
    title: "Choose an Audio File",
    filters: [
        { name: 'Audio Files', extensions: ['wav', 'mp3'] }
    ]
}
let selectedFilePath;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ height: 480, width: 550 });
    //mainWindow.setMenu(null);

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');
}

app.on('ready', createWindow)

ipcMain.on('Open', (event) => {
    dialog.showOpenDialog(openFileDialogOptions, function (filepath) {
        selectedFilePath = filepath[0];
        mainWindow.webContents.send('DrawWave', selectedFilePath);
    });
});

ipcMain.on('Pause', (event) => {
    mainWindow.webContents.send('PauseSound');
});

ipcMain.on('Stop', (event) => {
    mainWindow.webContents.send('StopSound');
});