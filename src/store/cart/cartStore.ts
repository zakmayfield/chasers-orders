import type { CartType } from '@/types';
import type { UnitsOnCart } from '@prisma/client';

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

export const removeCartItem = async ({
  unitId,
  cartId,
}: {
  unitId: string;
  cartId: string;
}): Promise<Response> => {
  const data = await fetch('/api/cart/remove', {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ unitId, cartId }),
  })
    .then((res) => res.json())
    .catch((err) => err);

  return data;
};

interface IUpdatedCart {
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
