import { UserData } from '@/types/user';
import { fetchHandler } from '@/utils/fetch';

export const getUser = async (): Promise<UserData> =>
  await fetchHandler({
    route: '/user',
  });
