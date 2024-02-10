import { UnitsOnCartCacheType } from '@/types/types.cart';

type AddItemToCartParams = {
  (unitId: string): Promise<AddToCartResponseData>;
};

type AddToCartResponseData = UnitsOnCartCacheType;

export const addItem: AddItemToCartParams = async (unitId) => {
  try {
    const response = await fetch('/api/cart/item/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(unitId),
    });

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
