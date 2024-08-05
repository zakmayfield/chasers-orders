import { UserStatusAPIResponse } from '@/types/dashboard';
import { fetchHandler } from '@/utils/fetch';

export type UserStatus = {
  (): Promise<UserStatusAPIResponse>;
};

export const getUserStatus = async (): Promise<UserStatusAPIResponse> =>
  await fetchHandler({
    route: '/user/status',
  });
