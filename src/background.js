"use strict";

import { BrowserWindow, Menu, app, dialog, ipcMain, protocol, remote } from "electron";
import { EVENTS, MODE, ThaiCardReader } from "./lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

import AutoLaunch from "auto-launch";
import { autoUpdater } from "electron-updater";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import moment from "moment";

moment.locale("th");

const { exec } = require("child_process");
const os = require("os");
const Store = require("./app-store.js");
const pkg = require("../package");
// const autoUpdater = require("./auto-updater");
const path = require("path");

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: "user-preferences",
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 600 },
    autoLaunch: false,
  },
});

const isDevelopment = process.env.NODE_ENV !== "production";
const isProd = process.env.NODE_ENV === "production";
const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);

let win;

async function createWindow() {
  let { width, height } = store.get("windowBounds");
  // Create the browser window.
  win = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
    },
    fullscreen: isProd,
    preload: path.join(__dirname, "preload.js"),
  });

  win.maximize();
  // win.setMenuBarVisibility(!isProd)

  const isMac = process.platform === "darwin";
  const template = [
    {
      label: "File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [{ type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" }]
          : [{ role: "close" }]),
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Check for Updates...",
          click: async () => {
            // autoUpdater.init(win);
            autoUpdater.checkForUpdatesAndNotify();
          },
        },
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
    autoUpdater.checkForUpdatesAndNotify();
  }

  const reader = new ThaiCardReader();
  reader.readMode = MODE.PERSONAL_PHOTO;
  reader.autoRecreate = true;
  reader.startListener();

  reader.on(EVENTS.DEVICE_CONNECTED, () => {
    win.webContents.send(EVENTS.DEVICE_CONNECTED);
  });

  reader.on(EVENTS.CARD_INSERTED, () => {
    win.webContents.send(EVENTS.CARD_INSERTED);
  });

  reader.on(EVENTS.READING_START, () => {
    win.webContents.send(EVENTS.READING_START);
  });

  reader.on(EVENTS.READING_COMPLETE, (profile) => {
    const [year, month, day] = String(profile.birthday).split("-");
    const a = moment();
    const b = moment(`${parseInt(year)}-${month}-${day}`, "YYYY-MM-DD");

    const age = a.diff(b, "year");
    const imageBase64 = profile.photo.split(";base64,").pop();
    profile = updateObject(profile, {
      fullNameThai: `${profile.fullname}`,
      fullNameEng: `${profile.titleEN} ${profile.firstNameEN} ${profile.lastNameEN}`,
      imageBase64: imageBase64,
      age: age,
    });
    win.webContents.send(EVENTS.READING_COMPLETE, profile);
  });

  reader.on(EVENTS.READING_FAIL, (err) => {
    win.webContents.send(EVENTS.READING_FAIL, err);
  });

  reader.on(EVENTS.CARD_REMOVED, async () => {
    win.webContents.send(EVENTS.CARD_REMOVED);
  });

  reader.on(EVENTS.DEVICE_DISCONNECTED, () => {
    win.webContents.send(EVENTS.DEVICE_DISCONNECTED);
  });

  ipcMain.on("exit", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  ipcMain.on("check-for-update", () => {
    // autoUpdater.init(win);
    autoUpdater.checkForUpdatesAndNotify();
  });

  win.webContents.on("did-finish-load", () => {
    if (app.isPackaged) {
      // autoUpdater.init(win);
      let autoLaunch = new AutoLaunch({
        name: pkg.name,
        path: isMac ? process.execPath : app.getPath("exe"),
      });
      autoLaunch.isEnabled().then((isEnabled) => {
        if (!isEnabled) autoLaunch.enable();
      });
    }
  });
  ipcMain.on("getPrinters", () => {
    win.webContents.send("getPrinters", win.webContents.getPrinters());
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
