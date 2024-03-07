'use client';
import { useToast } from '@/hooks/general.hooks';
import {
  useToggleFavoriteMutation,
  checkFavorite,
  useFavoritesQuery,
  useIsFavorite,
  getActionToggle,
} from '@/features/products/helpers.products';
import { ProductWithUnits } from '@/features/products/types';
import { useQueryClient } from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';
import { FC, useState } from 'react';
import { ActionTypes } from '@/features/products/types';
import type { ExtendedFavorite } from '@/features/products/helpers.products';
import { PiHeartDuotone, PiHeart, PiHeartFill } from 'react-icons/pi';

export type NameColProps = {
  info: CellContext<ProductWithUnits, string>;
  favorites: ExtendedFavorite[] | undefined;
  isLoading: boolean;
};

export const NameCol: FC<NameColProps> = ({ info }) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const [actionState, setActionState] = useState<'add' | 'remove'>('add');
  const { favorites, isLoading } = useFavoritesQuery();
  const { isProductFavorited, favoriteId } = useIsFavorite({
    favorites,
    id: info.row.original.id,
  });

  const { mutate: toggleFavorite } = useToggleFavoriteMutation({
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
      } else {
        notify('Error favoriting', 'error');
      }
    },
  });

  const handleToggleFavorite = () => {
    const productId = info.row.original.id;

    const { actionPayload } = getActionToggle({
      favoriteId,
      productId,
      isProductFavorited,
    });

    const { action } = actionPayload;

    setActionState(action);
    toggleFavorite(actionPayload);
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
