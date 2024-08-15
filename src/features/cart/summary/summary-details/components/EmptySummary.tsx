import Link from 'next/link';
import { ShopIcon } from '@/utils/icons';

export const EmptySummary = () => {
  return (
    <div className='font-extralight h-full bg-light-primary rounded-lg'>
      <p className='flex items-center h-full justify-center'>
        Visit the{' '}
        <Link href='/products' className='underline flex items-center px-1'>
          <ShopIcon />
          shop
        </Link>{' '}
        to get started
      </p>
    </div>
  );
};
