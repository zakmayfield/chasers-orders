import { Favorite } from '@prisma/client';

type GetFavoritesType = {
  (extended?: boolean): Promise<Favorite[]>;
};

export const getFavorites: GetFavoritesType = async (extended = false) => {
  const apiUrl = '/api/user/favorites';
  const extendedFlag = `?extended=${extended}`;

  try {
    const response = await fetch(apiUrl + extendedFlag);

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
