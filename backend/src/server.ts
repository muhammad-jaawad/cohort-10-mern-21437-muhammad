import app from './app';
import env from './config/env';
import logger from './config/logger';

const server = app.listen(env.port, () => {
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : env.port;
  logger.info(`Server listening on port ${port} (${env.nodeEnv})`);
});

// server.close() won't invoke its callback while connections stay open,
// so force the exit after a bounded wait rather than hanging forever.
function stop(exitCode: number): void {
  const forceExit = setTimeout(() => process.exit(exitCode), 10000);
  server.close(() => {
    clearTimeout(forceExit);
    process.exit(exitCode);
  });
}

function shutdown(signal: string, exitCode: number): void {
  logger.info(`${signal} received, shutting down`);
  stop(exitCode);
}

function crash(err: unknown, origin: string): void {
  logger.error({ err }, `${origin}, shutting down`);
  stop(1);
}

process.on('SIGTERM', () => shutdown('SIGTERM', 0));
process.on('SIGINT', () => shutdown('SIGINT', 0));
process.on('unhandledRejection', (err) => crash(err, 'Unhandled promise rejection'));
process.on('uncaughtException', (err) => crash(err, 'Uncaught exception'));
