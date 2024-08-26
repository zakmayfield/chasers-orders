'use client';
import { useAddToCart, useToggleFavorite } from '@/shared/hooks/mutations';
import { getFirstVariantId } from '@/shared/utils/db/products';
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
    const variantId = await getFirstVariantId({
      product_id: favoriteData.product_id,
    });
    addToCart(variantId || '');
  }

  function handleToggleFavorite() {
    toggleFavorite({ action: 'remove', favoriteId: favoriteData.favorite_id });
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
