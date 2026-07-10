import { drizzle } from 'drizzle-orm/mysql2';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { getConfig, hasMysqlConfig } from '../env';
import { schema } from './schema';

let pool: mysql.Pool | null = null;
let database: MySql2Database<typeof schema> | null = null;

export function getDatabase() {
  const config = getConfig();

  if (!hasMysqlConfig(config)) {
    return null;
  }

  if (!pool) {
    pool = mysql.createPool({
      host: config.mysqlHost,
      port: config.mysqlPort,
      user: config.mysqlUser,
      password: config.mysqlPassword,
      database: config.mysqlDatabase,
      connectionLimit: 5,
    });
  }

  if (!database) {
    database = drizzle(pool, { schema, mode: 'default' });
  }

  return database;
}

export async function closeDatabase(): Promise<void> {
  if (pool) {
    await pool.end();
  }

  pool = null;
  database = null;
}

