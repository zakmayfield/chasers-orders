import { ProductWithUnits } from '@/types/products';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const getProducts = async (): Promise<ProductWithUnits[]> =>
  await fetchHandler({
    route: '/products',
  });
