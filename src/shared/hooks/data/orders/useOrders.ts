import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { orderServices } from '@/shared/utils/services/orderServices';
import { QueryKeys } from '@/shared/types/Cache';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/utils';
import { TOrderWithLineItems } from '@/shared/types/Order';

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
    queryFn: () => orderServices.getOrder({ order_id }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useCreateOrder = () => {
  const { notify } = useToast();
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: orderServices.createOrder,
    handleSuccess(data) {
      queryClient.setQueryData<TOrderWithLineItems[]>(
        [QueryKeys.ORDERS_WITH_LINE_ITEMS],
        (oldData) => {
          return oldData && [data, ...oldData];
        }
      );

      notify('Order successfully placed');
    },
  });

  return { mutate, data, isLoading, error };
};
