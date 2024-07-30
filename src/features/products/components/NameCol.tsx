'use client';
import { useToast } from '@/hooks/general.hooks';
import {
  useToggleFavoriteMutation,
  getActionToggle,
  useFavorites,
} from '@/features/products/helpers.products';
import { ProductWithUnits } from '@/features/products/types';
import { useQueryClient } from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';
import { FC, useState } from 'react';
import type { ExtendedFavorite } from '@/features/products/helpers.products';
import { PiHeartDuotone, PiHeart } from 'react-icons/pi';

export type NameColProps = {
  info: CellContext<ProductWithUnits, string>;
};

export const NameCol: FC<NameColProps> = ({ info }) => {
  const { notify } = useToast();
  const queryClient = useQueryClient();
  const productId = info.row.original.id;

  const [actionState, setActionState] = useState<'add' | 'remove'>('add');

  const {
    query: { isLoading },
    favorite: { isProductFavorited, favoriteId },
  } = useFavorites({
    productId,
  });

  const { toggleFavoriteMutation } = useToggleFavoriteMutation({
    onSuccess(data: ExtendedFavorite) {
      queryClient.setQueryData(
        ['favorites'],
        (oldData: ExtendedFavorite[] | undefined) => {
          const newData = oldData && [data, ...oldData];
          const filteredData =
            oldData && oldData.filter((item) => item.id !== data.id);

          return oldData
            ? actionState === 'add'
              ? newData
              : filteredData
            : oldData;
        }
      );

      notify(
        actionState === 'add' ? `Added to favorites` : `Removed from favorites`
      );
    },
    onError(error: unknown) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
  });

  const handleToggleFavorite = () => {
    const { actionPayload } = getActionToggle({
      favoriteId,
      productId,
      isProductFavorited,
    });

    const { action } = actionPayload;

    setActionState(action);
    toggleFavoriteMutation(actionPayload);
  };

  return (
    <div className='w-80 flex items-center'>
      <div className='cursor-pointer px-1' onClick={handleToggleFavorite}>
        {isLoading ? (
          <LoadingFavorite />
        ) : isProductFavorited ? (
          <Favorited />
        ) : (
          <Unfavorited />
        )}
      </div>
      <div className='overflow-hidden text-ellipsis whitespace-nowrap pl-3'>
        {info.getValue()}
      </div>
    </div>
  );
};

function LoadingFavorite() {
  return (
    <div>
      <PiHeartDuotone className='animate-pulse' />
    </div>
  );
}

function Favorited() {
  return (
    <div>
      <PiHeartDuotone className='text-light-green-500' />
    </div>
  );
}

function Unfavorited() {
  return (
    <div>
      <PiHeart className='hover:text-green-600' />
    </div>
  );
}
