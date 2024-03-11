import { FC } from 'react';
import type { CartCache2 } from '@/features/cart/types';
import LoadingSpinner from '@/features/shared/LoadingSpinner';

interface ItemsHeaderProps {
  isFetching: boolean;
  cart: CartCache2 | undefined;
}

export const ItemsHeader: FC<ItemsHeaderProps> = ({ isFetching, cart }) => {
  return (
    <div className='flex items-center gap-3'>
      <h4>Cart</h4>

      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <p>
          (<span>{cart?.items.length}</span>)
        </p>
      )}
    </div>
  );
};
