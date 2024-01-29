import type { CartType } from '@/types';

export const getCart = async (): Promise<CartType> => {
  const data = await fetch('/api/cart')
    .then((res) => res.json())
    .catch((err) => err);

  return data;
};
