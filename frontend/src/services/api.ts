import { API_BASE_URL } from '../utils/constants';
import type { HealthResponse } from '../../../shared/types/health';

export async function apiGet<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`);

    if (!res.ok) {
      throw new Error(`Request to ${path} failed with status ${res.status}`);
    }

    return (await res.json()) as T;
  } catch (err) {
    throw err instanceof Error ? err : new Error(`Request to ${path} failed`);
  }
}

export function getHealthStatus(): Promise<HealthResponse> {
  return apiGet<HealthResponse>('/health');
}
