import { Container, PulseLoader } from '@/shared/components/ui';
import { useGetFavorites } from '@/shared/hooks/data/favorites/useFavorites';
import { Error } from '../molecules/Error';
import { FavoritesItem } from '../molecules/FavoritesItem';
import { FavoritesEmpty } from '../molecules/FavoritesEmpty';

export const FavoritesList = () => {
  const { favorites, isLoading, error } = useGetFavorites();

  const loading = isLoading && (
    <Container as='div' flex='col'>
      <PulseLoader width='full' />
      <PulseLoader width='full' />
      <PulseLoader width='full' />
    </Container>
  );
  const errorData = error && <Error message={error.message} />;
  const emptyFavorites = !favorites.data.length && !isLoading && (
    <FavoritesEmpty />
  );
  const data = favorites.data && favorites.data.length > 0 && (
    <Container as='div' flex='col'>
      {favorites.data.map((favorite) => (
        <FavoritesItem key={favorite.favorite_id} favorite={favorite} />
      ))}
    </Container>
  );

  return (
    <Container as='div'>
      {loading}
      {errorData}
      {emptyFavorites}
      {data}
    </Container>
  );
};
