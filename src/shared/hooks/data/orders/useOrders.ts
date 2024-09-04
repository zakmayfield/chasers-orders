import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { orderServices } from '@/shared/utils/services/orderServices';
import { QueryKeys } from '@/shared/types/Cache';

export const useGetOrders = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.ORDERS_WITH_LINE_ITEMS],
    queryFn: orderServices.getOrders,
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useGetOrder = ({ order_id }: { order_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.ORDER_WITH_LINE_ITEMS, order_id],
    queryFn: async () => await orderServices.getOrder({ order_id }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useCreateOrder = () => {
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: orderServices.createOrder,
  });

  return { mutate, data, isLoading, error };
};
