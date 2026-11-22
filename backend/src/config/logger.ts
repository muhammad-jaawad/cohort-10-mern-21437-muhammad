import pino from 'pino';
import env from './env';

const logger = pino({
  level: env.logLevel,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
      'req.body.token',
      'password',
      'token',
      '*.password',
      '*.token',
      'err.body',
    ],
    censor: '[REDACTED]',
  },
});

export default logger;
