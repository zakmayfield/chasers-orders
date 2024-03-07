import type { ProductWithUnits } from '@/features/products/types';
import type { ExtendedFavorite } from '@/features/products/helpers.products';

/*
  ^ ----- QUERIES -----
*/

interface GetProductsParams {
  (): Promise<ProductWithUnits[]>;
}

export const getProducts: GetProductsParams = async () => {
  try {
    const response = await fetch('/api/products');

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

/*
  ^ ----- MUTATIONS -----
*/

type ToggleFavoriteProps = {
  (action: Actions, id?: string): Promise<ExtendedFavorite>;
};
export type Actions = 'add' | 'remove';

export const toggleFavorite: ToggleFavoriteProps = async (action, id) => {
  try {
    const response = await fetch('/api/user/favorites/toggle', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-Action': action,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
