"use client";

import { useState, useEffect, useCallback } from "react";

interface UseMarketDataResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

/**
 * 클라이언트 사이드 데이터 페칭 훅
 * @param fetcher - API 호출 함수
 * @param intervalMs - 자동 갱신 간격 (ms). 0이면 자동 갱신 안함
 */
export function useMarketData<T>(
  fetcher: () => Promise<T>,
  intervalMs = 30_000,
): UseMarketDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const result = await fetcher();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    load();

    if (intervalMs > 0) {
      const id = setInterval(load, intervalMs);
      return () => clearInterval(id);
    }
  }, [load, intervalMs]);

  return { data, error, loading, refetch: load };
}
