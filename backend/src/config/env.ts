import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export interface EnvConfig {
  nodeEnv: string;
  port: number;
  logLevel: string;
  corsOrigin: string;
}

const DEFAULT_PORT = 5000;

/** Keeps an explicit PORT=0 (ephemeral port); falls back only when unset or invalid. */
function parsePort(raw: string | undefined): number {
  if (raw === undefined || raw.trim() === '') return DEFAULT_PORT;
  const port = Number(raw);
  return Number.isInteger(port) && port >= 0 && port <= 65535 ? port : DEFAULT_PORT;
}

const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parsePort(process.env.PORT),
  logLevel: process.env.LOG_LEVEL || 'info',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

export default env;
