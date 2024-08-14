'use client';
import { useGetFavorites } from '@/shared/hooks/queries';
import { Favorite } from '@/features/dashboard/favorites/favorite';

export const Favorites = () => {
  const { data: favorites } = useGetFavorites();

  return (
    <div>
      {favorites?.map((favorite) => <Favorite favoriteData={favorite} />)}
    </div>
  );
};
