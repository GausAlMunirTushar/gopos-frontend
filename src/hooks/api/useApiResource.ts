'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient, type ApiResponse } from '@/lib/api/client';

export interface ResourceListQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  type?: string;
  [key: string]: string | number | undefined;
}

export const useApiResource = <T>(resource: string, query: ResourceListQuery = {}) => {
  return useQuery({
    queryKey: [resource, query],
    queryFn: async () => apiClient.get<T[]>(resource, query),
  });
};

export const useCreateApiResource = <Payload, Result>(resource: string) => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Result>, Error, Payload>({
    mutationFn: async (payload) => apiClient.post<Result>(resource, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });
};
