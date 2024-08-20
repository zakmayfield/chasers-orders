import Link from 'next/link';
import { StoreIcon } from '@/utils/icons';

export const FavoritesEmpty = () => {
  return (
    <div className='flex items-center justify-center min-h-[20rem]'>
      <div className='flex flex-col gap-6'>
        <p>No favorites yet</p>

        <p className='flex items-center gap-1 text-sm'>
          check out the{' '}
          <Link
            href='/products'
            className='flex items-center gap-1 underline text-purple-800'
          >
            store <StoreIcon />
          </Link>{' '}
          to get started
        </p>
      </div>
    </div>
  );
};
