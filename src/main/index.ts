import {app, BrowserWindow, ipcMain, Tray, Menu} from 'electron'
import {electronApp, optimizer} from '@electron-toolkit/utils'
import {createWindow, getWindow} from './window'
import {init} from './collector'
import {getRange} from './dataDb'
import icon from "../../resources/icon.png?asset"

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.on('getRange', (_ev, s, e) => {
    const f = async () => {
      const data = await getRange(s, e)
      ;(await getWindow()).webContents.send('report', data)
    }
    f()
  })
  init()

  const mainWindow = createWindow()

  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open', click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Exit', click: () => {
        app.quit();
      }
    },
  ]);

  tray.setToolTip('Moja aplikacja');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
