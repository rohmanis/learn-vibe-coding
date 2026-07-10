import { sql } from 'drizzle-orm';
import { Elysia } from 'elysia';
import { getDatabase } from './db/client';
import { getConfig, hasMysqlConfig } from './env';

export function buildApp() {
  return new Elysia()
    .get('/', () => ({
      message: 'learn-vibe-coding is running',
    }))
    .get('/health', () => ({
      status: 'ok',
    }))
    .get('/db-status', async () => {
      const config = getConfig();

      if (!hasMysqlConfig(config)) {
        return {
          status: 'unconfigured',
          message: 'MySQL environment belum lengkap',
        };
      }

      const database = getDatabase();

      if (!database) {
        return {
          status: 'unavailable',
        };
      }

      try {
        await database.execute(sql`SELECT 1 as ok`);

        return {
          status: 'connected',
        };
      } catch (error) {
        return {
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    });
}

