import { DashboardUserData } from '@/types/types.dashboard';
import { fetchHandler } from '@/utils/fetch';

export const getUser = async (): Promise<DashboardUserData> =>
  await fetchHandler({
    route: '/user',
  });
