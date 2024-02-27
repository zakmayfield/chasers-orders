'use client';

import { useFavoritesQuery } from '@/hooks/queries/useFavoritesQuery';
import Favorite from './components/Favorite';
import FavoritesLoadingSkeleton from './components/FavoritesLoadingSkeleton';
import EmptyFavorites from './components/EmptyFavorites';
import LoadingSpinner from '@/features/spinner/LoadingSpinner';

export default function Favorites() {
  const { favorites, isLoading } = useFavoritesQuery();

  if (favorites && favorites.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div>
      <h2 className='flex items-center mb-6'>
        Favorites {isLoading && <LoadingSpinner />}
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
