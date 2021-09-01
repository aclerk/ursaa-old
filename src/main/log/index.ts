import fs, { WriteStream } from 'fs';
import { pathConfig } from '@/universal/config';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const NEW_LINE = process.platform === 'win32' ? '\r\n' : '\n';

class DailyLog {
  logFile: WriteStream;
  date: Date;
  constructor() {
    if (!fs.existsSync(pathConfig.LOG_DIR)) {
      fs.mkdirSync(pathConfig.LOG_DIR, 0o700);
    }
    this.date = this.getTodayTime();
    const path = pathConfig.LOG_DIR + '/daily-' + this.formatDate(this.date) + '.log';
    this.logFile = fs.createWriteStream(path, { flags: 'a' });
  }

  private initLogFile() {
    this.date = this.getTodayTime();
    const path = pathConfig.LOG_DIR + '/daily-' + this.formatDate(this.date) + '.log';
    if (this.logFile) {
      this.logFile.end();
    }
    this.logFile = fs.createWriteStream(path, { flags: 'a' });
  }

  private getTodayTime(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  private formatDate(date: Date): string {
    return this.pad(date.getFullYear()) + '-' + this.pad(date.getMonth() + 1) + '-' + this.pad(date.getDate());
  }
  private padMilli(num: number): string {
    if (num < 10) {
      return '00' + num;
    } else if (num < 100) {
      return '0' + num;
    } else {
      return num.toString();
    }
  }

  public formatTime(millisSinceMidnight: number) {
    return (
      this.pad(millisSinceMidnight / HOUR) +
      ':' +
      this.pad((millisSinceMidnight % HOUR) / MINUTE) +
      ':' +
      this.pad((millisSinceMidnight % MINUTE) / SECOND) +
      '.' +
      this.padMilli(millisSinceMidnight % SECOND)
    );
  }
  private pad(num: number): string {
    num = Math.floor(num);

    return num < 10 ? '0' + num : num.toString();
  }

  private checkDate(millisSinceMidnight: number): number {
    if (millisSinceMidnight >= DAY) {
      this.initLogFile();

      millisSinceMidnight -= DAY;
    }

    return millisSinceMidnight;
  }

  public log(str: string) {
    let millisSinceMidnight = Date.now() - this.date.getTime();

    millisSinceMidnight = this.checkDate(millisSinceMidnight);

    this.logFile.write(this.formatTime(millisSinceMidnight) + ' ' + str + NEW_LINE);

    console.log(str);
  }

  public debug(message: string) {
    this.log('DEBUG: ' + message);
  }

  public info(message: string) {
    this.log(' INFO: ' + message);
  }

  public error(message: string) {
    this.log('ERROR: ' + message);
  }
}

const dailyLog = new DailyLog();
export default dailyLog;
