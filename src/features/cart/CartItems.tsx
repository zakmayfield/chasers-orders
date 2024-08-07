'use client';
import {
  EmptyItems,
  ItemsContainer,
  ItemsHeader,
  LoadingSkelly,
} from './components';
import { useCustomQuery } from '@/shared/hooks/queries';
import { getCart } from '@/services/queries/getCart';
import { CartCache } from '@/types/cart';
import { QueryKeys } from '@/types/hooks';

export const CartItems = () => {
  const { data, isFetching } = useCustomQuery<CartCache>({
    queryKey: [QueryKeys.CART],
    queryFn: getCart,
    staleTime: Infinity,
  });

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
