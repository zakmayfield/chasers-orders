import { UnitsOnCart } from '@prisma/client';

type AddToCartParams = {
  (unitId: string): Promise<AddToCartResponseData>;
};

type AddToCartResponseData = Pick<UnitsOnCart, 'unitId'>;

export const addToCart: AddToCartParams = async (unitId) => {
  try {
    const response = await fetch('/api/cart/add', {
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
