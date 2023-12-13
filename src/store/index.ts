import type { CartType, Product } from '@/types';

export const getProducts = async (): Promise<Product[]> => {
  const dataList: Product[] = await fetch('/api/get-products').then((res) =>
    res.json()
  );
  return dataList;
};

export const getCart = async (): Promise<CartType> => {
  const data = await fetch('/api/cart')
    .then((res) => res.json())
    .catch((err) => err);

  return data;
};

export const postUnitsToCart = async (unitId: string): Promise<Response> => {
  const data = await fetch('/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(unitId),
  })
    .then((res) => res.json())
    .catch((err) => err);

  return data;
};
