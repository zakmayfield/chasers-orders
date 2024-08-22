import { UserAuthorization } from '@/types/user';
import { fetchHandler } from '@/utils/fetch';

export const getAuthorization = async (): Promise<UserAuthorization> =>
  await fetchHandler({
    route: '/user/status',
  });
