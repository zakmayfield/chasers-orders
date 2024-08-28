import { useCustomQuery } from '@/shared/hooks/custom';
import { getCart } from '@/services/queries/getCart';
import { QueryKeys } from '@/shared/types/Cache';
import { CartCache } from '@/types/cart';

export const useGetCart = () => {
  const { data, isFetching, isLoading, error } = useCustomQuery<CartCache>({
    queryKey: [QueryKeys.CART],
    queryFn: getCart,
    staleTime: Infinity,
  });

  return { data, isFetching, isLoading, error };
};
