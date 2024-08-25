import { getAuthorization } from '@/services/queries/getAuthorization';
import { QueryKeys } from '@/types/hooks';
import { useCustomQuery } from '@/shared/hooks/custom';
import { UserAuthorization } from '@/types/user';

export const useGetAuthorization = () => {
  const { data, isLoading, error } = useCustomQuery<UserAuthorization>({
    queryKey: [QueryKeys.USER_STATUS],
    queryFn: getAuthorization,
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};
