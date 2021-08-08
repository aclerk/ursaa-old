import { ipcMain } from 'electron';
import { mainWindow } from '@/main/lifeCycle';

export default {
  listen(): void {
    // ipc 监控
    // 最小化
    ipcMain.on('window-minimize', () => {
      if (mainWindow !== null) {
        mainWindow.minimize();
      }
    });
    // 最大化
    ipcMain.on('window-maximize', () => {
      if (mainWindow !== null) {
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
      }
    });
    // 关闭
    ipcMain.on('window-close', () => {
      if (mainWindow !== null) {
        mainWindow.close();
      }
    });

    return;
  }
};
