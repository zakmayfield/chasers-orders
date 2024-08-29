import { useCustomQuery } from '@/shared/hooks/custom';
import { QueryKeys } from '@/shared/types/Cache';
import { orderServices } from '@/shared/utils/services/orderServices';

export const useGetOrders = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.ORDERS],
    queryFn: orderServices.getOrders,
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useGetOrder = ({ order_id }: { order_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.ORDER, order_id],
    queryFn: async () => await orderServices.getOrder({ order_id }),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};
