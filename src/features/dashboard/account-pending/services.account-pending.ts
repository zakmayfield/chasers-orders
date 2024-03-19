import { UserStatus, UserStatusAPIResponse, UserStatusResponse } from './types';
import { baseURL } from '@/utils/constants';

export const userStatus: UserStatus = async () => {
  try {
    const url = baseURL + '/api/auth/user/status';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
