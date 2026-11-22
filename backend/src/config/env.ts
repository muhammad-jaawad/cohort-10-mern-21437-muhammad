import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export interface EnvConfig {
  nodeEnv: string;
  port: number;
  logLevel: string;
  corsOrigin: string;
}

const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  logLevel: process.env.LOG_LEVEL || 'info',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

export default env;
