import { useMutation } from '@tanstack/react-query';
import { IUseUserStatusMutation, UserStatusAPIResponse } from './types';
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
