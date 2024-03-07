'use client';

import { useFavoritesQuery } from '@/features/products/helpers.products';
import Favorite from './components/Favorite';
import FavoritesLoadingSkeleton from './components/FavoritesLoadingSkeleton';
import EmptyFavorites from './components/EmptyFavorites';
import LoadingSpinner from '@/features/shared/LoadingSpinner';

export default function Favorites() {
  const {
    query: { favorites, isLoading },
  } = useFavoritesQuery({});

  if (favorites && favorites.length === 0) {
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
          {favorites &&
            favorites.length > 0 &&
            favorites.map((fav) => <Favorite key={fav.id} fav={fav} />)}
        </div>
      )}
    </div>
  );
}
