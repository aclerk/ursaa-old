import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import os from 'os';

const globalEnv = process.env.NODE_ENV;
const DIR_NAME = 'daily-data';
const APP_DATA = app.getPath('appData');

function getDailyDataDir() {
  if (process.env.DAILY_DATA_DIR) {
    if (!fs.existsSync(process.env.DAILY_DATA_DIR)) {
      fs.mkdirSync(process.env.DAILY_DATA_DIR);
    }
    return process.env.DAILY_DATA_DIR;
  }

  const homePath = os.homedir() + path.sep + DIR_NAME;

  if (fs.existsSync(homePath)) {
    return homePath;
  }

  const appDataPath = APP_DATA + path.sep + DIR_NAME;

  if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath, 0o700);
  }

  return appDataPath;
}

const DAILY_DATA_DIR = getDailyDataDir();
const DOCUMENT_PATH = DAILY_DATA_DIR + path.sep + 'document.db';
const BACKUP_DIR = DAILY_DATA_DIR + path.sep + 'backup';
const LOG_DIR = DAILY_DATA_DIR + path.sep + 'log';
const ANONYMIZE_DB_DIR = DAILY_DATA_DIR + path.sep + 'anonymize-db';
const SCHEMA_PATH =
  globalEnv === 'development'
    ? path.join(process.cwd(), '/resource/db', 'schema.sql')
    : `${__dirname}/../resource/db/schema.sql`;

export default { APP_DATA, DAILY_DATA_DIR, DOCUMENT_PATH, BACKUP_DIR, LOG_DIR, ANONYMIZE_DB_DIR, SCHEMA_PATH };
