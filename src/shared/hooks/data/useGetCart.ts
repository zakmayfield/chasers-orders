import { useCustomQuery } from '@/shared/hooks/custom';
import { getCart } from '@/services/queries/getCart';
import { QueryKeys } from '@/types/hooks';
import { CartCache } from '@/types/cart';

export const useGetCart = () => {
  const { data, isFetching } = useCustomQuery<CartCache>({
    queryKey: [QueryKeys.CART],
    queryFn: getCart,
    staleTime: Infinity,
  });

  return { data, isFetching };
};
