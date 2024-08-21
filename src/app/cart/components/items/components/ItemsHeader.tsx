import { FC } from 'react';
import { Heading, SpinLoader } from '@/shared/components/ui';
import type { CartCache } from '@/types/cart';

interface ItemsHeaderProps {
  isFetching: boolean;
  cart: CartCache | undefined;
}

export const ItemsHeader: FC<ItemsHeaderProps> = ({ isFetching, cart }) => {
  return (
    <div className='flex items-center gap-3'>
      <Heading as='h4' content='Cart' />

      {isFetching ? (
        <SpinLoader />
      ) : (
        <p>
          (<span>{cart?.items.length}</span>)
        </p>
      )}
    </div>
  );
};
