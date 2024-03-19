import { useMutation, useQuery } from '@tanstack/react-query';
import {
  IUseUserStatusMutation,
  IUseUserStatusQuery,
  UserStatusAPIResponse,
} from './types';
import { userStatus } from './services.account-pending';

export const useUserStatusMutation: IUseUserStatusMutation = ({
  onSuccessCallback,
  onErrorCallback,
}) => {
  const { mutate } = useMutation<UserStatusAPIResponse, Error, void, unknown>({
    mutationFn: userStatus,
    onSuccess(data) {
      onSuccessCallback?.(data);
    },
    onError(error) {
      onErrorCallback?.(error);
    },
  });

  return { mutate };
};

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
    queryFn: userStatus,
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
