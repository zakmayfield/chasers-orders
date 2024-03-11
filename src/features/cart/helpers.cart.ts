import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/features/cart/services.cart';
import { CartCache } from '@/features/cart/types';

interface UseFetchCartQuery {
  (): {
    data: CartCache | undefined;
    isFetching: boolean;
  };
}

export const useFetchCartQuery: UseFetchCartQuery = () => {
  const { data, isFetching } = useQuery<CartCache, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  return { data, isFetching };
};
