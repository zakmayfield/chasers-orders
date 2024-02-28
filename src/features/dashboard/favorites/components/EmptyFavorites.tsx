import Link from 'next/link';
import { FC } from 'react';
import { PiStorefrontLight } from 'react-icons/pi';

interface EmptyFavoritesProps {}

const EmptyFavorites: FC<EmptyFavoritesProps> = ({}) => {
  function Notice() {
    return (
      <p className='flex items-center gap-1 text-sm'>
        check out the{' '}
        <Link
          href='/products'
          className='flex items-center gap-1 underline text-purple-800'
        >
          store <PiStorefrontLight />
        </Link>{' '}
        to get started
      </p>
    );
  }

  return (
    <div>
      <p className='mb-6'>No favorites yet</p>
      <Notice />
    </div>
  );
};

export default EmptyFavorites;
