'use client';

import { useFetchCartQuery } from './helpers.cart';
import {
  EmptyItems,
  ItemsContainer,
  ItemsHeader,
  LoadingSkelly,
} from './components';

export const CartItems = () => {
  const { data, isFetching } = useFetchCartQuery();

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
