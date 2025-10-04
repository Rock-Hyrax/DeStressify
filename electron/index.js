import { app, ipcMain } from "electron";
import * as collector from "./collector.js";
import { createWindow, getWindow } from "./window.js";
import { getRange } from "./dataDb.js";

app.commandLine.appendSwitch("no-sandbox");

app.whenReady().then(() => {
  createWindow();
  ipcMain.on("getRange", (ev, s, e) => {
    const f = async () => {
      const data = await getRange(s, e);
      (await getWindow()).webContents.send("report", data);
    };
    f();
  });
  collector.init();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
