import { CartCache } from '@/types/types.cart';

export const getCart = async (): Promise<CartCache | undefined> => {
  try {
    const response = await fetch('/api/cart');

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};