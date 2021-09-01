import path from 'path';
import { app, BrowserWindow, protocol, globalShortcut, Menu } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
import ipc from '@/main/event/ipc';
import { browserWindowOption, shortcutsKeys } from '@/universal/config';
import menuTemplate from '@/main/lifeCycle/menu';
import db from '@/main/db';
const isDevelopment = process.env.NODE_ENV !== 'production';
let mainWindow: BrowserWindow | null;

class LifeCycle {
  createMainWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow(browserWindowOption());
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL).then();
      if (!process.env.IS_TEST) {
        mainWindow.webContents.openDevTools();
      }
    } else {
      createProtocol('daily');
      // Load the index.html when not in development
      mainWindow.loadURL(`file://${__dirname}/index.html`).then();

      // ===========自定义file:///协议的解析=======================
      protocol.registerFileProtocol('app', (request, cb) => {
        const url = request.url.replace('app://.', '');
        // const decodedUrl = decodeURI(url);
        try {
          return cb({ path: path.normalize(`${__dirname}/${url}`) });
        } catch (error) {
          console.error('ERROR: registerLocalResourceProtocol: Could not get file path:', error);
        }
      });
    }

    const list = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(list);

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }
  private initDb() {
    db.initialDatabase().then();
  }
  private static beforeReady() {
    // Scheme must be registered before the app is ready
    protocol.registerSchemesAsPrivileged([{ scheme: 'daily', privileges: { secure: true, standard: true } }]);
    ipc.listen();
  }
  private onReady() {
    app.on('ready', async () => {
      createProtocol('daily');
      if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
          await installExtension(VUEJS3_DEVTOOLS);
        } catch (e) {
          console.error('Vue Devtools failed to install:', e.toString());
        }
      }
      // 快捷键禁用
      for (const key of shortcutsKeys) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        globalShortcut.register(key, () => {});
      }
      this.createMainWindow();
    });
  }

  private onRunning() {
    app.on('second-instance', () => {
      // 当运行第二个实例时,将会聚焦到myWindow这个窗口
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
  }

  private onQuit() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    // Exit cleanly on request from parent process in development mode.
    if (isDevelopment) {
      if (process.platform === 'win32') {
        process.on('message', (data) => {
          if (data === 'graceful-exit') {
            app.quit();
          }
        });
      } else {
        process.on('SIGTERM', () => {
          app.quit();
        });
      }
    }
  }

  launch() {
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) {
      app.quit();
    } else {
      LifeCycle.beforeReady();
      this.initDb();
      this.onReady();
      this.onRunning();
      this.onQuit();
    }
  }
}

const bootstrap = new LifeCycle();

export { bootstrap, mainWindow };
