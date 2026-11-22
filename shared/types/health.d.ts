export type DbStatus = 'connected' | 'unavailable';

export interface HealthResponse {
  success: boolean;
  status: string;
  uptime: number;
  db: DbStatus;
  timestamp: string;
}
