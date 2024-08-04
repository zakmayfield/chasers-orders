import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { UserStatusAPIResponse } from '@/types/dashboard';
import { userStatus } from './services.account-pending';

export interface IUseUserStatusMutation {
  ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback?: (data: UserStatusAPIResponse) => void;
    onErrorCallback?: (error: Error) => void;
  }): {
    mutate: UseMutateFunction<UserStatusAPIResponse, Error, void, unknown>;
  };
}

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
