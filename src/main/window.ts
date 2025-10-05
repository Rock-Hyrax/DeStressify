import {join} from "path"
import {is} from "@electron-toolkit/utils"
import icon from "../../resources/icon.png?asset"
import {shell, BrowserWindow} from "electron"

export let win: null | BrowserWindow = null

export function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 750,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? {icon} : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  })

  mainWindow.on("ready-to-show", () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return {action: "deny"}
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"))
  }
  win = mainWindow
  return mainWindow
}

export function getWindow(): Promise<BrowserWindow> {
  return new Promise((res, _rej) => {
    if (win !== null) {
      res(win)
      return
    }
    setTimeout(() => {
      getWindow().then((val) => res(val))
    }, 100)
  })
}
