import { DashboardUserData } from '@/types/types.dashboard';
import { fetchHandler } from '@/utils/fetch';

export const getDashboardUser = async (): Promise<DashboardUserData> =>
  await fetchHandler({
    route: '/user',
  });
