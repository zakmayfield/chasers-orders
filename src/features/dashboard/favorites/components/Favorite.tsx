import { useQueryClient } from '@tanstack/react-query';
import { PiHeartDuotone } from 'react-icons/pi';
import { PiShoppingCartSimpleDuotone } from 'react-icons/pi';
import { PiXCircleThin } from 'react-icons/pi';
import { getUnitId } from '@/utils/products';
import { useToast } from '@/shared/hooks';
import {
  useToggleFavoriteMutation,
  ExtendedFavorite,
} from '@/features/products/helpers.products';
import { useAddToCart } from '@/shared/hooks/mutations';

export default function Favorite({ fav }: { fav: ExtendedFavorite }) {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { toggleFavoriteMutation } = useToggleFavoriteMutation({
    onSuccess() {
      queryClient.setQueryData(
        ['favorites'],
        (oldData: ExtendedFavorite[] | undefined) => {
          const filtered = oldData && oldData.filter(({ id }) => id !== fav.id);
          return oldData ? filtered : oldData;
        }
      );

      notify('Removed from favorites');
    },
    onError(error: unknown) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
  });

  const { mutate: addToCart } = useAddToCart({});

  const favId = fav.id;
  const productId = fav.juice.id;
  const productName = fav.juice.name;
  const productCategory = fav.juice.category;

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

        <button
          onClick={() =>
            toggleFavoriteMutation({ action: 'remove', id: favId })
          }
        >
          <PiXCircleThin className='text-lg text-gray-500 hover:text-light-text' />
        </button>
      </div>
    </div>
  );
}
