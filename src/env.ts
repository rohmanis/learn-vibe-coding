export interface AppConfig {
  port: number;
  mysqlHost: string;
  mysqlPort: number;
  mysqlUser: string;
  mysqlPassword: string;
  mysqlDatabase: string;
}

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function read(value: string | undefined, fallback = ''): string {
  return value?.trim() || fallback;
}

export function getConfig(): AppConfig {
  return {
    port: toNumber(process.env.PORT, 3000),
    mysqlHost: read(process.env.MYSQL_HOST),
    mysqlPort: toNumber(process.env.MYSQL_PORT, 3306),
    mysqlUser: read(process.env.MYSQL_USER),
    mysqlPassword: read(process.env.MYSQL_PASSWORD, ''),
    mysqlDatabase: read(process.env.MYSQL_DATABASE),
  };
}

export function hasMysqlConfig(config: AppConfig): boolean {
  return Boolean(config.mysqlHost && config.mysqlUser && config.mysqlDatabase && config.mysqlPort > 0);
}

