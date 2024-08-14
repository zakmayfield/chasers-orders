import { FC } from 'react';
import type { CartCache } from '@/types/cart';
import { LoadingSpinner } from '@/shared/components';

interface ItemsHeaderProps {
  isFetching: boolean;
  cart: CartCache | undefined;
}

export const ItemsHeader: FC<ItemsHeaderProps> = ({ isFetching, cart }) => {
  return (
    <div className='flex items-center gap-3 mb-6'>
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
