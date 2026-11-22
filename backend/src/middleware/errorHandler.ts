import type { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';
import logger from '../config/logger';

interface HttpError extends Error {
  statusCode?: number;
  status?: number;
  type?: string;
  body?: unknown;
}

const PARSE_FAILED_MESSAGE = 'Malformed request body';

export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
}

/**
 * Body-parser errors carry the raw request body (`err.body`) and their message
 * can echo a snippet of it. Neither may reach the logs or the client.
 * Only whitelisted fields are logged, so `body` is never serialized.
 */
function isParserError(err: HttpError): boolean {
  return typeof err.type === 'string' && err.type.startsWith('entity.');
}

function sanitizeError(err: HttpError): { logError: Record<string, unknown>; message: string } {
  if (isParserError(err)) {
    return {
      logError: { type: err.type, name: err.name, message: PARSE_FAILED_MESSAGE },
      message: PARSE_FAILED_MESSAGE,
    };
  }
  return {
    logError: { type: err.type, name: err.name, message: err.message, stack: err.stack },
    message: err.message,
  };
}

/**
 * Keep this last in the middleware chain so it catches errors from every route.
 */
export function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction): void {
  const statusCode = err.statusCode || err.status || 500;
  const { logError, message: safeMessage } = sanitizeError(err);
  const message = statusCode < 500 ? safeMessage : 'Internal server error';

  if (statusCode >= 500) {
    logger.error({ err: logError, path: req.originalUrl, method: req.method }, safeMessage);
  } else {
    logger.warn({ path: req.originalUrl, method: req.method }, safeMessage);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}
