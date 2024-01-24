import type { CartType, Product } from '@/types';

export const tokenCheck = async (
  token: string | null
): Promise<Response | undefined> => {
  const data = await fetch('/api/auth/email/verify', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
    .then((res) => {
      if (!res.ok) {
        return res;
      }
      return res.json();
    })
    .catch((error) => error);

  return data;
};

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

export const updateCartItemQuantity = async ({
  cartId,
  unitId,
  quantityPayload,
}: {
  cartId: string;
  unitId: string;
  quantityPayload: number;
}) => {
  const data = await fetch('/api/cart/update', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ cartId, unitId, quantityPayload }),
  })
    .then((res) => res.json())
    .catch((err) => err);

  return data;
};
