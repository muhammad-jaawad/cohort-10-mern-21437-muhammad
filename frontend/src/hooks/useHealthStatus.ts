import { useEffect, useState } from 'react';
import { getHealthStatus } from '../services/api';

export type HealthStatus = 'checking' | 'online' | 'degraded' | 'offline';

export function useHealthStatus(): HealthStatus {
  const [status, setStatus] = useState<HealthStatus>('checking');

  useEffect(() => {
    let isMounted = true;

    getHealthStatus()
      .then((data) => {
        if (!isMounted) return;
        setStatus(data?.db === 'connected' ? 'online' : 'degraded');
      })
      .catch(() => {
        if (isMounted) setStatus('offline');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return status;
}
