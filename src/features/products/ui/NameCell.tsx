'use client';
import { useToast } from '@/hooks/useToast';
import { useToggleFavoriteMutation } from '@/hooks/useToggleFavoriteMutation';
import { ProductWithUnits } from '@/types/types.product';
import { Favorite } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import {
  FavoriteWithoutUserID,
  ExtendedFavorite,
} from '@/hooks/useFavoritesQuery';
import { ActionTypes } from '@/store/favorite/fav.actions';

// TODO: use products query cache instead of passing props
// TODO: consider combining favorite add/remove endpoints

export default function NameCell({
  products,
  favorites,
  info,
}: {
  products: ProductWithUnits[];
  favorites: FavoriteWithoutUserID[] | ExtendedFavorite[] | undefined;
  info: CellContext<ProductWithUnits, string>;
}) {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const [actionState, setActionState] = useState<'add' | 'remove'>('add');

  const { mutate } = useToggleFavoriteMutation({
    onSuccess,
    onError,
  });

  function onSuccess(data: ExtendedFavorite) {
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
      actionState === 'add'
        ? `Added to favorites ❤️`
        : `Removed from favorites 💔`
    );
  }

  function onError(error: unknown) {
    if (error instanceof Error) {
      notify(error.message, 'error');
    } else {
      notify('Error favoriting', 'error');
    }
  }

  const product = products.find((item) => item.name === info.getValue());

  const handleMutation = () => {
    const isFavorited = (product: ProductWithUnits | undefined) => {
      const favorite = favorites!.find(
        (juice) => juice.juiceId === product!.id
      );

      return { favorite };
    };

    const { favorite } = isFavorited(product);
    let action: ActionTypes;

    if (favorite) {
      action = { action: 'remove', id: favorite.id };
    } else {
      action = { action: 'add', id: product!.id };
    }

    setActionState(action.action);

    mutate(action);
  };

  return (
    <div className='w-80 flex items-center'>
      <div className='cursor-pointer px-1' onClick={handleMutation}>
        <FaRegHeart />
      </div>
      <div className='overflow-hidden text-ellipsis whitespace-nowrap pl-3'>
        {info.getValue()}
      </div>
    </div>
  );
}
