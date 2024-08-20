import { EmptyCartIcon } from '@/utils/icons';
import { FC } from 'react';

interface EmptyItemsProps {}

export const EmptyItems: FC<EmptyItemsProps> = ({}) => {
  return (
    <div className='font-light flex items-center justify-center min-h-[164px] bg-light-primary rounded-lg'>
      <p className='flex items-center gap-3'>
        <EmptyCartIcon />
        <span>Your cart is empty</span>
      </p>
    </div>
  );
};
