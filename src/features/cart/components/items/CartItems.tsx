'use client';

import {
  EmptyItems,
  ItemsContainer,
  ItemsHeader,
  LoadingSkelly,
} from './components';
import { useGetCart } from '@/shared/hooks/queries';

export const CartItems = () => {
  const { data, isFetching } = useGetCart();

  if (isFetching) {
    return (
      <div>
        <ItemsHeader isFetching={isFetching} cart={data} />
        <LoadingSkelly />
      </div>
    );
  }

  if (data && data.items.length === 0) {
    return (
      <div>
        <ItemsHeader isFetching={isFetching} cart={data} />
        <EmptyItems />
      </div>
    );
  }

  return (
    <div>
      <ItemsHeader isFetching={isFetching} cart={data} />
      <ItemsContainer cart={data} />
    </div>
  );
};
