import { UseCustomQueryParams } from '@/types/hooks';
import { useQuery } from '@tanstack/react-query';

export const useCustomQuery = <T>({
  queryKey,
  queryFn,
  staleTime,
}: UseCustomQueryParams<T>) => {
  const { data, isLoading, error, isError, isFetching } = useQuery<T, Error>({
    queryKey,
    queryFn,
    staleTime,
  });

  return { data, isLoading, error, isError, isFetching };
};
