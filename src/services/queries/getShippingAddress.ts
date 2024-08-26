import { ShippingData } from '@/types/user';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const getShippingAddress = async (): Promise<ShippingData> =>
  fetchHandler({
    route: '/user/company/shipping',
  });
