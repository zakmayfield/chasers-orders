import { ExtendedFavorite } from '@/hooks/useFavoritesQuery';
import { useToggleFavoriteMutation } from '@/hooks/useToggleFavoriteMutation';

export default function Favorite({ fav }: { fav: ExtendedFavorite }) {
  const { mutate, error } = useToggleFavoriteMutation();

  return (
    <div className='grid grid-cols-3'>
      <span
        className='col-span-1 border'
        onClick={() => mutate({ action: 'remove', id: fav.id })}
      >
        ❤️
      </span>
      <span className='col-span-1 border'>{fav.juice.name}</span>
      <span className='col-span-1 border'>{fav.juice.category}</span>
    </div>
  );
}
