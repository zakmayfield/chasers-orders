import type { Product } from '@/types';

export const getProducts = async (): Promise<Product[]> => {
  const dataList: Product[] = await fetch('/api/get-products').then((res) =>
    res.json()
  );
  return dataList;
};
