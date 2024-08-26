import { CartCache } from '@/types/cart';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const getCart = async (): Promise<CartCache> =>
  await fetchHandler({
    route: '/cart',
  });
