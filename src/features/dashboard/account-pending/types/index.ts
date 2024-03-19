import { UseMutateFunction } from '@tanstack/react-query';

//^ API
export type UserStatusAPIResponse = {
  id: string;
  isApproved: boolean;
  emailVerified: Date | null;
};

//^ Service
export type UserStatus = {
  (): UserStatusResponse;
};

export type UserStatusResponse = Promise<UserStatusAPIResponse>;

//^ Mutations
export interface IUseUserStatusMutation {
  ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback?: (data: UserStatusAPIResponse) => void;
    onErrorCallback?: (error: Error) => void;
  }): {
    mutate: UserStatusMutateFunction;
  };
}

export type UserStatusMutateFunction = UseMutateFunction<
  UserStatusAPIResponse,
  Error,
  void,
  unknown
>;

//^ Queries

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
