// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Database from 'better-sqlite3';
import { pathConfig } from '@/universal/config';
import fs from 'fs';
import dailyLog from '@/main/log';

class DB {
  dbConnection: any;
  constructor() {
    this.dbConnection = new Database(pathConfig.DOCUMENT_PATH);
    this.dbConnection.pragma('journal_mode = WAL');

    ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'].forEach((eventType) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      process.on(eventType, () => {
        if (this.dbConnection) {
          // closing connection is especially important to fold -wal file into the main DB file
          // (see https://sqlite.org/tempfiles.html for details)
          this.dbConnection.close();
        }
      });
    });
  }
  private isDbInitialized() {
    const stmt = this.dbConnection.prepare(`SELECT name FROM sqlite_master
                                 WHERE type = 'table' AND name = 'option'`);
    const row = stmt.get();
    // eslint-disable-next-line no-debugger
    debugger;
    if (row) {
      const sql = "SELECT * FROM option WHERE option_name = 'initialized'";
      const initialized = this.dbConnection.prepare(sql).get();
      return initialized !== undefined && initialized.option_value === 'true';
    } else {
      return false;
    }
  }
  async initialDatabase() {
    dailyLog.info('creating database schema ...');

    if (this.isDbInitialized()) {
      dailyLog.info('database already initialized...');
      return;
    }

    let schema = null;
    try {
      schema = fs.readFileSync(pathConfig.SCHEMA_PATH, 'utf-8');
    } catch (e) {
      dailyLog.error('找不到schema文件,' + pathConfig.SCHEMA_PATH);
    }

    if (!schema) {
      dailyLog.error('schema文件解析异常,' + pathConfig.SCHEMA_PATH);
    }

    const date = new Date().toISOString().replace('T', ' ').replace('Z', '');
    const obj = {
      option_id: '1',
      option_name: 'initialized',
      name_desc: '初始化标记',
      option_value: 'true',
      value_desc: '是否初始化',
      type: '0',
      create_time: date,
      update_time: date
    };
    const transaction = this.dbConnection.transaction((scheme: any, obj: any) => {
      this.dbConnection.exec(scheme);
      this.save('option', obj)
        .then(() => {
          dailyLog.info('create database schema successfully...');
        })
        .catch((e) => {
          dailyLog.error(e);
          dailyLog.error('create database schema error...');
        });
    });
    transaction(schema, obj);
  }

  public save(tableName: string, obj: any) {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
      throw new Error('');
    }
    const columns = keys.join(', ');
    const marks = keys.map(() => '?').join(', ');
    const query = `INSERT INTO \`${tableName}\` (${columns}) VALUES (${marks})`;
    return this.run(query, Object.values(obj)).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  public async update(tableName: string, primaryKey: string, obj: any) {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
      return null;
    }
    const columns = keys.join(', ');
    const updateKey = keys.map(() => '?').join(', ');
    const updateValue = keys.map((colName) => `${colName} = @${colName}`).join(', ');
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${updateKey}) ON (${primaryKey}) DO UPDATE SET ${updateValue}`;
    this.run(query, Object.values(obj))
      .then((obj) => {
        return obj;
      })
      .catch((e) => {
        throw e;
      });
  }

  public async get(sql: string, param: []) {
    this.run(sql, param)
      .then((obj) => {
        return obj[0];
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
  }

  public async list(sql: string, param: []) {
    this.run(sql, param)
      .then((obj) => {
        return obj;
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
  }
  private run(sql: string, param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      dailyLog.debug('==========================');
      dailyLog.debug('sql      ===>' + sql);
      dailyLog.debug('param    ===>' + param);
      const startTimestamp = Date.now();
      let obj = null;
      try {
        obj = this.dbConnection.prepare(sql).run(param);
        const endTimestamp = Date.now();
        dailyLog.debug('result   ===>' + obj.changes);
        dailyLog.debug('duration ===>' + (endTimestamp - startTimestamp));
        dailyLog.debug('==========================');
        return resolve(obj);
      } catch (e) {
        reject(e.message);
      }
    });
  }
}

const db = new DB();
export default db;
