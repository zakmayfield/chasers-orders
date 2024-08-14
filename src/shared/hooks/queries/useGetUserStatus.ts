import { getUserStatus } from '@/services/queries/getUserStatus';
import { QueryKeys } from '@/types/hooks';
import { useCustomQuery } from './useCustomQuery';
import { UserStatusAPIResponse } from '@/types/dashboard';

export const useGetUserStatus = () => {
  const { data, isLoading, error } = useCustomQuery<UserStatusAPIResponse>({
    queryKey: [QueryKeys.USER_STATUS],
    queryFn: getUserStatus,
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};
