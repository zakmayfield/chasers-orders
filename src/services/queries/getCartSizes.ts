import { CartSizesData } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';

export const getCartSizes = async (unitId: string): Promise<CartSizesData> =>
  await fetchHandler({
    route: `/cart/item/sizes?unitId=${unitId}`,
  });
