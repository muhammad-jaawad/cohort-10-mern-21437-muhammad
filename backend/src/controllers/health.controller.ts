import type { Request, Response } from 'express';
import type { HealthResponse } from '../../../shared/types/health';

export function getHealth(req: Request, res: Response<HealthResponse>): void {
  res.status(200).json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
