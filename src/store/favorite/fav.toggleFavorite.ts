import { ExtendedFavorite } from '@/hooks/useFavoritesQuery';
import { Favorite } from '@prisma/client';

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
