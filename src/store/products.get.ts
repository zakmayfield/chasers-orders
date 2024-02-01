import { ProductWithUnits } from '@/types/types.product';

export const getProducts = async (): Promise<ProductWithUnits[]> => {
  const dataList: ProductWithUnits[] = await fetch('/api/get-products').then(
    (res) => res.json()
  );
  return dataList;
};
