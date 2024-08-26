import { CartSizesData } from '@/types/cart';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const getUnitSizes = async (unitId: string): Promise<CartSizesData> =>
  await fetchHandler({
    route: `/cart/item/sizes?unitId=${unitId}`,
  });
