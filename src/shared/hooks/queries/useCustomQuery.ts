import { UseCustomQueryParams } from '@/types/hooks';
import { useQuery } from '@tanstack/react-query';

export const useCustomQuery = <T>({
  queryKey,
  queryFn,
}: UseCustomQueryParams<T>) => {
  const { data, isLoading, error, isError } = useQuery<T, Error>({
    queryKey,
    queryFn,
  });

  return { data, isLoading, error, isError };
};
