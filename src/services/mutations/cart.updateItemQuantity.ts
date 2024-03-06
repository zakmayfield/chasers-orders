import type { UnitsOnCartCacheType } from '@/features/cart/types';

type UpdateItemQuantityType = {
  (params: {
    cartId: string;
    unitId: string;
    quantityPayload: number;
  }): Promise<UnitsOnCartCacheType>;
};

export const updateItemQuantity: UpdateItemQuantityType = async (params) => {
  const { cartId, unitId, quantityPayload } = params;

  try {
    const response = await fetch('/api/cart/item/quantity', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ cartId, unitId, quantityPayload }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
