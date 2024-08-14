'use client';
import { XIcon, CartIcon, HeartDuotoneIcon } from '@/utils/icons';
import { ExtendedFavorite } from '@/types/products';
import { useAddToCart, useToggleFavorite } from '@/shared/hooks/mutations';
import { getUnitId } from '@/utils/products';

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
    <div className='h-16 w-full flex items-center border-b last-of-type:border-0 gap-3 px-6'>
      <div className=' flex items-center justify-center mr-3'>
        <HeartDuotoneIcon className='text-2xl text-light-green-500' />
      </div>

      <div>
        <p className='text-lg'>{favoriteData.product.name}</p>
      </div>

      <div className='ml-6'>
        <span className='lowercase italic text-gray-700'>
          {favoriteData.product.category}
        </span>
      </div>

      <div className='flex items-center gap-6  ml-auto'>
        <button onClick={handleAddToCart}>
          <CartIcon className='text-2xl hover:text-light-green-500' />
        </button>

        <button onClick={handleToggleFavorite}>
          <XIcon className='text-lg text-gray-500 hover:text-light-text' />
        </button>
      </div>
    </div>
  );
};
