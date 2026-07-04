'use client';

import { useMemo } from 'react';

import { useApiResource, type ResourceListQuery } from '@/hooks/api/useApiResource';

interface UseLiveRowsOptions<ApiRow, UiRow> {
  resource: string;
  fallbackData?: UiRow[];
  mapRow: (row: ApiRow, index: number) => UiRow;
  query?: ResourceListQuery;
}

interface UseLiveRowsResult<UiRow> {
  data: UiRow[];
  isLoading: boolean;
  isLive: boolean;
  error: Error | null;
}

/**
 * Reads list rows from the backend and maps API records into UI table rows.
 *
 * @param resource - API endpoint path mounted under the configured API base URL.
 * @param fallbackData - Deprecated demo rows; ignored so production never masks empty API data.
 * @param mapRow - Mapper from backend records to the component's display row.
 * @param query - Standard list query parameters such as page, limit, and sorting.
 * @returns UI table rows plus loading/live-state metadata.
 */
export const useLiveRows = <ApiRow, UiRow>({
  resource,
  mapRow,
  query = { page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc' },
}: UseLiveRowsOptions<ApiRow, UiRow>): UseLiveRowsResult<UiRow> => {
  const { data: response, isLoading, error } = useApiResource<ApiRow>(resource, query);

  const liveRows = useMemo(() => {
    return response?.data?.map(mapRow) ?? [];
  }, [mapRow, response?.data]);

  return {
    data: liveRows,
    isLoading,
    isLive: Boolean(response),
    error,
  };
};
