import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { orderServices } from '@/shared/utils/services/orderServices';
import { QueryKeys } from '@/shared/types/Cache';
import { TOrder, TOrderWithLineItems } from '@/shared/types/Order';

export const useGetOrders = ({ hasLineItems }: { hasLineItems: boolean }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.ORDERS],
    queryFn: async () => await orderServices.getOrders({ hasLineItems }),
    staleTime: Infinity,
  });

  const dataMap = {
    withLineItems:
      (hasLineItems && data && (data as TOrderWithLineItems[])) || [],
    withoutLineItems:
      (!hasLineItems && data && (data as TOrderWithLineItems[])) || [],
  };

  return { data: dataMap, isLoading, error };
};

export const useGetOrder = ({
  order_id,
  hasLineItems,
}: {
  order_id: string;
  hasLineItems: boolean;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.ORDER, order_id],
    queryFn: async () =>
      await orderServices.getOrder({ order_id, hasLineItems }),
    staleTime: Infinity,
  });

  const dataMap = {
    withLineItems:
      (hasLineItems && data && (data as TOrderWithLineItems)) || {},
    withoutLineItems: (!hasLineItems && data && (data as TOrder)) || {},
  };

  return { data: dataMap, isLoading, error };
};

export const useCreateOrder = () => {
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: orderServices.createOrder,
  });

  return { mutate, data, isLoading, error };
};
