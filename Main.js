const { app, BrowserWindow, Notification } = require('electron');
const path = require('path')

const env = process.env.NODE_ENV || 'development';
// set NODE_ENV=production [IN CMD]

function CreateWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('./Static/Home/Home.html');
}

function ShowNotification () {
    new Notification({ title: "Notification Title", body: "Notification Body" }).show()
}

app.whenReady().then(CreateWindow).then(ShowNotification)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

if (env === 'development') {
    try {
        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true
        });
    } catch (_) { console.log('Error'); }    
}