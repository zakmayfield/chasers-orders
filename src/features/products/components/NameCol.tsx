'use client';
import { useToast } from '@/hooks/general.hooks';
import {
  useToggleFavoriteMutation,
  getActionToggle,
  useIsFavorite,
} from '@/features/products/helpers.products';
import { ProductWithUnits } from '@/features/products/types';
import { useQueryClient } from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';
import { FC, useEffect, useState } from 'react';
import type { ExtendedFavorite } from '@/features/products/helpers.products';
import { PiHeartDuotone, PiHeart } from 'react-icons/pi';

export type NameColProps = {
  info: CellContext<ProductWithUnits, string>;
  favorites: ExtendedFavorite[] | undefined;
  isLoading: boolean;
};

export const NameCol: FC<NameColProps> = ({ info, favorites, isLoading }) => {
  const { notify } = useToast();
  const queryClient = useQueryClient();
  const productId = info.row.original.id;

  const [actionState, setActionState] = useState<'add' | 'remove'>('add');

  const { isProductFavorited, favoriteId } = useIsFavorite({
    favorites,
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
      <PiHeartDuotone className='text-light-greenish' />
    </div>
  );
}

function Unfavorited() {
  return (
    <div>
      <PiHeart />
    </div>
  );
}
