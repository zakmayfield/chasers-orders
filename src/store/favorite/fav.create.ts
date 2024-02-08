import { Favorite } from '@prisma/client';

type CreateFavoriteType = {
  (productId?: string): Promise<Favorite>;
};

export const createFavorite: CreateFavoriteType = async (productId) => {
  try {
    const response = await fetch('/api/user/favorites/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(productId),
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
