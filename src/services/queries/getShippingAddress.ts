import { ShippingData } from '@/types/user';
import { fetchHandler } from '@/utils/fetch';

export const getShippingAddress = async (): Promise<ShippingData> =>
  fetchHandler({
    route: '/user/company/shipping',
  });
