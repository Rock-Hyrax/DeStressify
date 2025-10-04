const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  onReport: (callback) =>
    ipcRenderer.on("report", (_event, value) => callback(value)),
  getRange: (start, end) => ipcRenderer.send("getRange", start, end),
});
