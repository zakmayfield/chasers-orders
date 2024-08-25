import { CartSizesData } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';

export const getUnitSizes = async (unitId: string): Promise<CartSizesData> =>
  await fetchHandler({
    route: `/cart/item/sizes?unitId=${unitId}`,
  });
