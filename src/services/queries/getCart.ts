import { CartCache } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';

export const getCart = async (): Promise<CartCache> =>
  await fetchHandler({
    route: '/cart',
  });
