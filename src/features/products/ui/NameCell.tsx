'use client';
import { useToast } from '@/hooks/useToast';
import { createFavorite } from '@/store/favorite/fav.create';
import { ProductWithUnits } from '@/types/types.product';
import { Favorite } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';
import { FaRegHeart } from 'react-icons/fa';

// TODO: use products query cache instead of passing props

export default function NameCell({
  products,
  info,
}: {
  products: ProductWithUnits[];
  info: CellContext<ProductWithUnits, string>;
}) {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const product = products.find((item) => item.name === info.getValue());

  const { mutate: favorite } = useMutation({
    mutationFn: createFavorite,
    onError(error) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
    onSuccess(data) {
      queryClient.setQueryData(
        ['favorites'],
        (oldData: Favorite[] | undefined) =>
          oldData ? [data, ...oldData] : oldData
      );
      notify(`❤️ added to favorites`);
    },
  });

  return (
    <div className='w-80 flex items-center'>
      <div
        className='cursor-pointer px-1'
        onClick={() => favorite(product?.id)}
      >
        <FaRegHeart />
      </div>
      <div className='overflow-hidden text-ellipsis whitespace-nowrap pl-3'>
        {info.getValue()}
      </div>
    </div>
  );
}
