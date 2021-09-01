const globalEnv = process.env.NODE_ENV;

const devWid = globalEnv === 'development' ? 1000 : 0;
const devHei = globalEnv === 'development' ? 690 : 0;

const editorWindowOptions = {
  width: devWid || 1000,
  height: devHei || 690,
  minWidth: 1000,
  minHeight: 690,
  show: false
};

/**
 * BrowserWindow的配置项
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const browserWindowOption = (frame = true) => {
  const commonOptions = {
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false
    }
  };
  return {
    ...editorWindowOptions,
    frame: frame,
    ...commonOptions
  };
};

/**
 * 开发环境: http://localhost:8080
 * 正式环境: file://${__dirname}/index.html
 */
const winURL = globalEnv === 'development' ? 'http://localhost:8080' : `file://${__dirname}/index.html`;
export { browserWindowOption, winURL };
