import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';

export type UseCustomQueryParams<T> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
  staleTime?: number;
};

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
