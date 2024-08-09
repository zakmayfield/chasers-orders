'use client';

import Favorite from './components/Favorite';
import FavoritesLoadingSkeleton from './components/FavoritesLoadingSkeleton';
import EmptyFavorites from './components/EmptyFavorites';
import { LoadingSpinner } from '@/shared/components';
import { useGetFavorites } from '@/shared/hooks/queries';

export default function Favorites() {
  const { data, isLoading } = useGetFavorites();

  if (data && data.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div>
      <h2 className='flex items-center mb-6'>
        Favorites{' '}
        {isLoading && (
          <span className='ml-3'>
            <LoadingSpinner />
          </span>
        )}
      </h2>

      {isLoading ? (
        <FavoritesLoadingSkeleton />
      ) : (
        <div>
          {data &&
            data.length > 0 &&
            data.map((favorite) => (
              <Favorite key={favorite.id} fav={favorite} />
            ))}
        </div>
      )}
    </div>
  );
}
