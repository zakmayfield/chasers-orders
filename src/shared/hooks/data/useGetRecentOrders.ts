import { useCustomQuery } from '@/shared/hooks/custom';
import { getRecentOrders } from '@/services/queries/getRecentOrders';
import { OrderType } from '@/types/cart';
import { QueryKeys } from '@/types/hooks';

export const useGetRecentOrders = () => {
  const { data, isLoading, error } = useCustomQuery<OrderType[]>({
    queryKey: [QueryKeys.ORDERS],
    queryFn: getRecentOrders,
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};
