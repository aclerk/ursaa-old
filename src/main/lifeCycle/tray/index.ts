import { app, Menu, shell, Tray } from 'electron';
import { PACKAGE_NAME } from 'style-resources-loader/lib/utils';
import path from 'path';
import { mainWindow } from '@/main/lifeCycle';

let tray = null;
const menu = [
  {
    label: '关于项目',
    click: function () {
      // 打开外部链接
      shell.openExternal('https://github.com/dailyJ/daily').then();
    }
  },
  {
    label: '退出',
    click: function () {
      app.quit();
    }
  }
];
function createTray(): void {
  tray = new Tray(path.join(process.cwd(), 'public', 'favicon.ico'));
  tray.setToolTip(`${PACKAGE_NAME}`);

  const contextMenu = Menu.buildFromTemplate(menu);
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    if (mainWindow != null) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    }
  });
}

export default createTray;
