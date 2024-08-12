import {
  PiHeartDuotone,
  PiShoppingCartSimpleDuotone,
  PiXCircleThin,
} from 'react-icons/pi';
import { getUnitId } from '@/utils/products';
import { useAddToCart, useToggleFavorite } from '@/shared/hooks/mutations';
import { ExtendedFavorite } from '@/types/products';

export default function Favorite({ fav }: { fav: ExtendedFavorite }) {
  const { mutate: toggleFavorite } = useToggleFavorite({});
  const { mutate: addToCart } = useAddToCart({});

  const favId = fav.id;
  const productId = fav.product.id;
  const productName = fav.product.name;
  const productCategory = fav.product.category;

  async function handleAddToCart() {
    const unitId = await getUnitId(productId);
    addToCart(unitId!);
  }

  return (
    <div className='h-16 w-full flex items-center border-b last-of-type:border-0 gap-3 px-6'>
      <div className=' flex items-center justify-center mr-3'>
        <PiHeartDuotone className='text-2xl text-light-green-500' />
      </div>

      <div>
        <p className='text-lg'>{productName}</p>
      </div>

      <div className='ml-6'>
        <span className='lowercase italic text-gray-700'>
          {productCategory}
        </span>
      </div>

      <div className='flex items-center gap-6  ml-auto'>
        <button onClick={() => handleAddToCart()}>
          <PiShoppingCartSimpleDuotone className='text-2xl hover:text-light-green-500' />
        </button>

        <button onClick={() => toggleFavorite({ action: 'remove', id: favId })}>
          <PiXCircleThin className='text-lg text-gray-500 hover:text-light-text' />
        </button>
      </div>
    </div>
  );
}
