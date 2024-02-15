'use client';
import { useToast } from '@/hooks/general.hooks';
import { useToggleFavoriteMutation } from '@/hooks/mutation.hooks';
import { ProductWithUnits } from '@/types/types.product';
import { useQueryClient } from '@tanstack/react-query';
import { CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { ExtendedFavorite } from '@/hooks/queries/useFavoritesQuery';
import { ActionTypes } from '@/types/types.favorite.actions';

type NameColProps = {
  info: CellContext<ProductWithUnits, string>;
  favorites: ExtendedFavorite[] | undefined;
};

export const NameCol: React.FC<NameColProps> = ({ info, favorites }) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const [actionState, setActionState] = useState<'add' | 'remove'>('add');
  const [isFav, setIsFav] = useState(false);

  const { mutate } = useToggleFavoriteMutation({
    onSuccess,
    onError,
  });

  // TODO: implement server side logic for the favorites // pull into a hook
  // temporarily i could just check the loading state of the favorites query - when that query has resolved then the products will show up, ensuring that the UI doesn't flash
  useEffect(() => {
    const juice = favorites?.find(
      (item) => item.juiceId === info.row.original.id
    )
      ? true
      : false;

    setIsFav(juice);
  }, [favorites, info.row.original.id]);

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

  const handleMutation = () => {
    const checkFavorite = (productId: string) => {
      const favorite = favorites!.find((juice) => juice.juiceId === productId);

      return { favorite };
    };

    const { favorite } = checkFavorite(info.row.original.id);
    let action: ActionTypes;

    if (favorite) {
      action = { action: 'remove', id: favorite.id };
    } else {
      action = { action: 'add', id: info.row.original.id };
    }

    setActionState(action.action);

    mutate(action);
  };

  // TODO: kindof a choppy render for the heart icons
  return (
    <div className='w-80 flex items-center'>
      <div className='cursor-pointer px-1' onClick={handleMutation}>
        {isFav ? <FaHeart /> : <FaRegHeart />}
      </div>
      <div className='overflow-hidden text-ellipsis whitespace-nowrap pl-3'>
        {info.getValue()}
      </div>
    </div>
  );
};
