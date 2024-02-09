'use client';

import { useFavoritesQuery } from '@/hooks/useFavoritesQuery';
import Favorite from './Favorite';

export default function Favorites() {
  const { favorites } = useFavoritesQuery();

  const OnNoFavorites = favorites && favorites.length === 0 && (
    <div>
      <p>No favorites yet</p>
    </div>
  );

  return (
    <div>
      <div>Favorites</div>
      {OnNoFavorites}
      {favorites &&
        favorites.length > 0 &&
        favorites.map((fav) => <Favorite key={fav.id} fav={fav} />)}
    </div>
  );
}
