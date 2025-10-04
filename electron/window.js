import { BrowserWindow } from "electron";
import path from "node:path";
import * as isDev from "electron-is-dev";

export let win = null;
const __dirname = import.meta.dirname;

export const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  win.loadURL(startURL);
};

export const getWindow = async () => {
  return new Promise((res, _rej) => {
    if (win !== null) {
      res(win);
      return;
    }
    setTimeout(() => {
      getWindow().then((val) => res(val));
    }, 100);
  });
};
