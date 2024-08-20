'use client';
import { useGetFavorites } from '@/shared/hooks/data';
import { LoadingSpinner } from '@/shared/components';
import { Favorites, FavoritesEmpty, FavoritesLoading } from './components';

export const FavoritesContainer = () => {
  const { data: favorites, isLoading } = useGetFavorites();
  return (
    <div>
      <h2 className='flex items-center gap-3'>
        Favorites <span>{isLoading && <LoadingSpinner />}</span>
      </h2>

      <div className=''>
        {isLoading ? (
          <FavoritesLoading />
        ) : !favorites?.length ? (
          <FavoritesEmpty />
        ) : (
          <Favorites />
        )}
      </div>
    </div>
  );
};
