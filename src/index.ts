import { buildApp } from './app';
import { closeDatabase } from './db/client';
import { getConfig } from './env';

const config = getConfig();
const app = buildApp();

app.listen(config.port);

console.log(`Server running at http://localhost:${config.port}`);

const shutdown = async () => {
  await closeDatabase();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

