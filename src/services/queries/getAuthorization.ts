import { TUserExtendedAuthorization } from '@/shared/types/User';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const getAuthorization = async (): Promise<TUserExtendedAuthorization> =>
  await fetchHandler({
    route: '/user/status',
  });
