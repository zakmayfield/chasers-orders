import { ExtendedFavorite } from '@/types/products';
import { HeartDuotoneIcon } from '@/shared/utils/ui';

export const FavoriteContent = ({
  favoriteData,
}: {
  favoriteData: ExtendedFavorite;
}) => {
  return (
    <div className='h-16 w-full flex items-center gap-6'>
      <HeartDuotoneIcon className='text-2xl text-light-green-500' />

      <p className='text-lg'>{favoriteData.product.name}</p>

      <p className='lowercase italic text-gray-700'>
        {favoriteData.product.category}
      </p>
    </div>
  );
};
