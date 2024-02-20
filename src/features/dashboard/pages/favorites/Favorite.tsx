import { ExtendedFavorite } from '@/hooks/queries/useFavoritesQuery';
import { useToast } from '@/hooks/general.hooks';
import { useToggleFavoriteMutation } from '@/hooks/mutation.hooks';
import { useQueryClient } from '@tanstack/react-query';
import { GoHeartFill } from 'react-icons/go';

export default function Favorite({ fav }: { fav: ExtendedFavorite }) {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const { mutate } = useToggleFavoriteMutation({
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

  return (
    <div className='grid grid-cols-5'>
      <span
        className='col-span-1 border cursor-pointer'
        onClick={() => mutate({ action: 'remove', id: fav.id })}
      >
        <GoHeartFill color='red' />
      </span>
      <span className='col-span-3 border'>{fav.juice.name}</span>
      <span className='col-span-1 border'>{fav.juice.category}</span>
    </div>
  );
}
