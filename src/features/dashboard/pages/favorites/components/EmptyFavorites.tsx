import { FC } from 'react';

interface EmptyFavoritesProps {}

const EmptyFavorites: FC<EmptyFavoritesProps> = ({}) => {
  return (
    <div>
      <p>No favorites yet</p>
    </div>
  );
};

export default EmptyFavorites;
