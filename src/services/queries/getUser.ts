import { DashboardUserData } from '@/types/user';
import { fetchHandler } from '@/utils/fetch';

export const getUser = async (): Promise<DashboardUserData> =>
  await fetchHandler({
    route: '/user',
  });
