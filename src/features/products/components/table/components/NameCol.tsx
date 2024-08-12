'use client';

import { FC } from 'react';
import { useFavorites } from '@/shared/hooks/queries';
import { CellContext } from '@tanstack/react-table';
import { PiHeartDuotone, PiHeart } from 'react-icons/pi';
import { useToggleFavorite } from '@/shared/hooks/mutations';
import { ProductWithUnits, ToggleFavoriteAction } from '@/types/products';

export type NameColProps = {
  info: CellContext<ProductWithUnits, string>;
};

export const NameCol: FC<NameColProps> = ({ info }) => {
  const productId = info.row.original.id;

  const {
    query: { isLoading },
    favorite: { isProductFavorited, favoriteId },
  } = useFavorites({
    productId,
  });

  const { mutate: toggleFavorite } = useToggleFavorite({});

  const handleToggleFavorite = () => {
    let action: ToggleFavoriteAction;

    if (isProductFavorited && favoriteId) {
      action = { action: 'remove', productId: favoriteId! };
    } else {
      action = { action: 'add', productId: productId };
    }

    toggleFavorite(action);
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
