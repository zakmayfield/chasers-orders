import { ExtendedFavorite } from '@/hooks/queries/useFavoritesQuery';
import { useToast } from '@/hooks/general.hooks';
import { useToggleFavoriteMutation } from '@/hooks/mutation.hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoHeartFill } from 'react-icons/go';
import { PiHeartDuotone } from 'react-icons/pi';
import { PiShoppingCartSimpleDuotone } from 'react-icons/pi';
import { PiXCircleThin } from 'react-icons/pi';
import { addItem } from '@/services/mutations/cart.addItem';
import { CartCache } from '@/features/cart/types';
import { fetchFirstUnitId } from '@/utils/favorites.utils';

export default function Favorite({ fav }: { fav: ExtendedFavorite }) {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const { mutate: toggleFavorite } = useToggleFavoriteMutation({
    onSuccess,
    onError,
  });

  function onSuccess() {
    queryClient.setQueryData(
      ['favorites'],
      (oldData: ExtendedFavorite[] | undefined) => {
        const filtered = oldData && oldData.filter(({ id }) => id !== fav.id);
        return oldData ? filtered : oldData;
      }
    );

    notify('Removed from favorites');
  }

  function onError(error: unknown) {
    if (error instanceof Error) {
      notify(error.message, 'error');
    } else {
      notify('Error toggling favorite', 'error');
    }
  }

  const { mutate: addToCart } = useMutation({
    mutationFn: addItem,
    onSuccess(data) {
      notify('Item added to cart');

      // Update `cart` items cache with data from response
      queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) =>
        oldData
          ? {
              ...oldData,
              items: [data, ...oldData.items],
            }
          : oldData
      );
    },
    onError(error) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
  });

  const favId = fav.id;
  const productId = fav.juice.id;
  const productName = fav.juice.name;
  const productCategory = fav.juice.category;

  async function handleAddUnitToCart() {
    // server function
    const firstUnitId = await fetchFirstUnitId(productId);
    addToCart(firstUnitId!);
  }

  return (
    <div className='h-16 w-full flex items-center border-b last-of-type:border-0 gap-3 px-6'>
      <div className=' flex items-center justify-center mr-3'>
        <PiHeartDuotone className='text-2xl opacity-30' />
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
        <button onClick={() => handleAddUnitToCart()}>
          <PiShoppingCartSimpleDuotone className='text-2xl hover:text-light-greenish' />
        </button>

        <button onClick={() => toggleFavorite({ action: 'remove', id: favId })}>
          <PiXCircleThin className='text-lg text-gray-500 hover:text-light-text' />
        </button>
      </div>
    </div>
  );
}
