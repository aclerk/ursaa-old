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

    // 数据修改
    ipcMain.on('data-change', (event, args) => {
      console.log('ipc:' + args);
      return args;
    });

    // 数据查询
    ipcMain.on('data-query', (data, args) => {
      console.log('ipc:' + args);
      return args;
    });

    return;
  }
};
