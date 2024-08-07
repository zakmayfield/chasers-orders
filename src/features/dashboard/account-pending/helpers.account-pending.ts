import { useQuery } from '@tanstack/react-query';
import { UserStatusAPIResponse } from '@/types/dashboard';
import { getUserStatus } from '@/services/queries/getUserStatus';

export interface IUseUserStatusQuery {
  ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback?: (data: UserStatusAPIResponse) => void;
    onErrorCallback?: (error: Error) => void;
  }): {
    status: UserStatusAPIResponse | undefined;
    isLoading: boolean;
  };
}

export const useUserStatusQuery: IUseUserStatusQuery = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const { data: status, isLoading } = useQuery<
    UserStatusAPIResponse,
    Error,
    UserStatusAPIResponse,
    string[]
  >({
    queryKey: ['account-status'],
    queryFn: getUserStatus,
    staleTime: Infinity,
    onSuccess(data) {
      onSuccessCallback?.(data);
    },
    onError(error) {
      onErrorCallback?.(error);
    },
  });

  return { status, isLoading };
};
