'use client';
import { useAddToCart, useToggleFavorite } from '@/shared/hooks/mutations';
import { getUnitId } from '@/utils/products';
import { FavoriteButtonGroup, FavoriteContent } from './components';
import { ExtendedFavorite } from '@/types/products';

export const Favorite = ({
  favoriteData,
}: {
  favoriteData: ExtendedFavorite;
}) => {
  const { mutate: addToCart } = useAddToCart({});
  const { mutate: toggleFavorite } = useToggleFavorite({});

  async function handleAddToCart() {
    const unitId = await getUnitId(favoriteData.productId);
    addToCart(unitId);
  }

  function handleToggleFavorite() {
    toggleFavorite({ action: 'remove', favoriteId: favoriteData.id });
  }
  return (
    <div className='flex items-center border-b last-of-type:border-0 px-6'>
      <FavoriteContent favoriteData={favoriteData} />
      <FavoriteButtonGroup
        handleAddToCart={handleAddToCart}
        handleToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};
