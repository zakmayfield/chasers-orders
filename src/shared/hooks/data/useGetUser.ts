import { useCustomQuery } from '@/shared/hooks/custom';
import { getUser } from '@/services/queries/getUser';
import { QueryKeys } from '@/shared/types/Cache';
import { UserData } from '@/types/user';

export const useGetUser = () => {
  const { data, isLoading, error, isError } = useCustomQuery<UserData>({
    queryKey: [QueryKeys.DASHBOARD],
    queryFn: getUser,
    staleTime: 60 * 1000 * 10,
  });

  return { data, isLoading, error, isError };
};
