import { ProductWithUnits } from '@/types/products';
import { fetchHandler } from '@/utils/fetch';

export const getProducts = async (): Promise<ProductWithUnits[]> =>
  await fetchHandler({
    route: '/products',
  });
