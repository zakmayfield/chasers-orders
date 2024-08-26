import { TUserExtendedAuthorization } from '@/shared/types/User';
import { fetchHandler } from '@/utils/fetch';

export const getAuthorization = async (): Promise<TUserExtendedAuthorization> =>
  await fetchHandler({
    route: '/user/status',
  });
