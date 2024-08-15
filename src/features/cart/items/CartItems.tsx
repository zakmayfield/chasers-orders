'use client';
import { useGetCart } from '@/shared/hooks/queries';
import {
  EmptyItems,
  ItemsContainer,
  ItemsHeader,
  LoadingSkelly,
} from './components';

export const CartItems = () => {
  const { data, isFetching } = useGetCart();

  return (
    <div className='col-start-2 col-span-5'>
      <div>
        <ItemsHeader isFetching={isFetching} cart={data} />
        {isFetching ? (
          <LoadingSkelly />
        ) : !data?.items.length ? (
          <EmptyItems />
        ) : (
          <ItemsContainer cart={data} />
        )}
      </div>
    </div>
  );
};
