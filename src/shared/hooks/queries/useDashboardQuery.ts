import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { UserData } from '@/types/user';
import { getUser } from '@/services/queries/getUser';
import { QueryKeys } from '@/types/hooks';

type DashboardFetchState<T> = T | DashboardQueryError | null;
type DashboardQueryError = {
  error: string;
};

export const useDashboardQuery = <T>(
  property?: 'contact' | 'orders' | 'company' | 'favorites'
) => {
  const queryClient = useQueryClient();

  const [fetchState, setFetchState] = useState<DashboardFetchState<T>>(null);
  const [isLoading, setIsLoading] = useState(false);

  function isError(data: unknown): data is DashboardQueryError {
    return !!data && typeof data === 'object' && 'error' in data;
  }
  function isData(data: unknown): data is T {
    return !!data && typeof data === 'object' && 'id' in data;
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data: UserData | undefined = await queryClient.fetchQuery(
          [QueryKeys.DASHBOARD],
          getUser,
          {
            staleTime: 60 * 1000 * 5,
          }
        );

        if (!data) {
          setFetchState({
            error: `Could not access ${property ? property : 'account'} data`,
          });
          setIsLoading(false);
          return;
        }

        setFetchState(property ? (data[property] as T) : (data as T));
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setFetchState({ error: error.message });
          setIsLoading(false);
          console.error(error);
        }
      }
    })();
  }, [property, queryClient]);

  return { fetchState, isLoading, isData, isError };
};
