import { UserData } from '@/types/user';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const getUser = async (): Promise<UserData> =>
  await fetchHandler({
    route: '/user',
  });
