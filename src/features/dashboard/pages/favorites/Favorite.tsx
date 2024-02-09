import { ExtendedFavorite } from '@/hooks/useFavoritesQuery';
import { useToast } from '@/hooks/useToast';
import { useToggleFavoriteMutation } from '@/hooks/useToggleFavoriteMutation';
import { useQueryClient } from '@tanstack/react-query';

export default function Favorite({ fav }: { fav: ExtendedFavorite }) {
  const queryClient = useQueryClient();
  const { notify, ToastContainer } = useToast();

  const { mutate } = useToggleFavoriteMutation({
    onSuccess,
    onError,
  });

  function onSuccess(data: ExtendedFavorite) {
    console.log('onSuccess fired', data);
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
        className='col-span-1 border'
        onClick={() => mutate({ action: 'remove', id: fav.id })}
      >
        ❤️
      </span>
      <span className='col-span-3 border'>{fav.juice.name}</span>
      <span className='col-span-1 border'>{fav.juice.category}</span>
      <ToastContainer />
    </div>
  );
}
