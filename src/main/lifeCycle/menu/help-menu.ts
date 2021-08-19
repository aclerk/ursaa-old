import { mainWindow } from '@/main/lifeCycle';

const help_menu = {
  label: 'Help',
  submenu: [
    {
      label: '关于',
      role: 'about',
      click: (): void => {
        console.log('about');
      }
    },
    {
      type: 'separator'
    },
    {
      label: '开发者工具',
      accelerator: 'F12',
      role: 'develop-tool',
      click: (): void => {
        if (mainWindow !== null) {
          mainWindow.webContents.openDevTools();
        }
      }
    }
  ]
};

export default help_menu;
