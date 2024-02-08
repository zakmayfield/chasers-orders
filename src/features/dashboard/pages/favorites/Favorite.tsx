import { ExtendedFavorite } from '@/hooks/useFavoritesQuery';

export default function Favorite({ fav }: { fav: ExtendedFavorite }) {
  return (
    <div className='grid grid-cols-2 w-2/3'>
      <span className='col-span-1 border'>{fav.juice.name}</span>
      <span className='col-span-1 border'>{fav.juice.category}</span>
    </div>
  );
}
