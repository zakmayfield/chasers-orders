import { ExtendedFavorite } from '@/hooks/useFavoritesQuery';

type GetFavoritesType = {
  (): Promise<ExtendedFavorite[]>;
};

export const getFavorites: GetFavoritesType = async () => {
  const apiUrl = '/api/user/favorites';
  try {
    const response = await fetch(apiUrl);

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
