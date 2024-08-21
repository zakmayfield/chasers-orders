'use client';
import { useGetFavorites } from '@/shared/hooks/data';
import { Heading, SpinLoader } from '@/shared/components/ui';
import { Favorites, FavoritesEmpty, FavoritesLoading } from './components';

export const FavoritesContainer = () => {
  const { data: favorites, isLoading } = useGetFavorites();
  return (
    <div>
      {/* Favorites Header */}
      <div className='flex items-center gap-3 mb-3'>
        <Heading as='h2' content='Favorites' />
        {isLoading && <SpinLoader />}
      </div>

      {/* Favorites Data */}
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
