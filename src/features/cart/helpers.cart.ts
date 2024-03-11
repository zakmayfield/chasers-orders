import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/features/cart/services.cart';
import { CartCache2 } from '@/features/cart/types';

interface UseFetchCartQuery {
  (): {
    data: CartCache2 | undefined;
    isFetching: boolean;
  };
}

export const useFetchCartQuery: UseFetchCartQuery = () => {
  const { data, isFetching } = useQuery<CartCache2, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  return { data, isFetching };
};
