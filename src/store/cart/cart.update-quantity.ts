import type { UnitsOnCart } from '@prisma/client';

export interface IUpdatedCart {
  id: string;
  userId: string;
  items: UnitsOnCart[];
}

type ResolvedUpdatedCart = {
  (params: {
    cartId: string;
    unitId: string;
    quantityPayload: number;
  }): Promise<IUpdatedCart>;
};

export const updateCartItemQuantity: ResolvedUpdatedCart = async (params) => {
  const { cartId, unitId, quantityPayload } = params;

  try {
    const response = await fetch('/api/cart/update', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ cartId, unitId, quantityPayload }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
