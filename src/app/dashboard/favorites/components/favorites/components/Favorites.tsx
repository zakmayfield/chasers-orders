'use client';
import { useGetFavorites } from '@/shared/hooks/data';
import { Favorite } from '@/app/dashboard/favorites/components/favorites/favorite';

export const Favorites = () => {
  const { data: favorites } = useGetFavorites();

  return (
    <div>
      {favorites?.map((favorite) => (
        <Favorite key={favorite.id} favoriteData={favorite} />
      ))}
    </div>
  );
};
