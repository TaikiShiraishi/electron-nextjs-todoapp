// Native
import {join} from "path";

import {BrowserWindow, app, ipcMain, IpcMainEvent} from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import Store from 'electron-store';
import {ToDoList} from "./preload";

const Store_Data = new Store({name: 'data'});

// Prepare the renderer once the app is ready
async function createWindow() {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js")
    }
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  const path = new URL(`file://${join(__dirname, "../renderer/out/index.html")}`).toString();

  const url = isDev
    ? "http://localhost:8000/"
    : path;

  await mainWindow.loadURL(url);
}

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});

app.whenReady().then(() => {
  ipcMain.handle('getlist', async (_) => {
    return Store_Data.get('ToDoList', []);
  });

  ipcMain.handle('setlist', async (_, data: ToDoList) => {
    Store_Data.set('ToDoList', data);
  });
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})
