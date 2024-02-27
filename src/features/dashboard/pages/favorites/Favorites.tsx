'use client';

import { useFavoritesQuery } from '@/hooks/queries/useFavoritesQuery';
import Favorite from './components/Favorite';
import FavoritesLoadingSkeleton from './components/FavoritesLoadingSkeleton';
import EmptyFavorites from './components/EmptyFavorites';

export default function Favorites() {
  const { favorites, isLoading } = useFavoritesQuery();

  if (isLoading) {
    return <FavoritesLoadingSkeleton />;
  }

  if (favorites && favorites.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div>
      <div>Favorites</div>
      {favorites &&
        favorites.length > 0 &&
        favorites.map((fav) => <Favorite key={fav.id} fav={fav} />)}
    </div>
  );
}
