import type { UnitsOnCartCacheType } from '@/types/types.cart';

type UpdateQuantityType = {
  (params: {
    cartId: string;
    unitId: string;
    quantityPayload: number;
  }): Promise<UnitsOnCartCacheType>;
};

export const updateQuantity: UpdateQuantityType = async (params) => {
  const { cartId, unitId, quantityPayload } = params;

  try {
    const response = await fetch('/api/cart/update-quantity', {
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
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
